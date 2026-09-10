import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

import type { EnquiryField, EnquiryPayload, EnquiryResponse } from "@/lib/enquiry";

/** The site's one enquiry endpoint. Every form posts here.
 *
 *  THIS IS THE ONLY ON-DEMAND ROUTE ON THE SITE. astro.config.mjs leaves
 *  `output` at its default of 'static', so all fifty-four pages are still
 *  prerendered exactly as before and still deploy as flat HTML. Opting this one
 *  file out with `prerender = false` is what gives us a server at all, and it
 *  is the reason the four things the team asked for are possible: an app
 *  password that never reaches the browser, a reCAPTCHA secret verified out of
 *  the visitor's reach, the visitor's IP, and a sheet write signed with a
 *  secret. None of those can be done from a static page.
 *
 *  ORDER OF WORK, AND WHY. Honeypot, then reCAPTCHA, then the sheet, then the
 *  email. The two cheap rejections come first so a bot costs us no SMTP
 *  connection and no sheet row. The sheet goes before the email so that the
 *  email can carry the sheet's result: if the webhook is down, the team sees
 *  "SHEET WRITE FAILED" at the top of the enquiry and knows to copy that one in
 *  by hand. The reverse order would lose the row silently.
 *
 *  WHAT COUNTS AS SUCCESS. The email. A failed sheet write still returns 200,
 *  because the enquiry reached the team and telling a visitor their message
 *  failed when it did not is the worse error. A failed email returns 502 and
 *  the form shows the phone number. */
export const prerender = false;

/** Vercel injects runtime environment variables into `process.env`. Astro's
 *  `import.meta.env` is inlined at build time, so a value set in the Vercel
 *  dashboard after the build would not be visible through it. Read both, in
 *  that order, so the same code works in `astro dev` (which loads .env into
 *  import.meta.env) and in a deployed function. */
function env(name: string): string | undefined {
  const fromProcess = typeof process !== "undefined" ? process.env?.[name] : undefined;
  if (fromProcess) return fromProcess;
  // `import.meta.env` is Vite's, and is always present in a real build. The
  // guard is for the harness in scripts/check-enquiry-endpoint.mjs, which runs
  // this module outside Vite so the endpoint can be exercised end to end.
  const meta = (import.meta as { env?: Record<string, string | undefined> }).env;
  return meta?.[name] || undefined;
}

const MAIL_TO = env("MAIL_TO") ?? "info@enhmedia.com";
const MAIL_CC = env("MAIL_CC") ?? "seo@enhmedia.ae";
const MAIL_FROM_NAME = env("MAIL_FROM_NAME") ?? "ENH Media Website";

/** Kept generic on purpose. A message that says which check failed is a
 *  message a bot author can tune against. */
const GENERIC_FAILURE =
  "We could not send that just now. Please email info@enhmedia.com or call +971 4 239 0828.";

function json(body: EnquiryResponse, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/* ------------------------------------------------------------------ safety */

/** Strips CR and LF from anything bound for a mail header.
 *
 *  Every one of these values is typed by a stranger. A newline inside a
 *  Subject or a Reply-To ends that header and starts another, which is how a
 *  contact form becomes an open relay: a crafted name can append its own Bcc.
 *  Nodemailer 10 hardened its own parsing, but the values still have to be
 *  clean before they reach it. Also caps length, because a header is not a
 *  place to put a novel. */
function headerSafe(value: string, max = 200): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

/** Deliberately permissive, and identical in spirit to the client-side pattern
 *  in ConsultationForm: one @, something before it, a dot-something after.
 *  A stricter pattern rejects addresses that exist, and turning away a real
 *  enquiry is a worse failure than accepting a typo. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* --------------------------------------------------------------- UAE clock */

/** "2026-09-10 14:32:05" in Asia/Dubai.
 *
 *  Sortable rather than pretty, because this is the sheet's first column and a
 *  sheet gets sorted. `hourCycle: "h23"` rather than `hour12: false`: the
 *  latter renders midnight as "24:00:00" on some engines, which sorts after
 *  everything else in the day it belongs to. */
function uaeTimestamp(date: Date): string {
  const p = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(date)
    .reduce<Record<string, string>>((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

/** "Thursday, 10 September 2026 at 14:32 (GST)" for the email, where a human
 *  reads it once rather than sorting a column of them. */
function uaeLabel(date: Date): string {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
  return `${formatted} (GST)`;
}

/* ------------------------------------------------------------------- ip */

/** The visitor's IP.
 *
 *  `context.clientAddress` is the right answer and Astro throws if it is read
 *  on a prerendered route, which this one is not. On Vercel it resolves from
 *  x-forwarded-for. The header fallbacks below cover `astro dev`, where
 *  clientAddress is present but reports ::1, and any future host that sets a
 *  different header. x-forwarded-for is a comma-separated chain appended to by
 *  each proxy, and the client is the leftmost entry. */
function clientIp(request: Request, clientAddress: string | undefined): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    clientAddress ??
    "unknown"
  );
}

/* ------------------------------------------------------------- reCAPTCHA */

type VerdictSource = "verified" | "skipped" | "rejected";

type Verdict = { source: VerdictSource; score: number | null; detail: string };

async function verifyRecaptcha(
  token: string | null,
  expectedAction: string,
  ip: string,
): Promise<Verdict> {
  const secret = env("RECAPTCHA_SECRET_KEY");

  // No secret configured: a local checkout with no .env, or a deploy where the
  // keys have not been added yet. Let the enquiry through rather than silently
  // swallowing real leads, and mark the row so the team can see it was not
  // checked. In production this state should not last: the sheet column will
  // read "not configured" on every row until the keys are set.
  if (!secret) return { source: "skipped", score: null, detail: "not configured" };
  if (!token) return { source: "rejected", score: null, detail: "no token from browser" };

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    if (!data.success) {
      return {
        source: "rejected",
        score: null,
        detail: (data["error-codes"] ?? ["verification failed"]).join(", "),
      };
    }

    // The action is signed into the token, so checking it stops a token minted
    // on one form being replayed against another (or scraped from a cheap page
    // and spent here).
    if (data.action && data.action !== expectedAction) {
      return {
        source: "rejected",
        score: data.score ?? null,
        detail: `action mismatch: ${data.action}`,
      };
    }

    const min = Number(env("RECAPTCHA_MIN_SCORE") ?? "0.5");
    const score = typeof data.score === "number" ? data.score : 0;
    if (score < min) {
      return { source: "rejected", score, detail: `score ${score} below ${min}` };
    }
    return { source: "verified", score, detail: `score ${score}` };
  } catch (error) {
    // Google being unreachable must not cost us a real enquiry. Let it through
    // and record that the check could not run.
    console.error("[enquiry] reCAPTCHA verification error", error);
    return { source: "skipped", score: null, detail: "verifier unreachable" };
  }
}

/* ----------------------------------------------------------------- sheet */

type SheetResult = { ok: boolean; detail: string };

async function appendToSheet(row: Record<string, unknown>): Promise<SheetResult> {
  const url = env("SHEETS_WEBHOOK_URL");
  const secret = env("SHEETS_WEBHOOK_SECRET");
  if (!url) return { ok: false, detail: "SHEETS_WEBHOOK_URL not configured" };

  try {
    // Apps Script web apps answer a POST with a 302 to script.googleusercontent
    // and the real body is behind it; fetch follows that by default. The
    // content type is text/plain deliberately: Apps Script's doPost only
    // populates e.postData.contents reliably for simple content types, and
    // sending application/json triggers a CORS preflight it cannot answer.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, row }),
      redirect: "follow",
    });
    const text = await res.text();
    if (!res.ok) return { ok: false, detail: `HTTP ${res.status}: ${text.slice(0, 200)}` };

    const data = JSON.parse(text) as { ok?: boolean; error?: string };
    if (!data.ok) return { ok: false, detail: data.error ?? "webhook returned ok:false" };
    return { ok: true, detail: "appended" };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : String(error) };
  }
}

/* ----------------------------------------------------------------- email */

type Meta = { label: string; value: string }[];

function emailText(subjectLine: string, fields: EnquiryField[], meta: Meta, warning: string): string {
  return [
    ...(warning ? [`!! ${warning}`, ""] : []),
    subjectLine,
    "",
    ...fields.map((f) => `${f.label}: ${f.value || "-"}`),
    "",
    "--- Submission details ---",
    ...meta.map((m) => `${m.label}: ${m.value}`),
  ].join("\n");
}

function emailHtml(subjectLine: string, fields: EnquiryField[], meta: Meta, warning: string): string {
  const row = (label: string, value: string, mono = false) => `
    <tr>
      <td style="padding:10px 16px 10px 0;vertical-align:top;border-bottom:1px solid #eceaea;
                 font:600 11px/1.4 Arial,Helvetica,sans-serif;letter-spacing:.06em;
                 text-transform:uppercase;color:#8a8a8a;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;vertical-align:top;border-bottom:1px solid #eceaea;
                 font:${mono ? "13px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace" : "15px/1.6 Arial,Helvetica,sans-serif"};
                 color:#141414;white-space:pre-wrap;word-break:break-word;">${escapeHtml(value) || "&mdash;"}</td>
    </tr>`;

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f6f5f4;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e4e1e1;">
    <tr><td style="padding:22px 28px;background:#141414;">
      <div style="font:800 17px/1.3 Arial,Helvetica,sans-serif;color:#ffffff;letter-spacing:.02em;">New website enquiry</div>
      <div style="margin-top:6px;font:13px/1.5 Arial,Helvetica,sans-serif;color:#e8000d;">${escapeHtml(subjectLine)}</div>
    </td></tr>
    ${
      warning
        ? `<tr><td style="padding:14px 28px;background:#fff4f4;border-bottom:1px solid #f3d6d6;
             font:700 13px/1.5 Arial,Helvetica,sans-serif;color:#b30009;">&#9888; ${escapeHtml(warning)}</td></tr>`
        : ""
    }
    <tr><td style="padding:8px 28px 20px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${fields.map((f) => row(f.label, f.value)).join("")}
      </table>
    </td></tr>
    <tr><td style="padding:0 28px 26px;">
      <div style="margin:10px 0 4px;font:700 11px/1.4 Arial,Helvetica,sans-serif;
                  letter-spacing:.08em;text-transform:uppercase;color:#8a8a8a;">Submission details</div>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${meta.map((m) => row(m.label, m.value, true)).join("")}
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/* ------------------------------------------------------------------ route */

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: EnquiryPayload;
  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return json({ ok: false, message: GENERIC_FAILURE }, 400);
  }

  // 1. HONEYPOT. A hidden input no sighted or screen-reader visitor reaches.
  //    Anything in it is automation. Answer 200 so the bot books it as a win
  //    and does not come back to probe for what gave it away.
  if (payload.hp) {
    console.warn("[enquiry] honeypot tripped", { form: payload.formName });
    return json({ ok: true, message: "Thank you. We will be in touch shortly." }, 200);
  }

  const fields = Array.isArray(payload.fields) ? payload.fields : [];
  const value = (id: string) => fields.find((f) => f.id === id)?.value?.trim() ?? "";

  const name = value("name");
  const email = value("email");

  // 2. THE TWO FIELDS EVERY FORM MARKS REQUIRED. Re-checked here because
  //    client-side validation is a courtesy to the visitor, not a control:
  //    this endpoint is reachable with curl.
  if (!name || !email || !EMAIL.test(email)) {
    return json({ ok: false, message: "Please add your name and a valid email address." }, 400);
  }

  const ip = clientIp(request, clientAddress);
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const now = new Date();

  // 3. RECAPTCHA.
  const verdict = await verifyRecaptcha(payload.token, payload.action ?? "", ip);
  if (verdict.source === "rejected") {
    console.warn("[enquiry] reCAPTCHA rejected", { form: payload.formName, detail: verdict.detail });
    return json(
      {
        ok: false,
        message:
          "We could not verify that this came from a person. Please reload the page and try again, or email info@enhmedia.com.",
      },
      403,
    );
  }

  const formName = headerSafe(payload.formName || "Website Form", 80);
  const pageName = headerSafe(payload.pageName || "Unknown page", 120);
  const pagePath = headerSafe(payload.pagePath || "", 200);
  const pageUrl = headerSafe(payload.pageUrl || "", 300);
  const recaptchaCell =
    verdict.source === "verified" ? String(verdict.score ?? "") : `${verdict.source}: ${verdict.detail}`;

  // 4. THE SHEET, BEFORE THE EMAIL, so its result can ride along in the email.
  const sheet = await appendToSheet({
    timestamp: uaeTimestamp(now),
    timestampIso: now.toISOString(),
    formName,
    pageName,
    pagePath,
    pageUrl,
    ip,
    userAgent,
    recaptcha: recaptchaCell,
    consent: payload.consent === undefined ? "" : payload.consent ? "Yes" : "No",
    // Ordered, so the sheet lays its columns out the way the form drew them.
    fields: fields.map((f) => ({
      id: String(f.id ?? "").slice(0, 60),
      label: String(f.label ?? f.id ?? "").slice(0, 120),
      value: String(f.value ?? "").slice(0, 5000),
    })),
  });
  if (!sheet.ok) console.error("[enquiry] sheet append failed", sheet.detail);

  // 5. THE EMAIL.
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  if (!user || !pass) {
    console.error("[enquiry] SMTP_USER / SMTP_PASS not configured");
    return json({ ok: false, message: GENERIC_FAILURE }, 500);
  }

  const meta: Meta = [
    { label: "Form", value: formName },
    { label: "Page", value: pageName },
    { label: "URL", value: pageUrl || pagePath },
    { label: "Time (UAE)", value: uaeLabel(now) },
    { label: "IP address", value: ip },
    { label: "reCAPTCHA", value: recaptchaCell },
    { label: "User agent", value: userAgent },
    { label: "Google Sheet", value: sheet.ok ? "Row added" : `NOT ADDED - ${sheet.detail}` },
  ];
  if (payload.consent !== undefined) {
    meta.splice(6, 0, { label: "Consent", value: payload.consent ? "Given" : "Not given" });
  }

  const subjectLine = `${formName} - ${pageName}`;
  const warning = sheet.ok
    ? ""
    : "This enquiry was NOT written to the Google Sheet. Add it by hand and check the webhook.";

  try {
    const transporter = nodemailer.createTransport({
      host: env("SMTP_HOST") ?? "smtp.gmail.com",
      port: Number(env("SMTP_PORT") ?? "465"),
      // Port 465 is implicit TLS. 587 is STARTTLS and wants secure:false.
      secure: (env("SMTP_SECURE") ?? "true") === "true",
      auth: { user, pass },
    });

    await transporter.sendMail({
      // Gmail will not let the envelope sender differ from the authenticated
      // account (or one of its verified aliases), so the address is always
      // SMTP_USER. Only the display name is ours to choose, and it carries the
      // visitor's name so the inbox list is scannable without opening anything.
      from: { name: `${MAIL_FROM_NAME} - ${headerSafe(name, 60)}`, address: user },
      to: MAIL_TO,
      cc: MAIL_CC,
      // Hitting reply answers the visitor, not the seo@ mailbox. Sanitised
      // above and pattern-checked, so it cannot inject a header.
      replyTo: { name: headerSafe(name, 60), address: headerSafe(email, 254) },
      subject: headerSafe(`New enquiry: ${subjectLine}`, 180),
      text: emailText(subjectLine, fields, meta, warning),
      html: emailHtml(subjectLine, fields, meta, warning),
    });
  } catch (error) {
    console.error("[enquiry] SMTP send failed", error);
    return json({ ok: false, message: GENERIC_FAILURE }, 502);
  }

  return json(
    { ok: true, message: "Thank you. Your enquiry is with our team and we will reply shortly." },
    200,
  );
};

/** Anything that is not a POST. Without this, a GET renders Astro's 404 as
 *  HTML and the client's `res.json()` parse is the thing that reports it. */
export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false, message: "Method not allowed." }), {
    status: 405,
    headers: { "Content-Type": "application/json", Allow: "POST" },
  });

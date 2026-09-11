/** Exercises src/pages/api/enquiry.ts end to end, with no network and no
 *  credentials.
 *
 *  WHY THIS EXISTS. The endpoint is the one on-demand route on the site, and
 *  none of the usual ways to look at this project can run it: `astro dev`
 *  holds a project-wide lock that another session usually owns, and the Vercel
 *  adapter has no `astro preview`. That left the SMTP wiring, the header
 *  sanitising, the UAE clock, the honeypot and the sheet payload with no way to
 *  be checked before they were pointed at a real mailbox.
 *
 *  WHAT IT DOES. Stands up a throwaway SMTP server and a throwaway HTTP server
 *  on localhost, points the endpoint's own environment variables at them, and
 *  calls the real exported POST handler with real Request objects. Nothing is
 *  mocked inside the endpoint: nodemailer really opens a socket and really
 *  speaks SMTP, and the assertions are made against the bytes that came out
 *  the other end.
 *
 *  Run: node scripts/check-enquiry-endpoint.mjs
 */

import net from "node:net";
import http from "node:http";
import { build } from "esbuild";
import { pathToFileURL } from "node:url";
import { mkdtemp, rm } from "node:fs/promises";
import path from "node:path";

/* ------------------------------------------------------- a tiny SMTP server */

/** Speaks just enough SMTP for nodemailer to complete a plain AUTH LOGIN
 *  handshake and a DATA transfer, and keeps what it was sent. No TLS: the test
 *  sets SMTP_SECURE=false and talks to it in the clear on localhost. */
function startSmtpServer() {
  const inboxes = [];
  const server = net.createServer((socket) => {
    const session = { rcpt: [], from: null, data: "" };
    let readingData = false;
    /** AUTH LOGIN is a three-step exchange: the server asks for the username,
     *  then for the password, and only then accepts. Answering 235 to the
     *  username makes nodemailer fail with EAUTH "Invalid login sequence", so
     *  the state has to be tracked rather than every unknown line accepted. */
    let authStep = null;

    socket.write("220 localhost ESMTP test\r\n");

    socket.on("data", (chunk) => {
      const text = chunk.toString("utf8");

      if (readingData) {
        session.data += text;
        const end = session.data.indexOf("\r\n.\r\n");
        if (end !== -1) {
          session.data = session.data.slice(0, end);
          readingData = false;
          inboxes.push({ ...session, receivedAt: Date.now() });
          socket.write("250 2.0.0 Ok: queued\r\n");
        }
        return;
      }

      for (const line of text.split("\r\n").filter(Boolean)) {
        const upper = line.toUpperCase();
        if (authStep === "username") {
          authStep = "password";
          socket.write("334 UGFzc3dvcmQ6\r\n"); // "Password:"
          continue;
        }
        if (authStep === "password") {
          authStep = "done";
          socket.write("235 2.7.0 Authentication successful\r\n");
          continue;
        }

        if (upper.startsWith("EHLO") || upper.startsWith("HELO")) {
          socket.write("250-localhost\r\n250-AUTH PLAIN LOGIN\r\n250 8BITMIME\r\n");
        } else if (upper.startsWith("AUTH PLAIN")) {
          // Single step: the credentials ride on the command itself. This is
          // what nodemailer picks when the server advertises PLAIN first.
          if (line.trim().length > "AUTH PLAIN".length) {
            socket.write("235 2.7.0 Authentication successful\r\n");
          } else {
            authStep = "password";
            socket.write("334 \r\n");
          }
        } else if (upper.startsWith("AUTH LOGIN")) {
          authStep = "username";
          socket.write("334 VXNlcm5hbWU6\r\n"); // "Username:"
        } else if (upper.startsWith("MAIL FROM")) {
          session.from = line;
          socket.write("250 2.1.0 Ok\r\n");
        } else if (upper.startsWith("RCPT TO")) {
          session.rcpt.push(line);
          socket.write("250 2.1.5 Ok\r\n");
        } else if (upper === "DATA") {
          readingData = true;
          socket.write("354 End data with <CR><LF>.<CR><LF>\r\n");
        } else if (upper === "QUIT") {
          socket.write("221 2.0.0 Bye\r\n");
          socket.end();
        } else if (upper === "RSET" || upper === "NOOP") {
          socket.write("250 2.0.0 Ok\r\n");
        } else {
          socket.write("500 5.5.1 Unrecognised command\r\n");
        }
      }
    });

    socket.on("error", () => {});
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () =>
      resolve({ port: server.address().port, inboxes, close: () => server.close() }),
    );
  });
}

/* ------------------------------------------- a stand-in for the Apps Script */

function startWebhookServer({ failing = false, delayMs = 0 } = {}) {
  const received = [];
  const repliedAt = [];
  const server = http.createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      received.push(JSON.parse(body));
      // Apps Script really is this slow, so the double can be too.
      setTimeout(() => {
        repliedAt.push(Date.now());
        res.writeHead(failing ? 500 : 200, { "Content-Type": "application/json" });
        res.end(failing ? '{"ok":false,"error":"simulated outage"}' : '{"ok":true}');
      }, delayMs);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () =>
      resolve({ port: server.address().port, received, repliedAt, close: () => server.close() }),
    );
  });
}

/* ----------------------------------------------------------------- harness */

let failures = 0;
function check(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✓ ${label}`);
  } else {
    failures += 1;
    console.log(`  ✗ ${label}${detail ? `\n      ${detail}` : ""}`);
  }
}

function post(body) {
  return new Request("https://enhmedia.com/api/enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "94.200.1.55, 10.0.0.1",
      "user-agent": "Mozilla/5.0 (check-enquiry-endpoint)",
    },
    body: JSON.stringify(body),
  });
}

const basePayload = {
  formName: "CTA Band",
  pageName: "Google Ads Agency Dubai",
  pagePath: "/services/performance-marketing/google-ads",
  pageUrl: "https://enhmedia.com/services/performance-marketing/google-ads",
  token: null,
  action: "submit_cta_band",
  hp: "",
  fields: [
    { id: "name", label: "Name", value: "Layla Haddad" },
    { id: "email", label: "Email", value: "layla@example.com" },
    { id: "phone", label: "Phone", value: "+971 50 123 4567" },
    { id: "company", label: "Company", value: "Example Trading LLC" },
    { id: "services", label: "Services", value: "Google Ads" },
    { id: "message", label: "Message", value: "We need help with search campaigns." },
  ],
};

const loggedErrors = [];
{
  const original = console.error;
  console.error = (...args) => {
    loggedErrors.push(args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
    original(...args);
  };
}

async function main() {
  const smtp = await startSmtpServer();
  const hook = await startWebhookServer();

  Object.assign(process.env, {
    SMTP_HOST: "127.0.0.1",
    SMTP_PORT: String(smtp.port),
    SMTP_SECURE: "false",
    SMTP_USER: "seo@enhmedia.com",
    SMTP_PASS: "test-app-password",
    MAIL_FROM_NAME: "ENH Media Website",
    MAIL_TO: "info@enhmedia.com",
    MAIL_CC: "seo@enhmedia.ae",
    SHEETS_WEBHOOK_URL: `http://127.0.0.1:${hook.port}/exec`,
    SHEETS_WEBHOOK_SECRET: "test-secret",
    // Left unset on purpose: exercises the "not configured" path, which is
    // what a deploy looks like before the reCAPTCHA keys are added.
    RECAPTCHA_SECRET_KEY: "",
  });

  // Bundle the endpoint the way Vite would, so the real module runs rather
  // than a paraphrase of it. nodemailer stays external so the genuine client
  // is used.
  // Built inside the project, not the OS temp dir: the bundle imports
  // nodemailer for real, and Node resolves that from the nearest node_modules.
  const dir = await mkdtemp(path.join("node_modules", ".enh-check-"));
  const outfile = path.join(dir, "enquiry.mjs");
  await build({
    entryPoints: ["src/pages/api/enquiry.ts"],
    outfile,
    bundle: true,
    format: "esm",
    platform: "node",
    external: ["nodemailer"],
    logLevel: "silent",
  });
  const { POST } = await import(pathToFileURL(outfile).href);

  console.log("\nA normal enquiry");
  const res = await POST({ request: post(basePayload), clientAddress: "127.0.0.1" });
  const json = await res.json();
  check("returns 200", res.status === 200, `got ${res.status}`);
  check("reports ok", json.ok === true, JSON.stringify(json));

  const mail = smtp.inboxes[0];
  check("SMTP received exactly one message", smtp.inboxes.length === 1);
  check("envelope recipient is info@enhmedia.com", (mail?.rcpt ?? []).some((r) => r.includes("info@enhmedia.com")));
  check("envelope recipient includes the CC seo@enhmedia.ae", (mail?.rcpt ?? []).some((r) => r.includes("seo@enhmedia.ae")));
  check("envelope sender is the authenticated account", (mail?.from ?? "").includes("seo@enhmedia.com"));

  const headers = mail?.data ?? "";
  check("To: header is info@enhmedia.com", /^To: .*info@enhmedia\.com/m.test(headers));
  check("Cc: header is seo@enhmedia.ae", /^Cc: .*seo@enhmedia\.ae/m.test(headers));
  check("Reply-To is the visitor", /^Reply-To: .*layla@example\.com/m.test(headers));
  check("From display name carries the form and the visitor", /^From: .*ENH Media Website - Layla Haddad/m.test(headers));
  check("subject names the form and the page", /^Subject: .*CTA Band .*Google Ads Agency Dubai/m.test(headers.replace(/=\?[^?]+\?[QB]\?([^?]*)\?=/g, "$1")));
  check("body carries a field value", headers.includes("search campaigns") || headers.includes("c2VhcmNoIGNhbXBhaWducw"));

  const row = hook.received[0]?.row;
  check("webhook received one row", hook.received.length === 1);
  check("webhook was sent the shared secret", hook.received[0]?.secret === "test-secret");
  check("row carries the form name", row?.formName === "CTA Band");
  check("row carries the page name", row?.pageName === "Google Ads Agency Dubai");
  check(
    "row IP is the leftmost x-forwarded-for entry, not the proxy",
    row?.ip === "94.200.1.55",
    `got ${row?.ip}`,
  );
  check(
    "row timestamp is UAE local time, sortable",
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(row?.timestamp ?? ""),
    `got ${row?.timestamp}`,
  );
  check("row records that reCAPTCHA was not configured", String(row?.recaptcha).includes("skipped"));
  check("row carries all six fields in order", (row?.fields ?? []).map((f) => f.id).join(",") === "name,email,phone,company,services,message");

  // UAE is UTC+4 with no daylight saving, so this is a fixed offset and can be
  // asserted exactly rather than approximately.
  const utcHour = new Date(row.timestampIso).getUTCHours();
  const uaeHour = Number(row.timestamp.slice(11, 13));
  check("UAE timestamp is exactly UTC+4", (utcHour + 4) % 24 === uaeHour, `utc ${utcHour}, uae ${uaeHour}`);

  console.log("\nHeader injection through the name field");
  const before = smtp.inboxes.length;
  const injected = await POST({
    request: post({
      ...basePayload,
      fields: [
        { id: "name", label: "Name", value: "Eve\r\nBcc: attacker@evil.test" },
        ...basePayload.fields.slice(1),
      ],
    }),
    clientAddress: "127.0.0.1",
  });
  check("still accepted", injected.status === 200);
  const injectedMail = smtp.inboxes[smtp.inboxes.length - 1];
  check("a message was sent", smtp.inboxes.length === before + 1);
  check(
    "no Bcc reached the envelope",
    !(injectedMail?.rcpt ?? []).some((r) => r.includes("attacker@evil.test")),
    JSON.stringify(injectedMail?.rcpt),
  );
  // Only the header block matters. A line beginning "Bcc:" inside the message
  // BODY is inert text -- headers end at the first blank line -- and the body
  // legitimately reproduces whatever the visitor typed, newlines included.
  // Asserting against the whole message would fail on that harmless echo.
  const injectedHeaders = (injectedMail?.data ?? "").split("\r\n\r\n")[0] ?? "";
  check("no Bcc header was injected", !/^Bcc:/im.test(injectedHeaders), injectedHeaders.slice(0, 200));
  check(
    "the CRLF was flattened, so the name stayed inside one quoted display name",
    /^From: "ENH Media Website - Eve Bcc: attacker@evil\.test" <seo@enhmedia\.com>$/m.test(injectedHeaders),
    injectedHeaders.split("\r\n")[0],
  );
  check("the header block is still exactly the headers we set", !/attacker@evil\.test>/.test(injectedHeaders));

  console.log("\nHoneypot");
  const hpBefore = smtp.inboxes.length;
  const hpRes = await POST({
    request: post({ ...basePayload, hp: "http://spam.example" }),
    clientAddress: "127.0.0.1",
  });
  const hpJson = await hpRes.json();
  check("answers 200 so the bot learns nothing", hpRes.status === 200 && hpJson.ok === true);
  check("sent no mail", smtp.inboxes.length === hpBefore);
  check("wrote no sheet row", hook.received.length === 2);

  console.log("\nMissing or invalid required fields");
  const bad = await POST({
    request: post({
      ...basePayload,
      fields: [
        { id: "name", label: "Name", value: "" },
        { id: "email", label: "Email", value: "not-an-email" },
      ],
    }),
    clientAddress: "127.0.0.1",
  });
  check("rejected with 400", bad.status === 400, `got ${bad.status}`);

  console.log("\nSheet down, mail still sent");
  hook.close();
  const failing = await startWebhookServer({ failing: true });
  process.env.SHEETS_WEBHOOK_URL = `http://127.0.0.1:${failing.port}/exec`;
  const degradedBefore = smtp.inboxes.length;
  const degraded = await POST({ request: post(basePayload), clientAddress: "127.0.0.1" });
  check("visitor still gets a success", degraded.status === 200);
  check("mail was still sent", smtp.inboxes.length === degradedBefore + 1);
  // The email can no longer carry the sheet's fate -- it is composed before
  // that is known -- so the guarantee is now that the whole row is logged and
  // therefore recoverable by hand from the Vercel function log.
  check(
    "the lost row is logged in full, so it can be recovered",
    loggedErrors.some(
      (line) =>
        /sheet append FAILED/i.test(line) &&
        line.includes("layla@example.com") &&
        line.includes("Google Ads Agency Dubai"),
    ),
    loggedErrors.at(-1)?.slice(0, 160),
  );

  // The rejection path needs a real answer from Google, so it is skipped when
  // this machine is offline rather than failing the suite. A bogus secret is
  // enough: Google answers success:false, which is the branch under test.
  console.log("\nreCAPTCHA rejects the token");
  const online = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: "x", response: "x" }),
  })
    .then((r) => r.ok)
    .catch(() => false);

  if (!online) {
    console.log("  – skipped (no network)");
  } else {
    process.env.RECAPTCHA_SECRET_KEY = "not-a-real-secret";
    const mailBefore = smtp.inboxes.length;
    const rejected = await POST({
      request: post({ ...basePayload, token: "a-token-google-will-not-accept" }),
      clientAddress: "127.0.0.1",
    });
    const rejectedJson = await rejected.json();
    check("answers 403", rejected.status === 403, `got ${rejected.status}`);
    check("tells the visitor how to reach us anyway", rejectedJson.message.includes("info@enhmedia.com"));
    check("sent no mail", smtp.inboxes.length === mailBefore);
    process.env.RECAPTCHA_SECRET_KEY = "";

    // A configured secret with no token from the browser is refused without
    // even asking Google: that is a form post that bypassed the client.
    process.env.RECAPTCHA_SECRET_KEY = "not-a-real-secret";
    const noToken = await POST({ request: post({ ...basePayload, token: null }), clientAddress: "127.0.0.1" });
    check("a missing token is refused when a secret IS configured", noToken.status === 403);
    process.env.RECAPTCHA_SECRET_KEY = "";
  }

  // A credential pasted into a dashboard keeps its whitespace, and Gmail
  // rejects a padded password with the same EAUTH as a wrong one. The endpoint
  // trims, so this must still authenticate and send.
  console.log("\nCredentials arriving with stray whitespace");
  const paddedBefore = smtp.inboxes.length;
  process.env.SMTP_PASS = "  test-app-password  ";
  process.env.SMTP_USER = " seo@enhmedia.com ";
  process.env.MAIL_TO = " info@enhmedia.com ";
  const padded = await POST({ request: post(basePayload), clientAddress: "127.0.0.1" });
  check("still sends", padded.status === 200, `got ${padded.status}`);
  check("mail really went out", smtp.inboxes.length === paddedBefore + 1);
  const paddedHeaders = (smtp.inboxes[smtp.inboxes.length - 1]?.data ?? "").split("\r\n\r\n")[0] ?? "";
  check(
    "the padding did not leak into the To: header",
    /^To: info@enhmedia\.com$/m.test(paddedHeaders),
    paddedHeaders.split("\r\n").find((l) => l.startsWith("To:")),
  );
  process.env.SMTP_PASS = "test-app-password";
  process.env.SMTP_USER = "seo@enhmedia.com";
  process.env.MAIL_TO = "info@enhmedia.com";

  // PROVES THE TWO ACTUALLY OVERLAP. With a webhook that stalls for 1.2s, a
  // sequential handler could not possibly have finished the email before the
  // webhook replied. If the email landed first, they ran concurrently.
  console.log("\nThe sheet and the email overlap");
  const slow = await startWebhookServer({ delayMs: 1200 });
  process.env.SHEETS_WEBHOOK_URL = `http://127.0.0.1:${slow.port}/exec`;
  const beforeSlow = smtp.inboxes.length;
  const t0 = Date.now();
  const slowRes = await POST({ request: post(basePayload), clientAddress: "127.0.0.1" });
  const elapsed = Date.now() - t0;
  check("still succeeds", slowRes.status === 200);
  check("mail was sent", smtp.inboxes.length === beforeSlow + 1);
  const mailAt = smtp.inboxes.at(-1)?.receivedAt ?? Infinity;
  const sheetAt = slow.repliedAt.at(-1) ?? 0;
  check(
    "the email completed BEFORE the slow sheet replied",
    mailAt < sheetAt,
    `email at +${mailAt - t0}ms, sheet at +${sheetAt - t0}ms`,
  );
  check(
    "total time is the slower of the two, not their sum",
    elapsed < 1200 + 400,
    `${elapsed}ms elapsed against a 1200ms webhook`,
  );
  slow.close();

  console.log("\nA GET");
  const { ALL } = await import(pathToFileURL(outfile).href);
  const getRes = await ALL({ request: new Request("https://enhmedia.com/api/enquiry") });
  check("answers 405 as JSON", getRes.status === 405 && getRes.headers.get("content-type").includes("json"));

  smtp.close();
  failing.close();
  await rm(dir, { recursive: true, force: true });

  console.log(failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) FAILED.\n`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

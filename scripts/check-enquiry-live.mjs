/** One real enquiry, end to end, using the real credentials in .env.
 *
 *  THIS SENDS A REAL EMAIL to MAIL_TO (cc MAIL_CC) and writes a REAL ROW to the
 *  live Google Sheet. Everything is labelled as a test so neither can be
 *  mistaken for a customer, but both are real and the row needs deleting
 *  afterwards. Run it deliberately, not as part of a check suite.
 *
 *  WHY IT EXISTS. `check:smtp` proves the mailbox credential and `check:sheets:live`
 *  proves the webhook, but each in isolation. This is the only thing that runs
 *  the actual exported POST handler from src/pages/api/enquiry.ts against both
 *  at once -- so it is what proves the email's formatting, its Reply-To, the
 *  UAE timestamp, the IP capture and the sheet row all come out right before a
 *  real enquiry depends on them.
 *
 *  Run: npm run check:enquiry:live
 */

import { readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

function loadEnv(file = ".env") {
  const env = {};
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim().replace(/^(['"])(.*)\1$/, "$2");
  }
  return env;
}

const env = loadEnv();
for (const [k, v] of Object.entries(env)) if (v) process.env[k] = v;

/** reCAPTCHA IS DELIBERATELY SWITCHED OFF FOR THIS RUN.
 *
 *  This script has no browser, so it cannot mint a token, and the endpoint
 *  correctly refuses a tokenless request whenever a secret is configured -- so
 *  the moment the real keys landed in .env, this check started returning 403.
 *  That refusal is the endpoint behaving properly, not a fault to work around
 *  in the endpoint.
 *
 *  Unsetting the secret here puts the endpoint on its "not configured" path, so
 *  what this exercises is the mail and sheet legs, which is all it was ever for.
 *  The reCAPTCHA leg has its own proof: npm run check:recaptcha:live, which
 *  uses a real browser and a real token. */
delete process.env.RECAPTCHA_SECRET_KEY;

const missing = ["SMTP_USER", "SMTP_PASS", "MAIL_TO"].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`\n✗ .env is missing: ${missing.join(", ")}\n`);
  process.exit(1);
}

console.log(
  `\nThis will really send mail to ${process.env.MAIL_TO}` +
    (process.env.MAIL_CC ? ` (cc ${process.env.MAIL_CC})` : "") +
    (process.env.SHEETS_WEBHOOK_URL ? " and really write a sheet row" : "") +
    "\n(reCAPTCHA is bypassed for this run — it has its own check: npm run check:recaptcha:live)" +
    `.\nSending …`,
);

// Built inside the project so Node resolves nodemailer from ./node_modules.
const dir = await mkdtemp(path.join("node_modules", ".enh-live-"));
const outfile = path.join(dir, "enquiry.mjs");
await build({
  entryPoints: ["src/pages/api/enquiry.ts"],
  outfile,
  bundle: true,
  format: "esm",
  platform: "node",
  external: ["nodemailer"],
  alias: { "@": path.resolve("src") },
  logLevel: "silent",
});

const { POST } = await import(pathToFileURL(path.resolve(outfile)).href);

const payload = {
  formName: "TEST - website check",
  pageName: "Google Ads Agency in Dubai",
  pagePath: "/services/performance-marketing/google-ads",
  pageUrl: "https://enhmedia.com/services/performance-marketing/google-ads",
  token: null,
  action: "submit_test_website_check",
  hp: "",
  fields: [
    { id: "name", label: "Name", value: "TEST SUBMISSION - not a real enquiry" },
    { id: "email", label: "Email", value: "test@example.com" },
    { id: "phone", label: "Phone", value: "+971 50 000 0000" },
    { id: "company", label: "Company", value: "ENH internal test" },
    { id: "services", label: "Services", value: "Google Ads" },
    {
      id: "message",
      label: "Message",
      value:
        "This is an automated test of the website enquiry form, sent by " +
        "npm run check:enquiry:live. If you are reading this in the inbox, " +
        "SMTP delivery works. No action needed - safe to delete, along with " +
        'the matching "TEST - website check" row in the Google Sheet.',
    },
  ],
};

const request = new Request("https://enhmedia.com/api/enquiry", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // A realistic public IP so the captured value can be eyeballed in the sheet.
    "x-forwarded-for": "94.200.1.55, 10.0.0.1",
    "user-agent": "Mozilla/5.0 (check-enquiry-live)",
  },
  body: JSON.stringify(payload),
});

const started = Date.now();
const res = await POST({ request, clientAddress: "127.0.0.1" });
const body = await res.json();
const ms = Date.now() - started;

await rm(dir, { recursive: true, force: true });

if (res.ok && body.ok) {
  console.log(
    `\n✓ The endpoint completed in ${ms}ms.\n\n` +
      `  Check ${process.env.MAIL_TO} for a message titled\n` +
      `  "New enquiry: TEST - website check - Google Ads Agency in Dubai".\n\n` +
      "  In it, confirm:\n" +
      "    - it arrived at the To AND the Cc address\n" +
      "    - hitting Reply addresses test@example.com, not the seo@ mailbox\n" +
      '    - "Time (UAE)" reads the correct local time\n' +
      '    - "IP address" reads 94.200.1.55\n\n' +
      // The email used to carry a "Google Sheet: Row added" line. It cannot any
      // more: the sheet write and the send now run concurrently, so the email is
      // composed before the sheet's fate is known. The sheet itself is the
      // check now -- and a failure would have printed a [enquiry] line above.
      "  Then look in the sheet for the matching row, and delete both.\n",
  );
  process.exit(0);
}

console.error(`\n✗ Failed (HTTP ${res.status}) after ${ms}ms: ${body.message}\n`);
console.error("  The reason is in the [enquiry] lines above, if any.\n");
process.exit(1);

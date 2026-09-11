/** Proves the Gmail App Password works. Sends nothing.
 *
 *  `transporter.verify()` opens the real TLS connection to Gmail, runs EHLO and
 *  completes AUTH, then hangs up. No MAIL FROM, no RCPT TO, no message — so
 *  this can be run as often as you like without putting anything in anyone's
 *  inbox, which is exactly what you want while getting a credential right.
 *
 *  Reads .env from the project root. The password is never printed, and never
 *  leaves this machine except to Gmail.
 *
 *  Run: npm run check:smtp
 */

import { readFileSync } from "node:fs";
import nodemailer from "nodemailer";

/* Deliberately a tiny parser rather than a dependency: this has to run before
   anyone has set the project up properly, and `KEY=value` is all .env holds. */
function loadEnv(path = ".env") {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    console.error(`\n✗ No ${path} found.\n  Copy .env.example to .env and fill in SMTP_PASS.\n`);
    process.exit(1);
  }
  const env = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    // Strip one layer of surrounding quotes if someone added them.
    env[trimmed.slice(0, eq).trim()] = trimmed
      .slice(eq + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, "$2");
  }
  return env;
}

const env = { ...loadEnv(), ...process.env };

const user = env.SMTP_USER;
const pass = env.SMTP_PASS;
const host = env.SMTP_HOST || "smtp.gmail.com";
const port = Number(env.SMTP_PORT || "465");
const secure = (env.SMTP_SECURE ?? "true") === "true";

if (!user || !pass) {
  console.error("\n✗ SMTP_USER or SMTP_PASS is empty in .env.\n");
  process.exit(1);
}

// Gmail shows App Passwords as four groups of four. Pasted with the spaces it
// usually still works, but not always, and the failure looks identical to a
// wrong password — so say so rather than let it be debugged the hard way.
if (/\s/.test(pass)) {
  console.warn(
    "\n! SMTP_PASS contains spaces. Gmail displays the App Password as\n" +
      '  "abcd efgh ijkl mnop" but it should be stored as "abcdefghijklmnop".\n' +
      "  Trying anyway — if this fails, remove the spaces first.\n",
  );
}
if (pass.replace(/\s/g, "").length !== 16) {
  console.warn(
    `\n! SMTP_PASS is ${pass.replace(/\s/g, "").length} characters, not 16.\n` +
      "  A Gmail App Password is always 16. If you pasted your normal mailbox\n" +
      "  password, that will not work — Gmail requires an App Password here.\n",
  );
}

console.log(`\nConnecting to ${host}:${port} (${secure ? "implicit TLS" : "STARTTLS"}) as ${user} …`);

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
});

try {
  await transporter.verify();
  console.log(
    `\n✓ Gmail accepted the App Password for ${user}.\n` +
      `  Enquiries will send to ${env.MAIL_TO || "info@enhmedia.com"}` +
      `, cc ${env.MAIL_CC || "seo@enhmedia.ae"}.\n` +
      "  Nothing was sent. Add the same value to Vercel to make it work in production.\n",
  );
  process.exit(0);
} catch (error) {
  const code = error?.code ?? "";
  const response = String(error?.response ?? error?.message ?? error);

  console.error(`\n✗ Gmail refused the connection.\n  ${code} ${response}\n`);

  if (code === "EAUTH" && /Application-specific password required/i.test(response)) {
    console.error(
      "  That is your normal mailbox password. Gmail needs an App Password:\n" +
        "  Google Account -> Security -> 2-Step Verification -> App passwords.\n",
    );
  } else if (code === "EAUTH" && /Username and Password not accepted/i.test(response)) {
    console.error(
      "  Most likely one of:\n" +
        "    - the App Password was mistyped, or still has its spaces in\n" +
        `    - it was generated on a different account than ${user}\n` +
        "    - 2-Step Verification is not switched on for that account\n" +
        "    - the App Password was revoked; generate a fresh one\n",
    );
  } else if (code === "EAUTH") {
    console.error("  Authentication failed. Regenerate the App Password and try again.\n");
  } else if (code === "ETIMEDOUT" || code === "ESOCKET" || code === "ECONNECTION") {
    console.error(
      `  Could not reach ${host}:${port}. Usually a network blocking outbound SMTP.\n` +
        "  Try port 587 instead: set SMTP_PORT=587 and SMTP_SECURE=false in .env.\n",
    );
  }
  process.exit(1);
}

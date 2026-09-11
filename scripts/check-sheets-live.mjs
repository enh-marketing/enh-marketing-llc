/** Posts one clearly-marked test row to the deployed Apps Script web app.
 *
 *  This is the only check that exercises the real chain: your Vercel function
 *  will call exactly this URL, with exactly this payload shape, signed with
 *  exactly this secret. scripts/check-sheets-webhook.mjs proves the script's
 *  logic; this proves the deployment.
 *
 *  IT WRITES A REAL ROW to the live sheet. It is labelled so it cannot be
 *  mistaken for an enquiry -- Form Name reads "TEST - safe to delete" and the
 *  name and email fields say the same -- and deleting that row is all the
 *  cleanup there is.
 *
 *  Run: npm run check:sheets:live
 */

import { readFileSync } from "node:fs";

function loadEnv(path = ".env") {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    console.error(`\n✗ No ${path} found.\n`);
    process.exit(1);
  }
  const env = {};
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    env[t.slice(0, eq).trim()] = t
      .slice(eq + 1)
      .trim()
      .replace(/^(['"])(.*)\1$/, "$2");
  }
  return env;
}

const env = { ...loadEnv(), ...process.env };
const url = env.SHEETS_WEBHOOK_URL;
const secret = env.SHEETS_WEBHOOK_SECRET;

if (!url) {
  console.error(
    "\n✗ SHEETS_WEBHOOK_URL is empty in .env.\n" +
      "  Deploy scripts/google-sheets-webhook.gs as a Web App and paste its /exec URL.\n",
  );
  process.exit(1);
}
if (!secret) {
  console.error("\n✗ SHEETS_WEBHOOK_SECRET is empty in .env.\n");
  process.exit(1);
}
if (!/^https:\/\/script\.google\.com\/.*\/exec$/.test(url)) {
  console.warn(
    `\n! That does not look like an Apps Script web app URL.\n` +
      `  Expected https://script.google.com/macros/s/<id>/exec\n` +
      `  Got      ${url}\n` +
      "  A /dev URL only works while signed in as you, so it will fail from Vercel.\n",
  );
}

const stamp = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dubai",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
})
  .formatToParts(new Date())
  .reduce((a, p) => ((a[p.type] = p.value), a), {});

const row = {
  timestamp: `${stamp.year}-${stamp.month}-${stamp.day} ${stamp.hour}:${stamp.minute}:${stamp.second}`,
  timestampIso: new Date().toISOString(),
  formName: "TEST - safe to delete",
  pageName: "Connection test",
  pagePath: "/",
  pageUrl: "https://enhmedia.com/",
  ip: "0.0.0.0",
  userAgent: "check-sheets-live",
  recaptcha: "n/a",
  consent: "",
  fields: [
    { id: "name", label: "Name", value: "TEST ROW - safe to delete" },
    { id: "email", label: "Email", value: "test@example.com" },
    { id: "message", label: "Message", value: "Written by npm run check:sheets:live" },
  ],
};

console.log(`\nPosting a test row to the web app …`);

try {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret, row }),
    redirect: "follow",
  });
  const text = await res.text();

  // Apps Script answers with an HTML sign-in page when the deployment's access
  // is not set to "Anyone". That is the single most common misconfiguration,
  // and it returns HTTP 200, so it has to be detected from the body.
  if (text.trimStart().startsWith("<")) {
    console.error(
      "\n✗ The web app returned an HTML page instead of JSON.\n" +
        "  That means it is asking for a Google sign-in, so Vercel cannot reach it.\n\n" +
        "  Fix: Apps Script -> Deploy -> Manage deployments -> pencil icon\n" +
        '       set "Who has access" to Anyone, then Deploy.\n',
    );
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error(`\n✗ Unreadable reply (HTTP ${res.status}):\n  ${text.slice(0, 300)}\n`);
    process.exit(1);
  }

  if (data.ok) {
    console.log(
      "\n✓ The sheet accepted the row.\n" +
        "  Open the sheet and look at the 'Form Entries' tab — the newest row reads\n" +
        '  "TEST - safe to delete". Delete it once you have seen it.\n' +
        "  Add SHEETS_WEBHOOK_URL and SHEETS_WEBHOOK_SECRET to Vercel to enable this in production.\n",
    );
    process.exit(0);
  }

  console.error(`\n✗ The web app refused: ${data.error}\n`);
  if (/bad secret/i.test(data.error ?? "")) {
    console.error(
      "  SHEETS_WEBHOOK_SECRET in .env does not match the SECRET in the Apps Script.\n" +
        "  Note that editing the script is not enough: re-deploy it afterwards\n" +
        "  (Deploy -> Manage deployments -> pencil -> Version: New version -> Deploy),\n" +
        "  or the /exec URL keeps serving the previous version.\n",
    );
  } else if (/SECRET has not been set/i.test(data.error ?? "")) {
    console.error(
      "  The pasted script still has its CHANGE-ME placeholder. Paste the copy at\n" +
        "  .env.apps-script.gs, which already has the right secret in it.\n",
    );
  }
  process.exit(1);
} catch (error) {
  console.error(`\n✗ Could not reach the web app.\n  ${error instanceof Error ? error.message : error}\n`);
  process.exit(1);
}

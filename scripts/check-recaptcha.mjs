/** Sanity-checks the reCAPTCHA v3 keys in .env. Shape only, and it says so.
 *
 *  WHAT THIS DELIBERATELY DOES NOT DO, AND WHY. An earlier version of this file
 *  claimed to verify the secret key by sending a junk token and reading which
 *  error came back, on the theory that "invalid-input-response" meant the
 *  secret had been accepted and only the token rejected. That theory is wrong.
 *  Measured against the real endpoint, siteverify validates the token FIRST and
 *  never looks at the secret:
 *
 *    secret "6LcAAA…" (40 chars, fake) -> {"error-codes":["invalid-input-response"]}
 *    secret "totally-not-a-key"        -> {"error-codes":["invalid-input-response"]}
 *    secret ""            (empty!)     -> {"error-codes":["invalid-input-response"]}
 *
 *  All three "passed". A check that green-lights an empty secret is worse than
 *  no check, so it is gone.
 *
 *  A reCAPTCHA secret can only be proven with a real token, and a real token
 *  can only come from a real browser running Google's script against the
 *  matching site key. That is a browser job, not a script job -- so what is
 *  left here is the shape checking, which does catch the mistakes people
 *  actually make: pasting the site key into the secret slot, pasting a v2 key,
 *  or pasting one key into both.
 *
 *  Run: npm run check:recaptcha
 */

import { readFileSync } from "node:fs";

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

const env = { ...loadEnv(), ...process.env };
const site = env.PUBLIC_RECAPTCHA_SITE_KEY;
const secret = env.RECAPTCHA_SECRET_KEY;

let bad = 0;
const fail = (msg) => {
  bad += 1;
  console.error(`✗ ${msg}`);
};

console.log("");

/* ------------------------------------------------------------- site key */

if (!site) {
  fail("PUBLIC_RECAPTCHA_SITE_KEY is empty in .env.");
} else if (!/^6L[\w-]{30,}$/.test(site)) {
  fail(
    `PUBLIC_RECAPTCHA_SITE_KEY does not look like a reCAPTCHA key.\n` +
      `  Expected something starting "6L", about 40 characters. Got ${site.length} characters.`,
  );
} else {
  console.log(`✓ Site key looks well formed (${site.slice(0, 6)}…, ${site.length} chars).`);
}

if (site && secret && site === secret) {
  fail("The site key and secret key are identical. They are two different keys — recheck which is which.");
}

/* ----------------------------------------------------------- secret key */

if (!secret) {
  fail("RECAPTCHA_SECRET_KEY is empty in .env.");
} else if (!/^6L[\w-]{30,}$/.test(secret)) {
  fail(
    `RECAPTCHA_SECRET_KEY does not look like a reCAPTCHA key.\n` +
      `  Expected something starting "6L", about 40 characters. Got ${secret.length} characters.`,
  );
} else {
  console.log(`✓ Secret key looks well formed (${secret.slice(0, 6)}…, ${secret.length} chars).`);
  console.log(
    "  Not proven, though: see the note at the top of this file. Only a real\n" +
      "  token from a real browser can prove a secret, and this script has no\n" +
      "  browser. Submit a form once the keys are in and read the sheet's\n" +
      "  reCAPTCHA column — a number there is the proof.",
  );
}

/* -------------------------------------------------------------- threshold */

const min = Number(env.RECAPTCHA_MIN_SCORE ?? "0.5");
if (Number.isNaN(min) || min < 0 || min > 1) {
  fail(`RECAPTCHA_MIN_SCORE must be between 0.0 and 1.0. Got "${env.RECAPTCHA_MIN_SCORE}".`);
} else if (min > 0.7) {
  console.log(
    `! RECAPTCHA_MIN_SCORE is ${min}, which is strict. Every step above 0.5 also\n` +
      "  turns away real people on VPNs, privacy browsers and corporate networks.",
  );
} else {
  console.log(`✓ Score threshold ${min} (Google's own default is 0.5).`);
}

if (bad === 0) {
  console.log(
    "\nBoth keys are good.\n\n" +
      "  Remember the site key is baked into the JavaScript AT BUILD TIME, so in\n" +
      "  production it must be set in Vercel BEFORE the build that ships it, and\n" +
      "  changing it later needs a redeploy. The secret key is read at request\n" +
      "  time and takes effect as soon as it is set.\n",
  );
  process.exit(0);
}
console.error(`\n${bad} problem(s) above.\n`);
process.exit(1);

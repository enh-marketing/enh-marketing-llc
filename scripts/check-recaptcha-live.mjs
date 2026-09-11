/** Proves the reCAPTCHA v3 keys for real, with a browser and no side effects.
 *
 *  WHY A SERVER AND A PAGE. A reCAPTCHA secret can only be proven by verifying
 *  a genuine token, and a genuine token can only be minted by Google's own
 *  script running in a browser on a registered domain. There is no offline
 *  shortcut -- see the note at the top of scripts/check-recaptcha.mjs for the
 *  measured proof that siteverify will happily accept an EMPTY secret when the
 *  token is junk.
 *
 *  So this serves one page on localhost (which is in the reCAPTCHA domain list
 *  precisely for this). The page loads Google's script with the SITE key and
 *  mints a real token; it posts that token back here; this process verifies it
 *  against the SECRET key and prints the score.
 *
 *  It sends no email and writes no sheet row. It does not touch the enquiry
 *  endpoint at all -- it isolates the reCAPTCHA leg so a failure here can only
 *  mean the keys.
 *
 *  Run: npm run check:recaptcha:live   then open the URL it prints.
 */

import http from "node:http";
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
const min = Number(env.RECAPTCHA_MIN_SCORE ?? "0.5");

if (!site || !secret) {
  console.error("\n✗ PUBLIC_RECAPTCHA_SITE_KEY / RECAPTCHA_SECRET_KEY missing from .env.\n");
  process.exit(1);
}

const ACTION = "submit_cta_band"; // what LeadForm on a service page really sends
let done = false;

const PAGE = `<!doctype html>
<meta charset="utf-8">
<title>reCAPTCHA key check</title>
<style>
  body{font:15px/1.6 system-ui,sans-serif;max-width:44rem;margin:4rem auto;padding:0 1.5rem;color:#141414}
  pre{background:#f4f3f2;padding:1rem;border-radius:6px;overflow:auto;white-space:pre-wrap}
  .ok{color:#0a7d33;font-weight:700} .bad{color:#b30009;font-weight:700}
</style>
<h1>reCAPTCHA key check</h1>
<p id="status">Loading Google's script…</p>
<pre id="out"></pre>
<script src="https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(site)}"></script>
<script>
  const status = document.getElementById('status');
  const out = document.getElementById('out');
  function show(cls, msg, detail) {
    status.className = cls;
    status.textContent = msg;
    if (detail) out.textContent = JSON.stringify(detail, null, 2);
  }
  if (!window.grecaptcha) {
    show('bad', "Google's script did not load. An extension or network is blocking it.");
  } else {
    grecaptcha.ready(function () {
      status.textContent = 'Minting a token…';
      grecaptcha.execute(${JSON.stringify(site)}, { action: ${JSON.stringify(ACTION)} })
        .then(function (token) {
          status.textContent = 'Token minted. Verifying server-side…';
          return fetch('/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
          });
        })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          show(d.pass ? 'ok' : 'bad', d.summary, d.google);
        })
        .catch(function (e) {
          show('bad', 'Could not mint a token: ' + e, { hint: 'Is localhost in the reCAPTCHA domain list, and is this a v3 (score based) key?' });
        });
    });
  }
</script>`;

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/verify") {
    let body = "";
    req.on("data", (c) => (body += c));
    await new Promise((r) => req.on("end", r));
    const { token } = JSON.parse(body || "{}");

    const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token ?? "" }),
    });
    const google = await verify.json();
    const codes = google["error-codes"] ?? [];

    let pass = false;
    let summary;
    if (google.success) {
      const scoreOk = typeof google.score === "number" && google.score >= min;
      const actionOk = !google.action || google.action === ACTION;
      pass = scoreOk && actionOk;
      summary = pass
        ? `PASS - Google verified the token. Score ${google.score} (threshold ${min}), action "${google.action}".`
        : !scoreOk
          ? `Verified, but score ${google.score} is below your threshold of ${min}.`
          : `Verified, but the action came back as "${google.action}" rather than "${ACTION}".`;
    } else if (codes.includes("invalid-input-secret")) {
      summary = "FAIL - Google rejected the SECRET key. Check RECAPTCHA_SECRET_KEY in .env.";
    } else if (codes.includes("timeout-or-duplicate")) {
      summary = "FAIL - token already used or expired. Reload the page for a fresh one.";
    } else {
      summary = `FAIL - ${codes.join(", ") || "no reason given"}`;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ pass, summary, google }));

    console.log(`\n${pass ? "✓" : "✗"} ${summary}`);
    console.log(`  Google said: ${JSON.stringify(google)}\n`);
    if (!done) {
      done = true;
      setTimeout(() => {
        server.close();
        process.exit(pass ? 0 : 1);
      }, 400);
    }
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end(PAGE);
});

server.listen(4336, () => {
  console.log(
    `\nServing the key check at http://localhost:4336/` +
      `\n  Site key ${site.slice(0, 8)}…  action "${ACTION}"  threshold ${min}` +
      `\n  Open that URL; the result prints here and on the page.\n`,
  );
});

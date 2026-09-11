/** Post-deploy smoke test. Proves the forms work on the deployed site.
 *
 *  Sends no email and writes no sheet row: it asks the deployed endpoint for a
 *  rejection rather than an acceptance, which is enough to prove the whole
 *  chain is wired without putting anything in anyone's inbox.
 *
 *  WHAT IT ACTUALLY PROVES
 *
 *    1. The site key reached the BROWSER bundle. PUBLIC_RECAPTCHA_SITE_KEY is
 *       inlined by Vite at build time, so it is only in the JavaScript if it
 *       was set in Vercel BEFORE that build ran. Set it afterwards and every
 *       form silently fails with no token. This catches exactly that.
 *    2. /api/enquiry exists and runs. A static host would 404 or 405 it.
 *    3. The reCAPTCHA SECRET is set at runtime, because a tokenless POST comes
 *       back 403 rather than 200. If the secret were missing the endpoint would
 *       take its "not configured" path and cheerfully send mail, so a 200 here
 *       is a failure, not a success.
 *
 *  Run: npm run check:live                 (defaults to the Vercel URL)
 *       npm run check:live -- https://…    (any deployment)
 */

const DEFAULT_ORIGIN = "https://enh-marketing-llc.vercel.app";
const origin = (process.argv[2] ?? DEFAULT_ORIGIN).replace(/\/$/, "");

let bad = 0;
const ok = (m) => console.log(`  ✓ ${m}`);
const no = (m, d = "") => {
  bad += 1;
  console.log(`  ✗ ${m}${d ? `\n      ${d}` : ""}`);
};

console.log(`\nChecking ${origin}\n`);

/* --------------------------------------------- 1. the page and its bundles */

const pageRes = await fetch(`${origin}/`, { redirect: "follow" });
const html = await pageRes.text();

if (!pageRes.ok) {
  no(`the site did not load (HTTP ${pageRes.status})`);
  if (pageRes.status === 401 || html.includes("Authentication Required")) {
    console.log(
      "      Vercel Deployment Protection is on for this URL. Either check the\n" +
        "      production URL instead, or disable protection for this deployment.",
    );
  }
  process.exit(1);
}
ok(`the site loads (HTTP ${pageRes.status})`);

/** Astro hydrates islands through `component-url` / `renderer-url` attributes
 *  rather than plain <script src>, and Vercel appends a `?dpl=…` cache-busting
 *  parameter to each. Matching only `src="…"` finds nothing at all, which looks
 *  exactly like "wrong site" — so match the attributes Astro actually emits and
 *  drop the query string. */
const bundlePaths = (text) => {
  const out = [];
  // As the HTML writes them: absolute, sometimes with Vercel's ?dpl= suffix.
  for (const m of text.matchAll(/["'(](\/_astro\/[^"')\s]+?\.js)(?:\?[^"')\s]*)?["')]/g)) {
    out.push(m[1]);
  }
  // As the chunks write them to each other: RELATIVE. Missing this is what made
  // an earlier version of this check walk five files, find nothing, and report
  // a missing site key on a perfectly good deployment -- the form code lives
  // several hops down the import graph, reached only by `from"./x.hash.js"`.
  for (const m of text.matchAll(/["'(]\.\/([\w.-]+\.js)(?:\?[^"')\s]*)?["')]/g)) {
    out.push(`/_astro/${m[1]}`);
  }
  return out;
};

const entry = [...new Set(bundlePaths(html))];
if (entry.length === 0) {
  no("found no /_astro/*.js bundles in the page — is this the right site?");
} else {
  ok(`found ${entry.length} island bundle(s)`);
}

/* ------------------------------------------- 2. the site key in the bundle */

/** The forms live in chunks the island bundles import, not in the island
 *  bundles themselves, so one level of following is needed. */
let foundKey = null;
const seen = new Set();
const queue = [...entry];

while (queue.length && !foundKey) {
  const src = queue.shift();
  if (seen.has(src)) continue;
  seen.add(src);

  const js = await fetch(`${origin}${src}`).then((r) => (r.ok ? r.text() : ""));
  const m = js.match(/6L[\w-]{36,40}/);
  if (m) {
    foundKey = m[0];
    break;
  }
  if (seen.size < 400) for (const next of bundlePaths(js)) if (!seen.has(next)) queue.push(next);
}

if (foundKey) {
  ok(`the reCAPTCHA site key is in the deployed JavaScript (${foundKey.slice(0, 8)}…)`);
} else {
  no(
    "NO reCAPTCHA site key in the deployed JavaScript.",
    "PUBLIC_RECAPTCHA_SITE_KEY is inlined at BUILD time. If you set it in Vercel\n" +
      "      after the last deploy, it is not in this build. Redeploy to bake it in —\n" +
      "      until then every form submission will be rejected with a 403.",
  );
}

/* ----------------------------------------------------- 3. the endpoint */

const probe = await fetch(`${origin}/api/enquiry`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    formName: "deploy check",
    pageName: "deploy check",
    pagePath: "/",
    pageUrl: `${origin}/`,
    fields: [
      { id: "name", label: "Name", value: "deploy check" },
      // A syntactically valid address that is reserved by RFC 2606 and can
      // never receive mail, so this cannot reach a real person even if the
      // reCAPTCHA gate were somehow open.
      { id: "email", label: "Email", value: "deploy-check@example.invalid" },
    ],
    token: null,
    action: "deploy_check",
    hp: "",
  }),
});

const body = await probe.json().catch(() => null);

if (probe.status === 404 || probe.status === 405) {
  no(
    `/api/enquiry answered ${probe.status} — the function is not deployed.`,
    "The Vercel adapter must be in astro.config.mjs and the build must emit\n      .vercel/output/functions/_render.func.",
  );
} else if (probe.status === 403) {
  ok("/api/enquiry is live and REJECTED a tokenless post (the secret is set)");
} else if (probe.status === 200 && body?.ok) {
  no(
    "/api/enquiry ACCEPTED a post with no reCAPTCHA token.",
    "That means RECAPTCHA_SECRET_KEY is not set in this environment, so the\n" +
      "      endpoint is on its 'not configured' path and anyone can post to it.\n" +
      "      An email has just been sent — check the inbox and delete it.",
  );
} else if (probe.status === 500) {
  no("/api/enquiry returned 500 — SMTP_USER / SMTP_PASS are probably missing in Vercel.");
} else {
  no(`/api/enquiry answered an unexpected ${probe.status}`, JSON.stringify(body));
}

console.log(
  bad === 0
    ? "\nAll good. The deployed site can take enquiries.\n"
    : `\n${bad} problem(s) above.\n`,
);
process.exit(bad === 0 ? 0 : 1);

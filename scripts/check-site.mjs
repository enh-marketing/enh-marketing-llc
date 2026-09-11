/** Crawls the built output and reports internal links and assets that 404.
 *
 *  WHY THIS EXISTS. The 2026-09-11 URL flattening rewrote route strings with a
 *  regex, and the regex required a quote or a paren in front of the path. Two
 *  whole classes of reference slipped through, and both shipped:
 *
 *    - A path inside a BACKTICK has no quote before it, so
 *      `/insights/${note.slug}` was never rewritten. Four of those survived.
 *      The two that mattered were invisible in a browser: the canonical on all
 *      seventy-three blog posts, and every post URL in sitemap.xml.
 *    - Image paths were rewritten as if they were routes -- every blog hero
 *      became /blog/<slug>/hero.webp -- while the files stayed in
 *      public/insights/. Ninety-four images 404'd.
 *
 *  Neither showed up in `astro check` or the build, because neither is a type
 *  error and Astro does not resolve href strings. Only a crawl finds them.
 *
 *  Run AFTER `npm run build`:  npm run check:site
 */

import fs from "node:fs";
import path from "node:path";

const STATIC = ".vercel/output/static";
const CONFIG = ".vercel/output/config.json";

if (!fs.existsSync(STATIC)) {
  console.error(`\n✗ No build found at ${STATIC}. Run \`npm run build\` first.\n`);
  process.exit(1);
}

/** Every route that serves a page. */
const pages = new Set();
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") pages.add(dir.slice(STATIC.length) || "/");
  }
})(STATIC);

/** Redirect sources 301 rather than 404, so they are valid link targets. */
const routes = JSON.parse(fs.readFileSync(CONFIG, "utf8")).routes ?? [];
const redirects = routes
  .filter((r) => r.status >= 300 && r.status < 400 && r.src)
  .map((r) => new RegExp(r.src));

const ATTR = /(?:href|src|srcset|content)="([^"]+)"/g;
const ASSET = /\.(webp|png|jpe?g|svg|ico|mp4|woff2?|css|js|json|xml|txt|avif|gif|pdf)$/i;

const badAssets = new Map();
const badLinks = new Map();
let checked = 0;

for (const page of pages) {
  const file = path.join(STATIC, page === "/" ? "" : page, "index.html");
  if (!fs.existsSync(file)) continue;
  checked += 1;
  const doc = fs.readFileSync(file, "utf8");

  for (const m of doc.matchAll(ATTR)) {
    // srcset holds a comma-separated list of "url descriptor" pairs.
    for (const part of m[1].split(",")) {
      const raw = part.trim().split(/\s+/)[0];
      if (!raw?.startsWith("/") || raw.startsWith("//")) continue;

      const url = raw.split("#")[0].split("?")[0];
      if (!url) continue;
      const clean = url.replace(/\/$/, "") || "/";

      if (fs.existsSync(path.join(STATIC, url)) && fs.statSync(path.join(STATIC, url)).isFile()) continue;
      if (pages.has(clean)) continue;
      if (redirects.some((re) => re.test(url) || re.test(clean))) continue;

      const bucket = ASSET.test(url) ? badAssets : badLinks;
      if (!bucket.has(url)) bucket.set(url, new Set());
      bucket.get(url).add(page);
    }
  }
}

const report = (title, map) => {
  console.log(`\n${title}: ${map.size}`);
  for (const [url, on] of [...map].sort((a, b) => b[1].size - a[1].size).slice(0, 20)) {
    console.log(`  ${url}\n      on ${on.size} page(s), e.g. ${[...on].slice(0, 2).join(", ")}`);
  }
  if (map.size > 20) console.log(`  … and ${map.size - 20} more`);
};

console.log(`\nCrawled ${checked} built pages.`);

if (badAssets.size === 0 && badLinks.size === 0) {
  console.log("\n✓ No broken internal links and no broken assets.\n");
  process.exit(0);
}

if (badAssets.size) report("BROKEN ASSETS", badAssets);
if (badLinks.size) report("BROKEN INTERNAL LINKS", badLinks);
console.log("");
process.exit(1);

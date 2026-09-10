#!/usr/bin/env node
/** The homepage's Craft cards each offer a "Know More" into their service
 *  pillar. The section guards every href with `routeExists`, which means a
 *  MISTYPED path does not throw or 404 -- it silently renders no link, and a
 *  card quietly loses its only way in. That is the failure this catches.
 *
 *  Asserts, for every craft that declares an href:
 *    · the path appears as a node in src/lib/sitemap.ts
 *    · the path is listed in BUILT, so `routeExists` will actually pass and the
 *      link will render
 *
 *  Run by `npm run check:craft-links`. */
import { readFileSync } from "node:fs";

const content = readFileSync("src/lib/content.ts", "utf8");
const sitemap = readFileSync("src/lib/sitemap.ts", "utf8");

const crafts = content.slice(
  content.indexOf("export const crafts"),
  content.indexOf("// THE CASE STUDIES MOVED"),
);
const hrefs = [...crafts.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]);
const titles = [...crafts.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);

if (hrefs.length === 0) {
  console.error("check:craft-links: no craft hrefs found in src/lib/content.ts");
  process.exit(1);
}

const built = new Set(
  [...sitemap.slice(sitemap.indexOf("const BUILT = new Set([")).matchAll(/"(\/[^"]*)"/g)].map(
    (m) => m[1],
  ),
);

let failed = 0;
for (const href of hrefs) {
  const inSitemap = sitemap.includes(`href: "${href}"`);
  const inBuilt = built.has(href);
  if (!inSitemap) {
    console.error(`  FAIL ${href}: not a node in src/lib/sitemap.ts (link would silently vanish)`);
    failed++;
  } else if (!inBuilt) {
    console.error(`  FAIL ${href}: in the sitemap but not in BUILT, so routeExists() is false`);
    failed++;
  } else {
    console.log(`  ok   ${href}`);
  }
}

const linked = hrefs.length;
console.log(
  `check:craft-links: ${linked} of ${titles.length} cards carry a link` +
    (linked < titles.length ? ` (${titles.length - linked} deliberately without one)` : ""),
);
if (failed) {
  console.error(`check:craft-links: ${failed} broken.`);
  process.exit(1);
}

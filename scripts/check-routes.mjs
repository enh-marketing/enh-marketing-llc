/** Fails if sitemap.ts's BUILT set and the real routes under src/app drift.
 *
 *  BUILT is what turns a sitemap node from inert text back into a link, so a
 *  stale entry either ships a link to a 404 (entry with no page) or hides a
 *  page that exists (page with no entry). Both are silent in the browser,
 *  which is why this is a build check rather than a comment. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PAGES = "src/pages";

/** Every .astro page under src/pages, as the URL it serves.
 *
 *  Astro routes by filename rather than by a `page.tsx` inside a named folder,
 *  so `index.astro` is the directory itself and `foo.astro` is `/foo`. Files
 *  and folders starting with "_" are excluded from routing by Astro, so they
 *  are skipped here too. */
function routes(dir = PAGES, url = "") {
  const found = [];
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith("_")) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      found.push(...routes(path, `${url}/${entry}`));
    } else if (entry.endsWith(".astro")) {
      const name = entry.slice(0, -".astro".length);
      const route = name === "index" ? url : `${url}/${name}`;
      found.push(route === "" ? "/" : route);
    }
  }
  return found;
}

const built = new Set(
  (readFileSync("src/lib/sitemap.ts", "utf8").match(/const BUILT = new Set\(\[([^\]]*)\]/s)?.[1] ?? "")
    .split("\n")
    .map((line) => line.match(/"([^"]+)"/)?.[1])
    .filter(Boolean),
);

const real = new Set(routes());
const missingPage = [...built].filter((r) => !real.has(r));
const missingEntry = [...real].filter((r) => !built.has(r));

for (const r of missingPage) console.error(`BUILT lists ${r}, but no page.tsx serves it.`);
for (const r of missingEntry) console.error(`${r} exists, but BUILT does not list it, so its menu links stay inert.`);

if (missingPage.length || missingEntry.length) {
  console.error(`\ncheck:routes failed. Reconcile BUILT in src/lib/sitemap.ts.`);
  process.exit(1);
}
console.log(`check:routes: ${real.size} routes, all listed in BUILT.`);

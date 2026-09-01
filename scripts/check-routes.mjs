/** Fails if sitemap.ts's BUILT set and the real routes under src/app drift.
 *
 *  BUILT is what turns a sitemap node from inert text back into a link, so a
 *  stale entry either ships a link to a 404 (entry with no page) or hides a
 *  page that exists (page with no entry). Both are silent in the browser,
 *  which is why this is a build check rather than a comment. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const APP = "src/app";

/** Every page.tsx under src/app, as the URL it serves. Route groups ("(x)")
 *  and private folders ("_x") contribute no path segment. */
function routes(dir = APP, url = "") {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      const segment = entry.startsWith("(") || entry.startsWith("_") ? "" : `/${entry}`;
      found.push(...routes(path, url + segment));
    } else if (entry === "page.tsx") {
      found.push(url === "" ? "/" : url);
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

/** Fails if sitemap.ts's BUILT set and the real routes under src/pages drift.
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

const found = routes();

/** A route with a [param] segment serves many URLs, and BUILT cannot list any
 *  of them.
 *
 *  BUILT is the set of IA nodes that resolve — it exists so sitemap.ts knows
 *  which menu entries and cross-links may render as links. `/insights/[slug]`
 *  is not an IA node: it serves the articles, which are content, and no menu
 *  or breadcrumb ever points at one. Comparing it against BUILT would demand a
 *  literal "/insights/[slug]" entry, and then isPending() would answer
 *  questions about a path no page ever serves.
 *
 *  WHAT IS CHECKED INSTEAD is the thing that can actually break: a dynamic
 *  route is only reachable through the collection page that links to it, so
 *  its parent has to be a real, built route. A /insights/[slug] beside an
 *  unbuilt /insights is a set of pages nothing on the site can reach. */
const dynamic = found.filter((r) => r.includes("["));
const real = new Set(found.filter((r) => !r.includes("[")));

const missingPage = [...built].filter((r) => !real.has(r));
const missingEntry = [...real].filter((r) => !built.has(r));
const orphanDynamic = dynamic.filter((r) => {
  const parent = r.slice(0, r.lastIndexOf("/")) || "/";
  return !built.has(parent);
});

for (const r of missingPage) console.error(`BUILT lists ${r}, but no page serves it.`);
for (const r of missingEntry) console.error(`${r} exists, but BUILT does not list it, so its menu links stay inert.`);
for (const r of orphanDynamic)
  console.error(
    `${r} is a dynamic route, but its parent collection is not in BUILT, so nothing on the site can link to it.`,
  );

if (missingPage.length || missingEntry.length || orphanDynamic.length) {
  console.error(`\ncheck:routes failed. Reconcile BUILT in src/lib/sitemap.ts.`);
  process.exit(1);
}
console.log(
  `check:routes: ${real.size} static routes, all listed in BUILT` +
    (dynamic.length ? `; ${dynamic.length} dynamic (${dynamic.join(", ")}), parents built.` : "."),
);

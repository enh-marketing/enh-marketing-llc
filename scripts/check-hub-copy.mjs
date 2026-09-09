/** Fails if anything the AI Hub landing page quotes has drifted from its source.
 *
 *  The landing page has no copy of its own. Every category title is the label
 *  that src/lib/sitemap.ts already gives that page, and every category body is
 *  that service's own `meta.description`. A beat opts in by carrying
 *  `quotes: "<service slug>"`, and this checks both halves of it.
 *
 *  WHY THIS IS A SCRIPT AND NOT AN IMPORT. src/content/ai-hub.ts used to import
 *  `meta` from the service files, which is the obvious way to guarantee the two
 *  never disagree. It also pulled each service's entire content file into the
 *  landing page's client bundle: 12.9 KB of eagerly loaded copy, measured, to
 *  render a single sentence, and roughly eight times that once every category
 *  is on the page. So the strings are literals there and this reads both files
 *  as text instead. Same guarantee, none of the weight.
 *
 *  Titles are compared against the sitemap label with any trailing parenthesis
 *  removed, so "AI Search Visibility (AEO & GEO)" in the navigation is allowed
 *  to be "AI Search Visibility" as a display title, and nothing else is. */
import { readdirSync, readFileSync } from "node:fs";

/** Every AI Hub content file: the drawn page's and the film version's, and
 *  anything added beside them later. Found rather than named, so a new version
 *  of the page cannot quietly ship copy that nothing checks. */
const CONTENT = "src/content";
const HUBS = readdirSync(CONTENT)
  .filter((f) => /^ai-hub.*\.ts$/.test(f))
  .map((f) => `${CONTENT}/${f}`);
const SITEMAP = "src/lib/sitemap.ts";

/** The navigation's own name for each AI Hub page, by slug. */
const labels = new Map(
  [...readFileSync(SITEMAP, "utf8").matchAll(/\{\s*label:\s*"([^"]+)",\s*href:\s*"\/ai-hub\/([^"]+)"\s*\}/g)]
    .map(([, label, slug]) => [slug, label]),
);

/* Beat object literals that name a source. None of them nest braces, so the
   no-inner-brace match is enough to keep one beat from swallowing the next. */
const beats = HUBS.flatMap((file) =>
  [...readFileSync(file, "utf8").matchAll(/\{[^{}]*\bquotes:\s*"([^"]+)"[^{}]*\}/g)].map(
    (m) => [m[0], m[1], file],
  ),
);

if (beats.length === 0) {
  console.log("check:copy: no quoted lines to check.");
  process.exit(0);
}

const problems = [];
const read = (block, key) => block.match(new RegExp(`\\b${key}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`))?.[1];

for (const [block, slug, file] of beats) {
  const path = `src/content/services/${slug}.ts`;
  let service;
  try {
    service = readFileSync(path, "utf8");
  } catch {
    problems.push(`${slug}: no such service file at ${path}.`);
    continue;
  }

  const compare = (what, mine, theirs, where) => {
    if (mine === undefined) problems.push(`${slug}: beat quotes a service but has no ${what}.`);
    else if (theirs === undefined) problems.push(`${slug}: could not read the ${what} from ${where}.`);
    else if (mine !== theirs) {
      problems.push(
        `${slug}: the hub and ${where} disagree on the ${what}.\n` +
          `    source: ${theirs}\n` +
          `    hub:    ${mine}\n` +
          `    Fix ${file} to match, or the change was not meant to reach the hub.`,
      );
    }
  };

  compare("title", read(block, "title"), labels.get(slug)?.replace(/\s*\([^)]*\)\s*$/, ""), SITEMAP);

  compare(
    "description",
    read(block, "body"),
    read(service.match(/export const meta = \{[\s\S]*?\n\};/)?.[0] ?? "", "description"),
    path,
  );

  const href = read(block, "href");
  if (href !== `/ai-hub/${slug}`) {
    problems.push(`${slug}: href is ${href ?? "missing"}, which does not lead to the page it quotes.`);
  }

  /* AND THE SUB-SERVICES, which are the newest thing quoted here and the most
     likely to drift. The pillar names what each category actually contains, in
     that service's own words, and a service page renaming or dropping one of
     its offerings would otherwise leave the hub advertising something that no
     longer exists.
     A CONTAINMENT CHECK RATHER THAN A LIST COMPARISON. The eight service files
     do not agree on where their offerings live: five call the export `services`
     and the rest call it `produce`, `covers` or `formats`, and the item types
     differ too. What they do share is that every offering is a `title:` field.
     So each string is required to appear as one, which is what makes the claim
     true, without this script having to know eight different shapes. It does
     not check the reverse, that the hub lists all of them: showing a subset is
     an editorial choice and showing something that is not offered is a lie. */
  const listed = block.match(/subServices:\s*\[([\s\S]*?)\]/)?.[1];
  if (listed !== undefined) {
    const mine = [...listed.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
    if (mine.length === 0) problems.push(`${slug}: subServices is present but empty.`);
    for (const name of mine) {
      const asTitle = new RegExp(`title:\\s*"${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`);
      if (!asTitle.test(service)) {
        problems.push(
          `${slug}: the hub lists a sub-service ${path} does not offer.\n` +
            `    hub: ${name}\n` +
            `    It is not a \`title\` in that file. Either the service page renamed it, or the\n` +
            `    hub has it wrong. The hub does not get to name work the service does not.`,
        );
      }
    }
  }
}

if (problems.length) {
  console.error(`check:copy: ${problems.length} problem(s).\n  ${problems.join("\n  ")}`);
  process.exit(1);
}

console.log(
  `check:copy: ${beats.length} quoted categor(ies) across ${HUBS.length} file(s), all verbatim.`,
);

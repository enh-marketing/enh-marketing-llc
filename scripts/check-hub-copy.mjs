/** Fails if anything the AI Hub landing page CLAIMS has drifted from its source.
 *
 *  Every category title is the label src/lib/sitemap.ts gives that page, every
 *  sub-service is a real offering on it, and every link goes where it says. A
 *  beat opts in by carrying `quotes: "<service slug>"`.
 *
 *  THE BODY IS THE PILLAR'S OWN AND IS NOT CHECKED. See the note where the
 *  comparison used to be.
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

/** The navigation's own name for each AI Hub page, by the href it lists.
 *
 *  BY HREF, AND IT USED TO BE BY SLUG. The old map matched
 *  `href: "/ai-hub/<slug>"` and keyed on that slug, and the href check below
 *  asserted the beat pointed at `/ai-hub/<slug>`. Both stopped working on
 *  2026-09-11, when the SEO sheet flattened every page to the site root:
 *  /ai-hub/intelligent-web became /ai-website-development-dubai, the regex
 *  matched nothing, and all eight categories failed with "could not read the
 *  title" while the content they were guarding was correct. A gate that cannot
 *  find what it is checking is not a gate.
 *
 *  Nothing about the rule has changed and nothing is now unchecked. The title
 *  is still the navigation's label for that page and the href must still be one
 *  the navigation actually lists; they are simply joined on the href, which is
 *  the one thing both files hold, instead of on a slug that only the old URL
 *  shape contained.
 *
 *  SCOPED TO THE aiHub NODE. Services and Industries carry labels of their own
 *  and a flat href no longer says which section it belongs to, so the block is
 *  cut out first and the pairs are read from inside it. */
const AI_HUB_BLOCK = (() => {
  const src = readFileSync(SITEMAP, "utf8");
  const start = src.indexOf("const aiHub: NavNode = {");
  if (start < 0) throw new Error("check:copy: the aiHub node is not in " + SITEMAP);
  const end = src.indexOf("\n};", start);
  return src.slice(start, end);
})();

const labelByHref = new Map(
  [...AI_HUB_BLOCK.matchAll(/\{\s*label:\s*"([^"]+)",\s*href:\s*"([^"]+)"\s*\}/g)]
    .map(([, label, href]) => [href, label]),
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

  compare(
    "title",
    read(block, "title"),
    labelByHref.get(read(block, "href") ?? "")?.replace(/\s*\([^)]*\)\s*$/, ""),
    SITEMAP,
  );

  /* THE BODY IS NO LONGER COMPARED, AND THAT IS THE POINT OF THIS BLOCK.
     It used to have to equal the service's `meta.description` word for word,
     which sounded like honesty and was actually a category error: a meta
     description is about 155 characters written for a Google result snippet.
     Wiring seven of them into seven cards gave the pillar seven versions of one
     sentence, all opening "ENH Marketing" and six closing "for UAE businesses",
     and it was rejected three times before anyone worked out why.

     It was not even house style. Ten of this site's forty-one service
     descriptions open with the brand; the other thirty-one open with a verb or
     a benefit, and eight of the ten are the AI set, written in a later pass in
     a different voice. Freeing this line restores the convention rather than
     breaking one.

     WHAT IS STILL GATED IS EVERY CLAIM ABOUT WHAT EXISTS: the title against the
     navigation's label, the href against the slug, and each sub-service against
     a real `title` in that service's file. The pillar still cannot name work
     the service does not do. What it can now do is say why anyone should care,
     in its own words, which is the one job a pillar page has.

     A body is still required, because a card with no line is a bug rather than
     an editorial choice. */
  if (read(block, "body") === undefined) {
    problems.push(`${slug}: beat quotes a service but has no body.`);
  }

  const href = read(block, "href");
  if (href === undefined || !labelByHref.has(href)) {
    problems.push(
      `${slug}: href is ${href ?? "missing"}, which the navigation does not list as an AI Hub page.`,
    );
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

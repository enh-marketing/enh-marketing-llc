#!/usr/bin/env node
/** The homepage's Industries section quotes each industry page's own
 *  meta.description. It COPIES rather than imports, because importing five
 *  content modules would pull their figures, FAQs and drawings into the
 *  homepage island for one sentence each -- so the two can drift, and this is
 *  what stops them.
 *
 *  Checks, per sector:
 *    · the quoted `description` is character-for-character the page's own
 *      `meta.description`
 *    · the `mark` phrase is a contiguous substring of it, or the emphasis
 *      would silently render as plain text
 *
 *  Run by `npm run check:industry-copy`. */
import { readFileSync } from "node:fs";

const home = readFileSync("src/lib/content.ts", "utf8");
const block = home.slice(home.indexOf("export const industries = {"));
const entries = [
  ...block.matchAll(
    /"(\/industries\/[a-z-]+)":\s*\{\s*description:\s*\n?\s*"((?:[^"\\]|\\.)*)",\s*mark:\s*\n?\s*"((?:[^"\\]|\\.)*)",/g,
  ),
].map(([, href, description, mark]) => ({
  href,
  description: description.replace(/\\"/g, '"'),
  mark: mark.replace(/\\"/g, '"'),
}));

if (entries.length === 0) {
  console.error("check:industry-copy: found no quoted sectors in src/lib/content.ts");
  process.exit(1);
}

let failed = 0;
for (const { href, description, mark } of entries) {
  const slug = href.replace("/industries/", "");
  const src = readFileSync(`src/content/industries/${slug}.ts`, "utf8");
  const m = src.match(/export const meta = \{[\s\S]*?description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/);
  if (!m) {
    console.error(`  FAIL ${slug}: no meta.description in src/content/industries/${slug}.ts`);
    failed++;
    continue;
  }
  const source = m[1].replace(/\\"/g, '"');
  if (source !== description) {
    console.error(`  FAIL ${slug}: quoted description differs from the page's own`);
    console.error(`        page: ${source}`);
    console.error(`        home: ${description}`);
    failed++;
    continue;
  }
  if (!description.includes(mark)) {
    console.error(`  FAIL ${slug}: mark is not a substring of the description`);
    console.error(`        mark: ${mark}`);
    failed++;
    continue;
  }
  console.log(`  ok   ${slug}: quoted verbatim, mark found`);
}

if (failed) {
  console.error(`check:industry-copy: ${failed} of ${entries.length} sector(s) out of sync.`);
  process.exit(1);
}
console.log(`check:industry-copy: ${entries.length} sectors, all quoted verbatim from their pages.`);

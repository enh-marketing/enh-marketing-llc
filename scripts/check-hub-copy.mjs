/** Fails if a line the AI Hub landing page attributes to a service has drifted
 *  from that service's own `meta.description`.
 *
 *  WHY THIS IS A SCRIPT AND NOT AN IMPORT. src/content/ai-hub.ts used to import
 *  `meta` from the service files, which is the obvious way to guarantee the two
 *  never disagree. It also pulled each service's entire content file into the
 *  landing page's client bundle: 12.9 KB of eagerly loaded copy, measured, to
 *  render a single sentence, and roughly eight times that once every category
 *  is on the page. So the sentence is a literal there and this reads both files
 *  as text instead. Same guarantee, none of the weight.
 *
 *  A beat opts in by carrying `quotes: "<service slug>"` next to its `body`. */
import { readFileSync } from "node:fs";

const HUB = "src/content/ai-hub.ts";

const hub = readFileSync(HUB, "utf8");

/* Beat object literals that name a source. None of them nest braces, so the
   no-inner-brace match is enough to keep one beat from swallowing the next. */
const beats = [...hub.matchAll(/\{[^{}]*\bquotes:\s*"([^"]+)"[^{}]*\}/g)];

if (beats.length === 0) {
  console.log("check:copy: no attributed lines to check.");
  process.exit(0);
}

const problems = [];

for (const [block, slug] of beats) {
  const body = block.match(/\bbody:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
  if (!body) {
    problems.push(`${slug}: beat carries quotes but no body.`);
    continue;
  }

  const path = `src/content/services/${slug}.ts`;
  let service;
  try {
    service = readFileSync(path, "utf8");
  } catch {
    problems.push(`${slug}: no such service file at ${path}.`);
    continue;
  }

  const source = service
    .match(/export const meta = \{[\s\S]*?\n\};/)?.[0]
    .match(/\bdescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"/)?.[1];

  if (!source) {
    problems.push(`${slug}: could not read meta.description from ${path}.`);
  } else if (source !== body) {
    problems.push(
      `${slug}: the hub and the service page disagree.\n` +
        `    service: ${source}\n` +
        `    hub:     ${body}\n` +
        `    Fix ${HUB} to match, or the change was not meant to reach the hub.`,
    );
  }
}

if (problems.length) {
  console.error(`check:copy: ${problems.length} problem(s).\n  ${problems.join("\n  ")}`);
  process.exit(1);
}

console.log(`check:copy: ${beats.length} attributed line(s), all verbatim.`);

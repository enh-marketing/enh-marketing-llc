#!/usr/bin/env node
/** Every emphasis on the Marketing Consultation page is a VERBATIM SUBSTRING
 *  of the sentence it sits inside, and this is what stops that being a lie.
 *
 *  WHY THIS PAGE NEEDS ITS OWN GUARD. `Marked` and `MarkedKeys` take a
 *  sentence plus phrases and split the sentence around them; a phrase that is
 *  not found is simply NOT MARKED, and the sentence renders whole. That is the
 *  right failure mode at runtime -- a copy edit upstream degrades to plain text
 *  rather than to a crash -- but it is silent, and this page leans on it more
 *  than any other: forty-odd phrases, and in `OpenQuestions` the four keys are
 *  not decoration at all. They are the board's controls, so a key that stops
 *  matching does not lose emphasis, it loses the interaction and leaves four
 *  mechanisms with nothing to operate them.
 *
 *  Checks, against src/content/marketing-consultation.ts:
 *    · every `*Mark` array entry is a contiguous substring of its own sentence
 *    · every question in `opening.questions` is a substring of `opening.asks`,
 *      which is `MarkedKeys`' contract
 *    · `opening.first` is inside `opening.strategy`, and the industries
 *      comparison still contains the hinge its two halves are split at
 *
 *  Run by `npm run check:consultation-copy`. */
import { rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const SRC = "src/content/marketing-consultation.ts";
// Written inside the project, not in a temp directory: the module re-exports
// from "@/content/forms", and only here can that alias and its own imports
// resolve.
const OUT = "node_modules/.enh-check/marketing-consultation.mjs";

await build({
  entryPoints: [SRC],
  outfile: OUT,
  bundle: true,
  format: "esm",
  platform: "node",
  logLevel: "silent",
  alias: { "@": "./src" },
});

const c = await import(pathToFileURL(OUT).href);
rmSync("node_modules/.enh-check", { recursive: true, force: true });

let failed = 0;
let checked = 0;

/** `phrases` must all occur verbatim inside `text`. */
const contains = (label, text, phrases) => {
  for (const phrase of phrases ?? []) {
    checked++;
    if (!text.includes(phrase)) {
      console.error(`  FAIL ${label}: "${phrase}"`);
      console.error(`        not found in: ${text}`);
      failed++;
    }
  }
};

contains("hero.basis", c.hero.sub, c.hero.basis);

contains("opening.ledeMark", c.opening.lede, c.opening.ledeMark);
contains("opening.questions", c.opening.asks, c.opening.questions);
contains("opening.consultantMark", c.opening.consultant, c.opening.consultantMark);
contains("opening.reviewsMark", c.opening.reviews, c.opening.reviewsMark);
contains("opening.strategyMark", c.opening.strategy, c.opening.strategyMark);
contains("opening.first", c.opening.strategy, [c.opening.first]);
contains("opening.modesMark", c.opening.modes, c.opening.modesMark);

for (const area of c.coverage.items) {
  if (area.lead) contains(`coverage ${area.no}.leadMark`, area.lead, area.leadMark);
  if (area.tail) contains(`coverage ${area.no}.tailMark`, area.tail, area.tailMark);
  // A register with a stem and no items, or items with no stem to run off,
  // reads as a dangling clause on the page.
  checked++;
  if ((area.stem && !area.items) || (area.items && !area.stem)) {
    console.error(`  FAIL coverage ${area.no}: stem and items must arrive together`);
    failed++;
  }
  checked++;
  if ((area.may && !area.mayStem) || (area.mayStem && !area.may)) {
    console.error(`  FAIL coverage ${area.no}: mayStem and may must arrive together`);
    failed++;
  }
}

contains("why.surviveMark", c.why.survive, c.why.surviveMark);
contains("why.experienceMark", c.why.experience, c.why.experienceMark);
contains("why.askMark", c.why.ask, c.why.askMark);
for (const item of c.why.items) {
  contains(`why ${item.no}.reasonMark`, item.reason, item.reasonMark);
}

contains("industries.contrastWho", c.industries.contrast, c.industries.contrastWho);
contains("industries.contrastWhat", c.industries.contrast, c.industries.contrastWhat);
// THE ONE PHRASE ON THIS PAGE WHOSE ABSENCE COSTS MORE THAN EMPHASIS.
// `OffRegister` splits the comparison around `contrastHold` and renders that
// phrase as the instrument's only control -- the thing that pulls all twelve
// rows onto the template and lets go. Every other mark on this page degrades
// to plain text if it stops matching; this one degrades to a section with a
// drawing nobody can operate, and nothing else on the page would notice.
contains("industries.contrastHold", c.industries.contrast, [c.industries.contrastHold]);

if (failed) {
  console.error(`check:consultation-copy: ${failed} of ${checked} checks failed`);
  process.exit(1);
}
console.log(`check:consultation-copy: ${checked} marked phrases, all verbatim.`);

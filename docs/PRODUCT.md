# PRODUCT.md

## Register

**brand**

These are ENH Marketing's own pages. The site is the shop window for a Dubai agency selling marketing and AI services, so the design *is* the product. A page that looks ordinary is a page that says the agency cannot do this work.

## Product purpose

enhmedia.com. A fifteen-year-old Dubai marketing agency selling SEO, performance marketing, video, lead generation and, most recently, a set of AI services grouped under an "AI Hub" pillar: AI Automation, Campaign Intelligence, AI Search Visibility, Data and Dashboards, AI Creative Production.

Each service page is built from a client-supplied Word document. **The copy is law**: every paragraph, service, step and FAQ appears verbatim. Nothing is written to fill a layout, nothing is paraphrased, and no figure, percentage, currency, date or metric appears anywhere unless the document states it. Where a document contains a placement instruction rather than content ("[Add approved dashboard examples here]"), the section is not rendered and the gap is documented in the page body. Inventing proof on a page that sells honesty about AI is the one unforgivable error.

## Users

- **UAE business owners and marketing leads** evaluating an agency. They arrive from search or a referral, skim, and decide within a screen or two whether this firm is serious. They are not technical, but they can tell a template from a considered page.
- **The agency's own team**, who send these pages to prospects and are embarrassed by anything that looks generic.

## Tone

Plain, exact, unhyped. The source documents are careful and often say what a service *cannot* do ("Can you guarantee a citation or mention? No"). The design must carry that register: confident and precise, never breathless. No marketing superlatives the documents do not use.

## Strategic principles

1. **The arrangement is the argument.** Before building a section, ask what its copy *is* and draw that. Things a system must get through is a run of gates. What recurs monthly is a cycle. Material improving through stages is one object shown repeatedly. If the layout could hold any other section's content unchanged, it is wrong.
2. **Every section earns its own shape.** Keep a running inventory of arrangements already used across the site and refuse to repeat one, within a page or between pages.
3. **Motion is not decoration, and its absence is conspicuous.** The approved pages carry 30 to 45 transitioning elements per section and scroll-driven state. A section whose only movement is a looping SVG reads as unfinished.
4. **Draw the subject, not a symbol of it.** Labels inside a drawing use the document's own words. No stock iconography.
5. **Accessibility is part of the craft.** Numbers ascend in DOM order and visual order. Nothing readable starts hidden. All text renders at 11px or more at every width. Under `prefers-reduced-motion` the AI Hub pages run zero animations and every drawing rests in a readable finished state.

## Anti-references

Each of these is a real, named rejection from the client during this project. They are the sharpest guidance available.

- **"The same bento grid."** Rounded bordered cards in 2 to 5 columns, each with an icon, a number, a title and a paragraph. Rejected by name. Ten of fifteen sections were once this or its sibling, "text on one side, bordered drawing panel on the other".
- **"It's just a list."** Changing the ornament while keeping the skeleton: one item per row, copy left, picture right. A stepped hairline, tinted beds, a measured outline and a narrowing measure are four coats on the same list.
- **"Random crap."** Drawings that do not depict what their section describes.
- **Brand red as a background wash.** Mixing `--color-brand` into a surface tint turned a section progressively pink. Brand red is an accent and a mark, never a ground.
- **Grey films over content.** Holding items at 0.62 opacity and lighting one at a time dims the copy.
- **Animations that scale from zero.** `scaleX(0.04) → 1` on a row of staggered bars reads as a rendering fault, not as motion.
- **Numbers that do not ascend.** Raised twice, angrily. A layout where 05 sits level with 02, or 3 below 6, is a bug to this client whatever the rationale.
- **Dead columns.** A 445px drawing pinned beside a 1245px list.

## Working agreements

- Never `git push` or open a pull request until asked. Commit, show screenshots, wait.
- Em dashes are banned in copy. This is also the client's house style.

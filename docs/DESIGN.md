# DESIGN.md

Generated from the existing codebase: `src/styles/globals.css`, `astro.config.mjs`, and the approved components on `/ai-hub/ai-automation` and `/ai-hub/campaign-intelligence`.

## Theme

Light is the base and lives in `@theme`; dark is the opt-in override on `.dark` / `[data-theme="dark"]`. Both must work: every page is checked in both.

The scene: a UAE business owner on a laptop in a bright office, mid-morning, deciding whether to send an enquiry. That forces light as the default. Dark exists because the team demos on a projector and the homepage's WebGL hero was authored dark.

## Colour

Strategy: **restrained**, one committed accent. Neutrals are warm-tinted, not pure. `#fff` appears once as `--color-ink-3` in the light theme, deliberately, as the topmost raised surface; `#000` never appears.

| Role | Light | Dark |
|---|---|---|
| `--color-brand` | `#e8000d` | `#e8000d` |
| `--color-brand-hot` | `#ff2e3a` | `#ff2e3a` |
| `--color-brand-deep` | `#9c000a` | `#9c000a` |
| `--color-brand-text` | `#9c000a` | `#ff2e3a` |
| `--color-void` (page) | `#e6e3de` | `#060606` |
| `--color-ink` | `#efece7` | `#101010` |
| `--color-ink-2` | `#f7f7f6` | `#171717` |
| `--color-ink-3` (top surface) | `#ffffff` | `#1e1e1e` |
| `--color-line` | `#d2cdc3` | `#2e2e2e` |
| `--color-snow` (primary text) | `#15120f` | `#f7f7f5` |
| `--color-fog` (secondary) | `#57544f` | `#a3a39e` |
| `--color-ash` (tertiary) | `#68655f` | `#8c8c87` |

Rules the tokens encode:

- `--color-brand` is for display-size type and marks only; it clears 3:1, not 4.5:1. **Small red text uses `--color-brand-text`**, which flips with the theme.
- `--void → --ink-3` is a four-step *surface* scale. Use it for depth. Interpolating along it with `color-mix(in oklab, var(--color-void) N%, var(--color-ink-3))` gives a neutral ramp that inverts correctly in dark.
- `--snow`, `--fog`, `--ash` are *foreground* tokens. Never use one as a fill for a surface: `--color-snow` is near-black in the light theme and renders a "white card" as a black slab.

## Typography

- `--font-display`: Cabinet Grotesk, falling back to Poppins. Self-hosted via Astro 7's `fonts` config. Used uppercase, `font-extrabold`, tight leading, for every heading and label.
- `--font-sans`: Inter. Body copy.
- Section headings are locked to `display-xl` with the second half in brand, rendered through `SectionHeader`. Do not step this down.
- **Floor: 0.6875rem (11px).** Nothing body-adjacent goes below it. This is why drawing captions are HTML, not SVG `<text>`: text inside a viewBox scales with the box and drops to 6px on a phone.
- Body measure capped around 65 to 75ch.

## Motion

- `--ease-expo: cubic-bezier(0.16, 1, 0.3, 1)` is the house curve. Tailwind's default ease is acceptable for colour-only transitions.
- Two duration tiers: **300ms** for selector-scale controls and inline links, **500ms** for cards and headings.
- Entrance: `Rise` (fade and rise, `useInView`, once) and `Chars` (per-character mask rise, 0.7s, 0.025s stagger) from `src/components/fx/Reveal.tsx`.
- Scroll: GSAP + ScrollTrigger, always inside `gsap.matchMedia` gated on `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`, always with a cleanup that kills the timeline and its trigger and clears props.
- Reduced motion is enforced twice: a global duration collapse in `globals.css`, plus explicit `animation: none !important` per looping class. Every looping class must rest in a *finished, readable* state. `usePrefersReducedMotion` from `src/lib/useEnhanced.ts` is the hydration-safe hook; never branch markup on motion/react's `useReducedMotion`.

### The interaction vocabulary

Taken from `ManagedWaypoints`, `PinnedExplorer`, `LaunchTrack` and `DiagnosticMap`. New sections match it.

```
card       group ... border transition-colors duration-500 motion-reduce:transition-none
           active:  border-brand/55 bg-ink-3
           resting: border-line bg-ink-2 hover:border-ash/50
number     transition-colors duration-500 | text-ash group-hover:text-brand-text
title      transition-colors duration-500 | text-fog group-hover:text-snow
rule       h-px transition-all duration-500 motion-reduce:transition-none
           w-8 bg-line group-hover:w-14   (active: w-20 bg-brand)
glyph      transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
           group-hover:scale-110 motion-reduce:group-hover:scale-100
lift       hover:-translate-y-0.5 hover:shadow-[0_6px_16px_-8px_rgba(0,0,0,0.28)]
           active:translate-y-0 active:duration-75
focus      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
           focus-visible:outline-brand
```

Looping SVG classes live in `globals.css` under the Campaign Intelligence block: `ci-draw`, `ci-flow`, `ci-grow`, `ci-grow-x`, `ci-twinkle`, `ci-blink`, `ci-blink-soft`, `ci-scan-x`, `ci-scan-y`, `ci-slide`, `ci-sweep`. The Insights block adds `ri-ping` (summit marker) and `ri-flag` (summit pennant, furls in place so a translate cannot lift it off the ground it stands on), plus `np-route`, which only slows `animate-dash` to card scale. All are in the reduced-motion collapse and all rest on their drawn state. Two traps:

- `.ci-draw` and `.ci-flow` set `vector-effect: none` on purpose. Under `non-scaling-stroke` Chromium measures the dash in screen pixels, so any path longer than 100px renders as a dash, a gap and a stub. Their stroke widths are therefore in viewBox units.
- `.ci-blink` sets `opacity` as a stylesheet rule, which beats an `opacity="0.1"` attribute. For a tinted wash use `.ci-blink-soft` with `fillOpacity`.

## Entrance motion is not motion

Measured across `/ai-hub/ai-automation` (approved) and the first build of the
three AI Hub pages (rejected as "the whole page is motionless"):

| per section | approved | rejected |
|---|---|---|
| elements with a CSS transition | 30 to 45 | 0 |
| animations still running at rest | 13 to 27 | 0 |
| elements with a hover state | 16 to 33 | 0 |

Four sections had **literally zero** of all three. Every one of them animated on
entry and then stopped, which reads as a static page to anyone who arrives after
the fade has finished, and as a broken one to anyone who scrolls back up.

The fix is not more entrances. It is the two things the approved pages have and
entrance-only sections do not:

1. **Something still running.** Use the `ci-*` classes in this file, not a
   bespoke loop: they are already correct about `vector-effect`, they already
   stop under `prefers-reduced-motion`, and they register in `getAnimations()`
   where a motion/react `repeat: Infinity` on a transform sometimes does not.
   `ci-blink` walks a light along a strip when each tick shares a duration and
   takes a delay of duration/count. `ci-flow` sends a packet down any path that
   carries `pathLength="100"`. `ci-scan-x` and `ci-scan-y` sweep a beam, and
   their travel is in **user units**, so they belong inside a stretched viewBox
   rather than on an HTML box.
2. **The hover vocabulary**, applied to every row, chip and card. It is set out
   under "The interaction vocabulary" above and it is not optional decoration:
   it is most of the transition count on every approved page.

A hover state on something that cannot be interacted with is a lie. Where a
section wanted hover but had no action, the fix was to give it one: the six
services became a clickable index that jumps the scroll to its own slice of the
track, which is worth having anyway in a section six viewports tall.

**And the control does not have to be a pin.** Two sections on the healthcare
page have a drawing whose key is the client's own sentence beside it -- four
research subjects, five contributions to one decision -- and there the honest
control is the sentence: `MarkedKeys` splits it on `Marked`'s contract and
renders each phrase as a button in place, so pointing at a phrase lights the
part of the drawing it names. Nothing is reworded, nothing is printed twice,
and with no pointer, no keyboard and no JavaScript the drawing rests with every
part lit -- which is what both sentences claim. Reach for it wherever a drawing
would otherwise need captions the label rule does not allow.

## Layout

- `Container` holds a 1240px measure at `xl`.
- Radii: `1.5rem` for content cards, `1.25rem` for panels and drawing frames. Do not mix within a section.
- Section wrapper: `relative overflow-x-clip py-14 sm:py-16`, lifted to `py-20 sm:py-24` for a chapter that should read as a break.
- No horizontal overflow at any width from 320 to 1920.

## Component inventory

Shared: `ServiceHero`, `SectionHeader`, `CtaBand`, `GrowthCta`, `FaqList`, `StickyCTABar`, `Work` (the case study carousel: reads the migrated studies, so every card is a link to its own page and every picture is that client's own artwork), `Insights`, `TrustStrip`, `LeadForm`, `Crosslink` (renders unbuilt routes as plain text; a link to a 404 is worse than no link).

Insights (`src/components/insights/`, consumed by `/insights` and `/insights/[slug]`): `InsightsMasthead`, `RouteIndex`, `NoteRegister`, `NoteCard`, `NotePlate`, `NoteMedia`, `ArticleHero`, `ArticleBody`, `ArticleAside`, `ReadingProgress`, `RelatedNotes`. Three of these carry rules worth knowing before touching the section:

- **`NotePlate` is what a note gets instead of a photograph.** A range in section, one silhouette per topic, hashed from the topic name so it is stable and a new topic needs no data authored. It exists because the archive has no images yet and a stock photo presented as an article's hero is a fabricated article image. Its viewBox is square with the range in the lower half: `slice` in a portrait frame shows the whole range and in a landscape one crops sky, so one drawing serves the lead slot, both card weights, the related row and the article hero.
- **`ArticleBody` is the only place article typography is decided.** Typed blocks, never `dangerouslySetInnerHTML`: a migrated article is somebody else's markup. Prose is capped at 68ch and left-aligned so one edge runs from the hero's breadcrumbs to the last paragraph; figures marked `bleed`, tables and code blocks are the only things allowed past it, and they widen into the margin the contents rail sits in.
- **`hasBody()` gates every link.** A note with no body builds no route, renders its title as text, and offers no hover state — the same rule `Crosslink` and `BUILT` apply to unbuilt routes, applied to unmigrated content.
- **The register is one card repeated.** It had a featured lead section above it and a second, side-on card weight for one note in five; both were removed on request. Hierarchy on the listing is carried by the route in the masthead, the year rules that break the grid into bands, and the topic rail — not by promoting one post over another. Anything that reintroduces a "featured" treatment there is going back on a decision, not filling a gap.

Case studies (`src/components/case-studies/`, consumed by `/case-studies` and `/case-studies/[slug]`): `CaseMasthead`, `SectorField`, `LeadCase`, `CaseArchive`, `CasePlate`, `CaseMedia`, `Figures`, `Prose`, `CaseHero`, `CaseStory`, `ResultSheet`, `CaseNav`, `RelatedCases`. Five rules worth knowing before touching the section:

- **The content is migrated, and the migration is checkable.** All twenty-two studies come from the live enhmedia.com/case-studies pages, converted by `scripts/migrate-case-studies/` and gated by its `verify.py`, which compares the bag of words on each live page against the migrated study and fails on a single dropped word. Client name, sector, service tags and the results-sheet alt text are the only authored fields; every one of them carries the phrase it was read from, and the verifier fails if that phrase is not a verbatim substring of the study. See `scripts/migrate-case-studies/meta.py`.
- **`SectorField` is the drawing, and it is a tally rather than a chart.** One row per sector, one tick per engagement, a leader out to the count — countable by eye, which is the test rule 4 below sets for every figure on this site. It is also the archive's contents page: each tick links to its study and each sector name filters the mosaic, which is what earns it hover states.
- **`CasePlate` is not a card.** No panel, no fill, no shadow: a picture in a bordered frame with type set under it on the page's own ground. The border and the fill belong to the frame. Rhythm comes from the widths — the mosaic cycles 7/5, 5/7, 6/6 across twelve columns — never from giving one plate a different anatomy. The pattern restarts in each half of the split, or a row sums to thirteen and leaves a dead column.
- **"Featured" is the source's order, not our opinion.** `lead()` is whichever study the live index lists first. Nothing on the page calls a study best, and the lede under the heading says where the position came from.
- **The interlude's number is counted, never written.** `rankingCount()` counts the studies publishing a #1 among their figures, so the one sentence about the whole archive cannot drift from the plates around it.

Arrangements already used, which new sections must not repeat: pinned explorer, waypoint path, diagnostic sheet, launch track, operations reach, phase rail, converging inputs, two-sided split, bedded mass, upright plate, horizontal schedule, vertical swimlanes, spine with return loop, pinned chapter with an index, scope boundary with tethers, room plans, curriculum run, contents pack, switchback, unequal runs, criteria register with a fork, launch profile, drift sandwich, directional joins, layer stack, watched register, ridge traverse with pins, dated register with year bands, prose with a margin rail, sector tally, cover with a figure strip, unequal mosaic, counted interlude, mirrored neighbour bar, consideration set, research run with the sentence as its key, contribution members with the chain set as type, plan written across its stages, sheet with two cells the source names, equal figure grid, register of shapes with one structure redrawn, ticked claims against open boxes, plan cut to four stated stops, survey of one business drawn in nine passes against a sticky panel, claims split into position and reason across one rule, a decoded block of the questions a document asks and does not answer, a catalogue of sectors set inside the page's own native object.

The last twelve are the AI Hub pages. Three of them are worth naming because
the reason they work is transferable:

- **Room plans** (AI Workshops, formats). Four formats that differ only in who
  is in the room are drawn as four floor plans. Furniture and orientation only,
  never seats, because FAQ 8 declines to give a headcount.
- **Launch profile** (Conversational AI, process). Six steps drawn as how much
  the agent carries: flat, a ramp at the step whose own sentence says
  "gradually", then level and open. The stations are HTML positioned on the
  path's own y values, so nothing drifts off the line.
- **Unequal runs** (AI Workshops, experience). Two rails of different length.
  The document draws the comparison itself; the length is the whole argument.

Two hero visuals also earned their shape from one sentence of the banner rather
than from the service category: `HandoverThread` draws the boundary because the
banner sells the boundary, and `PageSwap` keeps its frame fixed because
personalisation is a rule, not a second website.

The last five are the Marketing Consultation page, and the reason they work is
that the document sells a DECISION rather than a channel, so every shape on it
is about what is not settled yet:

- **Board of unresolved mechanisms** (`OpenQuestions`). The four questions in
  the source's second paragraph are four different KINDS of question -- a
  choice between two, a question of order, a selection from many, a fault
  along a chain of four -- so there are four mechanisms on one ground at four
  sizes, and none of them resolves, because the document answers none of them.
  The client's own paragraph is the key, through `MarkedKeys`, so no question
  is printed twice and the coupling runs both ways.
- **A survey of one business, drawn in nine passes** (`CoverageSurvey`). This
  is `CreativeRhythm`'s arrangement -- a sticky panel beside a tall
  scroll-driven list -- which the team asked for by name, with a drawing that
  is this document's own. Rule 7 says N subjects need N pictures and that one
  diagram in N states collapses into the shape they share; the exception is
  when the N are not N subjects. These nine are nine readings of ONE business,
  so the panel is one plan of it and each stage draws a different, specific
  part: what it already runs, what it is for, who comes to it, what stands
  around it, what it says, where they land, what it publishes, where it
  appears, and the layer that joins all of it up. Nine pictures, one ground,
  and the ground is the claim. The last frame is the deliverable, and it is
  the client's own last sentence -- "repetitive processes that could be
  connected or simplified" -- so the plan finishes connected.
  Three things it got wrong first, all of which only showed when every stage
  was rendered side by side on a throwaway page: a travelling packet toggled
  by a CLASS is a solid brand stroke when the class is absent, so three
  surveyed stages kept a red route and "resolved is ash" was true of none of
  them (render the overlay only while the stage is live); four outlined
  rectangles of four heights on a baseline is a bar chart whatever it is meant
  to be, so the market is drawn as premises with roofs and doors; and a tick
  crossing a rule is a plus sign at drawing scale, so the posting cadence
  hangs its posts off the run instead of through it.
  What makes it worth reading is the same thing the section always had: every
  one of those nine paragraphs buries a list inside a sentence -- eight
  channels audited, seven things assessed on a website, seven tools -- and each
  paragraph is split at its own comma run into a stem, the register set out
  properly, and whatever the paragraph says afterwards. A document's "may"
  stays a "may": those entries take an open mark and keep the client's own
  qualifier. And because nine stages is nine viewports of scroll, the sticky
  panel carries an index of all nine names -- which is rule 1's requirement,
  and a control that jumps the scroll, through Lenis rather than `scrollTo`.
- **A catalogue of sectors, set inside the page's own object**
  (`SectorCatalogue`). This is `CatalogueGrid`'s arrangement, asked for by
  name, and it is the fourth attempt at this section. The first three are worth
  recording because together they draw the boundary: twelve bordered cards read
  as a list; an instrument of datums and drifting modules that argued the
  strategy varies was rigorous and read as a puzzle; and twelve drawn premises
  on one street had character but still left the reader scanning a frieze.
  What works is the treatment a sibling page already proved -- the twelve names
  set inside the native object of the page they are on (a category listing
  there, the strategy document here), each with a conventional mark, and the
  document's own closing sentences as a note on the whole listing rather than
  sorted into it.
  The transferable lesson is the one `docs/DESIGN.md` already states and I
  broke twice: overcorrecting from "too basic" lands straight in "too
  abstract". Between those two there is usually a house treatment that has
  already been approved on another page, and reaching for it is not a failure
  of invention.

- **A decoded block of the questions a document asks and does not answer**
  (`Narrative`, on the consultation page). Also asked for by name. The effect
  was written for a page whose subject is an unreadable report, and it fits a
  block of four unanswered questions better than the page it was written for:
  the resolve IS the section's subject rather than an effect laid over it, and
  `body` as an array sets the four as numbered lines instead of flattening
  four distinct decisions into one run-on sentence. Two optional props were
  added for it -- `index`, so a page that numbers every section can number this
  one, and `closingMark`, so the one phrase in the closing statement that is
  the page's whole thesis can carry brand while the rest of the list does
  not.

Withdrawn, and not to be revived: stepped boundary, narrowing measure, measured type silhouette, staged canvas. All four were rejected as "just a list", and the reason is worth keeping. Each changed the ornament and kept the skeleton: one item per row, copy on one side, a picture on the other. A stepped hairline, a tinted bed, a measured outline and a pinned canvas are four coats on the same list.

## What separates an approved section from a rejected one

Measured across `/ai-hub/ai-automation` (approved) and the first four attempts at the AI Search Visibility services section (rejected):

| | approved | rejected |
|---|---|---|
| `<rect>` per SVG | ~1 (small glyphs) | ~10 (large wireframes) |
| Service names on screen at once | all seven | one |
| Scroll needed to learn the offer | none | ~4,400px |

**A list with no data behind it has a house treatment, and inventing a shape
for it is the mistake.** The logistics page's "Who We Work With" is nine
operator names with no size, service or market attached to any of them, and its
"Why Choose" is seven single assertions with no figure and no stated
relationship between them. Four versions of each went looking for a shape of
their own -- cells with two plans under them, a rule per row with structure on
the end of it, a gate-and-columns frame, and finally a full-bleed wall of
display type with a scroll-driven ink wipe. The first three were rejected as
"just a list" for the reason the four withdrawn arrangements above were; the
fourth was rejected on sight for not matching the design language, and it is the
most useful of the four failures because it names the real rule:

> A section that leaves the card system behind stops looking like this site,
> however good the idea is. `ui/SurfaceCard`'s devices -- the spotlight, the
> top-edge wipe, the ghost numeral, the one-pixel lift -- and the ruled
> two-column run are not a fallback for when invention runs out. They are the
> material.

What works for both is the treatment the other four industry pages already use:
the house card at unequal widths for the register, the ruled run for the claims.
What makes each page's version its own is not the frame but the one thing its
own document adds -- here, a closing sentence that names two of the nine, wired
as the register's control.

The rules this yields outrank any amount of conceptual cleverness:

1. **Every service name is legible at once.** A services section whose reader cannot see what is being sold has failed before its drawing is judged.
2. **A drawing that has to be taught is not a drawing.** At most three labels, each a phrase from the document, answering exactly one question. `PERSON` / `MACHINE` works because nobody has to learn it. Position above a rule meaning "on your own site", brackets meaning "these two measure", a gap meaning "blocked": each is a notation, and a reader asked to learn four of them before the picture speaks will not.
3. **Show the working.** Where a section sorts its items, print the clause the sort was read from. It makes the arrangement checkable, and it stops items in one group from feeling identical, which is what makes a category drawing sit still across consecutive selections.
4. **No quantities.** These pages promise "no counts, no scores". A percentage nobody can measure by eye is both a broken promise and unreadable.

   The Insights masthead is the worked example, and it took two rewrites. Version one generated the ridge from the notes themselves and climbed from the oldest to the newest: with three notes that is a straight diagonal, three dots and a filled wedge — an upward trend chart, which claims a quantity there is none of. Version two authored the range by hand but at eighteen vertices, which at 1240px wide is a peak every 68px: a sawtooth, not ground. What works is a hand-drawn range of nine vertices that is identical whatever the archive holds, pins placed on its crest by sequence position, no y axis, no y label, and diagonal hatching under the surface line — the notation a geological section uses, and the thing that finally stops a dashed line over a fade reading as an area chart.
5. **`--color-line` is for borders, never for meaning.** It is 1.4:1 against the dark ground (#2e2e2e on #101010) and 1.1:1 against the light one (#d2cdc3 on #f7f7f6). Any line inside a drawing that carries meaning is inked in `ash`, in both themes.
6. **Do not give one section its own theme.** A `chapter-dark` class forced this section to near-black in both themes, so the light theme ran white, cut to #101010 for one section, then cut back. Nothing else on the site does that, and it read as a seam rather than a chapter. A section is set apart by scale, pacing and structure, not by opting out of the palette.
7. **A drawing per subject, not one drawing per section.** Seven services need seven pictures. A single drawing that only changes state cannot depict a crawler meeting robots.txt AND a page that answers AND markup matching what is visible: it collapses into the one abstract shape all seven have in common, which is what "same random diagram with no meaning" named. Each drawing answers one question about its own service, in its own copy's words.
8. **`useEnhanced` reports false on the first paint**, by design, so server and client agree. An effect that reads a ref only rendered in the enhanced branch must list the enhanced flag in its dependencies, or it runs once against a null ref and never again.
9. **`pathLength` and `vector-effect: non-scaling-stroke` do not mix.** motion's
   `pathLength` animates `stroke-dasharray`, and under `non-scaling-stroke`
   Chromium measures that dash in screen pixels, so any path longer than 100px
   renders as a dash, a gap and a stub. This is the same trap already recorded
   for `.ci-draw` and `.ci-flow`, and it caught `ControlledLaunch` too. Either
   drop the vector-effect or, better, do not animate the path: give the motion
   to the stations on it, which is more legible anyway.
10. **A GSAP `from` tween renders its start state on creation.** A timeline waiting on a ScrollTrigger that never fires (deep link, restored scroll, refresh mid-page) leaves its targets at `scaleX(0)` permanently. Pass `immediateRender: false` on every entrance tween.
11. **A list plus a footnote is not a section.** The healthcare audience
    section shipped as nine name plates, a note under them, and the contrast
    sentence at the foot beside two site plans. Every word the document has was
    on the page and the section still said nothing, because the one claim worth
    making -- that the work changes shape with the provider -- was a caption
    under a picture rather than the thing the reader could operate. Where the
    source makes a claim about variation, the section has to vary: nine
    providers, nine rows each showing its own structure in miniature, one stage
    that redraws, and the sentence that placed each shape printed underneath.
    The test is whether the reader can *run* the claim, not whether they can
    read it.
12. **Where the source places nothing, draw nothing -- and say so in its own
    words.** Four of those nine are placed by the document; five are placed by
    nothing anywhere in it. Those five draw the same skeleton with its counts
    left open, captioned by the client's own sentence about what the shape is
    actually decided by. Inventing five plausible diagrams would have been five
    fabrications on a page whose own limit is "without creating confusion or
    making unsupported promises", and the honest version is the better sales
    argument anyway. Two guards make it read as a position rather than a gap:
    the register marks every row that shares the shape on screen, so clicking
    between the five is visibly *the same answer* rather than a dead control;
    and the open shape keeps something running outward past both ends, so it
    reads as a plan still open rather than a plan not drawn.
13. **Rule 4 applies to the motion, not only to the rest state.** Five equal
    members drawn from the client's "all five contribute to the decision" rest
    honestly and animate dishonestly: `ci-grow-x` on staggered delays puts five
    different lengths on screen at every instant, which is a bar chart of a
    weighting the document does not give. The same trap catches a row of
    `ci-flow` packets given per-item delays -- nine packets at nine positions
    along nine rules is nine values to compare. Where the claim is "these are
    not comparable", either move the packets in lockstep or animate something
    that carries no position at all. Both fixes are on `/industries/healthcare`,
    in `DecisionWeights` and `FigureSheet`, with the reason recorded at the call
    site.

# Campaign Intelligence page: design spec

Date: 2026-09-03
Route: `/ai-hub/campaign-intelligence`
Source of truth: `Content/Campaign Intelligence.docx` (client-supplied). Every visible string on the page is taken from it verbatim, with the three recorded departures listed under "Content rules".

## Goal

Add the second AI Hub page to the ENH Media site, built to the same standard and the same architecture as `/ai-hub/ai-automation`: one Astro route owning the head, one React island for the body, one verbatim content file, existing components reused wherever they fit, and new content-specific SVG drawings where the document supports them.

## Decisions taken with the client (2026-09-03)

| Topic | Decision |
| --- | --- |
| URL | `/ai-hub/campaign-intelligence`, under the AI Hub pillar |
| Design brief | The ecommerce brief is reinterpreted for forecasting concepts; no ecommerce imagery |
| Proof sections | Keep `Work` (Summits Reached) and `Insights` exactly as AI Automation does |
| Figures in visuals | None. No axis values, currencies or percentages anywhere in a drawing |
| CTA mapping | Primary buttons open the enquiry dialog; hero secondary is a phone call; mid-page and closing secondaries open WhatsApp |
| Form | Standard six-field set from `content/forms.ts`; dialog titled "Book a Campaign Intelligence Diagnostic" |
| Section order | Document order, with Work and Insights inserted where AI Automation inserts them |
| Channels | Official marks from `ChannelIcon` plus the document's channel names |
| Git | Branch `feat/campaign-intelligence`, one commit at the end |
| Mid-page CTA label | "Book a Consultation" (capital A in the source normalised) |
| Motion | Not less than any existing page; components may be borrowed from any page |
| Research | Skipped; the existing pages set the benchmark |
| Hero visual | B: one budget dividing into five channels. Revised after review: larger panel, faster rebalancing, packets of light on every move |
| Section 02 | A was built (PinnedExplorer plus a phase drawing) and rejected on review as too close to AI Automation. Replaced by `CampaignTimeline`: a three-phase rail with the six items placed in the column of their phase, benchmarking as a band |
| Section 03 | C (revised 2026-09-03 after review of the first build): inputs converge into the diagnostic. A was built first and rejected |
| Section 04 | A: LaunchTrack reused, relabelled, actor pill dropped. Revised after review: `softLaunch` keeps the launch card's tint, number and label red but the title in the text colour |
| Section 06 | A: two-sided split with a rule that draws on scroll. Revised twice after review: prose in text colours, then `PlanCheck` with a drawing above each side and the promise set over a range band that widens on scroll |
| Mid-page CTA support | Closing block's first sentence, borrowed |
| Section marks | Bespoke set for this page |
| Services dropdown | Unchanged; the gap is noted in the hand-over |
| Metadata | Title from the H1 plus "\| ENH Marketing"; description is the banner's first sentence |

## Page structure

Section index numbers run (01) to (10) as on AI Automation.

| # | Document section | Component | Status |
| --- | --- | --- | --- |
| hero | Banner | `ServiceHero` + `BudgetSplit` visual | reuse + new drawing |
| 01 | What We Do | `Narrative` | reuse |
| 02 | What Campaign Intelligence Covers | `PinnedExplorer` with `diagram={{ kind: "phases", phases }}` rendering `CampaignPhases` | reuse + new diagram kind |
| 03 | The Data We Need | `DataRange` | new |
| 04 | How Forecasting Works | `LaunchTrack` (actor optional, relabelled) | reuse + small change |
| 05 | CTA: Book a Consultation | `GrowthCta` | reuse |
| 06 | How ENH Helps You Plan and Improve Campaigns | `SplitStatement` | new |
| 07 | (not in document) | `Work` | reuse |
| 08 | FAQs | `FaqList` | reuse (answer may be two paragraphs) |
| 09 | Plan Your Campaign Before Committing the Budget | `CtaBand` | reuse |
| 10 | (not in document) | `Insights` | reuse |
| — | — | `StickyCTABar` | reuse |

## Content rules

`src/content/services/campaign-intelligence.ts` carries every string. Header comment records:

1. Source document and date received.
2. Departure 1: "Book A Consultation" rendered as "Book a Consultation" (client decision 2026-09-03).
3. Departure 2: the mid-page CTA band's support line is the closing block's first sentence, because the document gives the band only a label.
4. Departure 3: the second paragraph of "How ENH Helps" is typeset in two pieces so its final sentence stands alone at display scale. Words unchanged.
5. No proof or case-study section exists in the document; Work and Insights are the site's shared sections, not this page's content.
6. No figures: the document commits to none, and none are shown.
7. FAQ 11 has two paragraphs. `FaqList` gains support for `a: string | string[]`, rendering one `<p>` per paragraph.
8. Phase flags for the six covered items cite the sentence each is read from:
   - Pre-Campaign Forecasting: before ("before it is approved or spent")
   - Media Mix Planning: before ("how the budget should be divided")
   - Category Benchmarking: before, live, after ("compare campaign performance with a relevant category range"; also used in step 3 "ENH benchmark data")
   - Scenario Planning: before ("what a proposed budget could produce" is the neighbouring context; its own sentence "how results may change when the budget ... is adjusted")
   - Early Performance Alerts: live ("while the budget is still active")
   - Forecast Versus Actual Reporting: after ("present the forecast beside the actual campaign results")
9. Process `launchAt` is 4 (zero-based), read from step 5's own opening "Once the campaign starts".

Exports: `meta`, `hero`, `narrative`, `covers`, `dataNeeded`, `process`, `growthCta`, `helps`, `faqs`, `finalCta`, `formFields` (re-export of the standard set).

## New components

### `BudgetSplit` (hero visual)

- File: `src/components/service/BudgetSplit.tsx`, CSS keyframes appended to `globals.css` under a "Budget split" block that follows the AgentRun conventions: every animation ends on a finished state, nothing readable starts hidden.
- Placement and panel identical to `AgentRun`: absolute in the right gutter, hidden below `lg`, `role="img"` with a descriptive `aria-label`, inner SVG `aria-hidden`.
- Drawing: one full-width budget bar; beneath it five allocation segments whose widths shift between three states on a loop (the document's "increasing spend, reducing it, or moving it between platforms"); beneath each segment an expected-range bracket that widens or narrows with the allocation. A row of five `ChannelIcon` marks with the document's names: Google, Meta, LinkedIn, TikTok, YouTube. The Google mark in the repo is the Google Ads logo; accepted.
- No text other than the five channel names. No numbers.
- Reduced motion: one balanced still.
- Props: `channels: string[]` (names as the document writes them), `className?`.

### `CampaignPhases` (diagram for `PinnedExplorer`)

- File: `src/components/service/CampaignPhases.tsx`. `PinnedExplorer` gets a new `DiagramSpec` member `{ kind: "phases"; phases: Phase[][] }` where `Phase = "before" | "live" | "after"`, plus a `markNode?: ReactNode` passthrough to `SectionHeader`.
- Drawing: pin rail above in document order (as `HandoverMap`); three phase blocks on one budget line labelled "Before spend", "Live", "After"; a vertical start tick between the first and second; an underlay bar beneath all three. Selecting an item lights the phases in its flag set; an item flagged with all three lights the underlay instead.
- Labels at 11px minimum.

### `DataRange` (section 03)

- File: `src/components/service/DataRange.tsx`.
- Layout: lead sentence at display scale; two columns on `lg`: an `<ol>` of the twelve inputs on the left, a sticky panel on the right containing an SVG forecast band with a mid line; closing sentence at display scale beneath.
- Motion (GSAP matchMedia, `lg` and no-reduced-motion): a ScrollTrigger scrubbed across the list ticks each item in turn (tick mark draws, text goes from fog to snow) and narrows the band. The band is the mid line offset up and down by one half-width, and that half-width is the animated value, so the band always encloses the line. Initial states never hide text: items start at `opacity: 0.55`, never 0.
- Fallback: items rendered at full contrast with ticks drawn, band drawn in its narrowed state.

### `SplitStatement` (section 06)

- File: `src/components/service/SplitStatement.tsx`.
- Props: `left: { label, body }`, `right: { label, body }`, `closing: string`.
- Layout: the verdict panel from `DiagnosticSheet` generalised: two panels either side of a rule that scales in on scroll (vertical on `lg`, horizontal stacked), left body in brand, right body in snow; closing sentence beneath at display scale. No labels: the right paragraph already opens "Once the campaign begins", so a label would print the phrase twice.
- Section surface: `ink-2` with grid and wash, as the managed section on AI Automation.

### `CampaignMark` (section marks)

- File: `src/components/service/CampaignMark.tsx`, same API as `MetaMark`: `variant: "phases" | "range" | "startline" | "twosided"`.
- Used via `markNode` on sections 02, 03, 04, 06. Same 48-unit stroked style as `CapabilityGlyph`, animated on entry, still under reduced motion.

### Changes to existing components

- `LaunchTrack`: `actor` becomes optional on `TrackStage`; the pill renders only when present.
- `PinnedExplorer`: new `DiagramSpec` member and `markNode` prop.
- `FaqList`: `a: string | string[]`; JSON-LD joins paragraphs with a space.

## Wiring

- `src/pages/ai-hub/campaign-intelligence.astro`: `Base` with title, description, canonical; Service JSON-LD (`name: "Campaign Intelligence"`, `serviceType` listing the six covered items, provider from `brand`).
- `src/page-bodies/ai-hub-campaign-intelligence.tsx`: the island.
- `src/lib/sitemap.ts`: AI Hub child "Campaign Intelligence" gets `href: "/ai-hub/campaign-intelligence"` with no `external`; the route joins `BUILT`.
- `astro.config.mjs`: no change (no redirect needed, new URL).

## Motion inventory

| Where | Mechanic | Gate |
| --- | --- | --- |
| Hero | CSS keyframe loop, re-keyed per cycle | reduced motion shows still |
| 01 | Narrative decode (existing) | existing gates |
| 02 | Explorer autoplay with pause, phase lights on select | existing gates |
| 03 | ScrollTrigger scrub: ticks and band | `lg` and no-reduced-motion |
| 04 | LaunchTrack pin (existing) | existing gates |
| 05 | GrowthCta pointer effects (existing) | existing gates |
| 06 | Rule scales in on scroll | no-reduced-motion |
| marks | entry animation | reduced motion still |

## Responsive

Below `lg`: hero visual hidden (house rule); explorer stacks as a list; DataRange is a static list with the narrowed band above it; LaunchTrack is a native swipe rail; SplitStatement stacks with a horizontal rule; everything else as the existing components already behave.

## Accessibility

One `<h1>`; `<h2>` per section; hero SVG `role="img"` with `aria-label`; explorer tablist with roving tabindex and pause control; `<ol>` for the inputs and steps; FAQ panels stay in the DOM and are `inert` when closed; JSON-LD for Service, BreadcrumbList and FAQPage; new labels never below 11px; all colours from the token set.

## Verification

1. `npm run check`, `npm run lint` (only the two pre-existing errors in Preloader and ThemeToggle), `npm run check:routes`, `npm run build`.
2. Playwright captures against the dev server: desktop light, desktop dark, iPhone 13, JavaScript disabled; keyboard tab order; reduced-motion pass.
3. Word-multiset check: every word in the document appears in the rendered page text.
4. Review against the brief's section 22 checklist.

## Out of scope

The blocking defects found in the AI Automation review (hydration-hidden hero copy, inert form, launch gate) are not fixed here; the client will schedule them separately. The `.superpowers/` folder is left out of the commit.

# AI Search Visibility, Data and Dashboards, AI Creative Production: design spec

Date: 2026-09-04
Routes: `/ai-hub/ai-search-visibility`, `/ai-hub/data-and-dashboards`, `/ai-hub/ai-creative-production`
Sources of truth: `Content/AI Search Visibility.docx`, `Content/Data and Dashboard Services.docx`, `Content/AI Creative Production.docx` (client-supplied). Every visible string on each page is taken from its document verbatim, with the departures recorded below and in the header of each content file.

## Goal

Add the third, fourth and fifth AI Hub pages to the same architecture as `/ai-hub/ai-automation` and `/ai-hub/campaign-intelligence`: one Astro route owning the head and Service JSON-LD, one React island for the body, one verbatim content file, shared components reused where they fit, and content-specific SVG drawings that depict the section they sit in. The client's brief for this round: never sloppy, no layouts copied from AI Automation, every glyph and drawing relatable to the content, animation on every drawing, mobile clean, reduced motion respected.

## Decisions taken with the client (2026-09-03)

| Topic | Decision |
| --- | --- |
| "Run a Free Visibility Check" (AI Search Visibility secondary CTA) | Links to the contact page when `/contact` is built; until then it falls back to the on-page form (`#quote`) via `routeExists` |
| AI Creative Production calls to action | "Book a Creative Diagnostic" is primary and the only CTA in the banner and the closing block. "See Our AI Creative Work" is withheld until a portfolio exists |
| Portfolio and results sections | Not rendered on any page. "See the Work" (Creative), "AI Search Visibility Results" and "Dashboards We Have Built" are placement instructions with nothing approved to show. Nothing is invented for them; each gap is documented in the page body |
| Sequence | All three pages built, then reviewed together |
| Ecommerce imagery from the brief | Ignored, per the client |
| Figures in drawings | None anywhere. Bars have no scale, tiles no values |
| Faces and people | None. The UGC sketch uses a silhouette only, because the document forbids presenting synthetic presenters as genuine people |

## Rules carried over from the Campaign Intelligence review

- Every drawing has its own visual grammar and its own loop; under `prefers-reduced-motion: reduce` every loop stops in its finished state.
- All text renders at 11px or more, including SVG labels after viewBox scaling.
- Numbers ascend in visual order and DOM order equals visual order.
- Nothing readable starts hidden; scroll reveals dim to 0.55 at most.
- Hero buttons wrap below `sm`; no horizontal overflow from 320 to 1920.
- Links go only to built routes; unbuilt targets render as plain text through `Crosslink`.
- Hydration-safe motion via `usePrefersReducedMotion`; GSAP inside `gsap.matchMedia` gated on `(min-width: 1024px) and (prefers-reduced-motion: no-preference)`.

## Page structure

### AI Search Visibility

| # | Section | Component | Drawing |
| --- | --- | --- | --- |
| hero | Banner | `ServiceHero` + `SignalPath` | Three stations, Find / Understand / Reference, with a citation chip at the end and a flow packet along the line |
| 01 | What We Do / services (7) | `VisibilityBookends` | Baseline and Monitoring pinned either side of the five levers; each bookend has its own sketch |
| 02 | AI Website Development | `SiteFork` | The diagnostic forks: existing website can be improved, or larger development work is needed |
| 03 | How the Work Moves (5) | `ReturnLadder` | A spine with a measured return path, "repeat the agreed searches" |
| 04 | Monthly support (9) | `MonthlyBoard` | Twelve-tick month strip with a lit tick, duties in a 3x3 grid |
| 05 | Work | shared | |
| 06 | FAQs (13) | `FaqList` | |
| 07 | Closing | `CtaBand` | Primary plus the free-check secondary |
| 08 | Insights | shared | |

### Data and Dashboards

| # | Section | Component | Drawing |
| --- | --- | --- | --- |
| hero | Banner | `ServiceHero` + `OneView` | Six source chips feeding one dashboard that refreshes on a loop |
| 01 | Services (6) | `DashboardGallery` | Each dashboard drawn as the view it would be; Data Integration as a band underneath |
| 02 | Elements (7) | `DashboardAnatomy` | One dashboard with seven numbered callouts that light on hover or focus |
| 03 | ROI | `RoiLedger` | Cost column against value column under one period bracket; two business-model cards |
| 04 | Scope | `ScopeScale` | A track from a small dashboard to a large reporting system; the eight diagnostic questions |
| 05 | Process (7) | `BuildSteps` | Seven layers of a build that stack as the reader scrolls |
| mid | Growth CTA | `GrowthCta` | Support copy borrowed from the closing section |
| 06 | Work | shared | |
| 07 | FAQs (13) | `FaqList` | |
| 08 | Closing | `CtaBand` | |
| 09 | Insights | shared | |

### AI Creative Production

| # | Section | Component | Drawing |
| --- | --- | --- | --- |
| hero | Banner | `ServiceHero` + `ReviewLine` | Frames pass under a review lens: Generated, Reviewed, Delivered |
| 01 | What We Produce (4) | `ProduceGrid` | Each output drawn as itself: vertical video, presenter and hooks, product with changing settings, one idea into many versions |
| 02 | Built for Campaign Volume | `FatigueRelay` | Attention curves relaying, fed by one approved direction |
| 03 | Quality and Human Review (5) | `ReviewStrip` | Five frames on a filmstrip, improving stage by stage, with a playhead |
| 04 | How the Work Moves (6) | `Swimlanes` | Two lanes, ENH and You; each step sits in the lane of its own sentence's actor |
| 05 | Monthly | `ScopeCard` | One-off or monthly; inclusions as chips, exclusions struck |
| 06 | Work | shared | |
| 07 | FAQs (13) | `FaqList` | |
| 08 | Closing | `CtaBand` | Primary only |
| 09 | Insights | shared | |

## Shared changes

- `ServiceHero`: optional `secondary` and `secondaryHref`; the secondary renders only when supplied.
- `CtaBand`: optional `secondaryHref` and `whatsappLabel`; the secondary renders only when a label and a target exist.
- `CapabilityGlyph`: `baseline` and `picture` added.
- `globals.css`: `ci-scan-x`, `ci-grow-x`, `ci-slide` loops added to the Campaign Intelligence drawing set; `.ci-flow` now sets `vector-effect: none` so its dash pattern is measured against `pathLength="100"` (one packet per path) rather than in screen pixels.
- `CampaignTimeline`: card numbers come from the presented order by index instead of a render-time counter (lint).
- `sitemap.ts`: the three routes are in `BUILT` and the AI Hub children link to them.

## Known gaps for hand-over

- `/contact` is not built, so the free visibility check falls back to the on-page form.
- `/ai-hub/intelligent-web` is not built, so the AI Website Development mention renders as text.
- Forms still have no endpoint (site-wide, flagged earlier).
- The three gated sections wait on approved examples.

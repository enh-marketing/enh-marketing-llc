# Data and Dashboard Services page: design record

Date: 2026-09-04
Route: `/ai-hub/data-and-dashboards`
Source of truth: `Content/Data and Dashboard Services.docx` (client-supplied). Every visible string on the page comes from it verbatim, with the one departure recorded below.

## Architecture

The same shape as the two AI Hub pages already live: one Astro route owning the head and its Service JSON-LD, one React island for the body, one content file holding the document verbatim, and drawings that depict the section they sit in rather than decorating it.

- `src/pages/ai-hub/data-and-dashboards.astro`
- `src/page-bodies/ai-hub-data-and-dashboards.tsx`
- `src/content/services/data-and-dashboards.ts`

## Departure from the source

"Dashboards We Have Built" is not rendered. It is a placement instruction with no approved examples behind it, so nothing is shown and nothing is invented. The gap is documented in the page body where the section would go. Supply approved dashboards and the section goes in there.

## Sections

| # | Section | Component | What it draws |
| --- | --- | --- | --- |
| hero | Banner | `ServiceHero` + `OneView` | Six source chips feeding one view that refreshes |
| 01 | Our Data and Dashboard Services | `DashboardStrata` | One mass cut through: six beds of unequal depth |
| 02 | The Main Elements of a Reporting Dashboard | `DashboardAnatomy` | An upright plate with seven numbered callouts |
| 03 | Marketing ROI | `RoiLedger` | Cost against value under one period bracket |
| 04 | Dashboard Scope and Reporting Needs | `ScopeScale` | A scale between the document's two named ends |
| 05 | How the Dashboard Project Works | `BuildSteps` | A schedule with a launch line |

### Why the services section is a cut, not a grid

Five of the six services are dashboards a person reads. The sixth, data integration and preparation, is not a view at all: the document says it happens "before it reaches the dashboard". It is not beside the other five, it is under them. So the section is one block cut through and seen in section, six beds of unequal depth with no gaps and no per-item borders, each bed's matter drawn to run past the right edge and be cut by it. The integration bed is the deepest and carries that phrase on the rule above it.

Bed depth follows how much the document gives each item, so the mass has an uneven grain rather than six equal rows. The ground steps down the theme's own neutral surface scale, `--color-ink-3` to `--color-void`, which is white to warm grey in the light theme and a real deepening in the dark one.

### Faults found and fixed during review

- The beds were first tinted by mixing brand red into each ground, deepening to eleven percent at the foot, which turned the section pink.
- The borehole animation held every bed at 0.62 opacity and lit them one at a time, so five of six sat under a grey film with their copy dimmed.
- The bars used `ci-grow` and `ci-grow-x`, which scale an element from 0.04 and leave it absent for much of every cycle. Across four to seven staggered bars that reads as a rendering fault, worst in the dark theme.
- The elements section and the process section were originally the same arrangement mirrored, a pinned drawing beside a scrolling list, each leaving most of its drawing column empty.

## House rules this page is held to

- Copy is verbatim and every word stays visible. No interaction hides, truncates or gates a paragraph.
- No invented figures, percentages, currency or metrics in any drawing.
- Numbers ascend in DOM order and in visual order.
- All text renders at 11px or more, including SVG labels after viewBox scaling, which is why drawing captions are HTML rather than `<text>`.
- No horizontal overflow from 320 to 1920.
- Under `prefers-reduced-motion` the page runs no animation at all, and every drawing rests in a readable finished state.

## Interaction

The vocabulary is taken from the approved AI Automation page rather than invented: `group-hover` colour shifts at `duration-500`, a hairline that grows and turns brand, and `motion-reduce` escapes throughout.

Scroll-driven behaviour, per section:

- The scope marker is placed by the reader rather than by a timer: it walks the scale from the small end to the large one with the track filling behind it, because where a business lands on that scale is what the diagnostic decides.
- The schedule fills, a marker walks it, and the launch line and its label go from ash to brand once the reader passes the boundary.
- A borehole descends the services mass, sampling each bed as it passes.

## Known gaps

- The enquiry form still has no submit endpoint. Site-wide, predates this page.
- `/contact` is not built.

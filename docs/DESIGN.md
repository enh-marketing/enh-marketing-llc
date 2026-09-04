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

Looping SVG classes live in `globals.css` under the Campaign Intelligence block: `ci-draw`, `ci-flow`, `ci-grow`, `ci-grow-x`, `ci-twinkle`, `ci-blink`, `ci-blink-soft`, `ci-scan-x`, `ci-scan-y`, `ci-slide`, `ci-sweep`. Two traps:

- `.ci-draw` and `.ci-flow` set `vector-effect: none` on purpose. Under `non-scaling-stroke` Chromium measures the dash in screen pixels, so any path longer than 100px renders as a dash, a gap and a stub. Their stroke widths are therefore in viewBox units.
- `.ci-blink` sets `opacity` as a stylesheet rule, which beats an `opacity="0.1"` attribute. For a tinted wash use `.ci-blink-soft` with `fillOpacity`.

## Layout

- `Container` holds a 1240px measure at `xl`.
- Radii: `1.5rem` for content cards, `1.25rem` for panels and drawing frames. Do not mix within a section.
- Section wrapper: `relative overflow-x-clip py-14 sm:py-16`, lifted to `py-20 sm:py-24` for a chapter that should read as a break.
- No horizontal overflow at any width from 320 to 1920.

## Component inventory

Shared: `ServiceHero`, `SectionHeader`, `CtaBand`, `GrowthCta`, `FaqList`, `StickyCTABar`, `Work`, `Insights`, `TrustStrip`, `LeadForm`, `Crosslink` (renders unbuilt routes as plain text; a link to a 404 is worse than no link).

Arrangements already used, which new sections must not repeat: pinned explorer, waypoint path, diagnostic sheet, launch track, operations reach, phase rail, converging inputs, two-sided split, bedded mass, upright plate, horizontal schedule, vertical swimlanes, spine with return loop, pinned chapter with an index.

Withdrawn, and not to be revived: stepped boundary, narrowing measure, measured type silhouette, staged canvas. All four were rejected as "just a list", and the reason is worth keeping. Each changed the ornament and kept the skeleton: one item per row, copy on one side, a picture on the other. A stepped hairline, a tinted bed, a measured outline and a pinned canvas are four coats on the same list.

## What separates an approved section from a rejected one

Measured across `/ai-hub/ai-automation` (approved) and the first four attempts at the AI Search Visibility services section (rejected):

| | approved | rejected |
|---|---|---|
| `<rect>` per SVG | ~1 (small glyphs) | ~10 (large wireframes) |
| Service names on screen at once | all seven | one |
| Scroll needed to learn the offer | none | ~4,400px |

The rules this yields outrank any amount of conceptual cleverness:

1. **Every service name is legible at once.** A services section whose reader cannot see what is being sold has failed before its drawing is judged.
2. **A drawing that has to be taught is not a drawing.** At most three labels, each a phrase from the document, answering exactly one question. `PERSON` / `MACHINE` works because nobody has to learn it. Position above a rule meaning "on your own site", brackets meaning "these two measure", a gap meaning "blocked": each is a notation, and a reader asked to learn four of them before the picture speaks will not.
3. **Show the working.** Where a section sorts its items, print the clause the sort was read from. It makes the arrangement checkable, and it stops items in one group from feeling identical, which is what makes a category drawing sit still across consecutive selections.
4. **No quantities.** These pages promise "no counts, no scores". A percentage nobody can measure by eye is both a broken promise and unreadable.
5. **`--color-line` is for borders, never for meaning.** It is 1.4:1 against the dark ground (#2e2e2e on #101010) and 1.1:1 against the light one (#d2cdc3 on #f7f7f6). Any line inside a drawing that carries meaning is inked in `ash`, in both themes.
6. **Do not give one section its own theme.** A `chapter-dark` class forced this section to near-black in both themes, so the light theme ran white, cut to #101010 for one section, then cut back. Nothing else on the site does that, and it read as a seam rather than a chapter. A section is set apart by scale, pacing and structure, not by opting out of the palette.
7. **A drawing per subject, not one drawing per section.** Seven services need seven pictures. A single drawing that only changes state cannot depict a crawler meeting robots.txt AND a page that answers AND markup matching what is visible: it collapses into the one abstract shape all seven have in common, which is what "same random diagram with no meaning" named. Each drawing answers one question about its own service, in its own copy's words.
8. **`useEnhanced` reports false on the first paint**, by design, so server and client agree. An effect that reads a ref only rendered in the enhanced branch must list the enhanced flag in its dependencies, or it runs once against a null ref and never again.
9. **A GSAP `from` tween renders its start state on creation.** A timeline waiting on a ScrollTrigger that never fires (deep link, restored scroll, refresh mid-page) leaves its targets at `scaleX(0)` permanently. Pass `immediateRender: false` on every entrance tween.

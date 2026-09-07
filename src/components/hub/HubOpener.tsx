"use client";

import { ParallaxLayers } from "@/components/fx/ParallaxLayers";
import { categories } from "@/content/ai-hub";

/** The AI Hub page opener, drawn rather than photographed.
 *
 *  WHY DRAWN. The photographs that came with the parallax component were a
 *  moonlit mountain and a figure on a ridge: someone else's assets, served
 *  from someone else's CDN, saying nothing about AI marketing, and photography
 *  on a site whose language everywhere else is drawn diagrams. This is the
 *  same effect with the same layer rates, built from the site's own tokens and
 *  type, serving nothing from outside.
 *
 *  WHAT CARRIES THE DEPTH. In the photo version the figure stood in front of
 *  the title and cut it off, and that occlusion is what made it read as depth
 *  rather than as one picture sliding. A drawing has to earn the same thing,
 *  so the front layer here is an opaque plane one step up the surface ladder
 *  (bg-ink against the page's bg-void) with a horizon rule along its top. The
 *  title sits behind that horizon, and because the title travels at 40 and the
 *  plane at 10, the words sink behind it as the page scrolls.
 *
 *  WHAT THE COLONNADE IS. Eight verticals, one per category, evenly spaced and
 *  all the same height. Equal on purpose: unequal heights would read as a bar
 *  chart, which would be a quantity this page has no data for and no document
 *  to support. They are the eight services standing under one name, which is
 *  the only thing the hub asserts.
 *
 *  THE WORDS. "AI Hub" is the site's own navigation label for this pillar and
 *  is the only text here, because no document for this page exists yet. No
 *  tagline, no promise, no count. */

export function HubOpener() {
  return (
    <ParallaxLayers
      className="h-[130vh]"
      /* A dark chapter, which globals.css describes as its own pattern:
         redefine the role tokens on one element and everything inside turns,
         with no per-component work. It is here because the light surface
         ladder climbs toward white, so a raised foreground plane on paper is
         *lighter* than the page and gives a drawn horizon almost no contrast.
         The first attempt at this opener was a pale band cutting a pale word,
         which read as clipping rather than as depth. These are the dark
         theme's own values, and like every chapter on this site it stays dark
         in both themes because it is structure, not a theme response. */
      stageClassName="bg-void [--color-ash:#8c8c87] [--color-brand-text:#ff2e3a] [--color-fog:#a3a39e] [--color-ink-2:#171717] [--color-ink-3:#1e1e1e] [--color-ink:#101010] [--color-line:#2e2e2e] [--color-snow:#f7f7f5] [--color-void:#060606]"
      layers={[
        /* Back: the site's grid backdrop, the same one the hero panels use.
           Oversized top and bottom so travelling down never reveals an edge. */
        {
          y: 70,
          children: (
            <div
              aria-hidden
              className="absolute -inset-y-1/2 inset-x-0 opacity-[0.55]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
                backgroundSize: "72px 72px",
              }}
            />
          ),
        },

        /* Mid: eight verticals, one per category.
           Positioned absolutely rather than with flex: `w-px flex-1` is a
           contradiction and flex wins, which rendered them as eight wide grey
           bars instead of eight rules. */
        {
          y: 55,
          children: (
            <div aria-hidden className="absolute inset-0">
              {categories.map((c, i) => (
                <span
                  key={c.no}
                  className="absolute bottom-0 w-px bg-ash/25"
                  style={{ left: `${8 + i * 12}%`, top: "-40vh" }}
                >
                  <span
                    className="absolute left-1/2 block h-1.5 w-1.5 -translate-x-1/2 bg-ash/70"
                    style={{ top: "110vh" }}
                  />
                </span>
              ))}
            </div>
          ),
        },

        /* The name, sitting on the horizon.
           The overlap is a share of the title's own height rather than a gap
           in viewport units. Held in vh it measured 15% on a 1120px screen and
           41% on a phone, because the type scales with width while the gap
           scales with height, so the phone sliced the letterforms in half.
           Anchored to the horizon and pulled up 85% of itself, the plane takes
           the same lower 15% at every size. Sizing it against the 130vh track
           rather than the viewport was the earlier bug: it put the words at
           936px on a 900px screen, so the opener had no title at all. */
        {
          y: 40,
          children: (
            <div className="absolute inset-x-0 top-[76vh] flex justify-center">
              <h1 className="font-display -translate-y-[85%] px-6 text-center text-[clamp(3rem,13vw,10rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.03em] text-snow">
                AI Hub
              </h1>
            </div>
          ),
        },

        /* Front: the plane that occludes, and the only thing alive at rest. */
        {
          y: 10,
          children: (
            <div aria-hidden className="absolute inset-x-0 bottom-0 top-[76vh] border-t border-line bg-ink">
              {/* A static mark with a ring blinking over it. ci-blink-soft is
                  forced to opacity 0 under reduced motion, so the mark itself
                  has to be the thing that is always visible. */}
              <span className="absolute left-1/2 top-0 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand">
                <span className="ci-blink-soft absolute -inset-1.5 block rounded-full border border-brand" />
              </span>
            </div>
          ),
        },
      ]}
    />
  );
}

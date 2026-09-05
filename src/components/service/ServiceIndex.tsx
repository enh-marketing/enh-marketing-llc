"use client";

import { routeExists } from "@/lib/sitemap";
import { cn } from "@/lib/cn";
import { Rise } from "@/components/fx/Reveal";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";

export type IndexEntry = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  /** The child page, where the pillar has one. Rendered as a link only when
   *  the route is built; an unbuilt destination keeps the card and loses the
   *  affordance, exactly as Crosslink does inside body copy. */
  href?: string;
};

/** A pillar's children, as the page's main event.
 *
 *  WHY THIS IS THE BIGGEST THING ON A PILLAR PAGE. A hub page exists to send
 *  people somewhere. Everything else here -- the argument, the process, the
 *  measures -- is context for this one decision, so the entries get the largest
 *  cards, the widest spans and the only arrows on the page.
 *
 *  UNEVEN BY DESIGN. A flat three-across grid of nine identical tiles is the
 *  single most generic thing a services page can do, and it also lies: these
 *  children are not equally weighted. The first two entries in each document
 *  take a wider span, which gives the section a rhythm and puts the two the
 *  source leads with where the eye lands first.
 *
 *  A CARD WITHOUT A PAGE STILL EARNS ITS PLACE. Several children are written up
 *  in these documents before their pages exist. Their cards render in full and
 *  simply do not link, because the sentence describing the service is true
 *  whether or not there is somewhere to click; hiding them would misrepresent
 *  what the agency offers, and linking them would produce a 404 that the
 *  surrounding copy vouches for. */
export function ServiceIndex({ items, wide = 2 }: { items: IndexEntry[]; wide?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((item, i) => {
        const live = !!item.href && routeExists(item.href);
        const span = i < wide ? "lg:col-span-3" : "lg:col-span-2";
        const inner = (
          <>
            <div className="flex items-start justify-between gap-6">
              <span
                aria-hidden
                className="font-display text-[2.1rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_var(--color-line)]"
              >
                {item.no}
              </span>
              {/* CapabilityGlyph is h-full/w-full by contract: the caller
                  sizes the box around it, as PinnedExplorer does. Passing a
                  size class to the svg itself leaves it filling whatever it is
                  in, which stretched these cards to 700px tall. */}
              <span className="block h-8 w-8 shrink-0 text-brand">
                <CapabilityGlyph variant={item.glyph} />
              </span>
            </div>

            <h3
              className={cn(
                "font-display mt-6 font-extrabold uppercase leading-[1.16] text-snow",
                i < wide
                  ? "text-[clamp(1.15rem,2.2vw,1.6rem)]"
                  : "text-[clamp(1.05rem,1.8vw,1.25rem)]",
              )}
            >
              {item.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{item.body}</p>

            {/* The arrow is the promise of a destination, so only a built page
                gets one. */}
            {live && (
              <span
                aria-hidden
                className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand"
              >
                <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                  <svg
                    viewBox="0 0 16 16"
                    className="absolute h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5"
                    fill="none"
                  >
                    <path
                      d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 16 16"
                    className="absolute h-4 w-4 -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
                    fill="none"
                  >
                    <path
                      d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            )}
          </>
        );

        const base =
          "group relative flex h-full flex-col rounded-2xl border border-line bg-ink-3 p-7 transition-colors duration-500";

        return (
          <Rise key={item.title} delay={0.04 * i} className={cn("h-full", span)}>
            {live ? (
              <a href={item.href} className={cn(base, "hover:border-brand/60")}>
                {inner}
              </a>
            ) : (
              <div className={base}>{inner}</div>
            )}
          </Rise>
        );
      })}
    </div>
  );
}

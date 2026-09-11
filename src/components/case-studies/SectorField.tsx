"use client";

import { useMemo } from "react";
import { getLenis } from "@/components/fx/SmoothScroll";
import { cn } from "@/lib/cn";
import { masthead, sectors, type Study } from "@/content/case-studies";

/** THE FIELD: who the work was for, drawn as the thing it is.
 *
 *  THE ARRANGEMENT IS THE ARGUMENT. A case study archive's first honest claim
 *  is not "we are good", it is "here is who has hired us, and how many of
 *  them". So the opening drawing is a tally: one row per sector, one tick per
 *  engagement, the leader running out to the count. A reader can count the
 *  ticks and check the number at the end of the row against them, which is the
 *  test every figure on this site has to pass — nothing here is a proportion
 *  nobody can measure by eye.
 *
 *  IT IS ALSO THE CONTENTS PAGE. Every tick is a link to that study, named
 *  with its client, and every sector name filters the archive below. That is
 *  the whole reason it earns hover states: this site's rule is that a hover
 *  state on something you cannot act on is a lie, and here both the row and
 *  every mark on it go somewhere.
 *
 *  A LIGHT WALKS THE ROW. `ci-blink` on an overlay above each tick, delayed by
 *  its position, so a single highlight travels the whole field continuously —
 *  the idiom DESIGN.md records for exactly this. The ticks themselves are
 *  drawn in `line` underneath and never move, so under prefers-reduced-motion
 *  (where the animation is switched off and the overlay rests at zero opacity)
 *  the field is complete and readable.
 *
 *  THE TOUCH TARGET IS BIGGER THAN THE MARK. A tick is a three-pixel stroke,
 *  which is right for the drawing and unusable with a thumb, so the link is
 *  padded out to a full target around it. */
export function SectorField({
  studies,
  active,
  onSelect,
  className,
}: {
  studies: Study[];
  active: string | null;
  onSelect: (sector: string | null) => void;
  className?: string;
}) {
  const rows = useMemo(() => {
    const bySector = new Map<string, Study[]>();
    for (const s of studies) bySector.set(s.sector, [...(bySector.get(s.sector) ?? []), s]);
    return sectors(studies).map((sector) => ({
      ...sector,
      studies: bySector.get(sector.label) ?? [],
    }));
  }, [studies]);

  /** One light for the whole field, so it reads as a single pass rather than
   *  as eight rows each blinking on their own clock. */
  const CYCLE = 6;
  let tick = 0;

  const jump = (sector: string) => {
    onSelect(active === sector ? null : sector);
    const target = document.getElementById("archive");
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { offset: -8 });
    else target.scrollIntoView({ behavior: "auto", block: "start" });
  };

  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-brand-text">
        {masthead.fieldLabel}
      </p>
      <p className="mb-5 text-[0.6875rem] text-ash">{masthead.fieldHint}</p>

      <ul className="border-t border-line">
        {rows.map((row) => {
          const on = active === row.label;
          return (
            <li key={row.label} className="border-b border-line">
              <div className="group flex items-center gap-3 py-2.5 sm:gap-4">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => jump(row.label)}
                  className={cn(
                    "tap-safe font-display w-[7.5rem] shrink-0 text-left text-[0.6875rem] font-extrabold uppercase leading-tight tracking-[0.06em]",
                    "transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-[9.5rem]",
                    on ? "text-brand" : "text-fog group-hover:text-snow",
                  )}
                >
                  {row.label}
                </button>

                <span className="flex min-w-0 shrink-0 items-center">
                  {row.studies.map((study) => {
                    const delay = `${((tick++ % 22) * CYCLE) / 22}s`;
                    return (
                      <a
                        key={study.slug}
                        href={`/case-studies/${study.slug}`}
                        aria-label={`${study.client}: ${study.title}`}
                        title={study.client}
                        className="relative flex h-7 w-[0.9rem] items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-[1.05rem]"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "block h-5 w-[3px] rounded-full transition-colors duration-300",
                            on ? "bg-brand" : "bg-line group-hover:bg-ash",
                          )}
                        />
                        <span
                          aria-hidden
                          className="ci-blink absolute left-1/2 top-1/2 h-5 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand"
                          style={{ animationDelay: delay }}
                        />
                      </a>
                    );
                  })}
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "h-px min-w-0 flex-1 transition-colors duration-300",
                    on ? "bg-brand/40" : "bg-line",
                  )}
                />

                <span
                  className={cn(
                    "font-display shrink-0 text-[0.6875rem] font-extrabold tabular-nums transition-colors duration-300",
                    on ? "text-brand" : "text-ash group-hover:text-brand-text",
                  )}
                >
                  {row.count}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

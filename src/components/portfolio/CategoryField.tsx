"use client";

import { useMemo } from "react";
import { getLenis } from "@/components/fx/SmoothScroll";
import { cn } from "@/lib/cn";
import {
  CATEGORY_ORDER,
  CATEGORIES,
  masthead,
  type Category,
  type Project,
} from "@/content/portfolio";

/** THE FIELD: what the work was, drawn as the thing it is.
 *
 *  IT IS `SectorField`'S TALLY, BROKEN INTO BLOCKS. Same argument, same
 *  notation: one mark per project, countable by eye, with the number printed
 *  beside the marks so a reader can check one against the other. What changes
 *  is the shape, and the content forced it. The case studies tally eight
 *  sectors of one to five, which fits on eight single lines; this tallies three
 *  disciplines of nine, eleven and twenty-four, and twenty-four marks on one
 *  line is four hundred pixels before the label. So each discipline's marks
 *  wrap into a block, and the three blocks are compared by area rather than by
 *  length. Nothing is scaled, nothing is a proportion, and every mark is still
 *  one project.
 *
 *  THE COLUMN SUMS TO MORE THAN THE ARCHIVE, and that is the honest answer
 *  rather than a bug: nine projects are filed under two disciplines and are
 *  marked in both, because they genuinely are in both. Nothing on the page adds
 *  the three numbers together, and the masthead's own sentence says so.
 *
 *  IT IS ALSO THE CONTENTS PAGE. Every mark is a link to that project, named
 *  with its title, and every discipline name filters the archive below. That is
 *  what earns it hover states: this site's rule is that a hover state on
 *  something you cannot act on is a lie, and here both the row and every mark
 *  on it go somewhere.
 *
 *  A LIGHT WALKS THE FIELD. `ci-blink` on an overlay above each mark, delayed
 *  by its position across the whole field, so a single highlight travels all
 *  three blocks continuously — the idiom DESIGN.md records for exactly this.
 *  The marks themselves are drawn underneath and never move, so under
 *  prefers-reduced-motion (where the animation is off and the overlay rests at
 *  zero opacity) the field is complete and readable.
 *
 *  THE TOUCH TARGET IS BIGGER THAN THE MARK. A mark is a three-pixel stroke,
 *  which is right for the drawing and unusable with a thumb, so the link is
 *  padded out to a full target around it. */
export function CategoryField({
  projects,
  active,
  onSelect,
  className,
}: {
  projects: Project[];
  active: Category | null;
  onSelect: (category: Category | null) => void;
  className?: string;
}) {
  const rows = useMemo(
    () =>
      CATEGORY_ORDER.map((key) => ({
        key,
        label: CATEGORIES[key].label,
        projects: projects.filter((p) => p.categories.includes(key)),
      })).filter((row) => row.projects.length > 0),
    [projects],
  );

  /** One light for the whole field, so it reads as a single pass rather than as
   *  three blocks each blinking on their own clock. The divisor is the number
   *  of marks actually drawn, not the archive length: nine projects are marked
   *  twice and the light has to visit every mark exactly once per cycle. */
  const CYCLE = 7;
  const total = rows.reduce((n, row) => n + row.projects.length, 0);
  let tick = 0;

  const jump = (category: Category) => {
    onSelect(active === category ? null : category);
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
          const on = active === row.key;
          return (
            <li key={row.key} className="border-b border-line">
              <div className="group grid grid-cols-[7rem_minmax(0,1fr)_auto] items-start gap-3 py-3.5 sm:grid-cols-[9.5rem_minmax(0,1fr)_auto] sm:gap-4">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => jump(row.key)}
                  className={cn(
                    "tap-safe font-display mt-1 text-left text-[0.6875rem] font-extrabold uppercase leading-tight tracking-[0.06em]",
                    "transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    on ? "text-brand" : "text-fog group-hover:text-snow",
                  )}
                >
                  {row.label}
                </button>

                {/* The block. It wraps, which is the whole reason this is not
                    one line per discipline: twenty-four marks in a row do not
                    fit beside a label at this measure, let alone on a phone. */}
                <span className="flex min-w-0 flex-wrap">
                  {row.projects.map((project) => {
                    const delay = `${((tick++ % total) * CYCLE) / total}s`;
                    return (
                      <a
                        key={project.slug}
                        href={`/portfolio/${project.slug}`}
                        aria-label={`${project.title}: ${row.label}`}
                        title={project.title}
                        className="relative flex h-6 w-[0.85rem] items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-[0.95rem]"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "block h-4 w-[3px] rounded-full transition-colors duration-300",
                            on ? "bg-brand" : "bg-line group-hover:bg-ash",
                          )}
                        />
                        <span
                          aria-hidden
                          className="ci-blink absolute left-1/2 top-1/2 h-4 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand"
                          style={{ animationDelay: delay }}
                        />
                      </a>
                    );
                  })}
                </span>

                <span
                  className={cn(
                    "font-display mt-1 shrink-0 text-[0.6875rem] font-extrabold tabular-nums transition-colors duration-300",
                    on ? "text-brand" : "text-ash group-hover:text-brand-text",
                  )}
                >
                  {row.projects.length}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

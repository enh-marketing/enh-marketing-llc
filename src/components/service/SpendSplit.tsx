"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

/** The hero: an account you cannot read, and then the same account separated.
 *
 *  WHY THIS. The document's first paragraph is the whole brief for this
 *  drawing: an account "can spend steadily for months and still be difficult to
 *  judge", it is "working well in some places and quietly wasting money in
 *  others", and "the reporting does not separate the two". So the drawing is a
 *  month of spend that reads as one undifferentiated block, and then resolves:
 *  the part producing customers fills in brand, the part leaking goes hollow.
 *  The separation is the service, and it is the first thing the page does.
 *
 *  NOTHING IS COUNTED. The blocks are a legible grid, not a budget, not a
 *  number of clicks and not a ratio anybody could read a figure off. This
 *  document gives no percentages, costs or results anywhere, so the drawing
 *  asserts only that two kinds of spend exist inside one flat total.
 *
 *  MOTION. One interval, two states, and it stops entirely under
 *  prefers-reduced-motion holding the separated state, which is the useful one:
 *  a reader who never sees it move still sees the point. */

/** How long each state holds, in ms. */
const BEAT = 2600;

/** Which cells of the run are producing. Fixed so the drawing is deterministic
 *  rather than reshuffling on every render. */
const PRODUCING = new Set([0, 1, 4, 5, 6, 9, 11, 12, 15, 16, 17, 20, 22, 23, 26]);
const CELLS = 28;

export function SpendSplit({ label }: {
  /** The drawing's accessible name, handed in from the page's content file
   *  rather than written here: every word on this page is the client's, and
   *  the sentence this drawing depicts is one the client can still edit. A
   *  copy held in this file would silently drift the moment that sentence
   *  changed. Required, so a caller cannot ship an unnamed role="img". */
  label: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [split, setSplit] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setSplit((s) => !s), BEAT);
    return () => clearInterval(t);
  }, [reduced]);

  /** Separated when the reader has motion off, or when the run says so. */
  const on = reduced || split;

  return (
    <div
      className={cn(
        // The house placement for a hero visual, matching PositionFourteen and
        // PagePurpose: anchored to the right gutter, centred, out of the flow,
        // and not rendered below the large breakpoint, where it would add its
        // own height and push the trust strip below the fold.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
      )}
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-6 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)] sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div
          role="img"
          aria-label={label}
          className="relative"
        >
          {/* The report line: a total that moves a little and settles nothing. */}
          <div className="flex items-center justify-between gap-4">
            <span aria-hidden className="h-2 w-20 rounded-full bg-fog/30" />
            <span
              aria-hidden
              className={cn(
                "h-2 rounded-full transition-all duration-700 ease-out motion-reduce:transition-none",
                on ? "w-10 bg-brand" : "w-14 bg-line",
              )}
            />
          </div>

          {/* The spend itself. */}
          <div aria-hidden className="mt-5 grid grid-cols-7 gap-1.5">
            {Array.from({ length: CELLS }).map((_, i) => {
              const producing = PRODUCING.has(i);
              return (
                <span
                  key={i}
                  className={cn(
                    "h-6 rounded-[3px] border transition-all duration-700 ease-out motion-reduce:transition-none",
                    on
                      ? producing
                        ? "border-brand/60 bg-brand/70"
                        : "border-dashed border-line bg-transparent"
                      : "border-line bg-line/60",
                  )}
                  style={{ transitionDelay: reduced ? undefined : `${(i % 7) * 45}ms` }}
                />
              );
            })}
          </div>

          {/* The two readings the report could not give. */}
          <div aria-hidden className="mt-5 flex items-center gap-4">
            <span className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "h-2.5 w-2.5 shrink-0 rounded-[2px] transition-colors duration-700 motion-reduce:transition-none",
                  on ? "bg-brand" : "bg-line",
                )}
              />
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-700 ease-out motion-reduce:transition-none",
                  on ? "w-full bg-brand/40" : "w-1/2 bg-line",
                )}
              />
            </span>
            <span className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "h-2.5 w-2.5 shrink-0 rounded-[2px] border transition-colors duration-700 motion-reduce:transition-none",
                  on ? "border-dashed border-line bg-transparent" : "border-line bg-line",
                )}
              />
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-700 ease-out motion-reduce:transition-none",
                  on ? "w-2/3 bg-line" : "w-1/2 bg-line",
                )}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

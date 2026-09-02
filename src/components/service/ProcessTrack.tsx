"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** A run of stages, drawn as a track you can point at.
 *
 *  Shared by the Performance Marketing and Meta Ads process sections, which are
 *  the same content shape — an ordered programme where each stage is a distinct
 *  piece of work — and so want one drawing rather than two of them.
 *
 *  WHAT THE SPACING MEANS. Nothing. The nodes are evenly spaced because neither
 *  document states how long any stage lasts; where a page does name a span it
 *  is in the stage's own words. Equal spacing can only assert order, which is
 *  the one thing both documents genuinely fix.
 *
 *  The rail fills to the selected stage, so the drawing also shows how far
 *  through the programme the reader is. The final leg fades rather than
 *  terminating when the last phase is ongoing, which on both pages it is.
 *
 *  Abstract throughout: a node, a tick and a block of work per stage, never a
 *  word. The panel beside it carries the meaning. */
export function ProcessTrack({
  count,
  active,
  pin,
  axis,
  openEnded = true,
}: {
  count: number;
  active: number;
  pin: PinRenderer;
  /** Ends of the run, where the source document names them. */
  axis?: [string, string];
  /** True when the final stage continues rather than completes. */
  openEnded?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-3/60 px-7 py-8">
      {axis && (
        <p
          aria-hidden
          className="mb-6 text-[0.6rem] font-semibold uppercase text-ash"
        >
          {axis[0]}
        </p>
      )}

      {/* The rail sits outside the list. A <span> as a direct child of <ol> is
          invalid markup, and it put two of them there on every page using this
          track; wrapping the list keeps the same positioning context without
          the list claiming two non-item children. */}
      <div className="relative">
        <span
          aria-hidden
          className="absolute bottom-4 left-[0.875rem] top-4 w-px -translate-x-1/2 bg-line"
        />
        <span
          aria-hidden
          className="absolute left-[0.875rem] top-4 w-px -translate-x-1/2 bg-brand transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ height: `calc((100% - 2rem) * ${active / Math.max(1, count - 1)})` }}
        />

        <ol className="relative space-y-5">
        {Array.from({ length: count }).map((_, i) => {
          const on = i === active;
          const passed = i < active;
          return (
            <li key={i} className="relative flex items-center gap-4">
              {/* The pin is the node. */}
              {pin(i, "shrink-0")}

              <span
                aria-hidden
                className={cn(
                  "h-px shrink-0 transition-all duration-500",
                  on ? "w-7 bg-brand" : "w-4 bg-line",
                )}
              />

              {/* A block of work per stage. Widening with the run is ordering,
                  not a duration: nothing here is drawn to scale. */}
              <span
                aria-hidden
                className={cn(
                  "h-9 rounded-lg border transition-colors duration-500",
                  on
                    ? "border-brand/60 bg-brand/[0.09]"
                    : passed
                      ? "border-line bg-ink-2"
                      : "border-line bg-ink-2/50",
                )}
                style={{ width: `${46 + i * 8}%` }}
              />

              {/* The open end. */}
              {openEnded && i === count - 1 && (
                <span
                  aria-hidden
                  className="h-px flex-1 bg-gradient-to-r from-line to-transparent"
                />
              )}
            </li>
          );
        })}
        </ol>
      </div>

      {axis && (
        <p
          aria-hidden
          className="mt-6 text-right text-[0.6rem] font-semibold uppercase text-ash"
        >
          {axis[1]}
        </p>
      )}
    </div>
  );
}

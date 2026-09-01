"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Seven services, drawn as the loop they run in.
 *
 *  WHY A LOOP AND NOT A LINE. The document is explicit that this work does not
 *  end: it "creates a steady cycle of filming, publishing and learning", and the
 *  last service — reporting — feeds the first, because comments and response
 *  "give us useful direction for the next shoot". A rail with a start and a
 *  finish would say the opposite of that.
 *
 *  THE PINS ARE A RAIL ABOVE THE TRACK, not stations on it. They are this
 *  section's tablist and must be reachable in numbered order; placed around the
 *  loop they would follow its geometry instead. Two diagrams on this site
 *  shipped that bug before it was caught.
 *
 *  Node positions are fixed percentages on a fixed-aspect box, so nothing is
 *  computed at runtime and the layout is measurable rather than hoped for.
 *
 *  Abstract throughout: a track, seven stations, one direction of travel. */

/** Where each station sits on the loop, clockwise from the top left. */
const AT: { x: number; y: number }[] = [
  { x: 18, y: 0 },
  { x: 50, y: 0 },
  { x: 82, y: 0 },
  { x: 100, y: 50 },
  { x: 82, y: 100 },
  { x: 50, y: 100 },
  { x: 18, y: 100 },
];

export function CycleTrack({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      {/* The tablist, in the order the document numbers the services. */}
      <div className="mb-6 flex flex-wrap items-center gap-2.5 border-b border-line pb-5">
        {Array.from({ length: count }).map((_, i) => pin(i))}
      </div>

      {/* The loop. */}
      <div className="relative mx-auto h-44 w-[86%]">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-dashed border-line"
        />

        {/* Which way it runs. */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand/70" />
          <span className="h-8 w-px bg-line" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand/40" />
        </span>

        {AT.slice(0, Math.min(count, AT.length)).map((pos, i) => {
          const on = active === i;
          return (
            <span
              key={i}
              aria-hidden
              className={cn(
                "absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-colors duration-500",
                on ? "border-brand bg-brand/20" : "border-line bg-ink-3",
              )}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <span
                className={cn(
                  "font-display text-[0.55rem] font-bold tabular-nums tracking-[0.1em] transition-colors duration-500",
                  on ? "text-brand-text" : "text-ash",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

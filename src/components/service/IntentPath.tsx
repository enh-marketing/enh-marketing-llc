"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** The buyer's path, and the stretch of it each channel works.
 *
 *  THE ONE CLAIM THE DOCUMENT MAKES OVER AND OVER. Google "captures demand that
 *  already exists"; Meta "builds interest and demand". Google's buying stage is
 *  "active research and decision"; Meta's is "discovery and consideration".
 *  Google suits it "when people already search for your category"; Meta when
 *  "the audience still needs to discover the offer". Three different rows, one
 *  spatial fact: the two channels work different stretches of the same path.
 *  So the drawing is that path, and it does not change between criteria,
 *  because the fact does not.
 *
 *  WHAT THE PINS DO AND DO NOT SAY. Each criterion has a pin on the path, and
 *  the selected one is marked. The pins are positions in the document's own
 *  order, not scores: nothing here says one channel wins a row. The two
 *  readings are set as text in the panel beside the drawing, under the
 *  document's own column headers, which is the only honest way to carry a
 *  comparison the source writes as a table.
 *
 *  NOTHING IS COUNTED. The curve has no axis, no scale and no unit. The
 *  document gives no volumes, costs or rates anywhere, and a curve that implied
 *  one would be inventing the only kind of claim this page refuses to make.
 *
 *  Driven entirely by CSS transitions on the selected index. */

/** Where each criterion's pin sits along the path, left to right. Spread
 *  evenly: the order is the document's, and no criterion is nearer the
 *  decision than another. */
const PIN_X = [86, 140, 194, 248, 302, 356, 410, 464];

export function IntentPath({
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
      {/* The pins are indicators; the selector above the drawing is the
          control. Laid over the path at their own positions. */}
      <div className="relative">
        <svg viewBox="0 0 520 260" className="h-auto w-full" aria-hidden>
          {/* The two stretches of the path. Left: the offer still has to be
              discovered. Right: the search has already happened. */}
          <rect x="16" y="26" width="242" height="176" rx="10" className="fill-ash/[0.05]" />
          <rect x="262" y="26" width="242" height="176" rx="10" className="fill-brand/[0.06]" />
          <line
            x1="260"
            y1="18"
            x2="260"
            y2="210"
            className="stroke-brand/45"
            strokeWidth="1"
            strokeDasharray="5 5"
          />

          {/* Demand along the path: low while nobody is looking, high once
              they are. No axis and no scale: it is a shape, not a figure. */}
          <path
            d="M16 186 C 120 184, 196 176, 260 150 C 330 122, 400 74, 504 56"
            className="fill-none stroke-line"
            strokeWidth="1.5"
          />
          <path
            d="M260 150 C 330 122, 400 74, 504 56"
            className="fill-none stroke-brand"
            strokeWidth="2"
          />

          {/* The path itself. */}
          <line x1="16" y1="210" x2="504" y2="210" className="stroke-line" strokeWidth="1" />

          {/* A dropped marker for the selected criterion, tying the pin above
              to the stretch of path it is being read on. */}
          <line
            x1={PIN_X[active] ?? PIN_X[0]}
            y1="210"
            x2={PIN_X[active] ?? PIN_X[0]}
            y2="228"
            className="stroke-brand"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transition: "all 500ms cubic-bezier(0.16,1,0.3,1)" }}
          />
          <circle
            cx={PIN_X[active] ?? PIN_X[0]}
            cy="210"
            r="4"
            className="fill-brand"
            style={{ transition: "all 500ms cubic-bezier(0.16,1,0.3,1)" }}
          />
        </svg>

        {/* The pins, at their own positions over the path. */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              className="absolute"
              style={{
                left: `${((PIN_X[i] ?? PIN_X[0]) / 520) * 100}%`,
                top: `${(150 / 260) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {pin(i, "pointer-events-auto")}
            </span>
          ))}
        </div>
      </div>

      {/* Which stretch is which, drawn rather than labelled: the document's own
          column headers sit on the panel beside this. */}
      <div aria-hidden className="mt-4 flex items-center gap-3 px-1">
        <span className={cn("h-1 flex-1 rounded-full bg-ash/30")} />
        <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-brand/60" />
        <span className={cn("h-1 flex-1 rounded-full bg-brand/60")} />
      </div>
    </div>
  );
}

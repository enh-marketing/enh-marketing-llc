"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: a catalogue where visibility has pooled in a few places.
 *
 *  WHY THIS. The document opens on a distribution problem, not a volume one:
 *  a store "may carry thousands of products while receiving most of its organic
 *  traffic through a small number of pages", and then says plainly that
 *  "traffic alone does not solve this". So the drawing is a catalogue with most
 *  of it dark and a handful of cells lit, and the lit set grows a little on each
 *  pass -- which is the service, and the only claim it makes is that more of the
 *  catalogue becomes reachable.
 *
 *  Cells are deliberately unequal in size. A uniform matrix would read as a
 *  spreadsheet and would also imply that every product is worth the same, which
 *  is the exact assumption the document argues against: the scope is
 *  "prioritised around search demand, stock availability, margins and
 *  commercial value... instead of treating every product and category as
 *  equally important".
 *
 *  NOTHING IS COUNTED. This document contains no numbers at all, so the grid
 *  states a shape and never a quantity: no cell carries a figure, the lit
 *  fraction is not a percentage of anything, and the cell count is a texture
 *  rather than a catalogue size.
 *
 *  MOTION. CSS keyframes on an interval that re-keys the lit layer. Position is
 *  never animated -- only which cells are lit -- and every keyframe ends on the
 *  finished state, so a browser that never animates still renders a complete
 *  catalogue. See globals.css, "Catalogue reach". */

/** A fixed, hand-set layout: column span and row span per cell, so the grid
 *  reads as a catalogue of differently sized things rather than a texture.
 *  Fixed rather than generated so the server and the browser agree. */
const CELLS: { w: number; h: number }[] = [
  { w: 2, h: 2 }, { w: 1, h: 1 }, { w: 1, h: 1 }, { w: 2, h: 1 },
  { w: 1, h: 1 }, { w: 1, h: 2 }, { w: 2, h: 1 }, { w: 1, h: 1 },
  { w: 1, h: 1 }, { w: 2, h: 2 }, { w: 1, h: 1 }, { w: 1, h: 1 },
  { w: 1, h: 1 }, { w: 2, h: 1 }, { w: 1, h: 1 }, { w: 1, h: 1 },
  { w: 1, h: 2 }, { w: 1, h: 1 }, { w: 2, h: 1 }, { w: 1, h: 1 },
  { w: 1, h: 1 }, { w: 1, h: 1 }, { w: 2, h: 1 }, { w: 1, h: 1 },
];

/** Which cells are reachable on each pass.
 *
 *  THE FULLEST SET IS FIRST, ON PURPOSE. This is the frame the page renders
 *  before any script runs, and the frame it keeps for a reader on reduced
 *  motion or in a browser whose animation clock never starts. It has to be the
 *  finished picture: a hero that stalls on one lit cell out of twenty-four
 *  would state the problem and never the service. The cycle then drops back and
 *  rebuilds, so the growth is still shown -- it is just not what a stalled page
 *  is left holding. */
const PASSES: number[][] = [
  [0, 9, 3, 16, 6, 13, 22, 1, 11, 18, 5],
  [0],
  [0, 9],
  [0, 9, 3, 16],
  [0, 9, 3, 16, 6, 13, 22],
];

/** The largest pass, so the rule along the base reads as a share of the
 *  catalogue rather than a share of the number of passes. */
const WIDEST = Math.max(...PASSES.map((p) => p.length));

const RUN_MS = 2200;

export function CatalogueReach({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    // Reduced motion keeps pass zero, which is already the finished picture.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const pass = PASSES[run % PASSES.length];
  const lit = new Set(pass);

  return (
    <div
      className={cn(
        // The house placement for a hero visual: right gutter, centred, out of
        // the flow, large screens only.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A product catalogue drawn as unequal cells. Most sit unlit while a small number are reachable through search, and that set grows."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div
          aria-hidden
          className="relative grid gap-1.5"
          style={{ gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "26px" }}
        >
          {CELLS.map((cell, i) => {
            const on = lit.has(i);
            return (
              <div
                key={i}
                className={cn(
                  "relative rounded-[3px] border transition-colors duration-700",
                  on ? "border-brand bg-brand/[0.12]" : "border-line",
                )}
                style={{ gridColumn: `span ${cell.w}`, gridRow: `span ${cell.h}` }}
              >
                {/* A reachable cell carries a mark: the route into it exists. */}
                {on && (
                  <span
                    key={run}
                    className="cat-lit absolute inset-0 flex items-center justify-center"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* The route in. A single rule along the base, filling as more of the
            catalogue becomes reachable -- a proportion of the drawing, never a
            figure. */}
        <div aria-hidden className="mt-5 h-px w-full bg-line">
          <div
            key={run}
            className="cat-route h-px bg-brand"
            style={{ width: `${(pass.length / WIDEST) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

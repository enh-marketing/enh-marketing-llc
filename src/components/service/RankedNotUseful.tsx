"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The SEO pillar hero: a page full of rankings that earn nothing.
 *
 *  WHY THIS. The document's first sentence is the whole page: "A website can
 *  rank for hundreds of keywords and still bring in very little business." A
 *  rising line would say the opposite of that, and a position badge would say
 *  the ranking is the prize. So the drawing is a ranked list where almost every
 *  row is inert, and only the few rows that lead anywhere carry a mark on the
 *  right.
 *
 *  The marked rows move between passes because which terms are worth having is
 *  the thing the work decides -- the document assesses keywords "by search
 *  intent and commercial value before they are added to the plan".
 *
 *  NOTHING IS COUNTED. No position numbers, no volumes, no percentages: this
 *  document gives none and its own FAQ position elsewhere on the site is that a
 *  ranking cannot be promised. Ten rows are texture meaning "a page of them",
 *  and the bar widths are a shape rather than a metric.
 *
 *  MOTION. CSS keyframes on an interval that re-keys the marked rows. The rows
 *  are static, so a browser that never animates still renders the full list.
 *  See globals.css, "Ranked not useful". */

const ROWS = 10;
/** Which rows lead somewhere, per pass. Fixed so the server and browser agree. */
const USEFUL = [
  [2, 6],
  [1, 5, 8],
  [3, 7],
  [0, 4, 9],
];
const RUN_MS = 2000;
/** Bar widths as a share of the row. A shape, never a search volume. */
const WIDTHS = [82, 64, 91, 55, 73, 48, 86, 61, 70, 58];

export function RankedNotUseful({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const useful = new Set(USEFUL[run % USEFUL.length]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A long list of ranked search terms, nearly all of them inert, with only a few carrying a mark to show they lead to enquiries."
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

        <ul aria-hidden className="relative space-y-3">
          {Array.from({ length: ROWS }, (_, i) => {
            const on = useful.has(i);
            return (
              <li key={i} className="flex items-center gap-3">
                {/* The ranked term. Every one of them is ranking, and they
                    are different lengths so the list reads as a page of real
                    terms rather than a loading skeleton. The track behind is
                    the width the row could occupy. */}
                <span className="h-2 flex-1 rounded-full bg-line/35">
                  <span
                    className="block h-2 rounded-full bg-line"
                    style={{ width: `${WIDTHS[i]}%` }}
                  />
                </span>
                {/* Only some of them lead anywhere. */}
                <span
                  key={on ? `${i}-${run}` : i}
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border",
                    on ? "rnu-hit border-brand bg-brand/15" : "border-line",
                  )}
                >
                  {on && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

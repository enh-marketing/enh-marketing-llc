"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: a Page and a business coming apart.
 *
 *  WHY THIS. The document's opening is a story about time, not about content.
 *  A company sets a Page up, "publishes regularly for a few months", and then
 *  "posting becomes less consistent, opening hours change, customer questions
 *  remain unanswered and the page gradually stops reflecting the actual
 *  business." So the drawing is two lines that start on top of each other and
 *  separate.
 *
 *  THE ARROWS ARE THE POINT. The sentence the document gives its own paragraph
 *  to is the one that makes the drift matter: "People may still check it before
 *  calling, visiting or buying." So people keep arriving at the lower line the
 *  whole way along, including where it has drifted furthest from the business.
 *  Without them this is just a chart of neglect; with them it is a cost.
 *
 *  NOTHING IS MEASURED. This document contains no figures at all and says so
 *  itself -- there is "no posting frequency that suits every business". The two
 *  lines carry no axis, no scale and no units: the gap between them is a
 *  distance, not a percentage, and the horizontal is a direction rather than a
 *  span of months.
 *
 *  MOTION. CSS keyframes on an interval that moves which arrival is lit. Both
 *  lines are static, so a browser that never animates still renders the drift
 *  in full. See globals.css, "Page drift". */

/** Where people arrive at the Page, along its length. Fixed so the server and
 *  the browser agree. */
const ARRIVALS = [26, 45, 62, 78, 92];
const RUN_MS = 1400;

export function PageDrift({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const lit = run % ARRIVALS.length;

  /** The Page's path, as a fraction of the drawing. Both lines leave the same
   *  point; only one keeps climbing. */
  const x = (p: number) => 16 + (p / 100) * 268;
  const business = (p: number) => 150 - (p / 100) * 96;
  const page = (p: number) => 150 - (p / 100) * 96 + Math.pow(p / 100, 1.7) * 92;

  return (
    <div
      className={cn(
        // The house placement for a hero visual: right gutter, centred, out of
        // the flow, large screens only.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="Two lines leaving the same point and separating: the business on one, its Facebook Page falling away below it, while people keep arriving at the Page all the way along."
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

        <svg viewBox="0 0 300 200" className="relative w-full" aria-hidden>
          {/* The gap between them, which is the whole subject. */}
          <path
            d={`M${x(0)} ${business(0)} ${Array.from({ length: 21 }, (_, i) => `L${x(i * 5)} ${business(i * 5)}`).join(" ")} ${Array.from({ length: 21 }, (_, i) => `L${x(100 - i * 5)} ${page(100 - i * 5)}`).join(" ")} Z`}
            fill="var(--color-brand)"
            opacity="0.07"
          />

          {/* The business, which carries on. */}
          <path
            d={`M${x(0)} ${business(0)} ${Array.from({ length: 21 }, (_, i) => `L${x(i * 5)} ${business(i * 5)}`).join(" ")}`}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* The Page, which does not. */}
          <path
            d={`M${x(0)} ${page(0)} ${Array.from({ length: 21 }, (_, i) => `L${x(i * 5)} ${page(i * 5)}`).join(" ")}`}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* They start together. */}
          <circle cx={x(0)} cy={business(0)} r="4" fill="var(--color-brand)" />

          {/* People still checking it, the whole way along. */}
          {ARRIVALS.map((p, i) => (
            <g
              // Re-keyed while lit so the arrival animation restarts each pass.
              key={i === lit ? `${p}-${run}` : p}
              className={i === lit ? "drift-hit" : undefined}
            >
              <path
                d={`M${x(p)} ${page(p) - 26}v16`}
                stroke="var(--color-brand)"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity={i === lit ? 0.9 : 0.3}
              />
              <path
                d={`M${x(p) - 3.5} ${page(p) - 13.5}l3.5 3.5 3.5-3.5`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={i === lit ? 0.9 : 0.3}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

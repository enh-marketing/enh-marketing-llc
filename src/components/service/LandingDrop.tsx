"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The Web pillar hero: the right people arriving, and most of them leaving.
 *
 *  WHY THIS. The document's opening pairs a success with a failure in one
 *  breath: "A strong campaign can bring the right person to your website. A
 *  slow page, confusing layout or broken form can lose them within seconds."
 *  Its heading is the fix -- "Give Every Click Somewhere Better to Land". So
 *  the drawing shows arrivals landing on a page and most of them peeling off
 *  sideways, with one route continuing through to the action.
 *
 *  THE ARRIVALS ARE NEVER THE PROBLEM. They all reach the page: the campaign
 *  worked. What changes across passes is how many get through, because that is
 *  the part this service moves.
 *
 *  NOTHING IS COUNTED. No bounce rate, no load time, no conversion figure. The
 *  document gives none, and the width of the surviving path is a proportion of
 *  a drawing rather than a measurement.
 *
 *  MOTION. CSS keyframes on an interval. The page, the arrivals and the exits
 *  are static; only which arrival is travelling changes, so a browser that
 *  never animates still renders the whole journey. See globals.css, "Landing
 *  drop". */

const ARRIVALS = 7;
const RUN_MS = 1500;

export function LandingDrop({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const travelling = run % ARRIVALS;
  const x = (i: number) => 24 + i * 42;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="Arrivals landing on a web page, most of them peeling away to the sides, with one route continuing through to the action at the bottom."
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

        <svg viewBox="0 0 300 220" className="relative w-full" aria-hidden>
          {/* Everyone arrives. The campaign did its job. */}
          {Array.from({ length: ARRIVALS }, (_, i) => (
            <g key={i}>
              <path
                d={`M${x(i)} 4v22`}
                stroke="var(--color-line)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle
                key={i === travelling ? `${i}-${run}` : i}
                className={i === travelling ? "ld-hit" : undefined}
                cx={x(i)}
                cy="4"
                r="3.5"
                fill="var(--color-brand)"
                opacity={i === travelling ? 1 : 0.35}
              />
            </g>
          ))}

          {/* The page they land on. */}
          <rect x="12" y="34" width="276" height="96" rx="8" fill="none" stroke="var(--color-line)" strokeWidth="1.6" />
          <rect x="28" y="50" width="118" height="7" rx="3.5" fill="var(--color-line)" />
          <rect x="28" y="66" width="86" height="5" rx="2.5" fill="var(--color-line)" opacity="0.6" />
          <rect x="176" y="50" width="96" height="62" rx="5" fill="var(--color-line)" opacity="0.28" />
          <rect x="28" y="86" width="118" height="5" rx="2.5" fill="var(--color-line)" opacity="0.6" />
          <rect x="28" y="100" width="70" height="5" rx="2.5" fill="var(--color-line)" opacity="0.6" />

          {/* Most of them leave, sideways, without reaching anything. */}
          <path d="M62 130c0 22-26 22-40 30M100 130c0 24-18 26-30 34M226 130c0 22 26 22 40 30M188 130c0 24 18 26 30 34" fill="none" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 5" />

          {/* One route continues. */}
          <path d="M150 130v34" fill="none" stroke="var(--color-brand)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M144 158l6 6 6-6" fill="none" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* The action the page exists for. */}
          <rect x="104" y="172" width="92" height="34" rx="17" fill="var(--color-brand)" opacity="0.12" />
          <rect x="104" y="172" width="92" height="34" rx="17" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" />
          <rect x="126" y="186" width="48" height="6" rx="3" fill="var(--color-brand)" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}

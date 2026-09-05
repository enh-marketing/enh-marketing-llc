"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The Video pillar hero: a finished film with nowhere decided to put it.
 *
 *  WHY THIS. The document's opening is not about production quality, it is
 *  about a missing decision: "A video can look excellent and still produce very
 *  little value. The audience may be unclear, the format may be wrong for the
 *  platform, or nobody may have decided where the finished film will be used."
 *  So the drawing gives the film everything -- a full frame, detailed, clearly
 *  finished -- and leaves the row of destinations beneath it empty, until one
 *  is chosen and a route appears.
 *
 *  DELIBERATELY NOT THE CORPORATE VIDEO DRAWING. That page's ShootPlan draws
 *  four aspect ratios overlapping on one safe area, because its argument is
 *  about framing. This one never changes shape: the film is fine, the decision
 *  is missing.
 *
 *  NOTHING IS COUNTED OR TIMED. No duration, no view count, no timecode. The
 *  five destination slots are the shape of a choice, not a channel list, and
 *  none of them is labelled.
 *
 *  MOTION. CSS keyframes on an interval that moves which destination is chosen.
 *  The film and the empty slots are static, so a browser that never animates
 *  still renders the problem in full. See globals.css, "Unplaced film". */

const SLOTS = 5;
const RUN_MS = 1800;

export function UnplacedFilm({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const chosen = run % SLOTS;
  /** Centres of the five slots, in the viewBox below. */
  const slotX = (i: number) => 26 + i * 62;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A finished film frame above a row of empty destination slots, with a route drawn to whichever one has been chosen."
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

        <svg viewBox="0 0 300 214" className="relative w-full" aria-hidden>
          {/* The film. Finished, detailed, and none of that is the problem. */}
          <rect x="60" y="6" width="180" height="101" rx="7" fill="none" stroke="var(--color-line)" strokeWidth="1.6" />
          <rect x="60" y="6" width="180" height="101" rx="7" fill="var(--color-brand)" opacity="0.05" />
          <path d="M141 44v25l22-12.5z" fill="var(--color-brand)" opacity="0.75" />
          {/* Edge perforations: it is a finished cut, not a rough. */}
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i}>
              <rect x={70 + i * 24} y="10" width="12" height="5" rx="1.5" fill="var(--color-line)" />
              <rect x={70 + i * 24} y="98" width="12" height="5" rx="1.5" fill="var(--color-line)" />
            </g>
          ))}

          {/* The route, drawn only to the destination that has been decided. */}
          <path
            key={run}
            className="uf-route"
            d={`M150 107V129H${slotX(chosen)}V154`}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Five places it could go. Empty until one is chosen. */}
          {Array.from({ length: SLOTS }, (_, i) => {
            const on = i === chosen;
            return (
              <g key={i}>
                <rect
                  x={slotX(i) - 24}
                  y="156"
                  width="48"
                  height="50"
                  rx="6"
                  fill={on ? "var(--color-brand)" : "none"}
                  fillOpacity={on ? 0.1 : 0}
                  stroke={on ? "var(--color-brand)" : "var(--color-line)"}
                  strokeWidth="1.6"
                  strokeDasharray={on ? undefined : "4 4"}
                />
                {on && (
                  <circle
                    key={`${i}-${run}`}
                    className="uf-hit"
                    cx={slotX(i)}
                    cy="181"
                    r="4"
                    fill="var(--color-brand)"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

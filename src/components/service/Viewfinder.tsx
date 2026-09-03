"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: a frame being composed, not a play button.
 *
 *  WHY THIS. The page is about production, and the document's complaint is
 *  about films made without a decision behind them. A play triangle would say
 *  "video" and nothing else. A viewfinder says the part this service actually
 *  performs: choosing what is in the frame, where it sits, and what is in
 *  focus. The thirds grid, the corner brackets and the focus box are the marks
 *  a camera operator works to.
 *
 *  The focus box moves between three subject positions rather than sitting
 *  still, because the document's formats are interviews, demonstrations and
 *  presentations -- different subjects, framed differently. It never lands on
 *  the centre: centre framing is what an unplanned shoot defaults to, and the
 *  thirds are the whole point of the grid.
 *
 *  NOT ONE WORD OF TEXT, AND NO FAKE DATA. No timecode, no resolution, no
 *  filename, no REC label. Inventing a timecode would be inventing production
 *  data, and the document supplies none. Everything drawn is a mark.
 *
 *  MOTION. CSS keyframes on an interval that re-keys the focus box, so it
 *  settles on a new subject each pass. Position is animated through `left` and
 *  `top` percentages on an absolutely positioned box inside a fixed frame,
 *  which are stable units here -- not transforms inside a scaled viewBox, which
 *  is what broke two earlier hero visuals on this site. Every keyframe ends on
 *  the finished state. See globals.css, "Viewfinder". */

/** Where the focus box settles, on thirds. Fixed rather than random so the
 *  server and the browser agree and the sequence is reproducible. */
const SUBJECTS = [
  { x: 33.3, y: 33.3 },
  { x: 66.6, y: 66.6 },
  { x: 66.6, y: 33.3 },
  { x: 33.3, y: 66.6 },
] as const;

const RUN_MS = 2400;

export function Viewfinder({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const at = SUBJECTS[run % SUBJECTS.length];

  return (
    <div
      className={cn(
        // The house placement for a hero visual, matching GeoLens, AgentRun and
        // the rest: right gutter, centred, out of the flow, large screens only.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A camera viewfinder with a rule-of-thirds grid, framing brackets and a focus box settling on a subject away from the centre."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-7">
        {/* Faint grid, the same treatment the other hero panels use. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* The frame itself, at 16:9 — the format the document names first. */}
        <div aria-hidden className="relative aspect-[16/9] w-full rounded-[4px] border border-line">
          {/* Rule of thirds. */}
          <span className="absolute inset-y-0 left-1/3 w-px bg-line/70" />
          <span className="absolute inset-y-0 left-2/3 w-px bg-line/70" />
          <span className="absolute inset-x-0 top-1/3 h-px bg-line/70" />
          <span className="absolute inset-x-0 top-2/3 h-px bg-line/70" />

          {/* Framing brackets at the corners. */}
          {[
            "left-2 top-2 border-l-2 border-t-2",
            "right-2 top-2 border-r-2 border-t-2",
            "left-2 bottom-2 border-b-2 border-l-2",
            "right-2 bottom-2 border-b-2 border-r-2",
          ].map((pos) => (
            <span key={pos} className={cn("absolute h-4 w-4 border-brand/70", pos)} />
          ))}

          {/* The focus box, settling on a subject. Keyed on the run so the
              settle animation restarts with each move. */}
          <span
            key={run}
            className="vf-focus absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-[3px] border-2 border-brand"
            style={{ left: `${at.x}%`, top: `${at.y}%` }}
          >
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />
          </span>

          {/* Level marks down the right edge: the exposure ladder a shot is set
              against. Marks only, no numbers. */}
          <span className="absolute bottom-4 right-3 top-4 flex w-2 flex-col justify-between">
            {Array.from({ length: 7 }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "h-px",
                  i === 2 ? "w-full bg-brand" : "w-1/2 self-end bg-line",
                )}
              />
            ))}
          </span>
        </div>

        {/* Below the frame: the shot the operator is on, as a strip of marks.
            The lit one moves with the focus box. */}
        <div aria-hidden className="mt-5 flex items-center gap-1.5">
          {Array.from({ length: 12 }, (_, i) => {
            const on = i === run % 12;
            return (
              <span
                key={i}
                className={cn(
                  "h-6 flex-1 rounded-[2px] border transition-colors duration-500",
                  on ? "border-brand bg-brand/15" : "border-line",
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

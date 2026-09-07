"use client";

import { cn } from "@/lib/cn";

/** The artifact the process actually produces, drawn at whichever stage it has
 *  reached.
 *
 *  WHY A BRIEF. The document names its own centrepiece: stage five is "Prepare
 *  the Content Brief", and it says the brief "defines the page purpose,
 *  audience, main subject, supporting questions, structure and call to action".
 *  Everything before it is material going in, and everything after it comes
 *  out: stage six writes from the brief, stage seven watches what was written.
 *  So the run is not seven topics, it is one object being made, and the drawing
 *  is that object at seven moments.
 *
 *  WHAT EACH LAYER IS. Materials arrive (1), the existing site is inventoried
 *  (2), searches are gathered beside it (3), the two are joined (4), all of it
 *  condenses into the brief (5), the brief fills out into a written page (6),
 *  and the page goes under review (7). The left column accumulates and then
 *  recedes; the right column is the artifact and never leaves.
 *
 *  NOTHING IS LABELLED AND NOTHING IS COUNTED. Not one mark here carries a
 *  word, because every word that would go on it is already printed in the
 *  stage's own sentence beside it, and printing it twice is the one thing this
 *  page's copy rule forbids. The tile and row counts are a legible grid, not a
 *  claim about how many pages a site has or how many searches exist: this
 *  document contains no figure of any kind.
 *
 *  MOTION. Opacity and transform only, driven by class changes on the active
 *  index, so it is GPU-friendly, it survives a throttled tab, and it is off
 *  under prefers-reduced-motion, where every layer simply renders in place. */

/** Which tiles the audit keeps, rewrites and finds missing. Fixed so the
 *  drawing is deterministic rather than random on every render. */
const KEEP = [0, 3, 4, 7, 8, 11];
const REWRITE = [1, 6, 10];
const MISSING = [2, 5, 9];

/** Which search row maps to which page tile at stage four. */
const MAP: [number, number][] = [
  [0, 1],
  [1, 4],
  [2, 10],
];

export function BriefStage({ active, reduced }: { active: number; reduced: boolean }) {
  /** Stage n has been reached (active is zero-based, stages are one-based). */
  const at = (n: number) => active >= n - 1;
  /** The inputs recede once the brief exists. */
  const inputsBack = at(5);

  /** A layer's transition, dropped entirely when motion is not wanted. */
  const t = reduced ? "" : "transition-all duration-700 ease-out";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-3 p-4 sm:p-5">
      <div className="grid h-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-4">
        {/* ------------------------------------------------ the material in */}
        <div
          className={cn("relative flex flex-col gap-3", t)}
          style={{
            opacity: inputsBack ? 0.25 : 1,
            transform: inputsBack ? "scale(0.95)" : "scale(1)",
            transformOrigin: "left center",
          }}
        >
          {/* 1. What the business hands over. */}
          <div className={cn("flex gap-1.5", t)} style={{ opacity: at(1) ? 1 : 0 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={cn("h-7 flex-1 rounded border border-line bg-ink-2", t)}
                style={{
                  opacity: at(1) ? 1 : 0,
                  transform: at(1) ? "translateY(0)" : "translateY(-6px)",
                  transitionDelay: reduced ? undefined : `${i * 60}ms`,
                }}
              />
            ))}
          </div>

          {/* 2. The site as it stands: kept, to rewrite, and the gaps. */}
          <div
            className={cn("grid grid-cols-4 gap-1.5", t)}
            style={{ opacity: at(2) ? 1 : 0 }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                data-tile={i}
                className={cn(
                  "h-6 rounded-[3px] border",
                  t,
                  KEEP.includes(i) && "border-line bg-line/50",
                  REWRITE.includes(i) && "border-brand/60 bg-brand/20",
                  MISSING.includes(i) && "border-dashed border-line bg-transparent",
                )}
                style={{
                  opacity: at(2) ? 1 : 0,
                  transitionDelay: reduced ? undefined : `${i * 25}ms`,
                }}
              />
            ))}
          </div>

          {/* 3. The language customers actually use. */}
          <div className={cn("mt-auto flex flex-col gap-1.5", t)} style={{ opacity: at(3) ? 1 : 0 }}>
            {[86, 64, 74].map((w, i) => (
              <span
                key={i}
                className={cn("flex items-center gap-1.5", t)}
                style={{
                  opacity: at(3) ? 1 : 0,
                  transform: at(3) ? "translateX(0)" : "translateX(-8px)",
                  transitionDelay: reduced ? undefined : `${i * 70}ms`,
                }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span className="h-1.5 rounded-full bg-fog/40" style={{ width: `${w}%` }} />
              </span>
            ))}
          </div>

          {/* 4. Each subject assigned to the page that should carry it. */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={cn("pointer-events-none absolute inset-0 h-full w-full", t)}
            style={{ opacity: at(4) ? 1 : 0 }}
          >
            {MAP.map(([from, to], i) => (
              <path
                key={i}
                d={`M6 ${74 + from * 8} C 40 ${74 + from * 8}, 55 ${22 + Math.floor(to / 4) * 14}, 92 ${22 + Math.floor(to / 4) * 14}`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="0.6"
                pathLength={100}
                strokeDasharray="100"
                style={{
                  strokeDashoffset: at(4) ? 0 : 100,
                  transition: reduced ? undefined : `stroke-dashoffset 700ms ease-out ${i * 120}ms`,
                }}
              />
            ))}
          </svg>
        </div>

        {/* ------------------------------------------------- the artifact out */}
        <div className="relative">
          <div
            className={cn(
              "relative flex h-full flex-col rounded-lg border bg-ink-2 p-3",
              t,
              at(5) ? "border-brand/50" : "border-line",
            )}
            style={{
              opacity: at(5) ? 1 : 0.35,
              transform: at(5) ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {/* 5. The brief: six slots, because the document names six things
                   the brief defines. Slots, never labels. */}
            <div className="flex flex-col gap-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="flex items-center gap-2">
                  <span
                    className={cn("h-1.5 w-1.5 shrink-0 rounded-full", t, at(5) ? "bg-brand" : "bg-line")}
                  />
                  {/* The slot, and the writing that later fills it. */}
                  <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-line/50">
                    <span
                      className={cn("absolute inset-y-0 left-0 rounded-full bg-brand/45", t)}
                      style={{
                        width: at(6) ? `${[92, 76, 88, 70, 84, 62][i]}%` : "0%",
                        transitionDelay: reduced ? undefined : `${i * 80}ms`,
                      }}
                    />
                  </span>
                </span>
              ))}
            </div>

            {/* 6. Written out: the page the brief becomes. */}
            <div
              className={cn("mt-3 flex flex-1 flex-col gap-1.5 border-t border-line pt-3", t)}
              style={{ opacity: at(6) ? 1 : 0 }}
            >
              {[96, 88, 92, 78, 90, 66].map((w, i) => (
                <span
                  key={i}
                  className={cn("h-1.5 rounded-full bg-fog/35", t)}
                  style={{
                    width: at(6) ? `${w}%` : "0%",
                    transitionDelay: reduced ? undefined : `${i * 60}ms`,
                  }}
                />
              ))}
            </div>

            {/* 7. Under review: what is watched, and what gets refined. */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 rounded-lg border-2 border-brand/45",
                t,
              )}
              style={{ opacity: at(7) ? 1 : 0 }}
            />
            <span
              aria-hidden
              className={cn("absolute right-3 top-3 flex items-center gap-1", t)}
              style={{ opacity: at(7) ? 1 : 0 }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-3 w-1 rounded-full bg-brand"
                  style={{
                    height: `${[8, 14, 10][i]}px`,
                    opacity: 0.4 + i * 0.3,
                  }}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

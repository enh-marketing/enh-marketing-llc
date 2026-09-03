"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: the two filters a B2B campaign is actually aimed through.
 *
 *  WHY THIS. The document's promise is one sentence: "Reach the right
 *  companies and decision-makers". Those are two different filters applied at
 *  once, and the opening scenario is what happens when only the first is
 *  applied -- a hundred submissions, half of them job seekers, most of the rest
 *  without buying authority. So the drawing is the intersection: accounts down
 *  one axis, roles across the other, and only the cells where both conditions
 *  hold are lit.
 *
 *  A matrix is also the honest shape for it. A funnel would imply attrition the
 *  document never quantifies, and a list of logos would say nothing about roles.
 *  The grid says the thing the sentence says: two axes, one intersection.
 *
 *  NOT ONE WORD OF TEXT, AND NO FAKE DATA. No company names, no job titles, no
 *  counts. The accounts are bars of varying width and the roles are marks;
 *  inventing "CFO at a logistics firm" would be inventing client data, and the
 *  document names neither.
 *
 *  MOTION. CSS keyframes on an interval that re-keys the lit layer, so a
 *  different set of cells resolves each pass -- the campaign narrowing onto a
 *  different account each time. Position is never animated. Every keyframe
 *  ends on the finished state, so a browser that never animates still renders a
 *  complete matrix. See globals.css, "Account match". */

/** Rows are accounts, columns are decision-making roles. */
const ROWS = 6;
const COLS = 5;

/** Which cell is the intersection on each pass. Fixed rather than random so
 *  the server and the browser agree, and so the sequence is reproducible. */
const PICKS = [
  { row: 1, col: 2 },
  { row: 3, col: 0 },
  { row: 4, col: 3 },
  { row: 0, col: 1 },
  { row: 2, col: 4 },
] as const;

const RUN_MS = 2600;

/** Account bars differ in width so the column reads as a list of real things
 *  rather than a texture. Fixed values, not random. */
const WIDTHS = [82, 64, 92, 71, 58, 86];

export function AccountMatch({ className }: { className?: string }) {
  const [run, setRun] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const pick = PICKS[run % PICKS.length];

  return (
    <div
      className={cn(
        // The house placement for a hero visual, matching GeoLens, AgentRun and
        // the rest: anchored to the right gutter, centred, out of the flow, and
        // not rendered below the large breakpoint.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A grid of target accounts against decision-making roles. Only the cell where both the right company and the right role meet is selected."
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

        <svg viewBox="0 0 220 250" className="relative block w-full" aria-hidden>
          <defs>
            <radialGradient id="match-glow">
              <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* The two axes, drawn as rules rather than labelled: the accounts
              run down, the roles run across. */}
          <line x1="96" y1="18" x2="96" y2="232" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <line x1="96" y1="40" x2="208" y2="40" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

          {/* Accounts. Bars of differing width, quiet until one is chosen. */}
          {Array.from({ length: ROWS }, (_, r) => {
            const y = 58 + r * 30;
            const on = r === pick.row;
            return (
              <g key={`a${r}`}>
                <rect
                  x={88 - WIDTHS[r]}
                  y={y - 5}
                  width={WIDTHS[r]}
                  height="10"
                  rx="2.5"
                  fill="none"
                  stroke={on ? "var(--color-brand)" : "var(--color-line)"}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  opacity={on ? 1 : 0.55}
                />
                {on && (
                  <rect
                    key={run}
                    className="match-lit"
                    x={88 - WIDTHS[r]}
                    y={y - 5}
                    width={WIDTHS[r]}
                    height="10"
                    rx="2.5"
                    fill="var(--color-brand)"
                    opacity="0.14"
                  />
                )}
              </g>
            );
          })}

          {/* Roles across the top. */}
          {Array.from({ length: COLS }, (_, c) => {
            const x = 110 + c * 22;
            const on = c === pick.col;
            return (
              <circle
                key={`r${c}`}
                cx={x}
                cy="28"
                r="4"
                fill={on ? "var(--color-brand)" : "none"}
                stroke={on ? "var(--color-brand)" : "var(--color-line)"}
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                opacity={on ? 1 : 0.6}
              />
            );
          })}

          {/* The matrix. Every cell is drawn; one is filled. */}
          {Array.from({ length: ROWS }, (_, r) =>
            Array.from({ length: COLS }, (_, c) => {
              const x = 110 + c * 22;
              const y = 58 + r * 30;
              const hit = r === pick.row && c === pick.col;
              const onAxis = r === pick.row || c === pick.col;
              return (
                <rect
                  key={`c${r}-${c}`}
                  x={x - 6}
                  y={y - 6}
                  width="12"
                  height="12"
                  rx="2.5"
                  fill={hit ? "var(--color-brand)" : "none"}
                  stroke={hit ? "var(--color-brand)" : "var(--color-line)"}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  opacity={hit ? 1 : onAxis ? 0.75 : 0.3}
                />
              );
            }),
          )}

          {/* The intersection, marked once it has been found. */}
          <g key={`hit${run}`}>
            <circle
              className="match-glow"
              cx={110 + pick.col * 22}
              cy={58 + pick.row * 30}
              r="34"
              fill="url(#match-glow)"
            />
            <line
              className="match-cross"
              x1="96"
              y1={58 + pick.row * 30}
              x2={110 + pick.col * 22}
              y2={58 + pick.row * 30}
              stroke="var(--color-brand)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className="match-cross"
              x1={110 + pick.col * 22}
              y1="40"
              x2={110 + pick.col * 22}
              y2={58 + pick.row * 30}
              stroke="var(--color-brand)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: "120ms" }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

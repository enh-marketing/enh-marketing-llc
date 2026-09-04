"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: three results, each missing something, and no call.
 *
 *  WHY THIS. The document's opening is a specific scene with three specific
 *  faults: "One has the wrong opening hours, another links to a generic
 *  homepage, and a third does not clearly explain whether it serves the
 *  customer's area." Then the line it gives a paragraph of its own: "The
 *  business offering the best service may never receive the call."
 *
 *  So the drawing is a result list where each row has one field struck out, and
 *  the call button on every row stays inert. The row that fills in its missing
 *  field is the one whose button lights, which is the entire service stated
 *  without a word of copy.
 *
 *  NO NAMES, NO STARS, NO POSITIONS. Drawing a rating or a rank would be
 *  inventing data about businesses that do not exist, and this document refuses
 *  to promise a position at all: "a fixed number-one position cannot be
 *  guaranteed". The rows carry field shapes, not values.
 *
 *  MOTION. CSS keyframes on an interval that moves which row is complete. All
 *  three rows are drawn statically, so a browser that never animates still
 *  renders the problem. See globals.css, "Missed call". */

/** Which field each row is missing, in the document's order: hours, a real
 *  destination, and the service area. */
const ROWS = [0, 1, 2];
const RUN_MS = 2100;

export function MissedCall({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const fixed = run % ROWS.length;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="Three local search results, each with one detail missing, so none of their call buttons is usable. One row at a time fills its missing detail in and its call button becomes live."
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
          {ROWS.map((row) => {
            const complete = row === fixed;
            return (
              <li
                key={row}
                className={cn(
                  "rounded-xl border bg-ink-3 p-4 transition-colors duration-500",
                  complete ? "border-brand/60" : "border-line",
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-line" />
                  <div className="flex-1 space-y-1.5">
                    <span className="block h-2 w-3/5 rounded-full bg-snow/25" />
                    <span className="block h-1.5 w-2/5 rounded-full bg-line" />
                  </div>
                </div>

                {/* The three fields. Each row is missing exactly one of them
                    until it is filled in. */}
                <div className="mt-3 flex items-center gap-1.5">
                  {[0, 1, 2].map((field) => {
                    const missing = !complete && field === row;
                    return (
                      <span
                        key={field}
                        className={cn(
                          "relative h-1.5 flex-1 rounded-full transition-colors duration-500",
                          missing ? "bg-transparent" : complete ? "bg-brand/60" : "bg-line",
                        )}
                      >
                        {missing && (
                          <>
                            <span className="absolute inset-0 rounded-full border border-dashed border-line" />
                          </>
                        )}
                      </span>
                    );
                  })}

                  {/* The call. Inert on every row that is still missing
                      something. */}
                  <span
                    key={complete ? `${row}-${run}` : row}
                    className={cn(
                      "ml-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                      complete ? "mc-live border-brand bg-brand/15" : "border-line",
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                      <path
                        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"
                        stroke={complete ? "var(--color-brand)" : "var(--color-line)"}
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

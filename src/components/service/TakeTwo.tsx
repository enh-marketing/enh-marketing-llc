"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: the same answer, attempted more than once.
 *
 *  WHY THIS. The document's promise to a nervous speaker is unusually
 *  practical: "Pauses and repeated attempts are normal and are handled during
 *  editing. The subject does not need to deliver every answer perfectly in one
 *  take." So the drawing is a stack of takes on one question, most of them
 *  incomplete, one of them usable, and the usable one moves -- because which
 *  take works is not known until it happens.
 *
 *  A talking head or a microphone would say "interview" and nothing else. This
 *  says the thing that actually makes people agree to sit down.
 *
 *  NOTHING IS TIMED OR COUNTED. No take numbers, no durations, no camera count:
 *  the document fixes none of these. Bar lengths are how much of an answer
 *  survives, as a shape.
 *
 *  MOTION. CSS keyframes on an interval that moves which take is the keeper.
 *  Every take is drawn statically, so a browser that never animates still
 *  renders the full stack. See globals.css, "Take two". */

/** How complete each attempt is, as a share of the row. */
const TAKES = [46, 72, 38, 88, 61];
const RUN_MS = 1700;

export function TakeTwo({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const keeper = run % TAKES.length;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="One question with several attempted answers stacked beneath it, most of them incomplete, one marked as the take that works."
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

        <div aria-hidden className="relative">
          {/* The question, asked once. */}
          <div className="flex items-center gap-3 border-b border-line pb-5">
            <span className="h-7 w-7 shrink-0 rounded-full border border-brand/60" />
            <span className="h-1.5 flex-1 rounded-full bg-brand/45" />
            <span className="h-1.5 w-8 rounded-full bg-brand/45" />
          </div>

          {/* The attempts. */}
          <ul className="mt-5 space-y-3.5">
            {TAKES.map((w, i) => {
              const on = i === keeper;
              return (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-4 w-4 shrink-0 rounded-[3px] border transition-colors duration-500",
                      on ? "border-brand bg-brand/20" : "border-line",
                    )}
                  />
                  <span className="h-2 flex-1 rounded-full bg-line/70">
                    <span
                      key={on ? `${i}-${run}` : i}
                      className={cn(
                        "block h-2 rounded-full transition-colors duration-500",
                        on ? "tt-keep bg-brand" : "bg-snow/20",
                      )}
                      style={{ width: `${on ? 100 : w}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

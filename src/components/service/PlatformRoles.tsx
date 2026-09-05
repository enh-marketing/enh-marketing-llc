"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The Social pillar hero: the same post everywhere, then a role each.
 *
 *  WHY THIS. The document opens on duplication: "A business posts the same
 *  artwork on Instagram, Facebook and LinkedIn, disappears for two weeks, then
 *  returns with another sales post." Its heading is the correction -- "Give
 *  Every Platform a Clear Role". So the drawing holds three frames that begin
 *  identical and then resolve into three different compositions, and it repeats
 *  the cycle, because this is the choice a content plan makes every month.
 *
 *  The frames are abstract. Writing caption text or drawing a recognisable
 *  platform chrome would be inventing creative and borrowing someone else's
 *  trademark; these are three surfaces with three different jobs.
 *
 *  NOTHING IS COUNTED. No follower numbers, no reach, no posting frequency: the
 *  document states none, and says elsewhere that no frequency suits every
 *  business.
 *
 *  MOTION. CSS keyframes on an interval. The frames are always drawn; only
 *  their internal arrangement changes, so a browser that never animates still
 *  renders three complete frames. See globals.css, "Platform roles". */

const RUN_MS = 2600;

export function PlatformRoles({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    // Reduced motion keeps pass zero, which is already the resolved state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  /** Pass zero is the resolved state, with each frame carrying its own
   *  arrangement; odd passes fall back to the same post three times. That order
   *  matters: pass zero is what the page renders before any script runs and
   *  what it keeps if the animation clock never starts, and a hero stalled on
   *  the duplicated version would state the problem and never the service. */
  const same = run % 2 === 1;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="Three platform frames. They begin holding the same identical post, then resolve so each one carries a different arrangement suited to its own platform."
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

        <div aria-hidden className="relative grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex aspect-[3/4] flex-col gap-2 rounded-lg border border-line bg-ink-3 p-2.5"
            >
              {/* The artwork block. Identical across all three until each frame
                  is given its own role. */}
              <span
                key={`${i}-${run}`}
                className={cn(
                  "pr-fill block rounded-[3px] bg-brand/20",
                  same
                    ? "h-1/2"
                    : i === 0
                      ? "h-3/5"
                      : i === 1
                        ? "h-2/5"
                        : "h-1/4",
                )}
              />
              <span className="flex flex-1 flex-col justify-end gap-1.5">
                <span className="block h-1 rounded-full bg-line" style={{ width: same ? "80%" : i === 2 ? "100%" : "62%" }} />
                <span className="block h-1 rounded-full bg-line" style={{ width: same ? "55%" : i === 2 ? "86%" : "40%" }} />
                {!same && i === 2 && (
                  <span className="block h-1 rounded-full bg-line" style={{ width: "70%" }} />
                )}
              </span>
              {/* The action each frame is asking for, once it has a role. */}
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-colors duration-500",
                  same ? "bg-line" : "bg-brand",
                )}
                style={{ width: same ? "50%" : i === 1 ? "100%" : "72%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

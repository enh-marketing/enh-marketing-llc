"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: a launched website quietly falling behind, and the pass
 *  that brings it back.
 *
 *  WHY THIS. The document's argument is not "websites break", it is that a
 *  website drifts while looking exactly the same: "Launching a website does not
 *  mean the work is finished. Software needs updating, forms need checking and
 *  new content must be added without breaking existing pages." Drift is the
 *  thing this service is against, and drift is invisible in a screenshot. It is
 *  only visible over time, which is why the hero is a loop rather than a
 *  picture: one component slips out of currency, a check finds it, it is
 *  brought current, and the next one slips.
 *
 *  WHAT EACH ROW IS. A component of the live site with its currency beside it.
 *  The three small marks on the right are its supported state, not a version
 *  number: this document contains no figure of any kind, so nothing here may
 *  read as one. Under the stack sit the two things maintenance keeps running
 *  underneath the components — the watch and the recovery point — drawn as
 *  standing parts of the system rather than as a status readout.
 *
 *  NOT ONE WORD OF TEXT, and no status colour but the brand. A green tick or an
 *  amber warning would be a claim about uptime on a page whose whole register
 *  is caution ("Security monitoring does not make any website completely
 *  risk-free"). Brand red marks the work being done, which is what it marks
 *  everywhere else on this site.
 *
 *  MOTION. A four-beat interval and CSS transitions; the sweep is a keyframe
 *  keyed on the run so it restarts per pass. Every beat's resting state is a
 *  complete drawing, so reduced motion, no JavaScript and a failed hydration
 *  all land on the stack fully current — the finished picture, not a half-drawn
 *  one. See globals.css, "Drift watch". */

/** The components of a live site, as widths for their currency bars. Five, and
 *  they take turns falling behind. */
const ROWS = [88, 74, 92, 66, 80];
const BEAT_MS = 1150;

export function DriftWatch({ className }: { className?: string }) {
  /** Beats since mount. Four to a run: current, behind, checked, brought
   *  current. */
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setBeat((b) => b + 1), BEAT_MS);
    return () => window.clearInterval(id);
  }, []);

  const run = Math.floor(beat / 4);
  const phase = beat % 4;
  /** Which component is behind this run. */
  const at = run % ROWS.length;

  const behind = phase === 1 || phase === 2;
  const checking = phase === 2;
  const restored = phase === 3;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A live website's components with their currency shown beside them. One component at a time falls out of date, a check sweeps the stack and finds it, and it is brought back up to date before the next one slips."
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

        {/* The site itself: a frame the components belong to, so the stack reads
            as one website rather than as a list. */}
        <div aria-hidden className="relative mb-5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="h-1.5 flex-1 rounded-full bg-snow/15" />
          <span className="h-3 w-3 rounded-[3px] border border-line" />
        </div>

        {/* The pass. Sweeps the stack on the third beat of every run, which is
            the beat the behind component is found on. */}
        <div aria-hidden className="relative overflow-hidden rounded-xl">
          {checking && (
            <span
              key={run}
              className="drift-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-[linear-gradient(180deg,transparent,rgba(232,0,13,0.16),transparent)]"
            />
          )}

          <ul className="relative space-y-2">
            {ROWS.map((width, i) => {
              const off = behind && i === at;
              const done = restored && i === at;
              return (
                <li
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border bg-ink-3 px-3.5 py-3 transition-colors duration-500",
                    off
                      ? "border-dashed border-ash/70"
                      : done
                        ? "border-brand/60"
                        : "border-line",
                  )}
                >
                  {/* The component. */}
                  <span
                    className={cn(
                      "h-3 w-3 shrink-0 rounded-[3px] transition-colors duration-500",
                      off ? "bg-transparent ring-1 ring-inset ring-ash/70" : done ? "bg-brand" : "bg-snow/25",
                    )}
                  />

                  {/* How current it is. Drains as it falls behind and is
                      refilled by the pass. */}
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line/70">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        done ? "bg-brand" : "bg-snow/30",
                      )}
                      style={{ width: off ? "22%" : `${width}%` }}
                    />
                  </span>

                  {/* Its supported state. Three marks, never a number — and
                      ticks rather than dots, because three dots in a row on the
                      end of a list row reads as a menu button. */}
                  <span className="flex shrink-0 items-center gap-[3px]">
                    {[0, 1, 2].map((k) => (
                      <span
                        key={k}
                        className={cn(
                          "block w-[2px] rounded-full transition-colors duration-500",
                          off && k > 0
                            ? "h-2 bg-ash/40"
                            : done
                              ? "h-3 bg-brand"
                              : "h-3 bg-snow/30",
                        )}
                      />
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* What runs underneath the components, whatever is happening above:
            the watch, and the point the site can be recovered to. */}
        <div aria-hidden className="relative mt-5 grid grid-cols-[1fr_auto] items-end gap-4">
          <div className="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-fog" fill="none">
              <path
                d="M12 3.2 5 6v5.4c0 4 3 7.5 7 9.4 4-1.9 7-5.4 7-9.4V6l-7-2.8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            {/* The watch is continuous, so it is drawn as a continuous line
                with a mark travelling along it rather than as a light. */}
            <span className="relative h-px flex-1 bg-line">
              <span
                className={cn(
                  "absolute -top-[2px] h-[5px] w-[5px] rounded-full bg-brand transition-[left] duration-1000 ease-linear",
                )}
                style={{ left: `${phase * 30 + 4}%` }}
              />
            </span>
          </div>

          {/* The recovery point: three slabs, the newest on top. */}
          <div className="flex flex-col items-end gap-1">
            {[16, 22, 28].map((w, i) => (
              <span
                key={w}
                className={cn(
                  "h-1.5 rounded-sm transition-colors duration-500",
                  i === 2 && restored ? "bg-brand/70" : "bg-line",
                )}
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

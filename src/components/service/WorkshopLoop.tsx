"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: one piece of the team's own work, going round the loop the
 *  training teaches.
 *
 *  WHAT IT HAS TO SAY. The banner names three things the day is for: using AI
 *  properly at work, recognising unreliable output, and finding processes worth
 *  automating. The first two are a single motion, and it is the motion this
 *  drawing performs: a real task goes to a tool, something comes back, a person
 *  finds the line that is wrong, and the work is improved rather than restarted.
 *  Those four labels are the document's own clauses.
 *
 *  WHY ONE SHEET AND NOT FOUR PANELS. Four panels would say "four steps". The
 *  section this page sells is not four steps, it is one habit applied to one
 *  piece of work, so the sheet persists and the marks accumulate on it. The
 *  brief at the top never leaves, because "the sessions use real tasks from the
 *  participating team" is the whole premise: the input is theirs.
 *
 *  THE MARK IS THE POINT. "Recognising plausible-sounding output that may be
 *  incorrect" is the hardest thing on the curriculum, so the wrong line is not
 *  visibly broken. It is the same length and weight as the others until a
 *  person rules it out. Nothing here is quantified, scored or timed.
 *
 *  Same shell as every other hero visual on the site: 356/396 wide, panel on
 *  border-line over bg-ink-2, grid backdrop at 10%. See MissedCall. */

/** Which line of the returned draft is the unreliable one. Any line would do;
 *  the point is that it does not announce itself. */
const WRONG = 2;
const LINES = [92, 74, 86, 68, 52];
const RUN_MS = 2200;

export function WorkshopLoop({
  loop,
  className,
}: {
  /** The four moves, in order: Real task, AI output, Checked, Improved. */
  loop: [string, string, string, string];
  className?: string;
}) {
  const [at, setAt] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAt((a) => (a + 1) % 4), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  const drafted = at >= 1;
  const checked = at >= 2;
  const fixed = at >= 3;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="One of the team's own tasks going round the loop the training teaches: the task is sent to an AI tool, a draft comes back, a person rules out the line that is unreliable, and the work is improved rather than started again."
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-6 xl:p-7">
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
          {/* The four moves, as a track rather than a caption: the loop is the
              subject, so it is drawn as something being travelled. */}
          <div className="flex items-end gap-1">
            {loop.map((step, i) => (
              <div key={step} className="min-w-0 flex-1">
                <p
                  className={cn(
                    "font-display truncate text-[0.625rem] font-bold uppercase tracking-[0.06em] transition-colors duration-500",
                    i === at ? "text-brand-text" : "text-ash",
                  )}
                >
                  {step}
                </p>
                <span
                  className={cn(
                    "mt-1.5 block h-[2px] w-full transition-colors duration-500",
                    i === at ? "bg-brand" : i < at ? "bg-brand/35" : "bg-line",
                  )}
                />
              </div>
            ))}
          </div>

          {/* The team's own task. It is the input, so it never leaves. */}
          <div className="mt-6 rounded-lg border border-ash/45 bg-ink-3 px-4 py-4">
            <span className="block h-2 w-[62%] rounded-full bg-snow/35" />
            <span className="mt-2.5 block h-2 w-[40%] rounded-full bg-snow/20" />
          </div>

          {/* What came back, and what a person does to it. */}
          <div className="relative mt-3.5 rounded-lg border border-line bg-ink-3 px-4 py-5">
            <div className="space-y-[14px]">
              {LINES.map((w, i) => {
                const isWrong = i === WRONG;
                return (
                  <span key={i} className="relative block h-2">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full transition-all duration-500",
                        drafted ? "opacity-100" : "opacity-0",
                        isWrong && fixed ? "bg-snow/35" : "bg-snow/22",
                      )}
                      style={{
                        width: `${isWrong && fixed ? Math.min(w + 8, 96) : w}%`,
                        transitionDelay: at === 1 ? `${i * 90}ms` : "0ms",
                      }}
                    />
                    {/* The line ruled out. Struck while it is wrong, released
                        once it has been improved. */}
                    {isWrong && (
                      <>
                        <span
                          className={cn(
                            "absolute left-0 top-1/2 h-[2px] rounded-full bg-brand transition-opacity duration-500",
                            checked && !fixed ? "opacity-100" : "opacity-0",
                          )}
                          style={{ width: `${w}%` }}
                        />
                        {/* The reader's own mark, in the margin, against the
                            line it belongs to. */}
                        <span
                          className={cn(
                            "absolute -left-2.5 top-1/2 h-3.5 w-[3px] -translate-y-1/2 rounded-full bg-brand transition-opacity duration-500",
                            checked && !fixed ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </>
                    )}
                  </span>
                );
              })}
            </div>


            {/* Improved, not restarted. */}
            <svg
              viewBox="0 0 32 32"
              className={cn(
                "absolute bottom-3 right-3 h-6 w-6 transition-opacity duration-500",
                fixed ? "opacity-100" : "opacity-0",
              )}
              fill="none"
            >
              <path
                d="M7 17 l6 6 l12 -15"
                stroke="var(--color-brand)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

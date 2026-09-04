"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Step } from "@/content/services/ai-creative-production";

/** How the work moves: the reel's own production timeline.
 *
 *  THE PAGE IS A REEL, SO THE PROCESS IS ITS TIMELINE. A video editor's
 *  timeline is exactly the right object here, and it is on theme with the whole
 *  page: six clips laid end to end along one time axis, a play-head running
 *  across them. The reader sees the order at a glance because it is left to
 *  right, the way a cut is read.
 *
 *  TWO TRACKS, BECAUSE TWO PARTIES. The document marks who acts at each step,
 *  and the client acts twice, both times to approve. So there are two tracks:
 *  ENH's, where the work is made, and yours, raised above it, holding the two
 *  approvals. The work rises into your track at Approve the Direction and again
 *  at Review the Assets, and the play-head holds there until it is released.
 *  Your authorship is the section's structure, not a caption: the two approval
 *  holds are the only raised things on the timeline.
 *
 *  NOT THE VERTICAL SWIMLANES IT REPLACES, and not the launch track on the
 *  Automation page: this is a horizontal, two-track editor timeline with a
 *  play-head and approval holds, read as a cut rather than a climb.
 *
 *  Every step's number and title sit on its clip, so the whole flow is legible
 *  at once; the selected step opens its body below. */
export function ProductionTimeline({ items }: { items: Step[] }) {
  const enhanced = useEnhanced("(min-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const clips = useRef<(HTMLButtonElement | null)[]>([]);

  const [taken, setTaken] = useState(false);
  const [held, setHeld] = useState(false);
  const advancing = enhanced && !reduced && !taken && !held;

  useEffect(() => {
    if (!advancing) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), 3000);
    return () => window.clearInterval(t);
  }, [advancing, items.length]);

  const choose = (i: number) => {
    setActive(i);
    setTaken(true);
  };
  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    setTaken(true);
    clips.current[next]?.focus();
  }

  const cur = items[active];

  return (
    <div
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* ------------------------------------------------------ the tracks -- */}
      <div className="rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-7">
        {/* Track labels. */}
        <div className="mb-2 flex items-center gap-3">
          <span className="font-display w-14 shrink-0 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-brand-text sm:w-16">
            You
          </span>
          <span aria-hidden className="h-px flex-1 bg-transparent" />
        </div>

        <div
          role="tablist"
          aria-label="How the work moves"
          onKeyDown={onKeyDown}
          className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:thin] sm:mx-0 sm:gap-3 sm:overflow-visible sm:px-0"
        >
          {items.map((s, i) => {
            const on = i === active;
            const mine = s.actor === "You";
            return (
              <button
                key={s.no}
                ref={(el) => {
                  clips.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="timeline-copy"
                tabIndex={on ? 0 : -1}
                onMouseEnter={() => !taken && setActive(i)}
                onClick={() => choose(i)}
                className={cn(
                  "group relative flex min-w-[120px] flex-1 flex-col justify-between rounded-lg border px-3 py-2.5 text-left transition-all duration-300 focus-visible:outline-none sm:min-w-0",
                  // The You clips are raised into the upper track by a margin,
                  // and the ENH clips drop to the lower track. The raise is the
                  // section's argument, so it is visible whatever the state.
                  mine ? "mb-9 border-brand/50 bg-brand/[0.07]" : "mt-9 border-line bg-ink-3",
                  on && (mine ? "border-brand bg-brand/[0.12]" : "border-ash/60"),
                )}
              >
                <span
                  className={cn(
                    "font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] transition-colors duration-300",
                    mine ? "text-brand-text" : on ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                  )}
                >
                  {mine ? "Approval" : "ENH"}
                </span>
                <span className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-display text-[0.6875rem] font-bold tabular-nums text-ash">{s.no}</span>
                  <span
                    className={cn(
                      "font-display text-[0.75rem] font-bold uppercase leading-[1.15] transition-colors duration-300",
                      on ? "text-snow" : "text-fog group-hover:text-snow",
                    )}
                  >
                    {s.title}
                  </span>
                </span>

                {/* The play-head, on the active clip. */}
                {on && (
                  <span aria-hidden className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-brand" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex items-center gap-3">
          <span className="font-display w-14 shrink-0 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ash sm:w-16">
            ENH
          </span>
          <span aria-hidden className="h-px flex-1 bg-transparent" />
        </div>
      </div>

      {/* -------------------------------------------------------- the copy -- */}
      <div id="timeline-copy" className="mt-8 grid gap-x-12 gap-y-4 border-t border-line pt-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ash">
            Step {cur.no} · {cur.actor === "You" ? "your approval" : "ENH"}
          </p>
          <h3 className="font-display mt-3 text-2xl font-extrabold uppercase leading-[1.1] text-snow sm:text-[1.75rem]">
            {cur.title}
          </h3>
        </div>
        <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">{cur.body}</p>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: material generated, reviewed, and delivered.
 *
 *  WHAT IT HAS TO SAY. The banner's own sentence is the whole service: "We
 *  manage the concept, AI production, editing, brand review and final platform
 *  versions." Its three verbs are Generated, Reviewed, Delivered, and those are
 *  the three zones drawn here, left to right.
 *
 *  WHY IT LOOKS LIKE THIS. Generation is cheap and plural, so the left is a
 *  stack of rough frames on dashed edges, several at once. Review is singular
 *  and human, so the middle holds exactly one frame at a time, marked, with one
 *  below it struck out: the document is explicit that "visible errors and
 *  unsuitable scenes are removed", and a page selling honesty about AI should
 *  show the removal, not just the output. Delivery is plural again but finished
 *  and in real shapes, so the right is three solid frames at three different
 *  aspect ratios, which is what "final platform versions" means.
 *
 *  The narrowing from many, to one, to a few is the argument: everything the
 *  machine makes passes a person before anything is delivered.
 *
 *  NO FAKE CREATIVE. Frames, marks and rules only. Nothing here pretends to be
 *  a finished ad, and the three labels are the banner's own words. */
export function ProductionRun({
  stages,
  className,
}: {
  /** The banner's three verbs, in order: Generated, Reviewed, Delivered. */
  stages: [string, string, string];
  className?: string;
}) {
  const [at, setAt] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setAt((a) => (a + 1) % 3), 2600);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[470px] -translate-y-1/2 select-none lg:block xl:w-[530px]",
        className,
      )}
      role="img"
      aria-label="Material moving through production: several rough frames are generated, one at a time is reviewed and an unsuitable one removed, and three finished versions are delivered in different formats."
    >
      <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 shadow-[0_30px_80px_-46px_rgba(0,0,0,0.45)]">
        <div className="flex items-stretch gap-4">
          {/* ── generated: many, rough, at once ─────────────────────────── */}
          <Zone on={at === 0}>
            <div className="relative h-[92px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden
                  className={cn(
                    "absolute aspect-[4/3] w-[74%] rounded-md border border-dashed",
                    at === 0 ? "border-brand/55 bg-brand/[0.05]" : "border-ash/45 bg-void/40",
                  )}
                  style={{ left: `${i * 11}%`, top: `${i * 13}px` }}
                />
              ))}
            </div>
          </Zone>

          <Feed on={at === 1} />

          {/* ── reviewed: one at a time, and one removed ────────────────── */}
          <Zone on={at === 1}>
            <div className="flex h-[92px] flex-col justify-between">
              <div
                className={cn(
                  "relative aspect-[4/3] w-[78%] rounded-md border",
                  at === 1 ? "border-brand bg-brand/[0.07]" : "border-line bg-void/50",
                )}
              >
                {/* the mark a person leaves */}
                <svg viewBox="0 0 40 30" className="absolute inset-0 h-full w-full" aria-hidden>
                  <path
                    d="M13 16 l5 5 l10 -12"
                    fill="none"
                    stroke={at === 1 ? "var(--color-brand)" : "var(--color-ash)"}
                    strokeOpacity={at === 1 ? 1 : 0.5}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {/* the one taken out */}
              <div className="relative aspect-[4/3] w-[52%] rounded-md border border-ash/40 opacity-55">
                <svg viewBox="0 0 40 30" className="absolute inset-0 h-full w-full" aria-hidden>
                  <path d="M12 9 L28 21 M28 9 L12 21" stroke="var(--color-ash)" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </Zone>

          <Feed on={at === 2} />

          {/* ── delivered: finished, in real formats ────────────────────── */}
          <Zone on={at === 2}>
            <div className="flex h-[92px] items-end gap-1.5">
              <span
                aria-hidden
                className={cn(
                  "aspect-[9/16] w-[26%] rounded-md border",
                  at === 2 ? "border-brand bg-brand/[0.07]" : "border-line bg-void/50",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "aspect-square w-[30%] rounded-md border",
                  at === 2 ? "border-brand bg-brand/[0.07]" : "border-line bg-void/50",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "aspect-[16/9] flex-1 rounded-md border",
                  at === 2 ? "border-brand bg-brand/[0.07]" : "border-line bg-void/50",
                )}
              />
            </div>
          </Zone>
        </div>

        {/* the banner's own three verbs, under the zone each names */}
        <div className="mt-5 flex items-center gap-4">
          {stages.map((s, i) => (
            <span
              key={s}
              className={cn(
                "font-display flex-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] transition-colors duration-500 motion-reduce:transition-none",
                i === at ? "text-brand-text" : "text-ash",
                i === 1 && "text-center",
                i === 2 && "text-right",
              )}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** One zone of the run. */
function Zone({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex-1 rounded-lg border p-3 transition-colors duration-500 motion-reduce:transition-none",
        on ? "border-brand/45 bg-brand/[0.03]" : "border-transparent",
      )}
    >
      {children}
    </div>
  );
}

/** The hand-off between zones. */
function Feed({ on }: { on: boolean }) {
  return (
    <div aria-hidden className="flex w-3 shrink-0 items-center justify-center">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-colors duration-500 motion-reduce:transition-none",
          on ? "bg-brand" : "bg-ash/40",
        )}
      />
    </div>
  );
}

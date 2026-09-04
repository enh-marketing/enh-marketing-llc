"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** The hero visual: a batch of videos, what the response says, and the batch
 *  that comes after it.
 *
 *  WHY THIS. The document's argument is that one polished video is not the job:
 *  an account "needs a steady flow of ideas, strong reasons to keep watching,
 *  and enough variation to learn what gets a response", and the work is "a
 *  steady cycle of filming, publishing and learning". So the loop is that cycle
 *  — four videos go out, the response differs, and the next four are shaped by
 *  which one held attention.
 *
 *  WHAT THE BARS ARE NOT. They carry no numbers and no axis. The document gives
 *  no metric and says outright there is "no universal number that suits every
 *  account", so the bars show only that responses differ from each other, which
 *  is the whole basis of the argument.
 *
 *  NOT ONE WORD OF TEXT. Motion is opacity and scaleY only. */
const FIRST = [38, 74, 46, 30];
const SECOND = [66, 82, 58, 71];

export function ContentCycle({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".cc-first .cc-frame", { opacity: 0 })
        .set(".cc-first .cc-bar", { scaleY: 0 })
        .set(".cc-second .cc-frame", { opacity: 0 })
        .set(".cc-second .cc-bar", { scaleY: 0 })
        .set(".cc-winner", { opacity: 0 });

      // A batch goes out.
      tl.to(".cc-first .cc-frame", { opacity: 1, duration: 0.35, stagger: 0.09 })
        // The response differs.
        .to(".cc-first .cc-bar", { scaleY: 1, duration: 0.5, stagger: 0.09 }, "+=0.2")
        // One of them held attention.
        .to(".cc-winner", { opacity: 1, duration: 0.35 }, "+=0.3")
        // And the next batch is shaped by it.
        .to(".cc-second .cc-frame", { opacity: 1, duration: 0.35, stagger: 0.09 }, "+=0.45")
        .to(".cc-second .cc-bar", { scaleY: 1, duration: 0.5, stagger: 0.09 }, "-=0.2")
        .to({}, { duration: 1.8 })
        .to(".cc-frame, .cc-winner", { opacity: 0, duration: 0.4 })
        .to(".cc-bar", { scaleY: 0, duration: 0.3 }, "<");
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  const batch = (heights: number[], which: "cc-first" | "cc-second", winner?: number) => (
    <div className={cn("flex items-end gap-2.5", which)}>
      {heights.map((h, i) => (
        <span key={i} className="flex flex-1 flex-col gap-2">
          {/* The video. */}
          <span
            className={cn(
              "cc-frame relative block h-24 rounded-lg border bg-void/50",
              winner === i ? "border-brand/60" : "border-line",
              reduced && "opacity-100",
            )}
            style={reduced ? undefined : { opacity: 0 }}
          >
            <span
              aria-hidden
              className="absolute inset-x-2 bottom-2 h-1 rounded-full bg-fog/30"
            />
            {winner === i && (
              <span
                aria-hidden
                className={cn(
                  "cc-winner absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-brand",
                  reduced && "opacity-100",
                )}
                style={reduced ? undefined : { opacity: 0 }}
              />
            )}
          </span>
          {/* What the response said. */}
          <span className="flex h-12 items-end">
            <span
              className={cn(
                "cc-bar w-full origin-bottom rounded-sm",
                winner === i ? "bg-brand" : "bg-line",
                reduced && "scale-y-100",
              )}
              style={{
                height: `${h}%`,
                ...(reduced ? {} : { transform: "scaleY(0)" }),
              }}
            />
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className={cn(
        // The house placement for a hero visual, matching AnswerStream,
        // ProfileGrid and StorefrontPreview: right gutter, centred, out of the
        // flow, not rendered below the large breakpoint.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A batch of four videos, the differing response to each, and a second batch shaped by whichever held attention."
    >
      <div className="rounded-[1.5rem] border border-line bg-ink-2/80 p-6 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)]">
        {batch(FIRST, "cc-first", 1)}

        {/* The response feeding the next round. */}
        <svg aria-hidden viewBox="0 0 100 20" preserveAspectRatio="none" className="my-4 h-5 w-full">
          <path
            d="M50 0 L50 12 M44 7 L50 13 L56 7"
            stroke="var(--color-brand)"
            strokeWidth="0.8"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {batch(SECOND, "cc-second")}
      </div>
    </div>
  );
}

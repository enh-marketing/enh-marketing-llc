"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** The hero visual: one piece of footage, cut for several placements.
 *
 *  WHY THIS. The document says the conversation stalls on "whether the business
 *  has a video worth putting money behind", and answers it twice: existing
 *  material "can often be adapted", and the work includes "versions cut for
 *  different lengths and placements". So the drawing is one source asset and the
 *  cuts taken out of it — including a vertical one, because Shorts creative "can
 *  be cut from longer assets".
 *
 *  The cuts are different lengths because the document says lengths differ, and
 *  no cut is labelled with a duration: it names six seconds for bumpers and the
 *  first five seconds for skippable, but tying either to a specific bar here
 *  would be drawing a spec the source states in prose.
 *
 *  NOT ONE WORD OF TEXT. Motion is opacity and scaleX only — no positioning,
 *  which is where two earlier hero visuals on this site went silently wrong.
 *
 *  Under reduced motion every cut renders taken. */

/** Each cut: where it starts in the source, how much it takes, and whether it
 *  is the vertical one. */
const CUTS = [
  { from: 4, width: 16, vertical: false },
  { from: 28, width: 34, vertical: false },
  { from: 68, width: 24, vertical: false },
  { from: 44, width: 12, vertical: true },
];

export function AssetCut({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".ac-source", { scaleX: 0 })
        .set(".ac-marker", { opacity: 0 })
        .set(".ac-cut", { opacity: 0 });

      // The footage that already exists.
      tl.to(".ac-source", { scaleX: 1, duration: 0.7 });

      // And the cuts taken out of it.
      CUTS.forEach((_, i) => {
        tl.to(`.ac-marker-${i}`, { opacity: 1, duration: 0.25 }, `+=${i === 0 ? 0.4 : 0.2}`).to(
          `.ac-cut-${i}`,
          { opacity: 1, duration: 0.35 },
          "<0.12",
        );
      });

      tl.to({}, { duration: 2.1 }).to(".ac-source, .ac-marker, .ac-cut", {
        opacity: 0,
        duration: 0.45,
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={root}
      className={cn(
        // The house placement for a hero visual, matching AnswerStream,
        // ProfileGrid and StorefrontPreview: anchored to the right gutter,
        // centred, out of the flow, and not rendered below the large breakpoint.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="One piece of existing footage, with four cuts taken from it at different lengths, one of them vertical."
    >
      <div className="rounded-[1.5rem] border border-line bg-ink-2/80 p-6 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)]">
        {/* The source. */}
        <div className="relative h-14 overflow-hidden rounded-lg border border-line bg-void/50">
          <span
            aria-hidden
            className={cn("ac-source absolute inset-y-0 left-0 w-full origin-left bg-fog/[0.14]", reduced && "scale-x-100")}
            style={reduced ? undefined : { transform: "scaleX(0)" }}
          />
          {/* Where each cut comes from. */}
          {CUTS.map((cut, i) => (
            <span
              key={i}
              aria-hidden
              className={cn(
                "ac-marker absolute inset-y-1 rounded-[3px] border border-brand/70 bg-brand/20",
                `ac-marker-${i}`,
                reduced && "opacity-100",
              )}
              style={{
                left: `${cut.from}%`,
                width: `${cut.width}%`,
                ...(reduced ? {} : { opacity: 0 }),
              }}
            />
          ))}
        </div>

        {/* The cuts. */}
        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
          {CUTS.filter((cut) => !cut.vertical).map((cut, i) => (
            <span
              key={i}
              aria-hidden
              className={cn(
                "ac-cut flex h-9 items-center gap-2 rounded-md border border-brand/45 bg-brand/[0.08] px-2.5",
                `ac-cut-${CUTS.indexOf(cut)}`,
                reduced && "opacity-100",
              )}
              style={{
                width: `${38 + cut.width * 1.5}%`,
                ...(reduced ? {} : { opacity: 0 }),
              }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
              <span className="h-1 flex-1 rounded-full bg-brand/40" />
            </span>
          ))}

          {/* The vertical one, for Shorts. */}
          <span
            aria-hidden
            className={cn(
              "ac-cut ac-cut-3 mt-1 flex h-24 w-14 flex-col justify-end rounded-lg border border-brand/45 bg-brand/[0.08] p-2",
              reduced && "opacity-100",
            )}
            style={reduced ? undefined : { opacity: 0 }}
          >
            <span className="h-1 w-full rounded-full bg-brand/50" />
            <span className="mt-1.5 h-1 w-2/3 rounded-full bg-brand/30" />
          </span>
        </div>
      </div>
    </div>
  );
}

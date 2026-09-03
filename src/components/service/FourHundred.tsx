"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** The hero visual: four hundred issues, and the three that matter.
 *
 *  WHY THIS. It is the document's opening sentence, at its own numbers: "Most
 *  audits arrive as a 60-page PDF exported from a tool, with 400 issues listed
 *  and no indication which three matter." So the grid holds exactly 400 marks —
 *  16 across, 25 down — and three of them light. The count is the figure, which
 *  is why no numeral is printed and the hero stays wordless like every other one
 *  on this site.
 *
 *  WHY IT IS NOT DECORATION. Every mark stands for something the document
 *  names, and the whole point of the drawing is the ratio between 400 and 3 —
 *  which is legible at a glance and impossible to state as well in prose. That
 *  is the test an earlier hero on the on-page page failed: grey bars standing
 *  for nothing in particular, carrying no number and no meaning.
 *
 *  WHICH THREE is arbitrary and has to be: the document does not say which
 *  issues matter on anyone's site, only that a real audit tells you. They are
 *  fixed rather than random so the server and the browser agree.
 *
 *  Motion is opacity, colour and scale. No positioning. */
const COLS = 16;
const ROWS = 25;
const TOTAL = COLS * ROWS;
const MATTER = [73, 208, 341];

export function FourHundred({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".fh-mark", { opacity: 0, scale: 0.7 })
        .set(".fh-matter", { backgroundColor: "var(--color-line)", scale: 0.7 });

      // The tool's output: all of it, undifferentiated.
      tl.to(".fh-mark", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: { each: 0.0022, from: "start" },
      }).to({}, { duration: 1.2 });

      // And the three worth acting on.
      tl.to(".fh-matter", {
        backgroundColor: "var(--color-brand)",
        scale: 1.9,
        duration: 0.45,
        stagger: 0.14,
      })
        .to({}, { duration: 2.2 })
        .to(".fh-mark", { opacity: 0, duration: 0.45 });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={root}
      className={cn(
        // The house placement for a hero visual, matching AnswerStream,
        // ProfileGrid and StorefrontPreview: anchored to the right gutter,
        // centred, out of the flow, and not rendered below the large
        // breakpoint. In the flow it would add its own height to the hero and
        // push the trust strip below the fold.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[352px] -translate-y-1/2 select-none lg:block xl:w-[392px]",
        className,
      )}
      role="img"
      aria-label="Four hundred issues from a tool report, with three of them marked as the ones that matter."
    >
      <div className="rounded-[1.5rem] border border-line bg-ink-2/80 p-6 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)]">
        <div
          className="grid gap-[3px]"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: TOTAL }).map((_, i) => {
            const matters = MATTER.includes(i);
            return (
              <span
                key={i}
                aria-hidden
                className={cn(
                  "fh-mark aspect-square rounded-[2px]",
                  matters ? "fh-matter" : "",
                  reduced ? (matters ? "bg-brand" : "bg-line") : "bg-line",
                )}
                style={
                  reduced
                    ? matters
                      ? { transform: "scale(1.9)" }
                      : undefined
                    : { opacity: 0 }
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

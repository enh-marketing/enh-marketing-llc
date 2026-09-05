"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** The hero visual: a testimonial that went fine and said nothing.
 *
 *  WHY THIS. The document's opening is not a complaint about production, it is
 *  a complaint about content: the customer "give a polite answer, and leave.
 *  The footage looks professional, but it tells a prospective buyer very
 *  little." So the drawing holds one frame that is visibly well made -- proper
 *  framing, a subject on the thirds, clean bars -- and shows how little comes
 *  out of it, then fills the same frame with the four things the document says
 *  a useful testimonial has to cover.
 *
 *  The frame never changes quality between the two states. That is the whole
 *  point: nothing about the filming was wrong.
 *
 *  NO WORDS, NO NUMBERS. The four segments are the shape of an answer, not a
 *  transcript, and nothing here counts minutes, views or results -- the
 *  document's own closing position is that no video can guarantee sales.
 *
 *  MOTION. CSS keyframes on an interval that switches between the thin answer
 *  and the full one. The frame and the subject are static, so a browser that
 *  never animates still renders a complete picture. See globals.css, "Polite
 *  answer". */

const RUN_MS = 3000;
/** The four things the document says are missing, as segment weights. */
const FULL = [88, 74, 92, 66];
const THIN = [42];

export function PoliteAnswer({ className }: { className?: string }) {
  const [run, setRun] = useState(0);

  useEffect(() => {
    // Reduced motion keeps pass zero, which is already the useful version.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setRun((r) => r + 1), RUN_MS);
    return () => window.clearInterval(id);
  }, []);

  /** Pass zero is the useful answer. It is the frame the page renders before
   *  any script runs and the one it keeps if the clock never starts, and a hero
   *  stalled on the thin version would show only the complaint. */
  const useful = run % 2 === 0;
  const bars = useful ? FULL : THIN;

  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A well-framed testimonial shot. Beneath it, the answer it produced: first a single thin line, then four full ones covering the problem, the decision, the work and the result."
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
          {/* The shot. Well made in both states, because that was never the
              problem. */}
          <div className="relative aspect-[16/9] w-full rounded-[6px] border border-line">
            <span className="absolute inset-y-0 left-1/3 w-px bg-line/60" />
            <span className="absolute inset-y-0 left-2/3 w-px bg-line/60" />
            <span className="absolute inset-x-0 top-1/3 h-px bg-line/60" />
            {/* The subject, on the thirds. */}
            <span className="absolute left-1/3 top-1/3 h-9 w-9 -translate-x-1/2 -translate-y-1/4 rounded-full border-2 border-brand/70" />
            <span className="absolute left-1/3 top-2/3 h-10 w-16 -translate-x-1/2 rounded-t-[14px] border-2 border-b-0 border-brand/70" />
          </div>

          {/* What came out of it. */}
          <div className="mt-6 flex min-h-[68px] flex-col justify-start gap-2.5">
            {bars.map((w, i) => (
              <span
                key={`${run}-${i}`}
                className="pa-bar block h-2.5 rounded-full bg-brand"
                style={{ width: `${w}%`, opacity: 0.3 + i * 0.14, animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

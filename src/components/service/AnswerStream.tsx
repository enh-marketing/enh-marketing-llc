"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { assistants } from "@/content/services/aeo-geo";

/** The hero visual: an assistant composing an answer, and the sources it names.
 *
 *  WHY THIS AND NOT A KNOWLEDGE GRAPH. The obvious move on an AEO page is a
 *  drifting node-and-edge network, which is decoration — it illustrates "AI"
 *  in general and this page's argument not at all. The document opens with a
 *  specific scene: someone asks, three companies get named, you are not one of
 *  them. That is what this draws. The panel writes an answer, three source
 *  chips resolve underneath, and a fourth slot stays empty on every cycle.
 *
 *  NOT A SINGLE WORD OF COPY. The answer body is redacted bars and the sources
 *  are blank chips, following the same rule CreativeFeed sets on the Meta Ads
 *  page: an abstract visual cannot be read as a claim. Naming invented
 *  competitors in a hero on a page that spends its length warning against
 *  invented claims would be indefensible. The only real text is the assistant
 *  names, which are the document's own, straight from its table.
 *
 *  The citation markers are numerals because Perplexity's numbered citations
 *  are described in that same table — the one mechanic here that is drawn from
 *  a named product surface rather than invented for the picture. */

const LINES = [
  [92, 74, 88, 60],
  [88, 96, 70, 82],
  [76, 90, 84, 66],
  [94, 68, 92, 78],
  [82, 88, 74, 90],
] as const;

export function AnswerStream({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [turn, setTurn] = useState(0);

  const names = assistants.rows.map((r) => r.name);
  const widths = LINES[turn % LINES.length];

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete() {
          // Advance the assistant, then the effect re-runs and rebuilds the
          // timeline against the next set of bar widths.
          setTurn((t) => t + 1);
        },
      });

      tl.fromTo(".as-name", { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4 })
        // The answer "writes": each bar grows from nothing to its width.
        .fromTo(
          ".as-bar",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.42, stagger: 0.13, transformOrigin: "left center" },
          "-=0.1",
        )
        // Citations land after the text they belong to.
        .fromTo(
          ".as-cite",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1, ease: "back.out(2)" },
          "-=0.5",
        )
        // Three sources resolve. The fourth never does.
        .fromTo(
          ".as-source",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.36, stagger: 0.12 },
          "-=0.2",
        )
        .to({}, { duration: 1.9 })
        .to(".as-fade", { opacity: 0, duration: 0.45, ease: "power1.in" });

      return () => tl.kill();
    }, el);

    return () => ctx.revert();
  }, [turn, reduced]);

  return (
    <div
      ref={root}
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[400px] -translate-y-1/2 lg:block xl:w-[440px]"
      }
    >
      <div className="as-fade relative overflow-hidden rounded-2xl border border-line bg-ink-2/70 p-6 backdrop-blur-sm">
        {/* Fine grid, fading out — the same chapter-identity treatment the
            benchmark section uses, at panel scale. */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(circle at 20% 0%, black, transparent 80%)",
          }}
        />

        {/* Which assistant is answering. */}
        <div className="relative flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          <span className="as-name text-[0.65rem] font-semibold uppercase text-fog">
            {names[turn % names.length]}
          </span>
        </div>

        {/* The answer. Bars, never words. */}
        <div className="relative mt-6 space-y-3">
          {widths.map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="as-bar h-2 rounded-full bg-snow/25"
                style={{ width: `${w}%` }}
              />
              {i < 3 && (
                <span className="as-cite flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-brand/50 bg-brand/15 text-[0.5rem] font-bold text-brand-text">
                  {i + 1}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Sources. Three resolve; the fourth is the point of the whole page. */}
        <div className="relative mt-7 border-t border-line pt-5">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="as-source flex flex-1 items-center gap-2 rounded-lg border border-line bg-ink-3/80 px-2.5 py-2"
              >
                <span className="h-3.5 w-3.5 shrink-0 rounded-[3px] bg-snow/30" />
                <span className="h-1.5 flex-1 rounded-full bg-snow/20" />
              </div>
            ))}
            {/* Never filled, on any cycle. */}
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border border-dashed border-brand/45">
              <span className="h-1.5 w-1.5 rounded-full bg-brand/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

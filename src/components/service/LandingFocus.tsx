"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

/** The hero visual: a page with choices, collapsing into a page with one.
 *
 *  WHY THIS. The document's argument is stated outright in its own FAQ: "A
 *  website page offers choices, which is what it is for. A landing page removes
 *  them." So the loop performs exactly that removal — a nav bar, competing
 *  blocks and several buttons arrive, then everything that is not the one
 *  action falls away until a headline, a form and a single button remain.
 *
 *  The click that starts it is the paid click the whole page is about: the copy
 *  opens on "the campaign is live, clicks are arriving", and this is where
 *  those clicks land.
 *
 *  NOT ONE WORD OF TEXT. Bars, fields and blocks only, following CreativeFeed,
 *  AnswerStream, StorefrontPreview, CreatorVetting and ProfileGrid. An abstract
 *  visual cannot be misread as a claim, and writing a real headline into a
 *  looping hero would be inventing campaign copy.
 *
 *  Under reduced motion the timeline never builds and the panel renders in its
 *  resolved state — the focused page, which is the thing being argued for. */
export function LandingFocus({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl
        // The click arrives.
        .fromTo(".lf-cursor", { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.3 })
        .to(".lf-cursor", { scale: 0.8, duration: 0.12, yoyo: true, repeat: 1 })
        // The page it lands on: full of choices.
        .fromTo(
          ".lf-choice",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 },
          "-=0.1",
        )
        .to(".lf-cursor", { opacity: 0, duration: 0.25 })
        .to({}, { duration: 0.9 })
        // Everything that is not the one action goes.
        .to(".lf-choice", { opacity: 0, height: 0, marginTop: 0, duration: 0.45, stagger: 0.06 })
        // What is left.
        .fromTo(
          ".lf-focus",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.1 },
          "-=0.2",
        )
        .to(".lf-cta", { borderColor: "var(--color-brand)", duration: 0.3 }, "-=0.1")
        .to({}, { duration: 1.8 })
        // Reset.
        .to(".lf-focus", { opacity: 0, duration: 0.35 })
        .set(".lf-cta", { borderColor: "var(--color-line)" })
        .set(".lf-choice", { clearProps: "height,marginTop" });

      return () => tl.kill();
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={root}
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[340px] -translate-y-1/2 lg:block xl:w-[376px]"
      }
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 p-5 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        {/* The click. */}
        <span className="lf-cursor absolute left-[18%] top-[14%] z-20 flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand/25" />
          <span className="relative h-2 w-2 rounded-full bg-brand" />
        </span>

        {/* Choices: a nav, competing blocks, several buttons. */}
        <div className="lf-choice flex items-center gap-2 rounded-lg border border-line bg-ink-3 px-3 py-2.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-brand/70" />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1 flex-1 rounded-full bg-snow/18" />
          ))}
        </div>

        <div className="lf-choice mt-2.5 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-12 rounded-lg border border-line bg-ink-3" />
          ))}
        </div>

        <div className="lf-choice mt-2.5 flex gap-2">
          {[0, 1].map((i) => (
            <span key={i} className="h-7 flex-1 rounded-full border border-line bg-ink-3" />
          ))}
        </div>

        {/* What survives: one headline, one proof, one form, one button. */}
        <div className="lf-focus mt-3 space-y-2.5 opacity-0">
          <span className="block h-3 w-4/5 rounded-full bg-snow/35" />
          <span className="block h-3 w-3/5 rounded-full bg-brand/60" />
        </div>

        <div className="lf-focus mt-4 space-y-2 opacity-0">
          {[0, 1].map((i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span className="h-1.5 flex-1 rounded-full bg-snow/15" />
            </span>
          ))}
        </div>

        <div className="lf-focus mt-5 space-y-2.5 opacity-0">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="block h-8 rounded-lg border border-line bg-ink-3"
            />
          ))}
          <span className="lf-cta block h-9 rounded-lg border-2 border-line bg-brand" />
        </div>
      </div>
    </div>
  );
}

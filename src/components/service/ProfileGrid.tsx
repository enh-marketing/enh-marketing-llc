"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

/** The hero visual: a grid finding a look, and an enquiry arriving because of it.
 *
 *  WHY A GRID AND A MESSAGE, AND NOTHING ELSE. The page is called "How We Turn
 *  Instagram Attention Into Enquiries", and its two concrete claims are that a
 *  consistent look "is usually what earns the follow and the save", and that
 *  "comments and direct messages are often where an enquiry begins". So the
 *  loop does exactly those two things: nine mismatched tiles resolve into one
 *  visual system, and then a message arrives. Nothing else happens, because
 *  nothing else is being claimed.
 *
 *  WHAT IS DELIBERATELY ABSENT. No follower count, no growth curve, no
 *  engagement number. The document is explicit that "follower count is context,
 *  not a KPI" and that the goal is "qualified customer enquiries, not follower
 *  growth". A hero counting followers up would contradict the page it sits on.
 *  The profile row is an avatar and two bars, and they never resolve into
 *  digits.
 *
 *  No text either, following CreativeFeed, AnswerStream, StorefrontPreview and
 *  CreatorVetting: an abstract visual cannot be misread as a claim.
 *
 *  Under reduced motion the timeline never builds and the grid renders in its
 *  resolved state, which is the picture the section is arguing for anyway. */

/** Which tiles start off-palette. Composition, not data. */
const OFF = [1, 3, 4, 7];

export function ProfileGrid({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".pg-tile",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.05 },
      )
        // The look settles: the odd tiles come into the same system.
        .to(
          ".pg-off",
          { backgroundColor: "var(--color-ink-3)", duration: 0.5, stagger: 0.07 },
          "+=0.5",
        )
        .to(".pg-accent", { opacity: 1, duration: 0.4, stagger: 0.06 }, "-=0.4")
        // Then someone gets in touch.
        .fromTo(
          ".pg-dm",
          { yPercent: 130, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "+=0.35",
        )
        .fromTo(
          ".pg-dm-dot",
          { scale: 0 },
          { scale: 1, duration: 0.3, ease: "back.out(2.5)" },
          "-=0.2",
        )
        .to({}, { duration: 1.7 })
        // Reset.
        .to(".pg-dm", { yPercent: 130, opacity: 0, duration: 0.4, ease: "power2.in" })
        .set(".pg-dm-dot", { scale: 0 })
        .set(".pg-off", { backgroundColor: "var(--color-ink-2)" })
        .set(".pg-accent", { opacity: 0 });

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
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[330px] -translate-y-1/2 lg:block xl:w-[364px]"
      }
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-2 p-4 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        {/* Profile row. An avatar and two bars — never a follower count. */}
        <div className="flex items-center gap-3 px-1 pb-4 pt-1">
          <span className="h-11 w-11 shrink-0 rounded-full border-2 border-brand/60 bg-ink-3" />
          <span className="flex flex-1 flex-col gap-2">
            <span className="h-1.5 w-2/3 rounded-full bg-snow/25" />
            <span className="h-1.5 w-2/5 rounded-full bg-snow/12" />
          </span>
        </div>

        {/* Highlights. */}
        <div className="flex gap-2.5 px-1 pb-4">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-7 w-7 rounded-full border border-line bg-ink-3" />
          ))}
        </div>

        {/* The grid. */}
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={`pg-tile ${OFF.includes(i) ? "pg-off" : ""} relative aspect-square overflow-hidden rounded-[3px] ${
                OFF.includes(i) ? "bg-ink-2" : "bg-ink-3"
              }`}
            >
              <span className="absolute inset-x-2 bottom-2 h-1 rounded-full bg-snow/12" />
              {/* The accent that arrives once the palette settles. */}
              <span className="pg-accent absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand opacity-0" />
            </span>
          ))}
        </div>

        {/* The enquiry. */}
        <div className="pg-dm mt-4 flex items-center gap-3 rounded-xl border border-brand/45 bg-brand/[0.08] px-3 py-2.5 opacity-0">
          <span className="h-7 w-7 shrink-0 rounded-full bg-snow/20" />
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="h-1.5 w-3/4 rounded-full bg-snow/30" />
            <span className="h-1.5 w-1/2 rounded-full bg-snow/15" />
          </span>
          <span className="pg-dm-dot h-2 w-2 shrink-0 scale-0 rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

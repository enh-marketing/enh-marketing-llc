"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** The hero visual: one tile in a package, and then the same channel given a
 *  frame of its own.
 *
 *  WHY THIS. It is the document's opening sentence, almost literally: "Most
 *  agencies here sell LinkedIn as one tile in a social media package. It gets
 *  the same treatment as Instagram, and it produces about as much B2B pipeline
 *  as you would expect from that." So the loop shows six identical tiles — no
 *  one of them distinguishable, which is the complaint — and then replaces the
 *  whole grid with a single panel that has actual structure inside it. The
 *  before and after are the argument.
 *
 *  WHY TWO LAYERS RATHER THAN AN EXPANDING TILE. Growing one tile out of a grid
 *  means animating its position toward the centre, and coordinate maths in a
 *  looping hero is where two earlier visuals on this site broke silently. A
 *  grid that recedes and a panel that arrives over it says the same thing with
 *  nothing but opacity and scale, which cannot be subtly wrong.
 *
 *  NOT ONE WORD OF TEXT, and no platform marks. Naming or badging the other
 *  five tiles would put competitors' brands in the hero to make a point the
 *  copy already makes; blank tiles make it better, because the complaint is
 *  precisely that they are treated as interchangeable.
 *
 *  Under reduced motion the resolved state renders: the grid receded, the
 *  panel present. */
export function TileBreakout({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".tb-tile", { opacity: 0, scale: 0.94 })
        .set(".tb-panel", { opacity: 0, scale: 0.97 })
        .set(".tb-bar", { scaleX: 0 });

      // Six of the same thing.
      tl.to(".tb-tile", { opacity: 1, scale: 1, duration: 0.35, stagger: 0.06 })
        .to({}, { duration: 1.1 })
        // The package recedes.
        .to(".tb-grid", { opacity: 0.16, scale: 0.96, duration: 0.5 })
        // And the channel gets its own frame.
        .to(".tb-panel", { opacity: 1, scale: 1, duration: 0.5 }, "-=0.25")
        .to(".tb-bar", { scaleX: 1, duration: 0.4, stagger: 0.07 }, "-=0.15")
        .to({}, { duration: 2 })
        .to(".tb-panel", { opacity: 0, duration: 0.4 })
        .to(".tb-grid", { opacity: 1, scale: 1, duration: 0.4 }, "-=0.2");
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
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="Six identical tiles in a package, replaced by a single panel with a presence built out inside it."
    >
      <div className="relative h-[26rem]">
        {/* The package: six tiles, none of them distinguishable. */}
        <div
          className={cn(
            "tb-grid grid h-full grid-cols-3 grid-rows-2 gap-3.5",
            reduced && "opacity-[0.16] scale-[0.96]",
          )}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              aria-hidden
              className={cn(
                "tb-tile flex flex-col justify-between rounded-2xl border border-line bg-ink-2/70 p-3.5",
                reduced && "opacity-100",
              )}
              style={reduced ? undefined : { opacity: 0 }}
            >
              <span className="h-6 w-6 rounded-full border border-line bg-void/50" />
              <span className="h-1.5 w-3/5 rounded-full bg-line" />
            </div>
          ))}
        </div>

        {/* The channel, run as a channel. */}
        <div
          aria-hidden
          className={cn(
            "tb-panel absolute inset-0 flex flex-col rounded-[1.5rem] border border-brand/45 bg-ink-2 p-5 shadow-[0_28px_70px_-34px_rgba(0,0,0,0.95)]",
            reduced && "opacity-100",
          )}
          style={reduced ? undefined : { opacity: 0 }}
        >
          {/* A page with an identity. */}
          <div className="flex items-center gap-3">
            <span className="h-11 w-11 shrink-0 rounded-xl border border-brand/50 bg-brand/15" />
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="h-2.5 w-1/2 rounded-full bg-fog/70" />
              <span className="h-1.5 w-3/4 rounded-full bg-line" />
            </div>
          </div>

          {/* Things actually running on it. */}
          <div className="mt-5 flex flex-1 flex-col justify-center gap-3 border-t border-line pt-5">
            {["82%", "64%", "91%", "73%"].map((w, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
                <span
                  className={cn("tb-bar h-1.5 origin-left rounded-full", i % 2 ? "bg-line" : "bg-brand/70")}
                  style={{ width: w, transform: reduced ? undefined : "scaleX(0)" }}
                />
              </span>
            ))}
          </div>

          {/* Measured against something. */}
          <div className="mt-5 flex items-end gap-1.5 border-t border-line pt-4">
            {[34, 48, 41, 60, 55, 72, 68].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-sm bg-brand/35"
                style={{ height: h * 0.42 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

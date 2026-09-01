"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

/** The hero visual: a storefront on a phone, resolving into a checkout.
 *
 *  WHY A PHONE. Not decoration and not a stock device mockup — the document
 *  says the storefront is "designed for the phone first, because that is where
 *  most of the traffic sits", and the failure it opens on is a product page
 *  taking four seconds "on a phone". The whole argument happens on this screen,
 *  so this is the screen the hero shows.
 *
 *  WHY IT ENDS ON CHECKOUT. The page's second concrete complaint is that "the
 *  only payment option is a card form". The loop therefore runs the full
 *  distance the copy cares about: catalogue loads, a product is chosen, the
 *  checkout sheet rises with several ways to pay. That is the service, drawn.
 *
 *  NOT ONE WORD OF TEXT. Tiles and bars only, following CreativeFeed on the
 *  Meta Ads page and AnswerStream on the AEO page. An abstract visual cannot be
 *  misread as a claim — and naming payment providers inside a looping hero
 *  animation would assert integrations in a place nobody can qualify them.
 *
 *  Under reduced motion the timeline never builds and the storefront renders in
 *  its resting state, which is a complete, sensible picture on its own. */
export function StorefrontPreview({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".sf-tile",
        { opacity: 0, y: 14, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06 },
      )
        // One product gets picked.
        .to(".sf-tile-active", { borderColor: "var(--color-brand)", duration: 0.3 }, "+=0.35")
        .to(".sf-tile:not(.sf-tile-active)", { opacity: 0.35, duration: 0.35 }, "<")
        // The checkout sheet rises over the catalogue.
        .fromTo(
          ".sf-sheet",
          { yPercent: 100 },
          { yPercent: 0, duration: 0.55, ease: "power3.out" },
          "+=0.2",
        )
        .fromTo(
          ".sf-pay",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.32, stagger: 0.09 },
          "-=0.25",
        )
        .to(".sf-pay-first", { borderColor: "var(--color-brand)", duration: 0.3 }, "+=0.3")
        .to({}, { duration: 1.5 })
        // Reset for the next pass.
        .to(".sf-sheet", { yPercent: 100, duration: 0.4, ease: "power2.in" })
        .to(".sf-tile", { opacity: 1, duration: 0.3 }, "<")
        .to(".sf-tile-active", { borderColor: "var(--color-line)", duration: 0.3 }, "<")
        .to(".sf-pay", { opacity: 0, duration: 0.01 })
        .to(".sf-pay-first", { borderColor: "var(--color-line)", duration: 0.01 });

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
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[320px] -translate-y-1/2 lg:block xl:w-[352px]"
      }
    >
      {/* The device. Border and radius come from the design system, so it reads
          as part of the page rather than as an imported mockup. */}
      <div className="relative aspect-[9/17] overflow-hidden rounded-[2rem] border border-line bg-ink-2 p-3 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        {/* Status/nav bar. */}
        <div className="flex items-center gap-2 px-1.5 pb-3 pt-1">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span className="h-1.5 flex-1 rounded-full bg-snow/15" />
          <span className="h-3 w-3 rounded-[3px] border border-line" />
        </div>

        {/* Search — the document names a search box that cannot find half the
            catalogue as one of the three causes of a store that does not sell. */}
        <div className="mx-1 mb-3 flex h-6 items-center gap-2 rounded-full border border-line bg-ink-3 px-2.5">
          <span className="h-2 w-2 rounded-full border border-ash" />
          <span className="h-1 w-1/2 rounded-full bg-snow/15" />
        </div>

        {/* Catalogue. */}
        <div className="grid grid-cols-2 gap-2 px-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`sf-tile ${i === 2 ? "sf-tile-active" : ""} rounded-lg border border-line bg-ink-3 p-2`}
            >
              <span className="block aspect-[4/3] w-full rounded-md bg-snow/10" />
              <span className="mt-2 block h-1 w-4/5 rounded-full bg-snow/20" />
              <span className="mt-1.5 block h-1 w-1/2 rounded-full bg-brand/55" />
            </div>
          ))}
        </div>

        {/* Checkout sheet. */}
        <div className="sf-sheet absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-line bg-ink-2 p-4 pt-3">
          <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-line" />
          <div className="space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`sf-pay ${i === 0 ? "sf-pay-first" : ""} flex items-center gap-2.5 rounded-lg border border-line bg-ink-3 px-2.5 py-2`}
              >
                <span
                  className={`h-3 w-5 shrink-0 rounded-[3px] ${i === 0 ? "bg-brand/70" : "bg-snow/20"}`}
                />
                <span className="h-1 flex-1 rounded-full bg-snow/15" />
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border ${i === 0 ? "border-brand" : "border-line"}`}
                />
              </div>
            ))}
          </div>
          <span className="mt-4 block h-8 w-full rounded-full bg-brand" />
        </div>
      </div>
    </div>
  );
}

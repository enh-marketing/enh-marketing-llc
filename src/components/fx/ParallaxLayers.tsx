"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** Layered parallax: a stack of layers that travel at different rates as the
 *  block scrolls past.
 *
 *  THE EFFECT IS FROM @osmosupply/parallax-scrolling ON 21ST.DEV. The code is
 *  not, and could not be. Four things in that file would have broken this site
 *  rather than merely being untidy:
 *
 *  1. It constructs its own `new Lenis()`. This site already runs exactly one
 *     Lenis, in fx/SmoothScroll.tsx, fused to GSAP's ticker. A second instance
 *     means two smooth-scroll controllers driving window scroll against each
 *     other. It also imports it from `@studio-freight/lenis`, the old package
 *     name, which is not a dependency here: `lenis` is.
 *
 *  2. Its cleanup runs `ScrollTrigger.getAll().forEach(st => st.kill())`, which
 *     kills every ScrollTrigger on the page rather than its own. Thirty files
 *     in this repo share that registry, so unmounting it would silently stop
 *     the motion in Manifesto, FooterCurve, Narrative, ProcessSequence,
 *     StageLadder and two dozen more.
 *
 *  3. It calls `gsap.ticker.add(...)` with an anonymous function and never
 *     removes it, so the callback outlives the component and keeps calling
 *     `raf` on a destroyed Lenis. It also sets `gsap.ticker.lagSmoothing(0)`
 *     globally and never restores it.
 *
 *  4. Its markup depends on a stylesheet (`parallax__header`, `parallax__fade`
 *     and the rest) that the registry does not ship: `filesWithRegistry` and
 *     `npmDependencies` are both empty. Dropped in as delivered it renders as
 *     unstyled stacked images, hotlinked from someone else's CDN.
 *
 *  WHAT IS KEPT is the idea, which is a good one and about fifteen lines: tie
 *  a scrubbed timeline to the block's own scroll and give each layer a
 *  different yPercent.
 *
 *  WHAT IS DIFFERENT HERE. Everything is created inside a `gsap.matchMedia`
 *  scoped to this element, so `revert()` tears down exactly what this
 *  component made and nothing else. The media query is
 *  `(prefers-reduced-motion: no-preference)`, so for a reader who has asked
 *  for no motion the timeline is never built at all and the layers simply sit
 *  where they belong. Parallax is a common vestibular trigger and the original
 *  has no such guard. ScrollTrigger updates already arrive from SmoothScroll's
 *  Lenis, so this adds no scroll machinery of its own. */

export type ParallaxLayer = {
  /** Where this layer ends up, as a percentage of its own height, by the time
   *  the block has finished passing. Larger travels further, so a larger value
   *  reads as nearer the viewer. */
  y: number;
  className?: string;
  children: ReactNode;
};

export function ParallaxLayers({
  layers,
  className,
  stageClassName,
}: {
  layers: ParallaxLayer[];
  /** The track. Its height is what the parallax is scrubbed against. */
  className?: string;
  /** The stage the layers are stacked in. */
  stageClassName?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    // Scoped to this element, so revert() undoes this component's work and
    // leaves every other ScrollTrigger on the page alone.
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "0% 0%", end: "100% 0%", scrub: 0 },
      });
      layers.forEach((layer, i) => {
        tl.to(
          el.querySelectorAll(`[data-parallax-layer="${i}"]`),
          { yPercent: layer.y, ease: "none" },
          i === 0 ? undefined : "<",
        );
      });
    });

    return () => mm.revert();
  }, [layers]);

  return (
    <div ref={scope} className={cn("relative", className)}>
      <div ref={stage} className={cn("relative h-full w-full overflow-hidden", stageClassName)}>
        {layers.map((layer, i) => (
          <div
            key={i}
            data-parallax-layer={i}
            className={cn("absolute inset-0", layer.className)}
          >
            {layer.children}
          </div>
        ))}
      </div>
    </div>
  );
}

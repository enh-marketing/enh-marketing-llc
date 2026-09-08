"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** Layered parallax: a stack of layers that travel at different rates as the
 *  block scrolls past.
 *
 *  THIS IS @osmosupply/parallax-scrolling FROM 21ST.DEV, kept as delivered. The
 *  timeline, the trigger, the `start`/`end`, `scrub: 0`, the `yPercent` per
 *  layer, the `"<"` position parameter and the `data-parallax-layer` hooks are
 *  all the original's. What the original hard-codes as four specific layers is
 *  a prop here, because this page needs its own pictures and its own title in
 *  the stack, and that is the only change to how it animates.
 *
 *  FOUR THINGS IN THE DELIVERED FILE ARE NOT KEPT, each because it would break
 *  this site rather than merely be untidy:
 *
 *  1. It constructs its own `new Lenis()`. This site already runs exactly one,
 *     in fx/SmoothScroll.tsx, fused to GSAP's ticker. A second instance means
 *     two smooth-scroll controllers driving window scroll against each other.
 *     It also imports from `@studio-freight/lenis`, the old package name, which
 *     is not a dependency here: `lenis` is. ScrollTrigger updates already
 *     arrive from SmoothScroll's Lenis, so nothing is lost by dropping it.
 *
 *  2. Its cleanup runs `ScrollTrigger.getAll().forEach(st => st.kill())`, which
 *     kills every ScrollTrigger on the page rather than its own. Thirty files
 *     here share that registry, so unmounting it would silently stop the motion
 *     in Manifesto, FooterCurve, Narrative, ProcessSequence, StageLadder and
 *     two dozen more.
 *
 *  3. It adds an anonymous `gsap.ticker.add(...)` and never removes it, so the
 *     callback outlives the component and keeps calling `raf` on a destroyed
 *     Lenis. It also sets `gsap.ticker.lagSmoothing(0)` globally, forever.
 *
 *  4. Its markup depends on a stylesheet the registry does not ship:
 *     `filesWithRegistry` and `npmDependencies` are both empty, so
 *     `parallax__layers`, `parallax__layer-img` and the rest resolve to
 *     nothing. The layout below is those rules written in Tailwind, and it is
 *     what the class names describe: a full-height frame, layers stacked and
 *     filling it, the whole thing clipped.
 *
 *  Everything is created inside a `gsap.matchMedia` scoped to this element, so
 *  `revert()` tears down exactly what this component made and nothing else, and
 *  the query is `(prefers-reduced-motion: no-preference)`, so for a reader who
 *  has asked for no motion the timeline is never built and the layers sit where
 *  they belong. Parallax is a common vestibular trigger and the original has no
 *  such guard.
 *
 *  IT MUST NOT BE PINNED. The trigger is measured against the viewport and the
 *  block is expected to travel past it: the container rises a full viewport
 *  while the layers slide down by less than that, and the difference is the
 *  effect. Put this inside a `position: sticky` stage and two things break at
 *  once. The trigger stops moving, so its box reads top 0 at every scroll
 *  position and progress never leaves 0; and were it driven some other way, the
 *  layers would slide down with nothing rising to cover behind them and expose
 *  the top of the frame. Both were measured on the AI Hub before this note. */

export type ParallaxLayer = {
  /** Where this layer ends up, as a percentage of its own height, by the time
   *  the block has finished passing. The original's four are 70, 55, 40 and 10,
   *  furthest first. Larger travels further and so appears further away. */
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
  /** The block. Its height is the distance the effect is scrubbed over. */
  className?: string;
  /** The frame the layers are stacked in. */
  stageClassName?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  /* Callers pass `layers` as an array literal, so it is a new value on every
     render, and depending on it directly would revert and rebuild the timeline
     on every render of the parent. Only the rates and their order change the
     animation, so the effect depends on those alone, as a string. */
  const rates = layers.map((l) => l.y).join(",");

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
      (rates ? rates.split(",").map(Number) : []).forEach((y, i) => {
        tl.to(
          el.querySelectorAll(`[data-parallax-layer="${i}"]`),
          { yPercent: y, ease: "none" },
          i === 0 ? undefined : "<",
        );
      });
    });

    return () => mm.revert();
  }, [rates]);

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

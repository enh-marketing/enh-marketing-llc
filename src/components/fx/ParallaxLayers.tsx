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
  /** How far this layer travels down, as a percentage of the STAGE's height,
   *  by the time the block has finished passing. Layers with different values
   *  separate as it scrolls, and that separation is the whole effect.
   *
   *  It is measured against the stage rather than against the layer's own
   *  height so that the component can size the layer to cover its own travel;
   *  see the note on overscan below. */
  y: number;
  className?: string;
  children: ReactNode;
};

export function ParallaxLayers({
  layers,
  className,
  stageClassName,
  progress,
}: {
  layers: ParallaxLayer[];
  /** The track. Its height is what the parallax is scrubbed against. */
  className?: string;
  /** The stage the layers are stacked in. */
  stageClassName?: string;
  /** 0 to 1, supplied by whatever owns the scroll. Give this when the block
   *  sits in a sticky stage, where measuring itself yields nothing. Leave it
   *  out and the block scrubs against its own passage as before. */
  progress?: number;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const controlled = typeof progress === "number";

  /* OVERSCAN, or the mountain slides off and leaves a hole. Every layer
     travels down, and in a pinned stage nothing else moves to cover the gap it
     opens above itself, so each layer is grown by the furthest distance any of
     them travels and hung that far above the stage. A layer then ends flush
     with the top at the end of its run and overhangs the bottom at the start,
     and no edge is ever in frame.

     The extra 1 is margin. Sized to the travel exactly, a layer is tangent to
     the stage at each end of its run, which measured as a worst gap of 0px and
     is one rounding error away from a hairline of background on some viewport
     heights. */
  const over = Math.max(0, ...layers.map((l) => Math.abs(l.y))) + 1;

  /* Callers pass `layers` as an array literal, so it is a new value on every
     render and a dependency on it would revert and rebuild the timeline on
     every scroll frame. Only the rates and their order change the animation,
     so the effect depends on those alone, as a string, and reads them back
     rather than closing over the array. */
  const rates = layers.map((l) => l.y).join(",");

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    // Scoped to this element, so revert() undoes this component's work and
    // leaves every other ScrollTrigger on the page alone.
    const mm = gsap.matchMedia(scope);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline(
        controlled
          ? { paused: true }
          : { scrollTrigger: { trigger: el, start: "0% 0%", end: "100% 0%", scrub: 0 } },
      );
      (rates ? rates.split(",").map(Number) : []).forEach((y, i) => {
        tl.to(
          el.querySelectorAll(`[data-parallax-layer="${i}"]`),
          // `y` is a share of the stage; yPercent is a share of the layer, and
          // the layer is taller than the stage by exactly `over`.
          { yPercent: (y * 100) / (100 + over), ease: "none" },
          i === 0 ? undefined : "<",
        );
      });
      timeline.current = tl;
      return () => {
        timeline.current = null;
      };
    });

    return () => mm.revert();
  }, [rates, controlled, over]);

  /* Seeking a paused timeline rather than animating to the value, so the
     picture is a function of scroll position and reverses for free. Null under
     reduced motion, where the timeline is never built. */
  useEffect(() => {
    if (!controlled) return;
    timeline.current?.progress(Math.max(0, Math.min(1, progress)));
  }, [controlled, progress]);

  return (
    <div ref={scope} className={cn("relative", className)}>
      <div ref={stage} className={cn("relative h-full w-full overflow-hidden", stageClassName)}>
        {layers.map((layer, i) => (
          <div
            key={i}
            data-parallax-layer={i}
            className={cn("absolute inset-x-0", layer.className)}
            style={{ top: `${-over}%`, height: `${100 + over}%` }}
          >
            {layer.children}
          </div>
        ))}
      </div>
    </div>
  );
}

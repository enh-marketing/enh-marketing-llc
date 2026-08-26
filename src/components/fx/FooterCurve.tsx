"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Elastic footer edge, after the GSAP "footer bounce" technique:
 *  ScrollTrigger.getVelocity() drives how far the footer's top edge bows, and
 *  when scrolling stops it springs back flat on an elastic ease.
 *
 *  Implemented by rewriting a single quadratic curve's control point rather
 *  than with MorphSVGPlugin. MorphSVG is for interpolating between two
 *  arbitrary shapes; here there is exactly one control point moving, so
 *  setting `d` directly is both simpler and cheaper per frame.
 *
 *  The curve is filled with the footer's own colour and stroked with the line
 *  token, so the edge stays visible even when the section above happens to be
 *  the same surface as the footer. */

const W = 1000;
const H = 100;
const REST = 52;

export function FooterCurve() {
  const fill = useRef<SVGPathElement>(null);
  const edge = useRef<SVGPathElement>(null);

  useEffect(() => {
    const f = fill.current;
    const e = edge.current;
    if (!f || !e) return;

    const state = { bulge: 0 };
    const draw = () => {
      const c = REST + state.bulge;
      e.setAttribute("d", `M0,${REST} Q${W / 2},${c} ${W},${REST}`);
      f.setAttribute("d", `M0,${H} L0,${REST} Q${W / 2},${c} ${W},${REST} L${W},${H} Z`);
    };
    draw();

    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;

      // Divisor picked from real-world velocities, not from this environment's
      // synthetic wheel events (which measured ~270px/s and are unrepresentative).
      // A Lenis-smoothed wheel notch runs roughly 1500-3000px/s and a fast
      // trackpad flick 6000+. At /90 that is ~20-33 units for normal scrolling
      // and the full 40 for a flick, so the bow reads as speed rather than as
      // an on/off state. Raise the divisor to calm it, lower it to exaggerate.
      const clamp = gsap.utils.clamp(-40, 40);
      let settle: number | undefined;

      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          // Scrolling down drags the edge downward, as if the sheet is elastic.
          const target = clamp(self.getVelocity() / 90);

          // Only ever grow the bow from a scroll burst; the spring owns the
          // return trip, otherwise the two fight each other every frame.
          if (Math.abs(target) > Math.abs(state.bulge)) {
            gsap.to(state, {
              bulge: target,
              duration: 0.16,
              ease: "power2.out",
              onUpdate: draw,
              overwrite: true,
            });
          }

          window.clearTimeout(settle);
          settle = window.setTimeout(() => {
            gsap.to(state, {
              bulge: 0,
              duration: 1.5,
              ease: "elastic.out(1, 0.26)",
              onUpdate: draw,
              overwrite: true,
            });
          }, 110);
        },
      });

      return () => {
        window.clearTimeout(settle);
        st.kill();
        gsap.killTweensOf(state);
        state.bulge = 0;
        draw();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-full h-14 w-full sm:h-20 lg:h-24"
    >
      <path ref={fill} fill="var(--color-void)" />
      <path ref={edge} fill="none" stroke="var(--color-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

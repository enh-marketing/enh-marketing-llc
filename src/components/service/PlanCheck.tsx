"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

/** How ENH helps: the plan, the check, and the promise about thin data.
 *
 *  WHY THIS SHAPE. The document's two paragraphs are two moments, before the
 *  campaign and once it begins, and its last sentence is a promise: if the data
 *  is thin, we say so and start with a wider range. A first build set the two
 *  paragraphs as text either side of a rule. This one gives each moment its own
 *  drawing above the words, so the section carries the page's visual language
 *  rather than only its typography:
 *
 *    plan   a budget divided, and the expected range each part is planned to
 *    check  the result drawn inside its range, and the point it steps out
 *
 *  The rule between them is the campaign starting, the same line the process
 *  section draws. Beneath, the promise is set at display scale over a range
 *  band that widens as it scrolls into view: "a wider forecast range", drawn.
 *
 *  NOTHING READABLE STARTS HIDDEN. The two sides dim to 0.55 at most, the rule
 *  is the one thing that scales from nothing, and the band behind the promise
 *  rests wide in the markup, so without script it is the finished picture. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};
const PULSE = { transformBox: "fill-box" as const, transformOrigin: "center" };

/** The plan: a level being set, with the range it is expected to produce.
 *
 *  A dial rather than a divided bar, because the hero already draws the budget
 *  dividing and this side of the section is about the decision before that:
 *  "set a realistic budget, forecast the expected outcome". The needle is the
 *  level chosen; the wedge either side of it is the range that level is
 *  forecast to produce. No scale, no numerals: a level, not a figure. */
function PlanSketch() {
  const CX = 110;
  const CY = 78;
  const R = 60;
  /** A point on the sweep. t runs 0 (left) to 1 (right). */
  const pt = (t: number, radius = R) => {
    const a = Math.PI * (1 - t);
    return [CX + radius * Math.cos(a), CY - radius * Math.sin(a)] as const;
  };
  const arc = (from: number, to: number, radius = R) => {
    const [x1, y1] = pt(from, radius);
    const [x2, y2] = pt(to, radius);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${radius} ${radius} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };
  const set = 0.62;
  const [nx, ny] = pt(set, R * 0.74);
  return (
    <svg viewBox="0 0 220 96" aria-hidden className="block w-full text-fog">
      {/* The sweep, and how far along it the level sits. The brand arc draws
          in as the needle swings to the level, on a loop. */}
      <path d={arc(0, 1)} {...S} className="text-line" />
      <path d={arc(0, set)} {...S} strokeWidth="1.3" pathLength="100" className="ci-draw text-brand" />
      {/* The range that level is forecast to produce. */}
      <path d={arc(set - 0.11, set + 0.11, R * 0.86)} {...S} strokeWidth="7" className="text-brand" opacity="0.16" />
      {[set - 0.11, set + 0.11].map((t) => {
        const [ax, ay] = pt(t, R * 0.68);
        const [bx, by] = pt(t, R * 1.04);
        return <path key={t} d={`M${ax.toFixed(1)} ${ay.toFixed(1)}L${bx.toFixed(1)} ${by.toFixed(1)}`} {...S} strokeDasharray="2 3" className="text-brand" opacity="0.75" />;
      })}
      {/* Ticks along the sweep. */}
      {Array.from({ length: 11 }, (_, i) => i / 10).map((t) => {
        const [ax, ay] = pt(t, R * 1.1);
        const [bx, by] = pt(t, R * 1.02);
        return <path key={t} d={`M${ax.toFixed(1)} ${ay.toFixed(1)}L${bx.toFixed(1)} ${by.toFixed(1)}`} {...S} opacity="0.4" />;
      })}
      {/* The level chosen. Rotated about the pivot in the drawing's own
          coordinates, so the needle turns on its hub rather than its box. */}
      <g className="ci-sweep" style={{ transformBox: "view-box", transformOrigin: `${CX}px ${CY}px` }}>
        <path d={`M${CX} ${CY}L${nx.toFixed(1)} ${ny.toFixed(1)}`} {...S} strokeWidth="2" className="text-snow" />
        <circle cx={nx} cy={ny} r="3.4" fill="var(--color-brand)" stroke="none" />
      </g>
      <circle cx={CX} cy={CY} r="4.5" fill="var(--color-snow)" stroke="none" />
      <path d={`M${CX - R - 6} ${CY}h${2 * R + 12}`} {...S} className="text-line" opacity="0.6" />
    </svg>
  );
}

/** The check: the result inside its range, and the moment it steps outside. */
function CheckSketch() {
  return (
    <svg viewBox="0 0 220 96" aria-hidden className="block w-full text-fog">
      <path d="M14 84H206" {...S} className="text-line" />
      <path d="M14 44C60 40 120 34 206 26" {...S} strokeDasharray="3 4" className="text-brand" opacity="0.7" />
      <path d="M14 66C60 62 120 56 206 48" {...S} strokeDasharray="3 4" className="text-brand" opacity="0.7" />
      <path d="M14 44C60 40 120 34 206 26 L206 48 C120 56 60 62 14 66Z" fill="var(--color-brand)" opacity="0.08" stroke="none" />
      <path d="M14 58C50 56 90 52 126 48 S164 30 178 20" {...S} strokeWidth={0.8} pathLength="100" className="ci-draw text-snow" />
      <circle cx="178" cy="20" r="4" fill="var(--color-brand)" stroke="none" />
      <circle cx="178" cy="20" r="9" {...S} className="glyph-pulse text-brand" style={PULSE} />
      {/* Early: the point is caught well before the end of the run. */}
      <path d="M178 30v54" {...S} strokeDasharray="2 4" className="text-brand" opacity="0.6" />
    </svg>
  );
}

export function PlanCheck({
  left,
  right,
  closing,
}: {
  left: string;
  right: string;
  closing: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const promise = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const pr = promise.current;
    if (!el || !pr) return;
    const mm = gsap.matchMedia();

    mm.add({ motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const q = gsap.utils.selector(el);
      const panel = q("[data-panel]");
      const rule = q("[data-rule]");
      const sides = q("[data-side]");
      const wide = gsap.utils.selector(pr)("[data-wide]");
      const axis = window.matchMedia("(min-width: 1024px)").matches ? "scaleY" : "scaleX";

      gsap.set(panel, { y: 26 });
      gsap.set(rule, { [axis]: 0, transformOrigin: "center center" });
      gsap.set(sides, { opacity: 0.55, y: 12 });
      gsap.set(wide, { scaleY: 0.12, transformOrigin: "center center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 72%", scrub: 0.6 },
      });
      tl.to(panel, { y: 0, duration: 0.26, ease: "power2.out" }, 0)
        .to(rule, { [axis]: 1, duration: 0.46, ease: "none" }, 0.12)
        .to(sides, { opacity: 1, y: 0, duration: 0.3, stagger: 0.14, ease: "power2.out" }, 0.34);

      // The promise's range widens as it arrives: "a wider forecast range".
      const tl2 = gsap.timeline({
        scrollTrigger: { trigger: pr, start: "top 88%", end: "bottom 70%", scrub: 0.6 },
      });
      tl2.to(wide, { scaleY: 1, duration: 1, ease: "none" }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        tl2.scrollTrigger?.kill();
        tl2.kill();
        gsap.set([panel, rule, sides, wide], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div>
      <div ref={ref}>
        <div data-panel className="overflow-hidden rounded-[1.25rem] border border-line bg-ink-3">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div className="flex flex-col p-7 sm:p-9">
              <div data-side>
                <PlanSketch />
                <span aria-hidden className="mt-7 block h-px w-10 bg-brand" />
                <p className="mt-6 text-base leading-[1.75] text-snow sm:text-lg">{left}</p>
              </div>
            </div>
            <div aria-hidden className="relative">
              <span className="absolute inset-x-0 top-0 lg:inset-y-0 lg:left-1/2 lg:w-px lg:-translate-x-1/2">
                <span data-rule className="block h-px w-full bg-line lg:h-full lg:w-px" />
              </span>
            </div>
            <div className="flex flex-col p-7 sm:p-9">
              <div data-side>
                <CheckSketch />
                <span aria-hidden className="mt-7 block h-px w-10 bg-line" />
                <p className="mt-6 text-base leading-[1.75] text-fog sm:text-lg">{right}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The promise, over the range it promises. */}
      {/* The band is the block: its dashed edges are the block's top and
          bottom, so at rest they frame the sentence rather than cut through
          it. GSAP scales the whole band from a sliver at the centre. */}
      <div ref={promise} className="relative mt-12">
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <g data-wide>
            <rect x="0" y="0" width="100" height="100" fill="var(--color-brand)" opacity="0.06" />
            <path d="M0 0.5H100" stroke="var(--color-brand)" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" opacity="0.6" />
            <path d="M0 99.5H100" stroke="var(--color-brand)" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" opacity="0.6" />
          </g>
        </svg>
        <Rise delay={0.2}>
          <p className="font-display relative max-w-4xl px-7 py-10 text-[clamp(1.3rem,3vw,2.4rem)] font-extrabold uppercase leading-[1.1] text-snow sm:px-9">
            {closing}
          </p>
        </Rise>
      </div>
    </div>
  );
}

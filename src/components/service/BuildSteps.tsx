"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type BuildStep = { no: string; title: string; body: string };

/** Seven steps, and the dashboard they assemble.
 *
 *  WHY THIS SHAPE. The steps are how a dashboard gets built, so the drawing is
 *  a dashboard getting built: a report being reviewed, then sources, then the
 *  definitions strip, then connections, then tiles, then the checks, then the
 *  heartbeat of the managed service. The drawing sits beside the steps and
 *  gains a layer as each step scrolls past, so the reader watches the object
 *  come together in the order the words describe.
 *
 *  ONE ORDER. Steps read one to seven down the page; the drawing adds layers in
 *  that same order. Nothing stacks upwards against the reading direction.
 *
 *  NOTHING READABLE IS GATED. The steps are always at full contrast beyond a
 *  gentle dim; the layers rest fully drawn in the markup and are only dimmed
 *  by the scrub, so with no script, under reduced motion and on small screens
 *  the drawing is the finished dashboard. The seventh layer, the heartbeat,
 *  runs on a loop because that step has no end. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

function BuildSketch() {
  return (
    <svg viewBox="0 0 220 176" aria-hidden className="block w-full text-fog">
      {/* 1. The report as it is today. */}
      <g data-layer="0">
        <rect x="12" y="10" width="34" height="42" rx="3" {...S} />
        {[18, 25, 32, 39].map((y) => (
          <rect key={y} x="17" y={y} width={y === 39 ? 14 : 24} height="2.2" rx="1.1" fill="currentColor" opacity="0.5" />
        ))}
        <path d="M46 31 h10" {...S} strokeDasharray="2 3" />
      </g>
      {/* 2. The sources. */}
      <g data-layer="1">
        {[70, 96, 122].map((x) => (
          <rect key={x} x={x} y="10" width="20" height="12" rx="3" {...S} />
        ))}
      </g>
      {/* 3. Definitions: one strip of metrics. */}
      <g data-layer="2">
        <rect x="62" y="34" width="146" height="12" rx="3" {...S} className="text-brand" />
        {[68, 96, 124, 152, 180].map((x) => (
          <g key={x}>
            <rect x={x} y="38" width="4" height="4" rx="1" fill="var(--color-brand)" />
            <rect x={x + 6} y="39" width="16" height="2" rx="1" fill="currentColor" opacity="0.6" />
          </g>
        ))}
      </g>
      {/* 4. Connections from sources into the view. */}
      <g data-layer="3">
        {[80, 106, 132].map((x) => (
          <path key={x} d={`M${x} 22 V 34`} {...S} className="text-brand" />
        ))}
        <path d="M62 60 H 208" {...S} className="text-line" />
      </g>
      {/* 5. The views. */}
      <g data-layer="4">
        <rect x="62" y="60" width="146" height="82" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {[70, 118].map((x, i) => (
          <g key={x}>
            <rect x={x} y="68" width="40" height="30" rx="3" {...S} />
            {[0, 1, 2, 3].map((b) => (
              <rect key={b} x={x + 6 + b * 8} y={94 - [10, 16, 12, 20][(b + i) % 4]} width="5" height={[10, 16, 12, 20][(b + i) % 4]} rx="1" fill="currentColor" opacity="0.5" />
            ))}
          </g>
        ))}
        <rect x="166" y="68" width="34" height="30" rx="3" {...S} />
        <path d="M172 92 C 180 88, 186 80, 194 76" fill="none" stroke="var(--color-brand)" strokeWidth="1.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <rect x="70" y="106" width="130" height="28" rx="3" {...S} />
        {[113, 120, 127].map((y) => (
          <rect key={y} x="76" y={y} width="60" height="2.2" rx="1.1" fill="currentColor" opacity="0.45" />
        ))}
      </g>
      {/* 6. Tested: the checks. */}
      <g data-layer="5">
        {[[104, 72], [152, 72], [194, 72], [194, 110]].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="5" fill="var(--color-brand)" />
            <path d={`M${x - 2.4} ${y} l1.8 1.8 l3.2 -3.6`} fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </g>
      {/* 7. Monitored: a heartbeat that does not stop. */}
      <g data-layer="6">
        <path d="M62 160 H 208" {...S} className="text-line" />
        <path d="M62 160 h40 l6 -10 l8 20 l6 -10 h86" fill="none" stroke="var(--color-brand)" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" pathLength="100" className="ci-draw" />
      </g>
    </svg>
  );
}

export function BuildSteps({ items }: { items: BuildStep[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ scrub: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.scrub) return;
      const q = gsap.utils.selector(el);
      const steps = q("[data-step]");
      const layers = q("[data-layer]");
      gsap.set(steps, { opacity: 0.55 });
      // 0.55, the site's reveal floor: a layer that has not been reached yet is
      // dimmed, never hidden. See the house rule on scroll reveals.
      gsap.set(layers, { opacity: 0.55 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 75%", scrub: 0.7 } });
      const n = steps.length;
      steps.forEach((s, i) => {
        tl.to(s, { opacity: 1, duration: 0.6 / n, ease: "none" }, i / n);
        if (layers[i]) tl.to(layers[i], { opacity: 1, duration: 0.6 / n, ease: "none" }, i / n);
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([steps, layers], { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
      {/* The drawing. First on small screens, sticky beside the steps on large. */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="relative">
            <BuildSketch />
          </div>
        </div>
      </div>

      <ol className="order-2 space-y-4 lg:order-1">
        {items.map((s) => (
          <li key={s.no} data-step className="grid gap-x-6 gap-y-2 rounded-[1.25rem] border border-line bg-ink-3 p-6 sm:grid-cols-[3.5rem_1fr] sm:p-7">
            <span aria-hidden className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-extrabold leading-none tabular-nums text-brand">
              {s.no}
            </span>
            <div>
              <h3 className="font-display text-[clamp(1.05rem,1.7vw,1.35rem)] font-extrabold uppercase leading-[1.14] text-snow">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-fog">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

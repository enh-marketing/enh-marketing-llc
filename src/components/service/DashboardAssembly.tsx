"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type AssemblyItem = { no: string; title: string; body: string };

/** The seven elements, drawn as the dashboard they add up to — built in front
 *  of the reader, one element at a time.
 *
 *  WHY BUILDING IT BEATS LABELLING IT. The document calls these "the main
 *  elements of a reporting dashboard": parts of one object. An annotated plate
 *  says that, and the previous version was a good one. But a plate is a
 *  finished thing with names attached, and this list is not a description of a
 *  finished thing — it is what has to be TRUE for the object to work. Sources
 *  have to arrive before metrics can be defined; definitions have to hold
 *  before views mean anything; access has to be decided before a view can be
 *  shown to anyone. So the seven install in order, each one visibly adding its
 *  own part, and by the seventh the reader has watched a reporting system come
 *  into existence out of exactly these seven things. That is systems thinking
 *  drawn rather than asserted.
 *
 *  AND POINTING AT ONE STRIPS THE REST AWAY, which is the other half. Reading
 *  "user access and permissions" and seeing every other part of the dashboard
 *  fall to a hairline while the badge and the withheld pane stay lit is the
 *  fastest possible answer to "which bit is that?". Every element is separately
 *  addressable, by pointer and by keyboard.
 *
 *  NO VALUES. Bars without scales, tiles without numbers, per the page's own
 *  rule. The only words are the seven names and the document's paragraphs.
 *
 *  THE RESTING STATE IS THE FINISHED DASHBOARD. No script, no motion preference
 *  and every small screen get all seven installed, which is what the server
 *  renders; the scroll build only runs where it can actually be watched. */

const VB_W = 520;
const VB_H = 384;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** Six sources, because the document names six kinds of system: "marketing,
 *  website, CRM, ecommerce, finance, or operational". */
const PORTS = [58, 130, 202, 274, 346, 418];

function Plate({ built, focus }: { built: number; focus: number | null }) {
  /** A part is drawn once it is installed; it is dimmed to a hairline whenever
   *  some OTHER part is being pointed at. */
  const part = (i: number) => ({
    className: cn(
      "transition-opacity duration-500",
      built > i ? (focus === null || focus === i ? "opacity-100" : "opacity-15") : "opacity-0",
    ),
  });

  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden className="block w-full">
      {/* The empty frame the seven fill. It is not one of them. */}
      <rect
        x={10}
        y={26}
        width={500}
        height={340}
        rx={10}
        fill="var(--color-ink-3)"
        stroke="var(--color-line)"
        strokeWidth={1.3}
        vectorEffect="non-scaling-stroke"
      />

      {/* 01 — connected data sources */}
      <g {...part(0)}>
        {PORTS.map((x, i) => (
          <g key={x}>
            <path d={`M${x} 0v20`} {...S} strokeWidth={1.1} className="text-line" />
            <path
              d={`M${x} 0v20`}
              fill="none"
              pathLength={100}
              stroke="var(--color-brand)"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="ci-flow"
              style={{ animationDelay: `${i * 330}ms`, animationDuration: "2.4s" }}
            />
            <rect x={x - 11} y={20} width={22} height={12} rx={3} {...S} strokeWidth={1.2} className="text-brand" fill="color-mix(in srgb, var(--color-brand) 12%, transparent)" />
          </g>
        ))}
        <path d="M28 46h464" {...S} strokeWidth={1.1} className="text-brand" opacity={0.55} />
      </g>

      {/* 02 — consistent metrics: one legend, and every label snapping to it */}
      <g {...part(1)}>
        <rect x={28} y={58} width={128} height={54} rx={5} {...S} strokeWidth={1.2} className="text-brand" fill="color-mix(in srgb, var(--color-brand) 6%, transparent)" />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <rect x={38} y={68 + r * 14} width={8} height={5} rx={2.5} fill="currentColor" className="text-brand" />
            <rect x={52} y={68 + r * 14} width={[92, 70, 82][r]} height={5} rx={2.5} fill="currentColor" className="text-fog" opacity={0.45} />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={176 + i * 112} y={58} width={100} height={54} rx={5} {...S} strokeWidth={1.1} className="text-line" />
            <rect x={186 + i * 112} y={68} width={54} height={5} rx={2.5} fill="currentColor" className="text-brand" opacity={0.7} />
            <rect x={186 + i * 112} y={86} width={[70, 46, 62][i]} height={12} rx={3} fill="currentColor" className="text-fog" opacity={0.3} />
          </g>
        ))}
      </g>

      {/* 03 — clear dashboard views: a tab per reporting need, and panes */}
      <g {...part(2)}>
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={28 + i * 86}
            y={124}
            width={76}
            height={16}
            rx={8}
            {...S}
            strokeWidth={1.1}
            fill={i === 1 ? "color-mix(in srgb, var(--color-brand) 16%, transparent)" : "none"}
            className={i === 1 ? "text-brand" : "text-line"}
          />
        ))}
        <path d="M266 190v152" {...S} strokeWidth={1.1} className="text-line" />
      </g>

      {/* 04 — filters, and a comparison behind every reading */}
      <g {...part(3)}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={28 + i * 62} y={158} width={54} height={14} rx={7} {...S} strokeWidth={1.1} className="text-brand" />
        ))}
        <rect x={218} y={158} width={38} height={14} rx={7} {...S} strokeWidth={1.1} strokeDasharray="3 3" className="text-ash" />
        {/* the reading, and the period it is set against */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={36 + i * 44} y={330 - [70, 46, 88, 58, 76][i]} width={16} height={[70, 46, 88, 58, 76][i]} rx={2} fill="currentColor" className="text-brand" opacity={0.55} />
            <rect x={54 + i * 44} y={330 - [54, 62, 66, 40, 88][i]} width={16} height={[54, 62, 66, 40, 88][i]} rx={2} fill="currentColor" className="text-fog" opacity={0.22} />
          </g>
        ))}
        <path d="M28 330h222" {...S} strokeWidth={1} className="text-line" />
      </g>

      {/* 05 — how often each source refreshes */}
      <g {...part(4)}>
        <circle cx={468} cy={140} r={16} {...S} strokeWidth={1.3} className="text-brand" />
        <path d="M468 130v10l7 5" {...S} strokeWidth={1.4} className="text-brand" />
        {PORTS.map((x, i) => (
          <g key={x}>
            {Array.from({ length: (i % 3) + 1 }, (_, k) => (
              <circle key={k} cx={x - 6 + k * 6} cy={38} r={1.7} fill="currentColor" className="text-brand" />
            ))}
          </g>
        ))}
      </g>

      {/* 06 — who may see what, and what is kept back */}
      <g {...part(5)}>
        <rect x={402} y={158} width={90} height={16} rx={8} {...S} strokeWidth={1.2} className="text-brand" />
        <path d="M414 166h6M424 166h6M434 166h6" {...S} strokeWidth={1.4} className="text-brand" />
        <rect x={286} y={192} width={206} height={64} rx={5} {...S} strokeWidth={1.2} className="text-ash" />
        {Array.from({ length: 9 }, (_, k) => (
          <path key={k} d={`M${292 + k * 24} 252l20 -56`} {...S} strokeWidth={1} className="text-ash" opacity={0.35} />
        ))}
        <rect x={376} y={214} width={26} height={18} rx={3} fill="var(--color-ink-3)" stroke="var(--color-ash)" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
        <path d="M383 214v-6a6 6 0 0 1 12 0v6" {...S} strokeWidth={1.2} className="text-ash" />
      </g>

      {/* 07 — the watch that stays on after launch */}
      <g {...part(6)}>
        <path d="M28 348h464" {...S} strokeWidth={1} className="text-line" />
        {PORTS.map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={358}
            r={3.4}
            fill="currentColor"
            className={i === 3 ? "text-brand ci-twinkle" : "text-fog"}
            opacity={i === 3 ? 1 : 0.4}
          />
        ))}
        <rect x={286} y={274} width={206} height={54} rx={5} {...S} strokeWidth={1.1} className="text-line" />
        <path
          d="M298 314 C 330 306, 350 294, 378 300 C 406 306, 430 288, 480 284"
          {...S}
          strokeWidth={1.6}
          pathLength={100}
          className="text-brand ci-draw"
        />
        <path d="M406 274v54" {...S} strokeWidth={1} strokeDasharray="3 3" className="text-brand" opacity={0.5} />
      </g>
    </svg>
  );
}

export function DashboardAssembly({ items }: { items: AssemblyItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [built, setBuilt] = useState<number>(items.length);
  const [focus, setFocus] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ build: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.build) return;
      setBuilt(0);
      const at = (p: number) => Math.min(items.length, Math.round(p * (items.length + 0.4)));
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        end: "bottom 74%",
        scrub: 0.5,
        onUpdate: (self) => {
          const n = at(self.progress);
          setBuilt((prev) => (prev === n ? prev : n));
        },
      });
      /* Seed from where the reader already is; see VariantBloom. */
      setBuilt(at(st.progress));
      return () => {
        st.kill();
        setBuilt(items.length);
      };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div
      ref={root}
      onPointerLeave={() => setFocus(null)}
      className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start"
    >
      {/* The object, assembling. */}
      <div className="lg:sticky lg:top-28">
        <div className="rounded-[1.5rem] border border-line bg-ink-2 p-5 sm:p-7">
          <Plate built={built} focus={focus} />
        </div>
      </div>

      {/* The seven, in the order they have to happen in. */}
      <ol className="border-t border-line">
        {items.map((item, i) => {
          const installed = built > i;
          const on = focus === i;
          return (
            <li key={item.no} className="border-b border-line">
              <button
                type="button"
                aria-pressed={on}
                onPointerEnter={() => setFocus(i)}
                onFocus={() => setFocus(i)}
                onBlur={() => setFocus(null)}
                onClick={() => setFocus((v) => (v === i ? null : i))}
                className="group w-full py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={cn(
                      "font-display shrink-0 text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                      on ? "text-brand-text" : installed ? "text-fog" : "text-ash/60",
                    )}
                  >
                    {item.no}
                  </span>
                  <h3
                    className={cn(
                      "font-display text-[clamp(1rem,1.7vw,1.3rem)] font-extrabold uppercase leading-[1.14] transition-colors duration-300",
                      on ? "text-snow" : installed ? "text-fog" : "text-ash/60",
                    )}
                  >
                    {item.title}
                  </h3>
                  <span
                    aria-hidden
                    className={cn(
                      "ml-auto h-px shrink-0 self-center bg-brand transition-all duration-500",
                      on ? "w-10" : installed ? "w-4" : "w-0",
                    )}
                  />
                </div>
                <p className="mt-2.5 pl-8 text-[0.9375rem] leading-relaxed text-fog">{item.body}</p>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

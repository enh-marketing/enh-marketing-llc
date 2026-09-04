"use client";

import { Rise } from "@/components/fx/Reveal";

/** Campaign volume, drawn as the reason for it.
 *
 *  The paragraph's first sentence is a mechanism: "Paid campaigns need new
 *  creative as audiences become familiar with existing ads." That is a curve
 *  that rises and then falls, and the second and third sentences are the
 *  answer: the next version, adapted from the same approved direction, takes
 *  over as the last one fades. So the drawing is a relay of three curves, each
 *  starting as the one before it declines, with the approved direction on the
 *  left feeding all three. No axis has a value; the document promises none. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };
function RelaySketch() {
  // Three versions, each rising as the one before it fades.
  const curves = [
    "M52 84 C 66 40, 82 40, 100 60 S 124 88, 140 92",
    "M96 84 C 110 40, 126 40, 144 60 S 168 88, 184 92",
    "M140 84 C 154 40, 170 40, 188 60 S 208 84, 214 88",
  ];
  return (
    <svg viewBox="0 0 220 100" aria-hidden className="block w-full text-fog">
      {/* The approved direction, feeding all three versions. */}
      <rect x="12" y="16" width="30" height="40" rx="3" fill="var(--color-ink-3)" stroke="var(--color-brand)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <rect x="18" y="22" width="18" height="16" rx="2" fill="var(--color-fog)" opacity="0.4" />
      <rect x="18" y="42" width="14" height="2.4" rx="1.2" fill="var(--color-snow)" opacity="0.8" />
      <rect x="18" y="48" width="10" height="2" rx="1" fill="var(--color-brand)" />
      <path d="M42 36 H 52" {...S} strokeDasharray="2 3" className="text-brand" />
      {/* Attention, over time. */}
      <path d="M52 92 H 214" {...S} className="text-line" />
      <path d="M52 92 V 24" {...S} className="text-line" />
      {curves.map((d, i) => (
        <g key={i}>
          <path d={d} {...S} className="text-line" opacity="0.5" />
          <path d={d} pathLength="100" stroke="var(--color-brand)" strokeWidth="0.8" strokeLinecap="round" fill="none" className="ci-draw" style={{ animationDelay: `${i * 1400}ms`, animationDuration: "6s" }} />
        </g>
      ))}
      {/* Where each version hands over to the next. */}
      {[100, 144].map((x, i) => (
        <circle key={x} cx={x} cy="60" r="3" fill="var(--color-brand)" className="glyph-pulse" style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${i * 1400 + 1200}ms` }} />
      ))}
    </svg>
  );
}

export function FatigueRelay({
  lead,
  caveat,
  labels,
}: {
  lead: string;
  caveat: string;
  labels: { direction: string; adapted: string[] };
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-20">
      <div>
        <Rise>
          <p className="font-display max-w-2xl text-[clamp(1.15rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.18] text-snow">{lead}</p>
        </Rise>
        <Rise delay={0.1} className="mt-8">
          <p className="max-w-2xl border-l-2 border-brand pl-6 leading-relaxed text-fog sm:text-lg">{caveat}</p>
        </Rise>
      </div>
      <Rise delay={0.15}>
        <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{ backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          />
          {/* Captions are HTML at 0.6875rem so they read at 11px on a phone;
              SVG text would scale down with the viewBox. Both are the
              paragraph's own words. */}
          <div className="relative">
            <p className="font-display mb-3 text-[0.6875rem] font-semibold uppercase leading-none text-brand-text">{labels.direction}</p>
            <RelaySketch />
            <p className="font-display mt-3 text-right text-[0.6875rem] font-semibold uppercase leading-none text-ash">{labels.adapted.join(" · ")}</p>
          </div>
        </div>
      </Rise>
    </div>
  );
}

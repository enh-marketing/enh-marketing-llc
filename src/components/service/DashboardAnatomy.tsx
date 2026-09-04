"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type AnatomyItem = { no: string; title: string; body: string };

/** Seven elements of one dashboard, annotating a drawing of it.
 *
 *  WHY THIS SHAPE. The document calls them "the main elements of a reporting
 *  dashboard": parts of one object, not a list of features. So the object is
 *  drawn once and each element is a numbered callout on the region it names —
 *  the sources feeding in, the metric definitions, the view tabs, the filter
 *  bar, the refresh clock, the access badge, the health strip. The list beside
 *  carries the same numbers, and pointing at an entry lights its region.
 *
 *  NOT THE PINNED EXPLORER. That component is a tablist with one panel open at
 *  a time. Here everything is visible at once, which is what an annotated
 *  diagram is for: the reader sees all seven parts in their places and the
 *  numbers tie the words to the drawing. Highlight on hover or focus is an
 *  affordance, not a gate; nothing is hidden behind it.
 *
 *  Numbers ascend in the list, in the DOM and on the drawing, and the drawing
 *  is decorative (aria-hidden): the list is the content. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

/** Where each callout sits on the drawing, and the leader line to its region.
 *
 *  The seven regions are stacked in the document's own order, so reading the
 *  drawing top to bottom gives 01 to 07, and the callouts alternate between the
 *  two gutters so no leader has to cross the view. 05 and 06 share a row; the
 *  left one is numbered first. */
const CALLOUTS: { cx: number; cy: number; lead: string }[] = [
  { cx: 28, cy: 34, lead: "M37 34 H 58" },      // 01 sources, into the top of the view
  { cx: 292, cy: 56, lead: "M283 56 H 252" },   // 02 metric definitions legend
  { cx: 28, cy: 90, lead: "M37 90 H 60" },      // 03 the view tiles
  { cx: 292, cy: 125, lead: "M283 125 H 252" }, // 04 the filter bar
  { cx: 28, cy: 156, lead: "M37 156 H 60" },    // 05 the refresh clock
  { cx: 292, cy: 156, lead: "M283 156 H 154" }, // 06 the access badge
  { cx: 28, cy: 180, lead: "M37 180 H 60" },    // 07 the health strip
];

export function DashboardAnatomy({ items }: { items: AnatomyItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const on = (i: number) => active === i;
  const region = (i: number, base = "text-fog") => cn("transition-colors duration-300", on(i) ? "text-brand" : base);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
      {/* The dashboard, annotated. Sticky beside the list on large screens, and
          shown only there: at 320 wide the drawing is 230px across, which puts
          its callout numerals at 6px, well under the readable floor. The list
          carries every word, so nothing is lost by leaving it out. */}
      <div className="hidden lg:sticky lg:top-28 lg:block">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 p-5 sm:p-7">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <svg viewBox="0 0 320 200" aria-hidden className="relative block w-full text-fog">
            {/* The view itself, holding every element below. */}
            <rect x="60" y="20" width="204" height="170" rx="5" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

            {/* 01 Connected data sources, arriving at the top of the view. */}
            <g className={region(0)}>
              {[70, 104, 138, 172].map((x, i) => (
                <g key={x}>
                  <rect x={x} y="28" width="26" height="12" rx="3" {...S} />
                  <rect x={x + 4} y="33" width="14" height="2" rx="1" fill="currentColor" opacity="0.6" />
                  <path d={`M${x + 13} 40 V 46`} {...S} strokeDasharray="2 2" opacity="0.7" className="ci-twinkle" style={{ animationDelay: `${i * 260}ms` }} />
                </g>
              ))}
              <path d="M70 46 H 250" {...S} className="text-line" />
            </g>

            {/* 02 Consistent metrics: one legend, one set of definitions. */}
            <g className={region(1)}>
              <rect x="70" y="50" width="180" height="14" rx="3" {...S} />
              {[76, 120, 164, 208].map((x) => (
                <g key={x}>
                  <rect x={x} y="55" width="4" height="4" rx="1" fill="currentColor" />
                  <rect x={x + 6} y="56" width="24" height="2" rx="1" fill="currentColor" opacity="0.6" />
                </g>
              ))}
            </g>

            {/* 03 Clear dashboard views: the tiles the reader looks at. */}
            <g className={region(2)}>
              {[70, 132, 194].map((x, i) => (
                <g key={x}>
                  <rect x={x} y="72" width="56" height="36" rx="3" {...S} />
                  {[0, 1, 2, 3].map((b) => (
                    <rect key={b} x={x + 8 + b * 11} y={102 - [10, 18, 13, 22][(b + i) % 4]} width="7" height={[10, 18, 13, 22][(b + i) % 4]} rx="1" fill="currentColor" opacity="0.45" className="ci-grow" style={{ transformOrigin: "bottom", animationDelay: `${(i * 4 + b) * 120}ms` }} />
                  ))}
                </g>
              ))}
            </g>

            {/* 04 Filters and comparisons: the bar that narrows the view. */}
            <g className={region(3)}>
              <rect x="70" y="116" width="180" height="18" rx="3" {...S} className="text-line" />
              {[78, 116, 154].map((x) => (
                <rect key={x} x={x} y="121" width="30" height="8" rx="4" {...S} />
              ))}
              <path d="M200 125 h30 m-4 -3 l4 3 l-4 3" {...S} className="text-brand" />
            </g>

            {/* 05 Scheduled data updates: the clock the view refreshes on. */}
            <g className={region(4)}>
              <circle cx="88" cy="156" r="9" {...S} />
              <path d="M88 156 V 150 M88 156 L 93 159" {...S} />
              <circle cx="88" cy="156" r="13" {...S} className="glyph-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }} opacity="0.5" />
            </g>

            {/* 06 Access and permissions: who may open which view. */}
            <g className={region(5)}>
              <rect x="122" y="144" width="32" height="24" rx="3" {...S} />
              <path d="M133 150 v-3 a5 5 0 0 1 10 0 v3" {...S} />
              <rect x="131" y="152" width="14" height="10" rx="2" {...S} />
              <circle cx="138" cy="157" r="1.6" fill="currentColor" />
            </g>

            {/* 07 Data checks and monitoring: a health strip along the foot. */}
            <g className={region(6)}>
              <path d="M70 180 H 250" {...S} className="text-line" />
              {[78, 106, 134, 162, 190, 218, 244].map((x, i) => (
                <circle key={x} cx={x} cy="180" r="3" fill={i === 4 ? "var(--color-brand)" : "currentColor"} opacity={i === 4 ? 1 : 0.5} className={i === 4 ? "glyph-pulse" : undefined} style={i === 4 ? { transformBox: "fill-box", transformOrigin: "center" } : undefined} />
              ))}
            </g>

            {/* Leaders and callouts, numbered to match the list. */}
            {CALLOUTS.map((c, i) => (
              <g key={i} className={on(i) ? "text-brand" : "text-fog"}>
                <path d={c.lead} {...S} strokeDasharray="2 3" opacity="0.8" />
                <circle cx={c.cx} cy={c.cy} r="11" fill={on(i) ? "var(--color-brand)" : "var(--color-ink-2)"} stroke={on(i) ? "var(--color-brand)" : "var(--color-line)"} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                <text x={c.cx} y={c.cy + 4} textAnchor="middle" className="font-display" fill={on(i) ? "#fff" : "var(--color-snow)"} fontSize="11" fontWeight="700">
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* The seven, numbered to the drawing. */}
      <ol className="divide-y divide-line border-y border-line">
        {items.map((it, i) => (
          <li
            key={it.no}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            tabIndex={0}
            className={cn("group grid gap-x-6 gap-y-2 py-6 outline-none transition-colors duration-300 sm:grid-cols-[3rem_1fr]", on(i) && "bg-brand/[0.03]")}
          >
            <span className={cn("font-display text-sm font-bold tabular-nums transition-colors duration-300", on(i) ? "text-brand" : "text-brand-text")}>{it.no}</span>
            <div>
              <h3 className="font-display text-[clamp(1.05rem,1.7vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow">{it.title}</h3>
              <p className="mt-2 leading-relaxed text-fog">{it.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

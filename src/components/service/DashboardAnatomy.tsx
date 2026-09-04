"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type AnatomyItem = { no: string; title: string; body: string };

/** Seven elements of one dashboard, set as an annotated plate.
 *
 *  WHY THIS SHAPE. The document calls them "the main elements of a reporting
 *  dashboard": parts of one object, not a list of features. So the object is
 *  drawn once, upright, and the seven entries stand either side of it with a
 *  leader running from each number to the region it names. That is how an
 *  anatomical plate or a parts diagram is laid out, and it is the only layout
 *  on the site that reads inward from both margins.
 *
 *  THE PLATE IS UPRIGHT AND THE ENTRIES SIT IN A GRID BESIDE IT. The first
 *  build pinned a wide landscape drawing in one column and ran the seven down
 *  the other: the drawing was 445px tall against a 1245px list, so two thirds
 *  of its column was empty, and the next section used the same arrangement
 *  mirrored. A dashboard is a tall thing, so drawing it upright fills the
 *  column, and setting the entries two across fills the rest.
 *
 *  A second attempt put four entries in the left margin and three in the right.
 *  It looked like a plate but the numbers interleaved by height, so 05 sat
 *  level with 02. The entries are therefore one grid, read left to right and
 *  top to bottom, which gives 01 to 07 in the document's order. The callouts on
 *  the plate ascend too: 01 to 04 down its left margin, 05 to 07 down its
 *  right, each one lower than the last.
 *
 *  The drawing is decorative and hidden below the large breakpoint, where it
 *  would be too small to read; the seven then run as a plain numbered list,
 *  which is where the content lives in every case. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

/** Where each callout sits on the plate, and the leader to its region. Left
 *  margin for the first four, right margin for the last three; y always
 *  increases, so the numbering reads in order down the drawing. */
const CALLOUTS: { cx: number; cy: number; lead: string }[] = [
  { cx: 22, cy: 40, lead: "M33 40 H 60" },     // 01 the sources arriving
  { cx: 22, cy: 76, lead: "M33 76 H 60" },     // 02 the definitions legend
  { cx: 22, cy: 132, lead: "M33 132 H 60" },   // 03 the views
  { cx: 22, cy: 192, lead: "M33 192 H 60" },   // 04 the filter bar
  { cx: 278, cy: 244, lead: "M267 244 H 240" }, // 05 the refresh clock
  { cx: 278, cy: 306, lead: "M267 306 H 240" }, // 06 the access badge
  { cx: 278, cy: 362, lead: "M267 362 H 240" }, // 07 the health strip
];

export function DashboardAnatomy({ items }: { items: AnatomyItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const on = (i: number) => active === i;
  const region = (i: number) => cn("transition-colors duration-300", on(i) ? "text-brand" : "text-fog");

  const Entry = ({ item, i, wide }: { item: AnatomyItem; i: number; wide?: boolean }) => (
    <li
      onPointerEnter={() => setActive(i)}
      onPointerLeave={() => setActive(null)}
      onFocus={() => setActive(i)}
      onBlur={() => setActive(null)}
      tabIndex={0}
      className={cn(
        "group rounded-[1.25rem] border p-5 outline-none transition-colors duration-300 sm:p-6",
        on(i) ? "border-brand/50 bg-brand/[0.04]" : "border-line bg-ink-3",
        // Seven entries in two columns leave the last row half empty; the
        // seventh spans it, which suits the one that carries on after launch.
        wide && "lg:col-span-2",
      )}
    >
      <p className={cn("font-display text-[0.6875rem] font-bold tabular-nums transition-colors duration-300", on(i) ? "text-brand" : "text-brand-text")}>
        {item.no}
      </p>
      <h3 className="font-display mt-2 text-[clamp(1rem,1.4vw,1.15rem)] font-extrabold uppercase leading-[1.16] text-snow">
        {item.title}
      </h3>
      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-fog">{item.body}</p>
    </li>
  );

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:gap-14">
      {/* The plate. */}
      <div className="hidden lg:sticky lg:top-28 lg:block">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 p-5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <svg viewBox="0 0 300 460" aria-hidden className="relative block w-full text-fog">
            {/* The view itself, upright, holding every element below. */}
            <rect x="56" y="18" width="188" height="416" rx="6" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

            {/* 01 Connected data sources, arriving at the head of the view. */}
            <g className={region(0)}>
              {[66, 110, 154, 198].map((x, i) => (
                <g key={x}>
                  <rect x={x} y="30" width="32" height="14" rx="3" {...S} />
                  <rect x={x + 5} y="36" width="18" height="2.4" rx="1.2" fill="currentColor" opacity="0.6" />
                  <path d={`M${x + 16} 44 V 54`} {...S} strokeDasharray="2 2" opacity="0.75" className="ci-twinkle" style={{ animationDelay: `${i * 260}ms` }} />
                </g>
              ))}
              <path d="M66 54 H 234" {...S} className="text-line" />
            </g>

            {/* 02 Consistent metrics: one legend, one set of definitions. */}
            <g className={region(1)}>
              <rect x="66" y="66" width="168" height="20" rx="3" {...S} />
              {[74, 116, 158, 200].map((x) => (
                <g key={x}>
                  <rect x={x} y="73" width="5" height="5" rx="1" fill="currentColor" />
                  <rect x={x + 8} y="74.5" width="22" height="2.4" rx="1.2" fill="currentColor" opacity="0.6" />
                </g>
              ))}
            </g>

            {/* 03 Clear dashboard views: the tiles a reader looks at. */}
            <g className={region(2)}>
              {[66, 124, 182].map((x, i) => (
                <g key={x}>
                  <rect x={x} y="100" width="52" height="64" rx="3" {...S} />
                  {[0, 1, 2, 3].map((b) => (
                    <rect
                      key={b}
                      x={x + 7 + b * 10}
                      y={156 - [14, 26, 19, 32][(b + i) % 4]}
                      width="6"
                      height={[14, 26, 19, 32][(b + i) % 4]}
                      rx="1"
                      fill="currentColor"
                      opacity="0.45"
                      className="ci-grow"
                      style={{ transformOrigin: "bottom", animationDelay: `${(i * 4 + b) * 130}ms` }}
                    />
                  ))}
                </g>
              ))}
            </g>

            {/* 04 Filters and comparisons: the bar that narrows the view. */}
            <g className={region(3)}>
              <rect x="66" y="180" width="168" height="24" rx="3" {...S} className="text-line" />
              {[74, 116, 158].map((x) => (
                <rect key={x} x={x} y="187" width="34" height="10" rx="5" {...S} />
              ))}
              <path d="M200 192 h26 m-4 -3.5 l4 3.5 l-4 3.5" {...S} className="text-brand" />
            </g>

            {/* The report the filters act on: part of the view, unlabelled. */}
            <rect x="66" y="216" width="112" height="116" rx="3" {...S} className="text-line" />
            <path d="M76 318 C 100 306, 118 288, 138 276 S 160 250, 170 240" fill="none" stroke="var(--color-fog)" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" vectorEffect="non-scaling-stroke" />
            {[76, 96, 116, 136, 156].map((x, i) => (
              <circle key={x} cx={x} cy={318 - i * 18} r="2.4" fill="var(--color-fog)" opacity="0.5" />
            ))}

            {/* 05 Scheduled data updates: the clock the view refreshes on. */}
            <g className={region(4)}>
              <circle cx="212" cy="244" r="14" {...S} />
              <path d="M212 244 V 234 M212 244 L 220 249" {...S} />
              <circle cx="212" cy="244" r="19" {...S} className="glyph-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }} opacity="0.5" />
            </g>

            {/* 06 User access and permissions: who may open which view. */}
            <g className={region(5)}>
              <rect x="192" y="286" width="40" height="30" rx="3" {...S} />
              <path d="M204 294 v-4 a8 8 0 0 1 16 0 v4" {...S} />
              <rect x="202" y="296" width="20" height="14" rx="2" {...S} />
              <circle cx="212" cy="303" r="2" fill="currentColor" />
            </g>

            {/* 07 Data checks and monitoring: a health strip along the foot. */}
            <g className={region(6)}>
              <path d="M66 362 H 234" {...S} className="text-line" />
              {[74, 100, 126, 152, 178, 204, 228].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy="362"
                  r="3.2"
                  fill={i === 4 ? "var(--color-brand)" : "currentColor"}
                  opacity={i === 4 ? 1 : 0.5}
                  className={i === 4 ? "glyph-pulse" : undefined}
                  style={i === 4 ? { transformBox: "fill-box", transformOrigin: "center" } : undefined}
                />
              ))}
              <rect x="66" y="384" width="168" height="34" rx="3" {...S} strokeDasharray="3 3" opacity="0.6" />
              {[76, 76, 76].map((x, i) => (
                <rect key={i} x={x} y={392 + i * 9} width={[120, 92, 108][i]} height="2.4" rx="1.2" fill="currentColor" opacity="0.4" />
              ))}
            </g>

            {/* Leaders and callouts, numbered to the entries either side. */}
            {CALLOUTS.map((c, i) => (
              <g key={i} className={on(i) ? "text-brand" : "text-fog"}>
                <path d={c.lead} {...S} strokeDasharray="2 3" opacity="0.85" />
                <circle
                  cx={c.cx}
                  cy={c.cy}
                  r="12"
                  fill={on(i) ? "var(--color-brand)" : "var(--color-ink-2)"}
                  stroke={on(i) ? "var(--color-brand)" : "var(--color-line)"}
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={c.cx}
                  y={c.cy + 4.4}
                  textAnchor="middle"
                  className="font-display"
                  fill={on(i) ? "#fff" : "var(--color-snow)"}
                  fontSize="12"
                  fontWeight="700"
                >
                  {items[i]?.no ?? String(i + 1).padStart(2, "0")}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* The seven, two across, reading in the document's order. */}
      <ol className="hidden gap-4 lg:grid lg:grid-cols-2">
        {items.map((it, i) => (
          <Entry key={it.no} item={it} i={i} wide={i === items.length - 1} />
        ))}
      </ol>

      {/* Below the large breakpoint the plate would be unreadable, so the seven
          run as one list in document order. */}
      <ol className="space-y-4 lg:hidden">
        {items.map((it) => (
          <li key={it.no} className="rounded-[1.25rem] border border-line bg-ink-3 p-6">
            <p className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">{it.no}</p>
            <h3 className="font-display mt-2 text-lg font-extrabold uppercase leading-[1.16] text-snow">{it.title}</h3>
            <p className="mt-3 leading-relaxed text-fog">{it.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

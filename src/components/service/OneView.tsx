"use client";

import { cn } from "@/lib/cn";

/** The hero visual: many sources becoming one view that keeps itself current.
 *
 *  WHY THIS SHAPE. The banner's sentence is the drawing: "We connect the
 *  platforms you already use, define how each metric is calculated, and create
 *  one view that updates automatically." So the six kinds of source the
 *  document names sit in a row at the top, one bus carries them into a
 *  dashboard, and the dashboard is drawn as the object a reader would recognise:
 *  a header, a row of tiles, a chart, a table. Then it refreshes: a sweep
 *  crosses it on a loop and the tiles' bars settle again, which is "updates
 *  automatically" made visible.
 *
 *  NOT THE CAMPAIGN INTELLIGENCE PICTURE. That page's data section wires inputs
 *  into a box and the box is the point. Here the sources are a caption row and
 *  the dashboard is the point: the drawing spends its area on the view, and the
 *  bus into it is one short line.
 *
 *  NO FIGURES. Tiles carry bars and lines, never values; the only text is the
 *  banner's own phrase and the six source names. A dashboard hero with numbers
 *  in it would be inventing a client's results. */
export function OneView({
  sources,
  viewLabel,
  className,
}: {
  sources: string[];
  viewLabel: string;
  className?: string;
}) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
  const tiles = [
    { x: 24, bars: [10, 16, 13, 19] },
    { x: 84, bars: [14, 9, 17, 12] },
    { x: 144, bars: [8, 15, 11, 18] },
  ];
  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[440px] -translate-y-1/2 select-none lg:block xl:w-[500px]",
        className,
      )}
      role="img"
      aria-label={`A diagram: ${sources.join(", ")} sources connected into one reporting dashboard with tiles, a chart and a table, refreshing on a loop. ${viewLabel}.`}
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* The sources, as the document names them. */}
        <div className="relative flex flex-wrap justify-center gap-2">
          {sources.map((s) => (
            <span key={s} className="font-display rounded-full border border-line bg-ink-3 px-3 py-1 text-[0.6875rem] font-semibold uppercase text-ash">
              {s}
            </span>
          ))}
        </div>

        <svg viewBox="0 0 220 132" className="relative mt-3 block w-full text-fog" aria-hidden>
          {/* The bus, and the data on it. */}
          <path d="M110 0 V 16" {...S} className="text-line" />
          <path d="M110 0 V 16" pathLength="100" stroke="var(--color-brand)" strokeWidth="0.9" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDuration: "1.6s" }} />

          {/* The view. */}
          <rect x="16" y="16" width="188" height="112" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <text x="24" y="27" className="font-display" fill="var(--color-ash)" fontSize="6.6" fontWeight="600" letterSpacing="0.5">
            {viewLabel.toUpperCase()}
          </text>
          <path d="M16 32 H204" {...S} className="text-line" />

          {/* Three tiles: bars that settle again on every refresh. */}
          {tiles.map((t, ti) => (
            <g key={t.x}>
              <rect x={t.x} y="38" width="52" height="30" rx="3" fill="none" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <rect x={t.x + 6} y="43" width="18" height="2.2" rx="1.1" fill="var(--color-fog)" opacity="0.5" />
              {t.bars.map((h, i) => (
                <rect
                  key={i}
                  x={t.x + 8 + i * 10}
                  y={64 - h}
                  width="6"
                  height={h}
                  rx="1.5"
                  fill={i === t.bars.length - 1 ? "var(--color-brand)" : "var(--color-fog)"}
                  opacity={i === t.bars.length - 1 ? 0.9 : 0.55}
                  className="ci-grow"
                  style={{ animationDelay: `${(ti * 4 + i) * 140}ms` }}
                />
              ))}
            </g>
          ))}

          {/* The chart. */}
          <rect x="24" y="74" width="112" height="46" rx="3" fill="none" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <rect x="30" y="79" width="22" height="2.2" rx="1.1" fill="var(--color-fog)" opacity="0.5" />
          <path d="M30 112 C 50 108, 62 100, 78 98 S 108 92, 130 84" fill="none" stroke="var(--color-brand)" strokeWidth="0.9" strokeLinecap="round" pathLength="100" className="ci-draw" />
          <path d="M30 112 C 50 108, 62 100, 78 98 S 108 92, 130 84 V 114 H 30 Z" fill="var(--color-brand)" opacity="0.07" />

          {/* The table. */}
          <rect x="144" y="74" width="52" height="46" rx="3" fill="none" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          {[82, 90, 98, 106, 114].map((y, i) => (
            <g key={y}>
              <rect x="150" y={y} width={i === 0 ? 14 : 20} height="2.2" rx="1.1" fill="var(--color-fog)" opacity={i === 0 ? 0.8 : 0.45} />
              <rect x="178" y={y} width={[8, 12, 6, 10, 9][i]} height="2.2" rx="1.1" fill={i === 0 ? "var(--color-fog)" : "var(--color-snow)"} opacity={i === 0 ? 0.8 : 0.7} />
            </g>
          ))}

          {/* The refresh: a sweep across the whole view, clipped to it. */}
          <clipPath id="ov-view">
            <rect x="16" y="33" width="188" height="95" rx="3" />
          </clipPath>
          <g clipPath="url(#ov-view)">
            <rect x="16" y="33" width="26" height="95" fill="var(--color-brand)" opacity="0.12" className="ci-scan-x" />
          </g>
        </svg>
      </div>
    </div>
  );
}

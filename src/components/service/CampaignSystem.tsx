"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Which phase of a campaign an item's own description places it in. */
export type Phase = "before" | "live" | "after";

/** What campaign intelligence covers, drawn as the campaign it acts on.
 *
 *  WHY THE PINS ARE ON A SPINE AND NOT IN A RAIL. Every one of these six items
 *  is dated. The content file records, against the sentence it was read from,
 *  whether the item happens before a dirham is spent, while the budget is
 *  running, or after. That is real, sourced information and a column of
 *  numbered dots throws it away. So the selector's marks stand on a campaign
 *  spine at the point in the campaign they act, either side of the line where
 *  the money starts moving. Choosing an item and seeing when it happens are the
 *  same glance. Benchmarking, whose own description puts it in all three,
 *  lights the whole spine rather than a point on it.
 *
 *  WHY EACH PANEL IS A DIFFERENT DRAWING. These are not six stages of one
 *  thing. A forecast, a budget split, a category band, three scenarios, an
 *  alert and a comparison have no shared shape, so the panel changes entirely
 *  with the selection rather than lighting a position on a rail. This is the
 *  same reasoning AdFormatPreview gives for the LinkedIn formats, and the
 *  interaction model is deliberately the site's own; the drawings are not.
 *
 *  NOT ONE FIGURE ANYWHERE. The page's own header refuses guaranteed numbers,
 *  benchmarks and accuracy percentages, and this drawing carries none: no
 *  axis is labelled, no bar has a value, no band has a width in anything.
 *  Every panel says only what its item's sentences say — a range exists, a
 *  budget divides, a comparison is only made against like data, a result can
 *  leave its range, a forecast can be set beside what happened. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const VB = "0 0 440 250";

/* ------------------------------------------------------------- panels --- */

/** 01 — a budget, and the range it could produce. The forecast opens from the
 *  block rather than floating beside it, because that is the claim: this money
 *  produces this range. The rows it cannot support are struck out, which is the
 *  item's own last clause. */
function Forecast() {
  return (
    <g>
      <rect x="14" y="94" width="52" height="62" rx="5" {...S} strokeWidth={1.4} className="text-brand" fill="color-mix(in srgb, var(--color-brand) 10%, transparent)" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="24" y={106 + i * 16} width={[32, 24, 28][i]} height="5" rx="2.5" fill="currentColor" className="text-brand" opacity={0.7} />
      ))}

      {/* The range it opens into. */}
      <path d="M66 125 L292 52 L292 198 Z" fill="color-mix(in srgb, var(--color-brand) 9%, transparent)" />
      <path d="M66 125 L292 52" {...S} strokeWidth={1.2} strokeDasharray="5 4" className="text-brand" />
      <path d="M66 125 L292 198" {...S} strokeWidth={1.2} strokeDasharray="5 4" className="text-brand" />
      <path d="M292 52 L292 198" {...S} strokeWidth={1.4} className="text-brand" />
      <path d="M66 125 L292 125" {...S} strokeWidth={1} className="text-brand" opacity={0.45} />

      {/* What the range is drawn for, and what it cannot carry. */}
      {[0, 1, 2, 3, 4].map((i) => {
        const out = i === 3 || i === 4;
        return (
          <g key={i}>
            <rect x="312" y={60 + i * 26} width={out ? 74 : 112} height="6" rx="3" fill="currentColor" className={out ? "text-ash" : "text-fog"} opacity={out ? 0.3 : 0.6} />
            {out && <path d={`M308 ${63 + i * 26}h84`} {...S} strokeWidth={1.1} className="text-ash" />}
          </g>
        );
      })}
    </g>
  );
}

/** 02 — one budget dividing, and the ceiling each platform can actually take.
 *  The cap is the item's own last sentence and it is the only part of this
 *  drawing that is not obvious: one column is already against its ceiling. */
function MediaMix() {
  const cols = [
    { x: 24, cap: 78, fill: 108 },
    { x: 106, cap: 96, fill: 96 },
    { x: 188, cap: 62, fill: 40 },
    { x: 270, cap: 118, fill: 72 },
    { x: 352, cap: 88, fill: 54 },
  ];
  return (
    <g>
      <rect x="14" y="20" width="412" height="16" rx="8" fill="currentColor" className="text-brand" opacity={0.9} />
      {cols.map((c, i) => (
        <g key={i}>
          <path d={`M${220} 36 C ${220} 62, ${c.x + 32} 58, ${c.x + 32} 86`} {...S} strokeWidth={1} className="text-line" />
          {/* the ground */}
          <path d={`M${c.x} 214h64`} {...S} strokeWidth={1.2} className="text-line" />
          {/* what this platform can use efficiently */}
          <path d={`M${c.x - 3} ${214 - c.cap}h70`} {...S} strokeWidth={1.2} strokeDasharray="4 3" className={c.fill >= c.cap ? "text-brand" : "text-ash"} />
          <rect
            x={c.x}
            y={214 - c.fill}
            width="64"
            height={c.fill}
            rx="3"
            fill="currentColor"
            className={c.fill >= c.cap ? "text-brand" : "text-fog"}
            opacity={c.fill >= c.cap ? 0.55 : 0.28}
          />
          {c.fill >= c.cap && (
            <circle cx={c.x + 32} cy={214 - c.cap - 12} r="4.5" {...S} strokeWidth={1.4} className="text-brand ci-twinkle" />
          )}
        </g>
      ))}
    </g>
  );
}

/** 03 — a category range, and everything that was not allowed into it. The
 *  crossed points are the item's own condition: only data with sufficiently
 *  similar objectives, markets, channels and conversion definitions. */
function Benchmark() {
  const inside = [
    [72, 118], [104, 140], [136, 108], [168, 134], [200, 122],
    [232, 146], [264, 112], [328, 138], [360, 120], [392, 132],
  ];
  const excluded = [
    [96, 58], [188, 46], [288, 64], [136, 206], [244, 214], [372, 200],
  ];
  return (
    <g>
      <path d="M40 22v196M40 218h394" {...S} strokeWidth={1} className="text-line" />
      {/* the range comparable data actually describes */}
      <rect x="40" y="98" width="394" height="58" fill="color-mix(in srgb, var(--color-brand) 8%, transparent)" />
      <path d="M40 98h394M40 156h394" {...S} strokeWidth={1.2} strokeDasharray="6 4" className="text-brand" />

      {inside.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" fill="currentColor" className="text-fog ci-twinkle" opacity={0.5} style={{ animationDelay: `${i * 260}ms` }} />
      ))}
      {excluded.map(([x, y], i) => (
        <g key={i} className="text-ash" opacity={0.5}>
          <path d={`M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8`} {...S} strokeWidth={1.2} />
        </g>
      ))}

      {/* the campaign being compared */}
      <circle cx="296" cy="128" r="9" {...S} strokeWidth={1.4} className="text-brand" />
      <circle cx="296" cy="128" r="4" fill="currentColor" className="text-brand" />
    </g>
  );
}

/** 04 — the same question asked at three budgets. Three levels, three ranges,
 *  and the ranges plainly differ; nothing says by how much. */
function Scenarios() {
  const rows = [
    { y: 44, w: 34, spread: 22 },
    { y: 110, w: 58, spread: 38 },
    { y: 176, w: 84, spread: 56 },
  ];
  return (
    <g>
      {rows.map((r, i) => {
        const on = i === 1;
        return (
          <g key={i} className={on ? "text-brand" : "text-fog"} opacity={on ? 1 : 0.5}>
            <rect x="14" y={r.y - 15} width={r.w} height="30" rx="4" fill="currentColor" opacity={on ? 0.75 : 0.35} />
            <path
              d={`M${14 + r.w} ${r.y} L360 ${r.y - r.spread} L360 ${r.y + r.spread} Z`}
              fill={on ? "color-mix(in srgb, var(--color-brand) 11%, transparent)" : "none"}
              stroke="currentColor"
              strokeWidth={on ? 1.3 : 1}
              strokeDasharray="5 4"
              vectorEffect="non-scaling-stroke"
            />
            <path d={`M368 ${r.y - r.spread}v${r.spread * 2}`} {...S} strokeWidth={on ? 1.6 : 1.1} />
            <path d={`M364 ${r.y - r.spread}h8M364 ${r.y + r.spread}h8`} {...S} strokeWidth={on ? 1.6 : 1.1} />
          </g>
        );
      })}
    </g>
  );
}

/** 05 — a result leaving its range while there is still budget to act with.
 *  Both halves of that sentence are drawn: the crossing, and the spend that
 *  has not gone out yet. */
function Alerts() {
  return (
    <g>
      <path d="M20 62 C 140 54, 260 58, 420 44" {...S} strokeWidth={1.1} strokeDasharray="5 4" className="text-brand" opacity={0.7} />
      <path d="M20 132 C 140 126, 260 132, 420 122" {...S} strokeWidth={1.1} strokeDasharray="5 4" className="text-brand" opacity={0.7} />
      <path d="M20 62 C 140 54, 260 58, 420 44 L420 122 C 260 132, 140 126, 20 132 Z" fill="color-mix(in srgb, var(--color-brand) 7%, transparent)" />

      {/* the campaign, running out of its range */}
      <path
        d="M20 108 C 90 100, 150 112, 196 104 C 244 96, 268 132, 300 150 C 330 166, 372 176, 420 184"
        {...S}
        strokeWidth={1.8}
        pathLength={100}
        className="text-fog ci-draw"
      />
      {/* where it leaves */}
      <circle cx="284" cy="134" r="12" {...S} strokeWidth={1.3} className="text-brand ci-twinkle" />
      <path d="M284 126v9M284 141v1.5" {...S} strokeWidth={1.8} className="text-brand" />

      {/* what is still unspent when it fires */}
      <path d="M20 210h400" {...S} strokeWidth={1} className="text-line" />
      <rect x="20" y="196" width="264" height="14" rx="7" fill="currentColor" className="text-fog" opacity={0.35} />
      <rect x="284" y="196" width="136" height="14" rx="7" {...S} strokeWidth={1.2} strokeDasharray="4 4" className="text-brand" />
      <path d="M284 188v34" {...S} strokeWidth={1.4} className="text-brand" />
    </g>
  );
}

/** 06 — the forecast and what happened, on one drawing, and which assumptions
 *  held. The hatch is where they parted; nothing says which way is good. */
function Compare() {
  return (
    <g>
      <path d="M18 54 C 110 46, 200 52, 300 40" {...S} strokeWidth={1.1} strokeDasharray="5 4" className="text-brand" opacity={0.7} />
      <path d="M18 138 C 110 132, 200 138, 300 128" {...S} strokeWidth={1.1} strokeDasharray="5 4" className="text-brand" opacity={0.7} />
      <path d="M18 54 C 110 46, 200 52, 300 40 L300 128 C 200 138, 110 132, 18 138 Z" fill="color-mix(in srgb, var(--color-brand) 7%, transparent)" />
      <path
        d="M18 112 C 86 104, 140 88, 188 92 C 232 96, 258 150, 300 164"
        {...S}
        strokeWidth={1.8}
        pathLength={100}
        className="text-snow ci-draw"
      />
      {/* where the two parted */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${236 + i * 15} ${132 + i * 4}l10 ${22 + i * 3}`} {...S} strokeWidth={1} className="text-brand" opacity={0.45} />
      ))}
      <path d="M18 196h282" {...S} strokeWidth={1} className="text-line" />

      {/* which assumptions held */}
      {[0, 1, 2, 3].map((i) => {
        const held = i === 0 || i === 2;
        return (
          <g key={i}>
            <rect x="330" y={48 + i * 34} width="72" height="6" rx="3" fill="currentColor" className="text-fog" opacity={0.4} />
            {held ? (
              <path d={`M410 ${48 + i * 34}l4 5 7-9`} {...S} strokeWidth={1.6} className="text-brand" />
            ) : (
              <path d={`M410 ${47 + i * 34}l9 9M419 ${47 + i * 34}l-9 9`} {...S} strokeWidth={1.4} className="text-ash" />
            )}
          </g>
        );
      })}
    </g>
  );
}

const PANELS = [Forecast, MediaMix, Benchmark, Scenarios, Alerts, Compare] as const;

/* -------------------------------------------------------------- spine --- */

/** Where each item's mark stands on the campaign, as a percentage of the
 *  spine. Read from the phase flags in the content file, which are themselves
 *  cited against the sentence they came from. The marks ascend left to right in
 *  the document's own order, so the numbering never runs backwards. */
const SPINE_AT = [9, 22, 34, 46, 64, 88];
/** Where the money starts moving. */
const START_AT = 55;

export function CampaignSystem({
  active,
  pin,
  count,
  phases,
  labels,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
  /** Each item's phases, in item order, from the content file. */
  phases: Phase[][];
  /** Before, at the line, and after. */
  labels: [string, string, string];
}) {
  const Panel = PANELS[active] ?? PANELS[0];
  const spans = (phases[active] ?? []).length === 3;
  const at = SPINE_AT[active] ?? 50;

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-7">
      {/* THE CAMPAIGN, and where on it the selected item acts. */}
      <div className="relative mb-7 h-[4.5rem]">
        <span aria-hidden className="absolute inset-x-0 top-[1.9rem] h-px bg-line" />

        {/* Benchmarking runs the whole length, so it lights the whole length. */}
        <span
          aria-hidden
          className={cn(
            "absolute top-[1.9rem] h-px origin-left bg-brand transition-transform duration-500",
            spans ? "inset-x-0 scale-x-100" : "inset-x-0 scale-x-0",
          )}
        />

        {/* The line the money starts moving at. */}
        <span
          aria-hidden
          className="absolute top-3 h-10 w-px bg-brand/70"
          style={{ left: `${START_AT}%` }}
        />
        <span
          className="font-display absolute top-[3.4rem] -translate-x-1/2 whitespace-nowrap text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-brand-text"
          style={{ left: `${START_AT}%` }}
        >
          {labels[1]}
        </span>
        <span className="font-display absolute left-0 top-[3.4rem] text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-ash">
          {labels[0]}
        </span>
        <span className="font-display absolute right-0 top-[3.4rem] text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-ash">
          {labels[2]}
        </span>

        {/* The marks, each standing where its own item acts. */}
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className="absolute top-[1.9rem] -translate-x-1/2 -translate-y-1/2 transition-[left] duration-500"
            style={{ left: `${SPINE_AT[i] ?? 50}%` }}
          >
            {pin(i)}
          </span>
        ))}

        {/* A tick under the selected mark, so the eye finds it on the spine. */}
        <span
          aria-hidden
          className="absolute top-[2.9rem] h-2 w-px -translate-x-1/2 bg-brand transition-[left] duration-500"
          style={{ left: `${at}%` }}
        />
      </div>

      {/* The item itself, drawn as the thing it is. */}
      <div className="min-h-[16rem]">
        <svg viewBox={VB} aria-hidden className="block w-full">
          <Panel />
        </svg>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Six data and dashboard services, drawn inside the one thing they are all
 *  about.
 *
 *  WHY THE SHELL PERSISTS AND THE MODULES DO NOT. Five of these six are
 *  dashboards a person reads. They differ in what is on them, not in what they
 *  are, so swapping the whole picture for each — the way the LinkedIn formats
 *  drawing does, because those really are six unrelated objects — would say
 *  something untrue. One shell stays put and its modules are rebuilt: a
 *  platform split becomes a pipeline becomes a revenue view becomes a matched
 *  pair of columns. Watching the same frame re-lay itself is the section's
 *  argument, which is that these are views of one reporting system.
 *
 *  THE SIXTH IS NOT A VIEW AND IS NOT DRAWN AS ONE. "Data Integration and
 *  Preparation" happens, in the document's own words, "before it reaches the
 *  dashboard". So its mark does not sit on the tab strip with the other five.
 *  It sits under the shell, and selecting it lifts the shell off the page to
 *  show the plumbing that was underneath it the whole time. That lift is the
 *  memorable moment of the section and it is entirely the document's point.
 *
 *  NOT A VALUE ANYWHERE. The page's own header commits to shapes and never
 *  quantities: bars without scales, tiles without numbers. The document names
 *  metrics and those names are used as labels beside the drawing, in HTML where
 *  they stay type; nothing inside the viewBox is a word or a figure. */

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const VB_W = 460;
const VB_H = 300;

/* ------------------------------------------------------------- modules --- */

/** 01 — campaign data from several platforms, in one view: a pair of bars per
 *  platform, and the period the view is set to. */
function Marketing() {
  const cols = [
    [92, 58], [64, 78], [118, 44], [76, 96], [102, 62],
  ];
  return (
    <g>
      {/* the period the view is reporting on */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={28 + i * 46}
          y={74}
          width={38}
          height={12}
          rx={6}
          {...S}
          strokeWidth={1.1}
          fill={i === 2 ? "color-mix(in srgb, var(--color-brand) 16%, transparent)" : "none"}
          className={i === 2 ? "text-brand" : "text-line"}
        />
      ))}
      <path d="M20 100h420" {...S} strokeWidth={1} className="text-line" />

      {cols.map(([a, b], i) => (
        <g key={i}>
          <rect x={40 + i * 82} y={250 - a} width={22} height={a} rx={3} fill="currentColor" className="text-brand" opacity={0.6} />
          <rect x={66 + i * 82} y={250 - b} width={22} height={b} rx={3} fill="currentColor" className="text-fog" opacity={0.35} />
          <path d={`M${34 + i * 82} 250h60`} {...S} strokeWidth={1} className="text-line" />
        </g>
      ))}
    </g>
  );
}

/** 02 — enquiries joined to what the sales team did with them: the pipeline on
 *  one side, how quickly each was answered on the other. */
function Sales() {
  const stages = [190, 156, 122, 88, 54];
  return (
    <g>
      {stages.map((w, i) => (
        <path
          key={i}
          d={`M${30 + (190 - w) / 2} ${80 + i * 34}h${w}l-14 26h${w - 28}z`}
          fill="currentColor"
          className={i === stages.length - 1 ? "text-brand" : "text-fog"}
          opacity={i === stages.length - 1 ? 0.6 : 0.18 + i * 0.06}
        />
      ))}
      <path d="M254 74v178" {...S} strokeWidth={1} className="text-line" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={274} y={86 + i * 42} width={148} height={7} rx={3.5} fill="currentColor" className="text-line" />
          <rect
            x={274}
            y={86 + i * 42}
            width={[112, 54, 138, 78][i]}
            height={7}
            rx={3.5}
            fill="currentColor"
            className={i === 1 ? "text-brand" : "text-fog"}
            opacity={i === 1 ? 0.9 : 0.45}
          />
          <circle cx={274 + [112, 54, 138, 78][i]} cy={89.5 + i * 42} r={4} fill="currentColor" className={i === 1 ? "text-brand" : "text-ash"} />
          <rect x={274} y={104 + i * 42} width={[70, 96, 52, 84][i]} height={5} rx={2.5} fill="currentColor" className="text-fog" opacity={0.22} />
        </g>
      ))}
    </g>
  );
}

/** 03 — advertising, website, order and revenue data on one axis: revenue by
 *  channel, and the products underneath it. */
function Ecommerce() {
  const bars = [
    [46, 30, 22], [62, 24, 38], [34, 48, 18], [58, 36, 30],
  ];
  return (
    <g>
      <path d="M28 210h404" {...S} strokeWidth={1} className="text-line" />
      {bars.map((segs, i) => {
        let y = 210;
        return (
          <g key={i}>
            {segs.map((h, k) => {
              y -= h;
              return (
                <rect
                  key={k}
                  x={44 + i * 98}
                  y={y}
                  width={56}
                  height={h - 2}
                  rx={2}
                  fill="currentColor"
                  className={k === 0 ? "text-brand" : "text-fog"}
                  opacity={k === 0 ? 0.65 : 0.4 - k * 0.12}
                />
              );
            })}
          </g>
        );
      })}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={28} y={228 + i * 16} width={[196, 152, 174][i]} height={6} rx={3} fill="currentColor" className="text-fog" opacity={0.3} />
          <rect x={340} y={228 + i * 16} width={[52, 74, 40][i]} height={6} rx={3} fill="currentColor" className="text-brand" opacity={0.5} />
        </g>
      ))}
    </g>
  );
}

/** 04 — marketing activity on one side, what the business actually recorded on
 *  the other, and the joins between them. Some joins are dashed, because the
 *  document is explicit that the method and window are agreed rather than
 *  assumed and that some of it will not resolve. */
function Attribution() {
  const acts = [86, 118, 150, 182, 214];
  const outs = [104, 160, 216];
  const joins: [number, number, boolean][] = [
    [0, 0, true], [1, 0, true], [2, 1, false], [3, 1, true], [4, 2, false],
  ];
  return (
    <g>
      {/* the window both sides are read over */}
      <path d="M40 74h380M40 74v10M420 74v10" {...S} strokeWidth={1.2} className="text-brand" />

      <path d="M74 92v136" {...S} strokeWidth={1} className="text-line" />
      {acts.map((y, i) => (
        <rect key={i} x={44} y={y - 8} width={30} height={16} rx={3} fill="currentColor" className="text-fog" opacity={0.4 + (i % 2) * 0.15} />
      ))}
      {outs.map((y, i) => (
        <rect key={i} x={330} y={y - 20} width={92} height={40} rx={4} {...S} strokeWidth={1.3} className="text-brand" fill="color-mix(in srgb, var(--color-brand) 8%, transparent)" />
      ))}
      {joins.map(([a, o, solid], i) => (
        <path
          key={i}
          d={`M78 ${acts[a]} C 170 ${acts[a]}, 240 ${outs[o]}, 328 ${outs[o]}`}
          {...S}
          strokeWidth={solid ? 1.3 : 1}
          strokeDasharray={solid ? undefined : "4 4"}
          className={solid ? "text-brand" : "text-ash"}
          opacity={solid ? 0.8 : 0.55}
        />
      ))}
    </g>
  );
}

/** 05 — the same system, cut to a role, with what that role may not see kept
 *  back rather than merely absent. */
function Management({ roles }: { roles: string[] }) {
  const n = Math.min(roles.length, 4);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <rect
          key={i}
          x={28 + i * 104}
          y={72}
          width={90}
          height={16}
          rx={8}
          {...S}
          strokeWidth={1.1}
          fill={i === 0 ? "color-mix(in srgb, var(--color-brand) 16%, transparent)" : "none"}
          className={i === 0 ? "text-brand" : "text-line"}
        />
      ))}
      <path d="M20 100h420" {...S} strokeWidth={1} className="text-line" />

      {[0, 1, 2, 3].map((i) => {
        const locked = i === 2 || i === 3;
        const x = 30 + (i % 2) * 208;
        const y = 116 + Math.floor(i / 2) * 78;
        return (
          <g key={i}>
            <rect x={x} y={y} width={192} height={64} rx={5} {...S} strokeWidth={1.2} className={locked ? "text-line" : "text-brand"} />
            {locked ? (
              <>
                {Array.from({ length: 8 }, (_, k) => (
                  <path key={k} d={`M${x + 8 + k * 24} ${y + 58}l22 -50`} {...S} strokeWidth={1} className="text-ash" opacity={0.35} />
                ))}
                <rect x={x + 82} y={y + 26} width={26} height={18} rx={3} fill="var(--color-ink-3)" stroke="var(--color-ash)" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
                <path d={`M${x + 89} ${y + 26}v-6a6 6 0 0 1 12 0v6`} {...S} strokeWidth={1.2} className="text-ash" />
              </>
            ) : (
              <>
                {[0, 1, 2].map((r) => (
                  <rect key={r} x={x + 14} y={y + 16 + r * 15} width={[150, 108, 132][r]} height={6} rx={3} fill="currentColor" className="text-brand" opacity={0.45} />
                ))}
              </>
            )}
          </g>
        );
      })}
    </g>
  );
}

/** 06 — what is underneath. Not a view: sources arriving, four things done to
 *  them, and one prepared stream going up into everything above. */
function Preparation() {
  return (
    <g>
      {/* six sources arriving */}
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x={20} y={92 + i * 26} width={34} height={16} rx={3} {...S} strokeWidth={1.1} className="text-line" />
          <path
            d={`M56 ${100 + i * 26} C 100 ${100 + i * 26}, 110 172, 150 172`}
            {...S}
            strokeWidth={1}
            className="text-line"
          />
          <path
            d={`M56 ${100 + i * 26} C 100 ${100 + i * 26}, 110 172, 150 172`}
            fill="none"
            pathLength={100}
            stroke="var(--color-brand)"
            strokeWidth={1.6}
            strokeLinecap="round"
            className="ci-flow"
            style={{ animationDelay: `${i * 320}ms` }}
          />
        </g>
      ))}

      {/* the four things done to them */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={150 + i * 62} y={148} width={48} height={48} rx={5} {...S} strokeWidth={1.3} className="text-brand" fill="color-mix(in srgb, var(--color-brand) 7%, transparent)" />
          {i === 0 && <path d="M162 172h24M174 160v24" {...S} strokeWidth={1.3} className="text-brand" />}
          {i === 1 && <path d="M226 162h20M226 172h20M228 184l16-16" {...S} strokeWidth={1.3} className="text-brand" />}
          {i === 2 && <path d="M286 164h22M286 172h14M286 180h18" {...S} strokeWidth={1.3} className="text-brand" />}
          {i === 3 && <path d="M348 164h20M348 172h20M348 180h20M344 158v28" {...S} strokeWidth={1.3} className="text-brand" />}
        </g>
      ))}

      {/* one prepared stream, going up */}
      <path d="M398 172h30" {...S} strokeWidth={1.4} className="text-brand" />
      <path d="M428 172v-58" {...S} strokeWidth={1.4} className="text-brand" />
      <path d="M424 120l4-6 4 6" {...S} strokeWidth={1.4} className="text-brand" />
      <path d="M20 226h420" {...S} strokeWidth={1} strokeDasharray="4 4" className="text-line" />
    </g>
  );
}

/* --------------------------------------------------------------- shell --- */

function Shell({ lifted, children }: { lifted: boolean; children: React.ReactNode }) {
  return (
    <g>
      <g
        className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: lifted ? "translateY(-14px)" : "none", transformBox: "view-box" }}
        opacity={lifted ? 0.22 : 1}
      >
        <rect
          x={10}
          y={14}
          width={440}
          height={272}
          rx={9}
          fill="var(--color-ink-3)"
          stroke="var(--color-line)"
          strokeWidth={1.3}
          vectorEffect="non-scaling-stroke"
        />
        <path d="M10 56h440" {...S} strokeWidth={1} className="text-line" />
        {[24, 38, 52].map((cx) => (
          <circle key={cx} cx={cx} cy={35} r={3.4} fill="currentColor" className="text-line" />
        ))}
        <rect x={74} y={31} width={92} height={8} rx={4} fill="currentColor" className="text-fog" opacity={0.35} />
        <rect x={382} y={29} width={54} height={12} rx={6} {...S} strokeWidth={1.1} className="text-line" />
      </g>
      <g className="transition-opacity duration-500" opacity={lifted ? 0 : 1}>
        {children}
      </g>
    </g>
  );
}

export function DashboardViews({
  active,
  pin,
  count,
  roles,
  beforeLabel,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
  /** The four department views the management dashboard switches between. */
  roles: string[];
  /** The document's own phrase for where preparation happens. */
  beforeLabel: string;
}) {
  const lifted = active === count - 1;

  const body = () => {
    switch (active) {
      case 0:
        return <Marketing />;
      case 1:
        return <Sales />;
      case 2:
        return <Ecommerce />;
      case 3:
        return <Attribution />;
      case 4:
        return <Management roles={roles} />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-7">
      {/* Five views of one system: the marks are the system's own tabs. */}
      <div className="mb-5 flex items-center gap-2.5">
        {Array.from({ length: count - 1 }).map((_, i) => (
          <span key={i}>{pin(i)}</span>
        ))}
        <span aria-hidden className="ml-1 h-px flex-1 bg-line" />
      </div>

      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden className="block w-full">
        <Shell lifted={lifted}>{body()}</Shell>
        {/* What is underneath, revealed only when the shell lifts. */}
        <g className="transition-opacity duration-500" opacity={lifted ? 1 : 0}>
          {lifted && <Preparation />}
        </g>
      </svg>

      {/* The sixth mark is not on the tab strip, because the sixth service is
          not a view. It sits under the shell, where the work it names happens. */}
      <div className="mt-5 flex items-center gap-3">
        <span aria-hidden className={cn("h-px w-8 transition-colors duration-300", lifted ? "bg-brand" : "bg-line")} />
        {pin(count - 1)}
        <span
          className={cn(
            "font-display text-[0.625rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300",
            lifted ? "text-brand-text" : "text-ash",
          )}
        >
          {beforeLabel}
        </span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      {/* The four department views, named where they stay type. */}
      <ul
        aria-hidden
        className={cn(
          "mt-4 flex flex-wrap gap-x-4 gap-y-1.5 transition-opacity duration-300",
          active === 4 ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {roles.map((role, i) => (
          <li
            key={role}
            className={cn(
              "font-display text-[0.625rem] font-bold uppercase tracking-[0.14em]",
              i === 0 ? "text-brand-text" : "text-ash",
            )}
          >
            {role}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { cn } from "@/lib/cn";

/** The marks beside this page's section headings.
 *
 *  Replaces the generic growth/network/progression/contrast/ecosystem set, which
 *  was drawn for the Performance Marketing page and said nothing about Meta.
 *  Each variant here draws the argument its own section makes:
 *
 *  - `demand`   creates demand versus captures it: one dot pushing outward at
 *               people not looking yet, one pulling inward from people already
 *               searching. That is the comparison table's whole thesis.
 *  - `formats`  the placement shapes creative is produced in — 1:1, 4:5, 9:16 —
 *               cycling, because creative volume is the performance lever.
 *  - `learning` the learning phase: readings that swing early and settle late,
 *               which is what "early figures will look unstable, because they
 *               are" describes.
 *  - `reach`    audiences by who people are, not what they typed: scattered
 *               segments, a few of them lit.
 *
 *  Decorative, so aria-hidden and desktop-only — the label is there for the
 *  reader of the code, not the page. */

export type MetaMarkVariant = "demand" | "formats" | "learning" | "reach";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const delay = (i: number, step = 0.22) => ({ animationDelay: `${i * step}s` });

function Demand() {
  return (
    <g className="text-fog">
      {/* Creates demand: pushes outward. */}
      <circle cx="34" cy="34" r="4" {...S} className="text-brand" />
      {[0, 90, 180, 270].map((a, i) => (
        <path
          key={a}
          d="M34 26V16"
          {...S}
          className="glyph-pulse text-brand"
          style={{ transformOrigin: "34px 34px", transform: `rotate(${a}deg)`, ...delay(i, 0.12) }}
        />
      ))}
      {/* Captures demand: converges inward. */}
      <circle cx="86" cy="34" r="4" {...S} />
      {[0, 90, 180, 270].map((a, i) => (
        <path
          key={a}
          d="M86 14v10"
          {...S}
          className="glyph-rise"
          style={{ transformOrigin: "86px 34px", transform: `rotate(${a}deg)`, ...delay(i, 0.12) }}
        />
      ))}
    </g>
  );
}

function Formats() {
  const frames = [
    { x: 8, y: 14, w: 26, h: 32 },   // 4:5
    { x: 42, y: 18, w: 26, h: 26 },  // 1:1
    { x: 76, y: 8, w: 22, h: 44 },   // 9:16
  ];
  return (
    <g className="text-fog">
      {frames.map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h} rx="3" {...S} />
          <rect
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            rx="3"
            {...S}
            className="glyph-pulse text-brand"
            style={delay(i, 0.9)}
          />
        </g>
      ))}
    </g>
  );
}

function Learning() {
  // Swing decays to nothing across the run: unstable early, settled late.
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const noise = Math.sin(i * 2.7) * Math.cos(i * 1.3);
    pts.push(`${(8 + t * 96).toFixed(1)},${(34 + noise * (1 - t) ** 2 * 18).toFixed(1)}`);
  }
  return (
    <g>
      <path d="M8 52h96" {...S} className="text-line" />
      <polyline points={pts.join(" ")} {...S} className="text-brand" />
      <circle cx="104" cy="34" r="3" {...S} className="glyph-pulse text-brand" />
    </g>
  );
}

function Reach() {
  const dots = [
    [14, 20], [30, 12], [46, 24], [62, 14], [78, 26], [94, 18],
    [22, 42], [38, 50], [54, 40], [70, 52], [86, 44], [102, 36],
  ] as const;
  return (
    <g className="text-fog">
      {dots.map(([cx, cy], i) => {
        const lit = i % 5 === 2;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={lit ? 3 : 2}
            {...S}
            className={cn(lit ? "glyph-pulse text-brand" : undefined)}
            style={lit ? delay(i, 0.3) : undefined}
          />
        );
      })}
    </g>
  );
}

const SHAPES: Record<MetaMarkVariant, () => React.JSX.Element> = {
  demand: Demand,
  formats: Formats,
  learning: Learning,
  reach: Reach,
};

export function MetaMark({
  variant,
  className,
}: {
  variant: MetaMarkVariant;
  className?: string;
}) {
  const Shape = SHAPES[variant];
  return (
    <svg
      viewBox="0 0 112 64"
      aria-hidden
      className={cn("hidden h-16 w-[14rem] shrink-0 lg:block", className)}
    >
      <Shape />
    </svg>
  );
}

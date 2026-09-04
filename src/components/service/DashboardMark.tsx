import { cn } from "@/lib/cn";

/** The marks beside the Data and Dashboards page's section headings. Same
 *  frame and stroke as the other page mark sets, each drawing its section:
 *
 *  - `gallery`  three small views, each a different shape of chart
 *  - `anatomy`  one view with numbered callouts on it
 *  - `ledger`   two columns under one bracket
 *  - `scale`    a track with a marker on it
 *  - `stack`    layers assembling upward
 *
 *  Decorative, so aria-hidden and desktop-only. */

export type DashboardMarkVariant = "gallery" | "anatomy" | "ledger" | "scale" | "stack";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const delay = (i: number, step = 0.22) => ({ animationDelay: `${i * step}s` });

function Gallery() {
  return (
    <g className="text-fog">
      <rect x="8" y="14" width="28" height="36" rx="3" {...S} />
      {[14, 20, 26].map((x, i) => <rect key={x} x={x} y={40 - [10, 18, 14][i]} width="4" height={[10, 18, 14][i]} fill="currentColor" className="glyph-rise" style={delay(i, 0.15)} />)}
      <rect x="42" y="14" width="28" height="36" rx="3" {...S} />
      <path d="M46 42c6-4 8-12 20-16" {...S} className="text-brand" />
      <rect x="76" y="14" width="28" height="36" rx="3" {...S} />
      {[22, 30, 38].map((y, i) => <rect key={y} x="81" y={y} width={[18, 12, 15][i]} height="3" rx="1.5" fill="currentColor" opacity="0.6" />)}
    </g>
  );
}

function Anatomy() {
  return (
    <g className="text-fog">
      <rect x="20" y="12" width="72" height="40" rx="3" {...S} />
      <path d="M20 22h72" {...S} />
      {[[12, 22], [100, 22], [56, 58]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" {...S} className="glyph-pulse text-brand" style={delay(i, 0.4)} />
      ))}
    </g>
  );
}

function Ledger() {
  return (
    <g className="text-fog">
      <rect x="10" y="10" width="40" height="34" rx="3" {...S} />
      <rect x="62" y="10" width="40" height="34" rx="3" {...S} className="text-brand" />
      {[20, 28, 36].map((y) => <path key={y} d={`M16 ${y}h28M68 ${y}h28`} {...S} opacity="0.5" />)}
      <path d="M10 50v6h92v-6" {...S} className="glyph-rise text-brand" />
    </g>
  );
}

function Scale() {
  return (
    <g className="text-fog">
      <path d="M8 32h96" {...S} className="text-line" />
      <path d="M8 26v12M104 26v12" {...S} className="text-brand" />
      <circle cx="40" cy="32" r="5" {...S} className="glyph-pulse text-brand" />
    </g>
  );
}

function Stack() {
  return (
    <g className="text-fog">
      {[48, 38, 28, 18].map((y, i) => (
        <rect key={y} x={16 + i * 4} y={y} width={80 - i * 8} height="7" rx="2" {...S} className={i === 3 ? "text-brand glyph-rise" : undefined} style={delay(i, 0.12)} />
      ))}
    </g>
  );
}

const SHAPES: Record<DashboardMarkVariant, () => React.JSX.Element> = { gallery: Gallery, anatomy: Anatomy, ledger: Ledger, scale: Scale, stack: Stack };

export function DashboardMark({ variant, className }: { variant: DashboardMarkVariant; className?: string }) {
  const Shape = SHAPES[variant];
  return (
    <svg viewBox="0 0 112 64" aria-hidden className={cn("hidden h-16 w-[14rem] shrink-0 lg:block", className)}>
      <Shape />
    </svg>
  );
}

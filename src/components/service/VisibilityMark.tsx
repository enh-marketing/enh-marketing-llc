import { cn } from "@/lib/cn";

/** The marks beside the AI Search Visibility page's section headings. Same
 *  frame and stroke as MetaMark and CampaignMark, each drawing its section:
 *
 *  - `bookends`  two readings either side of the work between them
 *  - `fork`      one path, two outcomes
 *  - `loop`      a descent that returns to its start
 *  - `months`    twelve ticks, one lit
 *
 *  Decorative, so aria-hidden and desktop-only. */

export type VisibilityMarkVariant = "bookends" | "fork" | "loop" | "months";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const delay = (i: number, step = 0.22) => ({ animationDelay: `${i * step}s` });

function Bookends() {
  return (
    <g className="text-fog">
      <rect x="8" y="16" width="18" height="32" rx="3" {...S} className="text-brand" />
      <rect x="86" y="16" width="18" height="32" rx="3" {...S} className="text-brand" />
      {[34, 46, 58, 70].map((x, i) => (
        <rect key={x} x={x} y="26" width="8" height="12" rx="2" {...S} className="glyph-rise" style={delay(i, 0.15)} />
      ))}
      <circle cx="17" cy="32" r="2.5" fill="currentColor" className="glyph-pulse text-brand" />
      <circle cx="95" cy="32" r="2.5" fill="currentColor" className="glyph-pulse text-brand" style={delay(1, 0.6)} />
    </g>
  );
}

function Fork() {
  return (
    <g className="text-fog">
      <path d="M8 32h40" {...S} />
      <path d="M48 32c14 0 14-16 28-16h28" {...S} className="text-brand" />
      <path d="M48 32c14 0 14 16 28 16h28" {...S} strokeDasharray="3 3" />
      <circle cx="48" cy="32" r="3.5" {...S} className="glyph-pulse text-brand" />
    </g>
  );
}

function Loop() {
  return (
    <g className="text-fog">
      <path d="M40 8v48" {...S} />
      {[8, 20, 32, 44, 56].map((y, i) => (
        <circle key={y} cx="40" cy={y} r="2.6" fill="currentColor" style={delay(i, 0.12)} className="glyph-rise" />
      ))}
      <path d="M40 56c0 6-4 8-10 8s-10-2-10-8V8c0-6 4-8 10-8s10 2 10 8" {...S} className="text-brand" strokeDasharray="3 3" />
      <path d="M22 14l-4-6-4 6" {...S} className="text-brand" />
    </g>
  );
}

function Months() {
  return (
    <g className="text-fog">
      <path d="M8 32h96" {...S} className="text-line" />
      {Array.from({ length: 12 }, (_, i) => 8 + i * 8.7).map((x, i) => (
        <circle key={i} cx={x} cy="32" r={i === 3 ? 4 : 2.2} {...S} className={i === 3 ? "glyph-pulse text-brand" : undefined} />
      ))}
    </g>
  );
}

const SHAPES: Record<VisibilityMarkVariant, () => React.JSX.Element> = {
  bookends: Bookends,
  fork: Fork,
  loop: Loop,
  months: Months,
};

export function VisibilityMark({ variant, className }: { variant: VisibilityMarkVariant; className?: string }) {
  const Shape = SHAPES[variant];
  return (
    <svg viewBox="0 0 112 64" aria-hidden className={cn("hidden h-16 w-[14rem] shrink-0 lg:block", className)}>
      <Shape />
    </svg>
  );
}

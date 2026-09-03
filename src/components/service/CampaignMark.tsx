import { cn } from "@/lib/cn";

/** The marks beside this page's section headings. Same frame and stroke as
 *  MetaMark, each drawing the argument its section makes:
 *
 *  - `phases`    one campaign in three phases with a start line: where each
 *                covered item acts.
 *  - `range`     a forecast band that narrows: the more inputs confirmed, the
 *                tighter the range.
 *  - `startline` six stops on a track and the line the campaign goes live at.
 *  - `twosided`  the plan on one side, the check on the other.
 *
 *  Decorative, so aria-hidden and desktop-only. */

export type CampaignMarkVariant = "phases" | "range" | "startline" | "twosided";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const delay = (i: number, step = 0.22) => ({ animationDelay: `${i * step}s` });

function Phases() {
  return (
    <g className="text-fog">
      <rect x="8" y="20" width="44" height="24" rx="4" {...S} />
      <rect x="58" y="20" width="22" height="24" rx="4" {...S} />
      <rect x="86" y="20" width="18" height="24" rx="4" {...S} />
      <path d="M8 32h96" {...S} className="text-line" />
      <path d="M55 12v40" {...S} className="text-brand" />
      {[30, 69, 95].map((cx, i) => (
        <circle key={cx} cx={cx} cy="32" r="3" {...S} className="glyph-pulse text-brand" style={delay(i, 0.5)} />
      ))}
    </g>
  );
}

function Range() {
  return (
    <g className="text-fog">
      <path d="M8 52h96" {...S} className="text-line" />
      <path d="M8 40c24-6 48-18 96-26" {...S} strokeDasharray="3 3" />
      <path d="M8 48c24-6 48-18 96-26" {...S} strokeDasharray="3 3" />
      <path d="M8 44c24-6 48-18 96-26" {...S} className="text-brand" />
      <path d="M100 10v10M100 15h6" {...S} className="glyph-rise text-brand" />
      <path d="M100 26v10M100 31h6" {...S} className="glyph-rise text-brand" style={delay(1, 0.6)} />
    </g>
  );
}

function StartLine() {
  return (
    <g className="text-fog">
      <path d="M8 34h96" {...S} className="text-line" />
      {[12, 28, 44, 60].map((cx, i) => (
        <circle key={cx} cx={cx} cy="34" r="3" {...S} style={delay(i, 0.15)} />
      ))}
      <path d="M70 18v32" {...S} className="text-brand" />
      <circle cx="80" cy="34" r="3.5" {...S} className="glyph-pulse text-brand" />
      <circle cx="98" cy="34" r="3" {...S} />
      <path d="M104 34h4" {...S} strokeDasharray="2 3" />
    </g>
  );
}

function TwoSided() {
  return (
    <g className="text-fog">
      <rect x="8" y="14" width="42" height="36" rx="4" {...S} className="text-brand" />
      <rect x="62" y="14" width="42" height="36" rx="4" {...S} />
      <path d="M56 8v48" {...S} className="glyph-rise text-brand" />
      <path d="M16 26h26M16 34h20M16 42h24" {...S} className="text-brand" opacity="0.6" />
      <path d="M70 26h26M70 34h18M70 42h22" {...S} opacity="0.6" />
    </g>
  );
}

const SHAPES: Record<CampaignMarkVariant, () => React.JSX.Element> = {
  phases: Phases,
  range: Range,
  startline: StartLine,
  twosided: TwoSided,
};

export function CampaignMark({
  variant,
  className,
}: {
  variant: CampaignMarkVariant;
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

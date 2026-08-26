import { cn } from "@/lib/cn";

/** One animated mark per capability, replacing the numerals on the cards.
 *
 *  Seven glyphs in a single language: 48-unit box, stroked in currentColor at a
 *  constant weight, no fills, so they read as a set rather than seven unrelated
 *  drawings. Each one animates on the part that carries its meaning — the bars
 *  rise, the audience rings pulse outward, the reply dots type — using the
 *  glyph-* keyframes already in globals.css, which are switched off under
 *  prefers-reduced-motion in one place.
 *
 *  Deliberately abstract rather than brand marks, including the conversation
 *  glyph: a WhatsApp logo beside six line drawings would break the set. */

export type GlyphVariant =
  | "structure"
  | "creative"
  | "audience"
  | "tracking"
  | "conversation"
  | "catalogue"
  | "reporting";

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Staggered delay for repeated parts. */
const d = (i: number, step = 0.18) => ({ animationDelay: `${i * step}s` });

function Structure() {
  return (
    <>
      <rect x="19" y="6" width="10" height="8" rx="2" {...S} />
      <rect x="6" y="34" width="10" height="8" rx="2" {...S} />
      <rect x="19" y="34" width="10" height="8" rx="2" {...S} />
      <rect x="32" y="34" width="10" height="8" rx="2" {...S} />
      <path d="M24 14v10M11 34v-5h26v5M24 24v5" {...S} />
      <circle cx="24" cy="24" r="2.5" {...S} className="glyph-pulse" />
    </>
  );
}

function Creative() {
  return (
    <>
      <rect x="7" y="12" width="20" height="26" rx="3" {...S} opacity="0.5" />
      <rect x="21" y="8" width="20" height="26" rx="3" {...S} className="glyph-rise" />
      <path d="M26 21h10M26 27h6" {...S} className="glyph-rise" style={d(1)} />
    </>
  );
}

function Audience() {
  return (
    <>
      <circle cx="24" cy="24" r="4" {...S} />
      <circle cx="24" cy="24" r="11" {...S} className="glyph-pulse" />
      <circle cx="24" cy="24" r="18" {...S} className="glyph-pulse" style={d(1, 0.4)} />
      <circle cx="24" cy="6" r="2" {...S} />
      <circle cx="42" cy="24" r="2" {...S} />
      <circle cx="24" cy="42" r="2" {...S} />
      <circle cx="6" cy="24" r="2" {...S} />
    </>
  );
}

function Tracking() {
  return (
    <>
      <path d="M7 41V7" {...S} opacity="0.45" />
      <path d="M7 41h34" {...S} opacity="0.45" />
      <path d="M11 34l8-8 6 5 10-14" {...S} className="animate-dash" />
      <circle cx="35" cy="17" r="3" {...S} className="glyph-pulse" />
    </>
  );
}

function Conversation() {
  return (
    <>
      <path d="M8 12a3 3 0 013-3h26a3 3 0 013 3v16a3 3 0 01-3 3H20l-8 8v-8h-1a3 3 0 01-3-3V12z" {...S} />
      <circle cx="18" cy="20" r="1.9" {...S} className="glyph-pulse" />
      <circle cx="24" cy="20" r="1.9" {...S} className="glyph-pulse" style={d(1)} />
      <circle cx="30" cy="20" r="1.9" {...S} className="glyph-pulse" style={d(2)} />
    </>
  );
}

function Catalogue() {
  return (
    <>
      <rect x="7" y="7" width="15" height="15" rx="2.5" {...S} className="glyph-pulse" />
      <rect x="26" y="7" width="15" height="15" rx="2.5" {...S} className="glyph-pulse" style={d(1)} />
      <rect x="7" y="26" width="15" height="15" rx="2.5" {...S} className="glyph-pulse" style={d(2)} />
      <rect x="26" y="26" width="15" height="15" rx="2.5" {...S} className="glyph-pulse" style={d(3)} />
    </>
  );
}

function Reporting() {
  return (
    <>
      <path d="M7 41h34" {...S} opacity="0.45" />
      <path d="M13 41V27" {...S} className="glyph-rise" />
      <path d="M24 41V17" {...S} className="glyph-rise" style={d(1)} />
      <path d="M35 41V23" {...S} className="glyph-rise" style={d(2)} />
      <circle cx="24" cy="11" r="2.5" {...S} className="glyph-pulse" />
    </>
  );
}

const GLYPHS: Record<GlyphVariant, () => React.JSX.Element> = {
  structure: Structure,
  creative: Creative,
  audience: Audience,
  tracking: Tracking,
  conversation: Conversation,
  catalogue: Catalogue,
  reporting: Reporting,
};

export function CapabilityGlyph({
  variant,
  className,
}: {
  variant: GlyphVariant;
  className?: string;
}) {
  const Shape = GLYPHS[variant];
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden
      className={cn("h-full w-full", className)}
    >
      <Shape />
    </svg>
  );
}

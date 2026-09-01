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
  | "reporting"
  // AEO & GEO. Same 48x48 frame, same stroke weight and animation classes as
  // the set above, so the two pages share one icon language rather than each
  // shipping its own.
  | "answer"
  | "generate"
  | "crawler"
  | "index"
  | "text"
  | "fanout"
  | "offsite"
  | "entity"
  | "schema";

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


/* ---------------------------------------------------------------- AEO & GEO */

/** A question resolving into a cited answer. */
function Answer() {
  return (
    <>
      <path d="M9 12h30M9 20h20" {...S} opacity="0.45" />
      <rect x="7" y="28" width="34" height="14" rx="3" {...S} />
      <path d="M13 35h13" {...S} className="glyph-scan" />
      <circle cx="34" cy="35" r="3" {...S} className="glyph-pulse" />
    </>
  );
}

/** Composition: fragments assembling into one block. */
function Generate() {
  return (
    <>
      <rect x="6" y="8" width="12" height="9" rx="2" {...S} opacity="0.5" />
      <rect x="6" y="22" width="12" height="9" rx="2" {...S} opacity="0.5" style={d(1)} />
      <rect x="6" y="36" width="12" height="7" rx="2" {...S} opacity="0.5" style={d(2)} />
      <path d="M18 12h6l4 12M18 26h6M18 39h6l4-12" {...S} />
      <rect x="28" y="16" width="14" height="18" rx="3" {...S} className="glyph-pulse" />
    </>
  );
}

/** A crawler meeting a gate that is either open or shut. */
function Crawler() {
  return (
    <>
      <rect x="6" y="18" width="14" height="12" rx="3" {...S} />
      <circle cx="10.5" cy="24" r="1.5" {...S} />
      <circle cx="15.5" cy="24" r="1.5" {...S} />
      <path d="M13 18v-5" {...S} />
      <path d="M26 10v28" {...S} opacity="0.45" />
      <path d="M31 16h11M31 24h11M31 32h11" {...S} className="glyph-scan" />
    </>
  );
}

/** Two stacked indexes, one of them frequently forgotten. */
function IndexGlyph() {
  return (
    <>
      <ellipse cx="24" cy="12" rx="15" ry="5" {...S} />
      <path d="M9 12v11c0 2.8 6.7 5 15 5s15-2.2 15-5V12" {...S} />
      <path d="M9 23v11c0 2.8 6.7 5 15 5s15-2.2 15-5V23" {...S} className="glyph-pulse" />
    </>
  );
}

/** Text that can be read, against media that cannot. */
function TextGlyph() {
  return (
    <>
      <path d="M7 12h26M7 20h20M7 28h26M7 36h14" {...S} className="glyph-scan" />
      <rect x="30" y="26" width="12" height="12" rx="2.5" {...S} opacity="0.4" />
      <path d="M33 35l3-4 3 4" {...S} opacity="0.4" />
    </>
  );
}

/** One query, several neighbouring ones. */
function FanOut() {
  return (
    <>
      <circle cx="9" cy="24" r="4" {...S} />
      <path d="M13 24c8 0 6-12 14-12M13 24h14M13 24c8 0 6 12 14 12" {...S} opacity="0.55" />
      <circle cx="31" cy="12" r="3.5" {...S} className="glyph-pulse" />
      <circle cx="31" cy="24" r="3.5" {...S} className="glyph-pulse" style={d(1)} />
      <circle cx="31" cy="36" r="3.5" {...S} className="glyph-pulse" style={d(2)} />
      <path d="M38 12h4M38 24h4M38 36h4" {...S} opacity="0.4" />
    </>
  );
}

/** Mentions on surfaces that are not yours. */
function Offsite() {
  return (
    <>
      <rect x="6" y="14" width="16" height="20" rx="3" {...S} opacity="0.45" />
      <circle cx="34" cy="12" r="4" {...S} className="glyph-pulse" />
      <circle cx="40" cy="26" r="4" {...S} className="glyph-pulse" style={d(1)} />
      <circle cx="32" cy="38" r="4" {...S} className="glyph-pulse" style={d(2)} />
      <path d="M22 20l8-6M22 25h14M22 31l7 5" {...S} opacity="0.5" />
    </>
  );
}

/** The same business, described the same way everywhere. */
function Entity() {
  return (
    <>
      <circle cx="24" cy="24" r="6" {...S} className="glyph-pulse" />
      <circle cx="24" cy="24" r="15" {...S} opacity="0.35" />
      <path d="M24 9v6M24 33v6M9 24h6M33 24h6" {...S} opacity="0.55" />
      <circle cx="24" cy="6" r="2.5" {...S} />
      <circle cx="24" cy="42" r="2.5" {...S} />
      <circle cx="6" cy="24" r="2.5" {...S} />
      <circle cx="42" cy="24" r="2.5" {...S} />
    </>
  );
}

/** Markup that matches the page it describes. */
function Schema() {
  return (
    <>
      <path d="M16 10l-7 14 7 14M32 10l7 14-7 14" {...S} />
      <rect x="19" y="18" width="10" height="4" rx="1.5" {...S} className="glyph-scan" />
      <rect x="19" y="26" width="10" height="4" rx="1.5" {...S} className="glyph-scan" style={d(1)} />
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
  answer: Answer,
  generate: Generate,
  crawler: Crawler,
  index: IndexGlyph,
  text: TextGlyph,
  fanout: FanOut,
  offsite: Offsite,
  entity: Entity,
  schema: Schema,
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

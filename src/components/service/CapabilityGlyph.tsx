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
  | "schema"
  /* ---- automation. The AI & Automation page needs twenty distinct marks
     across its three sections, and the AEO set above is about crawlers,
     entities and offsite mentions: borrowing those would put an SEO icon on a
     document-processing card. Same 48-unit box, same stroke, same keyframes. */
  | "agent"
  | "workflow"
  | "extract"
  | "triage"
  | "watch"
  | "reconcile"
  | "tool"
  | "diagnose"
  | "recommend"
  | "testcase"
  | "golive"
  | "improve"
  | "heartbeat"
  | "alert"
  | "repair"
  | "reseat"
  | "support"
  | "ledger"
  /* ---- campaign intelligence. Forecasting is drawn as ranges and lines, never
     as figures: a band is a range, a tick is a benchmark, a fork is a scenario,
     two lines side by side are forecast against actual. */
  | "forecast"
  | "mix"
  | "benchmark"
  | "scenario"
  | "compare"
  | "goal"
  | "align"
  | "range"
  | "adjust"
  /* ---- B2B lead generation. Three marks the set had no equivalent for: a
     search with commercial intent behind it, a timed email sequence, and a
     form whose length is a qualification decision. Borrowing `crawler` for
     search or `conversation` for email would have put an SEO or a chat icon on
     a paid-media card. Same 48-unit box, same stroke, same keyframes. */
  | "intent"
  | "sequence"
  | "form"
  /* ---- AI Search Visibility. One mark the set lacked: a set of questions
     tested and recorded once, which is what a baseline is. */
  | "baseline"
  /* ---- AI Creative Production. An image: a frame with a horizon and a sun,
     the oldest shorthand there is, so it cannot be mistaken for a chart. */
  | "picture";

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

/* --------------------------------------------------------------- automation */

/** An agent: takes work in, checks it against rules, and hands the exception
 *  to a person. The whole argument of the page in one mark. */
function Agent() {
  return (
    <>
      <path d="M6 24h8" {...S} opacity="0.5" />
      <rect x="14" y="15" width="18" height="18" rx="4" {...S} />
      <path d="M19 24l3 3 6-7" {...S} className="glyph-scan" />
      <path d="M32 20h4M32 28h4" {...S} opacity="0.5" />
      <circle cx="40" cy="20" r="3" {...S} className="glyph-pulse" />
      <circle cx="40" cy="28" r="3" {...S} opacity="0.4" />
    </>
  );
}

/** Workflow: systems already in place, and data moving between them. */
function Workflow() {
  return (
    <>
      <rect x="5" y="18" width="11" height="12" rx="3" {...S} />
      <rect x="32" y="18" width="11" height="12" rx="3" {...S} />
      <rect x="18.5" y="6" width="11" height="11" rx="3" {...S} opacity="0.5" />
      <path d="M16 24h16M24 17v7" {...S} opacity="0.55" />
      <circle cx="24" cy="24" r="2.5" {...S} className="glyph-scan" />
    </>
  );
}

/** Document processing: fields lifted off a page and placed in order. */
function Extract() {
  return (
    <>
      <path d="M8 8h16l6 6v10" {...S} opacity="0.5" />
      <path d="M8 8v32h10" {...S} opacity="0.5" />
      <path d="M13 17h9M13 24h7" {...S} opacity="0.45" />
      <rect x="24" y="27" width="18" height="5" rx="2" {...S} className="glyph-rise" />
      <rect x="24" y="35" width="13" height="5" rx="2" {...S} className="glyph-rise" style={d(1)} />
    </>
  );
}

/** Enquiry handling: one inbound stream sorted into the right lanes. */
function Triage() {
  return (
    <>
      <path d="M6 24h8" {...S} opacity="0.5" />
      <path d="M14 24c8 0 5-12 13-12M14 24h13M14 24c8 0 5 12 13 12" {...S} opacity="0.55" />
      <rect x="30" y="8" width="12" height="8" rx="2.5" {...S} className="glyph-pulse" />
      <rect x="30" y="20" width="12" height="8" rx="2.5" {...S} className="glyph-pulse" style={d(1)} />
      <rect x="30" y="32" width="12" height="8" rx="2.5" {...S} className="glyph-pulse" style={d(2)} />
    </>
  );
}

/** Monitoring and automated actions: a watched threshold, and the one event
 *  that crosses it. */
function Watch() {
  return (
    <>
      <path d="M6 30h36" {...S} strokeDasharray="3 3" opacity="0.45" />
      <path d="M6 38h8l5 0 4-14 5 22 4-16h10" {...S} className="animate-dash" />
      <circle cx="28" cy="16" r="3.5" {...S} className="glyph-pulse" />
    </>
  );
}

/** Reporting and reconciliation: two sources compared, one difference flagged. */
function Reconcile() {
  return (
    <>
      <path d="M9 10h12M9 18h12M9 26h12M9 34h12" {...S} opacity="0.45" />
      <path d="M27 10h12M27 18h12M27 34h12" {...S} opacity="0.45" />
      <path d="M27 26h12" {...S} className="glyph-scan" />
      <circle cx="24" cy="26" r="3" {...S} className="glyph-pulse" />
    </>
  );
}

/** Custom tools: built only where nothing off the shelf fits the socket. */
function Tool() {
  return (
    <>
      <path d="M8 40l12-12" {...S} />
      <path d="M18 30l-4-4 8-8 4 4" {...S} opacity="0.55" />
      <path d="M26 22l6-6-4-4 6-4 6 6-4 6-4-4-6 6" {...S} className="glyph-pulse" />
    </>
  );
}

/** Process diagnostic: the current process, measured. */
function Diagnose() {
  return (
    <>
      <rect x="7" y="16" width="9" height="9" rx="2.5" {...S} opacity="0.6" />
      <rect x="20" y="16" width="9" height="9" rx="2.5" {...S} opacity="0.6" />
      <rect x="33" y="16" width="8" height="9" rx="2.5" {...S} opacity="0.6" />
      <path d="M16 20.5h4M29 20.5h4" {...S} opacity="0.45" />
      <path d="M7 33v6h34v-6" {...S} className="glyph-scan" />
      <path d="M24 33v6" {...S} opacity="0.4" />
    </>
  );
}

/** Scope and recommendation: what you receive in writing. */
function Recommend() {
  return (
    <>
      <path d="M11 7h18l7 7v27H11z" {...S} opacity="0.55" />
      <path d="M16 18h14M16 25h10" {...S} opacity="0.45" />
      <circle cx="30" cy="33" r="7" {...S} className="glyph-pulse" />
      <path d="M27 33l2.4 2.4L34 30" {...S} className="glyph-scan" />
    </>
  );
}

/** Development and testing: the agreed scenarios, and the exceptions. */
function TestCase() {
  return (
    <>
      <rect x="7" y="9" width="34" height="30" rx="3" {...S} opacity="0.5" />
      <path d="M13 18l2.6 2.6L20 16" {...S} className="glyph-scan" />
      <path d="M13 27l2.6 2.6L20 25" {...S} className="glyph-scan" style={d(1)} />
      <path d="M25 17h11M25 26h8" {...S} opacity="0.4" />
      <path d="M31 33l5 5M36 33l-5 5" {...S} className="glyph-pulse" style={d(2)} />
    </>
  );
}

/** Controlled launch: opened in stages, not all at once. */
function GoLive() {
  return (
    <>
      <path d="M6 24h11" {...S} opacity="0.5" />
      <path d="M31 24h11" {...S} opacity="0.5" />
      <path d="M17 14v20" {...S} />
      <path d="M31 14v20" {...S} opacity="0.4" strokeDasharray="3 3" />
      <path d="M17 24h9" {...S} className="glyph-scan" />
      <circle cx="24" cy="9" r="3" {...S} className="glyph-pulse" />
    </>
  );
}

/** Monitoring and improvement: the same round, a little higher each time. */
function Improve() {
  return (
    <>
      <path d="M13 34a13 13 0 1 1 22-9" {...S} opacity="0.5" />
      <path d="M31 25h5v-5" {...S} opacity="0.5" />
      <path d="M11 40h6V31" {...S} className="glyph-rise" />
      <path d="M21 40h6V25" {...S} className="glyph-rise" style={d(1)} />
      <path d="M31 40h6V19" {...S} className="glyph-rise" style={d(2)} />
    </>
  );
}

/** Monitoring the connections: a pulse running the whole chain. */
function Heartbeat() {
  return (
    <>
      <circle cx="7" cy="24" r="3" {...S} opacity="0.55" />
      <circle cx="41" cy="24" r="3" {...S} opacity="0.55" />
      <path d="M10 24h4l3-7 4 14 4-11 3 4h9" {...S} className="animate-dash" />
      <circle cx="24" cy="24" r="2" {...S} className="glyph-pulse" />
    </>
  );
}

/** Reviewing errors: the one action in the run that failed. */
function Alert() {
  return (
    <>
      <path d="M8 13h13M8 21h10M8 35h13" {...S} opacity="0.4" />
      <path d="M24 20l9 15H15z" {...S} className="glyph-pulse" />
      <path d="M24 26v4" {...S} />
      <circle cx="24" cy="32.5" r="0.9" {...S} />
    </>
  );
}

/** Fixing within scope: a broken link rejoined. */
function Repair() {
  return (
    <>
      <path d="M18 16l-6 6a7 7 0 0010 10l3-3" {...S} />
      <path d="M30 32l6-6a7 7 0 00-10-10l-3 3" {...S} />
      <path d="M22 26l4-4" {...S} className="glyph-pulse" />
      <path d="M8 10l4 4M40 38l-4-4" {...S} opacity="0.4" />
    </>
  );
}

/** Adjusting integrations: two connectors re-seated after one end changed. */
function Reseat() {
  return (
    <>
      <path d="M6 24h10" {...S} opacity="0.5" />
      <path d="M32 24h10" {...S} opacity="0.5" />
      <path d="M16 17v14h4v-14z" {...S} />
      <path d="M32 17v14h-4v-14z" {...S} className="glyph-pulse" />
      <path d="M20 21h8M20 27h8" {...S} className="glyph-scan" />
    </>
  );
}

/** Technical support: a hand on the automation when it needs one. */
function Support() {
  return (
    <>
      <circle cx="24" cy="20" r="8" {...S} opacity="0.55" />
      <path d="M24 12v8l5 3" {...S} className="glyph-scan" />
      <path d="M10 40c0-6 6-9 14-9s14 3 14 9" {...S} className="glyph-rise" />
    </>
  );
}

/** Maintaining records: every change kept, newest on top. */
function Ledger() {
  return (
    <>
      <rect x="8" y="30" width="32" height="8" rx="2.5" {...S} opacity="0.4" />
      <rect x="8" y="20" width="32" height="8" rx="2.5" {...S} opacity="0.6" />
      <rect x="8" y="10" width="32" height="8" rx="2.5" {...S} className="glyph-rise" />
      <path d="M13 14h6" {...S} className="glyph-rise" style={d(1)} />
      <circle cx="35" cy="14" r="1.6" {...S} className="glyph-pulse" />
    </>
  );
}

/** Google Ads: a query already typed, and the lens over the term that carries
 *  commercial intent. The document's point is that the demand exists and the
 *  campaign meets it, so the search sits above the result rather than beside. */
function Intent() {
  return (
    <>
      <path d="M6 12h20M6 19h13" {...S} opacity="0.45" />
      <circle cx="27" cy="28" r="10" {...S} />
      <path d="M34.5 35.5 42 43" {...S} className="glyph-pulse" />
      <path d="M22 28h10" {...S} opacity="0.75" className="glyph-pulse" style={d(1)} />
    </>
  );
}

/** Email nurturing: three sends down a timeline, spaced rather than stacked,
 *  because the document plans "the sequence, timing and next action" before the
 *  journey begins. */
function Sequence() {
  return (
    <>
      <path d="M9 8v32" {...S} opacity="0.4" />
      <rect x="16" y="7" width="20" height="9" rx="2" {...S} className="glyph-rise" />
      <rect x="16" y="19" width="24" height="9" rx="2" {...S} className="glyph-rise" style={d(1)} />
      <rect x="16" y="31" width="17" height="9" rx="2" {...S} className="glyph-rise" style={d(2)} />
      <circle cx="9" cy="11.5" r="2.4" {...S} className="glyph-pulse" />
      <circle cx="9" cy="23.5" r="2.4" {...S} className="glyph-pulse" style={d(1)} />
      <circle cx="9" cy="35.5" r="2.4" {...S} className="glyph-pulse" style={d(2)} />
    </>
  );
}

/** Landing pages and lead forms: a page with a headline and fields, the last of
 *  them dashed. Form length is a qualification decision in the document, so the
 *  mark shows a field that may or may not be asked for. */
function FormGlyph() {
  return (
    <>
      <rect x="8" y="6" width="32" height="36" rx="3" {...S} />
      <path d="M14 14h14" {...S} opacity="0.8" />
      <rect x="14" y="20" width="20" height="5" rx="1.5" {...S} opacity="0.6" />
      <rect x="14" y="28" width="20" height="5" rx="1.5" {...S} strokeDasharray="3 3" opacity="0.5" />
      <path d="M25 36h9" {...S} className="glyph-pulse" />
    </>
  );
}

/* ---- campaign intelligence. Forecasting is drawn as ranges and lines, never
   as figures: a band is a range, a tick is a benchmark, a fork is a scenario,
   two lines side by side are forecast against actual. ---- */

/** Pre-campaign forecasting: a range drawn ahead of any result. */
function Forecast() {
  return (
    <>
      <path d="M7 40h34" {...S} opacity="0.45" />
      <path d="M9 30c8-4 14-10 30-14" {...S} strokeDasharray="3 3" opacity="0.7" />
      <path d="M9 38c8-4 14-10 30-14" {...S} strokeDasharray="3 3" opacity="0.7" />
      <path d="M9 34c8-4 14-10 30-14" {...S} className="glyph-rise" />
      <circle cx="39" cy="20" r="2.5" {...S} className="glyph-pulse" />
    </>
  );
}

/** Media mix: one budget, divided. */
function Mix() {
  return (
    <>
      <rect x="7" y="10" width="34" height="6" rx="2" {...S} />
      <path d="M12 16v8M24 16v8M36 16v8" {...S} opacity="0.5" />
      <rect x="7" y="24" width="12" height="6" rx="2" {...S} className="glyph-rise" />
      <rect x="21" y="24" width="9" height="6" rx="2" {...S} className="glyph-rise" style={d(1)} />
      <rect x="32" y="24" width="9" height="6" rx="2" {...S} className="glyph-rise" style={d(2)} />
      <path d="M9 38h8M23 38h5M34 38h5" {...S} opacity="0.6" />
    </>
  );
}

/** Benchmark: a reading set against a category range. */
function Benchmark() {
  return (
    <>
      <path d="M7 24h34" {...S} opacity="0.45" />
      <path d="M13 20v8M41 20v8" {...S} opacity="0.7" />
      <rect x="13" y="20" width="28" height="8" rx="2" {...S} opacity="0.4" />
      <path d="M27 12v24" {...S} className="glyph-pulse" />
      <circle cx="27" cy="24" r="3" {...S} />
    </>
  );
}

/** Scenario: one plan, forking into what a change would do. */
function Scenario() {
  return (
    <>
      <path d="M7 24h12" {...S} />
      <path d="M19 24c6 0 6-10 12-10h10" {...S} className="glyph-rise" />
      <path d="M19 24h22" {...S} opacity="0.55" />
      <path d="M19 24c6 0 6 10 12 10h10" {...S} className="glyph-rise" style={d(1)} />
      <circle cx="19" cy="24" r="2.5" {...S} className="glyph-pulse" />
    </>
  );
}

/** Forecast against actual: the range, and the line inside it. */
function Compare() {
  return (
    <>
      <path d="M7 40h34" {...S} opacity="0.45" />
      <path d="M9 30c10-2 16-8 30-12" {...S} opacity="0.5" />
      <path d="M9 38c10-2 16-8 30-12" {...S} opacity="0.5" />
      <path d="M9 36c8-1 14-5 22-9" {...S} className="animate-dash" />
      <circle cx="31" cy="27" r="2.5" {...S} className="glyph-pulse" />
    </>
  );
}

/** The goal: one result agreed before anything is calculated. */
function Goal() {
  return (
    <>
      <circle cx="24" cy="24" r="16" {...S} opacity="0.4" />
      <circle cx="24" cy="24" r="9" {...S} opacity="0.7" />
      <circle cx="24" cy="24" r="2.5" {...S} className="glyph-pulse" />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6" {...S} opacity="0.5" />
    </>
  );
}

/** Align: sources that disagree, brought onto one line. */
function Align() {
  return (
    <>
      <rect x="6" y="12" width="10" height="8" rx="2" {...S} opacity="0.6" />
      <rect x="19" y="8" width="10" height="8" rx="2" {...S} opacity="0.6" />
      <rect x="32" y="14" width="10" height="8" rx="2" {...S} opacity="0.6" />
      <path d="M11 20v12M24 16v16M37 22v10" {...S} opacity="0.5" strokeDasharray="2 3" />
      <path d="M6 34h36" {...S} className="glyph-scan" />
      <circle cx="11" cy="34" r="2" {...S} />
      <circle cx="24" cy="34" r="2" {...S} />
      <circle cx="37" cy="34" r="2" {...S} />
    </>
  );
}

/** Range: the bracket a forecast is stated in. */
function Range() {
  return (
    <>
      <path d="M12 12v24M36 12v24" {...S} />
      <path d="M8 12h4M8 36h4M36 12h4M36 36h4" {...S} opacity="0.6" />
      <path d="M12 24h24" {...S} opacity="0.4" strokeDasharray="2 3" />
      <rect x="16" y="18" width="16" height="12" rx="2" {...S} className="glyph-pulse" />
    </>
  );
}

/** Adjust: the allocation moved as new data arrives. */
function Adjust() {
  return (
    <>
      <path d="M8 14h32M8 24h32M8 34h32" {...S} opacity="0.4" />
      <circle cx="30" cy="14" r="3" {...S} className="glyph-rise" />
      <circle cx="16" cy="24" r="3" {...S} className="glyph-rise" style={d(1)} />
      <circle cx="34" cy="34" r="3" {...S} className="glyph-rise" style={d(2)} />
    </>
  );
}

/** A baseline: agreed questions as rows, a reading recorded against each. */
function Baseline() {
  return (
    <>
      <path d="M8 12h14M8 21h14M8 30h14M8 39h14" {...S} opacity="0.5" />
      <rect x="28" y="8" width="8" height="8" rx="2" {...S} className="glyph-pulse" />
      <rect x="28" y="17" width="8" height="8" rx="2" {...S} opacity="0.4" />
      <rect x="28" y="26" width="8" height="8" rx="2" {...S} className="glyph-pulse" style={d(1)} />
      <rect x="28" y="35" width="8" height="8" rx="2" {...S} opacity="0.4" />
      <path d="M40 8v35" {...S} opacity="0.45" />
    </>
  );
}

/** An image: frame, horizon, sun. */
function Picture() {
  return (
    <>
      <rect x="7" y="9" width="34" height="30" rx="3" {...S} />
      <circle cx="17" cy="19" r="3.5" {...S} className="glyph-pulse" />
      <path d="M7 33l10-9 7 6 6-5 11 8" {...S} />
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
  agent: Agent,
  workflow: Workflow,
  extract: Extract,
  triage: Triage,
  watch: Watch,
  reconcile: Reconcile,
  tool: Tool,
  diagnose: Diagnose,
  recommend: Recommend,
  testcase: TestCase,
  golive: GoLive,
  improve: Improve,
  heartbeat: Heartbeat,
  alert: Alert,
  repair: Repair,
  reseat: Reseat,
  support: Support,
  ledger: Ledger,
  forecast: Forecast,
  mix: Mix,
  benchmark: Benchmark,
  scenario: Scenario,
  compare: Compare,
  goal: Goal,
  align: Align,
  range: Range,
  adjust: Adjust,
  intent: Intent,
  sequence: Sequence,
  form: FormGlyph,
  baseline: Baseline,
  picture: Picture,
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

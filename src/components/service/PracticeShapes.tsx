"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import type { AudienceItem, PracticeShape, ShapeSource } from "@/content/industries/healthcare";

/** "Who We Work With" — nine providers, and the structure each one's own words
 *  license.
 *
 *  WHAT THIS REPLACES, AND WHY. The first build was nine name plates, the note
 *  under them, and the contrast sentence at the foot beside two site plans.
 *  Everything the document says was on the page and the section still said
 *  nothing: nine names is a list, a list answers "am I on it" and then stops,
 *  and the one claim worth making -- that the WORK changes shape with the
 *  provider -- sat at the bottom as a footnote with a picture beside it.
 *
 *  SO THE CLAIM IS THE SECTION. Every provider carries a structure, choosing
 *  one redraws it, and the sentence that placed it is printed underneath. The
 *  register is no longer a list of names: each row shows its own shape in
 *  miniature, so before a reader clicks anything they can see that the nine are
 *  not one thing. That is "the strategy is adapted to the services and patient
 *  journey involved" shown rather than asserted.
 *
 *  FIVE OF THE NINE HAVE NO SHAPE, AND THAT IS DELIBERATE AND PRINTED. The
 *  document places four -- two by the contrast sentence, one by its own
 *  "Multi-location" label read against the Local SEO service, one by FAQ 8,
 *  which is written about that provider by name. It says nothing structural
 *  about private, dental, cosmetic and aesthetic, diagnostic or wellness
 *  providers, so nothing is invented for them: they draw the same skeleton with
 *  its counts left open, captioned by the client's own sentence about what the
 *  shape is actually decided by. A category name does not determine a strategy,
 *  and pretending otherwise would be five fabricated diagrams on a page whose
 *  own limit is "without creating confusion or making unsupported promises".
 *
 *  THE CONTRAST SENTENCE IS A CONTROL, NOT A CAPTION. It names two providers,
 *  so when either is showing, the sentence is printed with that half marked and
 *  the other half live: one click crosses to the other structure. The reader
 *  runs the client's own comparison rather than reading about it. Same idea as
 *  `MarkedKeys` elsewhere on this page, with click-only semantics -- a jump on
 *  hover would fire every time a pointer crossed the sentence.
 *
 *  NOTHING IS COUNTED. One focus against four departments, three places, one
 *  professional: these are the structures the sentences describe, not measured
 *  quantities. No axis, no scale, and no shape is drawn larger than another to
 *  mean anything. What separates the drawings is their arrangement, which is
 *  the only thing the contrast sentence talks about.
 *
 *  THE REGISTER GROUPS ITSELF. Whichever structure is showing, every other
 *  provider placed by the same sentence is marked beside it. Five of the nine
 *  share the open shape, so without that a reader clicking from "Dental
 *  clinics" to "Wellness centres" would see nothing move and read the section
 *  as broken; with it, the register answers the question that click was really
 *  asking -- who else is in my position.
 *
 *  EVERY CAPTION STAYS IN THE DOM. Only one is visible; the rest are `inert`
 *  rather than unmounted, so a crawler gets all five sentences. Same rule
 *  `PinnedExplorer` follows for its panels, and for the same reason. */

const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";
const EASE = [0.16, 1, 0.3, 1] as const;

const W = 640;
const H = 380;

/** What each shape is made of. Read from the client's sentences and from
 *  nothing else; see the content file for which sentence placed which. */
type Spec = {
  /** The head of the structure: the provider's site, or the professional. */
  head: "site" | "person";
  /** Where the first layer's branches stand. */
  branches: number[];
  /** What a branch is. */
  branchKind: "service" | "place";
  /** How many pages hang under each branch. */
  leaves: number;
  /** A specialist standing at the foot of the column. */
  specialist?: boolean;
  /** An enquiry control at the foot of the column. */
  control?: boolean;
  /** Counts not fixed by the document: everything is drawn open. */
  open?: boolean;
  /** Lifts the shape so each one sits centred in the same frame. */
  offsetY: number;
};

const SPECS: Record<PracticeShape, Spec> = {
  // "A specialist practice ..." — one focus, carried deep.
  focused: { head: "site", branches: [320], branchKind: "service", leaves: 2, specialist: true, offsetY: 6 },
  // "... a multi-department medical centre." — several departments, side by side.
  departmental: { head: "site", branches: [128, 256, 384, 512], branchKind: "service", leaves: 2, offsetY: 62 },
  // "Multi-location", with the Local SEO service's "local pages".
  located: { head: "site", branches: [176, 320, 464], branchKind: "place", leaves: 1, offsetY: 74 },
  // FAQ 8, which is written about this provider by name.
  individual: { head: "person", branches: [320], branchKind: "service", leaves: 2, control: true, offsetY: 34 },
  // Placed by nothing, because the document places it by nothing.
  open: { head: "site", branches: [200, 320, 440], branchKind: "service", leaves: 2, open: true, offsetY: 52 },
};

const HEAD_Y = 22;
const TRUNK_END = 92;
const NODE_Y = 118;
const LEAF_Y = 174;
const LEAF_STEP = 30;

/** One drawing primitive, keyed so a shape change animates as a rebuild. */
type Part = { id: string; el: React.ReactNode };

function parts(shape: PracticeShape): Part[] {
  const s = SPECS[shape];
  const out: Part[] = [];
  const dash = s.open ? { strokeDasharray: "5 5" } : {};
  const line = { stroke: ASH, strokeWidth: 1.4, strokeOpacity: s.open ? 0.5 : 0.75, fill: "none" } as const;

  // ---- the head
  if (s.head === "site") {
    out.push({
      id: "head",
      el: (
        <g {...line}>
          <rect x="260" y={HEAD_Y} width="120" height="34" rx="5" strokeOpacity="0.85" />
          <rect x="274" y={HEAD_Y + 11} width="46" height="10" rx="2.5" fill={BRAND} fillOpacity="0.45" stroke="none" />
          <path d={`M330 ${HEAD_Y + 16} H366`} strokeWidth="1.1" strokeOpacity="0.4" strokeLinecap="round" />
        </g>
      ),
    });
  } else {
    out.push({
      id: "head",
      el: (
        <g {...line}>
          <circle cx="320" cy={HEAD_Y + 12} r="13" strokeOpacity="0.85" />
          <path d={`M296 ${HEAD_Y + 48} Q320 ${HEAD_Y + 18} 344 ${HEAD_Y + 48}`} strokeLinecap="round" strokeOpacity="0.85" />
          <circle cx="320" cy={HEAD_Y + 12} r="5" fill={BRAND} fillOpacity="0.5" stroke="none" />
        </g>
      ),
    });
  }

  // ---- trunk
  const trunkTop = s.head === "site" ? HEAD_Y + 34 : HEAD_Y + 52;
  out.push({
    id: "trunk",
    el: (
      <g>
        <path d={`M320 ${trunkTop} V${TRUNK_END}`} {...line} {...dash} strokeLinecap="round" />
        {/* THE STRUCTURE BEING WALKED. Every shape has a trunk and every shape
            is something a patient moves down, so this is the one loop that is
            true of all five -- and it is what the SEO service's own sentence
            calls internal links. Identical on every branch: nothing here is a
            position a reader could compare. */}
        <path
          d={`M320 ${trunkTop} V${TRUNK_END}`}
          pathLength="100"
          stroke={BRAND}
          strokeWidth="2"
          strokeLinecap="round"
          className="ci-flow"
        />
      </g>
    ),
  });

  // ---- spine across the branches
  if (s.branches.length > 1) {
    const a = s.branches[0];
    const b = s.branches[s.branches.length - 1];
    out.push({
      id: "spine",
      el: <path d={`M${a} ${TRUNK_END} H${b}`} {...line} {...dash} strokeLinecap="round" />,
    });
    if (s.open) {
      // The run does not stop where these three stop: the document fixes no
      // number, so the spine carries on past both ends and fades.
      out.push({
        id: "spine-open",
        el: (
          <g {...line} strokeDasharray="4 7" strokeOpacity="0.3">
            <path d={`M${a - 74} ${TRUNK_END} H${a}`} strokeLinecap="round" />
            <path d={`M${b} ${TRUNK_END} H${b + 74}`} strokeLinecap="round" />
          </g>
        ),
      });
    }
  }

  // ---- the branches
  s.branches.forEach((bx, i) => {
    out.push({
      id: `drop-${i}`,
      el: (
        <g>
          <path d={`M${bx} ${TRUNK_END} V${NODE_Y}`} {...line} {...dash} strokeLinecap="round" />
          <path
            d={`M${bx} ${TRUNK_END} V${NODE_Y}`}
            pathLength="100"
            stroke={BRAND}
            strokeWidth="2"
            strokeLinecap="round"
            className="ci-flow"
            style={{ animationDelay: `${420 + i * 260}ms` }}
          />
        </g>
      ),
    });

    if (s.branchKind === "place") {
      out.push({
        id: `place-${i}`,
        el: (
          <g {...line}>
            <path d={`M${bx} ${NODE_Y + 30} L${bx - 11} ${NODE_Y + 12} A11 11 0 1 1 ${bx + 11} ${NODE_Y + 12} Z`} strokeLinejoin="round" strokeOpacity="0.85" />
            <circle cx={bx} cy={NODE_Y + 12} r="4" fill={BRAND} fillOpacity="0.7" stroke="none" />
            <path d={`M${bx - 26} ${NODE_Y + 36} H${bx + 26}`} strokeWidth="1.1" strokeOpacity="0.35" strokeLinecap="round" />
          </g>
        ),
      });
    } else {
      out.push({
        id: `node-${i}`,
        el: (
          <g {...line}>
            <rect x={bx - 38} y={NODE_Y} width="76" height="32" rx="4" {...dash} strokeOpacity={s.open ? 0.5 : 0.85} />
            {!s.open && (
              <>
                <rect x={bx - 28} y={NODE_Y + 9} width="34" height="7" rx="2" fill={ASH} fillOpacity="0.3" stroke="none" />
                <path d={`M${bx - 28} ${NODE_Y + 23} H${bx + 22}`} strokeWidth="1.1" strokeOpacity="0.35" strokeLinecap="round" />
              </>
            )}
          </g>
        ),
      });
    }

    // ---- the pages under each branch
    for (let j = 0; j < s.leaves; j++) {
      const y = LEAF_Y + j * LEAF_STEP;
      out.push({
        id: `leaf-${i}-${j}`,
        el: (
          <g {...line}>
            <path d={`M${bx} ${y - 24} V${y}`} strokeWidth="1.1" strokeOpacity="0.4" {...dash} />
            <rect x={bx - 32} y={y} width="64" height="22" rx="3" {...dash} strokeOpacity={s.open ? 0.45 : 0.7} />
            {!s.open && (
              <path d={`M${bx - 22} ${y + 11} H${bx + 14}`} strokeWidth="1.1" strokeOpacity="0.3" strokeLinecap="round" />
            )}
          </g>
        ),
      });
    }
  });

  const foot = LEAF_Y + (s.leaves - 1) * LEAF_STEP + 22;

  // ---- a specialist at the foot of a focused column
  if (s.specialist) {
    out.push({
      id: "specialist",
      el: (
        <g {...line}>
          <path d={`M320 ${foot} V${foot + 26}`} strokeWidth="1.1" strokeOpacity="0.4" />
          <circle cx="320" cy={foot + 40} r="12" strokeOpacity="0.85" />
          <path d={`M298 ${foot + 74} Q320 ${foot + 46} 342 ${foot + 74}`} strokeLinecap="round" strokeOpacity="0.85" />
        </g>
      ),
    });
  }

  // ---- an enquiry control at the foot of a professional's column
  if (s.control) {
    out.push({
      id: "control",
      el: (
        <g {...line}>
          <path d={`M320 ${foot} V${foot + 24}`} strokeWidth="1.1" strokeOpacity="0.4" />
          <rect x="272" y={foot + 24} width="96" height="26" rx="13" fill={BRAND} fillOpacity="0.18" stroke={BRAND} strokeOpacity="0.7" />
          <path d={`M292 ${foot + 37} H348`} stroke={BRAND} strokeWidth="1.5" strokeOpacity="0.85" strokeLinecap="round" />
        </g>
      ),
    });
  }

  return out;
}

/** The same structure at register scale, so a reader can see the nine are not
 *  one thing before touching anything. */
function ShapeMark({ shape }: { shape: PracticeShape }) {
  const c = { stroke: "currentColor", strokeWidth: 1.3, fill: "none", strokeLinecap: "round" } as const;
  return (
    <svg viewBox="0 0 34 26" aria-hidden focusable="false" className="block h-[26px] w-[34px] shrink-0">
      {shape === "focused" && (
        <g {...c}>
          <rect x="11" y="2" width="12" height="6" rx="1.5" />
          <path d="M17 8 V12" />
          <rect x="11" y="12" width="12" height="5" rx="1" />
          <path d="M17 17 V20" />
          <circle cx="17" cy="22" r="2.6" />
        </g>
      )}
      {shape === "departmental" && (
        <g {...c}>
          <rect x="11" y="2" width="12" height="6" rx="1.5" />
          <path d="M17 8 V11 M4 11 H30 M4 11 V15 M12.6 11 V15 M21.3 11 V15 M30 11 V15" />
          <path d="M4 19 H8 M12.6 19 H16.6 M21.3 19 H25.3 M28 19 H32" strokeOpacity="0.5" />
        </g>
      )}
      {shape === "located" && (
        <g {...c}>
          <rect x="11" y="2" width="12" height="6" rx="1.5" />
          <path d="M17 8 V11 M6 11 H28 M6 11 V14 M17 11 V14 M28 11 V14" />
          <path d="M6 21 L3.4 16 A3 3 0 1 1 8.6 16 Z M17 21 L14.4 16 A3 3 0 1 1 19.6 16 Z M28 21 L25.4 16 A3 3 0 1 1 30.6 16 Z" strokeLinejoin="round" />
        </g>
      )}
      {shape === "individual" && (
        <g {...c}>
          <circle cx="17" cy="5" r="3.2" />
          <path d="M12 12 Q17 6 22 12" />
          <path d="M17 12 V15" />
          <rect x="11" y="15" width="12" height="4" rx="1" />
          <rect x="9" y="21" width="16" height="4" rx="2" strokeOpacity="0.7" />
        </g>
      )}
      {shape === "open" && (
        <g {...c}>
          <rect x="11" y="2" width="12" height="6" rx="1.5" />
          <path d="M17 8 V11" />
          {/* Neither the spine nor the stubs are fixed, and the run does not
              stop where these three stop. */}
          <path d="M1 11 H33" strokeDasharray="2 3" strokeOpacity="0.6" />
          <path d="M8 11 V16 M17 11 V16 M26 11 V16" strokeDasharray="2 3" strokeOpacity="0.6" />
          <path d="M4.5 21 H11.5 M13.5 21 H20.5 M22.5 21 H29.5" strokeDasharray="2 3" strokeOpacity="0.4" />
        </g>
      )}
    </svg>
  );
}

/** The source sentence, with the clause that placed the shape marked and -- for
 *  the two the contrast sentence names -- the other half live. Click only: a
 *  jump on hover would fire every time a pointer crossed the sentence. */
function Caption({
  source,
  onJump,
}: {
  source: ShapeSource;
  onJump?: (phrase: string) => void;
}) {
  const { text, mark, jump } = source;
  if (!jump || !text.includes(jump) || !onJump) {
    return <Marked text={text} mark={mark} className="font-semibold text-brand-text" />;
  }
  const escaped = jump.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "g"));
  return (
    <>
      {parts.map((part, i) =>
        part === jump ? (
          <button
            key={i}
            type="button"
            onClick={() => onJump(part)}
            className="font-semibold text-snow underline decoration-line decoration-2 underline-offset-[6px] transition-colors duration-300 hover:text-brand hover:decoration-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none"
          >
            {part}
          </button>
        ) : (
          <span key={i}>
            <Marked text={part} mark={mark} className="font-semibold text-brand-text" />
          </span>
        ),
      )}
    </>
  );
}

export function PracticeShapes({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  defaultIndex,
  sources,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** Ends in a colon in the source, so it sits directly above the register. */
  lead: string;
  items: AudienceItem[];
  defaultIndex: number;
  sources: Record<PracticeShape, ShapeSource>;
}) {
  const [active, setActive] = useState(defaultIndex);
  const rows = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  const shape = items[active]?.shape ?? "open";
  const spec = SPECS[shape];

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    rows.current[next]?.focus();
  }

  /** The contrast sentence's other half, as a way across to it. */
  function jumpTo(phrase: string) {
    const want: PracticeShape = phrase === sources.focused.jump ? "departmental" : "focused";
    const i = items.findIndex((it) => it.shape === want);
    if (i >= 0) {
      setActive(i);
      rows.current[i]?.focus();
    }
  }

  const stage = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.035, delayChildren: reduced ? 0 : 0.04 } },
    out: { transition: { staggerChildren: reduced ? 0 : 0.012, staggerDirection: -1 } },
  };
  const piece = {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.5, ease: EASE } },
    out: { opacity: 0, y: reduced ? 0 : -8, transition: { duration: reduced ? 0 : 0.2 } },
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-14"
        />

        <Rise>
          <div className="grid overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
            {/* THE REGISTER. Nine names, nine shapes, all of them on screen. */}
            <ol
              onKeyDown={onKeyDown}
              className="border-b border-line lg:border-b-0 lg:border-r"
            >
              {items.map((item, i) => {
                const on = i === active;
                // Rows that answer to the same structure as the one showing.
                // Five of the nine share the open shape, so without this a
                // reader clicking between them would see nothing change and
                // read the section as broken. Marked, the register says the
                // true thing: those five are placed by the same sentence.
                const kin = !on && item.shape === shape;
                return (
                  <li key={item.label} className={i ? "border-t border-line" : undefined}>
                    <button
                      type="button"
                      ref={(el) => {
                        rows.current[i] = el;
                      }}
                      aria-pressed={on}
                      tabIndex={on ? 0 : -1}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={`group flex w-full items-center gap-4 px-6 py-4 text-left transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand motion-reduce:transition-none sm:gap-5 sm:px-7 ${
                        on ? "bg-ink-3" : kin ? "bg-ink-3/45" : "hover:bg-ink-3/60"
                      }`}
                    >
                      <span
                        className={`transition-colors duration-500 motion-reduce:transition-none ${
                          on ? "text-brand" : kin ? "text-brand/45" : "text-ash group-hover:text-fog"
                        }`}
                      >
                        <ShapeMark shape={item.shape} />
                      </span>

                      <span
                        className={`font-display shrink-0 text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500 motion-reduce:transition-none ${
                          on ? "text-brand-text" : "text-ash"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`font-display min-w-0 flex-1 text-[clamp(0.95rem,1.35vw,1.15rem)] font-extrabold uppercase leading-[1.14] transition-colors duration-500 motion-reduce:transition-none ${
                          on ? "text-snow" : "text-fog group-hover:text-snow"
                        }`}
                      >
                        {item.label}
                      </span>

                      <span
                        aria-hidden
                        className={`block h-px shrink-0 transition-all duration-500 motion-reduce:transition-none ${
                          on ? "w-10 bg-brand" : kin ? "w-6 bg-brand/40" : "w-4 bg-line group-hover:w-8"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* THE STAGE. One structure, redrawn. */}
            <div className="flex flex-col">
              <div className="relative flex-1 px-4 py-8 sm:px-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.10]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage: "radial-gradient(circle at 50% 45%, black, transparent 78%)",
                  }}
                />

                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  aria-hidden
                  className="relative mx-auto block h-auto w-full max-w-[560px]"
                  fill="none"
                >
                  {/* THE MEASURE. Two hairlines at the frame's own edges, the
                      same on every shape and outside the animated group. They
                      are what makes a narrow structure mean something: one
                      focus and four departments are drawn on the same span, so
                      the width a provider's site occupies is a reading rather
                      than an accident of how much was drawn. */}
                  <g aria-hidden stroke={ASH} strokeOpacity="0.22" strokeWidth="1" strokeDasharray="4 8">
                    <path d="M40 14 V366" />
                    <path d="M600 14 V366" />
                  </g>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.g
                      key={shape}
                      variants={stage}
                      initial="hidden"
                      animate="show"
                      exit="out"
                      transform={`translate(0 ${spec.offsetY})`}
                    >
                      {parts(shape).map((part) => (
                        <motion.g key={part.id} variants={piece}>
                          {part.el}
                        </motion.g>
                      ))}

                      {/* THE RUN CARRIES ON. Only where the counts are open:
                          everywhere else the structure is settled, and motion
                          over it would say it is not. A packet leaving by each
                          dashed tail is the whole claim -- how far this goes is
                          decided by the services and the patient journey, and
                          neither is on this page.

                          The first version swept a wide band down the frame
                          instead, which at this scale is a red bar across the
                          top of the drawing: it read as a highlighted row
                          rather than as a plan still open. */}
                      {spec.open && (
                        <motion.g variants={piece}>
                          <path
                            d={`M${SPECS.open.branches[0]} ${TRUNK_END} H${SPECS.open.branches[0] - 74}`}
                            pathLength="100"
                            stroke={BRAND}
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="ci-flow"
                          />
                          <path
                            d={`M${SPECS.open.branches[2]} ${TRUNK_END} H${SPECS.open.branches[2] + 74}`}
                            pathLength="100"
                            stroke={BRAND}
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="ci-flow"
                            style={{ animationDelay: "700ms" }}
                          />
                        </motion.g>
                      )}
                    </motion.g>
                  </AnimatePresence>
                </svg>
              </div>

              {/* THE SENTENCE THE SHAPE WAS READ FROM. All five stay in the
                  DOM; the four that are not showing are inert. */}
              <div className="grid border-t border-line px-6 py-7 sm:px-8">
                {(Object.keys(sources) as PracticeShape[]).map((key) => {
                  const on = key === shape;
                  return (
                    <p
                      key={key}
                      inert={!on}
                      className={`col-start-1 row-start-1 max-w-[62ch] text-sm leading-relaxed text-fog transition-opacity duration-500 motion-reduce:transition-none sm:text-base ${
                        on ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <Caption source={sources[key]} onJump={jumpTo} />
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

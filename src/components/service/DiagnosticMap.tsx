"use client";

import { useEffect, useId, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** The ten checks, as ten reads on one process.
 *
 *  WHY THIS. They were five bordered rows, which is the arrangement that makes
 *  them look like a feature list. They are not a list. Read them together and
 *  every one is looking at a different feature of the same diagram:
 *
 *    "The steps your team currently follows"        -> the stages
 *    "The people and systems involved"              -> the handoffs between them
 *    "The time spent on each stage"                 -> how long each one takes
 *    "Repeated work and manual data entry"          -> where it loops back
 *    "Rules, exceptions and approval requirements"  -> where it stops for a person
 *    "Processes that are suitable for automation"    -> the stages that can go
 *    "Processes should remain manual"                -> the one that cannot
 *    "Recommended automation scope"                  -> the bracket around them
 *    "Estimated development timeline and cost"       -> the build, on its own band
 *    "Expected time or cost savings"                 -> the same run, shorter
 *
 *  TEAM DIRECTION, 2026-09-08: all ten are bullets of the document's own "It
 *  covers:" list. The last five used to be pulled out of it into two separate
 *  blocks below, which made them read as another section; they are back in the
 *  list and the drawing now has a read for each of the ten. The second five
 *  annotate the same process the first five observe, which is the point: the
 *  diagnostic looks at one process and then marks it up.
 *
 *  The document calls the deliverable "process mapping", so the section draws
 *  the process once and makes each check a lens onto it. Taking a lens dims
 *  everything the other four look at, which is what reading a process map
 *  actually feels like.
 *
 *  THE DRAWING IS LAID OUT IN BANDS, one per lens, so each read has somewhere
 *  of its own to happen: the person sits above, the loop arcs over the spine,
 *  the stages run through the middle, and the duration is measured underneath.
 *  A short drawing had them all fighting for the same forty pixels.
 *
 *  NO INVENTED DATA. There are no stage names, no system names and no
 *  durations, because the document supplies none and the answer depends on the
 *  reader's own process. The schematic is a shape, not a record. The words
 *  beside it are the client's, at readable size, which is the opposite of the
 *  failure mode where a drawing carries the meaning and the copy shrinks to a
 *  caption. */

/** Which part of the drawing each check is looking at. Derived from the check's
 *  own wording, in the document's order. */
type Lens =
  | "stages"
  | "handoffs"
  | "duration"
  | "loop"
  | "approval"
  | "automatable"
  | "manual"
  | "scope"
  | "build"
  | "savings";
const LENSES: Lens[] = [
  "stages",
  "handoffs",
  "duration",
  "loop",
  "approval",
  "automatable",
  "manual",
  "scope",
  "build",
  "savings",
];

/** Which stages the schematic marks as automatable, and which one it leaves.
 *  Fixed so the drawing is deterministic, and chosen to agree with the read
 *  above it: the stage that stops for a person is the one that stays manual.
 *  It is a shape, not a finding about anybody's actual process. */
const AUTOMATABLE = [0, 1, 2, 3];
const MANUAL = 4;

/** How long each read holds before the next. Long enough to finish the line
 *  beside it, which is what sets the pace rather than the drawing. */
const DWELL = 2400;

/** The process runs down the page, not across it, because it is read beside a
 *  column of ten. Landscape left 408px of dead space above and below it once
 *  the list grew from five reads to ten. */
const SPINE_X = 268;
const MEASURE_X = 58;
const SAVE_X = 96;
const RIGHT_X = 430;
/** Stage centres down the spine. */
const Y = [96, 216, 336, 456, 576];
const Y_TOP = Y[0] - 30;
const Y_END = Y[4] + 30;
const Y_BUILD = 676;

export function DiagnosticMap({
  coversLead,
  observe,
}: {
  coversLead: string;
  observe: string[];
}) {
  /** Null means every read is lit at once, which is what renders before any
   *  script runs and what a reader sees if none ever does. */
  const [lens, setLens] = useState<number | null>(null);
  const [taken, setTaken] = useState(false);
  const [held, setHeld] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const uid = useId();

  /* ------------------------------------------------------------- autoplay --
   *
   *  The reads advance on their own so a reader who never touches the section
   *  still sees all five, and the same four stops apply as everywhere else on
   *  this site:
   *
   *  - Choosing a read takes control for good. Moving it on three seconds
   *    later, after someone deliberately picked one, is hostile.
   *  - Pointer over the block, or focus inside it, pauses. Reading and having
   *    the thing you are reading replaced are incompatible.
   *  - prefers-reduced-motion disables it outright. Content that changes by
   *    itself is motion, whatever it is made of.
   *  - The explicit control can stop and restart it. WCAG 2.2.2 wants a
   *    mechanism for anything that auto-updates indefinitely, and
   *    hover-to-pause is available to neither keyboard nor touch. */
  const autoplaying = !reduced && !taken && !held && !paused;

  useEffect(() => {
    if (!autoplaying) return;
    const t = window.setInterval(
      () => setLens((l) => (l === null ? 0 : (l + 1) % LENSES.length)),
      DWELL,
    );
    return () => window.clearInterval(t);
  }, [autoplaying]);

  const active = lens === null ? null : LENSES[lens];
  /** With no read taken, everything sits lit. With one taken, what it looks at
   *  comes forward and the rest recede. */
  const dim = (l: Lens) => (active === null || active === l ? 1 : 0.16);
  const lit = (l: Lens) => active === l;

  return (
    <div
      className="mt-10"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <p
        id={`${uid}-covers`}
        className="font-display mb-6 text-[0.7rem] font-semibold uppercase text-brand-text"
      >
        {coversLead}
      </p>

      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        {/* The ten reads. Real buttons: the drawing illustrates the text, so
            the text is the control. */}
        <div>
          {/* Named by the client's own lead-in rather than by a count: the
              label was "Five reads on one process" and there are now ten. */}
          <div role="group" aria-labelledby={`${uid}-covers`} className="border-t border-line">
            {observe.map((item, i) => {
              const isOn = lens === i;
              return (
                <button
                  key={item}
                  type="button"
                  onMouseEnter={() => setLens(i)}
                  onFocus={() => setLens(i)}
                  onClick={() => {
                    setLens(i);
                    setTaken(true);
                  }}
                  aria-pressed={isOn}
                  className={cn(
                    "group relative block w-full overflow-hidden border-b border-line text-left transition-colors duration-300 motion-reduce:transition-none",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    isOn && "bg-brand/[0.05]",
                  )}
                >
                  {/* The dwell, drawn. Keyed on the index so it restarts with
                      each advance, and absent entirely once autoplay stops. */}
                  {isOn && autoplaying && (
                    <span
                      key={`dwell-${i}`}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-px origin-left bg-brand"
                      style={{ animation: `pin-progress ${DWELL}ms linear forwards` }}
                    />
                  )}
                  <span className="flex items-baseline gap-6 px-1 py-6">
                    <span
                      aria-hidden
                      className={cn(
                        "font-display shrink-0 text-[0.7rem] font-bold tabular-nums transition-colors duration-300",
                        isOn ? "text-brand" : "text-ash group-hover:text-brand-text",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-lg leading-relaxed transition-colors duration-300 sm:text-xl",
                        isOn ? "text-snow" : "text-fog group-hover:text-snow",
                      )}
                    >
                      {item}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* The required mechanism to stop it. */}
          {!reduced && (
            <div className="mt-6 flex justify-start">
              <button
                type="button"
                onClick={() =>
                  taken ? (setTaken(false), setPaused(false)) : setPaused((v) => !v)
                }
                aria-pressed={!autoplaying}
                className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-[0.65rem] font-semibold uppercase text-fog transition-colors duration-300 hover:border-brand/50 hover:text-snow"
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                    autoplaying ? "bg-brand" : "bg-ash",
                  )}
                />
                {autoplaying ? "Pause" : "Play"}
              </button>
            </div>
          )}
        </div>

        {/* One process, drawn once, in bands. */}
        {/* Held in view while the ten reads scroll past it.
            The list is ten rows and runs well over a thousand pixels; matching
            that height with one drawing left 408px of dead air above and below
            when the drawing was landscape, and made the row 1370px tall when it
            was portrait and sized off its own width. Neither is a drawing
            problem. So the drawing stops trying to be as tall as the list: it
            takes a viewport-height box, sticks, and stays centred on whichever
            read is being pointed at. */}
        <div className="flex items-center justify-center rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8 lg:sticky lg:top-24 lg:h-[calc(100vh-9rem)] lg:max-h-[42rem]">
          <svg
            viewBox="0 0 500 724"
            preserveAspectRatio="xMidYMid meet"
            className="block h-full w-full"
            role="img"
            aria-label="A schematic of one business process running down the page: five stages on a spine, the handoffs between them, a loop returning to an earlier stage, a person at the point of approval, and a measure of the whole run beside it. It is then marked up: the stages that can be automated, the one that stays with the person, a bracket around the recommended scope, a separate band for the build, and the same run drawn shorter. It carries no names, durations or figures."
          >
            {/* Duration: the whole run, measured down the side. No figure in
                it, because the document supplies none. */}
            <g
              style={{ opacity: dim("duration") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <path
                d={`M ${MEASURE_X + 8} ${Y_TOP} h -8 V ${Y_END} h 8`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
              {Y.map((y) => (
                <line
                  key={`d-${y}`}
                  x1={MEASURE_X}
                  y1={y}
                  x2={SPINE_X - 26}
                  y2={y}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>

            {/* Expected savings: the same run, shorter. The gap is the claim,
                and it is a shape rather than a percentage. */}
            <g
              style={{ opacity: dim("savings") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <line
                x1={SAVE_X}
                y1={Y_TOP}
                x2={SAVE_X}
                y2={Y_END}
                stroke="var(--color-line)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={SAVE_X}
                y1={Y_TOP}
                x2={SAVE_X}
                y2={Y[1]}
                stroke="var(--color-brand)"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* The loop: repeated work, returning to a stage already passed. */}
            <g
              style={{ opacity: dim("loop") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <path
                d={`M ${SPINE_X - 26} ${Y[2]} C ${SPINE_X - 120} ${Y[2]}, ${SPINE_X - 120} ${Y[1]}, ${SPINE_X - 26} ${Y[1]}`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.4"
                strokeDasharray="4 3"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={`M ${SPINE_X - 32} ${Y[1] - 5} L ${SPINE_X - 25} ${Y[1]} L ${SPINE_X - 32} ${Y[1] + 5}`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Handoffs: the connectors, each carrying an unnamed system. */}
            <g
              style={{ opacity: dim("handoffs") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              {Y.slice(0, 4).map((y, i) => (
                <g key={`h-${y}`}>
                  <line
                    x1={SPINE_X}
                    y1={y + 26}
                    x2={SPINE_X}
                    y2={Y[i + 1] - 26}
                    stroke="var(--color-fog)"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <rect
                    x={SPINE_X - 5}
                    y={(y + Y[i + 1]) / 2 - 5}
                    width="10"
                    height="10"
                    rx="2"
                    fill={lit("handoffs") ? "var(--color-brand)" : "var(--color-ink-2)"}
                    stroke={lit("handoffs") ? "var(--color-brand)" : "var(--color-fog)"}
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                    className="transition-colors duration-500 motion-reduce:transition-none"
                  />
                </g>
              ))}
            </g>

            {/* Recommended scope: a bracket around what is proposed, and
                nothing beyond it. */}
            <g
              style={{ opacity: dim("scope") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <path
                d={`M ${RIGHT_X - 8} ${Y_TOP} h 8 V ${Y[3] + 26} h -8`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={RIGHT_X - 6}
                y1={Y[4]}
                x2={RIGHT_X + 6}
                y2={Y[4]}
                stroke="var(--color-line)"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Approval: where the process stops for a person. */}
            <g
              style={{ opacity: dim("approval") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <line
                x1={SPINE_X + 26}
                y1={Y[4]}
                x2={RIGHT_X - 16}
                y2={Y[4]}
                stroke="var(--color-brand)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={RIGHT_X} cy={Y[4] - 7} r="5" fill="var(--color-brand)" />
              <path
                d={`M ${RIGHT_X - 9} ${Y[4] + 8} a 9 9 0 0 1 18 0`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* The stages themselves. */}
            <g
              style={{ opacity: dim("stages") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              {Y.map((y) => (
                <rect
                  key={`s-${y}`}
                  x={SPINE_X - 26}
                  y={y - 26}
                  width="52"
                  height="52"
                  rx="11"
                  fill={lit("stages") ? "var(--color-brand)" : "var(--color-ink-3)"}
                  stroke={lit("stages") ? "var(--color-brand)" : "var(--color-line)"}
                  strokeWidth="1.4"
                  vectorEffect="non-scaling-stroke"
                  className="transition-colors duration-500 motion-reduce:transition-none"
                />
              ))}
            </g>

            {/* Suitable for automation: the stages that can go. */}
            <g
              style={{ opacity: dim("automatable") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              {AUTOMATABLE.map((i) => (
                <rect
                  key={`a-${i}`}
                  x={SPINE_X - 32}
                  y={Y[i] - 32}
                  width="64"
                  height="64"
                  rx="14"
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="1.4"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>

            {/* Should remain manual: the one the person keeps. Hatched rather
                than crossed out, because the document is not refusing it. */}
            <g
              style={{ opacity: dim("manual") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <rect
                x={SPINE_X - 32}
                y={Y[MANUAL] - 32}
                width="64"
                height="64"
                rx="14"
                fill="none"
                stroke="var(--color-fog)"
                strokeWidth="1.4"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={RIGHT_X} cy={Y[MANUAL] - 7} r="4" fill="var(--color-fog)" />
            </g>

            {/* The build: its own band at the foot, because development is not
                part of the process being measured. Dashed, because it is an
                estimate, and it carries no length to read a figure off. */}
            <g
              style={{ opacity: dim("build") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <line
                x1={MEASURE_X}
                y1={Y_BUILD}
                x2={RIGHT_X}
                y2={Y_BUILD}
                stroke="var(--color-brand)"
                strokeWidth="3"
                strokeDasharray="7 5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={MEASURE_X} cy={Y_BUILD} r="3.5" fill="var(--color-brand)" />
              <circle
                cx={RIGHT_X}
                cy={Y_BUILD}
                r="3.5"
                fill="var(--color-ink-2)"
                stroke="var(--color-brand)"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

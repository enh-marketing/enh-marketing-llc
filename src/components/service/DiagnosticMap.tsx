"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** The five checks, as five reads on one process.
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
type Lens = "stages" | "handoffs" | "duration" | "loop" | "approval";
const LENSES: Lens[] = ["stages", "handoffs", "duration", "loop", "approval"];

/** How long each read holds before the next. Long enough to finish the line
 *  beside it, which is what sets the pace rather than the drawing. */
const DWELL = 2800;

/** Stage centres along the spine, and the bands the reads occupy. */
const X = [30, 88, 146, 204, 262];
const Y_SPINE = 118;
const Y_PERSON = 34;
const Y_LOOP_TOP = 74;
const Y_MEASURE = 162;

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
      <p className="font-display mb-6 text-[0.7rem] font-semibold uppercase text-brand-text">
        {coversLead}
      </p>

      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch">
        {/* The five reads. Real buttons: the drawing illustrates the text, so
            the text is the control. */}
        <div>
          <div role="group" aria-label="Five reads on one process" className="border-t border-line">
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
        <div className="flex h-full items-center justify-center rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
          <svg
            viewBox="0 0 292 196"
            className="block w-full"
            role="img"
            aria-label="A schematic of one business process: five stages on a spine, the handoffs between them, a loop returning to an earlier stage, a person at the point of approval, and a measure across the whole run. It carries no names or figures."
          >
            {/* Approval: where the process stops for a person. Same motif as
                the hero and the services diagram, so the page argues one thing
                in one language. */}
            <g
              style={{ opacity: dim("approval") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <line
                x1={X[4]}
                y1={Y_SPINE - 13}
                x2={X[4]}
                y2={Y_PERSON + 16}
                stroke="var(--color-brand)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={X[4]} cy={Y_PERSON} r="5" fill="var(--color-brand)" />
              <path
                d={`M ${X[4] - 9} ${Y_PERSON + 14} a 9 9 0 0 1 18 0`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* The loop: repeated work, returning to a stage already passed. */}
            <g
              style={{ opacity: dim("loop") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <path
                d={`M ${X[2]} ${Y_SPINE - 13} C ${X[2]} ${Y_LOOP_TOP}, ${X[1]} ${Y_LOOP_TOP}, ${X[1]} ${Y_SPINE - 13}`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.4"
                strokeDasharray="4 3"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={`M ${X[1] - 4} ${Y_SPINE - 18} L ${X[1]} ${Y_SPINE - 12} L ${X[1] + 4} ${Y_SPINE - 18}`}
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
              {X.slice(0, 4).map((x, i) => (
                <g key={x}>
                  <line
                    x1={x + 12}
                    y1={Y_SPINE}
                    x2={X[i + 1] - 12}
                    y2={Y_SPINE}
                    stroke="var(--color-fog)"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <rect
                    x={(x + X[i + 1]) / 2 - 4.5}
                    y={Y_SPINE - 4.5}
                    width="9"
                    height="9"
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

            {/* The stages themselves. */}
            <g
              style={{ opacity: dim("stages") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              {X.map((x) => (
                <rect
                  key={x}
                  x={x - 12}
                  y={Y_SPINE - 12}
                  width="24"
                  height="24"
                  rx="5"
                  fill={lit("stages") ? "var(--color-brand)" : "var(--color-ink-3)"}
                  stroke={lit("stages") ? "var(--color-brand)" : "var(--color-line)"}
                  strokeWidth="1.4"
                  vectorEffect="non-scaling-stroke"
                  className="transition-colors duration-500 motion-reduce:transition-none"
                />
              ))}
            </g>

            {/* Duration: measured across the run, with no figure in it, because
                the document supplies none and the number is the reader's own. */}
            <g
              style={{ opacity: dim("duration") }}
              className="transition-opacity duration-500 motion-reduce:transition-none"
            >
              <path
                d={`M ${X[0]} ${Y_MEASURE} v 8 H ${X[4]} v -8`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
              {X.map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1={Y_SPINE + 14}
                  x2={x}
                  y2={Y_MEASURE + 8}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              {X.slice(0, 4).map((x, i) => (
                <line
                  key={`t-${x}`}
                  x1={(x + X[i + 1]) / 2}
                  y1={Y_MEASURE + 4}
                  x2={(x + X[i + 1]) / 2}
                  y2={Y_MEASURE + 12}
                  stroke="var(--color-brand)"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

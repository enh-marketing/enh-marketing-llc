"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/services/explainer-video";

/** The production process, drawn as a storyboard that stops moving.
 *
 *  WHY THIS SHAPE. The document is emphatic about one moment and nothing else:
 *  the storyboard "is the main opportunity to change the structure before
 *  detailed illustration and animation work begins", and the promises say the
 *  same in plainer words -- reviewed early, "when structural changes are still
 *  practical to make". A numbered list flattens that into six equal boxes. So
 *  the six steps drive a stage instead, and the stage is the video's own
 *  scenes.
 *
 *  WHAT THE STAGE SHOWS, AND WHERE EACH PART COMES FROM. Every change on the
 *  plate is a noun the step beside it already uses. Step two writes the script,
 *  so script lines appear in the frames. Step three approves the storyboard, so
 *  the frames stop swapping places and take their numbers. Step four develops
 *  the visual style, so the frames fill with shapes. Step five animates and
 *  adds sound, so a waveform runs beneath them. Step six delivers "the required
 *  dimensions", so the output ratios appear. Nothing on the plate is invented
 *  and nothing is measured: no hours, no cost and no percentage, because the
 *  document attaches none.
 *
 *  THE WINDOW IS THE SHUFFLE. While the structure is still open the scenes sit
 *  in the wrong order and change order as the reader moves between the early
 *  steps. Approval is where they land, and after it they never move again: the
 *  frames go from dashed to solid and the latch closes. The boundary comes from
 *  the content's own gates rather than a number written in here.
 *
 *  NO CAPTION FOR THE LOCK. Both sentences that would caption it are already on
 *  this page, one inside step three and one in the promises, so printing either
 *  beside the drawing would put the same sentence in front of the reader twice.
 *  The section heading's own mark carries it.
 *
 *  EVERY BODY STAYS IN THE DOM. Inactive steps collapse to zero height rather
 *  than unmounting, so all six paragraphs are present for readers, crawlers and
 *  the visible-copy check. */

/** Scene frame, and the three-by-two grid it is placed on. */
const FW = 136;
const FH = 78;
const SLOTS: readonly (readonly [number, number])[] = [
  [16, 40],
  [172, 40],
  [328, 40],
  [16, 150],
  [172, 150],
  [328, 150],
];

/** Where each scene sits while the order is still open. Fixed, not random: a
 *  reader scrolling back has to see the same thing. The index is the scene, the
 *  value is the slot it occupies. */
const OPEN_ORDERS: readonly (readonly number[])[] = [
  [2, 0, 4, 1, 5, 3],
  [1, 3, 0, 5, 2, 4],
];
const SETTLED = [0, 1, 2, 3, 4, 5];
/** Tilt while the scenes are still being moved around, in degrees. */
const TILT = [-2.4, 1.8, -1.2, 2.6, -2, 1.4];

/** What fills a frame once the visual style exists. Three arrangements, so six
 *  frames do not read as one stamp repeated. */
function SceneShapes({ kind }: { kind: number }) {
  if (kind === 0)
    return (
      <>
        <circle cx="34" cy="42" r="14" className="fill-brand/45" />
        <rect x="58" y="30" width="52" height="7" rx="3.5" className="fill-brand/25" />
        <rect x="58" y="44" width="36" height="7" rx="3.5" className="fill-brand/25" />
      </>
    );
  if (kind === 1)
    return (
      <>
        <rect x="24" y="46" width="16" height="16" rx="3" className="fill-brand/45" />
        <rect x="46" y="34" width="16" height="28" rx="3" className="fill-brand/30" />
        <rect x="68" y="24" width="16" height="38" rx="3" className="fill-brand/45" />
        <rect x="90" y="40" width="16" height="22" rx="3" className="fill-brand/30" />
      </>
    );
  return (
    <>
      <rect x="22" y="24" width="44" height="38" rx="4" className="fill-brand/30" />
      <circle cx="92" cy="34" r="9" className="fill-brand/45" />
      <rect x="76" y="50" width="34" height="7" rx="3.5" className="fill-brand/25" />
    </>
  );
}

export function StoryboardLock({
  items,
  gates,
}: {
  items: Stage[];
  /** Zero-based indices of the steps the document names as review points. The
   *  last of them is where the structure stops being open. */
  gates: number[];
}) {
  const [step, setStep] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  const gate = new Set(gates);
  const lockAfter = gates.length ? Math.max(...gates) : items.length;

  const settled = step >= lockAfter;
  const order = settled ? SETTLED : OPEN_ORDERS[Math.min(step, OPEN_ORDERS.length - 1)];
  const scripted = step >= 1;
  const styled = step >= lockAfter + 1;
  const animated = step >= lockAfter + 2;
  const delivered = step >= items.length - 1;

  const move = (e: React.KeyboardEvent) => {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? Math.min(step + 1, items.length - 1)
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? Math.max(step - 1, 0)
          : null;
    if (next === null) return;
    e.preventDefault();
    setStep(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
      {/* The stage. First on small screens: it is what the steps are about. */}
      <div className="order-1 lg:order-2">
        <div className="lg:sticky lg:top-24">
          <div
            className={cn(
              "relative rounded-2xl border p-3 transition-colors duration-500 sm:p-4",
              settled ? "border-brand/45 bg-brand/[0.05]" : "border-line bg-ink-3",
            )}
          >
            <svg
              viewBox="0 0 480 300"
              className="block w-full"
              role="img"
              aria-label={
                settled
                  ? "The six scenes in order and fixed, their frames drawn solid and numbered."
                  : "The six scenes out of order, drawn as loose dashed frames still being moved around."
              }
            >
              {/* The latch: open while the structure is, closed after approval. */}
              <g className={cn("transition-colors duration-500", settled ? "text-brand" : "text-ash")}>
                <rect
                  x="16"
                  y="12"
                  width="18"
                  height="14"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d={settled ? "M20 12V8a5 5 0 0110 0v4" : "M20 12V8a5 5 0 0110 0"}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M44 19h420"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.35"
                  strokeDasharray={settled ? "0" : "5 5"}
                />
              </g>

              {items.map((scene, i) => {
                const slot = SLOTS[order[i] ?? i];
                const tilt = settled ? 0 : TILT[i];
                return (
                  <g
                    key={scene.title}
                    style={{
                      transform: "translate(" + slot[0] + "px, " + slot[1] + "px) rotate(" + tilt + "deg)",
                      transformOrigin: FW / 2 + "px " + FH / 2 + "px",
                      transition: "transform 620ms cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDelay: i * 40 + "ms",
                    }}
                  >
                    <rect
                      width={FW}
                      height={FH}
                      rx="7"
                      className={cn(
                        "transition-all duration-500",
                        settled ? "fill-ink-2 stroke-brand/55" : "fill-ink-2/60 stroke-line",
                      )}
                      strokeWidth="1.6"
                      strokeDasharray={settled ? "0" : "6 5"}
                    />

                    {/* The script, before there is anything to look at. */}
                    <g className="transition-opacity duration-500" opacity={scripted && !styled ? 1 : 0}>
                      <rect x="18" y="26" width="100" height="6" rx="3" className="fill-fog/35" />
                      <rect x="18" y="38" width="76" height="6" rx="3" className="fill-fog/25" />
                      <rect x="18" y="50" width="88" height="6" rx="3" className="fill-fog/20" />
                    </g>

                    {/* The visual style. */}
                    <g className="transition-opacity duration-500" opacity={styled ? 1 : 0}>
                      <SceneShapes kind={i % 3} />
                    </g>

                    {/* The scene number, which exists once the order does. */}
                    <g className="transition-opacity duration-400" opacity={settled ? 1 : 0}>
                      <circle cx="120" cy="16" r="10" className="fill-brand" />
                      <text
                        x="120"
                        y="20"
                        textAnchor="middle"
                        className="fill-white text-[11px] font-bold"
                      >
                        {i + 1}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Sound, running under the scenes it plays beneath. */}
              <g className="transition-opacity duration-500" opacity={animated ? 1 : 0}>
                <path
                  d="M16 262h14l8-20 9 38 8-30 7 16 9-24 8 30 9-18 8 10 8-22 9 26 8-14h222"
                  fill="none"
                  className="stroke-brand"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* The delivered dimensions. */}
              <g className="transition-opacity duration-500" opacity={delivered ? 1 : 0}>
                <rect x="356" y="248" width="48" height="27" rx="3" fill="none" className="stroke-brand" strokeWidth="1.6" />
                <rect x="412" y="246" width="30" height="30" rx="3" fill="none" className="stroke-brand" strokeWidth="1.6" />
                <rect x="450" y="244" width="18" height="34" rx="3" fill="none" className="stroke-brand" strokeWidth="1.6" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* The six steps. */}
      <ol ref={listRef} onKeyDown={move} className="order-2 lg:order-1">
        {items.map((s, i) => {
          const active = i === step;
          const isGate = gate.has(i);
          return (
            <li key={s.title}>
              {/* The boundary the document draws. After this line the structure
                  is no longer open, which is what the plate stops showing. */}
              {i === lockAfter + 1 && (
                <div aria-hidden className="my-2 flex items-center gap-3">
                  <span className="h-px flex-1 bg-brand/45" />
                  <svg viewBox="0 0 20 20" className="h-4 w-4 text-brand" fill="none">
                    <rect x="4.5" y="8.5" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M7 8.5V6a3 3 0 016 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  <span className="h-px flex-1 bg-brand/45" />
                </div>
              )}

              {/* The standard disclosure shape: the heading carries the
                  control, the paragraph is the panel it opens. Putting the
                  paragraph inside the button would fold six paragraphs into six
                  button names. */}
              <h3 className="font-display">
                <button
                  type="button"
                  id={"process-step-" + i}
                  aria-controls={"process-body-" + i}
                  aria-expanded={active}
                  onClick={() => setStep(i)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setStep(i);
                  }}
                  className={cn(
                    "group grid w-full grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-5 py-5 text-left sm:grid-cols-[3.5rem_minmax(0,1fr)]",
                    i === 0 && "border-t border-line",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border text-[0.7rem] font-bold tabular-nums transition-all duration-400",
                      active
                        ? "border-brand bg-brand text-white"
                        : isGate
                          ? "border-brand/70 bg-ink-2 text-brand"
                          : "border-line bg-ink-2 text-fog group-hover:border-brand/60",
                    )}
                  >
                    {s.no}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.15] transition-colors duration-300",
                      active ? "text-brand" : "text-snow group-hover:text-brand",
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              </h3>

              {/* Collapsed, never removed: all six paragraphs stay in the page
                  for readers, crawlers and the visible-copy check. */}
              <div
                id={"process-body-" + i}
                role="region"
                aria-labelledby={"process-step-" + i}
                className="grid border-b border-line transition-[grid-template-rows] duration-500 ease-out"
                style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 pl-[3.75rem] leading-relaxed text-fog sm:pl-[4.5rem]">
                    {s.body}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

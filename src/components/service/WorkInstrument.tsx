"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { useEnhanced } from "@/lib/useEnhanced";

gsap.registerPlugin(ScrollTrigger);

export type WorkStep = { no: string; title: string; body: string };

/** How the work moves: one instrument, five states.
 *
 *  WHY AN INSTRUMENT AND NOT A LADDER. The five steps are not five different
 *  things done in five different places. They are five things done to one
 *  subject — an agreed list of questions and what the answers to them draw on —
 *  and the last of them repeats the first. A numbered run says "five steps";
 *  it cannot say "the same apparatus, in five states, and then round again".
 *  So the section is a single survey instrument and the reader's scroll changes
 *  its state. Nothing is clicked; the drawing does the explaining.
 *
 *  WHAT THE PARTS MEAN, and every one of them is read from the document:
 *
 *    outer ring   the agreed questions. Step 1 tests "a small selection", so
 *                 six of the twenty-four are read at the start; step 5 repeats
 *                 "the agreed searches", so the whole ring is read at the end.
 *    spokes       the five things step 2 reviews, in its own order: "the agreed
 *                 platforms, website, content, technical access and external
 *                 information". They open at state 2 and stay, dimmed.
 *    inner ring   the work. Step 3 sets priorities, so the marks appear open
 *                 there; step 4 completes them, so they close.
 *    hub          whatever is being done right now, drawn as the thing it is.
 *    return arc   step 5's own words, on the arc that carries the instrument
 *                 back to state 1.
 *
 *  NO FIGURES, AND NOTHING THAT COULD READ AS A RESULT. The page's own header
 *  refuses counts, scores and before-and-afters. Every mark here is a mark of
 *  WORK — a question asked, a priority set, an item completed — never of a
 *  placement won. The report at the end is four identical columns of readings,
 *  the newest lit: "repeat the agreed searches", not "and here is the lift".
 *
 *  BELOW THE LARGE BREAKPOINT, AND UNDER REDUCED MOTION, there is no pin and no
 *  scrub. The five steps stack, and each carries its own small copy of the
 *  instrument frozen at its own state — a contact sheet of the five states
 *  instead of one state at a time. The concept survives; only the mechanism
 *  changes. That branch is also what the server renders, so a crawler gets all
 *  five steps in full. */

const CX = 210;
const CY = 210;
const R_Q = 176;
const R_W = 128;
const R_HUB = 100;
const N_Q = 24;
const N_W = 12;

/** Read from step 1: "a small selection of relevant questions". */
const FIRST_READ = 6;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A point on the dial.
 *
 *  ROUNDED, AND THAT IS NOT COSMETIC. Node and V8 do not always print the same
 *  last digit of an unrounded double, so `49.78530029987891` on the server met
 *  `49.785300299878884` in the browser and React threw the whole tree away as a
 *  hydration mismatch. Two decimals is finer than any pixel this viewBox can
 *  resolve and it prints identically everywhere. */
const round = (n: number) => Math.round(n * 100) / 100;

const pt = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [round(CX + r * Math.cos(a)), round(CY + r * Math.sin(a))] as const;
};

/** Where each spoke sits, in the order step 2 names its five areas. */
const SPOKE_DEG = [0, 72, 144, 216, 288];

/** Where the five area labels sit around the dial, as percentages of the
 *  square. Kept in the same order as SPOKE_DEG so a label always stands off the
 *  spoke it names. */
const LABEL_AT = [
  { left: "50%", top: "-3%", align: "center" },
  { left: "103%", top: "34%", align: "left" },
  { left: "82%", top: "104%", align: "left" },
  { left: "18%", top: "104%", align: "right" },
  { left: "-3%", top: "34%", align: "right" },
] as const;

/* -------------------------------------------------------------- the hub ---
 *
 *  One drawing per state, each of the thing that step actually does. They are
 *  cross-faded rather than swapped, so the instrument reads as one object
 *  changing rather than five pictures in a slot. */

/** Step 1: a small selection of the questions, dispatched. */
function HubCheck() {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const on = i === 1 || i === 3;
        return (
          <g key={i}>
            <rect
              x={CX - 62}
              y={CY - 46 + i * 20}
              width={124}
              height={12}
              rx={6}
              {...S}
              strokeWidth={1.2}
              className={on ? "text-brand" : "text-line"}
            />
            <rect
              x={CX - 56}
              y={CY - 42 + i * 20}
              width={[64, 82, 48, 74, 58][i]}
              height={4}
              rx={2}
              fill="currentColor"
              className={on ? "text-brand" : "text-fog"}
              opacity={on ? 0.9 : 0.35}
            />
            {on && (
              <circle
                cx={CX + 52}
                cy={CY - 40 + i * 20}
                r={3}
                fill="currentColor"
                className="text-brand ci-twinkle"
                style={{ animationDelay: `${i * 400}ms` }}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

/** Step 2: the five areas being read in greater detail. */
function HubDiagnostic() {
  return (
    <g>
      <rect x={CX - 66} y={CY - 56} width={132} height={112} rx={8} {...S} strokeWidth={1.2} className="text-line" />
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => (
          <rect
            key={`${r}-${c}`}
            x={CX - 56 + c * 19}
            y={CY - 46 + r * 20}
            width={13}
            height={13}
            rx={2.5}
            fill="currentColor"
            className={(r * 6 + c) % 7 === 3 ? "text-brand" : "text-fog"}
            opacity={(r * 6 + c) % 7 === 3 ? 0.75 : 0.2}
          />
        )),
      )}
      {/* The read, passing down the field. */}
      <rect
        x={CX - 66}
        y={CY - 58}
        width={132}
        height={3}
        rx={1.5}
        fill="currentColor"
        className="text-brand ci-scan-y"
        style={{ animationDuration: "3.4s" }}
      />
    </g>
  );
}

/** Step 3: what needs to change, in order, and who will handle it. */
function HubPriorities({ owners }: { owners: [string, string] }) {
  const rows = [
    { w: 96, mine: true },
    { w: 80, mine: true },
    { w: 68, mine: false },
    { w: 54, mine: true },
  ];
  return (
    <g>
      {rows.map((row, i) => (
        <g key={i}>
          <rect
            x={CX - 70}
            y={CY - 44 + i * 24}
            width={140}
            height={16}
            rx={4}
            {...S}
            strokeWidth={1.1}
            className="text-line"
          />
          <rect
            x={CX - 64}
            y={CY - 39 + i * 24}
            width={row.w}
            height={6}
            rx={3}
            fill="currentColor"
            className="text-brand ci-grow-x"
            opacity={0.85}
            style={{ animationDelay: `${i * 260}ms` }}
          />
          {/* Who will handle it: a filled mark for us, an outline for you. */}
          <circle
            cx={CX + 60}
            cy={CY - 36 + i * 24}
            r={4}
            {...S}
            strokeWidth={1.3}
            fill={row.mine ? "currentColor" : "none"}
            className="text-brand"
          >
            <title>{row.mine ? owners[0] : owners[1]}</title>
          </circle>
        </g>
      ))}
    </g>
  );
}

/** Step 4: the agreed work completed, one row at a time. */
function HubImplement({ owners }: { owners: [string, string] }) {
  const rows = [true, true, false, true];
  return (
    <g>
      {rows.map((mine, i) => (
        <g key={i}>
          <rect
            x={CX - 70}
            y={CY - 44 + i * 24}
            width={140}
            height={16}
            rx={4}
            {...S}
            strokeWidth={1.1}
            className={mine ? "text-brand" : "text-line"}
            fill={mine ? "color-mix(in srgb, var(--color-brand) 8%, transparent)" : "none"}
          />
          <path
            d={`M${CX - 62} ${CY - 36 + i * 24}l4 4 7-8`}
            {...S}
            strokeWidth={1.8}
            className="text-brand ci-draw"
            pathLength={100}
            style={{ animationDelay: `${i * 300}ms` }}
          />
          <rect
            x={CX - 46}
            y={CY - 39 + i * 24}
            width={[74, 60, 66, 52][i]}
            height={6}
            rx={3}
            fill="currentColor"
            className="text-fog"
            opacity={0.4}
          />
          {!mine && (
            <circle cx={CX + 60} cy={CY - 36 + i * 24} r={4} {...S} strokeWidth={1.3} className="text-brand">
              <title>{owners[1]}</title>
            </circle>
          )}
        </g>
      ))}
    </g>
  );
}

/** Step 5: the same searches, taken again, and recorded beside the last ones.
 *  Four identical columns and no trend line: the drawing says "read again",
 *  which is what the step says, and nothing about which way anything moved. */
function HubReport() {
  return (
    <g>
      <path d={`M${CX - 70} ${CY + 46}H${CX + 70}`} {...S} strokeWidth={1.2} className="text-line" />
      {[0, 1, 2, 3].map((c) => (
        <g key={c}>
          {[0, 1, 2, 3, 4].map((r) => (
            <rect
              key={r}
              x={CX - 58 + c * 34}
              y={CY + 28 - r * 16}
              width={22}
              height={7}
              rx={3.5}
              fill="currentColor"
              className={c === 3 ? "text-brand" : "text-fog"}
              opacity={c === 3 ? 0.9 : 0.22}
            />
          ))}
          <circle
            cx={CX - 47 + c * 34}
            cy={CY + 56}
            r={2.4}
            fill="currentColor"
            className={c === 3 ? "text-brand" : "text-line"}
          />
        </g>
      ))}
      {/* The reading being taken now. */}
      <rect
        x={CX + 40}
        y={CY - 54}
        width={26}
        height={7}
        rx={3.5}
        fill="currentColor"
        className="text-brand ci-twinkle"
      />
    </g>
  );
}

/* ------------------------------------------------------------- the dial --- */

function Dial({
  state,
  areas,
  owners,
  returnLabel,
  compact = false,
}: {
  state: number;
  areas: string[];
  owners: [string, string];
  returnLabel: string;
  compact?: boolean;
}) {
  const readCount = state >= 4 ? N_Q : FIRST_READ;
  const spokesOpen = state >= 1;
  const workOpen = state >= 2;
  const workDone = state >= 3;
  const returning = state >= 4;

  return (
    <svg viewBox="0 0 420 420" aria-hidden className="block h-full w-full overflow-visible">
      {/* The sweep. It is the one thing that never stops, because the reading
          is the one thing that never stops. */}
      <g className={compact ? undefined : "ah-spin"} style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}>
        <path
          d={`M${CX} ${CY} L${pt(-13, R_Q + 8)[0]} ${pt(-13, R_Q + 8)[1]} A${R_Q + 8} ${R_Q + 8} 0 0 1 ${pt(13, R_Q + 8)[0]} ${pt(13, R_Q + 8)[1]} Z`}
          fill="color-mix(in srgb, var(--color-brand) 12%, transparent)"
        />
        <path
          d={`M${CX} ${CY}L${pt(13, R_Q + 8)[0]} ${pt(13, R_Q + 8)[1]}`}
          {...S}
          strokeWidth={1.4}
          className="text-brand"
          opacity={0.85}
        />
      </g>

      {/* The agreed questions. */}
      {Array.from({ length: N_Q }, (_, i) => {
        const deg = (360 / N_Q) * i;
        const read = i % Math.round(N_Q / readCount) === 0 && i < readCount * Math.round(N_Q / readCount);
        const [x1, y1] = pt(deg, R_Q - 9);
        const [x2, y2] = pt(deg, R_Q + 9);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            {...S}
            strokeWidth={read ? 2.6 : 1.1}
            className={cn("transition-colors duration-700", read ? "text-brand" : "text-line")}
          />
        );
      })}
      <circle cx={CX} cy={CY} r={R_Q} {...S} strokeWidth={1} className="text-line" opacity={0.55} />

      {/* The five areas step 2 reviews. */}
      {SPOKE_DEG.map((deg, i) => {
        const [x1, y1] = pt(deg, R_Q + 10);
        const [x2, y2] = pt(deg, R_Q + 30);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            {...S}
            strokeWidth={1.2}
            strokeDasharray="3 3"
            className={cn(
              "transition-opacity duration-700",
              state === 1 ? "text-brand" : "text-line",
            )}
            opacity={spokesOpen ? (state === 1 ? 1 : 0.55) : 0}
            data-area={areas[i]}
          />
        );
      })}

      {/* The work: open at state 3, closed at state 4. */}
      <circle
        cx={CX}
        cy={CY}
        r={R_W}
        {...S}
        strokeWidth={1}
        className="text-line"
        opacity={workOpen ? 0.7 : 0.25}
        strokeDasharray={workDone ? undefined : "4 5"}
      />
      {Array.from({ length: N_W }, (_, i) => {
        const [x, y] = pt((360 / N_W) * i, R_W);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={workOpen ? 5.5 : 2}
            {...S}
            strokeWidth={1.6}
            fill={workDone ? "currentColor" : "none"}
            className={cn(
              "transition-all duration-500",
              workOpen ? "text-brand" : "text-line",
            )}
            style={{ transitionDelay: workDone ? `${i * 45}ms` : "0ms" }}
          />
        );
      })}

      {/* The hub. Every state is mounted; only the current one is shown, so the
          instrument morphs rather than cutting. */}
      <circle cx={CX} cy={CY} r={R_HUB} fill="var(--color-ink-2)" stroke="var(--color-line)" strokeWidth={1} />
      {[
        <HubCheck key="0" />,
        <HubDiagnostic key="1" />,
        <HubPriorities key="2" owners={owners} />,
        <HubImplement key="3" owners={owners} />,
        <HubReport key="4" />,
      ].map((node, i) => (
        <g
          key={i}
          className="transition-opacity duration-500"
          opacity={state === i ? 1 : 0}
          style={{ pointerEvents: "none" }}
        >
          {node}
        </g>
      ))}

      {/* The return. Step 5 repeats step 1, so the last state draws the arc
          that carries the instrument back to the first. */}
      <g className="transition-opacity duration-700" opacity={returning ? 1 : 0}>
        <path
          d={`M${pt(150, R_Q + 34)[0]} ${pt(150, R_Q + 34)[1]} A${R_Q + 34} ${R_Q + 34} 0 0 0 ${pt(-14, R_Q + 34)[0]} ${pt(-14, R_Q + 34)[1]}`}
          {...S}
          strokeWidth={1.4}
          strokeDasharray="5 5"
          className="text-brand"
          opacity={0.8}
        />
        <path
          d={`M${pt(-14, R_Q + 34)[0] - 7} ${pt(-14, R_Q + 34)[1] - 3}l7 3-4 7`}
          {...S}
          strokeWidth={1.6}
          className="text-brand"
        />
      </g>

      <title>{returnLabel}</title>
    </svg>
  );
}

/* ------------------------------------------------------------ the section --- */

export function WorkInstrument({
  items,
  returnLabel,
  areas,
  owners,
}: {
  items: WorkStep[];
  /** Step five's own words, on the return arc. */
  returnLabel: string;
  /** The five things step two reviews, in its own order. */
  areas: string[];
  /** Who handles a priority. Step three: "who will handle it". */
  owners: [string, string];
}) {
  const enhanced = useEnhanced();
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState(0);

  useEffect(() => {
    if (!enhanced) return;
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ pin: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.pin) return;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "center center",
        end: () => `+=${items.length * 360}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(items.length - 1, Math.floor(self.progress * items.length));
          setState((prev) => (prev === i ? prev : i));
          if (rail.current) rail.current.style.transform = `scaleY(${self.progress})`;
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [enhanced, items.length]);

  /* ------------------------------------------------- the plain rendering ---
   *  Server, small screens and reduced motion. Five steps, each with the
   *  instrument frozen at its own state, so the sequence is still a sequence
   *  of states of one machine rather than five paragraphs. */
  if (!enhanced) {
    return (
      <ol className="grid gap-10 sm:gap-12">
        {items.map((step, i) => (
          <li key={step.no} className="grid gap-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-start sm:gap-8">
            <div className="relative w-44 shrink-0 sm:w-full sm:max-w-[11rem]">
              <div className="aspect-square">
                <Dial state={i} areas={areas} owners={owners} returnLabel={returnLabel} compact />
              </div>
            </div>
            <div>
              <p className="font-display text-sm font-bold tabular-nums text-brand-text">
                {step.no}
              </p>
              <h3 className="font-display mt-3 text-[clamp(1.1rem,4.4vw,1.5rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {step.title}
              </h3>
              <p className="mt-4 leading-relaxed text-fog">{step.body}</p>
              {i === 1 && (
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {areas.map((a) => (
                    <li key={a} className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ash">
                      {a}
                    </li>
                  ))}
                </ul>
              )}
              {i === items.length - 1 && (
                <p className="font-display mt-5 inline-flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-text">
                  <span aria-hidden className="h-px w-8 bg-brand" />
                  {returnLabel}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div ref={root} className="relative">
      <div className="grid items-center gap-x-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* The five steps, all present, the current one open. */}
        <ol className="relative pl-8">
          {/* How far through the run the reader is. */}
          <span aria-hidden className="absolute left-0 top-1 bottom-1 w-px bg-line" />
          <span
            ref={rail}
            aria-hidden
            className="absolute left-0 top-1 bottom-1 w-px origin-top scale-y-0 bg-brand"
          />
          {items.map((step, i) => {
            const on = i === state;
            const past = i < state;
            return (
              <li key={step.no} className="relative py-2.5">
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-8 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full border transition-all duration-500",
                    on
                      ? "scale-[1.6] border-brand bg-brand"
                      : past
                        ? "border-brand bg-brand"
                        : "border-line bg-void",
                  )}
                />
                <div className="flex items-baseline gap-4">
                  <span
                    className={cn(
                      "font-display shrink-0 text-sm font-bold tabular-nums transition-colors duration-500",
                      on ? "text-brand-text" : "text-ash",
                    )}
                  >
                    {step.no}
                  </span>
                  <h3
                    className={cn(
                      "font-display text-[clamp(1.15rem,2vw,1.6rem)] font-extrabold uppercase leading-[1.12] transition-colors duration-500",
                      on ? "text-snow" : past ? "text-fog" : "text-ash",
                    )}
                  >
                    {step.title}
                  </h3>
                </div>
                {/* Bodies are never unmounted: they collapse. */}
                <div
                  inert={!on}
                  className={cn(
                    "grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    on ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0">
                    <p className="max-w-lg pl-8 leading-relaxed text-fog sm:text-lg">{step.body}</p>
                  </div>
                </div>
              </li>
            );
          })}

          {/* The return, stated where the run ends. */}
          <li
            aria-hidden
            className={cn(
              "mt-6 flex items-center gap-3 transition-opacity duration-700",
              state === items.length - 1 ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="h-px w-10 bg-brand" />
            <span className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand-text">
              {returnLabel}
            </span>
          </li>
        </ol>

        {/* The instrument. */}
        <div className="relative mx-auto w-full max-w-[30rem]">
          <div className="relative aspect-square">
            <Dial state={state} areas={areas} owners={owners} returnLabel={returnLabel} />

            {/* The five areas, named in HTML so they stay type rather than
                becoming artwork that shrinks with the viewBox. */}
            {areas.map((area, i) => (
              <span
                key={area}
                aria-hidden
                className={cn(
                  "font-display absolute w-[7.5rem] -translate-x-1/2 -translate-y-1/2 text-[0.625rem] font-bold uppercase leading-tight tracking-[0.1em] transition-all duration-700",
                  state === 1 ? "text-brand-text opacity-100" : state > 1 ? "text-ash opacity-60" : "opacity-0",
                )}
                style={{
                  left: LABEL_AT[i].left,
                  top: LABEL_AT[i].top,
                  textAlign: LABEL_AT[i].align,
                  transform:
                    LABEL_AT[i].align === "left"
                      ? "translate(0,-50%)"
                      : LABEL_AT[i].align === "right"
                        ? "translate(-100%,-50%)"
                        : "translate(-50%,-50%)",
                }}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

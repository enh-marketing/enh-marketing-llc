"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/services/tiktok-ads";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/** The five stages, drawn as the one bed of creative they act on.
 *
 *  WHY ONE OBJECT AND NOT FIVE STEPS. Read the document's stages in order and
 *  they are not five topics, they are five states of the same thing: tracking is
 *  laid before any budget goes out, a batch of variants is loaded, the budget
 *  gate opens and the early figures move a great deal, budget shifts toward what
 *  holds attention while fatigued ads are pulled and replaced, and then the
 *  supply never stops. A numbered column would set those five side by side as
 *  equals and leave the reader to infer the transformation. Here the
 *  transformation is the only thing on screen.
 *
 *  THE LAST STAGE IS THE ARGUMENT AND IT IS DRAWN AS ONE. The document numbers
 *  four stages and then refuses to number the fifth: "Ongoing: Creative supply.
 *  A steady production rhythm, because this is the part that decides whether the
 *  account keeps working." So at the fifth state the bed's edge goes dashed and
 *  creative keeps arriving through it. The section does not finish, because the
 *  work does not.
 *
 *  NOTHING IS COUNTED. Twelve slots are a legible bed, not a number of ads. No
 *  spend, no rate, no axis, no percentage: the document supplies weeks and
 *  nothing else, and the weeks are in its own words beside the drawing.
 *
 *  STICKY, NEVER A PINNED SCROLL HIJACK. The house rule: the page never takes
 *  the scroll away, so a flick still moves the page and the scrollbar keeps
 *  telling the truth. The section is overflow-x-clip and never overflow-hidden,
 *  which would silently make it a scroll container and kill the sticky panel.
 *
 *  SCROLL WORK STAYS OFF THE REACT PATH. ScrollTrigger writes the rail straight
 *  to the DOM every frame; React only hears about a stage when the stage
 *  actually changes. Same arrangement as ContentPipeline, for the same reason.
 *
 *  REDUCED MOTION. The tracking still runs, because it is scroll position and
 *  not animation, but every transition inside the bed is dropped and the inflow
 *  parks. Every state is a complete picture on its own, so a reader who never
 *  sees it move still reads the section. */

/** Twelve slots. A bed, not a quantity. */
const SLOTS = 12;

/** What each slot holds at each stage. Fixed rather than random, so the drawing
 *  is deterministic and the same ads fatigue every time. */
type Cell = "empty" | "live" | "spark" | "tired" | "new";

function bed(stage: number): Cell[] {
  const cells: Cell[] = Array.from({ length: SLOTS }, () => "empty");
  if (stage === 0) return cells;

  // Stage 2 loads a batch of variants, two of them from an account that
  // already has the content: the Spark Ads the document mentions here.
  for (let i = 0; i < 8; i++) cells[i] = i === 2 || i === 5 ? "spark" : "live";
  if (stage <= 2) return cells;

  // Weeks 2 to 6: the ones that stopped holding attention come out, and their
  // replacements go in.
  if (stage === 3) {
    [1, 4, 7].forEach((i) => (cells[i] = "tired"));
    [8, 9, 10].forEach((i) => (cells[i] = "new"));
    return cells;
  }

  // Ongoing: the bed stays full because supply does not stop.
  [1, 4, 7].forEach((i) => (cells[i] = "live"));
  [8, 9, 10, 11].forEach((i) => (cells[i] = "new"));
  return cells;
}

/** How much budget sits behind each slot. Shapes, not figures: nothing at all
 *  before launch, evenly spread at launch, then concentrated on what holds. */
function budget(stage: number, i: number, cell: Cell): number {
  if (stage < 2 || cell === "empty") return 0;
  if (cell === "tired") return 4;
  if (stage === 2) return 34;
  return [72, 0, 88, 40, 0, 96, 46, 0, 64, 52, 58, 44][i] ?? 40;
}

/** The reading above the bed. Flat before launch, violent at launch, settling
 *  as the cycles complete, steady while supply holds. */
const READOUT = [
  "M0 26 L 260 26",
  "M0 26 L 260 26",
  "M0 26 L 18 10 L 32 40 L 48 6 L 63 38 L 80 12 L 96 41 L 112 14 L 130 34 L 150 16 L 172 32 L 196 18 L 220 30 L 240 20 L 260 26",
  "M0 30 L 20 12 L 38 36 L 58 14 L 78 33 L 100 18 L 124 28 L 150 20 L 178 26 L 206 21 L 232 25 L 260 23",
  "M0 28 L 30 22 L 60 26 L 92 21 L 124 25 L 156 20 L 188 24 L 220 20 L 260 22",
];

export function CreativeRhythm({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  stages: Stage[];
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  /** Last index pushed to React, so scrolling does not re-render every frame. */
  const lastPushed = useRef(0);
  const count = stages.length;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: list,
        start: "top 65%",
        end: "bottom 75%",
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;
          if (railRef.current) railRef.current.style.transform = `scaleY(${p})`;
          const i = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
          if (i !== lastPushed.current) {
            lastPushed.current = i;
            setActive(i);
          }
        },
      });
      return () => trigger.kill();
    }, list);

    return () => ctx.revert();
  }, [count]);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          {/* ---------------------------------------------------- the bed ---
              Sticky in both layouts: at the top of the viewport on small
              screens, beside the stages on large ones. */}
          <div className="sticky top-20 z-10 -mx-6 mb-8 bg-void/90 px-6 py-4 backdrop-blur-sm sm:-mx-10 sm:px-10 lg:top-28 lg:z-0 lg:mx-0 lg:mb-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
            <CreativeBed stage={active} />

            {/* Where it is in the run. The stage's own word is beside it in the
                list, so the rail carries no words of its own. */}
            <div className="mt-5 flex items-center gap-4 lg:hidden">
              <span aria-hidden className="relative h-px flex-1 overflow-hidden bg-line">
                <span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-brand transition-transform duration-500 motion-reduce:transition-none"
                  style={{ transform: `scaleX(${(active + 1) / count})` }}
                />
              </span>
              <span
                aria-hidden
                className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums text-ash"
              >
                {active + 1}
                <span className="text-line"> / {count}</span>
              </span>
            </div>
          </div>

          {/* ------------------------------------------------- the stages --- */}
          <ol ref={listRef} className="relative lg:pl-12">
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block"
            >
              <span
                ref={railRef}
                className="absolute inset-0 origin-top bg-brand"
                style={{ transform: "scaleY(0)" }}
              />
            </span>

            {stages.map((s, i) => {
              const on = i === active;
              const last = i === stages.length - 1;
              return (
                <li
                  key={s.no}
                  className="relative flex flex-col justify-center py-10 lg:min-h-[62vh] lg:py-0"
                >
                  {/* The tick on the rail. The last stage does not finish, so
                      its tick is drawn open. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-12 hidden h-2.5 w-2.5 rounded-full border-2 transition-colors duration-500 motion-reduce:transition-none lg:block",
                      last
                        ? on
                          ? "border-brand border-dashed bg-transparent"
                          : "border-line border-dashed bg-transparent"
                        : on
                          ? "border-brand bg-brand"
                          : "border-line bg-void",
                    )}
                    style={{ top: "calc(50% - 0.3125rem)", marginLeft: "-0.3125rem" }}
                  />

                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    {/* The document's own word for this stage, and it refuses
                        to number the fifth, so neither does this. */}
                    <span
                      aria-hidden
                      className={cn(
                        "font-display block text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold uppercase leading-none transition-colors duration-500 motion-reduce:transition-none",
                        on ? "text-brand" : "text-snow/[0.14]",
                      )}
                    >
                      {s.no}
                    </span>
                    <h3
                      className={cn(
                        "font-display mt-4 text-[clamp(1.35rem,2.8vw,2.1rem)] font-extrabold uppercase leading-[1.1] transition-colors duration-500 motion-reduce:transition-none",
                        on ? "text-snow" : "text-fog",
                      )}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-5 max-w-xl leading-relaxed text-fog sm:text-lg">{s.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>

      {/* No live region. The drawing is decorative and every stage's own words
          are already in the list beside it, so announcing the stage again on
          each scroll step would only interrupt a reader who has the text. */}
    </section>
  );
}

/** The bed itself: a gate, twelve slots, the budget behind them, the reading
 *  above and the tracking beneath. Everything on it is drawn at every stage;
 *  only its state changes. */
function CreativeBed({ stage }: { stage: number }) {
  const cells = bed(stage);
  const gateOpen = stage >= 2;
  const openEdge = stage >= 4;

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-2 p-5 sm:p-7"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* THE READING. Flat, then violent, then settling. The hatched band is the
          fortnight the document says it would not read much into. */}
      <div className="relative h-14">
        <svg viewBox="0 0 260 52" preserveAspectRatio="none" className="h-full w-full" fill="none">
          <defs>
            <pattern id="rhythm-hatch" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 6 L6 0" stroke="var(--color-line)" strokeWidth="1" />
            </pattern>
          </defs>
          {stage === 2 && <rect x="0" y="0" width="78" height="52" fill="url(#rhythm-hatch)" />}
          <path
            d={READOUT[stage] ?? READOUT[0]}
            stroke={stage >= 2 ? "var(--color-brand)" : "var(--color-line)"}
            strokeWidth="1.75"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="transition-[stroke] duration-500 motion-reduce:transition-none"
          />
        </svg>
      </div>

      <div className="relative mt-4 flex items-stretch gap-3">
        {/* THE GATE. Closed until the objective and the tracking are agreed;
            "before any budget goes out" is the document's own condition. */}
        <div className="flex w-7 shrink-0 flex-col items-center justify-center gap-1.5">
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className={cn(
                "h-6 w-full rounded-[3px] border transition-colors duration-500 motion-reduce:transition-none",
                gateOpen
                  ? "border-brand/60 bg-brand/40"
                  : "border-dashed border-line bg-transparent",
              )}
            />
          ))}
        </div>

        {/* THE BED. Twelve slots, and past the last stage its right edge is
            open, because the supply does not stop. */}
        <div
          className={cn(
            "relative flex-1 rounded-xl border border-y border-l p-3 transition-colors duration-500 motion-reduce:transition-none",
            openEdge
              ? "border-y-line border-l-line border-r-2 border-r-dashed border-r-brand/60"
              : "border-line",
          )}
        >
          <div className="grid grid-cols-4 gap-2">
            {cells.map((cell, i) => (
              <span key={i} className="flex flex-col gap-1">
                <span
                  className={cn(
                    "relative flex h-10 items-center justify-center rounded-[4px] border transition-all duration-500 motion-reduce:transition-none",
                    cell === "empty" && "border-dashed border-line bg-transparent",
                    cell === "live" && "border-brand/50 bg-brand/30",
                    cell === "spark" && "border-brand bg-brand/30",
                    cell === "tired" && "border-line bg-transparent opacity-45",
                    cell === "new" && "border-brand bg-brand/60",
                  )}
                >
                  {/* A Spark Ad carries the account it runs through. */}
                  {cell === "spark" && (
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-brand bg-brand/20" />
                  )}
                  {/* A fatigued ad is struck, not deleted: the document says
                      they are replaced rather than left running. */}
                  {cell === "tired" && (
                    <span className="h-px w-6 rotate-[-24deg] bg-line" />
                  )}
                </span>
                {/* The budget behind it. */}
                <span className="h-1 w-full overflow-hidden rounded-full bg-line/40">
                  <span
                    className="block h-full rounded-full bg-brand transition-all duration-700 ease-out motion-reduce:transition-none"
                    style={{ width: `${budget(stage, i, cell)}%` }}
                  />
                </span>
              </span>
            ))}
          </div>

          {/* What keeps arriving once the rhythm is established. */}
          {openEdge && (
            <span className="pointer-events-none absolute -right-1 top-1/2 h-16 w-2 -translate-y-1/2 overflow-hidden">
              {/* Two copies of a three-tile run, spaced by margin rather than a
                  flex gap so the -50% translate loops without a seam. */}
              <span className="animate-inflow flex flex-col">
                {Array.from({ length: 6 }).map((_, k) => (
                  <span
                    key={k}
                    className="mb-1.5 h-4 w-2 shrink-0 rounded-[2px] border border-brand/60 bg-brand/30"
                  />
                ))}
              </span>
            </span>
          )}
        </div>
      </div>

      {/* THE TRACKING, and the value a conversion was agreed at. Both are in
          place from the first state, because the first state IS them: "We agree
          what a conversion is worth, then set up the pixel and Events API to
          match before any budget goes out." So at stage one the bed is empty,
          the gate is shut, and this is the only live thing on the drawing. */}
      <div className="relative mt-4 flex items-center gap-3">
        <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-brand" />
        <span className="relative h-px flex-1 bg-line">
          <span className="absolute inset-y-0 left-0 w-full bg-brand" />
        </span>
        {/* The value, weighted rather than counted: the document says a
            conversion is worth agreeing on and never says what it is worth. */}
        <span className="flex shrink-0 items-end gap-1">
          {[6, 11, 8].map((w, k) => (
            <span
              key={k}
              className="rounded-[2px] bg-brand/70"
              style={{ width: `${w}px`, height: `${w + 4}px` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

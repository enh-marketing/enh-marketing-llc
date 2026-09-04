"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Six stages, sorted by whose desk they sit on.
 *
 *  THE INFORMATION A CLIENT ACTUALLY WANTS FROM A PROCESS SECTION is not the
 *  order of the stages, it is what they are on the hook for. This document
 *  answers that and no previous version of the section showed it: five of the
 *  six stages say "we" or "our team", and exactly one says "Your team receives
 *  the content before publishing". So the six are set in two lanes, and the
 *  shape of the section is the answer: you are needed once, in the middle, to
 *  approve.
 *
 *  THE LANE NAMES ARE THE DOCUMENT'S OWN WORDS. "Our team" is stage three's
 *  ("Our team prepares the required photography, video, design, captions and
 *  on-screen copy") and "Your team" is stage four's. Nothing is invented to
 *  label them, and no stage is assigned to a lane on anything but its own
 *  sentence.
 *
 *  THE SPINE IS DRAWN BY THE READER'S SCROLL, and its geometry is exact rather
 *  than guessed. A first attempt drew the route as a stretched viewBox with
 *  verticals at 25% and 75%, on the assumption those were the lanes' centres;
 *  measured, every node actually lands within a few pixels of 50%, because the
 *  cards are half-width and the nodes sit on their inner edges. So there is one
 *  spine down the middle, each card reaches it with a connector of a fixed
 *  width, and the node sits on the spine at the card's own vertical centre.
 *  Nothing here can drift with the viewport.
 *
 *  NO PIN. Two sections on this page already take the scroll away to pin
 *  themselves; a third would make the page feel like it is holding the reader
 *  hostage. This scrubs in place instead.
 *
 *  EVERY STAGE IS WRITTEN OUT IN FULL, in order, always on the page.
 *
 *  AND THE SPINE ANSWERS THE POINTER. Pointing at a stage lights its node, runs
 *  its connector out from the spine, fills the rule across the top of the card
 *  and lifts the card off the lane -- so the reader can trace a single stage
 *  from the spine to the words without losing it in a column of six. That is
 *  the only interaction here, and it is the one worth having: the drawing's
 *  whole job is to say which side a stage sits on, so the drawing is what
 *  responds when a stage is picked out. */

export type Stage = { no: string; title: string; body: string };

/** Which lane each stage sits in, read off its own sentence: 0 is the agency,
 *  1 is the client. Only stage four says "Your team". */
const LANE = [0, 0, 0, 1, 0, 0];

export function ProcessLanes({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
  laneOurs,
  laneYours,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  stages: Stage[];
  laneOurs: string;
  laneYours: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.7"] });
  const run = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "Five stages ours, one yours" }}
          className="mb-12"
        />

        {/* Whose lane is whose. */}
        <div aria-hidden className="mb-6 hidden gap-6 lg:grid lg:grid-cols-2">
          {[laneOurs, laneYours].map((name, i) => (
            <p
              key={name}
              className={cn(
                "border-t-2 pt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]",
                i === 0 ? "border-brand text-brand-text" : "border-line text-ash",
              )}
            >
              {name}
            </p>
          ))}
        </div>

        <div ref={ref} className="relative">
          {/* One spine down the middle. The cards hang off it on the side of
              whoever owns the stage, so the single crossing is the one place
              the reading jumps lanes. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line lg:block"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: reduced ? 1 : run }}
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px origin-top -translate-x-1/2 bg-brand lg:block"
          />

          <ol className="relative grid gap-y-6">
            {stages.map((s, i) => {
              const mine = LANE[i] === 0;
              const on = hot === i;
              return (
                <motion.li
                  key={s.no}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  tabIndex={0}
                  className="relative cursor-default outline-none"
                >
                  {/* Card edge to spine, a fixed 2.5rem, so it meets the line
                      exactly at every width. It runs out from the spine when
                      the stage is picked. */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute top-1/2 hidden h-px w-10 transition-[background-color,transform] duration-500 ease-out lg:block",
                      on ? "bg-brand" : "bg-brand/40",
                      mine ? "left-[calc(50%-2.5rem)] origin-right" : "left-1/2 origin-left",
                      on ? "scale-x-100" : "scale-x-[0.82]",
                    )}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand transition-[background-color,transform] duration-500 ease-out lg:block",
                      on ? "scale-150" : "scale-100",
                      mine && !on ? "bg-ink-3" : "bg-brand",
                    )}
                  />

                  <div
                    className={cn(
                      "transition-transform duration-500 ease-out lg:w-[calc(50%-2.5rem)]",
                      mine ? "lg:mr-auto" : "lg:ml-auto",
                      on && (mine ? "lg:-translate-x-1.5" : "lg:translate-x-1.5"),
                    )}
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-2xl border transition-colors duration-500",
                        mine
                          ? "border-line bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)]"
                          : "border-brand/50 bg-[color-mix(in_srgb,var(--color-brand)_8%,transparent)]",
                        on && "border-brand/60",
                      )}
                    >
                      {/* The rule fills from the side the spine is on. */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-brand transition-transform duration-500 ease-out motion-reduce:transition-none",
                          mine ? "origin-right" : "origin-left",
                          on ? "scale-x-100" : "scale-x-0",
                        )}
                      />

                      <div className="flex gap-5 p-6 sm:gap-6 sm:p-7">
                        {/* The stage number, given a plate of its own so the
                            order survives the two-lane split. */}
                        <span
                          aria-hidden
                          className={cn(
                            "font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-[0.9rem] font-extrabold tabular-nums transition-colors duration-500",
                            on
                              ? "border-brand bg-brand text-white"
                              : "border-line bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] text-brand",
                          )}
                        >
                          {s.no}
                        </span>

                        <div className="min-w-0">
                          <p
                            className={cn(
                              "font-display text-[clamp(1.05rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.14] transition-colors duration-300",
                              on ? "text-brand" : "text-snow",
                            )}
                          >
                            {s.title}
                          </p>
                          <p className="mt-3.5 leading-relaxed text-fog">{s.body}</p>

                          {/* The one card that changes lane says so where the
                              lanes themselves are not drawn. */}
                          {!mine && (
                            <p className="mt-5 border-t border-brand/30 pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand lg:hidden">
                              {laneYours}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

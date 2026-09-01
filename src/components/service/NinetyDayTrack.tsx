"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { ProgrammeStage } from "@/content/services/instagram-marketing";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The programme as the schedule the document says it is.
 *
 *  WHY A TRACK. The lede is "a 90-day structure, with content going live inside
 *  week two", and the stages carry their own dates: weeks 3-4, from month 2,
 *  ongoing. That is a calendar, and the previous version threw it away — a
 *  three-column table listed the stages in order and never showed that the
 *  first commitment lands inside a fortnight, which is the most persuasive
 *  thing in the section.
 *
 *  So the dated stages sit on a run, in order, with the week-two milestone
 *  marked where the document puts it, and each stage's deliverable set beneath
 *  it as what closes that span.
 *
 *  WHAT IS AND IS NOT DATED. Stages three, four and the ongoing phase are
 *  labelled with the document's own words. Stages one and two are not: the
 *  document gives them no dates, only the fact that content is live inside week
 *  two, which the milestone marks. They therefore sit before that marker
 *  without claiming a span of their own, and no stage is given a width
 *  proportional to any duration, because the document never states one.
 *
 *  The last stage deliberately has no deliverable and no end. The ongoing phase
 *  does not close, and the run fades out rather than stopping, which says so.
 *
 *  Below the large breakpoint the run is dropped and the stages stack, each
 *  with its date and deliverable inline. Every stage is in the DOM either way. */
export function NinetyDayTrack({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  frame,
  milestone,
  deliverableLabel,
  stages,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lede: string;
  /** "90-day structure", from the lede. */
  frame: string;
  /** "content going live inside week two", from the lede. */
  milestone: string;
  deliverableLabel: string;
  stages: ProgrammeStage[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const play = reduced || inView;

  // Where the milestone sits: after the last stage that carries no date of its
  // own, because those are the ones the document places before week two.
  const undated = stages.filter((s) => !s.when).length;

  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
    >
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lede">
              <p className="font-display text-[clamp(1.15rem,2.1vw,1.7rem)] font-extrabold uppercase leading-[1.18] tracking-tight text-snow">
                {lede}
              </p>
            </Rise>
          }
        />

        {/* The frame, and the one dated commitment inside it. */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-4">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">
            {frame}
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="flex items-center gap-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brand-text">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {milestone}
          </span>
        </div>

        {/* The run. */}
        <ol ref={ref} className="mt-2 lg:grid lg:grid-cols-5 lg:gap-4">
          {stages.map((stage, i) => {
            const open = !stage.deliverable;
            const milestoneHere = i === undated - 1;
            return (
              <li
                key={stage.no}
                className="border-b border-line py-7 lg:border-b-0 lg:py-0 lg:pt-8"
              >
                {/* The rail segment for this stage. */}
                <div aria-hidden className="relative mb-6 hidden h-3 items-center lg:flex">
                  <motion.span
                    initial={reduced ? false : { scaleX: 0 }}
                    animate={play ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
                    className={cn(
                      "h-px w-full origin-left",
                      open
                        ? "bg-gradient-to-r from-brand/50 to-transparent"
                        : "bg-brand/50",
                    )}
                  />
                  <motion.span
                    initial={reduced ? false : { scale: 0 }}
                    animate={play ? { scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: i * 0.09 + 0.1, ease: EASE }}
                    className="absolute left-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand"
                  />
                  {/* Week two lands at the end of the undated stages. */}
                  {milestoneHere && (
                    <motion.span
                      initial={reduced ? false : { scale: 0 }}
                      animate={play ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
                      className="absolute right-0 h-3.5 w-3.5 translate-x-1/2 rounded-full border-2 border-brand bg-ink-3"
                    />
                  )}
                </div>

                {/* When the document says this happens, where it says so. */}
                <p
                  className={cn(
                    "text-[0.65rem] font-semibold uppercase tracking-[0.2em]",
                    stage.when ? "text-brand-text" : "text-ash",
                  )}
                >
                  {stage.when ?? stage.no}
                </p>

                <h3 className="font-display mt-3 text-base font-extrabold uppercase leading-tight tracking-tight text-snow lg:text-[0.95rem] xl:text-base">
                  {stage.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{stage.body}</p>

                {/* What closes the span. */}
                {stage.deliverable ? (
                  <div className="mt-5 border-t border-line pt-4">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ash">
                      {deliverableLabel}
                    </p>
                    <p className="font-display mt-2 text-sm font-bold leading-snug tracking-tight text-snow">
                      {stage.deliverable}
                    </p>
                  </div>
                ) : (
                  // Nothing to hand over: this phase does not close.
                  <div className="mt-5 border-t border-line pt-4">
                    <span aria-hidden className="block h-px w-10 bg-line" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

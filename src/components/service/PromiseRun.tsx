"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { PromiseIcon, type PromiseMark } from "@/components/service/PromiseIcon";
import type { Promise as PromiseItem } from "@/content/services/interview-video";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The nine commitments hung off the run they happen on.
 *
 *  WHERE THE STRUCTURE COMES FROM. The section's own lead supplies it: the
 *  services "cover the preparation, filming and editing needed to turn a
 *  conversation into usable content". Three phases, the document's words, the
 *  document's order.
 *
 *  WHY THIS AND NOT COLUMNS. Three columns of ruled entries is a card grid
 *  without the cards: it groups the nine correctly and then says nothing about
 *  them. These nine are not a taxonomy, they are things that happen in order
 *  along one production, and the reader's real question is when each one
 *  lands. So the section is drawn as the run itself -- a spine down the page,
 *  three phase markers on it, and every commitment hanging off it on its own
 *  leader, alternating sides the way callouts do on a technical drawing.
 *
 *  ALTERNATING IS NOT DECORATION. Nine cards stacked on one side is a list
 *  again; alternating gives the spine something to be the centre of, keeps
 *  each callout on a readable measure, and makes the phase markers legible as
 *  punctuation rather than as three more headings.
 *
 *  THE GROUPING IS EDITORIAL BUT NOT A GUESS. Eight of the nine name their own
 *  phase in their own wording -- "before filming", "the filming process", "We
 *  plan the location, background, lighting, camera angles and sound",
 *  "Editing, colour correction, sound, graphics". Each sits where its own
 *  sentence puts it. The ninth, Arabic and English production, genuinely spans
 *  filming and delivery, so it closes the last phase rather than being forced
 *  somewhere it does not fit. Numbering stays the document's throughout.
 *
 *  Motion is the house pattern: Framer gated on in-view, every initial state
 *  skipped under reduced motion, and the spine grows rather than fading so a
 *  stalled clock still leaves a drawing. */

/** One bespoke mark per commitment, in the document's order. Each is drawn for
 *  its own sentence; see PromiseIcon. */
const MARKS: PromiseMark[] = [
  "brief", //     01 An interview brief before filming
  "questions", // 02 Questions developed around the objective
  "speaker", //   03 Speaker preparation
  "setup", //     04 A suitable interview setup
  "audio", //     05 Professional audio recording
  "broll", //     06 Relevant supporting footage
  "post", //      07 Full-service video post-production
  "versions", //  08 Multiple final versions
  "language", //  09 Arabic and English production
];

/** Which commitments belong to which phase, by index into the document's list. */
const PHASES: { name: string; items: number[] }[] = [
  { name: "Preparation", items: [0, 1, 2] },
  { name: "Filming", items: [3, 4, 5] },
  { name: "Editing", items: [6, 7, 8] },
];

export function PromiseRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: PromiseItem[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const play = reduced || inView;

  /** The phase words are the document's, so they are marked inside its own
   *  sentence rather than invented as headings somewhere else. */
  const marked = () => {
    const terms = PHASES.map((p) => p.name.toLowerCase());
    return lead
      .split(new RegExp(`(${terms.join("|")})`, "gi"))
      .map((part, i) =>
        terms.includes(part.toLowerCase()) ? (
          <span key={i} className="font-semibold text-brand">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      );
  };

  /* One flat running order, so a commitment's side and its delay follow its
     position on the run rather than its position inside a phase. */
  const run = PHASES.flatMap((phase, p) =>
    phase.items.map((idx, j) => ({ phase, p, idx, first: j === 0 })),
  );

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-16"
          aside={
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="leading-relaxed text-fog sm:text-lg"
            >
              {marked()}
            </motion.p>
          }
        />

        <div ref={ref} className="relative">
          {/* The run. Grows from the top as the section arrives; below lg it
              sits at the left edge and every callout hangs to its right. */}
          <motion.span
            aria-hidden
            initial={reduced ? false : { scaleY: 0 }}
            animate={play ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute bottom-0 left-[3px] top-0 w-px origin-top bg-brand/40 lg:left-1/2 lg:-translate-x-1/2"
          />

          <ol className="space-y-8 lg:space-y-3">
            {run.map((entry, n) => {
              const item = items[entry.idx];
              if (!item) return null;
              const right = n % 2 === 1;
              const delay = 0.18 + n * 0.07;

              return (
                <li key={item.title} className="relative">
                  {/* A phase marker punctuates the run where the phase starts:
                      a solid node ON the line with its name beside it. An
                      earlier version centred a pill over the line and masked it
                      with the section's own background, which only holds while
                      this section keeps its current band -- the banding is
                      bottom-anchored, so adding a section anywhere above would
                      flip it and the line would cut through the label. */}
                  {entry.first && (
                    <div className="relative mb-6 flex items-center pl-8 lg:mb-5 lg:pl-0">
                      <motion.span
                        aria-hidden
                        initial={reduced ? false : { scale: 0 }}
                        animate={play ? { scale: 1 } : {}}
                        transition={{ duration: 0.35, delay: delay - 0.1, ease: EASE }}
                        className="absolute left-0 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-brand bg-brand lg:left-1/2"
                      />
                      <motion.span
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={play ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay, ease: EASE }}
                        className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brand lg:absolute lg:left-1/2 lg:ml-5"
                      >
                        {entry.phase.name}
                      </motion.span>
                    </div>
                  )}

                  {/* The callout, on its own leader off the run. */}
                  <div
                    className={cn(
                      "relative pl-8 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:pl-0",
                    )}
                  >
                    {/* The leader. Horizontal from the spine to the card. */}
                    <motion.span
                      aria-hidden
                      initial={reduced ? false : { scaleX: 0 }}
                      animate={play ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.4, delay: delay + 0.05, ease: EASE }}
                      className={cn(
                        "absolute top-6 h-px bg-brand/40",
                        "left-0 w-8 origin-left",
                        right
                          ? "lg:left-1/2 lg:w-16 lg:origin-left"
                          : "lg:left-auto lg:right-1/2 lg:w-16 lg:origin-right",
                      )}
                    />
                    {/* The node where the leader meets the run. */}
                    <motion.span
                      aria-hidden
                      initial={reduced ? false : { scale: 0 }}
                      animate={play ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: delay + 0.05, ease: EASE }}
                      className="absolute left-0 top-6 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand lg:left-1/2"
                    />

                    <motion.div
                      initial={reduced ? false : { opacity: 0, x: 0, y: 16 }}
                      animate={play ? { opacity: 1, x: 0, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: delay + 0.1, ease: EASE }}
                      tabIndex={0}
                      className={cn(
                        "group rounded-2xl border border-line bg-ink-3 p-6 outline-none transition-colors duration-500 hover:border-brand/50 focus-visible:border-brand/50 focus-visible:ring-2 focus-visible:ring-brand/40",
                        right ? "lg:col-start-2 lg:ml-16" : "lg:col-start-1 lg:mr-16",
                      )}
                    >
                      <div className="flex items-start gap-4">
                        {/* This commitment's own mark. Brand only on approach,
                            so nine cards at rest are not nine alarms. */}
                        <span className="shrink-0 text-fog/60 transition-colors duration-500 group-hover:text-brand group-focus-visible:text-brand">
                          <PromiseIcon mark={MARKS[entry.idx]} />
                        </span>
                        <div className="min-w-0">
                          <p className="flex items-baseline gap-3">
                            <span
                              aria-hidden
                              className="font-display shrink-0 text-[0.6875rem] font-bold tabular-nums text-brand/55"
                            >
                              {String(entry.idx + 1).padStart(2, "0")}
                            </span>
                            <span className="font-display text-[1.02rem] font-extrabold uppercase leading-[1.2] text-snow">
                              {item.title}
                            </span>
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-fog">{item.body}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

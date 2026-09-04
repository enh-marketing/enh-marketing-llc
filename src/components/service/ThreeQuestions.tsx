"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Nine measures, sorted by the three questions the section's own lead asks.
 *
 *  THE LEAD IS A SORTING INSTRUCTION AND EVERY VERSION OF THIS SECTION HAD READ
 *  IT AS A SENTENCE. "Website analytics help us understand where visitors come
 *  from, what they do and where the journey becomes difficult." Three
 *  questions. And every one of the nine rows answers exactly one of them: two
 *  say where people came from, four say what they did, three say where it went
 *  wrong. That structure has been sitting in the copy the whole time, and a
 *  nine-row table, an instrument bank and a journey diagram all managed to hide
 *  it.
 *
 *  SO THE LEAD IS THE LAYOUT. It runs whole above the columns, and its three
 *  clauses, split at the document's own commas, are what heads them; read the
 *  columns left to right and the sentence is back in the same order. The nine sort themselves underneath, and the shape of
 *  the sort is itself information: most of what analytics reports is about what
 *  people did, and the smallest group is the one that tells you where they
 *  came from.
 *
 *  EVERY ROW SHOWS BOTH HALVES AT ONCE. The measure and what it tells you are
 *  the two columns of the source's own table, and hiding the second half behind
 *  a hover -- which the last two attempts did -- means the reader has to work to
 *  find out what any of it means. Nine short readings fit; they should just be
 *  on the page.
 *
 *  NOTHING IS QUANTIFIED. No counts, no rates, no funnel: this document gives
 *  one figure and it is about years of experience.
 *
 *  MOTION. Columns arrive left to right, rows stagger down inside them.
 *  Transform only; everything rests readable. */

export type Signal = { track: string; tells: string; q: number };

export function ThreeQuestions({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  questions,
  rows,
  headTells,
  note,
  noteMark,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  questions: string[];
  rows: Signal[];
  headTells: string;
  note: string;
  noteMark: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<string | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-10"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        <div ref={ref} className="grid gap-px border-t border-line bg-line lg:grid-cols-3">
          {questions.map((question, q) => {
            const group = rows.filter((r) => r.q === q);
            return (
              <motion.div
                key={question}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: q * 0.12, ease: EASE }}
                className="bg-ink-3 px-6 pb-8 pt-7 sm:px-8"
              >
                {/* One third of the lead. Read the three across and the
                    sentence is back. */}
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="font-display mt-1 shrink-0 text-[0.6875rem] font-bold tabular-nums text-brand"
                  >
                    {String(q + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[clamp(1.05rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.14] text-brand">
                    {question}
                  </p>
                </div>

                {/* How much of the reporting answers this one. */}
                <div aria-hidden className="mt-5 flex gap-1.5">
                  {rows.map((_, k) => (
                    <span
                      key={k}
                      className={cn(
                        "block h-1 flex-1 rounded-full transition-colors duration-500",
                        k < group.length ? "bg-brand/70" : "bg-line",
                      )}
                    />
                  ))}
                </div>

                <p className="mt-7 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                  {headTells}
                </p>

                <ul className="mt-4">
                  {group.map((r, i) => {
                    const on = hot === r.track;
                    return (
                      <li
                        key={r.track}
                        onMouseEnter={() => setHot(r.track)}
                        onMouseLeave={() => setHot(null)}
                        onFocus={() => setHot(r.track)}
                        onBlur={() => setHot(null)}
                        tabIndex={0}
                        className={cn(
                          "relative cursor-default border-b border-line py-4 pl-5 outline-none transition-colors duration-400 last:border-b-0",
                          on && "bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)]",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "pointer-events-none absolute inset-y-2 left-0 w-[2px] origin-center bg-brand transition-transform duration-400 ease-out",
                            on ? "scale-y-100" : "scale-y-0",
                          )}
                        />
                        <motion.div
                          initial={reduced ? false : { opacity: 0, x: -10 }}
                          animate={play ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: q * 0.12 + 0.2 + i * 0.06, ease: EASE }}
                        >
                          <p
                            className={cn(
                              "font-display text-[0.95rem] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                              on ? "text-brand" : "text-snow",
                            )}
                          >
                            {r.track}
                          </p>
                          <p className="mt-2 text-[0.875rem] leading-relaxed text-fog">{r.tells}</p>
                        </motion.div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <Rise delay={0.12}>
          <p className="mt-10 max-w-4xl border-l-2 border-brand pl-6 leading-relaxed text-fog sm:text-lg">
            <Marked text={note} mark={noteMark} />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

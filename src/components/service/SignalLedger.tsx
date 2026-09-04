"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** What is tracked, and what each thing tells you.
 *
 *  THE CONTENT IS ALREADY A LEDGER, so the design problem is not what shape to
 *  give it but how to stop it reading as a spreadsheet. Two things do that
 *  here. First, the tracked signal is set at heading weight and its reading is
 *  set as a sentence, because they are not two columns of equal value: one is
 *  an instrument, the other is what the instrument means. Second, a rail runs
 *  down the left and fills with the page's own scroll, so the eight arrive as
 *  a run rather than sitting there as a table.
 *
 *  NOTHING IS QUANTIFIED. Every row is a name and a meaning; no position, no
 *  volume, no figure appears, because this document states none and its own
 *  FAQ position is that a ranking cannot be promised.
 *
 *  THE SECTION ENDS ON THE SENTENCE THE WHOLE PAGE TURNS ON. "Relevance
 *  matters more than exposure alone" is the argument the hero opens with, and
 *  it is marked in place inside the note the document closes this section with.
 *
 *  MOTION. The rail is scroll-scrubbed the way Process does it on the homepage;
 *  the rows arrive on in-view with a stagger. Transform only. */

export type Signal = { track: string; tells: string };

export function SignalLedger({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  rows,
  headTrack,
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
  rows: Signal[];
  headTrack: string;
  headTells: string;
  note: string;
  noteMark: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.65"] });
  const run = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        <div ref={ref} className="relative pl-6 sm:pl-10">
          {/* The rail, filled by the reader's own scroll. */}
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduced ? 1 : run }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-brand"
          />

          {/* The document's own column headings, kept: they are what turns two
              runs of text into an instrument and its reading. */}
          <div className="grid gap-x-10 border-b border-line pb-3 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
              {headTrack}
            </p>
            <p className="hidden text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text lg:block">
              {headTells}
            </p>
          </div>

          <ol>
            {rows.map((r, i) => {
              const on = hot === i;
              return (
                <motion.li
                  key={r.track}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  tabIndex={0}
                  className={cn(
                    "relative grid cursor-default gap-x-10 gap-y-2 border-b border-line py-6 outline-none",
                    "lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-baseline",
                  )}
                >
                  {/* The node this signal hangs off the rail by. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-[2.15rem] h-2 w-2 rounded-full transition-transform duration-500 ease-out",
                      "-left-6 sm:-left-10",
                      on ? "scale-150 bg-brand" : "scale-100 bg-line",
                    )}
                    style={{ marginLeft: "-3.5px" }}
                  />
                  <p
                    className={cn(
                      "font-display text-[clamp(1rem,1.7vw,1.22rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                      on ? "text-brand" : "text-snow",
                    )}
                  >
                    {r.track}
                  </p>
                  <p className="leading-relaxed text-fog">{r.tells}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <Rise delay={0.12}>
          <p className="font-display mt-12 max-w-5xl text-[clamp(1.2rem,2.8vw,2.1rem)] font-extrabold uppercase leading-[1.12] text-snow">
            <Marked text={note} mark={noteMark} />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

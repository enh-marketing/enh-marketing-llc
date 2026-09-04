"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Nine measures, and the reading of whichever one you are looking at.
 *
 *  THE NOTE IS THE SECTION'S ARGUMENT, NOT ITS FOOTNOTE. "A campaign built for
 *  enquiries should not be judged mainly on likes." That is a warning against
 *  reading one number in isolation, and a nine-row table invites exactly that:
 *  every measure the same size, all nine on screen at once, nothing saying what
 *  any of them is for.
 *
 *  SO ONE READING AT A TIME. The nine are a bank you can take in at a glance --
 *  that is the instrument panel -- and the reading gets the whole width and a
 *  size you can actually read. The reader chooses which one; nothing here
 *  decides for them.
 *
 *  NO FIGURES ANYWHERE. Every reading is a sentence about what a measure means.
 *  This document contains one number in total and it is about years of
 *  experience, so nothing on this page is charted or counted.
 *
 *  ALL NINE READINGS ARE IN THE MARKUP, stacked in one cell so the panel never
 *  resizes as the reader moves across the bank.
 *
 *  MOTION. The reading lifts as it changes; the chip fills. Transform only, and
 *  the reading that renders first is never at zero opacity. */

export type Signal = { track: string; tells: string };

export function MeasureBank({
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
  const [active, setActive] = useState(0);

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

        {/* The instrument panel. */}
        <p className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
          {headTrack}
        </p>
        <ul className="flex flex-wrap gap-2.5">
          {rows.map((r, i) => {
            const on = active === i;
            return (
              <li key={r.track}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-controls={`${id}-reading`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "font-display flex items-center gap-3 rounded-full border px-5 py-3 text-[0.85rem] font-extrabold uppercase leading-none outline-none transition-colors duration-400",
                    on
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)] text-snow hover:border-brand/45 hover:text-brand",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn("text-[0.6875rem] tabular-nums", on ? "text-white/70" : "text-brand/45")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r.track}
                </button>
              </li>
            );
          })}
        </ul>

        {/* The reading. */}
        <p className="mb-5 mt-12 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
          {headTells}
        </p>
        <div
          id={`${id}-reading`}
          className="grid rounded-[1.25rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-7 sm:p-10"
        >
          {rows.map((r, i) => {
            const on = active === i;
            return (
              <motion.p
                key={r.track}
                aria-hidden={!on}
                initial={false}
                animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={cn(
                  "font-display col-start-1 row-start-1 max-w-4xl text-[clamp(1.15rem,2.6vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow",
                  !on && "pointer-events-none",
                )}
              >
                {r.tells}
              </motion.p>
            );
          })}
        </div>

        <Rise delay={0.12}>
          <p className="mt-12 max-w-4xl border-l-2 border-brand pl-6 text-[clamp(1rem,1.8vw,1.15rem)] leading-relaxed text-fog">
            <Marked text={note} mark={noteMark} />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

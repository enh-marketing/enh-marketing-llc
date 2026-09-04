"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The page's argument, run in the order the document argues it.
 *
 *  THE CLAIM IS A REVERSAL: the plan "should state what needs to be delivered,
 *  rather than simply asking the crew to film everything". So the section reads
 *  backwards from the deliverables, which is the whole point, and the three
 *  worked examples are what make it land -- three events, three different
 *  lists, and none of them is a longer version of another. Set as three
 *  paragraphs side by side that difference is invisible; set as three lists
 *  against each other it is the first thing you see.
 *
 *  THEN WHAT IT CHANGES. The consequence sentence names four things the choice
 *  moves, at the document's own commas, and they are drawn as the four dials
 *  the deliverables actually turn. The second consequence sentence is about
 *  timing rather than setup and is kept whole underneath rather than forced
 *  into the same row.
 *
 *  AND THEN WHAT ONE EVENT CAN PRODUCE: eight outputs, with the document's own
 *  caveat that the exact number, length and format is stated before the day.
 *  The eight are a menu, not a promise, so nothing here is ticked, filled or
 *  totalled.
 *
 *  NO CAMERA COUNT. The four dials are named and never numbered: this document
 *  refuses to fix a camera count anywhere and the drawing must not imply one.
 *
 *  MOTION. The three cases arrive together, then the dials, then the outputs.
 *  Pointing at a case lifts it. Transform only. */

export function DeliverableFirst({
  id,
  label,
  index,
  title,
  strokeTitle,
  claim,
  cases,
  consequenceLead,
  affects,
  consequenceAlso,
  outputsLead,
  outputs,
  outputsTail,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  claim: string;
  cases: { lead: string; items: string[] }[];
  consequenceLead: string;
  affects: string[];
  consequenceAlso: string;
  outputsLead: string;
  outputs: string[];
  outputsTail: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "One event, eight deliverables" }}
          className="mb-12"
        />

        <div ref={ref}>
          <motion.p
            initial={reduced ? false : { y: 20 }}
            animate={play ? { y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-display statement max-w-4xl font-extrabold uppercase leading-[1.12] text-snow"
          >
            {claim}
          </motion.p>

          {/* Three events, three different lists. */}
          <ol className="mt-12 grid gap-5 lg:grid-cols-3">
            {cases.map((c, i) => {
              const on = hot === i;
              return (
                <motion.li
                  key={c.lead}
                  initial={reduced ? false : { opacity: 0, y: 22 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.12 + i * 0.1, ease: EASE }}
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  tabIndex={0}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-2xl border p-6 outline-none transition-[border-color,transform] duration-500 ease-out sm:p-7",
                    on
                      ? "-translate-y-1 border-brand/50 bg-[color-mix(in_srgb,var(--color-brand)_6%,transparent)]"
                      : "border-line bg-[color-mix(in_srgb,var(--color-brand)_2%,transparent)]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left bg-brand transition-transform duration-500 ease-out",
                      on ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  <p
                    className={cn(
                      "font-display text-[clamp(1rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                      on ? "text-brand" : "text-snow",
                    )}
                  >
                    {c.lead}
                  </p>

                  {/* What that event's list actually is. */}
                  <ul className="mt-6 space-y-3">
                    {c.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden
                          className={cn(
                            "mt-[0.45rem] block h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500",
                            on ? "bg-brand" : "bg-brand/45",
                          )}
                        />
                        <span className="text-[0.9375rem] leading-snug text-fog">{item}</span>
                      </li>
                    ))}
                    {/* The list stops where this event's list stops. */}
                    {Array.from({ length: 3 - c.items.length }, (_, k) => (
                      <li key={`pad${k}`} aria-hidden className="flex gap-3">
                        <span className="mt-[0.45rem] block h-1.5 w-1.5 shrink-0 rounded-full border border-line" />
                        <span className="block h-3 w-1/3 rounded-full bg-line/40" />
                      </li>
                    ))}
                  </ul>
                </motion.li>
              );
            })}
          </ol>

          {/* And what those choices move. */}
          <div className="mt-14">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
              {consequenceLead}
            </p>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {affects.map((a, i) => (
                <motion.li
                  key={a}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08, ease: EASE }}
                  className="rounded-xl border border-line bg-ink-3 p-5"
                >
                  <span
                    aria-hidden
                    className="font-display block text-[0.6875rem] font-bold tabular-nums text-brand/40"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display mt-4 text-[clamp(0.95rem,1.6vw,1.12rem)] font-extrabold uppercase leading-[1.14] text-snow">
                    {a}
                  </p>
                </motion.li>
              ))}
            </ol>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
              className="mt-8 max-w-3xl leading-relaxed text-fog sm:text-lg"
            >
              {consequenceAlso}
            </motion.p>
          </div>

          {/* What one event can produce. */}
          <div className="mt-14 rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-9">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
              {outputsLead}
            </p>
            <ol className="mt-6 grid gap-x-8 gap-y-px sm:grid-cols-2">
              {outputs.map((o, i) => (
                <motion.li
                  key={o}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  animate={play ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.55 + i * 0.05, ease: EASE }}
                  className="flex items-baseline gap-4 border-b border-line py-3.5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <span
                    aria-hidden
                    className="font-display shrink-0 text-[0.6875rem] font-bold tabular-nums text-brand/45"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-snow">{o}</span>
                </motion.li>
              ))}
            </ol>
            <p className="mt-7 max-w-3xl border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-ash">
              {outputsTail}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

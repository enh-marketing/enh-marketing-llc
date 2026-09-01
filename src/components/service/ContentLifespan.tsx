"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Usage rights, drawn as the thing the section is actually about: length.
 *
 *  WHY THIS SHAPE. The heading is "How We Give Every Post a Longer Life", and
 *  the argument underneath it is a comparison of two lifespans. Without rights,
 *  the contract "only covers its original publication" — the content publishes
 *  once and stops. With rights, the same asset keeps working across five more
 *  places. That is a difference in extent, and extent is a thing you can see.
 *
 *  The previous version set both halves as columns of prose side by side, which
 *  stated the comparison without ever showing it. Here the two tracks share a
 *  start and an axis, so the short one visibly stops while the long one carries
 *  on — the reader gets the argument before reading a word of it.
 *
 *  WHAT THE TRACKS DO NOT CLAIM. There is no time axis, no durations and no
 *  scale. The document says the contract fixes a duration but never says what
 *  it is, so the second track is longer only in the sense of carrying more
 *  destinations — which is exactly what the source supports. The terminator on
 *  the first track is a full stop, not a date.
 *
 *  Below the large breakpoint the tracks stack and the destinations become a
 *  plain numbered list, because a horizontal run of five labelled nodes is
 *  unreadable on a phone. Every destination is in the DOM either way. */
export function ContentLifespan({
  id,
  label,
  index,
  title,
  strokeTitle,
  problemLead,
  problem,
  originalOnly,
  remedy,
  destinationsLead,
  destinations,
  termsLead,
  terms,
  closing,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  problemLead: string;
  problem: string;
  /** A substring of `problem`: the clause that defines the short life. */
  originalOnly: string;
  remedy: string;
  destinationsLead: string;
  destinations: string[];
  termsLead: string;
  terms: string[];
  closing: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const play = reduced || inView;

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
            <Rise key="problem">
              <p className="font-display text-[clamp(1.15rem,2.1vw,1.65rem)] font-extrabold uppercase leading-[1.18] tracking-tight text-snow">
                {problemLead}
              </p>
              <p className="mt-5 leading-relaxed text-fog">{problem}</p>
            </Rise>
          }
        />

        <div ref={ref} className="mt-2">
          {/* Track one: publishes, stops. */}
          <div className="border-t border-line py-8">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,13rem)_1fr] lg:items-center lg:gap-10">
              <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-ash">
                {originalOnly}
              </p>

              <div aria-hidden className="relative flex items-center">
                <span className="h-3 w-3 shrink-0 rounded-full border-2 border-ash bg-ink-3" />
                <motion.span
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={play ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="h-px w-16 origin-left bg-line sm:w-24"
                />
                {/* The stop. */}
                <motion.span
                  initial={reduced ? false : { opacity: 0, scaleY: 0 }}
                  animate={play ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
                  className="h-5 w-0.5 shrink-0 bg-ash"
                />
              </div>
            </div>
          </div>

          {/* Track two: the same asset, still working. */}
          <div className="border-y border-line py-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-10">
              <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-brand-text">
                {destinationsLead}
              </p>

              <div>
                {/* Desktop: one continuing run with a node per destination. */}
                <div aria-hidden className="hidden lg:block">
                  <div className="relative flex items-center">
                    <span className="h-3 w-3 shrink-0 rounded-full border-2 border-brand bg-brand" />
                    <motion.span
                      initial={reduced ? false : { scaleX: 0 }}
                      animate={play ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                      className="h-px flex-1 origin-left bg-brand/50"
                    />
                    {destinations.map((dest, i) => (
                      <span key={dest} className="flex flex-1 items-center">
                        <motion.span
                          initial={reduced ? false : { scale: 0 }}
                          animate={play ? { scale: 1 } : {}}
                          transition={{ duration: 0.35, delay: 0.3 + i * 0.1, ease: EASE }}
                          className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand"
                        />
                        {i < destinations.length - 1 && (
                          <motion.span
                            initial={reduced ? false : { scaleX: 0 }}
                            animate={play ? { scaleX: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.35 + i * 0.1, ease: EASE }}
                            className="h-px flex-1 origin-left bg-brand/50"
                          />
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Labels, alternating above and below so five long strings
                      can share one axis without colliding. */}
                  <ol className="mt-5 grid grid-cols-5 gap-x-4">
                    {destinations.map((dest, i) => (
                      <li key={dest}>
                        <motion.span
                          initial={reduced ? false : { opacity: 0, y: 8 }}
                          animate={play ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.45, delay: 0.4 + i * 0.1, ease: EASE }}
                          className="block text-sm font-semibold leading-snug text-snow"
                        >
                          {dest}
                        </motion.span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Below lg: the same five as a list. */}
                <ol className="lg:hidden">
                  {destinations.map((dest, i) => (
                    <li key={dest} className="flex items-baseline gap-4 border-t border-line py-3.5 first:border-t-0 first:pt-0">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-xs font-bold tabular-nums tracking-[0.1em] text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base font-bold leading-snug tracking-tight text-snow">
                        {dest}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* What makes the difference, and the four things it fixes. */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <Rise>
            <p className="border-l-2 border-brand pl-6 leading-relaxed text-snow sm:pl-7 sm:text-lg">
              {remedy}
            </p>
          </Rise>

          <Rise delay={0.08}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">
              {termsLead}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {terms.map((term) => (
                <li
                  key={term}
                  className="rounded-full border border-line bg-ink-2 px-4 py-2 text-xs font-semibold text-snow transition-colors duration-500 hover:border-brand/50"
                >
                  {term}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-fog">{closing}</p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

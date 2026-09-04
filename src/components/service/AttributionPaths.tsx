"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Measurement, drawn as two journeys: one that joins up and one that does not.
 *
 *  WHY THIS SHAPE. The document is unusually candid here, and the candour is
 *  the most valuable thing on the page: some actions connect to the brand
 *  visibly, and some journeys cannot be followed at all. It even supplies the
 *  example — an Instagram Story on Monday, a search on Thursday, and "most
 *  platform reports will never connect those two actions".
 *
 *  That is a severed path. The previous version put it in a bordered box as a
 *  paragraph, which is the one treatment guaranteed to make an honest admission
 *  look like filler. Here the break is the picture: three actions arrive at the
 *  brand along solid lines, and beneath them two real events sit either side of
 *  a gap that is drawn, labelled and deliberately never closed.
 *
 *  Putting the unmeasurable half at equal weight is the point. A page that drew
 *  only the trackable actions would be doing exactly what the section warns
 *  against — reporting the easy numbers and calling it an answer.
 *
 *  Both paths are splits of the document's own sentences; the full sentences
 *  remain in the content file and reconstruct word for word from these parts.
 *  Nothing here invents an action, a channel or a day of the week. */
export function AttributionPaths({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  visibleLabel,
  visibleLead,
  visibleActor,
  visibleActions,
  visibleTail,
  hiddenLabel,
  hiddenLead,
  hiddenActor,
  hiddenPath,
  hiddenTail,
  verdict,
  signalsLead,
  signals,
  closing,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lede: string;
  visibleLabel: string;
  visibleLead: string;
  /** The subject of the source sentence, so the split loses no words. */
  visibleActor: string;
  /** Three actions that connect to the brand. */
  visibleActions: string[];
  visibleTail: string;
  hiddenLabel: string;
  hiddenLead: string;
  hiddenActor: string;
  /** Two events with nothing joining them. */
  hiddenPath: string[];
  hiddenTail: string;
  verdict: string;
  signalsLead: string;
  signals: string[];
  closing: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const play = reduced || inView;

  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip py-14 sm:py-16"
    >
      {/* Fine grid, fading from the side the broken path sits on. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 25% 75%, black, transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lede">
              <p className="leading-relaxed text-fog sm:text-lg">{lede}</p>
            </Rise>
          }
        />

        <div ref={ref}>
          {/* The journey that joins up. */}
          <div className="border-t border-line py-9">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-10">
              <div>
                <p className="text-xs font-semibold uppercase text-brand-text">
                  {visibleLabel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fog">{visibleLead}</p>
              </div>

              <div>
                <p className="mb-4 text-[0.65rem] font-semibold uppercase text-brand-text">
                  {visibleActor}
                </p>
                <ol className="grid gap-3 sm:grid-cols-3">
                  {visibleActions.map((action, i) => (
                    <li key={action} className="relative">
                      <motion.div
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        animate={play ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45, delay: i * 0.09, ease: EASE }}
                        className="flex h-full items-center gap-3 rounded-xl border border-brand/40 bg-brand/[0.06] px-4 py-3.5"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
                        <span className="text-sm font-semibold leading-snug text-snow">
                          {action}
                        </span>
                      </motion.div>
                    </li>
                  ))}
                </ol>

                {/* All three arrive. */}
                <div aria-hidden className="mt-3 flex items-center gap-3">
                  <motion.span
                    initial={reduced ? false : { scaleX: 0 }}
                    animate={play ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                    className="h-px flex-1 origin-left bg-brand/50"
                  />
                  <span className="text-[0.65rem] font-semibold uppercase text-brand-text">
                    {visibleTail}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* The journey that does not. */}
          <div className="border-y border-line py-9">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,11rem)_1fr] lg:gap-10">
              <div>
                <p className="text-xs font-semibold uppercase text-ash">
                  {hiddenLabel}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fog">{hiddenLead}</p>
              </div>

              <div>
                <p className="mb-4 text-[0.65rem] font-semibold uppercase text-ash">
                  {hiddenActor}
                </p>
                <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
                  <motion.div
                    initial={reduced ? false : { opacity: 0, x: -12 }}
                    animate={play ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex items-center gap-3 rounded-xl border border-line bg-ink-2 px-4 py-3.5"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-fog" />
                    <span className="text-sm font-semibold leading-snug text-snow">
                      {hiddenPath[0]}
                    </span>
                  </motion.div>

                  {/* The gap. Drawn, never closed. */}
                  <div
                    aria-hidden
                    className="flex items-center justify-center gap-1.5 px-2 py-2 sm:flex-col sm:px-4"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        initial={reduced ? false : { opacity: 0 }}
                        animate={play ? { opacity: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.35 + i * 0.08, ease: EASE }}
                        className="h-1 w-1 rounded-full bg-ash"
                      />
                    ))}
                  </div>

                  <motion.div
                    initial={reduced ? false : { opacity: 0, x: 12 }}
                    animate={play ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                    className="flex items-center gap-3 rounded-xl border border-line bg-ink-2 px-4 py-3.5"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-fog" />
                    <span className="text-sm font-semibold leading-snug text-snow">
                      {hiddenPath[1]}
                    </span>
                  </motion.div>
                </div>

                <p className="mt-4 text-[0.65rem] font-semibold uppercase text-ash">
                  {hiddenTail}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The document's own resolution of the two. */}
        <Rise delay={0.12} className="mt-10">
          <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.16] text-snow">
            {verdict}
          </p>
        </Rise>

        {/* What can be tracked. */}
        <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-14">
          <Rise>
            <p className="text-[0.65rem] font-semibold uppercase text-ash">
              {signalsLead}
            </p>
          </Rise>

          <div>
            <ul className="flex flex-wrap gap-2.5">
              {signals.map((signal) => (
                <li
                  key={signal}
                  className="rounded-full border border-line bg-ink-2 px-4 py-2 text-xs font-semibold text-snow transition-colors duration-500 hover:border-brand/50"
                >
                  {signal}
                </li>
              ))}
            </ul>
            <Rise delay={0.1}>
              <p className="mt-7 max-w-4xl leading-relaxed text-fog">{closing}</p>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
}

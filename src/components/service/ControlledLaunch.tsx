"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Stage } from "@/content/services/conversational-ai";

const EASE = [0.16, 1, 0.3, 1] as const;
/** The profile's two levels and its midpoint, in viewBox units, so the stations
 *  can be placed on the line rather than beside it. */
const FLAT = 92;
const RISEN = 24;
const MID = (FLAT + RISEN) / 2;

/** The project, drawn around the step the document singles out.
 *
 *  ONE STEP IS NOT LIKE THE OTHERS. Five of the six are ordinary project stages.
 *  The fifth is a claim: "The agent is introduced gradually where necessary."
 *  That is the sentence a cautious customer service manager is looking for, and
 *  in a plain numbered run it is invisible, sitting fifth out of six in the same
 *  box as the rest.
 *
 *  So the run is drawn as how much of the conversation the agent is carrying.
 *  Nothing before the launch, a ramp through it, and an open, unresolved line
 *  afterwards, because the sixth step never ends: "we monitor the agent, review
 *  failed or escalated conversations, and update its knowledge as the business
 *  changes."
 *
 *  NO SCALE, NO NUMBERS. The ramp has no axis and no percentage on it. The
 *  document gives no volumes and no timeline, and a curve with figures against
 *  it would be inventing both. The shape carries "gradually"; that is all it is
 *  asked to carry.
 *
 *  The profile is one SVG with preserveAspectRatio="none", which is safe here
 *  because it holds no radii and no text: every label is HTML positioned over
 *  it, so nothing distorts and nothing drops below the type floor. */
export function ControlledLaunch({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
  rampAt,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  stages: Stage[];
  /** Zero-based index of the step whose own sentence says "gradually". */
  rampAt: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;

  const n = stages.length;
  /** Column centres, as fractions of the run. */
  const at = (i: number) => (i + 0.5) / n;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "Nothing, then gradually, then always" }}
          className="mb-12"
        />

        <div ref={ref}>
          {/* The profile. Hidden below lg, where six columns cannot be read
              and a ramp across 340px says nothing. */}
          <div className="relative hidden h-32 lg:block" aria-hidden>
            <svg
              viewBox="0 0 600 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              {/* Flat while the agent is not live, a ramp through the
                  controlled launch, and level but open afterwards. The ramp
                  starts at the station before the launch and finishes at the
                  one after it, so the launch station sits on its rise.
                  NOT pathLength-animated: a dashed path under
                  vector-effect: non-scaling-stroke is measured by Chromium in
                  screen pixels, and any path longer than 100px then renders as
                  a dash, a gap and a stub. See DESIGN.md. The stations carry
                  the motion instead. */}
              <path
                d={`M0 ${FLAT} H${at(rampAt - 1) * 600} C${at(rampAt - 1) * 600 + 50} ${FLAT} ${at(rampAt + 1) * 600 - 50} ${RISEN} ${at(rampAt + 1) * 600} ${RISEN} H600`}
                stroke="var(--color-brand)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={`M0 ${FLAT} H600`}
                stroke="var(--color-line)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Stations. HTML, so the labels keep their real size whatever the
                viewBox is stretched to. */}
            {stages.map((s, i) => (
              <motion.div
                key={s.no}
                className="absolute -translate-x-1/2"
                style={{
                  left: `${at(i) * 100}%`,
                  /* On the line: level before the launch, mid-rise at it,
                     level again after. Minus half the dot. */
                  top: `calc(${(i < rampAt ? FLAT : i === rampAt ? MID : RISEN)}% - 5px)`,
                }}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={show ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.45, ease: EASE, delay: 0.25 + i * 0.11 }}
              >
                <span
                  className={`mx-auto block h-2.5 w-2.5 rounded-full ${
                    i === rampAt ? "bg-brand" : "border-2 border-brand bg-void"
                  }`}
                />
              </motion.div>
            ))}
          </div>

          {/* The six, in reading order, under the profile they belong to. */}
          <ol className="grid border-t border-line lg:grid-cols-3">
            {stages.map((s, i) => (
              <motion.li
                key={s.no}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE, delay: Math.min(i * 0.06, 0.4) }}
                className={`group border-b border-line py-6 pr-8 transition-colors duration-500 hover:bg-ink-2 ${
                  i === rampAt ? "bg-ink-2" : ""
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={`font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 ${
                      i === rampAt ? "text-brand-text" : "text-ash group-hover:text-brand-text"
                    }`}
                  >
                    {s.no}
                  </span>
                  <span className="font-display text-[0.9375rem] font-bold uppercase leading-tight text-snow sm:text-base">
                    {s.title}
                  </span>
                </div>
                <p className="mt-3 max-w-[46ch] pl-7 text-[0.9375rem] leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow">
                  {s.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

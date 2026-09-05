"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";


/** The monthly service, drawn as the position it occupies.
 *
 *  THE REASON IS IN THE DOCUMENT AND IT IS A SANDWICH. Two sentences give the
 *  whole justification, and they point in opposite directions: "Customer
 *  questions, services, prices and internal responsibilities can change after
 *  launch" is your side moving, and "Messaging platforms, AI models and
 *  connected systems can also be updated" is the other side moving. The agent is
 *  the only thing between them, and it is the thing that breaks when either
 *  moves.
 *
 *  So the section is set as exactly that: your ground above, the platforms'
 *  ground below, and the ten things the service does holding the middle. A run
 *  of ten bullets between two paragraphs would state the same facts and show
 *  none of the pressure.
 *
 *  BOTH GROUNDS DRIFT, SLOWLY AND FOREVER. The two edges carry a slow travelling
 *  hairline in opposite directions, which is the one honest thing to animate
 *  here: nothing is counted, nothing is timed, and the movement never resolves
 *  because the document says it never does. Under reduced motion the hairlines
 *  rest and the section reads as three fixed bands. */
export function AgentWatch({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  drift,
  closing,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lead: string;
  intro: string;
  items: string[];
  drift: { yours: string; theirs: string; why: string };
  closing: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Both sides move" }}
          className="mb-12"
        />

        <Rise>
          <p className="font-display max-w-[26ch] text-[clamp(1.15rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.15] text-snow">
            {lead}
          </p>
        </Rise>

        <div className="mt-12">
          {/* Your ground. */}
          <Edge text={drift.yours} reduced={reduced} direction={1} />

          {/* What holds the middle. */}
          <Rise delay={0.06}>
            <div className="my-3 rounded-[1.25rem] border-2 border-brand/45 bg-ink-3 p-6 sm:p-8">
              <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text">
                {intro}
              </p>
              <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {items.map((entry) => (
                  <li key={entry} className="flex items-baseline gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span className="text-[0.9375rem] leading-snug text-snow">{entry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Rise>

          {/* Their ground. */}
          <Edge text={drift.theirs} reduced={reduced} direction={-1} />
        </div>

        <Rise delay={0.12} className="mt-12 grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <p className="font-display max-w-[30ch] text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.15] text-brand">
            {drift.why}
          </p>
          <p className="max-w-[62ch] text-base leading-relaxed text-fog">{closing}</p>
        </Rise>
      </Container>
    </section>
  );
}

/** One of the two grounds that will not hold still. */
function Edge({
  text,
  reduced,
  direction,
}: {
  text: string;
  reduced: boolean;
  direction: 1 | -1;
}) {
  return (
    <Rise>
      <div className="relative overflow-hidden rounded-xl border border-line bg-ink-2 px-5 py-4 sm:px-7">
        <p className="relative max-w-[70ch] text-[0.9375rem] leading-snug text-fog">{text}</p>
        {/* The drift itself: a hairline that never arrives anywhere. */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-ash/60 to-transparent"
          style={{ [direction === 1 ? "bottom" : "top"]: 0 } as React.CSSProperties}
          initial={{ x: direction === 1 ? "-60%" : "60%" }}
          animate={reduced ? { x: 0 } : { x: direction === 1 ? "60%" : "-60%" }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 7, ease: "linear", repeat: Infinity, repeatType: "reverse" }
          }
        />
      </div>
    </Rise>
  );
}

"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/** What the platforms record, and the point where the inference breaks.
 *
 *  WHAT THIS SECTION IS ACTUALLY ABOUT. Not a list of metrics. The document
 *  spends one sentence naming what can be reported and then two refusing to let
 *  any of it be read as an outcome: "A call-button click does not confirm that a
 *  qualified conversation happened. A direction request does not prove that
 *  someone arrived." That is the section -- a gap between what is counted and
 *  what happened -- and three columns of prose stated it without ever showing
 *  it.
 *
 *  So the two sources are set as what they are, banks of signals, and then the
 *  two inferences the document names are drawn breaking: the chain runs out of
 *  the signal, reaches a cut, and stops. Nothing on this page turns a click
 *  into an outcome, which is the whole point of the copy.
 *
 *  NOTHING IS QUANTIFIED. The document gives no figure against any of these
 *  signals and neither does this: the chips name what can be reported, never
 *  what it came to.
 *
 *  Motion is the house pattern -- Framer gated on in-view, every initial state
 *  skipped under reduced motion, transform and opacity only on marks. */
export function ProofGap({
  id,
  label,
  index,
  title,
  strokeTitle,
  claim,
  profileLead,
  profile,
  analyticsLead,
  analytics,
  breaks,
  therefore,
  reporting,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  claim: string;
  profileLead: string;
  profile: string[];
  analyticsLead: string;
  analytics: string[];
  breaks: string[];
  therefore: string;
  reporting: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;

  /** The negation is the load-bearing phrase in each break sentence, so it is
   *  marked inside the document's own wording rather than lifted out. */
  const mark = (text: string) => {
    const parts = text.split(/(does not confirm|does not prove)/g);
    return parts.map((part, i) =>
      part.startsWith("does not") ? (
        <span key={i} className="font-semibold text-brand">
          {part}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
  };

  const bank = (lead: string, items: string[], offset: number) => (
    <div>
      <p className="font-display text-[0.6875rem] font-bold uppercase tracking-wide text-ash">
        {lead}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: offset + i * 0.05, ease: EASE }}
            className="rounded-lg border border-line bg-ink-3 px-3.5 py-2 text-sm text-snow"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise>
              <p className="font-display text-[clamp(1.15rem,2.1vw,1.65rem)] font-extrabold uppercase leading-[1.18] text-snow">
                {claim}
              </p>
            </Rise>
          }
        />

        <div ref={ref}>
          {/* What can be reported. */}
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
            {bank(profileLead, profile, 0.1)}
            {bank(analyticsLead, analytics, 0.25)}
          </div>

          {/* And where reading it as an outcome stops. */}
          <ul className="mt-14 border-t border-line">
            {breaks.map((text, i) => (
              <motion.li
                key={text}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE }}
                className="flex items-start gap-5 border-b border-line py-6"
              >
                {/* The cut. A chain that runs out and stops, drawn once per
                    refusal the document makes. */}
                <span aria-hidden className="mt-0.5 shrink-0 text-brand">
                  <svg viewBox="0 0 34 20" className="h-5 w-[34px]" fill="none">
                    <path
                      d="M2 10h8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M24 10h8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.35"
                    />
                    <path
                      d="M13.5 5.5l7 9M20.5 5.5l-7 9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <p className="leading-relaxed text-snow sm:text-[1.02rem]">{mark(text)}</p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-10 grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <Rise>
              <p className="border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
                {therefore}
              </p>
            </Rise>
            <Rise delay={0.08}>
              <p className="leading-relaxed text-ash">{reporting}</p>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
}

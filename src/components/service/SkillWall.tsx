"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

const EASE = [0.16, 1, 0.3, 1] as const;

/** What the team leaves able to do, set as a wall rather than a run of text.
 *
 *  WHAT WAS WRONG. The previous version set the twelve as one line of body copy
 *  each with the leading verb in red. It was honest, compact and completely
 *  flat: twelve items at one size, in one weight, with nothing to look at. A
 *  page has presence when it has scale contrast, and that section had none.
 *
 *  THE VERBS ARE THE ANSWER, SO THE VERBS ARE THE SIZE. Every entry in the
 *  document begins with one: using, cleaning, writing, giving, checking,
 *  recognising, improving, creating, evaluating, identifying, recognising,
 *  understanding. Those twelve words are what an employee can do on Monday that
 *  they could not do on Friday, so they are set at display scale and the rest of
 *  the clause sits under each as its object. Nothing is reordered, renamed or
 *  regrouped: sorting them into themes would be asserting a structure the
 *  document does not have.
 *
 *  NOTHING IS DIMMED. Holding eleven at low opacity to light one is a named
 *  anti-reference here, and it would be self-defeating: the reader is being sold
 *  a curriculum, so all of it stays legible. The motion is arrival, in reading
 *  order, plus a rule that keeps working at the head of the wall. */
export function SkillWall({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  note,
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
  note: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const reduced = usePrefersReducedMotion();
  /* Reduced motion resolves after hydration, so a reader who has asked for no
     motion still starts on the hidden frame for one paint. Treating it as shown
     puts them straight on the finished one. */
  const show = inView || reduced;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "growth", label: "Twelve verbs" }}
          className="mb-12"
        />

        <Rise>
          <div className="grid items-start gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <p className="max-w-[52ch] text-base leading-relaxed text-fog sm:text-lg">{lead}</p>
            <p className="font-display max-w-[24ch] text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.18] text-snow lg:justify-self-end">
              {intro}
            </p>
          </div>
        </Rise>

        {/* The head of the wall, and the pass that keeps running along it. */}
        <div aria-hidden className="relative mt-12 h-0.5 w-full overflow-hidden bg-line">
          <svg
            viewBox="0 0 200 2"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <rect className="ci-scan-x" x="-24" y="0" width="24" height="2" fill="var(--color-brand)" />
          </svg>
        </div>

        <ul ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((skill, i) => {
            const [raw, ...rest] = skill.split(" ");
            /* "Cleaning, organising and reviewing business data" splits with the
               comma attached. Set as a heading it is punctuation with nothing
               after it, so it comes off the verb and nothing else changes. */
            const verb = raw.replace(/[,:;]$/, "");
            return (
              <motion.li
                key={skill}
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                transition={{ duration: 0.55, ease: EASE, delay: Math.min((i % 3) * 0.08, 0.24) }}
                className="group border-b border-line py-8 pr-8 transition-colors duration-500 hover:bg-ink-2 motion-reduce:transition-none sm:py-9"
              >
                <p className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold uppercase leading-[0.95] text-brand transition-colors duration-500 group-hover:text-brand-hot motion-reduce:transition-none">
                  {verb}
                </p>
                <p className="mt-3 max-w-[26ch] text-[0.9375rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                  {rest.join(" ")}
                </p>
                <span
                  aria-hidden
                  className="mt-5 block h-px w-8 bg-line transition-all duration-500 group-hover:w-20 group-hover:bg-brand motion-reduce:transition-none"
                />
              </motion.li>
            );
          })}
        </ul>

        {/* The caveat the section ends on: not one product, and not only
            today's tools. It qualifies everything above it. */}
        <Rise delay={0.1} className="mt-12">
          <p className="max-w-[70ch] text-base leading-relaxed text-fog sm:text-lg">{note}</p>
        </Rise>
      </Container>
    </section>
  );
}

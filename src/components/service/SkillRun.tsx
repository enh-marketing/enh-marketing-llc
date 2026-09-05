"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

/** What the team leaves able to do, set as one body of practice.
 *
 *  WHY NOT TWELVE CARDS. Twelve bordered cards with an icon and a heading is the
 *  arrangement this client has rejected by name, and it would also be wrong on
 *  the facts: these are not twelve features, they are one curriculum. So they
 *  run on as a single mass of phrases divided by hairlines, the way a syllabus
 *  reads, and the section has one top-level shape instead of twelve.
 *
 *  THE VERBS ARE THE INDEX. Every entry in the document begins with a verb, and
 *  the twelve verbs are the actual answer to the section's own question: using,
 *  cleaning, writing, giving, checking, recognising, improving, creating,
 *  evaluating, identifying, recognising, understanding. Setting each leading
 *  word in display red turns the mass into something scannable without moving,
 *  reordering or renaming a single item.
 *
 *  NOTHING IS DIMMED. Holding eleven phrases at low opacity to light one is a
 *  named anti-reference on this project, and it would be self-defeating here:
 *  the reader is being sold a curriculum, so every line of it stays legible at
 *  rest. The motion is entrance only, staggered along the run. */
export function SkillRun({
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
  const reduced = usePrefersReducedMotion();
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "growth", label: "One curriculum, twelve verbs" }}
          className="mb-12"
        />

        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <Rise>
            <p className="max-w-[58ch] text-base leading-relaxed text-fog sm:text-lg">{lead}</p>
          </Rise>
          <Rise delay={0.08}>
            <p className="font-display max-w-[24ch] text-[clamp(1.05rem,1.9vw,1.5rem)] font-extrabold uppercase leading-[1.15] text-snow lg:justify-self-end">
              {intro}
            </p>
          </Rise>
        </div>

        {/* The curriculum, as one continuous body. */}
        <ul className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4 sm:gap-x-14 sm:gap-y-5">
          {items.map((skill, i) => {
            const [verb, ...rest] = skill.split(" ");
            return (
              <motion.li
                key={skill}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: Math.min(i * 0.045, 0.45) }}
                className="max-w-full"
              >
                <span className="text-[clamp(0.9375rem,1.5vw,1.15rem)] leading-[1.35] text-snow">
                  <span className="font-display font-bold uppercase tracking-[0.02em] text-brand-text">
                    {verb}
                  </span>{" "}
                  {rest.join(" ")}
                </span>
              </motion.li>
            );
          })}
        </ul>

        {/* The caveat the section ends on: not one product, and not only today's
            tools. Set apart because it qualifies everything above it. */}
        <Rise delay={0.12} className="mt-12 border-t-2 border-line pt-8">
          <p className="max-w-[70ch] text-base leading-relaxed text-fog sm:text-lg">{note}</p>
        </Rise>
      </Container>
    </section>
  );
}

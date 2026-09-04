"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** What the website is for, what it therefore has to do, and what we pull.
 *
 *  THE CLAIM IS TWO LISTS AND IT HAD BEEN READ AS A PARAGRAPH. "The main goal
 *  of tailored web design and development is to support traffic, leads and
 *  revenue. A website needs to load quickly, explain the offer and guide
 *  visitors towards a useful action." That is a purpose and three requirements
 *  derived from it -- an argument with a direction -- and setting it as prose
 *  throws the direction away.
 *
 *  SO THE SECTION READS AS THE ARGUMENT IT IS. The goal states what the site is
 *  for. The three requirements are what that demands of it, set out as three.
 *  The warning is what it costs when a page fails them, which is the sentence
 *  the whole page turns on: a strong ad landing on a cluttered page. And the
 *  four levers are the work, set out as four, with the document's own "may
 *  involve" kept in front of them because they are alternatives and not a
 *  checklist that always runs.
 *
 *  REQUIREMENTS AND LEVERS ARE DELIBERATELY NOT PAIRED. The copy never says
 *  which lever fixes which requirement, and drawing an arrow between them would
 *  invent a mapping. They are two registers of the same argument, one above the
 *  other, and the reader is left to do the joining the document leaves to them.
 *
 *  NOTHING IS QUANTIFIED. No uplift, no rate, no before and after: this
 *  document contains one figure and it is about years of experience.
 *
 *  It is the only full-bleed band on the page, because it is the argument the
 *  rest of the page supports rather than one more section of it. */

function Register({
  lead,
  items,
  play,
  reduced,
  delay,
  hot,
  setHot,
  keyPrefix,
}: {
  lead: string;
  items: string[];
  play: boolean;
  reduced: boolean | null;
  delay: number;
  hot: string | null;
  setHot: (v: string | null) => void;
  keyPrefix: string;
}) {
  return (
    <div>
      <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
        {lead}
      </p>
      {/* The column count is a class, not an inline template: an inline
          `repeat(n, 1fr)` held three and four columns all the way down to a
          390px phone, where a requirement card came out 106px wide with
          "guide visitors towards a useful action" inside it. */}
      <ol
        className={cn(
          "mt-5 grid gap-3 sm:grid-cols-2",
          items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {items.map((item, i) => {
          const k = `${keyPrefix}-${i}`;
          const on = hot === k;
          return (
            <motion.li
              key={item}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: delay + i * 0.08, ease: EASE }}
              onMouseEnter={() => setHot(k)}
              onMouseLeave={() => setHot(null)}
              onFocus={() => setHot(k)}
              onBlur={() => setHot(null)}
              tabIndex={0}
              className={cn(
                "group relative cursor-default overflow-hidden rounded-xl border bg-ink-3 p-5 outline-none transition-[border-color,transform] duration-500 ease-out",
                on ? "-translate-y-1 border-brand/55" : "border-line",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left bg-brand transition-transform duration-500 ease-out",
                  on ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "font-display block text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                  on ? "text-brand" : "text-brand/35",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className={cn(
                  "font-display mt-4 text-[clamp(0.95rem,1.6vw,1.15rem)] font-extrabold uppercase leading-[1.14] transition-colors duration-300",
                  on ? "text-brand" : "text-snow",
                )}
              >
                {item}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

export function RequirementChain({
  id,
  label,
  index,
  title,
  strokeTitle,
  goal,
  goalMark,
  needsLead,
  needs,
  warning,
  warningMark,
  body,
  leversLead,
  levers,
  connected,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  goal: string;
  goalMark: string;
  needsLead: string;
  needs: string[];
  warning: string;
  warningMark: string;
  body: string;
  leversLead: string;
  levers: string[];
  connected: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<string | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip pt-14 sm:pt-16">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />
      </Container>

      <div className="relative border-y border-line bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] py-14 sm:py-20">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(110% 100% at 50% 0%, black, transparent 78%)",
            WebkitMaskImage: "radial-gradient(110% 100% at 50% 0%, black, transparent 78%)",
          }}
        />

        <Container className="relative">
          <div ref={ref}>
            {/* What it is for. */}
            <motion.p
              initial={reduced ? false : { y: 22 }}
              animate={play ? { y: 0 } : {}}
              transition={{ duration: 0.65, ease: EASE }}
              className="font-display max-w-4xl text-[clamp(1.4rem,3.4vw,2.4rem)] font-extrabold uppercase leading-[1.1] text-snow"
            >
              <Marked text={goal} mark={goalMark} />
            </motion.p>

            {/* And what that therefore demands of it. */}
            <div className="mt-12">
              <Register
                lead={needsLead}
                items={needs}
                play={play}
                reduced={reduced}
                delay={0.15}
                hot={hot}
                setHot={setHot}
                keyPrefix="need"
              />
            </div>

            {/* What it costs when a page does not do them. */}
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              className="mt-12 max-w-3xl border-l-2 border-brand pl-6 text-[clamp(1.02rem,1.9vw,1.25rem)] leading-relaxed text-snow"
            >
              <Marked text={warning} mark={warningMark} />
            </motion.p>

            {/* And the work. */}
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="mt-12 max-w-3xl leading-relaxed text-fog sm:text-lg"
            >
              {body}
            </motion.p>

            <div className="mt-8">
              <Register
                lead={leversLead}
                items={levers}
                play={play}
                reduced={reduced}
                delay={0.55}
                hot={hot}
                setHot={setHot}
                keyPrefix="lever"
              />
            </div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
              className="mt-12 max-w-4xl border-t border-line pt-8 leading-relaxed text-fog"
            >
              {connected}
            </motion.p>
          </div>
        </Container>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** What is settled before a campaign runs, and the total that is never taken.
 *
 *  THE COPY CONTAINS TWO LISTS AND EARLIER VERSIONS DREW NEITHER. "We plan the
 *  objective, audience, creative, budget and tracking before the campaign
 *  begins" is five decisions and a deadline. "The advertising fee and media
 *  budget are shown separately" is two money lines and a rule about them. A
 *  field of dots and a dashed circle conveyed neither; they were a picture of
 *  the word "reach". These are the actual contents of the section.
 *
 *  SO THE FIVE ARE FIVE SLOTS, AND THE DEADLINE IS A LINE THEY SIT ABOVE. The
 *  slots fill in order as the section arrives, and the sentence that closes
 *  them -- "before the campaign begins" -- is set on the line itself, because
 *  that is what the line is.
 *
 *  AND THE LEDGER HAS NO TOTAL ROW. Two lines, itemised, with their own rules,
 *  and where the total would go there is the clause that refuses it. That is
 *  the section's whole argument, drawn by leaving out the one row a ledger
 *  normally ends with rather than by asserting it in a paragraph. Nothing is
 *  costed: the bars carry no figure, because this document states none.
 *
 *  MOTION. The slots and the two lines arrive on in-view with a stagger, on
 *  transform. Everything rests visible; nothing loops. */

export function PreLaunchBrief({
  id,
  label,
  index,
  title,
  strokeTitle,
  claim,
  planLead,
  decisions,
  planTail,
  platforms,
  ledger,
  ledgerVerb,
  review,
  reviewMark,
  scope,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  claim: string;
  planLead: string;
  decisions: string[];
  planTail: string;
  platforms: string;
  ledger: string[];
  ledgerVerb: string;
  review: string;
  reviewMark: string;
  scope: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const money = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const moneyIn = useInView(money, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const playMoney = reduced || moneyIn;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "Reported apart from the accounts" }}
          className="mb-12"
        />

        <motion.p
          initial={reduced ? false : { y: 20 }}
          animate={play ? { y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-display statement max-w-4xl font-extrabold uppercase leading-[1.12] text-snow"
        >
          {claim}
        </motion.p>

        {/* The five decisions, and the line they have to be made before. */}
        <div ref={ref} className="mt-14">
          <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
            {planLead}
          </p>

          <ol className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {decisions.map((d, i) => (
              <motion.li
                key={d}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.11, ease: EASE }}
                className="group relative overflow-hidden rounded-xl border border-line bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)] p-5 transition-colors duration-500 hover:border-brand/45"
              >
                {/* Filled in, in order. */}
                <motion.span
                  aria-hidden
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={play ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.11, ease: EASE }}
                  className="absolute inset-x-0 top-0 block h-0.5 origin-left bg-brand"
                />
                <span
                  aria-hidden
                  className="font-display block text-[0.6875rem] font-bold tabular-nums text-brand"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display mt-4 text-[clamp(1rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.14] text-snow transition-colors duration-300 group-hover:text-brand">
                  {d}
                </p>
              </motion.li>
            ))}
          </ol>

          {/* The deadline is the line. */}
          <div className="relative mt-8 flex items-center gap-6">
            <motion.span
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              animate={play ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
              className="block h-0.5 flex-1 origin-left bg-brand"
            />
            <p className="font-display shrink-0 text-[0.8125rem] font-extrabold uppercase tracking-[0.1em] text-brand">
              {planTail}
            </p>
          </div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={play ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
            className="mt-10 max-w-3xl leading-relaxed text-fog sm:text-lg"
          >
            {platforms}
          </motion.p>
        </div>

        {/* The ledger that stops one row short. */}
        <div ref={money} className="mt-16 rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-9">
          <ol>
            {ledger.map((line, i) => (
              <motion.li
                key={line}
                initial={reduced ? false : { opacity: 0, x: -18 }}
                animate={playMoney ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.14, ease: EASE }}
                className={cn(
                  "flex flex-col gap-4 border-line py-6 sm:flex-row sm:items-center sm:gap-8",
                  i === 0 ? "border-b" : "",
                )}
              >
                <p className="font-display min-w-0 flex-1 text-[clamp(1.05rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.14] text-snow">
                  {line}
                </p>
                {/* Its own bar, on its own row, with no scale on it. */}
                <motion.span
                  aria-hidden
                  initial={reduced ? false : { scaleX: 0 }}
                  animate={playMoney ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.14, ease: EASE }}
                  className={cn(
                    "block h-3 origin-left rounded-full",
                    i === 0 ? "w-[38%] bg-brand/45" : "w-[62%] bg-brand",
                  )}
                />
              </motion.li>
            ))}
          </ol>

          {/* Where the total would be. */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={playMoney ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="font-display mt-2 border-t-2 border-brand pt-6 text-[clamp(1.05rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.14] text-brand"
          >
            {ledgerVerb}
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={playMoney ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-7 max-w-3xl leading-relaxed text-snow sm:text-lg"
          >
            <Marked text={review} mark={reviewMark} />
          </motion.p>
        </div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={playMoney ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="mt-14 max-w-4xl border-t border-line pt-8 leading-relaxed text-fog"
        >
          {scope}
        </motion.p>
      </Container>
    </section>
  );
}

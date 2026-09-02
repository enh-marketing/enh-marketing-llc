"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** A quotation, attributed, set at display scale.
 *
 *  WHY THIS EXISTS ON THIS PAGE IN PARTICULAR. The section quotes Google's own
 *  documentation to argue that most of what is sold as Google GEO is not
 *  needed. That argument only carries if the quote is unmistakably a quote —
 *  marked, attributed, and visibly not the agency's own voice. So the treatment
 *  is doing real work here: on a page about being cited correctly, this is what
 *  citing something correctly looks like.
 *
 *  Rendered as <blockquote> with <cite>, not styled divs, so the attribution is
 *  in the markup and not only in the design.
 *
 *  The quotation mark is decorative and aria-hidden; the quote text itself
 *  carries no typographic quote characters, because the blockquote element
 *  already says what it is and screen readers would otherwise announce stray
 *  punctuation. */
export function SourceQuote({
  lead,
  quote,
  source,
  delay = 0,
}: {
  /** The sentence that introduces the quotation, in the page's own voice. */
  lead: string;
  quote: string;
  /** Who said it. Rendered in a <cite>. */
  source: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const play = reduced || inView;

  return (
    <div ref={ref}>
      <motion.p
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay, ease: EASE }}
        className="text-sm font-semibold uppercase text-fog"
      >
        {lead}
      </motion.p>

      <motion.blockquote
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={play ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: delay + 0.1, ease: EASE }}
        className="relative mt-6 pl-10 sm:pl-14"
      >
        {/* Decorative mark, sized off the type it sits against. */}
        <span
          aria-hidden
          className="font-display absolute left-0 top-[-0.12em] select-none text-[clamp(3.5rem,7vw,5.5rem)] font-extrabold leading-none text-brand/30"
        >
          &ldquo;
        </span>

        <p className="font-display text-[clamp(1.25rem,2.6vw,2.05rem)] font-bold leading-[1.3] text-snow">
          {quote}
        </p>

        <footer className="mt-5">
          <cite className="text-xs font-semibold uppercase not-italic text-brand-text">
            {source}
          </cite>
        </footer>
      </motion.blockquote>
    </div>
  );
}

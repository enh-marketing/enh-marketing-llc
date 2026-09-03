"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/** Two ledgers that answer different questions, and never get added together.
 *
 *  WHY THIS SHAPE. The document opens the section with a flat statement --
 *  "Organic Facebook reporting and paid advertising reporting answer different
 *  questions" -- and turns it into a promise later on: "Advertising results are
 *  not blended with ordinary Page activity to make overall performance appear
 *  stronger." A single combined panel, or two columns that resolve into one
 *  total, would contradict the copy sitting inside them. So the two columns run
 *  side by side to the bottom of the section with a rule between them, and
 *  nothing on this page ever sums them.
 *
 *  DELIBERATELY NOT A FORK. The Ecommerce SEO page draws brand and non-brand
 *  search as one stem splitting in two, because there they are two parts of the
 *  same measured thing. These are not: they are two separate systems measuring
 *  two different things, so they share no origin and no stem. The opposite
 *  shape carries the opposite argument.
 *
 *  NO INVENTED COLUMN HEADINGS. The document supplies none, and each paragraph
 *  already names itself in its first words -- "Page-management reports can
 *  show...", "Paid reports may cover...". Those phrases are marked in place
 *  rather than lifted out into headers someone would have had to write.
 *
 *  NOTHING IS MEASURED. The document contains no figures at all, so neither
 *  column carries a number, a bar or a trend. What is drawn is the separation.
 *
 *  MOTION. CSS keyframes behind one IntersectionObserver, transform only: every
 *  element here carries copy. See globals.css, "Split ledger". */

/** Marks the phrase that names a column, inside the sentence that explains it. */
function mark(text: string, term: string) {
  const i = text.indexOf(term);
  if (i === -1) return text;
  return (
    <Fragment>
      {text.slice(0, i)}
      <span className="font-semibold text-brand">{term}</span>
      {text.slice(i + term.length)}
    </Fragment>
  );
}

export function SplitLedger({
  claim,
  organic,
  organicTerm,
  paid,
  paidTerm,
  agreement,
  agreementCase,
}: {
  claim: string;
  organic: string;
  organicTerm: string;
  paid: string;
  paidTerm: string;
  agreement: string;
  agreementCase: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={root} className={cn("relative", shown && "is-in")}>
      <p className="ledger-in font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
        {claim}
      </p>

      {/* The two ledgers. The rule between them runs the full height and stops
          at the bottom edge: they do not meet above it or below it. */}
      <div className="relative mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        <span
          aria-hidden
          className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line md:block"
        />

        {[
          { text: organic, term: organicTerm },
          { text: paid, term: paidTerm },
        ].map((col, i) => (
          <div
            key={col.term}
            className={cn("ledger-in", i === 1 && "md:pl-12")}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {/* A short rule at the head of each column, so the two read as two
                accounts rather than one paragraph flowing across a gutter. */}
            <span aria-hidden className="block h-1 w-10 rounded-full bg-brand" />
            <p className="mt-5 leading-relaxed text-snow sm:text-lg">
              {mark(col.text, col.term)}
            </p>
          </div>
        ))}
      </div>

      {/* The rule that governs both, and the case that shows why one number can
          mean opposite things depending on which ledger it sits in. */}
      <div
        className="ledger-in mt-12 grid gap-x-12 gap-y-4 border-t border-line pt-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        style={{ animationDelay: "220ms" }}
      >
        <p className="font-display text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow">
          {agreement}
        </p>
        <p className="flex gap-3 leading-relaxed text-fog">
          <span aria-hidden className="mt-1 shrink-0 text-brand">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
            </svg>
          </span>
          <span>{agreementCase}</span>
        </p>
      </div>
    </div>
  );
}

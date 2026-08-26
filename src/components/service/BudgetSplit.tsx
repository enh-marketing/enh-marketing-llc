"use client";

import { Container } from "@/components/ui/Container";
import { Chars, Rise } from "@/components/fx/Reveal";

/** Two words carry this section: "customers" and "activity".
 *
 *  The source paragraph runs through a sequence — account set up, budget out,
 *  dashboard filling — and lands on the thing that is actually wrong: nobody
 *  can say which part produced customers and which part produced activity.
 *  That closing clause is the argument, so it is set at display scale while the
 *  run-up stays body copy. The sentence is printed once, in two sizes.
 *
 *  The contrast between the two words does the work: one solid, one dim.
 *  Deliberately no bar, no proportion and no figure — the document gives no
 *  split, and inventing one would be inventing the finding.
 *
 *  Laid out as three full-width bands rather than a stack of left-aligned
 *  blocks: heading and run-up share the first band so the right side is not
 *  dead, the clause spans the second, and the closing two paragraphs — who ENH
 *  is, and the one-budget point the section ends on — share the third. */
export function BudgetSplit({
  id,
  label,
  headline,
  lead,
  splitPrefix,
  splitA,
  splitConjunction,
  splitB,
  body,
  closing,
  highlight = [],
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  headline: [string, string];
  lead: string;
  splitPrefix: string;
  splitA: string;
  splitConjunction: string;
  splitB: string;
  body: string;
  /** The paragraph the section closes on. */
  closing: string;
  /** Words in `body` to lift to brand colour. */
  highlight?: string[];
}) {
  // Split the body on the highlighted words, keeping them as their own tokens.
  const tokens = highlight.length
    ? body.split(new RegExp(`(${highlight.join("|")})`, "g"))
    : [body];

  return (
    <section id={id} data-section={label} className="relative py-24 sm:py-32">
      <Container>
        {/* Band 1 — heading and the run-up, set against each other. */}
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <h2 className="font-display display-xl font-extrabold uppercase text-snow">
            <span className="block">
              <Chars text={headline[0]} />
            </span>{" "}
            <span className="block text-brand">
              <Chars text={headline[1]} delay={0.15} />
            </span>
          </h2>

          <Rise delay={0.15}>
            <p className="text-lg leading-relaxed text-fog">{lead}</p>
          </Rise>
        </div>

        {/* Band 2 — the closing clause, at scale, across the full measure. */}
        <Rise delay={0.2} className="mt-14 border-t border-line pt-12 sm:mt-16">
          <div className="grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fog">
                {splitPrefix}
              </p>
              <p className="font-display mt-4 text-[clamp(2.2rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-brand">
                {splitA}
              </p>
            </div>

            <p className="font-display text-sm font-bold uppercase tracking-[0.24em] text-fog sm:pt-11">
              {splitConjunction}
            </p>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fog">
                {splitPrefix}
              </p>
              {/* Solid dim rather than the site's stroked treatment: stroked
                  type is transparent-filled and measures ~1:1, and this word
                  carries half the section's argument, so it has to be read.
                  Red-solid against grey-solid keeps the contrast of meaning. */}
              <p className="font-display mt-4 text-[clamp(2.2rem,6vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-fog">
                {splitB}
              </p>
            </div>
          </div>
        </Rise>

        {/* Band 3 — who we are, and the point the section closes on. */}
        <div className="mt-14 grid gap-8 border-t border-line pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 sm:mt-16">
          <Rise delay={0.1}>
            <p className="leading-relaxed text-fog sm:text-lg">
              {tokens.map((t, i) =>
                highlight.includes(t) ? (
                  <strong key={`${t}-${i}`} className="font-semibold text-brand-text">
                    {t}
                  </strong>
                ) : (
                  t
                ),
              )}
            </p>
          </Rise>

          <Rise delay={0.18}>
            <p className="font-display border-l-2 border-brand pl-6 text-[clamp(1.1rem,1.7vw,1.45rem)] font-bold leading-[1.4] text-snow sm:pl-8">
              {closing}
            </p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

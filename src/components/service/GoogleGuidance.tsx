"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceQuote } from "@/components/service/SourceQuote";
import { FanOutDiagram } from "@/components/service/FanOutDiagram";
import { Rise } from "@/components/fx/Reveal";

/** What Google actually says — built around the shape of what it says.
 *
 *  WHY IT WAS REBUILT AGAIN. The previous version was the right content in the
 *  wrong order: a heading, two quotations, a callout, a diagram, a paragraph,
 *  stacked. Every part was legible and the section still read as filler,
 *  because nothing in the composition knew what the section was for.
 *
 *  Read the quotations closely and they are all the same grammatical move.
 *  "No additional requirements." "Nor other special optimizations necessary."
 *  "You don't need to create." "There's also no special schema.org structured
 *  data." Four negations in two sentences. The section is not an explanation,
 *  it is a subtraction — and the punchline is the one line that survives it: a
 *  page needs to be indexed, and eligible to appear with a snippet. That is
 *  all. Two conditions.
 *
 *  So the composition is built as a subtraction that lands on those two. The
 *  evidence comes first, in Google's own words, properly attributed. Then the
 *  requirement is set out as exactly two numbered conditions with the verdict
 *  at display scale beneath them — the contrast between how little is actually
 *  required and how much gets sold against it is the entire argument, and scale
 *  is how you make a reader feel a contrast rather than be told about one.
 *
 *  The two conditions are the eligibility sentence split at its own "and":
 *  lead + condition + condition + verdict reconstructs it word for word.
 *
 *  The quotations are deliberately NOT on cards. A card is a container for
 *  something you might act on; a quotation is evidence, and boxing it makes it
 *  read as a pull-quote the page wrote about itself. On a page about being
 *  cited correctly, these stay real blockquotes with real cites. */
export function GoogleGuidance({
  id,
  label,
  index,
  title,
  strokeTitle,
  intro,
  quotes,
  source,
  eligibilityLead,
  conditions,
  eligibilityVerdict,
  fanout,
  closing,
  closingEmphasis,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  intro: string;
  quotes: { lead: string; quote: string }[];
  /** Attribution shown under every quotation in this section. */
  source: string;
  eligibilityLead: string;
  /** The two things a page actually has to be. */
  conditions: string[];
  eligibilityVerdict: string;
  fanout: string;
  closing: string;
  /** A substring of `closing`, weighted in place. */
  closingEmphasis?: string;
}) {
  const at = closingEmphasis ? closing.indexOf(closingEmphasis) : -1;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      {/* Fine grid, fading in from the requirement side, so the section reads as
          documentation rather than as marketing. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 80% 60%, black, transparent 72%)",
        }}
      />

      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-14"
          aside={
            <Rise key="intro">
              <p className="max-w-md leading-relaxed text-fog sm:text-lg">{intro}</p>
            </Rise>
          }
        />

        {/* The evidence, in Google's words. */}
        <div className="grid gap-12 border-y border-line py-12 lg:grid-cols-2 lg:gap-16">
          {quotes.map((q, i) => (
            <SourceQuote
              key={q.quote}
              lead={q.lead}
              quote={q.quote}
              source={source}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* What is left once the negations are taken out. The verdict sits
            beside the two conditions rather than under them: stacked, it cost
            200px of nothing, and the point is the contrast between the two
            small items and the flat statement — which reads better across than
            down. */}
        <div className="mt-14 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <Rise>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-fog">
                {eligibilityLead}
              </p>
            </Rise>

            <ol className="mt-7 space-y-6">
              {conditions.map((condition, i) => (
                <li key={condition}>
                  <Rise delay={i * 0.1}>
                    <div className="flex items-start gap-5">
                      <span
                        aria-hidden
                        className="font-display mt-0.5 shrink-0 text-[clamp(1.9rem,3.2vw,2.7rem)] font-extrabold leading-none text-stroke"
                      >
                        {i + 1}
                      </span>
                      <p className="font-display text-[clamp(1.1rem,2vw,1.6rem)] font-extrabold uppercase leading-[1.15] tracking-tight text-snow">
                        {condition}
                      </p>
                    </div>
                  </Rise>
                </li>
              ))}
            </ol>
          </div>

          {/* The point of the whole section, at the scale of the point. */}
          <Rise delay={0.16} className="flex items-center">
            <p className="font-display border-l-2 border-brand pl-7 text-[clamp(1.5rem,3.2vw,2.6rem)] font-extrabold uppercase leading-[1.06] tracking-tight text-brand sm:pl-9">
              {eligibilityVerdict}
            </p>
          </Rise>
        </div>

        {/* And the one mechanic that does change how you write. */}
        <div className="mt-12 grid items-center gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <Rise>
            <p className="leading-relaxed text-fog sm:text-lg">{fanout}</p>
          </Rise>
          <Rise delay={0.1}>
            <FanOutDiagram className="h-auto w-full" />
          </Rise>
        </div>

        <Rise delay={0.1} className="mt-10">
          <p className=" text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-fog">
            {at >= 0 ? (
              <>
                {closing.slice(0, at)}
                <strong className="font-display font-extrabold uppercase tracking-tight text-snow">
                  {closingEmphasis}
                </strong>
                {closing.slice(at + closingEmphasis!.length)}
              </>
            ) : (
              closing
            )}
          </p>
        </Rise>
      </Container>
    </section>
  );
}

"use client";

import { useMemo } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { Prose, SectionRule } from "@/components/case-studies/Prose";
import { ResultSheet } from "@/components/case-studies/ResultSheet";
import { siteLabel, study as copy, type Block, type Study } from "@/content/case-studies";

/** THE STORY: the brief, the challenge, the work, what changed.
 *
 *  FOUR SECTIONS, FOUR COMPOSITIONS, AND THE CONTENT CHOSE THEM. A study page
 *  that sets all four in the same column with the same heading is the thing
 *  this client has named and rejected — "it's just a list" — so each section
 *  is set as the kind of writing it actually is:
 *
 *    THE BRIEF is a fact about a company, so it is set beside a plate of
 *    facts: who they are, what sector, where their site is.
 *
 *    THE CHALLENGE is the argument the whole page answers, so it is the only
 *    prose on the site set at display weight. One paragraph at that scale is
 *    louder than three at reading scale, which is the point.
 *
 *    WHAT WE DID follows its own copy. Where the source names its phases
 *    ("Paid Campaigns", "SEO Strategy"), they are set as a numbered run, two
 *    to a row. Where it is a single unbroken paragraph, it stays one — an
 *    invented set of phase names would be inventing the work.
 *
 *    WHAT CHANGED is the outcome and it ends on the evidence: the results
 *    sheet, full measure, openable at the size its own type needs.
 *
 *  THE SOURCE'S SECTION ORDER IS NOT ALWAYS THE SOURCE'S SECTION ORDER. One
 *  study is published upstream with its challenge and approach in each other's
 *  slots; both are migrated into the roles their sentences describe and the
 *  study records the swap. Nothing here has to know about it. */
export function CaseStory({ study }: { study: Study }) {
  const phases = useMemo(() => groupPhases(study.approach), [study.approach]);

  return (
    <div data-section="Case Study Story">
      {/* --------------------------------------------------------- brief */}
      {study.profile.length > 0 && (
        <section id="brief" className="relative overflow-x-clip py-14 sm:py-16">
          <Container>
            <SectionRule index="01" label={copy.briefLabel} />
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <Prose blocks={study.profile} className="max-w-[68ch]" />
              </div>
              <Rise delay={0.1} className="lg:col-span-4 lg:col-start-9">
                {/* The only filled panel on the page, and it holds the only
                    content that is a record rather than a sentence. */}
                <dl className="rounded-2xl border border-line bg-ink-2 p-7">
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                      Client
                    </dt>
                    <dd className="font-display mt-2 text-[1.05rem] font-extrabold uppercase leading-tight text-snow">
                      {study.client}
                    </dd>
                  </div>
                  <div className="mt-6 border-t border-line pt-6">
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                      Sector
                    </dt>
                    <dd className="mt-2 text-sm font-semibold text-snow">{study.sector}</dd>
                  </div>
                  {study.projectUrl && (
                    <div className="mt-6 border-t border-line pt-6">
                      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
                        {copy.siteLabel}
                      </dt>
                      <dd className="mt-2">
                        <a
                          href={study.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-snow underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
                        >
                          {siteLabel(study.projectUrl)}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </Rise>
            </div>
          </Container>
        </section>
      )}

      {/* ----------------------------------------------------- challenge */}
      {study.challenge.length > 0 && (
        <section id="challenge" className="relative overflow-x-clip py-14 sm:py-16">
          <Container>
            <SectionRule index="02" label={copy.challengeLabel} />
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-10">
                {/* The first paragraph carries the weight; anything after it is
                    the same argument continued, and setting four paragraphs at
                    display scale is shouting rather than emphasis. */}
                <Prose blocks={study.challenge.slice(0, 1)} tone="statement" className="max-w-[52ch]" />
                {study.challenge.length > 1 && (
                  <Rise delay={0.1} className="mt-9">
                    <Prose blocks={study.challenge.slice(1)} className="max-w-[68ch]" />
                  </Rise>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ------------------------------------------------------ approach */}
      {study.approach.length > 0 && (
        <section id="approach" className="relative overflow-x-clip py-14 sm:py-16">
          <Container>
            <SectionRule index="03" label={copy.approachLabel} />

            {phases.intro.length > 0 && (
              <Prose blocks={phases.intro} className="max-w-[68ch]" />
            )}

            {phases.steps.length > 0 && (
              <ol className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {phases.steps.map((step, i) => (
                  <li key={step.title} className="group min-w-0">
                    <span
                      aria-hidden
                      className="block h-px w-10 bg-brand transition-all duration-500 group-hover:w-20 motion-reduce:transition-none"
                    />
                    {/* An h3, so a phase is a level under "What we did" in the
                        document outline rather than a styled paragraph. The
                        numeral sits inside it as a span: it is part of the
                        label a screen reader should read, and it ascends in
                        DOM order and in visual order. */}
                    <h3 className="font-display mt-5 flex items-baseline gap-3.5">
                      <span className="text-[0.6875rem] font-extrabold tabular-nums text-brand-text">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.05rem] font-extrabold uppercase leading-tight text-snow">
                        {step.title}
                      </span>
                    </h3>
                    <Prose blocks={step.body} className="mt-4" />
                  </li>
                ))}
              </ol>
            )}
          </Container>
        </section>
      )}

      {/* ------------------------------------------------------- outcome */}
      {study.outcome.length > 0 && (
        <section id="outcome" className="relative overflow-x-clip py-14 sm:py-16">
          <Container>
            <SectionRule index="04" label={copy.outcomeLabel} />
            <Prose blocks={study.outcome} className="max-w-[68ch]" />

            {study.sheet && <ResultSheet sheet={study.sheet} client={study.client} />}
          </Container>
        </section>
      )}
    </div>
  );
}

/** Split an Approach into its introduction and its named phases.
 *
 *  A phase is an `h3` and everything under it until the next one, which is
 *  exactly how the source writes it. Studies with no `h3` come back with all
 *  of their blocks as the introduction, so the section renders as prose and no
 *  phase structure is invented for a paragraph that has none. */
function groupPhases(blocks: Block[]): {
  intro: Block[];
  steps: { title: string; body: Block[] }[];
} {
  const intro: Block[] = [];
  const steps: { title: string; body: Block[] }[] = [];

  for (const block of blocks) {
    if (block.type === "h3") {
      steps.push({ title: block.text, body: [] });
    } else if (steps.length) {
      steps[steps.length - 1].body.push(block);
    } else {
      intro.push(block);
    }
  }

  return { intro, steps };
}

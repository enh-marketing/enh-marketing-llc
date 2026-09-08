"use client";

import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { objectives } from "@/content/contact";

/** "Discuss Your Growth Objectives with Us" -- the live page's second section,
 *  and the one it earns its place with.
 *
 *  WHY IT MATTERS ENOUGH TO BE THE MIDDLE OF THE PAGE. A contact page's real
 *  job is to answer "what do I get for filling this in", and this is the only
 *  copy anywhere on the site that answers it in the visitor's terms: advice,
 *  the channels that fit their audience, and how fast growth could go. So it
 *  sits between the four direct lines and the form, which is the order a
 *  visitor decides in.
 *
 *  THREE ACROSS, DELIBERATELY ECHOING THE FOUR ACROSS ABOVE IT. The hero sets
 *  four blocks on a rule; this sets three. The repeat is the page's rhythm: two
 *  rows of blocks on hairlines, then the form. A vertical run of three would
 *  have made the page a list of three unrelated things instead.
 *
 *  NOTHING IS ADDED TO THE THREE SENTENCES. No sub-copy, no icons, no invented
 *  headline per point. Each carries an oversized numeral, a hairline that wipes
 *  brand on hover, and its own sentence at statement scale. The section mark
 *  beside the heading is the site's own `growth` drawing, which is the subject
 *  of the section rather than an ornament chosen to fill the band. */
export function GrowthObjectives() {
  return (
    <section
      id="objectives"
      data-section="Discuss Your Growth Objectives with Us"
      className="relative overflow-hidden py-16 sm:py-20"
    >
      <Container>
        <SectionHeader
          index={objectives.index}
          title={objectives.title}
          strokeTitle={objectives.strokeTitle}
          mark={{ variant: "growth", label: "Where you are, and where growth could go" }}
          className="mb-16"
        />

        <ol className="grid gap-x-10 gap-y-12 md:grid-cols-3">
          {objectives.items.map((item, i) => (
            <Rise key={item} delay={0.08 * i}>
              <li className="group relative h-full border-t border-line pt-7">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />
                <span
                  aria-hidden
                  className="font-display block text-[3rem] font-extrabold leading-none text-brand/35 transition-colors duration-500 group-hover:text-brand"
                >
                  {`0${i + 1}`}
                </span>
                <p className="mt-6 text-[clamp(1.15rem,2.1vw,1.75rem)] font-medium leading-[1.28] text-snow">
                  {item}
                </p>
              </li>
            </Rise>
          ))}
        </ol>
      </Container>
    </section>
  );
}

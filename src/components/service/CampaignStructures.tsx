import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { splitFigure } from "@/lib/figure";

/** "How Do Automotive PPC Campaigns Generate Qualified Leads?"
 *
 *  THE EIGHT ARE THE SECTION. The document's answer to its own question is a
 *  list of eight things a campaign can be structured around, and its argument
 *  is that a campaign is built around an action rather than around traffic. So
 *  the eight are given the weight, in a single gapless block with the light
 *  walking down them, and the prose above them is kept to the two sentences
 *  that say what the eight are for.
 *
 *  ONE CAMPAIGN, TWO FIGURES, AND THE SENTENCE THAT LIMITS THEM. The document
 *  puts the clicks and the conversions in one sentence and then immediately
 *  says what they do not prove: "The value of an automotive PPC campaign should
 *  still be judged by lead quality and cost per enquiry, not the number of
 *  impressions alone." The limit is set directly under the figures rather than
 *  filed with the results caveat further down, because it is about these two
 *  numbers and not about the nine in the results section.
 *
 *  The figures are the client's own counts printed as written, hedge and all.
 *  Nothing is drawn to scale here: two numbers from one campaign are not a
 *  series, and putting them on an axis would invent a comparison. */
export function CampaignStructures({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  approach,
  approachMark,
  structuredStem,
  structures,
  proof,
  proofFigures,
  limit,
  limitMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  approach: string;
  approachMark: string[];
  structuredStem: string;
  structures: string[];
  proof: string;
  proofFigures: { figure: string; label: string }[];
  limit: string;
  limitMark: string[];
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Rise>
              <p className="max-w-[62ch] text-base leading-relaxed text-fog sm:text-lg">
                <Marked text={approach} mark={approachMark} className="font-semibold text-snow" />
              </p>
            </Rise>

            {/* One campaign. Two counts, and what they are not evidence of. */}
            <Rise delay={0.12} className="mt-10">
              <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
                <p className="text-sm leading-relaxed text-fog">{proof}</p>
                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  {proofFigures.map((f) => {
                    const { hedge, numeral } = splitFigure(f.figure);
                    return (
                      <div key={f.label} className="group">
                        {hedge && (
                          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                            {hedge}
                          </p>
                        )}
                        <p className="font-display mt-1 text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold uppercase leading-none text-snow">
                          {numeral}
                        </p>
                        <p className="mt-2 text-sm text-fog">{f.label}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-fog">
                  <Marked text={limit} mark={limitMark} className="font-semibold text-snow" />
                </p>
              </div>
            </Rise>
          </div>

          {/* The eight. */}
          <Rise delay={0.08}>
            <p className="text-base leading-relaxed text-fog sm:text-lg">{structuredStem}</p>
            <ul className="mt-6 overflow-hidden rounded-[1.25rem] border border-line bg-ink-2">
              {structures.map((s, i) => (
                <li
                  key={s}
                  className="group relative flex items-center gap-5 border-b border-line px-6 py-4 transition-colors duration-500 last:border-b-0 hover:bg-ink-3 motion-reduce:transition-none sm:px-7"
                >
                  <span
                    aria-hidden
                    className="ci-blink absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-brand"
                    style={{ animationDelay: `${(i * 6000) / structures.length}ms` }}
                  />
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold uppercase leading-[1.16] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {s}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto h-px w-8 shrink-0 bg-line transition-all duration-500 group-hover:w-14 group-hover:bg-brand motion-reduce:transition-none"
                  />
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

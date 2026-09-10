import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "Can Automotive Businesses Appear in AI Search Results?"
 *
 *  THE QUALIFICATION LEADS. The document answers its own question with a yes
 *  that has a condition attached — "although placement in a specific answer
 *  cannot be guaranteed" — and then spends both remaining paragraphs on the
 *  condition. So the limit is the first thing set, in brand, beside the
 *  heading, rather than being left as the tail of a sentence nobody finishes.
 *
 *  THE MIDDLE OF THE SECTION IS ONE SENTENCE, LAID OUT AS ITSELF. "We organise
 *  vehicle comparisons, model details, service information, FAQs and location
 *  data around the questions customers ask." Five things, and the thing they
 *  are organised around. The five are set as five slips and the thing they
 *  point at is set at weight — no notation to learn, because the arrangement is
 *  literally the grammar of the client's own sentence.
 *
 *  NO SPECIMEN QUESTIONS. The document never writes one of the questions
 *  customers ask, so none is invented to fill the target: the ticks in the
 *  panel are marks, not paraphrases.
 *
 *  THE FOUR FOUNDATIONS ARE UNDERNEATH BECAUSE THE SOURCE PUTS THEM THERE. "AI
 *  search optimisation builds on effective SEO. It does not replace technical
 *  website improvements, useful content, local signals or established search
 *  visibility." Four posts under a rule: things being built on, not four more
 *  features being sold. */
export function RetrievalDesk({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  organiseStem,
  organiseItems,
  organiseTail,
  consistency,
  foundationStem,
  foundationItems,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string[];
  organiseStem: string;
  organiseItems: string[];
  organiseTail: string;
  consistency: string;
  foundationStem: string;
  foundationItems: string[];
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance text-snow">
              <Marked text={lead} mark={leadMark} className="text-brand" />
            </p>
          }
          className="mb-14"
        />

        <Rise>
          <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-9 lg:p-11">
            <p className="text-base leading-relaxed text-fog sm:text-lg">{organiseStem}</p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.9fr)] lg:items-center lg:gap-10">
              {/* The five. */}
              <ul className="grid gap-2.5">
                {organiseItems.map((item, i) => (
                  <li
                    key={item}
                    className="group flex items-center gap-4 rounded-lg border border-line bg-ink-3 px-4 py-3 transition-colors duration-500 hover:border-brand/55 motion-reduce:transition-none"
                  >
                    <span
                      aria-hidden
                      className="ci-blink h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      style={{ animationDelay: `${(i * 6000) / organiseItems.length}ms` }}
                    />
                    <span className="text-sm leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Organised around. */}
              <svg
                viewBox="0 0 120 40"
                aria-hidden
                className="hidden h-10 w-full max-w-[7.5rem] lg:block"
                fill="none"
              >
                <path d="M2 20 H104" stroke="var(--color-ash)" strokeWidth="1.4" strokeOpacity="0.45" strokeLinecap="round" />
                <path
                  d="M2 20 H104"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="ci-flow"
                />
                <path d="M98 13 L106 20 L98 27" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* What they are organised around. */}
              <div className="rounded-xl border border-line bg-ink-3 p-5 sm:p-6">
                <p className="font-display text-[clamp(1.05rem,1.9vw,1.5rem)] font-extrabold uppercase leading-[1.16] text-snow">
                  {organiseTail}
                </p>
                <ul className="mt-5 grid gap-2.5" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="h-[7px] w-[7px] shrink-0 rounded-full border border-brand" />
                      <span
                        className="h-px flex-1 bg-line"
                        style={{ maxWidth: `${[92, 74, 84][i]}%` }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-9 max-w-[68ch] border-t border-line pt-7 text-sm leading-relaxed text-fog sm:text-base">
              {consistency}
            </p>
          </div>
        </Rise>

        {/* What it builds on, and does not replace. */}
        <Rise delay={0.12} className="mt-12">
          <p className="max-w-[68ch] text-base leading-relaxed text-fog sm:text-lg">
            {foundationStem}
          </p>
          <div className="mt-6">
            <span aria-hidden className="block h-px w-full bg-brand/60" />
            <ul className="grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-4">
              {foundationItems.map((f) => (
                <li
                  key={f}
                  className="group bg-ink-2 px-5 py-6 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden
                    className="block h-4 w-px bg-line transition-colors duration-500 group-hover:bg-brand motion-reduce:transition-none"
                  />
                  <p className="font-display mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] font-extrabold uppercase leading-[1.16] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {f}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

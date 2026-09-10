import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "Why Is Logistics Digital Marketing Different?" — the page's signature
 *  section, because the client drew it for us.
 *
 *  THE DOCUMENT CONTAINS A DIAGRAM AND THIS SECTION IS THAT DIAGRAM. Four words
 *  and three arrows, typed by the client:
 *
 *      Search -> Research -> Trust -> Enquiry
 *
 *  Nothing here invents a shape for a paragraph. The chain is set at the scale
 *  the client's own arrows imply, in the client's own order, with the sentence
 *  that introduces it printed above it exactly as written.
 *
 *  WHAT MAKES IT UNLIKE EVERY OTHER JOURNEY ON THESE PAGES. The automotive page
 *  draws two journeys of very different length; the hospitality page fans one
 *  arrival into six endings; the ecommerce page runs one route with three
 *  leaks. All three are walked once, by one person. This one is not: "The
 *  buying process may involve procurement teams, operations managers and
 *  several rounds of evaluation before an enquiry becomes a contract." Several
 *  people, several passes. So three markers travel the same rail at three
 *  unsynchronised speeds, and the sentence they were read from is printed
 *  underneath them in the same frame -- the arrangement is checkable against
 *  its source without leaving the section.
 *
 *  NOTHING IS TIMED. "Several" is the only quantity the document gives, and it
 *  gives no duration at all, so the three speeds carry no unit and there is no
 *  axis anywhere in this section. What the picture claims is what the sentence
 *  claims: more than one pass, not all at the same pace.
 *
 *  THE FAILURE AND THE FIX ARE SET AS A PAIR. "Generic traffic is unlikely to
 *  produce useful leads" and the sentence naming three cargo requirements that
 *  each need their own answer are two halves of one argument, so they sit side
 *  by side at two weights rather than as consecutive paragraphs. */

const PASSES = ["lg-pass-a", "lg-pass-b", "lg-pass-c"];

export function ResearchRounds({
  id,
  label,
  index,
  title,
  strokeTitle,
  basis,
  basisItems,
  rounds,
  roundsMark,
  generic,
  requirement,
  requirements,
  journeyStem,
  journey,
  verdict,
  verdictMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  basis: string;
  basisItems: string[];
  rounds: string;
  roundsMark: string[];
  generic: string;
  requirement: string;
  requirements: readonly string[];
  journeyStem: string;
  /** The client's four words, in the client's order. */
  journey: readonly [string, string, string, string];
  verdict: string;
  verdictMark: string[];
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
              <Marked text={basis} mark={basisItems} className="text-brand" />
            </p>
          }
          className="mb-14"
        />

        {/* THE CHAIN. */}
        <Rise>
          <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8 lg:p-10">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash">
              {journeyStem}
            </p>

            <div className="relative mt-10">
              {/* The rail, and the three passes along it. Hidden below the
                  small breakpoint, where the four stations wrap to two rows
                  and a single rail across the top would run behind only half
                  of them. */}
              <span
                aria-hidden
                className="absolute left-0 right-0 top-0 hidden h-px bg-line sm:block"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 top-0 hidden overflow-visible sm:block"
              >
                {PASSES.map((pass) => (
                  <span key={pass} className={`${pass} absolute inset-x-0 top-0 block`}>
                    <span className="absolute right-0 top-0 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand shadow-[0_0_0_5px_color-mix(in_srgb,var(--color-brand)_16%,transparent)]" />
                  </span>
                ))}
              </span>

              <ol className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
                {journey.map((stage, i) => (
                  <li key={stage} className="group relative min-w-0 sm:pr-6">
                    <span
                      aria-hidden
                      className="absolute -top-[3px] left-0 hidden h-[7px] w-[7px] rounded-full bg-line transition-colors duration-500 group-hover:bg-brand motion-reduce:transition-none sm:block"
                    />

                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none sm:mt-5">
                      ({String(i + 1).padStart(2, "0")})
                    </p>

                    <p className="font-display mt-2 flex items-baseline gap-3 text-[clamp(1.35rem,2.9vw,2.15rem)] font-extrabold uppercase leading-[1.05] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {stage}
                      {/* The client's own arrow, drawn rather than typed so it
                          cannot be read out or copied as text. */}
                      {i < journey.length - 1 && (
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          className="hidden h-4 w-4 shrink-0 text-ash transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-brand motion-reduce:transition-none sm:block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 12h15M13 6l6 6-6 6" />
                        </svg>
                      )}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* The sentence the three passes were read from. */}
            <p className="group mt-12 max-w-[72ch] border-t border-line pt-8 text-sm leading-relaxed text-fog transition-colors duration-500 hover:text-ash motion-reduce:transition-none sm:text-base">
              <Marked
                text={rounds}
                mark={roundsMark}
                className="font-semibold text-snow transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none"
              />
            </p>
          </div>
        </Rise>

        {/* THE FAILURE, AND WHAT IT TAKES INSTEAD. Two cells of one board,
            not two loose paragraphs: they are the two halves of a single
            argument and the board is what says so. */}
        <Rise delay={0.1} className="mt-14">
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line lg:grid-cols-[0.85fr_1.15fr]">
            <div className="group relative flex flex-col justify-between bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none sm:p-9">
              <span aria-hidden className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand" />
              <p className="font-display max-w-[24ch] text-[clamp(1.5rem,3.2vw,2.35rem)] font-extrabold uppercase leading-[1.08] text-brand">
                {generic}
              </p>
              <span
                aria-hidden
                className="mt-8 block h-px w-8 bg-line transition-all duration-500 group-hover:w-20 group-hover:bg-brand motion-reduce:transition-none"
              />
            </div>

            {/* The three cargo requirements, on a rail with a segment each:
                three things that each need their own answer, lit in turn. Ash
                rather than --color-line, because the rail carries meaning. */}
            <div className="group relative bg-ink-2 p-7 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none sm:p-9">
              <span
                aria-hidden
                className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand"
                style={{ animationDelay: "3100ms" }}
              />
              <div className="flex gap-6 sm:gap-8">
                <span
                  aria-hidden
                  className="flex w-[3px] shrink-0 flex-col overflow-hidden rounded-full bg-ash/35 transition-colors duration-500 group-hover:bg-ash/60 motion-reduce:transition-none"
                >
                  {requirements.map((r, i) => (
                    <span key={r} className="relative flex-1">
                      <span
                        className="ci-blink absolute inset-0 bg-brand"
                        style={{ animationDelay: `${(i * 5400) / requirements.length}ms` }}
                      />
                    </span>
                  ))}
                </span>
                <p className="max-w-[58ch] text-base leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none sm:text-lg">
                  <Marked
                    text={requirement}
                    mark={requirements as string[]}
                    className="font-semibold text-snow transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none"
                  />
                </p>
              </div>
            </div>
          </div>
        </Rise>

        {/* What the site has to answer by the end of the chain. Three answers,
            three ticks on the rule beneath them. */}
        <Rise delay={0.24} className="mt-14 border-t border-line pt-12">
          <div className="group">
            <p className="statement max-w-[46ch] text-balance text-snow">
              <Marked text={verdict} mark={verdictMark} className="text-brand" />
            </p>
            <span
              aria-hidden
              className="mt-8 flex w-40 gap-2 transition-all duration-500 group-hover:w-56 motion-reduce:transition-none"
            >
              {verdictMark.map((m, i) => (
                <span key={m} className="relative h-px flex-1 bg-ash/40">
                  <span
                    className="ci-blink absolute inset-0 bg-brand"
                    style={{ animationDelay: `${(i * 4800) / verdictMark.length}ms` }}
                  />
                </span>
              ))}
            </span>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

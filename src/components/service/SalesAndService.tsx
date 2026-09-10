import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** The opening chapter, and the only section on this page that is set rather
 *  than drawn.
 *
 *  WHY THERE IS NO PICTURE HERE. Its content is a route — four stages from
 *  search to visit — and both sibling industry pages already draw one: the
 *  ecommerce page runs a route with three leaks, the hospitality page runs a
 *  route with five feeders joining it. A third route would be this page's
 *  first impression after the banner and it would be the least original thing
 *  on it. The banner already carries the drawing that matters, and the section
 *  under this one carries the argument. So this chapter is set at scale, with
 *  the client's own emphasis, and the only structure on it is the one thing the
 *  paragraph actually names: the four stages, in order, once.
 *
 *  THE FOUR STAGES ARE THE DOCUMENT'S OWN FOUR WORDS — "the normal customer
 *  journey from search and consideration to enquiry and visit" — and they are
 *  printed as the stages of the rail rather than paraphrased into headings.
 *  The sentence they come from is printed underneath, so the reader can check
 *  the rail against its source without leaving the section.
 *
 *  MOTION. A light walks the rail, one stage at a time, using `ci-blink` from
 *  the Campaign Intelligence block: each tick shares a duration and takes a
 *  delay of duration divided by the number of ticks, which is what that class
 *  was written for. It rests lit, so a stopped rail is four stages present
 *  rather than three missing ones. */
export function SalesAndService({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  actions,
  actionsMark,
  journey,
  journeyStages,
  figures,
  figuresMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** The three moments the customer can be reached in. */
  lead: string;
  leadMark: [string, string, string];
  /** The four channels and the six actions they are connected to. */
  actions: string;
  actionsMark: string[];
  journey: string;
  journeyStages: [string, string, string, string];
  figures: string;
  figuresMark: string[];
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
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

        {/* THE SIX ENDINGS. Marked inside the client's own sentence rather than
            lifted into chips beside it, which would print the same six phrases
            on the page twice. */}
        <Rise>
          <p className="max-w-[68ch] border-l-2 border-brand pl-6 text-[clamp(1.05rem,1.9vw,1.5rem)] leading-[1.5] text-fog sm:pl-8">
            <Marked text={actions} mark={actionsMark} className="font-semibold text-snow" />
          </p>
        </Rise>

        {/* THE JOURNEY, ONCE. Four stages, in the document's order, on one
            rail. */}
        <Rise delay={0.12} className="mt-14 sm:mt-16">
          <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8 lg:p-10">
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {journeyStages.map((stage, i) => (
                <li key={stage} className="group relative min-w-0 lg:pr-8">
                  {/* The rail itself. One segment per stage, so the walking
                      light has somewhere to walk. */}
                  <span aria-hidden className="relative block h-px w-full bg-line">
                    <span
                      className="ci-blink absolute inset-y-0 left-0 w-1/3 bg-brand"
                      style={{ animationDelay: `${(i * 2400) / 4}ms` }}
                    />
                  </span>

                  <span
                    aria-hidden
                    className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-line transition-colors duration-500 group-hover:bg-brand motion-reduce:transition-none"
                  />

                  <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    ({String(i + 1).padStart(2, "0")})
                  </p>
                  <p className="font-display mt-2 text-[clamp(1.1rem,2vw,1.6rem)] font-extrabold uppercase leading-[1.1] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {stage}
                  </p>
                </li>
              ))}
            </ol>

            {/* The sentence the rail was read from, so the arrangement is
                checkable against its source without leaving the section. */}
            <p className="mt-9 max-w-[70ch] border-t border-line pt-7 text-sm leading-relaxed text-fog sm:text-base">
              <Marked
                text={journey}
                mark={["search and consideration to enquiry and visit"]}
                className="font-semibold text-snow"
              />
            </p>
          </div>
        </Rise>

        {/* What that has produced. Three of the nine figures the results
            section carries — the client's own repetition, left alone. */}
        <Rise delay={0.18} className="mt-12">
          <p className="max-w-[72ch] text-base leading-relaxed text-fog sm:text-lg">
            <Marked text={figures} mark={figuresMark} className="font-semibold text-brand-text" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

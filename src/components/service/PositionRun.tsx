import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "Why Choose ENH Marketing for Logistics Digital Marketing?" — seven claims,
 *  set as claims, in the treatment this site keeps for them.
 *
 *  THE FAMILY THIS BELONGS TO. Every pillar and industry page closes on a run
 *  of single assertions, and all of them are set the same way: ruled rows, two
 *  columns, a ghost-stroked numeral, the claim at reading scale and its own
 *  specific marked where it stands. That is deliberate and it is not a lack of
 *  imagination -- each of these is one sentence with no supporting paragraph,
 *  no figure and no stated relationship to the other six, and the site has
 *  already tried and removed the alternatives: cards give a one-line claim the
 *  visual weight of a service, and seven equal cells with invented diagrams in
 *  them were rejected outright on the hospitality page.
 *
 *  WHAT THIS ONE ADDS, BECAUSE THE DOCUMENT ADDS IT. Two sentences here are not
 *  claims at all. "Businesses comparing options should choose a digital
 *  marketing agency for logistics companies that understands how freight
 *  enquiries differ from ordinary consumer leads" is a test to apply to
 *  everybody on the shortlist, this agency included, so it closes the section
 *  at statement weight rather than sitting in the run as an eighth row. And
 *  "ENH Marketing can manage one priority channel or coordinate SEO,
 *  advertising, content and LinkedIn" is the only place the document says how
 *  wide the engagement can be, so both halves of that choice are marked and it
 *  sits inside the panel as the run's own footer.
 *
 *  THE RUN IS ON A PANEL rather than bare on the page, which is the one thing
 *  separating it from the automotive page's version of the same section. Same
 *  material, same vocabulary, different frame.
 *
 *  ONE LIGHT WALKS THE RUN. Not seven marks at seven positions -- that would be
 *  seven values to compare in a section that ranks none of its seven. */
export function PositionRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  items,
  itemMarks,
  scope,
  scopeMark,
  tail,
  tailMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string[];
  items: string[];
  itemMarks: string[][];
  scope: string;
  scopeMark: string[];
  tail: string;
  tailMark: string[];
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
          className="mb-12"
        />

        <Rise>
          <div className="rounded-[1.5rem] border border-line bg-ink-2 p-6 sm:p-8 lg:p-10">
            <ul className="grid gap-x-14 gap-y-0 border-t border-line lg:grid-cols-2">
              {items.map((item, i) => (
                <li
                  key={item}
                  className="group relative flex items-start gap-5 border-b border-line py-6 pl-4 transition-colors duration-500 motion-reduce:transition-none"
                >
                  {/* One claim lit at a time down the run. */}
                  <span
                    aria-hidden
                    className="ci-blink absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-r bg-brand"
                    style={{ animationDelay: `${(i * 6400) / items.length}ms` }}
                  />
                  <span
                    aria-hidden
                    className="font-display shrink-0 text-[1.75rem] font-extrabold leading-none text-stroke opacity-40 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[clamp(0.95rem,1.5vw,1.15rem)] leading-[1.5] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    <Marked
                      text={item}
                      mark={itemMarks[i]}
                      className="font-semibold text-snow group-hover:text-brand-text"
                    />
                  </p>
                </li>
              ))}
            </ul>

            {/* How wide the engagement can be asked to go. The run's own
                footer, inside the panel, because it is about the seven above
                it rather than about the section's closing test. */}
            <p className="mt-8 max-w-[76ch] text-sm leading-relaxed text-fog sm:text-base">
              <Marked text={scope} mark={scopeMark} className="font-semibold text-snow" />
            </p>
          </div>
        </Rise>

        {/* What to ask every agency on the shortlist, this one included. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Rise>
            <p className="font-display border-l-2 border-brand pl-6 text-[clamp(1.05rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.18] text-snow sm:pl-8">
              <Marked text={tail} mark={tailMark} className="text-brand" />
            </p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

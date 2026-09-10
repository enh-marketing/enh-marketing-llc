import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "What We Measure" — eleven measures, and the reading of each.
 *
 *  SET IN TWO COLUMNS RATHER THAN AS ONE ELEVEN-ROW TABLE. Eleven full-width
 *  rows is a scroll, and a reader arriving at this section is scanning for
 *  whether the thing they care about is on the list — which is a job for a
 *  short eye path, not a long one. Two columns of five and six halve it.
 *
 *  THE MEASURE IS SET LOUD AND ITS READING QUIET, because the document's two
 *  columns are not equal: "Qualified enquiries" is what a reader is looking
 *  for and "How many relevant prospects contact the business" is what they read
 *  once they have found it. Both column headers are the client's own and are
 *  printed once, above the register.
 *
 *  NOTHING IS SCORED. There is no bar, no weighting and no order of importance
 *  here: the document lists eleven measures and ranks none of them, and its
 *  closing note is a preference between kinds of measure, not between these
 *  eleven. */
export function MeasureRegister({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  headTrack,
  headTells,
  rows,
  note,
  noteMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  headTrack: string;
  headTells: string;
  rows: { track: string; tells: string }[];
  note: string;
  noteMark: string[];
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

        <Rise>
          <div className="flex items-baseline gap-6 border-b border-line pb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
            <span className="text-snow">{headTrack}</span>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="text-ash">{headTells}</span>
          </div>

          <ul className="grid lg:grid-cols-2 lg:gap-x-14">
            {rows.map((row, i) => (
              <li
                key={row.track}
                className="group border-b border-line py-5 transition-colors duration-500 motion-reduce:transition-none"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className="ci-blink h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-brand"
                    style={{ animationDelay: `${(i * 6600) / rows.length}ms` }}
                  />
                  <p className="font-display text-[clamp(1rem,1.6vw,1.25rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {row.track}
                  </p>
                  <span
                    aria-hidden
                    className="ml-auto h-px w-8 shrink-0 self-center bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
                  />
                </div>
                <p className="mt-2 pl-[1.375rem] text-sm leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                  {row.tells}
                </p>
              </li>
            ))}
          </ul>
        </Rise>

        {/* Why those eleven and not traffic. */}
        <Rise delay={0.14} className="mt-12">
          <p className="font-display max-w-4xl border-l-2 border-brand pl-6 text-[clamp(1.05rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.18] text-snow sm:pl-8">
            <Marked text={note} mark={noteMark} className="text-brand" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

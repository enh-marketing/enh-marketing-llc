import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { splitFigure } from "@/lib/figure";

type Item = { figure: string; label: string; unit: string };

/** "Automotive Campaign Results" — the document's nine figures.
 *
 *  NO AXIS, AND THAT IS THE POINT. The hospitality page plots its nine figures
 *  on a shared scale because they span five orders of magnitude and the spread
 *  is the story there. These nine are not one series: they come from different
 *  businesses, different campaign periods and different scopes, and the
 *  document says so in the sentence immediately after them. Putting 45,000
 *  advertising impressions and 50 SEO enquiry conversions on one axis would
 *  invite a comparison the source explicitly disclaims. So they are set as nine
 *  separate readings on one board, at one weight, in the document's own order.
 *
 *  THE HEDGE IS TYPESET, NOT DELETED. "More than", "Nearly", "Over" and
 *  "Approximately" are the difference between a count and a promise. Each
 *  figure is split at its last space so the qualifier can sit above the numeral
 *  at label size instead of competing with it — see lib/figure.ts. Nothing is
 *  reworded and the two halves concatenate back to the client's string.
 *
 *  THE UNIT PHRASE IS THE CLIENT'S TOO. "in a month" and "during peak months"
 *  are different claims about different figures and both are printed as
 *  written; the figures with no such phrase get none added. */
export function ResultsBoard({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** Ends in a colon in the source, so it sits directly above the board. */
  lead: string;
  items: Item[];
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
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => {
              const { hedge, numeral } = splitFigure(item.figure);
              return (
                <li
                  key={`${item.figure} ${item.label}`}
                  className="group relative flex min-h-[13rem] flex-col justify-between bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none sm:p-7"
                >
                  <span
                    aria-hidden
                    className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand"
                    style={{ animationDelay: `${(i * 7200) / items.length}ms` }}
                  />

                  <div>
                    {hedge && (
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                        {hedge}
                      </p>
                    )}
                    <p className="font-display mt-2 text-[clamp(2.4rem,4.6vw,3.6rem)] font-extrabold uppercase leading-none text-snow">
                      {numeral}
                    </p>
                  </div>

                  <div className="mt-6">
                    <span
                      aria-hidden
                      className="block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
                    />
                    <p className="mt-4 text-sm leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {item.label}
                    </p>
                    {item.unit && (
                      <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ash">
                        {item.unit}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Rise>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

type Row = { track: string; tells: string };

/** "What We Measure" — eleven measures, and the reading of the eleven in the
 *  twelfth place.
 *
 *  THE NOTE IS NOT A FOOTNOTE. "Traffic and impressions show visibility. RFQs,
 *  shipment details and qualified conversations show whether that visibility is
 *  commercially useful." That is the only sentence in the section that ranks
 *  anything, and in the source it sits under the table in the same grey as the
 *  rest. Eleven measures fill eleven cells of a twelve-cell board, so it takes
 *  the twelfth and is inked -- the reading of the register, in the register, at
 *  the weight it was written with.
 *
 *  NOTHING IS SORTED INTO THOSE TWO CLASSES, AND THAT IS DELIBERATE. The note
 *  names three commercial measures and two kinds of visibility measure; the
 *  table has eleven rows, and four of them ("Cost per lead", "Paid campaign
 *  conversions", "LinkedIn performance", "Landing page conversion rate") are
 *  named by neither half. Filing all eleven under two headings would mean
 *  inventing the four assignments the document does not make. So the eleven
 *  keep the document's own order and the note states the preference itself.
 *
 *  TWO LINES PER CELL, TWO WEIGHTS, AND THE KEY ABOVE THE BOARD SAYS WHICH IS
 *  WHICH. "Shipment enquiries" is what a reader is scanning for; "How many
 *  prospects request support for a specific shipment" is what they read once
 *  they have found it. Both column headers are the client's own and are printed
 *  once, in the key, rather than repeated over every cell. */
export function MeasureBoard({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  headTrack,
  headTells,
  rows,
  noteVisibility,
  noteUseful,
  noteUsefulMark,
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
  rows: Row[];
  noteVisibility: string;
  noteUseful: string;
  noteUsefulMark: string[];
}) {
  /** The board's cell count, note included, so the walking light's delays are
   *  spread over what is actually on screen. */
  const cells = rows.length + 1;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-12"
        />

        {/* The key: the anatomy of one cell, using the client's own two column
            headers. */}
        <Rise>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
            {/* The whitespace around the rule is real: without it the two
                column headers concatenate in textContent and the key reads as
                "What we trackWhat it tells you". */}
            <span className="text-snow">{headTrack}</span>{" "}
            <span aria-hidden className="h-px w-10 bg-line" />{" "}
            <span className="font-normal text-ash">{headTells}</span>
          </div>
        </Rise>

        <Rise delay={0.08}>
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {rows.map((row, i) => (
              <li
                key={row.track}
                className="group relative flex min-h-[10.5rem] flex-col justify-between bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none"
              >
                <span
                  aria-hidden
                  className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand"
                  style={{ animationDelay: `${(i * 7200) / cells}ms` }}
                />

                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    ({String(i + 1).padStart(2, "0")})
                  </p>
                  <p className="font-display mt-3 text-[clamp(1.05rem,1.5vw,1.2rem)] font-extrabold uppercase leading-[1.14] text-snow">
                    {row.track}
                  </p>
                </div>

                <div className="mt-6">
                  <span
                    aria-hidden
                    className="block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
                  />
                  <p className="mt-4 text-sm leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {row.tells}
                  </p>
                </div>
              </li>
            ))}

            {/* THE TWELFTH CELL. The reading of the other eleven, inked with a
                brand tint rather than a surface token: the section banding
                assigns ink-2 and ink-3 by position, so a cell painted with a
                surface token can land the same colour as the board it sits in.
                A tint over whatever is behind it shifts by the same amount in
                both themes and cannot vanish. */}
            <li className="group relative flex min-h-[10.5rem] flex-col justify-between bg-ink-2 p-6">
              <span aria-hidden className="absolute inset-0 bg-brand/[0.07]" />
              <span
                aria-hidden
                className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand"
                style={{ animationDelay: `${(rows.length * 7200) / cells}ms` }}
              />

              <p className="relative text-sm leading-relaxed text-fog">{noteVisibility}</p>

              <div className="relative mt-6">
                <span aria-hidden className="block h-px w-full bg-brand/40" />
                <p className="mt-4 text-sm leading-relaxed text-fog">
                  <Marked
                    text={noteUseful}
                    mark={noteUsefulMark}
                    className="font-semibold text-brand-text"
                  />
                </p>
              </div>
            </li>
          </ul>
        </Rise>
      </Container>
    </section>
  );
}

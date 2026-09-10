import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

type Row = { track: string; tells: string };

/** "What We Measure" — twelve measures, and the two the client's own closing
 *  sentence names.
 *
 *  THE SORT IS THE DOCUMENT'S, AND IT IS PRINTED. This section closes with two
 *  sentences that are a contrast rather than a summary: "Traffic and
 *  impressions show how many people find the provider. Enquiries and
 *  appointment requests show whether that visibility is producing useful
 *  results." The second sentence names two of the twelve rows by name --
 *  Consultation enquiries and Appointment requests -- and they are the first
 *  two in the client's own table. So those two take a wider cell and a larger
 *  setting, and the sentence they were read from is printed underneath where a
 *  reader can check the working. Nothing else is reordered: rows three to
 *  twelve stand in the document's order.
 *
 *  THIS IS NOT A RANKING OF THE TWELVE. The lede says patient actions matter
 *  "as well as visibility", not instead of it, and the quieter of the two
 *  closing sentences is set at the same weight as the louder one for exactly
 *  that reason. Two cells are wider because one sentence singles them out; the
 *  other ten are not lesser and are not scored.
 *
 *  EVERY ROW IS LEGIBLE AT ONCE. Nothing is collapsed, nothing is behind a tab
 *  and nothing needs a hover to be read. A reader arriving here is scanning for
 *  whether the thing they care about is measured, and that is a job for one
 *  screen, not for twelve clicks.
 *
 *  NO FIGURES ANYWHERE. Every reading is a sentence about what a measure means.
 *  The numbers this page has are in the results section, under a caveat. */

/** Column span out of twelve, per row, in the document's order. The first two
 *  are wide because the closing sentence names them; the rest tile 4-4-4,
 *  3-3-3-3, 4-4-4 so every row completes and no row repeats the one above. */
const SPANS = [
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

export function PatientRecord({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  headTrack,
  headTells,
  rows,
  noteFind,
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
  leadMark: string[];
  headTrack: string;
  headTells: string;
  rows: Row[];
  noteFind: string;
  noteUseful: string;
  noteUsefulMark: string[];
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
          className="mb-12"
        />

        {/* Both column headers, the client's own, printed once. */}
        <Rise>
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em]">
            <span className="text-snow">{headTrack}</span>{" "}
            <span aria-hidden className="h-px w-10 bg-line" />{" "}
            <span className="font-normal text-ash">{headTells}</span>
          </div>
        </Rise>

        <Rise delay={0.06}>
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-12">
            {rows.map((row, i) => {
              const named = i < 2;
              return (
                <li
                  key={row.track}
                  className={`group relative flex flex-col justify-between bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none ${
                    named ? "min-h-[11rem] sm:p-8" : "min-h-[9.5rem]"
                  } ${SPANS[i]}`}
                >
                  {/* The record being read: one tick lit at a time, in the
                      document's own row order. */}
                  <span
                    aria-hidden
                    className="ci-blink absolute inset-x-0 top-0 h-[3px] bg-brand"
                    style={{ animationDelay: `${(i * 6000) / rows.length}ms` }}
                  />

                  <div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                      ({String(i + 1).padStart(2, "0")})
                    </p>
                    <p
                      className={`font-display mt-3 font-extrabold uppercase leading-[1.12] text-snow ${
                        named
                          ? "text-[clamp(1.35rem,2.6vw,2rem)]"
                          : "text-[clamp(1rem,1.5vw,1.2rem)]"
                      }`}
                    >
                      {row.track}
                    </p>
                  </div>

                  <div className="mt-6">
                    <span
                      aria-hidden
                      className="block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
                    />
                    <p
                      className={`mt-4 leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none ${
                        named ? "text-sm sm:text-base" : "text-sm"
                      }`}
                    >
                      {row.tells}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Rise>

        {/* The two closing sentences, side by side because they are a contrast
            and not a summary — and the second is where the first two cells above
            got their width, so it is set where the reader can check that. */}
        <Rise delay={0.12} className="mt-10">
          <div className="grid gap-8 rounded-[1.25rem] border border-line bg-ink-2 p-7 sm:p-9 lg:grid-cols-2 lg:gap-14">
            <p className="max-w-[46ch] text-base leading-relaxed text-fog sm:text-lg">{noteFind}</p>
            <p className="max-w-[46ch] text-base leading-relaxed text-fog sm:text-lg">
              <Marked text={noteUseful} mark={noteUsefulMark} className="font-semibold text-brand-text" />
            </p>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

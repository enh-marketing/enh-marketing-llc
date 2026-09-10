import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

type Row = { challenge: string; happening: string; attention: string };

/** "What Prevents Automotive Marketing From Generating More Enquiries?"
 *
 *  The document's own seven-row, three-column table, and the only section on
 *  any of the three industry pages that diagnoses rather than describes. A
 *  symptom, a cause and a remedy are three different kinds of statement, so the
 *  three columns stay three columns and keep the client's own headers. Folding
 *  them into one paragraph per row would lose which is which, and folding them
 *  behind an accordion would put a second accordion on a page that already ends
 *  in eight FAQs.
 *
 *  THE NOTATION, AND IT IS THE ONLY ONE ON THIS PAGE. Between the symptom and
 *  its cause the line is broken; between the cause and what needs attention it
 *  is whole. A gap meaning "this is where it stops working" needs no key.
 *
 *  THE HOVER REPAIRS THE ROW. Reading across a row and putting the cursor on it
 *  closes the break: the dashed segment gives way to a solid brand one drawn
 *  left to right. That is the section's argument performed rather than stated —
 *  the third column is what closes the gap in the second — and it is why these
 *  rows carry a hover state despite going nowhere. Nothing is hidden behind it:
 *  all twenty-one cells are on the page at rest.
 *
 *  MOTION. One light walks down the register, a row at a time, on `ci-blink`
 *  from the Campaign Intelligence block — the same duration on every tick with
 *  a delay of duration over seven. It rests lit. */
export function FaultRegister({
  id,
  label,
  index,
  title,
  strokeTitle,
  headChallenge,
  headHappening,
  headAttention,
  rows,
  verdict,
  verdictMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  headChallenge: string;
  headHappening: string;
  headAttention: string;
  rows: Row[];
  verdict: string;
  verdictMark: string[];
}) {
  const COLS = "lg:grid-cols-[minmax(0,1.05fr)_2.75rem_minmax(0,1.15fr)_2.75rem_minmax(0,1.15fr)]";

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance text-snow">
              <Marked text={verdict} mark={verdictMark} className="text-brand" />
            </p>
          }
          className="mb-14"
        />

        <Rise>
          <div className="rounded-[1.25rem] border border-line bg-ink-2">
            {/* The document's own column headers. */}
            <div
              className={`hidden gap-x-5 border-b border-line px-7 py-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash lg:grid lg:px-9 ${COLS}`}
            >
              <span>{headChallenge}</span>
              <span aria-hidden />
              <span>{headHappening}</span>
              <span aria-hidden />
              <span className="text-brand-text">{headAttention}</span>
            </div>

            <ul>
              {rows.map((row, i) => (
                <li
                  key={row.challenge}
                  className={`group relative grid gap-x-5 gap-y-4 border-b border-line px-7 py-7 transition-colors duration-500 last:border-b-0 hover:bg-ink-3 motion-reduce:transition-none lg:items-center lg:px-9 ${COLS}`}
                >
                  {/* The walking light: one tick per row, sharing a duration
                      and taking a delay of duration over seven. */}
                  <span
                    aria-hidden
                    className="ci-blink absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-brand"
                    style={{ animationDelay: `${(i * 6000) / rows.length}ms` }}
                  />

                  {/* The symptom. */}
                  <div className="min-w-0">
                    <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none lg:hidden">
                      {headChallenge}
                    </p>
                    <p className="font-display flex items-baseline gap-3 text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold uppercase leading-[1.18] text-snow">
                      <span
                        aria-hidden
                        className="text-[0.6875rem] tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {row.challenge}
                    </p>
                  </div>

                  {/* THE BREAK. Dashed at rest; closed by a solid brand segment
                      drawn left to right when the row is hovered. */}
                  <span aria-hidden className="relative hidden h-px self-center lg:block">
                    <span className="absolute inset-x-0 top-0 border-t border-dashed border-ash/70 transition-opacity duration-300 group-hover:opacity-0 motion-reduce:transition-none" />
                    <span className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 motion-reduce:transition-none" />
                  </span>

                  {/* The cause. */}
                  <div className="min-w-0">
                    <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash lg:hidden">
                      {headHappening}
                    </p>
                    <p className="text-sm leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {row.happening}
                    </p>
                  </div>

                  {/* WHOLE. The joint between the cause and the fix was never
                      the broken one. */}
                  <span aria-hidden className="relative hidden h-px self-center lg:block">
                    <span className="absolute inset-0 bg-line transition-colors duration-500 group-hover:bg-brand motion-reduce:transition-none" />
                    <span className="absolute right-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 translate-x-px rotate-45 border-r border-t border-line transition-colors duration-500 group-hover:border-brand motion-reduce:transition-none" />
                  </span>

                  {/* The remedy. */}
                  <div className="min-w-0">
                    <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand-text lg:hidden">
                      {headAttention}
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {row.attention}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

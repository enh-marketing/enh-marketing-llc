import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import type { ResultItem } from "@/content/industries/healthcare";

/** "Healthcare Campaign Results" — nine figures, nine equal cells.
 *
 *  EQUALITY IS THE ARGUMENT, AND THE CLIENT WROTE IT. The band immediately
 *  below this one says these figures "come from different healthcare providers,
 *  treatments and campaign periods". Different providers, different treatments,
 *  different months: no two of them belong on one scale, none of them is bigger
 *  than another in any sense a reader could check, and none is a trend. So
 *  every cell is the same size, there is no axis, no bar, no sort and no lead
 *  figure. A results section that ranked these would be claiming a comparison
 *  its own caveat denies one sentence later.
 *
 *  THE HEDGE IS SET APART FROM THE FIGURE BECAUSE IT IS NOT THE FIGURE. The
 *  client wrote "More than 18,000", "Nearly 7,000", "Between 300 and 600" --
 *  four of these nine are floors, one is a ceiling and two are ranges, and a
 *  page that printed nine bare numerals would be quietly upgrading every hedged
 *  claim into a flat one. The qualifier is set small and quiet above the value
 *  it qualifies, in the client's own words, so the claim on the page is exactly
 *  the claim in the document. Stripped of markup each cell reads back as the
 *  client's own line.
 *
 *  WHAT RUNS. One packet along each cell's rule, on its own delay: these are
 *  nine separate campaigns that ran, not nine readings of one. The rule is the
 *  same length in every cell and carries no scale. Stopped, the packet is gone
 *  and the rule remains drawn, which is the finished state of a campaign
 *  period. */

export function FigureSheet({
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
  /** Ends in a colon in the source, so it sits directly above the sheet. */
  lead: string;
  items: ResultItem[];
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
            {items.map((item, i) => (
              <li
                key={`${item.hedge}-${item.value}-${item.label}`}
                className="group flex min-h-[13rem] flex-col justify-between bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none sm:p-7"
              >
                <div>
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    ({String(i + 1).padStart(2, "0")})
                  </p>

                  {/* The qualifier, in the client's own words, set apart from
                      the value it qualifies. */}
                  <p className="font-display mt-6 text-[0.6875rem] font-extrabold uppercase tracking-[0.2em] text-ash">
                    {item.hedge}
                  </p>
                  <p className="font-display mt-2 text-[clamp(2.1rem,4vw,3.1rem)] font-extrabold uppercase leading-none text-snow transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    {item.value}
                  </p>
                  <p className="mt-4 max-w-[26ch] text-sm leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {item.label}
                  </p>
                  {item.unit && (
                    <p className="mt-2 max-w-[30ch] text-[0.6875rem] font-semibold uppercase leading-snug tracking-[0.14em] text-ash">
                      {item.unit}
                    </p>
                  )}
                </div>

                {/* One campaign period, run. Same length in every cell, and
                    every cell's packet on the same clock: nine packets at nine
                    different points along nine rules is nine positions a reader
                    can compare, which is a quantity, and the caveat below says
                    these nine are not comparable. In lockstep there is nothing
                    to read off. */}
                <svg
                  viewBox="0 0 200 8"
                  aria-hidden
                  focusable="false"
                  className="mt-8 block h-2 w-full"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 4 H200"
                    stroke="var(--color-ash)"
                    strokeWidth="1"
                    strokeOpacity="0.32"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 4 H200"
                    pathLength="100"
                    stroke="var(--color-brand)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    className="ci-flow"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </Rise>
      </Container>
    </section>
  );
}

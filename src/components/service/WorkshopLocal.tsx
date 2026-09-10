import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";

/** "Digital Marketing for Auto Repair Shops and Service Centres" — the short
 *  clock, and the second of the document's two business chapters.
 *
 *  COMPOSED AS THE OPPOSITE OF THE CHAPTER ABOVE IT, ON PURPOSE. The dealership
 *  chapter is a journey with a junction in it because that document paragraph
 *  is about where to send people over a long decision. This one is not a
 *  journey at all: "Auto repair shop digital marketing is driven heavily by
 *  immediate need and location. Drivers usually search for a specific service,
 *  repair or nearby workshop rather than browsing general automotive content."
 *  There is nothing to travel down. What there is, is a place that has to be
 *  correctly described — so the section is built around a record rather than a
 *  route, and the record is the thing the document names: what each branch
 *  needs, and what its local visibility is measured by.
 *
 *  THE FIVE FIELDS ARE THE DOCUMENT'S FIVE. "each branch needs accurate opening
 *  hours, contact information, categories, reviews and directions" — one row
 *  each, nothing added, nothing filled in with specimen data. A record with
 *  invented opening hours in it would be a fabricated listing for a business
 *  that does not exist.
 *
 *  THE FOUR MEASURES LEAVE THE RECORD. "Local visibility should be measured
 *  through calls, website visits, direction requests and completed service
 *  appointments" — four outcomes, on a rule under the record, with the light
 *  walking between them on `ci-blink`. Nothing is counted: there is no figure
 *  anywhere in this section of the document.
 *
 *  NOTHING HERE IS A LEDGER OF SCORES. The check marks say a field is present,
 *  which is what "accurate" and "complete" mean in the source's own diagnosis
 *  two sections earlier ("Business profiles are incomplete or poorly
 *  maintained"). They are not a rating. */
export function WorkshopLocal({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  pageStem,
  pageItems,
  pageTail,
  paid,
  paidMark,
  branchStem,
  branchItems,
  measuredStem,
  measuredItems,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string[];
  pageStem: string;
  pageItems: string[];
  pageTail: string;
  paid: string;
  paidMark: string[];
  branchStem: string;
  branchItems: string[];
  measuredStem: string;
  measuredItems: string[];
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

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* What each service page has to explain. Three questions, and they
              are questions, so they are set as one page's three fields. */}
          <Rise>
            <p className="text-base leading-relaxed text-fog sm:text-lg">{pageStem}</p>
            <ol className="mt-6 grid gap-3">
              {pageItems.map((q, i) => (
                <li
                  key={q}
                  className="group flex items-center gap-4 rounded-xl border border-line bg-ink-2 px-5 py-4 transition-colors duration-500 hover:border-brand/55 hover:bg-ink-3 motion-reduce:transition-none"
                >
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[clamp(0.95rem,1.5vw,1.15rem)] font-extrabold uppercase leading-[1.16] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    {q}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-fog sm:text-base">
              {pageTail}
            </p>
            <p className="mt-8 max-w-[62ch] border-l-2 border-brand pl-6 text-sm leading-relaxed text-fog sm:pl-8 sm:text-base">
              <Marked text={paid} mark={paidMark} className="font-semibold text-snow" />
            </p>
          </Rise>

          {/* THE BRANCH RECORD. */}
          <Rise delay={0.1}>
            <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
              <p className="text-sm leading-relaxed text-fog sm:text-base">{branchStem}</p>

              <ul className="mt-7 border-t border-line">
                {branchItems.map((field) => (
                  <li
                    key={field}
                    className="group flex items-center gap-4 border-b border-line py-4 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none"
                  >
                    <span
                      aria-hidden
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-brand motion-reduce:transition-none"
                    >
                      <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" aria-hidden>
                        <path
                          d="M3 7.4 L5.8 10 L11 4"
                          stroke="var(--color-brand)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-display text-[clamp(0.95rem,1.4vw,1.1rem)] font-extrabold uppercase leading-[1.16] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {field}
                    </span>
                    <span
                      aria-hidden
                      className="ml-auto h-px w-8 bg-line transition-all duration-500 group-hover:w-14 group-hover:bg-brand motion-reduce:transition-none"
                    />
                  </li>
                ))}
              </ul>

              {/* And what the record is judged by. */}
              <p className="mt-8 text-sm leading-relaxed text-fog sm:text-base">{measuredStem}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {measuredItems.map((m, i) => (
                  <li key={m} className="group relative flex items-center gap-3 pl-4">
                    <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line">
                      <span
                        className="ci-blink absolute inset-x-0 top-0 h-full bg-brand"
                        style={{ animationDelay: `${(i * 6000) / measuredItems.length}ms` }}
                      />
                    </span>
                    <span className="text-sm leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {m}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

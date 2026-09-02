import { Rise } from "@/components/fx/Reveal";

/** How much content you need, set as the sheet that decides it.
 *
 *  The section answers a "how many" question by refusing to give a number, and
 *  the old layout put that refusal in the header and then two ordinary ruled
 *  lists underneath, which made it read like every other list on the page. The
 *  content is not a list though. It is a determination: two businesses that
 *  cannot share a schedule, seven things that are assessed, and a promise that
 *  the figure appears in the proposal.
 *
 *  So it is drawn as the assessment itself. The two businesses sit at opposite
 *  ends of one tempo, because that is what the document says distinguishes them
 *  and nothing else about them is claimed. The seven run as line items with
 *  dotted leaders and an unfilled column, which is a form, not a list: the
 *  blanks are the reader's own business, and they are labelled as such. The
 *  total line is where a number would go, and it carries the document's promise
 *  instead of one, because inventing a figure here is exactly the thing the
 *  copy exists to refuse.
 *
 *  Dotted leaders are new on this site on purpose. Nothing else here reads as
 *  paperwork, and this section should. */
export function ScopeSheet({
  noNumber,
  restaurant,
  professional,
  platforms,
  factorsLead,
  factors,
  proposal,
}: {
  noNumber: string;
  restaurant: string;
  professional: string;
  platforms: string;
  factorsLead: string;
  factors: string[];
  proposal: string;
}) {
  return (
    <div>
      {/* The answer, stated as a refusal. */}
      <Rise>
        <p className="font-display text-[clamp(1.3rem,2.7vw,2.15rem)]  font-extrabold uppercase text-brand">
          {noNumber}
        </p>
      </Rise>

      {/* The two businesses, at opposite ends of one tempo. The axis carries
          only the distinction the document draws: one can film often, the
          other needs longer. Nothing else about either is asserted. */}
      <Rise delay={0.1} className="mt-9">
        <div className="grid gap-y-7 lg:grid-cols-2 lg:gap-x-16">
          {[
            { tempo: "Can film often", line: restaurant, lead: true },
            { tempo: "Needs longer", line: professional, lead: false },
          ].map((c) => (
            <div key={c.tempo}>
              <div className="flex items-center gap-4">
                <span className="font-display shrink-0 text-[0.62rem] font-semibold uppercase text-brand-text">
                  {c.tempo}
                </span>
                {/* The axis. Solid where the tempo is high, and thinning to a
                    hairline where it is not. */}
                <span
                  aria-hidden
                  className={
                    c.lead
                      ? "h-[2px] flex-1 bg-brand"
                      : "h-px flex-1 bg-gradient-to-r from-line to-transparent"
                  }
                />
              </div>
              <p className="font-display mt-4 text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.2] text-snow">
                {c.line}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-7 max-w-3xl leading-relaxed text-fog sm:text-lg">{platforms}</p>
      </Rise>

      {/* The sheet. */}
      <Rise delay={0.16} className="mt-10">
        <div className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-line pb-4">
            <p className="font-display text-[0.62rem] font-semibold uppercase text-brand-text">
              {factorsLead}
            </p>
            {/* Names the empty column, so the blanks read as a form to be
                completed rather than as missing content. */}
            <p
              aria-hidden
              className="font-display text-[0.62rem] font-semibold uppercase text-ash"
            >
              Your business
            </p>
          </div>

          <ol className="mt-1">
            {factors.map((factor, i) => (
              <li key={factor} className="group">
                <div className="flex items-baseline gap-3 py-3 sm:gap-5">
                  <span
                    aria-hidden
                    className="font-display shrink-0 text-[0.6rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug text-fog transition-colors duration-500 group-hover:text-snow">
                    {factor}
                  </span>
                  {/* The leader. Dotted, so the row reads as paperwork rather
                      than as another ruled list item. */}
                  <span
                    aria-hidden
                    className="mx-1 hidden min-w-8 flex-1 translate-y-[-0.3em] border-b border-dotted border-line transition-colors duration-500 group-hover:border-ash sm:block"
                  />
                  <span
                    aria-hidden
                    className="hidden w-24 shrink-0 translate-y-[-0.3em] border-b border-line transition-colors duration-500 group-hover:border-brand/60 sm:block lg:w-32"
                  />
                </div>
              </li>
            ))}
          </ol>

          {/* The total line: where the number would be. */}
          <div className="mt-3 border-t-2 border-line pt-5">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3">
              <span className="font-display shrink-0 text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-none text-snow">
                Monthly output
              </span>
              <span
                aria-hidden
                className="hidden min-w-8 flex-1 translate-y-[-0.35em] border-b border-dotted border-ash/50 sm:block"
              />
              <span className="font-display shrink-0 text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-none text-brand">
                Stated in your proposal
              </span>
            </div>
            <p className="mt-5 max-w-3xl leading-relaxed text-fog sm:text-lg">{proposal}</p>
          </div>
        </div>
      </Rise>
    </div>
  );
}

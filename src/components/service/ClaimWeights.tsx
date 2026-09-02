import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

export type WeightedClaim = { title: string; body?: string };

/** Six claims, set at the weight the document gives each one.
 *
 *  They were six rows of one height, which quietly asserts that the six are
 *  equivalent. They are not. Three are bare statements the source never
 *  elaborates ("We produce at volume."), three carry an explanation, and one of
 *  those is a refusal that costs the agency money to make. Setting all six the
 *  same way spends the same space on a four-word claim as on the one paragraph
 *  a prospect is most likely to remember.
 *
 *  So each row is typed by what it contains. A bare claim gets the full measure
 *  and display scale, since a sentence with no support has to carry itself. A
 *  claim with a body splits into statement and explanation. The refusal gets a
 *  panel of its own.
 *
 *  The rhythm is irregular because the content is irregular, and no claim is
 *  padded to match its neighbours. */

/** The one claim that costs the agency something to make. Identified from the
 *  copy rather than by index, so reordering the list cannot mislabel it. */
const isRefusal = (title: string) => /^we will tell you/i.test(title);

export function ClaimWeights({ items }: { items: WeightedClaim[] }) {
  return (
    <ol className="border-t border-line">
      {items.map((claim, i) => {
        const refusal = isRefusal(claim.title);

        if (refusal) {
          return (
            <li key={claim.title} className="border-b border-line py-8">
              <Rise delay={Math.min(i, 4) * 0.05}>
                <div className="rounded-[1.25rem] border border-brand/45 bg-brand/[0.06] p-7 sm:p-9">
                  <span className="font-display block text-[0.58rem] font-semibold uppercase text-brand-text">
                    The one that costs us
                  </span>
                  <h3 className="font-display mt-4 max-w-3xl text-[clamp(1.35rem,3vw,2.3rem)] font-extrabold uppercase leading-[1.1] text-brand">
                    {claim.title}
                  </h3>
                  {claim.body && (
                    <p className="mt-5 max-w-2xl leading-relaxed text-snow sm:text-lg">
                      {claim.body}
                    </p>
                  )}
                </div>
              </Rise>
            </li>
          );
        }

        // A statement the source leaves bare. It gets the width and the scale,
        // because there is no second column to fill and nothing is invented to
        // fill one.
        if (!claim.body) {
          // Scale runs against length, not with it. All three bare claims at
          // display size handed the most weight to the longest sentence
          // ("Arabic content through vetted regional partners...", three lines
          // at that size), which is the opposite of what scale should say: a
          // four-word claim is emphatic because it is short. So the two that
          // hold a single line at display size keep it, and the one that does
          // not steps down rather than dominating the section.
          const terse = claim.title.split(/\s+/).length <= 9;
          return (
            <li key={claim.title} className="group border-b border-line">
              <Rise delay={Math.min(i, 4) * 0.05}>
                <div className="flex items-baseline gap-6 py-6 sm:gap-9">
                  <span
                    aria-hidden
                    className="mt-3 h-2 w-2 shrink-0 rounded-full bg-brand transition-transform duration-500 group-hover:scale-150 sm:h-2.5 sm:w-2.5"
                  />
                  <h3
                    className={cn(
                      "font-display font-extrabold uppercase text-snow",
                      terse
                        ? "display-xl leading-[1.04]"
                        : "text-[clamp(1.25rem,2.8vw,2.1rem)] leading-[1.14]",
                    )}
                  >
                    {claim.title}
                  </h3>
                </div>
              </Rise>
            </li>
          );
        }

        // A claim with an explanation: statement one side, reason the other.
        return (
          <li key={claim.title} className="group relative border-b border-line">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
            <Rise delay={Math.min(i, 4) * 0.05}>
              <div
                className={cn(
                  "grid gap-x-14 gap-y-3 py-6",
                  "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-baseline",
                )}
              >
                <h3 className="font-display text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.18] text-snow">
                  {claim.title}
                </h3>
                <p className="leading-relaxed text-fog sm:text-lg">{claim.body}</p>
              </div>
            </Rise>
          </li>
        );
      })}
    </ol>
  );
}

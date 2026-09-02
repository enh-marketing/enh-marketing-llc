import { Rise } from "@/components/fx/Reveal";

export type Disqualifier = { title: string; body: string };

/** The four reasons not to run Snapchat, as one band of exclusions.
 *
 *  This replaces an interactive version that made the four checkable and lit
 *  the rule once you crossed two. The arithmetic in the copy is real, but the
 *  design put the section's whole payoff behind an interaction: measured at
 *  rest, the section had no brand colour anywhere in it, and the best sentence
 *  on the page sat dormant in ash until a reader chose to tick boxes about why
 *  they should not hire the agency. That is friction in the wrong direction on
 *  a page whose job is to earn trust, and underneath it the four were still
 *  four bordered rows.
 *
 *  Set as a band instead, and always on. The four are one enclosure divided by
 *  hairlines rather than four items stacked down the page, so the top-level
 *  read is a single object and the page gets a horizontal beat it otherwise
 *  never has. Every title is ruled out with a mark, because that is what the
 *  section does: it excludes.
 *
 *  The rule carries at display scale in brand whatever the reader does, with
 *  the threshold marked inside it. That keeps the arithmetic visible and the
 *  refusal loud, which is the reason the document offers this section as its
 *  differentiator in the first place. */

/** The threshold, emphasised inside the sentence rather than lifted out of it.
 *  Splitting the rule and setting half at display scale left a fragment
 *  starting mid-sentence; marking it in place keeps the sentence whole. */
const THRESHOLD = "two or more";

function markThreshold(rule: string) {
  const at = rule.indexOf(THRESHOLD);
  if (at < 0) return rule;
  return (
    <>
      {rule.slice(0, at)}
      <span className="relative whitespace-nowrap">
        {THRESHOLD}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-1 h-[3px] bg-brand/45 sm:-bottom-2 sm:h-[5px]"
        />
      </span>
      {rule.slice(at + THRESHOLD.length)}
    </>
  );
}

export function ExclusionBand({ items, rule }: { items: Disqualifier[]; rule: string }) {
  return (
    <div>
      <Rise>
        <p className="font-display mb-5 text-[0.62rem] font-semibold uppercase text-brand-text">
          Ruled out
        </p>
      </Rise>

      {/* One enclosure, four cells, hairlines between. Gapless on purpose: four
          separate cards would put us back where this started. */}
      <Rise delay={0.06}>
        <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.title}
              /* Dividers are the container's own background showing through a
                 one-pixel gap, so they land correctly at one, two and four
                 columns without a rule ever hanging off an outside edge. */
              className="group relative bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 sm:p-7"
            >
              <div className="flex items-start gap-3">
                {/* The mark. These are exclusions, so they are struck out. */}
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="mt-1 h-4 w-4 shrink-0 text-brand transition-transform duration-500 group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                >
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
                <h3 className="font-display text-[clamp(1.05rem,1.9vw,1.35rem)] font-extrabold uppercase leading-[1.15] text-snow">
                  {item.title}
                </h3>
              </div>

              <p className="mt-4 leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Rise>

      {/* The rule. Always on, always brand, threshold marked in place. */}
      <Rise delay={0.14} className="mt-10">
        <p className="font-display text-[clamp(1.3rem,2.7vw,2.15rem)] font-extrabold uppercase leading-[1.06] text-brand">
          {markThreshold(rule)}
        </p>
      </Rise>
    </div>
  );
}

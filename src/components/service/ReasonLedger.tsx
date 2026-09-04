"use client";

import { cn } from "@/lib/cn";
import { Rise } from "@/components/fx/Reveal";

/** "Why Choose ENH Marketing for X", set as claims rather than as cards.
 *
 *  WHY NOT CARDS. Each of these is a single assertion, most of them one or two
 *  sentences, and all four pillar documents write them as a run of flat
 *  statements. Putting eight one-liners into eight rounded rectangles gives
 *  each the visual weight of a service and turns a page's argument into
 *  furniture. Set as ruled rows with the claim at heading scale, they read as
 *  what they are: a list of positions the agency is taking.
 *
 *  THE LEAD IS PART OF THE ARGUMENT. Each document opens the section with a
 *  sentence that frames the rest -- the years of experience, or the observation
 *  that everyone promises rankings. It is set apart at the top rather than
 *  folded in as another claim.
 *
 *  Two columns on wide screens, because these are peers with no order between
 *  them; a single tall column would imply a ranking the documents do not give.
 *  They are numbered only for scanning, and the numerals are ghosted so they
 *  never read as a sequence of steps. */
export function ReasonLedger({
  lead,
  items,
  tail,
}: {
  /** The framing sentence the section opens with, where the source writes one. */
  lead?: string;
  /** One claim per entry, in the document's order. */
  items: string[];
  /** A closing line some of the documents end the section on. */
  tail?: string;
}) {
  return (
    <div className="relative">
      {lead && (
        <Rise>
          <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
            {lead}
          </p>
        </Rise>
      )}

      <ol className={cn("grid border-t border-line md:grid-cols-2", lead && "mt-12")}>
        {items.map((claim, i) => (
          <li key={claim} className="border-b border-line">
            <Rise
              delay={0.04 * i}
              className={cn(
                "flex h-full gap-5 py-6 md:pr-10",
                i % 2 === 1 && "md:border-l md:border-line md:pl-10",
              )}
            >
              <span
                aria-hidden
                className="font-display shrink-0 pt-0.5 text-sm font-extrabold text-brand/45"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-[clamp(0.98rem,1.7vw,1.15rem)] font-bold leading-[1.4] text-snow">
                {claim}
              </p>
            </Rise>
          </li>
        ))}
      </ol>

      {tail && (
        <Rise delay={0.12}>
          <p className="mt-8 max-w-3xl leading-relaxed text-fog">{tail}</p>
        </Rise>
      )}
    </div>
  );
}

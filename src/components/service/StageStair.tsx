import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

export type StairStage = { no: string; title: string; body: string };

/** The five stages as a descent, ending in a fork.
 *
 *  They were five equal cards in a five-column grid, which is the arrangement
 *  that flattens a sequence into a set: nothing in it says that stage three
 *  depends on stage two, and every stage got the same 20% of the width whether
 *  its sentence needed it or not.
 *
 *  Set as a stair instead. Each stage steps down and in, the rule between them
 *  carries the eye, and the numeral grows as the work accumulates. Deliberately
 *  not a loop: the hero and the rhythm section on this page are both already
 *  cycles, and a third would be the page repeating itself.
 *
 *  The last stage forks, because the document's last sentence does. "Strong
 *  ideas can be developed further, while weaker ones give us useful direction
 *  for the next shoot" is an either/or, and the two halves are set as two
 *  branches with the copy untouched. The split is derived from the sentence
 *  rather than hard-coded, so if the copy changes to something without that
 *  hinge the stage simply renders whole. */

/** The hinge the document uses for its one either/or. */
const HINGE = ", while ";

function splitOutcome(body: string): { lead: string; branches: [string, string] } | null {
  const at = body.lastIndexOf(HINGE);
  if (at < 0) return null;
  // Everything up to the last full stop before the hinge is ordinary body; the
  // hinge sentence itself is what forks.
  const before = body.slice(0, at);
  const sentenceStart = before.lastIndexOf(". ");
  if (sentenceStart < 0) return null;
  return {
    lead: before.slice(0, sentenceStart + 1),
    branches: [before.slice(sentenceStart + 2), body.slice(at + HINGE.length).replace(/\.$/, "")],
  };
}

export function StageStair({ items }: { items: StairStage[] }) {
  return (
    <ol>
      {items.map((stage, i) => {
        const last = i === items.length - 1;
        const outcome = last ? splitOutcome(stage.body) : null;
        return (
          <li
            key={stage.no}
            /** The step. Indent grows with depth on wide screens only, where
             *  there is width to spend; below lg it is a plain stack. */
            style={{ "--step": `${i * 3.2}rem` } as React.CSSProperties}
            className="border-t border-line lg:pl-[var(--step)]"
          >
            <Rise delay={Math.min(i, 4) * 0.06}>
              <div className="grid gap-x-10 gap-y-3 py-7 lg:grid-cols-[auto_minmax(0,0.7fr)_minmax(0,1fr)] lg:items-baseline">
                <span
                  aria-hidden
                  className={cn(
                    "font-display font-extrabold leading-[0.8] tabular-nums transition-colors duration-500",
                    // The numeral grows as the work accumulates.
                    "text-[clamp(1.6rem,calc(1.1rem+2.2vw),3rem)]",
                    last ? "text-brand" : "text-stroke",
                  )}
                >
                  {stage.no}
                </span>

                <h3 className="font-display text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.16] text-snow">
                  {stage.title}
                </h3>

                <div>
                  <p className="leading-relaxed text-fog sm:text-lg">
                    {outcome ? outcome.lead : stage.body}
                  </p>

                  {/* Where the work divides. */}
                  {outcome && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {outcome.branches.map((branch, b) => (
                        <div
                          key={branch}
                          className={cn(
                            "rounded-xl border p-4",
                            b === 0
                              ? "border-brand/45 bg-brand/[0.06]"
                              : "border-line bg-ink-3/50",
                          )}
                        >
                          <span
                            aria-hidden
                            className="font-display block text-[0.58rem] font-semibold uppercase text-ash"
                          >
                            {b === 0 ? "Develops" : "Redirects"}
                          </span>
                          <p
                            className={cn(
                              "mt-2 text-[0.9375rem] leading-snug",
                              b === 0 ? "text-snow" : "text-fog",
                            )}
                          >
                            {branch}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Rise>
          </li>
        );
      })}
    </ol>
  );
}

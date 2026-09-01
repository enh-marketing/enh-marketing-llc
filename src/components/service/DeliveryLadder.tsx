"use client";

import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/services/linkedin-marketing";

/** The programme on the left, and everything it hands over collected on the
 *  right, filling up as you read.
 *
 *  WHY NOT ANOTHER STAGE RUN. Three other pages on this site draw a programme
 *  as stages on a rail, because for those documents order is the only fixed
 *  thing. This one fixes something else: every stage ends with a sentence
 *  starting "You get", and the section opens by promising "something meaningful
 *  in your hands inside week two". A rail buries that at the end of five
 *  paragraphs. Collecting the deliverables in one sticky panel makes the answer
 *  to "what do I actually receive" readable in a glance, and it accumulates as
 *  the stages scroll past it.
 *
 *  An earlier version put each deliverable in a plate beside its own stage,
 *  which is the same list rendered five times over and shows nothing about the
 *  total. Nothing is printed twice here: stages carry the work, the panel
 *  carries what arrives.
 *
 *  The last phase is unnumbered in the source, so it carries the document's own
 *  word rather than a numeral it never gives. */
export function DeliveryLadder({
  stages,
  ongoingLabel,
  span,
  promise,
}: {
  stages: Stage[];
  ongoingLabel: string;
  span: string;
  promise: string;
}) {
  const badge = (stage: Stage) => (stage.no ? stage.no : ongoingLabel);

  return (
    <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
      {/* The work. */}
      <ol className="border-t border-line">
        {stages.map((stage, i) => (
          <li key={stage.title} className="group border-b border-line py-6">
            <Rise delay={Math.min(i, 4) * 0.05}>
              <div className="flex items-baseline gap-5">
                <span
                  className={cn(
                    "font-display shrink-0 text-xs font-bold uppercase tabular-nums tracking-[0.22em] transition-colors duration-500",
                    stage.no
                      ? "text-ash group-hover:text-brand-text"
                      : "text-brand-text",
                  )}
                >
                  {badge(stage)}
                </span>
                <h3 className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-snow">
                  {stage.title}
                </h3>
              </div>
              <p className="mt-4 max-w-2xl leading-relaxed text-fog sm:pl-[3.1rem]">
                {stage.body}
              </p>
            </Rise>
          </li>
        ))}
      </ol>

      {/* What arrives, in one place. Sticky so it stays beside the stages it is
          filling up from. */}
      <div className="lg:sticky lg:top-28">
        <div className="rounded-[1.75rem] border border-brand/40 bg-brand/[0.06] p-6 sm:p-7">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">
            {span}
          </p>
          <p className="font-display mt-3 text-[clamp(1.05rem,1.9vw,1.35rem)] font-extrabold uppercase leading-[1.18] tracking-tight text-brand">
            {promise}
          </p>

          <ol className="mt-6 border-t border-brand/25">
            {stages.map((stage, i) => (
              <li
                key={stage.title}
                className="flex gap-4 border-b border-brand/15 py-3.5 last:border-b-0"
              >
                <Rise delay={i * 0.06}>
                  <span className="flex gap-4">
                    <span
                      aria-hidden
                      className="font-display mt-0.5 shrink-0 text-[0.6rem] font-bold uppercase tabular-nums tracking-[0.2em] text-brand-text"
                    >
                      {badge(stage)}
                    </span>
                    <span className="text-sm leading-relaxed text-snow">
                      {stage.deliverable}
                    </span>
                  </span>
                </Rise>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

/** The managed service, and the one line in it that is about you.
 *
 *  THE SECTION HAS TWO HALVES AND ONLY ONE OF THEM IS A LIST. Six things are
 *  covered, and then a sentence that quietly settles the most common argument in
 *  a website retainer: "Routine content updates can be managed by your team.
 *  ENH Marketing can also handle them when content support is included
 *  separately in the scope." Buried under six bullets, that reads as small
 *  print. It is not small print. It is the boundary of the fee, and a reader
 *  deciding between agencies wants it before they want the list.
 *
 *  So the six run as one ruled register of what is watched, and the division of
 *  labour is set beside it at its own weight: yours, and ours if you ask for it.
 *  Two statements, not a table, because the document draws no table and a
 *  ticked matrix would imply a comparison it never makes.
 *
 *  NOTHING IS MONITORED IN THE DRAWING. No uptime bar, no status light, no
 *  green tick. The document promises monitoring, not a figure, and a dashboard
 *  here would be inventing a number on a page whose whole register is caution. */
export function SiteWatch({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  split,
  closing,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lead: string;
  intro: string;
  items: string[];
  split: { yours: string; optional: string };
  closing: string;
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "Watched, and who updates what" }}
          className="mb-12"
        />

        <Rise>
          <p className="font-display max-w-[24ch] text-[clamp(1.15rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.15] text-snow">
            {lead}
          </p>
        </Rise>

        <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          {/* What is watched. */}
          <div>
            <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text">
              {intro}
            </p>
            <ol className="mt-5 border-t border-line">
              {items.map((entry, i) => (
                <li
                  key={entry}
                  className="group flex items-center gap-4 border-b border-line py-4 transition-colors duration-500 hover:bg-ink-2"
                >
                  {/* Monitoring is a pass over all of them, so the light walks
                      the register one row at a time. The ring stays, because
                      ci-blink rests at opacity 0 and would otherwise vanish
                      under prefers-reduced-motion. */}
                  <span className="flex w-10 shrink-0 items-center gap-2 self-center">
                    <svg aria-hidden viewBox="0 0 8 8" className="h-2 w-2 shrink-0">
                      <circle cx="4" cy="4" r="3.2" fill="none" stroke="var(--color-brand)" strokeWidth="1.4" />
                      <circle
                        className="ci-blink"
                        cx="4"
                        cy="4"
                        r="3.2"
                        fill="var(--color-brand)"
                        style={{ animationDelay: `${((i * 6) / items.length).toFixed(2)}s` }}
                      />
                    </svg>
                    <span className="font-display text-[0.625rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow">
                    {entry}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto h-px w-6 shrink-0 self-center bg-line transition-all duration-500 group-hover:w-12 group-hover:bg-brand motion-reduce:transition-none"
                  />
                </li>
              ))}
            </ol>
          </div>

          {/* Who updates what. The boundary of the fee, not small print. */}
          <Rise delay={0.08}>
            <div className="rounded-[1.25rem] border-2 border-brand/45 bg-ink-3 px-6 py-8 sm:px-8">
              <p className="font-display text-[clamp(1.05rem,2vw,1.45rem)] font-extrabold uppercase leading-[1.18] text-brand">
                {split.yours}
              </p>
              <span aria-hidden className="my-6 block h-px w-full bg-line" />
              <p className="max-w-[38ch] text-base leading-relaxed text-fog">{split.optional}</p>
            </div>
            <p className="mt-7 max-w-[42ch] text-sm leading-relaxed text-ash">{closing}</p>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

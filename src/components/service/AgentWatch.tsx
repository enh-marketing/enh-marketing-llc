"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

/** The monthly service, drawn as the thing it is: a monitor that never stops.
 *
 *  THE REASON IS IN THE DOCUMENT AND IT IS A SANDWICH. Two sentences give the
 *  whole justification and they point in opposite directions: "Customer
 *  questions, services, prices and internal responsibilities can change after
 *  launch" is your side moving, and "Messaging platforms, AI models and
 *  connected systems can also be updated" is the other side moving. The agent is
 *  the only thing between them, and it is what breaks when either one shifts.
 *
 *  SO NOTHING HERE IS ALLOWED TO SIT STILL. A monitoring section rendered as ten
 *  static bullets between two paragraphs argues against itself. Both edges carry
 *  ticks that drift out of register and come back, which is what "can change
 *  after launch" looks like, and the ten checks are a strip with a light walking
 *  along them and a refresh sweeping across, which is what watching looks like.
 *  All of it is the site's own looping vocabulary from globals.css, so it stops
 *  dead under prefers-reduced-motion along with everything else.
 *
 *  NOTHING IS MEASURED. No uptime, no counts, no status percentages, no green.
 *  The document promises monitoring, not a figure, and a dashboard here would be
 *  inventing numbers on a page whose whole register is caution. The light walks
 *  the strip because the service is running, not because anything scored. */
export function AgentWatch({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  drift,
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
  drift: { yours: string; theirs: string; why: string };
  closing: string;
}) {
  /** One full pass of ci-blink is 6s; dividing it by the count walks the light
   *  along the strip one check at a time. The house rule, from globals.css. */
  const beat = 6 / items.length;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Both sides move" }}
          className="mb-12"
        />

        <Rise>
          <p className="font-display max-w-[26ch] text-[clamp(1.15rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.15] text-snow">
            {lead}
          </p>
        </Rise>

        <div className="mt-12">
          <Edge text={drift.yours} side="top" />

          {/* What holds the middle, and does not stop. */}
          <Rise delay={0.06}>
            <div className="relative my-3 overflow-hidden rounded-[1.25rem] border-2 border-brand/45 bg-ink-3 p-6 sm:p-8">
              {/* A refresh sweeping across the view. Inside a stretched viewBox
                  so ci-scan-x's 200-unit travel spans the panel however wide it
                  gets; the class is written for user units, not screen pixels. */}
              <svg
                aria-hidden
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <rect className="ci-scan-x" x="-6" y="0" width="6" height="100" fill="var(--color-brand)" fillOpacity="0.07" />
                <rect className="ci-scan-x" x="-1" y="0" width="0.6" height="100" fill="var(--color-brand)" fillOpacity="0.5" />
              </svg>

              <p className="font-display relative text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text">
                {intro}
              </p>

              <ul className="relative mt-6 grid gap-x-10 gap-y-1 sm:grid-cols-2">
                {items.map((entry, i) => (
                  <li
                    key={entry}
                    className="group flex items-baseline gap-3 rounded-lg px-2 py-2 transition-colors duration-500 hover:bg-ink-2 motion-reduce:transition-none"
                  >
                    {/* The light walking the strip, one check at a time. */}
                    <span aria-hidden className="relative mt-1.5 h-2 w-2 shrink-0">
                      <span className="absolute inset-0 rounded-full border border-brand/45" />
                      <svg viewBox="0 0 8 8" className="absolute inset-0 h-full w-full">
                        <circle
                          className="ci-blink"
                          cx="4"
                          cy="4"
                          r="3"
                          fill="var(--color-brand)"
                          style={{ animationDelay: `${(i * beat).toFixed(2)}s` }}
                        />
                      </svg>
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      {entry}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Rise>

          <Edge text={drift.theirs} side="bottom" />
        </div>

        <Rise delay={0.12} className="mt-12 grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <p className="font-display max-w-[30ch] text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.15] text-brand">
            {drift.why}
          </p>
          <p className="max-w-[62ch] text-base leading-relaxed text-fog">{closing}</p>
        </Rise>
      </Container>
    </section>
  );
}

/** One of the two grounds that will not hold still.
 *
 *  The ticks go out of register and come back, on ci-slide-x, which is exactly
 *  what that keyframe was written for. Alternate ticks drift, so the row shears
 *  rather than sliding as a block: a block that moves together has not changed,
 *  it has just moved. */
function Edge({ text, side }: { text: string; side: "top" | "bottom" }) {
  const TICKS = 26;
  return (
    <Rise>
      <div className="relative overflow-hidden rounded-xl border border-line bg-ink-2 px-5 py-4 sm:px-7">
        <p className="relative max-w-[70ch] text-[0.9375rem] leading-snug text-fog">{text}</p>

        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-5 flex items-end gap-1.5 sm:inset-x-7 ${
            side === "top" ? "top-2" : "bottom-2"
          }`}
        >
          {Array.from({ length: TICKS }).map((_, i) => (
            <span
              key={i}
              className={i % 2 ? "ci-slide-x block h-1.5 flex-1 bg-ash/35" : "block h-1.5 flex-1 bg-ash/20"}
              style={
                i % 2
                  ? {
                      animationDelay: `${((i * 0.21) % 3).toFixed(2)}s`,
                      animationDirection: side === "top" ? "normal" : "reverse",
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </Rise>
  );
}

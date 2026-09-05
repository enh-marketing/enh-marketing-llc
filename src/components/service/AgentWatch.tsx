"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

/** The monthly service, drawn as the squeeze it exists to absorb.
 *
 *  WHAT WAS WRONG WITH THE LAST TWO VERSIONS. Both gave the ten covered items
 *  the loudest treatment on the page, once as a plain list and once as the same
 *  list inside a heavy brand-outlined box. Changing the ornament and keeping the
 *  skeleton is the exact failure this client has named before, and the hierarchy
 *  was upside down as well: the ten are supporting detail, and the two sentences
 *  either side of them are the argument.
 *
 *  THE ARGUMENT IS A SQUEEZE. "Customer questions, services, prices and internal
 *  responsibilities can change after launch" is your ground moving. "Messaging
 *  platforms, AI models and connected systems can also be updated" is the other
 *  ground moving. The agent is the only thing between them and it is what breaks
 *  when either shifts, which is the whole reason a monthly fee exists. So the
 *  two sentences face each other across a line, both of their grounds drift, and
 *  the line between them holds and is scanned. Neither side is labelled: the
 *  sentences name themselves, and inventing "your side" and "the platforms"
 *  would be putting words on a page whose copy is fixed.
 *
 *  THE TEN ARE A REGISTER, NOT A FEATURE LIST. No box, no bullets, no border
 *  around them. Hairline rows, numbered, with the light walking the register one
 *  row at a time because a monitoring service is a pass over all of them. They
 *  sit below the argument at the weight they deserve.
 *
 *  NOTHING IS MEASURED. No uptime, no counts, no percentages, no green. The
 *  document promises monitoring, not a figure. The light walks because the
 *  service is running, not because anything scored. */
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
   *  along the register one row at a time. The house rule, from globals.css. */
  const beat = 6 / items.length;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Both grounds move" }}
          className="mb-12"
        />

        {/* The claim, and the reason. Paired, so neither leaves half the page
            empty and the reason is not buried under the detail. */}
        <Rise>
          <div className="grid items-start gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <p className="font-display max-w-[22ch] text-[clamp(1.3rem,2.7vw,2.1rem)] font-extrabold uppercase leading-[1.1] text-snow">
              {lead}
            </p>
            <p className="font-display max-w-[26ch] text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.18] text-brand lg:justify-self-end">
              {drift.why}
            </p>
          </div>
        </Rise>

        {/* The squeeze. Two claims of equal weight facing each other across
            the one thing that sits between them. Both sentences whole: an
            earlier version broke them into chips and left "can change after
            launch." standing on its own, which reads as a fragment. */}
        <Rise delay={0.08} className="mt-14">
          <div className="relative grid gap-y-10 lg:grid-cols-2 lg:gap-x-0">
            {/* What is between them, running the full height of both. The rule
                above is continuous across the pair and this crosses it, so the
                two claims read as two halves of one measure rather than as two
                panels that happen to sit side by side. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-2 -translate-x-1/2 lg:block"
            >
              <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-brand" />
              <svg
                viewBox="0 0 8 54"
                preserveAspectRatio="none"
                className="absolute inset-y-0 left-0 h-full w-full"
              >
                <rect
                  className="ci-scan-y"
                  x="2.6"
                  y="-9"
                  width="2.8"
                  height="9"
                  fill="var(--color-brand)"
                  fillOpacity="0.6"
                />
              </svg>
            </div>

            {/* The rule sits on the column, not on the measure, so it runs the
                full half and meets its opposite number at the crossing. */}
            <div className="border-t-2 border-line pt-7 lg:pr-14">
              <p className="max-w-[34ch] text-[1.0625rem] leading-relaxed text-fog sm:text-lg">
                {drift.yours}
              </p>
            </div>
            <div className="border-t-2 border-line pt-7 lg:pl-14">
              <p className="max-w-[34ch] text-[1.0625rem] leading-relaxed text-fog sm:text-lg">
                {drift.theirs}
              </p>
            </div>
          </div>
        </Rise>

        {/* What the fee buys. A register, at the weight of supporting detail. */}
        <Rise delay={0.12} className="mt-16">
          <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text">
            {intro}
          </p>
          <ol className="mt-6 grid border-t border-line sm:grid-cols-2">
            {items.map((entry, i) => (
              <li
                key={entry}
                className="group flex items-center gap-3.5 border-b border-line py-3.5 pr-6 transition-colors duration-500 hover:bg-ink-2 motion-reduce:transition-none"
              >
                {/* The light walking the register, one row at a time. Fixed
                    width, so every row's text starts on the same line whether
                    or not its light is lit. */}
                <span className="flex w-9 shrink-0 items-center gap-2 self-center">
                  <svg aria-hidden viewBox="0 0 8 8" className="h-1.5 w-1.5 shrink-0">
                    <circle
                      className="ci-blink"
                      cx="4"
                      cy="4"
                      r="3.4"
                      fill="var(--color-brand)"
                      style={{ animationDelay: `${(i * beat).toFixed(2)}s` }}
                    />
                  </svg>
                  <span className="font-display text-[0.625rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="text-[0.9375rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                  {entry}
                </span>
              </li>
            ))}
          </ol>
        </Rise>

        <Rise delay={0.16} className="mt-10">
          <p className="max-w-[74ch] text-base leading-relaxed text-fog sm:text-lg">{closing}</p>
        </Rise>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The paid diagnostic, drawn as the sort it performs.
 *
 *  TWO OF THE THIRTEEN ARE NOT CRITERIA, THEY ARE THE ANSWER. The review list
 *  runs "…Conversations suitable for AI / Conversations that should remain with
 *  people…" in the middle of eleven other things it looks at. Those two are not
 *  another pair of bullets, they are the output the other eleven produce, and
 *  the written diagnostic is described in exactly those terms: "what the agent
 *  should handle… and what should happen when a person takes over."
 *
 *  So the eleven are set as the register the review works through, and the two
 *  are lifted out of it and set as the fork it arrives at. Nothing is reworded
 *  and nothing is dropped: all thirteen of the document's lines are on the page,
 *  two of them promoted to the position the document's own next paragraph gives
 *  them.
 *
 *  WHY IT MATTERS THAT IT IS PAID. The section's last two sentences are the
 *  commercial argument, and they are the opposite of a hard sell: the document
 *  is yours either way, and the reason for the fee is the work itself. They
 *  close the section at their own weight rather than trailing off in fog. */
export function DiagnosticSort({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  output,
  yours,
  paid,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lead: string;
  intro: string;
  /** All thirteen, in the document's order. Index 5 and 6 are the fork. */
  items: string[];
  output: string;
  yours: string;
  paid: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;

  /** The two the document turns into its own conclusion. */
  const forAi = items[5];
  const forPeople = items[6];
  const criteria = items.filter((_, i) => i !== 5 && i !== 6);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "Eleven questions, one divide" }}
          className="mb-12"
        />

        <Rise>
          <p className="max-w-[60ch] text-base leading-relaxed text-fog sm:text-lg">{lead}</p>
        </Rise>

        <div ref={ref} className="mt-10">
          {/* What the review works through. A register, ruled rather than
              tiled: it is one pass over a process, not eleven products. */}
          <Rise delay={0.06}>
            <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text">
              {intro}
            </p>
            <ol className="mt-5 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {criteria.map((q, i) => (
                <li
                  key={q}
                  className="group flex items-baseline gap-3 border-b border-line py-3.5 pr-6 transition-colors duration-500 hover:bg-ink-2"
                >
                  <span className="relative flex shrink-0 items-baseline gap-2 pl-1">
                    {/* The review is a pass over all of them, so the light walks
                        the register one row at a time. */}
                    <svg aria-hidden viewBox="0 0 8 8" className="h-1.5 w-1.5 self-center">
                      <circle
                        className="ci-blink"
                        cx="4"
                        cy="4"
                        r="3.4"
                        fill="var(--color-brand)"
                        style={{ animationDelay: `${((i * 6) / criteria.length).toFixed(2)}s` }}
                      />
                    </svg>
                    <span className="font-display text-[0.625rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow">
                    {q}
                  </span>
                </li>
              ))}
            </ol>
          </Rise>

          {/* And the divide it arrives at. */}
          <div className="relative mt-14">
            {/* The stem, and the two arms. Drawn with borders so the corners
                stay square at every container width. */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-14 hidden h-14 lg:block">
              {/* Conversations arriving at the diagnostic, continuously. This is
                  what ci-flow was written for; the path carries pathLength="100"
                  so the packet is a percentage of the stem however tall it is. */}
              <svg
                aria-hidden
                viewBox="0 0 4 28"
                preserveAspectRatio="none"
                className="pointer-events-none absolute left-1/2 top-0 h-7 w-1 -translate-x-1/2"
              >
                <path
                  className="ci-flow"
                  d="M2 0 V28"
                  pathLength={100}
                  stroke="var(--color-brand)"
                  strokeWidth="2.4"
                  fill="none"
                />
              </svg>
              <motion.span
                className="absolute left-1/2 top-0 h-7 w-0.5 -translate-x-1/2 origin-top bg-brand"
                initial={reduced ? false : { scaleY: 0 }}
                animate={show ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.span
                className="absolute left-[calc(25%-20px)] right-[calc(25%-20px)] top-7 h-0.5 bg-brand"
                initial={reduced ? false : { scaleX: 0 }}
                animate={show ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
              />
              {/* Column centres, not quarters: a 2.5rem gutter moves each one
                  20px inward. */}
              {[
                ["left", "calc(25% - 21px)"],
                ["right", "calc(25% - 19px)"],
              ].map(([side, off]) => (
                <motion.span
                  key={side}
                  className="absolute top-7 h-7 w-0.5 origin-top bg-brand"
                  style={{ [side]: off } as React.CSSProperties}
                  initial={reduced ? false : { scaleY: 0 }}
                  animate={show ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.35, ease: EASE, delay: 0.8 }}
                />
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
              <Arm text={forAi} tone="brand" show={show} reduced={reduced} delay={0.95} />
              <Arm text={forPeople} tone="ash" show={show} reduced={reduced} delay={1.05} />
            </div>
          </div>

          {/* What you are actually handed. */}
          <Rise delay={0.12} className="mt-14 border-t-2 border-line pt-8">
            <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <p className="max-w-[58ch] text-base leading-relaxed text-fog sm:text-lg">{output}</p>
              <div>
                <p className="font-display max-w-[26ch] text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.15] text-brand">
                  {yours}
                </p>
                <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-ash">{paid}</p>
              </div>
            </div>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

/** One side of the divide, in the document's own words. */
function Arm({
  text,
  tone,
  show,
  reduced,
  delay,
}: {
  text: string;
  tone: "brand" | "ash";
  show: boolean;
  reduced: boolean;
  delay: number;
}) {
  const brand = tone === "brand";
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={`group relative overflow-hidden rounded-[1.25rem] border-2 px-6 py-7 transition-colors duration-500 motion-reduce:transition-none sm:px-8 sm:py-8 ${
        brand
          ? "border-brand/45 bg-ink-3 hover:border-brand/70"
          : "border-line bg-ink-2 hover:border-ash/60"
      }`}
    >
      {/* Only the side the agent takes is live. The other one is people, and
          people are not a running process. */}
      {brand && (
        <svg
          aria-hidden
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <rect
            className="ci-scan-x"
            x="-4"
            y="0"
            width="4"
            height="100"
            fill="var(--color-brand)"
            fillOpacity="0.1"
          />
        </svg>
      )}
      <p
        className={`font-display relative max-w-[18ch] text-[clamp(1.15rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.12] ${
          brand ? "text-brand" : "text-snow"
        }`}
      >
        {text}
      </p>
    </motion.div>
  );
}

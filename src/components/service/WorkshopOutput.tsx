"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** What leaves the room with you, led by the thing that actually leaves it.
 *
 *  THE DOCUMENT AUTHORISES A REAL ARTIFACT AND I HAD IGNORED IT. Two separate
 *  sentences name the same object: the full-day workshop "ends with a written
 *  shortlist of business processes that may benefit from AI support or
 *  automation, ranked by expected value and implementation effort", and the
 *  deliverables include "a value-and-effort ranking for possible automation
 *  opportunities". A ranking against those two named axes is a plot, and it is
 *  the single most recognisable artifact of an AI readiness session. Setting it
 *  as the eighth bullet in a list of eight throws away the only thing on this
 *  page a reader could picture themselves holding.
 *
 *  So the shortlist is drawn, at size, as the sheet it is. The other seven
 *  deliverables sit beside it as the rest of the pack.
 *
 *  NOTHING ON THE PLOT IS NAMED OR MEASURED. The two axes are the document's own
 *  words and there is no scale on either. The marks are opportunities, not
 *  claims: the document names no use case, promises no saving and gives no
 *  count, so no mark carries a label, a figure or a percentage. Some sit higher
 *  than others because a ranking ranks; that is the whole assertion.
 *
 *  THE PUNCHLINE IS THE REFUSAL. "The use-case shortlist remains useful even if
 *  the business does not proceed with another ENH service" is a refusal of a
 *  lock-in and the most persuasive sentence in the section, so it closes it at
 *  display scale rather than opening a paragraph. */

/** Where each opportunity sits. x is implementation effort, y is expected
 *  value, both 0 to 1, neither with a scale on it. `up` marks the ones a
 *  ranking puts higher; nothing else is asserted about any of them. */
const MARKS: { x: number; y: number; up?: boolean }[] = [
  { x: 0.14, y: 0.82, up: true },
  { x: 0.27, y: 0.62, up: true },
  { x: 0.22, y: 0.2 },
  { x: 0.4, y: 0.75, up: true },
  { x: 0.48, y: 0.12 },
  { x: 0.58, y: 0.55 },
  { x: 0.68, y: 0.79 },
  { x: 0.76, y: 0.34 },
  { x: 0.86, y: 0.46 },
];

export function WorkshopOutput({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  intro,
  items,
  keep,
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
  /** All eight, in the document's order. The first two are the shortlist and
   *  its ranking, which the sheet draws; the rest are the pack. */
  items: string[];
  keep: string;
  closing: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;

  /** The sheet draws the first two: the shortlist, and the ranking that orders
   *  it. They stay in the list as well, marked rather than removed. */
  const sheet = items.slice(0, 2);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "growth", label: "One sheet, and the pack around it" }}
          className="mb-12"
        />

        <Rise>
          <div className="grid items-start gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <p className="max-w-[46ch] text-base leading-relaxed text-fog sm:text-lg">{lead}</p>
            <p className="font-display max-w-[26ch] text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.18] text-snow lg:justify-self-end">
              {intro}
            </p>
          </div>
        </Rise>

        <div ref={ref} className="mt-14 grid gap-x-14 gap-y-12 lg:grid-cols-2">
          {/* The sheet. */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="rounded-[1.5rem] border-2 border-line bg-ink-3 p-6 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)] sm:p-8"
          >
            <p className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-brand-text">
              {sheet[0]}
            </p>
            <p className="font-display mt-2 text-[0.9375rem] font-bold uppercase leading-tight text-snow">
              {sheet[1]}
            </p>

            <Plot show={show} reduced={reduced} />
          </motion.div>

          {/* All eight, at the weight of the thing they are: the answer to the
              question the heading asks. An earlier version lifted the first two
              out and numbered the remainder from 03, which is accurate and
              reads as a bug; and it set them at body size beside a large card,
              which read as an afterthought. The two the sheet draws are marked
              rather than removed. */}
          <ol className="self-center border-t border-line">
            {items.map((entry, i) => {
              const drawn = i < 2;
              return (
                <motion.li
                  key={entry}
                  initial={reduced ? false : { opacity: 0, x: 14 }}
                  animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.06 }}
                  className="group flex items-baseline gap-4 border-b border-line py-5 transition-colors duration-500 hover:bg-ink-2 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-2 h-2 w-2 shrink-0 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                      drawn ? "bg-brand" : "bg-line group-hover:bg-ash",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[1.0625rem] leading-snug transition-colors duration-500 motion-reduce:transition-none sm:text-[1.125rem]",
                      drawn ? "text-snow" : "text-fog group-hover:text-snow",
                    )}
                  >
                    {entry}
                  </span>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* The one that outlives the engagement. */}
        <Rise delay={0.12} className="mt-16 border-t-2 border-line pt-10">
          <div className="grid gap-x-14 gap-y-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <p className="font-display max-w-[24ch] text-[clamp(1.3rem,2.7vw,2.05rem)] font-extrabold uppercase leading-[1.1] text-brand">
              {keep}
            </p>
            <p className="max-w-[56ch] text-base leading-relaxed text-fog sm:text-lg">{closing}</p>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

/** The ranking, against the two axes the document names and no others.
 *
 *  No gridlines with values, no ticks, no numbers: an axis with a scale on it
 *  would be inventing a measurement the workshop does not make. The axes are
 *  labelled and directional, which is exactly what "ranked by expected value and
 *  implementation effort" claims and no more. */
function Plot({ show, reduced }: { show: boolean; reduced: boolean }) {
  const W = 520;
  const H = 340;
  const PAD = { l: 46, r: 18, t: 18, b: 44 };
  const x = (v: number) => PAD.l + v * (W - PAD.l - PAD.r);
  const y = (v: number) => H - PAD.b - v * (H - PAD.t - PAD.b);

  return (
    <div className="mt-7">
      {/* Expected value is the vertical axis, so its name goes at the top of
          that axis. Both labels sat on one line under the plot in the first
          version, which put the y-axis name where a reader reads the x. */}
      <p className="font-display mb-2 flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-brand-text">
        <svg viewBox="0 0 10 12" className="h-3 w-2.5" fill="none" aria-hidden>
          <path d="M5 11 V1 M1.5 4.5 5 1 8.5 4.5" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Expected value
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden>
        {/* The field the marks sit in. */}
        <rect
          x={PAD.l}
          y={PAD.t}
          width={W - PAD.l - PAD.r}
          height={H - PAD.t - PAD.b}
          fill="var(--color-ink-2)"
        />
        {[0.25, 0.5, 0.75].map((g) => (
          <g key={g}>
            <line x1={x(g)} y1={PAD.t} x2={x(g)} y2={H - PAD.b} stroke="var(--color-line)" strokeWidth="1" />
            <line x1={PAD.l} y1={y(g)} x2={W - PAD.r} y2={y(g)} stroke="var(--color-line)" strokeWidth="1" />
          </g>
        ))}

        {/* The two axes, drawn as directions rather than as scales. */}
        <path
          d={`M${PAD.l},${PAD.t} L${PAD.l},${H - PAD.b} L${W - PAD.r},${H - PAD.b}`}
          stroke="var(--color-ash)"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d={`M${PAD.l - 4},${PAD.t + 8} L${PAD.l},${PAD.t} L${PAD.l + 4},${PAD.t + 8}`}
          stroke="var(--color-ash)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={`M${W - PAD.r - 8},${H - PAD.b - 4} L${W - PAD.r},${H - PAD.b} L${W - PAD.r - 8},${H - PAD.b + 4}`}
          stroke="var(--color-ash)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />

        {MARKS.map((m, i) => (
          <motion.circle
            key={i}
            cx={x(m.x)}
            cy={y(m.y)}
            r={m.up ? 9 : 7}
            className={m.up ? undefined : "ci-twinkle"}
            fill={m.up ? "var(--color-brand)" : "var(--color-ash)"}
            fillOpacity={m.up ? 1 : 0.5}
            style={m.up ? undefined : { animationDelay: `${(i * 0.4).toFixed(2)}s` }}
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.35 + i * 0.06 }}
          />
        ))}
      </svg>

      {/* Axis names are HTML, so they keep their real size at any width and
          never drop under the type floor. */}
      <p className="font-display -mt-1 flex items-center justify-end gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ash">
        Implementation effort
        <svg viewBox="0 0 12 10" className="h-2.5 w-3" fill="none" aria-hidden>
          <path d="M1 5 H11 M7.5 1.5 11 5 7.5 8.5" stroke="var(--color-ash)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </p>
    </div>
  );
}

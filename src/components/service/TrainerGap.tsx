"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The difference the section claims, drawn as the difference in how far each
 *  one gets.
 *
 *  THE DOCUMENT DRAWS THIS ITSELF. "They may explain the tools clearly, but the
 *  programme often ends with recommendations that the trainer cannot implement."
 *  That is a path with a stop on it. And the reply is not that ENH explains
 *  better, it is that the same path keeps going: "our team can assess the
 *  technical requirements and build the solution." So the section is two runs
 *  of unequal length, and the whole argument is the length.
 *
 *  NO ONE IS DISPARAGED. The upper run is drawn in neutral ash and stops at a
 *  plain terminal, not a cross or a warning. The document says these courses
 *  "may explain the tools clearly", so the run reaches its point intact and
 *  simply ends there. The four things the lower run continues into are the
 *  document's own four, not a claim invented to fill the extra distance.
 *
 *  BELOW LG the two runs stack and the comparison is carried by the terminals
 *  and the copy, since two 40ch rails side by side on a phone compare nothing. */
export function TrainerGap({
  id,
  label,
  index,
  title,
  strokeTitle,
  trainer,
  ours,
  closing,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  trainer: { label: string; body: string; stop: string };
  ours: { label: string; body: string; work: string[] };
  closing: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "One run stops, one continues" }}
          className="mb-12"
        />

        <div ref={ref} className="space-y-12 lg:space-y-16">
          {/* ── the run that stops ───────────────────────────────────────── */}
          <div>
            <Rail
              name={trainer.label}
              tone="ash"
              /** Where the explaining ends and the implementing would have begun. */
              reach={0.56}
              show={show}
              reduced={reduced}
              delay={0}
              terminal={trainer.stop}
            />
            <Rise delay={0.06}>
              <p className="mt-7 max-w-[68ch] text-base leading-relaxed text-fog sm:text-lg">
                {trainer.body}
              </p>
            </Rise>
          </div>

          {/* ── the run that keeps going ─────────────────────────────────── */}
          <div>
            <Rail
              name={ours.label}
              tone="brand"
              reach={1}
              show={show}
              reduced={reduced}
              delay={0.5}
              stations={ours.work}
              /** The stations begin where the other run ended, so the extra
               *  distance is the only thing being claimed. */
              stationsFrom={0.56}
            />
            <Rise delay={0.06}>
              <p className="mt-7 max-w-[68ch] text-base leading-relaxed text-fog sm:text-lg">
                {ours.body}
              </p>
            </Rise>
          </div>
        </div>

        <Rise delay={0.12} className="mt-14 border-t-2 border-line pt-8">
          <p className="max-w-[74ch] text-base leading-relaxed text-fog sm:text-lg">{closing}</p>
        </Rise>
      </Container>
    </section>
  );
}

/** One run: a name, a rail that reaches as far as it reaches, and whatever sits
 *  at the end of it. */
function Rail({
  name,
  tone,
  reach,
  show,
  reduced,
  delay,
  terminal,
  stations,
  stationsFrom = 0,
}: {
  name: string;
  tone: "ash" | "brand";
  /** Fraction of the full width this run covers. */
  reach: number;
  show: boolean;
  reduced: boolean;
  delay: number;
  /** The clause the run ends on, where it ends short. */
  terminal?: string;
  /** What the run continues into, where it does not. */
  stations?: string[];
  stationsFrom?: number;
}) {
  const line = tone === "brand" ? "bg-brand" : "bg-ash";
  const text = tone === "brand" ? "text-brand-text" : "text-ash";

  return (
    <div>
      <p className={`font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${text}`}>
        {name}
      </p>

      <div className={`relative mt-4 ${stations ? "lg:h-28" : ""}`}>
        <div className="relative h-0.5 w-full">
          {/* The full extent, faint, so the shortfall is visible rather than
              merely absent. */}
          <span aria-hidden className="absolute inset-0 bg-line" />
          <motion.span
            aria-hidden
            className={`absolute left-0 top-0 h-full origin-left ${line}`}
            style={{ width: `${reach * 100}%` }}
            initial={reduced ? false : { scaleX: 0 }}
            animate={show ? { scaleX: 1 } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay }}
          />
          {/* Where it gets to. */}
          <motion.span
            aria-hidden
            className={`absolute top-1/2 h-4 w-0.5 -translate-y-1/2 ${line}`}
            style={{ left: `calc(${reach * 100}% - 1px)` }}
            initial={reduced ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, ease: EASE, delay: delay + 0.85 }}
          />
        </div>

        {/* What the extra distance is spent on. */}
        {stations?.map((s, i) => {
          const at = stationsFrom + ((reach - stationsFrom) * (i + 0.5)) / stations.length;
          return (
            <motion.span
              key={s}
              className="absolute top-3 hidden -translate-x-1/2 lg:block"
              style={{ left: `${at * 100}%` }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, ease: EASE, delay: delay + 0.9 + i * 0.08 }}
            >
              <span aria-hidden className="mx-auto block h-3 w-px bg-brand/60" />
              <span className="font-display mt-2 block max-w-[13ch] text-center text-[0.6875rem] font-bold uppercase leading-[1.25] text-snow">
                {s}
              </span>
            </motion.span>
          );
        })}
      </div>

      {/* The clause the short run ends on. */}
      {terminal && (
        <motion.p
          className="font-display mt-4 max-w-[34ch] text-[0.9375rem] font-bold uppercase leading-tight text-ash"
          style={{ marginLeft: `min(${reach * 100}%, calc(100% - 34ch))` }}
          initial={reduced ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, ease: EASE, delay: delay + 0.95 }}
        >
          {terminal}
        </motion.p>
      )}

      {/* The same four, stacked, where there is no width to place them along. */}
      {stations && (
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 lg:hidden">
          {stations.map((s) => (
            <li
              key={s}
              className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-snow"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

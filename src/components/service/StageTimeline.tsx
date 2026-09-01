"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

type Stage = { no: string; title: string; body: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Process as a tracked run rather than a bulleted list: a sticky counter holds
 *  the current stage at display scale while the stages themselves scroll past,
 *  with a meter reading the whole section's progress. */
export function StageTimeline({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  stages,
  outro,
  axis = ["Day 0", "Day 90"],
  mark = { variant: "progression", label: "Four stages across ninety days" },
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  /** Omit where the source document has no intro paragraph. */
  lede?: string;
  stages: Stage[];
  outro?: string;
  /** Ends of the progress meter. Whatever span the source document names —
   *  never a duration the document does not state. */
  axis?: [string, string];
  mark?: { variant: "progression" | "growth" | "network" | "contrast" | "ecosystem"; label: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.62", "end 0.72"] });
  const meter = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length)));
    setActive(i);
  });

  // overflow-x-clip, not overflow-hidden: the latter creates a scroll
  // container and silently disables the sticky counter below.
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          lede={lede}
          mark={mark}
          className="mb-20"
        />

        <div ref={ref} className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* Sticky counter */}
          <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <div className="relative">
              <span className="font-display block text-[clamp(5rem,13vw,10rem)] font-extrabold leading-[0.82] text-stroke">
                {stages[active]?.no}
              </span>
              <motion.span
                key={active}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="font-display mt-6 block text-xl font-extrabold uppercase leading-tight text-brand sm:text-2xl"
              >
                {stages[active]?.title}
              </motion.span>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-ash">
                <span>{axis[0]}</span>
                <span>{axis[1]}</span>
              </div>
              <span className="mt-3 block h-px w-full bg-line">
                <motion.span
                  style={{ scaleX: reduced ? 1 : meter }}
                  className="block h-px w-full origin-left bg-brand"
                />
              </span>
              <ol className="mt-6 flex gap-2">
                {stages.map((s, i) => (
                  <li key={s.no} className="flex-1">
                    <span
                      className={cn(
                        "block h-[3px] rounded-full transition-colors duration-500",
                        i <= active ? "bg-brand" : "bg-line",
                      )}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Stages */}
          <ol className="space-y-5">
            {stages.map((stage, i) => (
              <motion.li
                key={stage.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.7, ease: EASE }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-8 transition-colors duration-500 sm:p-10",
                  i === active ? "border-brand/45 bg-ink-2" : "border-line bg-ink-2/40",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-0 left-0 w-[3px] transition-colors duration-500",
                    i === active ? "bg-brand" : "bg-transparent",
                  )}
                />
                <div className="flex items-baseline gap-5">
                  <span
                    className={cn(
                      "font-display text-sm font-bold tabular-nums transition-colors duration-500",
                      i === active ? "text-brand" : "text-ash",
                    )}
                  >
                    {stage.no}
                  </span>
                  <h3 className="font-display text-xl font-extrabold uppercase leading-tight text-snow sm:text-2xl">
                    {stage.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-2xl leading-relaxed text-fog">{stage.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {outro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-16 max-w-2xl border-l-2 border-brand pl-6 text-lg leading-relaxed text-snow"
          >
            {outro}
          </motion.p>
        )}
      </Container>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetaMark } from "@/components/service/MetaMark";
import { cn } from "@/lib/cn";

type Stage = { no: string; title: string; body: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Unstable, then settling — and scrolled through rather than read at once.
 *
 *  Two things in the source shape this. First, the run is four numbered stages
 *  plus an open-ended "Ongoing" — not five stages, so the tail is drawn as a
 *  continuation rather than given a numeral it does not have. Second, stage
 *  three's whole point is "early figures will look unstable, because they are",
 *  so the signal in the sticky panel is jagged early and flat by the end. The
 *  instability is the content, not decoration.
 *
 *  The panel holds position while the stages move past it: the numeral, title
 *  and meter all change as each stage takes over, so scrolling reads as
 *  advancing through the run. Uses position: sticky, not a pinned scroll
 *  hijack, so the page never takes the scroll away from the reader.
 *
 *  Note the section is overflow-x-clip, never overflow-hidden: the latter makes
 *  the section a scroll container and silently kills the sticky panel. */

export function StageLadder({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
  /** The final entry is the open-ended one — drawn as a continuation. */
  tail = true,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  stages: Stage[];
  tail?: boolean;
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.8"] });
  const meter = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const railHeight = useTransform(meter, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(stages.length - 1, Math.max(0, Math.floor(v * stages.length)));
    setActive(i);
  });

  const lastIndex = stages.length - 1;
  const isTailIndex = (i: number) => tail && i === lastIndex;
  const activeStage = stages[active];

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-24 sm:py-32">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          markNode={<MetaMark variant="learning" />}
          className="mb-16"
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
          {/* Sticky panel: holds while the stages move past it. */}
          <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <div className="flex items-end gap-5 lg:block">
              <motion.span
                key={`n-${active}`}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={cn(
                  "font-display block font-extrabold leading-[0.82] text-brand",
                  isTailIndex(active)
                    ? "text-[clamp(1.6rem,3.4vw,2.6rem)]"
                    : "text-[clamp(3.5rem,9vw,7rem)]",
                )}
              >
                {/* The tail's slot carries the document's own word rather than a
                    numeral it never gives, or an invented glyph. */}
                {isTailIndex(active) ? "Ongoing" : activeStage?.no}
              </motion.span>

              <motion.span
                key={`t-${active}`}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
                className="font-display block pb-2 text-lg font-extrabold uppercase leading-[1.15] tracking-tight text-snow lg:mt-6 lg:pb-0 lg:text-2xl"
              >
                {activeStage?.title}
              </motion.span>
            </div>

            {/* Meter: how far through the run the reader is. */}
            <div className="mt-8 lg:mt-10">
              <span className="block h-px w-full bg-line">
                <motion.span
                  style={{ scaleX: reduced ? 1 : meter }}
                  className="block h-px w-full origin-left bg-brand"
                />
              </span>
              <ol className="mt-4 flex gap-1.5" aria-hidden>
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

          {/* The run itself. */}
          <ol ref={listRef} className="relative">
            <span
              aria-hidden
              className="absolute left-[11px] top-2 bottom-2 w-px bg-line sm:left-[15px]"
            />
            <motion.span
              aria-hidden
              style={{ height: reduced ? "100%" : railHeight }}
              className="absolute left-[11px] top-2 w-px origin-top bg-brand sm:left-[15px]"
            />

            {stages.map((stage, i) => {
              const isTail = isTailIndex(i);
              const isActive = i === active;
              return (
                <motion.li
                  key={stage.no}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.65, ease: EASE }}
                  className="relative pb-5 pl-12 last:pb-0 sm:pl-16"
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-6 grid h-6 w-6 place-items-center rounded-full border transition-colors duration-500 sm:h-8 sm:w-8",
                      isTail && "border-dashed",
                      isActive ? "border-brand bg-ink-2" : "border-line bg-ink-2",
                    )}
                  >
                    <span
                      className={cn(
                        "block rounded-full transition-all duration-500",
                        isActive ? "h-2.5 w-2.5 bg-brand" : "h-2 w-2 bg-line",
                      )}
                    />
                  </span>

                  {/* Card. Only the surface changes with state — the text keeps
                      its colours, so nothing dims below readable contrast. */}
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl border p-7 transition-colors duration-500 sm:p-8",
                      isActive ? "border-brand/40 bg-ink-2" : "border-line bg-transparent",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0 left-0 w-[3px] origin-top bg-brand transition-transform duration-500",
                        isActive ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span
                        className={cn(
                          "font-display text-xs font-bold uppercase tracking-[0.22em] transition-colors duration-500",
                          isActive || isTail ? "text-brand-text" : "text-fog",
                        )}
                      >
                        {/* The tail's label is the document's own word, not a numeral. */}
                        {isTail ? "Ongoing" : stage.no}
                      </span>
                      <h3 className="font-display text-xl font-extrabold uppercase leading-[1.12] tracking-tight text-snow sm:text-2xl">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="mt-4 max-w-2xl leading-relaxed text-fog">{stage.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

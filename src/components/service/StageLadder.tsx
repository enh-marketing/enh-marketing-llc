"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const railRef = useRef<HTMLSpanElement>(null);
  const meterRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  /** Last index pushed to React, so scrolling does not re-render every frame. */
  const lastPushed = useRef(0);

  const count = stages.length;

  // Tracked with ScrollTrigger rather than motion's useScroll, deliberately.
  // This section sits below a section that pins and adds ~1700px of scroll
  // distance at hydration, and the FAQ accordions change the page height later
  // still. motion caches the target's offsets and only re-measures on a window
  // resize, so a layout shift underneath it leaves the progress stuck. GSAP is
  // refreshed by SmoothScroll's ResizeObserver whenever the document height
  // moves, and it is already the clock Lenis drives, so the whole page reads
  // scroll from one source instead of two that can disagree.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: list,
        start: "top 70%",
        end: "bottom 80%",
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;
          // Written straight to the DOM: no React work per frame.
          if (railRef.current) railRef.current.style.height = `${p * 100}%`;
          if (meterRef.current) meterRef.current.style.transform = `scaleX(${p})`;

          const i = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
          if (i !== lastPushed.current) {
            lastPushed.current = i;
            setActive(i);
          }
        },
      });
      return () => trigger.kill();
    }, list);

    return () => ctx.revert();
  }, [count]);

  const lastIndex = stages.length - 1;
  const isTailIndex = (i: number) => tail && i === lastIndex;
  const activeStage = stages[active];

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
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
                className="font-display block pb-2 text-lg font-extrabold uppercase leading-[1.15] text-snow lg:mt-6 lg:pb-0 lg:text-2xl"
              >
                {activeStage?.title}
              </motion.span>
            </div>

            {/* Meter: how far through the run the reader is. */}
            <div className="mt-8 lg:mt-10">
              <span className="block h-px w-full bg-line">
                <span
                  ref={meterRef}
                  style={{ transform: reduced ? "scaleX(1)" : "scaleX(0)" }}
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
          {/* The rail sits outside the list. A <span> as a direct child of <ol>
              is invalid markup, and it put two of them there on every page
              using this ladder; the wrapper keeps the same positioning context
              and the same bounds, so the rail geometry is unchanged. */}
          <div className="relative">
            <span
              aria-hidden
              className="absolute left-[11px] top-2 bottom-2 w-px bg-line sm:left-[15px]"
            />
            <span
              ref={railRef}
              aria-hidden
              style={{ height: reduced ? "100%" : "0%" }}
              className="absolute left-[11px] top-2 w-px origin-top bg-brand sm:left-[15px]"
            />

          <ol ref={listRef} className="relative">
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
                  className="relative pb-4 pl-12 last:pb-0 sm:pl-16"
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
                      "relative overflow-hidden rounded-2xl border p-6 transition-colors duration-500 sm:p-7",
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
                          "font-display text-xs font-bold uppercase transition-colors duration-500",
                          isActive || isTail ? "text-brand-text" : "text-fog",
                        )}
                      >
                        {/* The tail's label is the document's own word, not a numeral. */}
                        {isTail ? "Ongoing" : stage.no}
                      </span>
                      <h3 className="font-display text-xl font-extrabold uppercase leading-[1.12] text-snow sm:text-2xl">
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
        </div>
      </Container>
    </section>
  );
}

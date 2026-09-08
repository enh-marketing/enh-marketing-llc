"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BriefStage } from "@/components/service/BriefStage";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/services/seo-content-creation";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/** The process, drawn as the thing it is making.
 *
 *  THE CONCEPT COMES OUT OF THE DOCUMENT, NOT OFF A MOODBOARD. Stage five is
 *  called "Prepare the Content Brief", and the document says the brief "defines
 *  the page purpose, audience, main subject, supporting questions, structure and
 *  call to action". Read the seven in that light and they stop being seven
 *  topics: four of them are material going into one object, the fifth is that
 *  object, the sixth writes from it, and the seventh watches what was written.
 *  So the section holds one artifact on screen and changes its state, instead of
 *  listing steps. The reader watches a business objective turn into a page.
 *
 *  WHY IT IS NOT A LADDER OR A ROW OF CARDS. Both of those set the seven side by
 *  side as equals and leave the transformation for the reader to infer from the
 *  numerals. Here the transformation is the only thing on screen: the inputs
 *  accumulate on the left, recede when the brief exists, and the artifact on the
 *  right fills out and then goes under review. Take the motion away and the
 *  composition still reads, because the artifact renders at whatever stage it
 *  has reached and every sentence is on the page regardless.
 *
 *  STICKY, NEVER A PINNED SCROLL HIJACK. The house rule, and the right one: the
 *  page never takes the scroll away from the reader, so a flick still moves the
 *  page and the browser's own scrollbar keeps telling the truth. The section is
 *  overflow-x-clip and never overflow-hidden, which would silently make it a
 *  scroll container and kill the sticky panel.
 *
 *  SCROLL WORK STAYS OFF THE REACT PATH. ScrollTrigger writes the rail and the
 *  meter straight to the DOM on every update; React only hears about a stage
 *  when the stage actually changes. That is the same arrangement StageLadder
 *  uses, for the same reason: no re-render per frame.
 *
 *  RESPONSIVE. Below the large breakpoint the artifact goes to the top of the
 *  section and sticks there while the stages pass beneath it, so the idea
 *  survives without the two-column composition: the reader still watches one
 *  object change. Nothing depends on a viewport tall enough to hold both.
 *
 *  REDUCED MOTION. The tracking still runs, because it is scroll position and
 *  not animation, but every transition inside the artifact is dropped and the
 *  stage text swaps without travel. */

export function ContentPipeline({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle?: string;
  stages: Stage[];
}) {
  const listRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  /** Last index pushed to React, so scrolling does not re-render every frame. */
  const lastPushed = useRef(0);
  const count = stages.length;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: list,
        start: "top 65%",
        end: "bottom 75%",
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;
          // Written straight to the DOM: no React work per frame.
          if (railRef.current) railRef.current.style.transform = `scaleY(${p})`;
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

  const stage = stages[active];

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-16">
          {/* ---------------------------------------------- the artifact ---
              Sticky in both layouts: at the top of the viewport on small
              screens, beside the stages on large ones. */}
          <div className="sticky top-20 z-10 -mx-6 mb-8 bg-ink-3/85 px-6 py-4 backdrop-blur-sm sm:-mx-10 sm:px-10 lg:top-28 lg:z-0 lg:mx-0 lg:mb-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
            <BriefStage active={active} reduced={reduced} />

            {/* Where it starts, where it is, and where it leads. The rail is
                the only progress chrome, and it carries no words: the stage
                numeral beside it already says which of the seven this is. */}
            <div className="mt-5 flex items-center gap-4">
              <span aria-hidden className="relative h-px flex-1 overflow-hidden bg-line lg:hidden">
                <span
                  className="absolute inset-y-0 left-0 w-full origin-left bg-brand"
                  style={{ transform: `scaleX(${(active + 1) / count})` }}
                />
              </span>
              <span
                aria-hidden
                className="font-display shrink-0 text-[0.62rem] font-bold tabular-nums text-ash"
              >
                {stage.no}
                <span className="text-line"> / {count}</span>
              </span>
            </div>
          </div>

          {/* ------------------------------------------------ the stages ---
              Each takes most of a viewport on large screens, so one stage is
              read against the artifact at a time rather than a list scrolling
              past a picture. */}
          <ol ref={listRef} className="relative lg:pl-12">
            {/* The rail, and the run down it. */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-px bg-line lg:block"
            >
              <span
                ref={railRef}
                className="absolute inset-0 origin-top bg-brand"
                style={{ transform: "scaleY(0)" }}
              />
            </span>

            {stages.map((s, i) => {
              const on = i === active;
              return (
                <li
                  key={s.no}
                  className="relative flex flex-col justify-center py-10 lg:min-h-[62vh] lg:py-0"
                >
                  {/* The tick for this stage on the rail. */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-12 hidden h-2.5 w-2.5 rounded-full border-2 transition-colors duration-500 motion-reduce:transition-none lg:block",
                      on ? "border-brand bg-brand" : "border-line bg-ink-3",
                    )}
                    style={{ top: "calc(50% - 0.3125rem)", marginLeft: "-0.3125rem" }}
                  />

                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "font-display block text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-none tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                        on ? "text-brand" : "text-snow/[0.13]",
                      )}
                    >
                      {s.no.padStart(2, "0")}
                    </span>
                    <h3
                      className={cn(
                        "font-display mt-4 text-[clamp(1.35rem,2.8vw,2.1rem)] font-extrabold uppercase leading-[1.1] transition-colors duration-500 motion-reduce:transition-none",
                        on ? "text-snow" : "text-fog",
                      )}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-5 max-w-xl leading-relaxed text-fog sm:text-lg">{s.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

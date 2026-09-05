"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Stage } from "@/content/services/ai-workshops-and-training";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The programme, set as a run of steps with the day in the middle of it.
 *
 *  WHY THIS PAGE GETS ITS OWN. The shared StageLadder renders six identically
 *  bordered cards in a column beside a sticky panel, which is the arrangement
 *  this client has rejected by name. It ships on five other live pages and is
 *  right for them; changing it there to fix this page would be the wrong repair.
 *
 *  THE SHAPE OF THIS PARTICULAR RUN. Four of the six steps happen before anyone
 *  is in a room: the discussion, the review of roles and tools, the scope, and
 *  the preparation of exercises "around the team's work". The fifth is the day
 *  itself and the sixth is what follows it. That asymmetry is the argument for
 *  the whole service, and a run of six equal cards flattens it, so the delivery
 *  step is the only one whose numeral is solid and the only thing on the page
 *  that keeps moving at rest.
 *
 *  NUMERALS AT SIZE. The steps are short. Set at body scale with a border round
 *  each they are six paragraphs; set against a numeral at display scale they
 *  have a rhythm to travel through, and the section gains the scale contrast the
 *  rest of the page now has. */
export function TrainingRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
  dayAt,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  stages: Stage[];
  /** Zero-based index of the step that is the session itself. */
  dayAt: number;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const reduced = usePrefersReducedMotion();
  /* Reduced motion resolves after hydration, so a reader who has asked for no
     motion still starts on the hidden frame for one paint. Treating it as shown
     puts them straight on the finished one. */
  const show = inView || reduced;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "Four before the room, one in it" }}
          className="mb-12"
        />

        <ol ref={ref} className="border-t border-line">
          {stages.map((s, i) => {
            const day = i === dayAt;
            return (
              <motion.li
                key={s.no}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.55, ease: EASE }}
                className={cn(
                  "group grid items-start gap-x-8 border-b border-line py-8 transition-colors duration-500 motion-reduce:transition-none sm:gap-x-12 sm:py-10",
                  "lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,1.25fr)]",
                  day ? "bg-ink-2" : "hover:bg-ink-2",
                )}
              >
                {/* The numeral. Ghosted for the steps that prepare, solid for
                    the one that happens. */}
                <span className="relative flex shrink-0 items-center">
                  <span
                    className={cn(
                      "font-display text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-[0.85] tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                      day ? "text-brand" : "text-line group-hover:text-ash",
                    )}
                  >
                    {s.no}
                  </span>
                  {/* The day is the only live thing here, because it is the only
                      one that is an event. */}
                  {day && (
                    <span
                      aria-hidden
                      className="ci-twinkle ml-4 block h-2.5 w-2.5 shrink-0 rounded-full bg-brand"
                    />
                  )}
                </span>

                <h3
                  className={cn(
                    "font-display self-center text-[clamp(1.05rem,2.1vw,1.5rem)] font-extrabold uppercase leading-[1.12] transition-colors duration-500 motion-reduce:transition-none",
                    day ? "text-brand" : "text-snow",
                  )}
                >
                  {s.title}
                </h3>

                <div className="self-center">
                  <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none sm:text-base">
                    {s.body}
                  </p>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-5 block h-px transition-all duration-500 motion-reduce:transition-none",
                      day ? "w-24 bg-brand" : "w-8 bg-line group-hover:w-20 group-hover:bg-brand",
                    )}
                  />
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

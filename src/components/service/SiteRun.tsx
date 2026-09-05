"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Stage } from "@/content/services/intelligent-web";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The project, drawn around the question it turns on.
 *
 *  WHY THIS PAGE GETS ITS OWN. The five steps are ordinary in every project of
 *  this kind except for the second, and the second is the question the entire
 *  page keeps returning to: "We identify which intelligent features are suitable
 *  and whether the existing website can support them." Improve, or rebuild. The
 *  banner says it, FAQ 2 says it, and the services list splits along it. A run of
 *  five equal rows buries the one decision a reader actually arrived with.
 *
 *  So the run forks. Everything before the second step is one line; at the
 *  second it opens into the document's own two outcomes and closes again,
 *  because whichever answer comes back the remaining steps are the same. The
 *  last step's line does not close, since monitoring continues "when your
 *  systems or business requirements change".
 *
 *  NOTHING IS RECOMMENDED HERE. The drawing does not favour either outcome and
 *  neither does the document: the diagnostic decides, and FAQ 2 is explicit that
 *  it depends. Both arms are drawn at the same weight. */
export function SiteRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
  forkAt,
  fork,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  stages: Stage[];
  /** Zero-based index of the step that decides the shape of the rest. */
  forkAt: number;
  /** The two outcomes, verbatim. */
  fork: [string, string] | string[];
}) {
  const ref = useRef<HTMLOListElement>(null);
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
          mark={{ variant: "contrast", label: "One question decides the rest" }}
          className="mb-12"
        />

        <ol ref={ref} className="border-t border-line">
          {stages.map((s, i) => {
            const forking = i === forkAt;
            const last = i === stages.length - 1;
            return (
              <motion.li
                key={s.no}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.55, ease: EASE, delay: Math.min(i * 0.07, 0.35) }}
                className={cn(
                  "group flex items-stretch gap-6 border-b border-line transition-colors duration-500 motion-reduce:transition-none sm:gap-10",
                  forking ? "bg-ink-2" : "hover:bg-ink-2",
                )}
              >
                {/* The line the project runs on. One strand, two at the
                    question, one again afterwards, and open at the end. */}
                <div className="relative w-12 shrink-0 sm:w-28" aria-hidden>
                  <span
                    className={cn(
                      "absolute left-1/2 w-0.5 -translate-x-1/2 bg-brand",
                      i === 0
                        ? "top-1/2 bottom-0"
                        : last
                          ? "top-0 bottom-1/2"
                          : forking
                            ? "top-0 h-[44%]"
                            : "inset-y-0",
                    )}
                  />
                  {forking && <span className="absolute bottom-0 left-1/2 h-[11%] w-0.5 -translate-x-1/2 bg-brand" />}
                  {/* Where it opens into two and closes again. Drawn as a
                      path rather than four bars: four bars meeting at the
                      corners read as a box, and a box is not a decision. */}
                  {forking && (
                    <svg
                      viewBox="0 0 112 220"
                      preserveAspectRatio="none"
                      className="absolute inset-0 h-full w-full"
                    >
                      <path
                        d="M56 96 L14 132 V160 L56 196 M56 96 L98 132 V160 L56 196"
                        stroke="var(--color-brand)"
                        strokeWidth="2"
                        vectorEffect="non-scaling-stroke"
                        fill="none"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {/* The step itself. */}
                  <span
                    className={cn(
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand",
                      forking ? "h-4 w-4 bg-brand" : "h-3 w-3 bg-void",
                    )}
                    style={forking ? { top: "44%" } : undefined}
                  />
                  {/* Something running the line, so the project is in motion
                      whether or not the reader is. */}
                  <svg
                    viewBox="0 0 4 54"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-1 -translate-x-1/2"
                  >
                    <rect
                      className="ci-scan-y"
                      x="0"
                      y="-10"
                      width="4"
                      height="10"
                      fill="var(--color-brand)"
                      fillOpacity="0.65"
                    />
                  </svg>
                  {last && (
                    <span className="absolute bottom-0 left-1/2 h-6 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand to-transparent" />
                  )}
                </div>

                <div className="min-w-0 flex-1 py-8 pr-4 sm:py-10">
                  <div className="flex items-baseline gap-3.5">
                    <span
                      className={cn(
                        "font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                        forking ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                      )}
                    >
                      {s.no}
                    </span>
                    <h3
                      className={cn(
                        "font-display text-[clamp(1.1rem,2.2vw,1.6rem)] font-extrabold uppercase leading-[1.1]",
                        forking ? "text-brand" : "text-snow",
                      )}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3.5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none sm:text-base">
                    {s.body}
                  </p>

                  {/* The two answers the question can come back with. */}
                  {forking && (
                    <ul className="mt-5 flex flex-wrap gap-2.5">
                      {fork.map((f) => (
                        <li
                          key={f}
                          className="font-display cursor-default rounded-full border border-brand/50 px-4 py-2 text-[0.75rem] font-bold uppercase leading-none tracking-[0.04em] text-brand-text transition-colors duration-300 hover:border-brand hover:bg-brand/[0.06] motion-reduce:transition-none"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

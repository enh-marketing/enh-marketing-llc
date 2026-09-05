"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Stage } from "@/content/services/conversational-ai";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The project, drawn as how much the agent is carrying at each step.
 *
 *  THE ONE FACT WORTH DRAWING. Five of the six steps are ordinary. What a
 *  cautious customer service manager actually wants to know is when this thing
 *  starts talking to their customers, and the answer is buried fifth out of six:
 *  "The agent is introduced gradually where necessary." Everything before it is
 *  agreement and testing. Nothing before it is live.
 *
 *  So the run has a gutter down its left side and the gutter is empty for four
 *  steps. It opens as a wedge through the controlled launch and stays open, with
 *  its bottom edge unresolved, because the sixth step has no end. A reader who
 *  looks at nothing else on this page can see the shape of the risk from across
 *  the room, and the shape is reassuring because the document earned it.
 *
 *  EVERY STEP IS ITS OWN CHECKLIST. Each step in this document ends in a list,
 *  and the list is the substance: what is discussed, what testing covers, what
 *  early conversations are checked for. Four of the six have no other content at
 *  all. Setting those as prose and calling it a step reduces the section to six
 *  paragraphs that say very little; setting them as the checks they are makes
 *  the section worth reading. The label and the items reconstruct the
 *  document's sentence word for word in every case.
 *
 *  NO SCALE ON THE GUTTER. It has no axis, no percentage and no figure. The
 *  document gives no volumes and no timeline, so the wedge carries "gradually"
 *  and nothing more. */
export function ProjectSpine({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
  liveAt,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  stages: Stage[];
  /** Zero-based index of the step at which the agent first carries live
   *  conversations. */
  liveAt: number;
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "Nothing is live until the fifth" }}
          className="mb-12"
        />

        <ol>
          {stages.map((s, i) => (
            <Step key={s.no} s={s} i={i} liveAt={liveAt} last={i === stages.length - 1} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** One step, and the slice of gutter that belongs to it. */
function Step({
  s,
  i,
  liveAt,
  last,
}: {
  s: Stage;
  i: number;
  liveAt: number;
  last: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const reduced = usePrefersReducedMotion();
  const show = inView || reduced;

  const live = i > liveAt;
  const opening = i === liveAt;

  return (
    <li ref={ref} className="flex items-stretch gap-6 sm:gap-10">
      {/* The gutter. Empty until the launch, a wedge through it, open after. */}
      <div className="relative w-12 shrink-0 sm:w-24 lg:w-32" aria-hidden>
        {/* The far edge of the channel. Without it the empty steps read as
            blank margin rather than as a measure that is deliberately at zero. */}
        <span className="absolute inset-y-0 left-0 w-px bg-line" />

        {/* The axis the run is measured from. Present the whole way down. */}
        <span
          className={cn(
            "absolute inset-y-0 right-0",
            i < liveAt ? "w-px bg-ash/45" : "w-0.5 bg-brand",
          )}
        />

        {/* The project is running from step one, whether or not the agent is
            carrying anything yet. One packet per segment says so. */}
        <svg
          aria-hidden
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-1"
        >
          <path
            className="ci-flow"
            d="M2 0 V100"
            pathLength={100}
            stroke="var(--color-brand)"
            strokeWidth={i < liveAt ? 1.6 : 3}
            fill="none"
            style={{ animationDelay: `${(i * 0.45).toFixed(2)}s` }}
          />
        </svg>

        {opening && (
          <motion.svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            initial={reduced ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Widening, with no scale on it: the shape is "gradually". */}
            <motion.polygon
              points="100,0 100,100 0,100"
              /* Neutral. A large field of brand red is a ground, and brand red
                 is a mark on this site, never a ground. The accent is the edge. */
              fill="var(--color-ash)"
              fillOpacity={0.16}
              initial={reduced ? false : { scaleY: 0 }}
              animate={show ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{ transformOrigin: "100% 0%" }}
            />
            <motion.line
              x1="100"
              y1="0"
              x2="0"
              y2="100"
              stroke="var(--color-brand)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={reduced ? false : { pathLength: 0 }}
              animate={show ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </motion.svg>
        )}

        {live && (
          <>
            {/* Live means live: a beam runs the open channel for as long as the
                section is on screen, on the site's own looping vocabulary. */}
            <svg
              aria-hidden
              viewBox="0 0 20 54"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
            >
              <rect
                className="ci-scan-y"
                x="0"
                y="-10"
                width="20"
                height="10"
                fill="var(--color-brand)"
                fillOpacity="0.22"
              />
            </svg>
          </>
        )}
        {live && (
          <motion.span
            className="absolute inset-0 bg-ash/[0.16]"
            initial={reduced ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={
              last
                ? {
                    /* The sixth step has no end, so its edge does not resolve. */
                    maskImage: "linear-gradient(to bottom, #000 62%, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, #000 62%, transparent)",
                  }
                : undefined
            }
          />
        )}
      </div>

      {/* The step. */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.55, ease: EASE }}
        className={cn(
          "group min-w-0 flex-1 border-t border-line py-8 transition-colors duration-500 motion-reduce:transition-none sm:py-10",
          last && "border-b",
        )}
      >
        <div className="flex items-baseline gap-4">
          <span
            className={cn(
              "font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
              i >= liveAt ? "text-brand-text" : "text-ash group-hover:text-brand-text",
            )}
          >
            {s.no}
          </span>
          <h3 className="font-display text-[clamp(1.15rem,2.4vw,1.75rem)] font-extrabold uppercase leading-[1.1] text-snow">
            {s.title}
          </h3>
          <span
            aria-hidden
            className="ml-auto hidden h-px shrink-0 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none sm:block sm:w-8"
          />
        </div>

        {s.body && (
          <p
            className={cn(
              "mt-4 max-w-[54ch] leading-relaxed sm:text-lg",
              /* The sentence the whole gutter exists to illustrate. */
              opening ? "font-display text-[clamp(1.05rem,2vw,1.4rem)] font-extrabold uppercase leading-[1.18] text-brand" : "text-fog",
            )}
          >
            {s.body}
          </p>
        )}

        {/* What this step actually checks, in the document's own words. */}
        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-3">
          <span className="font-display shrink-0 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ash">
            {s.coversLabel}
          </span>
          <ul className="flex flex-wrap gap-2">
            {s.covers.map((c, k) => (
              <motion.li
                key={c}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.2 + k * 0.07 }}
                className={cn(
                  "cursor-default rounded-full border px-3.5 py-1.5 text-[0.8125rem] leading-none transition-colors duration-300 motion-reduce:transition-none",
                  i >= liveAt
                    ? "border-brand/45 text-snow hover:border-brand hover:bg-brand/[0.06]"
                    : "border-line text-fog hover:border-ash hover:text-snow",
                )}
              >
                {c}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </li>
  );
}

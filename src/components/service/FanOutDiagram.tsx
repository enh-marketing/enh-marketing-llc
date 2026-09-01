"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const W = 420;
const H = 260;
const MID = H / 2;
const BRANCHES = [40, 95, 130, 165, 220];

/** Google's "query fan-out", drawn.
 *
 *  The document explains that AI Overviews run multiple related searches across
 *  subtopics and compose one answer from them, and that this is why answering
 *  the neighbouring questions matters. That is a shape — one in, many across,
 *  one out — and a shape is worth drawing. It is also the mechanic the levers
 *  section refers back to, so having seen it once makes that section shorter.
 *
 *  Deliberately unlabelled. Putting words on the sub-queries would mean writing
 *  example searches, which is inventing copy on a page that argues against
 *  invented claims. The geometry carries the idea on its own.
 *
 *  The paths draw themselves in on entry, which is the one thing motion adds
 *  here that a static diagram cannot: it shows the direction of travel. Under
 *  reduced motion the finished diagram renders immediately. */
export function FanOutDiagram({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const play = reduced || inView;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label="One query fanning out into several related searches, then composed back into a single answer."
    >
      {/* Fan out, then converge. Two path sets so they can draw in sequence. */}
      {BRANCHES.map((y, i) => (
        <motion.path
          key={`out-${i}`}
          d={`M 46 ${MID} C 120 ${MID}, 130 ${y}, 196 ${y}`}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1.5"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={play ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
        />
      ))}

      {BRANCHES.map((y, i) => (
        <motion.path
          key={`in-${i}`}
          d={`M 224 ${y} C 290 ${y}, 300 ${MID}, 374 ${MID}`}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth="1.5"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={play ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.62 + i * 0.08, ease: EASE }}
        />
      ))}

      {/* Sub-queries. */}
      {BRANCHES.map((y, i) => (
        <motion.rect
          key={`node-${i}`}
          x="196"
          y={y - 9}
          width="28"
          height="18"
          rx="5"
          fill="var(--color-ink-3)"
          stroke="var(--color-line)"
          strokeWidth="1.5"
          initial={reduced ? false : { opacity: 0, scale: 0.6 }}
          animate={play ? { opacity: 1, scale: 1 } : {}}
          style={{ transformOrigin: `${210}px ${y}px` }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE }}
        />
      ))}

      {/* The question. */}
      <motion.circle
        cx="30"
        cy={MID}
        r="16"
        fill="var(--color-ink-3)"
        stroke="var(--color-brand)"
        strokeWidth="2"
        initial={reduced ? false : { opacity: 0, scale: 0.5 }}
        animate={play ? { opacity: 1, scale: 1 } : {}}
        style={{ transformOrigin: `30px ${MID}px` }}
        transition={{ duration: 0.45, ease: EASE }}
      />

      {/* The answer. Filled, because this is the thing that gets shown. */}
      <motion.circle
        cx="390"
        cy={MID}
        r="16"
        fill="var(--color-brand)"
        initial={reduced ? false : { opacity: 0, scale: 0.5 }}
        animate={play ? { opacity: 1, scale: 1 } : {}}
        style={{ transformOrigin: `390px ${MID}px` }}
        transition={{ duration: 0.5, delay: 1.15, ease: EASE }}
      />
    </svg>
  );
}

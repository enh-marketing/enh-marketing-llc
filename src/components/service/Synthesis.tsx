"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The closing passage of the comparison, as a convergence.
 *
 *  Read the copy before designing this: it does NOT set the two approaches
 *  against each other. It says performance marketing "works best as part of a
 *  wider digital strategy", names what each side does, then describes what
 *  happens when they support each other. So the composition is two streams
 *  meeting, not a split screen — a contrast layout would argue the opposite of
 *  the sentence it is presenting.
 *
 *  Hovering one role emphasises it and recedes the other, which lets you read
 *  the two jobs separately without implying one wins. */
export function Synthesis({
  premise,
  roleA,
  roleB,
  outcome,
}: {
  premise: string;
  roleA: string;
  roleB: string;
  outcome: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [hover, setHover] = useState<"a" | "b" | null>(null);

  const role = (side: "a" | "b", text: string, accent: boolean) => {
    const dim = hover !== null && hover !== side;
    return (
      <motion.div
        onPointerEnter={() => setHover(side)}
        onPointerLeave={() => setHover(null)}
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: side === "a" ? 0.15 : 0.28, ease: EASE }}
        className={cn(
          "relative flex-1 pt-6 transition-opacity duration-500",
          dim ? "opacity-35" : "opacity-100",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-0 h-px origin-left transition-colors duration-500",
            accent ? "bg-brand" : "bg-line",
            hover === side && !accent && "bg-fog",
          )}
        />
        <p
          // Both roles read at equal weight: the copy gives them equal billing,
          // so only the rule colour distinguishes them, never the text.
          className="max-w-sm text-base leading-relaxed text-snow sm:text-lg"
        >
          {text}
        </p>
      </motion.div>
    );
  };

  return (
    <div ref={ref} className="mt-20 sm:mt-24">
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
        className="font-display max-w-2xl text-[clamp(1.15rem,2.1vw,1.75rem)] font-extrabold uppercase leading-[1.2] text-snow"
      >
        {premise}
      </motion.p>

      {/* The two jobs it names */}
      <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:gap-16">
        {role("a", roleA, true)}
        {role("b", roleB, false)}
      </div>

      {/* Convergence: the two streams meeting */}
      <div className="relative h-24 sm:h-28" aria-hidden>
        <svg viewBox="0 0 1000 110" preserveAspectRatio="none" className="h-full w-full">
          <motion.path
            d="M250 0 C250 62, 500 48, 500 110"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="1.4"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: reduced ? 0 : 1.1, delay: 0.45, ease: EASE }}
          />
          <motion.path
            d="M750 0 C750 62, 500 48, 500 110"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="1.4"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: reduced ? 0 : 1.1, delay: 0.45, ease: EASE }}
          />
        </svg>
        <motion.span
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.35, ease: EASE }}
          className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand"
        />
      </div>

      {/* What the two produce together */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        className="mx-auto max-w-3xl border-t border-line pt-10 text-center"
      >
        <p className="font-display text-[clamp(1.05rem,1.9vw,1.5rem)] font-bold leading-snug text-snow">
          {outcome}
        </p>
      </motion.div>
    </div>
  );
}

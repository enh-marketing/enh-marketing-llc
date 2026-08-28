"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type Stat = { figure: string; unit?: string; label: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** The four proof figures, as a band rather than a card grid.
 *
 *  Four numbers in four boxes is the stock treatment and it makes each figure
 *  compete with its own container. Here the figures sit in open space on one
 *  elevated band, separated by hairlines that draw themselves in — so what the
 *  eye lands on is the numbers, not the furniture.
 *
 *  The unit carries the accent, never the value: "3.5" in snow with a red "x"
 *  reads as one figure with emphasis, where colouring the whole number would
 *  turn four shouting reds into noise. One accent, used four times, in the same
 *  place each time.
 *
 *  No count-up. Two of these are not countable — a range and a magnitude — and
 *  a counter would either mangle them or force them to be re-typed as numbers
 *  somewhere, which is how a figure on a marketing page ends up disagreeing
 *  with itself. The values render as the exact strings supplied.
 *
 *  Marked up as a definition list with the label as the term, so assistive tech
 *  reads "ROAS Achieved: 3.5x". The value is shown above the label visually via
 *  flex order, which keeps the DOM order a <dl> actually expects. */
export function ResultStats({
  id,
  label,
  stats,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  stats: Stat[];
}) {
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      data-section={label}
      className="relative border-y border-line bg-ink-2 py-14 sm:py-16"
    >
      <Container>
        <dl className="grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
              className={cn(
                "flex flex-col",
                // Hairlines between cells only, never a leading edge, and only
                // where the columns actually sit side by side.
                i % 2 === 1 && "sm:border-l sm:border-line sm:pl-8 lg:border-l-0 lg:pl-0",
                i > 0 && "lg:border-l lg:border-line lg:pl-10",
              )}
            >
              <dd className="order-first">
                <span className="font-display display-xl block font-extrabold leading-[0.9] tracking-tight text-snow">
                  {stat.figure}
                  {stat.unit && <span className="text-brand">{stat.unit}</span>}
                </span>

                {/* Rule under the figure, drawn on arrival. */}
                <motion.span
                  aria-hidden
                  className="mt-6 block h-px w-full origin-left bg-brand/45"
                  initial={reduced ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease: EASE }}
                />
              </dd>

              <dt className="mt-4 text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-fog">
                {stat.label}
              </dt>
            </motion.div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

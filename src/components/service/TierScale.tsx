"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Tier } from "@/content/services/influencer-marketing";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The four creator tiers, drawn as the scale they are.
 *
 *  WHY NOT A TABLE. It arrives as one — tier, typical use, trade-off — but a
 *  table presents four peers, and these are not peers. Nano, micro, macro and
 *  celebrity are an ordered scale, and the document's own trade-offs confirm
 *  the direction of travel: more influencers needed, then several at once, then
 *  higher fees, then significant budget. Reading them in order is the point,
 *  and a table does not make you read in order.
 *
 *  It also avoids repeating the Performance Marketing comparison table and the
 *  AEO assistant switcher, both of which have already spent this content shape.
 *
 *  WHAT THE STEPS ENCODE, AND WHAT THEY DO NOT. The blocks beside each tier
 *  show rank — first, second, third, fourth — not audience size, reach or cost.
 *  The document orders these tiers but never quantifies any of them, so
 *  anything proportional would be a figure we invented. Four discrete blocks
 *  filling one at a time can only say "further up the scale", which is exactly
 *  what the source supports.
 *
 *  Every row carries its trade-off with the same weight as its use, on the
 *  right, because the document pairs them and a page that dropped the cost
 *  column would be selling rather than advising. */
export function TierScale({
  id,
  label,
  index,
  title,
  strokeTitle,
  columns,
  rows,
  closing,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  columns: { name: string; use: string; tradeoff: string };
  rows: Tier[];
  closing: string[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const play = reduced || inView;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      {/* Dot field, fading in from the top of the scale. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(ellipse at 85% 15%, black, transparent 68%)",
        }}
      />

      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "Four tiers, each with its own cost" }}
          className="mb-12"
        />

        {/* Column headings, kept from the source table. */}
        <div className="hidden grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,1fr)] gap-x-10 border-b border-line pb-4 lg:grid">
          {[columns.name, columns.use, columns.tradeoff].map((head, i) => (
            <p
              key={head}
              className={cn(
                "text-[0.65rem] font-semibold uppercase",
                i === 2 ? "text-ash" : "text-fog",
              )}
            >
              {head}
            </p>
          ))}
        </div>

        <ol ref={ref}>
          {rows.map((row, i) => (
            <li
              key={row.name}
              className="group grid gap-x-10 gap-y-4 border-b border-line py-7 transition-colors duration-500 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,1fr)]"
            >
              {/* Rank, then name. */}
              <div>
                <div aria-hidden className="flex items-center gap-1.5">
                  {rows.map((_, step) => (
                    <motion.span
                      key={step}
                      initial={reduced ? false : { opacity: 0, scaleY: 0.3 }}
                      animate={play ? { opacity: 1, scaleY: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.09 + step * 0.05, ease: EASE }}
                      className={cn(
                        "h-4 w-2.5 origin-bottom rounded-[2px]",
                        step <= i ? "bg-brand" : "bg-line",
                      )}
                    />
                  ))}
                </div>
                <h3 className="font-display mt-4 text-[clamp(1.35rem,2.6vw,2rem)] font-extrabold uppercase leading-none text-snow">
                  {row.name}
                </h3>
              </div>

              <p className="self-center leading-relaxed text-snow">{row.use}</p>

              {/* The cost of being there. */}
              <p className="self-center border-l-2 border-line pl-5 leading-relaxed text-fog transition-colors duration-500 group-hover:border-brand/50">
                {row.tradeoff}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-14">
          {closing.map((p, i) => (
            <Rise key={i} delay={i * 0.08}>
              <p className="leading-relaxed text-fog sm:text-lg">{p}</p>
            </Rise>
          ))}
        </div>
      </Container>
    </section>
  );
}

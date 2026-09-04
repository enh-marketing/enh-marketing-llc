"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** How much each position actually covers, drawn as extent.
 *
 *  THE SECTION ENDS BY TELLING THE READER WHAT TO DO: check the full scope
 *  "rather than the camera list alone". That is an instruction to compare
 *  breadth, and breadth is a thing you can see. Six of the seven positions
 *  enumerate what they cover -- one team across seven crafts, one decision that
 *  changes four things, three versions planned together, three things the quote
 *  nails down -- and those counts are the document's own commas, not an
 *  estimate. Drawn as discrete blocks against a shared span, the scope is
 *  legible before a word of it is read, which is exactly the check the closing
 *  sentence asks for.
 *
 *  WHAT THE BLOCKS DO AND DO NOT SAY. They are a count of items in that
 *  sentence's own list and nothing else: not hours, not cost, not importance,
 *  not a proportion of anything. Seven blocks beside the production position
 *  means the sentence names seven crafts. The sixth position lists nothing and
 *  gets no blocks rather than a filler mark, because a scope that pads is the
 *  thing this section is arguing against.
 *
 *  THE SPAN IS SHARED. Every row measures against the same seven slots, so a
 *  short row is visibly short. Giving each row its own scale would let two rows
 *  look alike while covering very different ground, which defeats the point.
 *
 *  MOTION. The blocks fill in sequence as the row arrives -- left to right,
 *  the way a list is read -- and the rail beside the run fills with the reader's
 *  own scroll. Transform only; every row rests complete. */

/** The widest list in the section, so every row is measured against the same
 *  span rather than against itself. */
const SLOTS = 7;

export function CoverageLedger({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  tail,
  tailMark,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: { stance: string; detail?: string; covers: number }[];
  tail: string;
  tailMark: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        <ol ref={ref} className="relative border-t border-line">
          {items.map((item, i) => {
            const on = hot === i;
            return (
              <motion.li
                key={item.stance}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(i)}
                onBlur={() => setHot(null)}
                tabIndex={0}
                className={cn(
                  "relative grid cursor-default gap-x-10 gap-y-5 border-b border-line py-7 pl-7 outline-none transition-colors duration-500",
                  "lg:grid-cols-[minmax(0,1fr)_minmax(0,13rem)] lg:items-start",
                  on && "bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)]",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-y-4 left-0 w-[2px] origin-center bg-brand transition-transform duration-500 ease-out",
                    on ? "scale-y-100" : "scale-y-0",
                  )}
                />

                <div className="min-w-0">
                  <span
                    aria-hidden
                    className={cn(
                      "font-display mb-3 block text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                      on ? "text-brand" : "text-brand/35",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={cn(
                      "font-display text-[clamp(1.02rem,1.8vw,1.28rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                      on ? "text-brand" : "text-snow",
                    )}
                  >
                    {item.stance}
                  </p>
                  {item.detail && (
                    <p className="mt-3 max-w-[58ch] leading-relaxed text-fog">{item.detail}</p>
                  )}
                </div>

                {/* What this position covers, measured against the widest list
                    in the section. */}
                <div aria-hidden className="flex gap-1.5 lg:pt-1">
                  {Array.from({ length: SLOTS }, (_, k) => {
                    const filled = k < item.covers;
                    return (
                      <motion.span
                        key={k}
                        initial={reduced ? false : { scaleY: 0.25, opacity: 0 }}
                        animate={play ? { scaleY: 1, opacity: 1 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.06 + (filled ? 0.15 + k * 0.055 : 0.15),
                          ease: EASE,
                        }}
                        className={cn(
                          "block h-9 flex-1 origin-bottom rounded-[3px] transition-colors duration-500",
                          filled
                            ? on
                              ? "bg-brand"
                              : "bg-brand/55"
                            : "bg-line/60",
                        )}
                      />
                    );
                  })}
                </div>
              </motion.li>
            );
          })}
        </ol>

        <Rise delay={0.12}>
          <p className="font-display statement mt-12 max-w-5xl font-extrabold uppercase leading-[1.12] text-snow">
            <Marked text={tail} mark={tailMark} />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

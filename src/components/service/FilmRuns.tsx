"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Ten industries, drawn as how much film each of them actually needs.
 *
 *  WHAT THE CONTENT ALREADY CONTAINS, AND WHAT EVERY EARLIER VERSION WASTED.
 *  Each industry arrives with the films it means -- corporate communications is
 *  "company profiles, leadership messages and internal updates"; client proof is
 *  "testimonials and case studies". Those lists are not the same length, and the
 *  difference is the most useful thing in the section: some sectors have a
 *  standing programme of work and some have two films and a reason. Set as a
 *  grey clause after a label, or as chips on a frame, that difference is
 *  invisible. Set as runs against one shared axis, it is the first thing you
 *  see.
 *
 *  EXTENT IS A THING YOU CAN SEE, which is the method the rest of this site
 *  uses wherever the copy will support it. Every row starts at the same origin
 *  and stops at its own last film, so a two-film sector visibly stops while a
 *  four-film sector carries on.
 *
 *  WHAT THE RUNS DO NOT CLAIM. There is no time on the axis, no budget, no
 *  volume and no ranking. A slot is one film named in that sector's own
 *  sentence -- nothing more. The order is the document's, not a sort by length,
 *  because sorting would imply the list was ranked and it is not.
 *
 *  BELOW THE LARGE BREAKPOINT the runs become a plain wrapped set per sector,
 *  because ten four-node tracks with labels under them are unreadable on a
 *  phone. Every film is in the markup either way.
 *
 *  MOTION. The run draws out from the origin as the row arrives, and each node
 *  lands as the run reaches it. Transform only; every row rests complete. */

export type Sector = { label: string; parts: string[] };

export function FilmRuns({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: Sector[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<number | null>(null);

  /** The longest list in the section: every run is measured against it. */
  const slots = Math.max(...items.map((s) => s.parts.length));

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

        <ol ref={ref} className="border-t border-line">
          {items.map((s, i) => {
            const on = hot === i;
            // The run has to stop ON the last node, not past it. Nodes sit at
            // the left edge of their column and are 14px wide, so the last one's
            // centre is (n-1)/slots of the way across plus half a node. The
            // first cut used n/slots, which ended a quarter of a column beyond
            // the node it was supposed to terminate at.
            const reach = (s.parts.length - 1) / slots;
            return (
              <motion.li
                key={s.label}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(i)}
                onBlur={() => setHot(null)}
                tabIndex={0}
                className={cn(
                  "relative grid cursor-default gap-x-10 gap-y-5 border-b border-line py-7 pl-7 outline-none transition-colors duration-500",
                  "lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:items-center",
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

                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden
                    className={cn(
                      "font-display text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
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
                    {s.label}
                  </p>
                </div>

                {/* The run. One shared origin, one shared span, and it stops
                    where this sector's own list stops. */}
                <div className="relative hidden lg:block">
                  <span aria-hidden className="absolute left-0 right-0 top-[7px] h-px bg-line" />
                  <motion.span
                    aria-hidden
                    initial={reduced ? false : { scaleX: 0 }}
                    animate={play ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: EASE }}
                    className={cn(
                      "absolute left-0 top-[7px] h-px origin-left transition-colors duration-500",
                      on ? "bg-brand" : "bg-brand/50",
                    )}
                    style={{ width: `calc(${reach * 100}% + 7px)` }}
                  />

                  <ol
                    className="relative grid"
                    style={{ gridTemplateColumns: `repeat(${slots}, minmax(0, 1fr))` }}
                  >
                    {Array.from({ length: slots }, (_, k) => {
                      const part = s.parts[k];
                      return (
                        <li key={k} className="pr-4">
                          <motion.span
                            aria-hidden
                            initial={reduced ? false : { scale: 0 }}
                            animate={play ? { scale: 1 } : {}}
                            transition={{
                              duration: 0.35,
                              delay: 0.2 + i * 0.05 + k * 0.09,
                              ease: EASE,
                            }}
                            className={cn(
                              "block h-3.5 w-3.5 rounded-full border-2 transition-colors duration-500",
                              part
                                ? on
                                  ? "border-brand bg-brand"
                                  : "border-brand bg-ink-3"
                                : "border-line bg-transparent",
                            )}
                          />
                          {part && (
                            <span
                              className={cn(
                                "mt-3 block text-[0.8125rem] leading-snug transition-colors duration-500",
                                on ? "text-snow" : "text-fog",
                              )}
                            >
                              {part}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>

                {/* One column wide, the run is unreadable, so the films are a
                    plain set. Nothing is withheld. */}
                <ul className="flex flex-wrap gap-2 lg:hidden">
                  {s.parts.map((part) => (
                    <li
                      key={part}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-[0.8125rem] leading-none transition-colors duration-500",
                        on
                          ? "border-brand/45 bg-[color-mix(in_srgb,var(--color-brand)_9%,transparent)] text-snow"
                          : "border-line text-fog",
                      )}
                    >
                      {part}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

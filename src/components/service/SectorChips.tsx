"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Nine industries, each named with the pages that actually carry its search.
 *
 *  WHAT WAS BEING THROWN AWAY. Every one of the nine already carries the
 *  specifics: ecommerce is "product pages, category pages, filters and product
 *  schema"; healthcare is "treatment pages, clinic searches and service
 *  information". Run as one grey clause after a label, that detail reads as
 *  filler. Split at the document's own commas it becomes a set of the things
 *  the work is done on, which is the most concrete material in the section.
 *
 *  SO EACH ROW IS A NAME AND ITS SURFACES. The industry is set at heading
 *  weight and its surfaces are chips beside it, and pointing at a row lights
 *  them, because they belong to that industry and not to the list.
 *
 *  THE LOCAL CASE GETS ITS OWN GROUND. The document closes this section with
 *  three consecutive paragraphs about local search, which is a different claim
 *  from the nine above it: not "these industries benefit" but "here is when
 *  proximity decides it". They sit on their own plate, numbered, rather than
 *  trailing off the bottom of the list.
 *
 *  MOTION. Framer on in-view, transform only, staggered down the run. */

export type Sector = { label: string; parts: string[] };

export function SectorChips({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  notes,
  tail,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: Sector[];
  notes?: string[];
  /** A closing statement, for sections whose source gives one instead of the
   *  run of notes. */
  tail?: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
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

        <ol ref={ref} className="border-t border-line">
          {items.map((s, i) => {
            const on = hot === i;
            return (
              <motion.li
                key={s.label}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(i)}
                onBlur={() => setHot(null)}
                tabIndex={0}
                className="relative grid cursor-default gap-x-10 gap-y-4 border-b border-line py-6 outline-none lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:items-center"
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-y-0 left-0 right-0 origin-left bg-brand/[0.05] transition-transform duration-500 ease-out",
                    on ? "scale-x-100" : "scale-x-0",
                  )}
                />
                <div className="relative flex items-baseline gap-4">
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
                      "font-display text-[clamp(1rem,1.7vw,1.22rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                      on ? "text-brand" : "text-snow",
                    )}
                  >
                    {s.label}
                  </p>
                </div>
                <ul className="relative flex flex-wrap gap-2">
                  {s.parts.map((part) => (
                    <li
                      key={part}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-[0.8125rem] leading-none transition-colors duration-500",
                        on
                          ? "border-brand/45 bg-[color-mix(in_srgb,var(--color-brand)_9%,transparent)] text-snow"
                          : "border-line bg-[color-mix(in_srgb,var(--color-brand)_2%,transparent)] text-fog",
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

        {/* The closing note, where the source gives one. */}
        {notes && notes.length > 0 && (
        <div className="mt-12 rounded-[1.25rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-9">
          <div className="grid gap-x-10 gap-y-8 lg:grid-cols-3">
            {notes.map((note, i) => (
              <Rise key={note} delay={0.06 * i}>
                <div className="border-t-2 border-brand/40 pt-5">
                  <span
                    aria-hidden
                    className="font-display mb-3 block text-[0.6875rem] font-bold tabular-nums text-brand"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed text-fog">{note}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
        )}

        {/* Or a single closing statement, where that is what it gives instead. */}
        {tail && (
          <Rise delay={0.12}>
            <p className="mt-12 max-w-4xl border-t border-line pt-8 leading-relaxed text-fog sm:text-lg">
              {tail}
            </p>
          </Rise>
        )}
      </Container>
    </section>
  );
}

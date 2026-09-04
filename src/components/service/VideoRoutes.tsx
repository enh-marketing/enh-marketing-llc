"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Where each video goes, and the limit on what can be read back.
 *
 *  THE LEAD IS A MAP AND IT HAD BEEN SET AS A PARAGRAPH. It pairs four kinds of
 *  video with four different destinations -- a highlights film sits on the
 *  website, full sessions are shared with people who could not attend, speaker
 *  clips support LinkedIn, vertical edits go across social -- and the pairing is
 *  the information. Run together as prose the reader has to hold four
 *  what-goes-where relationships in their head at once; set as routes they are
 *  read at a glance.
 *
 *  THE VERBS ARE KEPT, AND THEY ARE NOT INTERCHANGEABLE. A film sits somewhere,
 *  sessions are shared with somebody, clips support something. Normalising
 *  those to one connector would flatten a distinction the document was careful
 *  about, so each route carries its own and the row reads back as the original
 *  sentence.
 *
 *  ONE EVENT, ONE ORIGIN. Every route leaves the same rail, because the section
 *  is about a single day's footage reaching several places. That is also all
 *  the drawing asserts: no route is weighted, ranked or counted, and none is
 *  claimed to perform better than another.
 *
 *  AND IT ENDS ON ITS OWN LIMIT. What can be measured "will depend on where the
 *  video is published and whether campaign tracking is included" -- a refusal,
 *  and it is marked rather than dropped into a footnote.
 *
 *  MOTION. Routes arrive in order and their node lights when pointed at.
 *  Transform and colour only; every route rests complete. */

export type Route = { what: string; verb: string; where: string[] };

export function VideoRoutes({
  id,
  label,
  index,
  title,
  strokeTitle,
  routes,
  supportLead,
  supportUses,
  supportTail,
  measure,
  measureMark,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  routes: Route[];
  supportLead: string;
  supportUses: string[];
  supportTail: string;
  measure: string;
  measureMark: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
          mark={{ variant: "network", label: "One day's footage, four routes" }}
          className="mb-12"
        />

        <div ref={ref}>
          <ol className="relative border-t border-line">
            {/* The day everything leaves from. */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-8 left-0 top-8 hidden w-px bg-line lg:block"
            />

            {routes.map((r, i) => {
              const on = hot === i;
              return (
                <motion.li
                  key={r.what}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  tabIndex={0}
                  className={cn(
                    "relative grid cursor-default gap-x-8 gap-y-4 border-b border-line py-6 outline-none transition-colors duration-500",
                    "lg:grid-cols-[minmax(0,15rem)_auto_minmax(0,1fr)] lg:items-center lg:pl-10",
                    on && "bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-0 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand transition-[background-color,transform] duration-500 lg:block",
                      on ? "scale-150 bg-brand" : "bg-ink-3",
                    )}
                  />

                  <p
                    className={cn(
                      "font-display text-[clamp(1rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                      on ? "text-brand" : "text-snow",
                    )}
                  >
                    {r.what}
                  </p>

                  {/* Its own verb, kept. */}
                  <span
                    className={cn(
                      "text-[0.8125rem] leading-none transition-colors duration-300",
                      on ? "text-brand" : "text-ash",
                    )}
                  >
                    {r.verb}
                  </span>

                  <ul className="flex flex-wrap gap-2">
                    {r.where.map((w) => (
                      <li
                        key={w}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-[0.8125rem] leading-none transition-colors duration-500",
                          on
                            ? "border-brand/50 bg-[color-mix(in_srgb,var(--color-brand)_9%,transparent)] text-snow"
                            : "border-line text-fog",
                        )}
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              );
            })}
          </ol>

          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
                {supportLead}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {supportUses.map((u, i) => (
                  <motion.li
                    key={u}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={play ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: EASE }}
                    className="rounded-full border border-line bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)] px-4 py-2 text-[0.875rem] leading-none text-snow"
                  >
                    {u}
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 leading-relaxed text-fog">{supportTail}</p>
            </div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg"
            >
              <Marked text={measure} mark={measureMark} />
            </motion.p>
          </div>
        </div>
      </Container>
    </section>
  );
}

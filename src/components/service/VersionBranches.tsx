"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** One session, and the four things taken out of it, drawn as reach.
 *
 *  WHY THIS SHAPE. The section had a header, one line at display size and then
 *  three columns of body copy, which is the layout you reach for when you have
 *  not asked what the content is. It is not three columns of prose. It is a
 *  division: one recorded conversation, four videos of visibly different
 *  extent, and a set of places they end up.
 *
 *  Extent is the thing you can see, so extent is what is drawn. Every branch
 *  leaves the same stem and stops at a different point, and the reader has the
 *  argument before reading a word: the full interview runs the width of the
 *  section, the social clip barely starts. That is the document's own sentence
 *  -- "a short social video needs a more direct answer than a detailed
 *  long-form interview" -- made visible.
 *
 *  WHAT THE LENGTHS DO AND DO NOT CLAIM. The document ranks exactly two of the
 *  four against each other, the long-form interview and the short social clip,
 *  so those two take the extremes. The middle two are drawn close together
 *  because the document does not order them, and nothing here should invent a
 *  ranking it never gave. No branch carries a duration, and there is no scale
 *  along the bottom: these are proportions of a drawing.
 *
 *  ONE BRANCH IS VERTICAL, because one of the four is described that way. It
 *  is the only aspect claim on the page and it is the document's.
 *
 *  DELIBERATELY NOT THE TWO SECTIONS ABOVE IT. The edit timeline is a line with
 *  material cut out of it and the programme monitor is many sources converging
 *  on one frame. This is the opposite of both: one origin opening outwards. If
 *  all three were rows of blocks the page would be one section repeated.
 *
 *  Motion is the house pattern from ContentLifespan: Framer, gated on in-view,
 *  and every initial state skipped entirely for a reader on reduced motion, so
 *  they get the finished diagram with nothing to wait for. */
export function VersionBranches({
  id,
  label,
  index,
  title,
  strokeTitle,
  claim,
  consequence,
  outputsLead,
  outputs,
  placesLead,
  places,
  support,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  claim: string;
  consequence: string;
  outputsLead: string;
  outputs: string[];
  placesLead: string;
  places: string[];
  support: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const play = reduced || inView;

  /** How far each branch reaches. Only the first and last are the document's;
   *  the middle two sit together because it does not rank them. */
  const reach = [100, 62, 55, 24];
  const vertical = outputs.length - 1;

  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip py-14 sm:py-16"
    >
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="thesis">
              <p className="font-display text-[clamp(1.15rem,2.1vw,1.65rem)] font-extrabold uppercase leading-[1.18] text-snow">
                {claim}
              </p>
              <p className="mt-5 leading-relaxed text-fog">{consequence}</p>
            </Rise>
          }
        />

        <div ref={ref}>
          <p className="font-display text-[0.6875rem] font-bold uppercase tracking-wide text-ash">
            {outputsLead}
          </p>

          {/* ---- the branches ---- */}
          <div className="relative mt-8">
            <ol>
              {outputs.map((name, i) => (
                <li
                  key={name}
                  className="grid items-center gap-x-8 gap-y-3 border-b border-line py-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]"
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      className="font-display shrink-0 text-[0.6875rem] font-bold tabular-nums text-brand/60"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      initial={reduced ? false : { opacity: 0, y: 10 }}
                      animate={play ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease: EASE }}
                      className="font-display text-[clamp(1rem,1.9vw,1.3rem)] font-extrabold uppercase leading-[1.16] text-snow"
                    >
                      {name}
                    </motion.span>
                  </span>

                  {/* How far it reaches. The stem is drawn per row at the
                      branches' own starting edge, so the four segments stack
                      into one continuous line that the branches visibly leave.
                      A single stem further left sat on the far side of the
                      label column and connected to nothing. */}
                  <span aria-hidden className="relative flex items-center">
                    <motion.span
                      initial={reduced ? false : { scaleY: 0 }}
                      animate={play ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.1, ease: EASE }}
                      className="absolute left-0 w-px origin-top bg-brand/45"
                      style={{
                        top: i === 0 ? "50%" : "-1.5rem",
                        bottom: i === outputs.length - 1 ? "50%" : "-1.5rem",
                      }}
                    />
                    <motion.span
                      initial={reduced ? false : { scale: 0 }}
                      animate={play ? { scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.1, ease: EASE }}
                      className="absolute left-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand"
                    />
                    <span className="relative flex h-3 items-center" style={{ width: `${reach[i]}%` }}>
                      <motion.span
                        initial={reduced ? false : { scaleX: 0 }}
                        animate={play ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
                        className="h-px w-full origin-left bg-brand/70"
                      />
                      {/* Where it stops, drawn as the shape it is cut to. */}
                      <motion.span
                        initial={reduced ? false : { scale: 0 }}
                        animate={play ? { scale: 1 } : {}}
                        transition={{ duration: 0.35, delay: 0.55 + i * 0.1, ease: EASE }}
                        className={cn(
                          "absolute right-0 shrink-0 rounded-[2px] border border-brand bg-brand/15",
                          i === vertical ? "h-6 w-3.5" : "h-3.5 w-6",
                        )}
                      />
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* ---- where they go ---- */}
          <div className="mt-12 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <div>
              <p className="font-display text-[0.6875rem] font-bold uppercase tracking-wide text-ash">
                {placesLead}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {places.map((place, i) => (
                  <motion.li
                    key={place}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={play ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.06, ease: EASE }}
                    className="rounded-lg border border-brand/40 bg-brand/[0.06] px-3.5 py-1.5 text-sm text-snow"
                  >
                    {place}
                  </motion.li>
                ))}
              </ul>
            </div>
            <Rise delay={0.1}>
              <p className="text-sm leading-relaxed text-ash">{support}</p>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
}

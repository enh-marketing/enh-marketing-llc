"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** "Why Hospitality Marketing Need Its Own Strategy" — as information, not as
 *  a picture of a decision.
 *
 *  TWO EARLIER VERSIONS OF THIS SECTION FAILED IN OPPOSITE DIRECTIONS. The
 *  first drew the two journeys as two rules with dots on them against an axis:
 *  a chart primitive, and a reader had to be told what they were looking at.
 *  The second drew a phone and a laptop with grey bars in them and a
 *  scroll-driven clock: a lot of picture, and nothing in it that the sentence
 *  above it had not already said. Illustrating the subject is not the same as
 *  structuring the information.
 *
 *  WHAT WAS ACTUALLY WRONG BOTH TIMES: THE SUBSTANCE WAS IN A GREY PARAGRAPH AT
 *  THE FOOT OF THE SECTION. "The marketing strategy must account for location,
 *  availability, reviews, pricing, menus, experiences and seasonal demand. It
 *  also needs to consider where the final action takes place, whether that is a
 *  website, booking engine, reservation platform, phone call or WhatsApp
 *  conversation." That is TWELVE concrete things — seven the plan has to hold
 *  and five places the outcome can land — and they were set as prose nobody
 *  reaches, while two drawn devices took the whole width of the screen.
 *
 *  So the section is now four blocks in descending order of what a reader needs:
 *
 *    · the two decision profiles, side by side, with the only quantity the
 *      document states — one is quick, one takes days — carried by the measure
 *      under each and nothing else
 *    · the seven the strategy must account for, as the register they are
 *    · the five places the final action lands, weighted differently because
 *      they are places rather than considerations
 *    · the verdict, at the size of a conclusion
 *
 *  NO ILLUSTRATION. Every mark on the screen is either a word from the document
 *  or the one measure the document's own "quickly" and "for days" support. The
 *  long measure runs past the edge of its panel because the source gives no
 *  number to end it at.
 *
 *  The two profiles are typeset out of one compound sentence; the two registers
 *  are typeset out of one sentence's own lists. Nothing is reworded. */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Column span out of twelve, per factor, in order: three across then four, so
 *  the seven never sit on a grid that wants an eighth. */
const FACTOR_SPANS = [
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
];

export function DecisionSpread({
  id,
  label,
  index,
  title,
  strokeTitle,
  quick,
  journeys,
  factorsStem,
  factorsItems,
  venuesStem,
  venuesItems,
  verdict,
  verdictMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  quick: string;
  journeys: { who: string; rest: string; extent: "short" | "long" }[];
  factorsStem: string;
  factorsItems: string[];
  venuesStem: string;
  venuesItems: string[];
  verdict: string;
  verdictMark: string;
}) {
  const reduced = usePrefersReducedMotion();
  const measures = useRef<HTMLDivElement>(null);
  const shown = useInView(measures, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{quick}</p>}
          className="mb-14"
        />

        {/* ---- The two decisions ---- */}
        <div ref={measures} className="grid gap-px border-t border-line bg-line md:grid-cols-2">
          {journeys.map((j, i) => {
            const long = j.extent === "long";
            return (
              <Rise
                key={j.who}
                delay={i * 0.08}
                className="relative overflow-hidden bg-void px-6 py-9 sm:px-8 sm:py-11"
              >
                <p className="font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-extrabold uppercase leading-[1.02] text-brand">
                  {j.who}
                </p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-snow sm:text-lg">
                  {j.rest}
                </p>

                {/* THE ONE QUANTITY THE DOCUMENT STATES. One decision is
                    "quick", the other takes "days", so one measure is short and
                    the other leaves the panel. No ticks, no unit and no
                    number, because the source gives none. */}
                <div className="mt-10 h-[3px] w-full bg-line/70">
                  <motion.div
                    aria-hidden
                    className="h-[3px] origin-left bg-brand"
                    initial={reduced ? false : { scaleX: 0 }}
                    animate={shown || reduced ? { scaleX: long ? 1 : 0.14 } : {}}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: EASE }}
                  />
                </div>
                {long && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-[2.35rem] right-0 h-[3px] w-16 bg-gradient-to-r from-brand to-transparent sm:bottom-[2.85rem]"
                  />
                )}
              </Rise>
            );
          })}
        </div>

        {/* ---- The seven the plan has to hold ---- */}
        <Rise delay={0.08} className="mt-16">
          <p className="max-w-2xl text-base leading-relaxed text-fog sm:text-lg">
            {factorsStem}
          </p>

          {/* ONE SLAB, SUBDIVIDED — not seven cards and not a hairline list.
              These are the variables of an offer, so they read as a spec panel:
              a single recessed enclosure whose cells are separated by the
              container showing through a one-pixel gap, no radius and no lift
              on the cells themselves. Three across then four keeps the seven
              off a grid that would need an eighth.
              
              The enclosure is `bg-void`, the page's own ground, which is the
              one surface the section banding never assigns — so this panel
              reads recessed whether the section lands on ink-2 or ink-3. */}
          {/* Two up on a phone rather than one: seven full-width cells is
              nine hundred pixels of scroll for seven short words, and the panel
              stops reading as one object once it is that tall. */}
          <ol className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[1.25rem] bg-line lg:grid-cols-12">
            {factorsItems.map((item, i) => (
              <li
                key={item}
                className={cn(
                  "group relative isolate flex min-h-[7rem] flex-col justify-between overflow-hidden bg-void p-5 sm:min-h-[8rem] sm:p-7",
                  FACTOR_SPANS[i] ?? "lg:col-span-3",
                )}
              >
                {/* The house card's devices, on a cell rather than a card. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                  style={{
                    background:
                      "radial-gradient(240px circle at 50% 0%, rgba(232,0,13,0.16), transparent 70%)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:transition-none"
                />

                <span
                  aria-hidden
                  className="font-display text-[2.6rem] font-extrabold leading-none text-stroke opacity-30 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display mt-6 text-[clamp(1.05rem,1.8vw,1.35rem)] font-extrabold uppercase leading-[1.14] text-snow transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </Rise>

        {/* ---- And the five places it can land ---- */}
        <Rise delay={0.12} className="mt-14">
          <p className="max-w-2xl text-base leading-relaxed text-fog sm:text-lg">{venuesStem}</p>
          {/* Deliberately a different object from the seven above: these are
              places an outcome lands, not variables to weigh, so they are
              tiles with a marker rather than cells in a panel. */}
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {venuesItems.map((item) => (
              <li
                key={item}
                className="group flex items-center gap-3 rounded-xl border border-line bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] px-5 py-3.5 transition-colors duration-300 hover:border-brand/60 motion-reduce:transition-none"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand transition-transform duration-500 group-hover:scale-[2] motion-reduce:transition-none"
                />
                <span className="font-display text-[0.82rem] font-extrabold uppercase leading-none text-snow transition-colors duration-300 group-hover:text-brand motion-reduce:transition-none">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Rise>

        {/* ---- The conclusion, at the size of one ---- */}
        <Rise delay={0.16} className="mt-16 border-t border-line pt-10">
          <p className="font-display max-w-5xl text-[clamp(1.15rem,2.5vw,2rem)] font-extrabold uppercase leading-[1.14] text-snow">
            <Marked text={verdict} mark={verdictMark} className="text-brand" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

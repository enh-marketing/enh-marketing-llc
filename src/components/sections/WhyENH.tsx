"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { whyENH } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { OrbitMark } from "@/components/fx/Adornments";
import { cn } from "@/lib/cn";

/** "Why ENH Is Among the Best Digital Marketing Agencies in Dubai" — a fixed
 *  credential with the case moving past it.
 *
 *  WHY IT IS NOT ANOTHER HORIZONTAL RUN. The AI chapter two sections below is
 *  one, and two pinned runs on one page is a single idea used twice: the
 *  sections stopped being distinguishable. This one had to earn a different
 *  concept, and the document handed one over.
 *
 *  READ THE SEVEN SENTENCES TOGETHER AND EVERY ONE OF THEM IS GOOGLE. A
 *  certified partner of Google Business. Special recognition from Google.
 *  Pay-per-click campaigns. Google's search, shopping, display and YouTube
 *  networks. The steady growth of Google Ads accounts. The Google Partner
 *  network. This is not a general "why us" list where seven peers sit in a row
 *  and one of them happens to mention Google -- it is ONE credential with
 *  facets hanging off it. A run of equal panels says the opposite of that.
 *
 *  SO THE COMPOSITION IS ASYMMETRIC AND THE CREDENTIAL DOES NOT MOVE. Under a
 *  full-width heading, the left column holds the partner statement and sticks;
 *  the right column is the case, and it accumulates past it. By the time you
 *  reach the
 *  last claim the credential is still on screen, which is the argument the
 *  section is making. The partner copy is part of that column rather than a
 *  band bolted under the section, which is where it used to live.
 *
 *  AND THE BURIED CLAUSE IS PROMOTED TYPOGRAPHICALLY, NOT SPATIALLY. Claim 04
 *  is the coverage sentence with its four network names set at display scale
 *  and its two clauses left as prose above and below them, so the sentence
 *  still reads as a sentence while the four names stop being invisible. Same
 *  problem the horizontal run solved by giving each name a stage; solved here
 *  by scale instead, because this section is vertical.
 *
 *  MOTION IS THE PAGE'S OWN AND THERE IS NO PIN. `Rise` per claim, the
 *  rotating OrbitMark that never stops, and a motion/react parallax on the mark
 *  as the section passes -- the same `useScroll`/`useTransform` idiom the hero
 *  uses on Saturn. Deliberately calmer than its neighbours: the page already
 *  holds the reader still for the Story and again for the AI chapter, and a
 *  third takeover would be the page fighting itself. Sticky is CSS here, so
 *  there is nothing to tear down and nothing to gate on a media query -- below
 *  `lg` the two columns simply stack. */
export function WhyENH() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], [44, -44]);

  return (
    <section id="why" ref={ref} className="relative overflow-x-clip py-16 sm:py-20">
      {/* The atmosphere the rest of this page uses in place of a picture, held
          on the credential's side of the split. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 lg:block"
        style={{
          background: "radial-gradient(50% 44% at 22% 46%, rgba(232,0,13,0.15), transparent 70%)",
        }}
      />

      <Container className="relative">
        {/* The heading spans the section, as it does in every other section on
            this page, and ONLY the credential sticks.
            
            It was inside the sticky column. At a 0.82fr column that is 475px
            wide a 61-character display-xl heading wraps to five lines, which
            took the sticky block to 821px -- and with the 96px offset that
            needs 917px of viewport, so on a 900px screen the end of the
            partner paragraph could never be reached while the column was
            stuck, and on anything shorter a good deal more of it was out of
            reach. Lifting the heading out drops the sticky block to around
            380px, which fits any viewport this site supports and leaves the
            credential real travel. */}
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
          <span className="text-brand">(04)</span> {whyENH.heading}
        </p>

        <h2 className="font-display display-xl max-w-[24ch] font-extrabold uppercase text-snow">
          <span className="block">
            <Chars text={whyENH.title[0]} />
          </span>{" "}
          <span className="block text-stroke">
            <Chars text={whyENH.title[1]} delay={0.15} />
          </span>
        </h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          {/* ------------------------------------------- the credential, fixed */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Rise delay={0.25}>
              <motion.div style={{ y: markY }} className="flex items-center gap-5">
                <span className="relative flex h-20 w-20 shrink-0 items-center justify-center">
                  <OrbitMark size={104} className="absolute -inset-3" />
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand">
                    <span className="font-display text-4xl font-extrabold text-white">G</span>
                  </span>
                </span>
                <p className="font-display display-lg max-w-[14ch] font-extrabold uppercase leading-[1.06] text-snow">
                  {whyENH.credential.title}
                </p>
              </motion.div>
            </Rise>

            <Rise delay={0.32}>
              <p className="mt-8 max-w-[46ch] text-sm leading-relaxed text-fog">
                {whyENH.credential.body}
              </p>
            </Rise>
          </div>

          {/* ------------------------------------------- the case, accumulating */}
          <ol>
            {whyENH.case.map((item, i) => (
              <li
                key={i}
                className="group border-t border-line py-9 first:border-t-0 first:pt-0 sm:py-10 lg:py-11"
              >
                <Rise delay={0.05}>
                  <div className="flex items-start gap-6 sm:gap-9">
                    <span
                      aria-hidden
                      className="font-display shrink-0 pt-1 text-xs font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      {item.networks ? (
                        <>
                          <p className="max-w-[52ch] text-sm leading-relaxed text-fog">
                            {item.networks.lead}
                          </p>
                          {/* The four names at display scale, still flowing as
                              the sentence they came from. Nothing is reworded
                              and nothing is repeated -- only the size changes. */}
                          <p className="mt-4 font-display display-lg font-extrabold uppercase leading-[1.06] text-snow">
                            {item.networks.beats.map((beat, b) => (
                              <span key={beat} className={cn("mr-[0.3em] inline-block", b === 3 && "text-stroke")}>
                                {beat + " "}
                              </span>
                            ))}
                          </p>
                          <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-fog">
                            {item.networks.tail}
                          </p>
                        </>
                      ) : (
                        item.body?.map((b, j) => (
                          <p
                            key={j}
                            className={cn(
                              "max-w-[56ch] leading-relaxed",
                              j === 0
                                ? "statement text-balance leading-[1.26] text-snow"
                                : "mt-4 text-sm text-fog sm:text-base",
                            )}
                          >
                            {b}
                          </p>
                        ))
                      )}

                      <span
                        aria-hidden
                        className="mt-7 block h-px w-8 bg-line transition-all duration-500 group-hover:w-20 group-hover:bg-brand motion-reduce:transition-none"
                      />
                    </div>
                  </div>
                </Rise>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

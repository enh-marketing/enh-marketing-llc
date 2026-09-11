"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { whyENH } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** The agency's own listing in Google's partner directory, which is what the
 *  badge attests to. */
const PARTNER_PROFILE = "https://www.google.com/partners/agency?id=3286844717";

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
 *  MOTION IS THE PAGE'S OWN AND THERE IS NO PIN. `Rise` per claim, and a
 *  motion/react parallax on the credential as the section passes -- the same
 *  `useScroll`/`useTransform` idiom the hero uses on Saturn. The rotating
 *  OrbitMark that used to ring the credential went with the letter it was
 *  ringing: a spinning orbit around the issued Google Partner badge would be
 *  decoration applied to a mark whose guidelines forbid exactly that.
 *
 *  All of it deliberately calmer than its neighbours: the page already
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
          {whyENH.heading}
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
          {/* ONE PLATE, NOT THREE LOOSE THINGS. The mark, the claim and the
              paragraph were three siblings floating on the section ground: the
              white badge plate sat hard against the container's left edge with
              nothing holding it, and the claim ran beside it at display scale
              inside a 14ch measure, so "WE ARE A CERTIFIED GOOGLE PARTNER"
              broke over four ragged lines against a small square. Two shapes
              of completely different weight, touching, with no frame. Gathered
              into one panel they read as what they are -- a credential, its
              claim and its evidence.

              AND THE BADGE OUTRANKS THE SENTENCE NOW. The mark already prints
              the words "Google Partner" at size; setting the claim next to it
              in display type had the two shouting the same thing at each
              other, which is most of why the block looked wrong rather than
              merely unbalanced. The artwork carries the headline weight and
              the sentence drops to a scale that supports it. Nothing is
              reworded: this is entirely a matter of which element is large. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Rise delay={0.25}>
              <motion.div
                style={{ y: markY }}
                className="relative overflow-hidden rounded-3xl border border-line bg-ink-2 p-6 sm:p-8"
              >
                {/* The section's own wash, brought inside the panel so the
                    solid surface does not simply cover it. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(232,0,13,0.22), transparent 70%)",
                  }}
                />

                {/* THE ISSUED MARK, NOT A LETTER IN A CIRCLE. This was a red
                    disc with a "G" set in the site's display face, which is a
                    drawing of a credential rather than the credential -- and
                    the claim beside it is the one thing on this page a visitor
                    might actually want to check. The real badge is checkable,
                    and it links to the profile it attests to.

                    ON A WHITE PLATE, WHICH IS NOT DECORATION. The wordmark
                    under the G is Google's dark grey, so on this page's
                    near-black ground it would be all but invisible, and the
                    guidelines forbid recolouring it. The plate is the same
                    treatment, radius and clear space `PartnerBadges` gives the
                    four marks in the trust row, and for the same reason. Pure
                    white rather than `snow`, which inverts under html.light
                    and would put the mark on a black tile.

                    NOTHING ANIMATES THE ARTWORK. The parallax and the hover
                    lift move the plate; no scale, filter or opacity ever
                    touches the image. See public/badges/README.md. */}
                <a
                  href={PARTNER_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center rounded-2xl bg-white p-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none sm:p-5"
                >
                  <img
                    src="/badges/google-partner-logo.png"
                    /* The wording printed on the mark, which is also this
                       link's accessible name. */
                    alt="Google Partner"
                    width={450}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="h-20 w-auto object-contain sm:h-24"
                  />
                </a>

                <p className="font-display relative mt-7 text-xl font-extrabold uppercase leading-[1.16] text-snow sm:text-2xl">
                  {whyENH.credential.title}
                </p>

                <p className="relative mt-6 border-t border-line pt-6 text-sm leading-relaxed text-fog">
                  {whyENH.credential.body}
                </p>

                {/* The badge is a link, but an image never looks like one.
                    This says so in words, and gives the panel the same
                    arrow-swap every other outbound link on the site uses. */}
                <a
                  href={PARTNER_PROFILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-safe group relative mt-7 inline-flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-snow transition-colors duration-300 hover:text-brand"
                >
                  View our Google Partners profile
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden text-brand">
                    <ArrowRight className="absolute h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 motion-reduce:transition-none" />
                    <ArrowRight className="absolute h-3 w-3 -translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 motion-reduce:transition-none" />
                  </span>
                </a>
              </motion.div>
            </Rise>
          </div>

          {/* ------------------------------------------- the case, accumulating */}
          {/* THESE WERE PARAGRAPHS SET AT HEADING SCALE. Each claim's first
              sentence carried `.statement` -- 30px at 1440 -- with
              `leading-relaxed` on top of it, which is a 1.63 ratio. That pairing
              is for a pull quote of a dozen words. These sentences run to 170
              characters, so claim one took five lines and 320px of column, the
              five of them came to 1,729px, and the type read as neither a
              heading nor body: a paragraph pretending to be a headline.
              Measured before and after in the same viewport.

              AND THE TWO SENTENCES OF ONE CLAIM WERE 30px AND 14px. Claims
              three and five are a thought split across two sentences, and the
              second dropped to `text-sm` -- a 2.2x step inside a single
              argument, which read as a headline with fine print under it rather
              than as one point made twice. The step is now 20px to 17px: the
              lead still leads, and the follow-on is plainly the same voice.

              THE NUMERAL DOES SOMETHING NOW. It was 12px of grey set 36px from
              the text it labelled, floating with no relationship to any line of
              it. It is the size of a real mark, in the display face, sitting in
              its own gutter on the text's first baseline, and it is what answers
              the pointer -- so the little hover rule that used to trail each
              claim is gone rather than competing with it.

              A CLOSED LIST, NOT FIVE SLABS. A rule above the first and below
              every one, tighter padding, and no `first:pt-0`: the five read as
              one ordered case with a top and a bottom, which is the argument
              this column is making. */}
          <ol className="border-t border-line">
            {whyENH.case.map((item, i) => (
              <li key={i} className="group border-b border-line py-7 sm:py-8">
                <Rise delay={0.05}>
                  <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-7">
                    <span
                      aria-hidden
                      className="font-display text-[1.375rem] font-extrabold leading-[1.15] tabular-nums text-ash transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none sm:text-[1.625rem] sm:leading-[1.18]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0">
                      {item.networks ? (
                        <>
                          <p className="max-w-[52ch] text-[0.9375rem] leading-[1.65] text-fog sm:text-[1.0625rem] sm:leading-[1.6]">
                            {item.networks.lead}
                          </p>
                          {/* The four names still take the emphasis, and are
                              still the sentence they came from -- nothing is
                              reworded and nothing is printed twice. Stepped
                              down from `display-lg`, which was 40px: against a
                              20px lead that was a 2x jump and the four names
                              stopped reading as part of the sentence at all.
                              At 34px they are the loudest thing in the claim
                              and still clearly inside it. */}
                          <p className="mt-4 font-display text-[1.75rem] font-extrabold uppercase leading-[1.1] text-snow sm:text-[2.125rem]">
                            {item.networks.beats.map((beat, b) => (
                              <span
                                key={beat}
                                className={cn("mr-[0.3em] inline-block", b === 3 && "text-stroke")}
                              >
                                {beat + " "}
                              </span>
                            ))}
                          </p>
                          <p className="mt-4 max-w-[54ch] text-[0.9375rem] leading-[1.65] text-fog sm:text-[1.0625rem] sm:leading-[1.6]">
                            {item.networks.tail}
                          </p>
                        </>
                      ) : (
                        item.body?.map((b, j) => (
                          <p
                            key={j}
                            className={cn(
                              j === 0
                                ? "max-w-[46ch] text-balance text-[1.0625rem] leading-[1.6] text-snow sm:text-[1.25rem] sm:leading-[1.5]"
                                : "mt-3 max-w-[54ch] text-[0.9375rem] leading-[1.65] text-fog sm:text-[1.0625rem] sm:leading-[1.6]",
                            )}
                          >
                            {b}
                          </p>
                        ))
                      )}
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

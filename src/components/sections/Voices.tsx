"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { voices } from "@/content/testimonials";
import { pages, routeExists } from "@/lib/sitemap";
import { Button, ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";

/** Giant marquee divider + auto-rotating testimonial spotlight.
 *
 *  IT READS THE REAL ARCHIVE NOW. This section used to show a set of seven in
 *  `src/lib/content.ts` that existed nowhere else on the site -- seven
 *  different people from the twenty on /testimonials, carried since before
 *  that page was migrated. So the homepage and the testimonials page quoted
 *  two disjoint groups of clients, and nothing a visitor read here could be
 *  found again by following the link.
 *
 *  "LATEST" IS LIST ORDER, BECAUSE NO TESTIMONIAL CARRIES A DATE. The twenty
 *  have no timestamps: the first eighteen sit in the order the live
 *  testimonials page lists them, and nineteen and twenty were supplied by the
 *  team afterwards. So the last seven of that list is the best available
 *  reading of "the latest seven" -- and the two genuinely newest are certainly
 *  among them. If the real recency differs, reorder `voices` and this follows
 *  with no change here. */
const SPOTLIGHT = voices.slice(-7);

export function Voices() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [clipped, setClipped] = useState(false);
  /** THE NODE IS STATE, NOT A REF, AND THAT IS THE WHOLE FIX.
   *
   *  The slide lives inside `AnimatePresence mode="wait"`, so when `active`
   *  changes the outgoing figure animates out before the incoming one mounts.
   *  An effect keyed on `active` therefore runs while `ref.current` is still
   *  the node on its way out -- it measured the wrong element, `clipped` stayed
   *  false, and the control never appeared even on the thousand-character
   *  quote that plainly needed it. A callback ref into state re-runs the effect
   *  when the real node attaches. */
  const [quoteEl, setQuoteEl] = useState<HTMLQuoteElement | null>(null);

  /** THE ROTATION STOPS WHILE A QUOTE IS OPEN. Advancing the slide out from
   *  under someone who just asked to read the rest of it is the one thing this
   *  control must not do, and 5.2s is not long enough to read the longest of
   *  the seven. It resumes when they close it. */
  useEffect(() => {
    if (open) return;
    const t = setInterval(() => setActive((a) => (a + 1) % SPOTLIGHT.length), 5200);
    return () => clearInterval(t);
  }, [open]);

  const t = SPOTLIGHT[active];

  /** Whether THIS slide is actually cut, measured rather than guessed from a
   *  character count: the clamp is a line count at a fluid size, so where it
   *  bites depends on the width the column ended up with. Same approach the
   *  testimonials page card uses, and the same payoff -- six of these seven fit
   *  whole and carry no control at all. */
  useEffect(() => {
    if (!quoteEl) return;
    const measure = () => setClipped(quoteEl.scrollHeight > quoteEl.clientHeight + 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(quoteEl);
    return () => ro.disconnect();
  }, [quoteEl, open]);

  /** A new slide always arrives closed.
   *
   *  ADJUSTED DURING RENDER, NOT IN AN EFFECT. `useEffect(() => setOpen(false),
   *  [active])` does the same thing one commit later: React paints the new
   *  slide still carrying the previous slide's open state, then the effect
   *  fires and it collapses. Comparing the rendered slide against the last one
   *  rendered resolves before anything reaches the screen, and it is the
   *  pattern React documents for exactly this -- `react-hooks/
   *  set-state-in-effect` flags the effect form. */
  const [shown, setShown] = useState(active);
  if (shown !== active) {
    setShown(active);
    setOpen(false);
  }

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      {/* Giant marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-10 select-none opacity-[0.07]">
        <div className="animate-marquee flex w-max items-center gap-12">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            Array.from({ length: 3 }).map((_, i) => (
              <span key={`${k}-${i}`} className="font-display whitespace-nowrap text-[8rem] font-extrabold uppercase leading-none text-snow">
                Explore New Heights ✦
              </span>
            )),
          )}
        </div>
      </div>

      <Container className="relative text-center">
        <p className="mb-10 flex items-center justify-center gap-3 text-xs font-semibold uppercase text-fog">
          The voices — don&apos;t take our word
        </p>

        {/* Animated quote emblem */}
        <div className="mb-8 flex justify-center" aria-hidden>
          <div className="relative flex h-20 w-20 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-brand/50"
              animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-brand/30"
              animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
            />
            <motion.svg
              width="44"
              height="36"
              viewBox="0 0 40 32"
              fill="none"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M0 32V18.4C0 8.8 5.2 2 14.4 0l2 4.8c-4.8 1.6-7.6 5.2-8 10h7.2V32H0Zm22.4 0V18.4C22.4 8.8 27.6 2 36.8 0l2 4.8c-4.8 1.6-7.6 5.2-8 10H38V32H22.4Z"
                fill="var(--color-brand)"
              />
            </motion.svg>
          </div>
        </div>

        {/* A FIXED BOX, BECAUSE THESE SEVEN ARE NOT THE SAME LENGTH. The set
            this section used to carry ran 154 to 201 characters, so a minimum
            height was enough and every quote fitted. The real seven run 158 to
            1,000 -- one of them is four paragraphs -- and at this type size
            that is roughly 120px against 770px. Rotating every 5.2s, the
            section would have grown and collapsed by two thirds of its own
            height on a timer while the reader was elsewhere on the page.
            
            So the quote is clamped to six lines and the box is floored at what
            six lines plus the attribution actually measure. Six holds all but
            the longest whole; only the twentieth is cut, and the link
            underneath goes to the page that has it in full.
            
            A MINIMUM RATHER THAN A FIXED HEIGHT, and the numbers are measured
            rather than guessed. A fixed 15rem was 240px against a figure that
            comes to 296px at 1440 once the attribution under the quote is
            counted -- the quote alone is 244px and the caption was forgotten.
            It clipped. A floor cannot clip if a future quote runs longer, and
            it still holds the height steady across the rotation, which is the
            whole point. Measured with the longest of the seven: 296px at 1440,
            210px at 768 and at 390. */}
        <div className="flex min-h-[15rem] items-center lg:min-h-[19rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-3xl"
            >
              {/* A step down from the old clamp(1.2rem, 2.2vw, 1.85rem), and
                  not an arbitrary one: it is the size the testimonials page
                  sets an opened quote at, so the same words are the same size
                  in both places a reader can meet them. It also buys the clamp
                  about a third more words per line. */}
              <blockquote
                ref={setQuoteEl}
                className={cn(
                  "font-display text-[clamp(1.1rem,1.7vw,1.45rem)] font-bold leading-snug text-snow",
                  open ? "whitespace-pre-line" : "line-clamp-6",
                )}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Only where the words are actually cut, which of these seven is
                  one. The control is the testimonials page's, to the letter, so
                  the same affordance looks the same in both places. */}
              {(clipped || open) && (
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  aria-expanded={open}
                  className="tap-safe group/btn mt-6 inline-flex w-fit items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-wide text-snow transition-colors duration-300 hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span
                    aria-hidden
                    className="h-px w-6 bg-brand transition-all duration-500 group-hover/btn:w-10"
                  />
                  {open ? "Close" : "Read in full"}
                  <span className="sr-only">
                    {" "}
                    the testimonial from {t.name}, {t.org}
                  </span>
                </button>
              )}
              <figcaption className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
                <span className="h-px w-10 bg-brand" />
                <span className="font-semibold text-snow">{t.name}</span>
                <span className="text-fog">— {t.org}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-12 flex justify-center gap-3">
          {SPOTLIGHT.map((_, i) => (
            <button
              key={i}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                // The bar stays 6px; py-2.5 lifts the pointer target to 26px
                // tall without changing what is drawn. background-clip keeps the
                // padding transparent so the bar does not visually grow.
                "h-1.5 box-content rounded-full bg-clip-content px-0.5 py-2.5 transition-all duration-400",
                i === active ? "w-10 bg-brand" : "w-5 bg-line hover:bg-fog",
              )}
            />
          ))}
        </div>

        {/* The way to the rest. The shared `Button`, which is what the story
            section's "Know More" is, so the page's two reads-on CTAs are the
            same object rather than two things that resemble each other.
            Guarded like every link here.
            
            The count is deliberately not in the label. "Read all" on its own
            is thin as an accessible name, though, so the word it is missing is
            supplied to assistive tech only -- the same device the "Read in
            full" control above uses, and it keeps the visible label exactly
            two words. */}
        {routeExists(pages.testimonials.href) && (
          <div className="mt-12 flex justify-center">
            <Button href={pages.testimonials.href}>
              Read all
              <span className="sr-only"> testimonials</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { categories } from "@/content/ai-hub";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** AI Hub, section 01 of eight: AI Search Visibility.
 *
 *  WHAT IT IS DRAWN FROM. The category's own document, in its own words:
 *  "This service covers ChatGPT search, Google AI Overviews and AI Mode,
 *  Gemini, Perplexity, Microsoft Copilot and other AI search experiences",
 *  and "We start with an agreed list of questions related to your services,
 *  products and market." One question, asked across five named surfaces. That
 *  sentence is the object.
 *
 *  ONE OBJECT, NOT FIVE CARDS. The first build of this section was five equal
 *  rounded cards in a column, which is a card list however it is dressed, and
 *  card grids are the named failure mode on this site. This is a single answer
 *  surface at scale, and the five platforms are tabs along its top edge: the
 *  same question re-answered as you move across them. Scale contrast comes
 *  from one large thing rather than five small ones.
 *
 *  WHY NOT THE FIND / UNDERSTAND / REFERENCE STATIONS. Those are the same
 *  document's three verbs and the service page's own hero already draws them
 *  as three stations. Repeating it here would make the hub a smaller copy of
 *  the page it links to.
 *
 *  NOTHING IS CLAIMED. No answer text, no brand inside an answer, no position,
 *  no score, no count. The document is explicit: "No guaranteed placements and
 *  no general AI score", and its results section is an instruction to add real
 *  permissioned examples rather than content. So the question and the answer
 *  are unwritten rules, and every reference slot stays an empty outline. The
 *  active surface's slots take a brand edge because that is where the work is
 *  pointed, which is a target and not a result. */

/** Verbatim, from ai-search-visibility.ts `hero.platforms`, in its order. */
const SURFACES = ["ChatGPT search", "Google AI Overviews and AI Mode", "Gemini", "Perplexity", "Microsoft Copilot"];

/** Verbatim, from that file's `services.readingLabel`. */
const ASKED = "an agreed list of questions";
/** The document's own word for what a business gets in an answer. */
const SLOT = "Reference";

/** How each surface answers: how many unwritten lines, how long the last runs,
 *  and how many reference slots it offers. Varied so moving across the tabs
 *  visibly re-answers rather than redrawing the same block five times. */
const ANSWERS = [
  { lines: 5, tail: "58%", slots: 3 },
  { lines: 7, tail: "41%", slots: 4 },
  { lines: 4, tail: "72%", slots: 2 },
  { lines: 6, tail: "36%", slots: 3 },
  { lines: 5, tail: "64%", slots: 2 },
];

const CYCLE_MS = 4200;

export function SearchSurfaces() {
  const c = categories[0];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const show = seen || reduced;

  const [active, setActive] = useState(0);
  /* Once a reader picks a surface, it stops moving under them. */
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (reduced || held || !inView) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SURFACES.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, held, inView]);

  const a = ANSWERS[active];

  return (
    <section
      id="ai-search-visibility"
      data-section={c.label}
      className="relative flex min-h-screen items-center overflow-hidden py-24 sm:py-28"
    >
      <Container className="relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] lg:gap-16">
          {/* ---- what it is ---- */}
          <div className="min-w-0">
            <p className="font-display flex items-center gap-3 text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] text-ash">
              <span className="tabular-nums text-brand-text">{c.no}</span>
              <span aria-hidden className="block h-px w-8 bg-line" />
              AI Hub
            </p>

            <h2 className="font-display mt-5 text-[clamp(2rem,5.2vw,3.75rem)] font-extrabold uppercase leading-[0.96] text-snow">
              AI Search Visibility
              <span className="block text-brand">(AEO &amp; GEO)</span>
            </h2>

            <p className="mt-6 max-w-[52ch] text-[0.9375rem] leading-relaxed text-fog sm:text-base">
              {c.line}
            </p>

            <a
              href={c.href}
              className="group mt-9 inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-brand-text"
            >
              See the service
              <span
                aria-hidden
                className="block h-px w-8 bg-brand transition-all duration-500 group-hover:w-14 motion-reduce:transition-none"
              />
            </a>
          </div>

          {/* ---- one question, five surfaces ---- */}
          <motion.div
            ref={ref}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative min-w-0"
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 sm:rounded-[1.5rem]">
              {/* The five surfaces, as the edge of one object rather than as
                  five objects. Scrolls sideways on a phone instead of wrapping
                  into a block of chips. */}
              <div
                role="tablist"
                aria-label="AI search surfaces"
                className="flex min-w-0 gap-1 overflow-x-auto border-b border-line px-2 py-2 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:px-3 [&::-webkit-scrollbar]:hidden"
              >
                {SURFACES.map((name, i) => (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => {
                      setActive(i);
                      setHeld(true);
                    }}
                    className={cn(
                      "relative shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-left transition-colors duration-400 motion-reduce:transition-none",
                      i === active ? "bg-ink-3" : "hover:bg-ink-3/60",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display block text-[0.6875rem] font-extrabold uppercase tracking-[0.06em] transition-colors duration-400 motion-reduce:transition-none sm:text-[0.75rem]",
                        i === active ? "text-snow" : "text-ash",
                      )}
                    >
                      {name}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1.5 block h-px transition-all duration-500 motion-reduce:transition-none",
                        i === active ? "w-full bg-brand" : "w-0 bg-transparent",
                      )}
                    />
                  </button>
                ))}
              </div>

              {/* The answer being formed. */}
              <div className="relative min-h-[13rem] px-5 py-6 sm:min-h-[15rem] sm:px-8 sm:py-8 lg:min-h-[17rem]">
                {/* One pass across the surface each time it re-answers.
                    Not ci-scan-x: that keyframe runs -30px to 200px, which is
                    user units for a stretched viewBox, so on a panel this wide
                    it would cross a third of it and stop. Percentages cross
                    whatever width the panel actually has. */}
                {!reduced && (
                  <motion.span
                    key={`sweep-${active}`}
                    aria-hidden
                    initial={{ x: "-30%", opacity: 0 }}
                    animate={{ x: "130%", opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-y-0 left-0 block w-1/3 bg-gradient-to-r from-transparent via-brand/[0.08] to-transparent"
                  />
                )}

                <p className="font-display text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] text-ash">
                  {ASKED}
                </p>

                {/* The question, unwritten. It is the reader's own list. */}
                <div aria-hidden className="mt-3 flex items-center gap-2.5">
                  <span className="block h-2 w-2 shrink-0 rounded-full border border-brand" />
                  <span className="block h-1.5 w-[58%] rounded-full bg-ash/45 sm:w-[46%]" />
                </div>

                <span aria-hidden className="mt-6 block h-px w-full bg-line" />

                {/* The answer, unwritten, re-formed per surface. */}
                <div aria-hidden className="mt-6 space-y-3 sm:space-y-3.5">
                  {Array.from({ length: a.lines }, (_, k) => (
                    <motion.span
                      key={`${active}-${k}`}
                      initial={reduced ? false : { opacity: 0, scaleX: 0.965 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: reduced ? 0 : k * 0.055,
                      }}
                      style={{
                        transformOrigin: "left",
                        width: k === a.lines - 1 ? a.tail : "100%",
                      }}
                      className="block h-2 rounded-full bg-line"
                    />
                  ))}
                </div>
              </div>

              {/* Where a business can be referenced. Every slot stays an
                  outline: the document refuses placements and scores, so
                  nothing here is ever filled in. */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line px-5 py-4 sm:px-8 sm:py-5">
                <span className="font-display text-[0.6875rem] font-extrabold uppercase tracking-[0.18em] text-ash">
                  {SLOT}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {Array.from({ length: a.slots }, (_, k) => (
                    <motion.span
                      key={`${active}-slot-${k}`}
                      initial={reduced ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: reduced ? 0 : 0.2 + k * 0.07 }}
                      className="block h-5 w-16 rounded-full border border-dashed border-brand/55 sm:w-20"
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-[0.75rem] leading-relaxed text-ash">and other AI search experiences</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

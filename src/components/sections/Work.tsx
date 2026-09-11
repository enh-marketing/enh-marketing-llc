"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useMotionValue, animate } from "motion/react";
import type { ValueAnimationTransition } from "motion/react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { RouteLine } from "@/components/fx/Adornments";
import { CaseCard } from "@/components/case-studies/CaseCard";
import { ArrowRight } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { routeExists } from "@/lib/sitemap";
import { all } from "@/content/case-studies";

const CARD_GAP = 20;

/** How long a card stands still before the row moves on.
 *
 *  5.2 seconds, which is what the testimonial spotlight on the homepage
 *  already rotates at. Two things auto-advancing on one page at two different
 *  cadences is a page with a stutter in it, and this card carries less to read
 *  than a testimonial does: a figure, its caption and a client name. */
const DWELL = 5200;

/** Drag carousel of all 22 live case studies — 3–4 visible, drag or arrows for the rest. */
/** IT READS FROM THE MIGRATED STUDIES NOW, and that changed three things.
 *
 *  THE PICTURES ARE THE PROJECTS. Every card used to carry an Unsplash
 *  photograph chosen to suggest the client's industry: a stock plate of food
 *  for a caterer, a stock server rack for an IT distributor. That is a stock
 *  photo standing in for a piece of work, on a page selling the work, and the
 *  same rule that keeps a stock photo off an article hero applies here. Each
 *  card now shows the client's own result card, downloaded from the live case
 *  study it belongs to.
 *
 *  THE CAPTIONS ARE VERBATIM. The figures were always the real ones, but their
 *  captions had been condensed by hand ("Social reach growth in 30 days" for
 *  "Exceptional growth in social media reach within 30 days"). The migrated
 *  labels are the client's reporting in its own words, so those are what a
 *  card carries.
 *
 *  EVERY CARD IS A LINK. Twenty-two case studies were being presented on
 *  thirty-six pages with nowhere to go; each one is now the entry to its own
 *  page. `hasStory` gates it, so a study with no page behind it stays an
 *  <article> with no hover state rather than promising one.
 *
 *  THE CARD ITSELF LIVES IN `CaseCard` NOW. It was written out inline here,
 *  and the archive on /case-studies had a second design of its own; team
 *  direction on 2026-09-08 was that there is one case study card and it is
 *  this one, so it moved to a component both pages call. Nothing about how it
 *  looks changed: the markup moved as it stood, and the widths the carousel
 *  needs are still set from here. */
/** Reused on service pages, so the section index and DevTools label are
 *  parameterised. Defaults are the homepage's own values. */
/** `ctaHref` is where the end card points.
 *
 *  It used to be hardcoded to "#contact", which exists only on the homepage
 *  (LetsTalk). This section also renders on all seventeen service pages, so on
 *  every one of them the end card was a dead anchor: the click did nothing.
 *  The service pages carry "#quote" instead, which is the same rule the Navbar
 *  already applies through ctaTarget(). The default keeps the homepage as it
 *  was. Pre-existing, and unrelated to the Astro migration: the Next build
 *  emitted the same dead href. */
export function Work({
  label = "Summits Reached",
  heading = "Summits reached.",
  ctaHref = "#contact",
  lede,
}: {
  /** Accepted and ignored: the red section counter it used to print is gone
   *  sitewide. Every page body still passes one, so the prop stays rather than
   *  forcing a rename across fifty-odd files, and putting the numbering back
   *  stays a one-line change. */
  index?: string;
  label?: string;
  /** The visible heading. A prop rather than a literal because this section
   *  renders on seventeen service pages as well as the homepage, and the
   *  homepage document renames it: the default is what every other page has
   *  always shown, so only the caller that passes this one changes. */
  heading?: string;
  ctaHref?: string;
  /** A sentence from the page's own source document, set above the carousel.
   *  Most pages have none: their source hands this section a bracketed
   *  instruction rather than copy, and nothing is invented to fill the gap.
   *  Where a document does supply one, printing it here is better than
   *  dropping it or floating it between two sections. */
  lede?: string;
} = {}) {
  const studies = all();
  /** THE CARDS ARE LINKS NOW, SO A DRAG MUST NOT COUNT AS A CLICK. Set on
   *  drag start, cleared on the next pointer down, and read by each card's
   *  click handler: without it, letting go of a flung carousel navigates to
   *  whichever study happened to be under the finger. */
  const dragged = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  const maxDrag = () => {
    const vp = viewportRef.current?.clientWidth ?? 0;
    const tw = trackRef.current?.scrollWidth ?? 0;
    return Math.min(0, vp - tw);
  };
  const clamp = (v: number) => Math.max(maxDrag(), Math.min(0, v));

  const cardStep = () => {
    // `.wk-card`, not "article": a card is an <a> wherever its study has a
    // page behind it, and querying the tag silently fell back to 320px.
    const card = trackRef.current?.querySelector(".wk-card");
    return (card?.clientWidth ?? 320) + CARD_GAP;
  };

  useMotionValueEvent(x, "change", (v) => {
    const m = maxDrag();
    setProgress(m === 0 ? 0 : Math.min(1, Math.max(0, v / m)));
  });

  /** Whatever is moving the row right now, so the next thing that wants it
   *  can take it cleanly. An arrow pressed twice, or a drag started during an
   *  advance, would otherwise leave two animations writing the same value. */
  const running = useRef<{ stop: () => void } | null>(null);

  const run = (target: number, transition: ValueAnimationTransition<number>) => {
    running.current?.stop();
    const ctrl = animate(x, target, transition);
    running.current = ctrl;
    const done = () => {
      if (running.current === ctrl) running.current = null;
    };
    ctrl.then(done, done);
  };

  const step = (dir: 1 | -1) => {
    run(clamp(x.get() - dir * cardStep() * 2), { type: "spring", stiffness: 120, damping: 22 });
  };

  /* -------------------------------------------------- and it goes by itself
   *
   *  TEAM DIRECTION: the row advances on its own, "after giving enough time
   *  for user to read the data". So the unit is one card, not a screenful of
   *  them -- every study gets its own turn in front of the reader -- and the
   *  interval is the dwell measured from the END of one move to the start of
   *  the next, rather than between starts, so the glide never eats into the
   *  reading time it is supposed to be protecting.
   *
   *  IT REWINDS RATHER THAN STOPPING. Twenty-three cards at this dwell is
   *  over two minutes, so the end of the track is an edge nobody reaches in
   *  practice -- but a carousel that silently dies there is worse than one
   *  that starts again, and a slower return reads as a rewind rather than as
   *  a glitch.
   *
   *  THREE THINGS STOP IT, and all three are the reader: a pointer anywhere
   *  over the section, focus inside it, and a hand on the row. Out of view it
   *  does not run at all, so a section nobody is looking at is not animating
   *  and not costing anything on the thirty-six other pages this appears on.
   *
   *  AND THERE IS A BUTTON. Motion that starts by itself and runs longer than
   *  five seconds needs a way to stop it that does not depend on having a
   *  pointer -- the same requirement `PinnedExplorer` carries its Pause
   *  control for. */
  const [playing, setPlaying] = useState(true);
  const engaged = useRef(false);
  const inView = useRef(false);
  const held = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
      },
      { threshold: 0.2 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !playing) return;
    let timer = 0;
    const tick = () => {
      timer = window.setTimeout(() => {
        if (inView.current && !engaged.current && !held.current) {
          const next = x.get() - cardStep();
          const home = next <= maxDrag() + 1;
          run(home ? 0 : next, { duration: home ? 1.5 : 0.85, ease: [0.16, 1, 0.3, 1] });
        }
        tick();
      }, DWELL);
    };
    tick();
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, playing]);

  return (
    <section
      id="work"
      ref={sectionRef}
      data-section={label}
      /* The whole section holds the clock off, not just the row: a reader
         with the pointer anywhere in here, or a tab stop on the archive link
         or an arrow, is reading it. */
      onPointerEnter={() => {
        engaged.current = true;
      }}
      onPointerLeave={() => {
        engaged.current = false;
      }}
      onFocusCapture={() => {
        engaged.current = true;
      }}
      onBlurCapture={() => {
        engaged.current = false;
      }}
      className="relative overflow-hidden py-16 sm:py-20"
    >
      <Container className="mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
              The proof — {studies.length} client stories
            </p>
            {/* TEAM DIRECTION, 2026-09-08: h3, not h2, sitewide. The size is
                unchanged -- display-xl still, exactly as before -- because the
                instruction is about the document outline rather than about how
                large the words are. */}
            <h3 className="font-display display-xl font-extrabold uppercase text-snow">
              <Chars text={heading} />
            </h3>
          </div>
          <Rise className="flex items-center gap-4">
            {/* The way out of the carousel. Guarded, because this section
                renders on thirty-six pages and the archive is a route like any
                other: if it is not built, the link is not offered. */}
            {routeExists("/case-studies") && (
              <a
                href="/case-studies"
                className="tap-safe group mr-1 hidden items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-snow transition-colors duration-300 hover:text-brand sm:inline-flex"
              >
                All {studies.length} case studies
                <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden text-brand">
                  <ArrowRight className="absolute h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4" />
                  <ArrowRight className="absolute h-3 w-3 -translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </span>
              </a>
            )}
            <ArrowBtn dir={-1} onClick={() => step(-1)} label="Previous case studies" />
            <ArrowBtn dir={1} onClick={() => step(1)} label="Next case studies" />
            {!reduced && (
              <PlayBtn playing={playing} onClick={() => setPlaying((v) => !v)} />
            )}
          </Rise>
        </div>
        {lede && (
          <Rise delay={0.08}>
            <p className="mt-7 max-w-2xl leading-relaxed text-fog sm:text-lg">{lede}</p>
          </Rise>
        )}
        <RouteLine className="mt-8" />
      </Container>

      <Container>
        <div ref={viewportRef} className="overflow-visible">
          <motion.div
            ref={trackRef}
            drag="x"
            onPointerDown={() => {
              dragged.current = false;
              /* A hand on the row takes it off whatever was moving it. Two
                 writers on one value is a fight the reader always loses. */
              running.current?.stop();
              running.current = null;
              held.current = true;
            }}
            onPointerUp={() => {
              held.current = false;
            }}
            onPointerCancel={() => {
              held.current = false;
            }}
            onDragStart={() => {
              dragged.current = true;
              held.current = true;
            }}
            onDragEnd={() => {
              held.current = false;
            }}
            style={{ x }}
            dragConstraints={viewportRef}
            dragElastic={0.06}
            className="flex w-max cursor-grab items-stretch gap-5 active:cursor-grabbing"
          >
            {studies.map((study) => (
              <CaseCard
                key={study.slug}
                study={study}
                position={study.order + 1}
                slot="compact"
                className="w-[280px] shrink-0 sm:w-[300px]"
                onClick={(e) => {
                  if (dragged.current) e.preventDefault();
                }}
              />
            ))}

            {/* End card */}
            <a
              href={ctaHref}
              className="group flex w-[280px] shrink-0 flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-line p-6 text-center transition-colors duration-500 hover:border-brand sm:w-[300px]"
            >
              <span className="font-display text-2xl font-extrabold uppercase leading-tight text-stroke">
                Your story
                <br />
                next?
              </span>
              <span className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
                Start the climb
              </span>
            </a>
          </motion.div>
        </div>

        {/* Progress rail */}
        <div className="mt-10 flex items-center gap-5">
          <div className="h-px flex-1 bg-line">
            <div
              className="h-px origin-left bg-brand transition-transform duration-200"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          {/* The label has to account for a row that also moves by itself.
              "Drag to explore" as the only instruction on it read as the row
              having a mind of its own. */}
          <span className="text-xs uppercase text-ash">
            {reduced || !playing ? "Drag to explore" : "Moves on its own, or drag"}
          </span>
        </div>
      </Container>
    </section>
  );
}

/** Stop the row advancing. Hover and focus already hold the clock off, but
 *  neither is available to every reader, so the mechanism has to be a
 *  control. Same shape as the arrows beside it, because it belongs to the
 *  same set. */
function PlayBtn({ playing, onClick }: { playing: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!playing}
      aria-label={playing ? "Pause the case study carousel" : "Play the case study carousel"}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-snow transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
        {playing ? (
          <>
            <rect x="2.5" y="1.5" width="3" height="11" rx="1" />
            <rect x="8.5" y="1.5" width="3" height="11" rx="1" />
          </>
        ) : (
          <path d="M3 1.8v10.4a.8.8 0 0 0 1.22.68l8.4-5.2a.8.8 0 0 0 0-1.36l-8.4-5.2A.8.8 0 0 0 3 1.8Z" />
        )}
      </svg>
    </button>
  );
}

function ArrowBtn({
  dir,
  onClick,
  label,
}: {
  dir: 1 | -1;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-snow transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ transform: dir === -1 ? "rotate(180deg)" : undefined }}
      >
        <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

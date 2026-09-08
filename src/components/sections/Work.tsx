"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useMotionValue, animate } from "motion/react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { RouteLine } from "@/components/fx/Adornments";
import { CaseCard } from "@/components/case-studies/CaseCard";
import { ArrowRight } from "@/components/ui/Button";
import { routeExists } from "@/lib/sitemap";
import { all } from "@/content/case-studies";

const CARD_GAP = 20;

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
  index = "03",
  label = "Summits Reached",
  ctaHref = "#contact",
  lede,
}: {
  index?: string;
  label?: string;
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [progress, setProgress] = useState(0);

  const maxDrag = () => {
    const vp = viewportRef.current?.clientWidth ?? 0;
    const tw = trackRef.current?.scrollWidth ?? 0;
    return Math.min(0, vp - tw);
  };

  useMotionValueEvent(x, "change", (v) => {
    const m = maxDrag();
    setProgress(m === 0 ? 0 : Math.min(1, Math.max(0, v / m)));
  });

  const step = (dir: 1 | -1) => {
    // `.wk-card`, not "article": a card is an <a> wherever its study has a
    // page behind it, and querying the tag silently fell back to 320px.
    const card = trackRef.current?.querySelector(".wk-card");
    const w = (card?.clientWidth ?? 320) + CARD_GAP;
    const target = Math.max(maxDrag(), Math.min(0, x.get() - dir * w * 2));
    animate(x, target, { type: "spring", stiffness: 120, damping: 22 });
  };

  return (
    <section id="work" data-section={label} className="relative overflow-hidden py-16 sm:py-20">
      <Container className="mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
              <span className="text-brand">({index})</span> The proof — {studies.length} client stories
            </p>
            {/* TEAM DIRECTION, 2026-09-08: h3, not h2, sitewide. The size is
                unchanged -- display-xl still, exactly as before -- because the
                instruction is about the document outline rather than about how
                large the words are. */}
            <h3 className="font-display display-xl font-extrabold uppercase text-snow">
              <Chars text="Summits reached." />
            </h3>
          </div>
          <Rise className="flex items-center gap-4">
            {/* The way out of the carousel. Guarded, because this section
                renders on thirty-six pages and the archive is a route like any
                other: if it is not built, the link is not offered. */}
            {routeExists("/case-studies") && (
              <a
                href="/case-studies"
                className="group mr-1 hidden items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-snow transition-colors duration-300 hover:text-brand sm:inline-flex"
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
            }}
            onDragStart={() => {
              dragged.current = true;
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
          <span className="text-xs uppercase text-ash">Drag to explore</span>
        </div>
      </Container>
    </section>
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

"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import { archive, categoryCounts, type Category, type Project } from "@/content/portfolio";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/** ONE CARD, THREE ACROSS. The same wall the case study archive is, with the
 *  same entrance wave, the same filter rail and the same layout animation,
 *  because a reader who has seen one of these two pages should recognise the
 *  other immediately.
 *
 *  THE RAIL AND THE FIELD IN THE MASTHEAD ARE ONE CONTROL IN TWO PLACES, which
 *  is why neither owns the state: it lives in the page body. A reader picks a
 *  discipline in the fold, or changes their mind after scrolling past it.
 *
 *  THE COUNTS ON THE CHIPS DO NOT ADD UP TO THE "EVERYTHING" COUNT. Nine of
 *  the thirty-five are filed under two disciplines and are counted in both;
 *  `categoryCounts` says so at the call site and the line under the wall spells
 *  it out whenever a filter is on. Making them add up would mean picking one
 *  discipline per project, which is a claim the source does not make. */
export function PortfolioArchive({
  projects,
  active,
  onSelect,
}: {
  projects: Project[];
  active: Category | null;
  onSelect: (category: Category | null) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const wall = useRef<HTMLDivElement>(null);

  const chips = useMemo(
    () => [
      { label: archive.allLabel, key: null as Category | null, count: projects.length },
      ...categoryCounts(projects).map((c) => ({
        label: c.label,
        key: c.key as Category | null,
        count: c.count,
      })),
    ],
    [projects],
  );

  const shown = useMemo(
    () => (active === null ? projects : projects.filter((p) => p.categories.includes(active))),
    [projects, active],
  );

  const filtering = active !== null;
  const activeLabel = chips.find((chip) => chip.key === active)?.label ?? "";

  /** The entrance wave. ScrollTrigger.batch groups whatever crosses the line in
   *  the same frame, which is what makes a wall arrive in waves instead of each
   *  card fading in on its own clock. It writes to an inner wrapper so the
   *  <li>'s transform stays free for Motion's layout animation: two libraries
   *  writing one transform is the classic way a filterable grid breaks.
   *  Re-installed whenever the visible set changes, because filtering mounts
   *  cards the batch never observed and an unobserved card would sit at opacity
   *  0 for ever. */
  useEffect(() => {
    if (reduced || !wall.current) return;
    const cards = gsap.utils.toArray<HTMLElement>(".pf-reveal", wall.current);
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 34 });
    const batch = ScrollTrigger.batch(cards, {
      start: "top 92%",
      once: true,
      batchMax: 4,
      onEnter: (group) =>
        gsap.to(group, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: { each: 0.08, from: "start" },
          overwrite: true,
        }),
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      batch.forEach((t) => t.kill());
      gsap.set(cards, { clearProps: "opacity,transform" });
    };
  }, [reduced, active]);

  return (
    <section
      id="archive"
      data-section="The Archive"
      className="relative overflow-x-clip py-14 sm:py-16"
    >
      <Container>
        <SectionHeader
          index={archive.index}
          title={archive.title}
          strokeTitle={archive.strokeTitle}
          lede={archive.lede}
          className="mb-12"
        />

        {/* --------------------------------------------------- the rail */}
        <div className="mb-14 border-t border-line pt-8">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-3">
            <p className="mr-2 w-full text-xs font-semibold uppercase tracking-wide text-brand-text sm:w-auto">
              {archive.categoryLabel}
            </p>
            {chips.map((chip) => {
              const on = active === chip.key;
              return (
                <button
                  key={chip.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onSelect(chip.key)}
                  className={cn(
                    "inline-flex items-baseline gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300",
                    on
                      ? "border-brand bg-brand text-white"
                      : "border-line text-fog hover:border-brand/60 hover:text-snow",
                  )}
                >
                  {chip.label}
                  <span
                    className={cn(
                      "text-[0.6875rem] font-extrabold tabular-nums",
                      on ? "text-white/70" : "text-ash",
                    )}
                  >
                    {chip.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --------------------------------------------------- the cards */}
        <div ref={wall}>
          <motion.ul
            layout={!reduced}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((project) => (
                <motion.li
                  key={project.slug}
                  id={`project-${project.slug}`}
                  layout="position"
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: EASE, layout: { duration: 0.5, ease: EASE } }}
                  /* Each card is addressable: /portfolio#project-venesta lands
                     on it, which is how a link into the archive points at one
                     entry without leaving the page. scroll-mt clears the fixed
                     header, since Lenis's programmatic scrollTo does not read
                     the global scroll-padding-top. */
                  className="pf-plate scroll-mt-28"
                >
                  {/* The entrance wave writes to this wrapper, not to the <li>,
                      so the <li>'s transform stays free for Motion's layout
                      animation. */}
                  <div className="pf-reveal h-full">
                    <PortfolioCard
                      project={project}
                      position={project.order + 1}
                      className="h-full"
                    />
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

        {filtering && (
          <p className="mt-14 border-t border-line pt-7 text-sm leading-relaxed text-fog">
            {shown.length === 0 ? (
              <>
                {archive.emptyLabel}{" "}
                <Reset onSelect={onSelect} />.
              </>
            ) : (
              <>
                Showing {shown.length} of {projects.length}, filed under {activeLabel}. A project
                filed under two disciplines appears in both. <Reset onSelect={onSelect} />.
              </>
            )}
          </p>
        )}
      </Container>
    </section>
  );
}

function Reset({ onSelect }: { onSelect: (category: Category | null) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(null)}
      className="font-semibold text-snow underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
    >
      {archive.resetLabel}
    </button>
  );
}

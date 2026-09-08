"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseCard } from "@/components/case-studies/CaseCard";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import { archive, sectors, type Study } from "@/content/case-studies";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/** ONE CARD, THREE ACROSS.
 *
 *  TEAM DIRECTION, 2026-09-08: the archive uses the card the homepage's Work
 *  carousel uses, and only that one. What was here before was a second design:
 *  `CasePlate`, a frameless plate whose width alternated down a twelve-column
 *  mosaic (7/5, then 5/7, then 6/6, so no two consecutive rows shared a shape)
 *  on the reasoning that a grid of identical tiles had been rejected by name.
 *  The direction overrides that reasoning, and it is the better call for a
 *  different reason: a reader comparing twenty-two engagements is comparing
 *  four figures each, and equal cards are what makes them comparable. The
 *  mosaic is in git if the argument reopens.
 *
 *  TEAM DIRECTION, 2026-09-08: no interlude either. A statement about the
 *  whole set used to break the wall after the ninth card ("7 of 22
 *  engagements report a #1 position for a term their buyers actually
 *  search."), with its count computed from the studies so it could not drift.
 *  The wall now runs unbroken. */
export function CaseArchive({
  studies,
  active,
  onSelect,
}: {
  studies: Study[];
  active: string | null;
  onSelect: (sector: string | null) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const wall = useRef<HTMLDivElement>(null);

  const chips = useMemo(
    () => [
      { label: archive.allLabel, key: null as string | null, count: studies.length },
      ...sectors(studies).map((s) => ({ label: s.label, key: s.label, count: s.count })),
    ],
    [studies],
  );

  const shown = useMemo(
    () => (active === null ? studies : studies.filter((s) => s.sector === active)),
    [studies, active],
  );

  const filtering = active !== null;

  /** The entrance wave. ScrollTrigger.batch groups whatever crosses the line
   *  in the same frame, which is what makes a wall arrive in waves instead of
   *  each plate fading in on its own clock. It writes to an inner wrapper so
   *  the <li>'s transform stays free for Motion's layout animation: two
   *  libraries writing one transform is the classic way a filterable grid
   *  breaks. Re-installed whenever the visible set changes, because filtering
   *  mounts plates the batch never observed and an unobserved plate would sit
   *  at opacity 0 for ever. */
  useEffect(() => {
    if (reduced || !wall.current) return;
    const plates = gsap.utils.toArray<HTMLElement>(".cs-reveal", wall.current);
    if (!plates.length) return;

    gsap.set(plates, { opacity: 0, y: 34 });
    const batch = ScrollTrigger.batch(plates, {
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
      gsap.set(plates, { clearProps: "opacity,transform" });
    };
  }, [reduced, active]);

  const grid = (list: Study[]) => (
    <motion.ul
      layout={!reduced}
      transition={{ duration: 0.5, ease: EASE }}
      className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {list.map((study) => (
          <motion.li
            key={study.slug}
            id={`case-${study.slug}`}
            layout="position"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE, layout: { duration: 0.5, ease: EASE } }}
            /* Each card is addressable: /case-studies#case-venesta lands on
               it, which is how a link into the archive points at one entry
               without leaving the page. scroll-mt clears the fixed header,
               since Lenis's programmatic scrollTo does not read the global
               scroll-padding-top. */
            className="cs-plate scroll-mt-28"
          >
            {/* The entrance wave writes to this wrapper, not to the <li>,
                so the <li>'s transform stays free for Motion's layout
                animation. Two libraries writing one transform is the classic
                way a filterable grid breaks. */}
            <div className="cs-reveal h-full">
              <CaseCard study={study} position={study.order + 1} className="h-full" />
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );

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
              {archive.sectorLabel}
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
        <div ref={wall}>{grid(shown)}</div>

        {filtering && (
          <p className="mt-14 border-t border-line pt-7 text-sm leading-relaxed text-fog">
            {shown.length === 0 ? (
              <>
                {archive.emptyLabel}{" "}
                <button
                  type="button"
                  onClick={() => onSelect(null)}
                  className="font-semibold text-snow underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
                >
                  {archive.resetLabel}
                </button>
                .
              </>
            ) : (
              <>
                Showing {shown.length} of {studies.length}, filed under {active}.{" "}
                <button
                  type="button"
                  onClick={() => onSelect(null)}
                  className="font-semibold text-snow underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
                >
                  {archive.resetLabel}
                </button>
                .
              </>
            )}
          </p>
        )}
      </Container>
    </section>
  );
}

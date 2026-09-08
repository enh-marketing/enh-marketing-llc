"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CasePlate } from "@/components/case-studies/CasePlate";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import { archive, interlude, rankingCount, sectors, type Study } from "@/content/case-studies";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/** THE MOSAIC. Twelve columns, two plates a row, and the split between them
 *  changes every row: 7/5, then 5/7, then 6/6, then round again.
 *
 *  WHY A PATTERN AND NOT ONE COLUMN WIDTH. A grid of twenty-two identical
 *  tiles is the thing this client has rejected by name, and the alternative
 *  everyone reaches for — one project per row, picture on one side and copy on
 *  the other — is the other thing they rejected by name. Unequal pairs are
 *  neither: the seam between the two plates moves down the page, so no two
 *  consecutive rows have the same shape, while every plate keeps the same
 *  anatomy so the archive stays a record rather than a scrapbook.
 *
 *  IT IS A RULE, NOT A DECORATION. The width comes from the plate's position
 *  in the visible set, so filtering re-lays the mosaic without leaving a hole
 *  and without any plate needing to know what sector is selected. */
const ROW_PATTERN = [
  ["lg:col-span-7", "lg:col-span-5"],
  ["lg:col-span-5", "lg:col-span-7"],
  ["lg:col-span-6", "lg:col-span-6"],
] as const;

function spanFor(i: number) {
  const row = Math.floor(i / 2);
  return ROW_PATTERN[row % ROW_PATTERN.length][i % 2];
}

/** Where the interlude breaks the archive. After the ninth plate, which is
 *  roughly a laptop screen and a half of scrolling: far enough in that the
 *  reader has settled into the rhythm, early enough that it is a break rather
 *  than a footnote. */
const BREAK_AFTER = 9;

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

  /** The interlude belongs to the whole archive, so it is only set where the
   *  whole archive is on screen. Filtered, the reader is answering a question
   *  and a page-wide aside is in the way of the answer. */
  const filtering = active !== null;
  const split = !filtering && shown.length > BREAK_AFTER + 2;
  const first = split ? shown.slice(0, BREAK_AFTER) : shown;
  const second = split ? shown.slice(BREAK_AFTER) : [];

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

  /** THE PATTERN RESTARTS IN EACH HALF, and it has to.
   *
   *  The two halves are separate lists with the interlude between them, so a
   *  continuous index would hand the first plate of the second half whatever
   *  width its position in the *combined* sequence called for. Nine plates in,
   *  that is a seven-column plate followed by a six: thirteen columns, so the
   *  six wraps and the seven sits alone with five empty columns beside it —
   *  the dead column this client has named. Counting from zero in each half
   *  keeps every row summing to twelve. */
  const grid = (list: Study[]) => (
    <motion.ul
      layout={!reduced}
      transition={{ duration: 0.5, ease: EASE }}
      className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-12 sm:gap-y-20"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {list.map((study, i) => (
          <CasePlate
            key={study.slug}
            study={study}
            position={study.order + 1}
            wide={spanFor(i) === "lg:col-span-7"}
            className={cn("sm:col-span-6", spanFor(i))}
          />
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

        {/* -------------------------------------------------- the plates */}
        <div ref={wall}>
          {grid(first)}

          {split && <Interlude studies={studies} />}

          {split && grid(second)}
        </div>

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

/** THE BREAK. One sentence about the whole archive, set across the full
 *  measure, where the mosaic would otherwise run for eleven rows without
 *  pausing.
 *
 *  ITS NUMBER IS COUNTED, NOT WRITTEN. `rankingCount` counts the studies that
 *  publish a #1 among their four figures, so the sentence cannot drift from
 *  the plates around it: add a study or correct a figure and the number here
 *  corrects itself. It is also countable by hand against the cards, which is
 *  the test this site puts every figure through. */
function Interlude({ studies }: { studies: Study[] }) {
  const count = rankingCount(studies);
  return (
    <div className="my-16 border-y border-line py-14 sm:my-20 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <p className="font-display flex items-baseline gap-4 text-snow">
          <span className="text-[clamp(3.4rem,9vw,6rem)] font-extrabold leading-none tabular-nums text-brand">
            {count}
          </span>
          <span className="text-[0.6875rem] font-extrabold uppercase leading-tight tracking-[0.12em] text-ash">
            of {studies.length}
            <br />
            engagements
          </span>
        </p>
        <div className="min-w-0">
          <p className="statement font-display font-extrabold uppercase leading-[1.15] text-snow">
            {interlude.lead}{" "}
            <span className="text-brand">{interlude.figure}</span> {interlude.trail}
          </p>
          <p className="mt-6 max-w-[62ch] text-sm leading-relaxed text-fog">{interlude.note}</p>
        </div>
      </div>
    </div>
  );
}

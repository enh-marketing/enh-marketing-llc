"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { MarkedKeys } from "@/components/service/MarkedKeys";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** A fixed package, and the site that stops fitting it.
 *
 *  THE SENTENCE THIS SECTION EXISTS FOR. "A basic hosting package may be enough
 *  for a small website. As the site grows, adds integrations or begins
 *  supporting marketing campaigns, it needs an environment suited to the way
 *  the business actually uses it." That is not a list of three features. It is
 *  one fixed thing and three changes that happen to what has to go inside it,
 *  and the argument only lands if the reader can watch the fit fail.
 *
 *  SO THE BOX NEVER MOVES. The solid outline is the same size in every state,
 *  because a standard package is the same size for every project: the document
 *  says so twice, here and in the first capability entry. What changes is what
 *  it has to hold. By the third change the contents are above the lid, and the
 *  dashed outline, which is always drawn to the contents rather than to the
 *  package, has left the box behind. Nothing is labelled and nothing is
 *  measured: one line is fixed, one line is fitted, and the reader can see
 *  which one the site is actually inside.
 *
 *  THE CLIENT'S SENTENCE IS THE CONTROL, on `MarkedKeys`'s contract. The three
 *  changes are marked where they stand and pointing at one runs the site up to
 *  that change, because the sentence's own "as" makes them cumulative rather
 *  than alternative. With no pointer, no keyboard and no JavaScript the drawing
 *  rests on all three, which is the state the sentence describes.
 *
 *  NO FIGURE. No storage bar, no percentage, no allocation reading. This
 *  document gives none, and a fill gauge here would invent one.
 *
 *  Drawn in HTML rather than SVG, like DriftWatch and SilentFailures: every
 *  change here is a width or a height, and those transition reliably on a div
 *  in every browser where they do not on an SVG geometry attribute. */

/** The stage geometry, bottom-anchored to the package floor. Percentages are of
 *  the stage box; pixels are the heights the contents actually stand at. */
const STAGES = [
  { site: "42%", siteH: 124, integrations: false, surge: false, fitL: "10%", fitW: "52%", fitH: 146 },
  { site: "42%", siteH: 124, integrations: true, surge: false, fitL: "10%", fitW: "80%", fitH: 146 },
  { site: "42%", siteH: 124, integrations: true, surge: true, fitL: "10%", fitW: "80%", fitH: 258 },
] as const;

/** The size the site started at, drawn as a ghost inside it. Fixed, so the
 *  growth is measured against the small website the first sentence describes
 *  rather than against nothing. */
const BASELINE = { width: "62%", height: 54 };

/** Floor of the package, above the ground band, in pixels from the stage foot. */
const FLOOR = 46;
/** Inside height of the package. Fixed, in every state, which is the point. */
const BOX_H = 182;

/** The campaign traffic, drawn as a crowd rather than as bars: a mass of
 *  arrivals has no length to compare, and a row of bars at six widths would
 *  read as a chart of a figure this document does not give. The top of the
 *  crowd stands clear of the lid. */
const CROWD = 7;
const CROWD_ROWS = 6;
/** Square side and gap, in pixels. Fixed rather than fluid, because the whole
 *  point is how far the crowd stands above a lid that never moves. */
const DOT = 12;
const DOT_GAP = 6;

/** The section's shape before the drawing states it in full: one fixed outline,
 *  and a fitted one that has left it behind. Same device as the maintenance
 *  page's scope-edge mark, which draws its run's shape beside the heading. */
function FitMark() {
  return (
    <div className="hidden shrink-0 lg:block">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="A fixed rounded outline standing on hatched ground, and a second outline drawn to its contents which rises clear of the first."
        className="h-[clamp(9rem,14vw,13rem)] w-[clamp(9rem,14vw,13rem)] overflow-visible"
      >
        <line x1="14" y1="172" x2="186" y2="172" stroke="var(--color-ash)" strokeWidth="1.4" />
        <rect x="14" y="172" width="172" height="20" fill="url(#wh-plate-hatch)" />
        <rect x="34" y="84" width="132" height="88" rx="8" stroke="var(--color-line)" strokeWidth="1.4" fill="none" />
        <rect x="46" y="40" width="108" height="144" rx="8" stroke="var(--color-brand)" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
        <rect x="58" y="120" width="52" height="52" rx="3" stroke="var(--color-ash)" strokeWidth="1.3" fill="var(--color-ink-3)" />
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${r}-${col}`}
              x={60 + col * 22}
              y={52 + r * 16}
              width="12"
              height="12"
              rx="2"
              fill="var(--color-brand)"
              opacity="0.5"
            />
          )),
        )}
      </svg>
    </div>
  );
}

export function FittedEnvironment({
  id,
  label,
  index,
  title,
  strokeTitle,
  affects,
  affectsMark,
  basic,
  change,
  changeMark,
  review,
  reviewMark,
  beyond,
  beyondMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  affects: string;
  affectsMark: string[];
  basic: string;
  change: string;
  changeMark: readonly string[];
  review: string;
  reviewMark: string;
  beyond: string;
  beyondMark: string;
}) {
  /** Null is "all three", which is what the sentence says happens. */
  const [pick, setPick] = useState<number | null>(null);
  const stage = STAGES[pick === null ? STAGES.length - 1 : pick];

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} markNode={<FitMark />}>
          <Rise delay={0.25} className="mt-7">
            <p className="max-w-3xl text-base leading-relaxed text-fog sm:text-lg">
              <Marked text={affects} mark={affectsMark} className="font-semibold text-brand-text" />
            </p>
          </Rise>
        </SectionHeader>

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          {/* The argument, in the document's own words. */}
          <div>
            <Rise>
              <p className="font-display text-xl font-extrabold uppercase leading-[1.15] text-snow sm:text-2xl">
                {basic}
              </p>
            </Rise>

            <Rise delay={0.1}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
                <MarkedKeys
                  text={change}
                  keys={changeMark}
                  active={pick}
                  onPick={setPick}
                  className="inline font-semibold text-brand-text"
                  activeClassName="inline font-semibold text-brand"
                />
              </p>
            </Rise>

            <Rise delay={0.2} className="mt-10 border-t border-line pt-8">
              <p className="max-w-xl leading-relaxed text-fog">
                <Marked text={review} mark={reviewMark} className="font-semibold text-snow" />
              </p>
              <p className="mt-5 max-w-xl leading-relaxed text-fog">
                <Marked text={beyond} mark={beyondMark} className="font-semibold text-brand-text" />
              </p>
            </Rise>
          </div>

          {/* The drawing. */}
          <Rise delay={0.15}>
            <div
              className="relative h-[320px] w-full"
              role="img"
              aria-label="A hosting package drawn as a fixed box standing on ground, with the website inside it and a ghost outline marking the size the small website started at. As the site grows, gains integrations and starts carrying campaign traffic, the contents rise above the lid of the box, and a second outline drawn to the contents rather than to the package leaves the box behind."
            >
              {/* Ground, with the watch passing over it. The page's own notation
                  and its own loop, carried down from the hero, and the one thing
                  in this drawing that is true at every stage. */}
              <svg
                aria-hidden
                viewBox="0 0 200 44"
                preserveAspectRatio="none"
                className="absolute inset-x-0 bottom-0 h-11 w-full"
              >
                <defs>
                  <clipPath id="wh-fit-ground">
                    <rect x="0" y="0" width="200" height="44" />
                  </clipPath>
                </defs>
                <g clipPath="url(#wh-fit-ground)">
                  <rect x="0" y="0" width="200" height="44" fill="url(#wh-plate-hatch)" />
                  <rect x="0" y="0" width="2" height="44" fill="var(--color-brand)" opacity="0.5" className="ci-scan-x" />
                </g>
                <line x1="0" y1="1" x2="200" y2="1" stroke="var(--color-ash)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>

              {/* The fixed package. Same size in every state. */}
              <div
                aria-hidden
                className="absolute left-[6%] right-[6%] rounded-xl border border-line bg-ink-2"
                style={{ bottom: FLOOR, height: BOX_H }}
              />

              {/* Campaign traffic: the crowd that does not fit. */}
              <div
                aria-hidden
                className={cn(
                  "absolute left-[11%] grid transition-opacity duration-700 motion-reduce:transition-none",
                  stage.surge ? "opacity-100" : "opacity-0",
                )}
                style={{
                  bottom: FLOOR + stage.siteH + 12,
                  gap: DOT_GAP,
                  gridTemplateColumns: `repeat(${CROWD}, ${DOT}px)`,
                }}
              >
                {Array.from({ length: CROWD * CROWD_ROWS }, (_, i) => (
                  <span
                    key={i}
                    className="block rounded-[3px] bg-brand/55"
                    style={{ width: DOT, height: DOT }}
                  />
                ))}
              </div>

              {/* The site itself. */}
              <div
                className="absolute left-[13%] overflow-hidden rounded-lg border border-ash/60 bg-ink-3 p-2.5 transition-[width,height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{ bottom: FLOOR, width: stage.site, height: stage.siteH }}
              >
                <span className="block h-1.5 w-8 rounded-full bg-brand/70" />
                <span className="mt-2 block h-1 w-4/5 rounded-full bg-line" />
                <span className="mt-1.5 block h-1 w-3/5 rounded-full bg-line" />
                <span className="mt-1.5 block h-1 w-2/3 rounded-full bg-line" />
                <span className="mt-3 block h-6 w-full rounded border border-dashed border-line" />
                {/* Where the small website ended. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 rounded-lg border border-dashed border-ash/45"
                  style={{ width: BASELINE.width, height: BASELINE.height }}
                />
                <svg
                  aria-hidden
                  viewBox="0 0 120 10"
                  preserveAspectRatio="none"
                  className="absolute inset-x-2.5 bottom-2 h-2.5"
                >
                  {[0, 1, 2].map((i) => (
                    <path
                      key={i}
                      d={`M0 ${3 + i * 2} H 120`}
                      pathLength="100"
                      stroke="var(--color-brand)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                      className="ci-flow"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  ))}
                </svg>
              </div>

              {/* The integrations, standing beside the site and tied to it. */}
              <div
                aria-hidden
                className={cn(
                  "absolute flex flex-col-reverse justify-start gap-3 transition-opacity duration-700 motion-reduce:transition-none",
                  stage.integrations ? "opacity-100" : "opacity-0",
                )}
                style={{ bottom: FLOOR, left: "60%", width: "26%", height: 122 }}
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="h-px flex-1 bg-ash/50" />
                    <span className="block h-7 w-full max-w-[74%] shrink-0 rounded border border-ash/55 bg-ink-3" />
                  </span>
                ))}
              </div>

              {/* Drawn to the contents, never to the package. */}
              <div
                aria-hidden
                className="absolute rounded-xl border border-dashed border-brand/70 transition-[width,height,left,bottom] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                style={{ bottom: FLOOR - 10, left: stage.fitL, width: stage.fitW, height: stage.fitH }}
              />
            </div>
          </Rise>
        </div>
      </Container>
    </section>
  );
}

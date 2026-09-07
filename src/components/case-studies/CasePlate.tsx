"use client";

import { motion } from "motion/react";
import { CaseMedia } from "@/components/case-studies/CaseMedia";
import { Figures } from "@/components/case-studies/Figures";
import { ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { hasStory, type Study } from "@/content/case-studies";

const EASE = [0.16, 1, 0.3, 1] as const;

/** ONE PLATE. A study as it appears in the archive, in the related row, and
 *  nowhere else.
 *
 *  IT IS NOT A CARD, AND THAT IS THE POINT. No panel, no fill, no drop
 *  shadow: a picture in a bordered frame with type set under it on the page's
 *  own ground, the way a portfolio index in a printed annual is set. The
 *  border and the fill belong to the frame, so the picture reads as a plate on
 *  paper rather than as a tile in a grid, which is what "the same bento grid"
 *  named and rejected.
 *
 *  THE RHYTHM IS IN THE WIDTHS, NOT IN THE ANATOMY. Every plate carries the
 *  same five things in the same order — picture, client, title, its four
 *  published figures, one action — because the archive is a record and a
 *  record whose entries are formatted differently is harder to read, not
 *  richer. What varies is how much of the twelve-column measure each one
 *  takes: see the pattern in CaseArchive. A plate at seven columns is a
 *  different composition from the same plate at five without a second design
 *  existing to drift out of sync.
 *
 *  THE FIGURES ARE ON THE PLATE. Four numbers and their captions are a lot to
 *  carry on a listing, and they are also the only thing that distinguishes one
 *  engagement from another at a glance. A reader scanning this page is asking
 *  "what happened", and the answer is on the plate rather than one click away.
 *
 *  A STUDY WITH NO STORY IS NOT A LINK. Same rule as `hasBody` in the archive:
 *  the plate renders as a <div>, keeps its picture and its figures, and offers
 *  no hover state, because a hover state on something that cannot be clicked
 *  is a lie. */
export function CasePlate({
  study,
  position,
  wide = false,
  className,
  animate = true,
}: {
  study: Study;
  /** Printed as the plate's numeral. One-based, and it ascends in DOM order
   *  and in visual order, which this client has raised twice. */
  position: number;
  wide?: boolean;
  className?: string;
  /** Off in the related row, where there is no filtering to animate and the
   *  layout engine would be paying for a set that never changes. */
  animate?: boolean;
}) {
  const live = hasStory(study);
  const Root = live ? "a" : "div";
  const Wrapper = animate ? motion.li : "li";

  return (
    <Wrapper
      id={`case-${study.slug}`}
      {...(animate
        ? {
            layout: "position" as const,
            exit: { opacity: 0, scale: 0.98 },
            transition: { duration: 0.45, ease: EASE, layout: { duration: 0.5, ease: EASE } },
          }
        : {})}
      /* The plate is addressable: /case-studies#case-venesta lands on it, which
         is how a link into the archive can point at one entry without leaving
         the page. scroll-mt clears the fixed header, since Lenis's
         programmatic scrollTo does not read the global scroll-padding-top. */
      className={cn("cs-plate scroll-mt-28", className)}
    >
      <div className="cs-reveal h-full">
        <Root
          {...(live ? { href: `/case-studies/${study.slug}` } : {})}
          className="group flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          {/* ------------------------------------------------ the picture */}
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-line bg-ink-2",
              "transition-colors duration-500 motion-reduce:transition-none",
              live && "group-hover:border-brand/45",
            )}
            style={{ aspectRatio: `${study.thumb.w} / ${study.thumb.h}` }}
          >
            <CaseMedia
              figure={study.thumb}
              slot={wide ? "plateWide" : "plate"}
              className={cn(
                "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                live && "group-hover:scale-[1.04]",
              )}
            />
            <span
              aria-hidden
              className="font-display absolute right-3 top-3 rounded-full bg-void/70 px-2.5 py-1 text-[0.6875rem] font-extrabold tabular-nums text-snow backdrop-blur-sm"
            >
              {String(position).padStart(2, "0")}
            </span>
          </div>

          {/* -------------------------------------------------- the words */}
          <div className="flex flex-1 flex-col pt-6">
            <span
              aria-hidden
              className={cn(
                "h-px bg-line transition-all duration-500 motion-reduce:transition-none",
                live ? "w-8 group-hover:w-20 group-hover:bg-brand" : "w-8",
              )}
            />

            <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className={cn(
                  "font-display text-[1.05rem] font-extrabold uppercase leading-tight text-snow sm:text-[1.15rem]",
                  "transition-colors duration-500 motion-reduce:transition-none",
                  live && "group-hover:text-brand",
                )}
              >
                {study.client}
              </span>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ash">
                {study.sector}
              </span>
            </p>

            <h3
              className={cn(
                "mt-3 max-w-[46ch] text-[0.95rem] leading-[1.5] text-fog",
                "transition-colors duration-500 motion-reduce:transition-none",
                live && "group-hover:text-snow",
              )}
            >
              {study.title}
            </h3>

            <Figures
              metrics={study.metrics}
              scale="card"
              label={`Published figures for ${study.client}`}
              /* Four across only where the plate is actually seven columns
                 wide, which is `lg` and up. At tablet both plates share the
                 row equally, so a wide plate is 380px there and four figures
                 in it give each caption a 90px measure. */
              className={cn("mt-7 border-t border-line pt-7", wide && "lg:grid-cols-4")}
            />

            {live && (
              <span className="mt-auto flex items-center gap-3 pt-7 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-snow">
                Read the case study
                <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden text-brand">
                  <ArrowRight className="absolute h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4" />
                  <ArrowRight className="absolute h-3 w-3 -translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                </span>
              </span>
            )}
          </div>
        </Root>
      </div>
    </Wrapper>
  );
}

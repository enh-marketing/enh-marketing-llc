"use client";

import { Container } from "@/components/ui/Container";
import { CaseMedia } from "@/components/case-studies/CaseMedia";
import { ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { study as copy, type Study } from "@/content/case-studies";

/** WHAT COMES BEFORE AND WHAT COMES NEXT, in the archive's own order.
 *
 *  IT WRAPS AT BOTH ENDS, and that is a decision rather than an oversight. An
 *  archive of twenty-two finished engagements is a set the reader is being
 *  invited to walk, not a dated feed with a first and a last, so the twenty-
 *  second study offering the first one back is a continuation. The alternative
 *  is a page that ends in a disabled button.
 *
 *  THE PICTURE IS THE INVITATION. Two halves, each with the neighbour's own
 *  result card behind its name, so the reader can see where they are going
 *  rather than reading a title and guessing. The two halves mirror: previous
 *  reads right to left, next reads left to right, and each one's arrow travels
 *  in its own direction. */
export function CaseNav({ prev, next }: { prev: Study; next: Study }) {
  return (
    <nav
      aria-label="Case studies"
      data-section="Case Study Navigation"
      className="relative overflow-x-clip border-y border-line"
    >
      <Container className="px-0 sm:px-0">
        <div className="grid sm:grid-cols-2">
          <Side study={prev} direction="prev" />
          <Side study={next} direction="next" />
        </div>
      </Container>
    </nav>
  );
}

function Side({ study, direction }: { study: Study; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  return (
    <a
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group relative flex items-center gap-5 px-6 py-8 sm:gap-7 sm:px-10 sm:py-12",
        "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
        isNext
          ? "border-t border-line sm:border-l sm:border-t-0"
          : "",
        isNext && "sm:flex-row-reverse sm:text-right",
      )}
    >
      {/* The neighbour's card, small. `compact` in the srcset, because this box
          is never wider than about 320px. */}
      <span
        className="relative block w-24 shrink-0 overflow-hidden rounded-xl border border-line bg-ink-2 transition-colors duration-500 group-hover:border-brand/45 motion-reduce:transition-none sm:w-32"
        style={{ aspectRatio: `${study.thumb.w} / ${study.thumb.h}` }}
      >
        <CaseMedia
          figure={study.thumb}
          slot="compact"
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] motion-reduce:transition-none"
        />
      </span>

      <span className="min-w-0">
        <span
          className={cn(
            "flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text",
            isNext && "sm:flex-row-reverse",
          )}
        >
          <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden text-brand">
            <ArrowRight
              className={cn(
                "absolute h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isNext ? "group-hover:translate-x-4" : "-scale-x-100 group-hover:-translate-x-4",
              )}
            />
            <ArrowRight
              className={cn(
                "absolute h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isNext
                  ? "-translate-x-4 group-hover:translate-x-0"
                  : "-scale-x-100 translate-x-4 group-hover:translate-x-0",
              )}
            />
          </span>
          {isNext ? copy.navNext : copy.navPrev}
        </span>

        <span className="font-display mt-3 block text-[1.05rem] font-extrabold uppercase leading-tight text-snow transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none sm:text-[1.2rem]">
          {study.client}
        </span>
        <span className="mt-2 line-clamp-2 block text-sm leading-snug text-fog">{study.title}</span>
      </span>
    </a>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

/** The hero: a page being given the three things keywords cannot give it.
 *
 *  WHY THIS. The document's argument is one sentence and this is it: "Adding
 *  keywords to an existing page will not automatically make it useful or
 *  competitive. The page still needs to answer the search properly, explain the
 *  offer and guide the reader towards a sensible next step." So the drawing is
 *  a page with keywords already on it -- they arrive, they sit there, and they
 *  stay grey -- while the three things the page actually needs fill in one at a
 *  time. Keywords are visibly not the thing that completes it.
 *
 *  THE THREE ZONES ARE THE THREE REQUIREMENTS, in the document's own order:
 *  the answer, the offer, the next step. Nothing else is drawn on the page,
 *  because nothing else is claimed.
 *
 *  NOTHING IS COUNTED. No positions, no volumes, no scores: this document
 *  contains no figure of any kind, and its last FAQ refuses to give one.
 *
 *  MOTION. One interval, three states, and it stops entirely under
 *  prefers-reduced-motion with every zone filled -- which is the finished page
 *  the section is describing, so nothing is lost by not animating. */

/** How long each requirement holds before the next fills, in ms. */
const BEAT = 1400;

export function PagePurpose({ label }: {
  /** The drawing's accessible name, passed in from the page's content file
   *  rather than written here: every word on this page is the client's, and
   *  the sentence this drawing depicts is one the client can still edit. It
   *  used to be a copy of that sentence held in this file, which meant editing
   *  the content file silently left the screen-reader description behind.
   *  Required, so a caller cannot drop it and ship an unnamed role="img". */
  label: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setStep((s) => (s + 1) % 4), BEAT);
    return () => clearInterval(t);
  }, [reduced]);

  /** Filled when its turn has come round; all three when motion is off. */
  const on = (i: number) => reduced || step > i;

  return (
    <div
      className={cn(
        // The house placement for a hero visual, matching PositionFourteen,
        // AnswerStream, ProfileGrid and StorefrontPreview: anchored to the
        // right gutter, centred, out of the flow, and not rendered below the
        // large breakpoint. In the flow it adds its own height to the hero and
        // pushes the trust strip below the fold -- which is exactly what it was
        // doing before this wrapper existed, at the full width of the section.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
      )}
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-6 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)] sm:p-7">
        {/* The site's own grid, at the weight the other heroes use. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div
          role="img"
          aria-label={label}
          className="relative"
        >
          {/* The search the page has to answer. */}
          <div className="flex items-center gap-3 rounded-xl border border-line bg-ink-3 px-4 py-3">
            <svg
              viewBox="0 0 20 20"
              aria-hidden
              className="h-4 w-4 shrink-0 text-brand"
              fill="none"
            >
              <circle
                cx="9"
                cy="9"
                r="6"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M13.5 13.5 17 17"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
            <span aria-hidden className="h-2 w-1/2 rounded-full bg-fog/35" />
            <span
              aria-hidden
              className="ml-auto h-2 w-6 rounded-full bg-line"
            />
          </div>

          {/* The page itself. */}
          <div className="mt-4 rounded-xl border border-line bg-ink-3 p-4 sm:p-5">
            {/* Keywords, already present and going nowhere. */}
            <div aria-hidden className="mb-5 flex flex-wrap gap-2">
              {[52, 38, 64, 30, 46].map((w, i) => (
                <span
                  key={i}
                  className="h-5 rounded-md border border-line bg-ink-2"
                  style={{ width: w }}
                />
              ))}
            </div>

            {/* The three the document names, in its order. */}
            <ul aria-hidden className="space-y-3">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 motion-reduce:transition-none",
                      on(i) ? "border-brand bg-brand" : "border-line bg-ink-2",
                    )}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className={cn(
                        "h-3 w-3 text-white transition-opacity duration-300 motion-reduce:transition-none",
                        on(i) ? "opacity-100" : "opacity-0",
                      )}
                      fill="none"
                    >
                      <path
                        d="M3.5 8.4l3 3 6-7"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span className="min-w-0 flex-1 space-y-1.5 pt-0.5">
                    <span
                      className={cn(
                        "block h-2.5 rounded-full transition-all duration-500 ease-out motion-reduce:transition-none",
                        on(i) ? "bg-brand/70" : "bg-line",
                      )}
                      style={{
                        width: on(i) ? ["82%", "68%", "54%"][i] : "26%",
                      }}
                    />
                    <span
                      className={cn(
                        "block h-2 rounded-full transition-all duration-500 ease-out motion-reduce:transition-none",
                        on(i) ? "bg-fog/30" : "bg-line/60",
                      )}
                      style={{
                        width: on(i) ? ["64%", "48%", "38%"][i] : "16%",
                      }}
                    />
                  </span>
                </li>
              ))}
            </ul>

            {/* The next step the third requirement asks for. */}
            <div className="mt-5 flex items-center gap-3">
              <span
                className={cn(
                  "h-8 rounded-full transition-all duration-500 ease-out motion-reduce:transition-none",
                  on(2) ? "w-28 bg-brand" : "w-20 bg-line",
                )}
              />
              <span aria-hidden className="h-2 w-10 rounded-full bg-line" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

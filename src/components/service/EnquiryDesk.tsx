"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/** The hero visual: enquiries arriving, being answered at different speeds, and
 *  only some of them turning into meetings.
 *
 *  WHY THIS. The document's thesis is that the enquiries are already arriving
 *  and most of them are wasted: "Getting more enquiries is the easy half. Not
 *  wasting the ones you already get is where the money is." It then names the
 *  reason twice. "In this market, the supplier who replies first often wins the
 *  sale", and "Response time is on every report. In this market, it usually
 *  decides the sale, and almost nobody measures it." So the drawing is a desk
 *  of live enquiries with a response meter running on each one: the ones
 *  answered quickly convert, the slow ones go cold. That is the leak, with the
 *  document's own stated cause rather than a generic funnel.
 *
 *  WHY A PANEL AND NOT PARTICLES. Two earlier attempts drew falling marks. The
 *  first was four static ranks, which is a bar chart of a funnel rather than a
 *  funnel. The second animated `xPercent` on 8px dots — a percentage of the
 *  element's own width, so every horizontal move was about ten pixels and the
 *  marks simply fell straight down. This site's hero visuals are mini
 *  interfaces (AnswerStream, StorefrontPreview, ProfileGrid), and that idiom
 *  animates widths and opacity rather than positioning small objects in a
 *  space, which is both truer to the house language and far harder to get
 *  subtly wrong.
 *
 *  NOT ONE WORD OF TEXT, and no counts or durations. Which rows are fast is
 *  illustrative: the document says response time usually decides the sale, it
 *  never says by how much, and a labelled meter would invent a benchmark. */

/** Five enquiries. `fast` ones are answered before the prospect moves on. */
const ROWS: { width: number; meter: number; fast: boolean }[] = [
  { width: 58, meter: 0.55, fast: true },
  { width: 40, meter: 1.5, fast: false },
  { width: 66, meter: 0.75, fast: true },
  { width: 34, meter: 1.85, fast: false },
  { width: 50, meter: 0.62, fast: true },
];

const WON = ROWS.filter((r) => r.fast).length;

export function EnquiryDesk({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".ed-fill", { scaleX: 0 })
        .set(".ed-tick", { opacity: 0, scale: 0.4 })
        .set(".ed-won", { opacity: 0, scale: 0.4 })
        .set(".ed-row", { opacity: 0, y: -10 });

      // The enquiries land.
      tl.to(".ed-row", { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 });

      // Each one's clock runs. They do not run at the same speed.
      ROWS.forEach((row, i) => {
        tl.to(
          `.ed-row-${i} .ed-fill`,
          {
            scaleX: 1,
            duration: row.meter,
            ease: "none",
            backgroundColor: row.fast ? "var(--color-brand)" : "var(--color-ash)",
          },
          "meters",
        );

        if (row.fast) {
          // Answered in time: it becomes a meeting.
          tl.to(
            `.ed-row-${i} .ed-tick`,
            { opacity: 1, scale: 1, duration: 0.25 },
            `meters+=${row.meter}`,
          ).to(
            `.ed-won-${i}`,
            { opacity: 1, scale: 1, duration: 0.3 },
            `meters+=${row.meter + 0.08}`,
          );
        } else {
          // Answered too late: it goes cold.
          tl.to(
            `.ed-row-${i}`,
            { opacity: 0.32, duration: 0.5 },
            `meters+=${row.meter}`,
          );
        }
      });

      tl.to({}, { duration: 1.9 }).to(".ed-row, .ed-won", { opacity: 0, duration: 0.45 });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={root}
      className={cn(
        // The house placement for a hero visual, matching AnswerStream,
        // ProfileGrid and StorefrontPreview: anchored to the right gutter,
        // centred, out of the flow, and not rendered below the large
        // breakpoint. In the flow it would add its own height to the hero and
        // push the trust strip below the fold.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[352px] -translate-y-1/2 select-none lg:block xl:w-[392px]",
        className,
      )}
      role="img"
      aria-label="Five incoming enquiries, each with a response timer running. The three answered quickly become meetings; the two answered slowly go cold."
    >
      <div className="rounded-[1.5rem] border border-line bg-ink-2/80 p-5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
        {/* The queue. */}
        <div className="space-y-2.5">
          {ROWS.map((row, i) => (
            <div
              key={i}
              className={cn(
                "ed-row flex items-center gap-3 rounded-xl border border-line bg-void/45 px-3.5 py-3",
                `ed-row-${i}`,
                reduced && !row.fast && "opacity-30",
              )}
              style={reduced ? undefined : { opacity: 0 }}
            >
              {/* The enquiry itself. */}
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-fog" />
              <span
                aria-hidden
                className="h-1.5 shrink-0 rounded-full bg-line"
                style={{ width: `${row.width}%` }}
              />

              {/* Its response timer. */}
              <span
                aria-hidden
                className="relative ml-auto h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-line/70"
              >
                <span
                  className={cn(
                    "ed-fill absolute inset-y-0 left-0 w-full origin-left rounded-full",
                    row.fast ? "bg-brand" : "bg-ash",
                  )}
                  style={reduced ? undefined : { transform: "scaleX(0)" }}
                />
              </span>

              {/* Answered in time. */}
              <span
                aria-hidden
                className={cn("ed-tick h-2 w-2 shrink-0 rounded-full bg-brand")}
                style={reduced ? { opacity: row.fast ? 1 : 0 } : { opacity: 0 }}
              />
            </div>
          ))}
        </div>

        {/* What the month is actually reported on. */}
        <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
          <span aria-hidden className="h-px flex-1 bg-line" />
          <div className="flex items-center gap-2">
            {ROWS.map((row, i) =>
              row.fast ? (
                <span
                  key={i}
                  aria-hidden
                  className={cn("ed-won h-2.5 w-2.5 rounded-full bg-brand", `ed-won-${i}`)}
                  style={reduced ? undefined : { opacity: 0 }}
                />
              ) : null,
            )}
            {Array.from({ length: ROWS.length - WON }).map((_, i) => (
              <span
                key={`empty-${i}`}
                aria-hidden
                className="h-2.5 w-2.5 rounded-full border border-line"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

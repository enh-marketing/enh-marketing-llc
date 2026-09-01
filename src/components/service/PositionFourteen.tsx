"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/** The hero visual: a page sitting fourteenth, and the five signals on it
 *  being written properly.
 *
 *  WHY THIS. The document opens on a specific scene: "A page sits at position
 *  fourteen for a term worth having. Nobody looks at it for a year." So the
 *  drawing is that list, and there are exactly fourteen rows in it — the count
 *  is the figure, which is why no numeral is printed. Every other hero on this
 *  site is wordless and this one stays that way.
 *
 *  WHAT DELIBERATELY DOES NOT HAPPEN. The row never moves up. The page's whole
 *  argument is that on-page work is the part you control and the ranking is not:
 *  it says "Anyone promising you a specific position by a specific date is
 *  selling something they cannot control", and that impressions and average
 *  position move first, "usually well before traffic does". A hero that
 *  animated the row climbing to the top would contradict the copy two screens
 *  below it. What changes is the five signals the document names — titles,
 *  headings, content structure, internal links and markup — filling in on the
 *  row that has them wrong.
 *
 *  Motion is opacity, colour and scaleX only. No positioning: that is where two
 *  earlier hero visuals on this site went silently wrong.
 *
 *  Under reduced motion the signals render written. */
const ROWS = 14;
const SIGNALS = 5;

export function PositionFourteen({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".pf-row", { opacity: 0 })
        .set(".pf-sig", { scaleX: 0, backgroundColor: "var(--color-line)" })
        .set(".pf-pip", { opacity: 0.25, backgroundColor: "var(--color-line)" })
        .set(".pf-rule", { scaleY: 0 });

      // The list, as it stands.
      tl.to(".pf-row", { opacity: 1, duration: 0.3, stagger: 0.035 })
        .to(".pf-rule", { scaleY: 1, duration: 0.4 }, "-=0.2")
        .to({}, { duration: 0.8 });

      // The signals get written, one at a time.
      for (let i = 0; i < SIGNALS; i += 1) {
        tl.to(`.pf-sig-${i}`, {
          scaleX: 1,
          backgroundColor: "var(--color-brand)",
          duration: 0.35,
        }).to(
          `.pf-pip-${i}`,
          { opacity: 1, backgroundColor: "var(--color-brand)", duration: 0.25 },
          "<0.1",
        );
      }

      tl.to({}, { duration: 2.1 })
        .to(".pf-row", { opacity: 0, duration: 0.4 })
        .to(".pf-rule", { scaleY: 0, duration: 0.3 }, "<");
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
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="A list of fourteen results. The fourteenth has its title, heading, structure, internal links and markup written properly. It does not move up the list."
    >
      <div className="rounded-[1.5rem] border border-line bg-ink-2/80 p-6 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)]">
        <ol className="flex flex-col gap-3">
          {Array.from({ length: ROWS }).map((_, i) => {
            const subject = i === ROWS - 1;
            return (
              <li
                key={i}
                className={cn("pf-row relative flex items-center gap-3", subject && "pt-3")}
                style={reduced ? undefined : { opacity: 0 }}
              >
                {/* The one being worked on. */}
                {subject && (
                  <span
                    aria-hidden
                    className={cn(
                      "pf-rule absolute -left-2 top-2 h-[calc(100%-0.5rem)] w-[2px] origin-top rounded-full bg-brand",
                      reduced && "scale-y-100",
                    )}
                    style={reduced ? undefined : { transform: "scaleY(0)" }}
                  />
                )}

                <div className="flex flex-1 flex-col gap-1.5">
                  {subject ? (
                    <>
                      {/* The five signals the document names. */}
                      {[0, 1].map((r) => (
                        <span key={r} aria-hidden className="flex items-center gap-1.5">
                          {[0, 1].map((k) => {
                            const idx = r * 2 + k;
                            return (
                              <span
                                key={k}
                                className={cn(
                                  "pf-sig h-[3px] origin-left rounded-full",
                                  `pf-sig-${idx}`,
                                  reduced ? "bg-brand" : "bg-line",
                                )}
                                style={{
                                  width: `${[46, 30, 38, 26][idx]}%`,
                                  transform: reduced ? undefined : "scaleX(0)",
                                }}
                              />
                            );
                          })}
                        </span>
                      ))}
                      <span
                        aria-hidden
                        className={cn(
                          "pf-sig pf-sig-4 h-[3px] w-[62%] origin-left rounded-full",
                          reduced ? "bg-brand" : "bg-line",
                        )}
                        style={{ transform: reduced ? undefined : "scaleX(0)" }}
                      />
                    </>
                  ) : (
                    <>
                      <span
                        aria-hidden
                        className="h-[3px] rounded-full bg-fog/30"
                        style={{ width: `${52 + ((i * 7) % 26)}%` }}
                      />
                      <span
                        aria-hidden
                        className="h-[2px] rounded-full bg-line"
                        style={{ width: `${68 + ((i * 11) % 24)}%` }}
                      />
                    </>
                  )}
                </div>

                {/* Which of the five are written. */}
                {subject && (
                  <span aria-hidden className="flex shrink-0 flex-col gap-1">
                    {Array.from({ length: SIGNALS }).map((_, k) => (
                      <span
                        key={k}
                        className={cn(
                          "pf-pip h-1 w-1 rounded-full",
                          `pf-pip-${k}`,
                          reduced ? "bg-brand" : "bg-line",
                        )}
                        style={reduced ? undefined : { opacity: 0.25 }}
                      />
                    ))}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

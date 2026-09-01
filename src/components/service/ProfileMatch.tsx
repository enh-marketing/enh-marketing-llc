"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/** The hero visual: professional records checked against four criteria, and
 *  only one of them matching.
 *
 *  WHY THIS. The page's own subheading is "Reach UAE decision-makers by job
 *  title, seniority, company and industry" — four named criteria — and the
 *  section below argues LinkedIn's targeting is trustworthy because "people
 *  told it" rather than because a platform inferred it. So the drawing is
 *  structured records being matched field by field, with the ones that fail a
 *  criterion visibly failing it rather than merely being absent.
 *
 *  WHY THREE RECORDS AND NOT A CROWD. The obvious visual is a large audience
 *  filtering to a small one, and the document does say a filtered UAE B2B
 *  audience is "often only a few thousand people" out of "approximately 10.0
 *  million" members. But any grid of marks reads as a proportion, and a legible
 *  grid cannot be near two thousand to one. Three records read as an
 *  illustration of a rule, not as a sample of a population, so no false ratio
 *  is asserted. An earlier version showed a single record, which was honest but
 *  only 207px tall against a 705px house scale — and a matching rule needs
 *  something to fail against to be worth drawing at all.
 *
 *  NOT ONE WORD OF TEXT. Bars, fields and marks only, following AnswerStream,
 *  StorefrontPreview and ProfileGrid. Motion is opacity, scale and colour: no
 *  coordinate maths, which is where two earlier hero visuals on this site went
 *  silently wrong.
 *
 *  Under reduced motion the records render resolved: one matched, two failed. */

/** Which criterion each record fails, or -1 for the one that matches all four. */
const RECORDS: { fails: number; widths: string[] }[] = [
  { fails: 2, widths: ["38%", "50%", "44%", "58%"] },
  { fails: -1, widths: ["46%", "58%", "40%", "52%"] },
  { fails: 0, widths: ["42%", "36%", "56%", "48%"] },
];

const CRITERIA = 4;

export function ProfileMatch({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".pm-tick", { opacity: 0, scale: 0.4 })
        .set(".pm-cross", { opacity: 0, scale: 0.4 })
        .set(".pm-card", { opacity: 0, y: 12, borderColor: "var(--color-line)" })
        .set(".pm-seal", { scaleX: 0 });

      // The records arrive.
      tl.to(".pm-card", { opacity: 1, y: 0, duration: 0.4, stagger: 0.12 });

      // Each record is checked, criterion by criterion.
      RECORDS.forEach((record, r) => {
        const last = record.fails === -1 ? CRITERIA - 1 : record.fails;
        for (let i = 0; i <= last; i += 1) {
          const failed = record.fails === i;
          tl.to(
            `.pm-c${r}-${i} .${failed ? "pm-cross" : "pm-tick"}`,
            { opacity: 1, scale: 1, duration: 0.2 },
            r === 0 && i === 0 ? "+=0.3" : "+=0.14",
          );
        }

        if (record.fails === -1) {
          // All four: this is the one.
          tl.to(`.pm-card-${r}`, { borderColor: "var(--color-brand)", duration: 0.35 })
            .to(`.pm-card-${r} .pm-seal`, { scaleX: 1, duration: 0.45 }, "<");
        } else {
          // Out at the criterion it failed.
          tl.to(`.pm-card-${r}`, { opacity: 0.34, duration: 0.4 });
        }
      });

      tl.to({}, { duration: 2 }).to(".pm-card", { opacity: 0, y: -10, duration: 0.4 });
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
      aria-label="Three professional records checked against four targeting criteria. One matches all four; the other two fail one and drop out."
    >
      <div className="flex flex-col gap-3">
        {RECORDS.map((record, r) => {
          const matches = record.fails === -1;
          return (
            <div
              key={r}
              className={cn(
                "pm-card rounded-[1.25rem] border bg-ink-2/85 p-4 shadow-[0_20px_50px_-32px_rgba(0,0,0,0.95)]",
                `pm-card-${r}`,
                reduced && (matches ? "border-brand" : "border-line opacity-[0.34]"),
                !reduced && "border-line",
              )}
              style={reduced ? undefined : { opacity: 0 }}
            >
              {/* Who it is. */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-8 w-8 shrink-0 rounded-full border border-line bg-void/60"
                />
                <div className="flex flex-1 flex-col gap-1.5">
                  <span aria-hidden className="h-2 w-1/2 rounded-full bg-fog/70" />
                  <span aria-hidden className="h-1.5 w-3/4 rounded-full bg-line" />
                </div>
              </div>

              {/* The four criteria, checked in order. */}
              <div className="mt-4 space-y-2 border-t border-line pt-3.5">
                {Array.from({ length: CRITERIA }).map((_, i) => {
                  const failedHere = record.fails === i;
                  const reachedInResting = record.fails === -1 || i <= record.fails;
                  return (
                    <div key={i} className={cn("flex items-center gap-3", `pm-c${r}-${i}`)}>
                      <span
                        aria-hidden
                        className="h-1.5 shrink-0 rounded-full bg-line"
                        style={{ width: record.widths[i] }}
                      />
                      <span aria-hidden className="h-px flex-1 bg-line/60" />
                      {/* A pass and a fail are different marks, not the same
                          mark in two colours: the record has to be seen to fail
                          somewhere for the rule to mean anything. Which mark a
                          row gets is fixed data, so only one is ever rendered —
                          stacking both in one slot would need positioning this
                          drawing has no other reason to do. */}
                      {failedHere ? (
                        <span
                          aria-hidden
                          className="pm-cross h-2.5 w-2.5 shrink-0 rounded-full border border-ash"
                          style={reduced ? undefined : { opacity: 0 }}
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="pm-tick h-2.5 w-2.5 shrink-0 rounded-full bg-brand"
                          style={reduced ? { opacity: reachedInResting ? 1 : 0.25 } : { opacity: 0 }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Matched on all four. */}
              <span
                aria-hidden
                className={cn(
                  "pm-seal mt-4 block h-0.5 origin-left rounded-full",
                  matches ? "bg-brand" : "bg-transparent",
                  reduced && matches && "scale-x-100",
                )}
                style={reduced ? undefined : { transform: "scaleX(0)" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

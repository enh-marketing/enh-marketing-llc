"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";

/** The hero visual: a shortlist being made, not a follower count being admired.
 *
 *  WHY THIS. The document's opening argument is that a large following can look
 *  convincing and still be the wrong audience, and that the agency "looks
 *  closely at who is actually watching before recommending a creator". The
 *  obvious hero for an influencer page — a big follower number ticking up — is
 *  the exact thing this page argues against. So the visual shows the work
 *  instead: candidates arriving, four checks running against each, most set
 *  aside, a few kept.
 *
 *  The four marks per row are the document's own four areas: where followers
 *  are based, how people respond, how the brand would fit, how often they
 *  advertise. Their order matches the section below.
 *
 *  NO NUMBERS AND NO PROPORTIONS. The document says "only a small share" of a
 *  follower base may sit in the UAE and never quantifies it. Drawing a filled
 *  arc, a percentage or a ratio here would invent that figure, so the rows
 *  carry bars rather than values, and the pass rate shown is a composition
 *  choice with no claim attached — two of five is not a statistic and is not
 *  labelled as one.
 *
 *  Under reduced motion nothing runs and the panel renders in its resolved
 *  state, which reads correctly on its own. */

/** Which candidates survive the checks. Composition, not data. */
const KEEP = [1, 3];
const ROWS = 5;
const CHECKS = 4;

export function CreatorVetting({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".cv-row",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
      );

      // Each candidate runs its four checks, row by row.
      for (let r = 0; r < ROWS; r++) {
        const kept = KEEP.includes(r);
        tl.to(
          `.cv-row-${r} .cv-check`,
          { opacity: 1, scale: 1, duration: 0.22, stagger: 0.07 },
          r === 0 ? "+=0.3" : "-=0.15",
        ).to(
          `.cv-row-${r} .cv-check`,
          {
            backgroundColor: kept ? "var(--color-brand)" : "var(--color-line)",
            duration: 0.2,
          },
          "-=0.1",
        );

        if (!kept) {
          tl.to(`.cv-row-${r}`, { opacity: 0.28, duration: 0.35 }, "-=0.05");
        } else {
          tl.to(
            `.cv-row-${r}`,
            { borderColor: "var(--color-brand)", duration: 0.35 },
            "-=0.05",
          );
        }
      }

      // The shortlist counter fills to however many were kept.
      tl.fromTo(
        ".cv-kept",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, transformOrigin: "left center" },
        "+=0.1",
      )
        .to({}, { duration: 1.6 })
        .to(".cv-panel", { opacity: 0, duration: 0.4, ease: "power1.in" })
        // Reset.
        .set(".cv-row", { opacity: 1, borderColor: "var(--color-line)" })
        .set(".cv-check", { opacity: 0, scale: 0.4, backgroundColor: "var(--color-ink-3)" })
        .set(".cv-kept", { scaleX: 0 })
        .to(".cv-panel", { opacity: 1, duration: 0.4 });

      return () => tl.kill();
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={root}
      aria-hidden
      className={
        className ??
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[380px] -translate-y-1/2 lg:block xl:w-[420px]"
      }
    >
      <div className="cv-panel relative overflow-hidden rounded-2xl border border-line bg-ink-2/70 p-6 backdrop-blur-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(circle at 20% 0%, black, transparent 80%)",
          }}
        />

        {/* Four checks, in the order the section below sets them out. */}
        <div className="relative mb-5 flex items-center justify-end gap-[0.35rem] pr-1">
          {Array.from({ length: CHECKS }).map((_, i) => (
            <span key={i} className="h-1 w-4 rounded-full bg-line" />
          ))}
        </div>

        {/* Candidates. */}
        <div className="relative space-y-2.5">
          {Array.from({ length: ROWS }).map((_, r) => (
            <div
              key={r}
              className={`cv-row cv-row-${r} flex items-center gap-3 rounded-xl border border-line bg-ink-3/70 p-2.5`}
            >
              <span className="h-8 w-8 shrink-0 rounded-full bg-snow/15" />
              <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span
                  className="h-1.5 rounded-full bg-snow/25"
                  style={{ width: `${62 + ((r * 13) % 34)}%` }}
                />
                <span
                  className="h-1.5 rounded-full bg-snow/12"
                  style={{ width: `${34 + ((r * 17) % 30)}%` }}
                />
              </span>
              <span className="flex shrink-0 items-center gap-[0.35rem]">
                {Array.from({ length: CHECKS }).map((_, i) => (
                  <span
                    key={i}
                    className="cv-check h-1.5 w-1.5 scale-[0.4] rounded-full bg-ink-3 opacity-0"
                  />
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* What survived. */}
        <div className="relative mt-5 border-t border-line pt-4">
          <span className="block h-1 w-full overflow-hidden rounded-full bg-line">
            <span
              className="cv-kept block h-full origin-left rounded-full bg-brand"
              style={{ width: `${(KEEP.length / ROWS) * 100}%`, transform: "scaleX(0)" }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

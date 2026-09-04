"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** The hero visual: a defined area, and the Snaps inside it carrying a brand.
 *
 *  WHY THIS. The document argues that geofilters are the reason to look at
 *  Snapchat at all: "A geofilter attaches your brand to a physical place and a
 *  moment in a way no other paid social format does... it puts your brand inside
 *  content people are already sending to each other." That is a format no other
 *  platform on this site has, so it is the thing worth drawing. Snaps inside the
 *  boundary pick up the overlay; the ones outside it do not.
 *
 *  NOT ONE WORD OF TEXT, and no brand marks: the overlay is a brand-coloured
 *  band, because putting a fake logo in it would be inventing a client's asset.
 *
 *  Motion is opacity and colour only. No positioning — that is where two
 *  earlier hero visuals on this site went silently wrong.
 *
 *  Under reduced motion the inside Snaps render already carrying the overlay. */

/** Snaps, and whether each falls inside the boundary. */
const SNAPS = [
  { x: 12, y: 14, inside: false },
  { x: 40, y: 26, inside: true },
  { x: 66, y: 18, inside: true },
  { x: 22, y: 52, inside: true },
  { x: 54, y: 58, inside: true },
  { x: 84, y: 66, inside: false },
  { x: 36, y: 80, inside: true },
];

export function GeoLens({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".gl-snap", { opacity: 0 })
        .set(".gl-overlay", { opacity: 0 })
        .set(".gl-fence", { opacity: 0 });

      // People are already sending Snaps.
      tl.to(".gl-snap", { opacity: 1, duration: 0.4, stagger: 0.08 })
        .to({}, { duration: 0.7 })
        // An area gets defined.
        .to(".gl-fence", { opacity: 1, duration: 0.5 })
        // And the ones inside it start carrying the brand.
        .to(".gl-overlay", { opacity: 1, duration: 0.35, stagger: 0.1 }, "+=0.2")
        .to({}, { duration: 2.1 })
        .to(".gl-snap, .gl-fence", { opacity: 0, duration: 0.45 });
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
      aria-label="Snaps across an area. The ones inside a defined boundary carry a brand overlay; the ones outside do not."
    >
      <div className="relative h-[26rem] overflow-hidden rounded-[1.5rem] border border-line bg-ink-2/80 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)]">
        {/* The ground it all sits on. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        {/* The area a geofilter covers. */}
        <span
          aria-hidden
          className={cn(
            "gl-fence absolute left-[16%] top-[16%] h-[62%] w-[62%] rounded-[2rem] border-2 border-dashed border-brand/55 bg-brand/[0.05]",
            reduced && "opacity-100",
          )}
          style={reduced ? undefined : { opacity: 0 }}
        />

        {/* Snaps people are already sending. */}
        {SNAPS.map((snap, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "gl-snap absolute flex h-[3.4rem] w-[2.1rem] flex-col justify-end overflow-hidden rounded-[6px] border bg-void/70 p-1",
              snap.inside ? "border-brand/50" : "border-line",
              reduced && "opacity-100",
            )}
            style={{
              left: `${snap.x}%`,
              top: `${snap.y}%`,
              ...(reduced ? {} : { opacity: 0 }),
            }}
          >
            <span className="h-1 w-3/4 rounded-full bg-fog/40" />
            {/* The overlay the user adds to their own Snap. */}
            {snap.inside && (
              <span
                className={cn("gl-overlay mt-1 h-1.5 w-full rounded-sm bg-brand", reduced && "opacity-100")}
                style={reduced ? undefined : { opacity: 0 }}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/** The hero visual: one shoot day, and the formats that come out of it.
 *
 *  WHY THIS. It is the document's own promise, stated twice: "One well-planned
 *  day can supply months of posts", and photography, design and copy are
 *  produced alongside the filming "so a single day supplies more than one
 *  format". So the drawing is one source and the things taken from it — a
 *  vertical video, photographs, a carousel, written copy.
 *
 *  NO COUNTS. The outputs are shown as kinds, not quantities: the document
 *  refuses to name a monthly number anywhere ("There is no monthly number that
 *  suits every brand"), so nothing here implies one.
 *
 *  NOT ONE WORD OF TEXT. Motion is opacity and scaleX only. */
export function OneShoot({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

      tl.set(".os-day", { opacity: 0 })
        .set(".os-stem", { scaleY: 0 })
        .set(".os-out", { opacity: 0 });

      // One day.
      tl.to(".os-day", { opacity: 1, duration: 0.45 })
        .to(".os-stem", { scaleY: 1, duration: 0.4 }, "+=0.35")
        // And what comes out of it.
        .to(".os-out", { opacity: 1, duration: 0.4, stagger: 0.12 }, "-=0.1")
        .to({}, { duration: 2.2 })
        .to(".os-day, .os-out", { opacity: 0, duration: 0.45 })
        .to(".os-stem", { scaleY: 0, duration: 0.3 }, "<");
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  const out = (children: React.ReactNode, className?: string) => (
    <span
      className={cn(
        "os-out flex flex-col justify-end rounded-lg border border-brand/45 bg-brand/[0.07] p-2",
        className,
        reduced && "opacity-100",
      )}
      style={reduced ? undefined : { opacity: 0 }}
    >
      {children}
    </span>
  );

  return (
    <div
      ref={root}
      className={cn(
        // The house placement for a hero visual, matching AnswerStream,
        // ProfileGrid and StorefrontPreview: right gutter, centred, out of the
        // flow, not rendered below the large breakpoint.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
        className,
      )}
      role="img"
      aria-label="One shoot day, and the video, photography, carousel and written copy produced from it."
    >
      <div className="rounded-[1.5rem] border border-line bg-ink-2/80 p-7 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)]">
        {/* The day. */}
        <div
          aria-hidden
          className={cn(
            "os-day flex items-center gap-3 rounded-xl border-2 border-brand/50 bg-brand/[0.07] p-5",
            reduced && "opacity-100",
          )}
          style={reduced ? undefined : { opacity: 0 }}
        >
          <span className="h-9 w-9 shrink-0 rounded-lg border border-brand/60 bg-brand/15" />
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="h-2 w-2/3 rounded-full bg-brand/60" />
            <span className="h-1.5 w-1/2 rounded-full bg-line" />
          </span>
        </div>

        {/* What comes out of it. */}
        <svg aria-hidden viewBox="0 0 100 26" preserveAspectRatio="none" className="h-8 w-full">
          <line x1="50" y1="0" x2="50" y2="10" stroke="var(--color-line)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <line x1="13" y1="10" x2="87" y2="10" stroke="var(--color-line)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          {[13, 38, 62, 87].map((x) => (
            <line
              key={x}
              className="os-stem origin-top"
              x1={x}
              y1="10"
              x2={x}
              y2="26"
              stroke="var(--color-brand)"
              strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
              style={reduced ? undefined : { transform: "scaleY(0)" }}
            />
          ))}
        </svg>

        <div aria-hidden className="grid grid-cols-4 gap-2.5">
          {/* Vertical video. */}
          {out(
            <>
              <span className="h-1 w-full rounded-full bg-brand/50" />
              <span className="mt-1 h-1 w-2/3 rounded-full bg-brand/30" />
            </>,
            "h-40",
          )}
          {/* Photography. */}
          {out(
            <span className="mx-auto h-5 w-5 rounded-full border border-brand/60" />,
            "h-40 justify-center",
          )}
          {/* A carousel. */}
          {out(
            <span className="flex gap-1">
              {[0, 1, 2].map((k) => (
                <span key={k} className="h-1.5 flex-1 rounded-full bg-brand/50" />
              ))}
            </span>,
            "h-40",
          )}
          {/* Written copy. */}
          {out(
            <span className="flex flex-col gap-1">
              {["100%", "78%", "88%"].map((w, k) => (
                <span key={k} className="h-[3px] rounded-full bg-brand/40" style={{ width: w }} />
              ))}
            </span>,
            "h-40",
          )}
        </div>
      </div>
    </div>
  );
}

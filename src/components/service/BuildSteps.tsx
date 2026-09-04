"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type BuildStep = { no: string; title: string; body: string };

/** The seven stages of a dashboard project, drawn as the schedule they are.
 *
 *  WHY THIS SHAPE. This is the only section on the page about time. The
 *  document's last step begins "After launch", which makes the sixth step a
 *  boundary and the seventh open-ended: monitoring and support do not finish.
 *  A schedule says all of that at a glance, so each stage carries a bar on one
 *  shared scale, the bars step across the page in order, a launch line marks
 *  the boundary, and the last bar is dashed and runs off the end.
 *
 *  NOT AN ANNOTATED DRAWING. The section above this one is a plate: one object
 *  with its parts named. Two sections running the same arrangement, a pinned
 *  drawing beside a list, was the first build's mistake here; a schedule and a
 *  plate are different devices and now read as different sections.
 *
 *  NO DURATIONS. The bars mark order and overlap, not weeks. The document
 *  gives no timings and the page invents none, so the scale carries no units.
 *
 *  Below the large breakpoint the bars are dropped and the seven read as a
 *  numbered list, which is where the content lives. */

const N = 7;

export function BuildSteps({ items, launchLabel }: { items: BuildStep[]; launchLabel: string }) {
  const root = useRef<HTMLDivElement>(null);
  /** Whether the reader has passed the launch boundary. The label and its rule
   *  answer to this, which is the one moment in the schedule that matters. */
  const [past, setPast] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ scrub: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.scrub) return;
      const q = gsap.utils.selector(el);
      const rows = q("[data-row]");
      // 0.55 is the site's reveal floor: a stage not yet reached is dimmed,
      // never hidden. The bars are never scaled from zero — a schedule with
      // invisible bars is not a schedule.
      gsap.set(rows, { opacity: 0.55, x: -10 });
      const fill = q("[data-scale-fill]")[0];
      const walker = q("[data-walker]")[0];
      if (fill) gsap.set(fill, { scaleX: 0 });
      if (walker) gsap.set(walker, { left: 0, xPercent: -50 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 68%",
          end: "bottom 80%",
          scrub: 0.7,
          // The launch boundary is the one event in this schedule, so the
          // label answers to the reader crossing it rather than to a timer.
          onUpdate: (self) => {
            const p = self.progress >= (N - 1) / N;
            setPast((prev) => (prev === p ? prev : p));
          },
        },
      });
      // The scale fills and a marker walks it, so the rows are not the only
      // thing that moves as the reader descends.
      if (fill) tl.to(fill, { scaleX: 1, duration: 1, ease: "none" }, 0);
      if (walker) tl.to(walker, { left: "100%", duration: 1, ease: "none" }, 0);
      rows.forEach((r, i) => {
        tl.to(r, { opacity: 1, x: 0, duration: 0.6 / rows.length, ease: "power2.out" }, i / rows.length);
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([rows, fill, walker].flat().filter(Boolean), { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  // Where the launch boundary falls: after the sixth of seven stages.
  const launchAt = ((N - 1) / N) * 100;

  return (
    <div ref={root}>
      {/* The scale every bar is measured against, and the launch boundary. */}
      <div aria-hidden className="mb-5 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
        <span />
        <div className="relative h-6">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          <span data-scale-fill className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-brand/60" />
          <span data-walker className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-brand bg-ink" />
          {/* A packet running the whole track, so the scale is alive. */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 6">
            <path d="M0 3 H100" pathLength="100" stroke="var(--color-brand)" strokeWidth="1" strokeLinecap="butt" fill="none" className="ci-flow" style={{ animationDuration: "5.5s" }} />
          </svg>
          {Array.from({ length: N + 1 }, (_, i) => (
            <span key={i} className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-line" style={{ left: `${(i / N) * 100}%` }} />
          ))}
          {/* Launch: the document's own word, and the point its last step
              begins after. */}
          <span
            className={cn("absolute inset-y-0 w-px transition-colors duration-500 motion-reduce:transition-none", past ? "bg-brand" : "bg-line")}
            style={{ left: `${launchAt}%` }}
          />
          <span
            className={cn(
              "font-display absolute -top-1 -translate-x-full whitespace-nowrap pr-2 text-[0.6875rem] font-semibold uppercase leading-none transition-colors duration-500 motion-reduce:transition-none",
              past ? "text-brand-text" : "text-ash",
            )}
            style={{ left: `${launchAt}%` }}
          >
            {launchLabel}
          </span>
        </div>
      </div>

      <ol className="space-y-4">
        {items.map((s, i) => {
          const last = i === items.length - 1;
          return (
            <li
              key={s.no}
              data-row
              className="group grid gap-6 rounded-[1.5rem] border border-line bg-ink-3 p-6 transition-colors duration-500 hover:border-ash/50 motion-reduce:transition-none sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12"
            >
              <div className="flex items-baseline gap-5">
                <span aria-hidden className={cn("font-display text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-none tabular-nums transition-colors duration-500", last ? "text-brand" : "text-stroke group-hover:text-brand-text")}>
                  {s.no}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.05rem,1.7vw,1.35rem)] font-extrabold uppercase leading-[1.14] text-snow">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-fog">{s.body}</p>
                </div>
              </div>

              {/* This stage's place on the shared scale. */}
              <div aria-hidden className="relative hidden h-3 lg:block">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line opacity-60" />
                {Array.from({ length: N + 1 }, (_, t) => (
                  <span key={t} className="absolute top-1/2 h-1.5 w-px -translate-y-1/2 bg-line" style={{ left: `${(t / N) * 100}%` }} />
                ))}
                <span className="absolute inset-y-0 w-px bg-brand/40" style={{ left: `${launchAt}%` }} />
                <span
                  className={cn(
                    "absolute top-1/2 h-2.5 -translate-y-1/2 transition-[height] duration-500 group-hover:h-4 motion-reduce:transition-none motion-reduce:group-hover:h-2.5",
                    // The last stage has no end. A bar that fades off the right
                    // of the scale says "continues" without inventing a date;
                    // a dashed box would read as a placeholder.
                    last ? "rounded-l-full bg-gradient-to-r from-brand via-brand to-transparent" : "rounded-full bg-brand",
                  )}
                  style={{
                    left: `${(i / N) * 100}%`,
                    width: last ? `${100 - (i / N) * 100}%` : `${(1 / N) * 100 + 2}%`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

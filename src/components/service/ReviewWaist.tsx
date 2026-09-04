"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type ReviewStage = { no: string; title: string; body: string };

/** Five review stages, drawn as the shape the material takes.
 *
 *  WHY THIS SHAPE. The document describes a funnel and then a fan. "Several
 *  internal versions may be tested before one is selected" narrows; the edit
 *  and the brand check narrow further; then "the approved concept is adapted
 *  into the formats, hooks, languages and calls to action included in the
 *  scope" opens back out. So the measure of the section narrows stage by stage
 *  to a waist at the brand check, then flares to full width as the variants.
 *  The outline of the layout is the argument, before a word is read.
 *
 *  NOT FIVE CARDS IN A ROW. The registers share their edges: no gaps, no
 *  radii, no per-item borders. Only the outer contour is drawn, and it pinches.
 *  One stage per row, so the numbers can only read 01 to 05 downward.
 *
 *  Below the large breakpoint the measure cannot narrow usefully, so the
 *  contour becomes an indent: each register steps in from the left by the same
 *  rhythm and steps back out at the last, which keeps the waist legible. */

/** How wide each register is, as a percentage of the measure. The last opens
 *  back to full width because that stage is the one that multiplies. */
const WIDTH = [100, 86, 72, 58, 100];

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

/** The three splayed plates the last register ends in: the same approved frame
 *  in three proportions. Nothing is written on them. */
function FormatPlates() {
  return (
    <div aria-hidden className="flex items-end justify-center gap-5 sm:gap-8">
      {[
        { w: 78, h: 118, tilt: -3 },
        { w: 132, h: 106, tilt: 0 },
        { w: 68, h: 122, tilt: 3 },
      ].map((p, i) => (
        <span
          key={i}
          className="relative block shrink-0 rounded-[0.35rem] border border-line bg-ink-3"
          style={{ width: p.w, height: p.h, transform: `rotate(${p.tilt}deg)` }}
        >
          <span className="absolute inset-x-3 top-3 block h-[38%] rounded-[2px] bg-fog/30" />
          <span className="absolute inset-x-3 bottom-6 block h-[3px] rounded-full bg-snow/70" />
          <span
            className="ci-grow-x absolute bottom-3 left-3 block h-[3px] origin-left rounded-full bg-brand"
            style={{ width: `${[42, 60, 34][i]}%`, animationDelay: `${i * 260}ms` }}
          />
        </span>
      ))}
    </div>
  );
}

/** What each register holds beside its copy: the material at that stage. Each
 *  is a different act, so each is a different mark. */
function Matter({ stage }: { stage: number }) {
  if (stage === 0) {
    // References collected, and one direction agreed among them.
    return (
      <svg viewBox="0 0 200 74" aria-hidden className="block w-full max-w-[220px] text-fog">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={4 + i * 50} y={i === 1 ? 6 : 14} width="42" height="34" rx="3" {...S} strokeWidth="1.1" opacity={i === 1 ? 1 : 0.55} className={i === 1 ? "text-brand" : undefined} />
        ))}
        <path d="M4 62 H 196" {...S} className="text-line" />
        <circle cx="75" cy="62" r="3.4" fill="var(--color-brand)" className="glyph-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </svg>
    );
  }
  if (stage === 1) {
    // Several internal versions, one of them rough.
    return (
      <svg viewBox="0 0 200 74" aria-hidden className="block w-full max-w-[220px] text-fog">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`rotate(${i === 1 ? -4 : i === 2 ? 3 : 0} ${34 + i * 62} 38)`}>
            <rect x={8 + i * 62} y="10" width="52" height="56" rx="3" {...S} strokeWidth="1.1" opacity="0.7" />
            <rect x={16 + i * 62} y="20" width="36" height="24" rx="2" fill="currentColor" opacity="0.3" className="ci-twinkle" style={{ animationDelay: `${i * 320}ms` }} />
            <rect x={16 + i * 62} y="52" width={[28, 20, 32][i]} height="2.6" rx="1.3" fill="currentColor" opacity="0.4" />
          </g>
        ))}
      </svg>
    );
  }
  if (stage === 2) {
    // Edited: continuity restored along one cut.
    return (
      <svg viewBox="0 0 200 74" aria-hidden className="block w-full max-w-[220px] text-fog">
        <path d="M6 24 H 194" {...S} className="text-line" />
        <path d="M6 24 H 194" pathLength="100" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" fill="none" className="ci-flow" style={{ animationDuration: "3s" }} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={6 + i * 32} y="34" width="28" height="26" rx="2" {...S} strokeWidth="1.1" opacity={i === 3 ? 1 : 0.5} className={i === 3 ? "text-brand" : undefined} />
        ))}
      </svg>
    );
  }
  if (stage === 3) {
    // The brand's marks, checked one by one. The waist.
    return (
      <svg viewBox="0 0 200 74" aria-hidden className="block w-full max-w-[220px] text-fog">
        {[8, 32, 56].map((y, i) => (
          <g key={y}>
            <rect x="6" y={y} width="140" height="16" rx="3" {...S} strokeWidth="1.1" opacity="0.7" />
            <rect x="14" y={y + 6} width={[86, 54, 104][i]} height="3.4" rx="1.7" fill="currentColor" opacity="0.45" />
            <circle cx="168" cy={y + 8} r="7" fill="var(--color-brand)" className="ci-twinkle" style={{ animationDelay: `${i * 380}ms` }} />
            <path d={`M164.6 ${y + 8} l2.2 2.2 l4 -4.4`} fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </svg>
    );
  }
  return null;
}

export function ReviewWaist({ items }: { items: ReviewStage[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const rows = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-register]"));
      gsap.set(rows, { opacity: 0.55 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 82%", scrub: 0.7 } });
      rows.forEach((r, i) => tl.to(r, { opacity: 1, duration: 0.6 / rows.length, ease: "none" }, i / rows.length));
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(rows, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root}>
      <ol>
        {items.map((s, i) => {
          const w = WIDTH[i] ?? 100;
          const last = i === items.length - 1;
          const prev = WIDTH[i - 1] ?? w;
          return (
            <li
              key={s.no}
              data-register
              className={cn(
                "group relative mx-auto border-x border-line px-6 py-9 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none sm:px-10",
                i === 0 && "border-t",
                last && "border-b",
                // Below lg the measure cannot narrow, so the contour becomes an
                // indent that pinches and reopens on the same rhythm.
                "ml-[var(--indent)] w-[calc(100%-var(--indent))] lg:ml-auto lg:mr-auto",
              )}
              style={
                {
                  "--indent": `${(100 - w) / 3}%`,
                  width: undefined,
                  maxWidth: `${w}%`,
                } as React.CSSProperties
              }
            >
              {/* The shoulders. Without them the registers read as separate
                  boxes instead of one contour that pinches: at every step a
                  short rule runs out to where the register above ended. */}
              {i > 0 && prev !== w && (
                <>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-px hidden h-px bg-line lg:block"
                    style={
                      w < prev
                        ? { left: `${-((prev - w) / 2 / w) * 100}%`, width: `${((prev - w) / 2 / w) * 100}%` }
                        : { left: 0, width: `${((w - prev) / 2 / w) * 100}%` }
                    }
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-px hidden h-px bg-line lg:block"
                    style={
                      w < prev
                        ? { right: `${-((prev - w) / 2 / w) * 100}%`, width: `${((prev - w) / 2 / w) * 100}%` }
                        : { right: 0, width: `${((w - prev) / 2 / w) * 100}%` }
                    }
                  />
                </>
              )}

              <div className={cn(last ? "lg:block" : "lg:flex lg:items-center lg:gap-12")}>
                <div className={cn(last && "lg:mx-auto lg:max-w-3xl lg:text-center")}>
                  <p className="font-display text-[0.6875rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text">{s.no}</p>
                  <h3 className="font-display mt-2 text-[clamp(1.1rem,1.8vw,1.45rem)] font-extrabold uppercase leading-[1.14] text-snow">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-fog">{s.body}</p>
                </div>
                <div className={cn("transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100", last ? "mt-9 lg:mt-10" : "mt-7 lg:mt-0 lg:shrink-0")}>
                  {last ? <FormatPlates /> : <Matter stage={i} />}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ReviewStage = { no: string; title: string; body: string };

/** Five review stages, as five frames on one strip.
 *
 *  WHY A FILMSTRIP. Each stage changes what is in the frame: a direction is a
 *  board of references; the initial version is rough; the edit is clean; the
 *  check is the brand's marks ticked off; the final variants are several
 *  frames at once. Drawing the five as consecutive frames on a strip shows the
 *  material improving stage by stage, which is the section's claim, without a
 *  single before-and-after photograph, which the document reserves for real,
 *  approved work.
 *
 *  A playhead runs the strip on a loop. Below the large breakpoint the frames
 *  stack with their text; numbers ascend either way. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 120 84" aria-hidden className="block w-full text-fog">
      <rect x="4" y="4" width="112" height="76" rx="4" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {children}
    </svg>
  );
}

const FRAMES: (() => ReactNode)[] = [
  // 01 Direction: references on a board.
  () => (
    <>
      {[[14, 14], [50, 14], [86, 14]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="22" height="18" rx="2" fill="var(--color-fog)" opacity={0.25 + i * 0.12} />
      ))}
      <rect x="14" y="40" width="60" height="3" rx="1.5" fill="var(--color-snow)" opacity="0.7" />
      <rect x="14" y="48" width="40" height="2.4" rx="1.2" fill="var(--color-fog)" opacity="0.5" />
      {[14, 26, 38].map((x, i) => <circle key={x} cx={x + 4} cy="66" r="4" fill={i === 0 ? "var(--color-brand)" : "var(--color-fog)"} opacity={i === 0 ? 0.9 : 0.5} className="ci-twinkle" style={{ animationDelay: `${i * 420}ms` }} />)}
      <rect x="60" y="60" width="46" height="12" rx="3" {...S} className="text-brand" />
    </>
  ),
  // 02 Initial version: a rough frame, one block out of true.
  () => (
    <>
      <rect x="16" y="14" width="88" height="46" rx="3" fill="var(--color-fog)" opacity="0.22" />
      <rect x="40" y="26" width="34" height="26" rx="2" fill="var(--color-fog)" opacity="0.45" transform="rotate(-6 57 39)" className="ci-twinkle" />
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={20 + ((i * 37) % 80)} cy={16 + ((i * 23) % 40)} r="0.9" fill="var(--color-fog)" opacity="0.6" />
      ))}
      <rect x="16" y="66" width="52" height="2.6" rx="1.3" fill="var(--color-fog)" opacity="0.5" transform="rotate(2 42 67)" />
    </>
  ),
  // 03 Edited: the same frame, clean and in register.
  () => (
    <>
      <rect x="16" y="14" width="88" height="46" rx="3" fill="var(--color-fog)" opacity="0.28" />
      <rect x="43" y="26" width="34" height="26" rx="2" fill="var(--color-fog)" opacity="0.55" />
      <rect x="16" y="66" width="52" height="2.6" rx="1.3" fill="var(--color-snow)" opacity="0.8" />
      <rect x="16" y="72" width="30" height="2.2" rx="1.1" fill="var(--color-fog)" opacity="0.5" />
      <path d="M92 70 h12" {...S} pathLength="100" className="ci-draw text-brand" />
    </>
  ),
  // 04 Checked: logo, palette, product detail, each ticked.
  () => (
    <>
      {/* The brand's marks: a logo, a palette, a product detail, each ticked. */}
      {[14, 36, 58].map((y, i) => (
        <g key={y}>
          <rect x="14" y={y} width="70" height="14" rx="3" {...S} />
          {i === 0 && <rect x="20" y={y + 4} width="18" height="6" rx="1.5" fill="var(--color-brand)" />}
          {i === 1 && [20, 30, 40, 50].map((cx) => <circle key={cx} cx={cx + 4} cy={y + 7} r="3" fill="var(--color-fog)" opacity="0.6" />)}
          {i === 2 && <rect x="20" y={y + 5} width="44" height="4" rx="2" fill="var(--color-fog)" opacity="0.5" />}
          <circle cx="98" cy={y + 7} r="6" fill="var(--color-brand)" className="ci-twinkle" style={{ animationDelay: `${i * 400}ms` }} />
          <path d={`M95.4 ${y + 7} l1.8 1.8 l3.4 -3.8`} fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
    </>
  ),
  // 05 Variants: the approved frame in three formats.
  () => (
    <>
      <rect x="12" y="14" width="26" height="46" rx="3" {...S} />
      <rect x="46" y="20" width="34" height="34" rx="3" {...S} />
      <rect x="88" y="16" width="22" height="42" rx="3" {...S} className="text-brand" />
      {[[16, 20, 18, 22], [50, 24, 26, 16], [92, 20, 14, 24]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" fill="var(--color-fog)" opacity="0.45" className="ci-grow" style={{ animationDelay: `${i * 300}ms`, transformOrigin: "bottom" }} />
      ))}
      <rect x="12" y="66" width="98" height="2.4" rx="1.2" fill="var(--color-snow)" opacity="0.7" />
      <rect x="12" y="72" width="60" height="2" rx="1" fill="var(--color-brand)" />
    </>
  ),
];

export function ReviewStrip({ items }: { items: ReviewStage[] }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const cells = gsap.utils.selector(el)("[data-frame]");
      gsap.set(cells, { opacity: 0.55, y: 16 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 78%", scrub: 0.7 } });
      tl.to(cells, { opacity: 1, y: 0, duration: 0.24, stagger: 0.14, ease: "power2.out" }, 0);
      return () => { tl.scrollTrigger?.kill(); tl.kill(); gsap.set(cells, { clearProps: "all" }); };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root}>
      {/* The strip's rail and its playhead. Desktop only; the frames carry the
          content on their own below lg. */}
      <div aria-hidden className="relative mb-6 hidden h-4 lg:block">
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
          {Array.from({ length: 24 }).map((_, i) => <span key={i} className="h-2 w-3 rounded-[2px] border border-line bg-ink-2" />)}
        </div>
        <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 10">
          <path d="M0 5 H100" pathLength="100" stroke="var(--color-brand)" strokeWidth="1.3" strokeLinecap="butt" fill="none" className="ci-flow" style={{ animationDuration: "6s" }} />
        </svg>
      </div>

      <ol className="grid gap-5 lg:grid-cols-5">
        {items.map((s, i) => {
          const Draw = FRAMES[i] ?? FRAMES[FRAMES.length - 1];
          return (
            <li key={s.no} data-frame className="flex flex-col rounded-[1.25rem] border border-line bg-ink-3 p-5 sm:p-6">
              <div className="rounded-lg border border-line bg-ink-2 p-2"><Frame>{Draw()}</Frame></div>
              <p className="font-display mt-6 text-[0.6875rem] font-bold tabular-nums text-brand-text">{s.no}</p>
              <h3 className="font-display mt-1.5 text-[clamp(1rem,1.3vw,1.15rem)] font-extrabold uppercase leading-[1.16] text-snow">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-fog">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

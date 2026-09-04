"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

gsap.registerPlugin(ScrollTrigger);

export type StageItem = {
  no: string;
  title: string;
  body: string;
};

/** Seven services, staged on one canvas instead of listed down the page.
 *
 *  WHY THIS SHAPE. Everything in this section happens to one thing: a question
 *  is asked, and whether your brand is in the answer depends on a chain of
 *  conditions that all act on the same web presence. Listing them puts seven
 *  separate boxes on the page and throws that away. So the section holds still
 *  and the subject changes: one scene is drawn once, the reader stays in place,
 *  and each service brings its own part of the scene forward while the rest
 *  stays visible behind it.
 *
 *  THE READER DOES NOT SCROLL PAST SEVEN THINGS. They scroll through one thing
 *  seven times. The copy sits over the canvas, the step rail across the foot
 *  says where they are, and the scene accumulates: by the last step the whole
 *  system is drawn and the question is being asked again.
 *
 *  Nothing is hidden from a machine or from a reader who cannot use the
 *  pinning: every one of the seven paragraphs is in the DOM in document order,
 *  and under prefers-reduced-motion, or below the large breakpoint, the section
 *  falls back to the same seven in normal flow with the scene above them. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, vectorEffect: "non-scaling-stroke" as const };

/** Where each service lives on the scene, in the scene's own units. The frame
 *  travels between these as the reader advances; the drawing itself is never
 *  dimmed, because a scene at a fifth of its contrast just looks unfinished. */
const FOCUS = [
  { x: 12, y: 24, w: 340, h: 316 },   // 01 the questions, asked across platforms
  { x: 336, y: 56, w: 92, h: 348 },   // 02 the way in
  { x: 434, y: 54, w: 272, h: 168 },  // 03 the answer on the page
  { x: 434, y: 272, w: 520, h: 128 }, // 04 the record, here and elsewhere
  { x: 434, y: 96, w: 272, h: 168 },  // 05 the markup over the page
  { x: 762, y: 20, w: 226, h: 176 },  // 06 what the rest of the web says
  { x: 12, y: 24, w: 340, h: 316 },   // 07 the same questions, asked again
];

/* ------------------------------------------------------------- the scene */

/** One scene, drawn once. Every part is always present; the stage brings each
 *  forward in turn. The geometry is fixed so nothing jumps between steps.
 *
 *  Left: the questions being asked. Middle: the site they are asked about.
 *  Right: what the rest of the web says. Below: the answer that results. */
function Scene() {
  const qRows = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 1000 460" aria-hidden className="block h-full w-full text-fog">
      {/* ---------------------------------------- 01 the agreed questions */}
      <g data-part="0">
        {qRows.map((r) => (
          <g key={r}>
            <rect x="24" y={40 + r * 46} width="120" height="26" rx="13" {...S} strokeWidth="1.1" opacity="0.75" />
            <rect x="40" y={50 + r * 46} width={[76, 58, 88, 64, 80, 52][r]} height="5" rx="2.5" fill="currentColor" opacity="0.45" />
            <path d={`M144 ${53 + r * 46} H 214`} {...S} strokeDasharray="3 4" opacity="0.6" />
          </g>
        ))}
        {/* Recorded against each platform. */}
        {[0, 1, 2, 3].map((c) => (
          <g key={c}>
            {qRows.map((r) => (
              <rect
                key={r}
                x={228 + c * 26}
                y={44 + r * 46}
                width="18"
                height="18"
                rx="4"
                fill={(r + c) % 3 === 0 ? "var(--color-brand)" : "none"}
                stroke={(r + c) % 3 === 0 ? "none" : "var(--color-line)"}
                strokeWidth="1"
                opacity={(r + c) % 3 === 0 ? 0.9 : 1}
              />
            ))}
          </g>
        ))}
      </g>

      {/* ---------------------------------------------- 02 the way in */}
      <g data-part="1">
        {[0, 1, 2, 3].map((i) => {
          const y = 92 + i * 84;
          const open = i === 0 || i === 2;
          return (
            <g key={i}>
              <path d={`M352 ${y} H 404`} {...S} strokeDasharray="3 4" opacity="0.55" />
              {open ? (
                <>
                  <path d={`M404 ${y - 22} V ${y - 10}`} {...S} className="text-brand" />
                  <path d={`M404 ${y + 10} V ${y + 22}`} {...S} className="text-brand" />
                </>
              ) : (
                <>
                  <path d={`M404 ${y - 22} V ${y + 22}`} {...S} strokeWidth="3" opacity="0.7" />
                  <path d={`M370 ${y - 7} l14 14 M384 ${y - 7} l-14 14`} {...S} className="text-brand" />
                </>
              )}
            </g>
          );
        })}
      </g>

      {/* -------------------------------------------- the site itself */}
      <rect x="424" y="34" width="290" height="392" rx="8" fill="var(--color-ink-3)" stroke="var(--color-line)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />

      {/* ------------------------------------ 03 the answer on the page */}
      <g data-part="2">
        <rect x="452" y="70" width="204" height="10" rx="5" fill="var(--color-brand)" />
        {[100, 118, 136].map((y, i) => (
          <rect key={y} x="452" y={y} width={[234, 196, 218][i]} height="6" rx="3" fill="currentColor" opacity="0.38" />
        ))}
        {[0, 1, 2].map((c) => (
          <g key={c}>
            <rect x={452 + c * 82} y="164" width="70" height="44" rx="4" {...S} strokeWidth="1.1" opacity="0.6" />
            <rect x={462 + c * 82} y="178" width="42" height="4" rx="2" fill="currentColor" opacity="0.35" />
          </g>
        ))}
      </g>

      {/* -------------------------------- 05 the markup over the page */}
      <g data-part="4">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={452 + i * 66} y="232" width="52" height="22" rx="4" {...S} className="text-brand" strokeWidth="1.1" />
            <rect x={462 + i * 66} y="240" width="32" height="5" rx="2.5" fill="var(--color-brand)" opacity="0.7" />
            <path d={`M478 ${254} V ${[106, 124, 142, 172][i]}`} {...S} className="text-brand" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" transform={`translate(${i * 66} 0)`} />
          </g>
        ))}
      </g>

      {/* --------------------------- 04 the record, here and elsewhere */}
      <g data-part="3">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="452" y={288 + i * 26} width={[168, 132, 190, 112][i]} height="6" rx="3" fill="currentColor" opacity="0.5" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M714 ${291 + i * 26} H 792`} {...S} strokeDasharray="3 3" opacity={i === 2 ? 1 : 0.45} className={i === 2 ? "text-brand" : undefined} />
        ))}
        <rect x="792" y="278" width="150" height="112" rx="6" {...S} strokeDasharray="5 4" strokeWidth="1.2" opacity="0.85" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={810 + (i === 2 ? 16 : 0)}
            y={291 + i * 26}
            width={[112, 88, 74, 96][i]}
            height="6"
            rx="3"
            fill={i === 2 ? "var(--color-brand)" : "currentColor"}
            opacity={i === 2 ? 0.9 : 0.35}
          />
        ))}
      </g>

      {/* -------------------------- 06 what the rest of the web says */}
      <g data-part="5">
        {[
          { x: 782, y: 40, w: 96, h: 34, r: 5 },
          { x: 894, y: 34, w: 74, h: 42, r: 21 },
          { x: 776, y: 94, w: 118, h: 30, r: 5 },
          { x: 908, y: 96, w: 62, h: 30, r: 15 },
          { x: 800, y: 146, w: 104, h: 32, r: 5 },
        ].map((m, i) => (
          <g key={i}>
            <rect x={m.x} y={m.y} width={m.w} height={m.h} rx={m.r} {...S} strokeWidth="1.1" strokeDasharray={i % 2 ? "4 3" : undefined} opacity="0.8" />
            <rect x={m.x + 14} y={m.y + m.h / 2 - 3} width={m.w - 34} height="6" rx="3" fill="currentColor" opacity="0.4" />
            <path d={`M${m.x} ${m.y + m.h / 2} C ${m.x - 60} ${m.y + m.h / 2}, 760 200, 714 208`} {...S} strokeWidth="1" opacity="0.4" />
          </g>
        ))}
      </g>

      {/* The frame that says which part is being spoken about. */}
      <g data-focus opacity="0">
        <rect data-focus-box x="12" y="24" width="340" height="316" rx="6" fill="var(--color-brand)" opacity="0.05" />
        <rect data-focus-box x="12" y="24" width="340" height="316" rx="6" fill="none" stroke="var(--color-brand)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ stage */

export function VisibilityStage({ items }: { items: StageItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const still = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || still) return;
    const mm = gsap.matchMedia();
    mm.add({ stage: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.stage) return;
      const q = gsap.utils.selector(el);
      const blocks = q("[data-copy]");
      const boxes = q("[data-focus-box]");
      const frame = q("[data-focus]")[0];
      const ticks = q("[data-tick]");
      const n = blocks.length;
      if (!n) return;

      // The scene stays fully drawn throughout; only the frame moves.
      gsap.set(blocks, { opacity: 0, y: 18, pointerEvents: "none" });
      gsap.set(blocks[0], { opacity: 1, y: 0, pointerEvents: "auto" });
      if (frame) gsap.set(frame, { opacity: 1 });
      boxes.forEach((bx) => gsap.set(bx, { attr: FOCUS[0] }));
      gsap.set(blocks, { visibility: "visible" });
      gsap.set(ticks, { opacity: 0.35 });
      gsap.set(ticks[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.5 },
      });
      // The handover is a hard one: the outgoing paragraph is fully gone before
      // the next arrives, so stopping mid-scroll never leaves two sentences
      // printed over each other.
      const step = 1 / (n - 1);
      for (let i = 1; i < n; i += 1) {
        const at = (i - 1) * step;
        const out = step * 0.34;
        const gap = step * 0.1;
        tl.to(blocks[i - 1], { opacity: 0, y: -12, pointerEvents: "none", duration: out, ease: "power2.in" }, at)
          .to(ticks[i - 1], { opacity: 0.35, duration: out * 0.6, ease: "none" }, at)
          .to(boxes, { attr: FOCUS[i] ?? FOCUS[0], duration: out * 2 + gap, ease: "power2.inOut" }, at)
          .to(blocks[i], { opacity: 1, y: 0, pointerEvents: "auto", duration: out, ease: "power2.out" }, at + out + gap)
          .to(ticks[i], { opacity: 1, duration: out * 0.6, ease: "none" }, at + out + gap);
      }
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([...blocks, ...boxes, ...ticks], { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length, still]);

  /* Below the large breakpoint, and whenever motion is reduced, the stage
     cannot work: the seven run in normal flow instead, each with the scene's
     own part named by its number. */
  const Fallback = (
    <ol className="space-y-10 lg:hidden">
      {items.map((s) => (
        <li key={s.no} className="border-t border-line pt-6">
          <p className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">{s.no}</p>
          <h3 className="font-display mt-2 text-xl font-extrabold uppercase leading-[1.14] text-snow">{s.title}</h3>
          <p className="mt-3 leading-relaxed text-fog">{s.body}</p>
        </li>
      ))}
    </ol>
  );

  if (still) {
    return (
      <div>
        <div className="mb-10 hidden rounded-[1.5rem] border border-line bg-ink-2 p-6 lg:block">
          <div className="h-[420px]">
            <Scene />
          </div>
        </div>
        <ol className="space-y-10">
          {items.map((s) => (
            <li key={s.no} className="border-t border-line pt-6">
              <p className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">{s.no}</p>
              <h3 className="font-display mt-2 text-xl font-extrabold uppercase leading-[1.14] text-snow">{s.title}</h3>
              <p className="mt-3 max-w-3xl leading-relaxed text-fog">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <>
      {/* The stage. Its height is the scroll the seven steps consume. */}
      <div ref={root} className="relative hidden lg:block" style={{ height: `${items.length * 62}vh` }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center">
          <div className="relative">
            {/* The scene, drawn once, filling the frame. */}
            <div className="relative h-[min(58vh,470px)] w-full">
              <Scene />
            </div>

            {/* The copy, over the scene at its foot. All seven are in the DOM
                in document order; the stage says which is being spoken. */}
            <div className="pointer-events-none relative mt-8 h-[13.5rem]">
              {items.map((s) => (
                <article
                  key={s.no}
                  data-copy
                  className="absolute inset-x-0 top-0 max-w-2xl"
                >
                  <p className="font-display text-[0.6875rem] font-bold tabular-nums text-brand-text">{s.no}</p>
                  <h3 className="font-display mt-2 text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold uppercase leading-[1.1] text-snow">
                    {s.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-fog">{s.body}</p>
                </article>
              ))}
            </div>

            {/* Where the reader is, across the foot. */}
            <div aria-hidden className="absolute bottom-1 right-0 flex items-end gap-5">
              {items.map((s) => (
                <span key={s.no} data-tick className="flex flex-col items-center gap-2.5">
                  <span className="font-display text-[0.8125rem] font-bold tabular-nums text-brand-text">{s.no}</span>
                  <span className="block h-12 w-0.5 bg-brand" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {Fallback}
    </>
  );
}

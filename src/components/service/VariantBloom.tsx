"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** Campaign volume: one approved direction becoming a field.
 *
 *  THE SECTION'S OWN SENTENCE IS THE DRAWING. "One approved direction can be
 *  adapted into different hooks, formats, audiences and platform placements."
 *  Four dimensions, and dimensions multiply — which is the whole reason the
 *  word "volume" is in the heading. So the drawing is a bloom: one solid frame
 *  on the left, and four generations opening to the right, each one the
 *  document's next noun. By the fourth the reader is no longer looking at
 *  frames, they are looking at a field, and that transition IS the argument.
 *  Nothing is counted and no total is claimed; the caveat directly beneath says
 *  the proposal states the number, and it is set at full weight rather than
 *  hidden in a footnote.
 *
 *  DETAIL NEAR THE ORIGIN, TEXTURE AT SCALE, and that is deliberate rather than
 *  a consequence of the sizes. The four hooks are large enough to show that
 *  only their opening differs. The twelve formats are drawn at three genuinely
 *  different proportions, because a format IS a proportion. The audiences and
 *  the placements are too small to read individually and are meant to be: you
 *  stop seeing assets and start seeing quantity, which is what a paid team is
 *  buying here.
 *
 *  THE FIRST SENTENCE IS DRAWN TOO, and it is the one that justifies the rest:
 *  "Paid campaigns need new creative as audiences become familiar with existing
 *  ads." So the master frame carries a familiarity meter that fills, and as it
 *  fills the next hook is marked to take over. It runs continuously in CSS,
 *  because fatigue does not wait for a scroll position, and every keyframe ends
 *  on the state the markup renders.
 *
 *  THE BLOOM OPENS ON SCROLL, one generation per dimension, so the reader
 *  performs the multiplication rather than being shown its result. Without
 *  script, below the large breakpoint and under reduced motion every generation
 *  is already open: the finished picture, which is a complete and honest one.
 *
 *  NO CREATIVE IS INVENTED. Frames, bars and slots. Nothing here pretends to be
 *  an ad, and the only words are the document's own. */

const VB_W = 960;
const VB_H = 520;
const MID = 260;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** Where each generation stands, how big its frames are, and how far apart.
 *  Hand-set rather than derived: the point is that the frames get smaller and
 *  denser at a rate the eye reads as multiplication, and an even progression
 *  does not do that. */
const GEN = [
  { x: 208, w: 78, h: 60, pitch: 112, per: 4 },
  { x: 384, w: 46, h: 30, pitch: 34, per: 3 },
  { x: 566, w: 28, h: 14, pitch: 17, per: 2 },
  { x: 742, w: 34, h: 6, pitch: 8.5, per: 2 },
] as const;

/** The three proportions the formats generation is drawn at, because a format
 *  is a proportion and drawing twelve identical rectangles would say nothing. */
const SHAPE = [
  { w: 26, h: 34 },
  { w: 34, h: 30 },
  { w: 50, h: 24 },
] as const;

const round = (n: number) => Math.round(n * 100) / 100;

/** Every frame's centre, generation by generation. Deterministic, so the server
 *  and the browser draw exactly the same picture. */
function build() {
  const gens: { y: number; parent: number }[][] = [];
  let parents = [{ y: MID, parent: -1 }];
  GEN.forEach((g) => {
    const row: { y: number; parent: number }[] = [];
    parents.forEach((p, pi) => {
      const span = (g.per - 1) * g.pitch;
      for (let i = 0; i < g.per; i += 1) {
        row.push({ y: round(p.y - span / 2 + i * g.pitch), parent: pi });
      }
    });
    gens.push(row);
    parents = row;
  });
  return gens;
}

const GENS = build();

export function VariantBloom({
  lead,
  caveat,
  directionLabel,
  axes,
}: {
  lead: string;
  caveat: string;
  /** "One approved direction". */
  directionLabel: string;
  /** The four things it is adapted into, in the document's order. */
  axes: string[];
}) {
  const root = useRef<HTMLDivElement>(null);
  /** How many generations have opened. Starts open, because the finished
   *  picture is the honest one; scroll closes and reopens it only where the
   *  bloom can actually be watched. */
  const [open, setOpen] = useState<number>(GEN.length);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ bloom: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.bloom) return;
      setOpen(0);
      const at = (p: number) => Math.min(GEN.length, Math.floor(p * (GEN.length + 0.4)) + 1);
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        end: "bottom 72%",
        scrub: 0.5,
        onUpdate: (self) => {
          const n = at(self.progress);
          setOpen((prev) => (prev === n ? prev : n));
        },
      });
      /* Seed from where the reader already is. A section that is in view on
         load would otherwise sit at its start state until the first scroll,
         and on a short page there may never be one. */
      setOpen(at(st.progress));
      return () => {
        st.kill();
        setOpen(GEN.length);
      };
    });
    return () => mm.revert();
  }, []);

  /** One familiarity cycle, and the hook that takes over when it completes.
   *  4.6s is ci-grow-x's own period, so the meter and the handover share a
   *  clock without either being told about the other. */
  const WEAR = 4600;

  return (
    <div ref={root}>
      <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
        <Rise>
          <p className="font-display max-w-[34ch] text-[clamp(1.2rem,2.4vw,1.85rem)] font-extrabold uppercase leading-[1.14] text-snow">
            {lead.split(". ")[0]}.
          </p>
        </Rise>
        <Rise delay={0.08}>
          <p className="max-w-[52ch] leading-relaxed text-fog">
            {lead.split(". ").slice(1).join(". ")}
          </p>
        </Rise>
      </div>

      {/* THE BLOOM. */}
      <div className="relative mt-12 sm:mt-14">
        {/* The five columns named, above the frames they stand over. */}
        <div aria-hidden className="relative mb-4 hidden h-8 sm:block">
          <span
            className="font-display absolute -translate-x-1/2 whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.14em] text-brand-text"
            style={{ left: `${(70 / VB_W) * 100}%` }}
          >
            {directionLabel}
          </span>
          {axes.map((axis, i) => (
            <span
              key={axis}
              className={cn(
                "font-display absolute -translate-x-1/2 whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.14em] transition-colors duration-500",
                open > i ? "text-snow" : "text-ash/50",
              )}
              style={{ left: `${((GEN[i].x + GEN[i].w / 2) / VB_W) * 100}%` }}
            >
              {axis}
            </span>
          ))}
        </div>

        {/* Below the small breakpoint the bloom would be squeezed to about a
            hundred and seventy pixels tall, at which point the fourth
            generation stops being frames and becomes dust. It keeps a floor
            width and the reader swipes it instead — the multiplication is the
            content here, so losing it is worse than a sideways scroll. */}
        <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          aria-hidden
          className="block w-full min-w-[34rem] sm:min-w-0"
          style={{ maxHeight: "34rem" }}
        >
          {/* ------------------------------- the approved direction ------- */}
          <g>
            <rect
              x={14}
              y={MID - 54}
              width={112}
              height={100}
              rx={7}
              fill="var(--color-ink-3)"
              stroke="var(--color-brand)"
              strokeWidth={1.6}
              vectorEffect="non-scaling-stroke"
            />
            {[0, 1, 2].map((r) => (
              <rect
                key={r}
                x={28}
                y={MID - 38 + r * 16}
                width={[80, 62, 72][r]}
                height={6}
                rx={3}
                fill="currentColor"
                className="text-brand"
                opacity={0.55}
              />
            ))}
            <rect x={28} y={MID + 8} width={84} height={22} rx={4} {...S} strokeWidth={1.1} className="text-line" />

            {/* Familiarity, filling. When it is full the next hook takes over. */}
            <rect x={14} y={MID + 58} width={112} height={4} rx={2} fill="currentColor" className="text-line" />
            <rect
              x={14}
              y={MID + 58}
              width={112}
              height={4}
              rx={2}
              fill="currentColor"
              className="text-brand ci-grow-x"
            />
          </g>

          {/* ------------------------------------- the four generations ---- */}
          {GENS.map((row, g) => {
            const spec = GEN[g];
            const shown = open > g;
            return (
              <g
                key={g}
                className="transition-opacity duration-700"
                opacity={shown ? 1 : 0}
                style={{ transitionDelay: shown ? `${g * 90}ms` : "0ms" }}
              >
                {row.map((cell, i) => {
                  const parentY = g === 0 ? MID : GENS[g - 1][cell.parent].y;
                  const parentX = g === 0 ? 126 : GEN[g - 1].x + GEN[g - 1].w;
                  const isHook = g === 0;
                  const shape = g === 1 ? SHAPE[i % 3] : { w: spec.w, h: spec.h };
                  const x = spec.x;
                  const y = round(cell.y - shape.h / 2);
                  return (
                    <g key={i}>
                      {/* Where it came from. */}
                      <path
                        d={`M${parentX} ${parentY} C ${parentX + 34} ${parentY}, ${x - 34} ${cell.y}, ${x} ${cell.y}`}
                        {...S}
                        strokeWidth={g === 0 ? 1.2 : 0.7}
                        className={g === 0 ? "text-brand" : "text-line"}
                        opacity={g === 0 ? 0.8 : 0.5}
                      />
                      <rect
                        x={x}
                        y={y}
                        width={shape.w}
                        height={shape.h}
                        rx={g > 2 ? 2 : 4}
                        fill={g > 1 ? "color-mix(in srgb, var(--color-brand) 14%, transparent)" : "var(--color-ink-3)"}
                        stroke={g > 1 ? "none" : "var(--color-line)"}
                        strokeWidth={1.1}
                        vectorEffect="non-scaling-stroke"
                      />

                      {/* The hooks differ only in their opening, which is the
                          one thing a hook is. */}
                      {isHook && (
                        <>
                          <rect
                            x={x + 10}
                            y={y + 12}
                            width={[46, 30, 54, 38][i]}
                            height={6}
                            rx={3}
                            fill="currentColor"
                            className="text-brand"
                            opacity={0.85}
                          />
                          {[0, 1].map((r) => (
                            <rect
                              key={r}
                              x={x + 10}
                              y={y + 26 + r * 11}
                              width={[54, 42][r]}
                              height={4}
                              rx={2}
                              fill="currentColor"
                              className="text-fog"
                              opacity={0.35}
                            />
                          ))}
                          {/* Which one takes over next, walking the four in
                              step with the familiarity meter. */}
                          <rect
                            x={x - 3}
                            y={y - 3}
                            width={shape.w + 6}
                            height={shape.h + 6}
                            rx={6}
                            {...S}
                            strokeWidth={1.6}
                            className="text-brand ah-duty"
                            style={{
                              animationDuration: `${WEAR * 4}ms`,
                              animationDelay: `${i * WEAR}ms`,
                            }}
                          />
                        </>
                      )}

                      {/* A placement is a slot, so the last generation carries
                          the mark of the surface it sits in rather than a
                          picture nobody could see at this size. */}
                      {g === 3 && (
                        <rect
                          x={x - 6}
                          y={y + 1}
                          width={4}
                          height={4}
                          rx={1}
                          fill="currentColor"
                          className="text-brand"
                          opacity={0.5}
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
        </div>

        {/* The four names again where the drawing is too narrow to label. */}
        <ul aria-hidden className="mt-6 flex flex-wrap gap-x-6 gap-y-2 sm:hidden">
          {axes.map((axis) => (
            <li key={axis} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span className="font-display text-[0.625rem] font-bold uppercase tracking-[0.14em] text-fog">
                {axis}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* The limit the section is honest about, at full weight. */}
      <Rise delay={0.1}>
        <p className="mt-12 max-w-[64ch] border-l-2 border-brand pl-6 leading-relaxed text-snow sm:text-lg">
          {caveat}
        </p>
      </Rise>
    </div>
  );
}

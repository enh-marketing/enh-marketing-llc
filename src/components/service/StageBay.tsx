"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { useEnhanced } from "@/lib/useEnhanced";

gsap.registerPlugin(ScrollTrigger);

type Stage = { no: string; title: string; body: string };

/** "How Our Automotive Marketing Process Works" — six bays, and a job that
 *  moves through them as the reader scrolls.
 *
 *  WHY IT IS NOT A LIST WITH A PICTURE BESIDE EACH ROW. That skeleton is the
 *  one this site has already rejected four times under four different
 *  ornaments. So the section is one wide wordless drawing — a shop floor of six
 *  bays with a job travelling along it — and one block of set copy underneath.
 *  Neither half is a row of cards, and the two halves are joined by the stage
 *  numbers alone.
 *
 *  THE BAYS CARRY NO TITLES, DELIBERATELY. Each stage is named exactly once, in
 *  the copy block, where its own paragraph is. Printing the six titles in the
 *  bays as well would put the same six phrases on the page twice, which is the
 *  reason this site marks phrases inside client sentences rather than lifting
 *  them into chips.
 *
 *  THE SCROLL IS THE MECHANISM, NOT THE DECORATION. A process is the one thing
 *  on this page that genuinely has an order, so the reader's own progress
 *  through the section is what advances the job: bays behind it are worked,
 *  bays ahead of it are waiting. Nothing is hidden either way — all six bays
 *  and all six paragraphs are on the page from the first paint.
 *
 *  WHAT HAPPENS WITHOUT THE SCRIPT. The finished state is the default in CSS:
 *  every bay renders worked. `sb-pending` is only ever added by the effect
 *  below, and the effect only runs above the large breakpoint with motion
 *  allowed — so a phone, a reader who asked for no motion, a failed hydration
 *  and a crawler all get the completed floor rather than a dimmed one. This is
 *  the same rule `shift-part` follows on the ecommerce page.
 *
 *  NO `from` TWEEN. The bay states are set from a raw ScrollTrigger's progress
 *  rather than from a timeline, so there is no start state to be stranded in if
 *  the trigger never fires on a deep link or a restored scroll position.
 *
 *  `useEnhanced` is in the dependency list because it reports false on the
 *  first paint by design, and the refs this effect reads are only meaningful
 *  once that flip has happened. */

/** One small mark per bay, so six bays are six pictures rather than six copies
 *  of one. Each answers the one thing its own stage does and carries no words.
 *  Drawn in a 48-unit box; stroke widths are in viewBox units because
 *  `ci-flow` and `ci-draw` switch off non-scaling-stroke. */
function BayMark({ no }: { no: string }) {
  const ASH = "var(--color-ash)";
  const BRAND = "var(--color-brand)";
  return (
    <svg viewBox="0 0 48 48" aria-hidden focusable="false" className="block h-14 w-14" fill="none">
      {/* 1 — how they find the business now: a route already there, examined. */}
      {no === "1" && (
        <g>
          <path d="M4 34 C14 34 16 16 26 16 C34 16 36 26 44 26" stroke={ASH} strokeWidth="1.6" strokeOpacity="0.6" strokeLinecap="round" />
          <circle cx="20" cy="20" r="9" stroke={BRAND} strokeWidth="1.8" />
          <path d="M27 27 L38 38" stroke={BRAND} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {/* 2 — some of what there is, chosen. */}
      {no === "2" && (
        <g>
          {[8, 20, 32].map((y, i) => (
            <rect key={y} x="6" y={y} width="24" height="8" rx="2.5" stroke={ASH} strokeWidth="1.5" strokeOpacity={i === 1 ? "0" : "0.55"} fill={i === 1 ? BRAND : "none"} fillOpacity={i === 1 ? "0.9" : "0"} />
          ))}
          <path d="M34 24 H42" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M38 20 L42 24 L38 28" stroke={BRAND} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {/* 3 — one field, sorted into groups. */}
      {no === "3" && (
        <g>
          <circle cx="13" cy="13" r="6" stroke={BRAND} strokeWidth="1.7" />
          <circle cx="35" cy="13" r="6" stroke={ASH} strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="13" cy="35" r="6" stroke={ASH} strokeWidth="1.5" strokeOpacity="0.6" />
          <circle cx="35" cy="35" r="6" stroke={ASH} strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M24 6 V42 M6 24 H42" stroke={ASH} strokeWidth="1" strokeOpacity="0.28" />
        </g>
      )}
      {/* 4 — the break in the way through, closed. */}
      {no === "4" && (
        <g>
          <path d="M4 24 H18" stroke={ASH} strokeWidth="1.8" strokeOpacity="0.6" strokeLinecap="round" />
          <path d="M30 24 H44" stroke={ASH} strokeWidth="1.8" strokeOpacity="0.6" strokeLinecap="round" />
          <path d="M18 24 H30" pathLength="100" stroke={BRAND} strokeWidth="2.6" strokeLinecap="round" className="ci-draw" />
          <path d="M24 12 V17 M24 31 V36" stroke={BRAND} strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.7" />
        </g>
      )}
      {/* 5 — five channels, one run. */}
      {no === "5" && (
        <g>
          {/* Drawn in full first: `ci-flow` is a 14% dash on a 100-unit path,
              so a channel with nothing under it is 86% gap and vanishes
              entirely when the animation is stopped. */}
          {[10, 17, 24, 31, 38].map((y, i) => (
            <g key={y}>
              <path
                d={`M5 ${y} C18 ${y} 22 24 34 24`}
                stroke={ASH}
                strokeWidth="1.4"
                strokeOpacity={i === 2 ? 0.7 : 0.45}
                strokeLinecap="round"
              />
              <path
                d={`M5 ${y} C18 ${y} 22 24 34 24`}
                pathLength="100"
                stroke={BRAND}
                strokeWidth="1.6"
                strokeLinecap="round"
                className="ci-flow"
                style={{ animationDelay: `${i * 300}ms` }}
              />
            </g>
          ))}
          <circle cx="38" cy="24" r="5" stroke={BRAND} strokeWidth="1.8" />
        </g>
      )}
      {/* 6 — read, and moved. */}
      {no === "6" && (
        <g>
          <path d="M6 40 V22 M18 40 V14 M30 40 V26 M42 40 V10" stroke={ASH} strokeWidth="3" strokeOpacity="0.45" strokeLinecap="round" />
          <path d="M42 40 V10" stroke={BRAND} strokeWidth="3" strokeLinecap="round" className="ci-grow" />
          <path d="M4 44 H44" stroke={ASH} strokeWidth="1.2" strokeOpacity="0.5" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

export function StageBay({
  id,
  label,
  index,
  title,
  strokeTitle,
  stages,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  stages: Stage[];
}) {
  const enhanced = useEnhanced();
  const root = useRef<HTMLDivElement>(null);
  const runner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enhanced) return;
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add(
      { run: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.run) return;

        const bays = Array.from(el.querySelectorAll<HTMLElement>("[data-bay]"));
        const mark = runner.current;

        const apply = (p: number) => {
          // The job's own position along the floor, as a GPU transform of a
          // full-width runner, so the mark lands correctly at any width.
          if (mark) mark.style.transform = `translateX(${(p - 1) * 100}%)`;
          const worked = Math.floor(p * bays.length);
          bays.forEach((b, i) => b.classList.toggle("sb-pending", i > worked));
        };

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 78%",
          end: "bottom 55%",
          scrub: 0.6,
          onUpdate: (self) => apply(self.progress),
          onRefresh: (self) => apply(self.progress),
        });

        return () => {
          st.kill();
          bays.forEach((b) => b.classList.remove("sb-pending"));
          if (mark) mark.style.transform = "";
        };
      },
    );

    return () => mm.revert();
  }, [enhanced]);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        {/* THE FLOOR. Six bays, no words, one job travelling. */}
        <Rise>
          <div ref={root} className="rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-8">
            <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-line lg:grid-cols-6">
              {stages.map((s) => (
                <li
                  key={s.no}
                  data-bay
                  className="sb-bay group flex flex-col items-center gap-5 bg-ink-2 px-3 pb-5 pt-6 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none"
                >
                  <span className="sb-work text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                    ({s.no.padStart(2, "0")})
                  </span>
                  <span className="sb-work">
                    <BayMark no={s.no} />
                  </span>
                  {/* The bay's floor. Without it the six cells read as columns
                      of empty space with a glyph in each; with it they read as
                      six places where work is done. */}
                  <span
                    aria-hidden
                    className="sb-work mt-auto h-px w-10 bg-ash/45 transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
                  />
                </li>
              ))}
            </ul>

            {/* The work line under the bays, and the job on it. */}
            <div className="relative mt-6 h-px w-full bg-line">
              <span aria-hidden className="pointer-events-none absolute inset-0 overflow-visible">
                <span ref={runner} className="sb-runner absolute inset-0">
                  <span className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand shadow-[0_0_0_5px_color-mix(in_srgb,var(--color-brand)_16%,transparent)]" />
                </span>
              </span>
            </div>
          </div>
        </Rise>

        {/* THE SIX STAGES, NAMED ONCE. Set as a block of copy in columns rather
            than as six cards, so the section reads as one chapter with a
            drawing at the head of it. */}
        <div className="mt-14 gap-x-12 md:columns-2 lg:columns-3">
          {stages.map((s) => (
            <div key={s.no} className="group mb-10 break-inside-avoid last:mb-0">
              <p className="font-display text-[clamp(1.05rem,1.7vw,1.3rem)] font-extrabold uppercase leading-[1.14] text-snow">
                <span className="mr-3 text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none">
                  {s.no.padStart(2, "0")}
                </span>
                {s.title}
              </p>
              <span
                aria-hidden
                className="mt-3 block h-px w-8 bg-line transition-all duration-500 group-hover:w-16 group-hover:bg-brand motion-reduce:transition-none"
              />
              <p className="mt-4 text-sm leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

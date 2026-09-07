"use client";

import { useCallback, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Phase } from "@/content/services/google-ads";

/** Two rates you can scrub, on the client's own weeks.
 *
 *  THE STATEMENT IS A DIVERGENCE, SO THE SECTION IS ONE. "Traffic can begin
 *  quickly. Useful performance data takes longer." Two things moving at
 *  different speeds over the same weeks, and the gap between them is the whole
 *  answer to "when will we see results". A row of stage cards puts both on one
 *  line and says nothing about that gap.
 *
 *  WHY IT IS OPERABLE RATHER THAN A CHART. A line chart is read once and
 *  believed or not. A handle you drag makes the reader travel the weeks
 *  themselves, and the two bars pull apart under their own hand. It is also the
 *  honest way to show a shape with no numbers on it: nobody can misread a value
 *  off a bar they are moving.
 *
 *  IT STARTS AT THE END. The handle rests at the mature state, so the section is
 *  complete before anything is touched and the divergence is the first thing
 *  visible. Scrubbing goes backwards through the early weeks. Nothing here is
 *  hidden until you act, and every stage's words are on the page at all times.
 *
 *  THE AXIS IS REAL AND NOTHING ELSE IS. The spans are the client's own and the
 *  only figures in the document: one week, then three, then four, then open. One
 *  week is one unit wide. The bars carry no scale, no unit and no percentage,
 *  because the source gives none.
 *
 *  ACCESSIBILITY. The handle is a real slider: role, min, max, current value and
 *  a value text that reads out the client's own wording for the span it is in.
 *  Arrow keys, Home and End move it, so it is not a pointer-only control.
 *
 *  RESPONSIVE. The axis and the handle work at any width because they are
 *  proportional; the stage entries stack below the large breakpoint and the
 *  active one stays marked, so the reading survives a phone. */

/** Weeks per stage, from the document's own spans. The last is open. */
const WEEKS = [1, 3, 4, 3];
const TOTAL = WEEKS.reduce((a, b) => a + b, 0);

/** How full each track is at a given point on the axis. Shapes, not figures:
 *  traffic arrives almost at once, useful data climbs late. */
const traffic = (v: number) => Math.min(100, Math.pow(v / 100, 0.32) * 100);
const useful = (v: number) => Math.min(100, Math.pow(v / 100, 2.1) * 100);

export function ResultsScrub({
  id,
  label,
  index,
  title,
  strokeTitle,
  statement,
  phases,
  caveat,
  caveatMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  statement: string;
  phases: Phase[];
  caveat: string;
  caveatMark: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  /** Position along the axis, 0 to 100. Rests at the mature end. */
  const [v, setV] = useState(100);
  const dragging = useRef(false);

  /** Which stage the handle is standing in. */
  const bounds = WEEKS.reduce<number[]>((a, w) => [...a, (a.at(-1) ?? 0) + w], []);
  const at = Math.min(
    phases.length - 1,
    bounds.findIndex((b) => (v / 100) * TOTAL <= b + 0.0001),
  );
  const active = at < 0 ? phases.length - 1 : at;

  const setFromPointer = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  /* Every branch updates from the previous value rather than from `v` captured
     in this render. Held arrow keys repeat faster than React re-renders, so
     reading `v` here made all but the first press of a burst compute from the
     same stale number: three presses moved one step, and Home followed by
     ArrowRight came back to where it started instead of stepping off zero. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 100 / TOTAL;
    const move: Record<string, (p: number) => number> = {
      ArrowRight: (p) => Math.min(100, p + step),
      ArrowUp: (p) => Math.min(100, p + step),
      ArrowLeft: (p) => Math.max(0, p - step),
      ArrowDown: (p) => Math.max(0, p - step),
      Home: () => 0,
      End: () => 100,
    };
    const fn = move[e.key];
    if (!fn) return;
    e.preventDefault();
    setV(fn);
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="font-display text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
              {statement}
            </p>
          }
          className="mb-14"
        />

        {/* ------------------------------------------------ the instrument --- */}
        <Rise>
          <div className="rounded-2xl border border-line bg-ink-2 p-6 sm:p-9">
            {/* The two rates. Bars, no scale, no units. */}
            <div className="flex flex-col gap-5">
              {[
                { fill: traffic(v), tone: "bg-ash/60" },
                { fill: useful(v), tone: "bg-brand" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className={cn(
                      "h-2.5 w-2.5 shrink-0 rounded-full",
                      i === 1 ? "bg-brand" : "bg-ash/60",
                    )}
                  />
                  <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-line/60">
                    <span
                      className={cn("absolute inset-y-0 left-0 rounded-full", row.tone)}
                      style={{
                        width: `${row.fill}%`,
                        transition: dragging.current ? "none" : "width 420ms cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            {/* The axis, at the client's own spans, and the handle on it. */}
            <div className="relative mt-9">
              <div
                ref={trackRef}
                className="relative h-12 cursor-ew-resize touch-none select-none"
                onPointerDown={(e) => {
                  dragging.current = true;
                  (e.target as Element).setPointerCapture?.(e.pointerId);
                  setFromPointer(e.clientX);
                }}
                onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
                onPointerUp={() => (dragging.current = false)}
                onPointerCancel={() => (dragging.current = false)}
              >
                {/* Stage divisions, proportional to the weeks. */}
                <span aria-hidden className="absolute inset-x-0 top-5 flex h-2 gap-px">
                  {WEEKS.map((w, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-full rounded-sm transition-colors duration-300 motion-reduce:transition-none",
                        i === phases.length - 1
                          ? "border border-dashed border-brand/50 bg-transparent"
                          : i <= active
                            ? "bg-brand/70"
                            : "bg-line",
                      )}
                      style={{ width: `${(w / TOTAL) * 100}%` }}
                    />
                  ))}
                </span>

                {/* The handle. A real slider, and it reads out the client's own
                    wording for the span it is standing in. */}
                <button
                  type="button"
                  role="slider"
                  aria-label={`${title} ${strokeTitle}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(v)}
                  aria-valuetext={phases[active]?.span}
                  onKeyDown={onKeyDown}
                  className="absolute top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand bg-ink-3 shadow-[0_8px_24px_-10px_rgba(232,0,13,0.7)] transition-transform duration-200 hover:scale-110 focus-visible:scale-110 motion-reduce:transition-none"
                  style={{ left: `${v}%` }}
                >
                  <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-brand" />
                </button>
              </div>
            </div>
          </div>
        </Rise>

        {/* ---------------------------------------------------- the stages --- */}
        {/* Equal columns, deliberately. The axis above is proportional to the
            client's weeks and that is where the real spans belong; carrying the
            same proportions down into the text made the first stage 125px wide
            with its title broken over three lines and its body running 273px
            tall, while the third sat in 446px and finished in two. Prose does
            not want to be scaled to a time axis. */}
        <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, i) => {
            const on = i === active;
            return (
              <li key={phase.no} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "mb-4 block h-px w-full transition-colors duration-300 motion-reduce:transition-none",
                    on ? "bg-brand" : "bg-line",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "font-display block text-[0.62rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                    on ? "text-brand-text" : "text-ash",
                  )}
                >
                  {phase.no}
                </span>
                <h3
                  className={cn(
                    "font-display mt-2 text-[clamp(1rem,1.8vw,1.3rem)] font-extrabold uppercase leading-[1.15] transition-colors duration-300 motion-reduce:transition-none",
                    on ? "text-snow" : "text-fog",
                  )}
                >
                  {phase.span}
                </h3>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed transition-colors duration-300 motion-reduce:transition-none",
                    on ? "text-fog" : "text-fog/70",
                  )}
                >
                  {phase.body}
                </p>
              </li>
            );
          })}
        </ol>

        <Rise delay={0.12} className="mt-12">
          <p className="font-display max-w-4xl text-[clamp(1.15rem,2.3vw,1.8rem)] font-extrabold uppercase leading-[1.14] text-brand">
            <Marked text={caveat} mark={caveatMark} className="text-snow" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

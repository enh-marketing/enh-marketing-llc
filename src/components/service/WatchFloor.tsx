"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";

gsap.registerPlugin(ScrollTrigger);

export type WatchDuty = { text: string; glyph: GlyphVariant };

/** Ongoing support, drawn as the watch it is.
 *
 *  THE LEAD IS THE DRAWING. "AI search results, website content and external
 *  sources change regularly." Three things that will not hold still, and nine
 *  duties that answer them. So the section is a floor with three inlets along
 *  its top edge and the nine duties standing out on it, wired back to whichever
 *  inlet feeds them. Change arrives continuously down those wires; the duty it
 *  lands on takes the watch.
 *
 *  IT IS A SET AND IT STAYS A SET. The document says support "can include"
 *  these and that "the monthly scope will state which ... are included". So
 *  nothing here is numbered, nothing is first and nothing is last. The nine
 *  stand at hand-chosen positions on an irregular field rather than in a
 *  column or a grid, precisely so no reading order is implied. The watch
 *  reaches them in turn, which is a rhythm, not a ranking.
 *
 *  NO FAKE METRICS. There is not a number anywhere on this floor. The only
 *  words are the nine duties, the three things the lead says change, and the
 *  scope sentence. A monitoring section that invented a chart would be
 *  inventing results on a page whose own header refuses them.
 *
 *  THE WIRES ARE MEASURED. The duties are ordinary grid children with real
 *  heights; their positions are read on every refresh and the wires plotted
 *  between them, the way DataConverge and ReturnLadder do. Resize and the wires
 *  follow. Below the large breakpoint the field becomes one column and the
 *  wires are dropped: nine hairlines converging on a phone is noise.
 *
 *  NOTHING READABLE STARTS HIDDEN. Every duty is fully legible at rest with no
 *  script at all; the watch, the packets and the inlet drops are the only
 *  moving parts and each is wordless. */

/** Where each duty stands on the floor, as a twelve-column grid placement, and
 *  which inlet feeds it. Hand-placed: the point is an irregular field, and an
 *  even grid or a generated scatter would both lose that. `feed` is the inlet
 *  index, chosen by proximity so the wires do not cross the field. */
const SPOTS: { col: number; row: number; span: number; feed: 0 | 1 | 2 }[] = [
  { col: 1, row: 1, span: 4, feed: 0 },
  { col: 6, row: 1, span: 4, feed: 1 },
  { col: 10, row: 2, span: 3, feed: 2 },
  { col: 3, row: 2, span: 4, feed: 0 },
  { col: 7, row: 3, span: 4, feed: 1 },
  { col: 1, row: 3, span: 4, feed: 0 },
  { col: 4, row: 4, span: 4, feed: 1 },
  { col: 9, row: 4, span: 4, feed: 2 },
  { col: 2, row: 5, span: 5, feed: 1 },
];

/** Where the three inlets sit along the top edge, as a fraction of the width. */
const INLET_AT = [0.16, 0.5, 0.84];

export function WatchFloor({
  lead,
  sources,
  items,
  scope,
}: {
  lead: string;
  /** The three things the lead says change, in its own words. */
  sources: string[];
  items: WatchDuty[];
  scope: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const nodes = useRef<(HTMLLIElement | null)[]>([]);
  const wires = useRef<(SVGPathElement | null)[]>([]);
  const flows = useRef<(SVGPathElement | null)[]>([]);
  /** Which duty the pointer is holding. Null hands the floor back to the
   *  automatic watch, which is a CSS animation and needs no state. */
  const [held, setHeld] = useState<number | null>(null);

  /* The wires are plotted from where the duties actually landed. Plotting runs
     whether or not motion is welcome: a wire that is never drawn is a wire that
     is missing, not a wire held still. */
  useEffect(() => {
    const el = field.current;
    const frame = svg.current;
    if (!el || !frame) return;
    const mm = gsap.matchMedia();
    mm.add({ plot: "(min-width: 1024px)" }, (ctx) => {
      if (!ctx.conditions?.plot) return;

      const build = () => {
        const r = el.getBoundingClientRect();
        if (!r.width) return;
        frame.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
        SPOTS.forEach((spot, i) => {
          const node = nodes.current[i];
          const wire = wires.current[i];
          const flow = flows.current[i];
          if (!node || !wire) return;
          const b = node.getBoundingClientRect();
          const x = b.left - r.left + Math.min(28, b.width / 2);
          const y = b.top - r.top;
          const sx = r.width * INLET_AT[spot.feed];
          const d = `M ${sx} 0 C ${sx} ${y * 0.45}, ${x} ${y * 0.5}, ${x} ${y}`;
          wire.setAttribute("d", d);
          flow?.setAttribute("d", d);
        });
      };

      build();
      /* Plot again once the things that move a grid have finished moving it.
         A ResizeObserver alone is not enough: its callback is delivered at a
         rendering step, so a document that is not being painted never gets one,
         and the wires stay frozen at whatever the first measurement was. The
         web font landing is the change that matters most here — it reflows
         every row of the field — so it is waited on explicitly. */
      const st = ScrollTrigger.create({ trigger: el, start: "top bottom", onRefresh: build });
      const ro = new ResizeObserver(build);
      ro.observe(el);
      const settle = window.setTimeout(build, 350);
      let live = true;
      document.fonts?.ready.then(() => {
        if (live) build();
      });
      window.addEventListener("load", build);
      return () => {
        live = false;
        window.clearTimeout(settle);
        window.removeEventListener("load", build);
        st.kill();
        ro.disconnect();
      };
    });
    return () => mm.revert();
  }, []);

  /** One watch cycle across the whole bank, so a duty's lamp and its wire share
   *  a clock. Nine duties at 1.2s each. */
  const CYCLE = items.length * 1200;

  return (
    <div ref={root}>
      {/* What will not hold still. */}
      <p className="font-display max-w-[46ch] text-[clamp(1.1rem,2.2vw,1.6rem)] font-extrabold uppercase leading-[1.16] text-snow">
        {lead}
      </p>

      {/* The three inlets, along the top edge of the floor. */}
      <div aria-hidden className="relative mt-12 hidden h-16 lg:block">
        <span className="absolute inset-x-0 bottom-0 h-px bg-line" />
        {sources.map((source, i) => (
          <span
            key={source}
            className="absolute bottom-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${INLET_AT[i] * 100}%` }}
          >
            <span className="font-display whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ash">
              {source}
            </span>
            {/* Change arriving, continuously. */}
            <span className="relative mt-2.5 block h-8 w-px overflow-hidden bg-line/70">
              <span
                className="ah-drop absolute inset-x-0 top-0 block h-2.5 bg-brand"
                style={{ animationDelay: `${i * 900}ms` }}
              />
            </span>
            <span className="mt-1 block h-2 w-2 translate-y-1 rotate-45 border-b border-r border-brand" />
          </span>
        ))}
      </div>
      {/* The same three, named where there is no room to draw them. */}
      <ul aria-hidden className="mt-8 flex flex-wrap gap-x-6 gap-y-2 lg:hidden">
        {sources.map((source) => (
          <li key={source} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="font-display text-[0.625rem] font-bold uppercase tracking-[0.14em] text-ash">
              {source}
            </span>
          </li>
        ))}
      </ul>

      {/* THE FLOOR. */}
      <div
        ref={field}
        onPointerLeave={() => setHeld(null)}
        className="group relative mt-8 lg:mt-10"
      >
        <svg
          ref={svg}
          aria-hidden
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
        >
          {SPOTS.map((_, i) => (
            <g key={i}>
              <path
                ref={(n) => {
                  wires.current[i] = n;
                }}
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="1"
                className={cn(
                  "transition-opacity duration-300",
                  held === null ? "opacity-100" : held === i ? "opacity-100" : "opacity-30",
                )}
              />
              <path
                ref={(n) => {
                  flows.current[i] = n;
                }}
                fill="none"
                pathLength={100}
                stroke="var(--color-brand)"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="ci-flow"
                style={{ animationDelay: `${i * (CYCLE / SPOTS.length)}ms`, animationDuration: "2.4s" }}
              />
            </g>
          ))}
        </svg>

        <ul className="relative grid gap-x-5 gap-y-6 lg:grid-cols-12 lg:gap-y-10">
          {items.map((duty, i) => {
            const spot = SPOTS[i % SPOTS.length];
            const on = held === i;
            return (
              <li
                key={duty.text}
                ref={(n) => {
                  nodes.current[i] = n;
                }}
                onPointerEnter={() => setHeld(i)}
                /* The placement is handed over as custom properties and applied
                   only at the large breakpoint. An inline `gridColumn` cannot
                   be, and a duty placed at column 10 of a one-column grid ran
                   straight off the right of a phone. */
                style={
                  {
                    "--gc": `${spot.col} / span ${spot.span}`,
                    "--gr": String(spot.row),
                  } as React.CSSProperties
                }
                className="relative lg:[grid-column:var(--gc)] lg:[grid-row:var(--gr)]"
              >
                {/* Not focusable and not a button. Pointing at a duty holds
                    the watch on it, which is a nicety; the duty itself is
                    already fully readable and nothing here reveals content, so
                    putting nine roleless tab stops in the page would cost a
                    keyboard reader more than the highlight is worth. */}
                <div
                  className={cn(
                    "relative flex items-start gap-3.5 rounded-xl border px-4 py-3.5 transition-all duration-300",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    on
                      ? "border-brand bg-brand/[0.08]"
                      : "border-line bg-ink-2/70 hover:border-brand/50",
                  )}
                >
                  {/* The watch, walking the floor. Pure CSS, one clock, and it
                      holds still while a reader is holding a duty open. */}
                  <span
                    aria-hidden
                    className={cn(
                      "ah-duty pointer-events-none absolute inset-0 rounded-xl border border-brand bg-brand/[0.06]",
                      held !== null && "[animation-play-state:paused] opacity-0",
                    )}
                    style={{
                      animationDuration: `${CYCLE}ms`,
                      animationDelay: `${i * (CYCLE / items.length)}ms`,
                    }}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "relative mt-0.5 h-5 w-5 shrink-0 transition-colors duration-300",
                      on ? "text-brand" : "text-ash",
                    )}
                  >
                    <CapabilityGlyph variant={duty.glyph} />
                  </span>
                  <span
                    className={cn(
                      "font-display relative text-[0.8125rem] font-extrabold uppercase leading-[1.2] transition-colors duration-300 sm:text-[0.875rem]",
                      on ? "text-snow" : "text-fog",
                    )}
                  >
                    {duty.text}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The rule on the whole floor: what a given month actually holds. */}
      <div className="mt-12 flex max-w-full items-start gap-3 border-t border-ash/30 pt-5">
        <span aria-hidden className="mt-[0.4rem] h-2 w-2 shrink-0 rounded-full bg-brand" />
        <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">{scope}</p>
      </div>
    </div>
  );
}

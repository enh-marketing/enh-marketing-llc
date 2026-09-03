"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The data a forecast needs, gathered into the diagnostic that reads it.
 *
 *  WHY THIS SHAPE. The document lists twelve inputs and then says two things
 *  about them: not every one is needed, and "the diagnostic establishes what
 *  is available and how confidently it can be used". So the twelve are drawn
 *  as what they are, separate sources, and the diagnostic is drawn as the one
 *  place they are gathered. As the reader scrolls, a wire draws from each input
 *  to the diagnostic and the input lights as it lands; when the last one
 *  arrives the diagnostic itself lights. The sentence inside the box is the
 *  document's own.
 *
 *  THE WIRES ARE MEASURED, NOT DRAWN BY HAND. The inputs are ordinary flow
 *  layout and the diagnostic is an ordinary panel; their real positions are
 *  read on every refresh and the wires plotted between them, the way
 *  ManagedWaypoints plots its route. Resize and the wires follow.
 *
 *  NOTHING READABLE STARTS HIDDEN. Inputs dim to 0.55, never to 0; the wires
 *  have a faint ghost that is always drawn; and the lit borders rest at full
 *  opacity in the markup, so with no script and under reduced motion the
 *  section reads as a finished picture: every input present, the diagnostic
 *  lit. Below the large breakpoint there is no overlay and no scrub, so the
 *  inputs stay neutral there rather than all resting "selected". */
export function DataConverge({
  lead,
  coversLead,
  items,
  boxText,
  closing,
}: {
  lead: string;
  coversLead: string;
  items: string[];
  /** The sentence set inside the diagnostic box. */
  boxText: string;
  /** The display-scale line beneath the drawing. */
  closing: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const chips = useRef<(HTMLLIElement | null)[]>([]);
  const ghosts = useRef<(SVGPathElement | null)[]>([]);
  const wires = useRef<(SVGPathElement | null)[]>([]);
  const flows = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add({ plot: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.plot) return;
      const frame = svg.current;
      const target = box.current;
      if (!frame || !target) return;
      const rows = chips.current.filter(Boolean) as HTMLLIElement[];
      const wire = wires.current.filter(Boolean) as SVGPathElement[];
      const ghost = ghosts.current.filter(Boolean) as SVGPathElement[];
      const flow = flows.current.filter(Boolean) as SVGPathElement[];
      const lit = gsap.utils.selector(el)("[data-lit]");
      const boxLit = gsap.utils.selector(el)("[data-box-lit]");
      if (rows.length !== wire.length) return;

      const lengths: number[] = [];

      /** Measure and plot: from each input's right edge to the box's left edge. */
      const build = () => {
        const r = el.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        const px = b.left - r.left;
        const py = b.top - r.top + b.height / 2;
        frame.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
        // Two columns. A left-column input hands off to the input beside it
        // (a short, straight wire across the gutter), and only the right column
        // runs to the box. Twelve wires all crossing the right column to reach
        // the box was a tangle that ran under the text it was meant to connect.
        rows.forEach((row, i) => {
          const c = row.getBoundingClientRect();
          const x = c.right - r.left;
          const y = c.top - r.top + c.height / 2;
          const neighbour = rows[i + 1];
          const sameRow =
            neighbour !== undefined &&
            Math.abs(neighbour.getBoundingClientRect().top - c.top) < 4 &&
            neighbour.getBoundingClientRect().left > c.right;
          let d: string;
          if (sameRow) {
            const n = neighbour.getBoundingClientRect();
            d = `M ${x} ${y} H ${n.left - r.left}`;
          } else {
            const bend = Math.max(40, (px - x) * 0.5);
            d = `M ${x} ${y} C ${x + bend} ${y}, ${px - bend} ${py}, ${px} ${py}`;
          }
          ghost[i].setAttribute("d", d);
          wire[i].setAttribute("d", d);
          flow[i]?.setAttribute("d", d);
          const len = wire[i].getTotalLength();
          lengths[i] = len;
          wire[i].style.strokeDasharray = `${len}`;
        });
      };

      const state = { p: 0 };
      const apply = () => {
        const n = rows.length;
        rows.forEach((row, i) => {
          // Each wire draws across its own slice of the scrub, in document order.
          const local = gsap.utils.clamp(0, 1, (state.p * n - i) / 0.9);
          wire[i].style.strokeDashoffset = `${lengths[i] * (1 - local)}`;
          gsap.set(row, { opacity: 0.55 + 0.45 * local });
          gsap.set(lit[i], { opacity: local });
        });
        gsap.set(boxLit, { opacity: gsap.utils.clamp(0, 1, (state.p - 0.85) / 0.15) });
      };

      build();
      apply();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "bottom 65%",
          scrub: 0.7,
          onRefresh: () => {
            build();
            apply();
          },
        },
      });
      tl.to(state, { p: 1, duration: 1, ease: "none", onUpdate: apply }, 0);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set([rows, lit, boxLit], { clearProps: "all" });
        wire.forEach((w) => {
          w.style.strokeDasharray = "";
          w.style.strokeDashoffset = "";
        });
      };
    });

    return () => mm.revert();
  }, [items.length]);

  return (
    <div>
      <Rise>
        <p className="font-display max-w-3xl text-[clamp(1.15rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.18] text-snow">
          {lead}
        </p>
      </Rise>

      <div
        ref={root}
        className="relative mt-12 grid gap-x-20 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-center"
      >
        {/* The wires. Desktop only: hotspots and a spaghetti of lines are not
            what a phone wants, and below lg the inputs simply stack above the
            diagnostic. */}
        <svg
          ref={svg}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible lg:block"
          preserveAspectRatio="none"
        >
          {items.map((_, i) => (
            <path
              key={`g${i}`}
              ref={(n) => {
                ghosts.current[i] = n;
              }}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {items.map((_, i) => (
            <path
              key={`w${i}`}
              ref={(n) => {
                wires.current[i] = n;
              }}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="1.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* And the data itself, arriving on a loop rather than only while the
              reader happens to be scrolling. Each packet is a dash running the
              wire it belongs to, staggered so they arrive in turn. */}
          {items.map((_, i) => (
            <path
              key={`f${i}`}
              ref={(n) => {
                flows.current[i] = n;
              }}
              fill="none"
              pathLength="100"
              stroke="var(--color-brand)"
              strokeWidth="1.8"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="ci-flow"
              style={{ animationDelay: `${i * 220}ms` }}
            />
          ))}
        </svg>

        {/* The inputs. Compact, two columns where there is room, each with a
            port on its right edge for the wire to leave from. */}
        <div className="relative z-10">
          <p className="font-display flex items-center gap-3 text-[0.6875rem] font-semibold uppercase text-brand-text">
            <span aria-hidden className="h-px w-8 bg-brand" />
            {coversLead}
          </p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {items.map((item, i) => (
              <li
                key={item}
                ref={(n) => {
                  chips.current[i] = n;
                }}
                className="relative flex items-center gap-4 rounded-xl border border-line bg-ink-3 px-4 py-3.5"
              >
                {/* Lit border. Rests at full opacity; the scrub brings it in. */}
                <span
                  data-lit
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden rounded-xl border border-brand/60 bg-brand/[0.05] lg:block"
                />
                <span
                  aria-hidden
                  className="font-display relative w-5 shrink-0 text-[0.6875rem] font-bold tabular-nums text-ash"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex-1 text-[0.95rem] leading-snug text-snow">{item}</span>
                {/* The port the wire leaves from. */}
                <span
                  aria-hidden
                  className="absolute -right-[4px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-line bg-ink-3 lg:block"
                />
                {/* And, on the right column, the one the neighbour's wire lands on. */}
                {i % 2 === 1 && (
                  <span
                    aria-hidden
                    className="absolute -left-[4px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-line bg-ink-3 lg:block"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* The diagnostic. Where every wire lands. */}
        <div ref={box} className="relative z-10">
          <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 p-8 sm:p-10">
            <span
              data-box-lit
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[1.25rem] border border-brand/70 bg-brand/[0.07]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <span aria-hidden className="relative mb-6 block h-px w-10 bg-brand" />
            <p className="font-display relative text-[clamp(1.15rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.18] text-snow">
              {boxText}
            </p>
          </div>
          {/* The port the wires arrive at. */}
          <span
            aria-hidden
            className={cn(
              "absolute -left-[5px] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-brand bg-brand lg:block",
            )}
          />
        </div>
      </div>

      <Rise delay={0.2} className="mt-12 border-t border-line pt-9">
        <p className="font-display max-w-3xl text-[clamp(1.2rem,2.6vw,2rem)] font-extrabold uppercase leading-[1.14] text-snow">
          {closing}
        </p>
      </Rise>
    </div>
  );
}

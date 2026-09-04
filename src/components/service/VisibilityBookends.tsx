"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** Seven services, laid out as what they are: two that measure, five that
 *  change things, and the two that measure stand either side.
 *
 *  WHY THIS SHAPE. The document's first service "creates a baseline that can
 *  be used to measure future changes" and its last one "repeat[s] the agreed
 *  searches and record[s] changes". Read together they are the same act at two
 *  moments, before and after, and the five between them are the work that
 *  happens in between. So the section is bookended: the baseline is a band
 *  across the top, monitoring a band across the foot, and the five levers sit
 *  between them. The reader sees the structure of the engagement before
 *  reading a word.
 *
 *  TOP AND FOOT, NOT LEFT AND RIGHT. The first build put the two bookends in
 *  sticky side columns, which read well but placed 07 on the top row beside 01
 *  and 02: the numbers no longer ascended in reading order. Banding them keeps
 *  the same idea and restores the order.
 *
 *  THE TWO BOOKENDS DRAW DIFFERENT THINGS. The baseline is a snapshot: the
 *  agreed questions against the platforms, one reading. Monitoring is a record:
 *  the same questions against the months, filled in as the searches are
 *  repeated. Neither claims improvement, because the document says "Can you
 *  guarantee a citation or mention? No".
 *
 *  Numbers ascend 01 to 07 in DOM order, in visual order and in the source.
 *  Below the large breakpoint everything stacks in that same order. */

export type ServiceRole = "baseline" | "lever" | "monitor";

export type BookendItem = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  role: ServiceRole;
  /** The drawing's two captions, for the two bookends only. Both are the
   *  document's own nouns. */
  labels?: [string, string];
};

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** The question set, tested across platforms: rows are questions, columns
 *  are platforms, a filled slot is an appearance. Fixed pattern, no counts. */
const SLOTS: boolean[][] = [
  [true, false, true, false, false],
  [false, false, true, false, true],
  [true, true, false, false, false],
  [false, false, false, true, false],
  [true, false, false, false, true],
  [false, true, false, false, false],
];

function QuestionGrid({ x = 0, y = 0, twinkle = true }: { x?: number; y?: number; twinkle?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {SLOTS.map((row, r) => (
        <g key={r}>
          {/* The question, as a bar. */}
          <rect x="0" y={r * 12 + 2} width="26" height="3" rx="1.5" fill="var(--color-fog)" opacity="0.5" />
          {row.map((on, c) => (
            <rect
              key={c}
              x={34 + c * 12}
              y={r * 12}
              width="8"
              height="8"
              rx="2"
              fill={on ? "var(--color-brand)" : "none"}
              stroke={on ? "none" : "var(--color-line)"}
              strokeWidth="1"
              opacity={on ? 0.9 : 1}
              className={on && twinkle ? "ci-twinkle" : undefined}
              style={on && twinkle ? { animationDelay: `${(r * 5 + c) * 140}ms` } : undefined}
            />
          ))}
        </g>
      ))}
    </g>
  );
}

/** The baseline: one reading of the grid. */
function BaselineSketch() {
  return (
    <svg viewBox="0 0 110 84" aria-hidden className="block w-full text-fog">
      <QuestionGrid x={0} y={4} />
      {/* One reading, taken once. */}
      <path d="M0 80h94" {...S} className="text-line" />
      <circle cx="4" cy="80" r="2.4" fill="var(--color-brand)" />
    </svg>
  );
}

/** Monitoring: the same questions, recorded again as the months pass.
 *
 *  Deliberately not the baseline's picture. Rows are the agreed questions, as
 *  there; columns are months rather than platforms, and the newest column is
 *  the one being written. A cell is filled where the brand appeared, and the
 *  pattern neither improves nor decays across the strip, because the document
 *  promises no outcome. */
function MonitorSketch() {
  const months = 6;
  return (
    <svg viewBox="0 0 110 84" aria-hidden className="block w-full text-fog">
      {/* The month axis, with the newest tick lit. */}
      <path d="M30 8 H 104" {...S} className="text-line" />
      {Array.from({ length: months }, (_, m) => (
        <g key={m} {...(m === months - 1 ? { "data-first-tick": "" } : {})}>
          <path d={`M${34 + m * 13} 5 v6`} {...S} className={m === months - 1 ? "text-brand" : "text-line"} />
          {m === months - 1 && (
            <circle cx={34 + m * 13} cy="8" r="2.6" fill="var(--color-brand)" className="ci-blink" />
          )}
        </g>
      ))}
      {SLOTS.map((row, r) => (
        <g key={r}>
          <rect x="0" y={r * 12 + 18} width="26" height="3" rx="1.5" fill="var(--color-fog)" opacity="0.5" />
          {Array.from({ length: months }, (_, m) => {
            // The reading for this question in this month: the same fixed
            // pattern the baseline uses, walked one step per month.
            const on = row[(m + r) % row.length];
            const newest = m === months - 1;
            return (
              <rect
                key={m}
                x={30 + m * 13}
                y={r * 12 + 15}
                width="9"
                height="9"
                rx="2"
                fill={on ? "var(--color-brand)" : "none"}
                stroke={on ? "none" : "var(--color-line)"}
                strokeWidth="1"
                opacity={on ? (newest ? 0.95 : 0.55) : 1}
                className={newest ? "ci-twinkle" : undefined}
                style={newest ? { animationDelay: `${r * 200}ms` } : undefined}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

function Card({ item, band }: { item: BookendItem; band?: boolean }) {
  const Sketch = item.role === "baseline" ? BaselineSketch : item.role === "monitor" ? MonitorSketch : null;
  return (
    <article
      data-card
      className={cn(
        "relative flex h-full flex-col rounded-[1.5rem] border p-7 sm:p-8",
        band ? "border-brand/35 bg-ink-2 lg:flex-row lg:items-center lg:gap-14 lg:p-10" : "border-line bg-ink-3",
      )}
    >
      <div className={cn("flex flex-col", band && "lg:flex-1")}>
        <span className="h-10 w-10 shrink-0 text-brand">
          <CapabilityGlyph variant={item.glyph} />
        </span>
        <p className="font-display mt-7 text-[0.6875rem] font-bold tabular-nums text-brand-text">{item.no}</p>
        <h3 className={cn("font-display mt-2 font-extrabold uppercase leading-[1.14] text-snow", band ? "text-[clamp(1.3rem,2.4vw,1.9rem)]" : "text-[clamp(1.1rem,1.8vw,1.4rem)]")}>
          {item.title}
        </h3>
        <p className={cn("mt-4 leading-relaxed text-fog", band && "max-w-2xl sm:text-lg")}>{item.body}</p>
      </div>
      {Sketch && item.labels && (
        <div className="mt-8 lg:mt-0 lg:w-[34%] lg:shrink-0">
          <div className="rounded-xl border border-line bg-ink-3 p-4">
            {/* Captions in HTML at the house minimum: SVG text would scale with
                the viewBox and fall under 11px on a phone. */}
            <p className="font-display mb-3 flex items-baseline justify-between gap-3 text-[0.6875rem] font-semibold uppercase leading-none">
              <span className="text-ash">{item.labels[0]}</span>
              <span className="text-right text-brand-text">{item.labels[1]}</span>
            </p>
            <Sketch />
          </div>
        </div>
      )}
    </article>
  );
}

export function VisibilityBookends({ items }: { items: BookendItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const baseline = items.filter((i) => i.role === "baseline");
  const levers = items.filter((i) => i.role === "lever");
  const monitor = items.filter((i) => i.role === "monitor");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ motion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.motion) return;
      const cards = gsap.utils.selector(el)("[data-card]");
      gsap.set(cards, { opacity: 0.55, y: 18 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", end: "bottom 78%", scrub: 0.7 },
      });
      // Left bookend, then the levers top to bottom, then the right bookend.
      tl.to(cards, { opacity: 1, y: 0, duration: 0.22, stagger: 0.09, ease: "power2.out" }, 0);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(cards, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root} className="space-y-5">
      {baseline.map((item) => (
        <Card key={item.no} item={item} band />
      ))}
      {/* The five levers. The last spans two columns so the second row fills
          and the grid leaves no hole. */}
      <div className="grid gap-5 lg:grid-cols-3">
        {levers.map((item, i) => (
          <div key={item.no} className={cn(i === levers.length - 1 && "lg:col-span-2")}>
            <Card item={item} />
          </div>
        ))}
      </div>
      {monitor.map((item) => (
        <Card key={item.no} item={item} band />
      ))}
    </div>
  );
}

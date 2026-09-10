"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";
import type { Result } from "@/content/industries/hospitality-hotels";

/** Nine results, plotted on a scale of decades.
 *
 *  THE INTERESTING FACT ABOUT THESE NUMBERS IS THEIR RANGE. Fifty conversions
 *  and six million people reached are both in this document, and they are five
 *  orders of magnitude apart. A row of four big figures — the band this site
 *  uses on the performance pages — would flatten that completely: every number
 *  the same size, the smallest looking like a disappointment beside the
 *  largest, and the fact that this work operates at both ends thrown away. The
 *  honest chart for data spanning five decades is a logarithmic one, so the
 *  section is built as a scale of decades with the nine results standing on it
 *  at their true heights, ordered by magnitude rather than by the document's
 *  list order — reordering a bulleted list is the one editorial freedom this
 *  page takes, and it is what makes the climb visible.
 *
 *  WHAT EACH KIND OF FIGURE GETS. A total is a point on the scale. A total that
 *  moved — "from fewer than 600 monthly users to more than 1,300" — is the
 *  distance between two points, drawn as a bar between them, because that is
 *  what the sentence says and a single point would lose half of it. And the
 *  click-through rate is NOT on the scale at all: an axis of totals has nothing
 *  to say about a percentage, and putting 7 on a scale that runs to ten million
 *  would be the only dishonest mark on the page. It gets its own track
 *  underneath, drawn as the proportion it is.
 *
 *  EVERY FIGURE KEEPS ITS HEDGE. "More than", "over", "fewer than", "above" —
 *  each result is printed as the document's own sentence with its own numbers
 *  marked, so nothing is rounded up into a claim the source does not make.
 *
 *  THE LABELS ARE HTML, NOT SVG TEXT. Type inside a scaled viewBox resizes with
 *  the drawing, which is exactly what a caption must not do. The scale, the
 *  marks and the connectors are drawn; every word is positioned over them at a
 *  percentage of the same box.
 *
 *  BELOW THE LARGE BREAKPOINT the scale is dropped and the nine read as a run,
 *  each with a bar showing the decade it reaches — the magnitude story survives
 *  in a single narrow column, which a 900-unit two-sided ladder cannot.
 *
 *  Coordinates are rounded before they reach JSX. Math.log10's precision is
 *  implementation-defined, so an unrounded height computed in Node and again in
 *  the browser is exactly the hydration mismatch that costs this route its
 *  island. */

/** The scale: one decade per step, from ten to ten million, which is the range
 *  the document's own figures occupy. */
const DEC_LO = 1;
const DEC_HI = 7;
const Y_LO = 600;
const Y_HI = 40;
const SPINE = 450;
const W = 900;
const H = 640;

const round = (n: number) => Math.round(n * 100) / 100;

const yFor = (n: number) =>
  round(Y_LO - ((Math.log10(n) - DEC_LO) / (DEC_HI - DEC_LO)) * (Y_LO - Y_HI));

/** Every decade's rule, and the label the scale needs to be readable at all.
 *  These are axis ticks, not copy: they say what the scale is. */
const DECADES = [
  { v: 1, label: "10" },
  { v: 2, label: "100" },
  { v: 3, label: "1K" },
  { v: 4, label: "10K" },
  { v: 5, label: "100K" },
  { v: 6, label: "1M" },
  { v: 7, label: "10M" },
];

/** How high a result reaches, for sorting and for the narrow-screen bars. */
const peak = (r: Result) => ("value" in r ? r.value : "to" in r ? r.to : 0);

export function ResultsLadder({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: Result[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  /* On the scale: the totals and the one total that moved, tallest first. The
     rate is not a total and is handled on its own track. */
  const plotted = items.filter((r) => !("rate" in r)).sort((a, b) => peak(b) - peak(a));
  const rate = items.find((r) => "rate" in r) as Extract<Result, { rate: number }> | undefined;

  const ease = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-14"
        />

        <div ref={root}>
          {/* ---- Wide: the scale ---- */}
          <div
            className="relative hidden lg:block"
            style={{ aspectRatio: `${W} / ${H}` }}
          >
            <svg viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden className="absolute inset-0 h-full w-full">
              {/* One rule per decade. */}
              {DECADES.map((d, i) => {
                const y = yFor(Math.pow(10, d.v));
                return (
                  <path
                    key={d.v}
                    d={`M56 ${y} H${W - 16}`}
                    stroke="var(--color-line)"
                    strokeWidth="1"
                    strokeDasharray={i === 0 ? undefined : "2 8"}
                  />
                );
              })}

              {/* The spine the results stand on. */}
              <path
                d={`M${SPINE} ${Y_LO} V${Y_HI - 4}`}
                stroke="var(--color-line)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {plotted.map((r, i) => {
                const left = i % 2 === 0;
                const yTop = yFor(peak(r));
                const yBase = "from" in r ? yFor(r.from) : yTop;
                const yMid = round((yTop + yBase) / 2);
                const armX = left ? SPINE - 132 : SPINE + 132;
                const delay = 120 + i * 90;
                return (
                  <g key={r.text}>
                    {/* The arm out to the label. */}
                    <path
                      d={`M${SPINE} ${yMid} H${armX}`}
                      stroke="var(--color-brand)"
                      strokeWidth="1.25"
                      strokeOpacity="0.5"
                      strokeLinecap="round"
                      style={{
                        transition: `opacity 600ms ${ease}`,
                        transitionDelay: `${delay}ms`,
                        opacity: shown ? 1 : 0,
                      }}
                    />
                    {/* A total that moved is the distance between two heights. */}
                    {"from" in r && (
                      <g
                        style={{
                          transition: `opacity 600ms ${ease}`,
                          transitionDelay: `${delay}ms`,
                          opacity: shown ? 1 : 0,
                        }}
                      >
                        <path
                          d={`M${SPINE} ${yBase} V${yTop}`}
                          stroke="var(--color-brand)"
                          strokeWidth="7"
                          strokeLinecap="round"
                        />
                        <path
                          d={`M${SPINE - 11} ${yBase} H${SPINE + 11}`}
                          stroke="var(--color-brand)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeOpacity="0.55"
                        />
                      </g>
                    )}
                    {/* And a total is a point on it. */}
                    <circle
                      cx={SPINE}
                      cy={yTop}
                      r="9"
                      className="fill-brand"
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        transform: shown ? "scale(1)" : "scale(0)",
                        transition: `transform 520ms ${ease}`,
                        transitionDelay: `${delay}ms`,
                      }}
                    />
                    {/* Every one of these figures is hedged upward in the
                        source — "more than", "over" — so every point carries an
                        open tick above it rather than reading as an exact
                        total. */}
                    <path
                      d={`M${SPINE - 7} ${yTop - 15} l7 -7 7 7`}
                      stroke="var(--color-brand)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transition: `opacity 600ms ${ease}`,
                        transitionDelay: `${delay + 160}ms`,
                        opacity: shown ? 0.7 : 0,
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* The scale's own labels. */}
            {DECADES.map((d) => (
              <span
                key={d.v}
                aria-hidden
                className="absolute left-0 -translate-y-1/2 font-display text-[0.68rem] font-bold tabular-nums text-ash"
                style={{ top: `${(yFor(Math.pow(10, d.v)) / H) * 100}%` }}
              >
                {d.label}
              </span>
            ))}

            {/* And the results, as real type over the drawing. */}
            {plotted.map((r, i) => {
              const left = i % 2 === 0;
              const yTop = yFor(peak(r));
              const yBase = "from" in r ? yFor(r.from) : yTop;
              const yMid = (yTop + yBase) / 2;
              return (
                <div
                  key={r.text}
                  className={cn(
                    "absolute w-[32%] -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    left ? "text-right" : "text-left",
                    shown ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    top: `${(yMid / H) * 100}%`,
                    [left ? "right" : "left"]: `${((W / 2 + 140) / W) * 100}%`,
                    transitionDelay: `${180 + i * 90}ms`,
                    transform: shown
                      ? "translateY(-50%)"
                      : `translate(${left ? "14px" : "-14px"}, -50%)`,
                  }}
                >
                  <p className="text-[0.9rem] leading-snug text-fog">
                    <Marked
                      text={r.text}
                      mark={r.mark}
                      className="font-display font-extrabold uppercase text-snow"
                    />
                  </p>
                </div>
              );
            })}
          </div>

          {/* ---- Narrow: the same nine, as a run ---- */}
          <ol className="border-t border-line lg:hidden">
            {plotted.concat(rate ? [rate] : []).map((r, i) => {
              const isRate = "rate" in r;
              const frac = isRate
                ? 0
                : Math.max(
                    0.06,
                    (Math.log10(peak(r)) - DEC_LO) / (DEC_HI - DEC_LO),
                  );
              return (
                <li key={r.text} className="border-b border-line py-6">
                  <p className="text-[0.95rem] leading-snug text-fog">
                    <Marked
                      text={r.text}
                      mark={r.mark}
                      className="font-display font-extrabold uppercase text-snow"
                    />
                  </p>
                  <span aria-hidden className="mt-4 block h-1.5 w-full rounded-full bg-line">
                    <span
                      className="block h-1.5 rounded-full bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                      style={{
                        width: shown
                          ? `${round((isRate ? (r as { rate: number }).rate / 100 : frac) * 100)}%`
                          : "0%",
                        transitionDelay: `${i * 70}ms`,
                      }}
                    />
                  </span>
                </li>
              );
            })}
          </ol>

          {/* ---- The one figure that is a rate, on its own track ---- */}
          {rate && (
            <Rise delay={0.1} className="mt-12 hidden lg:block">
              <div className="grid items-center gap-8 border-t border-line pt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <p className="text-[0.95rem] leading-snug text-fog">
                  <Marked
                    text={rate.text}
                    mark={rate.mark}
                    className="font-display font-extrabold uppercase text-snow"
                  />
                </p>
                {/* Drawn as the proportion it is, because that is what it is. */}
                <span aria-hidden className="relative block h-8">
                  <span className="absolute inset-x-0 top-1/2 block h-1.5 -translate-y-1/2 rounded-full bg-line" />
                  <span
                    className="absolute left-0 top-1/2 block h-1.5 -translate-y-1/2 rounded-full bg-brand transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                    style={{ width: shown ? `${rate.rate}%` : "0%" }}
                  />
                  <span
                    className="absolute top-0 block h-8 w-[2px] bg-brand transition-[left] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                    style={{ left: shown ? `${rate.rate}%` : "0%" }}
                  />
                </span>
              </div>
            </Rise>
          )}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Rise } from "@/components/fx/Reveal";
import { useEnhanced } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

/** Monthly production, drawn as the engine the heading calls it.
 *
 *  WHY A RING. The section is the only one on the page about something that
 *  comes round again: "AI creative production can be scoped as a one-off
 *  project or a monthly service." A list of what a scope may include cannot say
 *  that, and a table of two columns says the opposite — it says "here are two
 *  products, pick one". So the six things an ongoing scope may include are six
 *  stations on one turning ring, and a carrier goes round it continuously,
 *  working each in turn. That is what a monthly retainer is.
 *
 *  THE HUB IS THE COMMITMENT, and that is the whole reason the section exists.
 *  "The number of finished assets is agreed before production starts" was the
 *  last clause of a small grey paragraph in every previous version. Here it is
 *  the thing the engine is built around: the reader cannot look at the ring
 *  without reading it, because it is in the middle of it.
 *
 *  WHAT IS OUTSIDE THE HOUSING IS OUTSIDE IT. The four excluded items hang off
 *  dashed tethers that stop short of the ring and never engage, because the
 *  document does not refuse them — it puts them outside and adds "unless these
 *  are added separately". A dashed coupling that is not made, and could be, is
 *  exactly that status. The device is the one ScopeLine already uses on this
 *  site and it is reused deliberately rather than reinvented.
 *
 *  NO CHOICE IS OFFERED. One-off or monthly is stated in the document's own
 *  sentence, above the drawing. A reader cannot pick their own scope off a web
 *  page and nothing here pretends they can. Pointing at a station holds it
 *  open; that is reading, not choosing.
 *
 *  THE ENGINE RUNS IN CSS. One rotation, one station lit per sixth of it, both
 *  on the same clock so the carrier and the lit station are never out of step.
 *  Under reduced motion the carrier parks and every station rests legible, and
 *  that is also the state the server renders. */

const CX = 210;
const CY = 210;
const R_RING = 150;
const R_HUB = 96;

/** One full turn of the month, and therefore one pass over all six stations. */
const TURN = 18000;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const round = (n: number) => Math.round(n * 100) / 100;

const pt = (deg: number, r: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [round(CX + r * Math.cos(a)), round(CY + r * Math.sin(a))] as const;
};

/** Where the six labels stand, as a percentage of the square, in station
 *  order. Kept beside SPOKE order so a label is always off its own station. */
const LABEL_AT = [
  { left: "50%", top: "-1%", t: "translate(-50%,-50%)" },
  { left: "97%", top: "26%", t: "translate(-10%,-50%)" },
  { left: "97%", top: "74%", t: "translate(-10%,-50%)" },
  { left: "50%", top: "101%", t: "translate(-50%,-50%)" },
  { left: "3%", top: "74%", t: "translate(-90%,-50%)" },
  { left: "3%", top: "26%", t: "translate(-90%,-50%)" },
] as const;

/** A mark for each station, drawn as the thing that station produces. Six
 *  small pictures rather than six numbered dots: a video is a frame with a
 *  play in it, a language adaptation is the same line set from the other
 *  edge, a revision is a turn back. Nothing here is a generic node. */
function StationMark({ i, x, y }: { i: number; x: number; y: number }) {
  const g = (children: React.ReactNode) => (
    <g transform={`translate(${x - 11} ${y - 11})`}>{children}</g>
  );
  switch (i) {
    // new concepts
    case 0:
      return g(
        <>
          <path d="M11 2v18M2 11h18M4.6 4.6l12.8 12.8M17.4 4.6L4.6 17.4" {...S} strokeWidth={1.4} />
        </>,
      );
    // videos
    case 1:
      return g(
        <>
          <rect x="1.5" y="4" width="19" height="14" rx="2.5" {...S} strokeWidth={1.4} />
          <path d="M9 8.5l5 2.5-5 2.5z" fill="currentColor" />
        </>,
      );
    // images
    case 2:
      return g(
        <>
          <rect x="1.5" y="3.5" width="19" height="15" rx="2.5" {...S} strokeWidth={1.4} />
          <circle cx="7" cy="8.5" r="1.8" {...S} strokeWidth={1.3} />
          <path d="M2.5 16l5.5-5 4.5 4 3-2.5 4.5 3.5" {...S} strokeWidth={1.3} />
        </>,
      );
    // platform versions
    case 3:
      return g(
        <>
          <rect x="1.5" y="2" width="7" height="18" rx="1.6" {...S} strokeWidth={1.3} />
          <rect x="10" y="5" width="6" height="12" rx="1.6" {...S} strokeWidth={1.3} />
          <rect x="17.5" y="8" width="3.5" height="6" rx="1.2" {...S} strokeWidth={1.3} />
        </>,
      );
    // language adaptations
    case 4:
      return g(
        <>
          <path d="M2 5h18M2 10h12M2 15h15" {...S} strokeWidth={1.4} />
          <path d="M20 10h1M9 15h2" {...S} strokeWidth={1.4} opacity={0.45} />
          <path d="M4 19.5h16" {...S} strokeWidth={1.4} strokeDasharray="2 3" />
        </>,
      );
    // revisions
    default:
      return g(
        <>
          <path d="M19 11a8 8 0 1 1-2.6-5.9" {...S} strokeWidth={1.4} />
          <path d="M19 2.5V6h-3.5" {...S} strokeWidth={1.4} />
        </>,
      );
  }
}

export function ProductionEngine({
  shape,
  includedLabel,
  included,
  commitment,
  excludedLabel,
  excluded,
  excludedTail,
}: {
  shape: string;
  includedLabel: string;
  included: string[];
  commitment: string;
  excludedLabel: string;
  excluded: string[];
  excludedTail: string;
}) {
  /** Which station the pointer is holding. Null lets the engine run. */
  const [held, setHeld] = useState<number | null>(null);
  const running = held === null;
  /* Radial labels need about a label's width of clear air either side of the
     ring. There is only that much room once the engine has the full measure,
     so below the large breakpoint the names run as a legend under the drawing
     instead. Exactly one of the two is ever in the document, so nothing is
     announced twice. */
  const radial = useEnhanced("(min-width: 1024px)");

  const name = (i: number) => (
    <button
      type="button"
      onPointerEnter={() => setHeld(i)}
      onFocus={() => setHeld(i)}
      onBlur={() => setHeld(null)}
      onClick={() => setHeld((v) => (v === i ? null : i))}
      aria-pressed={held === i}
      className={cn(
        "font-display whitespace-nowrap rounded px-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] transition-colors duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        held === i ? "text-brand-text" : "text-fog hover:text-snow",
      )}
    >
      {included[i]}
    </button>
  );

  return (
    <div>
      <Rise>
        <p className="font-display max-w-[34ch] text-[clamp(1.2rem,2.4vw,1.85rem)] font-extrabold uppercase leading-[1.14] text-snow">
          {shape}
        </p>
      </Rise>

      {/* THE ENGINE, on the full measure. It is the section's object and the
          six names stand off it, so it cannot share a row with anything. */}
      <div className="relative mt-14 sm:mt-16" onPointerLeave={() => setHeld(null)}>
        <p className="font-display mb-6 text-center text-[0.625rem] font-bold uppercase tracking-[0.16em] text-brand-text">
          {includedLabel}
        </p>

        <div className="mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem]">
          <div className="relative aspect-square">
            <svg viewBox="0 0 420 420" aria-hidden className="block h-full w-full">
              {/* The month. */}
              <circle cx={CX} cy={CY} r={R_RING} {...S} strokeWidth={1.2} className="text-line" />

              {/* The carrier, going round. */}
              <g
                className={cn(running && "ah-spin")}
                style={{
                  transformBox: "view-box",
                  transformOrigin: "50% 50%",
                  animationDuration: `${TURN}ms`,
                }}
              >
                <circle cx={pt(0, R_RING)[0]} cy={pt(0, R_RING)[1]} r={7} fill="var(--color-brand)" />
                <circle
                  cx={pt(0, R_RING)[0]}
                  cy={pt(0, R_RING)[1]}
                  r={13}
                  {...S}
                  strokeWidth={1.2}
                  className="text-brand"
                  opacity={0.5}
                />
              </g>

              {/* The six stations. */}
              {included.map((item, i) => {
                const deg = i * 60;
                const [x, y] = pt(deg, R_RING);
                const on = held === i;
                return (
                  <g key={item}>
                    <circle
                      cx={x}
                      cy={y}
                      r={22}
                      fill="var(--color-ink-3)"
                      stroke={on ? "var(--color-brand)" : "var(--color-line)"}
                      strokeWidth={1.3}
                      vectorEffect="non-scaling-stroke"
                      className="transition-colors duration-300"
                    />
                    {/* Lit as the carrier reaches it: same clock, one sixth
                        of a turn each. */}
                    <circle
                      cx={x}
                      cy={y}
                      r={22}
                      fill="color-mix(in srgb, var(--color-brand) 12%, transparent)"
                      stroke="var(--color-brand)"
                      strokeWidth={1.6}
                      vectorEffect="non-scaling-stroke"
                      className={cn("ah-station", !running && "opacity-0")}
                      style={{
                        animationDuration: `${TURN}ms`,
                        animationDelay: `${(i * TURN) / 6}ms`,
                        animationPlayState: running ? "running" : "paused",
                      }}
                    />
                    <g className={cn("transition-colors duration-300", on ? "text-brand" : "text-fog")}>
                      <StationMark i={i} x={x} y={y} />
                    </g>
                    {/* The spur out to the label. */}
                    <path
                      d={`M${pt(deg, R_RING + 23)[0]} ${pt(deg, R_RING + 23)[1]}L${pt(deg, R_RING + 34)[0]} ${pt(deg, R_RING + 34)[1]}`}
                      {...S}
                      strokeWidth={1}
                      className={on ? "text-brand" : "text-line"}
                    />
                  </g>
                );
              })}

              {/* The hub the whole thing turns on. */}
              <circle
                cx={CX}
                cy={CY}
                r={R_HUB}
                fill="color-mix(in srgb, var(--color-brand) 5%, transparent)"
                stroke="var(--color-brand)"
                strokeWidth={1.2}
                strokeDasharray="2 5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* The commitment, in the middle of the engine, as type. */}
            <p className="pointer-events-none absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="font-display block text-[clamp(0.6rem,1.4vw,0.9rem)] font-extrabold uppercase leading-[1.22] text-snow">
                {commitment}
              </span>
            </p>

            {/* The six names, standing off their own stations. */}
            {radial &&
              included.map((item, i) => (
                <span
                  key={item}
                  className="absolute z-10"
                  style={{ left: LABEL_AT[i].left, top: LABEL_AT[i].top, transform: LABEL_AT[i].t }}
                >
                  {name(i)}
                </span>
              ))}
          </div>
        </div>

        {/* The same six where there is no room to stand them off the ring. */}
        {!radial && (
          <ul className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-x-4 gap-y-2">
            {included.map((item, i) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                    held === i ? "bg-brand" : "bg-line",
                  )}
                />
                {name(i)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* What is outside the housing, on couplings that are not made. */}
      <div className="mt-16 border-t border-line pt-10">
        <div className="grid gap-x-14 gap-y-7 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ash">
              {excludedLabel}
            </p>
            <p className="mt-4 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ash">
              <span aria-hidden className="mt-[0.45rem] h-px w-6 shrink-0 bg-line" />
              {excludedTail}
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {excluded.map((item) => (
              <li key={item} className="flex items-center gap-4">
                <svg viewBox="0 0 44 12" aria-hidden className="h-3 w-11 shrink-0 text-line">
                  <path d="M0 6h30" {...S} strokeWidth={1.2} strokeDasharray="4 4" />
                  <circle cx="37" cy="6" r="4" {...S} strokeWidth={1.2} />
                </svg>
                <span className="font-display text-[0.9375rem] font-extrabold uppercase leading-tight text-fog">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Fragment, useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import type { MeasureRow } from "@/content/industries/hospitality-hotels";

/** Twelve measures as one desk, and the document's own note as its two lenses.
 *
 *  WHAT THIS REPLACES AND WHY. The first version was the site's MeasureTable: a
 *  definition list, twelve rows, the measure at heading scale and its reading
 *  beside it. Correct, complete, and twelve rows of text — which is the one
 *  thing a section about a reporting instrument should not be.
 *
 *  THE NOTE IS THE SECTION, AND IT WAS BURIED. "The most useful measures depend
 *  on the business model. A restaurant may prioritise reservations and direction
 *  requests, while a hotel may focus on booking-engine visits and completed
 *  direct bookings." That sentence names FOUR of the twelve rows above it and
 *  splits them between two kinds of business. It is the only ranking claim in
 *  the section and it was set as a grey footnote under a table.
 *
 *  So the twelve are a desk with twelve channels, each carrying a drawing of
 *  the thing it measures, and the two business types in that sentence are the
 *  control. Choose the restaurant and the desk pushes reservations and
 *  direction requests up. Choose the hotel and it pushes booking-engine visits
 *  and direct bookings up instead. The reader watches the same instrument get
 *  re-set for a different business, which is exactly what the sentence claims.
 *
 *  NOTHING IS RANKED BEYOND WHAT THE DOCUMENT RANKS. With no lens chosen every
 *  channel sits at the same level, because the document gives no default order.
 *  The eight the sentence does not name are never pulled DOWN either — they
 *  recede in attention and hold their level, since "may prioritise" is a
 *  statement about focus, not about dropping the rest.
 *
 *  NOTHING IS COUNTED. No channel carries a value, the tracks have no scale,
 *  and the two levels are "named by the sentence" and "not named" — not high
 *  and low. This document's figures are all in its results section.
 *
 *  Each measure's reading is the document's own, and all twelve stay in the
 *  markup so a crawler and a screen reader get the whole table. */

const CH_W = 71;
const CX0 = 55;
const NEUTRAL = 130;
const RAISED = 64;

/** The two lenses, and which of the twelve rows each one names. Matched on the
 *  row's own `track` text so the mapping follows the document rather than a
 *  table of indices kept beside it: if the client renames a measure, the lens
 *  stops claiming it instead of silently pointing at the wrong channel. */
const LENSES: { key: string; names: string[] }[] = [
  { key: "A restaurant", names: ["Reservation actions", "Direction requests"] },
  { key: "a hotel", names: ["Booking-engine visits", "Direct bookings"] },
];

/** One drawing per channel: the thing being measured, not a symbol for it.
 *  Drawn in a 34 x 26 box centred on (cx, 26), everything on currentColor so a
 *  channel's whole strip changes tone with one class. */
function Instrument({ i, cx }: { i: number; cx: number }) {
  const S = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  const x = cx - 17;

  switch (i) {
    // Direct bookings: confirmations, stacked.
    case 0:
      return (
        <g>
          <rect x={x + 8} y="12" width="24" height="14" rx="2.5" {...S} opacity="0.4" />
          <rect x={x + 4} y="16" width="24" height="14" rx="2.5" {...S} opacity="0.7" />
          <rect x={x} y="20" width="24" height="14" rx="2.5" {...S} />
          <path d={`M${x + 7} 27 l3 3 6 -7`} {...S} strokeWidth="1.8" />
        </g>
      );
    // Reservation actions: a table, laid.
    case 1:
      return (
        <g>
          <rect x={x + 5} y="20" width="24" height="5" rx="2.5" fill="currentColor" opacity="0.35" />
          <path d={`M${x + 17} 25 V34 M${x + 11} 34 H${x + 23}`} {...S} />
          <rect x={x} y="14" width="5" height="10" rx="2" {...S} />
          <rect x={x + 29} y="14" width="5" height="10" rx="2" {...S} />
        </g>
      );
    // Booking-engine visits: arriving at availability.
    case 2:
      return (
        <g>
          <rect x={x + 6} y="12" width="28" height="20" rx="3" {...S} />
          <path d={`M${x + 6} 18 H${x + 34}`} {...S} opacity="0.5" />
          <path d={`M${x} 26 h9 m-4 -4 l4 4 -4 4`} {...S} />
        </g>
      );
    // Calls and WhatsApp enquiries: a conversation, either way.
    case 3:
      return (
        <g>
          <path
            d={`M${x} 14 h4 l2 5 -3 2a15 15 0 0 0 8 8 l2 -3 5 2 v4a3 3 0 0 1 -3.4 3 22 22 0 0 1 -18 -18 3 3 0 0 1 3.4 -3Z`}
            {...S}
          />
          <path d={`M${x + 20} 12 h11a3 3 0 0 1 3 3 v7a3 3 0 0 1 -3 3 h-5 l-4 4 v-4h-2a3 3 0 0 1 -3 -3 v-7a3 3 0 0 1 3 -3Z`} {...S} opacity="0.75" />
        </g>
      );
    // Direction requests: on the way there.
    case 4:
      return (
        <g>
          <path d={`M${x + 10} 34 C${x + 10} 34 ${x + 1} 22 ${x + 1} 15a9 9 0 0 1 18 0c0 7 -9 19 -9 19Z`} {...S} />
          <circle cx={x + 10} cy="15" r="3" fill="currentColor" />
          <path d={`M${x + 24} 26 l7 -7 -7 -7`} {...S} opacity="0.75" />
        </g>
      );
    // Organic search conversions: a result that did something.
    case 5:
      return (
        <g>
          <circle cx={x + 11} cy="19" r="8" {...S} />
          <path d={`M${x + 17} 25 l6 6`} {...S} />
          <path d={`M${x + 6} 19 h10`} {...S} opacity="0.5" />
          <path d={`M${x + 24} 12 l4 4 6 -7`} {...S} strokeWidth="1.8" />
        </g>
      );
    // Google Business Profile interactions: the listing, tapped.
    case 6:
      return (
        <g>
          <rect x={x} y="12" width="26" height="20" rx="3" {...S} />
          <path d={`M${x + 5} 19 H${x + 21} M${x + 5} 25 H${x + 15}`} {...S} opacity="0.5" />
          <circle cx={x + 27} cy="28" r="4" fill="currentColor" opacity="0.8" />
          <circle cx={x + 27} cy="28" r="7.5" {...S} opacity="0.5" />
        </g>
      );
    // Paid campaign conversions: bought, and it landed.
    case 7:
      return (
        <g>
          <rect x={x} y="14" width="13" height="9" rx="2" fill="currentColor" opacity="0.85" />
          <path d={`M${x} 29 H${x + 15}`} {...S} opacity="0.5" />
          <circle cx={x + 25} cy="22" r="9" {...S} />
          <circle cx={x + 25} cy="22" r="3.5" fill="currentColor" />
        </g>
      );
    // Cost per booking or enquiry: what one of them costs.
    case 8:
      return (
        <g>
          <path d={`M${x + 1} 14 h16 l14 9 -14 9 h-16 Z`} {...S} />
          <circle cx={x + 8} cy="23" r="2.5" fill="currentColor" />
          <path d={`M${x + 14} 27 l8 -8`} {...S} opacity="0.7" />
        </g>
      );
    // Social reach and engagement: how far it carried.
    case 9:
      return (
        <g>
          <circle cx={x + 3} cy="30" r="3" fill="currentColor" />
          <path d={`M${x + 3} 22 a8 8 0 0 1 8 8`} {...S} />
          <path d={`M${x + 3} 14 a16 16 0 0 1 16 16`} {...S} opacity="0.7" />
          <path d={`M${x + 3} 6 a24 24 0 0 1 24 24`} {...S} opacity="0.4" />
        </g>
      );
    // Reviews and ratings: how they moved.
    case 10:
      return (
        <g>
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx={x + 3 + k * 8} cy="14" r="2.6" {...S} />
          ))}
          <path d={`M${x + 1} 32 l8 -5 8 4 9 -8`} {...S} strokeWidth="1.8" />
          <path d={`M${x + 22} 23 h4 v4`} {...S} />
        </g>
      );
    // Returning visitors: back again.
    default:
      return (
        <g>
          <path d={`M${x + 4} 26 a13 13 0 1 0 13 -13 h-9`} {...S} />
          <path d={`M${x + 12} 8 l-5 5 5 5`} {...S} />
          <circle cx={x + 17} cy="26" r="2.6" fill="currentColor" />
        </g>
      );
  }
}

export function ReportingDesk({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  headTrack,
  headTells,
  rows,
  note,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  /** The document's own column headers, which are what make the two halves of
   *  each pair mean different things. */
  headTrack: string;
  headTells: string;
  rows: MeasureRow[];
  /** The sentence that names four of these rows and splits them between two
   *  business types. Its two openers are the lens control. */
  note: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [lens, setLens] = useState(-1);

  /** Which channels the chosen lens names. */
  const named = lens === -1 ? [] : LENSES[lens].names;
  const isNamed = (track: string) => named.includes(track);

  /* The note, split around its two openers so each becomes the lens control
     without a single word moving. Same contract as Marked. */
  const keys = LENSES.map((l) => l.key).filter((k) => note.includes(k));
  const parts = keys.length
    ? note.split(
        new RegExp(
          "(" +
            keys
              .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
              .sort((a, b) => b.length - a.length)
              .join("|") +
            ")",
          "g",
        ),
      )
    : [note];

  const ease = "cubic-bezier(0.16,1,0.3,1)";
  const W = 24 + rows.length * CH_W;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-12"
        />

        <Rise>
          <div className="rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-5 sm:p-8">
            {/* ---- The readout ---- */}
            <div className="grid gap-6 border-b border-line pb-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-10">
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
                  {headTrack}
                </p>
                <div className="mt-4 grid">
                  {rows.map((row, i) => (
                    <motion.p
                      key={row.track}
                      aria-hidden={i !== active}
                      initial={false}
                      animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 10 }}
                      transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "font-display col-start-1 row-start-1 text-[clamp(1.05rem,2.2vw,1.6rem)] font-extrabold uppercase leading-[1.14] text-snow",
                        i !== active && "pointer-events-none",
                      )}
                    >
                      {row.track}
                    </motion.p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
                  {headTells}
                </p>
                <div className="mt-4 grid">
                  {rows.map((row, i) => (
                    <motion.p
                      key={row.track}
                      aria-hidden={i !== active}
                      initial={false}
                      animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 10 }}
                      transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "col-start-1 row-start-1 leading-relaxed text-fog sm:text-lg",
                        i !== active && "pointer-events-none",
                      )}
                    >
                      {row.tells}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- The desk ---- */}
            <div className="relative mt-7 overflow-x-auto pb-1 scroll-slim">
              <div className="relative min-w-[46rem]">
                <svg viewBox={`0 0 ${W} 252`} fill="none" aria-hidden className="block w-full">
                  {/* The desk's front rail, which every channel stands on. */}
                  <rect
                    x="10"
                    y="212"
                    width={W - 20}
                    height="30"
                    rx="8"
                    className="fill-ash/[0.07]"
                    stroke="var(--color-ash)"
                    strokeWidth="1.25"
                    strokeOpacity="0.5"
                  />

                  {rows.map((row, i) => {
                    const cx = CX0 + i * CH_W;
                    const on = i === active;
                    const up = isNamed(row.track);
                    const level = up ? RAISED : NEUTRAL;
                    const quiet = lens !== -1 && !up && !on;
                    return (
                      <g
                        key={row.track}
                        className={cn(
                          "transition-[color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                          on || up ? "text-brand opacity-100" : quiet ? "text-ash opacity-40" : "text-ash opacity-80",
                        )}
                      >
                        <Instrument i={i} cx={cx} />

                        {/* The slot. */}
                        <rect
                          x={cx - 2.5}
                          y="52"
                          width="5"
                          height="152"
                          rx="2.5"
                          className="fill-current"
                          fillOpacity="0.22"
                        />
                        {/* How far up the sentence puts it. */}
                        <rect
                          x={cx - 2.5}
                          y={level}
                          width="5"
                          height={204 - level}
                          rx="2.5"
                          className="fill-current"
                          style={{ transition: reduced ? "none" : `y 600ms ${ease}, height 600ms ${ease}` }}
                        />
                        {/* The cap. */}
                        <g
                          style={{
                            transform: `translateY(${level - NEUTRAL}px)`,
                            transition: reduced ? "none" : `transform 600ms ${ease}`,
                          }}
                        >
                          <rect
                            x={cx - 17}
                            y={NEUTRAL - 8}
                            width="34"
                            height="17"
                            rx="5"
                            className="fill-void"
                            stroke="currentColor"
                            strokeWidth={on || up ? 2 : 1.4}
                          />
                          <path
                            d={`M${cx - 9} ${NEUTRAL} H${cx + 9}`}
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            opacity="0.6"
                          />
                        </g>
                        {/* And its light on the rail. */}
                        <circle
                          cx={cx}
                          cy="227"
                          r={on ? 5 : 3.5}
                          className="fill-current"
                          style={{ transition: reduced ? "none" : `r 400ms ${ease}` }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* The channels are the control. Twelve buttons over the desk,
                    each named by its own measure — a light on a rail means
                    nothing to a screen reader otherwise. */}
                <div className="absolute inset-0 flex">
                  {rows.map((row, i) => (
                    <button
                      key={row.track}
                      type="button"
                      aria-pressed={i === active}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="min-w-0 flex-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <span className="sr-only">{row.track}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ---- The sentence that re-sets the desk ---- */}
            <p
              className="mt-7 max-w-4xl border-t border-line pt-7 text-base leading-relaxed text-fog sm:text-lg"
              onPointerLeave={() => setLens(-1)}
            >
              {parts.map((part, i) => {
                const which = LENSES.findIndex((l) => l.key === part);
                if (which === -1) return <Fragment key={i}>{part}</Fragment>;
                const on = which === lens;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onPointerEnter={() => setLens(which)}
                    onFocus={() => setLens(which)}
                    onBlur={() => setLens(-1)}
                    onClick={() => setLens(on ? -1 : which)}
                    className={cn(
                      "font-display rounded-md px-1.5 py-1 text-[0.95em] font-extrabold uppercase leading-none transition-colors duration-300 motion-reduce:transition-none",
                      on
                        ? "bg-brand text-white"
                        : "text-snow underline decoration-brand decoration-2 underline-offset-4 hover:text-brand",
                    )}
                  >
                    {part}
                  </button>
                );
              })}
            </p>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

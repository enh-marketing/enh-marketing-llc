"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** Nine measures, shown where on the film each one is actually read from.
 *
 *  THE SECTION'S OWN NOTE IS A WARNING ABOUT CONTEXT: "A short social clip and a
 *  detailed corporate film serve different purposes and should be measured
 *  accordingly." A nine-row table is the opposite of context -- nine numbers of
 *  equal size, none of them attached to anything. So the measures are attached
 *  to the object they come off: a player, with a scrubber, a retention curve
 *  under it, an action rail, the placements it was cut for, and the things that
 *  happen after somebody watches.
 *
 *  EVERY HIGHLIGHT IS READ OFF THE ROW'S OWN SENTENCE. "How long viewers stayed
 *  with the video" is the filled part of the scrubber. "The points where viewers
 *  continued or left" is the curve. "How many viewers reached the end" is where
 *  the curve stops. "How often the video led people to another page" is the
 *  overlay. Nothing is assigned on a guess, and no measure is invented to fill
 *  a part of the drawing.
 *
 *  NO FIGURES ANYWHERE. No view count, no percentage, no axis and no scale: the
 *  curve is a shape, and this page states one number in total, which is about
 *  years of experience and lives in a different section. Every reading on show
 *  is the document's own sentence about what a measure means.
 *
 *  ALL NINE READINGS ARE IN THE MARKUP, stacked in one cell so the panel never
 *  resizes as the reader crosses the bank.
 *
 *  MOTION. Colour and transform only, on parts of a drawing that carry no
 *  words. The first measure is selected before any script runs. */

export type Signal = { track: string; tells: string };

/** Which part of the player each measure is read from, in the order the
 *  document lists them. */
const PART = [
  "audience",
  "watched",
  "curve",
  "end",
  "overlay",
  "after",
  "social",
  "placements",
  "spend",
] as const;

/** The retention curve. A shape, not a measurement: no axis, no scale, and the
 *  same fall every film has. */
const CURVE = "M0 6 C 14 5, 22 16, 34 21 S 56 30, 72 33 S 92 39, 100 41";

export function PlayerReadout({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  rows,
  headTrack,
  headTells,
  note,
  noteMark,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  rows: Signal[];
  headTrack: string;
  headTells: string;
  note: string;
  noteMark: string;
}) {
  const [active, setActive] = useState(0);
  const part = PART[active];
  const lit = (p: (typeof PART)[number]) => part === p;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
          {/* The film, and where each measure comes off it. */}
          <div aria-hidden className="lg:sticky lg:top-28 lg:self-start">
            {/* Who had the chance to watch. */}
            <div className="mb-4 flex items-center gap-1.5">
              {Array.from({ length: 14 }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "block h-2 flex-1 rounded-full transition-colors duration-500",
                    lit("audience") ? "bg-brand" : "bg-line",
                  )}
                />
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-line bg-ink-3">
              {/* The frame. */}
              <div className="relative aspect-[16/9] bg-[color-mix(in_srgb,var(--color-brand)_8%,transparent)]">
                <span className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors duration-500",
                      "border-brand/60",
                    )}
                  >
                    <svg viewBox="0 0 16 16" className="ml-1 h-5 w-5 text-brand" fill="currentColor">
                      <path d="M3 1.8l11 6.2L3 14.2z" />
                    </svg>
                  </span>
                </span>

                {/* What the film asks the viewer to do. */}
                <span
                  className={cn(
                    "absolute bottom-5 left-5 flex h-9 items-center rounded-full px-5 transition-[background-color,transform] duration-500",
                    lit("overlay")
                      ? "scale-105 bg-brand"
                      : "bg-ink-3/85",
                  )}
                >
                  <span className={cn("block h-2 w-16 rounded-full transition-colors duration-500", lit("overlay") ? "bg-ink-3" : "bg-line")} />
                </span>

                {/* And what the viewer does back. */}
                <span className="absolute bottom-5 right-4 flex flex-col gap-2.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className={cn(
                        "block h-7 w-7 rounded-full transition-[background-color,transform] duration-500",
                        lit("social") ? "scale-110 bg-brand" : "bg-ink-3/85",
                      )}
                    />
                  ))}
                </span>
              </div>

              {/* The scrubber, and how far it got. */}
              <div className="px-5 pt-5">
                <span className="relative block h-1.5 w-full rounded-full bg-line">
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 block w-[62%] rounded-full transition-colors duration-500",
                      lit("watched") ? "bg-brand" : "bg-brand/40",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-1/2 block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-ink-3 transition-transform duration-500",
                      lit("watched") ? "scale-125" : "scale-100",
                    )}
                    style={{ left: "62%" }}
                  />
                </span>

                {/* Where they stayed and where they left. */}
                <svg viewBox="0 0 100 48" preserveAspectRatio="none" className="mt-3 h-20 w-full">
                  <path
                    d={`${CURVE} L100 48 L0 48 Z`}
                    fill="var(--color-brand)"
                    fillOpacity={lit("curve") ? 0.16 : 0.06}
                    className="transition-[fill-opacity] duration-500"
                  />
                  <path
                    d={CURVE}
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeOpacity={lit("curve") ? 1 : 0.45}
                    strokeWidth="1.6"
                    vectorEffect="non-scaling-stroke"
                    className="transition-[stroke-opacity] duration-500"
                  />
                  {/* Where it stops. */}
                  <circle
                    cx="100"
                    cy="41"
                    r={lit("end") ? 3.4 : 2.2}
                    fill="var(--color-brand)"
                    fillOpacity={lit("end") ? 1 : 0.5}
                    className="transition-all duration-500"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* What it was cut for. */}
              <div className="flex gap-2 px-5 pb-5 pt-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "block h-6 flex-1 rounded border transition-colors duration-500",
                      lit("placements") ? "border-brand bg-brand/20" : "border-line",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* What happened after, and what it cost to get there. */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <span
                className={cn(
                  "flex h-12 items-center gap-3 rounded-xl border px-4 transition-colors duration-500",
                  lit("after") ? "border-brand bg-brand/10" : "border-line",
                )}
              >
                <svg viewBox="0 0 16 16" className={cn("h-4 w-4 transition-colors duration-500", lit("after") ? "text-brand" : "text-ash/50")} fill="none">
                  <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={cn("block h-2 flex-1 rounded-full transition-colors duration-500", lit("after") ? "bg-brand/70" : "bg-line")} />
              </span>
              <span
                className={cn(
                  "flex h-12 items-center gap-2 rounded-xl border px-4 transition-colors duration-500",
                  lit("spend") ? "border-brand bg-brand/10" : "border-line",
                )}
              >
                {[10, 16, 12].map((h, i) => (
                  <span
                    key={i}
                    className={cn("block w-2.5 rounded-sm transition-colors duration-500", lit("spend") ? "bg-brand" : "bg-line")}
                    style={{ height: h }}
                  />
                ))}
                <span className={cn("ml-auto block h-2 w-10 rounded-full transition-colors duration-500", lit("spend") ? "bg-brand/70" : "bg-line")} />
              </span>
            </div>
          </div>

          {/* The bank, and the reading. */}
          <div>
            <p className="mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
              {headTrack}
            </p>
            <ul className="flex flex-wrap gap-2">
              {rows.map((r, i) => {
                const on = active === i;
                return (
                  <li key={r.track}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={cn(
                        "font-display rounded-full border px-4 py-2.5 text-[0.8125rem] font-extrabold uppercase leading-none outline-none transition-colors duration-300",
                        on
                          ? "border-brand bg-brand text-white"
                          : "border-line text-snow hover:border-brand/45 hover:text-brand",
                      )}
                    >
                      {r.track}
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mb-4 mt-10 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-text">
              {headTells}
            </p>
            <div className="grid rounded-[1.25rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-8">
              {rows.map((r, i) => {
                const on = active === i;
                return (
                  <p
                    key={r.track}
                    aria-hidden={!on}
                    className={cn(
                      "font-display col-start-1 row-start-1 text-[clamp(1.1rem,2.3vw,1.7rem)] font-extrabold uppercase leading-[1.14] text-snow transition-[opacity,transform] duration-400",
                      on
                        ? "visible translate-y-0 opacity-100"
                        : "pointer-events-none invisible translate-y-2 opacity-0",
                    )}
                  >
                    {r.tells}
                  </p>
                );
              })}
            </div>

            <Rise delay={0.1}>
              <p className="mt-9 max-w-2xl border-l-2 border-brand pl-6 leading-relaxed text-fog sm:text-lg">
                <Marked text={note} mark={noteMark} />
              </p>
            </Rise>
          </div>
        </div>
      </Container>
    </section>
  );
}

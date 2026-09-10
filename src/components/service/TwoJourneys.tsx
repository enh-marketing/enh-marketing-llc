"use client";

import { Fragment, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** The opening argument, and the section where this page's second idea arrives:
 *  the run does not have one ending.
 *
 *  THE DOCUMENT'S THIRD PARAGRAPH IS THE INTERACTION. "For retail stores, that
 *  may mean increasing online purchases and repeat orders. For B2B ecommerce
 *  businesses, it may mean attracting procurement teams, supporting longer
 *  evaluations and generating bulk-order enquiries." Two journeys, and Stage 2
 *  of the process is explicit that they "should not be measured as the same
 *  conversion". A single drawing with both on it would say the opposite, and a
 *  pair of cards side by side would say they are the same thing twice.
 *
 *  So there is one track and it is redrawn. The two openers of the client's own
 *  sentence are the control: pressing "For retail stores" or "For B2B ecommerce
 *  businesses" rebuilds the track into that journey's actual shape, and the
 *  shapes are what the copy describes rather than a recolouring.
 *
 *    Retail — individual shoppers arriving, a short direct run, a closed
 *             purchase, and a return loop over the top, because the sentence
 *             ends on "repeat orders".
 *    B2B    — teams rather than people ("procurement teams"), a longer run held
 *             three times ("supporting longer evaluations"), and an ending that
 *             is still open and carries a stack behind it, because a
 *             "bulk-order enquiry" is a quantity that has not been paid for.
 *
 *  THE SENTENCE IS THE LEGEND, so nothing on the track is labelled. Every word
 *  a reader needs is in the paragraph above it, once.
 *
 *  BOTH TRACKS STAY IN THE MARKUP and the inactive one is hidden from assistive
 *  tech and from the pointer, never unmounted: the sentence beside it already
 *  carries both journeys in full, so the drawing is decoration of the copy and
 *  is marked aria-hidden rather than read out twice.
 *
 *  MOTION. CSS keyframes only — travelling dashes against pathLength="100" and
 *  a scale pulse on the three holds. Both tracks are drawn in full underneath,
 *  so the resting frame is the complete journey. See globals.css, "Two
 *  journeys". */

const TRACK_CLASS =
  "col-start-1 row-start-1 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

/** Where the B2B run is held. Three, because the sentence says evaluations are
 *  longer, not that there is a specific number of steps in one. */
const HOLDS = [308, 448, 588];

export function TwoJourneys({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  causes,
  causesMark,
  connects,
  connectsMark,
  journeys,
  journeyKeys,
  children,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  /** The sentence naming the three places demand is lost. */
  causes: string;
  causesMark: string[];
  connects: string;
  connectsMark: string[];
  /** The two-ending sentence. Rendered whole; the two openers become the
   *  control that redraws the track. */
  journeys: string;
  /** Verbatim, contiguous openers inside `journeys`, retail first, in the order
   *  the sentence writes them. The track states are indexed against this. */
  journeyKeys: [string, string];
  children?: React.ReactNode;
}) {
  const [route, setRoute] = useState(0);
  const retail = route === 0;

  /* The sentence, split around its two openers so each becomes a control
     without a single word moving. Same contract as Marked: stripped of tags the
     parts concatenate back to the source exactly, and a key that is absent
     simply renders as prose rather than crashing. */
  const present = journeyKeys.filter((k) => journeys.includes(k));
  const parts = present.length
    ? journeys.split(
        new RegExp(
          "(" +
            present
              .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
              .sort((a, b) => b.length - a.length)
              .join("|") +
            ")",
          "g",
        ),
      )
    : [journeys];

  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip py-16 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse at 72% 0%, black, transparent 70%)",
        }}
      />

      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-12"
        />

        {/* The three places it is lost, in the sentence that names them. */}
        <Rise>
          <p className="font-display max-w-5xl text-[clamp(1.25rem,2.8vw,2.25rem)] font-extrabold uppercase leading-[1.12] text-snow">
            <Marked text={causes} mark={causesMark} className="text-brand" />
          </p>
        </Rise>

        <Rise delay={0.08} className="mt-10 border-t border-line pt-9">
          <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">
            <Marked
              text={connects}
              mark={connectsMark}
              className="font-semibold text-snow"
            />
          </p>
        </Rise>

        {/* ---- The track ---- */}
        <Rise delay={0.12} className="mt-14">
          <div className="rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 sm:p-9">
            {/* The sentence, with its two openers as the control. */}
            <p className="max-w-4xl text-base leading-relaxed text-fog sm:text-lg">
              {parts.map((part, i) => {
                const which = journeyKeys.indexOf(part as (typeof journeyKeys)[number]);
                if (which === -1) return <Fragment key={i}>{part}</Fragment>;
                const on = which === route;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => setRoute(which)}
                    onFocus={() => setRoute(which)}
                    onClick={() => setRoute(which)}
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

            {/* Two tracks in one cell, so the plate never resizes as the reader
                moves between them.
                
                THE WIDE PAIR, and it is wide on purpose: the run out and the
                way back are the two things being compared, and side by side is
                the only arrangement that shows one is longer. Measured on a
                390px phone the 900-unit box came out 292 x 78, which puts a
                shopper mark at three pixels across and a hold at three — so
                below the large breakpoint the same drawing is laid out
                portrait instead of being shrunk to nothing. */}
            <div aria-hidden className="mt-8 hidden lg:grid">
              {/* ---------------------------------------------- retail ---- */}
              <svg
                viewBox="0 0 900 240"
                fill="none"
                className={cn(TRACK_CLASS, retail ? "opacity-100" : "opacity-0")}
              >
                {/* The floor. */}
                <path d="M40 214 H860" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 6" />

                {/* Shoppers, one mark each. */}
                {[104, 130, 156].map((y, row) =>
                  Array.from({ length: 6 }).map((_, col) => (
                    <rect
                      key={`${y}-${col}`}
                      x={44 + col * 24}
                      y={y}
                      width="9"
                      height="9"
                      rx="2"
                      className="journey-mark fill-snow"
                      style={{ animationDelay: `${(row * 6 + col) * 110}ms` }}
                    />
                  )),
                )}

                {/* A short, direct run. */}
                <path d="M204 134 H700" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M204 134 H700"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={retail ? "journey-flow" : undefined}
                />

                {/* The purchase: closed and paid. */}
                <rect
                  x="712"
                  y="104"
                  width="84"
                  height="62"
                  rx="12"
                  className="fill-brand/15"
                  stroke="var(--color-brand)"
                  strokeWidth="1.5"
                />
                <rect x="732" y="122" width="44" height="9" rx="4" className="fill-brand" />
                <rect x="732" y="140" width="24" height="7" rx="3.5" className="fill-brand/50" />

                {/* REPEAT ORDERS: the way back. Thinner than the run out, with
                    the direction marked twice and an arrow into the crowd it
                    returns to, so it reads as a return rather than as a box
                    drawn round the journey. */}
                <path
                  d="M796 134 C842 134 856 116 856 90 C856 60 830 44 788 44 L250 44 C208 44 192 62 192 100"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M796 134 C842 134 856 116 856 90 C856 60 830 44 788 44 L250 44 C208 44 192 62 192 100"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={retail ? "journey-loop" : undefined}
                />
                <g
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M566 37 L558 44 L566 51" />
                  <path d="M362 37 L354 44 L362 51" />
                  <path d="M185 92 L192 100 L199 92" />
                </g>
              </svg>

              {/* ------------------------------------------------- b2b ---- */}
              <svg
                viewBox="0 0 900 240"
                fill="none"
                className={cn(TRACK_CLASS, retail ? "opacity-0" : "opacity-100")}
              >
                <path d="M40 214 H860" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 6" />

                {/* Teams, not people. */}
                {[92, 126, 160].map((y, row) => (
                  <g key={y}>
                    <rect
                      x="44"
                      y={y}
                      width="126"
                      height="26"
                      rx="8"
                      stroke="var(--color-line)"
                      strokeWidth="1.5"
                    />
                    {[0, 1, 2].map((d) => (
                      <rect
                        key={d}
                        x={60 + d * 28}
                        y={y + 8}
                        width="9"
                        height="9"
                        rx="2"
                        className="journey-mark fill-snow"
                        style={{ animationDelay: `${(row * 3 + d) * 180}ms` }}
                      />
                    ))}
                  </g>
                ))}

                {/* A longer run, held three times. */}
                <path d="M184 134 H756" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M184 134 H756"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={retail ? undefined : "journey-flow journey-flow-slow"}
                />
                {HOLDS.map((x, i) => (
                  <g key={x}>
                    <path
                      d={`M${x} 108 V160`}
                      stroke="var(--color-line)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx={x}
                      cy={134}
                      r="10"
                      className={cn("fill-brand", retail ? undefined : "journey-hold")}
                      style={{ animationDelay: `${i * 620}ms` }}
                    />
                  </g>
                ))}

                {/* The enquiry: a quantity, and still open. */}
                <rect
                  x="792"
                  y="76"
                  width="80"
                  height="60"
                  rx="11"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                />
                <rect
                  x="780"
                  y="98"
                  width="80"
                  height="60"
                  rx="11"
                  className="fill-void"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                />
                <rect
                  x="768"
                  y="120"
                  width="80"
                  height="60"
                  rx="11"
                  className="fill-void"
                  stroke="var(--color-brand)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <rect x="788" y="138" width="42" height="9" rx="4" className="fill-brand/70" />
                <rect x="788" y="156" width="24" height="7" rx="3.5" className="fill-brand/35" />
              </svg>
            </div>

            {/* ---- The same two journeys, laid out for a narrow screen ----
                Capped rather than fluid: this portrait box is 320 x 420, so at
                a tablet width it would render nearly a thousand pixels tall and
                the reader would scroll past the middle of the journey. */}
            <div aria-hidden className="mx-auto mt-8 grid w-full max-w-[22rem] lg:hidden">
              {/* --------------------------------------- retail, portrait -- */}
              <svg
                viewBox="0 0 320 420"
                fill="none"
                className={cn(TRACK_CLASS, retail ? "opacity-100" : "opacity-0")}
              >
                <path d="M30 398 H290" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 6" />

                {/* Shoppers, one mark each. */}
                {[20, 44, 68].map((y, row) =>
                  Array.from({ length: 6 }).map((_, col) => (
                    <rect
                      key={`${y}-${col}`}
                      x={68 + col * 24}
                      y={y}
                      width="10"
                      height="10"
                      rx="2.5"
                      className="journey-mark fill-snow"
                      style={{ animationDelay: `${(row * 6 + col) * 110}ms` }}
                    />
                  )),
                )}

                {/* A short, direct run. */}
                <path d="M160 100 V300" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M160 100 V300"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={retail ? "journey-flow" : undefined}
                />

                {/* The purchase: closed and paid. */}
                <rect
                  x="118"
                  y="312"
                  width="84"
                  height="62"
                  rx="12"
                  className="fill-brand/15"
                  stroke="var(--color-brand)"
                  strokeWidth="1.5"
                />
                <rect x="138" y="330" width="44" height="9" rx="4" className="fill-brand" />
                <rect x="138" y="348" width="24" height="7" rx="3.5" className="fill-brand/50" />

                {/* Repeat orders: the way back, up the side. */}
                <path
                  d="M202 344 C248 344 272 322 272 284 L272 132 C272 98 250 86 224 86"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M202 344 C248 344 272 322 272 284 L272 132 C272 98 250 86 224 86"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={retail ? "journey-loop" : undefined}
                />
                <g
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Up the side: the return travels from the purchase back
                      to the crowd, so the mark points the way the flow goes. */}
                  <path d="M265 252 L272 244 L279 252" />
                  <path d="M232 79 L224 86 L232 93" />
                </g>
              </svg>

              {/* ------------------------------------------ b2b, portrait -- */}
              <svg
                viewBox="0 0 320 420"
                fill="none"
                className={cn(TRACK_CLASS, retail ? "opacity-0" : "opacity-100")}
              >
                <path d="M30 398 H290" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="2 6" />

                {/* Teams, not people. */}
                {[14, 48, 82].map((y, row) => (
                  <g key={y}>
                    <rect
                      x="100"
                      y={y}
                      width="120"
                      height="26"
                      rx="8"
                      stroke="var(--color-line)"
                      strokeWidth="1.5"
                    />
                    {[0, 1, 2].map((d) => (
                      <rect
                        key={d}
                        x={116 + d * 30}
                        y={y + 8}
                        width="10"
                        height="10"
                        rx="2.5"
                        className="journey-mark fill-snow"
                        style={{ animationDelay: `${(row * 3 + d) * 180}ms` }}
                      />
                    ))}
                  </g>
                ))}

                {/* A longer run, held three times. */}
                <path d="M160 120 V288" stroke="var(--color-line)" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M160 120 V288"
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={retail ? undefined : "journey-flow journey-flow-slow"}
                />
                {[164, 204, 244].map((y, i) => (
                  <g key={y}>
                    <path
                      d={`M136 ${y} H184`}
                      stroke="var(--color-line)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx={160}
                      cy={y}
                      r="10"
                      className={cn("fill-brand", retail ? undefined : "journey-hold")}
                      style={{ animationDelay: `${i * 620}ms` }}
                    />
                  </g>
                ))}

                {/* The enquiry: a quantity, and still open. */}
                <rect
                  x="140"
                  y="296"
                  width="84"
                  height="62"
                  rx="11"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                />
                <rect
                  x="128"
                  y="312"
                  width="84"
                  height="62"
                  rx="11"
                  className="fill-void"
                  stroke="var(--color-line)"
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                />
                <rect
                  x="116"
                  y="328"
                  width="84"
                  height="62"
                  rx="11"
                  className="fill-void"
                  stroke="var(--color-brand)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <rect x="136" y="346" width="44" height="9" rx="4" className="fill-brand/70" />
                <rect x="136" y="364" width="24" height="7" rx="3.5" className="fill-brand/35" />
              </svg>
            </div>
          </div>
        </Rise>

        {children}
      </Container>
    </section>
  );
}

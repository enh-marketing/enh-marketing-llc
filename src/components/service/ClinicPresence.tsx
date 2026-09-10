"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** One healthcare provider's presence, and the six places the document's six
 *  services act on it.
 *
 *  WHY THIS DRAWING. Read the six services closely and not one of them is a
 *  category: each works a different PART of what a patient meets while
 *  researching a provider. SEO is "treatment pages, specialist profiles,
 *  location content and internal links" reached from a search — a results list
 *  with an index under it whose leaves are those four things and whose internal
 *  link is drawn as a link. PPC "provides a clear route to call, enquire or
 *  request an appointment" — a bought slot with three controls, one per route.
 *  Content is "treatment pages, specialist content, educational articles and
 *  campaign landing pages" — the page a patient reads with an article behind
 *  it. Social has the sentence no other document on this site contains: "with
 *  clear approval processes to protect accuracy" — a post that passes a gate
 *  before it reaches anybody. Local SEO is "Google Business Profiles, location
 *  details, service categories and local pages ... calls, website visits,
 *  direction requests and appointment enquiries" — a place on a map, a profile
 *  beside it and a direction leaving it. AI Search is "treatment explanations,
 *  provider information, patient FAQs and location details" structured so a
 *  system can "retrieve relevant information" — a question, the record it
 *  reads, and an answer that names a provider.
 *
 *  THE GATE IS THE ONE THIS PAGE HAS AND THE OTHER FIVE INDUSTRY DRAWINGS DO
 *  NOT. It is drawn because the client wrote it, and it is drawn as a gate
 *  rather than as a tick on a card because the sentence is about a process
 *  something passes through, not about a property something has.
 *
 *  WHAT IT DELIBERATELY DOES NOT BORROW FROM `FreightPresence`, which is the
 *  drawing this section's arrangement comes from. That one has a route index of
 *  origin-and-destination pairs, a request-for-pricing control, a professional
 *  feed, a trade corridor and an answer assembled from source blocks. None of
 *  those is here. A patient does not run a corridor and does not ask for a
 *  quotation: this document's journey ends at an appointment, so the paid
 *  region carries three ways to reach a clinic rather than one way to price a
 *  shipment, and the assistant's answer names a provider rather than printing
 *  three lines of prose.
 *
 *  NOTHING IS LABELLED. Every service is named twice already — once in the
 *  selector above the drawing and once in the panel beside it — so a third
 *  printing on the drawing itself would be the same words three times.
 *
 *  NOTHING IS COUNTED. Two results, four index leaves, three controls, four
 *  record fields and three readers are the numbers that read as "a list", "an
 *  index" and "an audience". The document gives no quantity for any of them,
 *  no region is larger than another to mean anything, and there is no axis
 *  anywhere on this drawing.
 *
 *  THREE LOOPS, ALL OF THEM VERBS THE DOCUMENT USES. A tick draws itself at the
 *  approval gate, because approval is a thing done rather than a state; packets
 *  run the retrieval joins, because "retrieve" is the AI service's own word;
 *  and a sweep crosses the local map, because a nearby search is repeated
 *  rather than made once. Everything is drawn in full underneath, so a browser
 *  that never runs an animation still shows the whole presence.
 *
 *  Driven entirely by CSS colour transitions on the selected index: one lever
 *  per region — the group's `color` — with every stroke and fill inside it
 *  reading currentColor.
 *
 *  PIN PLACEMENT IS CONSTRAINED BY THE PINS THEMSELVES. Each indicator renders
 *  at 28px, about 23 viewBox units here, so two of them need roughly 45 units
 *  between centres before they collide. The closest pair on this drawing is 84
 *  apart. */

const W = 520;
const H = 420;

/** Where each service's pin stands, in viewBox units, in the document's order.
 *  Chosen for the part of the presence the service works, then checked against
 *  every other pin for collision at the 28px they render at. */
const PINS: [number, number][] = [
  [86, 162], // 01 SEO — the index under the results
  [390, 91], // 02 PPC — the three routes under the bought slot
  [120, 268], // 03 content — the page a patient reads
  [455, 144], // 04 social — the approval gate
  [110, 376], // 05 local — the place, and the direction leaving it
  [432, 322], // 06 AI — the answer that names a provider
];

/** The index under the search results. Four leaves, and they are the four
 *  things the SEO service's own sentence names, in its order. */
const LEAVES: { y: number; kind: "page" | "person" | "place" }[] = [
  { y: 132, kind: "page" },
  { y: 148, kind: "page" },
  { y: 164, kind: "person" },
  { y: 180, kind: "place" },
];

/** The clinic's structured record, as an assistant reads it. Four fields, one
 *  per thing the AI service's sentence names. */
const RECORD: { y: number; kind: "lines" | "person" | "ask" | "place" }[] = [
  { y: 284, kind: "lines" },
  { y: 304, kind: "person" },
  { y: 324, kind: "ask" },
  { y: 344, kind: "place" },
];

/** A region's one lever. Everything inside reads currentColor. */
function region(on: boolean) {
  return cn(
    "transition-[color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
    on ? "text-brand opacity-100" : "text-line opacity-60",
  );
}

export function ClinicPresence({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const on = (i: number) => i === active;

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden fill="none">
          {/* ---- 01  The search, its results, and the index under them ---- */}
          <g className={region(on(0))} stroke="currentColor" strokeWidth="1.5">
            <rect x="22" y="16" width="196" height="30" rx="15" />
            <circle cx="44" cy="31" r="6.5" />
            <path d="M48.5 35.5 L54 41" strokeLinecap="round" />
            <path d="M66 27 H152" strokeLinecap="round" opacity="0.55" />
            <path d="M66 36 H120" strokeLinecap="round" opacity="0.3" />

            {/* Two results. Two reads as a list, and the document names no
                number. */}
            {[
              { y: 58, a: 142, b: 108 },
              { y: 90, a: 152, b: 120 },
            ].map((r) => (
              <g key={r.y}>
                <rect x="22" y={r.y} width="196" height="26" rx="5" />
                <path d={`M34 ${r.y + 10} H${r.a}`} strokeLinecap="round" opacity="0.45" />
                <path d={`M34 ${r.y + 19} H${r.b}`} strokeLinecap="round" opacity="0.22" />
              </g>
            ))}

            {/* The index: a spine with four leaves — two treatment pages, a
                specialist and a location — and one internal link running
                between two of them, because "internal links" is the fourth
                thing this service's sentence names. */}
            <path d="M30 126 V188" strokeLinecap="round" />
            {LEAVES.map((leaf) => (
              <g key={leaf.y}>
                <path d={`M30 ${leaf.y + 6} H50`} strokeLinecap="round" />
                {leaf.kind === "page" && (
                  <>
                    <rect
                      x="50"
                      y={leaf.y}
                      width="38"
                      height="12"
                      rx="2.5"
                      className="fill-current"
                      fillOpacity="0.16"
                    />
                    <path d={`M96 ${leaf.y + 6} H186`} strokeLinecap="round" opacity="0.3" />
                  </>
                )}
                {leaf.kind === "person" && (
                  <>
                    <circle cx="58" cy={leaf.y + 6} r="5" />
                    <path
                      d={`M68 ${leaf.y + 11} Q76 ${leaf.y - 1} 84 ${leaf.y + 11}`}
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                    <path d={`M96 ${leaf.y + 6} H170`} strokeLinecap="round" opacity="0.3" />
                  </>
                )}
                {leaf.kind === "place" && (
                  <>
                    <path
                      d={`M60 ${leaf.y + 12} L54 ${leaf.y + 3} A6.5 6.5 0 1 1 66 ${leaf.y + 3} Z`}
                      strokeLinejoin="round"
                    />
                    <path d={`M96 ${leaf.y + 6} H160`} strokeLinecap="round" opacity="0.3" />
                  </>
                )}
              </g>
            ))}
            {/* The internal link: one leaf pointing at another. */}
            <path
              d="M92 138 Q112 152 92 170"
              strokeLinecap="round"
              strokeDasharray="3 4"
              opacity="0.65"
            />
            <path d="M96 166 L92 170 L96 174" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
          </g>

          {/* ---- 02  The bought slot, and the three ways to reach a clinic ---- */}
          <g className={region(on(1))} stroke="currentColor" strokeWidth="1.5">
            <rect x="272" y="16" width="226" height="56" rx="7" />
            {/* The mark that says this slot is bought, not earned. */}
            <rect
              x="284"
              y="26"
              width="26"
              height="9"
              rx="4.5"
              className="fill-current"
              fillOpacity="0.55"
            />
            <path d="M284 47 H452" strokeLinecap="round" opacity="0.45" />
            <path d="M284 57 H404" strokeLinecap="round" opacity="0.22" />

            {/* Call, enquire, request an appointment: three controls, and no
                two of them are the same shape. */}
            <g>
              <rect x="272" y="82" width="64" height="20" rx="10" className="fill-current" fillOpacity="0.14" />
              <path
                d="M296 88 q-4 0 -4 4 a12 12 0 0 0 10 8 q4 0 4 -4"
                strokeLinecap="round"
                strokeWidth="1.4"
              />
            </g>
            <g>
              <rect x="348" y="82" width="64" height="20" rx="10" className="fill-current" fillOpacity="0.14" />
              <path d="M364 89 H398 M364 96 H386" strokeLinecap="round" strokeWidth="1.4" opacity="0.8" />
            </g>
            <g>
              <rect x="424" y="82" width="74" height="20" rx="10" className="fill-current" fillOpacity="0.14" />
              <rect x="438" y="87" width="46" height="10" rx="2" strokeWidth="1.2" />
              <path d="M446 87 V83 M476 87 V83" strokeLinecap="round" strokeWidth="1.2" />
              <path d="M446 93 H452 M458 93 H464 M470 93 H476" strokeLinecap="round" strokeWidth="1.4" opacity="0.85" />
            </g>
          </g>

          {/* ---- 03  The page a patient reads, and the article behind it ---- */}
          <g className={region(on(2))} stroke="currentColor" strokeWidth="1.5">
            <rect x="40" y="210" width="196" height="106" rx="6" opacity="0.45" />
            <rect x="22" y="224" width="196" height="106" rx="6" className="fill-current" fillOpacity="0.04" />
            <rect
              x="34"
              y="238"
              width="88"
              height="11"
              rx="2.5"
              className="fill-current"
              fillOpacity="0.35"
            />
            <path d="M34 262 H200" strokeLinecap="round" opacity="0.45" />
            <path d="M34 274 H176" strokeLinecap="round" opacity="0.32" />
            <path d="M34 286 H192" strokeLinecap="round" opacity="0.45" />
            {/* The route off the page. A patient who understands the service is
                the one who asks for an appointment. */}
            <rect x="34" y="300" width="64" height="16" rx="8" className="fill-current" fillOpacity="0.28" />
            <path d="M46 308 H86" strokeLinecap="round" opacity="0.8" strokeWidth="1.4" />
          </g>

          {/* ---- 04  The post, the approval it passes, and who then sees it ---- */}
          <g className={region(on(3))} stroke="currentColor" strokeWidth="1.5">
            <rect x="272" y="116" width="150" height="56" rx="7" />
            <circle cx="294" cy="138" r="10" />
            <path d="M312 132 H408" strokeLinecap="round" opacity="0.45" />
            <path d="M312 144 H384" strokeLinecap="round" opacity="0.28" />
            <path d="M284 158 H340" strokeLinecap="round" opacity="0.22" />

            {/* The gate. Nothing reaches anybody until the tick is drawn. */}
            <path d="M422 144 H436" strokeLinecap="round" opacity="0.6" />
            <path d="M440 124 V164 M470 124 V164" strokeLinecap="round" />
            <path
              d="M446 145 L453 152 L466 136"
              pathLength="100"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ci-draw"
            />

            {/* And out, to the people the campaign was planned around. */}
            <path d="M455 164 V186" strokeLinecap="round" opacity="0.6" strokeDasharray="3 5" />
            <path d="M272 206 H498" strokeLinecap="round" opacity="0.3" />
            {[300, 340, 380, 420, 460].map((cx, i) => (
              <g key={cx} opacity={i < 3 ? 1 : 0.45}>
                <circle cx={cx} cy="196" r="7" />
                <path
                  d={`M${cx - 11} 206 Q${cx} 190 ${cx + 11} 206`}
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </g>
            ))}
          </g>

          {/* ---- 06  The question, the record, and the answer ---- */}
          <g className={region(on(5))} stroke="currentColor" strokeWidth="1.5">
            <rect x="272" y="238" width="128" height="24" rx="12" />
            <path d="M286 250 H372" strokeLinecap="round" opacity="0.45" />

            {RECORD.map((f) => (
              <g key={f.y}>
                <rect
                  x="272"
                  y={f.y}
                  width="72"
                  height="14"
                  rx="3"
                  className="fill-current"
                  fillOpacity="0.12"
                />
                {f.kind === "lines" && (
                  <path
                    d={`M280 ${f.y + 5} H330 M280 ${f.y + 10} H316`}
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                )}
                {f.kind === "person" && (
                  <>
                    <circle cx="284" cy={f.y + 7} r="3.6" strokeWidth="1.2" />
                    <path d={`M294 ${f.y + 7} H332`} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
                  </>
                )}
                {f.kind === "ask" && (
                  <>
                    <circle cx="284" cy={f.y + 7} r="4.4" strokeWidth="1.2" />
                    <path d={`M284 ${f.y + 4} V${f.y + 7}`} strokeWidth="1.2" strokeLinecap="round" />
                    <path d={`M294 ${f.y + 7} H326`} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
                  </>
                )}
                {f.kind === "place" && (
                  <>
                    <path
                      d={`M284 ${f.y + 12} L279 ${f.y + 5} A5 5 0 1 1 289 ${f.y + 5} Z`}
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                    <path d={`M296 ${f.y + 7} H330`} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
                  </>
                )}

                {/* Retrieval, running. Each join is drawn in full first:
                    `ci-flow` is a 14% dash on a 100-unit path, so a join with
                    nothing under it is 86% gap and vanishes when stopped. */}
                <path d={`M344 ${f.y + 7} H364`} strokeLinecap="round" opacity="0.5" />
                <path
                  d={`M344 ${f.y + 7} H364`}
                  pathLength="100"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="ci-flow"
                  style={{ animationDelay: `${RECORD.indexOf(f) * 520}ms` }}
                />
              </g>
            ))}

            {/* The answer. It names a provider, which is what "retrieve
                relevant information when people research available healthcare
                services" produces. */}
            <rect x="364" y="284" width="134" height="74" rx="7" />
            <rect
              x="376"
              y="296"
              width="72"
              height="10"
              rx="2.5"
              className="fill-current"
              fillOpacity="0.4"
            />
            <path d="M376 316 H484" strokeLinecap="round" opacity="0.4" />
            <path d="M376 326 H460" strokeLinecap="round" opacity="0.25" />
            <rect x="376" y="336" width="54" height="12" rx="6" className="fill-current" fillOpacity="0.28" />
          </g>

          {/* ---- 05  The place, the profile beside it, the direction out ---- */}
          <g className={region(on(4))} stroke="currentColor" strokeWidth="1.5">
            <rect x="22" y="344" width="216" height="66" rx="6" />
            {/* Ground. Two ways crossing, so a rectangle reads as somewhere. */}
            <path d="M22 384 H238" strokeLinecap="round" opacity="0.22" />
            <path d="M136 344 V410" strokeLinecap="round" opacity="0.22" />
            {/* The sweep: a nearby search is repeated, not made once. */}
            <rect x="14" y="346" width="22" height="62" className="ci-scan-x fill-current" fillOpacity="0.14" />

            {/* The clinic. */}
            <path d="M78 384 L70 371 A9.5 9.5 0 1 1 86 371 Z" strokeLinejoin="round" />
            <circle cx="78" cy="366" r="3.6" className="fill-current" fillOpacity="0.8" stroke="none" />

            {/* The direction leaving it. */}
            <path d="M84 380 Q106 384 122 372" strokeLinecap="round" strokeDasharray="4 5" />
            <path d="M116 368 L123 371 L119 378" strokeLinecap="round" strokeLinejoin="round" />

            {/* The profile: a name, and the categories under it. */}
            <rect x="156" y="352" width="72" height="50" rx="4" className="fill-current" fillOpacity="0.05" />
            <rect
              x="164"
              y="360"
              width="42"
              height="9"
              rx="2"
              className="fill-current"
              fillOpacity="0.35"
            />
            {/* The service categories, ticked. Lengths differ because the
                categories a clinic lists are not the same length. */}
            {[
              { y: 377, to: 220 },
              { y: 387, to: 212 },
              { y: 397, to: 218 },
            ].map((cat) => (
              <g key={cat.y}>
                <path
                  d={`M164 ${cat.y} l3 3 l6 -6`}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={`M180 ${cat.y + 1} H${cat.to}`}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </g>
            ))}
          </g>
        </svg>

        {/* The indicators, standing where each service works. */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: count }).map((_, i) => {
            const [x, y] = PINS[i] ?? PINS[0];
            return (
              <span
                key={i}
                className="absolute"
                style={{
                  left: `${(x / W) * 100}%`,
                  top: `${(y / H) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {pin(i)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** One freight company's presence, and the six places the document's six
 *  services act on it.
 *
 *  WHY THIS DRAWING. Read the six services closely and none of them is a
 *  category: each one works a different PART of what a procurement team sees
 *  while it is researching a provider. SEO is "freight and cargo service pages,
 *  route content, internal links" reached from a search — a results list with a
 *  route index under it. Paid is Google Search and LinkedIn placements that
 *  "give them a clear way to request information or pricing" — a bought slot
 *  with a request control in it. Content is "service pages, route pages ... and
 *  case studies so visitors can assess capabilities, coverage and experience" —
 *  the page they read, with those three things on it and the case studies
 *  underneath. LinkedIn reaches "procurement teams, supply chain managers and
 *  operations professionals" — a professional feed, three posts, three
 *  different readers. International is "several countries, routes or trade
 *  corridors ... without creating repetitive pages" — a corridor with four
 *  destinations on it, and four pages that are deliberately NOT the same shape.
 *  AI is "service explanations, industry FAQs, location information and route
 *  content" structured so a system can "retrieve relevant information" — source
 *  blocks on one side, an assembled answer on the other, and the retrieval
 *  running between them.
 *
 *  So the drawing is the presence, and the pins stand where each service works.
 *  Selecting a service lights that part and quiets the rest, which is what
 *  makes the drawing the map rather than an illustration beside one.
 *
 *  WHAT IT DELIBERATELY DOES NOT BORROW FROM `CommerceSystem`, WHICH IS THE
 *  DRAWING THIS SECTION'S ARRANGEMENT COMES FROM. That one is a store: a
 *  category tree, a paid shelf of product tiles, a checkout column and a
 *  measurement rail along the bottom. None of those is here. A logistics buyer
 *  never reaches a checkout — the document's own journey ends at "Enquiry" —
 *  and there is no measurement service in this document's six. What replaces
 *  them is what this document actually has: routes drawn as origin-to-
 *  destination pairs rather than as categories, a request-for-pricing control
 *  rather than a cart, a trade corridor along the bottom rather than a
 *  performance rail, and an assistant's answer assembled out of structured
 *  blocks.
 *
 *  NOTHING IS LABELLED HERE. Every service is named twice already — once in the
 *  selector above the drawing and once in the panel beside it — so a third
 *  printing on the drawing itself would be the same words three times.
 *
 *  NOTHING IS COUNTED. Two organic results, three route rows, three feed posts,
 *  three source blocks and four destinations are the numbers that read as "a
 *  list", "a feed" and "several"; the document gives no quantity for any of
 *  them and none is implied. No region is drawn larger than another to mean
 *  anything, and there is no axis anywhere.
 *
 *  TWO LOOPS, BOTH MEANING SOMETHING. A packet travels the corridor, because a
 *  corridor with nothing moving on it is a line; and the three retrieval joins
 *  carry packets into the answer, because retrieval is the verb the AI service's
 *  own sentence uses. Everything is drawn in full underneath, so a browser that
 *  never runs an animation still shows the whole presence.
 *
 *  Driven entirely by CSS colour transitions on the selected index: one lever
 *  per region — the group's `color` — with every stroke and fill inside it
 *  reading currentColor.
 *
 *  PIN PLACEMENT IS CONSTRAINED BY THE PINS THEMSELVES, not only by the
 *  drawing. Each indicator renders at 28px, which is about 23 viewBox units
 *  here, so two of them need roughly 45 units between centres before they
 *  collide. The closest pair on this drawing is 113 apart. */

const W = 520;
const H = 420;

/** Where each service's pin stands, in viewBox units, in the document's order.
 *  Chosen for the part of the presence the service works, then checked against
 *  every other pin for collision at the 28px they render at. */
const PINS: [number, number][] = [
  [86, 164], // 01 SEO — the route index under the results
  [368, 90], // 02 paid — the bought slot with the request control
  [122, 262], // 03 content — the page a buyer assesses
  [400, 203], // 04 LinkedIn — the middle post in the feed
  [208, 392], // 05 international — the corridor
  [420, 318], // 06 AI — the assembled answer
];

/** The three route rows in the index: an origin, an arrow, a destination. Top
 *  edge of each row, so the arrow and the bars share one centre line. */
const ROUTE_ROWS = [134, 158, 182];

/** The feed's three posts. Top edge of each. */
const FEED_ROWS = [132, 182, 232];

/** The AI service's three source blocks. Top edge of each. */
const SOURCE_ROWS = [288, 310, 332];

/** The corridor's four destinations, and the page at each one. The line
 *  patterns differ on purpose: the service's own sentence is about addressing
 *  several markets "without creating repetitive pages that add little value for
 *  buyers in different markets", and four identical pages would draw the thing
 *  it says not to do. */
const DESTINATIONS: { cx: number; lines: [number, number][] }[] = [
  { cx: 90, lines: [[14, 22], [8, 12]] },
  { cx: 208, lines: [[10, 26], [16, 14]] },
  { cx: 326, lines: [[18, 16], [12, 24]] },
  { cx: 444, lines: [[8, 28], [20, 10]] },
];

/** A region's one lever. Everything inside reads currentColor. */
function region(on: boolean) {
  return cn(
    "transition-[color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
    on ? "text-brand opacity-100" : "text-line opacity-60",
  );
}

export function FreightPresence({
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
          {/* ---- 01  The search, its results, and the route index under them ---- */}
          <g className={region(on(0))} stroke="currentColor" strokeWidth="1.5">
            <rect x="22" y="16" width="196" height="30" rx="15" />
            <circle cx="44" cy="31" r="6.5" />
            <path d="M48.5 35.5 L54 41" strokeLinecap="round" />
            <path d="M66 27 H150" strokeLinecap="round" opacity="0.55" />
            <path d="M66 36 H124" strokeLinecap="round" opacity="0.3" />

            {/* Two results. Two, because two reads as a list and the document
                names no number. */}
            {[
              { y: 58, a: 140, b: 110 },
              { y: 90, a: 150, b: 118 },
            ].map((r) => (
              <g key={r.y}>
                <rect x="22" y={r.y} width="196" height="26" rx="5" />
                <path d={`M34 ${r.y + 10} H${r.a}`} strokeLinecap="round" opacity="0.45" />
                <path d={`M34 ${r.y + 19} H${r.b}`} strokeLinecap="round" opacity="0.22" />
              </g>
            ))}

            {/* The route index. Internal links down a spine, and each entry is
                an origin and a destination rather than a category. */}
            <path d="M30 130 V196" strokeLinecap="round" />
            {ROUTE_ROWS.map((y) => (
              <g key={y}>
                <path d={`M30 ${y + 6} H52`} strokeLinecap="round" />
                <rect
                  x="52"
                  y={y}
                  width="26"
                  height="12"
                  rx="3"
                  className="fill-current"
                  fillOpacity="0.16"
                />
                <path d={`M82 ${y + 6} H93`} strokeLinecap="round" />
                <path
                  d={`M89 ${y + 2} L93 ${y + 6} L89 ${y + 10}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="97"
                  y={y}
                  width="32"
                  height="12"
                  rx="3"
                  className="fill-current"
                  fillOpacity="0.16"
                />
                <path d={`M135 ${y + 6} H188`} strokeLinecap="round" opacity="0.35" />
              </g>
            ))}
          </g>

          {/* ---- 02  The bought slots, and the way to ask for pricing ---- */}
          <g className={region(on(1))} stroke="currentColor" strokeWidth="1.5">
            {[16, 68].map((y) => (
              <g key={y}>
                <rect x="240" y={y} width="258" height="44" rx="7" />
                {/* The mark that says this slot is bought, not earned. */}
                <rect
                  x="252"
                  y={y + 10}
                  width="26"
                  height="9"
                  rx="4.5"
                  className="fill-current"
                  fillOpacity="0.55"
                />
                <path d={`M252 ${y + 28} H420`} strokeLinecap="round" opacity="0.45" />
                <path d={`M252 ${y + 36} H370`} strokeLinecap="round" opacity="0.22" />
              </g>
            ))}
            {/* The request control. There is no cart on this drawing and there
                is none in this document: the journey ends at an enquiry. */}
            <rect
              x="430"
              y="84"
              width="56"
              height="18"
              rx="9"
              className="fill-current"
              fillOpacity="0.3"
            />
            <path d="M442 93 H470" strokeLinecap="round" opacity="0.7" />
          </g>

          {/* ---- 03  The page a buyer assesses ---- */}
          <g className={region(on(2))} stroke="currentColor" strokeWidth="1.5">
            <rect x="22" y="212" width="200" height="112" rx="8" />
            <rect
              x="34"
              y="226"
              width="100"
              height="12"
              rx="3"
              className="fill-current"
              fillOpacity="0.3"
            />
            {/* Capabilities, coverage and experience: three things stated, each
                with its own account beside it. */}
            {[
              { y: 250, to: 196 },
              { y: 268, to: 176 },
              { y: 286, to: 188 },
            ].map((b) => (
              <g key={b.y}>
                <rect
                  x="34"
                  y={b.y}
                  width="44"
                  height="10"
                  rx="2.5"
                  className="fill-current"
                  fillOpacity="0.18"
                />
                <path d={`M84 ${b.y + 5} H${b.to}`} strokeLinecap="round" opacity="0.35" />
              </g>
            ))}
            {/* The case studies. */}
            <rect x="34" y="304" width="62" height="14" rx="3" />
            <rect x="104" y="304" width="62" height="14" rx="3" />
          </g>

          {/* ---- 04  The professional feed, and its three kinds of reader ---- */}
          <g className={region(on(3))} stroke="currentColor" strokeWidth="1.5">
            {FEED_ROWS.map((y, i) => (
              <g key={y}>
                <rect x="300" y={y} width="198" height="42" rx="7" />
                <circle cx="322" cy={y + 21} r="10" />
                {/* Each post reaches a different desk, so no two of these
                    marks are the same. */}
                {i === 0 && <path d={`M317 ${y + 24} H327 M322 ${y + 15} V${y + 24}`} strokeLinecap="round" opacity="0.7" />}
                {i === 1 && <circle cx="322" cy={y + 21} r="4" className="fill-current" fillOpacity="0.7" />}
                {i === 2 && <path d={`M316 ${y + 21} H328 M322 ${y + 15} V${y + 27}`} strokeLinecap="round" opacity="0.7" />}
                <path d={`M342 ${y + 15} H478`} strokeLinecap="round" opacity="0.4" />
                <path d={`M342 ${y + 28} H438`} strokeLinecap="round" opacity="0.22" />
              </g>
            ))}
          </g>

          {/* ---- 06  The answer, assembled out of what was structured ---- */}
          <g className={region(on(5))} stroke="currentColor" strokeWidth="1.5">
            {SOURCE_ROWS.map((y) => (
              <rect
                key={y}
                x="300"
                y={y}
                width="34"
                height="14"
                rx="3"
                className="fill-current"
                fillOpacity="0.16"
              />
            ))}
            {/* Retrieval, running. The joins are drawn in full first: `ci-flow`
                is a 14% dash on a 100-unit path, so a join with nothing under
                it is 86% gap and vanishes when the animation is stopped. */}
            {SOURCE_ROWS.map((y, i) => (
              <g key={`join-${y}`}>
                <path d={`M334 ${y + 7} H352`} strokeLinecap="round" opacity="0.5" />
                <path
                  d={`M334 ${y + 7} H352`}
                  pathLength="100"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="ci-flow"
                  style={{ animationDelay: `${i * 600}ms` }}
                />
              </g>
            ))}
            <rect x="352" y="286" width="146" height="64" rx="7" />
            <path d="M364 302 H482" strokeLinecap="round" opacity="0.45" />
            <path d="M364 314 H460" strokeLinecap="round" opacity="0.3" />
            <path d="M364 326 H472" strokeLinecap="round" opacity="0.45" />
          </g>

          {/* ---- 05  The corridor, and a page at each destination ---- */}
          <g className={region(on(4))} stroke="currentColor" strokeWidth="1.5">
            {/* The corridor's own width, so it reads as ground rather than as a
                series on a chart. */}
            <path d="M22 392 H498" strokeWidth="9" opacity="0.14" strokeLinecap="round" />
            <path d="M22 392 H498" strokeLinecap="round" />
            <path
              d="M22 392 H498"
              pathLength="100"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="ci-flow"
            />

            {DESTINATIONS.map((d) => (
              <g key={d.cx}>
                <circle cx={d.cx} cy="392" r="5" className="fill-current" fillOpacity="0.7" />
                <path d={`M${d.cx} 380 V387`} strokeLinecap="round" opacity="0.6" />
                <rect x={d.cx - 20} y="356" width="40" height="24" rx="3" />
                {d.lines.map(([from, len], i) => (
                  <path
                    key={i}
                    d={`M${d.cx - 20 + from} ${364 + i * 8} H${d.cx - 20 + from + len}`}
                    strokeLinecap="round"
                    opacity={i === 0 ? "0.45" : "0.25"}
                  />
                ))}
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

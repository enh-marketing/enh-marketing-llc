"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** One dealership's presence, and the six places the document's six services
 *  act on it.
 *
 *  WHY THIS DRAWING. Read closely, the six services are not six categories:
 *  each one works a different SURFACE that the same customer passes. SEO is
 *  about "model pages, service pages, location content and internal links" and
 *  the searches that reach them — a results surface and the routes off it. PPC
 *  is "Google Search, Display, Bing and Meta" bought "around model interest and
 *  service demand" — a paid placement above those results. Social "keeps offers
 *  visible during a longer decision process" — a feed. Content and landing
 *  pages are "model pages, comparison content, service pages" that "must answer
 *  the questions behind each search" — the page itself, specifications and all.
 *  AI Search Visibility structures "model information, service descriptions,
 *  location details, comparison content and FAQs" so an assistant can "retrieve
 *  relevant information" — an answer, and the only edge here that is dashed,
 *  because the document says placement "cannot be guaranteed". Google Maps and
 *  Local Visibility is a place, a profile and a set of "near me" searches
 *  ending in "calls, website visits, direction requests and service bookings" —
 *  the ground at the foot of it all.
 *
 *  So the drawing is that presence, and the pins stand where each service
 *  works. Selecting a service lights its surface and quiets the rest, which is
 *  what makes the drawing the map rather than an illustration beside one.
 *
 *  THE COLUMNS ARE THE ARGUMENT. Everything on the left is a surface the
 *  business owns and can change; everything on the right is a surface it has to
 *  earn or buy a place on; the band across the foot is the physical place both
 *  columns are trying to get somebody to. That is this page's own banner
 *  drawing restated at the scale of one screen, which is why the map band
 *  carries a travelling approach and nothing else here moves.
 *
 *  NOTHING IS LABELLED HERE. Every service is named once, in the selector and
 *  the panel beside this. Nothing is counted either: three offer cards because
 *  three reads as a row, three feed rows because three reads as a feed, and no
 *  region drawn larger than another for emphasis.
 *
 *  Driven by CSS colour transitions on the selected index: one lever per region
 *  — the group's `color` — with every stroke and fill inside it reading
 *  currentColor.
 *
 *  PIN PLACEMENT IS CONSTRAINED BY THE PINS THEMSELVES. Each indicator renders
 *  at 28px, about 29 viewBox units here, so two need roughly 45 units between
 *  centres before they collide, and a pin on a plate's outer edge is
 *  half-clipped by its own rounded corner. Every pin below is therefore set
 *  inside its region rather than on its corner, and the closest pair is 122
 *  units apart. */

const W = 520;
const H = 400;

/** Where each service's pin stands, in viewBox units, in the document's own
 *  order. Chosen for the surface the service works, then spread so no two
 *  indicators collide at the 28px they render at. */
const PINS: [number, number][] = [
  [78, 100], // 01 SEO and Dealer SEO — the results the searches reach
  [384, 62], // 02 PPC — the bought placement above them
  [400, 290], // 03 social — the feed
  [128, 252], // 04 content and landing pages — the model page itself
  [316, 180], // 05 AI search visibility — the answer
  [240, 367], // 06 Google Maps and local — the ground
];

/** The three organic results, and the routes off them into the site's own
 *  pages. Internal links are named in the SEO paragraph, so they are drawn. */
const RESULT_ROWS = [66, 100, 134];

/** The approach across the map band. Carries pathLength="100" so `ci-flow`'s
 *  dash is a percentage of it, and it is drawn in full underneath first: a flow
 *  path on its own is 86% gap and disappears entirely when stopped. */
const APPROACH = "M40 382 H100 C126 382 126 372 152 372 H240";

/** A region's one lever. Everything inside reads currentColor. */
function region(on: boolean) {
  return cn(
    "transition-[color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
    on ? "text-brand opacity-100" : "text-line opacity-60",
  );
}

export function DealerSurfaces({
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
          {/* ---- 01  The search, its results, and the routes off them ---- */}
          <g className={region(on(0))} stroke="currentColor" strokeWidth="1.5">
            <rect x="24" y="20" width="206" height="30" rx="15" />
            <circle cx="45" cy="35" r="6" />
            <path d="M49.5 39.5 L55 45" strokeLinecap="round" />
            <path d="M64 31 H158" strokeLinecap="round" opacity="0.55" />
            <path d="M64 40 H124" strokeLinecap="round" opacity="0.3" />

            {RESULT_ROWS.map((y) => (
              <g key={y}>
                <path d={`M24 ${y} H150`} strokeWidth="2.5" strokeLinecap="round" />
                <path d={`M24 ${y + 10} H206`} strokeLinecap="round" opacity="0.4" />
                <path d={`M24 ${y + 19} H172`} strokeLinecap="round" opacity="0.22" />
              </g>
            ))}

            {/* The internal links: three routes off the results into the
                pages below, which is the sentence "internal links so relevant
                searches lead to useful information". */}
            <g strokeLinecap="round" opacity="0.5">
              <path d="M40 160 V176" />
              <path d="M96 160 C96 168 112 168 112 176" />
              <path d="M160 160 C160 168 140 168 140 176" />
            </g>
          </g>

          {/* ---- 02  The placement above them, bought rather than earned ---- */}
          <g className={region(on(1))} stroke="currentColor" strokeWidth="1.5">
            {[264, 348, 432].map((x) => (
              <g key={x}>
                <rect x={x} y="20" width="72" height="98" rx="8" />
                {/* The vehicle. */}
                <rect
                  x={x + 9}
                  y="30"
                  width="54"
                  height="34"
                  rx="5"
                  className="fill-current"
                  fillOpacity="0.16"
                />
                <path d={`M${x + 15} 58 h6 M${x + 45} 58 h6`} strokeLinecap="round" opacity="0.7" />
                {/* The offer. */}
                <path d={`M${x + 9} 76 H${x + 55}`} strokeLinecap="round" opacity="0.45" />
                <path d={`M${x + 9} 85 H${x + 38}`} strokeLinecap="round" opacity="0.25" />
                {/* The mark that says this placement is bought, not earned. */}
                <rect
                  x={x + 9}
                  y="96"
                  width="20"
                  height="9"
                  rx="4.5"
                  className="fill-current"
                  fillOpacity="0.6"
                />
              </g>
            ))}
          </g>

          {/* ---- 05  The answer, and the only dashed edge in the drawing ---- */}
          <g className={region(on(4))} stroke="currentColor" strokeWidth="1.5">
            <rect x="264" y="136" width="240" height="92" rx="10" strokeDasharray="7 6" />
            <path d="M282 160 H470" strokeLinecap="round" opacity="0.5" />
            <path d="M282 174 H430" strokeLinecap="round" opacity="0.32" />
            <path d="M282 188 H458" strokeLinecap="round" opacity="0.32" />
            {/* What it was assembled from. */}
            {[282, 306, 330, 354].map((x) => (
              <rect
                key={x}
                x={x}
                y="204"
                width="18"
                height="8"
                rx="3"
                className="fill-current"
                fillOpacity="0.35"
              />
            ))}
          </g>

          {/* ---- 03  The feed, where the offer stays visible ---- */}
          <g className={region(on(2))} stroke="currentColor" strokeWidth="1.5">
            {[244, 276, 308].map((y) => (
              <g key={y}>
                <rect x="264" y={y} width="240" height="28" rx="7" />
                <rect
                  x="272"
                  y={y + 6}
                  width="16"
                  height="16"
                  rx="4"
                  className="fill-current"
                  fillOpacity="0.16"
                />
                <path d={`M296 ${y + 11} H452`} strokeLinecap="round" opacity="0.4" />
                <path d={`M296 ${y + 19} H396`} strokeLinecap="round" opacity="0.22" />
                {/* The step the document asks social to carry: a lead form. */}
                <rect
                  x="466"
                  y={y + 9}
                  width="28"
                  height="11"
                  rx="5.5"
                  className="fill-current"
                  fillOpacity="0.3"
                />
              </g>
            ))}
          </g>

          {/* ---- 04  The page the search was asking for ---- */}
          <g className={region(on(3))} stroke="currentColor" strokeWidth="1.5">
            <rect x="24" y="176" width="206" height="154" rx="10" />
            <path d="M40 196 H140" strokeWidth="2.5" strokeLinecap="round" />
            {/* The vehicle. */}
            <rect
              x="40"
              y="210"
              width="174"
              height="46"
              rx="6"
              className="fill-current"
              fillOpacity="0.14"
            />
            <path d="M56 246 h10 M188 246 h10" strokeLinecap="round" opacity="0.7" />
            {/* The specifications: a label and its value, three times. */}
            {[268, 282, 296].map((y) => (
              <g key={y} strokeLinecap="round">
                <path d={`M40 ${y} H98`} opacity="0.45" />
                <path d={`M132 ${y} H214`} opacity="0.25" />
              </g>
            ))}
            {/* The next step. */}
            <rect
              x="40"
              y="306"
              width="66"
              height="14"
              rx="7"
              className="fill-current"
              fillOpacity="0.62"
            />
          </g>

          {/* ---- 06  The ground, and the approach across it ---- */}
          <g className={region(on(5))} stroke="currentColor" strokeWidth="1.5">
            <rect x="24" y="344" width="480" height="46" rx="10" />
            {/* Streets. */}
            <g opacity="0.42" strokeWidth="1.1">
              <path d="M24 366 H504" />
              <path d="M96 344 V390 M200 344 V390 M320 344 V390 M420 344 V390" />
            </g>
            {/* Nearby: the "near me" the document's own sentence is about. */}
            <circle cx="156" cy="367" r="21" strokeDasharray="4 5" opacity="0.6" />
            {/* The approach. Drawn in full first, then a packet travels it. */}
            <path d={APPROACH} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
            <path
              d={APPROACH}
              pathLength="100"
              strokeWidth="2.6"
              strokeLinecap="round"
              className="ci-flow"
            />
            {/* The place. */}
            <path
              d="M156 380 C156 380 145 369 145 361 a11 11 0 0 1 22 0 c0 8 -11 19 -11 19Z"
              strokeWidth="1.8"
              strokeLinejoin="round"
              className="fill-current"
              fillOpacity="0.24"
            />
            <circle cx="156" cy="361" r="3.4" className="fill-current" stroke="none" />
            {/* The profile that has to be right, and the four things the
                document measures the ground by. */}
            <g strokeLinecap="round">
              <path d="M300 356 H420" opacity="0.4" />
              <path d="M300 366 H384" opacity="0.24" />
              <path d="M300 376 H404" opacity="0.24" />
            </g>
            <g strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
              <path d="M452 360 L462 366 L452 372" />
              <path d="M440 366 H460" />
            </g>
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

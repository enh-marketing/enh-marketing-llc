"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** One store, and the six places the document's six services act on it.
 *
 *  WHY THIS DRAWING. The six services are not six categories; read closely,
 *  each one is a different PART of the same store. Strategy and measurement
 *  "establishes ... how sales, enquiries and other valuable actions will be
 *  measured", which is the layer everything else is judged on. SEO is about
 *  "product and category structures, internal links and buyer-focused content"
 *  — a structure and a search surface. PPC is "Shopping" and "product feeds" —
 *  a paid shelf. Social is a feed. Conversion work is "product pages,
 *  categories, forms, carts and checkout" — a column of steps. Retargeting
 *  "reconnects the business with people who viewed products, visited key pages,
 *  started checkout or purchased previously" — a path back, and it is drawn as
 *  one, with a tap-off for each of those four origins.
 *
 *  So the drawing is the store, and the pins stand where each service works.
 *  Selecting a service lights that part and quiets the rest, which is what
 *  makes the drawing the map rather than an illustration beside one.
 *
 *  NOTHING IS LABELLED HERE. Every service is named once, in the selector and
 *  the panel beside this. Nothing is counted either: the shelf holds three
 *  tiles because three reads as a shelf, the measurement rail has ticks rather
 *  than values, and no region is drawn larger than another.
 *
 *  Driven entirely by CSS colour transitions on the selected index: one lever
 *  per region — the group's `color` — with every stroke and fill inside it
 *  reading currentColor.
 *
 *  PIN PLACEMENT IS CONSTRAINED BY THE PINS THEMSELVES, not only by the
 *  drawing. Each indicator renders at 28px, which is about 32 viewBox units
 *  here, so two of them need roughly 45 units between centres before they stop
 *  colliding — and a pin on the outer edge of the plate is half-clipped by its
 *  own rounded corner. Both the shelf and the feed pins are therefore set one
 *  region inside their block rather than on its corner. */

/** Where each service's pin stands, in viewBox units. Chosen for the part of
 *  the store the service works, then spread so no two indicators collide at
 *  the 28px they render at. */
const PINS: [number, number][] = [
  [264, 366], // 01 strategy and measurement — the rail under everything
  [128, 150], // 02 SEO — the category structure
  [382, 116], // 03 PPC and Shopping — the paid shelf
  [312, 196], // 04 social — the feed
  [174, 232], // 05 conversion — the checkout column
  [290, 124], // 06 retargeting — where the path back rejoins the shelf
];

const W = 520;
const H = 400;

/** The path back. Four tap-offs on it, one per origin the document names. */
const RETURN_PATH = "M174 310 C236 310 248 286 248 240 C248 186 258 148 286 124";
const RETURN_TAPS: [number, number][] = [
  [200, 310],
  [247, 262],
  [250, 196],
  [272, 142],
];

/** A region's one lever. Everything inside reads currentColor. */
function region(on: boolean) {
  return cn(
    "transition-[color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
    on ? "text-brand opacity-100" : "text-line opacity-60",
  );
}

export function CommerceSystem({
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
          {/* ---- 02  The search surface and the category structure ---- */}
          <g className={region(on(1))} stroke="currentColor" strokeWidth="1.5">
            <rect x="24" y="20" width="200" height="30" rx="15" />
            <circle cx="45" cy="35" r="6" />
            <path d="M49 39 L54 44" strokeLinecap="round" />
            <path d="M64 32 H150" strokeLinecap="round" opacity="0.55" />
            <path d="M64 40 H120" strokeLinecap="round" opacity="0.3" />

            <path d="M32 60 V138" strokeLinecap="round" />
            <path d="M32 76 H56" strokeLinecap="round" />
            <path d="M32 102 H56" strokeLinecap="round" />
            <path d="M32 128 H56" strokeLinecap="round" />
            {[69, 95, 121].map((y) => (
              <g key={y}>
                <rect x="56" y={y} width="66" height="14" rx="4" className="fill-current" fillOpacity="0.16" />
                <path d={`M132 ${y + 4} H160`} strokeLinecap="round" opacity="0.4" />
                <path d={`M132 ${y + 11} H148`} strokeLinecap="round" opacity="0.22" />
              </g>
            ))}
          </g>

          {/* ---- 03  The paid shelf ---- */}
          <g className={region(on(2))} stroke="currentColor" strokeWidth="1.5">
            {[260, 344, 428].map((x) => (
              <g key={x}>
                <rect x={x} y="20" width="76" height="92" rx="8" />
                <rect
                  x={x + 10}
                  y="30"
                  width="56"
                  height="42"
                  rx="5"
                  className="fill-current"
                  fillOpacity="0.16"
                />
                <path d={`M${x + 10} 84 H${x + 54}`} strokeLinecap="round" opacity="0.4" />
                {/* The mark that says this shelf is bought, not earned. */}
                <rect
                  x={x + 10}
                  y="94"
                  width="22"
                  height="8"
                  rx="4"
                  className="fill-current"
                  fillOpacity="0.55"
                />
              </g>
            ))}
          </g>

          {/* ---- 04  The feed ---- */}
          <g className={region(on(3))} stroke="currentColor" strokeWidth="1.5">
            {[140, 196, 252].map((y) => (
              <g key={y}>
                <rect x="320" y={y} width="184" height="48" rx="8" />
                <rect
                  x="330"
                  y={y + 9}
                  width="30"
                  height="30"
                  rx="5"
                  className="fill-current"
                  fillOpacity="0.16"
                />
                <path d={`M370 ${y + 17} H488`} strokeLinecap="round" opacity="0.4" />
                <path d={`M370 ${y + 29} H440`} strokeLinecap="round" opacity="0.22" />
              </g>
            ))}
          </g>

          {/* ---- 05  The column the customer has to get down ---- */}
          <g className={region(on(4))} stroke="currentColor" strokeWidth="1.5">
            {[176, 232, 288].map((y) => (
              <g key={y}>
                <rect x="24" y={y} width="150" height="44" rx="8" />
                <path d={`M36 ${y + 15} H112`} strokeLinecap="round" opacity="0.4" />
                <path d={`M36 ${y + 27} H84`} strokeLinecap="round" opacity="0.22" />
                <rect
                  x="126"
                  y={y + 14}
                  width="34"
                  height="16"
                  rx="8"
                  className="fill-current"
                  fillOpacity="0.3"
                />
              </g>
            ))}
            <g strokeLinecap="round" strokeLinejoin="round">
              <path d="M99 220 V232" />
              <path d="M93 226 L99 232 L105 226" />
              <path d="M99 276 V288" />
              <path d="M93 282 L99 288 L105 282" />
            </g>
          </g>

          {/* ---- 06  The path back, with a tap-off per origin ---- */}
          <g className={region(on(5))} stroke="currentColor" strokeWidth="1.5">
            <path d={RETURN_PATH} strokeLinecap="round" strokeDasharray="6 5" />
            {RETURN_TAPS.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4" className="fill-current" fillOpacity="0.7" />
            ))}
            <g strokeLinecap="round" strokeLinejoin="round">
              <path d="M278 134 L286 124 L296 130" />
            </g>
          </g>

          {/* ---- 01  The layer everything is judged on ---- */}
          <g className={region(on(0))} stroke="currentColor" strokeWidth="1.5">
            <rect x="24" y="344" width="480" height="42" rx="10" />
            {Array.from({ length: 15 }).map((_, i) => (
              <path
                key={i}
                d={`M${44 + i * 32} 374 V${368 - (i % 3) * 5}`}
                strokeLinecap="round"
                opacity="0.45"
              />
            ))}
            <path
              d="M44 366 L108 358 L172 362 L236 350 L300 356 L364 346 L428 352 L484 342"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
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

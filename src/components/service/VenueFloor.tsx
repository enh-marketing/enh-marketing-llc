"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Six kinds of event, drawn as six arrangements of the same room.
 *
 *  WHY THIS AND NOT A TRACK. These six are occasions, not stages: a conference,
 *  a trade show, an exhibition, a launch, a workshop and an awards night have
 *  no order between them and nothing that progresses. What separates them is
 *  the shape of the room and therefore where a camera has to stand, which is
 *  the only thing this page cares about. So selecting an event redraws the
 *  floor.
 *
 *  IT IS THE PAGE'S ARGUMENT AT A SECOND SCALE. The hero shows an event running
 *  in parallel through time; this shows it running in parallel through space. A
 *  conference points every seat at one stage. A trade show has no stage at all
 *  and spreads the activity across a floor. Seeing the room change is the
 *  reason the document gives for planning positions in advance, made visible
 *  without a sentence.
 *
 *  NOTHING HERE IS A CAMERA, AND NOTHING IS COUNTED. The document will not fix
 *  a camera number and neither will this drawing: no camera, crew mark or
 *  count appears. Seats, stands and tables are texture that says "many", never
 *  a capacity. The one element drawn in brand per layout is the thing the
 *  coverage has to reach, which is what the paragraph beside it is about.
 *
 *  No labels: the panel next to the drawing already names the event. */

type Shape =
  | { t: "rect"; x: number; y: number; w: number; h: number; r?: number; on?: boolean }
  | { t: "dots"; x: number; y: number; cols: number; rows: number; gap: number }
  | { t: "circles"; at: [number, number][]; r: number; on?: number };

/** One layout per event, in the document's order. Coordinates are in the
 *  viewBox below and set by hand so each room reads at a glance. */
const LAYOUTS: Shape[][] = [
  // 01 Conference — one stage, every seat pointed at it, an interview corner.
  [
    { t: "rect", x: 100, y: 22, w: 120, h: 24, r: 4, on: true },
    { t: "dots", x: 84, y: 78, cols: 9, rows: 5, gap: 18 },
    { t: "rect", x: 22, y: 182, w: 56, h: 36, r: 4 },
  ],
  // 02 Trade show — no stage at all; stands across the whole floor.
  [
    { t: "rect", x: 26, y: 34, w: 54, h: 34, r: 3 },
    { t: "rect", x: 98, y: 34, w: 54, h: 34, r: 3, on: true },
    { t: "rect", x: 170, y: 34, w: 54, h: 34, r: 3 },
    { t: "rect", x: 242, y: 34, w: 54, h: 34, r: 3 },
    { t: "rect", x: 26, y: 108, w: 54, h: 34, r: 3 },
    { t: "rect", x: 98, y: 108, w: 54, h: 34, r: 3 },
    { t: "rect", x: 170, y: 108, w: 54, h: 34, r: 3 },
    { t: "rect", x: 242, y: 108, w: 54, h: 34, r: 3 },
    { t: "rect", x: 62, y: 182, w: 54, h: 34, r: 3 },
    { t: "rect", x: 134, y: 182, w: 54, h: 34, r: 3 },
    { t: "rect", x: 206, y: 182, w: 54, h: 34, r: 3 },
  ],
  // 03 Exhibition — a space to move through; work along the walls.
  [
    { t: "rect", x: 22, y: 30, w: 30, h: 68, r: 3 },
    { t: "rect", x: 22, y: 118, w: 30, h: 68, r: 3 },
    { t: "rect", x: 268, y: 30, w: 30, h: 68, r: 3 },
    { t: "rect", x: 268, y: 118, w: 30, h: 68, r: 3 },
    { t: "rect", x: 118, y: 40, w: 84, h: 52, r: 4, on: true },
    { t: "rect", x: 118, y: 132, w: 84, h: 52, r: 4 },
    { t: "rect", x: 70, y: 200, w: 180, h: 18, r: 9 },
  ],
  // 04 Product launch — one object, and a room turned towards it.
  [
    { t: "rect", x: 92, y: 22, w: 136, h: 24, r: 4 },
    { t: "circles", at: [[160, 86]], r: 22, on: 0 },
    { t: "dots", x: 96, y: 140, cols: 8, rows: 4, gap: 18 },
  ],
  // 05 Seminar and workshop — a small stage, and benches people work at.
  [
    { t: "rect", x: 112, y: 22, w: 96, h: 22, r: 4 },
    { t: "rect", x: 40, y: 78, w: 108, h: 30, r: 3, on: true },
    { t: "rect", x: 172, y: 78, w: 108, h: 30, r: 3 },
    { t: "rect", x: 40, y: 134, w: 108, h: 30, r: 3 },
    { t: "rect", x: 172, y: 134, w: 108, h: 30, r: 3 },
    { t: "dots", x: 84, y: 196, cols: 8, rows: 1, gap: 20 },
  ],
  // 06 Awards and corporate — a stage, and tables rather than rows.
  [
    { t: "rect", x: 100, y: 20, w: 120, h: 24, r: 4 },
    {
      t: "circles",
      at: [
        [72, 100],
        [160, 92],
        [248, 100],
        [104, 174],
        [216, 174],
      ],
      r: 26,
      on: 1,
    },
  ],
];

export function VenueFloor({
  count,
  active,
  pin,
}: {
  count: number;
  active: number;
  pin: PinRenderer;
}) {
  const shapes = LAYOUTS[active] ?? LAYOUTS[0];
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  } as const;

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      <div className="flex gap-5">
        {/* The pins are the navigation, in a rail beside the floor plan. */}
        <div className="flex shrink-0 flex-col gap-3 pt-1">
          {Array.from({ length: count }).map((_, i) => pin(i))}
        </div>

        <div className="relative min-h-[19rem] flex-1">
          <svg
            // Keyed on the selection so the layout animates in each time it
            // changes rather than cross-fading into the previous room.
            key={active}
            viewBox="0 0 320 240"
            className="venue-plan w-full text-snow"
            aria-hidden
          >
            {/* The room, which never changes. */}
            <rect x="8" y="8" width="304" height="224" rx="10" {...line} opacity="0.35" />
            {/* The way in, on the same wall every time. */}
            <path d="M132 232h56" stroke="var(--color-ink-3)" strokeWidth="4" />
            <path d="M132 232h56" {...line} strokeWidth="2" opacity="0.5" />

            {shapes.map((s, i) => {
              if (s.t === "rect") {
                return (
                  <rect
                    key={i}
                    x={s.x}
                    y={s.y}
                    width={s.w}
                    height={s.h}
                    rx={s.r ?? 3}
                    {...line}
                    className={cn("venue-el", s.on && "text-brand")}
                    style={{ animationDelay: `${i * 45}ms` }}
                    opacity={s.on ? 1 : 0.55}
                  />
                );
              }
              if (s.t === "circles") {
                return s.at.map(([cx, cy], j) => (
                  <circle
                    key={`${i}-${j}`}
                    cx={cx}
                    cy={cy}
                    r={s.r}
                    {...line}
                    className={cn("venue-el", s.on === j && "text-brand")}
                    style={{ animationDelay: `${(i + j) * 45}ms` }}
                    opacity={s.on === j ? 1 : 0.5}
                  />
                ));
              }
              // Seats. Texture that says "an audience", never a capacity.
              return (
                <g key={i} className="venue-el" style={{ animationDelay: `${i * 45}ms` }}>
                  {Array.from({ length: s.rows }).flatMap((_, r) =>
                    Array.from({ length: s.cols }).map((__, c) => (
                      <circle
                        key={`${r}-${c}`}
                        cx={s.x + c * s.gap}
                        cy={s.y + r * s.gap}
                        r="3.5"
                        fill="currentColor"
                        opacity="0.32"
                      />
                    )),
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

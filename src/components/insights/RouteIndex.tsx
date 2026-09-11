"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { formatDate, formatMonth, hasBody, readingTime, type Note } from "@/content/insights";

/** THE RECORD, DRAWN AS A RIDGE TRAVERSE.
 *
 *  WHAT THE DRAWING IS. A range in section, with a dashed route running the
 *  length of its crest and a pin on that route for every note in the archive,
 *  left to right in the order it was written. The newest note carries the flag.
 *  Pointing at a pin reads that note out below the drawing; clicking one jumps
 *  to its row in the register.
 *
 *  IT IS THE PAGE'S WAY IN, NOT ITS DECORATION. A blog hero normally carries a
 *  headline over a paragraph, which tells a reader nothing the browser tab did
 *  not. This tells them how many notes exist, over what span, and lets them
 *  pick one before they have scrolled.
 *
 *  WHY THE TERRAIN IS HAND-DRAWN AND FIXED, WHICH IS THE WHOLE DESIGN. The
 *  first version generated the ridge from the stations themselves and ascended
 *  from the oldest note to the newest. With three notes that is a straight
 *  diagonal with three dots on it and a filled wedge underneath: an upward
 *  trend chart. Nobody reads that as a mountain, and a chart is exactly what
 *  this page must not contain, because a chart claims a quantity and there is
 *  no quantity here to claim.
 *
 *  So the range is a literal, authored twice — a back ridge and a front ridge,
 *  eighteen vertices each, several peaks, going up and down the way ground
 *  does. It is identical whether the archive holds three notes or three
 *  hundred. The pins are then placed ON the front crest, spaced evenly by
 *  position in the sequence, and their height is simply wherever the ground
 *  happens to be at that point. There is no y axis, no y label and no
 *  quantity anywhere on it: a pin is not higher because its note is better,
 *  longer or more read, and no reader can mistake a wiggling ridge for a trend.
 *  The only two figures printed are the real first and last months of the
 *  archive.
 *
 *  THE PINS ARE HTML ON THE PATH'S OWN COORDINATES. Positioned by percentage
 *  of the same box the SVG fills, so they cannot drift off the crest at any
 *  width, and each is a real focusable control with a real hit area — which an
 *  SVG <circle> is not. Tab order runs oldest to newest.
 *
 *  MOTION. The route marches (`animate-dash`), the newest pin breathes
 *  (`ri-ping`), the flag waves (`ri-flag`), and the readout replaces its
 *  lines behind a mask (`animate-readout`), keyed on the active pin so it
 *  restarts per note with no timeline to manage. All four are CSS, so none of
 *  it runs on the main thread and all of it rests on a finished, readable
 *  picture under prefers-reduced-motion.
 *
 *  EVERY COORDINATE IS ROUNDED before it reaches JSX. The crest interpolation
 *  is a division, and an unrounded double prints its last digit differently in
 *  Node and in V8; React calls that a hydration mismatch and throws away the
 *  whole island rather than patching one attribute. */

/* The drawing's coordinate space. Width is nominal — the SVG stretches to
   whatever box it is given and the pins are placed as percentages of these
   numbers, so the two can never disagree. Relief runs from y=38 to y=150,
   which is 59% of the box: enough that the range still reads as ground after
   preserveAspectRatio="none" has squashed it into a wide, short frame. */
const W = 1000;
const H = 150;
/* Pins stay clear of the left and right edges so the first and last are not
   clipped and the flag has room.
   72, NOT 52: a pin's hit area is 44px wide and centred on its coordinate, so
   at 5.2% inset the outermost pin hung 5px past the right edge of a 335px
   container and gave the scroll box that much overflow of its own. 7.2% clears
   the half-width at every viewport this drawing is drawn at. */
const PAD_X = 72;

/** THE FRONT RIDGE'S CREST — the ground the route runs along.
 *
 *  NINE VERTICES, NOT EIGHTEEN, AND THAT IS THE WHOLE LESSON OF THIS DRAWING.
 *  The first authored range had a vertex every 55 units. Stretched across a
 *  1240px container by `preserveAspectRatio="none"` that is a peak every 68
 *  pixels, and a peak every 68 pixels is a sawtooth, not a mountain. Two broad
 *  peaks and a saddle over the same width read as ground at a glance. */
const CREST: [number, number][] = [
  [0, 112], [130, 84], [268, 44], [400, 92], [530, 60],
  [660, 98], [790, 38], [900, 84], [1000, 72],
];

/** The back ridge, further off. Its own shape rather than an offset copy: an
 *  offset reads as a drop shadow rather than as distance.
 *
 *  IT STAYS ABOVE THE FRONT CREST AT EVERY x, checked vertex by vertex. Where
 *  the two crossed, the washed fill surfaced in front of the solid one and the
 *  pair read as a single grey mass with a jagged top instead of as two ridges
 *  at two distances — the depth cue is entirely in the ordering. */
const BACK: [number, number][] = [
  [0, 66], [150, 32], [300, 40], [450, 20],
  [600, 46], [740, 24], [880, 54], [1000, 38],
];

const round = (n: number) => Math.round(n);

/** A polyline as an SVG path. */
function line(points: [number, number][]): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
}

/** The same polyline, closed onto the bottom edge, so the ridge is a mass. */
function mass(points: [number, number][]): string {
  return `${line(points)} L${W} ${H} L0 ${H} Z`;
}

/** Where the ground is at a given x, read off the crest.
 *
 *  Linear between vertices, rounded to an integer — finer than any pixel this
 *  viewBox resolves to, and it prints identically in Node and in the browser. */
function crestY(x: number): number {
  for (let i = 0; i < CREST.length - 1; i += 1) {
    const [x0, y0] = CREST[i];
    const [x1, y1] = CREST[i + 1];
    if (x >= x0 && x <= x1) {
      return round(y0 + ((y1 - y0) * (x - x0)) / (x1 - x0));
    }
  }
  return CREST[CREST.length - 1][1];
}

/** Pin positions along the crest. Evenly spaced by sequence position — which
 *  is what the caption says they are — and never by date, so a busy month
 *  cannot draw a cluster that looks like a finding. */
function pins(count: number): { x: number; y: number }[] {
  if (count === 0) return [];
  if (count === 1) {
    const x = round(W / 2);
    return [{ x, y: crestY(x) }];
  }
  const span = W - PAD_X * 2;
  return Array.from({ length: count }, (_, i) => {
    const x = round(PAD_X + (span * i) / (count - 1));
    return { x, y: crestY(x) };
  });
}

/** Percent of the box, to one decimal. */
const pct = (n: number, of: number) => `${round((n / of) * 1000) / 10}%`;

/** HOW MANY PINS THE ROUTE CARRIES.
 *
 *  THE DRAWING DOES NOT SCALE TO A WHOLE ARCHIVE, and pretending otherwise
 *  broke it. At seventy-two pins the box needs 4,600px, the SVG stretches to
 *  it under `preserveAspectRatio="none"`, and 150 units of relief squashed
 *  into 180px of height against 4,600px of width is a straight line with
 *  seventy-two dots on it — the exact chart the terrain was authored to avoid,
 *  and only its left quarter on screen.
 *
 *  Twelve is what a 1240px container holds at a comfortable spacing, and it is
 *  also the right *editorial* answer: the masthead's job is "what is new and
 *  worth reading", not "every item we have ever published". The complete list
 *  is the register below, which is built to hold any number. The caption says
 *  which of the two it is showing, so the drawing never overstates itself. */
const MAX_PINS = 12;

export function RouteIndex({
  notes: all,
  label,
  hint,
}: {
  /** Oldest first. The caller reverses, because the archive's own order is
   *  newest-first everywhere else and flipping it in two places is how the
   *  flag ends up on the oldest note. */
  notes: Note[];
  label: string;
  hint: string;
}) {
  /** The most recent MAX_PINS, still oldest-to-newest, so the flag stays on
   *  the newest note and the walk still reads left to right. */
  const notes = all.length > MAX_PINS ? all.slice(all.length - MAX_PINS) : all;
  const truncated = all.length > notes.length;

  /** The newest note is what the readout shows before anything is touched: it
   *  is the one a returning reader came back for. */
  const [active, setActive] = useState(notes.length - 1);

  if (notes.length === 0) return null;

  const points = pins(notes.length);
  const note = notes[Math.min(active, notes.length - 1)];
  const last = points[points.length - 1];
  const oldest = notes[0];
  const newest = notes[notes.length - 1];

  /** SCROLLS ONLY WHEN THE PINS WOULD ACTUALLY COLLIDE.
   *
   *  64px per pin is a comfortable gap around a 44px touch target, and it is
   *  the whole rule: below that total the box is simply full width, so a short
   *  archive draws its complete route on a 375px phone. Above it the drawing
   *  scrolls inside its own container — never the page, which does not scroll
   *  sideways at any width.
   *
   *  A flat 600px floor was wrong: with four notes it forced a 600px drawing
   *  into a 327px column, so a phone got the left third of the route and the
   *  flag on the newest note was off screen. */
  const minWidth = notes.length * 64;

  return (
    <figure className="relative">
      <figcaption className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-display text-xs font-extrabold uppercase tracking-[0.14em] text-snow">
          {label}
        </span>
        {/* Derived from what is actually drawn, so the caption cannot claim
            the whole archive while showing a window of it. */}
        <span className="text-xs text-fog">
          {truncated ? `The latest ${notes.length}, oldest to newest` : hint}
        </span>
      </figcaption>

      {/* The drawing scrolls; the page does not. */}
      <div className="no-scrollbar -mx-1 overflow-x-auto px-1">
        <div className="relative" style={{ minWidth }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="block h-[clamp(10rem,19svh,13.5rem)] w-full"
            aria-hidden
            focusable="false"
          >
            {/* THE GROUND FADES OUT DOWNWARD, and it has to.
                Both ridges were solid masses to begin with, one washed and one
                not. In the light theme `line` at 45% over `void` and `line` at
                100% are three units of lightness apart, so the pair read as a
                single grey slab with a jagged top edge and a red zigzag inside
                it — which is an area chart, the exact thing this drawing must
                not be. A ground that fades has no bottom edge to read as a
                block, and the depth cue moves entirely into the line work. */}
            {/* AND THE GROUND IS HATCHED, which is what finally stops it
                reading as a chart. A dashed line over a plain fade is still a
                filled line graph to anyone who has seen one; diagonal hatching
                under a surface line is the notation a geological section uses,
                and it says "this is ground" before the reader has thought
                about it. The hatch is masked by the same fade, so the mass has
                no bottom edge to read as a block. */}
            <defs>
              <pattern
                id="ri-hatch"
                width="9"
                height="9"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="9"
                  stroke="var(--color-ash)"
                  strokeOpacity="0.42"
                  strokeWidth="1"
                />
              </pattern>
              <linearGradient id="ri-fade-grad" x1="0" y1="0" x2="0" y2="1">
                {/* White is opaque in a luminance mask; the colour is not a
                    design choice and does not respond to the theme. */}
                <stop offset="0" stopColor="#fff" stopOpacity="1" />
                <stop offset="0.9" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <mask id="ri-fade" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
                <rect x="0" y="0" width={W} height={H} fill="url(#ri-fade-grad)" />
              </mask>
            </defs>

            {/* Distance: an outline only. A filled far ridge competes with the
                near one for the same grey and neither wins. */}
            <path
              d={line(BACK)}
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity="0.3"
              strokeWidth="1.5"
            />

            {/* The ridge the route runs along: a wash for body, hatching for
                what it is, both under the fade. */}
            <g mask="url(#ri-fade)">
              <path d={mass(CREST)} fill="var(--color-line)" fillOpacity="0.55" />
              <path d={mass(CREST)} fill="url(#ri-hatch)" />
            </g>
            {/* Inked, so the silhouette survives the fade. `ash`, not `line`:
                line is a border colour and measures about 1.1:1 against these
                surfaces, so any line inside a drawing that has to be seen is
                inked in ash. */}
            <path
              d={line(CREST)}
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />

            {/* The route, marching along the crest. `vector-effect` is left
                off deliberately: this path is far longer than 100px, and under
                a non-scaling stroke Chromium measures the dash in screen
                pixels and renders a dash, a gap and a stub. */}
            <path
              d={line(CREST)}
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-dash"
            />

            {/* The flag, on the newest note. The site's own summit device, from
                fx/Adornments' RouteLine: a mast and a pennant that furls. */}
            <g className="ri-flag" style={{ transformOrigin: `${last.x}px ${last.y}px` }}>
              <line
                x1={last.x}
                y1={last.y}
                x2={last.x}
                y2={last.y - 30}
                stroke="var(--color-snow)"
                strokeWidth="2"
              />
              <path
                d={`M${last.x} ${last.y - 30} L${last.x + 19} ${last.y - 24} L${last.x} ${last.y - 18} Z`}
                fill="var(--color-brand)"
              />
            </g>

            {/* And its ping. Drawn in SVG because `ri-ping` is written for
                fill-box transforms. */}
            <circle
              cx={last.x}
              cy={last.y}
              r="10"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              className="ri-ping"
            />
          </svg>

          {/* THE PINS. One control per note, standing on the crest. A note with
              no article behind it still has a real destination — its row in the
              register — so every pin does something. */}
          <ul className="absolute inset-0">
            {notes.map((n, i) => {
              const p = points[i];
              const on = i === active;
              const isNewest = i === notes.length - 1;
              return (
                <li
                  key={n.slug}
                  className="absolute"
                  style={{ left: pct(p.x, W), top: pct(p.y, H) }}
                >
                  <a
                    href={`#note-${n.slug}`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "block rounded-full border-2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        on
                          ? "h-4 w-4 border-brand bg-brand"
                          : isNewest
                            ? "h-3.5 w-3.5 border-brand bg-void group-hover:h-4 group-hover:w-4"
                            : "h-3.5 w-3.5 border-ash bg-void group-hover:h-4 group-hover:w-4 group-hover:border-brand",
                      )}
                    />
                    {/* The pin's name, for a reader who never uses a pointer.
                        The readout below prints the same words on screen, so
                        this is not a second visible label. */}
                    <span className="sr-only">
                      {n.title}. {formatDate(n.date)}. Jump to this note in the register.
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* The two real figures on the drawing, under the two ends of the
              route rather than under the box's corners. */}
          {/* THE TWO REAL FIGURES ON THE DRAWING, flush to the ends of the box
              rather than centred on the end pins.
              Centred, "Sept 2026" at left:94.8% ran past the right edge, which
              gave the scroll container 60-odd pixels of overflow of its own: a
              375px phone opened with the route already scrolled sideways and
              the trailhead label cut in half. The pins sit within 5% of each
              edge, so flush reads as under them and cannot overflow whatever
              the month names are. */}
          {notes.length > 1 && (
            <>
              <span
                aria-hidden
                className="absolute bottom-1 left-0 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-wide text-ash"
              >
                {formatMonth(oldest.date)}
              </span>
              <span
                aria-hidden
                className="absolute bottom-1 right-0 whitespace-nowrap text-[0.6875rem] font-semibold uppercase tracking-wide text-brand-text"
              >
                {formatMonth(newest.date)}
              </span>
            </>
          )}
        </div>
      </div>

      {/* THE READOUT. A fixed slot under the drawing, so nothing reflows as the
          pointer runs along the route. Keyed on the active pin: React replaces
          the subtree, which restarts `animate-readout` and the lines rise in
          from behind the clip. */}
      <div className="mt-5 overflow-hidden border-t border-line pt-5">
        <div key={note.slug} className="animate-readout">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="font-semibold uppercase tracking-wide text-brand-text">
              {note.category}
            </span>
            <span aria-hidden className="h-px w-4 bg-line" />
            <time dateTime={note.date} className="text-fog">
              {formatDate(note.date)}
            </time>
            {readingTime(note) && (
              <>
                <span aria-hidden className="h-px w-4 bg-line" />
                <span className="text-fog">{readingTime(note)}</span>
              </>
            )}
          </p>
          {/* A heading only where there is a page to head. An unmigrated note
              is a title, which is all the archive honestly holds for it. */}
          {hasBody(note) ? (
            <a
              href={`/blog/${note.slug}`}
              className="tap-safe group font-display mt-2 flex items-baseline gap-3 text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold leading-tight text-snow transition-colors duration-300 hover:text-brand"
            >
              <span className="min-w-0">{note.title}</span>
              <span
                aria-hidden
                className="mt-2 h-px w-6 shrink-0 bg-brand transition-all duration-500 group-hover:w-10"
              />
            </a>
          ) : (
            <p className="font-display mt-2 text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold leading-tight text-snow">
              {note.title}
            </p>
          )}
        </div>
      </div>
    </figure>
  );
}

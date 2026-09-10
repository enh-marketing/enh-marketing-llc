/** The hero drawing: interest arriving, and the six different things it can
 *  turn into.
 *
 *  WHY IT FANS INSTEAD OF NARROWING. Almost every marketing page draws its
 *  outcome as a funnel, and this document forbids it in its second paragraph:
 *  "These may include completed bookings, table reservations, calls, WhatsApp
 *  enquiries, direction requests and visits to a booking engine." Six endings,
 *  not one, and the strategy section doubles down — the final action can happen
 *  on "a website, booking engine, reservation platform, phone call or WhatsApp
 *  conversation". A single tapering funnel into a single checkout would be the
 *  page contradicting its own source in the first thing a visitor sees. So one
 *  stream arrives, crosses the surfaces the brand controls, and opens into six
 *  apertures of six different shapes.
 *
 *  NO OUTCOME IS DRAWN AS THE REAL ONE. All six apertures are the same size and
 *  the same weight, and the six travelling signals run on staggered delays so
 *  no aperture is ever the only lit one. The document ranks them nowhere.
 *
 *  NOTHING IS COUNTED. The arriving band is a legible mass, not a number of
 *  guests, and the fan carries no widths that could be read as a split.
 *
 *  NO WORDS ON IT. All six actions are named once, in the client's own sentence
 *  in the section below.
 *
 *  MOTION. CSS keyframes only, travelling as stroke-dashoffset against
 *  pathLength="100" so the dash numbers are percentages of each curve and no
 *  transform units are involved inside a scaled viewBox. Every aperture, curve
 *  and glyph is drawn in full underneath, so a browser that never runs an
 *  animation — or a reader who asked for none — sees the whole fan.
 *  See globals.css, "Guest actions". */

/** The six apertures, left to right in the order the document's sentence names
 *  them. `x` is the aperture's left edge in a 320-unit box; `glyph` is drawn
 *  centred on (x + 20, 282). */
const APERTURES = [
  { x: 10, kind: "booking" },
  { x: 62, kind: "table" },
  { x: 114, kind: "call" },
  { x: 166, kind: "message" },
  { x: 218, kind: "pin" },
  { x: 270, kind: "engine" },
] as const;

/** One curve per aperture, all leaving the same point under the counter. */
const fan = (cx: number) => `M160 68 C160 150 ${cx} 176 ${cx} 250`;

export function GuestActions({ label }: {
  /** The drawing's accessible name, handed in from the page's content file
   *  rather than written here: every word on this page is the client's, and the
   *  sentence this drawing depicts is one the client can still edit. Required,
   *  so a caller cannot ship an unnamed role="img". */
  label: string;
}) {
  return (
    <div
      className={
        // The house placement for a hero visual, matching SpendSplit and
        // DemandLeak: anchored to the right gutter, centred, out of the flow,
        // and not rendered below the large breakpoint, where it would add its
        // own height and push the trust strip below the fold.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[336px] -translate-y-1/2 select-none lg:block xl:w-[372px]"
      }
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-6 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)] sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <svg
          viewBox="0 0 320 330"
          role="img"
          aria-label={label}
          className="relative block w-full"
          fill="none"
        >
          {/* People deciding. Three ranks, each mark breathing on its own
              delay, so the band reads as interest rather than as a swatch. */}
          <g aria-hidden>
            {[6, 18, 30].map((y, row) =>
              Array.from({ length: 12 }).map((_, col) => (
                <rect
                  key={`${y}-${col}`}
                  x={34 + col * 22}
                  y={y}
                  width="6"
                  height="6"
                  rx="1.5"
                  className="ga-arrive fill-fog"
                  style={{ animationDelay: `${(row * 12 + col) * 80}ms` }}
                />
              )),
            )}
          </g>

          {/* Into the surfaces the brand controls. */}
          <path
            aria-hidden
            d="M160 44 V54"
            stroke="var(--color-brand)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect
            aria-hidden
            x="24"
            y="54"
            width="272"
            height="16"
            rx="8"
            className="fill-brand/[0.10]"
            stroke="var(--color-ash)"
            strokeWidth="1.25"
            strokeOpacity="0.6"
          />
          <path
            aria-hidden
            d="M40 62 H280"
            stroke="var(--color-ash)"
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="2 6"
          />

          {/* THE FAN. Six curves, six endings, no favourite. */}
          {APERTURES.map((ap, i) => {
            const cx = ap.x + 20;
            return (
              <g key={ap.kind} aria-hidden>
                <path
                  d={fan(cx)}
                  stroke="var(--color-ash)"
                  strokeWidth="1.25"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                />
                <path
                  d={fan(cx)}
                  pathLength="100"
                  stroke="var(--color-brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="ga-travel"
                  style={{ animationDelay: `${i * 430}ms` }}
                />
              </g>
            );
          })}

          {/* The six apertures. Same size, same weight; only the shape of what
              happens inside them differs. */}
          {APERTURES.map((ap) => {
            const cx = ap.x + 20;
            return (
              <g key={`ap-${ap.kind}`} aria-hidden>
                <rect
                  x={ap.x}
                  y="250"
                  width="40"
                  height="64"
                  rx="8"
                  className="fill-brand/[0.06]"
                  stroke="var(--color-ash)"
                  strokeWidth="1.25"
                  strokeOpacity="0.65"
                />

                {/* A completed booking: closed and paid. */}
                {ap.kind === "booking" && (
                  <g>
                    <rect
                      x={cx - 11}
                      y="270"
                      width="22"
                      height="16"
                      rx="3"
                      className="fill-brand/25"
                      stroke="var(--color-brand)"
                      strokeWidth="1.25"
                    />
                    <path
                      d={`M${cx - 6} 279 l4 4 7 -8`}
                      stroke="var(--color-brand)"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d={`M${cx - 9} 292 h18`} stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                )}

                {/* A table reservation. Drawn as a table with two covers laid
                    at it: a disc on a stem was a wine glass, which is a nice
                    hospitality picture and the wrong one. */}
                {ap.kind === "table" && (
                  <g stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round">
                    <rect x={cx - 13} y="272" width="26" height="6" rx="3" className="fill-brand/25" />
                    <path d={`M${cx} 278 V292`} />
                    <path d={`M${cx - 8} 292 H${cx + 8}`} />
                    <rect x={cx - 20} y="266" width="6" height="11" rx="2" />
                    <rect x={cx + 14} y="266" width="6" height="11" rx="2" />
                  </g>
                )}

                {/* A call. */}
                {ap.kind === "call" && (
                  <path
                    d={`M${cx - 10} 266 h6 l3 8 -4 3a24 24 0 0 0 13 13 l3 -4 8 3 v6a4 4 0 0 1 -4.4 4 34 34 0 0 1 -29 -29 4 4 0 0 1 4.4 -4Z`}
                    stroke="var(--color-brand)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                )}

                {/* A message. */}
                {ap.kind === "message" && (
                  <g stroke="var(--color-brand)" strokeWidth="1.5" strokeLinejoin="round">
                    <path d={`M${cx - 13} 266 h26a4 4 0 0 1 4 4 v14a4 4 0 0 1 -4 4 h-15 l-8 7 v-7h-3a4 4 0 0 1 -4 -4 v-14a4 4 0 0 1 4 -4Z`} />
                    <path d={`M${cx - 7} 274 h14 M${cx - 7} 280 h8`} strokeLinecap="round" opacity="0.6" />
                  </g>
                )}

                {/* A direction request. */}
                {ap.kind === "pin" && (
                  <g stroke="var(--color-brand)" strokeWidth="1.5" strokeLinejoin="round">
                    <path d={`M${cx} 294 C${cx} 294 ${cx - 12} 278 ${cx - 12} 270a12 12 0 0 1 24 0c0 8 -12 24 -12 24Z`} />
                    <circle cx={cx} cy="270" r="4" className="fill-brand" stroke="none" />
                  </g>
                )}

                {/* A visit to the booking engine. */}
                {ap.kind === "engine" && (
                  <g stroke="var(--color-brand)" strokeWidth="1.5" strokeLinecap="round">
                    <rect x={cx - 13} y="266" width="26" height="20" rx="3" />
                    <path d={`M${cx - 13} 272 h26`} strokeOpacity="0.6" />
                    <path d={`M${cx - 8} 279 h10`} strokeOpacity="0.6" />
                    <path d={`M${cx - 6} 292 h12`} />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

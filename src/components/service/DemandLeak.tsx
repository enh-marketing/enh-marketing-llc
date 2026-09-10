/** The hero drawing: the demand a store already has, and the three places the
 *  document says it is lost before it becomes anything.
 *
 *  WHY THIS. The document's first two sentences are the whole brief. A store
 *  "can attract thousands of visitors without producing enough sales or
 *  qualified enquiries", and then: "The wrong search terms may be bringing
 *  people in, paid campaigns may be wasting budget, or product and category
 *  pages may not give customers enough information to buy." Three causes, at
 *  three different points, between the arriving traffic and the outcome. So the
 *  drawing is a run of plumbing rather than a funnel chart: a wide mouth taking
 *  the arriving volume, three pairs of side ports where flow escapes and ends
 *  up nowhere, and a base that forks — because this document's third paragraph
 *  says the run does not end in one place. A retail purchase and a B2B
 *  bulk-order enquiry are both the bottom of the pipe, and Stage 2 of the
 *  process is explicit that they "should not be measured as the same
 *  conversion", so one outlet is closed and paid and the other is drawn open.
 *
 *  THE DUCT IS FILLED, NOT OUTLINED, and that is what makes it legible at this
 *  size. Drawn as two hairline walls it read as a pair of diverging antennae
 *  with six more lines crossing them: the escapes looked like structure and the
 *  channel looked like nothing. One closed, tinted shape is a physical object
 *  at a glance, and everything that leaves it is then obviously outside it.
 *
 *  NOTHING IS COUNTED. The arriving marks are a legible band, not a number of
 *  visitors; the ports have no width that could be read as a loss rate; and the
 *  three taper steps are equal, so no cause is drawn as the bigger one. The
 *  document gives figures only in its results section, and none of them is
 *  about this.
 *
 *  NO WORDS ON IT. The three causes and the two endings are named in the
 *  client's own sentences in the section below, which is where they are read.
 *
 *  MOTION. CSS keyframes only, travelling as stroke-dashoffset against
 *  pathLength="100" so the dash numbers are percentages of each path and no
 *  transform units are involved inside a scaled viewBox. Every wall, port and
 *  outlet is drawn in full underneath, so a browser that never runs an
 *  animation — or a reader who asked for none — sees the complete run.
 *  See globals.css, "Demand leak". */

/** The duct, as one closed shape: 232 units across at the mouth, stepping to
 *  172, 112 and 52. Hand-written literals, so nothing here has to be rounded
 *  before it reaches JSX. */
const DUCT =
  "M44 56 L44 96 L74 124 L74 164 L104 192 L104 232 L134 260 L134 300 L186 300 L186 260 L216 232 L216 192 L246 164 L246 124 L276 96 L276 56 Z";

/** One pair per cause, on the taper it belongs to. Each leaves the wall at the
 *  midpoint of a step and ends in a mark outside the duct: the flow does not
 *  go somewhere else, it stops. */
const PORTS = [
  { d: "M59 110 H20", mark: 6, y: 104, delay: 0 },
  { d: "M261 110 H300", mark: 302, y: 104, delay: 400 },
  { d: "M89 178 H20", mark: 6, y: 172, delay: 800 },
  { d: "M231 178 H300", mark: 302, y: 172, delay: 1200 },
  { d: "M119 246 H20", mark: 6, y: 240, delay: 1600 },
  { d: "M201 246 H300", mark: 302, y: 240, delay: 2000 },
];

export function DemandLeak({ label }: {
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
        // PositionFourteen: anchored to the right gutter, centred, out of the
        // flow, and not rendered below the large breakpoint, where it would add
        // its own height and push the trust strip below the fold.
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
          viewBox="0 0 320 380"
          role="img"
          aria-label={label}
          className="relative block w-full"
          fill="none"
        >
          {/* The arriving volume: four ranks over the mouth, each mark
              breathing on its own delay so the band reads as traffic rather
              than as a swatch. */}
          <g aria-hidden>
            {[6, 18, 30, 42].map((y, row) =>
              Array.from({ length: 13 }).map((_, col) => (
                <rect
                  key={`${y}-${col}`}
                  x={46 + col * 18}
                  y={y}
                  width="6"
                  height="6"
                  rx="1.5"
                  className="leak-arrive fill-fog"
                  style={{ animationDelay: `${(row * 13 + col) * 70}ms` }}
                />
              )),
            )}
          </g>

          {/* The run itself. */}
          <path
            aria-hidden
            d={DUCT}
            className="fill-brand/[0.07]"
            stroke="var(--color-ash)"
            strokeWidth="1.25"
            strokeLinejoin="round"
            strokeOpacity="0.6"
          />

          {/* Flow down the middle of it. */}
          <path
            aria-hidden
            d="M160 60 V296"
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="leak-spine"
          />

          {/* THE THREE CAUSES. Out through the wall, and stopping. */}
          {PORTS.map((port) => (
            <g key={port.d} aria-hidden>
              <path
                d={port.d}
                stroke="var(--color-ash)"
                strokeWidth="1.25"
                strokeDasharray="3 4"
                strokeOpacity="0.7"
                strokeLinecap="round"
              />
              <path
                d={port.d}
                pathLength="100"
                stroke="var(--color-ash)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="leak-escape"
                style={{ animationDelay: `${port.delay}ms` }}
              />
              <rect
                x={port.mark}
                y={port.y}
                width="12"
                height="12"
                rx="2.5"
                stroke="var(--color-ash)"
                strokeWidth="1.25"
                strokeOpacity="0.7"
              />
            </g>
          ))}

          {/* THE FORK. Both endings are the bottom of the same run, and the
              document treats them as different conversions, so they are drawn
              as different objects: one closed and paid, one still open. */}
          <g aria-hidden>
            <path
              d="M160 300 C160 318 112 314 112 330"
              pathLength="100"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="leak-out"
            />
            <path
              d="M160 300 C160 318 208 314 208 330"
              pathLength="100"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="leak-out leak-out-late"
            />

            <rect
              x="80"
              y="330"
              width="64"
              height="44"
              rx="8"
              className="fill-brand/15"
              stroke="var(--color-brand)"
              strokeWidth="1.5"
            />
            <rect x="92" y="343" width="32" height="7" rx="3" className="fill-brand" />
            <rect x="92" y="356" width="18" height="5" rx="2.5" className="fill-brand/55" />

            <rect
              x="176"
              y="330"
              width="64"
              height="44"
              rx="8"
              stroke="var(--color-ash)"
              strokeWidth="1.5"
              strokeOpacity="0.7"
              strokeDasharray="5 4"
            />
            <rect x="188" y="343" width="32" height="7" rx="3" className="fill-fog/40" />
            <rect x="188" y="356" width="18" height="5" rx="2.5" className="fill-fog/25" />
          </g>
        </svg>
      </div>
    </div>
  );
}

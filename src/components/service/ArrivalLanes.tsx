/** The hero drawing: two approaches to the same forecourt, at the two lengths
 *  the document gives them.
 *
 *  WHY IT IS A PLAN AND NOT A FUNNEL. This document's most specific claim is
 *  that its two customers are on opposite clocks: "A prospective buyer may
 *  compare vehicles, prices, specifications and dealerships for weeks before
 *  making contact. Someone with an urgent repair requirement may choose a
 *  workshop within minutes based on location, availability and reviews." One
 *  tapering funnel says the opposite of that sentence — it says everybody
 *  arrives the same way, only fewer of them. So the two routes are drawn as
 *  what they are: a long approach with four places it stops to compare, and a
 *  slip road with one, landing at the same threshold.
 *
 *  NOTHING IS MEASURED. The source gives "for weeks" and "within minutes" and
 *  no other quantity, so there is no axis, no scale and no unit here. The only
 *  claim the picture makes is the one the sentence makes: one route is much
 *  longer than the other and has far more stops on it.
 *
 *  NO WORDS ON IT. Both journeys are named once, in the client's own two
 *  sentences, in the section below — and their stops are labelled there too, on
 *  `ClockGap`. A hero drawing that has to be read is a second headline.
 *
 *  MOTION IS THE ARGUMENT. Each route carries a travelling dash, and the two
 *  durations are set nine seconds apart: the slip road runs its whole length
 *  several times while the long approach is still working through its second
 *  turn. That is the only place on the page where the difference between weeks
 *  and minutes is felt rather than stated. Travel is stroke-dashoffset against
 *  pathLength="100" so the dash numbers are percentages of each route's own
 *  length and no transform units are involved inside a scaled viewBox.
 *
 *  Every route, stop, bay and threshold is drawn in full underneath, so a
 *  browser that never runs an animation — or a reader who asked for none — sees
 *  both complete approaches and the place they lead to.
 *  See globals.css, "Arrival lanes". */

/** THE LONG APPROACH. A road plan, so it is drawn the way a road plan is:
 *  straight runs joined by fixed-radius corners, never a chain of free curves.
 *  The first version used cubics and came out as a scribble — a shape with no
 *  straight in it does not read as ground, it reads as a graph line.
 *
 *  Four corners and four stops. Every stop below sits on a straight run at a
 *  coordinate the path itself states, so no position is guessed at or arrived
 *  at by trigonometry — the hydration hazard that costs a route its island. */
const LONG =
  "M20 24 H92 A14 14 0 0 1 106 38 V96 A14 14 0 0 1 92 110 H44 A14 14 0 0 0 30 124 V186 A14 14 0 0 0 44 200 H146 A14 14 0 0 1 160 214 V254";
const LONG_STOPS: [number, number][] = [
  [56, 24],
  [106, 67],
  [30, 155],
  [96, 200],
];

/** THE SLIP ROAD. One corner, one stop, and it starts close by rather than at
 *  the edge of the frame: the document's driver is choosing a workshop "based
 *  on location", so this journey begins nearby by definition. */
const SHORT = "M298 214 H174 A14 14 0 0 0 160 228 V254";
const SHORT_STOPS: [number, number][] = [[236, 214]];

/** The forecourt's bays, either side of the entrance corridor. */
const BAYS = [48, 76, 104, 194, 222, 250];

export function ArrivalLanes({ label }: {
  /** The drawing's accessible name, handed in from the page's content file
   *  rather than written here: every word on this page is the client's, and the
   *  sentence this drawing depicts is one the client can still edit. Required,
   *  so a caller cannot ship an unnamed role="img". */
  label: string;
}) {
  return (
    <div
      className={
        // The house placement for a hero visual, matching GuestActions and
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
          viewBox="0 0 320 340"
          role="img"
          aria-label={label}
          className="relative block w-full"
          fill="none"
        >
          {/* THE TWO APPROACHES. Drawn in full, in ash, because a line that
              carries meaning is never in --color-line. */}
          {[LONG, SHORT].map((d, i) => (
            <g key={i} aria-hidden>
              {/* The road's own width, so the routes read as ground rather
                  than as a chart's series. */}
              <path
                d={d}
                stroke="var(--color-ash)"
                strokeWidth="9"
                strokeOpacity="0.16"
                strokeLinecap="round"
              />
              <path
                d={d}
                stroke="var(--color-ash)"
                strokeWidth="1.25"
                strokeOpacity="0.65"
                strokeLinecap="round"
              />
              <path
                d={d}
                pathLength="100"
                stroke="var(--color-brand)"
                strokeWidth="2.25"
                strokeLinecap="round"
                className={i === 0 ? "al-long" : "al-short"}
              />
            </g>
          ))}

          {/* WHERE EACH ROUTE STOPS TO COMPARE. Four against one, which is the
              whole of what this drawing claims. */}
          {LONG_STOPS.map(([x, y], i) => (
            <circle
              key={`l-${x}-${y}`}
              aria-hidden
              cx={x}
              cy={y}
              r="4.5"
              className="al-stop fill-ink-2"
              stroke="var(--color-ash)"
              strokeWidth="1.5"
              style={{ animationDelay: `${i * 620}ms` }}
            />
          ))}
          {SHORT_STOPS.map(([x, y]) => (
            <circle
              key={`s-${x}-${y}`}
              aria-hidden
              cx={x}
              cy={y}
              r="4.5"
              className="al-stop fill-ink-2"
              stroke="var(--color-ash)"
              strokeWidth="1.5"
              style={{ animationDelay: "300ms" }}
            />
          ))}

          {/* Where each route comes in from. Open ends, not terminals: neither
              journey starts on anything this business owns. */}
          <circle aria-hidden cx="20" cy="24" r="2.5" className="fill-ash" opacity="0.7" />
          <circle aria-hidden cx="298" cy="214" r="2.5" className="fill-ash" opacity="0.7" />

          {/* THE THRESHOLD. Both approaches land on the same one. */}
          <path
            aria-hidden
            d="M138 254 H182"
            stroke="var(--color-brand)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            aria-hidden
            d="M160 254 V318"
            stroke="var(--color-brand)"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="3 6"
          />

          {/* THE PREMISES, in plan: two wings either side of the entrance
              corridor, closed at the front. */}
          <path
            aria-hidden
            d="M36 324 V266 A12 12 0 0 1 48 254 H138"
            stroke="var(--color-ash)"
            strokeWidth="1.4"
            strokeOpacity="0.75"
            strokeLinejoin="round"
          />
          <path
            aria-hidden
            d="M182 254 H272 A12 12 0 0 1 284 266 V324"
            stroke="var(--color-ash)"
            strokeWidth="1.4"
            strokeOpacity="0.75"
            strokeLinejoin="round"
          />
          <path
            aria-hidden
            d="M36 324 H284"
            stroke="var(--color-ash)"
            strokeWidth="1.4"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />

          {/* The bays. A forecourt seen from above, and the reason the picture
              reads as a place rather than as a diagram. */}
          {BAYS.map((x, i) => (
            <rect
              key={x}
              aria-hidden
              x={x}
              y="272"
              width="22"
              height="38"
              rx="5"
              className="al-bay fill-brand/[0.07]"
              stroke="var(--color-ash)"
              strokeWidth="1.1"
              strokeOpacity="0.55"
              style={{ animationDelay: `${i * 540}ms` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

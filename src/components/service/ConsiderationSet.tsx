/** The banner drawing: a patient's shortlist.
 *
 *  WHY A SHORTLIST AND NOT A CHAIN, A ROAD, A DOCK OR A FAN. The client wrote
 *  one sentence that no other industry document on this site contains:
 *  "Patients may research several treatments and providers before deciding who
 *  to contact." One person, several providers, held at once. That is not a
 *  journey walked once (the automotive banner's two roads), not one arrival
 *  fanned into several endings (hospitality), and not four channels made up
 *  into three loads (logistics). It is a set under comparison, so it is drawn
 *  as one: a column of candidates with one of them resolved, and a single
 *  appointment slot under the column.
 *
 *  WHAT SEPARATES THE CHOSEN ENTRY FROM THE OTHERS IS LEGIBILITY, NOT SIZE.
 *  Every candidate is the same width and the same kind of thing. The resolved
 *  one simply has more written on it -- five lines against two -- and carries a
 *  control the others do not. That is the whole argument of the page in one
 *  contrast, and it is the honest one: this document's own limit is "without
 *  creating confusion or making unsupported promises", so the drawing cannot
 *  claim the chosen provider is bigger, closer or better rated. It can only
 *  claim it is understood.
 *
 *  THE FIVE LINES ARE FIVE LINES, NOT FIVE BARS. The client names five things
 *  that contribute to the decision -- treatment information, specialist
 *  profiles, reviews, locations and appointment options -- and five members of
 *  different heights standing on a baseline would be a bar chart, which claims
 *  a quantity nobody can measure by eye. Lines of text vary in length because
 *  text does; five of them read as "there is something written here" and
 *  nothing more.
 *
 *  NOTHING IS COUNTED AND NOTHING IS RANKED. Four candidates because four reads
 *  as "several"; the resolved one sits third rather than first, because first
 *  would say we rank first and the document promises no such thing. There is no
 *  axis, no scale and no order of merit anywhere on this drawing.
 *
 *  NO WORDS ON IT. The sentence it depicts is printed in full further down the
 *  page, in the client's own words. A hero drawing that has to be read is a
 *  second headline; this is the rule `ArrivalLanes` and `CrossDock` follow on
 *  the other two banners.
 *
 *  ONE THING RUNS AND ONE THING RESTS. `ci-blink` walks a reading marker down
 *  the four candidates, which is the sentence's verb -- "may research several
 *  ... providers". `ci-flow` carries the chosen entry into the slot. Stopped,
 *  the marker rests on the chosen provider (`data-first-tick`) and the slot
 *  rests open, so a browser that never animates and a reader who asked for no
 *  motion both get a finished picture: a shortlist read to its end, and an
 *  appointment still to be made. See globals.css, "Healthcare". */

/** The four candidates under consideration. `y` is the top edge; the third is
 *  taller because it is the one with something written on it. The resolved
 *  entry sits third rather than first: first would say we rank first, and
 *  this document promises no such thing. */
const CANDIDATES: { y: number; h: number; resolved?: boolean }[] = [
  { y: 14, h: 44 },
  { y: 66, h: 44 },
  { y: 118, h: 96, resolved: true },
  { y: 222, h: 44 },
];

/** An unresolved entry's two lines: offset from the entry's top edge, and a
 *  length. Lengths differ because text does, and for no other reason. */
const FAINT_LINES: [number, number][] = [
  [28, 104],
  [35, 68],
];

/** The five lines on the resolved entry, one per contribution the client's own
 *  sentence names, in that sentence's order. Lengths are text lengths and mean
 *  nothing else. */
const RESOLVED_LINES = [120, 98, 76, 108, 88];

export function ConsiderationSet({ label }: {
  /** The drawing's accessible name, handed in from the page's content file
   *  rather than written here: every word on this page is the client's, and the
   *  sentence this drawing depicts is one the client can still edit. Required,
   *  so a caller cannot ship an unnamed role="img". */
  label: string;
}) {
  const ASH = "var(--color-ash)";
  const BRAND = "var(--color-brand)";

  return (
    <div
      className={
        // The house placement for a hero visual, matching ArrivalLanes,
        // GuestActions, DemandLeak and CrossDock: anchored to the right gutter,
        // centred, out of the flow, and not rendered below the large
        // breakpoint, where it would add its own height and push the trust
        // strip below the fold.
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
          viewBox="0 0 290 366"
          role="img"
          aria-label={label}
          className="relative block w-full"
          fill="none"
        >
          {/* THE SET UNDER CONSIDERATION. One rule down the left edge holds the
              column together: it is the reader's own eye going down the list,
              so it is inked in ash rather than in --color-line. */}
          <path
            aria-hidden
            d="M14 22 V262"
            stroke={ASH}
            strokeWidth="1"
            strokeOpacity="0.35"
            strokeDasharray="3 6"
          />

          {CANDIDATES.map((c, ci) => (
            <g key={c.y} aria-hidden {...(c.resolved ? { "data-first-tick": "" } : {})}>
              {/* The reading marker. One lit at a time down the column, which
                  is what "may research several ... providers" describes. */}
              <rect
                x="10"
                y={c.y + 16}
                width="8"
                height="8"
                rx="1.5"
                className="ci-blink fill-brand"
                style={{ animationDelay: `${(ci * 6000) / CANDIDATES.length}ms` }}
              />

              <rect
                x="30"
                y={c.y}
                width="220"
                height={c.h}
                rx="6"
                stroke={c.resolved ? BRAND : ASH}
                strokeWidth={c.resolved ? 1.6 : 1.2}
                strokeOpacity={c.resolved ? 0.9 : 0.5}
              />

              {/* The entry's name. Every candidate has one; only the resolved
                  entry's is inked. */}
              <rect
                x="44"
                y={c.y + 12}
                width={c.resolved ? 104 : 78}
                height="10"
                rx="2.5"
                fill={c.resolved ? BRAND : ASH}
                fillOpacity={c.resolved ? 0.55 : 0.24}
              />

              {!c.resolved &&
                FAINT_LINES.map(([dy, w], i) => (
                  <path
                    key={i}
                    d={`M44 ${c.y + dy} H${44 + w}`}
                    stroke={ASH}
                    strokeWidth="1"
                    strokeOpacity={0.3 - i * 0.09}
                    strokeLinecap="round"
                  />
                ))}
            </g>
          ))}

          {/* WHAT IS WRITTEN ON THE CHOSEN ENTRY. Five lines, one per
              contribution the client names, and a control at the foot: the
              route to call, enquire or request an appointment that the
              unresolved entries do not offer. */}
          <g aria-hidden>
            {RESOLVED_LINES.map((w, i) => (
              <path
                key={i}
                d={`M44 ${154 + i * 11} H${44 + w}`}
                stroke={ASH}
                strokeWidth="1.4"
                strokeOpacity={0.62 - i * 0.05}
                strokeLinecap="round"
              />
            ))}
            <rect
              x="176"
              y="184"
              width="62"
              height="16"
              rx="8"
              fill={BRAND}
              fillOpacity="0.28"
              stroke={BRAND}
              strokeWidth="1.1"
              strokeOpacity="0.7"
            />
            <path
              d="M188 192 H226"
              stroke={BRAND}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
          </g>

          {/* THE DECISION. One join, leaving the entry that was understood and
              running down the outside of the column to the one thing the
              banner ends on. It goes round the set rather than through it: the
              other candidates are still on the list when this patient makes an
              appointment. Drawn in full underneath, because a ci-flow packet is
              a 14% dash and a join with nothing under it vanishes the moment
              the animation stops. */}
          <g aria-hidden>
            <path
              d="M250 166 H266 V304 H212"
              stroke={ASH}
              strokeWidth="1.2"
              strokeOpacity="0.45"
              strokeDasharray="4 6"
              strokeLinejoin="round"
            />
            <path
              d="M250 166 H266 V304 H212"
              pathLength="100"
              stroke={BRAND}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ci-flow"
            />
          </g>

          {/* THE SLOT. Held open rather than filled in: the banner sells
              appointment bookings, and a slot drawn as taken would be claiming
              one that has not been made. */}
          <g aria-hidden className="hc-hold">
            <rect
              x="98"
              y="284"
              width="114"
              height="40"
              rx="7"
              fill={BRAND}
              fillOpacity="0.14"
              stroke={BRAND}
              strokeWidth="1.6"
            />
            <path d="M98 298 H212" stroke={BRAND} strokeWidth="1" strokeOpacity="0.5" />
            <path
              d="M116 290 V304 M194 290 V304"
              stroke={BRAND}
              strokeWidth="1.4"
              strokeOpacity="0.75"
              strokeLinecap="round"
            />
            <path
              d="M124 312 H148 M164 312 H188"
              stroke={ASH}
              strokeWidth="1.4"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />
          </g>

          {/* And out. An open end, because what happens after the appointment
              is the provider's own business rather than this page's claim. */}
          <g aria-hidden>
            <path d="M155 324 V350" stroke={ASH} strokeWidth="9" strokeOpacity="0.11" strokeLinecap="round" />
            <path d="M155 324 V350" stroke={BRAND} strokeWidth="1.1" strokeOpacity="0.5" strokeDasharray="3 6" />
            <circle cx="155" cy="356" r="2.5" className="fill-brand" opacity="0.8" />
          </g>

        </svg>
      </div>
    </div>
  );
}

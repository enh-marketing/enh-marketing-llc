/** The banner drawing: a plan cut to fit four stated limits.
 *
 *  WHY A SHEET WITH FOUR STOPS ON IT. The banner's own sentence is "Get a
 *  clear digital marketing strategy based on your business goals, current
 *  performance, audience and available budget." Four things the plan is based
 *  on, and every one of them is a LIMIT rather than an input: goals bound what
 *  it is for, current performance bounds where it starts, the audience bounds
 *  who it can reach and the budget bounds what can be done. A plan cut to fit
 *  four limits is a sheet with a stop set on each of its four edges, which is
 *  how anyone who has ever set up a page or a cut actually does it -- and the
 *  four guides those stops throw are what the working area is.
 *
 *  AND WHAT IS INSIDE THE WORKING AREA IS AN ORDER, NOT A LIST. The document's
 *  own distinction: "You receive a realistic order of work instead of a list
 *  where everything appears equally important." So the entries are six rules
 *  of IDENTICAL length -- nothing here is longer, taller or bigger than
 *  anything else, because the document ranks these by nothing a reader could
 *  measure -- and the only thing that separates them is position: the first one
 *  is inked, bracketed and first. That is the whole claim and it is the only
 *  claim.
 *
 *  NOTHING IS COUNTED. Four stops because the sentence names four limits. Six
 *  entries because a plan needs enough rows to read as a run and few enough to
 *  take in at a glance; no number anywhere in the document says six, and none
 *  is implied -- they carry no index, no scale and no axis.
 *
 *  NO WORDS ON IT. The four limits are named once, in the client's sentence
 *  directly beside it. A hero drawing that has to be read is a second
 *  headline. Same rule `CrossDock` and `ArrivalLanes` follow.
 *
 *  Everything rests drawn: a browser that never animates, a failed hydration
 *  and a reader who asked for no motion all get the complete sheet with its
 *  first entry lit. */

/** The working area, inset from the sheet by the four stops. */
const L = 54;
const R = 236;
const T = 64;
const B = 292;

/** Where each stop sits along its own edge. Off-centre and all different, so
 *  four marks do not read as a symmetrical ornament. */
const STOPS = [
  { d: `M96 18 V${T}`, cap: { x: 96, y: 18, w: 9, h: 3 } },
  { d: `M272 118 H${R}`, cap: { x: 269, y: 113.5, w: 3, h: 9 } },
  { d: `M176 322 V${B}`, cap: { x: 171.5, y: 319, w: 9, h: 3 } },
  { d: `M18 214 H${L}`, cap: { x: 18, y: 209.5, w: 3, h: 9 } },
];

/** The order of work. Equal rules, equal spacing; only position differs. */
const ENTRIES = [92, 126, 160, 194, 228, 262];

export function BriefFrame({ label }: {
  /** The drawing's accessible name, handed in from the page's content file
   *  rather than written here: every word on this page is the client's, and
   *  the sentence this drawing depicts is one the client can still edit.
   *  Required, so a caller cannot ship an unnamed role="img". */
  label: string;
}) {
  const ASH = "var(--color-ash)";
  const BRAND = "var(--color-brand)";

  return (
    <div
      className={
        // The house placement for a hero visual, matching CrossDock,
        // ArrivalLanes and GuestActions: anchored to the right gutter,
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
          viewBox="0 0 290 340"
          role="img"
          aria-label={label}
          className="relative block w-full"
          fill="none"
        >
          <defs>
            {/* The sweep is a reading pass over the working area and must not
                run out over the margins, so it is clipped to the area the
                stops define. */}
            <clipPath id="bf-work">
              <rect x={L} y={T} width={R - L} height={B - T} />
            </clipPath>
          </defs>

          {/* THE SHEET. One rectangle, which is what a plan is. */}
          <rect
            x="18"
            y="18"
            width="254"
            height="304"
            rx="3"
            stroke={ASH}
            strokeWidth="1.4"
            strokeOpacity="0.75"
          />

          {/* THE FOUR GUIDES the stops throw. Faint, dashed, and inked in ash
              rather than in --color-line, which is a border colour and carries
              no meaning. */}
          <g aria-hidden stroke={ASH} strokeWidth="0.9" strokeOpacity="0.34" strokeDasharray="3 6">
            <path d={`M18 ${T} H272`} />
            <path d={`M18 ${B} H272`} />
            <path d={`M${L} 18 V322`} />
            <path d={`M${R} 18 V322`} />
          </g>

          {/* THE FOUR STOPS. Each runs from its own edge in to its guide, so
              what is drawn is the measurement rather than a mark on a scale. */}
          {STOPS.map((s) => (
            <g key={s.d} aria-hidden>
              <path d={s.d} stroke={BRAND} strokeWidth="2.4" strokeLinecap="round" />
              <rect x={s.cap.x} y={s.cap.y} width={s.cap.w} height={s.cap.h} rx="1.5" fill={BRAND} />
            </g>
          ))}

          {/* THE ORDER OF WORK. Six entries of identical length: the document
              gives no weighting anyone could measure, so none is drawn. The
              first is inked and bracketed because the strategy says "what
              should happen first", and that is the only distinction made. */}
          <g aria-hidden>
            <path
              d={`M58 ${ENTRIES[0] - 9} V${ENTRIES[0] + 9}`}
              stroke={BRAND}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {ENTRIES.map((y, i) => (
              <g key={y} {...(i === 0 ? { "data-first-tick": "" } : {})}>
                <path
                  d={`M80 ${y} H224`}
                  stroke={i === 0 ? BRAND : ASH}
                  strokeWidth={i === 0 ? 2.2 : 1.2}
                  strokeOpacity={i === 0 ? 1 : 0.5}
                  strokeLinecap="round"
                />
                {/* One light walks the six in turn: same duration, a delay of
                    duration/count. Never a per-entry stagger on a length or a
                    height -- six rules at six different states at one instant
                    would be a weighting the document does not give. */}
                <rect
                  x="66"
                  y={y - 3}
                  width="6"
                  height="6"
                  rx="1.5"
                  fill={BRAND}
                  className="ci-blink"
                  style={{ animationDelay: `${i}s` }}
                />
                <rect
                  x="66"
                  y={y - 3}
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke={ASH}
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
              </g>
            ))}
          </g>

          {/* The review, passing over the plan. ci-scan-x travels in user
              units, which is why it lives inside the viewBox. */}
          <g clipPath="url(#bf-work)" aria-hidden>
            <rect x={L} y={T} width="22" height={B - T} className="ci-scan-x fill-brand/[0.14]" />
          </g>
        </svg>
      </div>
    </div>
  );
}

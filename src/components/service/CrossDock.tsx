/** The banner drawing: a cross-dock, in plan.
 *
 *  WHY A SHED AND NOT A FUNNEL, A ROUTE OR A FAN. The banner's own sentence is
 *  "Generate qualified freight enquiries, requests for quotations and B2B
 *  opportunities through logistics SEO, paid advertising, content and LinkedIn
 *  marketing", and the opening section says the same thing in the client's
 *  fuller words: four channels connected with three measurable actions. Four in
 *  and three out is not a narrowing, so it is not drawn as one. It is a
 *  cross-dock: inbound doors along the top wall, a floor where what arrives is
 *  made up into loads, outbound doors along the bottom wall, and three loads
 *  leaving by them. That is the operation the sentence describes and it is also
 *  the one building in freight that has doors on both sides.
 *
 *  NOTHING IS PAIRED. The four feeds are not wired to particular outbound
 *  doors, because the document never says which channel produces which action.
 *  What arrives lands on the floor; what leaves is made up there. A drawing
 *  that ran four lines to three doors would be asserting a mapping the source
 *  does not contain.
 *
 *  NOTHING IS COUNTED. Four doors and three loads because the sentence names
 *  four channels and three actions. There is no size, no axis and no unit
 *  anywhere here: the loads differ in width only so that three of them do not
 *  read as one repeated shape.
 *
 *  NO WORDS ON IT. Both lists are named once, in the client's own sentence, in
 *  the section directly below. A hero drawing that has to be read is a second
 *  headline. This is the same rule `ArrivalLanes` follows on the automotive
 *  banner.
 *
 *  Every feed, door, load and lane is drawn in full underneath, so a browser
 *  that never runs an animation -- or a reader who asked for none -- sees a
 *  complete dock with everything standing on it. See globals.css, "Logistics". */

/** Inbound door centres along the top wall. Four, one per channel. */
const IN = [64, 118, 172, 226];

/** Outbound door centres along the bottom wall. Three, one per action, and
 *  wider than the inbound doors because a load leaves made up. */
const OUT = [82, 156, 230];

/** The loads standing on the floor, above the door each will leave by. Widths
 *  differ so three shapes do not read as one shape printed three times. */
const LOADS: { x: number; w: number }[] = [
  { x: 58, w: 48 },
  { x: 128, w: 56 },
  { x: 204, w: 52 },
];

export function CrossDock({ label }: {
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
        // GuestActions and DemandLeak: anchored to the right gutter, centred,
        // out of the flow, and not rendered below the large breakpoint, where
        // it would add its own height and push the trust strip below the fold.
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
          {/* THE FOUR FEEDS. Drawn in full, in ash, because a line that carries
              meaning is never in --color-line. Each carries one travelling
              packet on its own delay, so the dock is always receiving. */}
          {IN.map((x, i) => (
            <g key={`feed-${x}`} aria-hidden>
              <circle cx={x} cy="16" r="2.5" className="fill-ash" opacity="0.7" />
              {/* The lane's own width, so a feed reads as a way in rather
                  than as a series on a chart. Same device as the roads on the
                  automotive banner. */}
              <path
                d={`M${x} 18 V96`}
                stroke={ASH}
                strokeWidth="8"
                strokeOpacity="0.13"
                strokeLinecap="round"
              />
              <path
                d={`M${x} 18 V96`}
                stroke={ASH}
                strokeWidth="1.3"
                strokeOpacity="0.6"
                strokeLinecap="round"
              />
              <path
                d={`M${x} 18 V96`}
                pathLength="100"
                stroke={BRAND}
                strokeWidth="2.2"
                strokeLinecap="round"
                className="ci-flow"
                style={{ animationDelay: `${i * 700}ms` }}
              />
            </g>
          ))}

          {/* THE SHED. Two walls, broken by their doors, joined by two ends. */}
          <g aria-hidden stroke={ASH} strokeWidth="1.5" strokeOpacity="0.8" strokeLinecap="round">
            {/* Top wall, in the gaps between the inbound doors. */}
            <path d="M20 96 H50" />
            <path d="M78 96 H104" />
            <path d="M132 96 H158" />
            <path d="M186 96 H212" />
            <path d="M240 96 H270" />
            {/* Bottom wall, in the gaps between the outbound doors. */}
            <path d="M20 244 H62" />
            <path d="M102 244 H136" />
            <path d="M176 244 H210" />
            <path d="M250 244 H270" />
            {/* Ends. */}
            <path d="M20 96 V244" />
            <path d="M270 96 V244" />
          </g>

          {/* THE DOORS. Inbound above, outbound below, both inked because they
              are the openings the sentence's two lists arrive and leave by. */}
          {IN.map((x) => (
            <path
              key={`in-${x}`}
              aria-hidden
              d={`M${x - 14} 96 H${x + 14}`}
              stroke={BRAND}
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.55"
            />
          ))}
          {OUT.map((x) => (
            <path
              key={`out-${x}`}
              aria-hidden
              d={`M${x - 20} 244 H${x + 20}`}
              stroke={BRAND}
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}

          {/* THE FLOOR. A working band across the shed, swept continuously.
              ci-scan-x travels in user units, which is why it lives inside the
              viewBox rather than on an HTML box. */}
          <g aria-hidden>
            <path
              d="M20 150 H270"
              stroke={ASH}
              strokeWidth="1"
              strokeOpacity="0.32"
              strokeDasharray="4 7"
            />
            <rect
              x="14"
              y="100"
              width="26"
              height="46"
              className="ci-scan-x fill-brand/[0.16]"
            />
            {/* Where each feed lands. The lanes stop at the floor line and go
                no further, because what arrives is made up on the floor and
                the document never says which channel produces which action. */}
            {IN.map((x) => (
              <path
                key={`land-${x}`}
                d={`M${x} 96 V150`}
                stroke={ASH}
                strokeWidth="1"
                strokeOpacity="0.28"
                strokeDasharray="3 6"
              />
            ))}
          </g>

          {/* THE LOADS, made up on the floor and standing above the door each
              will leave by. */}
          {LOADS.map((l, i) => (
            <g key={`load-${l.x}`} aria-hidden className="lg-live" style={{ animationDelay: `${i * 900}ms` }}>
              <rect
                x={l.x}
                y="176"
                width={l.w}
                height="48"
                rx="4"
                className="fill-brand/[0.10]"
                stroke={ASH}
                strokeWidth="1.2"
                strokeOpacity="0.75"
              />
              {/* Strapping, so a rectangle reads as a load rather than a box. */}
              <path
                d={`M${l.x} 194 H${l.x + l.w} M${l.x} 208 H${l.x + l.w}`}
                stroke={ASH}
                strokeWidth="0.9"
                strokeOpacity="0.45"
              />
            </g>
          ))}

          {/* THE THREE DEPARTURES. Open ends: what leaves this dock goes to
              someone else's business, which is what an enquiry is. */}
          {OUT.map((x) => (
            <g key={`lane-${x}`} aria-hidden>
              <path
                d={`M${x} 244 V318`}
                stroke={ASH}
                strokeWidth="10"
                strokeOpacity="0.11"
                strokeLinecap="round"
              />
              <path
                d={`M${x} 244 V318`}
                stroke={BRAND}
                strokeWidth="1.1"
                strokeOpacity="0.5"
                strokeDasharray="3 6"
              />
              <circle cx={x} cy="322" r="2.5" className="fill-brand" opacity="0.8" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

"use client";

/** The same business details, held four times over: once on your own website
 *  and once on each of three external profiles, laid out so the reader can
 *  read down a column and see where the four copies stop agreeing.
 *
 *  WHY A TABLE OF RECORDS. The service's first sentence is a claim about
 *  sameness across many places: "Your company name, services, locations,
 *  contact information, and other important details should remain consistent
 *  across the web." Sameness across places has one honest picture, which is the
 *  same fields repeated in rows with their edges lining up. Nothing else shows
 *  agreement, because agreement is only visible against the thing it agrees
 *  with. So the four columns are the four details that sentence names, in its
 *  order, and every row carries all four.
 *
 *  WHY THE FAULTS ARE THE SUBJECT. "We review your website and relevant
 *  external profiles to find missing, outdated, or conflicting information."
 *  The finding is the work, so three cells out of sixteen are inked in brand
 *  and the other thirteen are ash. One is a gap where the other three records
 *  hold a value. Two are values that do not match the rest of their column: one
 *  runs long, one falls short. The two vertical rules are the edge the rest of
 *  that column shares, so the mismatch is a mismatch between records, visible
 *  by eye, rather than a warning glyph a reader has to be taught.
 *
 *  WHY THE FIRST ROW IS DRAWN DIFFERENTLY. The same sentence names two kinds of
 *  source, "your website" and "relevant external profiles", so the first record
 *  is a window with its own chrome and the other three are profile cards with
 *  an avatar, at three different widths because they are three different
 *  places and not a tidy set. Your website is clean here and the profiles are
 *  not, which is the ordinary case the service is written for.
 *
 *  NO INVENTED DETAILS. Every field is a bar. Writing a company name, a phone
 *  number or a Dubai address into the drawing would put a real business on the
 *  page, and the length of a bar is a value, not a measurement: nothing here is
 *  a quantity, a count or a score.
 *
 *  INKED IN ASH, NOT LINE. On the dark chapter --color-line is #2e2e2e against
 *  #101010, which is 1.4:1 and does not appear at all. */

/** The four details the opening sentence names, in its order: company name,
 *  services, locations, contact information. `w` is what the column agrees on
 *  and `o` is how heavily that field is set, the name being the heaviest. */
const COLUMNS = [
  { x: 250, w: 124, o: 0.55 },
  { x: 412, w: 126, o: 0.42 },
  { x: 574, w: 106, o: 0.38 },
  { x: 736, w: 132, o: 0.32 },
];

/** The vertical centre of each record's row. Row 0 is your own website. */
const ROWS = [63, 135, 207, 279];

/** The three external profiles: same card, three widths, because they are
 *  three separate places and not one set. */
const PROFILES = [
  { y: 114, w: 184, name: 96 },
  { y: 186, w: 168, name: 84 },
  { y: 258, w: 152, name: 70 },
];

/** What the review finds, keyed row-column. "missing" leaves the slot empty;
 *  "long" and "short" hold a value that does not match the rest of its
 *  column. Nothing else in the grid is marked. */
const FAULTS: Record<string, { kind: "missing" | "long" | "short"; w?: number }> = {
  "1-2": { kind: "long", w: 136 },
  "2-1": { kind: "missing" },
  "3-0": { kind: "short", w: 88 },
};

/** The two columns whose fault is a length rather than a gap. The rule stands
 *  at the edge the rest of that column shares, far enough clear of the next
 *  column's values that it reads as an edge and not as a divider. */
const AGREED_EDGES = [374, 680];

/** The washes that walk across the three findings, one lit at a time. */
const MARKS = [
  { x: 568, y: 122, w: 152 },
  { x: 406, y: 194, w: 138 },
  { x: 244, y: 266, w: 140 },
];

export function EntityDrawing() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 900 340"
        className="w-full"
        role="img"
        aria-label="The same business details listed for your own website and for three external profiles, with the one that is missing and the two that do not match the others picked out."
      >
        {/* ------------------------------------------------------- the rows --
            One hairline between records, so four rows read as four records
            rather than as one field of bars. */}
        {[99, 171, 243].map((y) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2="880"
            y2={y}
            stroke="var(--color-ash)"
            strokeOpacity="0.28"
            strokeWidth="1"
          />
        ))}

        {/* --------------------------------------------------- your website --
            A window: a title bar with its two controls, and the site's own name
            set inside it. Drawn unlike the three below because the document
            names two kinds of source and this is the first of them, the one
            you control. */}
        <rect
          x="26"
          y="40"
          width="184"
          height="46"
          rx="8"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />
        <line
          x1="26"
          y1="54"
          x2="210"
          y2="54"
          stroke="var(--color-ash)"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <circle cx="38" cy="47" r="2.6" fill="var(--color-ash)" fillOpacity="0.6" />
        <circle cx="48" cy="47" r="2.6" fill="var(--color-ash)" fillOpacity="0.4" />
        <rect x="40" y="66" width="120" height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.55" />

        {/* -------------------------------------- relevant external profiles --
            A profile: an avatar and a name, three times, at three widths,
            because they are three separate places and not one tidy set. */}
        {PROFILES.map((p) => (
          <g key={p.y}>
            <rect
              x="26"
              y={p.y}
              width={p.w}
              height="42"
              rx="8"
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity="0.5"
              strokeWidth="1.4"
            />
            <circle cx="48" cy={p.y + 21} r="9" fill="var(--color-ash)" fillOpacity="0.45" />
            <rect
              x="68"
              y={p.y + 17}
              width={p.name}
              height="8"
              rx="4"
              fill="var(--color-ash)"
              fillOpacity="0.45"
            />
          </g>
        ))}

        {/* ------------------------------------------------- who, then what --
            The one boundary in the drawing: the source on the left, the
            details it holds on the right. */}
        <line
          x1="228"
          y1="22"
          x2="228"
          y2="320"
          stroke="var(--color-ash)"
          strokeOpacity="0.4"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* --------------------------------------------------- the findings --
            A wash under each of the three cells the review picks up, lit one at
            a time. It rests invisible, which is why it carries no meaning of
            its own: the gap and the two unmatched lengths are already inked in
            brand underneath it. */}
        {MARKS.map((m, i) => (
          <rect
            key={m.x}
            x={m.x}
            y={m.y}
            width={m.w}
            height="26"
            rx="7"
            fill="var(--color-brand)"
            fillOpacity="0.18"
            className="ci-blink-soft"
            style={{ animationDuration: "6s", animationDelay: `${i * 2}s` }}
          />
        ))}

        {/* --------------------------------------------------- the details --
            Sixteen slots: four details held four times. Thirteen agree with
            their column. One is empty. Two hold a value that does not match. */}
        {ROWS.map((cy, r) => (
          <g key={cy}>
            {COLUMNS.map((c, i) => {
              const fault = FAULTS[`${r}-${i}`];

              if (fault?.kind === "missing") {
                /* A gap where the other three records hold a value. Outlined so
                   the empty slot is a slot and not blank paper. */
                return (
                  <rect
                    key={c.x}
                    x={c.x}
                    y={cy - 9}
                    width={c.w}
                    height="18"
                    rx="6"
                    fill="none"
                    stroke="var(--color-brand)"
                    strokeOpacity="0.75"
                    strokeWidth="1.4"
                    strokeDasharray="5 6"
                  />
                );
              }

              return (
                <rect
                  key={c.x}
                  x={c.x}
                  y={cy - 5}
                  width={fault?.w ?? c.w}
                  height="10"
                  rx="5"
                  fill={fault ? "var(--color-brand)" : "var(--color-ash)"}
                  fillOpacity={fault ? 0.9 : c.o}
                />
              );
            })}
          </g>
        ))}

        {/* ------------------------------------------------- the agreements --
            Where a column agrees, its values end on the same edge. The rule is
            that edge, drawn over the cells so the two that break it are read
            against the three that hold it: one runs past, one stops short.
            Stroke widths are in viewBox units, because .ci-draw sets
            vector-effect: none. Under non-scaling-stroke Chromium measures the
            dash in screen pixels and any path over 100px renders as a dash, a
            gap and a stub. */}
        {AGREED_EDGES.map((x, i) => (
          <path
            key={x}
            d={`M ${x} 26 V 316`}
            pathLength="100"
            fill="none"
            stroke="var(--color-brand)"
            strokeOpacity="0.5"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="ci-draw"
            style={{ animationDuration: "5.4s", animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </svg>

      {/* The three words for what is drawn, all from one sentence of the
          service: "We review your website and relevant external profiles to
          find missing, outdated, or conflicting information." HTML at the 11px
          floor, so they hold at every width instead of scaling with the
          viewBox. */}
      <figcaption className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        {["your website", "relevant external profiles", "missing, outdated, or conflicting"].map(
          (label) => (
            <span
              key={label}
              className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash"
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {label}
            </span>
          ),
        )}
      </figcaption>
    </figure>
  );
}

"use client";

/** The baseline test itself: an agreed list of questions on the left, the
 *  included AI platforms they are put to in the middle, and the record that
 *  comes back on the right.
 *
 *  WHY THIS DRAWING. Service 01 is the one item on the page that measures
 *  rather than changes anything, and its body is a procedure in three moves:
 *  "We start with an agreed list of questions related to your services,
 *  products and market. We test those questions across the included AI
 *  platforms and record whether your brand appears, which pages are cited and
 *  which competitors are mentioned." The drawing is that procedure, read left
 *  to right, with nothing invented between the moves. Questions go out, the
 *  platforms answer, rows come back.
 *
 *  EVERY NAMED THING IS ITS OWN SILHOUETTE. A drawing of this made out of
 *  rounded rectangles would be a legend to learn, so each named thing is drawn
 *  as the thing it is:
 *
 *    a question      a token with a point on its right end, aimed at the
 *                    platforms it is about to be put to.
 *    a platform      a reply bubble with its tail on the side the question
 *                    arrives from. It is a thing that answers, and that is the
 *                    only claim the copy makes about it.
 *    brand appears   a disc, filled where it did.
 *    pages cited     a portrait sheet with its corner turned.
 *    competitors     a name tag, pointed at one end and punched at the other.
 *
 *  A DISC, A SHEET AND A TAG CANNOT BE MISTAKEN FOR EACH OTHER at a glance,
 *  which is the whole test a drawing on this page has to pass. Present is
 *  solid; absent is the same silhouette in a dashed ghost, so the grammar is
 *  learnt from the first row and holds for the rest.
 *
 *  RED IS YOURS. The discs and the cited sheets are your brand's marks, so they
 *  are the only brand-red things in the frame, along with the packet that
 *  carries an answer back into the record. Competitors are ash, and so are the
 *  questions, the platforms and every wire. The colour is not a legend to
 *  learn: the caption under the drawing says "whether your brand appears", the
 *  red marks sit in that column, and the rest follows.
 *
 *  NO COUNTS. The page's own closing note promises "no guaranteed placements
 *  and no general AI score", so nothing here is a quantity. Every mark in the
 *  record is present or absent and never more or less: one disc, one sheet and
 *  one tag per row, every tag the same width and every sheet the same size, so
 *  no two rows can be compared by length. The third row is the useful one: the
 *  brand did not appear, no page of yours was cited, and a competitor was named
 *  anyway.
 *
 *  ASH, NOT LINE. On this chapter --color-line is #2e2e2e against #101010,
 *  which is 1.4:1 and does not render, so every line carrying meaning is inked
 *  in ash. Ash is ink here and never a surface: the two panels and the five
 *  bubbles are drawn, not filled, and the only ash washes are inside marks
 *  small enough to read as marks.
 *
 *  Stroke widths on the travelling packets are in viewBox units, because
 *  .ci-flow sets vector-effect: none. Under non-scaling-stroke Chromium
 *  measures the dash in screen pixels and a path over 100px long renders as a
 *  dash, a gap and a stub. */

/** The three questions, and the row each one produces. The record's three
 *  fields are independent binaries, so the rows differ in all three ways:
 *  "record whether your brand appears, which pages are cited and which
 *  competitors are mentioned". */
const ROWS = [
  { y: 88, ask: 150, appears: true, cited: true, rival: true },
  { y: 170, ask: 122, appears: true, cited: true, rival: false },
  { y: 252, ask: 138, appears: false, cited: false, rival: true },
];

/** The included AI platforms. The banner names five, so there are five reply
 *  bubbles, each holding an answer of its own length. They are peers and
 *  nothing here ranks them. */
const PLATFORMS = [
  { y: 22, w: 92 },
  { y: 85, w: 68 },
  { y: 148, w: 96 },
  { y: 211, w: 74 },
  { y: 274, w: 84 },
];

/** "We test those questions across the included AI platforms": the questions
 *  going out, into the tails of the top, middle and bottom bubbles. */
const ASKED = [
  "M 228 88 C 252 88 256 44 284 44",
  "M 228 170 C 250 170 262 170 284 170",
  "M 228 252 C 252 252 256 296 284 296",
];

/** "and record whether your brand appears": what comes back, into the rows. */
const RECORDED = [
  "M 420 44 C 446 44 452 88 482 88",
  "M 420 170 C 442 170 456 170 482 170",
  "M 420 296 C 446 296 452 252 482 252",
];

/** An agreed question: a token with a point on its right end, so the list reads
 *  as a set of things about to be put somewhere rather than as lines of text. */
function questionPath(y: number, w: number) {
  return `M 53 ${y - 11} H ${42 + w - 12} L ${42 + w} ${y} L ${42 + w - 12} ${y + 11} H 53 A 11 11 0 0 1 53 ${y - 11} Z`;
}

/** An included AI platform: a reply bubble, its tail on the left because that
 *  is the side the question arrives from. */
function bubblePath(t: number) {
  return `M 306 ${t} H 410 A 10 10 0 0 1 420 ${t + 10} V ${t + 34} A 10 10 0 0 1 410 ${t + 44} H 306 A 10 10 0 0 1 296 ${t + 34} V ${t + 31} L 284 ${t + 22} L 296 ${t + 13} V ${t + 10} A 10 10 0 0 1 306 ${t} Z`;
}

/** A cited page: a portrait sheet with its top corner turned. The fold is a
 *  second subpath of the same path, wound the same way, so the sheet stays one
 *  shape and the corner still reads as folded. */
function pagePath(y: number) {
  const t = y - 23;
  return `M 597 ${t} h 21 l 14 14 v 27 a 5 5 0 0 1 -5 5 h -30 a 5 5 0 0 1 -5 -5 v -36 a 5 5 0 0 1 5 -5 z M 618 ${t} l 14 14 h -14 z`;
}

/** A competitor named in an answer: a name tag, pointed at one end. Every tag
 *  is the same width, so nothing in this column can be read as a quantity. */
function tagPath(y: number) {
  return `M 672 ${y} L 686 ${y - 13} H 852 A 6 6 0 0 1 858 ${y - 7} V ${y + 7} A 6 6 0 0 1 852 ${y + 13} H 686 Z`;
}

export function BaselineDrawing() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 900 340"
        className="w-full"
        role="img"
        aria-label="An agreed list of questions is put to the included AI platforms, and the record that comes back marks where the brand appears, which of its pages were cited, and where a competitor was named."
      >
        {/* ------------------------------------- an agreed list of questions --
            The questions, one token each, every point aimed at the platforms.
            "We start with an agreed list of questions related to your services,
            products and market." */}
        <rect
          x="14"
          y="22"
          width="214"
          height="296"
          rx="16"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.45"
          strokeWidth="1.4"
        />
        {ROWS.map((r) => (
          <path
            key={r.y}
            d={questionPath(r.y, r.ask)}
            fill="var(--color-ash)"
            fillOpacity="0.18"
            stroke="var(--color-ash)"
            strokeOpacity="0.5"
            strokeWidth="1.3"
          />
        ))}

        {/* ------------------------------------- the included AI platforms --
            Five reply bubbles, five answers of five different lengths. Nothing
            distinguishes one from another beyond that, because the copy names
            them and ranks none of them. */}
        {PLATFORMS.map((p) => (
          <g key={p.y}>
            <path
              d={bubblePath(p.y)}
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity="0.5"
              strokeWidth="1.3"
            />
            <rect
              x="314"
              y={p.y + 18}
              width={p.w}
              height="8"
              rx="4"
              fill="var(--color-ash)"
              fillOpacity="0.4"
            />
          </g>
        ))}

        {/* ------------------------------------------------ the test itself --
            The tracks stay drawn underneath the packets, so the route reads at
            rest, in a screenshot, and for a reader who has asked for no motion.
            A flow dash on its own is absent for most of its own cycle. */}
        {ASKED.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--color-ash)"
            strokeOpacity="0.42"
            strokeWidth="1.4"
            strokeDasharray="4 6"
          />
        ))}
        {RECORDED.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--color-ash)"
            strokeOpacity="0.42"
            strokeWidth="1.4"
            strokeDasharray="4 6"
          />
        ))}

        {/* Questions going out. */}
        {[
          { d: ASKED[0], duration: "3.4s", delay: "0s" },
          { d: ASKED[2], duration: "3.4s", delay: "0.9s" },
        ].map((p) => (
          <path
            key={p.d}
            d={p.d}
            pathLength="100"
            fill="none"
            stroke="var(--color-ash)"
            strokeOpacity="0.9"
            strokeWidth="4"
            strokeLinecap="round"
            className="ci-flow"
            style={{ animationDuration: p.duration, animationDelay: p.delay }}
          />
        ))}

        {/* An answer coming back into the record. The one moving mark in brand,
            because what it carries is your brand's row. */}
        <path
          d={RECORDED[1]}
          pathLength="100"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="4.5"
          strokeLinecap="round"
          className="ci-flow"
          style={{ animationDuration: "3.8s", animationDelay: "1.7s" }}
        />

        {/* ------------------------------------------------- the record ------
            One row per question, three fields per row, each field a different
            shape. "record whether your brand appears, which pages are cited and
            which competitors are mentioned". */}
        <rect
          x="482"
          y="22"
          width="404"
          height="296"
          rx="16"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        {/* The rules between the rows, so the three read as one record rather
            than as three loose groups of marks. */}
        {[129, 211].map((y) => (
          <line
            key={y}
            x1="506"
            y1={y}
            x2="862"
            y2={y}
            stroke="var(--color-ash)"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
        ))}
        {ROWS.map((r) => (
          <g key={r.y}>
            {/* Whether your brand appears: filled where it did, a dashed ghost
                where it did not. A binary, which is what the sentence states. */}
            <circle
              cx="530"
              cy={r.y}
              r="11"
              fill={r.appears ? "var(--color-brand)" : "none"}
              stroke={r.appears ? "none" : "var(--color-ash)"}
              strokeOpacity={r.appears ? undefined : "0.5"}
              strokeWidth={r.appears ? undefined : "2"}
              strokeDasharray={r.appears ? undefined : "3 4"}
            />

            {/* Which pages are cited: a sheet of yours, or the empty slot where
                none was. */}
            <path
              d={pagePath(r.y)}
              fill={r.cited ? "var(--color-brand)" : "none"}
              fillOpacity={r.cited ? 0.14 : undefined}
              stroke={r.cited ? "var(--color-brand)" : "var(--color-ash)"}
              strokeOpacity={r.cited ? 0.9 : 0.4}
              strokeWidth="1.6"
              strokeDasharray={r.cited ? undefined : "4 4"}
            />

            {/* Which competitors are mentioned: a name that is not yours, so it
                is ash. Same tag every row, present or absent. */}
            <path
              d={tagPath(r.y)}
              fill="var(--color-ash)"
              fillOpacity={r.rival ? 0.16 : 0}
              stroke="var(--color-ash)"
              strokeOpacity={r.rival ? 0.55 : 0.32}
              strokeWidth="1.4"
              strokeDasharray={r.rival ? undefined : "4 5"}
            />
            <circle
              cx="697"
              cy={r.y}
              r="4.5"
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity={r.rival ? 0.55 : 0.28}
              strokeWidth="1.4"
            />
          </g>
        ))}
      </svg>

      {/* Three labels, each a phrase from service 01's own body, and each HTML
          rather than SVG text so it holds the 11px floor at every width.

          "an agreed list of questions" and "the included AI platforms" and
          "whether your brand appears" all come from the item's first two
          sentences: "We start with an agreed list of questions related to your
          services, products and market. We test those questions across the
          included AI platforms and record whether your brand appears, which
          pages are cited and which competitors are mentioned."

          The record's other two fields are deliberately unlabelled. A folded
          sheet and a name tag do not need naming, and a fourth and fifth label
          would turn the drawing into a notation to learn. */}
      <figcaption className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        {["an agreed list of questions", "the included AI platforms", "whether your brand appears"].map(
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

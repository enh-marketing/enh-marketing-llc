"use client";

/** The page a reader lands on, with the answer sitting where they can see it.
 *
 *  WHY THIS DRAWING. The service's own first sentence is the whole brief: "We
 *  review whether your website gives clear answers to the questions people ask
 *  about your business." So the drawing is a page with the question on it and
 *  the answer directly under the question. Nothing here has to be taught.
 *  Anyone who has read a web page knows what a heading, a question and a run of
 *  detail look like, and the vertical order carries the claim the copy makes
 *  next by itself: "Important information should appear clearly on the page and
 *  be supported by accurate details."
 *
 *  HIGH AND PLAIN, AND RED ONLY ONCE. The answer is the widest block in the
 *  box, it sits in the top third, its lines are indented off a rule the way a
 *  set-off passage is in print, and it is the only brand-red thing drawn.
 *  Everything else on the page is ash.
 *  That makes the promise visible rather than captioned: a reader can see where
 *  the important information sits before reading a word of the label row.
 *
 *  THE DETAILS UNDERNEATH. Three fields of key and value, each tied up into the
 *  answer by a short upright that draws itself from the detail towards the
 *  block it holds up. The uprights are equal in length on purpose. "Supported
 *  by accurate details" is not a quantity, and this page's own closing note
 *  promises "no guaranteed placements and no general AI score", so nothing in
 *  the drawing may be read off as a measurement.
 *
 *  NOT ONE PAGE BUT A SET. "This may involve improving service pages, location
 *  pages, product information, FAQs, comparisons and educational content." Six
 *  kinds of page, so a short stack fans out beside the one under review: two
 *  sheets showing only the band their neighbour does not cover, at two
 *  different heights, and a front sheet with three question pills of its own,
 *  the same mark the page under review uses. The work is one kind of work,
 *  repeated across pages of different shapes.
 *
 *  THE STACK TWINKLES, THE SUBJECT DOES NOT. .ci-twinkle is the house mark for
 *  peers in a category, none of them the subject, which is exactly what the
 *  other page types are while this one is being read. It is carried by the
 *  marks inside the sheets, never by their outlines, so no line that carries
 *  meaning ever dims out of view.
 *
 *  THREE LABELS, ALL THE DOCUMENT'S, in the order the drawing reads down the
 *  page. They are HTML, not SVG text, because text inside a viewBox scales with
 *  the box and drops below the 11px floor on a phone.
 *
 *  INKED IN ASH, NOT LINE. On the dark chapter --color-line is #2e2e2e against
 *  #101010, which is 1.4:1 and does not appear at all. */

/** The answer, set as three lines of type rather than one slab. */
const ANSWER_LINES = [344, 304, 218];

/** The three fields of detail under the answer, and the uprights that tie them
 *  to it. Equal uprights, equal bars: no length here is a measurement. */
const DETAIL_X = [44, 196, 348];
const STRUT_X = [98, 250, 402];

/** The two sheets behind the front one. Each is drawn only where its
 *  neighbour does not cover it, so the stack needs no opaque fill to occlude
 *  what sits underneath: an open path, closed on three sides. Different tops
 *  and different bottoms, because these are pages of different lengths. */
const STACK = [
  { x: 552, y: 58, bottom: 268, next: 606 },
  { x: 606, y: 42, bottom: 288, next: 660 },
];

/** The front sheet of the stack: a page of questions and their answers, which
 *  is what the copy calls FAQs. Each pill is followed by its lines. */
const FAQ = [
  { y: 88, lines: [124, 138] },
  { y: 162, lines: [198, 212] },
  { y: 236, lines: [272] },
];

export function ContentDrawing() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 900 340"
        className="w-full"
        role="img"
        aria-label="A web page with a question at the top, the answer set out directly beneath it and the details that support it below, beside a short stack of the other kinds of page."
      >
        {/* ================================================== the page ======
            The one under review. "We review whether your website gives clear
            answers to the questions people ask about your business." */}
        <rect
          x="16"
          y="16"
          width="484"
          height="308"
          rx="14"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.55"
          strokeWidth="1.6"
        />

        {/* The top of the page: a mark, and the rule under it. */}
        <rect x="44" y="42" width="32" height="12" rx="3" fill="var(--color-ash)" fillOpacity="0.7" />
        <line
          x1="44"
          y1="72"
          x2="456"
          y2="72"
          stroke="var(--color-ash)"
          strokeOpacity="0.28"
          strokeWidth="1"
        />

        {/* ------------------------------------------------- the question --
            A pill, which is the mark this page already uses for a question
            being put to a system. It sits at the top because that is where the
            reader's question arrives. */}
        <rect
          x="44"
          y="90"
          width="412"
          height="34"
          rx="17"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.6"
          strokeWidth="1.4"
        />
        <circle cx="66" cy="107" r="4.5" fill="var(--color-ash)" fillOpacity="0.7" />
        <rect x="82" y="103" width="232" height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.5" />
        <rect x="326" y="103" width="58" height="8" rx="4" fill="var(--color-ash)" fillOpacity="0.32" />

        {/* --------------------------------------------------- the answer --
            Directly beneath the question, the full width of the measure, and
            the only brand-red thing in the box. The rule stands inside the
            block with the lines indented off it, which is what "clearly set"
            looks like in print. Laid on the block's own border, which is where
            it started, it read as nothing but a slightly thicker left edge. */}
        <rect
          x="44"
          y="140"
          width="412"
          height="86"
          rx="9"
          fill="var(--color-brand)"
          fillOpacity="0.1"
          stroke="var(--color-brand)"
          strokeWidth="1.7"
        />
        <rect x="64" y="158" width="4" height="54" rx="2" fill="var(--color-brand)" />
        {ANSWER_LINES.map((w, i) => (
          <rect
            key={w}
            x="82"
            y={160 + i * 20}
            width={w}
            height="10"
            rx="5"
            fill="var(--color-brand)"
            fillOpacity={0.92 - i * 0.15}
          />
        ))}

        {/* ------------------------------------- the details that hold it --
            "be supported by accurate details". The uprights draw upward, from
            the detail into the block it supports, and they are the same length
            as each other so none of them reads as a bigger contribution than
            its neighbours. Stroke widths are in viewBox units because .ci-draw
            sets vector-effect: none on purpose. */}
        {STRUT_X.map((x, i) => (
          <path
            key={x}
            d={`M ${x} 252 V 230`}
            pathLength="100"
            fill="none"
            stroke="var(--color-ash)"
            strokeOpacity="0.6"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="ci-draw"
            style={{ animationDuration: "5s", animationDelay: `${i * 420}ms` }}
          />
        ))}
        {DETAIL_X.map((x) => (
          <g key={x}>
            <rect x={x} y="256" width="58" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.45" />
            <rect x={x} y="270" width="108" height="10" rx="5" fill="var(--color-ash)" fillOpacity="0.72" />
          </g>
        ))}

        {/* The foot of the page. */}
        <rect x="44" y="300" width="134" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.3" />

        {/* ============================================== the other pages ===
            "service pages, location pages, product information, FAQs,
            comparisons and educational content". A short stack, fanned so the
            two behind show the band the front one does not cover. */}
        {STACK.map((s, i) => (
          <g key={s.x}>
            <path
              d={`M ${s.next} ${s.y} H ${s.x + 8} Q ${s.x} ${s.y} ${s.x} ${s.y + 8} V ${s.bottom - 8} Q ${s.x} ${s.bottom} ${s.x + 8} ${s.bottom} H ${s.next}`}
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity="0.5"
              strokeWidth="1.4"
            />
            {/* Only the marks twinkle. The outlines stay put, because a line
                carrying meaning on this chapter must not fade out of sight. */}
            <g className="ci-twinkle" opacity="0.55" style={{ animationDelay: `${i * 460}ms` }}>
              <rect
                x={s.x + 14}
                y={s.y + 22}
                width="30"
                height="7"
                rx="3.5"
                fill="var(--color-ash)"
                fillOpacity="0.85"
              />
              <rect
                x={s.x + 14}
                y={s.y + 40}
                width="22"
                height="5"
                rx="2.5"
                fill="var(--color-ash)"
                fillOpacity="0.55"
              />
            </g>
          </g>
        ))}

        {/* The front of the stack: a page of questions and answers, drawn with
            the same pill the page under review uses, so a reader sees the same
            work repeated on a page of a different shape. */}
        <rect
          x="660"
          y="30"
          width="224"
          height="272"
          rx="12"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.62"
          strokeWidth="1.5"
        />
        <rect x="684" y="58" width="140" height="10" rx="5" fill="var(--color-ash)" fillOpacity="0.7" />
        {FAQ.map((b) => (
          <g key={b.y}>
            <rect
              x="684"
              y={b.y}
              width="176"
              height="24"
              rx="12"
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity="0.5"
              strokeWidth="1.2"
            />
            {b.lines.map((y, i) => (
              <rect
                key={y}
                x="684"
                y={y}
                width={i === 0 ? 172 : 130}
                height="6"
                rx="3"
                fill="var(--color-ash)"
                fillOpacity="0.35"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* The three parts of the page, in the order the drawing reads down it.
          HTML at the 11px floor, so they hold at every width instead of
          scaling with the viewBox.

          Each label is taken verbatim from the service's own body, and the
          sentence it came from is quoted here beside it.

          "the questions people ask" is from "We review whether your website
          gives clear answers to the questions people ask about your business."
          "clear answers" is from that same sentence: "gives clear answers to".
          "supported by accurate details" is from "Important information should
          appear clearly on the page and be supported by accurate details." */}
      <figcaption className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        {["the questions people ask", "clear answers", "supported by accurate details"].map((t) => (
          <span
            key={t}
            className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash"
          >
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {t}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

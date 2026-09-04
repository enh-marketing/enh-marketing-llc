"use client";

/** A page and the markup that describes it, tied entry by entry.
 *
 *  WHY THIS DRAWING. Service 05 makes one claim that a picture can carry and
 *  prose cannot: "The markup must match the information people can see on the
 *  page." A match needs two things and a correspondence between them, so the
 *  drawing is exactly that. The page sits on the left inside a frame, because
 *  it is a page. The markup sits on the right as an indented bracket with
 *  paired keys and values, because it is markup and not more page content.
 *  Between them, one tie per row, drawn at the same height on both sides so
 *  the match is read by alignment before anything moves.
 *
 *  WHAT THE SIX ROWS ARE. The document names them: "We implement relevant
 *  schema markup for areas such as your organisation, services, locations,
 *  products, people and articles." Each is drawn as the thing it actually is
 *  rather than as a sixth identical box. The organisation is a mark and a name
 *  in the page header. The services are a bulleted list. The location is a pin
 *  and an address. The product is an image tile with a caption. The person is
 *  an avatar and a byline. The article is a headline over body copy. A reader
 *  can say what each one is without being taught a notation.
 *
 *  WHY THE MARKUP NESTS. Two of the entries carry indented children, so the
 *  right half reads as a structure rather than a second column of bars. That
 *  is the whole reason the markup layer is drawn as a bracket with indent
 *  guides: the first sentence says structured data "gives search engines clear
 *  information about the content and organisations shown on a page", and
 *  information given in a structure is what separates it from the copy above.
 *
 *  WHAT IS DELIBERATELY ABSENT. No special layer, no privileged entry, no
 *  guarantee arrow into an answer. The document closes that door itself:
 *  "There is no special AI schema that guarantees inclusion in an AI-generated
 *  answer." Nothing here is scored, counted or ranked either, which the page's
 *  own promise of "no counts, no scores" requires.
 *
 *  THREE LABELS, ALL THE DOCUMENT'S, ALL HTML. Text inside a viewBox scales
 *  with the box and drops below the 11px floor on a phone, so every word lives
 *  in the figcaption.
 *
 *  INKED IN ASH, NOT LINE. On the dark chapter --color-line is #2e2e2e against
 *  #101010, which is 1.4:1 and does not appear at all. Brand is spent on the
 *  ties alone, because the correspondence is what this drawing is about. */

/** The six rows, shared by both halves so the two sides cannot drift apart.
 *  `y` is the shared baseline: the page item, the tie and the markup entry all
 *  sit on it. `key` is the width of the key bar, `valueTo` the right edge of
 *  its value. The keys differ in length on purpose, because "organisation" and
 *  "people" are not the same word. */
const ENTRIES = [
  { y: 44, key: 104, valueTo: 872 }, // organisation
  { y: 96, key: 74, valueTo: 752 }, // services
  { y: 148, key: 82, valueTo: 744 }, // locations
  { y: 200, key: 78, valueTo: 870 }, // products
  { y: 252, key: 62, valueTo: 782 }, // people
  { y: 304, key: 70, valueTo: 864 }, // articles
];

/** Left edge of every key bar, and the two offsets that build a `key: value`
 *  row out of it. */
const KEY_X = 514;
const tickX = (e: (typeof ENTRIES)[number]) => KEY_X + e.key + 12;
const valueX = (e: (typeof ENTRIES)[number]) => tickX(e) + 12;

/** Which ties carry a travelling packet, and how it is staggered. Four of six,
 *  so the row spacing still reads at rest instead of the whole gutter pulsing
 *  at once. */
const FLOW = [
  { y: 44, duration: "3.2s", delay: "0s" },
  { y: 148, duration: "3.6s", delay: "0.7s" },
  { y: 252, duration: "3.4s", delay: "1.4s" },
  { y: 304, duration: "3.8s", delay: "2.1s" },
];

export function SchemaDrawing() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 900 340"
        className="w-full"
        role="img"
        aria-label="A web page beside its schema markup, with a line joining each visible detail to the markup entry that repeats it."
      >
        {/* =============================================== the page ========
            Framed, because it is a page. Everything inside it is something a
            visitor can actually see: "The markup must match the information
            people can see on the page." */}
        <rect
          x="18"
          y="16"
          width="396"
          height="310"
          rx="14"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.55"
          strokeWidth="1.8"
        />

        {/* Row 1, the organisation: a mark, a name, a navigation. */}
        <rect x="40" y="34" width="20" height="20" rx="6" fill="var(--color-ash)" fillOpacity="0.68" />
        <rect x="68" y="38" width="96" height="11" rx="4" fill="var(--color-ash)" fillOpacity="0.55" />
        <path
          d="M 252 44 H 288 M 302 44 H 338 M 352 44 H 388"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <line x1="40" y1="68" x2="390" y2="68" stroke="var(--color-ash)" strokeOpacity="0.3" strokeWidth="1" />

        {/* Row 2, the services: a list, with bullets, because that is how a
            page shows several of one thing. */}
        <path
          d="M 43 80 h 5 M 43 96 h 5 M 43 112 h 5"
          stroke="var(--color-ash)"
          strokeOpacity="0.55"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 62 80 H 198 M 62 96 H 164 M 62 112 H 214"
          stroke="var(--color-ash)"
          strokeOpacity="0.4"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Row 3, the location: a pin and an address under it. */}
        <path
          d="M 50 133 c -7.2 0 -13 5.6 -13 12.4 c 0 8.6 13 17.6 13 17.6 s 13 -9 13 -17.6 c 0 -6.8 -5.8 -12.4 -13 -12.4 z"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.6"
          strokeWidth="2"
        />
        <rect x="76" y="139" width="124" height="9" rx="4" fill="var(--color-ash)" fillOpacity="0.6" />
        <rect x="76" y="155" width="88" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.34" />

        {/* Row 4, the product: a picture and a caption. */}
        <rect
          x="40"
          y="180"
          width="58"
          height="42"
          rx="7"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.55"
          strokeWidth="1.6"
        />
        <path d="M 45 215 L 59 197 L 69 209 L 77 201 L 93 215 Z" fill="var(--color-ash)" fillOpacity="0.35" />
        <circle cx="84" cy="190" r="4.5" fill="var(--color-ash)" fillOpacity="0.5" />
        <rect x="110" y="186" width="116" height="9" rx="4" fill="var(--color-ash)" fillOpacity="0.6" />
        <rect x="110" y="204" width="80" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.34" />

        {/* Row 5, the person: an avatar and a byline. */}
        <circle cx="54" cy="252" r="14" fill="none" stroke="var(--color-ash)" strokeOpacity="0.6" strokeWidth="2" />
        <rect x="80" y="244" width="104" height="9" rx="4" fill="var(--color-ash)" fillOpacity="0.6" />
        <rect x="80" y="260" width="70" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.34" />

        {/* Row 6, the article: a headline over body copy. */}
        <rect x="40" y="288" width="182" height="10" rx="4" fill="var(--color-ash)" fillOpacity="0.6" />
        <path
          d="M 44 306 H 388 M 44 316 H 330"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* ================================================= the ties =======
            One per row, at the same height on both sides. Solid underneath so
            the match reads at rest and in a screenshot; the packets above only
            confirm which way the obligation runs, from what is visible to what
            is written. Brand is spent here and nowhere else. */}
        <path
          d={ENTRIES.map((e) => `M 418 ${e.y} H 482`).join(" ")}
          stroke="var(--color-brand)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Stroke widths are in viewBox units on purpose: .ci-flow sets
            vector-effect: none, because under non-scaling-stroke Chromium
            measures the dash in screen pixels and the packet repeats itself
            every 114px instead of once per wire. */}
        {FLOW.map((f) => (
          <path
            key={f.y}
            d={`M 418 ${f.y} H 482`}
            pathLength="100"
            stroke="var(--color-brand)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            className="ci-flow"
            style={{ animationDuration: f.duration, animationDelay: f.delay }}
          />
        ))}

        {/* ============================================== the markup ========
            No frame here, a bracket instead: the two layers must not read as
            two pages. */}
        <path
          d="M 502 26 H 486 V 322 H 502"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="514" y="22" width="88" height="9" rx="4" fill="var(--color-ash)" fillOpacity="0.5" />

        {/* The keys, one per visible row, at six different lengths. */}
        {ENTRIES.map((e) => (
          <rect
            key={e.y}
            x={KEY_X}
            y={e.y - 5}
            width={e.key}
            height="10"
            rx="4"
            fill="var(--color-ash)"
            fillOpacity="0.68"
          />
        ))}

        {/* The separator between each key and its value, then the values. */}
        <path
          d={ENTRIES.map((e) => `M ${tickX(e)} ${e.y - 5} V ${e.y + 5}`).join(" ")}
          stroke="var(--color-ash)"
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={ENTRIES.map((e) => `M ${valueX(e)} ${e.y} H ${e.valueTo}`).join(" ")}
          stroke="var(--color-ash)"
          strokeOpacity="0.32"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />

        {/* Two entries carry children, indented one level further. The services
            entry holds several offerings; the locations entry holds the parts
            of an address. This is what stops the right half reading as a
            second column of page copy. */}
        <path
          d="M 530 104 V 132 M 530 116 H 542 M 530 132 H 542"
          stroke="var(--color-ash)"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 550 116 H 664 M 550 132 H 622"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 530 156 V 184 M 530 170 H 542 M 530 184 H 542"
          stroke="var(--color-ash)"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 550 170 H 646 M 550 184 H 608"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Three labels, each a phrase from service 05's own body copy.
          "the information people can see on the page" and "The markup must
          match" are both from: "The markup must match the information people
          can see on the page."
          "relevant schema markup" is from: "We implement relevant schema
          markup for areas such as your organisation, services, locations,
          products, people and articles." */}
      <figcaption className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        <span className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          the information people can see on the page
        </span>
        <span className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          relevant schema markup
        </span>
        <span className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          The markup must match
        </span>
      </figcaption>
    </figure>
  );
}

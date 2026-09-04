"use client";

/** What an AI answer can draw on once it looks past your own site: five kinds
 *  of public record, each one sending a reference inward to the brand.
 *
 *  WHY THIS DRAWING FOR THIS COPY. The service opens with a claim about where
 *  information comes from, "AI-generated answers may use information from
 *  sources beyond your website", and closes its working sentence with a
 *  position: "The aim is to build accurate and credible information around the
 *  brand." Around is a place, not a metaphor, so the brand sits in the middle,
 *  the sources sit outside it and the references run in. A reader who follows
 *  one line from a newspaper to a name plate has the sentence without being
 *  taught a notation, which is the test the approved pages pass.
 *
 *  FIVE SOURCES, FIVE DIFFERENT SHAPES. The document lists "business listings,
 *  reviews, partner websites, industry publications, news coverage and other
 *  public sources". Those are not five of the same thing, so they are not five
 *  of the same box. A listing is a map pin over a name and an address. A review
 *  is a person and a quotation. A partner website is a browser window with two
 *  organisations named on one page. An industry publication is a centred
 *  masthead over two columns.
 *  News coverage is a headline, a dateline and a photograph. Each one is
 *  nameable on sight.
 *
 *  NO RATING, ANYWHERE. The review record is a quotation and a reader, never a
 *  star row, a score or a count. The page's own closing note promises "no
 *  guaranteed placements and no general AI score", and a row of stars is a
 *  score with a different typeface.
 *
 *  THE REFUSAL IS HONOURED BY OMISSION. "We do not create false reviews,
 *  manufactured mentions or paid links presented as independent coverage." So
 *  nothing here is duplicated to look like volume, no record stands without a
 *  publisher behind it, and no reference line is drawn heavier than its
 *  neighbours to imply a channel somebody paid for. Five real kinds of source,
 *  five equal references. Drawing a crossed-out fake would have put a
 *  manufactured signal on the page for the sake of disowning it.
 *
 *  AND NOT A CHAIN. The partner record used to be identified by a chain-link
 *  glyph. On a record that then sends a line into the brand, a chain reads as
 *  a backlink pointing at the brand, which is the picture of the exact thing
 *  this sentence refuses, whatever the icon means anywhere else. Two
 *  organisations named on one page says partner without drawing a link.
 *
 *  BRAND FOR THE SUBJECT, ASH FOR THE CONTEXT. Only the brand plate and the
 *  five references carry the brand red, because they are what the sentence is
 *  about. Everything else is ash: on this dark chapter the hairline token sits
 *  at about 1.4:1 against the page and does not appear at all.
 *
 *  TEXT IS HTML. Every word is in the figcaption, because text inside a viewBox
 *  scales with the box and lands under the 11px floor on a phone. */

/** The three labels, verbatim from this service's own body copy, and in the
 *  order the drawing reads: outside, inward, centre.
 *
 *  "sources beyond your website"
 *      from "AI-generated answers may use information from sources beyond your
 *      website."
 *  "accurate and credible information" and "around the brand"
 *      both from "The aim is to build accurate and credible information around
 *      the brand." */
const LABELS = [
  "sources beyond your website",
  "accurate and credible information",
  "around the brand",
];

/** One reference per source, drawn from the record's own edge to the ring
 *  around the brand. Written source-first because .ci-flow walks its packet
 *  from the start of the path to its end, and the copy has the information
 *  arriving at the brand rather than leaving it. */
const REFERENCES = [
  { id: "listing", d: "M 244 110 L 395 161", dur: "3.4s", delay: "0s" },
  { id: "partner", d: "M 450 78 L 450 122", dur: "2.6s", delay: "0.7s" },
  { id: "publication", d: "M 656 117 L 506 163", dur: "3.4s", delay: "1.4s" },
  { id: "review", d: "M 312 240 L 397 203", dur: "3s", delay: "2.1s" },
  { id: "news", d: "M 588 240 L 503 203", dur: "3s", delay: "2.8s" },
];

export function OffsiteDrawing() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 900 340"
        className="w-full"
        role="img"
        aria-label="A business listing, a review, a partner website, an industry publication and a news story sit around the brand, and each one sends a reference in towards it."
      >
        {/* ------------------------------------------- business listings --
            "We review relevant business listings ...": a directory entry, so a
            map pin over the name and the address it carries. */}
        <rect
          x="14"
          y="24"
          width="230"
          height="96"
          rx="12"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        <path
          d="M 54 88 L 44.8 71.2 A 13 13 0 1 1 63.2 71.2 Z"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="54" cy="62" r="4.5" fill="var(--color-ash)" fillOpacity="0.8" />
        <rect x="88" y="54" width="126" height="10" rx="5" fill="var(--color-ash)" fillOpacity="0.62" />
        <path
          d="M 88 76 h 126 M 88 88 h 88"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* --------------------------------------------- partner websites --
            "... partner websites ...": somebody else's site, with this business
            named on it. A window, its address bar, then two marks side by side,
            their organisation and the one they name, over the copy carrying the
            mention. Two parties on one page is what makes it a partner's site
            rather than any site, and it is a mention rather than a link. */}
        <rect
          x="296"
          y="14"
          width="308"
          height="64"
          rx="10"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        <line x1="296" y1="42" x2="604" y2="42" stroke="var(--color-ash)" strokeOpacity="0.3" strokeWidth="1" />
        <rect x="312" y="22" width="188" height="11" rx="5.5" fill="var(--color-ash)" fillOpacity="0.28" />
        <rect
          x="312"
          y="51"
          width="20"
          height="20"
          rx="6"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.7"
          strokeWidth="1.8"
        />
        <rect x="340" y="51" width="20" height="20" rx="6" fill="var(--color-ash)" fillOpacity="0.6" />
        <path
          d="M 380 55 h 192 M 380 67 h 128"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* --------------------------------------- industry publications --
            "... industry publications ...": a journal page. A centred masthead
            over a rule, then two columns of type. Deliberately unlike the news
            sheet below it, which is a headline and a picture. */}
        <rect
          x="656"
          y="24"
          width="230"
          height="118"
          rx="10"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        <rect x="722" y="44" width="98" height="12" rx="3" fill="var(--color-ash)" fillOpacity="0.7" />
        <line x1="678" y1="66" x2="864" y2="66" stroke="var(--color-ash)" strokeOpacity="0.45" strokeWidth="1.4" />
        <path
          d="M 678 80 h 82 M 678 92 h 82 M 678 104 h 82 M 678 116 h 54"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 782 80 h 82 M 782 92 h 82 M 782 104 h 60 M 782 116 h 82"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* ------------------------------------------------------ reviews --
            "... reviews ...": a reader and what they wrote. A quotation mark
            and three lines of it, and no rating of any kind, because the page
            promises "no counts, no scores". */}
        <rect
          x="14"
          y="212"
          width="298"
          height="108"
          rx="12"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        <circle cx="54" cy="248" r="16" fill="var(--color-ash)" fillOpacity="0.45" />
        <path
          d="M 96 234 h 13 v 10 c 0 5 -3 8 -8 9 l -1.5 -4.5 c 2.5 -1 3.5 -2.5 3.5 -4.5 h -7 z M 114 234 h 13 v 10 c 0 5 -3 8 -8 9 l -1.5 -4.5 c 2.5 -1 3.5 -2.5 3.5 -4.5 h -7 z"
          fill="var(--color-ash)"
          fillOpacity="0.7"
        />
        <path
          d="M 96 268 h 186 M 96 282 h 152 M 96 296 h 104"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.32"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* ------------------------------------------------ news coverage --
            "... news coverage ...": a full-width headline, a dateline under it,
            a photograph and one column of copy. */}
        <rect
          x="588"
          y="212"
          width="298"
          height="108"
          rx="10"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />
        <rect x="612" y="232" width="250" height="15" rx="3" fill="var(--color-ash)" fillOpacity="0.72" />
        <line x1="612" y1="260" x2="724" y2="260" stroke="var(--color-ash)" strokeOpacity="0.42" strokeWidth="2" />
        <rect
          x="612"
          y="272"
          width="96"
          height="32"
          rx="4"
          fill="var(--color-ash)"
          fillOpacity="0.26"
          stroke="var(--color-ash)"
          strokeOpacity="0.42"
          strokeWidth="1.2"
        />
        <path
          d="M 728 276 h 134 M 728 288 h 134 M 728 300 h 92"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.3"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* ------------------------------------------------- the brand ---
            "The aim is to build accurate and credible information around the
            brand." The ring is the around: everything the five records send in
            lands on it. Inside it, the brand itself, and nothing more, because
            this service does not touch your own site. */}
        <circle
          cx="450"
          cy="180"
          r="58"
          fill="var(--color-brand)"
          fillOpacity="0.06"
          stroke="var(--color-brand)"
          strokeWidth="1.8"
        />
        <rect
          x="410"
          y="164"
          width="80"
          height="32"
          rx="9"
          fill="var(--color-brand)"
          fillOpacity="0.16"
          stroke="var(--color-brand)"
          strokeWidth="1.3"
        />
        <rect x="420" y="172" width="16" height="16" rx="5" fill="var(--color-brand)" />
        <rect x="444" y="176" width="34" height="8" rx="4" fill="var(--color-brand)" fillOpacity="0.85" />

        {/* --------------------------------------------- the references --
            Five, one per source, all the same weight. A solid line underneath
            so the picture reads at rest, in a screenshot and under reduced
            motion, with the packet travelling over it. Stroke widths are in
            viewBox units because .ci-flow sets vector-effect: none: under
            non-scaling-stroke Chromium measures the dash in screen pixels and
            the packet repeats every 114px instead of once per path. */}
        {REFERENCES.map((ref) => (
          <g key={ref.id}>
            <path
              d={ref.d}
              fill="none"
              stroke="var(--color-brand)"
              strokeOpacity="0.4"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d={ref.d}
              pathLength="100"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="ci-flow"
              style={{ animationDuration: ref.dur, animationDelay: ref.delay }}
            />
          </g>
        ))}
      </svg>

      {/* The document's own words, at the 11px floor, in the order the drawing
          reads: the records outside, what runs in, and where it lands. */}
      <figcaption className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        {LABELS.map((label) => (
          <span
            key={label}
            className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash"
          >
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            {label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

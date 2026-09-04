"use client";

/** A search crawler arriving from outside, and the named controls it meets on
 *  the way in. One route reaches a page. One route is stopped.
 *
 *  WHY THIS DRAWING. Service 02 opens with a condition, not a benefit: "AI
 *  search systems cannot use a page if their search crawler cannot reach or
 *  process it." That sentence is a journey with a failure mode in it, so the
 *  drawing is the journey. The crawler sits outside the site, left of a dashed
 *  edge, because it is not yours and it has to be let in. Everything to the
 *  right of that edge is a control you own.
 *
 *  THE FOUR CONTROLS ARE FOUR DIFFERENT OBJECTS. The document lists them in one
 *  breath: "We review indexing, crawler access, robots.txt rules, noindex
 *  settings, canonical tags, sitemaps and other technical controls." Four
 *  identical rectangles would have made that list unreadable, so each is drawn
 *  as the thing it actually is:
 *
 *    robots.txt   a text file, dog-eared sheet, a name and two rule lines, and
 *                 it is the first thing fetched because it is the first thing
 *                 a crawler asks for.
 *    sitemap      a wide card of indented entries, one top level and two
 *                 under it, because an indent is the sign everybody already
 *                 reads as an outline. Both routes leave from those entries,
 *                 so the pages on the right are the sitemap's own listing.
 *    canonical    two near-copies of one page with a pointer from the copy to
 *                 the address that counts. That is the whole job of the tag,
 *                 and it needs two cards to be shown at all.
 *    noindex      a page carrying a label with a line struck through it. The
 *                 route to it stops short at a cross.
 *
 *  ONE ROUTE THROUGH, ONE STOPPED. The closing sentence is a rule about who
 *  gets in: "Only public pages that you want people and search systems to find
 *  should be made accessible." A drawing that showed only the happy path would
 *  contradict it. So the upper branch runs, and the packet runs on it; the
 *  lower branch ends at a cross before a page that says do not list me. Brand
 *  is reserved for exactly that decision, the crawler and its route on one side
 *  and the stop on the other. Every control in between is ash, because a
 *  control is not an outcome.
 *
 *  THREE LABELS, ALL THE DOCUMENT'S. They read left to right across the
 *  picture: who is arriving, what it meets, what is on the other side.
 *    "search crawler"     from "AI search systems cannot use a page if their
 *                         search crawler cannot reach or process it."
 *    "technical controls" from "... canonical tags, sitemaps and other
 *                         technical controls."
 *    "public pages"       from "Only public pages that you want people and
 *                         search systems to find should be made accessible."
 *  They are HTML, not SVG text, because text inside a viewBox scales with the
 *  box and drops below the 11px floor on a phone.
 *
 *  INKED IN ASH, NOT LINE. On the dark chapter --color-line is #2e2e2e against
 *  #101010, which is 1.4:1 and does not appear at all.
 *
 *  Stroke widths on the flow paths are in viewBox units on purpose: .ci-flow
 *  sets vector-effect: none, because under non-scaling-stroke Chromium measures
 *  the dash in screen pixels and a long path renders as a dash, a gap and a
 *  stub. Both flow paths carry a solid line underneath, so the route reads at
 *  rest, with no motion, and in a screenshot. */
export function AccessDrawing() {
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 900 340"
        className="w-full"
        role="img"
        aria-label="A search crawler outside a website reads its robots.txt file and its sitemap, follows one route through to a public page, and is stopped on the other route at a page marked noindex."
      >
        {/* ----------------------------------------------- the crawler ------
            Outside your site, asking to come in. A body, a lens and two
            request arcs reaching toward the edge. */}
        <rect
          x="14"
          y="140"
          width="64"
          height="60"
          rx="14"
          fill="var(--color-brand)"
          fillOpacity="0.07"
          stroke="var(--color-brand)"
          strokeWidth="1.8"
        />
        <circle
          cx="46"
          cy="170"
          r="12"
          fill="var(--color-brand)"
          fillOpacity="0.18"
          stroke="var(--color-brand)"
          strokeWidth="1.8"
        />
        <g className="ci-twinkle" style={{ animationDuration: "3.4s" }}>
          <path
            d="M 88 148 A 26 26 0 0 1 88 192"
            fill="none"
            stroke="var(--color-brand)"
            strokeOpacity="0.7"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M 96 132 A 40 40 0 0 1 96 208"
            fill="none"
            stroke="var(--color-brand)"
            strokeOpacity="0.4"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>

        {/* ------------------------------------------------- the edge -------
            Left of this line is not yours. Right of it is every control the
            document names. */}
        <line
          x1="132"
          y1="22"
          x2="132"
          y2="318"
          stroke="var(--color-ash)"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* The request crossing the edge. */}
        <path
          d="M 128 170 H 186"
          fill="none"
          stroke="var(--color-brand)"
          strokeOpacity="0.45"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 128 170 H 186"
          pathLength="100"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="ci-flow"
          style={{ animationDuration: "2.6s" }}
        />

        {/* ----------------------------------------------- robots.txt -------
            A text file, because that is what it is: an upright sheet with a
            folded corner, a filename and two rules set flush left. It stands
            first on the route because it is the first thing a crawler asks
            for. Upright and dog-eared so it cannot be confused with the
            sitemap next to it, which is a wide card of indented entries. */}
        <path
          d="M 186 114 H 266 L 296 144 V 226 H 186 Z"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.7"
          strokeWidth="1.6"
        />
        <path
          d="M 266 114 V 144 H 296"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.7"
          strokeWidth="1.6"
        />
        <rect x="204" y="136" width="50" height="10" rx="4" fill="var(--color-ash)" fillOpacity="0.7" />
        <rect x="204" y="168" width="72" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.5" />
        <rect x="204" y="190" width="54" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.4" />
        {/* The rules being read. Its finished state is gone, which is why the
            file reads perfectly without it. */}
        <rect
          x="194"
          y="126"
          width="94"
          height="2.5"
          fill="var(--color-brand)"
          className="ci-scan-y"
          style={{ animationDuration: "3.2s" }}
        />

        {/* On from the rules to the index. */}
        <path
          d="M 296 170 H 340"
          fill="none"
          stroke="var(--color-brand)"
          strokeOpacity="0.4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* -------------------------------------------------- sitemap -------
            A wide card of indented entries: a site listing its own pages, one
            top level and two under it. The indent is the whole difference
            between this and the upright file beside it, and an indent is a
            sign anybody reads as an outline without being taught it. The two
            routes leave from the two indented entries, so the pages on the
            right are those entries rather than separate furniture. */}
        <rect
          x="340"
          y="132"
          width="112"
          height="76"
          rx="9"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.65"
          strokeWidth="1.5"
        />
        <rect x="356" y="146" width="70" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.6" />
        <rect x="374" y="166" width="52" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.45" />
        <rect x="374" y="186" width="60" height="7" rx="3.5" fill="var(--color-ash)" fillOpacity="0.45" />

        {/* The entry whose route will not be finished. */}
        <path
          d="M 452 189 H 470 V 258 H 512"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.5"
          strokeWidth="2"
        />

        {/* The entry whose route is. The packet travels this one. */}
        <path
          d="M 452 169 H 490 V 88 H 566"
          fill="none"
          stroke="var(--color-brand)"
          strokeOpacity="0.45"
          strokeWidth="2.5"
        />
        <path
          d="M 452 169 H 490 V 88 H 566"
          pathLength="100"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="ci-flow"
          style={{ animationDuration: "3.2s", animationDelay: "0.5s" }}
        />

        {/* ---------------------------------------------- canonical tag -----
            Two near-copies of one page, and a pointer from the copy to the
            address that counts. Drawn as a pair because a canonical tag has
            nothing to say about a single page. */}
        <rect
          x="566"
          y="50"
          width="118"
          height="76"
          rx="10"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
        <rect x="584" y="68" width="48" height="8" rx="3" fill="var(--color-ash)" fillOpacity="0.5" />
        <rect x="584" y="92" width="80" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.3" />

        <path
          d="M 692 88 H 726"
          fill="none"
          stroke="var(--color-brand)"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 720 82 L 728 88 L 720 94"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* The page that gets through. */}
        <rect
          x="736"
          y="40"
          width="112"
          height="96"
          rx="11"
          fill="var(--color-brand)"
          fillOpacity="0.07"
          stroke="var(--color-brand)"
          strokeWidth="1.8"
        />
        <rect x="756" y="62" width="56" height="10" rx="4" fill="var(--color-brand)" fillOpacity="0.9" />
        <rect x="756" y="90" width="76" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.38" />
        <rect x="756" y="108" width="60" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.38" />
        {/* A tick, not a score. The document states the binary in words:
            accessible, or not. */}
        <path
          d="M 864 88 L 870 96 L 882 78"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ------------------------------------------------- noindex --------
            The route stops here, and the page beyond it says why: a label with
            a line struck through it. */}
        <path
          d="M 516 250 L 532 266"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M 532 250 L 516 266"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <rect
          x="566"
          y="214"
          width="282"
          height="88"
          rx="10"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.55"
          strokeWidth="1.4"
        />
        <rect x="586" y="232" width="52" height="8" rx="3" fill="var(--color-ash)" fillOpacity="0.4" />
        <rect x="586" y="256" width="142" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.3" />
        <rect x="586" y="274" width="118" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.3" />
        <path
          d="M 750 242 H 812 L 828 258 L 812 274 H 750 Z"
          fill="none"
          stroke="var(--color-ash)"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        {/* Struck through, and the strike overruns the label at both ends so it
            reads as a strike rather than as another edge of the shape. */}
        <path
          d="M 742 276 L 834 240"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>

      {/* Left to right across the picture: who is arriving, what it meets,
          what is on the other side. Each phrase is the document's own. */}
      <figcaption className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
        {/* "AI search systems cannot use a page if their search crawler cannot
            reach or process it." */}
        <span className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          search crawler
        </span>
        {/* "We review indexing, crawler access, robots.txt rules, noindex
            settings, canonical tags, sitemaps and other technical controls." */}
        <span className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          technical controls
        </span>
        {/* "Only public pages that you want people and search systems to find
            should be made accessible." */}
        <span className="font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          public pages
        </span>
      </figcaption>
    </figure>
  );
}

"use client";

import { cn } from "@/lib/cn";
import type { ServiceReach } from "@/content/services/ai-search-visibility";

/** Where the selected service does its work: on your own site, out on the
 *  wider web, or across both.
 *
 *  ONE QUESTION, AND THE ANSWER IS A PLACE. The section's earlier drawings
 *  tried to depict the whole system — questions, platforms, gates, a page, its
 *  markup, its off-site sources — in about ten unlabelled rectangles each, and
 *  answered no question a reader could name. This answers exactly one, and it
 *  answers it with position rather than notation: the work lands inside the
 *  frame, outside it, or across both. That is the trick the approved AI
 *  Automation page runs with PERSON and MACHINE, which nobody has to be taught.
 *
 *  A SECOND AXIS, NOT A REPEAT. The index beside it sorts the seven by which of
 *  find, understand and reference they work on. This says whose property the
 *  work happens on. 03, 04 and 05 share a bay and read page, both, page, so the
 *  drawing moves within a bay rather than standing still across three
 *  consecutive selections.
 *
 *  DRAW THE SUBJECT. The left half is a page, with the things a page has: a
 *  header, a heading, copy, two blocks of detail, a footer. The right half is
 *  the listings, reviews, partner sites and coverage the document names, drawn
 *  as separate records at separate sizes, because they are not a tidy grid and
 *  they are not yours. Neither half is a symbol of itself.
 *
 *  TWO LABELS, BOTH THE DOCUMENT'S. "on the page" is from 05, "beyond your
 *  website" from 06. They are HTML, not SVG text, because text inside a viewBox
 *  scales with the box and drops below the 11px floor on a phone.
 *
 *  INKED IN ASH, NOT LINE. On the dark chapter --color-line is #2e2e2e against
 *  #101010, which is 1.4:1 and does not appear at all. */

/** The records out on the wider web. Uneven on purpose. */
const SOURCES = [
  { x: 512, y: 34, w: 196, h: 74, lines: 2 },
  { x: 724, y: 34, w: 152, h: 74, lines: 1 },
  { x: 512, y: 126, w: 148, h: 68, lines: 1 },
  { x: 676, y: 126, w: 200, h: 68, lines: 2 },
  { x: 512, y: 212, w: 232, h: 78, lines: 2 },
  { x: 760, y: 212, w: 116, h: 78, lines: 1 },
];

/** Where the ties cross, when a service works on both sides. */
const TIES = [88, 162, 244];

export function VisibilityReach({
  reach,
  territories,
}: {
  reach: ServiceReach;
  territories: [string, string];
}) {
  const onPage = reach === "page" || reach === "both";
  const beyond = reach === "beyond" || reach === "both";
  const across = reach === "both";

  const live = (on: boolean) => (on ? "var(--color-brand)" : "var(--color-ash)");

  /* Stroke widths are in viewBox units on purpose: .ci-flow sets
     vector-effect: none, because under non-scaling-stroke Chromium measures the
     dash in screen pixels and any path over 100px renders as a dash, a gap and
     a stub. */
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 900 324"
        className="w-full"
        role="img"
        aria-label={
          across
            ? "This work happens both on your own website and on sources beyond it."
            : onPage
              ? "This work happens on your own website."
              : "This work happens on sources beyond your website."
        }
      >
        {/* ------------------------------------------------- your own site --
            A page, with the things a page has. */}
        <g
          className={cn(
            "transition-opacity duration-500 motion-reduce:transition-none",
            onPage ? "opacity-100" : "opacity-40",
          )}
        >
          <rect
            x="14"
            y="24"
            width="404"
            height="276"
            rx="14"
            fill={onPage ? "var(--color-brand)" : "none"}
            fillOpacity={onPage ? 0.06 : 0}
            stroke={live(onPage)}
            strokeWidth="1.8"
            className="transition-colors duration-500 motion-reduce:transition-none"
          />

          {/* The header: a mark and its navigation. */}
          <rect x="40" y="50" width="34" height="12" rx="3" fill={live(onPage)} fillOpacity="0.85" />
          {[96, 146, 196].map((x) => (
            <rect
              key={x}
              x={x}
              y="53"
              width="38"
              height="6"
              rx="3"
              fill="var(--color-ash)"
              fillOpacity="0.45"
            />
          ))}
          <line
            x1="40"
            y1="78"
            x2="392"
            y2="78"
            stroke="var(--color-ash)"
            strokeOpacity="0.28"
            strokeWidth="1"
          />

          {/* The heading, then the copy under it. */}
          <rect
            x="40"
            y="98"
            width="212"
            height="16"
            rx="4"
            fill={live(onPage)}
            fillOpacity={onPage ? 0.9 : 0.55}
            className="transition-all duration-500 motion-reduce:transition-none"
          />
          {[
            [130, 352],
            [144, 320],
            [158, 286],
          ].map(([y, w]) => (
            <rect
              key={y}
              x="40"
              y={y}
              width={w}
              height="6"
              rx="3"
              fill="var(--color-ash)"
              fillOpacity="0.4"
            />
          ))}

          {/* Two blocks of detail. */}
          {[40, 220].map((x) => (
            <g key={x}>
              <rect
                x={x}
                y="186"
                width="172"
                height="62"
                rx="8"
                fill="var(--color-ash)"
                fillOpacity="0.12"
                stroke="var(--color-ash)"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <rect
                x={x + 16}
                y="204"
                width="82"
                height="7"
                rx="3"
                fill="var(--color-ash)"
                fillOpacity="0.5"
              />
              <rect
                x={x + 16}
                y="220"
                width="126"
                height="5"
                rx="2.5"
                fill="var(--color-ash)"
                fillOpacity="0.3"
              />
            </g>
          ))}

          {/* The foot of the page. */}
          <rect x="40" y="268" width="146" height="6" rx="3" fill="var(--color-ash)" fillOpacity="0.28" />
        </g>

        {/* ---------------------------------------------------- the divide --
            The one thing a reader has to read as a boundary, and the two
            captions underneath name both of its sides in words. */}
        <line
          x1="466"
          y1="10"
          x2="466"
          y2="314"
          stroke="var(--color-ash)"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* ----------------------------------------- sources beyond it ------
            Listings, reviews, partner websites, industry publications and news
            coverage: separate records, separate sizes, none of them yours. */}
        <g
          className={cn(
            "transition-opacity duration-500 motion-reduce:transition-none",
            beyond ? "opacity-100" : "opacity-40",
          )}
        >
          {SOURCES.map((r, i) => (
            <g key={i}>
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx="9"
                fill={beyond ? "var(--color-brand)" : "none"}
                fillOpacity={beyond ? 0.06 : 0}
                stroke={live(beyond)}
                strokeOpacity={beyond ? 0.8 : 0.5}
                strokeWidth="1.4"
                className="transition-colors duration-500 motion-reduce:transition-none"
              />
              <rect
                x={r.x + 16}
                y={r.y + 18}
                width={Math.min(r.w - 32, 84)}
                height="7"
                rx="3"
                fill={live(beyond)}
                fillOpacity={beyond ? 0.75 : 0.5}
                className="transition-all duration-500 motion-reduce:transition-none"
              />
              {Array.from({ length: r.lines }).map((_, k) => (
                <rect
                  key={k}
                  x={r.x + 16}
                  y={r.y + 36 + k * 13}
                  width={r.w - 32 - k * 26}
                  height="5"
                  rx="2.5"
                  fill="var(--color-ash)"
                  fillOpacity="0.3"
                />
              ))}
            </g>
          ))}
        </g>

        {/* ------------------------------------------------- the crossings --
            Drawn only where the service's own sentence names both sides. The
            dotted tracks stay underneath, so the route exists whether or not
            this particular service takes it. */}
        {TIES.map((y, i) => (
          <g key={y}>
            <path
              d={`M 418 ${y} H 512`}
              stroke="var(--color-ash)"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="4 5"
              fill="none"
            />
            {across && (
              <>
                {/* The route, taken. Solid underneath so the crossing reads at
                    rest and in a screenshot, with the packet travelling over
                    it: a flow dash alone is absent for most of its own cycle,
                    which left the whole meaning of "both" to a moving thing
                    that is off screen half the time. */}
                <path
                  d={`M 418 ${y} H 512`}
                  stroke="var(--color-brand)"
                  strokeOpacity="0.45"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d={`M 418 ${y} H 512`}
                  stroke="var(--color-brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  className="ci-flow"
                  style={{ animationDuration: "3.6s", animationDelay: `${i * 0.9}s` }}
                />
              </>
            )}
          </g>
        ))}
        {across && (
          <circle cx="466" cy="162" r="5.5" fill="var(--color-brand)" />
        )}
      </svg>

      {/* The two territories, named. HTML at the 11px floor, so they hold at
          every width instead of scaling with the viewBox. */}
      {/* The captions sit under the halves they name rather than at the two
          ends of an even split. Stacked on the narrowest screens, where a
          54fr column is about 140px and "beyond your website" wraps. */}
      <figcaption className="mt-4 grid gap-2 sm:gap-6 sm:[grid-template-columns:46fr_54fr]">
        {[
          { text: territories[0], on: onPage },
          { text: territories[1], on: beyond },
        ].map((t) => (
          <span
            key={t.text}
            className={cn(
              "font-display flex items-center gap-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-500 motion-reduce:transition-none",
              t.on ? "text-brand-text" : "text-ash",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                t.on ? "bg-brand" : "bg-ash/50",
              )}
            />
            {t.text}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

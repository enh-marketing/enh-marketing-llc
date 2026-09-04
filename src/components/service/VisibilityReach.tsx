"use client";

import { cn } from "@/lib/cn";
import type { ServiceReach } from "@/content/services/ai-search-visibility";

/** Where the selected service does its work: on your own site, out on the
 *  wider web, or across both.
 *
 *  WHY THIS DRAWING AND NOT THE LAST ONE. The section's earlier drawing tried
 *  to depict the whole system — questions, platforms, gates, a page, its
 *  markup, its off-site sources — in about ten unlabelled grey rectangles per
 *  service. It answered no question a reader could name. This one answers
 *  exactly one, and the answer is a place, not a notation: the work lands
 *  inside the frame, outside it, or on both. That is the same trick the
 *  approved AI Automation page runs with PERSON and MACHINE, which nobody has
 *  to be taught.
 *
 *  IT IS A SECOND AXIS, NOT A REPEAT. The row above sorts the seven by which
 *  of find, understand and reference they work on. This says whose property
 *  the work happens on. Services 03, 04 and 05 share a bay and differ here
 *  (page, both, page), so the drawing moves across a bay rather than standing
 *  still for three consecutive selections.
 *
 *  TWO LABELS, BOTH THE DOCUMENT'S. "on the page" is from 05, "beyond your
 *  website" is from 06. They are HTML, not SVG text, because text inside a
 *  viewBox scales with the box and drops below the 11px floor on a phone.
 *
 *  INKED IN ASH, NOT LINE. On the dark chapter --color-line is #2e2e2e against
 *  #101010, which is 1.4:1 and does not appear at all. */
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

  /* Stroke widths are in viewBox units on purpose: .ci-draw and .ci-flow set
     vector-effect: none, because under non-scaling-stroke Chromium measures the
     dash in screen pixels and any path over 100px renders as a dash, a gap and
     a stub. */
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 400 208"
        className="w-full"
        role="img"
        aria-label={
          across
            ? "Work on your own site and on sources beyond it."
            : onPage
              ? "Work on your own site."
              : "Work on sources beyond your website."
        }
      >
        {/* ------------------------------------------------ your own site --
            Drawn as a page, because that is what it is: a heading, body copy
            and two blocks. Not a symbol of a page. */}
        <g
          className={cn(
            "transition-opacity duration-500 motion-reduce:transition-none",
            onPage ? "opacity-100" : "opacity-45",
          )}
        >
          <rect
            x="8"
            y="26"
            width="186"
            height="150"
            rx="10"
            fill={onPage ? "var(--color-brand)" : "none"}
            fillOpacity={onPage ? 0.07 : 0}
            stroke={onPage ? "var(--color-brand)" : "var(--color-ash)"}
            strokeWidth="1.6"
            className="transition-colors duration-500 motion-reduce:transition-none"
          />
          {/* The heading bar. */}
          <rect
            x="24"
            y="44"
            width="96"
            height="9"
            rx="2.5"
            fill={onPage ? "var(--color-brand)" : "var(--color-ash)"}
            fillOpacity={onPage ? 0.9 : 0.5}
            className="transition-all duration-500 motion-reduce:transition-none"
          />
          {/* Body copy. */}
          {[68, 80, 92].map((y, i) => (
            <rect
              key={y}
              x="24"
              y={y}
              width={[154, 138, 120][i]}
              height="5"
              rx="2"
              fill="var(--color-ash)"
              fillOpacity="0.42"
            />
          ))}
          {/* Two blocks of detail. */}
          {[24, 96].map((x) => (
            <rect
              key={x}
              x={x}
              y="112"
              width="74"
              height="46"
              rx="6"
              fill="var(--color-ash)"
              fillOpacity="0.13"
              stroke="var(--color-ash)"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* --------------------------------------------------- the divide --
            One hairline. It is the only thing in the drawing a reader has to
            read as a boundary, and the two captions underneath name both of
            its sides in words. */}
        <line
          x1="214"
          y1="14"
          x2="214"
          y2="192"
          stroke="var(--color-ash)"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="3 5"
        />

        {/* ------------------------------------------ sources beyond it ----
            Four of them, uneven, because listings, reviews, partner sites and
            news coverage are not a tidy grid. */}
        <g
          className={cn(
            "transition-opacity duration-500 motion-reduce:transition-none",
            beyond ? "opacity-100" : "opacity-45",
          )}
        >
          {[
            { x: 236, y: 30, w: 96, h: 40 },
            { x: 300, y: 84, w: 84, h: 36 },
            { x: 236, y: 130, w: 104, h: 44 },
            { x: 348, y: 30, w: 44, h: 40 },
          ].map((r, i) => (
            <g key={i}>
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx="6"
                fill={beyond ? "var(--color-brand)" : "none"}
                fillOpacity={beyond ? 0.07 : 0}
                stroke={beyond ? "var(--color-brand)" : "var(--color-ash)"}
                strokeOpacity={beyond ? 0.75 : 0.55}
                strokeWidth="1.3"
                className="transition-colors duration-500 motion-reduce:transition-none"
              />
              <rect
                x={r.x + 12}
                y={r.y + 13}
                width={Math.min(r.w - 24, 52)}
                height="5"
                rx="2"
                fill="var(--color-ash)"
                fillOpacity="0.5"
              />
              {r.w > 60 && (
                <rect
                  x={r.x + 12}
                  y={r.y + 24}
                  width={r.w - 40}
                  height="4"
                  rx="2"
                  fill="var(--color-ash)"
                  fillOpacity="0.3"
                />
              )}
            </g>
          ))}
        </g>

        {/* ------------------------------------------------- the crossing --
            Only drawn where the service's own sentence names both sides. It is
            a route, so it travels; the dotted track underneath says the route
            exists even when this service does not take it. */}
        {/* Two ties, not one. A single 42-unit dash between the two halves was
            too slight to carry the whole meaning of "both", and a relationship
            between two things reads as a relationship when it is plural. */}
        {[74, 132].map((y, i) => (
          <g key={y}>
            <path
              d={`M 194 ${y} H 236`}
              stroke="var(--color-ash)"
              strokeOpacity="0.4"
              strokeWidth="1"
              strokeDasharray="3 4"
              fill="none"
            />
            {across && (
              <path
                d={`M 194 ${y} H 236`}
                stroke="var(--color-brand)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
                className="ci-flow"
                style={{ animationDuration: "3.4s", animationDelay: `${i * 1.1}s` }}
              />
            )}
          </g>
        ))}
        {across && (
          <circle
            cx="214"
            cy="103"
            r="4"
            fill="var(--color-brand)"
            className="transition-opacity duration-500 motion-reduce:transition-none"
          />
        )}
      </svg>

      {/* The two territories, named. HTML, at the 11px floor, so they hold at
          every width instead of scaling with the viewBox. */}
      <figcaption className="mt-3 grid grid-cols-2 gap-4">
        {[
          { text: territories[0], on: onPage },
          { text: territories[1], on: beyond },
        ].map((t) => (
          <span
            key={t.text}
            className={cn(
              "font-display flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-500 motion-reduce:transition-none",
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

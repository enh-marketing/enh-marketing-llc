"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

/** The events, as a field rather than a list.
 *
 *  WHY A FIELD. Eleven occasions and nothing else: no descriptions, no order,
 *  no figures. Every list treatment states an order the document does not have,
 *  and every grid states that they are interchangeable units of the same size.
 *  They are neither. They are eleven different rooms this service works in, and
 *  the honest shape for that is a spread with no first and no last -- one where
 *  the reader's eye lands wherever their own event is, which is what they came
 *  to this section to do.
 *
 *  THE LINKS ARE NOT A CLAIM. They join neighbours on the plane and nothing
 *  else: no hierarchy, no frequency, no relationship between one sector and
 *  another. They exist so the eleven read as one field rather than eleven
 *  floating labels, and pointing at a node lights only the lines that touch it.
 *
 *  EVERY NODE IS DRAWN AS ITS OWN OCCASION. A stage and a lectern, a stand
 *  under its banner, a covered plinth, a trophy, a demonstration rig, the room
 *  and everyone not in it. Conventional signs for the occasions the document
 *  names; none of them says anything about how that event is covered, and the
 *  document says nothing either.
 *
 *  NOTHING IS SIZED. Every node is the same size, at the same depth, in the
 *  document's own order. Position is composition, not weight.
 *
 *  RESPONSIVE. A scatter needs width to be a scatter. Below the large
 *  breakpoint the same eleven run down a single rail, each keeping its own
 *  mark, which is the same information at reading width rather than a squashed
 *  version of the desktop plan. */

const EASE = [0.16, 1, 0.3, 1] as const;

/** The plan the field is laid out on. Fixed positions in a 1200 by 560 box:
 *  three loose bands, so no two labels can collide at any width the field is
 *  drawn at. */
const NODES = [
  { x: 128, y: 84 },
  { x: 434, y: 60 },
  { x: 742, y: 88 },
  { x: 1048, y: 62 },
  { x: 282, y: 272 },
  { x: 600, y: 292 },
  { x: 916, y: 268 },
  { x: 128, y: 476 },
  { x: 434, y: 500 },
  { x: 742, y: 472 },
  { x: 1048, y: 496 },
];
/** Which nodes are drawn as neighbours. Adjacency on the plane, nothing more. */
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [1, 4],
  [1, 5],
  [2, 5],
  [2, 6],
  [3, 6],
  [4, 7],
  [4, 8],
  [5, 8],
  [5, 9],
  [6, 9],
  [6, 10],
  [7, 8],
  [8, 9],
  [9, 10],
];

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** One mark per occasion, in the document's order. */
function Occasion({ i }: { i: number }) {
  return (
    <g className="text-brand">
      {i === 0 && (
        <>
          <path d="M6 34h36v6H6z" {...S} />
          <path d="M18 34V18h12v16" {...S} />
          <path d="M20 14h8l-2 4h-4z" {...S} opacity="0.8" />
          <path d="M10 12l4 6M38 12l-4 6" {...S} opacity="0.55" />
        </>
      )}
      {i === 1 && (
        <>
          <path d="M8 14h32v10H8z" {...S} />
          <path d="M14 24v16M34 24v16M6 40h36" {...S} />
          <path d="M18 40V30h12v10" {...S} opacity="0.7" />
        </>
      )}
      {i === 2 && (
        <>
          <path d="M14 40V28h20v12z" {...S} />
          <path d="M12 28c0-8 5-12 12-12s12 4 12 12z" {...S} />
          <path d="M24 16v-6" {...S} opacity="0.7" />
          <path d="M14 8l4 4M34 8l-4 4" {...S} opacity="0.5" />
        </>
      )}
      {i === 3 && (
        <>
          <rect x="10" y="8" width="28" height="18" rx="2" {...S} />
          <path d="M16 14h14M16 20h8" {...S} opacity="0.65" />
          <path d="M6 34h36M12 34v6M36 34v6" {...S} />
        </>
      )}
      {i === 4 && (
        <>
          <path d="M16 8h16v10a8 8 0 01-16 0z" {...S} />
          <path d="M16 10h-5a5 5 0 005 6M32 10h5a5 5 0 01-5 6" {...S} opacity="0.7" />
          <path d="M24 26v8M17 40h14l-2-6h-10z" {...S} />
        </>
      )}
      {i === 5 && (
        <>
          <path d="M12 12h10l-2 12a3 3 0 01-6 0z" {...S} />
          <path d="M17 24v12M13 38h8" {...S} />
          <path d="M28 12h10l-2 12a3 3 0 01-6 0z" {...S} opacity="0.7" />
          <path d="M33 24v12M29 38h8" {...S} opacity="0.7" />
        </>
      )}
      {i === 6 && (
        <>
          <path d="M8 12h32l-4 8H12z" {...S} />
          <path d="M12 20v20h24V20" {...S} />
          <path d="M20 40V30h8v10" {...S} opacity="0.7" />
        </>
      )}
      {i === 7 && (
        <>
          <path d="M14 10v14M7 17h14" {...S} />
          <path d="M16 34l12-6 12 6-12 6z" {...S} />
          <path d="M32 40v6" {...S} opacity="0.7" />
        </>
      )}
      {i === 8 && (
        <>
          <rect x="8" y="14" width="20" height="20" rx="2" {...S} />
          <circle cx="18" cy="24" r="5" {...S} />
          <path d="M18 8v4M8 38h32" {...S} opacity="0.6" />
          <path d="M32 20l8 6-8 6" {...S} />
        </>
      )}
      {i === 9 && (
        <>
          <circle cx="14" cy="14" r="5" {...S} />
          <path d="M6 30a8 8 0 0116 0" {...S} />
          <circle cx="32" cy="14" r="5" {...S} opacity="0.7" />
          <path d="M24 30a8 8 0 0116 0" {...S} opacity="0.7" />
          <path d="M24 42c-5-4-8-6-8-10a4 4 0 018-2 4 4 0 018 2c0 4-3 6-8 10z" {...S} />
        </>
      )}
      {i === 10 && (
        <>
          <rect x="6" y="10" width="22" height="16" rx="2" {...S} />
          <path d="M12 34h10M17 26v8" {...S} opacity="0.7" />
          <path d="M34 16h8v8h-8zM34 30h8v8h-8z" {...S} opacity="0.75" />
          <path d="M28 18h6M28 34h6" {...S} strokeDasharray="3 4" />
        </>
      )}
    </g>
  );
}

export function EventField({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: string[];
}) {
  const reduced = useReducedMotion();
  const [hot, setHot] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          markNode={
            <svg viewBox="0 0 96 96" aria-hidden className="h-24 w-24 text-brand">
              <path
                d="M20 24L54 16M54 16l22 22M20 24l14 30M54 16l-20 38M76 38L60 74M34 54l26 20"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.45"
              />
              {[
                [20, 24],
                [54, 16],
                [76, 38],
                [34, 54],
                [60, 74],
              ].map(([x, y], k) => (
                <circle key={k} cx={x} cy={y} r={k === 1 ? 6 : 4} fill="currentColor" opacity={k === 1 ? 1 : 0.55} />
              ))}
            </svg>
          }
        />

        {/* One list, laid out two ways. The eleven names exist once in the
            page: a scatter needs width, so above the large breakpoint the same
            items take their positions from the plan, and below it they run down
            a rail at reading size. Rendering both would put every name in the
            document twice. */}
        <div className="relative" onPointerLeave={() => setHot(null)}>
          {/* The links between neighbours. Drawn only where the plan is. */}
          <svg
            viewBox="0 0 1200 560"
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            preserveAspectRatio="none"
          >
            {EDGES.map(([a, b]) => {
              const lit = hot === a || hot === b;
              return (
                <path
                  key={a + "-" + b}
                  d={"M" + NODES[a].x + " " + NODES[a].y + "L" + NODES[b].x + " " + NODES[b].y}
                  className={cn(
                    "transition-colors duration-400 motion-reduce:transition-none",
                    lit ? "stroke-brand" : "stroke-line",
                  )}
                  strokeWidth={lit ? 1.6 : 1}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {/* The rail the eleven run down at reading width. */}
          <span aria-hidden className="absolute inset-y-4 left-6 w-px bg-line lg:hidden" />

          <ol className="relative lg:block lg:aspect-[1200/560]">
            {items.map((name, i) => {
              const n = NODES[i % NODES.length];
              const lit = hot === i;
              return (
                <motion.li
                  key={name}
                  initial={reduced ? false : { opacity: 0, scale: 0.86 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: EASE }}
                  style={
                    {
                      "--nx": (n.x / 1200) * 100 + "%",
                      "--ny": (n.y / 560) * 100 + "%",
                    } as React.CSSProperties
                  }
                  className="lg:absolute lg:left-[var(--nx)] lg:top-[var(--ny)] lg:w-[13.5rem] lg:-translate-x-1/2 lg:-translate-y-1/2"
                >
                  <button
                    type="button"
                    onPointerEnter={() => setHot(i)}
                    onFocus={() => setHot(i)}
                    onBlur={() => setHot(null)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-2xl border px-3 py-3 text-left transition-all duration-400 motion-reduce:transition-none lg:flex-col lg:items-center lg:gap-3 lg:py-4 lg:text-center",
                      lit
                        ? "border-brand bg-[color-mix(in_srgb,var(--color-brand)_9%,var(--color-ink-2))] lg:-translate-y-1"
                        : "border-transparent bg-transparent hover:border-brand/60 lg:border-line lg:bg-ink-2",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-ink-2 transition-colors duration-400 motion-reduce:transition-none",
                        lit ? "border-brand bg-brand/[0.12]" : "border-line",
                      )}
                    >
                      <svg viewBox="0 0 48 48" className="h-7 w-7">
                        <Occasion i={i} />
                      </svg>
                    </span>
                    <span
                      className={cn(
                        "text-[0.9rem] font-semibold leading-snug transition-colors duration-400 motion-reduce:transition-none lg:text-[0.78rem]",
                        lit ? "text-brand" : "text-fog",
                      )}
                    >
                      {name}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

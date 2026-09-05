"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Format } from "@/content/services/ai-workshops-and-training";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The four workshop formats, drawn as the rooms they are held in.
 *
 *  WHY A ROOM. The four formats are not four products. They are the same
 *  trainers running the same subject at four different shapes of session, and
 *  what actually separates them is who is in the room and how the room is laid
 *  out. A half-day introduction faces a board. A full-day practical breaks into
 *  tables and works. A leadership session is one table. A multi-session
 *  programme is the same room returned to over an agreed period. Cover the four
 *  titles and the plans still tell you which is which, which is the test.
 *
 *  NO HEADCOUNT. The document refuses to give one: "Hands-on workshops work
 *  best with smaller groups" is as far as it goes, and FAQ 8 declines the
 *  number outright. So the plans draw furniture and orientation, never seats.
 *  Nothing in this section can be counted, because nothing here was stated.
 *
 *  ALL FOUR AT ONCE. A services run whose reader cannot see what is on offer
 *  has failed before the drawing is judged, so every format name and every plan
 *  is on screen together and the selection only changes which one is described
 *  underneath. The clause each arrangement was read from is printed with it, so
 *  the picture is checkable against the source. */
export function WorkshopRooms({
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
  index?: string;
  title: string;
  strokeTitle?: string;
  items: Format[];
}) {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const current = items[active];

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "Four rooms, one subject" }}
          className="mb-12"
        />

        {/* The four plans, all visible. Each is its own control. */}
        <Rise>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {items.map((f, i) => {
              const on = i === active;
              return (
                <li key={f.no}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={on}
                    className={cn(
                      "group w-full rounded-[1.25rem] border p-4 text-left transition-colors duration-500 motion-reduce:transition-none sm:p-5",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      on ? "border-brand/55 bg-ink-3" : "border-line bg-ink-2 hover:border-ash/50",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display block text-[0.625rem] font-bold tabular-nums transition-colors duration-500",
                        on ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                      )}
                    >
                      {f.no}
                    </span>

                    <RoomPlan kind={f.room} on={on} />

                    <span
                      className={cn(
                        "font-display mt-4 block text-[0.9375rem] font-bold uppercase leading-[1.2] transition-colors duration-500 sm:text-base",
                        on ? "text-snow" : "text-fog group-hover:text-snow",
                      )}
                    >
                      {f.title}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "mt-3 block h-px transition-all duration-500 motion-reduce:transition-none",
                        on ? "w-20 bg-brand" : "w-8 bg-line group-hover:w-14",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </Rise>

        {/* One description at a time, under the run rather than beside it, so
            the plans keep the full width they need to be read as plans. */}
        <Rise delay={0.1} className="mt-10">
          <motion.div
            key={reduced ? "static" : current.no}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="border-t-2 border-line pt-8"
          >
            <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <p className="max-w-[62ch] text-base leading-relaxed text-fog sm:text-lg">
                {current.body}
              </p>
              <p className="max-w-[62ch] text-base leading-relaxed text-fog">{current.note}</p>
            </div>

            {/* Show the working: the clause the room was read from. */}
            <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ash">
                Room read from
              </span>
              <span className="font-display text-[0.9375rem] font-bold uppercase leading-tight text-brand-text">
                {current.cite}
              </span>
            </p>
          </motion.div>
        </Rise>
      </Container>
    </section>
  );
}

/** One room, in plan. Furniture and orientation only. */
function RoomPlan({ kind, on }: { kind: Format["room"]; on: boolean }) {
  /** The one element that says which way the room faces takes the accent.
   *  Furniture stays neutral in both states: brand red is a mark on this site,
   *  never a fill, and four rooms washed pink is the exact anti-reference. */
  const ink = on ? "var(--color-brand)" : "var(--color-ash)";
  const soft = "var(--color-ash)";
  const op = on ? 1 : 0.6;

  return (
    <svg
      viewBox="0 0 132 88"
      className="mt-4 h-auto w-full"
      fill="none"
      aria-hidden
      style={{ transition: "opacity 500ms", opacity: op }}
    >
      {/* The room. Same walls every time, so only the arrangement differs. */}
      <rect
        x="1"
        y="1"
        width="130"
        height="86"
        rx="7"
        stroke="var(--color-line)"
        strokeWidth="1.5"
      />

      {kind === "rows" && (
        <>
          {/* Faces a board: everything is oriented one way. */}
          <rect x="41" y="10" width="50" height="5" rx="2.5" fill={ink} />
          {/* Rows either side of an aisle, all facing the board. Equal
              widths: a taper would read as a paragraph of text, not seating. */}
          {[30, 47, 64].map((y) => (
            <g key={y}>
              <rect x="18" y={y} width="44" height="7" rx="3.5" fill={soft} fillOpacity={0.32} />
              <rect x="70" y={y} width="44" height="7" rx="3.5" fill={soft} fillOpacity={0.32} />
            </g>
          ))}
        </>
      )}

      {kind === "clusters" && (
        <>
          {/* Breaks into tables and works. The mark on each is the work. */}
          {[
            [20, 18],
            [74, 18],
            [20, 52],
            [74, 52],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <rect
                x={x}
                y={y}
                width="38"
                height="20"
                rx="4"
                fill={soft}
                fillOpacity={0.28}
              />
              <rect x={x + 12} y={y + 6} width="14" height="8" rx="2" fill={ink} />
            </g>
          ))}
        </>
      )}

      {kind === "table" && (
        <>
          {/* One table, and the decision it is there to make. */}
          <rect x="30" y="30" width="72" height="28" rx="14" fill={soft} fillOpacity={0.28} />
          <rect x="52" y="39" width="28" height="10" rx="3" fill={ink} />
        </>
      )}

      {kind === "return" && (
        <>
          {/* The same room, returned to over an agreed period. */}
          <path
            d="M18 66 H114"
            stroke="var(--color-line)"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          {[18, 58, 98].map((x, i) => (
            <g key={x}>
              <rect
                x={x}
                y={26 + i * 2}
                width="26"
                height="26"
                rx="4"
                fill={soft}
                fillOpacity={0.28}
              />
              <rect x={x + 6} y={34 + i * 2} width="14" height="6" rx="2" fill={ink} />
              <rect x={x + 11} y="63" width="4" height="6" rx="2" fill={ink} />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

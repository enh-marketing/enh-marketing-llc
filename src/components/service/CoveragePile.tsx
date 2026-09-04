"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { CoveragePreview } from "@/components/service/CoveragePreview";
import { cn } from "@/lib/cn";
import type { Capability } from "@/content/services/event-video";

/** Six ways to cover one day, in a pile you cannot see all of.
 *
 *  THE PAGE'S ARGUMENT IS THAT AN EVENT RUNS IN PARALLEL AND A CAMERA CANNOT.
 *  Its opening says so exactly: a keynote, demonstrations, interviews and
 *  conversations "happening at the same time. One camera with no coverage plan
 *  will miss something important." Any layout that lines the six up in a row --
 *  a grid, a rail, a wall of monitors -- quietly says the opposite, because in
 *  a row nothing is ever behind anything else and nothing is ever missed.
 *
 *  SO THEY OVERLAP. Six cards land on one another at fixed angles, and part of
 *  every one of them is covered by another. Bringing one forward is the whole
 *  point: something else goes behind it. That is the trade the document is
 *  describing, and it is the one thing a reader cannot argue with once they have
 *  done it themselves.
 *
 *  EVERY CAPABILITY CARRIES ITS PRECONDITION. The section is called "Plan the
 *  Coverage Before the Event Begins", and each of the six names the thing that
 *  has to be settled for it to be possible on the day. That clause is marked
 *  inside its own paragraph, never lifted out and never softened.
 *
 *  NOTHING COUNTS CAMERAS. Four panes is what a multi-camera monitor looks
 *  like, not a recommendation; the document refuses to fix a number and so does
 *  this. No card carries a count, a rate or a duration.
 *
 *  THE PILE IS NOT THE ONLY WAY IN. A numbered index sits beside it, so the six
 *  are reachable by keyboard and on a touch screen, and every body is in the
 *  DOM whether or not its card is on top.
 *
 *  MOTION. Transform only, driven by the reader, and cancelled under
 *  prefers-reduced-motion. Nothing moves on a timer. */

/** Where each card lands. Fixed, not random: a reader scrolling back has to
 *  find the pile exactly as they left it. Percentages of the stage, and a
 *  tilt in degrees. */
const DROP = [
  { x: 1, y: 2, r: -6.5 },
  { x: 30, y: 0, r: 4.5 },
  { x: 6, y: 26, r: 3.5 },
  { x: 33, y: 30, r: -4 },
  { x: 0, y: 55, r: 5.5 },
  { x: 28, y: 57, r: -2.5 },
];

export function CoveragePile({
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
  items: Capability[];
}) {
  const [top, setTop] = useState(items.length - 1);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Six ways to cover one day" }}
          className="mb-12"
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
          {/* The pile. */}
          <div className="relative aspect-[5/6] w-full sm:aspect-[6/5] lg:aspect-square">
            {items.map((k, i) => {
              const d = DROP[i % DROP.length];
              const on = i === top;
              return (
                <button
                  key={k.title}
                  type="button"
                  onClick={() => setTop(i)}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setTop(i);
                  }}
                  aria-pressed={on}
                  aria-label={k.title}
                  style={{
                    left: d.x + "%",
                    top: d.y + "%",
                    zIndex: on ? 20 : 10 - Math.abs(top - i),
                    transform:
                      "rotate(" + (on ? 0 : d.r) + "deg) scale(" + (on ? 1.04 : 1) + ")",
                  }}
                  className={cn(
                    "absolute w-[68%] origin-center overflow-hidden rounded-xl border text-left transition-all duration-500 ease-out motion-reduce:transition-none",
                    on
                      ? "border-brand bg-[color-mix(in_srgb,var(--color-brand)_8%,var(--color-ink-2))]"
                      : "border-line bg-ink-2 hover:border-brand/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center gap-2 border-b px-3 py-2 transition-colors duration-400 motion-reduce:transition-none",
                      on ? "border-brand/40" : "border-line",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-400 motion-reduce:transition-none",
                        on ? "animate-pulse bg-brand" : "bg-line",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "text-[0.58rem] font-bold tabular-nums transition-colors duration-400 motion-reduce:transition-none",
                        on ? "text-brand" : "text-ash",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* No name on the card: the panel beside the pile carries
                        it as the section's heading, and printing it here as
                        well would put all six titles in the page twice. The
                        card's accessible name is the title. */}
                    <span
                      aria-hidden
                      className={cn(
                        "h-px flex-1 transition-colors duration-400 motion-reduce:transition-none",
                        on ? "bg-brand/50" : "bg-line",
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "block px-3 py-3 transition-colors duration-400 motion-reduce:transition-none",
                      on ? "text-brand" : "text-ash",
                    )}
                  >
                    <span className="block aspect-[200/104] w-full">
                      <CoveragePreview kind={k.preview} />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* What is on top, and how to reach the rest of it. */}
          <div className="lg:pt-4">
            <ol className="flex flex-wrap gap-2">
              {items.map((k, i) => (
                <li key={k.title}>
                  <button
                    type="button"
                    onClick={() => setTop(i)}
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setTop(i);
                    }}
                    aria-pressed={i === top}
                    aria-label={k.title}
                    className={cn(
                      "font-display h-9 w-9 rounded-full border text-[0.66rem] font-bold tabular-nums transition-colors duration-400 motion-reduce:transition-none",
                      i === top
                        ? "border-brand bg-brand text-white"
                        : "border-line text-fog hover:border-brand hover:text-brand",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                </li>
              ))}
            </ol>

            <ol className="mt-8">
              {items.map((k, i) => (
                <li
                  key={k.title}
                  className="grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: i === top ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <h3 className="font-display text-[clamp(1.15rem,2.4vw,1.75rem)] font-extrabold uppercase leading-[1.12] text-snow">
                      {k.title}
                    </h3>
                    <p className="mt-4 max-w-xl leading-relaxed text-fog sm:text-lg">
                      <Marked text={k.body} mark={k.before} className="font-semibold text-brand" />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

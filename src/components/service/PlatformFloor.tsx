"use client";

import { Fragment, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** Eleven platforms and tools, and the four things the document says decide
 *  whether any of them is worth having.
 *
 *  THE SECTION IS ITS OWN LAST SENTENCE. "The platform provides the
 *  infrastructure. Strategy, product information, tracking and ongoing
 *  execution determine how effectively it supports growth." That is not a list
 *  of tools with a caveat after it; it is a structural claim, and it has a
 *  shape. The platform is the ground. Four named things stand on it. What they
 *  carry is the growth. So the drawing is that: the eleven tools laid into the
 *  floor, four pillars standing on them, and one beam across the top.
 *
 *  WHY A GRID OF LOGO CARDS WAS NOT AN OPTION. It would give each of the eleven
 *  the weight of a service and say nothing at all about the sentence that
 *  follows them — which is the only claim the section actually makes.
 *
 *  THE CLIENT'S SENTENCE IS THE LEGEND. The four pillars carry no words;
 *  the four phrases inside the sentence are the control, and pointing at one
 *  lights its pillar and the stretch of beam above it while the other three go
 *  hollow. Nothing is printed twice: the tool names appear once, in the floor,
 *  and the four determinants once, in the sentence.
 *
 *  NOTHING IS RANKED. All four pillars are the same height and the same width,
 *  because the sentence names them together and gives no order of importance.
 *  Only attention moves.
 *
 *  CONTRAST IS DELIBERATELY ABOVE THE HOUSE HAIRLINE. Built out of border-line
 *  and line-tinted hatching, the whole assembly measured about 1.27 against the
 *  light page and disappeared: four columns and a beam rendered as an empty box
 *  with faint text at the bottom. Structure that a reader has to be able to
 *  READ AS AN OBJECT is drawn in --color-ash instead, which is a text tone and
 *  clears 4.5:1 on every surface; --color-line stays where it belongs, on the
 *  plate edge and the chips. */

export function PlatformFloor({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  verdict,
  verdictMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** Ends in a colon in the source, so it sits immediately above the floor the
   *  eleven are laid into. */
  lead: string;
  items: string[];
  verdict: string;
  /** Verbatim, contiguous phrases inside `verdict`, in the order the sentence
   *  writes them. The pillars are indexed against this array. */
  verdictMark: [string, string, string, string];
}) {
  const [held, setHeld] = useState(-1);

  /* The sentence, split around its four phrases so each becomes a control
     without a single word moving. Same contract as Marked. */
  const present = verdictMark.filter((m) => verdict.includes(m));
  const parts = present.length
    ? verdict.split(
        new RegExp(
          "(" +
            present
              .map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
              .sort((a, b) => b.length - a.length)
              .join("|") +
            ")",
          "g",
        ),
      )
    : [verdict];

  const quiet = held !== -1;

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={<p className="statement text-balance text-snow">{lead}</p>}
          className="mb-12"
        />

        <Rise>
          <div className="rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-5 sm:p-8">
            {/* ---- What the four carry ---- */}
            {/* FOUR COLUMNS AT EVERY WIDTH, and that is not a preference.
                At grid-cols-2 the four beam segments wrapped into two rows and
                the four pillars into two more, so a phone showed two lengths of
                beam stacked above four columns that carried nothing — the one
                thing this drawing exists to say, inverted. Four narrow pillars
                on a 375px screen come out 62px apart, which is enough. */}
            <div aria-hidden className="grid grid-cols-4">
              {verdictMark.map((mark, i) => (
                <span
                  key={mark}
                  className={cn(
                    "h-4 border-y transition-colors duration-500 motion-reduce:transition-none",
                    i === 0 && "rounded-l-md border-l",
                    i === verdictMark.length - 1 && "rounded-r-md border-r",
                    held === i
                      ? "border-brand bg-brand"
                      : quiet
                        ? "border-ash/40 bg-ash/15"
                        : "border-ash/60 bg-ash/30",
                  )}
                />
              ))}
            </div>

            {/* ---- The four that carry it ---- */}
            <div aria-hidden className="grid grid-cols-4 gap-2 sm:gap-7">
              {verdictMark.map((mark, i) => {
                const on = held === i;
                return (
                  <span
                    key={mark}
                    className={cn(
                      "relative flex h-32 flex-col justify-between transition-opacity duration-500 motion-reduce:transition-none sm:h-44",
                      !on && quiet && "opacity-40",
                    )}
                  >
                    {/* Capital: the part actually touching the load. */}
                    <span
                      className={cn(
                        "mx-auto block h-2 w-[86%] transition-colors duration-500 motion-reduce:transition-none",
                        on ? "bg-brand" : "bg-ash/55",
                      )}
                    />

                    {/* Shaft. Hatched, because the thing is carrying
                        something and the hatching is what says so. */}
                    <span
                      className={cn(
                        "relative mx-auto block w-[62%] flex-1 border-x transition-colors duration-500 motion-reduce:transition-none",
                        on ? "border-brand bg-brand/[0.12]" : "border-ash/55 bg-ash/[0.06]",
                      )}
                    >
                      <span
                        className="absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, currentColor 0 1.5px, transparent 1.5px 13px)",
                          color: on ? "var(--color-brand)" : "var(--color-ash)",
                          opacity: on ? 0.45 : 0.22,
                        }}
                      />
                    </span>

                    {/* Base: what it stands on. */}
                    <span
                      className={cn(
                        "mx-auto block h-2.5 w-[86%] transition-colors duration-500 motion-reduce:transition-none",
                        on ? "bg-brand" : "bg-ash/55",
                      )}
                    />
                  </span>
                );
              })}
            </div>

            {/* ---- The floor: everything the four stand on ---- */}
            <div className="rounded-lg border border-ash/45 bg-ink-3 p-4 sm:p-5">
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="font-display rounded-full border border-line bg-ink-2 px-4 py-2 text-[0.72rem] font-extrabold uppercase leading-none text-snow transition-colors duration-300 hover:border-brand hover:text-brand motion-reduce:transition-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The ground under the floor, so the slab reads as resting on
                something rather than floating in the plate. */}
            <div
              aria-hidden
              className="h-5 rounded-b-lg border-x border-b border-ash/25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, var(--color-ash) 0 1px, transparent 1px 9px)",
                opacity: 0.2,
              }}
            />

            {/* ---- The sentence that is the section ---- */}
            <p
              className="mt-8 max-w-4xl border-t border-line pt-8 text-base leading-relaxed text-fog sm:text-lg"
              onPointerLeave={() => setHeld(-1)}
            >
              {parts.map((part, i) => {
                const which = verdictMark.indexOf(part as (typeof verdictMark)[number]);
                if (which === -1) return <Fragment key={i}>{part}</Fragment>;
                const on = which === held;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onPointerEnter={() => setHeld(which)}
                    onFocus={() => setHeld(which)}
                    onBlur={() => setHeld(-1)}
                    onClick={() => setHeld(on ? -1 : which)}
                    className={cn(
                      "font-display rounded-md px-1.5 py-1 text-[0.95em] font-extrabold uppercase leading-none transition-colors duration-300 motion-reduce:transition-none",
                      on
                        ? "bg-brand text-white"
                        : "text-snow underline decoration-brand decoration-2 underline-offset-4 hover:text-brand",
                    )}
                  >
                    {part}
                  </button>
                );
              })}
            </p>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

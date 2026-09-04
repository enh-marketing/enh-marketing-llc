"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Six commitments, set as a sheet the reader actually fills in.
 *
 *  THE TAIL IS NOT A SUMMARY, IT IS AN INSTRUCTION: "Businesses comparing the
 *  best web design company in Dubai should look at what happens before the
 *  design starts and after the website goes live." Whoever reads this section
 *  is mid-comparison, with two or three agencies open in other tabs. What they
 *  need is not six more sentences of reassurance, it is something they can take
 *  to the others.
 *
 *  SO THE SECOND COLUMN IS A LIVE CONTROL, NOT A DRAWING OF ONE. The first cut
 *  of this drew an empty circle beside each row and called it a form, which is
 *  a picture of an interaction rather than an interaction. Here every blank is
 *  a real checkbox: the reader ticks whichever of the six the agency they are
 *  looking at actually does, the tally at the foot moves as they go, and the
 *  distance between the two columns is the answer they came for. It is the only
 *  thing on this site the visitor is asked to complete, and it turns a page of
 *  claims into a test they run themselves.
 *
 *  WE SCORE NOBODY. The tally on the right counts the reader's own ticks and
 *  nothing else -- no agency is named, characterised or pre-marked, and the
 *  column starts empty every time. Our own column is filled because these are
 *  our commitments; that is a statement about us, which we are entitled to
 *  make, and it is the only one on the sheet.
 *
 *  IT IS STILL PAPER WITHOUT SCRIPT. Dotted leaders, a ruled column and an
 *  unticked set of boxes: with no JavaScript the section is exactly the
 *  printable comparison sheet it looks like, and nothing about it is broken.
 *  Under reduced motion the ticks appear rather than draw.
 *
 *  ONE COLUMN WIDE THE CHECKS MOVE, THEY DO NOT GO. An earlier cut hid them
 *  below the small breakpoint, which left a phone reader with six sentences and
 *  no sheet -- the one device the section is built on, dropped in the format
 *  most people will read it in. */

/** A tick that draws itself when it lands. `pathLength` normalises the stroke
 *  so one keyframe serves both sizes. */
function Tick({ drawn, className }: { drawn: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} fill="none" aria-hidden>
      <motion.path
        d="M2 7.4l3.2 3.2L12 3.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        initial={false}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={{ duration: 0.28, ease: EASE }}
      />
    </svg>
  );
}

/** Six segments, one per commitment, filling as the column is answered. */
function Tally({ total, filled, tone }: { total: number; filled: number; tone: "ours" | "theirs" }) {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "block h-1.5 w-4 rounded-full transition-colors duration-400",
              i < filled ? (tone === "ours" ? "bg-brand" : "bg-brand/70") : "bg-line",
            )}
          />
        ))}
      </span>
      <span
        className={cn(
          "font-display text-[0.8125rem] font-extrabold tabular-nums transition-colors duration-400",
          filled > 0 ? "text-brand" : "text-ash",
        )}
      >
        {filled}/{total}
      </span>
    </span>
  );
}

/** The control that appears in both layouts, so a phone gets the same sheet
 *  rather than a picture of one.
 *
 *  DECLARED HERE AND NOT INSIDE THE SECTION. Defined in the render body it is a
 *  new component type on every render, so React unmounted and remounted all
 *  twelve buttons each time a single one was ticked -- which throws away
 *  keyboard focus mid-interaction and restarts the tick's draw. At module scope
 *  the elements are stable and only their props change.
 *
 *  PADDING ON THE BUTTON, CIRCLE INSIDE IT. The mark is 24px on a wide screen
 *  and 20px on a phone, which is the right size to look at and the wrong size
 *  to hit. A pseudo-element was the first attempt and did not take; real
 *  padding cancelled by a negative margin makes the button 44px square without
 *  moving anything around it. */
function Box({
  i,
  size,
  labelId,
  ticked,
  onToggle,
}: {
  i: number;
  size: "sm" | "md";
  labelId: string;
  ticked: boolean;
  onToggle: (i: number) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={ticked}
      aria-labelledby={labelId}
      onClick={() => onToggle(i)}
      className="group/box -m-3 flex shrink-0 items-center justify-center p-3 outline-none focus-visible:[&>span]:border-brand"
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full border transition-[background-color,border-color] duration-300",
          size === "md" ? "h-6 w-6" : "h-5 w-5",
          ticked
            ? "border-brand bg-brand text-white"
            : "border-dashed border-line text-transparent group-hover/box:border-brand/60",
        )}
      >
        <Tick drawn={ticked} className={size === "md" ? "h-3 w-3" : "h-2.5 w-2.5"} />
      </span>
    </button>
  );
}

export function ComparisonSheet({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  ours,
  items,
  tail,
  tailMark,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  /** Our column's heading: the agency's own name, not a claim. */
  ours: string;
  items: { stance: string; detail: string }[];
  tail: string;
  tailMark: string;
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [hot, setHot] = useState<number | null>(null);
  /** What the reader has ticked for whoever they are comparing us against.
   *  Starts empty and is never seeded. */
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => false));
  const count = ticked.filter(Boolean).length;

  const toggle = (i: number) =>
    setTicked((prev) => prev.map((v, k) => (k === i ? !v : v)));

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-12"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />

        <div className="rounded-[1.25rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)] px-6 py-7 sm:px-9 sm:py-9">
          {/* The two columns: ours, and the one the reader fills. */}
          <div className="mb-2 hidden items-end justify-end gap-3 sm:flex sm:gap-5">
            <span className="font-display w-24 shrink-0 text-center text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-brand">
              {ours}
            </span>
            <span
              aria-hidden
              className="w-24 shrink-0 border-b border-dashed border-line pb-1"
            />
          </div>

          <ol ref={ref} className="border-t border-line">
            {items.map((item, i) => {
              const on = hot === i;
              return (
                <motion.li
                  key={item.stance}
                  initial={reduced ? false : { opacity: 0, x: -14 }}
                  animate={play ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  onMouseEnter={() => setHot(i)}
                  onMouseLeave={() => setHot(null)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(null)}
                  className={cn(
                    "relative border-b border-line py-5 transition-colors duration-400",
                    (on || ticked[i]) &&
                      "bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)]",
                  )}
                >
                  <div className="flex items-baseline gap-3 sm:gap-5">
                    <span
                      aria-hidden
                      className={cn(
                        "font-display shrink-0 text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                        on ? "text-brand" : "text-brand/35",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <p
                      id={`${id}-row-${i}`}
                      className={cn(
                        "font-display max-w-[34ch] shrink-0 text-[clamp(0.98rem,1.7vw,1.2rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                        on ? "text-brand" : "text-snow",
                      )}
                    >
                      {item.stance}
                    </p>

                    {/* The leader, which is what makes this a form. */}
                    <span
                      aria-hidden
                      className={cn(
                        "mb-1 hidden min-w-6 flex-1 border-b border-dotted transition-colors duration-400 sm:block",
                        on ? "border-brand/60" : "border-line",
                      )}
                    />

                    {/* Ours. Filled, because these are our commitments. */}
                    <span aria-hidden className="hidden w-24 shrink-0 justify-center sm:flex">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
                        <Tick drawn className="h-3 w-3" />
                      </span>
                    </span>

                    {/* And theirs, which the reader answers. */}
                    <span className="hidden w-24 shrink-0 justify-center sm:flex">
                      <Box
                        i={i}
                        size="md"
                        labelId={`${id}-row-${i}`}
                        ticked={ticked[i]}
                        onToggle={toggle}
                      />
                    </span>
                  </div>

                  {/* One column wide, both checks come down here. */}
                  <div className="mt-4 flex items-center gap-4 pl-8 sm:hidden">
                    <span aria-hidden className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
                        <Tick drawn className="h-2.5 w-2.5" />
                      </span>
                      <span className="font-display text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-brand">
                        {ours}
                      </span>
                    </span>
                    <Box
                      i={i}
                      size="sm"
                      labelId={`${id}-row-${i}`}
                      ticked={ticked[i]}
                      onToggle={toggle}
                    />
                  </div>

                  <p className="mt-3 max-w-[70ch] pl-8 leading-relaxed text-fog sm:pl-10">
                    {item.detail}
                  </p>
                </motion.li>
              );
            })}
          </ol>

          {/* Where a total goes on a sheet: ours, and whatever the reader made
              of the other one. */}
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="flex items-center gap-3">
                <span className="font-display text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-brand">
                  {ours}
                </span>
                <Tally total={items.length} filled={items.length} tone="ours" />
              </span>
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="block h-3.5 w-12 border-b border-dashed border-line"
                />
                <Tally total={items.length} filled={count} tone="theirs" />
              </span>
            </div>

            {/* Clear the sheet. Wordless, and only offered once there is
                something to clear. */}
            {count > 0 && (
              <button
                type="button"
                onClick={() => setTicked(items.map(() => false))}
                // A control's accessible name, not page copy: the tail is a
                // sentence about comparing agencies and would be nonsense read
                // out as the name of a reset button. Same register as the
                // "Know More" the channel run already hardcodes.
                aria-label="Clear the comparison"
                className="flex h-9 w-9 items-center justify-center self-start rounded-full border border-line text-ash outline-none transition-colors duration-300 hover:border-brand hover:text-brand focus-visible:border-brand sm:self-auto"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path
                    d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5V5.5H10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <Rise delay={0.12}>
          <p className="font-display statement mt-12 max-w-5xl font-extrabold uppercase leading-[1.12] text-snow">
            <Marked text={tail} mark={tailMark} />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

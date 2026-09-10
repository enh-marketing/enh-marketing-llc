"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { MarkedKeys } from "@/components/service/MarkedKeys";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** "Who We Work With" — nine operators on the house card.
 *
 *  THIS IS THE SITE'S CARD, NOT A NEW ONE. Cursor spotlight, a brand rule that
 *  wipes the top edge, a ghost-stroked numeral that fills on hover, a
 *  one-pixel lift, a brand tint that cannot vanish into whichever band the
 *  section lands on: every device here is `ui/SurfaceCard`'s, by way of the
 *  hospitality page's register, because a reader arriving at this section from
 *  the one above it should not be able to tell that a different person built
 *  it. Three earlier versions of this section went looking for a shape of their
 *  own -- a board with two plans under it, a rule per operator, then nine names
 *  set as a wall of display type -- and the last of those left the card system
 *  behind altogether, which is the thing that made it look like another
 *  website.
 *
 *  WHY THEY ARE NOT THE SAME WIDTH. Nine equal cards is a grid, and equal
 *  weight says the nine are interchangeable, which the section's own closing
 *  sentence denies. The spans run 5-4-3, 3-5-4, 4-3-5 out of twelve, so every
 *  row completes and no row repeats the one above it.
 *
 *  NOTHING IS DESCRIBED, BECAUSE NOTHING IS KNOWN. The document gives nine
 *  names and no detail on any of them, so each card carries its numeral and its
 *  name and no invented line of body copy. Nor a drawing: a previous audience
 *  section on this site drew each of its eight as a little building and the
 *  drawings were removed for "carrying nothing the eight names did not already
 *  carry".
 *
 *  WHAT THIS SECTION HAS THAT THE OTHER AUDIENCE SECTIONS DO NOT is a closing
 *  sentence that names two of its own nine and says they need different work.
 *  Both are on the list in the client's own wording, so the sentence is the
 *  section's control: pointing at either phrase brings that card forward on its
 *  own devices -- border, wipe and numeral, nothing invented for the occasion.
 *  `MarkedKeys` does it in place, so nothing is reworded and nothing is printed
 *  twice, and with no pointer and no keyboard both cards carry a standing mark
 *  so a reader can still see which two the sentence is about. */

/** Column span out of twelve, per operator, in the document's order. Every row
 *  sums to twelve and no row repeats the one above it. */
const SPANS = [
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-5",
];

function Card({
  label,
  no,
  span,
  delay,
  named,
  lit,
  walk,
}: {
  label: string;
  no: number;
  span: string;
  delay: number;
  /** One of the two the closing sentence names. */
  named: boolean;
  /** That sentence is pointing at this one now. */
  lit: boolean;
  /** This card's place in the light's walk down the register, in ms. */
  walk: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <li className={cn("min-w-0 sm:col-span-6", span)}>
      <motion.div
        ref={ref}
        onPointerMove={track}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.7, delay, ease: EASE }}
        className={cn(
          "group relative isolate flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-brand/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7",
          // A brand tint rather than a surface token: the section banding
          // assigns ink-2 and ink-3 by position, so a card painted with a
          // surface token can land the same colour as the section it sits in.
          lit
            ? "border-brand/55 bg-[color-mix(in_srgb,var(--color-brand)_9%,transparent)]"
            : "border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)]",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(232,0,13,0.16), transparent 70%)",
          }}
        />
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
        {/* The card's own top-edge wipe. The sentence draws it the whole way
            when it points here, so being chosen and being pointed at use the
            same device rather than two. */}
        <span
          aria-hidden
          className={cn(
            "absolute left-0 top-0 h-px bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:transition-none",
            lit ? "w-full" : "w-0",
          )}
        />

        <div className="flex items-start justify-between gap-6">
          <span
            aria-hidden
            className={cn(
              "font-display text-[2.75rem] font-extrabold leading-none text-stroke transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none",
              lit ? "opacity-100" : "opacity-30",
            )}
          >
            {String(no).padStart(2, "0")}
          </span>
          {/* The standing mark on the two the closing sentence names, so they
              are findable before anybody points at anything — and, on every
              card, the tick a single light walks along. Nine ticks sharing one
              duration and taking a delay of duration/nine is one light moving
              down the register, not nine marks at nine positions. */}
          <span
            aria-hidden
            className={cn(
              "relative mt-3 h-2 w-2 shrink-0 rounded-full transition-colors duration-500 group-hover:bg-brand motion-reduce:transition-none",
              named ? "bg-brand" : "bg-line",
            )}
          >
            <span
              className="ci-blink absolute -inset-1 rounded-full border border-brand"
              style={{ animationDelay: `${walk}ms` }}
            />
          </span>
        </div>

        <h3 className="font-display mt-8 text-[clamp(1.1rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.14] text-snow">
          {label}
        </h3>
      </motion.div>
    </li>
  );
}

export function OperatorCards({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  note,
  noteMark,
  contrast,
  contrastMark,
  contrastRows,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** Ends in a colon in the source, so it sits directly above the register. */
  lead: string;
  items: { label: string }[];
  note: string;
  noteMark: string[];
  contrast: string;
  /** The two operators the contrast names, in the order it names them. */
  contrastMark: readonly [string, string];
  /** Which card each of those two is, read from the client's own wording. */
  contrastRows: readonly [number, number];
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance text-snow">
              <Marked text={note} mark={noteMark} className="text-brand" />
            </p>
          }
          className="mb-12"
        />

        <Rise>
          <p className="mb-8 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-ash">
            {lead}
          </p>
        </Rise>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5 lg:grid-cols-12">
          {items.map((item, i) => (
            <Card
              key={item.label}
              label={item.label}
              no={i + 1}
              span={SPANS[i] ?? "lg:col-span-4"}
              delay={i * 0.05}
              named={i === contrastRows[0] || i === contrastRows[1]}
              lit={active !== null && i === contrastRows[active]}
              walk={(i * 6300) / items.length}
            />
          ))}
        </ul>

        {/* The sentence, and the register's only control. */}
        <Rise delay={0.1} className="mt-10">
          <p className="max-w-[76ch] border-l-2 border-brand pl-6 text-base leading-[1.7] text-fog sm:pl-8 sm:text-lg">
            <MarkedKeys
              text={contrast}
              keys={contrastMark}
              active={active}
              onPick={setActive}
            />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

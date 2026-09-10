"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** "Who We Work With" — eight cards, at eight deliberately unequal widths.
 *
 *  THE HISTORY OF THIS SECTION, BECAUSE IT MATTERS. It has been a run of
 *  display type with brand separators (handsome, no more scannable than a
 *  sentence), then eight little drawn buildings on a street (charming, and
 *  carrying nothing the eight names did not already carry), then a numbered
 *  two-column register (informative and plainly basic). Cards are the right
 *  answer: a reader arrives asking whether they are on this list, and a card is
 *  the shape that says "here is one thing, on its own".
 *
 *  WHY THEY ARE NOT THE SAME SIZE. Eight equal cards is a grid with a hole in
 *  it or a pretence that there are nine, and equal weight also says these eight
 *  are interchangeable — which the section's own closing sentence denies. The
 *  spans run 5-4-3, 3-5-4, 6-6 out of twelve, so the field reads as a
 *  composition and every row completes.
 *
 *  THE CARD IS THE HOUSE CARD'S DEVICES, ON A SURFACE THAT SURVIVES THE
 *  BANDING. Cursor spotlight, a brand rule that wipes the top edge, a
 *  ghost-stroked numeral that fills on hover, a one-pixel lift — all of it
 *  lifted from ui/SurfaceCard so this does not look like a second card system.
 *  What it does NOT take is that card's `bg-ink-2`: the section banding assigns
 *  ink-2 and ink-3 by position, `cn` is a plain join rather than a class merge,
 *  so a className override would leave two background utilities fighting over
 *  source order. A brand tint over whatever is behind it darkens both tones by
 *  the same amount and cannot vanish into its own section.
 *
 *  NOTHING IS DESCRIBED, BECAUSE NOTHING IS KNOWN. The document gives eight
 *  names and no detail on any of them, so each card carries its numeral and its
 *  name and no invented line of body copy. The name takes the scale the body
 *  copy would have had. */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Column span out of twelve, per business type, in order. */
const SPANS = [
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-6",
  "lg:col-span-6",
];

function Card({ label, no, span, delay }: { label: string; no: number; span: string; delay: number }) {
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
        className="group relative isolate flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] p-6 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-brand/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
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
        <span
          aria-hidden
          className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:transition-none"
        />

        <div className="flex items-start justify-between gap-6">
          <span
            aria-hidden
            className="font-display text-[2.75rem] font-extrabold leading-none text-stroke opacity-30 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
          >
            {String(no).padStart(2, "0")}
          </span>
          <span
            aria-hidden
            className="mt-3 h-2 w-2 shrink-0 rounded-full bg-line transition-colors duration-500 group-hover:bg-brand motion-reduce:transition-none"
          />
        </div>

        <h3 className="font-display mt-8 text-[clamp(1.1rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.14] text-snow">
          {label}
        </h3>
      </motion.div>
    </li>
  );
}

export function AudienceRegister({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  note,
  noteMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** Ends in a colon in the source, so it sits directly above the field. */
  lead: string;
  items: { label: string }[];
  note: string;
  noteMark: string[];
}) {
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

        <ul className="grid gap-4 sm:grid-cols-12 lg:gap-5">
          {items.map((item, i) => (
            <Card
              key={item.label}
              label={item.label}
              no={i + 1}
              span={SPANS[i] ?? "lg:col-span-4"}
              delay={Math.min(i, 5) * 0.06}
            />
          ))}
        </ul>

        {/* The reason the eight are listed separately at all. */}
        <Rise delay={0.14} className="mt-12">
          <p className="font-display max-w-4xl border-l-2 border-brand pl-6 text-[clamp(1.05rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.18] text-snow sm:pl-8">
            <Marked text={note} mark={noteMark} className="text-brand" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

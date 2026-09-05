"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LocalPromiseIcon, type PromiseMark } from "@/components/service/LocalPromiseIcon";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The seven commitments, and the four places the document refuses something.
 *
 *  WHAT IS ACTUALLY IN THIS CONTENT. Four of the seven promises are not
 *  promises to do a thing, they are promises NOT to do one: no keyword-stuffed
 *  names or false addresses, no near-identical page per Dubai neighbourhood, no
 *  bought reviews and no filtering requests towards happy customers, no paid
 *  media dressed up as organic local SEO. That is unusual, it is the strongest
 *  material on the page, and a card grid that sets all seven in identical boxes
 *  throws it away. So the refusal is pulled out of the paragraph, given its own
 *  rule and its own colour, and marked with the sign that means "not this".
 *  The words are the document's, contiguous and unedited; only their position
 *  changes.
 *
 *  WHY THE CARDS ARE NOT ALL THE SAME SIZE. A seven-item grid either leaves a
 *  hole or pretends there are eight. Instead the row widths are set to the
 *  content: the two promises with the most to say run wide and set their mark
 *  beside the text, the rest run narrow and stack. Two templates, one section,
 *  no filler cell.
 *
 *
 *  ONE NOTE ON SURFACE. The section banding alternates ink-2 and ink-3 by
 *  position, so a panel hard-coded to either tone vanishes into its own section
 *  whenever the parity falls the wrong way. The plates here are a brand tint
 *  over whatever is behind them instead, which darkens both tones by the same
 *  amount and survives a section being inserted above.
 *
 *  EVERY MARK IS DRAWN FOR ITS OWN SENTENCE. See LocalPromiseIcon: the lens
 *  travels over the audit, the guard draws itself around the profile, the two
 *  scopes pull apart, the tallest bar grows from its foot into the action it is
 *  tied to. They move on hover and keyboard focus of the card that owns them,
 *  never on a loop, and they are fully drawn at rest. */

/** Column span out of twelve, per promise, in order. Wide cards set their mark
 *  beside the text; narrow ones stack it above. */
const SPANS = [7, 5, 5, 7, 4, 4, 4];

type Item = { title: string; body: string; mark: PromiseMark; avoid?: string };

function Card({ item, no, span, delay }: { item: Item; no: number; span: number; delay: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const play = reduced || inView;
  const wide = span >= 7;

  /** The refusal is the tail of the body, so the two halves concatenate back
   *  to the source sentence exactly. Where the whole line is the refusal, the
   *  head is empty and the card is nothing but the thing we will not do. */
  const at = item.avoid ? item.body.indexOf(item.avoid) : -1;
  const head = at >= 0 ? item.body.slice(0, at) : item.body;
  const avoid = at >= 0 ? item.body.slice(at) : "";

  return (
    <motion.li
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      animate={play ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={cn("group relative", wide ? "lg:col-span-7" : span === 5 ? "lg:col-span-5" : "lg:col-span-4", "sm:col-span-6")}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-[color-mix(in_srgb,var(--color-brand)_2%,transparent)] transition-[border-color,transform] duration-500 ease-out group-hover:-translate-y-1 group-hover:border-brand/45 group-focus-within:border-brand/45">
        {/* The head carries the count and the mark. The rule beneath it fills
            on hover, so the card answers the pointer before the icon does. */}
        <div className="relative flex items-center justify-between gap-4 border-b border-line bg-[color-mix(in_srgb,var(--color-brand)_6%,transparent)] px-6 py-3.5">
          <span className="font-display text-[0.6875rem] font-bold tabular-nums text-brand">
            {String(no).padStart(2, "0")}
          </span>
          {!wide && (
            <span className="block h-9 w-9 shrink-0 text-brand">
              <LocalPromiseIcon mark={item.mark} className="h-full w-full" />
            </span>
          )}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100"
          />
        </div>

        <div className={cn("flex flex-1 gap-6 px-6 py-6", wide && "sm:px-7")}>
          {wide && (
            <span className="hidden h-14 w-14 shrink-0 text-brand sm:block">
              <LocalPromiseIcon mark={item.mark} className="h-full w-full" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="font-display text-[clamp(1rem,1.8vw,1.2rem)] font-extrabold uppercase leading-[1.18] text-snow">
              {item.title}
            </p>
            {head && <p className="mt-3 text-sm leading-relaxed text-fog">{head}</p>}
            {avoid && (
              <p
                className={cn(
                  "flex gap-3 border-l-2 border-brand pl-4 text-sm leading-relaxed text-snow",
                  head ? "mt-4" : "mt-3",
                )}
              >
                <span aria-hidden className="mt-0.5 shrink-0 text-brand">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                    <circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5.6 5.6l4.8 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <span>{avoid}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export function PromiseGrid({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  tail,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: Item[];
  tail: string;
}) {
  const tailRef = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const tailIn = useInView(tailRef, { once: true, margin: "-70px" });

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "contrast", label: "Four of the seven are things we will not do" }}
          className="mb-12"
        />

        <ul className="grid gap-5 sm:grid-cols-12">
          {items.map((item, i) => (
            <Card
              key={item.title}
              item={item}
              no={i + 1}
              span={SPANS[i] ?? 4}
              delay={0.04 * (i % 3)}
            />
          ))}
        </ul>

        <motion.p
          ref={tailRef}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced || tailIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-10 max-w-3xl border-t border-line pt-8 leading-relaxed text-fog"
        >
          {tail}
        </motion.p>
      </Container>
    </section>
  );
}

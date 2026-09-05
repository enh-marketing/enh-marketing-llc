"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The elements of an intelligent website, drawn as what they are: layers of
 *  one site rather than six features of six.
 *
 *  WHY A STACK. The heading is "The Main Elements of an Intelligent Website",
 *  and every one of the six is a property of the same website, not a product
 *  you could buy on its own. Personalised content sits on top of live data,
 *  which sits on a clear structure, which is what search and AI access reads,
 *  and performance and analytics run underneath all of it. Six cards would say
 *  "pick some". A stack says "this is what one of them is made of", which is
 *  what the section is actually claiming.
 *
 *  THE SEVENTH IS NOT A LAYER. "Customised to Your Business" is a heading in the
 *  same list, but it does not describe part of a website. It describes which of
 *  the other six you get, and the document proves it with three specific
 *  businesses and what each may need. So it is set apart, underneath, as the
 *  rule that governs the stack, with the document's own three examples printed
 *  as stated. None of them is matched to a layer, because the document does not
 *  match them either.
 *
 *  Hovering or focusing a layer lifts it out of the stack. Nothing is dimmed
 *  while it does: every layer stays fully legible, which is the difference
 *  between showing a reader something and taking the rest away from them. */
export function SiteLayers({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  depends,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  items: { no: string; title: string; body: string }[];
  depends: {
    title: string;
    lead: string;
    cases: { who: string; needs: string }[];
    closing: string;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = usePrefersReducedMotion();
  const [lifted, setLifted] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "progression", label: "One site, six layers" }}
          className="mb-12"
        />

        <div ref={ref} className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
          {/* The stack. Top of the list is the top of the site. */}
          <ol className="lg:sticky lg:top-28 lg:self-start">
            {items.map((el, i) => (
              <motion.li
                key={el.no}
                initial={reduced ? false : { opacity: 0, x: -18 }}
                animate={inView || reduced ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                onMouseEnter={() => setLifted(i)}
                onMouseLeave={() => setLifted(null)}
                onFocus={() => setLifted(i)}
                onBlur={() => setLifted(null)}
                tabIndex={0}
                className={`group relative -mt-3 flex items-center gap-4 rounded-[0.9rem] border px-5 py-4 outline-none transition-all duration-500 first:mt-0 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  lifted === i
                    ? "z-10 -translate-y-1 border-brand/55 bg-ink-3 shadow-[0_10px_28px_-16px_rgba(0,0,0,0.34)]"
                    : "border-line bg-ink-2"
                }`}
                style={{ marginLeft: `${i * 14}px` }}
              >
                <span
                  className={`font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 ${
                    lifted === i ? "text-brand-text" : "text-ash"
                  }`}
                >
                  {el.no}
                </span>
                <span className="font-display text-[0.9375rem] font-bold uppercase leading-tight text-snow sm:text-base">
                  {el.title}
                </span>
              </motion.li>
            ))}
          </ol>

          {/* What each layer actually is. All six present: a stack whose
              contents only appear on hover would hide the offer. */}
          <ol className="border-t border-line">
            {items.map((el, i) => (
              <li
                key={el.no}
                onMouseEnter={() => setLifted(i)}
                onMouseLeave={() => setLifted(null)}
                className={`border-b border-line py-5 transition-colors duration-500 ${
                  lifted === i ? "bg-ink-2" : ""
                }`}
              >
                <p
                  className={`font-display text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 ${
                    lifted === i ? "text-brand-text" : "text-ash"
                  }`}
                >
                  {el.title}
                </p>
                <p className="mt-2.5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">
                  {el.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* The rule that decides which of the six you get. */}
        <Rise delay={0.1} className="mt-16 border-t-2 border-line pt-10">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
            <div>
              <p className="font-display max-w-[16ch] text-[clamp(1.15rem,2.3vw,1.75rem)] font-extrabold uppercase leading-[1.15] text-brand">
                {depends.title}
              </p>
              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-fog">{depends.lead}</p>
            </div>

            {/* The document's own three, printed as stated. */}
            <ol>
              {depends.cases.map((c) => (
                <li key={c.who} className="border-b border-line py-4 first:border-t">
                  <p className="text-[1.0625rem] leading-snug text-snow">
                    <span className="font-display font-bold uppercase text-snow">{c.who}</span>{" "}
                    <span className="text-fog">may need {c.needs}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-9 max-w-[74ch] text-base leading-relaxed text-fog sm:text-lg">
            {depends.closing}
          </p>
        </Rise>
      </Container>
    </section>
  );
}

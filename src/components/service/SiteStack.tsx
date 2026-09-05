"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The plane, in isometric. One shape reused at six heights, so the stack is
   arithmetic rather than eyeballed. */
const W = 620;
const H = 520;
const PW = 300;
const PD = 132;
const CX = W / 2;
const TOP = 92;
const STEP = 62;

/** A plane at level i, drawn as a diamond seen from above and to the side. */
function plane(i: number, lift = 0) {
  const cy = TOP + i * STEP - lift;
  return `${CX},${cy - PD / 2} ${CX + PW / 2},${cy} ${CX},${cy + PD / 2} ${CX - PW / 2},${cy}`;
}

/** The elements of an intelligent website, drawn as the layers of one.
 *
 *  WHY A STACK, AND WHY IT HAS DEPTH. The heading is "The Main Elements of an
 *  Intelligent Website", and every one of the six is a property of the same
 *  site, not a product you could buy on its own. Personalised content sits on
 *  live data, which sits on a clear structure, which is what search and AI
 *  access reads, and performance and analytics run under all of it. Six cards
 *  say "pick some". An exploded stack says "this is what one is made of", which
 *  is the actual claim. The earlier version said it with a column of hairline
 *  rows, which is the same information with no body.
 *
 *  THE SEVENTH IS NOT A LAYER. "Customised to Your Business" is a heading in the
 *  same list but it does not describe part of a website: it decides which parts
 *  you get, and the document proves it with three specific businesses and what
 *  each may need. So it is set apart underneath as the rule that governs the
 *  stack, with those three printed as stated and matched to nothing, because the
 *  document matches them to nothing.
 *
 *  NOTHING IS DIMMED. Hovering a layer lifts it out of the stack; the others
 *  stay exactly as legible, which is the difference between showing a reader
 *  something and taking the rest away from them. */
export function SiteStack({
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
  const show = inView || reduced;
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

        <div ref={ref} className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
          {/* The stack. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden>
              {/* Painted bottom up, so the near planes sit over the far ones. */}
              {[...items].reverse().map((el, k) => {
                const i = items.length - 1 - k;
                const on = lifted === i;
                return (
                  <motion.g
                    key={el.no}
                    initial={reduced ? false : { opacity: 0, y: 26 }}
                    animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                    transition={{ duration: 0.55, ease: EASE, delay: (items.length - 1 - i) * 0.08 }}
                    onMouseEnter={() => setLifted(i)}
                    onMouseLeave={() => setLifted(null)}
                    style={{ cursor: "default" }}
                  >
                    {/* The edge, so each plane has a thickness. */}
                    {/* The edge under each plane, so it has a thickness and
                        casts onto the one below. */}
                    <polygon
                      points={plane(i, on ? 14 : 0)}
                      transform="translate(0 9)"
                      fill="var(--color-void)"
                      fillOpacity="0.22"
                    />
                    <polygon
                      points={plane(i, on ? 14 : 0)}
                      fill="var(--color-ink-3)"
                      stroke={on ? "var(--color-brand)" : "var(--color-ash)"}
                      strokeWidth={on ? 2.5 : 1.6}
                      strokeOpacity={on ? 1 : 0.55}
                      style={{ transition: "stroke 400ms, stroke-opacity 400ms" }}
                    />
                    {/* Deeper planes sit in more shade, so six white diamonds
                        on a near-white ground separate tonally instead of
                        reading as one flat pile of outlines. */}
                    <polygon
                      points={plane(i, on ? 14 : 0)}
                      fill="var(--color-void)"
                      fillOpacity={0.03 + i * 0.028}
                    />
                    {/* Something on the surface, so a plane reads as a plane. */}
                    <rect
                      x={CX - 62}
                      y={TOP + i * STEP - (on ? 14 : 0) - 5}
                      width="124"
                      height="9"
                      rx="4.5"
                      fill={on ? "var(--color-brand)" : "var(--color-ash)"}
                      fillOpacity={on ? 0.6 : 0.34}
                      style={{ transition: "fill 400ms" }}
                    />
                  </motion.g>
                );
              })}

              {/* The spine the courses are stacked on. */}
              <line
                x1={CX}
                y1={TOP - PD / 2 - 12}
                x2={CX}
                y2={TOP + (items.length - 1) * STEP + PD / 2 + 20}
                stroke="var(--color-line)"
                strokeWidth="1.5"
                strokeDasharray="5 7"
              />
              <rect
                className="ci-scan-y"
                x={CX - 3}
                y={TOP - PD / 2 - 12}
                width="6"
                height="18"
                rx="3"
                fill="var(--color-brand)"
                fillOpacity="0.55"
              />
            </svg>
          </div>

          {/* What each layer actually is. All six present: a stack whose
              contents only appear on hover would hide the offer. */}
          <ol className="border-t border-line">
            {items.map((el, i) => (
              <li
                key={el.no}
                onMouseEnter={() => setLifted(i)}
                onMouseLeave={() => setLifted(null)}
                className={cn(
                  "group border-b border-line py-5 transition-colors duration-500 motion-reduce:transition-none",
                  lifted === i ? "bg-ink-2" : "hover:bg-ink-2",
                )}
              >
                <div className="flex items-baseline gap-3.5">
                  <span
                    className={cn(
                      "font-display shrink-0 text-[0.625rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                      lifted === i ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                    )}
                  >
                    {el.no}
                  </span>
                  <p className="font-display text-[1.0625rem] font-bold uppercase leading-tight text-snow">
                    {el.title}
                  </p>
                </div>
                <p className="mt-2.5 max-w-[62ch] pl-7 text-[0.9375rem] leading-relaxed text-fog">
                  {el.body}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* The rule that decides which of the six you get. */}
        <Rise delay={0.1} className="mt-16 border-t-2 border-line pt-10">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
            <div>
              <p className="font-display max-w-[16ch] text-[clamp(1.3rem,2.7vw,2.05rem)] font-extrabold uppercase leading-[1.1] text-brand">
                {depends.title}
              </p>
              <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-fog">{depends.lead}</p>
            </div>

            {/* The document's own three, printed as stated and matched to
                nothing, because the document matches them to nothing. */}
            <ol className="grid gap-px overflow-hidden rounded-[1.25rem] border border-line bg-line">
              {depends.cases.map((c) => (
                <li key={c.who} className="group bg-ink-2 px-6 py-5 transition-colors duration-500 hover:bg-ink-3 motion-reduce:transition-none">
                  <p className="font-display text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-brand-text">
                    {c.who}
                  </p>
                  <p className="mt-2 max-w-[46ch] text-[1.0625rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                    may need {c.needs}
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

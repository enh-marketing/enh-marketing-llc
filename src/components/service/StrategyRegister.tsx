"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";

/** "Why Choose ENH Marketing for Hospitality Digital Marketing?" — one position
 *  first, then the six that follow from it.
 *
 *  WHY THE FIRST CLAIM IS NOT THE SAME SIZE AS THE OTHER SIX. "We begin with
 *  the guest action the business needs, whether that is a booking, reservation,
 *  call, message or visit." That is the only one of the seven that says where
 *  the work STARTS; every other claim is a consequence of starting there.
 *  Setting all seven at one weight — which two earlier versions of this section
 *  did, once as numbered rows and once as seven equal cells with invented
 *  diagrams in them — flattens the argument into a list of features.
 *
 *  So it takes a panel of its own, at the scale of a statement, with its five
 *  outcomes carrying brand. The six that follow are a ledger underneath it:
 *  flat, no surface, two columns, each row led by a rule that fills as the
 *  reader crosses it. One raised block against six flat rows is the hierarchy
 *  the document already has.
 *
 *  THE SPECIFICS ARE THE POINT, AND THEY ARE WHAT BOTH EARLIER VERSIONS LOST.
 *  Every claim carries its own list — five outcomes, four local surfaces, three
 *  channels — and those are what a buyer is reading for. They are marked where
 *  they stand rather than lifted out, at weight rather than in colour, because
 *  six rows of red is the same mistake as no emphasis at all.
 *
 *  No illustration. The panel and the ledger are the design. */

const EASE = [0.16, 1, 0.3, 1] as const;

export function StrategyRegister({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  items,
  itemMarks,
  tail,
  tailMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  /** What the seven add up to: five disciplines, one strategy. */
  lead: string;
  leadMark: string[];
  items: string[];
  /** Per claim, the phrases inside it that carry its specifics. Indexed
   *  against `items`. */
  itemMarks: string[][];
  tail: string;
  tailMark: string[];
}) {
  const first = items[0];
  const rest = items.slice(1);
  const panel = useRef<HTMLDivElement>(null);

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = panel.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <p className="statement text-balance text-snow">
              <Marked text={lead} mark={leadMark} className="text-brand" />
            </p>
          }
          className="mb-14"
        />

        {/* ---- Where the work starts ---- */}
        {first && (
          <motion.div
            ref={panel}
            onPointerMove={track}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.75, ease: EASE }}
            className="group relative isolate overflow-hidden rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] p-7 transition-colors duration-500 hover:border-brand/50 motion-reduce:transition-none sm:p-10"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
              style={{
                background:
                  "radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(232,0,13,0.15), transparent 70%)",
              }}
            />
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
            <span
              aria-hidden
              className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full motion-reduce:transition-none"
            />

            <div className="grid gap-7 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-12">
              <span
                aria-hidden
                className="font-display text-[clamp(3.25rem,7vw,5.5rem)] font-extrabold leading-[0.8] text-stroke opacity-40 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
              >
                01
              </span>
              <p className="font-display max-w-4xl text-[clamp(1.25rem,2.9vw,2.15rem)] font-extrabold uppercase leading-[1.14] text-snow">
                <Marked text={first} mark={itemMarks[0] ?? []} className="text-brand" />
              </p>
            </div>
          </motion.div>
        )}

        {/* ---- And the six that follow from it ---- */}
        <ol className="mt-4 grid border-t border-line lg:mt-5 lg:grid-cols-2">
          {rest.map((claim, k) => {
            const i = k + 1;
            return (
              <li
                key={claim}
                className={cn(
                  "group border-b border-line",
                  k % 2 === 1 && "lg:border-l lg:border-line",
                )}
              >
                <Rise delay={Math.min(k, 4) * 0.05}>
                  <div className="relative flex gap-5 py-7 pl-6 lg:px-8 lg:py-8">
                    {/* A rule that fills as the reader crosses the row. */}
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 top-0 w-[2px] origin-top scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 motion-reduce:transition-none lg:left-0"
                    />
                    <span
                      aria-hidden
                      className="font-display shrink-0 pt-1 text-[0.68rem] font-bold tabular-nums text-ash transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display text-[clamp(1rem,1.6vw,1.2rem)] font-extrabold uppercase leading-[1.26] text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                      <Marked text={claim} mark={itemMarks[i] ?? []} className="text-snow" />
                    </p>
                  </div>
                </Rise>
              </li>
            );
          })}
        </ol>

        <Rise delay={0.14} className="mt-12">
          <p className="max-w-3xl border-l-2 border-brand pl-6 text-base leading-relaxed text-fog sm:pl-8 sm:text-lg">
            <Marked text={tail} mark={tailMark} className="font-semibold text-snow" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

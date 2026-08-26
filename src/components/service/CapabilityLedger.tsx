"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Capability = { no: string; title: string; body: string; href?: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** A ledger, not a card grid.
 *
 *  The source list is seven capabilities whose descriptions run from 47 to 167
 *  characters — a 3.6x spread. An equal-height card grid forces equal visual
 *  weight onto unequal content and leaves ragged dead space under the short
 *  ones. Full-width rows let height follow the writing: the one-clause entries
 *  read as one-clause entries, and nothing is padded to match its neighbour.
 *
 *  Marked up as a definition list, because that is what it is: a term and its
 *  definition. */
export function CapabilityLedger({
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
  items: Capability[];
}) {
  return (
    <section id={id} data-section={label} className="relative py-24 sm:py-32">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Seven capabilities in one account" }}
          className="mb-16"
        />

        <dl className="border-t border-line">
          {items.map((item, i) => {
            const Row = (
              <>
                {/* Index gutter */}
                <span className="font-display text-sm font-bold tabular-nums text-fog transition-colors duration-500 group-hover:text-brand">
                  {item.no}
                </span>

                <dt className="font-display text-lg font-extrabold uppercase leading-[1.15] tracking-tight text-snow sm:text-xl">
                  {item.title}
                  {item.href && (
                    <span
                      aria-hidden
                      className="ml-2 inline-block text-brand opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    >
                      ↓
                    </span>
                  )}
                </dt>

                <dd className="leading-relaxed text-fog">{item.body}</dd>
              </>
            );

            const shell =
              "grid grid-cols-[2rem_1fr] items-baseline gap-x-5 gap-y-3 py-7 lg:grid-cols-[3rem_minmax(0,17rem)_1fr] lg:gap-x-10 lg:py-8";

            return (
              <motion.div
                key={item.no}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.05, ease: EASE }}
                className="group relative border-b border-line"
              >
                {/* Row wash and left rule, both on hover. */}
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`${shell} transition-colors duration-500 hover:bg-ink-2/60`}
                  >
                    {Row}
                  </Link>
                ) : (
                  <div className={`${shell} transition-colors duration-500 hover:bg-ink-2/60`}>
                    {Row}
                  </div>
                )}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
              </motion.div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}

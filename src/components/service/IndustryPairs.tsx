"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetaMark } from "@/components/service/MetaMark";
import { Marked } from "@/components/service/Marked";

/** The industries, drawn as the pairs the document actually wrote.
 *
 *  WHAT IS ACTUALLY THERE. Every one of the ten entries is two things joined:
 *  technology and software, property and real estate, government and corporate
 *  teams. Ten entries, twenty terms, and not one of them stands alone. A row of
 *  cards hides that; so does a comma-separated run, which is what this section
 *  was. So the conjunction becomes the layout: the first term on one side, the
 *  second on the other, and the document's own "and" holding the two apart in
 *  a gutter of ten joins that reads as a single column down the page.
 *
 *  NOTHING IS SORTED, RANKED OR CLASSIFIED. The closing note says technical,
 *  financial and regulated subjects may need extra review, and it would be easy
 *  to turn that into three buckets and drop the ten entries into them. That
 *  assignment is not in the document. Deciding here which of a client's sectors
 *  counts as regulated would be us making a claim on their behalf, so the note
 *  stays what it is: a qualifier on the whole list.
 *
 *  SPLIT AT RENDER, NOT IN THE CONTENT FILE. The content keeps each entry as
 *  the one string the document wrote. Splitting it there would leave single
 *  words like "training" and "Education" standing on their own, and half of
 *  them appear elsewhere on this page. The split happens on the only " and "
 *  in each entry, and the two halves plus the word between them read back as
 *  the original line.
 *
 *  MOTION. Rows arrive on a stagger; the join draws out from the centre on
 *  hover. Transform only, and every row rests fully readable. */

const EASE = [0.16, 1, 0.3, 1] as const;

export function IndustryPairs({
  id,
  label,
  index,
  title,
  strokeTitle,
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
  items: string[];
  /** The qualifier the document attaches to the list rather than to any entry. */
  note: string;
  /** The part of the note that says which subjects it is about. */
  noteMark: string;
}) {
  /* A reader who asked for no motion gets the list where it already is. */
  const reduced = useReducedMotion();

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          markNode={<MetaMark variant="reach" />}
          className="mb-12"
        />

        <ol className="border-t border-line">
          {items.map((entry, i) => {
            const at = entry.indexOf(" and ");
            const left = at < 0 ? entry : entry.slice(0, at);
            const right = at < 0 ? "" : entry.slice(at + 5);
            return (
              <motion.li
                key={entry}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
                className="group border-b border-line"
              >
                <div className="flex items-center gap-4 py-5 sm:gap-6">
                  <span
                    aria-hidden
                    className="w-8 shrink-0 text-xs font-semibold tabular-nums text-brand-text transition-colors duration-300 group-hover:text-brand sm:w-10"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p className="font-display flex min-w-0 flex-1 flex-wrap items-center gap-x-3 text-[clamp(1.05rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.15] lg:grid lg:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] lg:gap-x-0">
                    <span className="text-snow transition-colors duration-400 group-hover:text-brand lg:text-right">
                      {left}
                    </span>

                    {/* The join. Drawn only where there is room for it; the word
                        itself is the document's and stays at every width. */}
                    <span className="relative flex items-center justify-center gap-2">
                      <span
                        aria-hidden
                        className="hidden h-px w-6 origin-right bg-line transition-all duration-500 group-hover:bg-brand lg:block"
                      />
                      <span className="text-[0.66em] font-bold normal-case text-ash transition-colors duration-400 group-hover:text-brand">
                        and
                      </span>
                      <span
                        aria-hidden
                        className="hidden h-px w-6 origin-left bg-line transition-all duration-500 group-hover:bg-brand lg:block"
                      />
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-line transition-colors duration-500 group-hover:bg-brand lg:block"
                      />
                      <span
                        aria-hidden
                        className="absolute right-0 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-line transition-colors duration-500 group-hover:bg-brand lg:block"
                      />
                    </span>

                    <span className="text-fog transition-colors duration-400 group-hover:text-snow">
                      {right}
                    </span>
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* The qualifier on the whole list, never on one entry. */}
        <div className="mt-10 flex max-w-3xl gap-5 rounded-2xl border border-line bg-ink-3 px-6 py-6">
          <span aria-hidden className="mt-0.5 shrink-0 text-brand">
            <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none">
              <path
                d="M8 5h11l5 5v17a2 2 0 01-2 2H8a2 2 0 01-2-2V7a2 2 0 012-2z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M19 5v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path
                d="M11 20l3.2 3.2L22 15.6"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-dash"
              />
            </svg>
          </span>
          <p className="text-sm leading-relaxed text-ash">
            <Marked text={note} mark={noteMark} className="font-semibold text-snow" />
          </p>
        </div>
      </Container>
    </section>
  );
}

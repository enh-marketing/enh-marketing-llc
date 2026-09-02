"use client";

import { motion } from "motion/react";
import { Rise } from "@/components/fx/Reveal";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Synthesis } from "@/components/service/Synthesis";

type Row = { area: string; performance: string; digital: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Two-way comparison.
 *
 *  The left column is rendered as one continuous elevated panel because it is
 *  the subject of the page, NOT because it wins: the closing copy says
 *  performance marketing works best as part of a wider digital strategy, so the
 *  second column stays fully legible rather than being greyed out.
 *
 *  A real <table> with row headers, styled with border-separate so the panel
 *  can carry rounded corners and a continuous background. */
export function ComparisonTable({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  columns,
  rows,
  synthesis,
  outro,
  markNode,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lede: string;
  columns: [string, string];
  rows: Row[];
  /** The Performance Marketing page's convergence composition. */
  synthesis?: { premise: string; roleA: string; roleB: string; outcome: string };
  /** A single closing statement, where the content is one paragraph. */
  outro?: string;
  /** Overrides the generic mark, for a page bringing its own. */
  markNode?: ReactNode;
}) {
  return (
    <section id={id} data-section={label} className="relative py-16 sm:py-20">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          lede={lede}
          markNode={markNode}
          mark={{ variant: "contrast", label: "Two channels, opposite jobs" }}
          className="mb-16"
        />

        {/* Desktop */}
        <div className="hidden md:block">
          <table className="w-full border-separate border-spacing-0 text-left">
            <caption className="sr-only">
              {columns[0]} compared with {columns[1]}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[17%] pb-6 pr-8 align-bottom">
                  <span className="text-[11px] font-semibold uppercase text-ash">
                    Area
                  </span>
                </th>
                <th scope="col" className="w-[41.5%] px-8 pb-6 align-bottom">
                  <span className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <span className="font-display text-base font-extrabold uppercase text-brand">
                      {columns[0]}
                    </span>
                  </span>
                </th>
                <th scope="col" className="w-[41.5%] pb-6 pl-8 align-bottom">
                  <span className="font-display text-base font-extrabold uppercase text-fog">
                    {columns[1]}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const first = i === 0;
                const last = i === rows.length - 1;
                return (
                  <motion.tr
                    key={row.area}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                    className="group align-top"
                  >
                    {/* Rail */}
                    <th scope="row" className="border-t border-line py-7 pr-8 text-left">
                      <span className="font-display block text-[11px] font-bold tabular-nums text-ash transition-colors duration-300 group-hover:text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display mt-2 block text-sm font-bold uppercase text-snow">
                        {row.area}
                      </span>
                    </th>

                    {/* Subject column: one continuous panel down the table */}
                    <td
                      className={[
                        "relative bg-ink-2 px-8 py-7 leading-relaxed text-snow transition-colors duration-300 group-hover:bg-ink-3",
                        first ? "rounded-t-2xl" : "",
                        last ? "rounded-b-2xl" : "border-b border-line/50",
                      ].join(" ")}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                      />
                      {row.performance}
                    </td>

                    {/* Context column */}
                    <td className="border-t border-line py-7 pl-8 leading-relaxed text-fog transition-colors duration-300 group-hover:text-snow">
                      {row.digital}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per row, subject block elevated the same way */}
        <div className="space-y-4 md:hidden">
          {rows.map((row, i) => (
            <motion.div
              key={row.area}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
              className="border-t border-line pt-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[11px] font-bold tabular-nums text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-sm font-bold uppercase text-snow">
                  {row.area}
                </h3>
              </div>

              <div className="mt-4 rounded-2xl border-l-2 border-brand bg-ink-2 p-5">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase text-brand">
                  <span className="h-1 w-1 rounded-full bg-brand" />
                  {columns[0]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-snow">{row.performance}</p>
              </div>

              <div className="mt-3 pl-5">
                <p className="text-[11px] font-semibold uppercase text-ash">
                  {columns[1]}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fog">{row.digital}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {synthesis && <Synthesis {...synthesis} />}

        {outro && (
          <Rise delay={0.1} className="mt-16">
            <p className="font-display mx-auto max-w-3xl border-t border-line pt-10 text-center text-[clamp(1.05rem,1.9vw,1.5rem)] font-bold leading-snug text-snow">
              {outro}
            </p>
          </Rise>
        )}
      </Container>
    </section>
  );
}

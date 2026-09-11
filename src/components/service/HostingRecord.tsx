"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { MarkedKeys } from "@/components/service/MarkedKeys";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Clause } from "@/content/services/web-hosting";

/** Twelve clauses, and the three questions the document says they answer.
 *
 *  THE SORT IS THE DOCUMENT'S AND IT IS PRINTED, which is rule 3: where a
 *  section sorts its items, the clause the sort was read from goes on the page
 *  so the arrangement is checkable rather than a taste decision. The closing
 *  sentence is "This gives your business a clear record of where the website is
 *  hosted, what is being managed and who to contact when something needs
 *  attention." Three questions, and every one of the twelve clauses answers
 *  exactly one of them.
 *
 *  THE THREE PHRASES ARE THE KEY, NOT THREE COLUMN HEADINGS. Printing them
 *  twice, once in the sentence and once above the fields, would put the same
 *  words on the page twice, which is the thing `Marked` exists to avoid. So
 *  they stay inside the sentence and become its controls: pointing at one
 *  raises the field it names. At rest all three fields are lit, which is what
 *  the sentence claims.
 *
 *  THE MIDDLE FIELD IS TWICE THE LENGTH OF THE OTHER TWO AND THAT IS THE
 *  DRAWING. Three clauses say where the site lives, six say what is being
 *  managed, three say who holds which part. Nobody arranged that: it is the
 *  shape of a hosting proposal, and forcing the three fields to equal height
 *  would have hidden the one honest proportion in the section.
 *
 *  NOT A CARD GRID. One record with three ruled fields inside it, because these
 *  are clauses of a single document rather than twelve features. The card
 *  section is section 02 and running a second one here is how a page starts
 *  reading as a template.
 *
 *  NO FIGURE. The clauses name storage, retention, renewal terms and fees, and
 *  not one of them carries a number: the document defers every one to the
 *  proposal itself. */

const GROUPS = ["where", "what", "who"] as const;

/** One mark per field. No labels: the sentence above the record is the key, and
 *  three glyphs are three places for the eye to land rather than three things
 *  to learn. */
function FieldMark({ group }: { group: (typeof GROUPS)[number] }) {
  const ASH = "var(--color-ash)";
  const BRAND = "var(--color-brand)";
  const LINE = "var(--color-line)";
  if (group === "where") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden className="h-11 w-11">
        <rect x="12" y="6" width="16" height="10" rx="2" stroke={ASH} strokeWidth="1.4" fill="none" />
        <line x1="4" y1="22" x2="36" y2="22" stroke={BRAND} strokeWidth="1.6" />
        <line x1="4" y1="28" x2="36" y2="28" stroke={LINE} strokeWidth="1.2" strokeDasharray="3 4" />
        <line x1="4" y1="34" x2="36" y2="34" stroke={LINE} strokeWidth="1.2" strokeDasharray="3 4" />
      </svg>
    );
  }
  if (group === "what") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden className="h-11 w-11">
        <circle cx="20" cy="10" r="5" stroke={BRAND} strokeWidth="1.5" fill="none" />
        <path d="M20 15 V 22" stroke={ASH} strokeWidth="1.3" />
        <line x1="6" y1="22" x2="34" y2="22" stroke={ASH} strokeWidth="1.3" />
        {[9, 19, 29].map((x) => (
          <rect key={x} x={x - 3} y="26" width="6" height="9" rx="1.5" stroke={LINE} strokeWidth="1.2" fill="none" />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" aria-hidden className="h-11 w-11">
      <circle cx="10" cy="20" r="5.5" stroke={ASH} strokeWidth="1.4" fill="none" />
      <circle cx="30" cy="20" r="5.5" stroke={BRAND} strokeWidth="1.5" fill="none" />
      <path d="M15.5 20 H 24.5" stroke={ASH} strokeWidth="1.3" strokeDasharray="3 3" />
      <path d="M10 8 V 3 M30 8 V 3" stroke={LINE} strokeWidth="1.2" />
    </svg>
  );
}

/** The record's shape in miniature: one sheet, three fields, the middle one
 *  twice as deep as the other two because six of the twelve clauses answer its
 *  question. Same device as section 01's mark and the maintenance page's
 *  scope-edge mark: the arrangement drawn small beside the heading it belongs
 *  to. */
function RecordMark() {
  return (
    <div className="hidden shrink-0 lg:block">
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="One sheet divided into three fields, the middle field twice as deep as the two either side of it, each carrying ruled entries."
        className="h-[clamp(9rem,14vw,13rem)] w-[clamp(9rem,14vw,13rem)] overflow-visible"
      >
        <rect x="26" y="16" width="148" height="168" rx="6" stroke="var(--color-line)" strokeWidth="1.4" fill="none" />
        <line x1="26" y1="58" x2="174" y2="58" stroke="var(--color-line)" strokeWidth="1.2" />
        <line x1="26" y1="142" x2="174" y2="142" stroke="var(--color-line)" strokeWidth="1.2" />
        {[34, 44, 76, 86, 96, 106, 116, 160, 170].map((y, i) => (
          <g key={y}>
            <rect x={42} y={y} width="6" height="6" rx="1.5" fill="var(--color-brand)" opacity={i === 2 ? 1 : 0.45} />
            <line x1="56" y1={y + 3} x2={i % 3 === 0 ? 150 : i % 3 === 1 ? 132 : 142} y2={y + 3} stroke="var(--color-ash)" strokeWidth="1.2" opacity="0.65" />
          </g>
        ))}
        <line x1="26" y1="16" x2="174" y2="16" stroke="var(--color-brand)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function HostingRecord({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  statesLead,
  items,
  record,
  recordMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string;
  statesLead: string;
  items: Clause[];
  record: string;
  recordMark: readonly string[];
}) {
  /** Null is all three fields, which is what the sentence claims. */
  const [pick, setPick] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-20 sm:py-24">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} markNode={<RecordMark />}>
          <Rise delay={0.25} className="mt-7">
            <p className="max-w-3xl font-display text-xl font-extrabold uppercase leading-[1.18] text-snow sm:text-2xl">
              <Marked text={lead} mark={leadMark} className="text-brand" />
            </p>
          </Rise>
        </SectionHeader>

        {/* The sort, printed, and the record's key. */}
        <Rise className="mt-14 lg:mt-16">
          <div className="grid gap-8 border-b border-line pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-16">
            <p className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-text">
              {statesLead}
            </p>
            <p className="max-w-2xl leading-relaxed text-fog">
              <MarkedKeys
                  text={record}
                  keys={recordMark}
                  active={pick}
                  onPick={setPick}
                  className="inline font-semibold text-brand-text"
                  activeClassName="inline font-semibold text-brand"
                />
            </p>
          </div>
        </Rise>

        {/* One record, three fields, stacked. Side by side they would have to
            share a row height, which left the two three-clause fields with two
            hundred pixels of nothing under them while the six-clause field set
            the height. Stacked, the middle field is simply twice as deep as the
            others, which is the one honest proportion in the section. */}
        <Rise delay={0.12} className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-2">
            {GROUPS.map((group, g) => {
              const clauses = items.filter((c) => c.answers === group);
              const on = pick === null || pick === g;
              return (
                <div
                  key={group}
                  data-first-tick
                  className={cn(
                    "grid gap-6 border-b border-line p-6 transition-opacity duration-500 last:border-b-0 sm:p-8 lg:grid-cols-[13rem_1fr] lg:gap-10 motion-reduce:transition-none",
                    on ? "opacity-100" : "opacity-40",
                  )}
                >
                  <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-start lg:justify-start lg:gap-4">
                    <span className="font-display text-[2.75rem] font-extrabold leading-none text-stroke lg:text-[3.5rem]">
                      {String(g + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 transition-colors duration-500 motion-reduce:transition-none",
                        on ? "text-fog" : "text-ash",
                      )}
                    >
                      <FieldMark group={group} />
                    </span>
                  </div>

                  <ul className="grid sm:grid-cols-2 sm:gap-x-10 xl:grid-cols-3">
                    {clauses.map((c, i) => (
                      <li
                        key={c.no}
                        className="group flex items-start gap-4 border-t border-line py-4 transition-colors duration-500 motion-reduce:transition-none"
                      >
                        <span aria-hidden className="relative mt-1.5 h-2.5 w-2.5 shrink-0">
                          <span className="absolute inset-0 rounded-[2px] border border-ash/70" />
                          <span
                            className="absolute inset-[3px] rounded-[1px] bg-brand ci-blink"
                            style={{ animationDelay: `${(i * 6) / Math.max(clauses.length, 1)}s` }}
                          />
                        </span>
                        <span className="text-[0.9375rem] leading-relaxed text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                          {c.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Rise>

      </Container>
    </section>
  );
}

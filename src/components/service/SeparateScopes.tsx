"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { Scope } from "@/content/services/web-hosting";

/** Five services that touch one website, and the fact that they are five.
 *
 *  THE DOCUMENT'S OWN SENTENCE IS THE BRIEF, and it is a warning rather than a
 *  map: "Hosting, website maintenance and domain management are connected, but
 *  they are not the same service." So the five are drawn as five separate
 *  artefacts standing apart on one ground, never as five regions of one shape.
 *  Lighting one lights nothing else, and that is the claim: the reader can test
 *  it by pointing.
 *
 *  THE CONTROL IS THE NEXT SENTENCE. "These services can be combined when
 *  required." Combining is the one thing the document says the reader can ask
 *  for, so it is the one thing this section lets them do: each row ties into a
 *  single proposal, and the ties accumulate. Web Hosting is tied on arrival,
 *  because that is the page they are on; everything else is a decision.
 *
 *  WHAT THE TIE DOES NOT SAY. No price, no tier, no recommended bundle. The
 *  sentence under the drawing is the document's own and it is the honest
 *  answer to "so what do I get": the proposal states what is included, who
 *  manages each part and which third-party fees are charged separately.
 *
 *  THE TABLE IS STILL A TABLE. The source supplies two column headers, so they
 *  are rendered, and every row is readable with nothing held, nothing hovered
 *  and no JavaScript at all. The lighting is an enhancement over content that
 *  is already complete. */

const LINE = "var(--color-line)";
const ASH = "var(--color-ash)";
const BRAND = "var(--color-brand)";

/** Five artefacts, five shapes. None of them shares an outline with another,
 *  because sharing one would draw the thing the sentence denies. */
function Artefact({ plate, on }: { plate: Scope["plate"]; on: boolean }) {
  const ink = on ? BRAND : ASH;
  const soft = on ? BRAND : LINE;
  switch (plate) {
    case "hosting":
      return (
        <svg viewBox="0 0 100 62" aria-hidden className="h-full w-full">
          <rect x="30" y="10" width="40" height="18" rx="2" stroke={soft} strokeWidth="1.2" fill="var(--color-ink-3)" />
          <line x1="8" y1="34" x2="92" y2="34" stroke={ink} strokeWidth="1.4" />
          <rect x="8" y="34" width="84" height="22" fill="url(#wh-plate-hatch)" />
          <line x1="8" y1="44" x2="92" y2="44" stroke={soft} strokeWidth="0.9" strokeDasharray="3 4" />
        </svg>
      );
    case "maintenance":
      return (
        <svg viewBox="0 0 100 62" aria-hidden className="h-full w-full">
          <rect x="16" y="8" width="68" height="46" rx="3" stroke={soft} strokeWidth="1.2" fill="var(--color-ink-3)" />
          <rect x="23" y="15" width="22" height="3" rx="1.5" fill={ink} opacity="0.8" />
          <rect x="23" y="24" width="40" height="2.4" rx="1.2" fill={LINE} />
          <rect x="23" y="31" width="30" height="2.4" rx="1.2" fill={LINE} />
          <rect x="23" y="39" width="22" height="10" rx="2" stroke={ink} strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
          <rect x="53" y="39" width="22" height="10" rx="2" fill={ink} opacity="0.35" />
        </svg>
      );
    case "domain":
      return (
        <svg viewBox="0 0 100 62" aria-hidden className="h-full w-full">
          <rect x="14" y="10" width="52" height="42" rx="3" stroke={soft} strokeWidth="1.2" fill="var(--color-ink-3)" />
          {[18, 27, 36, 45].map((y) => (
            <g key={y}>
              <rect x="20" y={y} width="12" height="2.4" rx="1.2" fill={ink} opacity="0.7" />
              <rect x="36" y={y} width="24" height="2.4" rx="1.2" fill={LINE} />
            </g>
          ))}
          <circle cx="78" cy="31" r="11" stroke={ink} strokeWidth="1.3" fill="none" strokeDasharray="4 4" />
          <path d="M78 20 l4 4 l-4 4" stroke={ink} strokeWidth="1.3" fill="none" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 100 62" aria-hidden className="h-full w-full">
          {[8, 26, 44].map((y, i) => (
            <g key={y}>
              <rect x="20" y={y} width="60" height="14" rx="2" stroke={i === 1 ? ink : soft} strokeWidth="1.2" fill="var(--color-ink-3)" />
              <path d={`M20 ${y} L50 ${y + 9} L80 ${y}`} stroke={i === 1 ? ink : soft} strokeWidth="1.1" fill="none" />
            </g>
          ))}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 62" aria-hidden className="h-full w-full">
          <path d="M62 12 H 22 A3 3 0 0 0 19 15 V 47 A3 3 0 0 0 22 50 H 62" stroke={soft} strokeWidth="1.2" fill="none" />
          <path d="M66 12 H 82 M66 50 H 82" stroke={ink} strokeWidth="1.2" strokeDasharray="4 4" fill="none" />
          <line x1="30" y1="12" x2="30" y2="50" stroke={LINE} strokeWidth="1" />
          <line x1="19" y1="31" x2="62" y2="31" stroke={LINE} strokeWidth="1" />
          <rect x="68" y="24" width="14" height="14" rx="2" fill={ink} opacity="0.35" />
        </svg>
      );
  }
}

export function SeparateScopes({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  columns,
  rows,
  combine,
  states,
  statesMark,
  anchor,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lede: string;
  columns: [string, string];
  rows: Scope[];
  combine: string;
  states: string;
  statesMark: string[];
  /** The one label on the drawing, verbatim from `states`. */
  anchor: string;
}) {
  /** Web Hosting is tied on arrival: it is the page the reader is on. */
  const [held, setHeld] = useState<number[]>([0]);
  const [peek, setPeek] = useState<number | null>(null);

  const toggle = (i: number) =>
    setHeld((h) => (h.includes(i) ? h.filter((n) => n !== i) : [...h, i]));

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container>
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} lede={lede} />

        {/* The five, standing apart. */}
        <Rise delay={0.1} className="mt-14 lg:mt-16">
          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-5">
              {rows.map((row, i) => {
                const on = held.includes(i);
                const lit = on || peek === i;
                return (
                  <div
                    key={row.no}
                    className={cn(
                      "rounded-xl border bg-ink-2 px-4 py-4 transition-colors duration-500 motion-reduce:transition-none",
                      on ? "border-brand/55 bg-ink-3" : lit ? "border-ash/60" : "border-line",
                      i === 4 && "col-span-2 sm:col-span-1",
                    )}
                  >
                    <div className="h-[76px] w-full">
                      <Artefact plate={row.plate} on={lit} />
                    </div>
                    <p
                      className={cn(
                        "mt-3 font-display text-[0.6875rem] font-extrabold uppercase leading-tight transition-colors duration-500 motion-reduce:transition-none",
                        lit ? "text-snow" : "text-ash",
                      )}
                    >
                      {row.service}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* What has been tied into one proposal. */}
            <svg
              aria-hidden
              viewBox="0 0 1000 96"
              preserveAspectRatio="none"
              className="hidden h-[96px] w-full sm:block"
            >
              {rows.map((row, i) => {
                const x = 100 + i * 200;
                const on = held.includes(i);
                return (
                  <g key={row.no}>
                    <path
                      d={`M${x} 0 V 30 C ${x} 68, 500 62, 500 96`}
                      stroke={on ? BRAND : LINE}
                      strokeWidth={on ? 1.6 : 1.1}
                      strokeDasharray={on ? undefined : "5 6"}
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      className="transition-[stroke] duration-500 motion-reduce:transition-none"
                    />
                    {on && (
                      <path
                        d={`M${x} 0 V 30 C ${x} 68, 500 62, 500 96`}
                        pathLength="100"
                        stroke={BRAND}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                        className="ci-flow"
                        style={{ animationDelay: `${i * 0.3}s` }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Below sm the ties are hidden, so one short tie keeps the anchor
                from reading as a loose button. */}
            <span
              aria-hidden
              className="mx-auto mt-5 mb-2 block h-8 w-px border-l border-dashed border-brand/55 sm:hidden"
            />
            <div className="mx-auto w-full max-w-sm rounded-xl border border-brand/45 bg-ink-3 px-6 py-4 text-center">
              <p className="font-display text-xs font-extrabold uppercase tracking-wide text-brand-text">
                {anchor}
              </p>
            </div>
          </div>
        </Rise>

        {/* The document's table, with its own headers, and the rows as the
            control. Complete and readable with nothing held. */}
        <Rise delay={0.15} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-2">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{lede}</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase text-ash sm:px-8">
                    {columns[0]}
                  </th>
                  <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase text-ash sm:px-8">
                    {columns[1]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const on = held.includes(i);
                  return (
                    <tr
                      key={row.no}
                      onPointerEnter={() => setPeek(i)}
                      onPointerLeave={() => setPeek(null)}
                      className={cn(
                        "group border-b border-line last:border-b-0 transition-colors duration-500 motion-reduce:transition-none",
                        on ? "bg-ink-3" : "hover:bg-ink-3/50",
                      )}
                    >
                      <th scope="row" className="px-5 py-5 align-top sm:px-8">
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(i)}
                          onFocus={() => setPeek(i)}
                          onBlur={() => setPeek(null)}
                          className="flex items-start gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-300 motion-reduce:transition-none",
                              on ? "border-brand bg-brand" : "border-ash group-hover:border-brand/70",
                            )}
                          >
                            <span className={cn("block h-1.5 w-1.5 rounded-[1px] bg-white transition-opacity duration-300", on ? "opacity-100" : "opacity-0")} />
                          </span>
                          <span
                            className={cn(
                              "font-display text-sm font-extrabold uppercase leading-tight transition-colors duration-500 sm:text-base motion-reduce:transition-none",
                              on ? "text-snow" : "text-fog group-hover:text-snow",
                            )}
                          >
                            {row.service}
                          </span>
                        </button>
                      </th>
                      <td className="px-5 py-5 align-top text-sm leading-relaxed text-fog sm:px-8">
                        {row.covers}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Rise>

        <Rise delay={0.2} className="mt-10 grid gap-6 border-t border-line pt-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <p className="font-display text-lg font-extrabold uppercase leading-[1.2] text-snow sm:text-xl">
            {combine}
          </p>
          <p className="max-w-2xl leading-relaxed text-fog">
            <Marked text={states} mark={statesMark} className="font-semibold text-brand-text" />
          </p>
        </Rise>
      </Container>
    </section>
  );
}

"use client";

import { useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

/** Nine conditions, and a dial that answers to the reader rather than to us.
 *
 *  WHY THIS IS INTERACTIVE AND NOTHING ELSE ON THE PAGE IS. Every other section
 *  here is about what we do. This one is a question about the reader's own
 *  website — "An ongoing maintenance plan can be useful for:" followed by nine
 *  conditions — and it ends by refusing to upsell: "We recommend the arrangement
 *  that matches the actual workload rather than adding unnecessary monthly
 *  work." A static bullet list makes the reader do that arithmetic in their
 *  head. Ticking the ones that apply to them is the section, and the needle is
 *  their own answer coming back.
 *
 *  THE DIAL IS DRAWN, NOT NUMBERED. No score, no percentage, no reading, no
 *  verdict text — this document contains no figure of any kind and it is
 *  emphatic that the arrangement comes out of a review, not a calculator. What
 *  the two ends of the arc carry is a difference in *kind*: the light end is
 *  drawn as separated marks, because scheduled reviews and one-off support
 *  happen at intervals; the heavy end is one unbroken band, because an ongoing
 *  plan does not stop. The needle sits between them.
 *
 *  NOTHING IS GATED BEHIND THE INTERACTION. All nine conditions are readable
 *  text in the markup, both closing sentences are printed whatever the reader
 *  does, and the dial is decorative to assistive technology. The controls are
 *  real checkboxes, so the keyboard gets them for nothing. */

const R = 118;
const CX = 150;
const CY = 150;

/** Two decimals, and never a raw double.
 *
 *  An unrounded trig result is a hydration mismatch waiting to happen: the
 *  server and the browser do not always print the same final digit, and React
 *  discards the whole island rather than patching one attribute — which on this
 *  site costs the entire route its interactivity, not one tick mark. Rounded at
 *  the point the geometry is generated, so no call site can forget. */
const round = (n: number) => Math.round(n * 100) / 100;

/** Polar to the dial's own coordinates. `t` runs 0 (left) to 1 (right). */
function on(t: number, radius = R) {
  const a = Math.PI * (1 - t);
  return [round(CX + Math.cos(a) * radius), round(CY - Math.sin(a) * radius)] as const;
}

export function WorkloadGauge({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  caveat,
  caveatMark,
  recommend,
  recommendMark,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: string[];
  caveat: string;
  caveatMark: string;
  recommend: string;
  recommendMark: string;
}) {
  const uid = useId();
  const [ticked, setTicked] = useState<boolean[]>(() => items.map(() => false));
  const count = ticked.filter(Boolean).length;
  /** Straight up at the midpoint, hard left with nothing ticked. */
  const angle = round(-90 + (count / items.length) * 180);

  const toggle = (i: number) =>
    setTicked((t) => t.map((v, k) => (k === i ? !v : v)));

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          {/* --------------------------------------------- the conditions */}
          <div>
            <Rise>
              <p className="font-display text-[clamp(1.05rem,2vw,1.4rem)] font-extrabold uppercase leading-[1.16] text-snow">
                {lead}
              </p>
            </Rise>

            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {items.map((item, i) => {
                const checked = ticked[i];
                return (
                  <li key={item} className="border-b border-line/70">
                    <label
                      htmlFor={`${uid}-${i}`}
                      className="flex items-start gap-3.5 py-3.5"
                    >
                      <input
                        id={`${uid}-${i}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(i)}
                        className="peer sr-only"
                      />
                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand motion-reduce:transition-none",
                          checked ? "border-brand bg-brand" : "border-line bg-ink-3",
                        )}
                      >
                        <svg viewBox="0 0 24 24" className="h-3 w-3 text-white" fill="none">
                          <path
                            d="M5 12.5l4.5 4.5L19 7.5"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={cn(
                              "transition-opacity duration-300 motion-reduce:transition-none",
                              checked ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </svg>
                      </span>
                      <span
                        className={cn(
                          "text-[0.9375rem] leading-snug transition-colors duration-300 motion-reduce:transition-none",
                          checked ? "text-snow" : "text-fog",
                        )}
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---------------------------------------------------- the dial */}
          <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
            <div className="rounded-2xl border border-line bg-ink-2 p-7 sm:p-9">
              <svg
                viewBox="0 0 300 190"
                className="mx-auto block w-full max-w-[22rem]"
                aria-hidden
              >
                {/* The arc itself. */}
                <path
                  d={`M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}`}
                  stroke="var(--color-line)"
                  strokeWidth="1.4"
                  fill="none"
                />

                {/* The light end: work that happens at intervals, drawn with
                    the intervals in it. */}
                {[0.04, 0.13, 0.22].map((t) => {
                  const [x1, y1] = on(t, R - 9);
                  const [x2, y2] = on(t, R + 9);
                  return (
                    <line
                      key={t}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--color-ash)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* The heavy end: one unbroken band. */}
                <path
                  d={`M${on(0.72, R + 6)[0]} ${on(0.72, R + 6)[1]} A${R + 6} ${R + 6} 0 0 1 ${
                    on(1, R + 6)[0]
                  } ${on(1, R + 6)[1]}`}
                  stroke="var(--color-brand)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.85"
                />

                {/* One mark per condition, lit as it is ticked. */}
                {items.map((item, i) => {
                  const t = (i + 0.5) / items.length;
                  const [x1, y1] = on(t, R - 22);
                  const [x2, y2] = on(t, R - 13);
                  return (
                    <line
                      key={item}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={i < count ? "var(--color-brand)" : "var(--color-line)"}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      className="transition-[stroke] duration-500 motion-reduce:transition-none"
                    />
                  );
                })}

                {/* The needle. */}
                <g
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: `${CX}px ${CY}px`,
                    transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                  className="motion-reduce:transition-none"
                >
                  <line
                    x1={CX}
                    y1={CY}
                    x2={CX}
                    y2={CY - (R - 34)}
                    stroke="var(--color-snow)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <circle cx={CX} cy={CY - (R - 34)} r="4" fill="var(--color-brand)" />
                </g>
                <circle cx={CX} cy={CY} r="7" fill="var(--color-void)" stroke="var(--color-line)" strokeWidth="1.6" />
                <circle cx={CX} cy={CY} r="2.4" fill="var(--color-brand)" />

                {/* The base, so the dial stands on something. */}
                <line
                  x1={CX - R - 10}
                  y1={CY + 16}
                  x2={CX + R + 10}
                  y2={CY + 16}
                  stroke="var(--color-line)"
                  strokeWidth="1.2"
                />
              </svg>

              {/* The two sentences the dial is a picture of. Printed whatever
                  the reader ticks. */}
              <p className="mt-8 border-t border-line pt-7 leading-relaxed text-fog">
                <Marked text={caveat} mark={caveatMark} className="font-semibold text-snow" />
              </p>
              <p className="mt-5 leading-relaxed text-fog">
                <Marked text={recommend} mark={recommendMark} className="font-semibold text-brand" />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

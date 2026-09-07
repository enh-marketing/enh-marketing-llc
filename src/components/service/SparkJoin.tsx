"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marked } from "@/components/service/Marked";
import { Rise } from "@/components/fx/Reveal";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import type { SparkSource } from "@/content/services/tiktok-ads";

/** Three things bought separately, joining into one post.
 *
 *  THE SECTION'S ARGUMENT IS A JOIN, SO THE DRAWING IS ONE. "It also connects
 *  three things you may currently be buying separately." Organic proves which
 *  videos work, creators supply a third-party voice, and Spark Ads put budget
 *  behind the result. Three lines that converge on a single object is the only
 *  honest picture of that sentence; three cards side by side would say the
 *  opposite, which is that they remain three purchases.
 *
 *  THE POST DOES NOT CHANGE WHEN THE BUDGET ARRIVES, and that is the whole
 *  format. "It keeps the original handle, the comments and the engagement, so
 *  it reads as a post rather than an advertisement", and the winners go behind
 *  budget "without rebuilding them as ads". So the card is drawn once and never
 *  redrawn: selecting the third source clamps a budget bracket to it and alters
 *  nothing else. A reader can watch an ad be made out of a post that stayed a
 *  post.
 *
 *  THE SENTENCES ARE THE LEGEND. Each of the three lights its own line and the
 *  one part of the card it contributes — the engagement that proved it, the
 *  handle that voices it, the budget clamped underneath. Nothing on the drawing
 *  carries a label, so no word of the document is printed twice.
 *
 *  IT READS AT REST. The lines, the card, the handle, the comments and the
 *  engagement are all drawn before anything is pointed at; the first source is
 *  selected on load so the section is never blank. The interaction adds
 *  precision, never the meaning.
 *
 *  MOTION. One travelling dash on the selected line, in CSS on a path with
 *  pathLength="100", so it survives a busy main thread and stops cleanly under
 *  prefers-reduced-motion with the line still drawn. */

export function SparkJoin({
  id,
  label,
  index,
  title,
  strokeTitle,
  definition,
  definitionMark,
  why,
  whyMark,
  connectsLead,
  sources,
  conclusion,
  conclusionMark,
  permit,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  definition: string;
  /** The three things the ad keeps, verbatim substrings of `definition`. */
  definitionMark: string[];
  why: string;
  whyMark: string;
  connectsLead: string;
  sources: SparkSource[];
  conclusion: string;
  conclusionMark: string;
  permit: { body: string; mark: string };
}) {
  const reduced = usePrefersReducedMotion();
  /** Which of the three the reader is on. Rests on the first. */
  const [active, setActive] = useState(0);
  const on = (i: number) => active === i;

  /** The three lines, converging from the left on the card's edge. Normalised
   *  coordinates with a non-scaling stroke, so the join lands exactly on the
   *  card's edge at any width without distorting the line weight. */
  const LINES = [
    "M0 16 C 44 16 54 50 100 50",
    "M0 50 L 100 50",
    "M0 84 C 44 84 54 50 100 50",
  ];
  const ORIGIN_Y = [16, 50, 84];

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      {/* A chapter of its own atmosphere: this is the page's centrepiece and the
          only section with a wash behind it. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="aurora-a absolute left-[-10%] top-[6%] h-[34vw] w-[34vw] rounded-full bg-brand/[0.09] blur-[150px]" />
      </div>

      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-14"
          aside={
            <Rise key="why">
              <p className="statement font-display font-extrabold uppercase leading-[1.14] text-snow">
                <Marked text={why} mark={whyMark} className="text-brand" />
              </p>
            </Rise>
          }
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-14">
          {/* ------------------------------------------------- the join --- */}
          <Rise className="order-2 lg:order-1">
            <div
              aria-hidden
              className="relative rounded-[1.75rem] border border-line bg-ink-2 p-5 sm:p-7"
            >
              <div className="flex items-stretch">
                {/* The three lines. */}
                <div className="relative min-w-0 flex-1">
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                    fill="none"
                  >
                    {LINES.map((d, i) => (
                      <g key={i}>
                        <path
                          d={d}
                          pathLength="100"
                          stroke={on(i) ? "var(--color-brand)" : "var(--color-line)"}
                          strokeWidth="1.5"
                          vectorEffect="non-scaling-stroke"
                          className="transition-[stroke] duration-500 motion-reduce:transition-none"
                        />
                        {/* The pulse, only on the selected line, and not at all
                            for a reader who asked for no motion: the line it
                            runs on is already drawn, so there is nothing to
                            park it on. */}
                        {on(i) && !reduced && (
                          <path
                            d={d}
                            pathLength="100"
                            stroke="var(--color-brand-hot)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            className="animate-spark-travel"
                          />
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* Where each purchase starts today: three separate things. */}
                  {ORIGIN_Y.map((y, i) => (
                    <span
                      key={i}
                      className={cn(
                        "absolute left-0 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[6px] border transition-colors duration-500 motion-reduce:transition-none",
                        on(i)
                          ? "border-brand bg-brand/20"
                          : "border-line bg-ink-2",
                      )}
                      style={{ top: `${y}%` }}
                    >
                      <span
                        className={cn(
                          "font-display text-[0.55rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                          on(i) ? "text-brand-text" : "text-ash",
                        )}
                      >
                        {sources[i]?.no}
                      </span>
                    </span>
                  ))}
                </div>

                {/* ------------------------------------------- the post --- */}
                <div className="relative flex min-h-[392px] w-[45%] max-w-[232px] shrink-0 flex-col rounded-xl border border-line bg-void/70 p-3">
                  {/* The handle. A creator's voice, or your own — it is whose
                      account the ad runs through, and it is kept. */}
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-7 w-7 shrink-0 rounded-full border-2 transition-colors duration-500 motion-reduce:transition-none",
                        on(1) ? "border-brand bg-brand/25" : "border-fog/40 bg-ink-2",
                      )}
                    />
                    <span className="flex flex-col gap-1.5">
                      <span
                        className={cn(
                          "h-1.5 w-20 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                          on(1) ? "bg-brand" : "bg-fog/45",
                        )}
                      />
                      <span
                        className={cn(
                          "h-1 w-12 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                          on(1) ? "bg-brand/45" : "bg-line",
                        )}
                      />
                    </span>
                  </span>

                  {/* The video, and what is attached to it. */}
                  <span className="relative my-3 flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-line bg-gradient-to-b from-ink-2/70 to-void/30">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-line">
                      <svg viewBox="0 0 12 14" className="h-4 w-4 text-line" fill="currentColor">
                        <path d="M1 1.2 11 7 1 12.8Z" />
                      </svg>
                    </span>

                    {/* The comments. Kept, and never the contribution of any one
                        of the three, so they hold one tone throughout. */}
                    <span className="absolute bottom-2 left-2 flex flex-col gap-1">
                      {[26, 34, 22].map((w, k) => (
                        <span key={k} className="flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-fog/35" />
                          <span
                            className="h-1 rounded-full bg-fog/30"
                            style={{ width: `${w}px` }}
                          />
                        </span>
                      ))}
                    </span>

                    {/* The engagement. This is what organic proved. */}
                    <span className="absolute bottom-2 right-2 flex flex-col items-center gap-2">
                      {[0, 1, 2].map((k) => (
                        <span key={k} className="flex flex-col items-center gap-1">
                          <span
                            className={cn(
                              "h-3 w-3 rounded-full border transition-colors duration-500 motion-reduce:transition-none",
                              on(0) ? "border-brand bg-brand/30" : "border-fog/40",
                            )}
                          />
                          <span
                            className={cn(
                              "h-1 rounded-full transition-all duration-500 motion-reduce:transition-none",
                              on(0) ? "bg-brand/70" : "bg-line",
                            )}
                            style={{ width: on(0) ? `${10 - k * 2}px` : "6px" }}
                          />
                        </span>
                      ))}
                    </span>
                  </span>

                  {/* The budget. Clamped underneath; nothing above it moves. */}
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-5 w-3 shrink-0 items-center border-y-2 border-l-2 transition-colors duration-500 motion-reduce:transition-none",
                        on(2) ? "border-brand" : "border-line",
                      )}
                    />
                    <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-line/60">
                      <span
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out motion-reduce:transition-none",
                          on(2) ? "w-[86%] bg-brand" : "w-0 bg-brand",
                        )}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Rise>

          {/* ----------------------------------------------- the reading --- */}
          <div className="order-1 lg:order-2">
            <Rise>
              <p className="text-base leading-relaxed text-fog sm:text-lg">
                <Marked
                  text={definition}
                  mark={definitionMark}
                  className="font-semibold text-snow"
                />
              </p>
            </Rise>

            <Rise delay={0.08} className="mt-9 border-t border-line pt-8">
              <p className="font-display text-[clamp(1.05rem,2vw,1.4rem)] font-extrabold uppercase leading-[1.18] text-snow">
                {connectsLead}
              </p>
            </Rise>

            <ol className="mt-5">
              {sources.map((s, i) => {
                const lit = on(i);
                return (
                  <li key={s.no} className="border-b border-line first:border-t">
                    <button
                      type="button"
                      aria-pressed={lit}
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="flex w-full items-baseline gap-5 py-4 text-left"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "font-display shrink-0 text-[0.62rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                          lit ? "text-brand-text" : "text-ash",
                        )}
                      >
                        {s.no}
                      </span>
                      <span
                        className={cn(
                          "leading-relaxed transition-colors duration-300 motion-reduce:transition-none sm:text-lg",
                          lit ? "text-snow" : "text-fog",
                        )}
                      >
                        {s.body}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* The conclusion the three lines arrive at. */}
        <Rise delay={0.1} className="mt-14">
          <p className="font-display max-w-5xl text-[clamp(1.3rem,2.7vw,2.15rem)] font-extrabold uppercase leading-[1.1] text-snow">
            <Marked text={conclusion} mark={conclusionMark} className="text-brand" />
          </p>
        </Rise>

        {/* The permit requirement. It qualifies creator campaigns, not the page,
            so it sits inside this section — the arrangement the Meta Ads page
            uses for its own caution. */}
        <Rise delay={0.14} className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-brand/35 bg-brand/[0.05] p-7 sm:p-9">
            <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-brand" />
            {/* A mark rather than a heading. The band's only candidate for one
                would be the date, and the date is already inside the sentence
                below it. */}
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 text-brand"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3.5 21 19H3L12 3.5Z" />
              <path d="M12 10v3.5M12 16.4v.1" />
            </svg>
            <p className="mt-5 leading-relaxed text-fog sm:text-lg">
              <Marked
                text={permit.body}
                mark={permit.mark}
                className="font-semibold text-snow"
              />
            </p>
          </div>
        </Rise>
      </Container>
    </section>
  );
}

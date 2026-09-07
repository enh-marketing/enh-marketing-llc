"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { RunItem, RunRegion } from "@/content/services/tiktok-ads";

/** Seven services, drawn as the one account they add up to.
 *
 *  WHY NOT SEVEN CARDS. The document writes these as seven bullets, but they
 *  are not seven products: they are the parts of a single account that has to
 *  keep running. Structure holds the campaigns, creative feeds them, Spark Ads
 *  attach an outside account to the frame, audiences sit behind it, tracking
 *  runs underneath, the catalogue sits inside the feed, and reporting stands to
 *  one side reconciling two sets of figures. Set as a grid of cards none of
 *  those relationships survive, and the section says only "we do seven things".
 *
 *  THE SENTENCE IS THE LEGEND. This is the arrangement that works on this site:
 *  draw the thing and label nothing on it, then put the client's own sentences
 *  beside it and couple them, so pointing at a sentence lights the region it
 *  describes. Nothing is printed twice, no heading is invented for a bullet
 *  that has none, and the copy does the explaining.
 *
 *  THE QUEUE IS THE ONLY THING THAT MOVES, and that is the page's argument in
 *  one detail: creative is the part that has to keep arriving. It runs on a CSS
 *  keyframe so it survives a busy main thread, and it stops under
 *  prefers-reduced-motion with the queue full, which is the state that reads.
 *
 *  THE DRAWING IS INERT. Only the legend is operable. Hover feedback on
 *  something that cannot be clicked is worse than none, which is the rule
 *  SnapSurfaces already follows.
 *
 *  ABSTRACT THROUGHOUT: frames, bars, seams and a boundary. Never a word of ad
 *  copy, never a figure, and no platform's trade dress. */

export function RunningAccount({
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
  index: string;
  title: string;
  strokeTitle: string;
  items: RunItem[];
}) {
  const [active, setActive] = useState(0);
  const region = items[active]?.region;
  const on = (r: RunRegion) => region === r;

  /** A region of the drawing, lit or resting. */
  const zone = (r: RunRegion, className?: string) =>
    cn(
      "relative rounded-xl border transition-colors duration-500 motion-reduce:transition-none",
      on(r) ? "border-brand/60 bg-brand/[0.09]" : "border-line bg-void/50",
      className,
    );

  /** The numeral a region carries. The only characters on the drawing, and they
   *  are the document's own item numbers, so the legend and the drawing agree
   *  without either naming the other. */
  const numeral = (r: RunRegion) => {
    const item = items.find((i) => i.region === r);
    return (
      <span
        className={cn(
          "font-display text-[0.58rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
          on(r) ? "text-brand-text" : "text-ash",
        )}
      >
        {item?.no}
      </span>
    );
  };

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14">
          {/* ----------------------------------------------- the account --- */}
          <Rise className="order-2 lg:order-1">
            <div
              aria-hidden
              className={cn(
                "relative overflow-hidden rounded-[1.75rem] border p-5 transition-colors duration-500 motion-reduce:transition-none sm:p-7",
                // 04 — the audience the whole account sits inside. It is the
                // plate itself rather than a box on it, because that is what an
                // audience is: everything else happens within it.
                on("audience") ? "border-brand/50 bg-brand/[0.06]" : "border-line bg-ink-2",
              )}
            >
              {/* The field, and its boundary. */}
              <span
                className={cn(
                  "dot-field pointer-events-none absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
                  on("audience") ? "opacity-100" : "opacity-40",
                )}
              />
              <span
                className={cn(
                  "pointer-events-none absolute inset-4 rounded-[1.25rem] border border-dashed transition-colors duration-500 motion-reduce:transition-none",
                  on("audience") ? "border-brand/45" : "border-transparent",
                )}
              />
              <span className="absolute right-5 top-4">{numeral("audience")}</span>

              <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_minmax(0,0.8fr)] sm:gap-4">
                {/* -- left: what feeds the account ----------------------- */}
                <div className="flex flex-col gap-3">
                  {/* 01 — structure. A campaign, its ad groups, and the value
                      each conversion is set at. */}
                  <div className={zone("structure", "flex flex-col gap-2.5 p-3")}>
                    {numeral("structure")}
                    <span className="flex flex-col items-center gap-1.5">
                      <span
                        className={cn(
                          "h-1.5 w-10 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                          on("structure") ? "bg-brand" : "bg-line",
                        )}
                      />
                      <span
                        className={cn(
                          "h-2 w-px transition-colors duration-500 motion-reduce:transition-none",
                          on("structure") ? "bg-brand/60" : "bg-line",
                        )}
                      />
                      <span className="flex gap-1.5">
                        {[0, 1, 2].map((k) => (
                          <span
                            key={k}
                            className={cn(
                              "h-1.5 w-4 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                              on("structure") ? "bg-brand/55" : "bg-line",
                            )}
                          />
                        ))}
                      </span>
                    </span>
                    {/* The value a conversion is worth: one weighted mark. */}
                    <span className="flex items-center justify-center gap-1">
                      {[3, 6, 4].map((w, k) => (
                        <span
                          key={k}
                          className={cn(
                            "rounded-[2px] transition-colors duration-500 motion-reduce:transition-none",
                            on("structure") ? "bg-brand/70" : "bg-line",
                          )}
                          style={{ width: `${w}px`, height: `${w + 2}px` }}
                        />
                      ))}
                    </span>
                  </div>

                  {/* 02 — the creative queue. The only part of the drawing that
                      moves, because it is the only part that has to keep
                      arriving. Two copies of the run, translated a full half,
                      so the loop never seams. */}
                  <div className={zone("creative", "flex flex-1 flex-col gap-2 overflow-hidden p-3")}>
                    {numeral("creative")}
                    <span className="relative block h-[190px] overflow-hidden">
                      {/* Two identical copies of a six-tile run. The spacing is
                          a margin rather than a flex gap so the -50% translate
                          lands exactly on the start and the loop never seams. */}
                      <span className="animate-queue absolute inset-x-0 top-0 flex flex-col">
                        {Array.from({ length: 12 }).map((_, k) => (
                          <span
                            key={k}
                            className={cn(
                              "mb-2 h-7 shrink-0 rounded-[4px] border transition-colors duration-500 motion-reduce:transition-none",
                              on("creative")
                                ? k % 3 === 1
                                  ? "border-brand/60 bg-brand/45"
                                  : "border-brand/40 bg-brand/[0.14]"
                                : "border-line bg-ink-2/70",
                            )}
                          />
                        ))}
                      </span>
                      {/* The queue runs off the top into the frame, so it fades
                          rather than stopping on a hard edge. */}
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-ink-3/90 to-transparent" />
                    </span>
                  </div>
                </div>

                {/* -- centre: the feed itself ---------------------------- */}
                <div className="flex flex-col gap-3">
                  {/* 03 — Spark Ads. Two outside accounts joined to the frame on
                      a seam: yours and a creator's. Drawn as a join because
                      that is what the format is. */}
                  <div className={zone("spark", "flex items-center gap-2 p-3")}>
                    {numeral("spark")}
                    <span className="flex items-center gap-1.5">
                      {[0, 1].map((k) => (
                        <span
                          key={k}
                          className={cn(
                            "h-5 w-5 rounded-full border-2 transition-colors duration-500 motion-reduce:transition-none",
                            on("spark") ? "border-brand bg-brand/25" : "border-line bg-ink-2",
                          )}
                        />
                      ))}
                    </span>
                    <span
                      className={cn(
                        "h-px flex-1 border-t border-dashed transition-colors duration-500 motion-reduce:transition-none",
                        on("spark") ? "border-brand/70" : "border-line",
                      )}
                    />
                  </div>

                  {/* The frame. Whatever is selected, this is where it lands. */}
                  <div className="relative flex min-h-[268px] flex-1 flex-col justify-between rounded-xl border border-line bg-void/70 p-3">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-3.5 w-3.5 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                          on("spark") ? "bg-brand" : "bg-line",
                        )}
                      />
                      <span
                        className={cn(
                          "h-1 w-9 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                          on("spark") ? "bg-brand/50" : "bg-line",
                        )}
                      />
                    </span>

                    {/* The ad currently in view: whatever came off the top of
                        the queue. Drawn so the frame is a feed with something in
                        it rather than an empty rectangle, and so the queue to
                        its left is visibly feeding somewhere. */}
                    <span
                      className={cn(
                        "my-3 flex flex-1 flex-col justify-between rounded-lg border p-2 transition-colors duration-500 motion-reduce:transition-none",
                        on("creative")
                          ? "border-brand/55 bg-brand/[0.12]"
                          : "border-line bg-ink-2/50",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1 w-8 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                          on("creative") ? "bg-brand/70" : "bg-line",
                        )}
                      />
                      <span className="flex justify-center">
                        <span
                          className={cn(
                            "h-9 w-9 rounded-full border-2 transition-colors duration-500 motion-reduce:transition-none",
                            on("creative") ? "border-brand" : "border-line",
                          )}
                        />
                      </span>
                      <span className="flex items-end justify-between gap-2">
                        <span className="flex flex-col gap-1">
                          {[22, 15].map((w, k) => (
                            <span
                              key={k}
                              className={cn(
                                "h-1 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                                on("creative") ? "bg-brand/45" : "bg-line",
                              )}
                              style={{ width: `${w}px` }}
                            />
                          ))}
                        </span>
                        <span className="flex flex-col items-center gap-1">
                          {[0, 1, 2].map((k) => (
                            <span
                              key={k}
                              className={cn(
                                "h-1.5 w-1.5 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                                on("creative") ? "bg-brand/55" : "bg-line",
                              )}
                            />
                          ))}
                        </span>
                      </span>
                    </span>

                    {/* 06 — catalogue and commerce, inside the feed. */}
                    <div className={zone("catalogue", "flex flex-col gap-2 p-2.5")}>
                      <span className="flex items-center justify-between">
                        {numeral("catalogue")}
                        <span
                          className={cn(
                            "h-1 w-6 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                            on("catalogue") ? "bg-brand/60" : "bg-line",
                          )}
                        />
                      </span>
                      <span className="flex gap-1.5">
                        {[0, 1, 2, 3].map((k) => (
                          <span
                            key={k}
                            className={cn(
                              "h-6 flex-1 rounded-[3px] border transition-colors duration-500 motion-reduce:transition-none",
                              on("catalogue")
                                ? "border-brand/55 bg-brand/25"
                                : "border-line bg-ink-2/70",
                            )}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* -- right: what the account is read against ------------ */}
                {/* 07 — reporting. Two columns that do not agree, and the ties
                    drawn between them. TikTok's figures on one side, your
                    actual results on the other. */}
                <div className={zone("reporting", "col-span-2 flex flex-col gap-2.5 p-3 sm:col-span-1")}>
                  {numeral("reporting")}
                  <span className="flex flex-1 items-stretch gap-2">
                    <span className="flex flex-1 flex-col justify-between gap-1.5">
                      {[70, 100, 55, 85].map((w, k) => (
                        <span
                          key={k}
                          className={cn(
                            "h-2 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                            on("reporting") ? "bg-brand/55" : "bg-line",
                          )}
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </span>
                    {/* The reconciliation: short ties between the two columns. */}
                    <span className="flex w-3 flex-col justify-between py-1">
                      {[0, 1, 2, 3].map((k) => (
                        <span
                          key={k}
                          className={cn(
                            "h-px w-full transition-colors duration-500 motion-reduce:transition-none",
                            on("reporting") ? "bg-brand" : "bg-line",
                          )}
                        />
                      ))}
                    </span>
                    <span className="flex flex-1 flex-col items-end justify-between gap-1.5">
                      {[52, 78, 44, 66].map((w, k) => (
                        <span
                          key={k}
                          className={cn(
                            "h-2 rounded-full transition-colors duration-500 motion-reduce:transition-none",
                            on("reporting") ? "bg-snow/45" : "bg-line",
                          )}
                          style={{ width: `${w}%` }}
                        />
                      ))}
                    </span>
                  </span>
                </div>
              </div>

              {/* 05 — tracking, running underneath everything. Two paths, one
                  from the browser and one from the server, joining before they
                  reach the account. */}
              <div className={zone("tracking", "relative mt-3 flex items-center gap-3 p-3 sm:mt-4")}>
                {numeral("tracking")}
                <span className="relative flex flex-1 items-center">
                  <span
                    className={cn(
                      "h-px flex-1 transition-colors duration-500 motion-reduce:transition-none",
                      on("tracking") ? "bg-brand" : "bg-line",
                    )}
                  />
                  <span
                    className={cn(
                      "h-px flex-1 border-t border-dashed transition-colors duration-500 motion-reduce:transition-none",
                      on("tracking") ? "border-brand/70" : "border-line",
                    )}
                  />
                  <span
                    className={cn(
                      "h-2.5 w-2.5 shrink-0 rotate-45 transition-colors duration-500 motion-reduce:transition-none",
                      on("tracking") ? "bg-brand" : "bg-line",
                    )}
                  />
                  <span
                    className={cn(
                      "h-px flex-1 transition-colors duration-500 motion-reduce:transition-none",
                      on("tracking") ? "bg-brand" : "bg-line",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "h-5 w-8 shrink-0 rounded-[3px] border transition-colors duration-500 motion-reduce:transition-none",
                    on("tracking") ? "border-brand/60 bg-brand/25" : "border-line bg-ink-2",
                  )}
                />
              </div>
            </div>
          </Rise>

          {/* ------------------------------------------------ the legend --- */}
          <div className="order-1 lg:order-2">
            <ol className="border-t border-line">
              {items.map((item, i) => {
                const lit = i === active;
                return (
                  <li key={item.no} className="border-b border-line">
                    <button
                      type="button"
                      aria-pressed={lit}
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className="group flex w-full items-baseline gap-5 py-4 text-left"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "font-display shrink-0 text-[0.62rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                          lit ? "text-brand-text" : "text-ash",
                        )}
                      >
                        {item.no}
                      </span>
                      <span
                        className={cn(
                          "leading-relaxed transition-colors duration-300 motion-reduce:transition-none sm:text-lg",
                          lit ? "text-snow" : "text-fog",
                        )}
                      >
                        {item.body}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}

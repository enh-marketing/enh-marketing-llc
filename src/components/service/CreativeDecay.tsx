"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

/** The hero: an account that did not change, and creative that ran out.
 *
 *  WHY THIS. The document's first paragraph is the entire brief for the
 *  drawing. "The first few ads perform, the numbers look encouraging, and six
 *  weeks later the same creative is delivering a fraction of what it did. The
 *  account is usually fine. What ran out was content." So two things are drawn
 *  on top of each other and only one of them moves: the account's own structure
 *  holds exactly its shape through both states, while the creative strip
 *  empties and the delivery run falls to a fraction. The reader watches the
 *  page's argument happen before reading a word of it.
 *
 *  IT IS NOT A CHART. The run has no axis, no scale and no unit, because the
 *  document gives none: it says "a fraction of what it did" and nothing more.
 *  Six columns because the sentence says six weeks — the only quantity in the
 *  paragraph, and the only one drawn.
 *
 *  MOTION IS ONE INTERVAL AND TWO STATES, the arrangement SpendSplit uses on
 *  the Google Ads hero. Under prefers-reduced-motion it stops on the spent
 *  state, which is the informative one here: a reader who never sees it move
 *  still sees what the page is about. That is also what the server renders. */

/** How long each state holds, in ms. */
const BEAT = 2800;

/** The six weeks of the document's sentence. Heights are a shape, not a
 *  measurement: full while the creative is fresh, a fraction once it is spent.
 *  Fixed so the drawing is deterministic rather than reshuffling per render. */
const FRESH = [62, 88, 74, 96, 80, 68];
const SPENT = [58, 46, 33, 26, 19, 15];

/** Eight variants in the batch. The last three are the ones still unused when
 *  the run is fresh, so the strip is never a solid block in either state. */
const BATCH = 8;

export function CreativeDecay({ label }: {
  /** The drawing's accessible name, handed in from the page's content file
   *  rather than written here: every word on this page is the client's, and the
   *  sentence this drawing depicts is one the client can still edit. Required,
   *  so a caller cannot ship an unnamed role="img". */
  label: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setPhase((p) => !p), BEAT);
    return () => clearInterval(t);
  }, [reduced]);

  /** Spent when the reader has motion off, or when the run says so. */
  const spent = reduced || phase;

  return (
    <div
      className={cn(
        // The house placement for a hero visual, matching SpendSplit and
        // PagePurpose: anchored to the right gutter, centred, out of the flow,
        // and not rendered below the large breakpoint, where it would add its
        // own height and push the trust strip below the fold.
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[356px] -translate-y-1/2 select-none lg:block xl:w-[396px]",
      )}
    >
      <div className="relative rounded-[1.25rem] border border-line bg-ink-2 p-6 shadow-[0_26px_66px_-34px_rgba(0,0,0,0.95)] sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div role="img" aria-label={label} className="relative">
          {/* THE ACCOUNT. Identical in both states, on purpose: this is the half
              of the drawing that says the account is fine. A campaign, its ad
              groups, and a marker that never moves. */}
          <div aria-hidden className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 shrink-0 rounded-[3px] bg-brand" />
            <span className="h-1.5 w-16 rounded-full bg-fog/40" />
            <span className="ml-auto flex gap-1.5">
              {[0, 1, 2].map((k) => (
                <span key={k} className="h-1.5 w-6 rounded-full bg-line" />
              ))}
            </span>
          </div>
          <span aria-hidden className="mt-4 block h-px w-full bg-line" />

          {/* THE DELIVERY. Six columns, falling to a fraction. */}
          <div aria-hidden className="mt-5 flex h-[104px] items-end gap-2">
            {FRESH.map((h, i) => (
              <span key={i} className="flex h-full flex-1 items-end">
                <span
                  className={cn(
                    "w-full rounded-t-[3px] border-t transition-all duration-[900ms] ease-out motion-reduce:transition-none",
                    // Still brand when spent: the document says the creative
                    // is "delivering a fraction of what it did", not nothing.
                    // The half that empties is the batch below.
                    spent
                      ? "border-brand/40 bg-brand/25"
                      : "border-brand bg-gradient-to-t from-brand/25 to-brand/70",
                  )}
                  style={{
                    height: `${spent ? SPENT[i] : h}%`,
                    transitionDelay: reduced ? undefined : `${i * 70}ms`,
                  }}
                />
              </span>
            ))}
          </div>
          <span aria-hidden className="block h-px w-full bg-line" />

          {/* THE CREATIVE. The half that does change: a batch that empties. */}
          <div aria-hidden className="mt-5 flex items-center gap-1.5">
            {Array.from({ length: BATCH }).map((_, i) => {
              // Fresh: the first five are in play, the last three still to come.
              // Spent: nothing left with anything in it.
              const filled = spent ? false : i < 5;
              return (
                <span
                  key={i}
                  className={cn(
                    // Portrait, and marked, so the batch reads as clips rather
                    // than as a second bar chart under the delivery run.
                    "flex h-12 flex-1 items-center justify-center rounded-[3px] border transition-all duration-[900ms] ease-out motion-reduce:transition-none",
                    filled
                      ? "border-brand/60 bg-brand/55"
                      : "border-dashed border-line bg-transparent",
                  )}
                  style={{ transitionDelay: reduced ? undefined : `${i * 55}ms` }}
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full border transition-colors duration-[900ms] motion-reduce:transition-none",
                      filled ? "border-white/70" : "border-line",
                    )}
                  />
                </span>
              );
            })}
          </div>

          {/* The reading underneath: one rail that empties with the batch. */}
          <div aria-hidden className="mt-4 flex items-center gap-3">
            <span
              className={cn(
                "h-2 w-2 shrink-0 rounded-full transition-colors duration-700 motion-reduce:transition-none",
                spent ? "bg-line" : "bg-brand",
              )}
            />
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-line/60">
              <span
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full transition-all duration-[900ms] ease-out motion-reduce:transition-none",
                  spent ? "w-[14%] bg-fog/40" : "w-[78%] bg-brand",
                )}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

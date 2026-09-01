"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** The lead system, assembled and then switched on.
 *
 *  WHY NOT THE STAGE TRACK. The paid-media pages draw their programmes as a
 *  run of evenly spaced nodes, because for those documents the only thing the
 *  order fixes is order. This document fixes something stronger: it says
 *  "Nothing gets spent until the lead definition is signed", then builds the
 *  capture and measurement layer "before any traffic arrives", then opens four
 *  named sources, then moves budget between them. That is not a timeline. It is
 *  a system with a gate at the top, plumbing in the middle and taps that open
 *  last, and drawing it as another row of dots throws away the one structural
 *  claim the document actually makes.
 *
 *  WHAT EACH STAGE CHANGES:
 *   1. The definition is signed. The gate stamps; nothing below it is live.
 *   2. Capture, routing and measurement become solid, still with no flow —
 *      which is the document's own point about doing this before traffic.
 *   3. The four sources light and flow reaches the floor. The document names
 *      them: paid traffic, email, WhatsApp, local search.
 *   4. The sources stop being equal. The document says we "move budget and
 *      effort toward" whatever produces leads that get called back, so the taps
 *      change width. Which ones widen is illustrative and unlabelled: the
 *      document never says which channel wins, and a drawing that named one
 *      would be inventing a result.
 *
 *  Abstract throughout: blocks, taps and a floor, never a word. The panel
 *  beside it carries the meaning. */
export function LeadSystem({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const reached = (stage: number) => active >= stage;
  const lit = (stage: number) => active === stage;

  /** Tap widths. Equal until budget starts moving, then not. */
  const taps = reached(3) ? [34, 15, 28, 23] : [25, 25, 25, 25];

  return (
    /* DOM ORDER IS STAGE ORDER. The pins are this section's tablist, so they
       have to be reachable in the order the stages run: a keyboard user
       arrowing through them must go 1, 2, 3, 4. But the drawing is a system
       read top to bottom, where the taps that open at stage 3 sit above the
       plumbing built at stage 2 that they feed into. So the children are
       written in stage order and placed with `order`, which keeps focus order
       and screen-reader order correct while the picture stays spatial. */
    <div className="relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-ink-3/60 p-6 sm:p-7">
      {/* 1. The gate. Nothing below it is live until this is stamped. */}
      <div
        className={cn(
          "order-1 flex items-center gap-4 rounded-xl border px-4 py-3 transition-all duration-500",
          reached(0)
            ? "border-brand/55 bg-brand/[0.08]"
            : "border-line bg-ink-2/50",
          lit(0) && "shadow-[0_0_0_1px_var(--color-brand)]",
        )}
      >
        {pin(0, "shrink-0")}
        <span
          aria-hidden
          className={cn(
            "h-2 flex-1 rounded-full transition-colors duration-500",
            reached(0) ? "bg-brand/45" : "bg-line",
          )}
        />
        {/* The signature itself: a short stamped rule. */}
        <span
          aria-hidden
          className={cn(
            "h-px w-10 origin-right transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            reached(0) ? "scale-x-100 bg-brand" : "scale-x-0 bg-line",
          )}
        />
      </div>

      {/* 2. Capture, routing and measurement. Built before any traffic. */}
      <div
        className={cn(
          "order-4 rounded-xl border p-4 transition-all duration-500",
          reached(1) ? "border-line bg-ink-2" : "border-dashed border-line/70 bg-transparent",
          lit(1) && "border-brand/50",
        )}
      >
        <div className="flex items-center gap-4">
          {pin(1, "shrink-0")}
          <div className="flex flex-1 flex-col gap-2">
            {/* The form, cut down. */}
            <div className="flex gap-1.5">
              {[42, 30, 18].map((w, i) => (
                <span
                  key={i}
                  aria-hidden
                  className={cn(
                    "h-2 rounded-full transition-colors duration-500",
                    reached(1) ? "bg-fog/60" : "bg-line",
                  )}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            {/* Measurement, wired before the traffic arrives. */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={i}
                  aria-hidden
                  className={cn(
                    "h-3 w-1 rounded-sm transition-colors duration-500",
                    reached(1) ? "bg-brand/45" : "bg-line",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. The taps. Drawn above the plumbing they feed, dark until they open. */}
      <div className="order-2 mt-6 flex items-end gap-2">
        {pin(2, "shrink-0")}
        <div className="flex flex-1 items-end gap-1.5">
          {taps.map((w, i) => (
            <span
              key={i}
              aria-hidden
              className={cn(
                "rounded-t-md border border-b-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                reached(2)
                  ? "border-brand/50 bg-brand/[0.16]"
                  : "border-line bg-ink-2/40",
                reached(2) ? "h-8" : "h-4",
              )}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>

      {/* The flow from the taps into capture. Only drawn once it flows. */}
      <div className="order-3 relative h-7">
        <svg
          aria-hidden
          viewBox="0 0 100 28"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {[18, 40, 62, 84].map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="0"
              x2="50"
              y2="28"
              stroke={reached(2) ? "var(--color-brand)" : "var(--color-line)"}
              strokeWidth="0.6"
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke] duration-500"
              opacity={reached(2) ? 0.75 : 0.25}
            />
          ))}
        </svg>
      </div>

      {/* 4. What lands, and the report it is measured against. */}
      <div className="order-5 mt-6 flex items-center gap-4">
        {pin(3, "shrink-0")}
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-500",
                  reached(2)
                    ? i < (reached(3) ? 9 : 5)
                      ? "bg-brand"
                      : "bg-line"
                    : "bg-line/60",
                )}
                style={{ transitionDelay: `${i * 35}ms` }}
              />
            ))}
          </div>
          <span
            aria-hidden
            className={cn(
              "mt-3 block h-px origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              reached(3) ? "scale-x-100 bg-brand" : "scale-x-0 bg-line",
            )}
          />
        </div>
      </div>

      {/* Any stage the caller has beyond the four this drawing knows about
          still needs a pin, or it would be unreachable by keyboard. */}
      {count > 4 &&
        Array.from({ length: count - 4 }).map((_, i) => (
          <span key={i} className="sr-only">
            {pin(i + 4)}
          </span>
        ))}
    </div>
  );
}

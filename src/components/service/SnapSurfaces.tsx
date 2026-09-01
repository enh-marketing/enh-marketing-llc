"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Four formats, drawn where each one actually appears.
 *
 *  WHY THIS. The document's table says what each format does, and every entry is
 *  really a statement about location: between Stories, in the Discover feed,
 *  through the camera, inside an area you define. Those are four different
 *  surfaces of the same app, so the drawing is the app and selecting a format
 *  lights the surface it lives on. A run of four cards would throw away the one
 *  thing the four have in common.
 *
 *  THE PINS ARE A RAIL, NOT SCATTERED THROUGH THE DRAWING. They are this
 *  section's tablist and have to be reachable in numbered order; placed on the
 *  surfaces they would follow the app's geometry instead. Two diagrams on this
 *  site shipped that bug before it was caught.
 *
 *  Abstract throughout: frames, bars and a boundary, never a word of ad copy. */
export function SnapSurfaces({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const on = (i: number) => active === i;

  const zone = (i: number, className?: string) =>
    cn(
      "rounded-xl border transition-colors duration-500",
      on(i) ? "border-brand/60 bg-brand/[0.09]" : "border-line bg-void/40",
      className,
    );

  const numeral = (i: number) => (
    <span
      aria-hidden
      className={cn(
        "font-display text-[0.6rem] font-bold tabular-nums tracking-[0.18em] transition-colors duration-500",
        on(i) ? "text-brand-text" : "text-ash",
      )}
    >
      {String(i + 1).padStart(2, "0")}
    </span>
  );

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      {/* The tablist, in the order the document numbers the formats. */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5 border-b border-line pb-5">
        {Array.from({ length: count }).map((_, i) => pin(i))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* 01 — between Stories: a full-screen unit with a swipe-up. */}
        <div className={zone(0, "flex flex-col gap-3 p-4")}>
          {numeral(0)}
          <span aria-hidden className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((k) => (
              <span
                key={k}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-500",
                  on(0) && k === 2 ? "bg-brand" : "bg-line",
                )}
              />
            ))}
          </span>
          <span
            aria-hidden
            className={cn(
              "flex h-16 flex-col justify-end rounded-lg border p-2 transition-colors duration-500",
              on(0) ? "border-brand/50 bg-brand/[0.12]" : "border-line bg-ink-2/60",
            )}
          >
            <span
              className={cn(
                "mx-auto h-1 w-8 rounded-full transition-colors duration-500",
                on(0) ? "bg-brand" : "bg-line",
              )}
            />
          </span>
        </div>

        {/* 02 — the Discover feed, with a product row. */}
        <div className={zone(1, "flex flex-col gap-3 p-4")}>
          {numeral(1)}
          <span aria-hidden className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <span
                key={k}
                className={cn(
                  "h-6 rounded-[4px] border transition-colors duration-500",
                  on(1) ? "border-brand/50 bg-brand/[0.14]" : "border-line bg-ink-2/60",
                )}
              />
            ))}
          </span>
          <span aria-hidden className="flex gap-1.5">
            {[0, 1, 2, 3].map((k) => (
              <span
                key={k}
                className={cn(
                  "h-4 flex-1 rounded-[3px] transition-colors duration-500",
                  on(1) ? "bg-brand/45" : "bg-line",
                )}
              />
            ))}
          </span>
        </div>

        {/* 03 — the camera, with something laid over what it sees. */}
        <div className={zone(2, "flex flex-col gap-3 p-4")}>
          {numeral(2)}
          <span
            aria-hidden
            className="relative flex h-[4.75rem] items-center justify-center rounded-lg border border-line bg-ink-2/60"
          >
            <span
              className={cn(
                "h-10 w-10 rounded-full border-2 transition-colors duration-500",
                on(2) ? "border-brand" : "border-line",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-3 bottom-2 h-1.5 rounded-full transition-colors duration-500",
                on(2) ? "bg-brand/70" : "bg-line",
              )}
            />
          </span>
        </div>

        {/* 04 — an area, and the Snaps inside it. */}
        <div className={zone(3, "flex flex-col gap-3 p-4")}>
          {numeral(3)}
          <span
            aria-hidden
            className={cn(
              "relative flex h-[4.75rem] items-center justify-center rounded-lg border-2 border-dashed transition-colors duration-500",
              on(3) ? "border-brand/60 bg-brand/[0.06]" : "border-line",
            )}
          >
            {[
              [24, 30],
              [58, 24],
              [40, 62],
              [70, 60],
            ].map(([x, y], k) => (
              <span
                key={k}
                className={cn(
                  "absolute h-3 w-2 rounded-[2px] border transition-colors duration-500",
                  on(3) ? "border-brand/60 bg-brand/25" : "border-line bg-ink-2",
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

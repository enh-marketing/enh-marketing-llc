"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Six capabilities, drawn inside the one account they all live in.
 *
 *  WHY THIS. The page's structural claim is that YouTube is bought inside Google
 *  Ads: "Your video and search activity live in the same account, sharing
 *  audiences, remarketing lists and conversion tracking." Every one of the six
 *  things we run is a part of that account, so the frame is the account and
 *  selecting a capability lights the part of it in question. Six separate cards
 *  would lose the only thing the six have in common.
 *
 *  Every row stays on screen at every selection, for the same reason.
 *
 *  THE PINS ARE A RAIL. They are this section's tablist and must be reachable in
 *  numbered order; distributed through the rows they would follow the drawing's
 *  layout instead. Two diagrams on this site shipped that bug before it was
 *  caught, and one of them could not be fixed with CSS alone.
 *
 *  Abstract throughout: blocks, slots and bars, never a word of ad copy. */
export function AdsAccount({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const on = (i: number) => active === i;

  const row = (i: number, children: React.ReactNode) => (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border p-3.5 transition-colors duration-500",
        on(i) ? "border-brand/60 bg-brand/[0.09]" : "border-line bg-void/40",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "font-display shrink-0 text-[0.6rem] font-bold tabular-nums tracking-[0.18em] transition-colors duration-500",
          on(i) ? "text-brand-text" : "text-ash",
        )}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      {children}
    </div>
  );

  const bar = (lit: boolean, w: string, thin?: boolean) => (
    <span
      aria-hidden
      className={cn(
        "rounded-full transition-colors duration-500",
        thin ? "h-1" : "h-1.5",
        lit ? "bg-brand/70" : "bg-line",
      )}
      style={{ width: w }}
    />
  );

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      {/* The tablist, in the order the document numbers the capabilities. */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5 border-b border-line pb-5">
        {Array.from({ length: count }).map((_, i) => pin(i))}
      </div>

      <div className="flex flex-col gap-2.5">
        {/* 01 — the campaign structure. */}
        {row(
          0,
          <span aria-hidden className="flex flex-1 gap-1.5">
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className={cn(
                  "h-7 flex-1 rounded-[4px] border transition-colors duration-500",
                  on(0) ? "border-brand/55 bg-brand/[0.14]" : "border-line bg-ink-2/60",
                )}
              />
            ))}
          </span>,
        )}

        {/* 02 — where the ads sit in a viewing session. */}
        {row(
          1,
          <span aria-hidden className="flex flex-1 items-center gap-1.5">
            {[0, 1, 2, 3, 4, 5, 6].map((k) => (
              <span
                key={k}
                className={cn(
                  "h-5 flex-1 rounded-[3px] transition-colors duration-500",
                  on(1) && (k === 0 || k === 3 || k === 6) ? "bg-brand" : "bg-line",
                )}
              />
            ))}
          </span>,
        )}

        {/* 03 — the vertical slot. */}
        {row(
          2,
          <span aria-hidden className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "h-9 w-5 rounded-[4px] border transition-colors duration-500",
                on(2) ? "border-brand/60 bg-brand/[0.16]" : "border-line bg-ink-2/60",
              )}
            />
            {bar(on(2), "58%", true)}
          </span>,
        )}

        {/* 04 — who it is shown to. */}
        {row(
          3,
          <span aria-hidden className="flex flex-1 flex-wrap items-center gap-1.5">
            {["18%", "26%", "14%", "22%"].map((w, k) => (
              <span
                key={k}
                className={cn(
                  "h-5 rounded-full border transition-colors duration-500",
                  on(3) ? "border-brand/55 bg-brand/[0.14]" : "border-line bg-ink-2/60",
                )}
                style={{ width: w }}
              />
            ))}
          </span>,
        )}

        {/* 05 — the same asset at several lengths. */}
        {row(
          4,
          <span aria-hidden className="flex flex-1 flex-col gap-1.5">
            {["82%", "56%", "34%"].map((w, k) => (
              <span key={k}>{bar(on(4), w)}</span>
            ))}
          </span>,
        )}

        {/* 06 — what gets counted, connected to the rest of the account. */}
        {row(
          5,
          <span aria-hidden className="flex flex-1 items-center gap-2">
            {bar(on(5), "40%")}
            <span
              className={cn(
                "h-2 w-2 shrink-0 rotate-45 border transition-colors duration-500",
                on(5) ? "border-brand bg-brand/40" : "border-line",
              )}
            />
            {bar(on(5), "34%")}
          </span>,
        )}
      </div>
    </div>
  );
}

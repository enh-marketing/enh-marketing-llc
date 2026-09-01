"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** A shelf of stores, one tile per kind of merchant the build suits.
 *
 *  WHY THIS DRAWING. The section lists eight categories of business an
 *  ecommerce build earns its cost in. Eight categories of shop is a shelf, and
 *  a shelf is the one arrangement where a reader can look for their own trade
 *  rather than read down a column hoping to meet it.
 *
 *  Each tile is a storefront: an abstract product block, a price bar, a
 *  category rule. Selecting a tile lights it and dims its neighbours, which is
 *  what a shelf does when you pick something off it.
 *
 *  The tiles carry no words. Naming the categories inside the drawing would
 *  duplicate the panel beside it and halve the type size doing it. */
export function StoreShelf({
  count,
  active,
  pin,
}: {
  count: number;
  active: number;
  pin: PinRenderer;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-ink-3/60 p-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse at 20% 10%, black, transparent 72%)",
        }}
      />

      <ol className="relative grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => {
          const on = i === active;
          return (
            <li key={i} className="relative">
              <div
                aria-hidden
                className={cn(
                  "flex aspect-[4/5] flex-col justify-between rounded-xl border p-2.5 transition-all duration-500",
                  on
                    ? "border-brand/60 bg-brand/[0.08]"
                    : "border-line bg-ink-2 opacity-60 hover:opacity-100",
                )}
              >
                {/* The product. */}
                <span
                  className={cn(
                    "block h-1/2 w-full rounded-md transition-colors duration-500",
                    on ? "bg-brand/25" : "bg-snow/10",
                  )}
                />
                <span className="space-y-1.5">
                  <span className="block h-1 w-3/4 rounded-full bg-snow/20" />
                  <span
                    className={cn(
                      "block h-1 w-1/2 rounded-full transition-colors duration-500",
                      on ? "bg-brand/70" : "bg-snow/12",
                    )}
                  />
                </span>
              </div>

              {/* The pin sits on the tile it selects. */}
              {pin(i, "absolute -right-2 -top-2")}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

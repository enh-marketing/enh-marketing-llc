"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** The five stages, drawn on the thing they operate on: a set of pages.
 *
 *  WHY THIS AND NOT ANOTHER RUN. Every stage in this document does something to
 *  pages rather than to a project — it picks some out, merges two that compete,
 *  rewrites the signals on the ones that are left, ships them, then watches
 *  them. A rail of nodes shows the order and nothing else. Keeping one set of
 *  pages on screen and changing what has happened to it shows the work.
 *
 *  WHAT IS ASSERTED. Only what each stage's own sentence says: that not every
 *  page is worked on ("Not every page deserves attention"), that two competing
 *  pages become one ("One gets strengthened, the other gets merged"), that the
 *  signals get rewritten, that the result is implemented, and that it is then
 *  watched. The number of tiles is a legible grid, not a claim about site size,
 *  and no tile is labelled.
 *
 *  Abstract throughout, and driven entirely by CSS transitions on the selected
 *  stage: no timeline, nothing to fall out of sync. */

/** Which tiles the run works on, and which one is merged away at stage two.
 *  Fixed so the drawing is deterministic. */
const WORKED = [1, 3, 6, 8, 11];
const MERGED_AWAY = 8;

export function PageSet({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const reached = (stage: number) => active >= stage;

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      {/* The pins are the navigation. */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        {Array.from({ length: count }).map((_, i) => pin(i))}
      </div>

      {/* The set. */}
      <div className="grid grid-cols-4 gap-2.5">
        {Array.from({ length: 12 }).map((_, i) => {
          const worked = WORKED.includes(i);
          // Stage 2 folds one competing page into another.
          const gone = reached(1) && i === MERGED_AWAY;
          const live = worked && !gone;
          return (
            <div
              key={i}
              aria-hidden
              className={cn(
                "flex h-[4.5rem] flex-col justify-between rounded-lg border p-2 transition-all duration-500",
                gone
                  ? "border-dashed border-line/60 bg-transparent opacity-40"
                  : live && reached(0)
                    ? "border-brand/55 bg-brand/[0.08]"
                    : "border-line bg-void/40",
                // Shipped.
                live && reached(3) && "border-brand bg-brand/[0.14]",
              )}
            >
              <span className="flex items-center gap-1">
                <span
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-500",
                    // The signals get rewritten at stage three.
                    live && reached(2) ? "bg-brand" : gone ? "bg-line/50" : "bg-line",
                  )}
                />
                {live && reached(3) && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                )}
              </span>
              <span className="flex flex-col gap-1">
                <span
                  className={cn(
                    "h-[3px] w-[85%] rounded-full transition-colors duration-500",
                    live && reached(2) ? "bg-brand/60" : "bg-line",
                  )}
                />
                <span
                  className={cn(
                    "h-[3px] w-[60%] rounded-full transition-colors duration-500",
                    live && reached(2) ? "bg-brand/60" : "bg-line",
                  )}
                />
              </span>
            </div>
          );
        })}
      </div>

      {/* What is being watched afterwards. Only drawn once the run reaches it. */}
      <div
        aria-hidden
        className={cn(
          "mt-4 flex items-end gap-1.5 rounded-lg border border-line bg-void/40 p-3 transition-opacity duration-500",
          reached(4) ? "opacity-100" : "opacity-25",
        )}
      >
        {[26, 38, 31, 47, 42, 58, 54, 66].map((h, i) => (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-t-sm transition-colors duration-500",
              reached(4) ? "bg-brand/55" : "bg-line",
            )}
            style={{ height: h * 0.5 }}
          />
        ))}
      </div>
    </div>
  );
}

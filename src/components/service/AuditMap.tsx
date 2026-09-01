"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Where an audit looks, drawn as the territory it covers.
 *
 *  WHY THIS. The document calls these "five connected areas" and says the audit
 *  "should show where visibility is being lost". Those five are not a sequence
 *  and not a menu: they are different distances from the page. Two of them sit
 *  outside the site entirely, one is the boundary of it, one is the set of pages
 *  inside, and one is a single page. So the drawing is that map, and selecting
 *  an area lights the zone it examines.
 *
 *  WHY THIS IS NOT THE MISTAKE MADE EARLIER ON THE ON-PAGE PAGE. That page had
 *  grey bars standing in for a webpage with no text anywhere near them, so they
 *  carried nothing. Here every zone is named, described and explained by the
 *  panel sitting beside it — the drawing orients, the panel says. Neither works
 *  alone and neither is asked to.
 *
 *  Every zone stays on screen at every selection, because the document's word is
 *  "connected": hiding four of five would make them look like alternatives.
 *
 *  THE PINS SIT OUTSIDE THE DRAWING. They are this section's tablist, so they
 *  have to be reachable in the order the areas are numbered — a keyboard user
 *  arrowing through them must go 01 to 05. Inside the map they would follow the
 *  map's own geometry instead (05, 04, 01, 03, 02), and because two zones are
 *  nested inside a third, CSS `order` cannot straighten that out the way it can
 *  on the lead-generation diagram. So the rail is a rail, and the zones are
 *  purely what they draw.
 *
 *  Driven entirely by CSS transitions on the selected index. No timeline. */
const AI = 4;
const OFFSITE = 3;
const TECHNICAL = 0;
const CONTENT = 2;
const ONPAGE = 1;

export function AuditMap({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const on = (zone: number) => active === zone;

  /** A zone marker: the area's numeral and a rule that lights when selected.
   *  Not a pin — the pins are the rail above, in numbered order. */
  const rail = (zone: number) => (
    <span aria-hidden className="flex shrink-0 items-center gap-2.5">
      <span
        className={cn(
          "font-display text-[0.6rem] font-bold tabular-nums tracking-[0.18em] transition-colors duration-500",
          on(zone) ? "text-brand-text" : "text-ash",
        )}
      >
        {String(zone + 1).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "h-px w-5 transition-colors duration-500",
          on(zone) ? "bg-brand" : "bg-line",
        )}
      />
    </span>
  );

  const tile = (lit: boolean, extra?: string) =>
    cn(
      "h-8 rounded-[4px] border transition-colors duration-500",
      lit ? "border-brand/60 bg-brand/[0.14]" : "border-line bg-void/40",
      extra,
    );

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      {/* The tablist, in the order the document numbers the areas. */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5 border-b border-line pb-5">
        {Array.from({ length: count }).map((_, i) => pin(i))}
      </div>

      <div className="flex flex-col gap-3">
        {/* 05 — beyond search altogether. */}
        <div
          className={cn(
            "flex items-center gap-4 rounded-xl border p-3.5 transition-colors duration-500",
            on(AI) ? "border-brand/55 bg-brand/[0.08]" : "border-dashed border-line/70",
          )}
        >
          {rail(AI)}
          <span aria-hidden className="flex flex-1 flex-col gap-1.5">
            <span
              className={cn(
                "h-1.5 w-3/4 rounded-full transition-colors duration-500",
                on(AI) ? "bg-brand/70" : "bg-line",
              )}
            />
            <span
              className={cn(
                "h-1.5 w-1/2 rounded-full transition-colors duration-500",
                on(AI) ? "bg-brand/40" : "bg-line",
              )}
            />
          </span>
        </div>

        {/* The citation coming back down. */}
        <svg aria-hidden viewBox="0 0 100 14" preserveAspectRatio="none" className="h-3.5 w-full">
          <line
            x1="50"
            y1="14"
            x2="50"
            y2="0"
            stroke={on(AI) ? "var(--color-brand)" : "var(--color-line)"}
            strokeWidth="0.6"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
            className="transition-[stroke] duration-500"
          />
        </svg>

        {/* 04 — the rest of the web, outside your site. */}
        <div
          className={cn(
            "flex items-center gap-4 rounded-xl border p-3.5 transition-colors duration-500",
            on(OFFSITE) ? "border-brand/55 bg-brand/[0.08]" : "border-dashed border-line/70",
          )}
        >
          {rail(OFFSITE)}
          <span aria-hidden className="flex flex-1 items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-500",
                  on(OFFSITE) ? "bg-brand" : "bg-line",
                )}
              />
            ))}
            <span
              aria-hidden
              className={cn(
                "ml-1 h-px flex-1 transition-colors duration-500",
                on(OFFSITE) ? "bg-brand/60" : "bg-line",
              )}
            />
          </span>
        </div>

        {/* 01 — the boundary: whether anything can get in and read it. */}
        <div
          className={cn(
            "rounded-xl border-2 p-4 transition-colors duration-500",
            on(TECHNICAL) ? "border-brand/60 bg-brand/[0.06]" : "border-line",
          )}
        >
          <div className="flex items-center gap-4">
            {rail(TECHNICAL)}
            <span
              aria-hidden
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-500",
                on(TECHNICAL) ? "bg-brand/70" : "bg-line",
              )}
            />
          </div>

          {/* 03 — the set of pages inside, and two of them overlapping. */}
          <div className="mt-4 flex items-start gap-4">
            {rail(CONTENT)}
            <span aria-hidden className="relative flex flex-1 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn(tile(on(CONTENT)), "flex-1")} />
              ))}
              {/* The pair competing for the same term. */}
              <span
                className={cn(
                  tile(on(CONTENT)),
                  "absolute left-[26%] top-2 w-[22%] -rotate-3",
                  on(CONTENT) ? "bg-brand/25" : "bg-ink-2",
                )}
              />
            </span>
          </div>

          {/* 02 — one page, and the signals on it. */}
          <div className="mt-4 flex items-start gap-4">
            {rail(ONPAGE)}
            <span
              aria-hidden
              className={cn(
                "flex flex-1 flex-col gap-1.5 rounded-lg border p-3 transition-colors duration-500",
                on(ONPAGE) ? "border-brand/55 bg-brand/[0.08]" : "border-line bg-void/40",
              )}
            >
              {["78%", "54%", "92%"].map((w, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-colors duration-500",
                    on(ONPAGE) ? (i === 0 ? "bg-brand" : "bg-brand/50") : "bg-line",
                  )}
                  style={{ width: w }}
                />
              ))}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

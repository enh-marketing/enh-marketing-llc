"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Seven services, drawn as the seven things they hand over.
 *
 *  WHY THIS. The document is about production, and it keeps returning to what
 *  arrives at the end of it: "The final proposal states the exact monthly
 *  output. You will know how many videos, photographs, carousels or other assets
 *  are included." So the drawing is the board of deliverables, and selecting a
 *  service lights the artefact it produces rather than a stage on a rail.
 *
 *  Every slot stays on screen at every selection, because the document's claim
 *  is that one process produces all of them: "Planning, filming, photography,
 *  editing, design and copy are managed through one workflow."
 *
 *  NO COUNTS ANYWHERE. The document refuses to name a monthly number, so each
 *  slot shows a kind of asset and never a quantity of it.
 *
 *  THE PINS ARE A RAIL above the board, in numbered order — not markers on the
 *  slots, where they would follow the board's layout instead. */
export function OutputBoard({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  const on = (i: number) => active === i;

  const slot = (i: number, children: React.ReactNode, className?: string) => (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border p-3.5 transition-colors duration-500",
        on(i) ? "border-brand/60 bg-brand/[0.09]" : "border-line bg-void/40",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "font-display text-[0.58rem] font-bold tabular-nums tracking-[0.18em] transition-colors duration-500",
          on(i) ? "text-brand-text" : "text-ash",
        )}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      {children}
    </div>
  );

  const fill = (i: number) => (on(i) ? "bg-brand/70" : "bg-line");
  const edge = (i: number) => (on(i) ? "border-brand/60" : "border-line");

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      {/* The tablist, in the order the document numbers the services. */}
      <div className="mb-5 flex flex-wrap items-center gap-2.5 border-b border-line pb-5">
        {Array.from({ length: count }).map((_, i) => pin(i))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {/* 01 — themes. */}
        {slot(
          0,
          <span aria-hidden className="flex flex-wrap gap-1.5">
            {["46%", "34%", "56%"].map((w, k) => (
              <span key={k} className={cn("h-3 rounded-full", fill(0))} style={{ width: w }} />
            ))}
          </span>,
        )}

        {/* 02 — a vertical video. */}
        {slot(
          1,
          <span
            aria-hidden
            className={cn("mx-auto h-12 w-8 rounded-[4px] border", edge(1), on(1) && "bg-brand/15")}
          />,
        )}

        {/* 03 — photographs. */}
        {slot(
          2,
          <span aria-hidden className="flex items-center justify-center">
            <span
              className={cn("flex h-12 w-12 items-center justify-center rounded-[4px] border", edge(2))}
            >
              <span className={cn("h-4 w-4 rounded-full", fill(2))} />
            </span>
          </span>,
        )}

        {/* 04 — a carousel. */}
        {slot(
          3,
          <span aria-hidden className="relative flex h-12 items-center justify-center">
            {[0, 1, 2].map((k) => (
              <span
                key={k}
                className={cn("absolute h-11 w-9 rounded-[4px] border", edge(3), on(3) && "bg-brand/[0.12]")}
                style={{ left: `${18 + k * 22}%`, zIndex: 3 - k }}
              />
            ))}
          </span>,
        )}

        {/* 05 — captions and copy. */}
        {slot(
          4,
          <span aria-hidden className="flex flex-col gap-1.5">
            {["100%", "82%", "94%", "60%"].map((w, k) => (
              <span key={k} className={cn("h-1.5 rounded-full", fill(4))} style={{ width: w }} />
            ))}
          </span>,
        )}

        {/* 06 — a creator. */}
        {slot(
          5,
          <span aria-hidden className="flex items-center gap-2">
            <span className={cn("h-7 w-7 shrink-0 rounded-full border", edge(5))} />
            <span className="flex flex-1 flex-col gap-1">
              <span className={cn("h-1.5 w-3/4 rounded-full", fill(5))} />
              <span className={cn("h-1.5 w-1/2 rounded-full", fill(5))} />
            </span>
          </span>,
        )}

        {/* 07 — something built rather than filmed. */}
        {count > 6 &&
          slot(
            6,
            <span
              aria-hidden
              className={cn(
                "flex h-12 items-center justify-center rounded-[4px] border border-dashed",
                edge(6),
                on(6) && "bg-brand/[0.12]",
              )}
            >
              <span className={cn("h-3 w-3 rotate-45", on(6) ? "bg-brand" : "bg-line")} />
            </span>,
            "col-span-2 sm:col-span-1",
          )}
      </div>
    </div>
  );
}

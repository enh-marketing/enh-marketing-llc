"use client";

import { cn } from "@/lib/cn";
import type { PinRenderer } from "@/components/service/PinnedExplorer";

/** Six services drawn as one setup rather than six separate things.
 *
 *  WHY NOT A SWAPPING PREVIEW OR A TRACK. The document is explicit about the
 *  relationship: "Six services that work as one setup. You can start with any
 *  of them, though they pull much harder together." That rules out a run — there
 *  is no order — and it rules out a drawing that replaces itself on selection,
 *  because the whole point is that the other five are still there. So every
 *  region stays on screen and selection lights one inside the frame. The frame
 *  is the setup.
 *
 *  WHY THE PAGE SITS AT THE BASE. Because the document says so, in its own
 *  words, at the end of that service: "Everything else we do builds on this."
 *  That is the only structural claim made here, and it is the document's. The
 *  other five sit above it in the order they are written, not in an invented
 *  hierarchy — their arrangement is a layout, and nothing about the drawing
 *  suggests a sequence between them.
 *
 *  Abstract throughout: blocks and bars, never a word. */
const CORE = 0;

export function SetupMap({
  active,
  pin,
  count,
}: {
  active: number;
  pin: PinRenderer;
  count: number;
}) {
  /** A region of the setup. Always present, lit only when selected. */
  const region = (i: number, bars: string[], className?: string) => {
    const on = active === i;
    return (
      <div
        className={cn(
          "flex flex-col justify-between rounded-xl border p-3.5 transition-colors duration-500",
          on ? "border-brand/60 bg-brand/[0.09]" : "border-line bg-void/40",
          className,
        )}
      >
        <div className="flex items-center gap-2.5">
          {pin(i, "shrink-0")}
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          {bars.map((w, j) => (
            <span
              key={j}
              aria-hidden
              className={cn(
                "h-1.5 rounded-full transition-colors duration-500",
                on ? "bg-brand/70" : "bg-line",
              )}
              style={{ width: w }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-[1.75rem] border border-line bg-ink-3/60 p-5 sm:p-6">
      {/* The frame is the setup; the regions are what runs inside it. */}
      <div className="flex flex-col gap-3">
        {/* Written order, laid out in two ranks. Nothing here implies a
            sequence between them — the document says you can start anywhere. */}
        <div className="grid grid-cols-2 gap-3">
          {region(1, ["72%", "54%"])}
          {region(4, ["64%", "80%"])}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {region(2, ["58%", "76%"])}
          {region(3, ["81%", "48%"])}
        </div>

        {count > 5 && region(5, ["46%", "68%", "58%"])}

        {/* Hairlines down into the thing the rest stand on. */}
        <svg
          aria-hidden
          viewBox="0 0 100 22"
          preserveAspectRatio="none"
          className="h-5 w-full"
        >
          {[18, 41, 59, 82].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2="50"
              y2="22"
              stroke={active === CORE ? "var(--color-brand)" : "var(--color-line)"}
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
              opacity={active === CORE ? 0.8 : 0.4}
              className="transition-[stroke] duration-500"
            />
          ))}
        </svg>

        {/* The base: the company page. */}
        <div
          className={cn(
            "rounded-xl border p-4 transition-colors duration-500",
            active === CORE
              ? "border-brand/60 bg-brand/[0.09]"
              : "border-line bg-ink-2/70",
          )}
        >
          <div className="flex items-center gap-4">
            {pin(CORE, "shrink-0")}
            <div className="flex flex-1 items-center gap-2">
              {["30%", "22%", "18%", "26%"].map((w, j) => (
                <span
                  key={j}
                  aria-hidden
                  className={cn(
                    "h-2 rounded-full transition-colors duration-500",
                    active === CORE ? "bg-brand/70" : "bg-line",
                  )}
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

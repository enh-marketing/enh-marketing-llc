"use client";

import { cn } from "@/lib/cn";

/** The sample a split test gets to read.
 *
 *  WHY THIS DRAWING. The testing section's argument is not that one method is
 *  better than the other. It is that the method is decided by how much traffic
 *  the page gets, and the document says so bluntly: a page producing twenty
 *  conversions a month cannot tell you whether the green button beat the blue
 *  one. That is an argument about sample size, so the drawing is the sample.
 *
 *  Two variants, told apart by fill rather than colour: filled and hollow. The
 *  document's example is a green button and a blue one, but green and blue are
 *  not in this palette and importing them to illustrate a throwaway example
 *  would cost more than it explains. Fill carries the same information.
 *
 *  WHAT IS AND IS NOT TO SCALE. The sparse field is exactly twenty dots,
 *  because twenty is the document's own figure. The dense field carries no
 *  count and is captioned with none, because the document never says what
 *  volume is enough — it says twenty is not, and stops. Reading a threshold off
 *  this drawing is not possible, which is correct: there isn't one here to read.
 *
 *  Nothing is animated. A sample size is a quantity, not an event, and the one
 *  honest way to show it is to put the dots on the page and let them be counted. */
export function SampleSplit({
  variant,
  className,
}: {
  /** "sparse" is the twenty-a-month page. "dense" is the one with volume. */
  variant: "sparse" | "dense";
  className?: string;
}) {
  const dense = variant === "dense";

  // Per side. Twenty total on the sparse field splits ten and ten, which is the
  // point of it: neither half is a sample anybody should be reading.
  const perSide = dense ? 88 : 10;

  /** Deterministic scatter. No Math.random: the same page must render the same
   *  dots on the server and in the browser, and a hydration mismatch over
   *  decorative jitter would be an absurd thing to ship. */
  const jitter = (i: number, salt: number) =>
    ((Math.sin((i + 1) * (salt === 0 ? 12.9898 : 78.233)) * 43758.5453) % 1 + 1) % 1;

  const side = (hollow: boolean) => (
    <div
      className={cn(
        "relative flex-1 rounded-xl border border-line/70 bg-void/40 p-3",
      )}
    >
      {dense ? (
        // With volume: a tidy block. Ordered because there is enough of it to
        // be a population rather than an anecdote.
        <div className="flex flex-wrap content-start gap-[5px]">
          {Array.from({ length: perSide }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-[5px] w-[5px] rounded-full",
                hollow ? "border border-fog/70" : "bg-brand/85",
              )}
            />
          ))}
        </div>
      ) : (
        // Without it: a scatter, deliberately hard to read anything off.
        <div className="relative h-[5.25rem]">
          {Array.from({ length: perSide }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "absolute h-[6px] w-[6px] rounded-full",
                hollow ? "border border-fog/70" : "bg-brand/85",
              )}
              style={{
                left: `${6 + jitter(i, hollow ? 1 : 0) * 84}%`,
                top: `${8 + jitter(i + 40, hollow ? 0 : 1) * 78}%`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={cn("flex items-stretch gap-3", className)}
      role="img"
      aria-label={
        dense
          ? "Two variants, each with a large sample of conversions."
          : "Two variants sharing twenty conversions between them."
      }
    >
      {side(false)}
      {/* The split itself. */}
      <span aria-hidden className="w-px shrink-0 self-stretch bg-line" />
      {side(true)}
    </div>
  );
}

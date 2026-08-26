import { cn } from "@/lib/cn";

/** Hero visual: creative moving through the feed.
 *
 *  Chosen because it is what this page is actually about. The document's own
 *  reasoning: creative dependency on Meta is "very high — creative is the main
 *  performance variable", and "since automation handles targeting, creative
 *  volume is now the main performance lever". So the hero shows volume — three
 *  columns of creative streaming past in Meta's real placement shapes (1:1 for
 *  static and carousel, 4:5 for feed, 9:16 for Reels and Stories) — with a few
 *  frames lit to read as the ones testing has picked out.
 *
 *  Deliberately not another hub-and-spoke with a red radial glow: that is the
 *  Performance Marketing hero's form, and repeating it here made the two pages
 *  look like the same page. A feed is Meta's own shape and nothing else's.
 *
 *  Wordless and numberless: no counts, no lift figures, nothing the document
 *  does not state.
 *
 *  Pure CSS animation on three strips, so it costs nothing at runtime and stops
 *  under prefers-reduced-motion via the one rule in globals.css. */

/** Meta's placement shapes. */
const RATIOS = ["4/5", "1/1", "9/16", "1/1", "9/16", "4/5"] as const;

/** Which frames read as the tested winners. Indices into a column's run. */
const LIT: Record<number, number> = { 0: 1, 1: 4, 2: 2 };

function Frame({ ratio, lit }: { ratio: string; lit: boolean }) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border",
        lit ? "border-brand/70 bg-brand/[0.07]" : "border-line bg-ink-2",
      )}
    >
      {/* Abstract creative: a subject block and two caption bars. Never text,
          so nothing here can read as a claim. */}
      <span
        className={cn(
          "absolute left-1/2 top-[38%] h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-md",
          lit ? "bg-brand/70" : "bg-line",
        )}
      />
      <span className="absolute bottom-3 left-3 right-6 h-[3px] rounded-full bg-line" />
      <span
        className={cn(
          "absolute bottom-[6px] left-3 h-[3px] w-1/3 rounded-full",
          lit ? "bg-brand/60" : "bg-line/70",
        )}
      />
      {lit && (
        <span
          aria-hidden
          className="glyph-pulse absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand"
        />
      )}
    </div>
  );
}

function Column({ offset, className }: { offset: number; className?: string }) {
  // Rotate the ratio run per column so the shapes never line up in rows.
  const run = RATIOS.map((_, i) => RATIOS[(i + offset) % RATIOS.length]);
  return (
    <div className="relative flex-1 overflow-hidden">
      <div className={cn("flex flex-col gap-4", className)}>
        {/* Two identical passes: -50% lands exactly back on the start. */}
        {[0, 1].map((pass) =>
          run.map((ratio, i) => (
            <Frame
              key={`${pass}-${i}`}
              ratio={ratio}
              lit={LIT[offset] === i}
            />
          )),
        )}
      </div>
    </div>
  );
}

export function CreativeFeed() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden h-[560px] w-[380px] -translate-y-1/2 lg:block"
      style={{
        // Frames dissolve at both ends instead of being cut off by a hard edge.
        maskImage:
          "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent)",
      }}
    >
      <div className="flex h-full gap-4">
        <Column offset={0} className="animate-feed" />
        {/* Middle strip runs the other way, so the eye reads volume and testing
            rather than one conveyor belt. */}
        <Column offset={1} className="animate-feed feed-slow feed-reverse" />
        <Column offset={2} className="animate-feed feed-slow" />
      </div>
    </div>
  );
}

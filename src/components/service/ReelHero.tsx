"use client";

import { cn } from "@/lib/cn";

/** The hero visual: a production console, cold-open.
 *
 *  THE PAGE IS A REEL. This page sells AI creative, and it has no creative to
 *  show: the document forbids a portfolio until real, approved work exists, and
 *  putting a stock clip in would be exactly the misrepresentation the copy
 *  warns against. So the page does not show output. It shows the console the
 *  studio operates, and it runs one pass through it, Generated to Delivered.
 *  This viewer is the cold open: the same object returns, parked on Delivered,
 *  at the closing CTA, so the whole page reads as one reel.
 *
 *  HONESTY IS THE DESIGN, NOT THE FINE PRINT. The one thing a page selling
 *  honesty about AI must never do is imply work it cannot show. So the frame
 *  never pretends to be a finished ad. It is a designed instrument whose subject
 *  is the pipeline itself: a code-drawn abstract field, not a picture. It is
 *  labelled AI-GENERATED, permanently, and by its aspect as a SLOT. The
 *  banner's three verbs, Generated / Reviewed / Delivered, are the scrubber's
 *  own ticks, and the play-head sits on the first of them.
 *
 *  NO INVENTED PROOF. No counts, no scores, no runtime, no metrics. The only
 *  words are the banner's own three verbs and the two structural chips (the
 *  aspect, and the disclosure). The motion is one house loop class, the same
 *  scan the rest of the page's play-head uses, and it rests in a readable
 *  finished state under prefers-reduced-motion. */
export function ReelHero({
  stages,
  className,
}: {
  /** The banner's three verbs, in order: Generated, Reviewed, Delivered. */
  stages: [string, string, string];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute right-[max(1rem,calc((100vw-1320px)/2))] top-1/2 z-0 hidden w-[460px] -translate-y-1/2 select-none lg:block xl:w-[520px]",
        className,
      )}
      role="img"
      aria-label="A production console showing a viewer labelled AI-generated, with a scrubber whose three marks read Generated, Reviewed and Delivered. The play-head rests on Generated."
    >
      <div className="relative overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]">
        {/* ------------------------------------------------- the top chrome -- */}
        <div className="flex items-center justify-between border-b border-line/80 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="ci-blink-soft h-2 w-2 rounded-full bg-brand" style={{ animationDuration: "2.4s" }} />
            <span className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-brand-text">
              AI-generated
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display rounded-md border border-line px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-ash tabular-nums">
              16:9
            </span>
            <span className="font-display rounded-md border border-line px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ash">
              Slot
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------ the viewer -- */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-2">
          {/* A subject held behind a play control: a video player, not a clip.
              A soft off-centre wash stands in for a framed shot, honest as a
              mock; no grid, no footage. */}
          <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
            <ellipse cx="222" cy="86" rx="92" ry="66" fill="var(--color-brand)" opacity="0.10" />
            <ellipse cx="70" cy="120" rx="60" ry="44" fill="var(--color-ash)" opacity="0.10" />
            <circle cx="160" cy="82" r="28" fill="none" stroke="var(--color-brand)" strokeWidth="2.4" />
            <path d="M152 68 l18 14 l-18 14 z" fill="var(--color-brand)" />
          </svg>
          {/* captions */}
          <span aria-hidden className="absolute inset-x-10 bottom-9 space-y-1.5">
            <span className="mx-auto block h-2 w-3/4 rounded-full bg-snow/25" />
            <span className="mx-auto block h-2 w-1/2 rounded-full bg-snow/15" />
          </span>

          {/* The play-head: the same scan the rest of the page rides. */}
          <span
            aria-hidden
            className="ci-scan-x absolute inset-y-0 left-0 w-[2px] bg-brand/70"
            style={{ animationDuration: "5.2s" }}
          />

          {/* The corner credential, over the field, never detaching. */}
          <span className="font-display absolute bottom-3 left-3 rounded border border-line/70 bg-ink/70 px-2 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-fog backdrop-blur-sm">
            No footage · code-drawn
          </span>
        </div>

        {/* ------------------------------------------------- the scrubber ---- */}
        <div className="px-4 pb-4 pt-4">
          <div className="relative h-[3px] w-full rounded-full bg-line">
            {/* Progress to the first mark: parked on Generated. */}
            <span className="absolute inset-y-0 left-0 w-[8%] rounded-full bg-brand" />
            {/* The head. */}
            <span className="absolute left-[8%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-ink-2" />
            {/* The three ticks. */}
            {[8, 54, 100].map((p, i) => (
              <span
                key={p}
                className={cn(
                  "absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                  i === 0 ? "bg-brand" : "bg-ash/60",
                )}
                style={{ left: `${p}%` }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            {stages.map((s, i) => (
              <span
                key={s}
                className={cn(
                  "font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em]",
                  i === 0 ? "text-brand-text" : "text-ash",
                )}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

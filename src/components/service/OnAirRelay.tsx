"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";

/** Why volume: one version tires, the next takes over.
 *
 *  THE DRAWING IS THE FIRST SENTENCE. "Paid campaigns need new creative as
 *  audiences become familiar with existing ads." So the section is a broadcast
 *  slot with one version on air and a queue behind it. The on-air version's
 *  warmth drains as it plays, the audience becoming familiar, and when it is
 *  spent the next version in the queue hands into the slot. That is the whole
 *  argument for volume, shown rather than asserted.
 *
 *  ONE APPROVED DIRECTION, MANY VERSIONS. "One approved direction can be
 *  adapted into different hooks, formats, audiences and platform placements."
 *  The source is a single brand-red node; every queued version is neutral and
 *  carries one of those four nouns, the paragraph's own. Nothing here is a real
 *  ad: the on-air frame is a code-drawn field, honest about being a slot.
 *
 *  THE CAVEAT KEEPS ITS PLACE. The second paragraph is a limit, not a boast, so
 *  it sits plainly beneath the relay: the proposal states the exact number, and
 *  AI is recommended only when it offers a practical advantage. */
const NOUNS = ["hooks", "formats", "audiences", "platform placements"] as const;

export function OnAirRelay({
  lead,
  caveat,
  labels,
}: {
  lead: string;
  caveat: string;
  labels: { direction: string; adapted: string[] };
}) {
  const enhanced = useEnhanced("(min-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const playing = enhanced && !reduced;

  const [onAir, setOnAir] = useState(0);
  const [held, setHeld] = useState(false);

  /* The relay advances on its own, so a reader who never touches it still sees
     a version tire and the next take over. It stops on hover and under reduced
     motion, where it simply rests with the first version on air. */
  useEffect(() => {
    if (!playing || held) return;
    const t = window.setInterval(() => setOnAir((i) => (i + 1) % NOUNS.length), 3200);
    return () => window.clearInterval(t);
  }, [playing, held]);

  return (
    <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
      {/* -------------------------------------------------------- the words -- */}
      <div>
        <p className="max-w-[54ch] text-[0.9375rem] leading-relaxed text-fog">{lead}</p>

        {/* The source and its four adaptations, named. */}
        <div className="mt-8 flex items-center gap-4">
          <span className="font-display inline-flex items-center gap-2 rounded-lg border border-brand/60 bg-brand/[0.08] px-3.5 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-brand-text">
            <span aria-hidden className="h-2 w-2 rounded-sm bg-brand" />
            {labels.direction}
          </span>
          <span aria-hidden className="h-px flex-1 bg-ash/30" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {labels.adapted.map((n, i) => (
            <span
              key={n}
              className={cn(
                "font-display rounded-full border px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] transition-colors duration-500 motion-reduce:transition-none",
                onAir === i ? "border-brand/55 text-brand-text" : "border-line text-ash",
              )}
            >
              {n}
            </span>
          ))}
        </div>

        <p className="mt-10 max-w-[56ch] border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-ash">
          {caveat}
        </p>
      </div>

      {/* -------------------------------------------------------- the relay -- */}
      <div
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        className="rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-6"
      >
        {/* The slot on air. */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-brand/50 bg-void">
          {/* The warmth that drains as the audience becomes familiar. Keyed on
              the on-air index so it restarts each handover; absent (a resting
              full warmth) when not playing. */}
          <span
            key={playing && !held ? onAir : "rest"}
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(232,0,13,0.16), transparent 60%)",
              ...(playing && !held ? { animation: "onair-cool 3.2s linear forwards" } : {}),
            }}
          />
          <ReelField />
          <span className="font-display absolute left-3 top-3 inline-flex items-center gap-1.5 rounded border border-brand/60 bg-ink/70 px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-brand-text backdrop-blur-sm">
            <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full bg-brand", playing && !held && "ci-blink-soft")} />
            On air
          </span>
          <span className="font-display absolute right-3 top-3 rounded border border-line/70 bg-ink/60 px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-ash">
            {NOUNS[onAir]}
          </span>
        </div>

        {/* The queue: what hands in next. */}
        <div className="mt-4 flex items-center gap-2.5">
          <span className="font-display shrink-0 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-ash">Queue</span>
          <div className="flex flex-1 gap-2">
            {NOUNS.map((n, i) => (
              <div
                key={n}
                className={cn(
                  "h-9 flex-1 rounded-md border transition-colors duration-500 motion-reduce:transition-none",
                  i === onAir
                    ? "border-brand/60 bg-brand/[0.08]"
                    : i === (onAir + 1) % NOUNS.length
                      ? "border-ash/60 bg-ink-3"
                      : "border-line bg-ink-3/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** A video player, honest about being a slot rather than a clip: a subject
 *  wash behind a play control, and a caption line. No grid, no footage. */
function ReelField() {
  return (
    <>
      <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
        <ellipse cx="214" cy="84" rx="88" ry="62" fill="var(--color-brand)" opacity="0.10" />
        <circle cx="150" cy="82" r="26" fill="none" stroke="var(--color-brand)" strokeWidth="2.2" />
        <path d="M143 69 l16 13 l-16 13 z" fill="var(--color-brand)" />
      </svg>
      <span aria-hidden className="absolute inset-x-10 bottom-8 space-y-1.5">
        <span className="mx-auto block h-2 w-3/4 rounded-full bg-snow/25" />
        <span className="mx-auto block h-2 w-1/2 rounded-full bg-snow/15" />
      </span>
    </>
  );
}

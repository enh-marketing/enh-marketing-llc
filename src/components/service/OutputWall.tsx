"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Output } from "@/content/services/ai-creative-production";

/** What we produce, as a wall of output that never stops moving.
 *
 *  WHY THIS AND NOT THE RACK IT REPLACES. The rack drew four small monitors in
 *  1px outlines on a pale ground: a systems diagram, on a page selling creative
 *  work. This is a creative page, so the section behaves like one. It runs full
 *  bleed, edge to edge. Behind everything, columns of format frames drift
 *  continuously at different speeds, the way a studio's output wall or a
 *  reference board does, dense rather than empty. In front, the four output
 *  names are set at display scale, not as 11px chips.
 *
 *  THE INTERACTION IS THE ARGUMENT. Every frame on the wall has a true aspect
 *  ratio, and each output owns one: a 16:9 for video, a 9:16 for the vertical
 *  creator ad, a 1:1 for product imagery. Choosing an output lights every frame
 *  in that format and lets the rest fall back. Choosing Creative Variants at
 *  Scale lights ALL of them at once, because that is exactly what the copy says
 *  it is: one approved idea carried into every format. The wall proves the
 *  sentence rather than captioning it.
 *
 *  HONEST WITHOUT BEING GREY. There is still no real creative here and none is
 *  implied: the frames carry abstract washes built from the brand's own reds and
 *  inks, plus the chrome a piece of creative has (a play control, a caption
 *  line, a call to action). They are openly code-drawn, and the wall says so.
 *  Colour and depth come from the existing palette; no new hue is invented. */

type Ratio = "16/9" | "9/16" | "1/1" | "4/5";

/** Which format each output owns. Variants owns them all, per its own copy. */
const OWNS: Record<Output["kind"], Ratio[]> = {
  video: ["16/9"],
  ugc: ["9/16"],
  imagery: ["1/1"],
  variants: ["16/9", "9/16", "1/1", "4/5"],
};

/** The wall's frames, authored rather than random so the layout is stable and
 *  every column keeps a believable mix of formats. `art` picks the chrome a
 *  piece of that format would carry. */
type Tile = { ratio: Ratio; art: "play" | "caption" | "cta" | "plain" };
const COLUMNS: Tile[][] = [
  [
    { ratio: "16/9", art: "play" },
    { ratio: "1/1", art: "plain" },
    { ratio: "9/16", art: "cta" },
    { ratio: "4/5", art: "caption" },
    { ratio: "16/9", art: "caption" },
  ],
  [
    { ratio: "9/16", art: "caption" },
    { ratio: "16/9", art: "play" },
    { ratio: "4/5", art: "plain" },
    { ratio: "1/1", art: "plain" },
    { ratio: "9/16", art: "cta" },
  ],
  [
    { ratio: "1/1", art: "plain" },
    { ratio: "4/5", art: "caption" },
    { ratio: "16/9", art: "play" },
    { ratio: "9/16", art: "cta" },
    { ratio: "1/1", art: "plain" },
  ],
  [
    { ratio: "4/5", art: "plain" },
    { ratio: "9/16", art: "caption" },
    { ratio: "1/1", art: "plain" },
    { ratio: "16/9", art: "play" },
    { ratio: "4/5", art: "cta" },
  ],
  [
    { ratio: "16/9", art: "caption" },
    { ratio: "1/1", art: "plain" },
    { ratio: "9/16", art: "play" },
    { ratio: "4/5", art: "plain" },
    { ratio: "16/9", art: "cta" },
  ],
];

const SPEEDS = ["58s", "74s", "48s", "82s", "64s"];

export function OutputWall({ items }: { items: Output[] }) {
  const enhanced = useEnhanced("(min-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const names = useRef<(HTMLButtonElement | null)[]>([]);

  const [taken, setTaken] = useState(false);
  const [held, setHeld] = useState(false);
  const rotating = enhanced && !reduced && !taken && !held;

  useEffect(() => {
    if (!rotating || items.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), 4600);
    return () => window.clearInterval(t);
  }, [rotating, items.length]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    setTaken(true);
    names.current[next]?.focus();
  }

  const cur = items[active];
  const lit = OWNS[cur.kind];

  return (
    <div
      className="relative"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* ------------------------------------------------------- the wall --
          Full bleed, behind everything, always moving. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden"
      >
        <div className="flex h-full justify-center gap-3 sm:gap-4 lg:gap-5">
          {COLUMNS.map((col, ci) => (
            <div
              key={ci}
              className={cn(
                "w-[26vw] shrink-0 sm:w-[19vw] lg:w-[15vw] xl:w-[13vw]",
                // The outer columns are dropped on small screens so the wall
                // stays dense rather than smeared.
                ci >= 3 && "hidden sm:block",
                ci >= 4 && "hidden lg:block",
              )}
            >
              <div
                className={cn("flex flex-col gap-3 sm:gap-4 lg:gap-5", !reduced && "wall-drift")}
                style={{
                  animationDuration: SPEEDS[ci],
                  animationDirection: ci % 2 ? "reverse" : "normal",
                }}
              >
                {/* Twice, so the loop is seamless. */}
                {[0, 1].map((pass) =>
                  col.map((t, i) => (
                    <Frame key={`${pass}-${i}`} tile={t} lit={lit.includes(t.ratio)} />
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
        {/* A scrim that holds the type side and clears the wall side, so the
            names stay readable and the wall stays visible. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-void)_0%,var(--color-void)_44%,color-mix(in_oklab,var(--color-void)_60%,transparent)_60%,transparent_82%)]" />
        {/* Below the large breakpoint there is no room for type beside the
            wall, so the wall drops back to a texture and the words take the
            screen. */}
        <div className="absolute inset-0 bg-void/80 lg:hidden" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />
      </div>

      {/* ------------------------------------------------------ the names -- */}
      <div className="relative z-10 py-4 lg:w-[54%] lg:py-8">
        <div
          role="tablist"
          aria-label="What we produce"
          onKeyDown={onKeyDown}
          className="max-w-[26ch]"
        >
          {items.map((it, i) => {
            const on = i === active;
            return (
              <button
                key={it.no}
                ref={(el) => {
                  names.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="wall-copy"
                tabIndex={on ? 0 : -1}
                onMouseEnter={() => !taken && setActive(i)}
                onClick={() => {
                  setActive(i);
                  setTaken(true);
                }}
                className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <span className="flex items-baseline gap-3 sm:gap-4">
                  <span
                    className={cn(
                      "font-display shrink-0 text-[0.6875rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                      on ? "text-brand-text" : "text-ash",
                    )}
                  >
                    {it.no}
                  </span>
                  <span
                    className={cn(
                      "font-display block font-extrabold uppercase leading-[0.95] tracking-[-0.01em] transition-colors duration-500 motion-reduce:transition-none",
                      "text-[clamp(1.5rem,3.6vw,2.6rem)]",
                      on ? "text-snow" : "text-ash/55 group-hover:text-fog",
                    )}
                  >
                    {it.title}
                  </span>
                </span>
                {/* The rule under the chosen name, drawn out. */}
                <span
                  aria-hidden
                  className={cn(
                    "mt-1.5 block h-[2px] origin-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    on ? "w-full bg-brand" : "w-8 bg-ash/35 group-hover:w-20",
                  )}
                />
                <span className="mb-5 block sm:mb-6" />
              </button>
            );
          })}
        </div>

        {/* ------------------------------------------------------ the copy -- */}
        <div id="wall-copy" className="mt-4 max-w-[62ch]">
          <div className="flex flex-wrap gap-2">
            {cur.labels.map((l) => (
              <span
                key={l}
                className="font-display rounded-full border border-brand/40 bg-brand/[0.08] px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-brand-text"
              >
                {l}
              </span>
            ))}
            <span className="font-display rounded-full border border-line px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-ash">
              {lit.length > 1 ? "every format" : lit[0].replace("/", ":")}
            </span>
          </div>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-fog sm:text-base">{cur.body}</p>
        </div>

        <p className="font-display mt-10 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash/70">
          Wall shown is code-drawn · no client footage
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- frame --
   One piece of output on the wall. Lit frames carry the brand wash and their
   chrome; the rest sit back in ink so the wall reads as depth, not noise. */
function Frame({ tile, lit }: { tile: Tile; lit: boolean }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        lit ? "opacity-100" : "opacity-55",
      )}
      style={{ aspectRatio: tile.ratio }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none"
        style={{
          background: lit
            ? "linear-gradient(145deg, var(--color-brand) 0%, var(--color-brand-deep) 55%, var(--color-ink) 100%)"
            : "linear-gradient(145deg, var(--color-ink-3) 0%, var(--color-ink) 60%, var(--color-void) 100%)",
        }}
      />
      {/* a soft light, so the frames have depth rather than flat fill */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.16), transparent 62%)" }}
      />

      {tile.art === "play" && (
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white/70 sm:h-11 sm:w-11">
            <span className="ml-[3px] h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white/80" />
          </span>
        </span>
      )}
      {tile.art === "caption" && (
        <span aria-hidden className="absolute inset-x-3 bottom-3 space-y-1.5">
          <span className="block h-1.5 w-4/5 rounded-full bg-white/40" />
          <span className="block h-1.5 w-1/2 rounded-full bg-white/25" />
        </span>
      )}
      {tile.art === "cta" && (
        <span aria-hidden className="absolute inset-x-3 bottom-3 block h-6 rounded-full bg-white/85">
          <span className="mx-auto mt-[9px] block h-1.5 w-1/2 rounded-full bg-void/60" />
        </span>
      )}
    </div>
  );
}

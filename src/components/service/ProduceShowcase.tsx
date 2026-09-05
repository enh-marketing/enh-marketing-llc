"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Output } from "@/content/services/ai-creative-production";

/* The two washes every stage is built from. NEUTRAL uses ash and fog rather
   than ink-3 and void: the stage ground is near-white in the light theme, so a
   white-to-off-white gradient vanished on it. ash to fog is a true mid grey in
   light and a light grey in dark, so the frames read in both. */
const HOT = "linear-gradient(140deg, var(--color-brand) 0%, var(--color-brand-deep) 72%)";
const NEUTRAL = "linear-gradient(140deg, var(--color-ash) 0%, var(--color-fog) 85%)";

/** What we produce: four outputs, four different stages.
 *
 *  WHY FOUR STAGES AND NOT ONE WALL. The version before this drew a single
 *  drifting wall and merely re-tinted it when the reader changed output, so all
 *  four looked the same and only the colour moved. A video ad, a vertical
 *  creator ad, a product still and a variant explosion are four different
 *  objects. They differ in orientation, in what they are made of, and in how
 *  they move, so each gets its own stage:
 *
 *    01  video     a wide cinematic frame over a filmstrip running sideways
 *    02  ugc       a rank of vertical phones, each feed scrolling upward
 *    03  imagery   one square, the product held still while the set changes
 *    04  variants  one source multiplying outward into every format
 *
 *  The motion axis is different in each: horizontal, vertical, a cross-fade,
 *  and a radial spread. Nothing here is a re-tint of anything else.
 *
 *  STILL NO REAL CREATIVE. Every stage is code-drawn: gradient washes in the
 *  brand's own reds and inks, plus the chrome a piece of creative carries (a
 *  play control, a caption, a call to action). The presenter is a silhouette
 *  with its disclosure pinned, never a face. The section says it is code-drawn.
 */
export function ProduceShowcase({ items }: { items: Output[] }) {
  const enhanced = useEnhanced("(min-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const [taken, setTaken] = useState(false);
  const [held, setHeld] = useState(false);
  const rotating = enhanced && !reduced && !taken && !held;

  useEffect(() => {
    if (!rotating || items.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), 5200);
    return () => window.clearInterval(t);
  }, [rotating, items.length]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    setTaken(true);
    tabs.current[next]?.focus();
  }

  const cur = items[active];

  return (
    <div
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* ------------------------------------------------------- the names -- */}
      <div
        role="tablist"
        aria-label="What we produce"
        onKeyDown={onKeyDown}
        className="-mx-6 flex gap-6 overflow-x-auto px-6 pb-1 [scrollbar-width:thin] sm:mx-0 sm:gap-8 sm:overflow-visible sm:px-0 lg:gap-12"
      >
        {items.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.no}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="produce-stage"
              tabIndex={on ? 0 : -1}
              onMouseEnter={() => !taken && setActive(i)}
              onClick={() => {
                setActive(i);
                setTaken(true);
              }}
              className="group shrink-0 pb-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:shrink"
            >
              <span
                className={cn(
                  "font-display block text-[0.6875rem] font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                  on ? "text-brand-text" : "text-ash",
                )}
              >
                {it.no}
              </span>
              <span
                className={cn(
                  "font-display mt-1.5 block max-w-[15ch] text-[0.9375rem] font-extrabold uppercase leading-[1.15] transition-colors duration-500 motion-reduce:transition-none sm:text-[1.0625rem] lg:text-[1.25rem]",
                  on ? "text-snow" : "text-ash/70 group-hover:text-fog",
                )}
              >
                {it.title}
              </span>
              <span
                aria-hidden
                className={cn(
                  "mt-3 block h-[2px] origin-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                  on ? "w-full bg-brand" : "w-6 bg-ash/35 group-hover:w-14",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------- the stage --
          A different object per output, not a re-tint of one. */}
      <div
        id="produce-stage"
        className="relative mt-8 h-[380px] overflow-hidden rounded-[1.5rem] bg-ink-2 sm:mt-10 sm:h-[460px] lg:h-[520px]"
      >
        {items.map((it, i) => (
          <div
            key={it.no}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              i === active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            aria-hidden={i !== active}
          >
            {it.kind === "video" && <VideoStage reduced={reduced} />}
            {it.kind === "ugc" && <UgcStage reduced={reduced} />}
            {it.kind === "imagery" && <ImageryStage reduced={reduced} live={i === active} />}
            {it.kind === "variants" && <VariantsStage reduced={reduced} />}
          </div>
        ))}
      </div>

      {/* -------------------------------------------------------- the copy -- */}
      <div className="mt-8 grid gap-x-14 gap-y-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex flex-wrap items-start gap-2">
          {cur.labels.map((l) => (
            <span
              key={l}
              className="font-display rounded-full border border-brand/40 bg-brand/[0.08] px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-brand-text"
            >
              {l}
            </span>
          ))}
        </div>
        <div>
          <p className="max-w-[64ch] text-[0.9375rem] leading-relaxed text-fog sm:text-base">{cur.body}</p>
          <p className="font-display mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ash/70">
            Stages are code-drawn · no client footage
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================== 01 video ==
   Wide and cinematic. One frame holds the screen; under it a filmstrip of
   scenes runs sideways, which is the axis a cut is read on. */
function VideoStage({ reduced }: { reduced: boolean }) {
  const scenes = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex h-full flex-col justify-center gap-5 p-5 sm:gap-7 sm:p-8">
      <div className="relative mx-auto aspect-[16/9] w-full max-w-[720px] overflow-hidden rounded-xl">
        <div
          className="absolute inset-0"
          style={{ background: HOT }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 28% 20%, rgba(255,255,255,0.22), transparent 60%)" }}
        />
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/80 sm:h-20 sm:w-20">
            <span className="ml-1 h-0 w-0 border-y-[11px] border-l-[18px] border-y-transparent border-l-white/90" />
          </span>
        </span>
        <span aria-hidden className="absolute inset-x-10 bottom-10 space-y-2">
          <span className="mx-auto block h-2.5 w-3/5 rounded-full bg-white/45" />
          <span className="mx-auto block h-2.5 w-2/5 rounded-full bg-white/25" />
        </span>
        <span aria-hidden className="absolute inset-x-5 bottom-4 h-1 rounded-full bg-white/25">
          <span className="block h-full w-1/3 rounded-full bg-white/90" />
        </span>
        {!reduced && (
          <span aria-hidden className="ci-scan-x absolute inset-y-0 left-0 w-[2px] bg-white/60" style={{ animationDuration: "6s" }} />
        )}
      </div>

      {/* the cut: scenes running sideways */}
      <div aria-hidden className="relative overflow-hidden">
        <div
          className={cn("flex w-max gap-3", !reduced && "strip-drift")}
          style={{ animationDuration: "34s" }}
        >
          {[0, 1].map((pass) =>
            scenes.map((n) => (
              <span
                key={`${pass}-${n}`}
                className="block aspect-[16/9] w-[104px] shrink-0 rounded-md sm:w-[132px]"
                style={{
                  background: n % 3 === 0 ? HOT : NEUTRAL,
                  opacity: n % 3 === 0 ? 1 : 0.75,
                }}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================ 02 ugc ==
   A rank of vertical phones, each feed scrolling upward at its own speed. The
   axis is vertical, which is how this format is actually watched. */
function UgcStage({ reduced }: { reduced: boolean }) {
  const phones = [
    { speed: "26s", lead: false },
    { speed: "20s", lead: true },
    { speed: "31s", lead: false },
  ];
  return (
    <div className="flex h-full items-center justify-center gap-4 p-5 sm:gap-7 sm:p-8">
      {phones.map((ph, pi) => (
        <div
          key={pi}
          className={cn(
            "relative aspect-[9/16] shrink-0 overflow-hidden rounded-2xl border",
            ph.lead ? "h-[92%] border-brand/60" : "hidden h-[74%] border-line sm:block",
          )}
        >
          {/* the feed, scrolling */}
          <div
            aria-hidden
            className={cn("flex flex-col gap-2", !reduced && "wall-drift")}
            style={{ animationDuration: ph.speed }}
          >
            {[0, 1].map((pass) =>
              [0, 1, 2, 3].map((n) => (
                <span
                  key={`${pass}-${n}`}
                  className="block aspect-[9/14] w-full shrink-0 rounded-lg"
                  style={{ background: (n + pi) % 2 === 0 ? HOT : NEUTRAL }}
                />
              )),
            )}
          </div>

          {ph.lead && (
            <>
              {/* A hold behind the overlay, so the white silhouette, caption and
                  call to action read whatever the feed is showing. */}
              <span
                aria-hidden
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.34) 0%, rgba(10,10,10,0.18) 38%, rgba(10,10,10,0.72) 100%)" }}
              />
              {/* the presenter, a silhouette, never a face */}
              <svg viewBox="0 0 120 200" className="absolute inset-x-0 bottom-[22%] mx-auto h-[46%]" aria-hidden preserveAspectRatio="xMidYMax meet">
                <circle cx="60" cy="62" r="30" fill="rgba(255,255,255,0.5)" />
                <path d="M12 168 a48 48 0 0 1 96 0 Z" fill="rgba(255,255,255,0.5)" />
              </svg>
              {/* caption + call to action */}
              <span aria-hidden className="absolute inset-x-4 bottom-[13%] space-y-1.5">
                <span className="block h-2 w-4/5 rounded-full bg-white/55" />
                <span className="block h-2 w-3/5 rounded-full bg-white/35" />
              </span>
              <span aria-hidden className="absolute inset-x-4 bottom-[6%] block h-8 rounded-full bg-white/90">
                <span className="mx-auto mt-[13px] block h-2 w-1/2 rounded-full bg-void/60" />
              </span>
              <span className="font-display absolute inset-x-0 top-0 border-b border-white/25 bg-void/55 px-2 py-1.5 text-center text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm">
                Synthetic presenter
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================ 03 imagery ==
   The still one. The product never moves; the set changes behind it. The copy
   is about new settings, seasonal concepts and background variations, so the
   background is the only thing that changes and it cross-fades rather than
   drifts. */
const SETS = [
  "linear-gradient(150deg, var(--color-brand) 0%, var(--color-brand-deep) 60%, var(--color-ink) 100%)",
  "linear-gradient(150deg, var(--color-ink-3) 0%, var(--color-ash) 55%, var(--color-void) 100%)",
  "linear-gradient(150deg, var(--color-brand-deep) 0%, var(--color-void) 70%)",
  "linear-gradient(150deg, var(--color-void) 0%, var(--color-ink-3) 60%, var(--color-brand) 130%)",
];

function ImageryStage({ reduced, live }: { reduced: boolean; live: boolean }) {
  const [set, setSet] = useState(0);
  useEffect(() => {
    if (reduced || !live) return;
    const t = window.setInterval(() => setSet((s) => (s + 1) % SETS.length), 2600);
    return () => window.clearInterval(t);
  }, [reduced, live]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-5 sm:gap-6 sm:p-8">
      <div className="relative aspect-square h-[64%] overflow-hidden rounded-2xl sm:h-[70%]">
        {SETS.map((bg, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              i === set ? "opacity-100" : "opacity-0",
            )}
            style={{ background: bg }}
          />
        ))}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 32% 24%, rgba(255,255,255,0.2), transparent 62%)" }}
        />
        {/* the product, held. It is the one thing that never changes. */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <rect x="82" y="52" width="36" height="88" rx="10" fill="rgba(255,255,255,0.82)" />
          <rect x="92" y="38" width="16" height="16" rx="4" fill="rgba(255,255,255,0.82)" />
          <ellipse cx="100" cy="150" rx="44" ry="8" fill="rgba(0,0,0,0.22)" />
        </svg>
      </div>

      {/* the sets on offer */}
      <div aria-hidden className="flex gap-2.5">
        {SETS.map((bg, i) => (
          <span
            key={i}
            className={cn(
              "h-8 w-14 rounded-md ring-offset-2 ring-offset-ink-2 transition-all duration-500 motion-reduce:transition-none sm:h-10 sm:w-20",
              i === set ? "ring-2 ring-brand" : "opacity-55",
            )}
            style={{ background: bg }}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================== 04 variants ==
   The multiplication. One approved source at the left, then the same idea in
   every format spreading out to the right. The axis is a spread, not a drift.
   This is the only stage that is a mass of frames, because it is the only
   output that IS a mass of frames. */
const SPREAD = [
  { x: 46, y: 6, w: 20, h: 11 },
  { x: 70, y: 4, w: 11, h: 19 },
  { x: 86, y: 10, w: 12, h: 12 },
  { x: 47, y: 26, w: 13, h: 16 },
  { x: 66, y: 30, w: 21, h: 12 },
  { x: 90, y: 30, w: 9, h: 16 },
  { x: 46, y: 50, w: 18, h: 10 },
  { x: 69, y: 50, w: 12, h: 20 },
  { x: 86, y: 54, w: 13, h: 13 },
  { x: 48, y: 72, w: 14, h: 17 },
  { x: 67, y: 76, w: 20, h: 11 },
  { x: 91, y: 74, w: 8, h: 15 },
];

function VariantsStage({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative h-full p-5 sm:p-8">
      {/* the one approved source */}
      <div className="absolute left-5 top-1/2 aspect-[4/5] w-[26%] max-w-[190px] -translate-y-1/2 overflow-hidden rounded-xl sm:left-8">
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: HOT }}
        />
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/85">
            <span className="ml-[3px] h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white/90" />
          </span>
        </span>
        <span className="font-display absolute inset-x-0 bottom-0 bg-void/55 px-2 py-1.5 text-center text-[0.6875rem] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm">
          One idea
        </span>
      </div>

      {/* every format it becomes */}
      {SPREAD.map((f, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "absolute rounded-md",
            !reduced && "variant-pop",
          )}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.w}%`,
            height: `${f.h}%`,
            background: i % 3 === 0 ? HOT : NEUTRAL,
            animationDelay: `${(i % 6) * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}

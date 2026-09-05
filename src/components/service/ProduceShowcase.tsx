"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Output } from "@/content/services/ai-creative-production";

/* THE STAGE IS DARK, THE PAGE IS NOT. Two earlier passes failed in opposite
   directions: one filled the stages with saturated brand red, which this
   project's own notes forbid outright (red is an accent and a mark, never a
   ground); the next replaced it with white frames on a near-white page, which
   read as empty. Work is shown on a dark surface, the way a viewer, a lightbox
   or a cinema does. That is a contained device inside a light page, not the
   section changing theme, and it is what finally gives the frames somewhere to
   sit: light surfaces read, fine type reads, and a small red mark carries.

   Every frame is a pane of light on that dark ground. Depth comes from a top
   highlight and a soft shadow, never from saturation. */
const STAGE_INK = "#121110";
const PANE =
  "rounded-xl border border-white/12 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.85)] bg-[linear-gradient(160deg,rgba(255,255,255,0.11)_0%,rgba(255,255,255,0.045)_55%,rgba(255,255,255,0.02)_100%)]";
const PANE_SOFT =
  "rounded-lg border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.085)_0%,rgba(255,255,255,0.03)_100%)]";

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
        className="relative mt-8 h-[380px] overflow-hidden rounded-[1.5rem] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.55)] sm:mt-10 sm:h-[460px] lg:h-[520px]"
        style={{ backgroundColor: STAGE_INK }}
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
   Wide and cinematic. One pane holds the screen; under it a filmstrip of scenes
   runs sideways, which is the axis a cut is read on. */
function VideoStage({ reduced }: { reduced: boolean }) {
  const scenes = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-6 sm:gap-8 sm:p-10">
      <div className={cn("relative mx-auto aspect-[16/9] w-full max-w-[640px] overflow-hidden", PANE)}>
        {/* one warm light falling across the pane */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 95% at 26% 10%, rgba(232,0,13,0.20), transparent 58%), radial-gradient(90% 80% at 85% 95%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/45 backdrop-blur-[1px] sm:h-16 sm:w-16">
            <span className="ml-[3px] h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-white" />
          </span>
        </span>
        <span className="font-display absolute inset-x-0 bottom-11 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-white/55">
          Short-form
        </span>
        <span aria-hidden className="absolute inset-x-8 bottom-6 h-px bg-white/18">
          <span className="block h-full w-1/3 bg-brand" />
        </span>
      </div>

      <div aria-hidden className="relative overflow-hidden">
        <div className={cn("flex w-max gap-3", !reduced && "strip-drift")} style={{ animationDuration: "38s" }}>
          {[0, 1].map((pass) =>
            scenes.map((n) => (
              <span
                key={`${pass}-${n}`}
                className={cn("relative block aspect-[16/9] w-[112px] shrink-0 sm:w-[140px]", PANE_SOFT)}
              >
                {n % 4 === 0 && <span className="absolute left-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-brand" />}
                <span aria-hidden className="absolute inset-x-2.5 bottom-2.5 block h-px bg-white/15" />
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================ 02 ugc ==
   A rank of vertical phones, each feed scrolling upward at its own speed. */
function UgcStage({ reduced }: { reduced: boolean }) {
  const phones = [
    { speed: "30s", lead: false },
    { speed: "22s", lead: true },
    { speed: "36s", lead: false },
  ];
  return (
    <div className="flex h-full items-center justify-center gap-5 p-6 sm:gap-8 sm:p-10">
      {phones.map((ph, pi) => (
        <div
          key={pi}
          className={cn(
            "relative aspect-[9/16] shrink-0 overflow-hidden",
            PANE,
            ph.lead ? "h-[88%] border-brand/45" : "hidden h-[70%] opacity-60 sm:block",
          )}
        >
          <div
            aria-hidden
            className={cn("flex flex-col", !reduced && "wall-drift")}
            style={{ animationDuration: ph.speed }}
          >
            {[0, 1].map((pass) =>
              [0, 1, 2, 3].map((n) => (
                <span key={`${pass}-${n}`} className="block w-full shrink-0 border-b border-white/8 px-3 py-4">
                  <span className="block aspect-[4/3] w-full rounded-md bg-white/8" />
                  <span className="mt-2.5 block h-px w-4/5 bg-white/14" />
                  <span className="mt-2 block h-px w-3/5 bg-white/10" />
                </span>
              )),
            )}
          </div>

          {ph.lead && (
            <>
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(18,17,16,0.90) 0%, rgba(18,17,16,0.20) 32%, rgba(18,17,16,0.94) 72%)",
                }}
              />
              {/* the presenter: a fine line figure, never a face */}
              <svg viewBox="0 0 120 150" className="absolute inset-x-0 top-[25%] mx-auto h-[34%]" aria-hidden>
                <circle cx="60" cy="42" r="24" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
                <path d="M18 130 a42 42 0 0 1 84 0" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
              </svg>
              <span className="font-display absolute inset-x-0 bottom-[27%] text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/55">
                Presenter-led
              </span>
              <span aria-hidden className="absolute inset-x-5 bottom-[14%] block h-8 rounded-full bg-brand" />
              <span className="font-display absolute inset-x-0 bottom-[5%] border-t border-white/12 px-2 pt-2.5 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-brand-hot">
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
   The still one. The product never moves; the set changes behind it. */
const SETS = [
  "radial-gradient(120% 100% at 30% 16%, rgba(232,0,13,0.30) 0%, rgba(255,255,255,0.03) 62%)",
  "radial-gradient(120% 100% at 72% 20%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 66%)",
  "linear-gradient(155deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%)",
  "radial-gradient(110% 90% at 50% 92%, rgba(156,0,10,0.34) 0%, rgba(255,255,255,0.02) 64%)",
];

function ImageryStage({ reduced, live }: { reduced: boolean; live: boolean }) {
  const [set, setSet] = useState(0);
  useEffect(() => {
    if (reduced || !live) return;
    const t = window.setInterval(() => setSet((s) => (s + 1) % SETS.length), 3000);
    return () => window.clearInterval(t);
  }, [reduced, live]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6 sm:gap-7 sm:p-10">
      <div className={cn("relative aspect-square h-[62%] overflow-hidden sm:h-[68%]", PANE)}>
        {SETS.map((bg, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              i === set ? "opacity-100" : "opacity-0",
            )}
            style={{ background: bg }}
          />
        ))}
        {/* the product, lit and held: an object on a set, not a shape on a colour */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="prodLit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.96)" />
              <stop offset="52%" stopColor="rgba(255,255,255,0.72)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.42)" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="152" rx="42" ry="6" fill="rgba(0,0,0,0.45)" />
          <rect x="84" y="56" width="32" height="90" rx="11" fill="url(#prodLit)" />
          <rect x="93" y="42" width="14" height="16" rx="4" fill="url(#prodLit)" />
          <rect x="90" y="90" width="20" height="2" rx="1" fill="var(--color-brand)" />
        </svg>
        <span className="font-display absolute inset-x-0 bottom-4 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/50">
          Background variations
        </span>
      </div>

      <div aria-hidden className="flex gap-2.5">
        {SETS.map((bg, i) => (
          <span
            key={i}
            className={cn(
              "h-9 w-16 rounded-md border transition-all duration-500 motion-reduce:transition-none sm:h-10 sm:w-20",
              i === set ? "border-brand" : "border-white/15 opacity-55",
            )}
            style={{ background: bg, backgroundColor: "rgba(255,255,255,0.05)" }}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================== 04 variants ==
   One approved source at the left, the same idea in every format spreading out
   to the right. Only the source carries red, so the eye reads one becoming
   many. */
const SPREAD = [
  { x: 46, y: 8, w: 20, h: 11 },
  { x: 71, y: 5, w: 11, h: 19 },
  { x: 87, y: 11, w: 11, h: 12 },
  { x: 47, y: 27, w: 13, h: 16 },
  { x: 67, y: 31, w: 20, h: 12 },
  { x: 91, y: 31, w: 8, h: 15 },
  { x: 46, y: 51, w: 18, h: 10 },
  { x: 70, y: 51, w: 11, h: 19 },
  { x: 87, y: 55, w: 12, h: 12 },
  { x: 48, y: 72, w: 14, h: 16 },
  { x: 68, y: 76, w: 19, h: 11 },
  { x: 92, y: 74, w: 7, h: 14 },
];

function VariantsStage({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative h-full p-6 sm:p-10">
      <div
        className={cn(
          "absolute left-6 top-1/2 aspect-[4/5] w-[24%] max-w-[168px] -translate-y-1/2 overflow-hidden border-brand/55 sm:left-10",
          PANE,
        )}
      >
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 30% 14%, rgba(232,0,13,0.28), transparent 62%)" }}
        />
        <span aria-hidden className="absolute inset-0 grid place-items-center">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/50">
            <span className="ml-[2px] h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
          </span>
        </span>
        <span className="font-display absolute inset-x-0 bottom-3 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brand-hot">
          One idea
        </span>
      </div>

      {SPREAD.map((f, i) => (
        <span
          key={i}
          aria-hidden
          className={cn("absolute", PANE_SOFT, !reduced && "variant-pop")}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.w}%`,
            height: `${f.h}%`,
            animationDelay: `${(i % 6) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

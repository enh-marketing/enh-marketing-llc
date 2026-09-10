"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { Output } from "@/content/services/ai-creative-production";

/** What we produce, on a rack of monitors.
 *
 *  THE FOUR OUTPUTS ARE FOUR SHAPES. A video ad, a UGC ad, a product image and
 *  a variant set are not four of the same thing in four cards, which is the
 *  bento grid this client rejected by name. They are four different aspect
 *  ratios, and the aspect ratio is the honest fact about each: a wide 16:9
 *  video, a tall 9:16 phone, a 1:1 square, and a fan of mixed frames. So they
 *  sit on one shelf at their true proportions, and their difference in shape is
 *  the first thing the reader sees.
 *
 *  EACH IS A LIVE INSTRUMENT, NOT A PICTURE OF AN AD. The page has no real
 *  creative to show and the document forbids implying any. So no monitor shows
 *  finished work: each shows the console around the work. The video runs a
 *  scrubber; the phone types this item's own labels beside a silhouette that
 *  carries a permanent SYNTHETIC PRESENTER tag, never a face, which is the
 *  copy's own honesty line made visible; the square runs an inspection loupe
 *  over abstract background variations while one product mark holds; the fan
 *  issues one brand-red source into many neutral versions. Every word inside a
 *  monitor is this item's own verbatim label or neutral chrome.
 *
 *  ALL FOUR NAMES ARE ALWAYS LEGIBLE. Each monitor carries its number and
 *  title. Selecting one opens its body and its two labels below the shelf, one
 *  at a time, so the reader learns the whole offer at a glance and reads any
 *  one output in depth without four heavy paragraphs fighting for the fold. */
export function MonitorRack({ items }: { items: Output[] }) {
  const enhanced = useEnhanced("(min-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const [taken, setTaken] = useState(false);
  const [held, setHeld] = useState(false);
  const rotating = enhanced && !reduced && !taken && !held;

  useEffect(() => {
    if (!rotating || items.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), 4200);
    return () => window.clearInterval(t);
  }, [rotating, items.length]);

  const choose = (i: number) => {
    setActive(i);
    setTaken(true);
  };
  const preview = (i: number) => {
    if (!taken) setActive(i);
  };
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


  return (
    <div
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      {/* ------------------------------------------------------- the shelf -- */}
      <div
        role="tablist"
        aria-label="What we produce"
        onKeyDown={onKeyDown}
        className={cn(
          // A scroll rail on a phone, a shelf on a tablet up. Aspect-true means
          // the monitors are different heights, so they hang from a shared top
          // line rather than sitting in equal cells.
          "-mx-6 flex items-end gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:thin] sm:mx-0 sm:justify-center sm:gap-5 sm:overflow-visible sm:px-0 lg:gap-7",
        )}
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
              id={`rack-tab-${i}`}
              aria-selected={on}
              aria-controls={`rack-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onMouseEnter={() => preview(i)}
              onClick={() => choose(i)}
              className="group shrink-0 text-left focus-visible:outline-none"
            >
              <span
                className={cn(
                  "font-display mb-2 flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.08em] transition-colors duration-300 motion-reduce:transition-none",
                  on ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                )}
              >
                <span className="tabular-nums">{it.no}</span>
                <span className={cn(on ? "text-snow" : "text-fog group-hover:text-snow")}>{it.title}</span>
              </span>
              <Screen kind={it.kind} on={on} reduced={reduced} />
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------- the panel -- */}
      <div className="mt-10 border-t border-line pt-8 sm:mt-12">
        {items.map((it, i) => (
          <div
            key={it.no}
            id={`rack-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`rack-tab-${i}`}
            hidden={i !== active}
            className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          >
            <div>
              <h3 className="font-display text-2xl font-extrabold uppercase leading-[1.1] text-snow sm:text-[1.75rem]">
                {it.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {it.labels.map((l) => (
                  <span
                    key={l}
                    className="font-display rounded-full border border-line px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-ash"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <p className="max-w-[64ch] text-[0.9375rem] leading-relaxed text-fog">{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ screens --
   One live instrument per output kind, aspect-true. Selected monitors gain
   their brand frame; the rest rest in neutral chrome. Every animated part is a
   house loop class, so the whole rack rests in a readable finished state under
   prefers-reduced-motion. */
function Screen({ kind, on, reduced }: { kind: Output["kind"]; on: boolean; reduced: boolean }) {
  const frame = cn(
    "relative overflow-hidden rounded-xl border bg-void transition-colors duration-500 motion-reduce:transition-none",
    on ? "border-brand/60" : "border-line group-hover:border-ash/60",
  );
  const scan = !reduced && on;
  const ink = on ? "var(--color-brand)" : "var(--color-ash)";

  if (kind === "video") {
    // A video player: a subject held behind a play control, captions, and a
    // scrubber. Recognisable as a video ad, honest as a mock (no real footage).
    return (
      <div className={cn(frame, "h-[132px] w-[234px] sm:h-[144px] sm:w-[256px]")}>
        <svg viewBox="0 0 256 144" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
          {/* a soft subject block, off to one side like a framed shot */}
          <rect x="0" y="0" width="256" height="144" fill="var(--color-ink-2)" />
          <ellipse cx="180" cy="70" rx="70" ry="52" fill={ink} opacity={on ? 0.12 : 0.08} className="transition-opacity duration-500" />
          {/* the play control */}
          <circle cx="128" cy="66" r="22" fill="none" stroke={ink} strokeWidth="2" className="transition-colors duration-500" />
          <path d="M122 56 l14 10 l-14 10 z" fill={ink} className="transition-colors duration-500" />
        </svg>
        {/* captions */}
        <span aria-hidden className="absolute inset-x-5 bottom-7 space-y-1">
          <span className="mx-auto block h-1.5 w-3/4 rounded-full bg-snow/25" />
          <span className="mx-auto block h-1.5 w-1/2 rounded-full bg-snow/15" />
        </span>
        {/* scrubber */}
        <span aria-hidden className="absolute inset-x-3 bottom-2.5 h-[3px] rounded-full bg-line">
          <span className="block h-full rounded-full bg-brand" style={{ width: on ? "38%" : "24%" }} />
        </span>
        {scan && <span aria-hidden className="ci-scan-x absolute inset-y-0 left-0 w-[2px] bg-brand/60" style={{ animationDuration: "4.6s" }} />}
      </div>
    );
  }

  if (kind === "ugc") {
    // A vertical creator ad: a presenter silhouette (never a face), a caption
    // line, and a call-to-action button, with the disclosure tag pinned.
    return (
      <div className={cn(frame, "h-[218px] w-[124px] sm:h-[236px] sm:w-[134px]")}>
        <svg viewBox="0 0 134 236" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
          <rect x="0" y="0" width="134" height="236" fill="var(--color-ink-2)" />
          {/* the presenter, a silhouette */}
          <circle cx="67" cy="78" r="26" fill={ink} opacity={on ? 0.5 : 0.34} className="transition-opacity duration-500" />
          <path d="M25 150 a42 42 0 0 1 84 0 Z" fill={ink} opacity={on ? 0.5 : 0.34} className="transition-opacity duration-500" />
        </svg>
        {/* a caption bar */}
        <span aria-hidden className="absolute inset-x-4 bottom-[58px] space-y-1">
          <span className="block h-1.5 w-[88%] rounded-full bg-snow/25" />
          <span className="block h-1.5 w-3/5 rounded-full bg-snow/15" />
        </span>
        {/* the call-to-action button */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-4 bottom-9 h-6 rounded-full transition-colors duration-500",
            on ? "bg-brand" : "bg-ash/40",
          )}
        >
          <span className="mx-auto mt-[9px] block h-1.5 w-1/2 rounded-full bg-white/70" />
        </span>
        <span className="font-display absolute inset-x-0 bottom-0 border-t border-line/70 bg-ink/75 px-2 py-1.5 text-center text-[0.6875rem] font-bold uppercase leading-[1.15] tracking-[0.04em] text-brand-text backdrop-blur-sm">
          Synthetic presenter
        </span>
      </div>
    );
  }

  if (kind === "imagery") {
    // A product shot: one product on a ground shadow, with a row of background
    // options beneath, the active one brand. "Background variations", drawn.
    return (
      <div className={cn(frame, "h-[168px] w-[168px] sm:h-[184px] sm:w-[184px]")}>
        <svg viewBox="0 0 184 184" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
          <rect x="0" y="0" width="184" height="184" fill="var(--color-ink-2)" />
          {/* the stage wash behind the product */}
          <ellipse cx="92" cy="80" rx="58" ry="46" fill={ink} opacity={on ? 0.12 : 0.07} className="transition-opacity duration-500" />
          {/* a product silhouette: a simple bottle/box */}
          <rect x="78" y="44" width="28" height="66" rx="7" fill={ink} opacity={on ? 0.55 : 0.4} className="transition-opacity duration-500" />
          <rect x="86" y="34" width="12" height="12" rx="3" fill={ink} opacity={on ? 0.55 : 0.4} className="transition-opacity duration-500" />
          {/* the ground shadow */}
          <ellipse cx="92" cy="116" rx="34" ry="6" fill="var(--color-ash)" opacity="0.25" />
        </svg>
        {/* the background options being swapped */}
        <span aria-hidden className="absolute inset-x-5 bottom-5 flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={cn(
                "h-6 flex-1 rounded-md border transition-colors duration-500",
                on && i === 1 ? "border-brand bg-brand/20" : "border-line bg-ink-3",
              )}
            />
          ))}
        </span>
      </div>
    );
  }

  // variants: one source, then the same idea in a family of real formats.
  const FORMATS = [
    { w: 52, h: 30 }, // 16:9
    { w: 26, h: 46 }, // 9:16
    { w: 38, h: 38 }, // 1:1
    { w: 36, h: 45 }, // 4:5
  ];
  return (
    <div className={cn(frame, "h-[156px] w-[236px] border-0 bg-transparent sm:h-[168px] sm:w-[252px]")}>
      <svg viewBox="0 0 252 168" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* the one approved source */}
        <rect x="8" y="62" width="56" height="42" rx="6" fill="var(--color-brand)" fillOpacity="0.14" stroke="var(--color-brand)" strokeWidth="1.8" />
        <path d="M26 74 l10 8 l-10 8 z" fill="var(--color-brand)" opacity="0.8" />
        {/* the family of formats, each a different real aspect ratio */}
        {(() => {
          const cols = [
            { x: 120, y: 20 },
            { x: 196, y: 20 },
            { x: 120, y: 96 },
            { x: 196, y: 96 },
          ];
          return FORMATS.map((f, i) => {
            const cx = cols[i].x;
            const cy = cols[i].y + f.h / 2;
            return (
              <g key={i}>
                <path d={`M64 83 C 92 83, 92 ${cy}, ${cx - f.w / 2} ${cy}`} fill="none" stroke="var(--color-ash)" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 4" />
                {scan && (
                  <path d={`M64 83 C 92 83, 92 ${cy}, ${cx - f.w / 2} ${cy}`} fill="none" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" pathLength="100" className="ci-flow" style={{ animationDuration: "3.4s", animationDelay: `${i * 0.5}s` }} />
                )}
                <rect x={cx - f.w / 2} y={cols[i].y} width={f.w} height={f.h} rx="4" fill="var(--color-ash)" fillOpacity="0.1" stroke={on ? "var(--color-ash)" : "var(--color-line)"} strokeOpacity="0.7" strokeWidth="1.2" className="transition-colors duration-500" />
              </g>
            );
          });
        })()}
      </svg>
    </div>
  );
}

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
  const grain = (
    <span
      aria-hidden
      className="absolute inset-0 opacity-40"
      style={{
        backgroundImage:
          "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
  );
  const scan = !reduced && on;

  if (kind === "video") {
    return (
      <div className={cn(frame, "h-[132px] w-[234px] sm:h-[144px] sm:w-[256px]")}>
        {grain}
        <svg viewBox="0 0 228 128" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="none">
          <path d="M14 92 C 50 92, 58 44, 96 44 S 158 92, 214 66" fill="none" stroke="var(--color-ash)" strokeOpacity="0.4" strokeWidth="1.4" />
          <path d="M14 92 C 50 92, 58 44, 96 44 S 158 92, 214 66" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" pathLength="100" className={on ? "ci-flow" : ""} style={{ animationDuration: "4s" }} />
        </svg>
        {scan && <span aria-hidden className="ci-scan-x absolute inset-y-0 left-0 w-[2px] bg-brand/70" style={{ animationDuration: "4.4s" }} />}
        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-line">
          <span className="block h-full w-1/4 bg-brand" />
        </span>
      </div>
    );
  }

  if (kind === "ugc") {
    return (
      <div className={cn(frame, "h-[218px] w-[124px] sm:h-[236px] sm:w-[134px]")}>
        {grain}
        {/* A silhouette, never a face. */}
        <svg viewBox="0 0 106 186" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="53" cy="70" r="20" fill="var(--color-ash)" fillOpacity={on ? 0.5 : 0.35} className="transition-[fill-opacity] duration-500" />
          <path d="M20 128 a33 33 0 0 1 66 0 Z" fill="var(--color-ash)" fillOpacity={on ? 0.5 : 0.35} className="transition-[fill-opacity] duration-500" />
        </svg>
        {/* The item's own labels, typed beside it. */}
        <span aria-hidden className="absolute inset-x-3 bottom-9 space-y-1.5">
          <span className={cn("block h-1.5 rounded-full", on ? "bg-brand/70" : "bg-ash/40", scan && "ci-scan-x")} style={{ width: "82%", animationDuration: "5s" }} />
          <span className="block h-1.5 w-[60%] rounded-full bg-ash/30" />
        </span>
        <span className="font-display absolute inset-x-0 bottom-0 border-t border-line/70 bg-ink/75 px-2 py-1.5 text-center text-[0.6875rem] font-bold uppercase leading-[1.15] tracking-[0.04em] text-brand-text backdrop-blur-sm">
          Synthetic presenter
        </span>
      </div>
    );
  }

  if (kind === "imagery") {
    return (
      <div className={cn(frame, "h-[168px] w-[168px] sm:h-[184px] sm:w-[184px]")}>
        {grain}
        {/* A held product mark, and background variations swapping behind it. */}
        <span aria-hidden className={cn("absolute inset-6 rounded-lg", scan ? "ci-blink-soft" : "")} style={{ background: "var(--color-brand)", opacity: 0.08, animationDuration: "3.6s" }} />
        <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full" aria-hidden>
          <rect x="58" y="58" width="44" height="44" rx="6" fill="none" stroke={on ? "var(--color-brand)" : "var(--color-ash)"} strokeWidth="1.6" className="transition-colors duration-500" />
          <circle cx="80" cy="80" r="7" fill={on ? "var(--color-brand)" : "var(--color-ash)"} fillOpacity="0.7" className="transition-colors duration-500" />
          {/* the loupe */}
          <circle cx={on ? 116 : 44} cy="44" r="16" fill="none" stroke="var(--color-ash)" strokeOpacity="0.6" strokeWidth="1.4" className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none" />
          <line x1={on ? 127 : 55} y1="55" x2={on ? 134 : 62} y2="62" stroke="var(--color-ash)" strokeOpacity="0.6" strokeWidth="1.4" className="transition-all duration-700 motion-reduce:transition-none" />
        </svg>
      </div>
    );
  }

  // variants: one red source fanning into many neutral versions.
  return (
    <div className={cn(frame, "h-[156px] w-[220px] border-0 bg-transparent sm:h-[168px] sm:w-[236px]")}>
      <svg viewBox="0 0 210 150" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* the source */}
        <rect x="8" y="58" width="46" height="34" rx="5" fill="var(--color-brand)" fillOpacity="0.12" stroke="var(--color-brand)" strokeWidth="1.6" />
        {/* the fan of versions */}
        {[
          { x: 92, y: 12, w: 40, h: 24 },
          { x: 150, y: 22, w: 52, h: 30 },
          { x: 96, y: 62, w: 56, h: 32 },
          { x: 162, y: 74, w: 40, h: 40 },
          { x: 100, y: 108, w: 48, h: 28 },
        ].map((r, i) => (
          <g key={i}>
            <path
              d={`M54 75 C 74 75, 74 ${r.y + r.h / 2}, ${r.x} ${r.y + r.h / 2}`}
              fill="none"
              stroke="var(--color-ash)"
              strokeOpacity="0.4"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            {scan && (
              <path
                d={`M54 75 C 74 75, 74 ${r.y + r.h / 2}, ${r.x} ${r.y + r.h / 2}`}
                fill="none"
                stroke="var(--color-brand)"
                strokeWidth="1.6"
                strokeLinecap="round"
                pathLength="100"
                className="ci-flow"
                style={{ animationDuration: "3.6s", animationDelay: `${i * 0.5}s` }}
              />
            )}
            <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="4" fill="var(--color-ash)" fillOpacity="0.1" stroke={on ? "var(--color-ash)" : "var(--color-line)"} strokeOpacity="0.7" strokeWidth="1.2" className="transition-colors duration-500" />
          </g>
        ))}
      </svg>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import type { ReviewStage } from "@/content/services/ai-creative-production";

/** Quality and human review: one asset, five passes.
 *
 *  WHY ONE SPECIMEN, NOT FIVE FRAMES. The copy says each stage changes what the
 *  frame contains. An earlier version drew five separate frames in a strip,
 *  which the client read as a list: one item per cell, left to right. So this
 *  draws the SAME asset, once, and steps it through the five states on a
 *  scrubber, the page's own play-head. The reader watches one thing be worked
 *  on rather than five things sit in a row.
 *
 *  THE HUMAN CATCH IS THE VISIBLE VERB. Two of the five passes are corrections a
 *  person makes, and the copy is specific: Edit removes "visible errors and
 *  unsuitable scenes", and Check Brand and Product Accuracy corrects "anything
 *  that does not represent the brand accurately". So the drawing stakes the
 *  section on those two beats: at Edit an unsuitable block is struck and pulled,
 *  and at Accuracy a wrong brand token is caught in red and corrected. Human
 *  review is not a caption here, it is the thing the drawing does.
 *
 *  NOTHING IS A REAL AD. The specimen is abstract blocks and marks throughout,
 *  the reel's own honest field, never finished work. */
export function ReviewBench({ items }: { items: ReviewStage[] }) {
  const enhanced = useEnhanced("(min-width: 768px)");
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const marks = useRef<(HTMLButtonElement | null)[]>([]);

  const [taken, setTaken] = useState(false);
  const [held, setHeld] = useState(false);
  const advancing = enhanced && !reduced && !taken && !held;

  useEffect(() => {
    if (!advancing) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % items.length), 3400);
    return () => window.clearInterval(t);
  }, [advancing, items.length]);

  const choose = (i: number) => {
    setStep(i);
    setTaken(true);
  };
  function onKeyDown(e: React.KeyboardEvent) {
    const last = items.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = step === last ? 0 : step + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = step === 0 ? last : step - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setStep(next);
    setTaken(true);
    marks.current[next]?.focus();
  }

  const cur = items[step];

  return (
    <div
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
      className="grid gap-x-14 gap-y-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center"
    >
      {/* ----------------------------------------------------- the specimen -- */}
      <div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] border border-line bg-ink-2 sm:aspect-[16/10]">
          <Specimen step={step} reduced={reduced} />
          <span className="font-display absolute left-4 top-4 rounded border border-line/70 bg-ink/60 px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ash">
            One asset · pass {cur.no}
          </span>
        </div>

        {/* The scrubber: the page's play-head, here a five-stop stepper. */}
        <div role="tablist" aria-label="Review passes" onKeyDown={onKeyDown} className="mt-5">
          <div className="relative h-[3px] w-full rounded-full bg-line">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              style={{ width: `${(step / (items.length - 1)) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between">
            {items.map((it, i) => {
              const on = i === step;
              return (
                <button
                  key={it.no}
                  ref={(el) => {
                    marks.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="review-copy"
                  tabIndex={on ? 0 : -1}
                  onMouseEnter={() => !taken && setStep(i)}
                  onClick={() => choose(i)}
                  className="group flex flex-col items-center gap-1.5 focus-visible:outline-none"
                >
                  <span
                    className={cn(
                      "font-display text-[0.6875rem] font-bold tabular-nums transition-colors duration-300 motion-reduce:transition-none",
                      on ? "text-brand-text" : "text-ash group-hover:text-brand-text",
                    )}
                  >
                    {it.no}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- the copy -- */}
      <div id="review-copy">
        <p className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ash">
          Pass {cur.no} of {items[items.length - 1].no}
        </p>
        <h3 className="font-display mt-3 text-2xl font-extrabold uppercase leading-[1.1] text-snow sm:text-[1.75rem]">
          {cur.title}
        </h3>
        <p className="mt-4 max-w-[56ch] text-[0.9375rem] leading-relaxed text-fog">{cur.body}</p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- specimen --
   The same asset in five states. Blocks and marks only; the two correction
   passes (Edit at index 2, Accuracy at index 3) carry the section. */
function Specimen({ step, reduced }: { step: number; reduced: boolean }) {
  const scan = !reduced;
  return (
    <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" role="img" aria-hidden>
      {/* 00 direction: an empty frame and the brief pinned to it. */}
      {step === 0 && (
        <g>
          <rect x="40" y="40" width="320" height="180" rx="10" fill="none" stroke="var(--color-ash)" strokeOpacity="0.55" strokeWidth="1.4" strokeDasharray="6 6" />
          {["Audience", "Message", "Style", "Platform"].map((t, i) => (
            <g key={t} transform={`translate(${64 + i * 74} 120)`}>
              <rect x="0" y="0" width="60" height="20" rx="5" fill="var(--color-ash)" fillOpacity="0.12" stroke="var(--color-ash)" strokeOpacity="0.5" strokeWidth="1" />
            </g>
          ))}
        </g>
      )}

      {/* 01 version: filled, one block off register. */}
      {step === 1 && (
        <g>
          <rect x="40" y="40" width="320" height="180" rx="10" fill="var(--color-ash)" fillOpacity="0.06" stroke="var(--color-line)" strokeWidth="1.4" />
          <rect x="64" y="64" width="130" height="60" rx="6" fill="var(--color-ash)" fillOpacity="0.14" />
          <rect x="210" y="64" width="126" height="60" rx="6" fill="var(--color-ash)" fillOpacity="0.14" transform="rotate(-3 273 94)" />
          <rect x="64" y="138" width="200" height="16" rx="4" fill="var(--color-ash)" fillOpacity="0.2" />
          <rect x="64" y="164" width="150" height="16" rx="4" fill="var(--color-ash)" fillOpacity="0.14" />
          {scan && <rect x="40" y="40" width="4" height="180" fill="var(--color-brand)" className="ci-scan-x" style={{ animationDuration: "3.6s" }} />}
        </g>
      )}

      {/* 02 edit: aligned, one unsuitable block struck and pulled out. */}
      {step === 2 && (
        <g>
          <rect x="40" y="40" width="320" height="180" rx="10" fill="var(--color-ash)" fillOpacity="0.06" stroke="var(--color-line)" strokeWidth="1.4" />
          <rect x="64" y="64" width="130" height="60" rx="6" fill="var(--color-ash)" fillOpacity="0.16" />
          {/* the removed block, struck */}
          <g opacity="0.5">
            <rect x="210" y="64" width="126" height="60" rx="6" fill="none" stroke="var(--color-brand)" strokeOpacity="0.7" strokeWidth="1.4" strokeDasharray="5 5" />
            <line x1="210" y1="64" x2="336" y2="124" stroke="var(--color-brand)" strokeWidth="1.6" />
          </g>
          <rect x="64" y="138" width="272" height="16" rx="4" fill="var(--color-ash)" fillOpacity="0.2" />
          <rect x="64" y="164" width="272" height="16" rx="4" fill="var(--color-ash)" fillOpacity="0.16" />
        </g>
      )}

      {/* 03 accuracy: a wrong brand token caught in red, then corrected. THE beat. */}
      {step === 3 && (
        <g>
          <rect x="40" y="40" width="320" height="180" rx="10" fill="var(--color-ash)" fillOpacity="0.06" stroke="var(--color-line)" strokeWidth="1.4" />
          {/* a row of brand swatches */}
          {[0, 1, 2, 3].map((i) => {
            const wrong = i === 2;
            return (
              <g key={i} transform={`translate(${72 + i * 66} 96)`}>
                <rect
                  x="0" y="0" width="46" height="46" rx="8"
                  fill={wrong ? "var(--color-brand)" : "var(--color-ash)"}
                  fillOpacity={wrong ? 0.22 : 0.16}
                  stroke={wrong ? "var(--color-brand)" : "var(--color-ash)"}
                  strokeOpacity={wrong ? 0.9 : 0.4}
                  strokeWidth={wrong ? 2 : 1.2}
                />
                {wrong && (
                  <>
                    {/* the marginalia flag */}
                    <circle cx="46" cy="0" r="8" fill="var(--color-brand)" className={scan ? "ci-blink-soft" : ""} style={{ animationDuration: "1.8s" }} />
                    <path d="M43 0 l3 3 l5 -6" fill="none" stroke="var(--color-void)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </>
                )}
              </g>
            );
          })}
          <rect x="72" y="166" width="256" height="14" rx="4" fill="var(--color-ash)" fillOpacity="0.16" />
        </g>
      )}

      {/* 04 variants: the corrected asset fans into versions. */}
      {step === 4 && (
        <g>
          <rect x="40" y="96" width="90" height="68" rx="8" fill="var(--color-brand)" fillOpacity="0.12" stroke="var(--color-brand)" strokeWidth="1.6" />
          {[
            { x: 176, y: 44, w: 80, h: 44 },
            { x: 276, y: 54, w: 92, h: 40 },
            { x: 176, y: 108, w: 100, h: 44 },
            { x: 292, y: 116, w: 74, h: 52 },
            { x: 200, y: 176, w: 84, h: 40 },
          ].map((r, i) => (
            <g key={i}>
              <path d={`M130 130 C 150 130, 150 ${r.y + r.h / 2}, ${r.x} ${r.y + r.h / 2}`} fill="none" stroke="var(--color-ash)" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 4" />
              {scan && <path d={`M130 130 C 150 130, 150 ${r.y + r.h / 2}, ${r.x} ${r.y + r.h / 2}`} fill="none" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" pathLength="100" className="ci-flow" style={{ animationDuration: "3.4s", animationDelay: `${i * 0.4}s` }} />}
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="5" fill="var(--color-ash)" fillOpacity="0.1" stroke="var(--color-ash)" strokeOpacity="0.5" strokeWidth="1.2" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

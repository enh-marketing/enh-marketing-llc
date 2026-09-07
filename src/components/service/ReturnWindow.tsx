"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** Marketing ROI, drawn as the one condition the section opens with.
 *
 *  THE FIRST SENTENCE IS THE WHOLE METHOD AND IT IS NOT A TWO-COLUMN LEDGER.
 *  "Marketing ROI reporting requires the marketing cost and the resulting
 *  business value to be measured over the SAME PERIOD." Two columns under a
 *  bracket draw the two sides and say nothing about the condition, which is the
 *  part every broken ROI report gets wrong. So the drawing is a timeline with
 *  costs recorded above it and value recorded below it, and TWO WINDOWS that
 *  start out of register and close onto one another as the reader arrives.
 *  Marks inside the shared window count; marks outside it grey out. Watching
 *  the two windows converge is the sentence.
 *
 *  THE SECOND PARAGRAPH IS THE SECOND CONTROL. "The correct calculation will
 *  depend on the business model", and the document supplies both models and
 *  what each may report. So the value side can be switched between them and the
 *  lanes are relabelled with that model's own terms. At rest neither model is
 *  chosen and the lanes carry the general list from the first paragraph, which
 *  is the honest starting state: the calculation has not been agreed yet.
 *
 *  NOT ONE FIGURE, AND NO OPERATOR. There is no ratio, no division sign, no
 *  axis, no unit and nothing bigger than anything else. The document states no
 *  arithmetic and none is drawn. The drawing says only: these are recorded,
 *  those are recorded, they must be read over the same window, and which terms
 *  go in the window depends on the business.
 *
 *  THE RESTING STATE IS CONVERGED. Without script, under reduced motion and on
 *  every small screen the two windows are already one, which is the correct
 *  picture; the scroll only performs the alignment where it can be watched. */

const VB_W = 640;
const VB_H = 344;
/** Where the lanes run. The left third is left clear for the names, which are
 *  HTML so they stay type at any width. */
const X0 = 200;
const X1 = 620;
const AXIS = 172;
const COST_Y = [58, 92, 126];
const VALUE_Y = [218, 252, 286];

/** Where each window starts and ends, out of register and then in it. */
const COST_WIN = { from: [228, 424], to: [300, 520] };
const VALUE_WIN = { from: [376, 600], to: [300, 520] };

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const lerp = (a: number, b: number, t: number) => Math.round((a + (b - a) * t) * 10) / 10;

/** Where the marks sit on each lane. Deterministic, and they mean nothing
 *  beyond "something was recorded here". */
const MARKS = [
  [18, 74, 132, 196, 250, 308, 366],
  [42, 104, 168, 228, 292, 350, 398],
  [8, 88, 148, 214, 276, 334, 390],
];

export function ReturnWindow({
  lead,
  body,
  costs,
  values,
  periodLabel,
  reportsLabel,
  models,
}: {
  lead: string;
  body: string;
  costs: string[];
  values: string[];
  periodLabel: string;
  reportsLabel: string;
  models: { name: string; reports: string[] }[];
}) {
  const root = useRef<HTMLDivElement>(null);
  /** How far the two windows have closed onto each other, 0 to 1. Quantised so
   *  a scrub does not re-render on every pixel. */
  const [t, setT] = useState(1);
  /** Which business model the calculation has been set to. Null is the honest
   *  resting state: it has not been agreed. */
  const [model, setModel] = useState<number | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ close: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.close) return;
      setT(0);
      const at = (p: number) => Math.round(Math.min(1, p * 1.35) * 16) / 16;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 76%",
        end: "bottom 76%",
        scrub: 0.6,
        onUpdate: (self) => {
          const q = at(self.progress);
          setT((prev) => (prev === q ? prev : q));
        },
      });
      /* Seed from where the reader already is; see VariantBloom. */
      setT(at(st.progress));
      return () => {
        st.kill();
        setT(1);
      };
    });
    return () => mm.revert();
  }, []);

  const ca = lerp(COST_WIN.from[0], COST_WIN.to[0], t);
  const cb = lerp(COST_WIN.from[1], COST_WIN.to[1], t);
  const va = lerp(VALUE_WIN.from[0], VALUE_WIN.to[0], t);
  const vb = lerp(VALUE_WIN.from[1], VALUE_WIN.to[1], t);
  const aligned = t > 0.985;

  /** What the value side is reading, which is the model's own terms once one is
   *  chosen and the first paragraph's general list until then. */
  const valueTerms = model === null ? values : models[model].reports;

  const inWin = (x: number, a: number, b: number) => x >= a && x <= b;

  return (
    <div ref={root}>
      <div className="grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-end">
        <Rise>
          <p className="font-display max-w-[30ch] text-[clamp(1.2rem,2.4vw,1.85rem)] font-extrabold uppercase leading-[1.14] text-snow">
            {lead.split(". ")[0]}.
          </p>
        </Rise>
        <Rise delay={0.08}>
          <p className="max-w-[54ch] leading-relaxed text-fog">
            {lead.split(". ").slice(1).join(". ")}
          </p>
        </Rise>
      </div>

      {/* THE WINDOW. */}
      <div className="mt-12 rounded-[1.5rem] border border-line bg-ink-2 p-5 sm:p-7">
        {/* The lane names are real words and they sit in the drawing's left
            third. Squeeze that below about six hundred pixels and three of them
            stack on top of one another, so the drawing keeps a floor width and
            the reader swipes it. */}
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="relative min-w-[36rem] sm:min-w-0">
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden className="block w-full">
            {/* what is being read */}
            <path d={`M${X0} ${AXIS}H${X1}`} {...S} strokeWidth={1.2} className="text-line" />

            {/* the window the costs are read over */}
            <rect
              x={ca}
              y={34}
              width={cb - ca}
              height={AXIS - 44}
              fill="color-mix(in srgb, var(--color-brand) 8%, transparent)"
            />
            <path d={`M${ca} 34v${AXIS - 44}M${cb} 34v${AXIS - 44}`} {...S} strokeWidth={1.4} className="text-brand" />

            {/* and the window the value is read over */}
            <rect
              x={va}
              y={AXIS + 10}
              width={vb - va}
              height={VB_H - AXIS - 44}
              fill="color-mix(in srgb, var(--color-brand) 8%, transparent)"
            />
            <path d={`M${va} ${AXIS + 10}v${VB_H - AXIS - 44}M${vb} ${AXIS + 10}v${VB_H - AXIS - 44}`} {...S} strokeWidth={1.4} className="text-brand" />

            {/* once they are one, they are drawn as one */}
            <g className="transition-opacity duration-500" opacity={aligned ? 1 : 0}>
              <path d={`M${ca} 34v${VB_H - 78}M${cb} 34v${VB_H - 78}`} {...S} strokeWidth={1.8} className="text-brand" />
              <path d={`M${ca} 28h${cb - ca}`} {...S} strokeWidth={1.8} className="text-brand" />
              <path d={`M${ca} ${VB_H - 40}h${cb - ca}`} {...S} strokeWidth={1.8} className="text-brand" />
            </g>

            {/* what the business spent */}
            {costs.map((cost, i) => (
              <g key={cost}>
                <path d={`M${X0} ${COST_Y[i]}H${X1}`} {...S} strokeWidth={1} className="text-line" opacity={0.6} />
                {MARKS[i].map((m, k) => {
                  const x = X0 + m;
                  const on = inWin(x, ca, cb);
                  return (
                    <rect
                      key={k}
                      x={x}
                      y={COST_Y[i] - 7}
                      width={9}
                      height={14}
                      rx={2}
                      fill="currentColor"
                      className={cn("transition-colors duration-300", on ? "text-brand" : "text-ash")}
                      opacity={on ? 0.9 : 0.25}
                    />
                  );
                })}
              </g>
            ))}

            {/* and what it got back */}
            {valueTerms.map((term, i) => (
              <g key={term}>
                <path d={`M${X0} ${VALUE_Y[i]}H${X1}`} {...S} strokeWidth={1} className="text-line" opacity={0.6} />
                {MARKS[i].map((m, k) => {
                  const x = X0 + ((m * 7) % 400) + 10;
                  const on = inWin(x, va, vb);
                  return (
                    <circle
                      key={k}
                      cx={x}
                      cy={VALUE_Y[i]}
                      r={5.5}
                      fill="currentColor"
                      className={cn("transition-colors duration-300", on ? "text-brand" : "text-ash")}
                      opacity={on ? 0.9 : 0.25}
                    />
                  );
                })}
              </g>
            ))}
          </svg>

          {/* The names, in HTML, beside the lanes they belong to. */}
          {costs.map((cost, i) => (
            <span
              key={cost}
              aria-hidden
              className="font-display absolute -translate-y-1/2 pr-4 text-right text-[0.625rem] font-bold uppercase leading-tight tracking-[0.1em] text-fog"
              style={{ left: 0, width: `${(X0 / VB_W) * 100}%`, top: `${(COST_Y[i] / VB_H) * 100}%` }}
            >
              {cost}
            </span>
          ))}
          {valueTerms.map((term, i) => (
            <span
              key={term}
              aria-hidden
              className={cn(
                "font-display absolute -translate-y-1/2 pr-4 text-right text-[0.625rem] font-bold uppercase leading-tight tracking-[0.1em] transition-colors duration-300",
                model === null ? "text-fog" : "text-brand-text",
              )}
              style={{ left: 0, width: `${(X0 / VB_W) * 100}%`, top: `${(VALUE_Y[i] / VB_H) * 100}%` }}
            >
              {term}
            </span>
          ))}

          {/* The condition, named once the two windows are one. */}
          <span
            aria-hidden
            className={cn(
              "font-display absolute -translate-x-1/2 whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.16em] transition-opacity duration-500",
              aligned ? "text-brand-text opacity-100" : "opacity-0",
            )}
            style={{ left: `${(((ca + cb) / 2) / VB_W) * 100}%`, top: "1%" }}
          >
            {periodLabel}
          </span>
        </div>
        </div>
      </div>

      {/* Which terms go in the window depends on the business. */}
      <div className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start">
        <p className="max-w-[52ch] leading-relaxed text-fog sm:text-lg">{body}</p>

        <ul className="grid gap-3 sm:grid-cols-2">
          {models.map((m, i) => {
            const on = model === i;
            return (
              <li key={m.name}>
                <button
                  type="button"
                  aria-pressed={on}
                  onPointerEnter={() => setModel(i)}
                  onFocus={() => setModel(i)}
                  onClick={() => setModel((v) => (v === i ? null : i))}
                  className={cn(
                    "h-full w-full rounded-xl border px-5 py-4 text-left transition-all duration-300",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    on ? "border-brand bg-brand/[0.07]" : "border-line bg-ink-2 hover:border-brand/60",
                  )}
                >
                  <span
                    className={cn(
                      "font-display block text-[0.9375rem] font-extrabold uppercase leading-tight transition-colors duration-300",
                      on ? "text-snow" : "text-fog",
                    )}
                  >
                    {m.name}
                  </span>
                  <span className="mt-3 block text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ash">
                    {reportsLabel}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {m.reports.map((r) => (
                      <span
                        key={r}
                        className={cn(
                          "font-display text-[0.6875rem] font-bold uppercase tracking-[0.08em] transition-colors duration-300",
                          on ? "text-brand-text" : "text-fog",
                        )}
                      >
                        {r}
                      </span>
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

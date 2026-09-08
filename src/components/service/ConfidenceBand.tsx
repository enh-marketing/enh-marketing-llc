"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/** The data a forecast needs, drawn as the one thing it changes.
 *
 *  THE SECTION IS NOT A SHOPPING LIST AND THE OLD DRAWING TREATED IT AS ONE.
 *  Twelve inputs gathering into a box says "bring us these twelve things". The
 *  document says almost the opposite, twice: "A business does not need to have
 *  every item on this list", and "the diagnostic establishes what is available
 *  and how confidently it can be used". The subject is CONFIDENCE, and
 *  confidence in a forecast has exactly one visible form on this page — how
 *  wide the range is. So the drawing is the range, and the twelve inputs are
 *  what move it.
 *
 *  AND THE READER MOVES IT. Every input can be switched off. Turn most of them
 *  off and the band opens; put them back and it closes. That is not decoration:
 *  it is the section's two closing sentences made operable, and it answers the
 *  question a prospect actually has — what happens if we do not have half of
 *  this? — without a word of new copy. It is also why the band NEVER closes to
 *  a line however much is switched on. The page refuses guaranteed accuracy in
 *  its own FAQ, and a range that could be collapsed to a certainty would be
 *  promising one.
 *
 *  NOT A FIGURE, NOT AN AXIS, NOT A SCALE. Nothing is numbered, nothing is
 *  measured and no direction is good. The band widens and narrows and that is
 *  the entire vocabulary.
 *
 *  THE RESTING STATE IS EVERYTHING CONFIRMED, which is what the server renders
 *  and what a reader with no script or no motion gets: a complete picture. On a
 *  large screen with motion welcome the scroll runs the diagnostic instead —
 *  the inputs are established one at a time and the band draws in around them.
 *  Both end in the same place. */

const VB_W = 520;
const VB_H = 300;
const OX = 34;
const OY = 150;
const EX = 494;
/** The widest and tightest half-spreads the band is ever drawn at. The tight
 *  end is deliberately not zero; see the note above. */
const WIDE = 122;
const TIGHT = 30;

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function ConfidenceBand({
  lead,
  coversLead,
  items,
  closing,
  closingTail,
}: {
  lead: string;
  coversLead: string;
  items: string[];
  closing: string;
  closingTail: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  /** Which inputs the diagnostic has established. All of them at rest. */
  const [on, setOn] = useState<boolean[]>(() => items.map(() => true));

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add({ run: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
      if (!ctx.conditions?.run) return;
      /** The diagnostic, run by the scroll. It only ever establishes inputs; a
       *  reader who has started switching them takes over and is never
       *  overruled, which is why `touched` exists. */
      let touched = false;
      const mark = () => {
        touched = true;
      };
      el.addEventListener("pointerdown", mark);
      el.addEventListener("keydown", mark);
      setOn(items.map(() => false));
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "bottom 78%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (touched) return;
          const n = Math.round(self.progress * items.length);
          setOn((prev) => {
            const next = items.map((_, i) => i < n);
            return next.some((v, i) => v !== prev[i]) ? next : prev;
          });
        },
      });
      /* Seed from where the reader already is; see VariantBloom. */
      const seeded = Math.round(st.progress * items.length);
      setOn(items.map((_, i) => i < seeded));
      return () => {
        st.kill();
        el.removeEventListener("pointerdown", mark);
        el.removeEventListener("keydown", mark);
        setOn(items.map(() => true));
      };
    });
    return () => mm.revert();
  }, [items]);

  const confirmed = on.filter(Boolean).length;
  const ratio = items.length ? confirmed / items.length : 0;
  /** How tightly the band is drawn. The wedge is drawn once at its widest and
   *  scaled about its own origin, so the change can be transitioned; redrawing
   *  the path each render would snap. */
  const k = (TIGHT + (WIDE - TIGHT) * (1 - ratio)) / WIDE;

  return (
    <div ref={root}>
      <Rise>
        <p className="font-display max-w-[26ch] text-[clamp(1.3rem,2.8vw,2.15rem)] font-extrabold uppercase leading-[1.12] text-snow">
          {lead}
        </p>
      </Rise>

      <div className="mt-12 grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
        {/* What the diagnostic may review, every one of which can be absent. */}
        <div>
          <p id="ci-data-lead" className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ash">
            {coversLead}
          </p>
          <ul aria-labelledby="ci-data-lead" className="mt-5 border-t border-line">
            {items.map((item, i) => (
              <li key={item} className="border-b border-line/80">
                <button
                  type="button"
                  aria-pressed={on[i]}
                  onClick={() => setOn((prev) => prev.map((v, k2) => (k2 === i ? !v : v)))}
                  className="group flex w-full items-center gap-3.5 py-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-all duration-300",
                      on[i] ? "border-brand bg-brand" : "border-line bg-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-[1px] bg-white transition-opacity duration-300",
                        on[i] ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </span>
                  <span
                    className={cn(
                      "text-[0.9375rem] leading-snug transition-colors duration-300",
                      on[i] ? "text-snow" : "text-ash line-through decoration-line",
                    )}
                  >
                    {item}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* The one thing they change. */}
        <div className="lg:sticky lg:top-28">
          <div className="rounded-[1.5rem] border border-line bg-ink-2 p-5 sm:p-7">
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden className="block w-full">
              {/* What is available, arriving. */}
              {items.map((_, i) => {
                const y = 26 + i * ((VB_H - 52) / (items.length - 1));
                return (
                  <path
                    key={i}
                    d={`M0 ${y} C ${OX * 0.5} ${y}, ${OX * 0.6} ${OY}, ${OX} ${OY}`}
                    {...S}
                    strokeWidth={on[i] ? 1.4 : 1}
                    className={cn("transition-colors duration-500", on[i] ? "text-brand" : "text-line")}
                    opacity={on[i] ? 0.85 : 0.4}
                  />
                );
              })}

              {/* The range. Drawn once at its widest and closed by scale, so
                  the change can be watched rather than jumped. */}
              <g
                className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transformBox: "view-box",
                  transformOrigin: `${OX}px ${OY}px`,
                  transform: `scaleY(${k.toFixed(3)})`,
                }}
              >
                <path
                  d={`M${OX} ${OY} C ${OX + 180} ${OY - WIDE * 0.35}, ${EX - 150} ${OY - WIDE * 0.86}, ${EX} ${OY - WIDE} L${EX} ${OY + WIDE} C ${EX - 150} ${OY + WIDE * 0.86}, ${OX + 180} ${OY + WIDE * 0.35}, ${OX} ${OY} Z`}
                  fill="color-mix(in srgb, var(--color-brand) 10%, transparent)"
                />
                <path
                  d={`M${OX} ${OY} C ${OX + 180} ${OY - WIDE * 0.35}, ${EX - 150} ${OY - WIDE * 0.86}, ${EX} ${OY - WIDE}`}
                  {...S}
                  strokeWidth={1.4}
                  strokeDasharray="6 5"
                  className="text-brand"
                />
                <path
                  d={`M${OX} ${OY} C ${OX + 180} ${OY + WIDE * 0.35}, ${EX - 150} ${OY + WIDE * 0.86}, ${EX} ${OY + WIDE}`}
                  {...S}
                  strokeWidth={1.4}
                  strokeDasharray="6 5"
                  className="text-brand"
                />
                <path d={`M${EX} ${OY - WIDE}v${WIDE * 2}`} {...S} strokeWidth={1.8} className="text-brand" />
                <path d={`M${EX - 7} ${OY - WIDE}h14M${EX - 7} ${OY + WIDE}h14`} {...S} strokeWidth={1.8} className="text-brand" />
              </g>

              {/* The forecast itself, which does not move. */}
              <path d={`M${OX} ${OY}H${EX}`} {...S} strokeWidth={1} strokeDasharray="3 5" className="text-fog" opacity={0.55} />
              <circle cx={OX} cy={OY} r={6} fill="var(--color-brand)" />
            </svg>

            {/* How much of the list the diagnostic has, as a bar rather than a
                figure: this page states no counts. */}
            <div aria-hidden className="mt-6 flex gap-1">
              {items.map((item, i) => (
                <span
                  key={item}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-500",
                    on[i] ? "bg-brand" : "bg-line",
                  )}
                />
              ))}
            </div>
            <p className="mt-5 flex items-start gap-3 text-[0.9375rem] leading-relaxed text-fog">
              <span aria-hidden className="mt-[0.45rem] h-2 w-2 shrink-0 rounded-full bg-brand" />
              {closingTail}
            </p>
          </div>
        </div>
      </div>

      {/* The permission the section exists to give, proved by the drawing above
          rather than asserted under it. */}
      <Rise delay={0.08}>
        <p className="font-display mt-14 max-w-[24ch] border-l-2 border-brand pl-6 text-[clamp(1.3rem,2.8vw,2.15rem)] font-extrabold uppercase leading-[1.12] text-snow sm:pl-8">
          {closing}
        </p>
      </Rise>
    </div>
  );
}

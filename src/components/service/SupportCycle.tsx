"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useEnhanced, usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";
import type { Stage } from "@/content/services/website-maintenance-support";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1] as const;

/** Six stages, and only three of them happen twice.
 *
 *  THE SHAPE IS ALREADY IN THE COPY. Stage 1 reviews the site and the access.
 *  Stage 2 agrees the scope. Stage 3 clears the overdue work "before routine
 *  maintenance begins" — the document's own words, and they mark the end of the
 *  setup. Stages 4 to 6 are what routine maintenance *is*: requests arrive,
 *  changes are tested and published, work is reported and anything outside the
 *  scope is recommended separately. Then more requests arrive.
 *
 *  So a six-step ladder would be wrong, not merely dull. It would tell a reader
 *  that reporting is the end of the engagement, when reporting is the point the
 *  next month starts from. An approach that runs into a ring says the true
 *  thing, and says it before a word is read.
 *
 *  NO LABEL EXPLAINS THE RING. "Onboarding" and "ongoing" are not in this
 *  document, and inventing two headings to name the halves would be inventing
 *  copy. The geometry carries it; the words are the document's six stage names.
 *
 *  EACH NAME IS PRINTED ONCE. The stage names sit on the drawing, where they
 *  label the station they belong to. The panel underneath carries only the
 *  body, so nothing is typed on this page twice.
 *
 *  MOTION. The signal travels in along the approach and then circles, in CSS on
 *  a path with pathLength="100" — the one form of travelling motion that is
 *  immune to the transform units inside a scaled viewBox. Scrolling through the
 *  section advances which stage is open until a reader takes control, after
 *  which it is theirs. See globals.css, "Website Maintenance & Support". */

/** Where each station sits in the drawing's own coordinates, and which side its
 *  name hangs off. viewBox is 1000 x 440. */
const STATIONS: { x: number; y: number; side: "above" | "below" | "right" }[] = [
  { x: 70, y: 220, side: "above" },
  { x: 215, y: 220, side: "below" },
  { x: 360, y: 220, side: "above" },
  { x: 675, y: 65, side: "above" },
  { x: 830, y: 220, side: "right" },
  { x: 675, y: 375, side: "below" },
];

/** The last station on the approach; everything after it is on the ring. */
const APPROACH = 3;

/** Station coordinates become inline percentages, and a raw double there is a
 *  hydration mismatch waiting to happen — React throws away the whole island
 *  rather than patching one style, which costs the route its interactivity.
 *  Two decimals is finer than the drawing resolves and prints identically
 *  everywhere. */
const pct = (n: number, of: number) => `${Math.round((n / of) * 10000) / 100}%`;

export function SupportCycle({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: Stage[];
}) {
  const enhanced = useEnhanced("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const marks = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  /** Once a reader chooses a stage, scrolling stops moving it for them. */
  const [taken, setTaken] = useState(false);

  useEffect(() => {
    if (taken) return;
    const mm = gsap.matchMedia();

    mm.add(
      { run: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.run) return;
        const el = root.current;
        if (!el) return;

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 78%",
          end: "bottom 55%",
          onUpdate: (self) => {
            const i = Math.min(items.length - 1, Math.floor(self.progress * items.length));
            setActive((a) => (a === i ? a : i));
          },
        });

        return () => st.kill();
      },
    );

    return () => mm.revert();
  }, [items.length, taken]);

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
    marks.current[next]?.focus();
  }

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-14" />

        <div ref={root}>
          {enhanced ? (
            <>
              {/* ------------------------------------------------ the drawing */}
              <div className="relative aspect-[1000/440] w-full">
                <svg
                  viewBox="0 0 1000 440"
                  className="absolute inset-0 h-full w-full overflow-visible"
                  aria-hidden
                >
                  {/* The approach: once, in order, and then it is done. */}
                  <path
                    d="M40 220H520"
                    stroke="var(--color-line)"
                    strokeWidth="1.6"
                    fill="none"
                  />
                  {/* The ring: what happens from then on. */}
                  <circle
                    cx="675"
                    cy="220"
                    r="155"
                    stroke="var(--color-line)"
                    strokeWidth="1.6"
                    fill="none"
                  />

                  {/* The signal, travelling in and then round. */}
                  {!reduced && (
                    <>
                      <path
                        d="M40 220H520"
                        pathLength="100"
                        stroke="var(--color-brand)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        fill="none"
                        className="wm-signal"
                      />
                      <circle
                        cx="675"
                        cy="220"
                        r="155"
                        pathLength="100"
                        stroke="var(--color-brand)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        fill="none"
                        className="wm-signal-ring"
                      />
                    </>
                  )}

                  {/* Direction, so the ring reads as turning rather than as a
                      decorative circle. Each head sits exactly on the circle
                      and is rotated to its tangent, which is why they are
                      placed by transform rather than by hand-written points. */}
                  <polygon
                    points="0,0 -12,-6 -12,6"
                    fill="var(--color-ash)"
                    transform="translate(752.5 85.8) rotate(30)"
                  />
                  <polygon
                    points="0,0 -12,-6 -12,6"
                    fill="var(--color-ash)"
                    transform="translate(597.5 354.2) rotate(210)"
                  />
                </svg>

                {/* ---------------------------------------------- the stations */}
                <div
                  role="tablist"
                  aria-label={`${title} ${strokeTitle}`}
                  onKeyDown={onKeyDown}
                  className="absolute inset-0"
                >
                  {items.map((item, i) => {
                    const at = STATIONS[i];
                    const on = i === active;
                    return (
                      <div
                        key={item.no}
                        className="absolute"
                        style={{ left: pct(at.x, 1000), top: pct(at.y, 440) }}
                      >
                        <button
                          ref={(el) => {
                            marks.current[i] = el;
                          }}
                          type="button"
                          role="tab"
                          id={`${id}-mark-${i}`}
                          aria-selected={on}
                          aria-controls={`${id}-panel-${i}`}
                          tabIndex={on ? 0 : -1}
                          onClick={() => {
                            setActive(i);
                            setTaken(true);
                          }}
                          onMouseEnter={() => setActive(i)}
                          className={cn(
                            "absolute -left-4 -top-4 flex h-8 w-8 items-center justify-center rounded-full text-[0.6rem] font-bold tabular-nums transition-all duration-300 motion-reduce:transition-none",
                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                            on
                              ? "scale-110 border-2 border-brand bg-brand text-white"
                              : i >= APPROACH
                                ? "border border-line bg-void text-ash hover:border-brand hover:text-brand-text"
                                : "border border-line bg-void text-ash hover:border-brand hover:text-brand-text",
                          )}
                        >
                          {item.no}
                          <span className="sr-only">{` ${item.stage}: ${item.title}`}</span>
                        </button>

                        {/* The name, on the drawing, printed once. */}
                        <span
                          aria-hidden
                          className={cn(
                            "pointer-events-none absolute transition-colors duration-300 motion-reduce:transition-none",
                            at.side === "above" && "w-[13rem] -left-4 bottom-7",
                            at.side === "below" && "w-[13rem] -left-4 top-7",
                            at.side === "right" && "w-[9.5rem] left-7 -top-5",
                          )}
                        >
                          <span
                            className={cn(
                              "font-display block text-[0.6rem] font-bold uppercase tabular-nums",
                              on ? "text-brand-text" : "text-ash",
                            )}
                          >
                            {item.stage}
                          </span>
                          <span
                            className={cn(
                              "font-display mt-1 block text-[0.95rem] font-extrabold uppercase leading-[1.15]",
                              on ? "text-snow" : "text-fog",
                            )}
                          >
                            {item.title}
                          </span>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* What the ring is turning around: the site being kept in
                    service. Drawn, not labelled. */}
                <div
                  aria-hidden
                  className="absolute left-[67.5%] top-1/2 w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-ink-2 p-3"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    <span className="h-1 flex-1 rounded-full bg-snow/15" />
                  </span>
                  <span className="mt-2.5 block h-1 w-full rounded-full bg-line" />
                  <span className="mt-1.5 block h-1 w-3/4 rounded-full bg-line" />
                  <span className="mt-2.5 flex gap-1.5">
                    <span className="h-6 flex-1 rounded bg-line/70" />
                    <span className="h-6 flex-1 rounded bg-line/70" />
                  </span>
                </div>
              </div>

              {/* ------------------------------------------------- the panel */}
              <div className="mt-6 border-t border-line pt-8">
                {items.map((item, i) => {
                  const on = i === active;
                  return (
                    <motion.div
                      key={item.no}
                      id={`${id}-panel-${i}`}
                      role="tabpanel"
                      aria-labelledby={`${id}-mark-${i}`}
                      inert={!on}
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, height: on ? "auto" : 0 }}
                      transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-4xl text-base leading-relaxed text-fog sm:text-lg">
                        {item.body}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Below the large breakpoint the ring is drawn down the left edge of
               the last three stages instead of around them, so the shape of the
               arrangement survives without hotspots on a small drawing. */
            <ol className="relative">
              {items.map((item, i) => {
                const looping = i >= APPROACH;
                return (
                  <li key={item.no} className="relative pl-10">
                    {/* The spine. Solid through the setup, and the stretch that
                        repeats is drawn broken back on itself below. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-[0.6875rem] top-0 w-px",
                        i === items.length - 1 ? "h-8" : "h-full",
                        looping ? "bg-brand/40" : "bg-line",
                      )}
                    />
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-1 top-6 flex h-4 w-4 items-center justify-center rounded-full border",
                        looping ? "border-brand bg-void" : "border-line bg-void",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          looping ? "bg-brand" : "bg-line",
                        )}
                      />
                    </span>

                    <div className="border-b border-line py-6">
                      <p className="font-display text-[0.62rem] font-bold uppercase tabular-nums text-brand-text">
                        {item.stage}
                      </p>
                      <h3 className="font-display mt-2 text-lg font-extrabold uppercase leading-tight text-snow">
                        {item.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-fog">{item.body}</p>
                    </div>
                  </li>
                );
              })}

              {/* The return: the last stage is where the next round starts. A
                  U-turn rather than an end mark, because the copy above it
                  hands the reader back to Stage 4. */}
              <li aria-hidden className="relative h-14">
                <svg viewBox="0 0 40 56" className="absolute left-0 top-0 h-14 w-10" fill="none">
                  <path
                    d="M11 0V26Q11 40 20 40Q29 40 29 26V10"
                    stroke="var(--color-brand)"
                    strokeWidth="1.4"
                    strokeDasharray="5 5"
                    fill="none"
                    opacity="0.75"
                  />
                  <path
                    d="M25 15l4-6 4 6"
                    stroke="var(--color-brand)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.75"
                  />
                </svg>
              </li>
            </ol>
          )}
        </div>
      </Container>
    </section>
  );
}

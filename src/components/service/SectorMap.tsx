"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Ten kinds of business, set on the only thing this service is about: a place.
 *
 *  WHY A FIELD AND NOT A LIST. Everywhere else on this site a sector list is a
 *  run of names, because nothing about the sectors can be drawn. Here one thing
 *  can. The document's own boundary sentence says local SEO "is most useful when
 *  location affects the buying decision", so these ten are not ten industries in
 *  the abstract, they are ten businesses somebody is trying to find nearby. They
 *  are pins, on a field, inside a radius, under a sweep. The metaphor is the
 *  service, and the next section reuses the same radius to show what falls
 *  outside it.
 *
 *  IT IS NOT A MAP OF ANYWHERE. No coastline, no district, no street name: an
 *  abstract grid with a search radius on it. Drawing Dubai would be inventing
 *  coverage the document never claims, and the pin positions are a composition
 *  rather than locations. Nothing here is counted, because the document counts
 *  nothing.
 *
 *  THE SWEEP AND THE LIST ARE ONE THING. A pin lights when its name is hovered
 *  or focused, and when nothing is, the sweep picks them up in turn -- which is
 *  the point being made: someone nearby is searching right now, and the business
 *  is either found or it is not.
 *
 *
 *  ONE NOTE ON SURFACE. The section banding alternates ink-2 and ink-3 by
 *  position, so a panel hard-coded to either tone vanishes into its own section
 *  whenever the parity falls the wrong way. The plates here are a brand tint
 *  over whatever is behind them instead, which darkens both tones by the same
 *  amount and survives a section being inserted above.
 *
 *  MOTION. The rotation is CSS on a layer carrying no words. The lit pin is
 *  state, so it holds still under reduced motion at the first name, and the
 *  reveal skips its initial frame there. Nothing that carries a word animates
 *  its opacity. */

/** Pin positions as percentages of the field. Hand-set for spread and to keep
 *  every pin clear of its neighbours; they mean nothing else. Ordered
 *  clockwise from the top so the sweep meets them in list order. */
const PINS = [
  { x: 47, y: 15 },
  { x: 67, y: 21 },
  { x: 82, y: 34 },
  { x: 87, y: 55 },
  { x: 76, y: 72 },
  { x: 58, y: 84 },
  { x: 38, y: 82 },
  { x: 21, y: 68 },
  { x: 13, y: 48 },
  { x: 24, y: 28 },
];

/** One pin per 9s turn of the sweep, so the two agree without being wired
 *  together. Ten pins, ten steps. */
const STEP_MS = 900;

export function SectorMap({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;

  /** What the sweep is passing over, and what the reader is pointing at. The
   *  second wins whenever it exists. */
  const [swept, setSwept] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  const active = held ?? swept;

  useEffect(() => {
    if (reduced || !inView) return;
    const t = window.setInterval(() => setSwept((s) => (s + 1) % PINS.length), STEP_MS);
    return () => window.clearInterval(t);
  }, [reduced, inView]);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "network", label: "Ten kinds of business people look for nearby" }}
          className="mb-12"
        />

        <div
          ref={ref}
          className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center"
        >
          {/* The names. Each row is a record with three columns -- the count,
              the business, and a marker that rhymes with the pin it lights on
              the field -- so the list reads as the field's index rather than a
              stack of headings. The active row is signalled three ways at once:
              a bar in the gutter, a wash behind, and the name stepping in
              towards it. All three are transforms, so nothing carrying a word
              animates its opacity. */}
          <ol className="border-t border-line">
            {items.map((name, i) => {
              const on = active === i;
              return (
                <motion.li
                  key={name}
                  initial={reduced ? false : { opacity: 0, x: -14 }}
                  animate={play ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: i * 0.045, ease: EASE }}
                  onMouseEnter={() => setHeld(i)}
                  onMouseLeave={() => setHeld(null)}
                  onFocus={() => setHeld(i)}
                  onBlur={() => setHeld(null)}
                  tabIndex={0}
                  className={cn(
                    "relative grid cursor-default grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-line py-4 outline-none transition-colors duration-300 sm:grid-cols-[3.25rem_minmax(0,1fr)_auto]",
                    on ? "text-brand" : "text-snow",
                  )}
                >
                  {/* The wash. */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-0 left-0 right-0 origin-left bg-brand/[0.06] transition-transform duration-500 ease-out",
                      on ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  {/* The bar in the gutter, growing from the middle out. */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-1 left-0 w-[2px] origin-center bg-brand transition-transform duration-500 ease-out",
                      on ? "scale-y-100" : "scale-y-0",
                    )}
                  />

                  <span
                    aria-hidden
                    className={cn(
                      "font-display relative text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                      on ? "text-brand" : "text-brand/35",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={cn(
                      "font-display relative text-[clamp(1rem,1.7vw,1.22rem)] font-extrabold uppercase leading-[1.15] transition-transform duration-500 ease-out",
                      on ? "translate-x-1.5" : "translate-x-0",
                    )}
                  >
                    {name}
                  </span>

                  {/* The same pin the field carries, at gutter size. Faint
                      until this row is the one being looked for. */}
                  <span
                    aria-hidden
                    className={cn(
                      "relative block shrink-0 transition-[opacity,transform] duration-500 ease-out",
                      on ? "scale-110 opacity-100" : "scale-100 opacity-25",
                    )}
                  >
                    <svg viewBox="0 0 16 22" className="h-[15px] w-[11px]" fill="none">
                      <path
                        d="M8 21c4-6 6.5-9.2 6.5-12.6a6.5 6.5 0 1 0-13 0C1.5 11.8 4 15 8 21Z"
                        fill={on ? "var(--color-brand)" : "none"}
                        stroke="var(--color-brand)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="8"
                        cy="8.2"
                        r="2.3"
                        fill={on ? "var(--color-ink-3)" : "none"}
                        stroke={on ? "none" : "var(--color-brand)"}
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                </motion.li>
              );
            })}
          </ol>

          {/* The field. */}
          <div
            aria-hidden
            className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)]"
          >
            <span
              className="absolute inset-0 opacity-[0.45]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />

            {/* Two rings and a sweep: a search happening, not a place. */}
            {[86, 56, 26].map((size, i) => (
              <motion.span
                key={size}
                initial={reduced ? false : { scale: 0.55, opacity: 0 }}
                animate={play ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: i * 0.09, ease: EASE }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand/30"
                style={{ height: `${size}%`, width: `${size}%` }}
              />
            ))}

            <span className="sm-sweep absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full">
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, color-mix(in srgb, var(--color-brand) 22%, transparent), transparent 62deg)",
                }}
              />
            </span>

            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand" />

            {PINS.map((pin, i) => {
              const on = active === i;
              return (
                <motion.span
                  key={i}
                  initial={reduced ? false : { opacity: 0, y: -10 }}
                  animate={play ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.045, ease: EASE }}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  <span
                    className={cn(
                      "block origin-bottom transition-transform duration-500 ease-out",
                      on ? "scale-[1.55]" : "scale-100",
                    )}
                  >
                    <svg viewBox="0 0 16 22" className="h-5 w-4" fill="none">
                      <path
                        d="M8 21c4-6 6.5-9.2 6.5-12.6a6.5 6.5 0 1 0-13 0C1.5 11.8 4 15 8 21Z"
                        fill={on ? "var(--color-brand)" : "var(--color-ink-3)"}
                        stroke="var(--color-brand)"
                        strokeWidth="1.4"
                        opacity={on ? 1 : 0.55}
                      />
                      <circle cx="8" cy="8.2" r="2.3" fill={on ? "var(--color-ink-2)" : "var(--color-brand)"} opacity={on ? 1 : 0.55} />
                    </svg>
                  </span>
                </motion.span>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useCallback, useRef } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { routeExists } from "@/lib/sitemap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { cn } from "@/lib/cn";

type Item = { label: string; href?: string };

/** Eleven sectors as a field the cursor moves through.
 *
 *  THE SOURCE IS ELEVEN NAMES AND NOTHING ELSE. No descriptions, no ranking, no
 *  per-sector claim, and none may be invented. That rules out cards, which
 *  advertise a slot for copy that does not exist, and it rules out any drawing
 *  that would assert a relationship between sectors the document never states.
 *  What is left is the names themselves, so the section has to earn its place
 *  through how they behave rather than through what they say. For content with
 *  nothing to explain, tactile is the honest answer, and it is the only one here
 *  that adds something without adding words.
 *
 *  WHY NOT THE DRIFTING ROWS THIS REPLACES. A marquee moves whether or not
 *  anybody is there, it walks a name away from the reader trying to read it, and
 *  on a phone it is motion with no input at all. This field is the opposite: it
 *  is completely still until a pointer enters it, and then it responds to where
 *  that pointer actually is. The reader causes the motion instead of watching it.
 *
 *  HOW IT RESPONDS. Every tile measures its own distance from the cursor and
 *  writes a single falloff number to itself as a custom property; the transform
 *  and the ring read that number in CSS. Nothing re-renders, there is no rAF
 *  loop, and the work per move is one measurement per tile on a field of eleven.
 *
 *  THE MOSAIC IS ASYMMETRIC ON PURPOSE. Three, two, three, two, one across six
 *  columns, so the eleven read as a composition rather than a grid with a hole
 *  in the last row. The sectors that have a page behind them carry a mark and
 *  are links; the rest are plain, because pretending otherwise would put dead
 *  ends in the field.
 *
 *  RESPONSIVE AND REDUCED MOTION. A coarse pointer never fires the proximity
 *  work, so on a phone this is simply a clean two-column mosaic with tap states,
 *  which is what a phone should get. Under prefers-reduced-motion the wipe and
 *  the falloff are both dropped and every tile renders in place. */

/** Column spans across a six-column field: 3, 2, 3, 2, 1 down the rows. Written
 *  as literal class names rather than an inline gridColumn, for two reasons: an
 *  inline span would apply at every width and wreck the two-column mosaic a
 *  phone gets, and Tailwind only generates classes it can see written out. */
const SPAN_CLASS = ["sm:col-span-2","sm:col-span-2","sm:col-span-2","sm:col-span-3","sm:col-span-3","sm:col-span-2","sm:col-span-2","sm:col-span-2","sm:col-span-3","sm:col-span-3","sm:col-span-6"];

/** How far the cursor's influence reaches, in pixels. Wider than a tile: at
 *  340 the neighbours of a 405px tile fell outside the radius entirely, so only
 *  the tile under the cursor and the one below it ever moved and the field read
 *  as sparse. This carries two or three tiles either side. */
const RADIUS = 560;

export function SectorField({
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
  strokeTitle?: string;
  items: Item[];
}) {
  const reduced = usePrefersReducedMotion();
  const field = useRef<HTMLDivElement>(null);

  /* One measurement per tile per pointer move, written straight to the element.
     No React render, no animation frame: the pointer event is the only clock. */
  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced || e.pointerType === "touch") return;
      const el = field.current;
      if (!el) return;
      for (const tile of el.querySelectorAll<HTMLElement>("[data-tile]")) {
        const r = tile.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const f = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
        tile.style.setProperty("--f", f.toFixed(3));
      }
    },
    [reduced],
  );

  const onLeave = useCallback(() => {
    const el = field.current;
    if (!el) return;
    for (const tile of el.querySelectorAll<HTMLElement>("[data-tile]")) {
      tile.style.setProperty("--f", "0");
    }
  }, []);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-16 sm:py-20">
      <Container className="relative">
        <SectionHeader index={index} title={title} strokeTitle={strokeTitle} className="mb-12" />

        <div
          ref={field}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="grid grid-cols-2 gap-3 sm:grid-cols-6"
        >
          {items.map((item, i) => {
            const live = item.href && routeExists(item.href);
            const span = SPAN_CLASS[i] ?? "sm:col-span-2";
            const Tag = live ? "a" : "div";
            return (
              <motion.div
                key={item.label}
                /* A wipe, not a fade-up. The tiles arrive across the field in
                   the direction it is read. */
                initial={reduced ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{
                  duration: 0.55,
                  delay: reduced ? 0 : (i % 3) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={span}
              >
                <Tag
                  {...(live ? { href: item.href } : {})}
                  data-tile
                  className={cn(
                    "group relative flex h-full min-h-[7rem] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 sm:min-h-[8.5rem] sm:p-6",
                    "[--f:0] transition-colors duration-300 motion-reduce:transition-none",
                    live && "cursor-pointer",
                  )}
                  style={{
                    transform: reduced
                      ? undefined
                      : "translateY(calc(var(--f) * -0.55rem)) scale(calc(1 + var(--f) * 0.018))",
                    transition: reduced
                      ? undefined
                      : "transform 380ms cubic-bezier(0.16,1,0.3,1), border-color 300ms ease-out",
                  }}
                >
                  {/* The ring the cursor brings with it. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl border border-brand"
                    style={{ opacity: reduced ? 0 : "var(--f)" }}
                  />
                  {/* A wash under it, so near tiles gain weight as well as edge. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl bg-brand"
                    style={{ opacity: reduced ? 0 : "calc(var(--f) * 0.07)" }}
                  />

                  <span
                    aria-hidden
                    className="relative text-[0.6rem] font-semibold tabular-nums text-ash transition-colors duration-300 group-hover:text-brand-text motion-reduce:transition-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative mt-6 flex items-end justify-between gap-3">
                    <span className="font-display text-[clamp(0.95rem,1.5vw,1.3rem)] font-extrabold uppercase leading-[1.15] text-snow">
                      {item.label}
                    </span>
                    {/* Only the sectors with a page behind them are marked. */}
                    {live && (
                      <span
                        aria-hidden
                        className="shrink-0 translate-x-0 text-brand transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                      >
                        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                          <path
                            d="M3 8h9M8 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                </Tag>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

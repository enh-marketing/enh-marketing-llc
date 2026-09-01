"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "motion/react";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The site's card, extracted so there is one implementation of it.
 *
 *  This treatment was invented inside ReasonList on the Performance Marketing
 *  page — cursor spotlight, a rule that wipes across the top edge on hover, a
 *  ghost-stroked index numeral that fills with brand red, and a one-pixel lift.
 *  It is the house card, so it belongs in ui/ rather than inside one section,
 *  and ReasonList now consumes it instead of owning it.
 *
 *  WHAT IS PARAMETERISED AND WHAT IS NOT. Radius, border, surface, spotlight
 *  and hover behaviour are fixed — that is the point of having one card. What
 *  varies is the header row (an index, a glyph, both, or neither), the padding
 *  scale, and the reveal delay. A caller that wants a different border colour
 *  or corner radius is asking for a second card, and should be talked out of
 *  it rather than given a prop.
 *
 *  The spotlight coordinates are written straight to the element as custom
 *  properties, so tracking the pointer costs no re-render. */
export function SurfaceCard({
  children,
  index,
  glyph,
  delay = 0,
  padding = "default",
  className,
}: {
  children: ReactNode;
  /** Ghost-stroked numeral, top left. */
  index?: string;
  /** Marks the card's subject, top right, from the shared glyph set. */
  glyph?: GlyphVariant;
  delay?: number;
  padding?: "default" | "tight";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={track}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={cn(
        "group relative isolate h-full overflow-hidden rounded-2xl border border-line bg-ink-2 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-brand/45",
        padding === "tight" ? "p-6 sm:p-7" : "p-8 sm:p-10",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(232,0,13,0.16), transparent 70%)",
        }}
      />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
      />

      {(index || glyph) && (
        <div className="mb-8 flex items-start justify-between gap-6">
          {index ? (
            <span className="font-display text-[3.25rem] font-extrabold leading-none text-stroke transition-colors duration-500 group-hover:text-brand group-hover:[-webkit-text-stroke:0]">
              {index}
            </span>
          ) : (
            <span />
          )}
          {glyph ? (
            <span className="mt-1 h-9 w-9 shrink-0 text-fog transition-colors duration-500 group-hover:text-brand">
              <CapabilityGlyph variant={glyph} />
            </span>
          ) : (
            <span
              aria-hidden
              className="mt-3 h-2 w-2 shrink-0 rounded-full bg-line transition-colors duration-500 group-hover:bg-brand"
            />
          )}
        </div>
      )}

      {children}
    </motion.div>
  );
}

/** Card title, at the scale the house card uses. */
export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={cn(
        "font-display text-xl font-extrabold uppercase leading-[1.12] text-snow sm:text-2xl",
        className,
      )}
    >
      {children}
    </h3>
  );
}

/** Card body copy. */
export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-4 leading-relaxed text-fog", className)}>{children}</p>;
}

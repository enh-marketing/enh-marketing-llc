"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Reason = { no: string; title: string; body: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Premium card: a spotlight tracks the cursor across the surface, the rule
 *  above it wipes red, and the numeral lifts out of its outline. Written to
 *  CSS custom properties on pointer move so nothing re-renders per frame. */
function ReasonCard({ reason, i }: { reason: Reason; i: number }) {
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
      transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
      className="group relative isolate h-full overflow-hidden rounded-2xl border border-line bg-ink-2 p-8 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-brand/45 sm:p-10"
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(232,0,13,0.16), transparent 70%)",
        }}
      />
      {/* Wiping rule */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
      <span
        aria-hidden
        className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
      />

      <div className="flex items-start justify-between gap-6">
        <span className="font-display text-[3.25rem] font-extrabold leading-none text-stroke transition-colors duration-500 group-hover:text-brand group-hover:[-webkit-text-stroke:0]">
          {reason.no}
        </span>
        <span
          aria-hidden
          className="mt-3 h-2 w-2 shrink-0 rounded-full bg-line transition-colors duration-500 group-hover:bg-brand"
        />
      </div>

      <h3 className="font-display mt-8 text-xl font-extrabold uppercase leading-[1.12] text-snow sm:text-2xl">
        {reason.title}
      </h3>
      <p className="mt-4 leading-relaxed text-fog">{reason.body}</p>
    </motion.div>
  );
}

export function ReasonList({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  reasons,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lede?: string;
  reasons: Reason[];
}) {
  const reduced = useReducedMotion();

  return (
    <section id={id} data-section={label} className="relative py-24 sm:py-32">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          lede={lede}
          mark={{ variant: "growth", label: "Six reasons, climbing" }}
          className="mb-16"
        />

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <li key={reason.no} className={reduced ? undefined : "lg:[&:nth-child(3n+2)]:mt-10"}>
              <ReasonCard reason={reason} i={i} />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

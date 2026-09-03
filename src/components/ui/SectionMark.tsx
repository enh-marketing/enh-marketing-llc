"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";

/** Section marks: one small, subject-specific diagram per section, sitting in
 *  the space beside the heading.
 *
 *  Deliberately inline SVG, not WebGL. Five canvases on one page would cost far
 *  more than the idea is worth, and these read better as precise line drawings
 *  than as rendered objects. Each draws itself once on entry and drifts with the
 *  cursor, reusing the magnetic-spring idiom already on the homepage.
 */

type Variant = "growth" | "network" | "progression" | "contrast" | "ecosystem";

const LINE = "var(--color-line)";
const BRAND = "var(--color-brand)";
const EASE = [0.16, 1, 0.3, 1] as const;

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.1, delay, ease: EASE },
});

const pop = (delay: number) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, delay, ease: EASE },
});

/* Six reasons climbing. */
function Growth() {
  const pts = [
    [16, 168],
    [50, 140],
    [84, 148],
    [118, 104],
    [152, 72],
    [184, 28],
  ];
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  return (
    <>
      <motion.path d={d} stroke={BRAND} strokeWidth="1.6" fill="none" {...draw(0.1)} />
      {pts.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={i === pts.length - 1 ? 5 : 3}
          fill={i === pts.length - 1 ? BRAND : "var(--color-void)"}
          stroke={i === pts.length - 1 ? BRAND : LINE}
          strokeWidth="1.4"
          {...pop(0.5 + i * 0.07)}
        />
      ))}
      <motion.line x1="8" y1="184" x2="192" y2="184" stroke={LINE} strokeWidth="1" {...draw(0)} />
    </>
  );
}

/* Six channels, one budget. */
function Network() {
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [100 + Math.cos(a) * 74, 100 + Math.sin(a) * 74];
  });
  return (
    <>
      {nodes.map(([x, y], i) => (
        <motion.line
          key={`e${i}`}
          x1="100"
          y1="100"
          x2={x}
          y2={y}
          stroke={LINE}
          strokeWidth="1.2"
          {...draw(0.15 + i * 0.08)}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="7" fill="var(--color-void)" stroke={BRAND} strokeWidth="1.5" {...pop(0.5 + i * 0.07)} />
      ))}
      <motion.circle cx="100" cy="100" r="13" fill={BRAND} {...pop(0.2)} />
    </>
  );
}

/* Four stages across ninety days. */
function Progression() {
  const R = 72;
  const seg = (i: number) => {
    const a0 = (i / 4) * Math.PI * 2 - Math.PI / 2 + 0.06;
    const a1 = ((i + 1) / 4) * Math.PI * 2 - Math.PI / 2 - 0.06;
    const p = (a: number) => [100 + Math.cos(a) * R, 100 + Math.sin(a) * R];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    return `M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1}`;
  };
  return (
    <>
      <circle cx="100" cy="100" r={R} stroke={LINE} strokeWidth="1" fill="none" opacity="0.5" />
      {[0, 1, 2, 3].map((i) => (
        <motion.path key={i} d={seg(i)} stroke={BRAND} strokeWidth="3" strokeLinecap="round" fill="none" {...draw(0.2 + i * 0.22)} />
      ))}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
        return (
          <motion.circle key={`d${i}`} cx={100 + Math.cos(a) * R} cy={100 + Math.sin(a) * R} r="4" fill={BRAND} {...pop(0.3 + i * 0.22)} />
        );
      })}
    </>
  );
}

/* Two approaches, and the overlap where they work together. */
function Contrast() {
  return (
    <>
      <motion.circle cx="76" cy="100" r="52" stroke={BRAND} strokeWidth="1.6" fill="none" {...draw(0.1)} />
      <motion.circle cx="124" cy="100" r="52" stroke={LINE} strokeWidth="1.6" fill="none" {...draw(0.3)} />
      <motion.path
        d="M100 52.5 A52 52 0 0 1 100 147.5 A52 52 0 0 1 100 52.5 Z"
        fill={BRAND}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.22 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
      />
      <motion.line x1="100" y1="34" x2="100" y2="166" stroke={BRAND} strokeWidth="1" strokeDasharray="3 5" {...draw(0.8)} />
    </>
  );
}

/* Sectors of different weight, loosely connected. */
function Ecosystem() {
  const nodes: [number, number, number][] = [
    [30, 62, 5], [78, 34, 8], [132, 56, 5], [176, 96, 6],
    [140, 138, 9], [88, 168, 5], [40, 132, 7], [104, 100, 4],
  ];
  const edges: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [7, 1], [7, 4], [7, 6]];
  return (
    <>
      {edges.map(([a, b], i) => (
        <motion.line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={LINE} strokeWidth="1" {...draw(0.1 + i * 0.05)} />
      ))}
      {nodes.map(([x, y, r], i) => (
        <motion.circle key={i} cx={x} cy={y} r={r} fill={i % 3 === 1 ? BRAND : "var(--color-void)"} stroke={i % 3 === 1 ? BRAND : LINE} strokeWidth="1.4" {...pop(0.5 + i * 0.06)} />
      ))}
    </>
  );
}

const VARIANTS: Record<Variant, () => React.ReactElement> = {
  growth: Growth,
  network: Network,
  progression: Progression,
  contrast: Contrast,
  ecosystem: Ecosystem,
};

export function SectionMark({ variant, label }: { variant: Variant; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Hydration-safe: see usePrefersReducedMotion. Both the style below and the
  // shape itself are conditional on this, so reading it during the first client
  // render mismatched the server on every page carrying a section mark.
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 18 });
  const sy = useSpring(y, { stiffness: 90, damping: 18 });

  const Shape = VARIANTS[variant];

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 16);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 16);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      // lg and up only: at tablet widths the mark steals measure from the
      // heading and forces extra line wraps.
      className="hidden shrink-0 lg:block"
    >
      <motion.svg
        viewBox="0 0 200 200"
        role="img"
        aria-label={label}
        style={reduced ? undefined : { x: sx, y: sy }}
        className="h-[clamp(9rem,14vw,13rem)] w-[clamp(9rem,14vw,13rem)] overflow-visible"
      >
        {inView || reduced ? <Shape /> : null}
      </motion.svg>
    </div>
  );
}

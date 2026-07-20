"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/* Reusable animated SVG adornments — the decorative motion language of V3. */

/** Slowly rotating four-point star. */
export function SpinStar({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <path
        d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"
        fill="var(--color-brand)"
      />
    </motion.svg>
  );
}

/** Dashed route over small peaks with a pulsing summit — marching dashes. */
export function PeakDivider({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 36" className={cn("h-9 w-[280px]", className)} fill="none" aria-hidden>
      <path
        d="M2 28 L70 28 L104 10 L138 28 L278 28"
        stroke="var(--color-line)"
        strokeWidth="1.5"
        className="animate-dash"
      />
      <motion.circle
        cx="104"
        cy="10"
        r="3.5"
        fill="var(--color-brand)"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "104px 10px" }}
      />
      <motion.circle
        cx="104"
        cy="10"
        r="9"
        stroke="var(--color-brand)"
        strokeWidth="1"
        animate={{ scale: [1, 2], opacity: [0.6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: "104px 10px" }}
      />
    </svg>
  );
}

/** Wide dashed route with peaks and a waving summit flag — for section headers. */
export function RouteLine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 44"
      preserveAspectRatio="none"
      className={cn("h-10 w-full", className)}
      fill="none"
      aria-hidden
    >
      <path
        d="M0 34 L780 34 L840 16 L880 34 L1040 34 L1100 10 L1200 10"
        stroke="var(--color-line)"
        strokeWidth="1.5"
        className="animate-dash"
        vectorEffect="non-scaling-stroke"
      />
      <motion.g
        animate={{ y: [0, -2.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="1100" y1="10" x2="1100" y2="-6" stroke="var(--color-snow)" strokeWidth="2" />
        <motion.path
          d="M1100 -6 L1116 -1 L1100 4 Z"
          fill="var(--color-brand)"
          animate={{ scaleX: [1, 0.82, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "1100px -1px" }}
        />
      </motion.g>
    </svg>
  );
}

/** Small up-trend sparkline that draws itself in view, with a pulsing tip. */
export function Sparkline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 28" className={cn("h-6 w-14", className)} fill="none" aria-hidden>
      <motion.path
        d="M2 24 L18 17 L30 20 L46 8 L60 4"
        stroke="var(--color-brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="60"
        cy="4"
        r="3"
        fill="var(--color-brand)"
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 4px" }}
      />
    </svg>
  );
}

/** Rotating dashed orbit with a red satellite dot. */
export function OrbitMark({ size = 52, className }: { size?: number; className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 56 56"
      width={size}
      height={size}
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      <circle
        cx="28"
        cy="28"
        r="24"
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="1.5"
        strokeDasharray="4 8"
      />
      <circle cx="28" cy="4" r="3.5" fill="var(--color-brand)" />
    </motion.svg>
  );
}

/** Pulsing concentric rings around a dot — milestone marker. */
export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-[15px] w-[15px] items-center justify-center", className)} aria-hidden>
      <motion.span
        className="absolute inset-0 rounded-full border border-brand"
        animate={{ scale: [1, 2.1], opacity: [0.8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="h-[15px] w-[15px] rounded-full border-2 border-brand bg-void" />
    </span>
  );
}

/** Expanding radar rings — for high-contrast bands. */
export function Radar({ className, color = "rgba(255,255,255,0.85)" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={cn("h-16 w-16", className)} fill="none" aria-hidden>
      <circle cx="40" cy="40" r="5" fill={color} />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="40"
          cy="40"
          r="10"
          stroke={color}
          strokeWidth="1.5"
          animate={{ r: [10, 36], opacity: [0.8, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: i * 0.85 }}
        />
      ))}
    </svg>
  );
}

/** Constellation of pulsing nodes — the AI motif. */
export function NodeWeb({ className }: { className?: string }) {
  const nodes = [
    { x: 14, y: 78, r: 3 },
    { x: 52, y: 30, r: 4 },
    { x: 98, y: 58, r: 3 },
    { x: 138, y: 14, r: 4.5 },
    { x: 150, y: 72, r: 3 },
    { x: 84, y: 96, r: 3.5 },
  ];
  const links = [
    [0, 1], [1, 2], [2, 3], [2, 4], [0, 5], [5, 2], [1, 3],
  ] as const;
  return (
    <svg viewBox="0 0 164 110" className={cn("h-24 w-40", className)} fill="none" aria-hidden>
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-line)"
          strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={i === 3 || i === 1 ? "var(--color-brand)" : "var(--color-fog)"}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.35, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </svg>
  );
}

/** Floating emblem with ripple rings around arbitrary glyph content. */
export function RippleEmblem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex h-20 w-20 items-center justify-center", className)} aria-hidden>
      <motion.span
        className="absolute inset-0 rounded-full border border-brand/50"
        animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full border border-brand/30"
        animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
      />
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Back-to-top: rotating dashed ring + bouncing arrow. */
export function BackToTop() {
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group relative flex h-12 w-12 items-center justify-center text-snow transition-colors hover:text-brand"
    >
      <motion.svg
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--color-line)" strokeWidth="1.5" strokeDasharray="3 7" />
      </motion.svg>
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <path d="M8 15V2M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </button>
  );
}

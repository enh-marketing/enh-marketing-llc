"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Custom cursor: a red dot with a trailing ring.
 * Elements opt into states via [data-cursor="view" | "drag" | "link"].
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hot, setHot] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role='button'], input, select, textarea, label");
      if (!t) {
        setHot(false);
        setLabel(null);
        return;
      }
      const mode = t.dataset.cursor;
      setHot(true);
      setLabel(mode === "view" ? "View" : mode === "drag" ? "Drag" : null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = label ? 76 : hot ? 52 : 36;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      {/* Trailing ring / label badge */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            scale: pressed ? 0.85 : 1,
            backgroundColor: label ? "rgba(232,0,13,0.95)" : "rgba(232,0,13,0)",
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ borderColor: label ? "transparent" : "var(--cursor-ring)" }}
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        >
          {label && (
            <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-white">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Core dot */}
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: label ? 0 : pressed ? 0.6 : 1 }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand"
        />
      </motion.div>
    </div>
  );
}

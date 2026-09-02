"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, animate } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

/**
 * noomo-style entry: counter climbs to 100, wordmark reveals, curtain lifts.
 * Robustness: rAF-driven animation can stall in throttled/background tabs,
 * so a timer-based hard deadline force-unmounts the preloader regardless.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const fireDone = () => {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone();
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(100);
      setGone(true);
      fireDone();
      return;
    }

    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.3, 0.6, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setLeaving(true), 250),
    });

    // Timer-based safety net (timers fire even when rAF is throttled):
    // start the exit by 2.4s, hand over the page by 3.1s, force-unmount by 4s.
    const tLeave = setTimeout(() => setLeaving(true), 2400);
    const tDone = setTimeout(fireDone, 3100);
    const tGone = setTimeout(() => setGone(true), 4000);

    return () => {
      controls.stop();
      clearTimeout(tLeave);
      clearTimeout(tDone);
      clearTimeout(tGone);
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => setGone(true)}
          className="fixed inset-0 z-[100] bg-void py-8"
          aria-hidden
        >
          <Container className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <Logo className="h-6" />
            <span className="text-xs uppercase text-fog hidden sm:block">Dubai, UAE</span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mega font-extrabold uppercase text-snow"
            >
              Explore
              <span className="text-brand">.</span>
            </motion.h1>
          </div>

          <div className="flex items-end justify-between">
            <span className="text-xs uppercase text-fog">
              Loading the climb
            </span>
            <span className="font-display text-5xl font-extrabold tabular-nums text-snow sm:text-6xl">
              {count}
              <span className="text-brand">%</span>
            </span>
          </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

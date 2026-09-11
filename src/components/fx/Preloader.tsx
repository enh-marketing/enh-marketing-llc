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

    /** THE CURTAIN AND THE HANDOVER ARE ONE EVENT, AND THEY USED NOT TO BE.
     *
     *  `leaving` started the curtain's 0.9s slide at 2.4s, and a separate timer
     *  fired the handover at 3.1s. But the hero's headline is not merely
     *  animated by that handover, it is HIDDEN until it arrives: <Chars> sets
     *  each character to y:110% inside an overflow-hidden mask and only moves
     *  it to 0 once `play` is true.
     *
     *  So between the curtain lifting and the handover there was a window with
     *  no headline on the page at all -- a headline-shaped hole above the
     *  sub-paragraph. 700ms by design, and longer on a phone, because every
     *  timer here starts when this effect first runs and on iOS that waits on
     *  hydration. It was reported as the page freezing for two to three
     *  seconds; nothing was frozen, the biggest thing on the screen was simply
     *  invisible.
     *
     *  Handing over as the curtain starts to lift closes the window. The
     *  headline now rises while the veil slides off it, which is the reveal the
     *  choreography was always describing, and the page can never again be
     *  visible without its own headline. */
    const leave = () => {
      setLeaving(true);
      fireDone();
    };

    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.3, 0.6, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(leave, 250),
    });

    // Timer-based safety net (timers fire even when rAF is throttled):
    // start the exit and hand over by 2.4s, force-unmount by 4s.
    const tLeave = setTimeout(leave, 2400);
    const tGone = setTimeout(() => setGone(true), 4000);

    return () => {
      controls.stop();
      clearTimeout(tLeave);
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

          {/* NOT AN H1. This is the wordmark on a loading veil, and it was
              marked up as one -- so the homepage shipped two h1 elements,
              "Explore." here and the real headline in the hero. Two h1s on the
              page whose whole job is to rank for one phrase, and the one a
              crawler met first belonged to a screen that is gone a second
              later. A `div` with the same classes renders identically: `.mega`
              is unlayered CSS that applies to any element, and Tailwind's
              preflight had already reset the heading's own font-size, weight
              and margin to inherit. */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mega font-extrabold uppercase text-snow"
            >
              Explore
              <span className="text-brand">.</span>
            </motion.div>
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

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
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);

  /** THE COUNTER DOES NOT GO THROUGH REACT, AND THAT IS THE POINT.
   *
   *  It used to be `useState`, updated from the animation's onUpdate. That is
   *  a re-render of this whole subtree on every frame of a 1.9s animation --
   *  a hundred and more of them, landing in the same window as the page's
   *  hydration, on the device least able to afford either.
   *
   *  A counter is two characters of text and one transform. Writing them to
   *  the nodes directly costs a property assignment per frame and nothing
   *  else. The markup below renders "0" and an empty bar on the server, which
   *  is exactly where the animation starts from. */
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fireDone = () => {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone();
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
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

    /** THE VEIL WAITS FOR A FREE MAIN THREAD, WHICH IS WHAT IT IS FOR.
     *
     *  Measured with `npm run check:mainthread` at 6x CPU throttle: the
     *  homepage spends 1081ms in long tasks, and /contact-us -- which has no
     *  preloader at all -- spends 846ms. So most of it is React hydrating, it
     *  happens on every page, and on the homepage its tail ran from 2077ms to
     *  2694ms. The curtain lifted at a fixed 2400ms, straight into the middle
     *  of it, and the first thing the reader could do with the page was watch
     *  it not respond for a second. That is the "freezes after the preloader"
     *  report, and the veil was the one thing that could have prevented it.
     *
     *  So the exit asks for an idle callback first. The browser grants one when
     *  the main thread has actually finished, so on a fast device this is the
     *  same 2.4s it always was, and on a slow phone the veil holds a moment
     *  longer and lifts onto a page that answers immediately. Waiting behind a
     *  loading screen that is plainly still loading is not the same experience
     *  as tapping a page that ignores you.
     *
     *  Every bound is kept. The idle request carries its own 1.2s timeout, and
     *  `tHardLeave` hands over at 3.6s whatever happens, before the 4s
     *  force-unmount -- so the veil can never outstay the safety net that
     *  removes it, and `started` can never fail to fire. */
    const leaveWhenReady = () => {
      if (doneRef.current) return;
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(leave, { timeout: 1200 });
      } else {
        leave();
      }
    };

    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.3, 0.6, 0.2, 1],
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = String(Math.round(v));
        if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
      },
      onComplete: () => setTimeout(leaveWhenReady, 250),
    });

    // Timer-based safety net (timers fire even when rAF is throttled):
    // ask to leave by 2.4s, leave regardless by 3.6s, force-unmount by 4s.
    const tLeave = setTimeout(leaveWhenReady, 2400);
    const tHardLeave = setTimeout(leave, 3600);
    const tGone = setTimeout(() => setGone(true), 4000);

    return () => {
      controls.stop();
      clearTimeout(tLeave);
      clearTimeout(tHardLeave);
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

          {/* TWO LINES, EACH RISING FROM ITS OWN MASK. The second is brand red
              and carries the full stop, so the veil states the same words the
              hero states underneath it -- "Explore / New Heights." -- rather
              than the single "Explore." it used to show.

              Each line needs its own overflow-hidden parent: one mask around
              both would slide them as a block, and the stagger is the point of
              the reveal.

              AND NEITHER IS A HEADING. This is a wordmark on a loading veil. It
              was once marked up as an h1, which shipped the homepage two of
              them -- this one and the real headline in the hero -- on a page
              whose whole job is to rank for one phrase, with the one a crawler
              met first belonging to a screen that is gone a second later. A
              `div` renders identically: `.mega` is unlayered CSS that applies
              to any element, and Tailwind's preflight had already reset the
              heading's own font-size, weight and margin to inherit. */}
          <div>
            {[
              { text: "Explore", className: "text-snow", delay: 0.15 },
              { text: "New Heights.", className: "text-brand", delay: 0.27 },
            ].map((line) => (
              <div key={line.text} className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-display mega font-extrabold uppercase ${line.className}`}
                >
                  {line.text}
                </motion.div>
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between gap-8">
            <div className="min-w-0 flex-1 sm:max-w-md">
              <span className="text-xs uppercase text-fog">
                Loading the climb
              </span>

              {/* THE BAR IS DRIVEN BY scaleX, NOT width, AND THAT IS DELIBERATE.
                  `count` changes on nearly every frame of a 1.9s animation.
                  Animating `width` puts a layout pass in each of those frames;
                  a transform is compositor-only and costs none. It matters more
                  here than almost anywhere on the site, because this element is
                  on screen during the one stretch when the main thread is busy
                  hydrating the page behind it -- the moment the iPhone report
                  was about. */}
              <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-line">
                <div
                  ref={barRef}
                  className="h-full w-full origin-left rounded-full bg-brand"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>

            <span className="font-display shrink-0 text-5xl font-extrabold tabular-nums leading-none text-snow sm:text-6xl">
              <span ref={numRef}>0</span>
              <span className="text-brand">%</span>
            </span>
          </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

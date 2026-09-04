"use client";

import { motion, useInView, animate } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Char-by-char display heading reveal (rises from a mask). */
export function Chars({
  text,
  className,
  delay = 0,
  immediate = false,
  play: playProp,
}: {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
  /** Drive the reveal from the caller instead of from view detection.
   *
   *  This exists so a caller can hold the animation back without holding the
   *  markup back. The hero used to withhold its whole <h1> until the preloader
   *  finished, which meant the headline was absent from the server HTML: a
   *  crawler saw no <h1> on the homepage, and if the handover never arrived a
   *  reader saw none either. With this the element is always rendered and only
   *  the motion waits. */
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = usePrefersReducedMotion();
  const play = playProp ?? (immediate || inView);

  // Characters are grouped into words, each word an inline-block that cannot
  // break internally. Without this the browser may wrap between any two
  // letters, because every character is its own inline-block.
  const words = text.split(" ").reduce<{ word: string; start: number }[]>((acc, word) => {
    const prev = acc[acc.length - 1];
    return [...acc, { word, start: prev ? prev.start + prev.word.length : 0 }];
  }, []);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map(({ word, start }, w) => (
        <Fragment key={w}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => (
              <span key={ci} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  /* A reader who asked for no motion gets the heading where it
                     already is, not a hundred characters travelling into
                     place. `initial={false}` skips the entrance without
                     touching anything else. */
                  initial={reduced ? false : { y: "110%", rotate: 6 }}
                  animate={reduced || play ? { y: 0, rotate: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: delay + (start + ci) * 0.025,
                    ease: EASE,
                  }}
                  aria-hidden
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </span>
          {w < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/** Fade-rise block. */
export function Rise({
  children,
  className,
  delay = 0,
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      /* Under prefers-reduced-motion the block is simply there: no offset to
         travel back from, and no opacity to wait for. This is the one entrance
         used across every page, so honouring the preference here honours it
         nearly everywhere. */
      initial={reduced ? false : { opacity: 0, y }}
      animate={reduced || inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Count-up number. */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className={className}>
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

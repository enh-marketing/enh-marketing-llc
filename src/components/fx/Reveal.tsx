"use client";

import { motion, useInView, animate } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Char-by-char display heading reveal (rises from a mask). */
export function Chars({
  text,
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const play = immediate || inView;

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
                  initial={{ y: "110%", rotate: 6 }}
                  animate={play ? { y: 0, rotate: 0 } : {}}
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
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
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

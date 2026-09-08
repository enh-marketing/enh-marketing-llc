"use client";

import { useEffect, useRef, useState } from "react";

/** A line that lights word by word.
 *
 *  THE HOME PAGE ALREADY DOES THIS and this is deliberately the same move, so
 *  the hub reads as the same site: sections/Manifesto.tsx ramps each word from
 *  0.16 to full across a scrubbed ScrollTrigger, in that order, and the line
 *  itself rides a small translateY. What is added here is the part that makes
 *  it land on a black page rather than a white one: each word also arrives from
 *  8px below and out of focus, because opacity alone on white-on-black reads as
 *  a dimmer switch rather than as words appearing.
 *
 *  IT IS DRIVEN, NOT TRIGGERED. Manifesto owns a ScrollTrigger; nothing on this
 *  page may, because the whole chapter machine is one scroll listener collapsed
 *  to a number and a second one fighting it is what broke the parallax. So this
 *  takes `p` and renders it. The caller decides where p comes from: the beats
 *  hand it their own `shown`, which already ramps as the beat approaches, and
 *  the opener tweens it once on mount.
 *
 *  THE STAGGER HAS TO FIT INSIDE p. Each word gets its own slice of the run,
 *  the last one starting at LAST_START so there is still a little of the range
 *  left for it to finish in. Words are spread across the range rather than
 *  given equal shares, so a nine-word line does not crawl.
 *
 *  REDUCED MOTION GETS THE WHOLE LINE AT ONCE. Not dimmed, not staggered: the
 *  animation is the only thing removed. */

/** Where in `p` the last word begins. Everything before it is spread evenly. */
const LAST_START = 0.62;
/** How much of `p` a single word takes to go from dark to lit. */
const WORD_RUN = 0.3;

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export function WordReveal({
  text,
  p,
  className,
  /** Words from this index on take the accent colour. -1 for none. */
  accentFrom = -1,
}: {
  text: string;
  p: number;
  className?: string;
  accentFrom?: number;
}) {
  const words = text.split(" ").filter(Boolean);
  const last = Math.max(1, words.length - 1);

  return (
    <span className={className}>
      {words.map((w, i) => {
        const start = (i / last) * LAST_START;
        const lit = clamp((p - start) / WORD_RUN);
        return (
          <span
            key={`${w}-${i}`}
            /* inline-block so the transform has something to move, and the
               trailing space is written out rather than left to the gap between
               inline elements, which collapses. Without it the accessible name
               of the heading runs the words together. */
            style={{
              display: "inline-block",
              opacity: 0.06 + 0.94 * lit,
              transform: `translateY(${(1 - lit) * 8}px)`,
              filter: lit > 0.995 ? undefined : `blur(${(1 - lit) * 5}px)`,
              willChange: lit > 0.001 && lit < 0.999 ? "opacity, transform, filter" : undefined,
            }}
            className={i >= accentFrom && accentFrom >= 0 ? "text-stroke" : undefined}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

/** The same thing, lighting itself once when it first appears.
 *
 *  For the opener, which is on screen at load and has no scroll of its own to
 *  be driven by. A tween rather than a CSS transition per word because the
 *  stagger already lives in WordReveal and duplicating it in delays would put
 *  the same decision in two places.
 *
 *  It waits for the fonts. Space Grotesk arrives after first paint, and a line
 *  that lights word by word in the fallback face and then reflows into the real
 *  one is worse than one that starts a moment later. */
export function WordRevealOnMount({
  text,
  className,
  accentFrom = -1,
  duration = 1500,
  delay = 180,
}: {
  text: string;
  className?: string;
  accentFrom?: number;
  duration?: number;
  delay?: number;
}) {
  const [p, setP] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }

    let start = 0;
    let cancelled = false;

    const step = (t: number) => {
      if (!start) start = t;
      const e = t - start - delay;
      if (e >= 0) {
        const x = clamp(e / duration);
        // easeOutCubic: quick to legible, unhurried into place.
        setP(1 - Math.pow(1 - x, 3));
        if (x >= 1) return;
      }
      raf.current = requestAnimationFrame(step);
    };

    const go = () => {
      if (cancelled) return;
      raf.current = requestAnimationFrame(step);
    };

    // document.fonts is absent on no browser we support, but it is optional in
    // the type and a rejected ready must not leave the line dark forever.
    if (document.fonts?.ready) document.fonts.ready.then(go, go);
    else go();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf.current);
    };
  }, [duration, delay, text]);

  return <WordReveal text={text} p={p} className={className} accentFrom={accentFrom} />;
}

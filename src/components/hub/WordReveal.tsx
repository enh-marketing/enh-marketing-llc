"use client";

import { Fragment } from "react";

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
export const LAST_START = 0.62;
/** How much of `p` a single word takes to go from dark to lit. */
export const WORD_RUN = 0.3;

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/** How lit word `i` of `n` is at progress `p`. Exported because the opener's
 *  line is rendered in two pieces, the part that never changes and the last
 *  word that swaps, and the swapping one has to arrive on exactly the beat it
 *  would have if the line were one string. */
export function wordLit(p: number, i: number, n: number) {
  return clamp((p - (i / Math.max(1, n - 1)) * LAST_START) / WORD_RUN);
}

/** The look of a word at a given lit value, shared by both renderers. */
export function wordStyle(lit: number): React.CSSProperties {
  return {
    display: "inline-block",
    opacity: 0.06 + 0.94 * lit,
    transform: `translateY(${(1 - lit) * 8}px)`,
    filter: lit > 0.995 ? undefined : `blur(${(1 - lit) * 5}px)`,
    willChange: lit > 0.001 && lit < 0.999 ? "opacity, transform, filter" : undefined,
  };
}

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

  return (
    <span className={className}>
      {words.map((w, i) => (
        /* THE SPACE IS A SIBLING, NOT PART OF THE WORD. Each word is an
           inline-block so the transform has a box to move, and a browser trims
           trailing whitespace inside an inline-block: written inside the span
           the gaps simply vanished and the line rendered "EXPLORENEW". As a
           text node between the spans it survives, and it keeps the heading's
           accessible name reading as a sentence rather than one long word. */
        <Fragment key={`${w}-${i}`}>
          <span
            style={wordStyle(wordLit(p, i, words.length))}
            className={i >= accentFrom && accentFrom >= 0 ? "text-stroke" : undefined}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}

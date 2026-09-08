"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { WordReveal, clamp, wordLit, wordStyle } from "@/components/hub/WordReveal";
import { ascent, ASCENT_HANDOVER } from "@/content/ai-hub";

/** The opening line. One element, inside the parallax stack, behind the man.
 *
 *  IT LIVES IN THE STACK, AND THAT IS THE WHOLE POINT. Two earlier versions did
 *  not and both were wrong in the same way. Fixed to the window it could travel
 *  anywhere, but it was painted after the photograph and so stood in front of
 *  the figure, which is not depth, it is a caption. Split into a hero line and
 *  a matching one in the system chapter, nothing travelled at all: a second
 *  line simply appeared in the middle of the frame. As a layer between the
 *  mountain and the foreground it is occluded by the near ground and the man
 *  exactly as the rest of the picture is, because the foreground layer is
 *  drawn after it, and it is one element for the whole of its journey.
 *
 *  THE RATE IS DERIVED, NOT PICKED. ParallaxLayers scrubs `yPercent` linearly
 *  from a trigger that starts with the stage's top at the window's top and ends
 *  with its bottom there, so over a viewport-high stage the progress is exactly
 *  scrollY / vh, and a layer at rate T has moved down T per cent of a viewport
 *  by the end. With the line starting at REST_Y of the frame, its position on
 *  screen is
 *
 *      y = REST_Y - p + p * T/100        (in viewports)
 *
 *  Two things are wanted from T and there is exactly one that gives both. The
 *  line must leave through the top of the frame just as the second section
 *  takes over, y(1) = 0, which needs T = 100 * (1 - REST_Y). And it must never
 *  be cut off, which means staying inside the stage the whole way: its distance
 *  down the stage is REST_Y + T/100, and that must not pass 1. The first makes
 *  the second an equality, so the line finishes flush with the bottom edge of
 *  the stage at the same moment it reaches the top of the window. At
 *  REST_Y 0.46 that is T = 54.
 *
 *  WHAT THIS COSTS, and it is worth saying plainly rather than letting it be
 *  discovered: a line inside the stage cannot also fall to the middle of the
 *  second section and wait there. The stage is one viewport tall and clips, so
 *  anything that travels far enough to sit in the next section's centre has
 *  left the box that the man is drawn in, and nothing can occlude it any more.
 *  Being behind the figure and settling in the next section are the same
 *  choice made two ways. This build takes the first.
 *
 *  THE WORD STILL TURNS OVER, on the way up rather than at rest: Us rolls out
 *  and AI rises into its place while the line is still well inside the frame,
 *  so the change is read before the line goes. */

/** Where the line sits in the frame before any scrolling, 0 to 1. */
export const REST_Y = 0.46;
/** The rate that follows from it. Both are exported so Ascent cannot drift. */
export const LINE_RATE = Math.round(100 * (1 - REST_Y));

/** When the last word turns over, in viewports of scroll.
 *
 *  IT HAS TO BE OVER BEFORE THE RIDGE TAKES THE LINE. This is the cost of
 *  sitting behind the foreground: the near ground climbs the window as the
 *  block leaves, and from about 0.45 it is across the lower of the two lines,
 *  which is where the last word is. Turning the word at 0.3 to 0.55, as the
 *  first attempt did, played the whole change underneath the ground where
 *  nothing could be read. Measured on screen the line is clear of the ridge
 *  through 0.36, so the turn runs from 0.14 and is finished by then. */
const SWAP_FROM = 0.14;
const SWAP_OVER = 0.22;

const smooth = (x: number) => x * x * (3 - 2 * x);

const opener = ascent[0];

/* One source for both halves. The line and its handover are single strings in
   the content file, because that is where a reader of the copy will look; the
   split is derived here rather than stored, so the two can never disagree. */
const cut = opener.title.trimEnd().lastIndexOf(" ");
const HEAD = opener.title.slice(0, cut);
const FROM = opener.title.slice(cut + 1);
const TO = ASCENT_HANDOVER.slice(ASCENT_HANDOVER.trimEnd().lastIndexOf(" ") + 1);
/** The head's words, plus the one that swaps. */
const WORDS = HEAD.split(" ").filter(Boolean).length + 1;

export function OpeningLine() {
  const reduced = usePrefersReducedMotion();
  const [k, setK] = useState(0);
  /** The on-mount reveal, 0 to 1, which runs once and is then done with. */
  const [intro, setIntro] = useState(0);

  useEffect(() => {
    /* Not `setIntro(1)` in this branch: writing state straight out of an effect
       is a render loop waiting to happen and the linter is right to refuse it.
       Reduced motion needs no tween at all, so the value is derived below. */
    if (reduced) return;
    let raf = 0;
    let start = 0;
    let cancelled = false;
    const step = (t: number) => {
      if (!start) start = t;
      const x = clamp((t - start - 180) / 1500);
      setIntro(1 - Math.pow(1 - x, 3));
      if (x < 1) raf = requestAnimationFrame(step);
    };
    const go = () => {
      if (!cancelled) raf = requestAnimationFrame(step);
    };
    // Space Grotesk lands after first paint; lighting the line word by word in
    // the fallback face and then reflowing into the real one is worse than
    // starting a moment later.
    if (document.fonts?.ready) document.fonts.ready.then(go, go);
    else go();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  /* THE ONLY THING SCROLL IS READ FOR IS THE WORD. Where the line is on screen
     is GSAP's business, on the same timeline and the same ticker as the rest of
     the picture, so there is nothing here that can drift against the mountain.
     This listener decides one thing: whether the sentence says Us or AI. */
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => setK(window.scrollY / Math.max(1, window.innerHeight));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const introP = reduced ? 1 : intro;
  const swap = reduced ? 0 : smooth(clamp((k - SWAP_FROM) / SWAP_OVER));

  return (
    <div className="absolute inset-x-0 px-6 text-center" style={{ top: `${REST_Y * 100}%`, transform: "translateY(-50%)" }}>
      {/* The label goes as the line starts to climb: it belongs to the
          photograph, not to the sentence. It travels with the line rather than
          sitting in its own layer because laid out separately the two collided,
          and the label printed through the middle of the heading. */}
      <Eyebrow opacity={reduced ? 1 : 1 - clamp(k / 0.35)} />
      <Line p={introP} swap={swap} />
    </div>
  );
}

/** The small label over the opener.
 *
 *  IT NEVER LEAVES THE LAYOUT, only the picture. Unmounting it once it had
 *  faded made the block one line shorter, and the block is centred on its own
 *  height, so the heading jumped down the moment the label went: measured, from
 *  0.183 of the frame to 0.207 between one scroll position and the next, which
 *  is a visible kick in the middle of a smooth climb. Fading in place costs one
 *  empty line of height and the climb stays even. */
function Eyebrow({ opacity }: { opacity: number }) {
  if (!opener.eyebrow) return null;
  return (
    <p
      aria-hidden={opacity <= 0.01}
      className="font-grotesk mb-6 text-[0.8rem] font-bold uppercase tracking-[0.34em] text-white/70"
      style={{ opacity }}
    >
      {opener.eyebrow}
    </p>
  );
}

/** The line itself. The head never changes; the tail turns over in place.
 *
 *  BOTH WORDS ARE LAID OVER EACH OTHER rather than one replacing the other, so
 *  the line's width does not jump mid-turn: the outgoing word keeps its space
 *  in the flow while the incoming one is absolutely positioned on top of it.
 *  "Us" and "AI" are close enough in width that a reflow would be small, but it
 *  would land exactly at the moment the reader is looking straight at it. */
function Line({ p, swap }: { p: number; swap: number }) {
  const lit = wordLit(p, WORDS - 1, WORDS);
  const base = wordStyle(lit);
  const out = clamp(swap / 0.5);
  const inc = clamp((swap - 0.5) / 0.5);
  /* Which word the line actually says right now. The turn crosses over at its
     midpoint, and the other word is hidden from the accessibility tree
     throughout, so the heading never announces "With Us AI". */
  const settled = swap <= 0 ? "from" : swap >= 1 ? "to" : "crossing";
  const saysTo = swap >= 0.5;

  return (
    <h1 className="font-grotesk hub-display mx-auto max-w-[15ch] font-bold uppercase text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]">
      {/* The space is its own node. WordReveal splits on it and writes one back
          between words, which leaves nothing after the last one, and without
          this the heading read "With Us" as "WithUs". */}
      <WordReveal text={HEAD} p={p} />{" "}
      {settled === "from" && <span style={base}>{FROM}</span>}
      {settled === "to" && <span style={base}>{TO}</span>}
      {settled === "crossing" && (
        <span className="relative inline-block" style={base}>
          {/* The outgoing word, leaving upward and out of focus. It keeps its
              place in the flow the whole way, so the line never changes width
              at the exact moment the reader is looking at it. */}
          <span
            aria-hidden={saysTo}
            style={{
              display: "inline-block",
              opacity: 1 - out,
              transform: `translateY(${out * -42}%)`,
              filter: out > 0.001 ? `blur(${out * 6}px)` : undefined,
            }}
          >
            {FROM}
          </span>
          {/* The incoming one, rising into the space it leaves. */}
          <span
            aria-hidden={!saysTo}
            className="absolute inset-0"
            style={{
              opacity: inc,
              transform: `translateY(${(1 - inc) * 42}%)`,
              filter: inc < 0.999 ? `blur(${(1 - inc) * 6}px)` : undefined,
            }}
          >
            {TO}
          </span>
        </span>
      )}
    </h1>
  );
}

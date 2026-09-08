"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { WordReveal, clamp, wordLit, wordStyle } from "@/components/hub/WordReveal";
import { ascent, ASCENT_HANDOVER } from "@/content/ai-hub";

/** The opening line, which is one element for the whole of its journey.
 *
 *  IT IS NOT TWO TITLES. The first attempt at this put the line in the hero and
 *  a second, identical-looking line in the middle of the system chapter, and
 *  cross-faded them. That is not what the page is meant to do: the reader is
 *  supposed to watch one sentence leave the mountain, come to rest in space,
 *  and change its last word. Two elements swapping cannot read as that, however
 *  well they are matched, because nothing travels.
 *
 *  AND IT IS NOT A PARALLAX LAYER EITHER, which is the other thing that was
 *  tried. Put in the stack at the sun's own rate it did hold station with the
 *  star, but the layers are drawn in order and the foreground is drawn after
 *  it, so the near ground rose straight through the words and cut the second
 *  line in half. A parallax layer also cannot outlive its own block, and this
 *  line has to cross into the next section, which is the whole point of it.
 *
 *  SO IT IS FIXED, AND SCROLL PLACES IT. `position: fixed` takes it out of both
 *  the parallax stage and the journey's sticky stage, so nothing can clip it
 *  and nothing has to hand it over. One passive scroll listener, the same kind
 *  the machine itself uses, turns scroll into `k`, measured in viewports. That
 *  is a third listener on the page and it is deliberately the cheap kind: what
 *  broke the parallax before was a second Lenis and a second ScrollTrigger, not
 *  a passive read of scrollY.
 *
 *  THE MOVE, in viewports of scroll:
 *
 *    0 to FALL_TO     it falls. The line sits above centre over the mountain
 *                     and descends to the middle of the frame as the
 *                     photograph climbs away behind it, so it is left standing
 *                     in the space the journey has opened underneath.
 *    SWAP_AT          it has been still for a moment, and the last word turns
 *                     over: Us rolls up and out, AI rises into its place.
 *    FADE_FROM/TO     it goes, well before the first category is legible.
 *
 *  It has to be gone before 01. That beat sits at 0.2 of a ten-viewport
 *  chapter and lights from 0.14, which is 1.4 viewports past the track's top
 *  and so 2.4 viewports of scroll. Out by 2.05 leaves a clear gap. */

/** Where the line rests over the photograph, as a fraction of the viewport. */
const HERO_Y = 0.4;
/** Where it comes to rest in space. */
const SPACE_Y = 0.5;

const FALL_TO = 1.06;
const SWAP_AT = 1.34;
const FADE_FROM = 1.72;
const FADE_TO = 2.05;

/** ease-in-out, so it leaves the mountain and arrives in space unhurried and
 *  is at its quickest in the black between the two. */
const smooth = (x: number) => x * x * (3 - 2 * x);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

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

export function TravellingTitle() {
  const reduced = usePrefersReducedMotion();
  const [k, setK] = useState(0);
  /** The on-mount reveal, 0 to 1, which runs once and is then done with. */
  const [intro, setIntro] = useState(0);

  useEffect(() => {
    /* Not `setIntro(1)` in this branch: writing state straight out of an effect
       is a render loop waiting to happen and the linter is right to refuse it.
       Reduced motion needs no tween at all, so the value is simply derived
       below instead of stored. */
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

  /* REDUCED MOTION GETS THE LINE, NOT THE JOURNEY. Absolute inside the opener
     rather than fixed, so it scrolls away with the photograph like ordinary
     copy, at rest, on its first words, with nothing turning over. */
  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-screen flex-col items-center justify-center px-6 text-center">
        <Eyebrow opacity={1} />
        <Line p={1} swap={0} />
      </div>
    );
  }

  const introP = reduced ? 1 : intro;
  const fallen = smooth(clamp(k / FALL_TO));
  const y = mix(HERO_Y, SPACE_Y, fallen);
  const opacity = 1 - smooth(clamp((k - FADE_FROM) / (FADE_TO - FADE_FROM)));
  /* 0 while it still says Us, 1 once it says AI, with the turn itself in
     between. Short, because a slow letter swap reads as a glitch. */
  const swap = smooth(clamp((k - SWAP_AT) / 0.26));

  if (opacity <= 0.001) return null;

  return (
    <div
      aria-hidden={k > FADE_FROM}
      className="pointer-events-none fixed inset-x-0 z-30 flex flex-col items-center justify-center px-6 text-center"
      style={{ top: `${y * 100}%`, transform: "translateY(-50%)", opacity }}
    >
      {/* THE LABEL BELONGS TO THE PHOTOGRAPH, so it goes out as the line leaves
          it. It travelled with the line rather than staying in the parallax
          stack because the two were laid out independently and collided the
          moment the line moved off centre: the label showed straight through
          the middle of the heading. One block, one layout, no collision. */}
      <Eyebrow opacity={1 - fallen} />
      <Line p={introP} swap={swap} />
    </div>
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

/** The small label over the opener. */
function Eyebrow({ opacity }: { opacity: number }) {
  if (!opener.eyebrow || opacity <= 0.01) return null;
  return (
    <p
      className="font-grotesk mb-6 text-[0.8rem] font-bold uppercase tracking-[0.34em] text-white/70"
      style={{ opacity }}
    >
      {opener.eyebrow}
    </p>
  );
}

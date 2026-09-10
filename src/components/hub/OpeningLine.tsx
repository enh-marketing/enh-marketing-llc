"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { WordReveal, clamp, wordLit, wordStyle } from "@/components/hub/WordReveal";
import { ascent, ASCENT_HANDOVER, ASCENT_STANDFIRST } from "@/content/ai-hub";

/** The opening line. One element, from the mountain to the top of the system.
 *
 *  IT IS OUT OF THE PARALLAX STACK AGAIN, AND THE FOREGROUND CAME WITH IT.
 *  Inside the stack the man occluded the words properly, which was the point,
 *  but the stack is one viewport tall and clips: the line could never reach the
 *  second section, and by the time that section was on screen the only part of
 *  the opener left in the window was the near ground, so the line was hidden
 *  rather than travelling. The two halves of what this has to do were the same
 *  choice made in opposite directions.
 *
 *  So the line is fixed to the window, which lets it go wherever the story
 *  needs, and hub/ForegroundEcho draws a second copy of the opener's near
 *  ground over the top of it. Depth is restored by putting the photograph back
 *  in front rather than by putting the words behind it, and the copy is
 *  measured off the real layer on GSAP's ticker rather than recomputed, so the
 *  two cannot fall a frame apart. The cost is one extra full-screen paint while
 *  the opener is on screen, and only while it is on screen.
 *
 *  IT STAYS IN THE PHOTOGRAPH, AND IT USED TO OUTLIVE IT BY A VIEWPORT.
 *  It ran for 2.15 viewports of scroll against an opener that is one, so for
 *  the last 1.15 it was a fixed headline sitting over the orbital system:
 *  "lets not take that Explore new height with us to second section, its not
 *  looking great, let that scroll parallax and hides in her bottom".
 *
 *  THE MOVE, in viewports of scroll, all of it inside the opener:
 *
 *    throughout      it climbs at LAG of the page's own rate, which is the
 *                    parallax: against the photograph, which is going faster,
 *                    the words sink towards the near ground rather than
 *                    floating over it.
 *    TURN_FROM       the last word turns over: Us rolls up and out, AI rises
 *                    into its place. Early enough to be read before the ridge
 *                    reaches it.
 *    GO_FROM/TO      it fades where it stands. What takes it is the foreground
 *                    rising across it, which is the opener's own near ground
 *                    drawn back over this layer by hub/ForegroundEcho, so the
 *                    line is put away by the mountain rather than by an
 *                    animation. Gone by 0.96, which is inside the opener.
 *
 *  IT NO LONGER CLIMBS OUT OF THE TOP. That exit existed to hand the frame to
 *  the orbital scene's light, and the light arrives on its own; what the exit
 *  actually did was carry the sentence into a chapter it had no business in.
 *
 *  AND IT IS ON GSAP'S TICKER NOW, WHICH IS WHY IT STOPPED JUDDERING. Every
 *  other layer in this hero is: ParallaxLayers scrubs the photograph on it,
 *  ForegroundEcho copies the near ground on it, SunBridge moves the glow on it,
 *  and Ascent's own note says that is what keeps the opener smooth. This was
 *  the exception. It read the scroll in a `scroll` listener, put the number in
 *  React state, and re-rendered the heading, the eyebrow, the standfirst and
 *  every word of WordReveal on every event, then wrote the result to `top`,
 *  which is a layout property and cannot be composited.
 *
 *  So it landed on React's schedule while the photograph landed on the
 *  ticker's, and the two were never a frame apart in the same direction twice.
 *  It did not show while the line was nearly still. It showed the moment the
 *  line was given a parallax rate of its own, which is when it was reported.
 *
 *  Nothing here re-renders on scroll any more. React draws the structure once
 *  and the ticker writes transforms and opacities onto refs. */

/** Where the line rests before any scrolling, as a fraction of the window. */
const REST_Y = 0.46;
/** HOW MUCH SLOWER THAN THE PAGE IT TRAVELS, which is the whole of the
 *  parallax. At 1 it would be ordinary copy scrolling away; at 0 it would be
 *  pinned, which is what it was, and pinned is how it ended up stranded in the
 *  black under the photograph while the picture climbed out from behind it.
 *  0.55 keeps it inside the frame the whole way and lets the near ground rise
 *  across it, so what puts the words away is the mountain. */
const LAG = 0.55;

const TURN_FROM = 0.18;
const TURN_OVER = 0.18;
/** Where it gives up the frame, both inside the opener's one viewport. */
const GO_FROM = 0.40;
const GO_TO = 0.72;

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
  /** The on-mount reveal, 0 to 1, which runs once and is then done with. */
  const [intro, setIntro] = useState(0);

  /* Everything the scroll moves is written onto these, on the ticker. */
  const block = useRef<HTMLDivElement>(null);
  const brow = useRef<HTMLParagraphElement>(null);
  const stand = useRef<HTMLParagraphElement>(null);
  const from = useRef<HTMLSpanElement>(null);
  const to = useRef<HTMLSpanElement>(null);

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

  /* NOT window.scrollY, AND THAT IS NOT A STYLE CHOICE. The airlock at the foot
     of the page takes the wheel by pinning the body to position:fixed with a
     negative top, and while it holds the page window.scrollY reads 0. Measured
     against scrollY this line therefore believed the reader was back at the
     very top the moment the door engaged, and drew itself in full over the
     airlock: "Explore New Heights With Us" printed across the hatch.

     The opener's own box does not lie. Pinning the body shifts every child by
     the same amount, so the opener's top stays at minus the real distance
     travelled whether the page is pinned or not, and this reads the same number
     in both states. */
  useEffect(() => {
    if (reduced) return;
    const opener = document.querySelector<HTMLElement>('[data-section="AI Hub opener"]');

    /** Written only when it changes, so a still line costs one comparison. */
    let last = "";

    const tick = () => {
      const el = block.current;
      if (!el) return;
      const travelled = opener ? -opener.getBoundingClientRect().top : window.scrollY;
      const h = Math.max(1, window.innerHeight);
      const k = travelled / h;

      /* Past its end there is nothing to draw. `display` rather than unmounting,
         because unmounting is a React render and this loop is not allowed one. */
      if (k > GO_TO || k < -0.5) {
        if (last !== "gone") { el.style.display = "none"; if (stand.current) stand.current.style.display = "none"; last = "gone"; }
        return;
      }
      if (last === "gone") { el.style.display = ""; if (stand.current) stand.current.style.display = ""; last = ""; }

      /* IN PIXELS AND ON THE TRANSFORM, not a percentage on `top`. `top` is
         layout: every frame of it re-ran the box and could not be composited,
         which is half of why this stuttered against a photograph being moved by
         a transform on the same tick. */
      const dy = -LAG * k * h;
      const held = 1 - smooth(clamp((k - GO_FROM) / (GO_TO - GO_FROM)));
      el.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0) translateY(-50%)`;
      el.style.opacity = held.toFixed(3);
      el.setAttribute("aria-hidden", k > GO_FROM ? "true" : "false");

      /* The label and the standfirst belong to the photograph, so they go on
         its own short ramp rather than travelling with the sentence. */
      const early = (1 - clamp(k / 0.35)).toFixed(3);
      if (brow.current) brow.current.style.opacity = early;
      if (stand.current) {
        stand.current.style.opacity = early;
        stand.current.setAttribute("aria-hidden", +early <= 0.01 ? "true" : "false");
      }

      /* The last word turning over. Both words are always in the DOM, laid in a
         spacer, so this is four style writes rather than a re-render. */
      const swap = smooth(clamp((k - TURN_FROM) / TURN_OVER));
      const out = clamp(swap / 0.5);
      const inc = clamp((swap - 0.5) / 0.5);
      if (from.current) {
        from.current.style.opacity = (1 - out).toFixed(3);
        from.current.style.transform = `translateY(${(out * -42).toFixed(2)}%)`;
        from.current.style.filter = out > 0.001 ? `blur(${(out * 6).toFixed(2)}px)` : "";
        from.current.setAttribute("aria-hidden", swap >= 0.5 ? "true" : "false");
      }
      if (to.current) {
        to.current.style.opacity = inc.toFixed(3);
        to.current.style.transform = `translateY(${((1 - inc) * 42).toFixed(2)}%)`;
        to.current.style.filter = inc < 0.999 ? `blur(${((1 - inc) * 6).toFixed(2)}px)` : "";
        to.current.setAttribute("aria-hidden", swap >= 0.5 ? "false" : "true");
      }
    };

    tick();
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [reduced]);

  /* REDUCED MOTION GETS THE LINE, NOT THE JOURNEY. Absolute inside the opener
     rather than fixed, so it scrolls away with the photograph like ordinary
     copy, at rest, on its first words, with nothing turning over. */
  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-screen flex-col items-center justify-center px-6 text-center">
        <Eyebrow />
        <Line p={1} />
        <Standfirst />
      </div>
    );
  }

  /* NOTHING SCROLL-DERIVED IS COMPUTED HERE ANY MORE. This renders once, at
     rest, and the ticker above moves it. `top` is the resting place and does
     not change; the travel is a transform on top of it. */
  return (
    <>
      <div
        ref={block}
        className="pointer-events-none fixed inset-x-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        style={{
          top: `${REST_Y * 100}%`,
          transform: "translate3d(0, 0, 0) translateY(-50%)",
          willChange: "transform, opacity",
        }}
      >
        {/* The label goes as the line starts to travel: it belongs to the
            photograph, not to the sentence. It travels with the line rather than
            sitting in its own layer because laid out separately the two
            collided, and the label printed through the middle of the heading. */}
        <Eyebrow innerRef={brow} />
        <Line p={intro} fromRef={from} toRef={to} />
      </div>

      {/* THE STANDFIRST IS ITS OWN LAYER, and that is not tidiness. The block
          above is positioned by its centre, `translateY(-50%)` on a `top` that
          moves, and this file already records what happened the last time its
          height changed: the heading kicked 0.024 of the frame between one
          scroll position and the next. A paragraph inside it would have shifted
          the line permanently upward for the same reason. Outside it, the two
          cannot move each other.

          IT BELONGS TO THE PHOTOGRAPH, NOT THE SENTENCE, so it goes out on the
          eyebrow's ramp rather than travelling with the line. The line rides the
          Sun into the next scene and turns its last word over on the way, which
          is a sentence completing itself; a paragraph dragged along behind that
          would be reading matter in motion, which nobody reads.

          Below the line at every point of the climb: the line rests centred at
          0.46 of the window and settles to 0.50, and this sits at 0.66. */}
      <Standfirst innerRef={stand} />
    </>
  );
}

/** The sentence that says what the page is.
 *
 *  See ASCENT_STANDFIRST in content/ai-hub for what it says and why it is the
 *  one piece of written copy on a page of quoted copy. */
function Standfirst({ innerRef }: { innerRef?: React.RefObject<HTMLParagraphElement | null> }) {
  return (
    <p
      ref={innerRef}
      /* ABOVE THE FOREGROUND, WHICH THE HEADING IS NOT. The echo paints the
         photograph's near ground back over this layer at z-40 so the line
         passes behind the figure, which is the whole effect and was asked for.
         A paragraph cut in half by a man's shoulder is not an effect, it is
         four words the reader cannot have: measured at 410x900 the figure sat
         across the middle of all three lines. So this sits over him, at z-50,
         under the navbar at z-70. Depth is worth having on a sentence you read
         in one glance and not on one you read in three. */
      className="font-grotesk pointer-events-none fixed inset-x-0 z-50 mx-auto max-w-[42ch] px-6 text-center text-[0.95rem] leading-[1.6] text-white/80 [text-shadow:0_2px_28px_rgba(0,0,0,0.85)]"
      style={{ top: "66%", transform: "translateY(-50%)", willChange: "opacity" }}
    >
      {ASCENT_STANDFIRST}
    </p>
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
function Eyebrow({ innerRef }: { innerRef?: React.RefObject<HTMLParagraphElement | null> }) {
  if (!opener.eyebrow) return null;
  return (
    <p
      ref={innerRef}
      className="font-grotesk mb-6 text-[0.8rem] font-bold uppercase tracking-[0.34em] text-white/70"
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
function Line({
  p,
  fromRef,
  toRef,
}: {
  p: number;
  fromRef?: React.RefObject<HTMLSpanElement | null>;
  toRef?: React.RefObject<HTMLSpanElement | null>;
}) {
  const lit = wordLit(p, WORDS - 1, WORDS);
  const base = wordStyle(lit);

  return (
    <h1 className="font-grotesk hub-display mx-auto max-w-[15ch] font-bold uppercase text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.55)]">
      {/* The space is its own node. WordReveal splits on it and writes one back
          between words, which leaves nothing after the last one, and without
          this the heading read "With Us" as "WithUs". */}
      <WordReveal text={HEAD} p={p} />{" "}
      {/* BOTH WORDS ARE ALWAYS HERE NOW, and the turn is four style writes on
          the ticker rather than three different trees React swaps between. The
          branches existed to keep the accessibility tree clean, which the
          `aria-hidden` the loop writes does just as well, and swapping the tree
          mid-turn meant a React render on a scroll event, which is the thing
          this file no longer does.

          A SPACER SETS THE WIDTH AND NEITHER WORD DOES. Holding the outgoing
          word in the flow and laying the incoming one over it kept the line
          from reflowing, but it also made the box exactly as wide as whichever
          word was leaving, and the other then sat centred inside it with a gap
          beside it: mid-turn the line read "WITH  AI" with a double space. An
          invisible copy of the longer of the two holds the box instead. */}
      <span className="relative inline-block" style={base}>
        <span aria-hidden className="invisible">
          {FROM.length >= TO.length ? FROM : TO}
        </span>
        {/* The outgoing word, leaving upward and out of focus. */}
        <span
          ref={fromRef}
          aria-hidden={false}
          className="absolute inset-0"
          style={{ opacity: 1, transform: "translateY(0%)", willChange: "opacity, transform, filter" }}
        >
          {FROM}
        </span>
        {/* The incoming one, rising into the space it leaves. */}
        <span
          ref={toRef}
          aria-hidden
          className="absolute inset-0"
          style={{
            opacity: 0,
            transform: "translateY(42%)",
            filter: "blur(6px)",
            willChange: "opacity, transform, filter",
          }}
        >
          {TO}
        </span>
      </span>
    </h1>
  );
}

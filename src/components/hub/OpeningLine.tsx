"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { WordReveal, clamp, wordLit, wordStyle } from "@/components/hub/WordReveal";
import { ascent, ASCENT_HANDOVER, ASCENT_STANDFIRST } from "@/content/ai-hub";

/** The opening line, drawn inside the photograph's own parallax stack.
 *
 *  IT IS A LAYER NOW, AND FOR TWO YEARS OF THIS FILE'S NOTES IT WAS NOT. It sat
 *  outside the stack, fixed to the window, because it had to do two things that
 *  pulled against each other: pass behind the man, which means being inside the
 *  stack under the foreground; and outlive the opener, which the stack cannot
 *  do because it is one viewport tall and clips. A second copy of the
 *  foreground was drawn over the top of it to buy the first without giving up
 *  the second, in hub/ForegroundEcho.
 *
 *  THE SECOND REQUIREMENT IS GONE, so the whole apparatus is. The line was
 *  asked to stay inside the hero and it now finishes at 0.72 of a viewport,
 *  well short of the seam, so there is nothing left for it to outlive. Back in
 *  the stack it is genuinely behind the man rather than under a copy of him.
 *
 *  WHICH IS ALSO THE FIX FOR THE DOUBLING. Two copies of one photograph can
 *  only agree if something keeps them in step, and they were kept in step by
 *  JavaScript: the real layer is moved by the browser's own scrolling, the copy
 *  was moved by a transform written on the ticker. Measured at rest they were
 *  identical to the pixel, which is why it only ever showed while moving. There
 *  is one man again and no arithmetic between him and himself.
 *
 *  THE PARALLAX IS THE STACK'S NOW, NOT THIS FILE'S. See LINE_RATE in
 *  hub/Ascent: the layer is scrubbed to yPercent 45 over the block, so the line
 *  lags the page by 55 per cent on the same ScrollTrigger timeline that moves
 *  the mountain. Nothing here computes a position at all.
 *
 *  THE MOVE, in viewports of scroll, all of it inside the opener:
 *
 *    every 4s        the last word turns over, both ways, for as long as the
 *                    line is on screen. It is on a clock rather than on the
 *                    scroll; see SWAP_EVERY.
 *    GO_FROM/TO      it fades where it stands. What takes it is the foreground
 *                    rising across it, which is now the real foreground.
 *
 *  What is left on the ticker is opacity and the word turn, and neither of
 *  those can double an edge if it lands a frame late. Nothing re-renders on
 *  scroll: React draws the structure once and the ticker writes onto refs. */

/** Where the line rests in the stage, as a fraction of it. */
const REST_Y = 0.46;

/** HOW OFTEN THE LAST WORD TURNS OVER, AND HOW LONG THE TURN TAKES.
 *
 *  IT IS ON A CLOCK NOW AND IT WAS ON THE SCROLL. The turn used to happen once,
 *  at a fixed point of the descent, so a reader who did not scroll never saw
 *  it: the page's own premise, that this is the site's line with AI in place of
 *  us, was hidden behind an interaction. Asked for on a four second interval,
 *  so it says both and keeps saying them.
 *
 *  600ms IS THE TURN ITSELF, inside the four. Long enough to read as a roll
 *  rather than a cut, short enough that the word is settled for the three and a
 *  bit seconds either side, which is what a reader is actually looking at. */
const SWAP_EVERY = 4000;
const SWAP_TURN = 600;
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
const HEAD_WORDS = HEAD.split(" ").filter(Boolean);
const WORDS = HEAD_WORDS.length + 1;

/** THE LINE IN THREE GROUPS, WHICH IS HOW IT IS SET AND HOW IT BREAKS.
 *
 *  Asked for: EXPLORE heavy, NEW HEIGHTS lighter, WITH US heavy again, and on
 *  a phone one group to a line. Both come out of the same split, so the weight
 *  change and the line break are the same event and can never disagree.
 *
 *  Still derived rather than written down. The title is one string in the
 *  content file, and the first word, the middle, and the word the turn hangs
 *  off are read out of it here. */
const OPEN = HEAD_WORDS[0];
const MIDDLE = HEAD_WORDS.slice(1, -1).join(" ");
const JOIN = HEAD_WORDS[HEAD_WORDS.length - 1];

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

    /* Offset so the first slot opens already settled: the page does not turn
       its own headline over the moment it is looked at. */
    const t0 = performance.now() - SWAP_TURN;

    const tick = (now: number) => {
      const el = block.current;
      if (!el) return;
      const travelled = opener ? -opener.getBoundingClientRect().top : window.scrollY;
      const k = travelled / Math.max(1, window.innerHeight);

      /* Past its end there is nothing to draw. `display` rather than unmounting,
         because unmounting is a React render and this loop is not allowed one. */
      if (k > GO_TO || k < -0.5) {
        if (last !== "gone") { el.style.display = "none"; if (stand.current) stand.current.style.display = "none"; last = "gone"; }
        return;
      }
      if (last === "gone") { el.style.display = ""; if (stand.current) stand.current.style.display = ""; last = ""; }

      /* NO POSITION IS WRITTEN HERE. The layer this sits in is scrubbed by the
         stack's own ScrollTrigger, which is what moves the mountain, so the
         travel cannot land on a different frame from the picture. */
      const held = 1 - smooth(clamp((k - GO_FROM) / (GO_TO - GO_FROM)));
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

      /* THE LAST WORD, TURNING OVER ON ITS OWN CLOCK. Both words are always in
         the DOM, laid in a spacer, so this is six style writes rather than a
         re-render or a tree React swaps between.

         IT ALWAYS ROLLS THE SAME WAY, which is why the two spans trade roles
         rather than one animation being played backwards. Reversed, the word
         that just left would come back down out of the place it went, which
         reads as a mistake being undone. Rolling up every time reads as a
         counter turning over. */
      const seg = (now - t0) % SWAP_EVERY;
      const onAI = Math.floor(((now - t0) % (SWAP_EVERY * 2)) / SWAP_EVERY) === 1;
      const p = smooth(clamp(seg / SWAP_TURN));
      const enter = onAI ? to.current : from.current;
      const leave = onAI ? from.current : to.current;
      if (enter) {
        enter.style.opacity = p.toFixed(3);
        enter.style.transform = `translateY(${((1 - p) * 42).toFixed(2)}%)`;
        enter.style.filter = p < 0.999 ? `blur(${((1 - p) * 6).toFixed(2)}px)` : "";
      }
      if (leave) {
        leave.style.opacity = (1 - p).toFixed(3);
        leave.style.transform = `translateY(${(p * -42).toFixed(2)}%)`;
        leave.style.filter = p > 0.001 ? `blur(${(p * 6).toFixed(2)}px)` : "";
      }
    };

    /* A PLAIN rAF, NOT gsap.ticker, AND THE DIFFERENCE IS NOT STYLE.
       GSAP's ticker is the right clock for anything that has to land on the
       same frame as a GSAP write, which is why the parallax layers use it. It
       is the wrong clock for anything that has to run every frame full stop:
       it is Lenis's driver as well as GSAP's, and how often it fires depends on
       what GSAP has to do. Instrumented here, these writes ran at a few frames
       a second while the page scrolled smoothly underneath them, so the fade
       and the word turn simply stopped part way and stayed there.

       Nothing here needs frame-exact agreement with the photograph any more:
       the travel is the layer's, written by the stack's own ScrollTrigger. What
       is left is opacity and a word, and a plain rAF always runs. */
    let raf = 0;
    const loop = (now: number) => {
      tick(now);
      raf = requestAnimationFrame(loop);
    };
    loop(performance.now());
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* REDUCED MOTION GETS THE LINE, NOT THE JOURNEY. Absolute inside the opener
     rather than fixed, so it scrolls away with the photograph like ordinary
     copy, at rest, on its first words, with nothing turning over. */
  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-screen flex-col items-center justify-center px-6 text-center">
        <Eyebrow />
        <Line p={1} />
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
        className="pointer-events-none absolute inset-x-0 flex flex-col items-center justify-center px-6 text-center"
        style={{
          top: `${REST_Y * 100}%`,
          transform: "translateY(-50%)",
          willChange: "opacity",
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
    </>
  );
}

/** The paragraph, which is a layer of its own and sits ABOVE the foreground.
 *
 *  IT CANNOT SHARE THE LINE'S LAYER, and that is the only reason it is a
 *  separate export. The heading wants to be behind the man, which is the whole
 *  effect; a paragraph cut in half by a shoulder is not an effect, it is four
 *  words the reader cannot have. So the heading goes under the foreground layer
 *  and this goes over it, on the same rate, and they travel together.
 *
 *  It belongs to the photograph rather than to the sentence, so it goes out on
 *  its own short ramp rather than lasting as long as the line. */
export function OpeningStandfirst() {
  const reduced = usePrefersReducedMotion();
  const stand = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced) return;
    const opener = document.querySelector<HTMLElement>('[data-section="AI Hub opener"]');
    const tick = () => {
      const el = stand.current;
      if (!el) return;
      const travelled = opener ? -opener.getBoundingClientRect().top : window.scrollY;
      const k = travelled / Math.max(1, window.innerHeight);
      const early = (1 - clamp(k / 0.35)).toFixed(3);
      el.style.opacity = early;
      el.setAttribute("aria-hidden", +early <= 0.01 ? "true" : "false");
    };
    let raf = 0;
    const loop = () => {
      tick();
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return <Standfirst innerRef={stand} />;
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
      className="font-grotesk pointer-events-none absolute inset-x-0 mx-auto max-w-[42ch] px-6 text-center text-[0.95rem] leading-[1.6] text-white/80 [text-shadow:0_2px_28px_rgba(0,0,0,0.85)]"
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
      /* THE SAME WHITE AS THE BODY COPY, asked for. It was 70 against the
         standfirst's 80, which is a third colour on a page that has two, and
         at this size and letterspacing the difference read as the label being
         switched off rather than as a hierarchy. */
      className="font-grotesk mb-6 text-[0.8rem] font-bold uppercase tracking-[0.34em] text-white/80"
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
    /* THE SHADOW IS A DROP SHADOW NOW AND IT WAS A GLOW. One 40px blur at 55
       per cent black is a halo: it darkens the sky around the words without
       ever drawing an edge, and against the bright band of cloud behind the
       ridge the white type still washed out. Three stops instead, tight to
       wide, so the letters have a hard edge to sit on and the wide one only
       does the lifting. */
    <h1 className="font-grotesk hub-display mx-auto max-w-[15ch] uppercase text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5),0_4px_14px_rgba(0,0,0,0.5),0_12px_44px_rgba(0,0,0,0.62)]">
      {/* EACH GROUP IS AN inline-block, SO IT CANNOT BREAK INSIDE ITSELF. A
          break in the middle of NEW HEIGHTS would put half of one weight on the
          end of a line and half on the start of the next, which reads as a
          mistake rather than as a treatment. The <br> forces the three lines on
          a phone; above sm the groups flow and the measure decides.

          The space is its own node. WordReveal splits on it and writes one back
          between words, which leaves nothing after the last one, and without
          this the heading read "With Us" as "WithUs". A space left at the end
          of a line is dropped by the browser before it is centred, so the ones
          in front of the breaks cost nothing. */}
      <span className="inline-block font-extrabold">
        <WordReveal text={OPEN} p={p} from={0} total={WORDS} />
      </span>{" "}
      <br aria-hidden className="sm:hidden" />
      {/* 500, NOT THE 600 ASKED FOR, AND THE DIFFERENCE IS THE FONT. Cabinet
          Grotesk ships 500, 700, 800 and 900 and has no 600 at all: asked for
          600 the browser matches upward to 700, which next to the 800 either
          side is a step too small to see. 500 is the real one below it. */}
      <span className="inline-block font-medium">
        <WordReveal text={MIDDLE} p={p} from={1} total={WORDS} />
      </span>{" "}
      <br aria-hidden className="sm:hidden" />
      <span className="inline-block font-extrabold">
        <span style={wordStyle(wordLit(p, WORDS - 2, WORDS))}>{JOIN}</span>{" "}
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
        {/* BOTH WORDS ARE RED, asked for, and it is the page's own carnelian
            rather than a second one. The rest of the heading stays white: the
            accent is the word that changes, which is the only word on this line
            doing any work. */}
        <span
          className="relative inline-block"
          style={{ ...base, color: "var(--hub-accent)" }}
        >
          {/* THE HEADING'S ACCESSIBLE NAME DOES NOT CYCLE. Both words are hidden
              from the tree and one canonical reading is exposed instead, so a
              screen reader is told "Explore New Heights With AI" once rather than
              being handed a heading that renames itself every four seconds. */}
          <span className="sr-only">{TO}</span>
          <span aria-hidden className="invisible">
            {FROM.length >= TO.length ? FROM : TO}
          </span>
          {/* The outgoing word, leaving upward and out of focus. */}
          <span
            ref={fromRef}
            aria-hidden
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
      </span>
    </h1>
  );
}

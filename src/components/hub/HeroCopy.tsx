"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { WordReveal, clamp, wordLit, wordStyle } from "@/components/hub/WordReveal";
import { ascent, ASCENT_HANDOVER, ASCENT_STANDFIRST } from "@/content/ai-hub";

/** The opening line and the sentence under it, for the airlock's own slots.
 *
 *  THIS IS WHAT SURVIVED hub/OpeningLine WHEN THE MOUNTAIN WENT. That file did
 *  two jobs: it drew the line, and it worked out where the line should be and
 *  how visible, by reading the photograph's block off the scroll every frame.
 *  The second job belonged to the mountain. The airlock already owns it, and
 *  owns it better: the headline is inside its title slot, which it fades and
 *  blurs out over the first third of the scrub, and the sentence is in its
 *  tagline slot, which it brings up over the last fifth. So everything here is
 *  drawing, and nothing measures the page at all.
 *
 *  WHICH ALSO MOVES THE SENTENCE TO THE END. It used to sit under the headline
 *  at the top, read before anything happened. Now it arrives as the hatch does:
 *  the reader is already outside when the page says what it is. Same words,
 *  from content/ai-hub, at the moment they are worth reading.
 *
 *  EVERYTHING RENDERS AS PHRASING CONTENT, spans and nothing else. The slot is
 *  inside the component's own <h1>, and a <p> or a <div> in there is invalid
 *  and will be reparented by the browser out from under the element whose
 *  opacity is being animated. */

/** HOW OFTEN THE LAST WORD TURNS OVER, AND HOW LONG THE TURN TAKES.
 *
 *  Unchanged from the mountain: asked for on a four second interval, so the
 *  page's own premise, that this is the site's line with AI in place of us,
 *  says both and keeps saying them rather than hiding behind an interaction.
 *
 *  600ms IS THE TURN ITSELF, inside the four. Long enough to read as a roll
 *  rather than a cut, short enough that the word is settled for the three and a
 *  bit seconds either side, which is what a reader is actually looking at. */
const SWAP_EVERY = 4000;
const SWAP_TURN = 600;

const smooth = (x: number) => x * x * (3 - 2 * x);

const opener = ascent[0];

/* One source for both halves. The line and its handover are single strings in
   the content file, because that is where a reader of the copy will look; the
   split is derived here rather than stored, so the two can never disagree. */
const cut = opener.title.trimEnd().lastIndexOf(" ");
const HEAD = opener.title.slice(0, cut);
const FROM = opener.title.slice(cut + 1);
const TO = ASCENT_HANDOVER.slice(ASCENT_HANDOVER.trimEnd().lastIndexOf(" ") + 1);
const HEAD_WORDS = HEAD.split(" ").filter(Boolean);
/** The head's words, plus the one that swaps. */
const WORDS = HEAD_WORDS.length + 1;

/** THE LINE IN THREE GROUPS, WHICH IS HOW IT IS SET AND HOW IT BREAKS.
 *
 *  EXPLORE heavy, NEW HEIGHTS lighter, WITH US heavy again, and on a phone one
 *  group to a line. Both come out of the same split, so the weight change and
 *  the line break are the same event and can never disagree. */
const OPEN = HEAD_WORDS[0];
const MIDDLE = HEAD_WORDS.slice(1, -1).join(" ");
const JOIN = HEAD_WORDS[HEAD_WORDS.length - 1];

export function HeroHeadline() {
  const reduced = usePrefersReducedMotion();
  /** The on-mount reveal, 0 to 1, which runs once and is then done with. */
  const [intro, setIntro] = useState(0);
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
    // The display face lands after first paint; lighting the line word by word
    // in the fallback and then reflowing into the real one is worse than
    // starting a moment later.
    if (document.fonts?.ready) document.fonts.ready.then(go, go);
    else go();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  /* THE LAST WORD, TURNING OVER ON ITS OWN CLOCK. Both words are always in the
     DOM, laid in a spacer, so this is six style writes a frame rather than a
     re-render or a tree React swaps between.

     IT ALWAYS ROLLS THE SAME WAY, which is why the two spans trade roles rather
     than one animation being played backwards. Reversed, the word that just
     left would come back down out of the place it went, which reads as a
     mistake being undone. Rolling up every time reads as a counter turning
     over.

     A PLAIN rAF, NOT gsap.ticker. The ticker is Lenis's driver as well as
     GSAP's and fires as often as GSAP has work; instrumented on the mountain,
     these writes ran at a few frames a second and the turn stopped half way
     and stayed there. */
  useEffect(() => {
    if (reduced) return;
    /* Offset so the first slot opens already settled: the page does not turn
       its own headline over the moment it is looked at. */
    const t0 = performance.now() - SWAP_TURN;
    let raf = 0;
    const loop = (now: number) => {
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
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const p = reduced ? 1 : intro;
  const base = wordStyle(wordLit(p, WORDS - 1, WORDS));

  return (
    <span className="relative block">
      {/* A WASH OF ITS OWN, BECAUSE THE FIRST FRAME IS WHITE METAL UNDER WORK
          LIGHTS. The component carries a centre scrim for exactly this reason
          and it is sized for white type over a daylit planet; the hatch is
          brighter than that, and the one word on this line that is not white
          was landing on the red and yellow of the hatch wheel and disappearing
          into it. This sits inside the title slot, so it is faded and blurred
          out by the same paint() that takes the words, and it is gone by the
          time the film is in open space. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[190%] w-[160%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(closest-side, rgba(5,7,13,0.78), rgba(5,7,13,0.55) 48%, rgba(5,7,13,0) 100%)",
        }}
      />

      {/* THE LABEL IS INSIDE THE HEADING AND HIDDEN FROM THE TREE. It has to be
          phrasing content to sit in the slot at all, and a heading whose
          accessible name begins "AI Hub" is a heading that reads its own
          eyebrow aloud. The same white as the body copy, asked for. */}
      {opener.eyebrow ? (
        <span
          aria-hidden
          className="font-grotesk relative mb-6 block text-[0.8rem] font-bold uppercase tracking-[0.34em] text-white/80"
        >
          {opener.eyebrow}
        </span>
      ) : null}

      {/* THE SHADOW IS A DROP SHADOW, NOT A GLOW. One wide blur darkens the sky
          around the words without ever drawing an edge. Three stops, tight to
          wide, so the letters have a hard edge to sit on and only the widest
          one lifts. It matters more here than it did on the mountain: the
          hatch is white metal under work lights. */}
      <span className="font-grotesk hub-display relative mx-auto block max-w-[15ch] normal-case tracking-[-0.03em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5),0_4px_14px_rgba(0,0,0,0.5),0_12px_44px_rgba(0,0,0,0.62)]">
        {/* EACH GROUP IS AN inline-block, SO IT CANNOT BREAK INSIDE ITSELF. A
            break in the middle of NEW HEIGHTS would leave half of one weight at
            the end of a line and half at the start of the next, which reads as
            a mistake rather than as a treatment. The <br> forces the three
            lines on a phone; above sm the groups flow and the measure decides.
            A space left at the end of a line is dropped by the browser before
            the line is centred, so the ones in front of the breaks cost
            nothing. */}
        <span className="inline-block font-extrabold uppercase">
          <WordReveal text={OPEN} p={p} from={0} total={WORDS} />
        </span>{" "}
        <br aria-hidden className="sm:hidden" />
        {/* 500 RATHER THAN 600, AND THE FONT IS THE REASON. Cabinet Grotesk
            ships 500, 700, 800 and 900 and has no 600: asked for 600 the
            browser matches upward to 700, which beside the 800 either side is a
            step too small to see. */}
        <span className="inline-block font-medium uppercase">
          <WordReveal text={MIDDLE} p={p} from={1} total={WORDS} />
        </span>{" "}
        <br aria-hidden className="sm:hidden" />
        <span className="inline-block font-extrabold uppercase">
          <span style={wordStyle(wordLit(p, WORDS - 2, WORDS))}>{JOIN}</span>{" "}
          {/* BOTH WORDS ARE RED, asked for, and it is the page's own carnelian
              rather than a second one. The rest of the heading stays white: the
              accent is the word that changes, which is the only word on this
              line doing any work.

              A SPACER SETS THE WIDTH AND NEITHER WORD DOES. Holding the
              outgoing word in the flow and laying the incoming one over it
              keeps the line from reflowing, but it also makes the box exactly
              as wide as whichever word is leaving, and the other then sits
              centred inside it with a gap beside it: mid-turn the line read
              "WITH  AI" with a double space. An invisible copy of the longer of
              the two holds the box instead. */}
          <span className="relative inline-block" style={{ ...base, color: "var(--hub-accent)" }}>
            {/* THE HEADING'S ACCESSIBLE NAME DOES NOT CYCLE. Both words are
                hidden from the tree and one canonical reading is exposed
                instead, so a screen reader is told the line once rather than
                being handed a heading that renames itself every four seconds. */}
            <span className="sr-only">{TO}</span>
            <span aria-hidden className="invisible">
              {FROM.length >= TO.length ? FROM : TO}
            </span>
            {/* The outgoing word, leaving upward and out of focus. */}
            <span
              ref={from}
              aria-hidden
              className="absolute inset-0"
              style={{
                opacity: 1,
                transform: "translateY(0%)",
                willChange: "opacity, transform, filter",
              }}
            >
              {FROM}
            </span>
            {/* The incoming one, rising into the space it leaves. */}
            <span
              ref={to}
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
      </span>
    </span>
  );
}

/** The sentence that says what the page is, for the tagline slot.
 *
 *  See ASCENT_STANDFIRST in content/ai-hub for what it says and why it is the
 *  one piece of written copy on a page of quoted copy. The slot sets it bold at
 *  up to 40px, which is a statement and not a paragraph; four lines at that
 *  size is a wall. This is the size it was on the mountain. */
export function HeroStandfirst() {
  return (
    <span className="font-grotesk mx-auto block max-w-[42ch] text-[0.95rem] font-normal leading-[1.6] tracking-normal text-white/85 [text-shadow:0_2px_28px_rgba(0,0,0,0.85)] sm:text-[1.05rem]">
      {ASCENT_STANDFIRST}
    </span>
  );
}

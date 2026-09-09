"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { usePrefersReducedMotion, useEnhanced } from "@/lib/useEnhanced";
import { Starfield } from "@/components/hub/Starfield";
import { WordReveal } from "@/components/hub/WordReveal";
import { ServiceChip } from "@/components/hub/ServiceChip";
import { seat, SEAT_LIMIT } from "@/components/hub/circularRun";
import type { Beat } from "@/content/ai-hub";

/** The chapter machine.
 *
 *  ONE TRACK, ONE STAGE, ONE NUMBER. The whole page is a single tall block
 *  with a sticky viewport-high stage inside it. Scrolling collapses to one
 *  value, 0 to 1, and everything downstream is a pure function of it: which
 *  chapter you are in, how far through it you are, which line is up, and what
 *  is mounted. Nothing is a sequence that gets played, so scrolling back up
 *  runs the whole thing in reverse for free.
 *
 *  ONLY ONE SCENE IS ALIVE. A chapter's scene is in the DOM when its own
 *  stretch of the track is near, and not otherwise. That is the rule that
 *  keeps a six-chapter page costing what one chapter costs: a WebGL scene, a
 *  scrubbing video and an iframe are never running at the same time unless
 *  they are mid-handover. Measured rather than assumed; see the notes on the
 *  commit.
 *
 *  THE JOINS. Chapters overlap by FADE, and both are mounted and cross-faded
 *  through the overlap. That is the difference between a transition and a cut,
 *  and it is the reason chapters need a machine rather than being stacked
 *  sections. The outgoing scene holds at its own final frame while it fades,
 *  so it never rewinds on the way out.
 *
 *  NOTHING IS VISIBLE UNTIL THE STAGE IS PINNED. A chapter draws relative to
 *  its own stage, and until the track reaches the top of the window that stage
 *  is still sliding up the page, so anything in it is in the wrong place by
 *  however far it has left to travel. On this page that was measurable and
 *  visible: the opener hands over on the Sun, and with the stage still 174px
 *  low the chapter drew its own Sun 212px below the light the opener was
 *  holding, which is two suns on one screen. So the scene fades up over the
 *  last part of the approach and is simply black before it, which is what the
 *  opener fades into anyway.
 *
 *  REDUCED MOTION DOES NOT RUN THIS MACHINE AT ALL. It used to pin it to the
 *  opening of chapter one, which showed one category and left the other six at
 *  opacity 0 and inert. There is a separate document branch below instead. */

export type Chapter = {
  id: string;
  /** How many viewports of scroll this chapter owns. */
  viewports: number;
  /** The scene. `t` is 0 to 1 within this chapter, `level` is its fade, and
   *  `reveal` is how far the stage has come to being pinned, and `stageOffset`
   *  is how far it still has to climb, in viewports. A scene needs both if
   *  anything it draws has to be placed against the window rather than against
   *  the stage while the stage is still moving underneath it. */
  Scene: ComponentType<{
    t: number;
    level: number;
    reveal: number;
    stageOffset: number;
    biasX: number;
  }>;
  beats: Beat[];
  /** How far right of the frame this chapter composes, as a fraction of the
   *  frame's width. Wide screens only; see BIAS below. */
  bias?: number;
};

/** Share of the track given to the cross-fade on each side of a join. */
const FADE = 0.055;

/** How much of a viewport the scene takes to fade up as the stage arrives.
 *
 *  Long enough that the scene gathers rather than switching on: at an eighth of
 *  a viewport it was abrupt. It cannot run so long that it overlaps the
 *  opener's own light, so the opener puts that out at 0.76 and this begins at
 *  0.8, and the two are never lit together. */
const REVEAL_OVER = 0.2;

/** THE OLD BEAT WINDOW IS GONE, and with it BEAT_TRAVEL_VH and the `beatWindow`
 *  prop. Both existed because each beat was drawn in the same place and had to
 *  be lit and put out on its own, which meant the window had to stay inside
 *  half the gap between neighbouring beats or two headlines printed over each
 *  other. The run below indexes the beats instead of positioning them by their
 *  own `at`, so the spacing on screen is uniform, two neighbours can be legible
 *  at once by design, and the page no longer has to tune a window per layout.
 */

/** HOW THE RUN IS SPACED AND LIT is not decided here any more.
 *
 *  It was five constants: a hold, a ramp, a ghost level and its own hold and
 *  ramp, which between them dimmed a neighbour to 0.22 and took it out by 1.65
 *  stations. That is a fade, and a fade is what the run was asked to stop being:
 *  "i was expecting this kind of text scroll", against 21st.dev's Circular
 *  Carousel. Placement, scale and dim all come from that component's own
 *  arithmetic now. See circularRun.ts, which says what was kept and what was
 *  not.
 *
 *  WHAT CHANGES ON SCREEN is that a neighbour is present rather than nearly
 *  gone. The component's falloff puts the station either side at 0.77 rather
 *  than 0.22, and it is a strip of dim type on a wide screen, so what the
 *  reader sees is the line just read and the line coming, legibly, which is
 *  what a run is for. */

/** Where the run is centred and how far apart its stations sit, per layout.
 *
 *  THE RUN CHANGES AXIS BETWEEN THEM, and that is the whole difference.
 *
 *  WIDE. The copy owns the left half at full height and the picture owns the
 *  right, so the run travels DOWN the page: centred, with a neighbour 40vh
 *  above and below, near the top and bottom edges. Present, clearly secondary,
 *  not competing for the middle.
 *
 *  NARROW. There is no left half to own. A vertical run had to spread its
 *  stations over the whole height, which put copy across the picture from 32%
 *  to 92% and left the scene nowhere to be. So it travels ACROSS instead, as a
 *  carousel: every station is a card of the same width, they sit side by side,
 *  and the run slides right to left through the bottom two fifths. The picture
 *  keeps the top three fifths to itself and the copy never crosses it.
 *
 *  90vw of pitch against an 84vw card leaves 3vw of the next one showing at each
 *  edge, which is what tells a reader there is another one rather than making
 *  them find out by scrolling.
 *
 *  THE CARD HAS TO FIT THE TWO FIFTHS IT IS GIVEN, which is 360px on a 900 tall
 *  phone, and the first attempt did not: at 78vw the tagline wrapped to two
 *  lines and the body ran to five, and the whole thing came to about 420px and
 *  pushed its own chip off the bottom of the screen. Six more vw of width takes
 *  a line off each and the padding takes off the rest. */
/** THE BOX EVERY SCENE IS DRAWN INTO ON A PHONE, as percentages from the top
 *  and the bottom of the stage.
 *
 *  A SHORTER BOX, NOT A MOVED SCENE. Hiding the lower half behind a gradient
 *  made the picture stop at 60% but did not move it: every scene is still
 *  composed about the middle of its own host, so the half you could see was the
 *  top half of a composition centred lower down. The picture has to be centred
 *  in the space it has.
 *
 *  AND EVERY CHAPTER SHARES IT, which is the part that matters. Each scene
 *  places what it draws as a fraction of its own host, so a scene given a
 *  different box from its neighbours lands somewhere its neighbours do not
 *  expect. That is not a hypothetical: a 13vh lift on the system chapter alone
 *  put two suns on screen 120px apart, and it was invisible for weeks because
 *  the joins were cuts. One container holds all four, so they cannot disagree.
 *
 *  7 AND 36 ARE SET BY THE TWO THINGS THAT HAVE TO CLEAR. The chart finishes
 *  its last rise at 0.12 of its own box, and at 0.12 of a box starting at the
 *  top of the screen that is 67px, under an 84px header. Starting the box at 7%
 *  puts that finish at 124px. The bottom is the copy's: the carousel's cards
 *  begin at 61% of the frame. */
const SCENE_TOP_PCT = 7;
const SCENE_BOTTOM_PCT = 36;

/** THE RADII, NOT THE PITCHES, and the difference is the point.
 *
 *  Travel along the run is `sin(d / 5 * PI) * radius`, so a station one away
 *  has moved 0.5878 of the radius and one two away only 0.9511: they crowd
 *  towards the ends of the track and slow into them. Each radius is set so that
 *  the FIRST neighbour lands exactly where the old pitch put it, because both
 *  pitches were measured against the frame and neither was arbitrary. 68 x
 *  0.5878 = 40vh, and 153 x 0.5878 = 90vw. Everything past the first neighbour
 *  is then closer in than a straight run would have put it, which is what makes
 *  room for it to be visible at all. */
const WIDE_CENTRE = 50;
const WIDE_RADIUS_VH = 68;
/** AND A FLOOR IN PIXELS, because the card does not scale with the window.
 *
 *  A neighbour used to be at 0.09 of full and could sit anywhere; overlapping
 *  the card was invisible. At the carousel's own 0.77 it is not, and the run
 *  has to actually clear. The card is content-sized: a headline, four lines of
 *  body, up to seven pills and a chip come to about 474px at 1440x900 and 520
 *  in a 1024 wide column, where the same content wraps more. 640px of radius
 *  puts the first neighbour 376px out, which clears half of the tallest card
 *  plus half a strip plus a gap at every size measured.
 *
 *  IT IS THE FLOOR THAT BINDS UP TO 941px TALL and the vh above it, so the run
 *  opens out on a big screen and holds its clearance on a small one. Measured
 *  as the smallest gap between any two lit stations anywhere on the track:
 *  +35px at 1440x900, +56 at 1280x680, +15 at 1024x700, which is the worst
 *  case because that column is the narrowest and its card the tallest. */
const WIDE_RADIUS_MIN_PX = 640;
/** How far a station off the middle swings across the run, at the far end of
 *  the arc. Small, because it is the curve and not the layout: the run still
 *  reads as a column. */
const WIDE_ARC_PX = 84;
/* 72, NOT 78, SINCE THE CARDS GREW. Naming what each category contains added
   four to seven pills to every card, and the tallest went from 312px to 484 on
   a 900 tall phone, which put six of the seven over the bottom edge. Raising
   the centre puts the tallest card at 448 to 848 instead. Its top sits where
   the scene above it is already masked to nothing, so what it overlaps is not
   picture, it is the fade. */
const NARROW_CENTRE = 72;
const NARROW_RADIUS_VW = 153;
const NARROW_ARC_PX = 44;
const NARROW_CARD_VW = 84;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

/** Where each chapter starts and ends along the track, 0 to 1. */
function boundsOf(chapters: Chapter[]) {
  const total = chapters.reduce((n, c) => n + c.viewports, 0);
  let at = 0;
  return chapters.map((c) => {
    const start = at / total;
    at += c.viewports;
    return { start, end: at / total };
  });
}

export function Journey({ chapters }: { chapters: Chapter[] }) {
  const trackRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const wide = useEnhanced("(min-width: 1024px)");
  const [p, setP] = useState(0);
  /* 0 until the stage is nearly pinned, 1 once it is. */
  const [reveal, setReveal] = useState(0);
  /** How far the stage still has to climb, in viewports. 0 once pinned. */
  const [stageOffset, setStageOffset] = useState(1);
  /** The window's height, for the run's radius floor. Read in the same handler
   *  as the scroll, which already runs on resize. 0 until the first read; the
   *  fallback below is the height the run was measured at. */
  const [vh, setVh] = useState(0);

  const total = chapters.reduce((n, c) => n + c.viewports, 0);
  const bounds = boundsOf(chapters);

  useEffect(() => {
    /* Nothing downstream of this is read by the reduced-motion branch, and it
       runs on every scroll event of a very long page. */
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const r = track.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      // Lenis already smooths the scroll position, so what it yields is smooth
      // and needs no easing of its own.
      setP(span <= 0 ? 0 : clamp(-r.top / span, 0, 1));
      setReveal(clamp(1 - r.top / (window.innerHeight * REVEAL_OVER), 0, 1));
      setStageOffset(Math.max(0, r.top) / window.innerHeight);
      setVh(window.innerHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const at = reduced ? 0 : p;

  /* How present each chapter is: full inside its own stretch, ramping through
     the overlap on either side, zero beyond. Two neighbours are both above
     zero only while the join is happening. */
  const levels = bounds.map(({ start, end }, i) => {
    if (reduced) return i === 0 ? 1 : 0;
    if (at >= start && at <= end) return 1;
    const gap = at < start ? start - at : at - end;
    return clamp(1 - gap / FADE, 0, 1);
  });

  /* EVERY BEAT ON THE PAGE, FLATTENED, with where each one sits on the track.
     The run is one column across all the chapters, so it cannot be built per
     chapter. Seven entries; rebuilding it per render costs nothing. */
  const stations = chapters.flatMap((c, ci) =>
    c.beats.map((b, bi) => ({
      key: `${c.id}-${bi}`,
      beat: b,
      /* The beat's own point inside its chapter, resolved onto the whole
         track, so a station's place does not depend on which chapter it is in. */
      at: bounds[ci].start + b.at * (bounds[ci].end - bounds[ci].start),
    })),
  );

  /* WHERE THE RUN IS, as a fractional station number: 0 on the first, 1 on the
     second, 1.5 halfway between them. Everything the column draws is this
     number minus a station's own index, so the spacing on screen is uniform
     however unevenly the beats are spread along the track.

     IT KEEPS COUNTING PAST BOTH ENDS, using the nearest gap as its scale, so
     the run travels in before the first line and out after the last rather than
     parking. */
  const station = (() => {
    const n = stations.length;
    if (!n) return 0;
    if (n === 1) return 0;
    if (at <= stations[0].at) {
      return (at - stations[0].at) / (stations[1].at - stations[0].at || 1);
    }
    /* THE LAST STATION HOLDS AND DOES NOT TRAVEL ON. It used to keep counting
       past the end on the nearest gap, which is right at the front of the run,
       where the first card has to arrive from somewhere. At the back it is
       wrong: there is nothing after the last category, so counting past it slid
       the card up and out and left the reader watching a black hole with no
       words against it for the rest of the page. It stays where it stopped. */
    if (at >= stations[n - 1].at) return n - 1;
    for (let i = 1; i < n; i++) {
      if (at <= stations[i].at) {
        const gap = stations[i].at - stations[i - 1].at || 1;
        return i - 1 + (at - stations[i - 1].at) / gap;
      }
    }
    return n - 1;
  })();

  /* WHICH STATION IS THE ONE BEING READ, by rounding rather than by a
     threshold, so there is exactly one of it at every scroll position and never
     a frame with none. A threshold at half a station has both neighbours below
     it at the moment they cross, which is a frame with no card in it.

     AND CLAMPED, because the run keeps counting past both ends. It extrapolates
     below zero above the first station, which rounded to -1 and left the first
     two frames of the page showing a dim headline and no card at all. */
  const activeStation = clamp(Math.round(station), 0, stations.length - 1);

  /* The run's radius along its travel, in pixels. */
  const wideRadius = Math.max(((vh || 900) * WIDE_RADIUS_VH) / 100, WIDE_RADIUS_MIN_PX);

  /* The scene box's height as a share of the window, which is what turns a
     window-relative measurement into a host-relative one. */
  const sceneUnit = wide ? 1 : (100 - SCENE_TOP_PCT - SCENE_BOTTOM_PCT) / 100;

  /* Local progress within each chapter, held at its ends so an outgoing scene
     does not rewind while it fades. */
  const locals = bounds.map(({ start, end }) => clamp((at - start) / (end - start || 1), 0, 1));

  /* HOW FAR RIGHT THE PICTURE SITS, ON WIDE SCREENS ONLY.
   *
   *  The copy is a half-width column down the left below 1024px wide, and the
   *  system's resting focus, the waveform's centre and the star the two hand
   *  over on were all at 0.5 of the frame, which is 32px from the cards' right
   *  edge at 1440. Reported from the design: the orbit and the wave should not
   *  be centred while the text is not.
   *
   *  IT IS ONE OFFSET ON THE BOX ALL FOUR CHAPTERS SHARE, and that is the whole
   *  reason it is here rather than in the scenes. The star is the fixed point
   *  of the second half: the system leaves it, the voice holds it, the chart
   *  walks it away, and the three cross-fade over it. Three scenes each given
   *  their own offset is the two-suns bug in the horizontal, which this page
   *  has already had once. One box moves them together, so at any instant they
   *  are in the same place by construction.
   *
   *  THE CHART TAKES IT BACK OFF, because a line that runs to 0.97 of its box
   *  has nowhere to go: held right it would finish past the edge. So the
   *  offset blends to zero across the join, over the same window the scenes
   *  cross-fade over, and it is finished a fifth of the chapter in, before the
   *  star leaves the flat. What the reader sees is the frame opening out as the
   *  voice becomes the line. */
  const biasX = (() => {
    if (!wide || reduced) return 0;
    let v = chapters[0].bias ?? 0;
    for (let i = 1; i < chapters.length; i++) {
      const edge = bounds[i].start;
      const w = smooth(clamp((at - (edge - FADE)) / (2 * FADE), 0, 1));
      v += ((chapters[i].bias ?? 0) - v) * w;
    }
    return v;
  })();

  /* The chapter whose line is up: the most present one, and the later of the
     two while a join is in progress. */
  let lead = 0;
  for (let i = 0; i < levels.length; i++) if (levels[i] >= levels[lead]) lead = i;

  /* AND, SEPARATELY, THE ONE PAINTED ON TOP. These were the same number, and
     that is why the joins were cuts rather than dissolves.
     `levels` is exactly 1 everywhere inside a chapter's own stretch and only
     ramps outside it, so the chapter that is arriving is below 1 for the whole
     of the overlap while the one it is replacing sits at 1. Painting the one at
     1 on top, over an opaque background, meant the arriving scene did its whole
     fade underneath something solid and then appeared complete in a single
     frame. The overlap was computed, and every note in this file describes it,
     but none of it ever reached the screen.
     The scene on top has to be the ARRIVING one, fading up over the one it
     replaces: that is what a dissolve is. So this is the latest chapter with
     any presence at all, not the most present one.
     IT CANNOT ALSO OWN THE COPY, which is the trap. This flips a whole FADE
     before `lead` does, and at that moment two headlines are still at full
     opacity: AI Creative Production sits at local 0.849 of the system and Data
     & Dashboards at 0.798 of the chart, both dead centre of their windows.
     Tying the copy to this would cut them mid-sentence. `lead` still owns the
     words and the rail; this owns nothing but z-order. */
  let top = 0;
  for (let i = 0; i < levels.length; i++) if (levels[i] > 0) top = i;

  /* REDUCED MOTION GETS A DOCUMENT, NOT A FROZEN FRAME OF THE MACHINE.
   *
   *  IT USED TO STRAND SIX OF THE SEVEN CATEGORIES. The note above this file
   *  said reduced motion "pins the whole thing to the opening of chapter one",
   *  which it did: `levels` returned 1 for chapter 0 and 0 for the rest, and
   *  `shown` was 1 for the first beat of the first chapter and 0 for every
   *  other. The other six sat at opacity 0 carrying `inert` and `aria-hidden`,
   *  so they were not merely invisible, they were out of the keyboard order
   *  too. A reader who asks for less motion was shown one service out of seven
   *  and given no way to reach the other six. There was no static fallback
   *  anywhere on the page.
   *
   *  So the answer is not a stiller version of the machine, it is not the
   *  machine. Every beat, in order, as ordinary flowing blocks. No sticky
   *  stage, no absolute positioning, no opacity, no `inert`, no `aria-hidden`,
   *  no scenes, and no 2200vh of empty track to scroll past. WordReveal at
   *  p = 1 lights every word fully with no transform and no blur, so the type
   *  keeps its treatment without a single animated property.
   *
   *  THE COPY IS STILL READ FROM content/ai-hub.ts, so check-hub-copy.mjs
   *  still guards it and no string is written twice.
   *
   *  WHAT THIS DELIBERATELY DOES NOT DO is move the gate so the server renders
   *  this too. `usePrefersReducedMotion` reports false on the server and during
   *  hydration on purpose, and inverting that would hand the plain document to
   *  every reader on first paint and then swap in a 2300vh page one render
   *  later, changing what the largest element is and losing the scroll position
   *  on any reload deep in the page. That is a regression for everyone in order
   *  to fix it for one group. The cost of leaving it is that the served HTML
   *  still carries the seven inert beats, so a reader with JavaScript off is in
   *  the same position as before. That is a real gap and it wants its own
   *  change, not this one. */
  if (reduced) {
    return (
      <section data-section="AI Hub journey" className="relative w-full bg-black">
        {chapters.map((c) =>
          c.beats.map((b, bi) => (
            <div
              key={`${c.id}-${bi}`}
              data-chapter={c.id}
              className="mx-auto w-full max-w-[44rem] px-6 py-16 lg:py-24"
            >
              {(b.eyebrow || b.tagline) && (
                <p className="font-grotesk mb-4 flex items-center gap-3 text-[0.8rem] font-bold uppercase tracking-[0.16em]">
                  {b.eyebrow && <span className="tabular-nums text-white/50">{b.eyebrow}</span>}
                  {b.eyebrow && b.tagline && (
                    <span aria-hidden className="block h-px w-6 bg-white/25" />
                  )}
                  {b.tagline && <span className="text-brand">{b.tagline}</span>}
                </p>
              )}
              <h2 className="font-grotesk hub-heading font-bold uppercase text-white">
                <WordReveal
                  text={b.title}
                  p={1}
                  accentFrom={Math.max(0, b.title.trimEnd().split(" ").length - 1)}
                />
              </h2>
              {b.body && (
                <p className="mt-5 max-w-[34rem] text-[0.98rem] leading-[1.6] text-white/65 lg:text-[1.02rem]">
                  {b.body}
                </p>
              )}
              {b.subServices && b.subServices.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1.5">
                  {b.subServices.map((name) => (
                    <li
                      key={name}
                      className="rounded-full bg-white/[0.06] px-2.5 py-[3px] text-[0.72rem] leading-[1.5] text-white/60"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
              {b.href && <ServiceChip href={b.href} />}
            </div>
          )),
        )}
      </section>
    );
  }

  return (
    <section
      ref={trackRef}
      data-section="AI Hub journey"
      style={{ height: `${total * 100}vh` }}
      className="relative w-full bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          className="absolute inset-x-0"
          style={{
            top: wide ? 0 : `${SCENE_TOP_PCT}%`,
            bottom: wide ? 0 : `${SCENE_BOTTOM_PCT}%`,
            /* A percentage of the box, which is `inset-x-0` and so is the width
               of the frame. Nothing inside is resized, so no canvas is
               reallocated as it moves. */
            transform: biasX ? `translate3d(${biasX * 100}%, 0, 0)` : undefined,
            willChange: biasX ? "transform" : undefined,
            /* The box has a hard bottom edge and a canvas does not fade itself,
               so the last part of it is masked away. Cheaper than a gradient
               laid over the top, and it fades the scene rather than painting
               black over whatever is behind it. */
            maskImage: wide ? undefined : "linear-gradient(to bottom, #000 74%, transparent 100%)",
            WebkitMaskImage: wide
              ? undefined
              : "linear-gradient(to bottom, #000 74%, transparent 100%)",
          }}
        >
          {chapters.map((c, i) =>
            levels[i] > 0 ? (
              <div
                key={c.id}
                data-chapter={c.id}
                className="absolute inset-0"
                style={{ opacity: levels[i] * (reduced ? 1 : reveal), zIndex: i === top ? 2 : 1 }}
              >
                <c.Scene
                  t={locals[i]}
                  level={levels[i]}
                  reveal={reduced ? 1 : reveal}
                  /* IN UNITS OF THE SCENE'S OWN BOX, not of the window. A scene
                     subtracts this from a `focus` that is a fraction of its
                     host, and on a phone the host is no longer the height of
                     the window, so the same number would shift it by the wrong
                     amount while the stage is still climbing. */
                  stageOffset={reduced ? 0 : stageOffset / sceneUnit}
                  /* THE HORIZONTAL TWIN OF `stageOffset`: how far the box it is
                     drawing into has been moved off the window. A scene only
                     needs it for a point that belongs to the window rather
                     than to the box, and there is exactly one on this page,
                     the sun the photograph hands over on. */
                  biasX={biasX}
                />
              </div>
            ) : null,
          )}
        </div>

        {/* ONE SKY, OVER THE CHAPTERS RATHER THAN BEHIND THEM, AND ADDED
            RATHER THAN LAID ON TOP. Behind is where it belongs and behind is
            where it cannot be seen: the orbital component takes its drawing
            context with `alpha: false`, so its canvas is opaque whatever the
            element behind it holds and whatever background its host div is
            given. Screen blending gets the same result from the other side.
            The stars only ever add light, so they show through the black and
            disappear into anything already bright, which is why none of them
            ever appears to sit in front of the Sun.

            It is above the scenes and below the copy, so nothing it does can
            touch legibility. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{ mixBlendMode: "screen" }}
        >
          <Starfield />
        </div>

        {/* A LITTLE GROUND UNDER THE CAROUSEL, and much less than there was.
            This used to be the whole mechanism for keeping the picture in the
            top three fifths and it was doing the wrong job: it hid the bottom
            of a scene that was still composed about the middle. The scene box
            above does that properly now, so all this has left to do is settle
            the sky behind the cards. The sky is screened on top of the scenes,
            so this has to be over it, and under the copy at z-10. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[42%] bg-gradient-to-t from-black/85 to-transparent lg:hidden"
        />

        {/* THE COPY IS ONE RUN, AND IT SCROLLS.
            Every beat on the page sits in a single vertical run at a fixed
            pitch, and the run slides as the reader scrolls: the line just read
            is above, the line coming is below, and the one being read is on the
            centre. Previously each beat was drawn in the same place and faded
            in and out on its own, which is a slideshow laid over a moving
            picture. Nothing about the story was ever a slideshow.

            THE PITCH IS UNIFORM AND THE BEATS' OWN SPACING IS NOT. Beats sit
            0.3 of a chapter apart in the system and 0.45 apart in the chart, so
            positioning by `at` would have made the gaps in the column jump
            between chapters. The run is indexed instead: the track position is
            resolved to a fractional station number, and every beat is placed at
            its own index minus that. Even spacing everywhere, and the scroll
            speed varies with the story rather than the layout.

            IT IS ONE RUN ACROSS THE WHOLE PAGE, not one per chapter. Beats used
            to be drawn only for the leading chapter, which meant the column
            emptied and refilled at every join. Flattened, the copy carries
            straight through a scene change while the scenes cross-fade
            underneath, which is the seam this page spends most of its effort
            on everywhere else. */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {stations.map((s, i) => {
            const d = i - station;
            /* Reduced motion never reaches here; it returns the document
               branch above. Past the limit there is nothing left to draw. */
            if (Math.abs(d) > SEAT_LIMIT) return null;
            /* Placement, scale and dim, all from the carousel's own arithmetic. */
            const at = seat(d);
            const shown = at.opacity * reveal;
            /* The swap happens halfway between two stations, where both are
               moving and neither is being looked at. */
            const active = activeStation === i;
            const b = s.beat;
            return (
              <div
                key={s.key}
                aria-hidden={!active}
                inert={!active}
                className="absolute inset-x-0 text-left lg:w-1/2 lg:px-6 lg:pl-16 lg:pr-8 xl:pl-24"
                style={{
                  top: `${wide ? WIDE_CENTRE : NARROW_CENTRE}%`,
                  /* One transform, one paint. The run travels down the page on a
                     wide screen and across it on a narrow one, and on both the
                     other axis carries the arc: `along` is the sine and `depth`
                     the cosine, so a station leaving the middle swings out as
                     well as away. */
                  transform: wide
                    ? `translate3d(${(-at.depth * WIDE_ARC_PX).toFixed(1)}px, calc(-50% + ${(at.along * wideRadius).toFixed(1)}px), 0) scale(${at.scale.toFixed(3)})`
                    : `translate3d(${(at.along * NARROW_RADIUS_VW).toFixed(2)}vw, calc(-50% + ${(at.depth * NARROW_ARC_PX).toFixed(1)}px), 0) scale(${at.scale.toFixed(3)})`,
                  /* The column is anchored left and the carousel is centred, so
                     each shrinks towards its own axis rather than drifting off
                     it. */
                  transformOrigin: wide ? "left center" : "center",
                  zIndex: at.z,
                  opacity: shown,
                  /* OFF THE COMPOSITOR WHEN IT IS NOT THERE. Each of these
                     carries a backdrop filter, and a backdrop filter at opacity
                     0 is still a backdrop filter. `visibility` takes it out of
                     the work entirely; `opacity: 0` alone does not. */
                  visibility: shown < 0.01 ? "hidden" : "visible",
                  willChange: shown > 0 ? "transform, opacity" : undefined,
                  pointerEvents: active ? "auto" : "none",
                }}
              >
                {/* ONE STATION IS A CARD AND THE REST ARE STRIPS, which is
                    what stops the run being a pile. A card carrying a headline,
                    four lines of body and a chip is 40vh tall on a phone, and
                    three of those at any workable pitch overlap each other,
                    which is exactly what the first attempt did. A station the
                    reader is not on does not need its body: it needs to say
                    which one it is and roughly what it is about, so it keeps
                    its number, its tagline and its title and gives up the rest.
                    The swap happens as `near` crosses 0.5, which is the middle
                    of that station's own cross-fade, where it is at half
                    opacity and moving. There is no moment at which a reader is
                    looking straight at it while it changes.

                    THE GLASS IS THE CARD'S ALONE. Asked for by name, and kept
                    to the one thing glass is for: lifting type off a moving
                    picture so it can be read. A low tint, a hairline, a wide
                    radius and a small blur, on one element rather than a run of
                    them, because a column of bordered cards is the arrangement
                    this project has rejected twice by name. It is also the most
                    expensive thing on the page, and there is no sense paying
                    for it three times to frost two lines of dim type. */}
                {active || !wide ? (
                  <div
                    /* THE BLUR AND THE HAIRLINE ARE THE ACTIVE CARD'S ALONE,
                       even in the carousel where all three are cards. A
                       neighbour is dim and nobody can tell whether what is
                       behind it is frosted, so paying for two more backdrop
                       filters on a phone buys nothing; and a light going round
                       three boxes at once is decoration, where one marks the
                       box you are reading. */
                    className={`hub-glass relative mx-auto rounded-[26px] px-5 py-6 lg:mx-0 lg:w-full lg:max-w-[40rem] lg:rounded-[28px] lg:px-9 lg:py-9 ${
                      active ? "hub-glass-blur" : ""
                    }`}
                    style={wide ? undefined : { width: `${NARROW_CARD_VW}vw` }}
                  >
                    {/* THE HAIRLINE THAT GOES ROUND THE BOX, asked for by name.
                        Two of them: three pixels of bloom under one pixel of
                        light, both cut to the border by the same mask and both
                        turned by the same transform, so they cannot drift out
                        of step. Nothing here paints per frame; see hub-orbit in
                        globals.css. */}
                    {active && (
                      <>
                        <span aria-hidden className="hub-orbit hub-orbit-bloom">
                          <i />
                        </span>
                        <span aria-hidden className="hub-orbit">
                          <i />
                        </span>
                      </>
                    )}
                    <Kicker beat={b} />
                    <h2 className="font-grotesk hub-heading font-bold uppercase text-white">
                      {/* Fully lit by 0.75 rather than only at the centre.
                          Driven straight off `near` the words sat half revealed
                          and blurred for most of the station's life, which
                          reads as a rendering fault and not as an arrival. */}
                      <WordReveal
                        text={b.title}
                        /* Lit between 0.62 and 0.40 of a station out, which is
                           the window the old `near` resolved to and is finished
                           before this station becomes the card. */
                        p={clamp((0.62 - Math.abs(d)) / 0.22, 0, 1)}
                        accentFrom={Math.max(0, b.title.trimEnd().split(" ").length - 1)}
                      />
                    </h2>
                    {b.body && (
                      <p className="mt-3 max-w-[34rem] text-[0.83rem] leading-[1.5] text-white/70 lg:mt-4 lg:text-[1rem] lg:leading-[1.65]">
                        {b.body}
                      </p>
                    )}
                    {b.subServices && b.subServices.length > 0 && (
                      /* WHAT THE CATEGORY ACTUALLY CONTAINS, in that service's
                         own words. The body says what a service is in one
                         sentence, which is enough to identify it and nowhere
                         near enough to say what buying it gets you: "builds AI
                         agents, automated workflows and custom tools" is true
                         of a hundred agencies, and "Document Processing,
                         Enquiry and Request Handling, Reporting and Data
                         Reconciliation" is what this one does on a Tuesday.

                         PILLS WITH NO BORDER, WHICH IS THE WHOLE OF THE
                         RESTRAINT. Seven bordered boxes inside a bordered card
                         is the arrangement this project has rejected by name,
                         twice, and it would put two rings around the same
                         words. A wash at 0.06 separates them from the body
                         without drawing a box, and they wrap as type rather
                         than laying out as a grid. */
                      /* AND NOT ON A PHONE, which was offered and is the right
                         call: "if mobile text box looks bigger and odd with the
                         services chip, you can remove it". Six of these are
                         five rows at 84vw, and they took the card to 386px of a
                         900 tall screen, which is 43 per cent of it and reaches
                         up into the scene. Without them it is 208 and sits in
                         the bottom third where the carousel belongs. The
                         desktop card has the width to lay them out in two rows
                         and keeps them. Nothing is lost: they are on the
                         category page the Explore chip goes to, in the same
                         words. */
                      <ul className="mt-3 hidden flex-wrap gap-x-1 gap-y-1 lg:mt-4 lg:flex lg:gap-x-1.5 lg:gap-y-1.5">
                        {b.subServices.map((name) => (
                          <li
                            key={name}
                            className="rounded-full bg-white/[0.06] px-2 py-[2px] text-[0.64rem] leading-[1.45] tracking-[0.01em] text-white/60 lg:px-2.5 lg:py-[3px] lg:text-[0.72rem]"
                          >
                            {name}
                          </li>
                        ))}
                      </ul>
                    )}
                    {b.href && <ServiceChip href={b.href} />}
                  </div>
                ) : (
                  <div className="w-full max-w-[40rem] px-1">
                    <Kicker beat={b} />
                    <h2 className="font-grotesk hub-heading font-bold uppercase leading-[0.95] text-white/40">
                      {b.title}
                    </h2>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* How far through the climb you are. */}
        <ol
          aria-hidden
          className="pointer-events-none absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 sm:right-8"
        >
          {chapters.map((c, i) => (
            <li
              key={c.id}
              /* Colour only, and quickly. It was `transition-all duration-500`:
                 half a second is a card entering, not a hairline marker
                 acknowledging which chapter you are in, and `all` put the
                 element's own height in the transition too, so a resize
                 animated the rail's length for no reason. */
              className="w-px transition-colors duration-200 motion-reduce:transition-none"
              style={{
                height: `${c.viewports * 10}px`,
                background: i === lead ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

/** The number and the tagline over a station's title.
 *
 *  THE TAGLINE IS THE ONE LINE PER SECTION THAT IS WRITTEN RATHER THAN QUOTED.
 *  A category's title is its navigation label and its body is the first
 *  sentence of its client document, so between them there was nothing that said
 *  what the service is FOR. "AI Search Visibility" names a thing; "Found in the
 *  answer" says why a marketing lead skimming at speed should care.
 *
 *  THE ROW HAS A READING ORDER AND NEITHER PART IS RED. The number is
 *  wayfinding rather than content, so it is the quietest thing here: it matters
 *  that it is present and ascending, not that it is loud. The tagline sits
 *  above it in weight and below the title.
 *
 *  The accent belongs to the title's last word, which is the site's two-tone
 *  treatment and is already on screen. Giving the tagline the same red put two
 *  of them in one card, stacked, and the eye had nowhere to start. Brand red is
 *  an accent and a mark on this site, and the second use of it in six inches
 *  stops being either. */
function Kicker({ beat }: { beat: Beat }) {
  if (!beat.eyebrow && !beat.tagline) return null;
  return (
    <p className="font-grotesk mb-3 flex items-center gap-3 whitespace-nowrap text-[0.7rem] font-bold uppercase tracking-[0.12em] lg:mb-4 lg:text-[0.78rem] lg:tracking-[0.16em]">
      {/* The number stays neutral and is the quietest thing in the row, because
          seven ascending numbers are an index rather than decoration. It was
          white/45, which measures 4.4:1 at this size and misses AA; 55 gives
          6.2:1 and is still the quietest mark here. */}
      {beat.eyebrow && <span className="tabular-nums text-white/55">{beat.eyebrow}</span>}
      {beat.eyebrow && beat.tagline && (
        <span aria-hidden className="block h-px w-6" style={{ background: "rgba(255,206,110,0.30)" }} />
      )}
      {/* Warm rather than neutral, at the same measured weight as the white/60
          it replaces. It makes the one written line on a page of quoted lines
          legible as the written line. */}
      {beat.tagline && (
        <span style={{ color: "rgba(255,206,110,0.78)" }}>{beat.tagline}</span>
      )}
    </p>
  );
}

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
 *  NARROW TRAVELS THE SAME WAY, DOWN THE PAGE, and used to travel across. It
 *  was a carousel of full cards sliding right to left through the bottom two
 *  fifths, which kept the whole picture but was rejected on sight: "horizontal
 *  scroll in mobile is not good, make it vertical". So it is the same run as
 *  the wide one now, one card and two strips on the same arc, and the scene box
 *  above it gives up the height that takes. See NARROW_CENTRE.
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
 *  7 AND 56 ARE SET BY THE TWO THINGS THAT HAVE TO CLEAR. The chart finishes
 *  its last rise at 0.12 of its own box, and at 0.12 of a box starting at the
 *  top of the screen that is 67px, under an 84px header. Starting the box at 7%
 *  puts that finish at 124px.
 *
 *  THE BOTTOM WAS 36 AND IS 48, WHICH IS WHAT TURNING THE RUN UPRIGHT COST.
 *  The copy used to slide across the bottom two fifths and the picture kept
 *  everything above it. A run that travels down the page needs some of that
 *  height. The card's top edge lands between 46 and 55 per cent depending on
 *  the phone, the box ends at 52, and its own mask has faded it to nothing from
 *  40, so where the two meet the picture is already gone. */
const SCENE_TOP_PCT = 7;
const SCENE_BOTTOM_PCT = 48;

/** THE RADII, NOT THE PITCHES, and the difference is the point.
 *
 *  Travel along the run is `sin(d / 5 * PI) * radius`, so a station one away
 *  has moved 0.5878 of the radius and one two away only 0.9511: they crowd
 *  towards the ends of the track and slow into them. */
const WIDE_CENTRE = 50;
const WIDE_RADIUS_VH = 68;
/** AND A FLOOR IN PIXELS, because the card does not scale with the window and
 *  the strips still have to clear it. The card is content-sized: a headline,
 *  four lines of body, up to seven pills and a chip come to about 474px at
 *  1440x900 and 520 in a 1024 wide column, where the same content wraps more.
 *
 *  545 IS THE BOTTOM OF A WINDOW THAT CLOSES ON A SHORT SCREEN. The first
 *  neighbour has to clear half the card plus half a strip, which wants a big
 *  radius, and it should still be inside the frame, which wants a small one. It
 *  is why the strips gave up the display size of their headline: at the 132px
 *  they were, that window was empty and there was no radius that worked at all.
 *  545 is set by the worst case, 1024x700, where the column is narrowest and
 *  the card tallest at 549px; below it the strips cut into the card there.
 *
 *  IT USED TO BE 640, sized against clearance alone, which was the wrong half
 *  of the problem: it put the first strip 376px out, off the top and bottom of
 *  a 680 tall frame, so a laptop saw the card and no run at all. */
const WIDE_RADIUS_MIN_PX = 545;

/** THE RUN IS CENTRED ON THE FRAME MINUS THE HEADER, NOT ON THE FRAME.
 *
 *  The navigation is fixed, 84px tall and above everything at z-70, so the
 *  space the run actually has starts at 84 and not at 0. Centred on the frame,
 *  the tallest card put its own top edge and its whole kicker row inside that
 *  bar: measured at 1024x700, where the column is narrowest and the card
 *  therefore tallest at 549px, the top sat at 75 against a bar reaching 84, and
 *  the reader got a glass box with no lid and no standfirst.
 *
 *  HALF THE HEADER IS THE WHOLE OF THE CORRECTION, because centring in the band
 *  from 84 to the fold is the same as centring on the frame and moving down by
 *  half of what was taken off the top. It costs 42px of empty space at the
 *  bottom, which the right half of the page owns anyway. */
const WIDE_HEADER_PX = 84;
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
/** THE PHONE'S RUN IS UPRIGHT NOW, and it was sideways for a reason that has
 *  been overruled: "horizontal scroll in mobile is not good, make it vertical".
 *
 *  AND IT SHOWS ONE STATION, NOT THREE. The neighbours were strips above and
 *  below for one revision, which is the desktop column's arrangement, and they
 *  came off: "next and previous title above and below is not needed in mobile".
 *  They are still mounted and still on the arc at nothing, because they are
 *  what the hand-over dissolves through, so between steps a phone shows one
 *  card and no other words at all.
 *
 *  WHICH GIVES THE PICTURE MOST OF ITS HEIGHT BACK. With nothing lit above the
 *  card, the scene box only has to clear the card itself: it ends at 52 per
 *  cent against the 44 the strips needed, and its own mask has faded it to
 *  nothing from 40. */
const NARROW_CENTRE = 70;
/** DERIVED FROM THE CARD, THE WAY THE COMPONENT DERIVES ITS OWN.
 *
 *  IT WAS 153, BACK-SOLVED FROM THE OLD 90vw PITCH, and that was wrong in a way
 *  that took the carousel off the phone entirely. The old run had no scale; the
 *  arc has one, and 0.9 of an 84vw card pulls its near edge from 98vw to
 *  102.1vw. Two vw of the next card used to show at rest and none did, so a
 *  reader at any station centre saw one card and no evidence a second existed.
 *  The client asked for this component on both mobile and desktop and only
 *  desktop had it.
 *
 *  96 IS THE COMPONENT'S OWN RATIO: it runs a 220 radius against a 192px card,
 *  and 84vw x 220/192 is 96vw. The neighbour then spans 68.6 to 144.2vw, so
 *  31vw of it is on screen at every rest position, under the active card and
 *  behind its blur, which is the original's own stacking. */
/** In pixels, and it is a slide distance rather than a clearance.
 *
 *  IT WAS 340 AND HAD TO BE, back when the phone showed the neighbours' titles:
 *  the strips had to clear a 306px card at the smallest size. With nothing lit
 *  either side of the card, the radius has one job left, which is how far the
 *  outgoing card travels as it fades. 200 puts that at 118px over the 0.65s of
 *  the step: enough to read as the run moving, short enough that the card never
 *  rides up over the picture on its way out. */
const NARROW_RADIUS_PX = 200;
/** Across the run, the same job WIDE_ARC_PX does: the curve, not the layout. */
const NARROW_ARC_PX = 30;
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
    /* HALF A STATION OF LEAD-IN AND NO MORE. It used to scale the run-in by the
       gap to the second station, which is 0.109 of the track against a first
       station at 0.091, so the run entered from -0.833: the whole of the first
       viewport had station 01 nominally in charge while sitting 320px below
       centre with its headline at 0.06 opacity and its chip off the bottom of
       the screen. Half a station is the most the run is ever off elsewhere, so
       it now enters looking like every other hand-over. */
    if (at <= stations[0].at) {
      return stations[0].at > 0 ? -0.5 * (1 - at / stations[0].at) : 0;
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

  /* WHICH CHAPTER IS PAINTED ON TOP.

     THERE USED TO BE TWO OF THESE and the difference between them was the whole
     of the dissolve. `lead` was the most present chapter and this is the latest
     one with any presence; sharing one number is why the joins were cuts.
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
     IT MUST NOT OWN THE COPY, which was the trap and is why the two were ever
     separate: this flips a whole FADE early, and at that moment two headlines
     are still at full opacity, AI Creative Production at local 0.849 of the
     system and Data & Dashboards at 0.798 of the chart, both dead centre of
     their windows. Tying the copy to it would cut them mid-sentence. The copy
     is indexed off the run's own station instead, and `lead` is gone with the
     rail that was its last reader. This owns nothing but z-order. */
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
                  {b.eyebrow && <span className="tabular-nums text-white/65">{b.eyebrow}</span>}
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
      {/* overflow-CLIP, NOT HIDDEN, AND THAT IS NOT A TIDY-UP. `hidden` makes
          this a scroll container, so anything focusable that ends up outside it
          can be scrolled INTO it by the browser. Tabbing to a card's Explore
          link while it was still off the bottom moved the stage 181px and left
          every scene, the starfield and all seven stations drawing that much
          too high for the remaining twenty-one viewports, with a black band
          underneath and nothing to reset it. `clip` clips identically and
          cannot scroll. */}
      <div className="sticky top-0 h-screen w-full overflow-clip">
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
            const dRun = i - station;
            /* THE READ CARD DOES NOT TRAVEL, AND THAT IS THE COMPONENT'S OWN
               RULE: its offset is `index - activeIndex`, an integer, and the
               movement is carried by a transition rather than by scrubbing the
               track. Scrubbed, the card swings 0.309 of the radius at each
               hand-over, which is 198px on top of a card 421 to 549px tall. At
               1280x680 that put its headline and kicker behind the navbar and
               its chip below the fold: the reader was handed a glass box that
               began with body copy. There is no radius that fixes it, either.
               Fitting a 474px card that swings 0.309R inside 680px under an
               84px header wants R under 136; the clearance the strips need
               wants R over about 470. The two do not overlap, so the card comes
               off the axis instead.

               THE PHONE KEEPS THE SCRUB, because the client asked for the
               right-to-left travel it already had and a 244px card has the room
               to swing. */
            const d = i - activeStation;
            /* Reduced motion never reaches here; it returns the document
               branch above. Past the limit there is nothing left to draw; on a
               wide screen the whole run is seven stations and the far ones are
               simply held at nothing, so they have something to ease in from. */
            if (Math.abs(d) > SEAT_LIMIT + 1) return null;
            /* Placement, scale and dim, all from the carousel's own arithmetic. */
            const at = seat(d);
            /* The swap happens halfway between two stations, where both are
               moving and neither is being looked at. AND ONLY WITHIN HALF A
               STATION: at the two ends the run counts past itself, and a card
               declared active out there is a real link in the page's tab order
               sitting off the bottom of the screen. */
            const active = activeStation === i && Math.abs(dRun) <= 0.5;
            /* ON A PHONE ONLY THE STATION BEING READ IS LIT, and that is the
               whole of what changed here: "next and previous title above and
               below is not needed in mobile". The neighbours are still mounted
               and still on the arc, at nothing, because they are what the
               hand-over dissolves through: the outgoing card slides up and
               fades, the incoming one comes up from below, and between steps
               there is one card on screen and no other words at all.
               The wide column keeps the carousel's own falloff, where the line
               just read and the line coming are the point of a run. */
            const shown = (wide ? at.opacity : active ? 1 : 0) * reveal;
            const b = s.beat;
            return (
              <div
                key={s.key}
                aria-hidden={!active}
                inert={!active}
                className="absolute inset-x-0 text-left lg:w-1/2 lg:px-6 lg:pl-16 lg:pr-8 xl:pl-24"
                style={{
                  top: wide
                    ? `calc(${WIDE_CENTRE}% + ${WIDE_HEADER_PX / 2}px)`
                    : `${NARROW_CENTRE}%`,
                  /* One transform, one paint. The run travels down the page on a
                     wide screen and across it on a narrow one, and on both the
                     other axis carries the arc: `along` is the sine and `depth`
                     the cosine, so a station leaving the middle swings out as
                     well as away. */
                  transform: `translate3d(${(-at.depth * (wide ? WIDE_ARC_PX : NARROW_ARC_PX)).toFixed(1)}px, calc(-50% + ${(at.along * (wide ? wideRadius : NARROW_RADIUS_PX)).toFixed(1)}px), 0) scale(${at.scale.toFixed(3)})`,
                  /* The column is anchored left and the carousel is centred, so
                     each shrinks towards its own axis rather than drifting off
                     it. */
                  transformOrigin: wide ? "left center" : "center",
                  zIndex: at.z,
                  /* THE OPACITY IS NOT HERE ANY MORE, AND NEITHER IS ITS HINT,
                     because between them they were switching off the glass.
                     A fractional opacity makes an element a backdrop root, and
                     so does naming opacity in `will-change`; either one on an
                     ancestor leaves `backdrop-filter` below it sampling nothing
                     and painting nothing. The card has carried
                     `backdrop-blur` since it was first asked for and it has
                     never once rendered. It moves down onto the card itself,
                     where an element's own opacity does not defeat its own
                     filter, and the hint here names only the transform. */
                  /* A phone's neighbours are transparent rather than absent,
                     so their fade can play; anything further out is taken off
                     the compositor entirely. */
                  visibility: wide
                    ? shown < 0.01
                      ? "hidden"
                      : "visible"
                    : Math.abs(d) > 1.5
                      ? "hidden"
                      : "visible",
                  willChange: shown > 0 ? "transform" : undefined,
                  /* The component's own easing, on the step it now takes. */
                  transition:
                    reveal >= 1 ? "transform 0.65s cubic-bezier(0.22,1,0.36,1)" : undefined,
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
                    style={{
                      opacity: shown,
                      transition:
                        reveal >= 1 ? "opacity 0.65s cubic-bezier(0.22,1,0.36,1)" : undefined,
                      ...(wide ? null : { width: `${NARROW_CARD_VW}vw` }),
                    }}
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
                        /* Lit between 0.62 and 0.40 of a station out, off the
                           run's own position rather than the stepped one, so
                           the words still arrive with the scroll on a wide
                           screen where the card itself no longer moves. */
                        p={clamp((0.62 - Math.abs(dRun)) / 0.22, 0, 1)}
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
                         up into the scene. Without them it is 244 and sits from
                         60 to 88 per cent, which leaves the picture the top
                         three fifths it was given. The
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
                  <div
                    /* mx-auto and the card's own width on a phone, so a strip
                       sits on the same left edge as the card it is a neighbour
                       of rather than on the frame's. */
                    className="mx-auto w-full max-w-[40rem] px-5 lg:mx-0 lg:px-1"
                    style={{
                      opacity: shown,
                      transition:
                        reveal >= 1 ? "opacity 0.65s cubic-bezier(0.22,1,0.36,1)" : undefined,
                      ...(wide ? null : { width: `${NARROW_CARD_VW}vw` }),
                    }}
                  >
                    <Kicker beat={b} />
                    {/* NOT `hub-heading`, WHICH IS UP TO 3.9rem AND MADE THE
                        RUN IMPOSSIBLE TO FIT. A strip is wayfinding: it says
                        which one you have just read and which one is coming,
                        and at display size it was 132px tall, which left no
                        radius that both cleared the card and stayed inside a
                        680px frame. At this size most titles are one line and
                        the strip is about 66px, which opens that window. It is
                        also the honest weight for it: the reader is not meant
                        to be reading these. */}
                    <h2 className="font-grotesk text-[1.55rem] font-bold uppercase leading-[1.08] tracking-[-0.015em] text-white/40 lg:text-[1.9rem]">
                      {b.title}
                    </h2>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* THE PROGRESS RAIL IS GONE. It was four hairlines down the right edge
            saying which chapter you were in, aria-hidden and unreadable, and it
            was asked for by name to come off. The run itself already carries the
            same information and carries it in words: an ascending number and a
            title on every station. */}
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
      {/* THE BODY COPY'S WHITE, asked for, and the number keeps being the
          quietest thing in the row on weight and size rather than on tone.
          Seven ascending numbers are an index rather than decoration, but at
          white/55 against a body set in white/65 the index read as faded
          instead of quiet, and the page was carrying three whites where it has
          two. 65 measures 8.0:1 here, comfortably past AA. */}
      {beat.eyebrow && <span className="tabular-nums text-white/65">{beat.eyebrow}</span>}
      {beat.eyebrow && beat.tagline && (
        <span
          aria-hidden
          className="block h-px w-6"
          style={{ background: "color-mix(in srgb, var(--hub-accent-quiet) 45%, transparent)" }}
        />
      )}
      {/* Warm rather than neutral, at the same measured weight as the white/60
          it replaces. It makes the one written line on a page of quoted lines
          legible as the written line. */}
      {beat.tagline && (
        <span style={{ color: "var(--hub-accent-quiet)" }}>{beat.tagline}</span>
      )}
    </p>
  );
}

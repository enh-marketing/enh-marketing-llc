"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { usePrefersReducedMotion, useEnhanced } from "@/lib/useEnhanced";
import { Starfield } from "@/components/hub/Starfield";
import { WordReveal } from "@/components/hub/WordReveal";
import { ServiceChip } from "@/components/hub/ServiceChip";
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
 *  REDUCED MOTION pins the whole thing to the opening of chapter one and
 *  mounts nothing else. Each scene separately holds a still frame of its own,
 *  so what a reader gets is one picture and the words that go with it. */

export type Chapter = {
  id: string;
  /** How many viewports of scroll this chapter owns. */
  viewports: number;
  /** The scene. `t` is 0 to 1 within this chapter, `level` is its fade, and
   *  `reveal` is how far the stage has come to being pinned, and `stageOffset`
   *  is how far it still has to climb, in viewports. A scene needs both if
   *  anything it draws has to be placed against the window rather than against
   *  the stage while the stage is still moving underneath it. */
  Scene: ComponentType<{ t: number; level: number; reveal: number; stageOffset: number }>;
  beats: Beat[];
};

/** Share of the track given to the cross-fade on each side of a join. */
const FADE = 0.055;

/** How a line is lit as the reader reaches it, in chapter progress either side
 *  of the beat: full within HOLD, out by HOLD + RAMP.
 *
 *  A PLATEAU, AND NARROWER THAN THE GAP BETWEEN BEATS. Both parts matter. A
 *  plain triangle is at full strength only at the exact point of the beat, so
 *  the copy is never quite solid; the plateau gives it a stretch to be read in.
 *  And the beats on this page sit 0.33 apart, so anything reaching further than
 *  0.165 has two of them legible at once, which showed up as two headlines
 *  printed over each other the moment the type went to the site's weight. Out
 *  by 0.15 leaves a small gap of picture with no words in it between one
 *  category and the next, which is worth having anyway. */
const BEAT_HOLD = 0.06;
const BEAT_RAMP = 0.09;

/** A page with more stations than this one needs a shorter window: the rule is
 *  that hold + ramp must stay inside half the gap between neighbouring beats,
 *  or two are legible at once. */
export type BeatWindow = { hold: number; ramp: number };

/** How much of a viewport the scene takes to fade up as the stage arrives.
 *
 *  Long enough that the scene gathers rather than switching on: at an eighth of
 *  a viewport it was abrupt. It cannot run so long that it overlaps the
 *  opener's own light, so the opener puts that out at 0.76 and this begins at
 *  0.8, and the two are never lit together. */
const REVEAL_OVER = 0.2;

/** How far a line travels as the reader passes it, in viewport heights per unit
 *  of chapter progress.
 *
 *  THE COPY MOVES WITH THE SCROLL RATHER THAN BLINKING IN AND OUT. Fading alone
 *  reads as a slideshow laid over a moving picture: the scene travels, the words
 *  do not, and the two look like separate pages. Each line now rises through its
 *  own window on the same scroll that moves the scene, and the fade is only what
 *  hides its arrival and its exit.
 *
 *  THE NUMBER IS SET BY THE WINDOW, not picked. A line is legible across
 *  hold + ramp of chapter progress on each side, which this page narrows to
 *  0.095, so its whole visible life is 0.19 of a chapter. At 160 that is a
 *  little over 30vh of travel from first light to last: enough to read as
 *  movement, not so much that the line is crossing the frame while it is being
 *  read.
 *
 *  DESKTOP ONLY. On a phone the copy has a reserved bottom two fifths and
 *  nothing to move against; sliding it inside that box only collides with its
 *  own edges. */
const BEAT_TRAVEL_VH = 160;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

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

export function Journey({
  chapters,
  beatWindow = { hold: BEAT_HOLD, ramp: BEAT_RAMP },
}: {
  chapters: Chapter[];
  beatWindow?: BeatWindow;
}) {
  const trackRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const wide = useEnhanced("(min-width: 1024px)");
  const [p, setP] = useState(0);
  /* 0 until the stage is nearly pinned, 1 once it is. */
  const [reveal, setReveal] = useState(0);
  /** How far the stage still has to climb, in viewports. 0 once pinned. */
  const [stageOffset, setStageOffset] = useState(1);

  const total = chapters.reduce((n, c) => n + c.viewports, 0);
  const bounds = boundsOf(chapters);

  useEffect(() => {
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
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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

  /* Local progress within each chapter, held at its ends so an outgoing scene
     does not rewind while it fades. */
  const locals = bounds.map(({ start, end }) => clamp((at - start) / (end - start || 1), 0, 1));

  /* The chapter whose line is up: the most present one, and the later of the
     two while a join is in progress. */
  let lead = 0;
  for (let i = 0; i < levels.length; i++) if (levels[i] >= levels[lead]) lead = i;

  return (
    <section
      ref={trackRef}
      data-section="AI Hub journey"
      style={{ height: `${total * 100}vh` }}
      className="relative w-full bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {chapters.map((c, i) =>
          levels[i] > 0 ? (
            <div
              key={c.id}
              data-chapter={c.id}
              className="absolute inset-0"
              style={{ opacity: levels[i] * (reduced ? 1 : reveal), zIndex: i === lead ? 2 : 1 }}
            >
              <c.Scene
                t={locals[i]}
                level={levels[i]}
                reveal={reduced ? 1 : reveal}
                stageOffset={reduced ? 0 : stageOffset}
              />
            </div>
          ) : null,
        )}

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

        {/* The story. Every beat of the leading chapter stays mounted and
            fades, so none of them remount as the reader moves. */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {chapters.map((c, ci) =>
            c.beats.map((b, bi) => {
              const near =
                ci === lead
                  ? clamp(
                      1 - (Math.abs(locals[ci] - b.at) - beatWindow.hold) / beatWindow.ramp,
                      0,
                      1,
                    )
                  : 0;
              /* AND GATED ON THE STAGE BEING PINNED, exactly as the scenes
                 are. A beat is placed against its stage, and until the track
                 reaches the top of the window that stage is still climbing, so
                 a beat lit early is drawn wherever the stage happens to have
                 got to. Every beat here sits at 0.2 or later, by which point
                 the stage is long pinned, so this changes nothing today; it is
                 kept because the rule is the scenes' rule and a beat placed
                 nearer the top of a chapter would otherwise surface halfway up
                 the window with no warning. */
              const shown = reduced ? (ci === 0 && bi === 0 ? 1 : 0) : near * reveal;
              /* Signed distance from this beat's own point, in chapter
                 progress: negative on the way in, zero as it is reached,
                 positive on the way out. Multiplied out it is the line's
                 travel, so the words climb past the reader at the speed the
                 scroll is going rather than sitting still and dimming. */
              const travel =
                reduced || !wide ? 0 : -(locals[ci] - b.at) * BEAT_TRAVEL_VH;
              return (
                <div
                  key={`${c.id}-${bi}`}
                  aria-hidden={shown < 0.5}
                  /* AND OUT OF THE TAB ORDER. `aria-hidden` takes the block out
                     of the accessibility tree and `pointer-events: none` takes
                     it away from the mouse, but neither, nor `opacity: 0`,
                     removes an <a href> from keyboard focus: without this a
                     reader tabbing through the page walks every category link
                     on it, including the seven that are invisible. */
                  inert={shown < 0.5}
                  /* TWO LAYOUTS, ONE BLOCK, AND NEITHER OF THEM FLOATS.
                     The copy used to sit wherever the bottom of the frame left
                     room, which on a phone put it under whatever the scene
                     happened to be doing there. It now has a reserved half of
                     the screen in both directions.

                     Phone: the bottom two fifths, centred in it. The scene is
                     lifted into the top three fifths to match, in
                     chapters/System, so the two never share space.

                     Desktop: the left half, centred down the side, ranged left.
                     The system already sits right of centre at every camera
                     stop (focusX 0.62 to 0.72), so the picture is on one side
                     and the words are on the other without the scene moving. */
                  className="absolute inset-x-0 bottom-0 flex h-[40%] flex-col items-center justify-center px-6 text-center transition-opacity duration-500 motion-reduce:transition-none lg:inset-y-0 lg:h-full lg:w-1/2 lg:items-start lg:justify-center lg:pl-16 lg:pr-8 lg:text-left xl:pl-24"
                  style={{
                    opacity: shown,
                    /* No transition on the transform. Opacity is eased because
                       it is a state change; this is a position read straight
                       off the scroll, and easing it would make the words lag
                       the scene they are supposed to be moving with. */
                    transform: travel ? `translate3d(0, ${travel}vh, 0)` : undefined,
                    pointerEvents: shown > 0.5 ? "auto" : "none",
                  }}
                >
                  <div className="w-full max-w-[34rem] lg:max-w-[44rem]">
                    {b.eyebrow && (
                      <p className="font-grotesk mb-4 flex items-center justify-center gap-4 text-[0.8rem] font-bold uppercase tracking-[0.18em] text-white/55 lg:justify-start">
                        <span className="tabular-nums">{b.eyebrow}</span>
                        <span aria-hidden className="block h-px w-10 bg-white/30" />
                      </p>
                    )}
                    {/* SPACE GROTESK, AT THE HUB'S OWN SCALE, LIGHTING WORD BY
                        WORD. `shown` is already a 0-to-1 ramp that runs as the
                        beat comes up, so it is exactly the progress the reveal
                        wants and no second listener is needed. The accent is
                        the site's two-tone treatment, kept here and dropped in
                        the opener: over a scene this dark the red reads, and it
                        is what marks the category name apart from the sentence
                        under it. */}
                    <h2 className="font-grotesk hub-heading font-bold uppercase text-white">
                      <WordReveal
                        text={b.title}
                        p={shown}
                        accentFrom={Math.max(0, b.title.trimEnd().split(" ").length - 1)}
                      />
                    </h2>
                    {b.body && (
                      <p className="mx-auto mt-5 max-w-[34rem] text-[0.98rem] leading-[1.6] text-white/65 lg:mx-0 lg:text-[1.02rem]">
                        {b.body}
                      </p>
                    )}
                    {b.href && <ServiceChip href={b.href} />}
                  </div>
                </div>
              );
            }),
          )}
        </div>

        {/* How far through the climb you are. */}
        <ol
          aria-hidden
          className="pointer-events-none absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 sm:right-8"
        >
          {chapters.map((c, i) => (
            <li
              key={c.id}
              className="w-px transition-all duration-500 motion-reduce:transition-none"
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

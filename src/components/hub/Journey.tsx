"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { AccentedTitle } from "@/components/hub/AccentedTitle";
import { Starfield } from "@/components/hub/Starfield";
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
              const shown = reduced ? (ci === 0 && bi === 0 ? 1 : 0) : near;
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
                  className="absolute inset-x-0 bottom-0 px-6 pb-[13vh] transition-opacity duration-500 motion-reduce:transition-none sm:px-10 lg:px-20"
                  style={{ opacity: shown, pointerEvents: shown > 0.5 ? "auto" : "none" }}
                >
                  <div className="max-w-[38rem]">
                    {b.eyebrow && (
                      <p className="font-display mb-3 flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-wide text-white/50">
                        <span className="tabular-nums">{b.eyebrow}</span>
                        <span aria-hidden className="block h-px w-8 bg-white/25" />
                      </p>
                    )}
                    {/* The site's own heading, at the section scale. */}
                    <h2 className="font-display display-lg font-extrabold uppercase text-white">
                      <AccentedTitle text={b.title} />
                    </h2>
                    {b.body && (
                      <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-white/60">{b.body}</p>
                    )}
                    {b.href && (
                      <a
                        href={b.href}
                        className="group mt-6 inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white"
                      >
                        See the service
                        <span
                          aria-hidden
                          className="block h-px w-8 bg-brand transition-all duration-500 group-hover:w-14 motion-reduce:transition-none"
                        />
                      </a>
                    )}
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

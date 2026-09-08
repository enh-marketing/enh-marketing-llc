"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
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
 *  REDUCED MOTION pins the whole thing to the opening of chapter one and
 *  mounts nothing else. Each scene separately holds a still frame of its own,
 *  so what a reader gets is one picture and the words that go with it. */

export type Chapter = {
  id: string;
  /** How many viewports of scroll this chapter owns. */
  viewports: number;
  /** The scene. `t` is 0 to 1 within this chapter; `level` is its fade. */
  Scene: ComponentType<{ t: number; level: number }>;
  beats: Beat[];
};

/** Share of the track given to the cross-fade on each side of a join. */
const FADE = 0.055;

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

export function Journey({ chapters }: { chapters: Chapter[] }) {
  const trackRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [p, setP] = useState(0);

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
              style={{ opacity: levels[i], zIndex: i === lead ? 2 : 1 }}
            >
              <c.Scene t={locals[i]} level={levels[i]} />
            </div>
          ) : null,
        )}

        {/* The story. Every beat of the leading chapter stays mounted and
            fades, so none of them remount as the reader moves. */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {chapters.map((c, ci) =>
            c.beats.map((b, bi) => {
              const near = ci === lead ? 1 - clamp(Math.abs(locals[ci] - b.at) / 0.22, 0, 1) : 0;
              const shown = reduced ? (ci === 0 && bi === 0 ? 1 : 0) : near;
              return (
                <div
                  key={`${c.id}-${bi}`}
                  aria-hidden={shown < 0.5}
                  className="absolute inset-x-0 bottom-0 px-6 pb-[13vh] transition-opacity duration-500 motion-reduce:transition-none sm:px-10 lg:px-20"
                  style={{ opacity: shown, pointerEvents: shown > 0.5 ? "auto" : "none" }}
                >
                  <div className="max-w-[38rem]">
                    {b.eyebrow && (
                      <p className="font-display mb-3 flex items-center gap-3 text-[0.6875rem] font-extrabold uppercase tracking-[0.2em] text-white/50">
                        <span className="tabular-nums">{b.eyebrow}</span>
                        <span aria-hidden className="block h-px w-8 bg-white/25" />
                      </p>
                    )}
                    <h2 className="text-[2rem] font-light leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.5rem]">
                      {b.title}
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

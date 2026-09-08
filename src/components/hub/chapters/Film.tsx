"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** The film chapter: a generated take, scrubbed by the reader.
 *
 *  WHAT THIS IS. The drawn version of this page moves a camera through a scene
 *  it renders live. This one plays no video at all: it holds a single ten-second
 *  take and seeks it to whatever frame the scroll asks for. Playback time is
 *  irrelevant because it is never played; what matters is that 300 frames exist
 *  and that they are spent where the eye is moving.
 *
 *  THE FILM CUTS, AND THE CUTS ARE THE STRUCTURE. The take was asked for as one
 *  unbroken shot and is not: sampled every second frame and differenced, it has
 *  two hard cuts, at 1.533s and 4.533s, against a median frame-to-frame
 *  difference of 14 and a peak of 58. Rather than hide them, the stations below
 *  are placed so both land in the gap between two categories, with nothing on
 *  screen and the reader already moving. A cut you arrive at between sections
 *  reads as a section change. Measured: at 1.533s the reader is at 0.188 of the
 *  chapter, 0.058 from the nearest beat, and at 4.533s at 0.541, 0.061 away.
 *  The beat window is out by 0.05, so no line is lit at either.
 *
 *  IT HOLDS WHERE THE COPY IS. Film time is not linear in scroll. Each station
 *  carries a plateau the width of the beat's own full-strength window, so the
 *  picture stops while a category is being read and moves between them. That is
 *  what makes 300 frames enough: they are all spent in the transitions rather
 *  than being wasted under stationary text.
 *
 *  IT CARRIES ITS OWN SCRIM. The drawn page never needed one: its scene is
 *  near-black everywhere, so white copy sits on it unaided. A film does not
 *  behave, and half of this one is a lit snowfield or the face of the Earth,
 *  where the body copy was competing with the picture. The gradient below is
 *  part of the scene rather than part of the machine, so the drawn page is not
 *  darkened to solve a problem it does not have.
 *
 *  NO REACT IN THE SEEK. `t` arrives as a prop, but the seek is applied from
 *  GSAP's ticker against a ref, with a guard so a new seek is not issued while
 *  the last is still in flight. Seeks are asynchronous and queueing them per
 *  render thrashes the decoder. */

/** Where the film's own cuts are, in seconds. Measured, not guessed. */
export const FILM_CUTS = [1.533, 4.533];

/** Half-width of the plateau at each station, in chapter progress. Matches the
 *  beat window's own hold so the picture is still exactly while the line is at
 *  full strength. */
const HOLD = 0.018;

/** Chapter progress against film time. The `at` values line up with the beats
 *  in content/ai-hub-film.ts; changing one means changing the other. */
const STATIONS: Array<[number, number]> = [
  [0.0, 0.1],
  [0.02, 0.3], // the opener, on the mountain
  [0.13, 1.15], // 01, still shot A          ── cut at 1.533 falls after this
  [0.26, 2.05], // 02, the aerial
  [0.37, 2.85], // 03, Earth from orbit
  [0.48, 4.1], // 04, Earth whole            ── cut at 4.533 falls after this
  [0.61, 5.05], // 05, the station passes
  [0.72, 6.3], // 06, out past the planets
  [0.83, 7.7], // 07, interstellar
  [0.94, 9.1], // 08, the black hole
  [1.0, 9.95],
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Film time for a point in the chapter, with a flat plateau at each station. */
export function filmTimeAt(t: number): number {
  const p = clamp(t, 0, 1);

  for (let i = 0; i < STATIONS.length; i++) {
    const [sp, ss] = STATIONS[i];
    if (Math.abs(p - sp) <= HOLD) return ss;
  }

  for (let i = 0; i < STATIONS.length - 1; i++) {
    const [ap, as] = STATIONS[i];
    const [bp, bs] = STATIONS[i + 1];
    const from = ap + HOLD;
    const to = bp - HOLD;
    if (p >= from && p <= to) {
      const k = to === from ? 0 : (p - from) / (to - from);
      return as + (bs - as) * k;
    }
  }

  return p < STATIONS[0][0] ? STATIONS[0][1] : STATIONS[STATIONS.length - 1][1];
}

export function Film({ t }: { t: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const want = useRef(0);

  useEffect(() => {
    want.current = filmTimeAt(t);
  }, [t]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;

    /* Safari will not seek a video that has never been allowed to play. One
       muted play/pause, best effort, and it becomes seekable. */
    const unlock = () => {
      el.play().then(() => el.pause()).catch(() => {});
    };
    unlock();
    window.addEventListener("pointerdown", unlock, { once: true });

    let seeking = false;
    const onSeeked = () => {
      seeking = false;
    };
    el.addEventListener("seeked", onSeeked);

    const apply = () => {
      if (seeking || el.readyState < 2) return;
      const to = want.current;
      // A frame is 1/30s; anything closer than half of that is already right.
      if (Math.abs(el.currentTime - to) < 1 / 60) return;
      seeking = true;
      el.currentTime = to;
    };

    gsap.ticker.add(apply);
    return () => {
      gsap.ticker.remove(apply);
      el.removeEventListener("seeked", onSeeked);
      window.removeEventListener("pointerdown", unlock);
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-black">
      <video
        ref={video}
        className="h-full w-full object-cover"
        src="/ai-hub/journey-480p.mp4"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.72) 22%, rgba(0,0,0,0.4) 52%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}

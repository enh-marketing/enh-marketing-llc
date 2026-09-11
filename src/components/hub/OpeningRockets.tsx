"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { OpeningLine, OpeningStandfirst } from "@/components/hub/OpeningLine";

/** The opening, on a looping film of a rocket leaving a lit Earth.
 *
 *  THE FOOTAGE IS DIVIJ'S, generated and handed over as an 17.8MB file for five
 *  seconds, which is about 28 megabits a second: a raw export, not a web asset.
 *  It is re-encoded to 720p H.264 here and serves at 4.0MB from our own origin,
 *  with a poster frame cut from it so the first paint is instant and the film
 *  arrives behind it. There is no ffmpeg on this machine; macOS ships
 *  avconvert, which is what did it.
 *
 *  WHY IT WORKS FOR THIS PAGE, beyond looking expensive: there is a sun on the
 *  limb at the right, and the page's whole spine is a sun carried from the
 *  opening into the orbital chapter. The city lights webbing across the night
 *  side read as a network without anybody having to draw a neural diagram, and
 *  a rocket going up is the line the page already says.
 *
 *  AND WHAT IS NOT DONE, SO IT IS NOT DISCOVERED LATER. sun.ts holds one sun
 *  for the whole site and it is the cupola's, measured at (0.7662, 0.2929).
 *  This film's sun is somewhere else, so chapter two opens where the cupola's
 *  light was rather than where this one is. Same caveat as hub/OpeningRobot.
 *  Making it per-opening means threading a sun through the chapter machine,
 *  which is a change to the live page and not to a variant.
 *
 *  THE LOOP POINT IS NOT GRADED. Five seconds of generated footage does not cut
 *  back to its own first frame cleanly, and nothing here hides the join. It is
 *  a thing to watch for rather than a thing I have fixed. */
export function OpeningRockets() {
  const video = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  /* REDUCED MOTION GETS THE POSTER AND NOTHING ELSE. A hero that loops for ever
     is the exact thing the setting is asking us not to do, and the still is a
     complete picture on its own.

     THERE IS NO `autoplay` ATTRIBUTE, WHICH IS WHY THIS EFFECT EXISTS. The
     attribute would start the film before anything could ask whether the reader
     wants motion, and it cannot be conditioned on a media query. Starting it
     here means the reduced-motion branch never starts it at all. */
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }
    /* Autoplay can be refused even muted; if it is, the poster stays, which is
       a still photograph rather than a black rectangle. */
    void el.play().catch(() => {});
  }, [reduced]);

  return (
    <section
      data-section="AI Hub opener"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <video
        ref={video}
        src="/hero/rockets.mp4"
        poster="/hero/rockets-poster.jpg"
        muted
        loop
        playsInline
        /* `metadata`, not `auto`. Autoplay pulls the file down regardless, but
           this way the poster is what the first paint waits on and the network
           is not asked for four megabytes before anything is on screen. */
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* THE FILM IS BRIGHT WHERE THE SUN IS AND WHERE THE CITY LIGHTS ARE, and
          both are in the lower right. A falloff from the top and up the left
          gives the copy a ground without greying the picture: the rocket, the
          trail and the sun all sit outside it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(4,6,11,0.78) 0%, rgba(4,6,11,0.55) 34%, rgba(4,6,11,0.12) 62%, rgba(4,6,11,0) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-20">
        <OpeningLine />
        <OpeningStandfirst />
      </div>
    </section>
  );
}

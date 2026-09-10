"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { GLOW, glowAt, sunInBox } from "@/components/hub/sun";

/** The light on the photograph's sun.
 *
 *  WHAT IT IS FOR. The picture's sun and the star the planets go round are
 *  meant to be the same object at two distances, so the sun has to be more than
 *  a detail in a photograph before the page can hand it over: it wakes, burns
 *  through the frame, and goes out behind the mountain as the frame leaves.
 *
 *  IT IS A LAYER OF THE PARALLAX, NOT AN OVERLAY. It is stacked immediately
 *  above the back layer and below the mountain, so the peak and the figure
 *  standing on it cut into it, which is what a light behind a thing looks like.
 *  As an overlay on top it lit the man through his own body. It also travels at
 *  the back layer's rate, which is the sun's rate, so it cannot drift off the
 *  sun it belongs to however the picture moves. That leaves it with no position
 *  of its own to get wrong: all it does is brighten and swell.
 *
 *  IT IS OUT BEFORE THE NEXT SCENE ARRIVES. Two lights in one frame is the
 *  thing this is supposed to prevent, so it is finished at 0.86 of a viewport
 *  and the orbital chapter does not begin to show until 0.88. The star that
 *  comes down from the top of the next scene is the same one, seen from much
 *  closer, and nothing has to merge on screen for that to read.
 *
 *  NO REACT IN THE LOOP. Scale and opacity are written straight to the element
 *  from GSAP's ticker, which Lenis drives. It reads its scroll from the
 *  opener's own box, which is never transformed, rather than from the layer
 *  around it, which is. */

export function SunBridge({ frame }: { frame: RefObject<HTMLElement | null> }) {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    const box = frame.current;
    if (!el || !box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let last = NaN;

    const draw = () => {
      const r = box.getBoundingClientRect();
      const scrolled = -r.top;
      if (scrolled === last) return;
      last = scrolled;

      const at = glowAt(r.height, scrolled);
      el.style.opacity = `${at.opacity}`;
      el.style.transform = `translate(-50%, -50%) scale(${at.scale})`;
      el.style.visibility = at.opacity < 0.002 ? "hidden" : "visible";
    };

    const place = () => {
      const r = box.getBoundingClientRect();
      const at = sunInBox(r.width, r.height);
      const d = Math.min(r.width, r.height) * GLOW.size;
      el.style.left = `${at.x}px`;
      el.style.top = `${at.y}px`;
      el.style.width = `${d}px`;
      el.style.height = `${d}px`;
      last = NaN;
      draw();
    };

    place();
    gsap.ticker.add(draw);
    window.addEventListener("resize", place);
    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", place);
    };
  }, [frame]);

  return (
    <div
      ref={glow}
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{
        visibility: "hidden",
        opacity: 0,
        willChange: "transform, opacity",
        /* The orbital component draws its Sun in #FFF2CC and runs its haze out
           through 255,190,110. Same light, same falloff. The stops are dense in
           the middle and long at the edge because an even ramp left a visible
           rim where it reached zero, and at size that rim read as a planet. */
        background:
          "radial-gradient(circle, rgba(255,250,238,0.98) 0%, rgba(255,247,226,0.72) 12%, rgba(255,242,204,0.4) 26%, rgba(255,226,170,0.19) 42%, rgba(255,206,140,0.08) 60%, rgba(255,190,110,0.025) 78%, rgba(255,180,100,0) 100%)",
      }}
    />
  );
}

"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { bridgeAt } from "@/components/hub/sun";

/** The light that carries from the mountain into space.
 *
 *  WHAT IT IS FOR. The photograph's sun and the star at the centre of the
 *  orbital system are meant to be the same object, so the page cannot cut
 *  between them: the moment the mountain has gone, something has to still be
 *  burning in that exact spot. This is that something. It sits on the
 *  photograph's sun, brightens and swells as the frame drops away beneath it,
 *  and is still there when the canvas draws its own Sun in the same place, at
 *  which point it fades out and the real one takes over.
 *
 *  IT DOES NOT MOVE, AND THAT IS THE POINT. Everything else in the opener is
 *  travelling: the frame rises, the layers slide at four different rates. The
 *  sun goes with the furthest layer, so it drifts up at under a third of the
 *  page's speed, and once the frame is gone it stops altogether. Reading the
 *  scene as scale rather than as scrolling is exactly this: the nearest ridge
 *  leaves immediately, the star does not, because it is a hundred and fifty
 *  million kilometres away.
 *
 *  NO REACT IN THE LOOP. Position, scale and opacity are written straight to
 *  the element from a ScrollTrigger update, which Lenis drives on GSAP's
 *  ticker. Routing this through state would put a render in every frame of the
 *  animation, which is what made the parallax step rather than flow the last
 *  time and is not a mistake worth making twice.
 *
 *  It reads its scroll position from the opener's own box rather than from
 *  `window.scrollY`, so it does not care how scrolling is implemented.
 *
 *  WHY THE TICKER AND NOT A SCROLLTRIGGER. The first version drove this from
 *  `ScrollTrigger.create({ trigger: box })`, and its updates stopped the moment
 *  the opener's box left the viewport, which is precisely when this element
 *  still has work to do: measured, the glow was frozen at full strength and
 *  full size for the whole of the fade-out. GSAP's ticker has no such range. It
 *  reads one box and writes three properties per frame, and it is removed on
 *  unmount, which is the leak the delivered component left behind.
 *
 *  WHERE THE MATHS LIVES. In hub/sun.ts, as a pure function of viewport and
 *  scroll, so it can be checked without a browser and so the orbital chapter
 *  can read the same landing point rather than being told it twice. */

/** Its diameter at rest, as a fraction of the smaller viewport side. How much
 *  it grows from there is part of the crossing, in hub/sun.ts. */
const SIZE = 0.15;

export function SunBridge({ frame }: { frame: RefObject<HTMLElement | null> }) {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glow.current;
    const box = frame.current;
    if (!el || !box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let last = NaN;

    const draw = () => {
      // How far the opener has been scrolled, from its own box: independent of
      // whether scrolling is native, smoothed or virtualised.
      const scrolled = -box.getBoundingClientRect().top;
      if (scrolled === last) return;
      last = scrolled;

      const at = bridgeAt(window.innerWidth, window.innerHeight, scrolled);

      el.style.opacity = `${at.opacity}`;
      el.style.transform = `translate3d(${at.x}px, ${at.y}px, 0) translate(-50%, -50%) scale(${at.scale})`;
      el.style.visibility = at.opacity < 0.002 ? "hidden" : "visible";
    };

    const size = () => {
      const d = Math.min(window.innerWidth, window.innerHeight) * SIZE;
      el.style.width = `${d}px`;
      el.style.height = `${d}px`;
      last = NaN;
      draw();
    };

    size();
    gsap.ticker.add(draw);
    window.addEventListener("resize", size);
    return () => {
      gsap.ticker.remove(draw);
      window.removeEventListener("resize", size);
    };
  }, [frame]);

  return (
    <div
      ref={glow}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-20 rounded-full"
      style={{
        visibility: "hidden",
        opacity: 0,
        willChange: "transform, opacity",
        /* The orbital component draws its Sun in #FFF2CC, and its haze runs
           out through 255,190,110. Same light, same falloff.

           The stops are close together near the middle and long at the edge on
           purpose: an even ramp gave the thing a visible rim at the radius
           where it finally hit zero, and at full size that rim read as a disc,
           a planet rather than a glare. Reaching zero only at the very edge
           leaves nothing to see the end of. */
        background:
          "radial-gradient(circle, rgba(255,250,238,0.98) 0%, rgba(255,247,226,0.72) 12%, rgba(255,242,204,0.4) 26%, rgba(255,226,170,0.19) 42%, rgba(255,206,140,0.08) 60%, rgba(255,190,110,0.025) 78%, rgba(255,180,100,0) 100%)",
      }}
    />
  );
}

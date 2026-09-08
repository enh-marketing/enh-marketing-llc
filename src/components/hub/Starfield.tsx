"use client";

import { useEffect, useRef } from "react";

/** The sky the whole journey is set against.
 *
 *  WHY THE PAGE DRAWS ITS OWN. Both imported scenes carry a star field and
 *  neither can be relied on for this. The orbital component seeds its stars
 *  into the frustum of whatever camera it had at the time and only
 *  redistributes them as they leave and are recycled, so at the angle this
 *  chapter settles into they bunch into one corner and stay there: measured at
 *  the chart stop, 77 lit samples across the top third of the frame, 53 of them
 *  in the leftmost fifth and none in the rightmost. Raising its `starCount`
 *  does not help, because more stars bunch in the same place, and it cannot be
 *  raised after mount anyway. The black hole is worse: it ships with
 *  `starBrightness` at 0 and draws no stars at all.
 *
 *  So the sky is ours and it is one layer, behind every chapter, unchanged by
 *  what any of them does to its own camera. That is also what makes it continue
 *  across the joins instead of being three different skies that cross-fade.
 *
 *  IT DOES NOT MOVE, AND THAT IS DELIBERATE. Everything else on this page is
 *  travelling; the stars are the fixed thing that makes the travelling legible.
 *  They are also the cheapest possible layer: drawn once, and again only when
 *  the box changes size. No animation frame, no scroll listener, nothing per
 *  frame at all.
 *
 *  NOTHING IS RANDOM AT RUNTIME. Positions, sizes and brightnesses come from a
 *  hash of the index, so the sky is identical on every load and on the server,
 *  the same reason the orbital component's own plane fan is a fixed table. */

/** Stars per million square pixels, so a phone and a desktop get a sky of the
 *  same density rather than the same count. */
const PER_MEGAPIXEL = 1450;
const MAX_STARS = 2600;

function hash(n: number): number {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

export function Starfield() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const draw = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);

      const ctx = el.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const count = Math.min(MAX_STARS, Math.round(((w * h) / 1e6) * PER_MEGAPIXEL));

      for (let i = 0; i < count; i++) {
        const x = hash(i * 3 + 1) * w;
        const y = hash(i * 3 + 2) * h;

        /* Raised to a power so most are faint and a few are not, which is what
           a sky looks like. A flat distribution reads as noise. */
        const mag = Math.pow(hash(i * 3 + 3), 2.6);
        const alpha = 0.16 + mag * 0.78;
        const size = 0.5 + mag * 1.5;

        /* A few carry a little colour, most are white. */
        const tint = hash(i * 7 + 11);
        const col = tint > 0.94 ? "175,205,255" : tint < 0.05 ? "255,214,170" : "255,255,255";

        ctx.fillStyle = `rgba(${col},${alpha.toFixed(3)})`;
        if (size < 1.05) {
          ctx.fillRect(x, y, size, size);
        } else {
          ctx.beginPath();
          ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

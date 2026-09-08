"use client";

import { useEffect, useRef } from "react";

/** The planets leaving their orbits.
 *
 *  THE SAME PLANETS, NOT NEW ONES. This is the whole point and the first
 *  version got it wrong: it threw fresh points out of the Sun while the
 *  component's own planets faded underneath, so what you saw was one set of
 *  things being born and another set dying. What has to happen is that the
 *  planets already on screen, at the positions they are already in, stop
 *  following their paths and go.
 *
 *  WHY THEY ARE READ OFF THE CANVAS. Orbital exposes nothing: no ref, no
 *  callback, no way to ask where a planet is. Its positions come from a Kepler
 *  solve against an internal clock that starts at mount and pauses on
 *  visibility, so they cannot be recomputed out here either without mirroring
 *  that clock exactly and hoping. But the planets are the only bright,
 *  saturated things it draws. Everything else is white stars, a white Sun, or
 *  dim wake. So at the instant the scatter starts, the canvas is read once and
 *  the brightest saturated peaks are taken, with their colours, straight from
 *  the pixels. That is not an approximation of where the planets are: it is
 *  where they are, and the colours are theirs because they were sampled from
 *  them.
 *
 *  ONE READ, NOT PER FRAME. getImageData on a full canvas is far too expensive
 *  to repeat, so it happens once, on the first frame of the scatter, while the
 *  component's own planets are still at full strength. From then on the capture
 *  is replayed and nothing is sampled again.
 *
 *  THEY LEAVE OUTWARD. Each captured point flies away from the Sun along the
 *  line it was already on, which is what going off a circular path looks like,
 *  with a small fixed curl so the field does not read as a starburst. The
 *  component's planets fade out underneath over the same stretch, so the swap
 *  happens while both are in the same place. */

const MIN_SEPARATION = 34;
const MAX_POINTS = 14;

type Seed = { x: number; y: number; r: number; g: number; b: number; size: number };

/** Deterministic 0..1 from an integer, so a given capture always flies the
 *  same way. */
function hash(n: number): number {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

/** The bright saturated peaks on the orbital canvas: its planets, with the
 *  colours they are actually drawn in. */
function capture(src: HTMLCanvasElement): { seeds: Seed[]; sun: { x: number; y: number } } | null {
  const ctx = src.getContext("2d", { willReadFrequently: true });
  if (!ctx || !src.width || !src.height) return null;

  let px: Uint8ClampedArray;
  try {
    px = ctx.getImageData(0, 0, src.width, src.height).data;
  } catch {
    return null;
  }

  const rect = src.getBoundingClientRect();
  const scale = rect.width / src.width;
  const step = 2;

  const found: Array<Seed & { score: number }> = [];
  let sunX = 0, sunY = 0, sunScore = -1;

  for (let y = 0; y < src.height; y += step) {
    for (let x = 0; x < src.width; x += step) {
      const i = (y * src.width + x) * 4;
      const r = px[i], g = px[i + 1], b = px[i + 2];
      const mx = Math.max(r, g, b);
      const mn = Math.min(r, g, b);

      // The Sun is the brightest thing with no colour in it.
      if (mx > 200 && mx - mn < 40) {
        const s = mx + (255 - (mx - mn));
        if (s > sunScore) { sunScore = s; sunX = x * scale; sunY = y * scale; }
      }

      // A planet is bright and saturated. Wake is one or the other, not both.
      if (mx > 90 && mx - mn > 55) {
        found.push({ x: x * scale, y: y * scale, r, g, b, size: 0, score: mx * (mx - mn) });
      }
    }
  }

  if (found.length < 3) return null;

  found.sort((a, b) => b.score - a.score);
  const seeds: Seed[] = [];
  for (const c of found) {
    if (seeds.length >= MAX_POINTS) break;
    let clear = true;
    for (const s of seeds) {
      if (Math.hypot(s.x - c.x, s.y - c.y) < MIN_SEPARATION) { clear = false; break; }
    }
    if (clear) seeds.push({ x: c.x, y: c.y, r: c.r, g: c.g, b: c.b, size: 1.6 + hash(seeds.length + 7) * 2.2 });
  }

  if (!seeds.length) return null;
  if (sunScore < 0) {
    sunX = rect.width / 2;
    sunY = rect.height / 2;
  }
  return { seeds, sun: { x: sunX, y: sunY } };
}

export function ScatterField({ p, onCapture }: { p: number; onCapture?: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const at = useRef(0);
  const taken = useRef<{ seeds: Seed[]; sun: { x: number; y: number } } | null>(null);

  useEffect(() => {
    at.current = Math.max(0, Math.min(1, p));
  }, [p]);

  useEffect(() => {
    const el = canvas.current;
    const host = el?.closest("[data-orbital-host]") as HTMLElement | null;
    if (!el || !host) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = NaN;

    const draw = () => {
      const k = at.current;
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (el.width !== Math.round(w * dpr) || el.height !== Math.round(h * dpr)) {
        el.width = Math.round(w * dpr);
        el.height = Math.round(h * dpr);
        last = NaN;
      }
      if (k === last) return;
      last = k;

      const ctx = el.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      /* Read the planets off the scene once, BEFORE any of this is visible.
         The chapter mounts this a little ahead of the scatter and holds `p` at
         zero until it starts, so the capture lands while the component is still
         drawing its planets at full strength. Taking it on the first frame of
         the scatter instead was a race: a fast scroll can put the reader well
         into the leg on the very first frame, by which point the originals have
         already faded and there is nothing left to read. */
      if (!taken.current) {
        const src = host.querySelector("canvas");
        if (src && src !== el) taken.current = capture(src as HTMLCanvasElement);
        /* Tells the chapter it is safe to take the originals away. Until this
           fires they must keep being drawn, or there is nothing to read: a
           reader who lands in the middle of this leg, from a restored scroll
           position or a deep link, arrives after the point where a
           progress-driven fade would already have removed them. */
        if (taken.current) onCapture?.();
      }
      if (k <= 0 || !taken.current) return;

      const { seeds, sun } = taken.current;
      const reach = Math.hypot(w, h) * 1.1;
      const eased = k * k * (3 - 2 * k);
      const alpha = 1 - Math.max(0, (k - 0.82) / 0.18);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i];
        const colour = `rgb(${s.r},${s.g},${s.b})`;

        /* Away from the Sun along the line it was already on: leaving a circular
           path means going straight on, outward. A small fixed curl per point
           keeps the field from reading as a starburst. */
        const dx = s.x - sun.x;
        const dy = s.y - sun.y;
        const d = Math.hypot(dx, dy) || 1;
        const base = Math.atan2(dy, dx);
        const curl = (hash(i + 53) - 0.5) * 0.9;
        const speed = 0.55 + hash(i + 131) * 0.8;

        const pts: Array<[number, number]> = [];
        for (let q = 0; q <= 16; q++) {
          const back = Math.max(0, eased - q * 0.02);
          const rr = d + back * reach * speed;
          const aa = base + back * curl;
          pts.push([sun.x + Math.cos(aa) * rr, sun.y + Math.sin(aa) * rr]);
        }

        ctx.strokeStyle = colour;
        ctx.lineCap = "round";
        for (let q = 1; q < pts.length; q++) {
          const f = 1 - q / pts.length;
          ctx.globalAlpha = alpha * 0.45 * f * f;
          ctx.lineWidth = s.size * f;
          ctx.beginPath();
          ctx.moveTo(pts[q - 1][0], pts[q - 1][1]);
          ctx.lineTo(pts[q][0], pts[q][1]);
          ctx.stroke();
        }

        const [hx, hy] = pts[0];
        const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, s.size * 6);
        halo.addColorStop(0, colour);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = alpha * 0.5;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(hx, hy, s.size * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha;
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(hx, hy, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };

    draw();
    if (!still) raf = requestAnimationFrame(tick);
    window.addEventListener("resize", draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", draw);
    };
  }, [onCapture]);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

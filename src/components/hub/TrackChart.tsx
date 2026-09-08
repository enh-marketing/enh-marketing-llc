"use client";

import { useEffect, useRef } from "react";
import { chartPointAt, chartTravelled, chartFocus } from "@/components/hub/chartPath";

/** The Sun travelling a chart, with nothing else moving.
 *
 *  WHY THE SUN IS DRAWN HERE NOW. The version before drove the component's
 *  `focus`, which does move its real Sun along the path, and moves the entire
 *  scene with it: `focus` is the camera centre, so the star field rode up the
 *  chart too and the whole frame swung. There is no prop that moves the Sun
 *  alone. So the component is dimmed to nothing over the run-in, which leaves
 *  its star field untouched because the stars are the one thing its `glow` does
 *  not scale, and the Sun is drawn here instead, travelling the path over a sky
 *  that holds perfectly still.
 *
 *  THE ONE THING THAT SURVIVES THE DIMMING is the Sun's own core, a hard white
 *  disc drawn at a fixed alpha that `glow` never touches. It is about 12px
 *  across and it is still sitting where the camera left it, so it is covered
 *  here, at a position derived from the same arithmetic the component uses to
 *  place it. On a black sky a disc that size is nothing; the alternative was to
 *  push `focus` off frame, which takes the stars with it again.
 *
 *  NO GUIDE LINE AND NO COMPANIONS. The route used to be drawn faint ahead of
 *  the Sun, with the planets' lines beside it. Both are gone: what is left is
 *  the Sun and the line it is drawing behind itself, so the chart is something
 *  that happens rather than something already on screen being traced.
 *
 *  Corners, not curves. And no axes, ticks or numbers, because the source
 *  document for this category is explicit that dashboards are shown as shapes
 *  and never as values. */

export type TrackCamera = {
  spin: number;
  tilt: number;
  roll: number;
  focusX: number;
  focusY: number;
  lead: number;
  apex: [number, number];
};

const RAD = Math.PI / 180;

/** Where the component draws its Sun, in CSS pixels. Its own arithmetic:
 *  `focus` sets the camera centre and `lead` pushes the Sun off it along the
 *  on-screen direction of travel. The projection's scale cancels when that
 *  direction is normalised, so no zoom term is needed. */
export function sunScreenPosition(w: number, h: number, c: TrackCamera) {
  const l = c.apex[0] * RAD;
  const b = c.apex[1] * RAD;
  const D = { x: Math.cos(b) * Math.cos(l), y: Math.cos(b) * Math.sin(l), z: Math.sin(b) };

  const A = c.spin * RAD;
  const B = c.tilt * RAD;
  const C = c.roll * RAD;
  const ca = Math.cos(A), sa = Math.sin(A);
  const cb = Math.cos(B), sb = Math.sin(B);
  const cr = Math.cos(C), sr = Math.sin(C);

  const r = { x: ca, y: sa, z: 0 };
  const u = { x: -sa * cb, y: ca * cb, z: sb };
  const RIGHT = { x: r.x * cr + u.x * sr, y: r.y * cr + u.y * sr, z: r.z * cr + u.z * sr };
  const UP = { x: -r.x * sr + u.x * cr, y: -r.y * sr + u.y * cr, z: -r.z * sr + u.z * cr };

  const vx = D.x * RIGHT.x + D.y * RIGHT.y + D.z * RIGHT.z;
  const vy = D.x * UP.x + D.y * UP.y + D.z * UP.z;
  const len = Math.hypot(vx, -vy) || 1;
  const push = Math.min(w, h) * c.lead;

  return { x: w * c.focusX + (vx / len) * push, y: h * c.focusY + (-vy / len) * push };
}

export function TrackChart({ p, camera }: { p: number; camera: TrackCamera }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const at = useRef(0);

  useEffect(() => {
    at.current = Math.max(0, Math.min(1, p));
  }, [p]);

  useEffect(() => {
    const el = canvas.current;
    const host = el?.parentElement;
    if (!el || !host) return;

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
      if (k <= 0) return;

      /* Cover the component's residual Sun core, which its own dimming leaves
         behind. Sized from its formula, radius max(5, min(w,h) * 0.013), with a
         soft edge so nothing shows against the stars. */
      const stale = sunScreenPosition(w, h, camera);
      const coreR = Math.max(5, Math.min(w, h) * 0.013) * 1.9 + 4;
      const mask = ctx.createRadialGradient(stale.x, stale.y, 0, stale.x, stale.y, coreR);
      mask.addColorStop(0, "rgba(0,0,0,1)");
      mask.addColorStop(0.72, "rgba(0,0,0,1)");
      mask.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = mask;
      ctx.beginPath();
      ctx.arc(stale.x, stale.y, coreR, 0, Math.PI * 2);
      ctx.fill();

      /* The Sun: from where the component had it, onto the chart, then along
         it. `chartFocus` returns the whole journey in frame fractions. */
      const entry = { x: stale.x / w, y: stale.y / h };
      const spot = chartFocus(k, [entry.x, entry.y]);
      const sun = { x: spot[0] * w, y: spot[1] * h };
      const done = chartTravelled(k);

      ctx.lineJoin = "miter";
      ctx.miterLimit = 8;
      ctx.lineCap = "round";

      /* Behind it, the line it has drawn. Nothing ahead of it. */
      if (done > 0) {
        const pts: Array<[number, number]> = [];
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const [x, y] = chartPointAt((done * i) / steps);
          pts.push([x * w, y * h]);
        }
        const grad = ctx.createLinearGradient(sun.x, sun.y, pts[0][0], pts[0][1]);
        grad.addColorStop(0, "rgba(255,246,214,1)");
        grad.addColorStop(0.5, "rgba(255,206,110,0.55)");
        grad.addColorStop(1, "rgba(255,180,80,0.04)");
        ctx.strokeStyle = grad;
        const run = (width: number, alpha: number) => {
          ctx.globalAlpha = alpha;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
          ctx.stroke();
        };
        run(9, 0.14);
        run(3.4, 0.32);
        run(1.6, 1);
      }

      /* And the Sun itself, drawn to match the one it replaced. */
      const R = Math.max(5, Math.min(w, h) * 0.013);
      ctx.globalAlpha = 1;
      const halo = ctx.createRadialGradient(sun.x, sun.y, 0, sun.x, sun.y, R * 9);
      halo.addColorStop(0, "rgba(255,242,204,0.5)");
      halo.addColorStop(0.35, "rgba(255,206,110,0.16)");
      halo.addColorStop(1, "rgba(255,180,80,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, R * 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.97)";
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, R, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };

    draw();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", draw);
    };
  }, [camera]);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

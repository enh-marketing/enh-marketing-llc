"use client";

import { useEffect, useRef } from "react";
import { chartPolylineTo, chartTravelled, chartFocus } from "@/components/hub/chartPath";
import { drawStar } from "@/components/hub/star";

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

      /* THE MASK IS GONE WITH THE RUN-IN. It used to cover the residual core
         the orbital component's dimming left behind, because the chart was
         drawn over that component inside its chapter. The chart is its own
         chapter now, with nothing underneath it but the star field, so there is
         nothing to hide.

         The Sun simply walks the path, which begins where the voice left it. */
      const spot = chartFocus(k);
      const sun = { x: spot[0] * w, y: spot[1] * h };
      const done = chartTravelled(k);

      ctx.lineCap = "round";

      /* Behind it, the line it has drawn. Nothing ahead of it. */
      if (done > 0) {
        /* The path's own vertices, not samples of it. */
        const pts = chartPolylineTo(done).map(([x, y]) => [x * w, y * h] as [number, number]);
        const grad = ctx.createLinearGradient(sun.x, sun.y, pts[0][0], pts[0][1]);
        grad.addColorStop(0, "rgba(255,246,214,1)");
        grad.addColorStop(0.5, "rgba(255,206,110,0.55)");
        grad.addColorStop(1, "rgba(255,180,80,0.04)");
        ctx.strokeStyle = grad;

        /* THE WIDE STROKES TURN ROUND CORNERS, THE THIN ONE TURNS SHARP. A
           mitred join on a 9px stroke at a turn this tight throws a spike well
           past the line it is supposed to be haloing, and that spike is the
           fold that appeared at every corner. The halo is what carries the
           width, so it is the one that gives up the point; the 1.6px line that
           actually reads as the chart keeps its mitre. */
        const run = (width: number, alpha: number, join: CanvasLineJoin) => {
          ctx.lineJoin = join;
          ctx.miterLimit = join === "miter" ? 4 : 10;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
          ctx.stroke();
        };
        run(9, 0.14, "round");
        run(3.4, 0.32, "round");
        run(1.6, 1, "miter");
      }

      /* And the star itself. Shared with the uplink, which keeps one lit at
         this exact spot while the waveform plays, so the two cross-fade as the
         same object rather than as one going out and another coming on. */
      drawStar(ctx, sun.x, sun.y, w, h);
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

"use client";

import { useEffect, useRef } from "react";

/** The Sun's track, bent into a chart.
 *
 *  WHAT IT REPLACES. Orbital draws the Sun's own path through space as one
 *  straight line: `moveTo` at the Sun's exact centre, `lineTo` at a tail
 *  projected from the drift, stroked three times, wide and faint to thin and
 *  solid, under a gradient that runs from near-white at the Sun to nothing at
 *  the tail. By the time this chapter reaches its last stop that line is the
 *  only thing left on screen, every planet having drawn itself out into a long
 *  straight streak beside it and then gone. So the section about reporting is
 *  the moment that line stops being straight.
 *
 *  IT IS A HANDOVER, NOT AN OVERLAY. The component's own track is switched off
 *  the instant this appears, and at that instant this draws the identical line:
 *  same two endpoints, same three strokes at the same widths and alphas, same
 *  gradient stops. Nothing moves at the swap. Only afterwards does the middle
 *  of the line start to lift and fall.
 *
 *  BOTH ENDPOINTS ARE DERIVED, NOT MEASURED. The component exposes neither, but
 *  both follow from the props it was given. The head is the Sun: `focus` places
 *  the camera centre and `lead` pushes it off along the on-screen direction of
 *  travel. The tail is that point offset by `driftSpeed * trailYears * 1.1`
 *  against the course, through the same perspective divide the component uses.
 *  Which is why the camera is frozen for this whole stretch and why the
 *  component's pointer nudge is off: either would move the line out from under
 *  the arithmetic.
 *
 *  THE SHAPE IS A SHAPE. Two falls and two rises, ending on a rise into the
 *  Sun. There are no axes, no gridlines, no ticks and no numbers, and that is
 *  not a stylistic choice: the source document for this category is explicit
 *  that dashboards are shown as shapes and never as values, because a value on
 *  a marketing page is a claim about a client. This draws the movement of a
 *  chart and asserts nothing. */

export type TrackCamera = {
  spin: number;
  tilt: number;
  roll: number;
  focusX: number;
  focusY: number;
  lead: number;
  viewRadius: number;
  apex: [number, number];
};

const RAD = Math.PI / 180;
const SAMPLES = 160;

/** Head and tail of the Sun's track, in CSS pixels, from the props alone. */
export function trackEnds(
  w: number,
  h: number,
  c: TrackCamera,
  driftSpeed: number,
  trailYears: number,
) {
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
  const FWD = { x: sa * sb, y: -ca * sb, z: cb };

  const dR = D.x * RIGHT.x + D.y * RIGHT.y + D.z * RIGHT.z;
  const dU = D.x * UP.x + D.y * UP.y + D.z * UP.z;
  const dF = D.x * FWD.x + D.y * FWD.y + D.z * FWD.z;

  // The Sun: focus, pushed by lead along the on-screen direction of travel.
  const len = Math.hypot(dR, -dU) || 1;
  const push = Math.min(w, h) * c.lead;
  const hx = w * c.focusX + (dR / len) * push;
  const hy = h * c.focusY + (-dU / len) * push;

  // The tail: the same point, dragged back along the course, through the
  // component's own perspective divide.
  const back = driftSpeed * trailYears * 1.1;
  const pxPerAU = (Math.min(w, h) * 0.5) / c.viewRadius;
  const camDist = c.viewRadius * 3.1;
  const s = camDist / (camDist + back * dF);

  return {
    head: { x: hx, y: hy },
    tail: { x: hx - back * dR * pxPerAU * s, y: hy + back * dU * pxPerAU * s },
  };
}

/** Two falls and two rises along the line, zero at both ends so the drawn line
 *  still meets the Sun and the tail exactly where the straight one did. */
function profile(u: number): number {
  return Math.sin(u * Math.PI * 4) * 0.85 + Math.sin(u * Math.PI * 12) * 0.09;
}

export function TrackChart({
  p,
  camera,
  driftSpeed,
  trailYears,
}: {
  p: number;
  camera: TrackCamera;
  driftSpeed: number;
  trailYears: number;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const at = useRef(0);
  /* THE DRIFT IS LIVE, THE ANGLE IS NOT. The camera angle, zoom and focus are
     frozen for this whole leg, so they can be a constant. The drift is not:
     it falls from the value that straightened the paths to one that fits the
     whole line in frame, and the chart has to follow it exactly or it would
     draw a line of one length while the component drew another, and the
     handover would jump. */
  const drift = useRef(driftSpeed);
  const trail = useRef(trailYears);

  useEffect(() => {
    at.current = Math.max(0, Math.min(1, p));
    drift.current = driftSpeed;
    trail.current = trailYears;
  }, [p, driftSpeed, trailYears]);

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

      const { head, tail } = trackEnds(w, h, camera, drift.current, trail.current);
      const dx = head.x - tail.x;
      const dy = head.y - tail.y;
      const length = Math.hypot(dx, dy) || 1;
      // Perpendicular to the line, so the chart lifts and falls across it.
      const nx = -dy / length;
      const ny = dx / length;
      const amplitude = length * 0.14 * (k * k * (3 - 2 * k));

      const pts: Array<[number, number]> = [];
      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES;
        const off = profile(u) * amplitude;
        pts.push([tail.x + dx * u + nx * off, tail.y + dy * u + ny * off]);
      }

      /* The component's own three strokes, at its widths and alphas, under its
         gradient. At k just above zero this is its line, exactly. */
      const grad = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
      grad.addColorStop(0, "rgba(255,246,214,1)");
      grad.addColorStop(0.45, "rgba(255,206,110,0.55)");
      grad.addColorStop(1, "rgba(255,180,80,0)");
      ctx.strokeStyle = grad;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const path = () => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      };

      ctx.lineWidth = 11;
      ctx.globalAlpha = 0.16;
      path();
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.3;
      path();
      ctx.stroke();
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = 1;
      path();
      ctx.stroke();
      ctx.globalAlpha = 1;
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

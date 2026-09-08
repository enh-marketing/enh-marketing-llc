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
/** The planets' lines, drawn beside the Sun's: their colours, how far across
 *  the line each sits, and how far along it each stops short. They turn on the
 *  same corners, because on this page they were travelling with the Sun. */
const COMPANIONS: Array<{ colour: string; offset: number; from: number }> = [
  { colour: "#5fd8ff", offset: 0.17, from: 0.08 },
  { colour: "#ff9838", offset: -0.14, from: 0.2 },
  { colour: "#b48cff", offset: 0.3, from: 0.34 },
];

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

/** The chart, as corners.
 *
 *  A SHAPE WITH ANGLES, NOT A WAVE. The first version used a sine and read as a
 *  smooth S-bend, which is a curve and not a chart. A price line turns: it
 *  falls hard, snaps back, falls again, and runs up into the last point. Every
 *  vertex below is a corner, drawn as straight segments with a mitred join, and
 *  the last one lands on the Sun.
 *
 *  `u` runs 0 at the tail to 1 at the Sun; `v` is the offset across the line,
 *  negative below it. It ends at 0 because the line has to finish exactly on
 *  the Sun, which is the same point the component's straight track ended on. */
const VERTICES: Array<[number, number]> = [
  [0.0, -0.06],
  [0.16, -0.92],
  [0.34, -0.34],
  [0.53, -1.0],
  [0.72, -0.42],
  [0.86, -0.62],
  [1.0, 0.0],
];

/** How far along the line the tail can sit before it leaves the frame. The
 *  component's own tail is far outside it at the drift this chapter uses, which
 *  is right for a streak and wrong for a chart: a chart has to be seen whole.
 *  So the chart retracts to the last point on the same line that is still
 *  comfortably inside the viewport. */
function fittedLength(w: number, h: number, hx: number, hy: number, ux: number, uy: number) {
  const padX = w * 0.05;
  const padY = h * 0.06;
  let limit = Math.hypot(w, h);
  if (ux < -1e-6) limit = Math.min(limit, (hx - padX) / -ux);
  if (ux > 1e-6) limit = Math.min(limit, (w - padX - hx) / ux);
  if (uy < -1e-6) limit = Math.min(limit, (hy - padY) / -uy);
  if (uy > 1e-6) limit = Math.min(limit, (h - padY - hy) / uy);
  return Math.max(120, limit);
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

      const { head, tail: far } = trackEnds(w, h, camera, drift.current, trail.current);
      const ease = k * k * (3 - 2 * k);

      /* The line retracts from where the component's track ended to a length
         that fits the frame, while the corners come up. At k = 0 it is that
         track exactly, so the handover shows nothing. */
      const fx = far.x - head.x;
      const fy = far.y - head.y;
      const farLen = Math.hypot(fx, fy) || 1;
      const ux = fx / farLen;
      const uy = fy / farLen;
      const length = farLen + (fittedLength(w, h, head.x, head.y, ux, uy) - farLen) * ease;

      const tail = { x: head.x + ux * length, y: head.y + uy * length };
      const dx = head.x - tail.x;
      const dy = head.y - tail.y;
      // Perpendicular to the line, so the chart cuts up and down across it.
      const nx = -dy / length;
      const ny = dx / length;
      const amplitude = length * 0.2 * ease;

      const pts: Array<[number, number]> = VERTICES.map(([u, v]) => [
        tail.x + dx * u + nx * v * amplitude,
        tail.y + dy * u + ny * v * amplitude,
      ]);

      /* The component's own three strokes, at its widths and alphas, under its
         gradient. At k just above zero this is its line, exactly. */
      const grad = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
      grad.addColorStop(0, "rgba(255,246,214,1)");
      grad.addColorStop(0.45, "rgba(255,206,110,0.55)");
      grad.addColorStop(1, "rgba(255,180,80,0)");
      ctx.strokeStyle = grad;
      ctx.lineCap = "round";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 8;

      const path = (list: Array<[number, number]>) => {
        ctx.beginPath();
        ctx.moveTo(list[0][0], list[0][1]);
        for (let i = 1; i < list.length; i++) ctx.lineTo(list[i][0], list[i][1]);
      };

      /* The planets first, underneath: the same corners, shifted across the
         line and started later, so they read as having come along with it. */
      for (const c of COMPANIONS) {
        const shift = c.offset * amplitude;
        const line = VERTICES.filter(([u]) => u >= c.from).map(([u, v]) => [
          tail.x + dx * u + nx * (v * amplitude + shift),
          tail.y + dy * u + ny * (v * amplitude + shift),
        ]) as Array<[number, number]>;
        if (line.length < 2) continue;
        ctx.strokeStyle = c.colour;
        ctx.globalAlpha = 0.16 * ease;
        ctx.lineWidth = 3;
        path(line);
        ctx.stroke();
        ctx.globalAlpha = 0.5 * ease;
        ctx.lineWidth = 1.1;
        path(line);
        ctx.stroke();
      }

      ctx.strokeStyle = grad;
      ctx.lineWidth = 11;
      ctx.globalAlpha = 0.16;
      path(pts);
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.3;
      path(pts);
      ctx.stroke();
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = 1;
      path(pts);
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

"use client";

import { useEffect, useRef } from "react";

/** The planets leaving their orbits.
 *
 *  WHY THIS IS DRAWN HERE AND NOT ASKED OF THE COMPONENT. Orbital draws every
 *  planet from its orbital elements, on a Kepler solve, every frame. There is
 *  no prop that lets one off its orbit, and there could not be: an orbit is the
 *  only thing it knows how to put a planet on. Widening the orbits instead,
 *  which is what the first attempt did, gives bigger loops and reads as exactly
 *  that. So the component keeps what it is good at, the Sun, its straight track
 *  and the star field, its own planets are faded out from under this, and the
 *  scattering is drawn on top.
 *
 *  IT STARTS WHERE THE SUN IS. Not approximately: the Sun's screen position is
 *  reproduced here from the same arithmetic the component uses, so the field
 *  opens out of the exact point the system was orbiting. The camera is frozen
 *  for the whole of this, which is what makes that affordable, since the
 *  position only has to be recomputed when the viewport changes.
 *
 *  THE CAMERA MUST NOT BE INTERACTIVE. Orbital eases the camera up to 7 degrees
 *  of yaw and 5 of pitch toward the pointer, in closure-local state that cannot
 *  be read back. Any position computed out here would be wrong by that much and
 *  would lag it. The chapter passes interactive={false}.
 *
 *  NOTHING IS RANDOM AT RUNTIME. Angles, speeds and curvature come from a hash
 *  of the index, so the field is identical on every load and every machine, the
 *  same reason the component's own plane fan is a fixed table. */

export type ScatterCamera = {
  spin: number;
  tilt: number;
  roll: number;
  focusX: number;
  focusY: number;
  lead: number;
  apex: [number, number];
};

const RAD = Math.PI / 180;
const COUNT = 15;

/** The planets' own colours, so what flies out is what was going round. */
const COLOURS = [
  "#c9b8a8", "#ffd9a0", "#5fd8ff", "#ff7a4d", "#ffa62e",
  "#ffd884", "#7fe6e0", "#3f7dff", "#b48cff", "#6be0a8",
  "#ff8fd0", "#ffc46b", "#a8c6d8", "#cbb6ff", "#ff6b6b",
];

/** Deterministic 0..1 from an integer, so the field never changes between
 *  loads or between the server and the client. */
function hash(n: number): number {
  let x = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}

/** Where Orbital puts the Sun, in CSS pixels inside a `w` by `h` box.
 *
 *  This is its own arithmetic, not an approximation of it. `focus` places the
 *  camera centre and `lead` then pushes the Sun off that point, by `lead` of
 *  the short side, along the on-screen direction of the Sun's travel. The
 *  projection's scale cancels when that direction is normalised, so none of
 *  `viewRadius`, `pxPerAU` or the perspective divide is needed here. */
export function sunScreenPosition(w: number, h: number, c: ScatterCamera) {
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

export function ScatterField({ p, camera }: { p: number; camera: ScatterCamera }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const at = useRef(0);

  useEffect(() => {
    at.current = Math.max(0, Math.min(1, p));
  }, [p]);

  useEffect(() => {
    const el = canvas.current;
    const host = el?.parentElement;
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
      if (k <= 0) return;

      const sun = sunScreenPosition(w, h, camera);
      const reach = Math.hypot(w, h) * 1.15;

      /* Out of the frame by the end, and gone with it: the last fifth takes
         the whole field away so the Sun is left drawing on its own. */
      const alpha = 1 - Math.max(0, (k - 0.8) / 0.2);
      const eased = k * k * (3 - 2 * k);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < COUNT; i++) {
        const angle = hash(i) * Math.PI * 2;
        const curve = (hash(i + 101) - 0.5) * 1.1;
        const speed = 0.45 + hash(i + 211) * 0.85;
        const start = 12 + hash(i + 307) * 90;
        const colour = COLOURS[i % COLOURS.length];
        const size = 1.4 + hash(i + 401) * 2.6;

        /* A short history behind each one, which is the trail. */
        const pts: Array<[number, number]> = [];
        for (let s = 0; s <= 14; s++) {
          const back = Math.max(0, eased - s * 0.022);
          const rr = start + back * reach * speed;
          const aa = angle + back * curve;
          pts.push([sun.x + Math.cos(aa) * rr, sun.y + Math.sin(aa) * rr]);
        }

        ctx.strokeStyle = colour;
        ctx.lineCap = "round";
        for (let s = 1; s < pts.length; s++) {
          const f = 1 - s / pts.length;
          ctx.globalAlpha = alpha * 0.5 * f * f;
          ctx.lineWidth = size * 0.9 * f;
          ctx.beginPath();
          ctx.moveTo(pts[s - 1][0], pts[s - 1][1]);
          ctx.lineTo(pts[s][0], pts[s][1]);
          ctx.stroke();
        }

        const [hx, hy] = pts[0];
        const halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, size * 7);
        halo.addColorStop(0, colour);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = alpha * 0.5;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(hx, hy, size * 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = alpha;
        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(hx, hy, size, 0, Math.PI * 2);
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
  }, [camera]);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

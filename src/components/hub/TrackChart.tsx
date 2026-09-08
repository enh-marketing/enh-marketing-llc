"use client";

import { useEffect, useRef } from "react";
import { CHART_PATH, chartPointAt, chartTravelled } from "@/components/hub/chartPath";

/** The chart the Sun is travelling.
 *
 *  THE SHAPE IS THE ROUTE, NOT THE WAKE. The version before this bent the Sun's
 *  trail into a chart, which put the shape behind a Sun that was still going
 *  straight: the chart had already happened and the Sun had nothing to do with
 *  it. Here the line is drawn ahead of the Sun and the chapter walks the
 *  component's `focus` along the same path, so the Sun is on the line and
 *  scrolling moves it up the shape. The line behind it is where it has been.
 *
 *  IT IS THE COMPONENT'S OWN SUN. Nothing here draws one. `focus` is the prop
 *  that places it, so driving that along the path moves the real thing, with
 *  its own halo and its own pulse, rather than a copy that would have to be
 *  matched and would drift.
 *
 *  Corners, not curves: straight segments with a mitred join. A price line
 *  turns, it does not wave. And there are no axes, ticks or numbers, because
 *  the source document for this category is explicit that dashboards are shown
 *  as shapes and never as values. */

/** The planets' lines, beside the Sun's, turning the same corners. */
const COMPANIONS: Array<{ colour: string; offset: number; from: number }> = [
  { colour: "#5fd8ff", offset: 0.035, from: 0 },
  { colour: "#ff9838", offset: -0.028, from: 1 },
  { colour: "#b48cff", offset: 0.06, from: 2 },
];

export function TrackChart({ p }: { p: number }) {
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

      const px = (v: [number, number]): [number, number] => [v[0] * w, v[1] * h];
      const done = chartTravelled(k);

      ctx.lineJoin = "miter";
      ctx.miterLimit = 8;
      ctx.lineCap = "round";

      const stroke = (pts: Array<[number, number]>, width: number, alpha: number, colour: string) => {
        if (pts.length < 2) return;
        ctx.strokeStyle = colour;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      };

      /* The whole route, faint: this is the part the Sun has not reached. It
         appears with the chart rather than being revealed, because a chart you
         cannot see the end of is a line, not a chart. */
      const all = CHART_PATH.map(px);
      const shown = Math.min(1, k / 0.22);
      stroke(all, 1, 0.16 * shown, "#ffd9a0");

      /* The planets, beside it. */
      for (const c of COMPANIONS) {
        const line = CHART_PATH.slice(c.from).map(([x, y]) => px([x, y + c.offset]));
        stroke(line, 2.5, 0.1 * shown, c.colour);
        stroke(line, 1, 0.34 * shown, c.colour);
      }

      /* And the part already travelled, bright, ending under the Sun. */
      if (done > 0) {
        const pts: Array<[number, number]> = [];
        const steps = 40;
        for (let i = 0; i <= steps; i++) pts.push(px(chartPointAt((done * i) / steps)));
        const head = pts[pts.length - 1];
        const grad = ctx.createLinearGradient(head[0], head[1], pts[0][0], pts[0][1]);
        grad.addColorStop(0, "rgba(255,246,214,1)");
        grad.addColorStop(0.45, "rgba(255,206,110,0.6)");
        grad.addColorStop(1, "rgba(255,180,80,0.05)");
        stroke(pts, 9, 0.14, grad as unknown as string);
        stroke(pts, 3.4, 0.32, grad as unknown as string);
        stroke(pts, 1.6, 1, grad as unknown as string);
      }

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
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

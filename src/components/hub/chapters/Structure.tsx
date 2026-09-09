"use client";

import { useCallback, useEffect, useRef } from "react";
import { chartPointAt } from "@/components/hub/chartPath";
import { drawStar } from "@/components/hub/star";

/** Chapter five: the structure. Intelligent Web.
 *
 *  WHAT ITS COPY IS, AND THEREFORE WHAT THIS DRAWS. The service designs and
 *  develops websites "that personalise content, display live information and
 *  use a clear structure". A site's structure is a hierarchy: one root, its
 *  sections, their pages. So the drawing is that hierarchy, growing. Not a
 *  metaphor for it and not an icon of it.
 *
 *  AND IT REPEATS NOTHING. The four chapters before it are orbits curving from
 *  a centre, a horizontal waveform, one continuous polyline, and a black hole,
 *  which is every organic and radial family the page has. A branching tree of
 *  straight segments is the one arrangement left that is genuinely different
 *  rather than a fifth coat on one of them. It is also the only chapter whose
 *  lines meet at angles rather than flowing.
 *
 *  IT GROWS FROM WHERE THE CHART STOPPED. CHART_PATH's last vertex is imported
 *  rather than retyped, so the root of this is literally the point the previous
 *  chapter's star finishes on, and the same drawStar puts the same star there.
 *  The page has one star from the middle of the system chapter to here, and
 *  this is the fifth chapter to hand it on without moving it.
 *
 *  THE STRUCTURE IS DETERMINISTIC. No Math.random anywhere: every branch angle
 *  and length is a pure function of its index, so the shape is the same on
 *  every load and scrolling back up runs it in reverse for free, which is the
 *  rule the whole machine is built on.
 *
 *  THE PULSE IS THE AMBIENT LAYER and the only thing here driven by a clock
 *  rather than by scroll. Leaves breathe slightly out of phase with each other,
 *  which is the "live information" half of the copy. It is deliberately small:
 *  the growth is the primary motion and a pulse loud enough to compete with it
 *  would be two things happening at once. */

/** How many times the structure divides. Four gives 1 + 2 + 4 + 8 + 16 nodes,
 *  which fills a frame without becoming a thicket at the far end. */
const GENERATIONS = 4;

/** The first branch's length, as a share of the frame's short side. Everything
 *  after it is this times TAPER for each generation it is down. */
const REACH = 0.3;
const TAPER = 0.68;

/** Which way the first branch leaves the root, in degrees clockwise from east,
 *  and how far apart a node's two children are. The root sits at the top right
 *  where the chart left it, so the structure has to travel down and to the
 *  left to have anywhere to go.
 *
 *  135 IS DOWN AND LEFT IN EQUAL PARTS, and it is that rather than a taste for
 *  diagonals: the fit below scales by whichever of the two runs out first, so a
 *  heading that leans one way wastes the other. At 152 the tree was mostly
 *  travelling left, so on a phone it hit the left edge with two thirds of the
 *  height unused and stopped there. Equal parts uses a wide frame's height and
 *  a tall frame's width, which is every frame this page runs in. */
const HEADING = 135;
const SPREAD = 46;
/** Each generation opens a little less than the one above it, which is what
 *  stops the outermost branches crossing each other. */
const SPREAD_TAPER = 0.72;

type Node = {
  /** Position, as a share of the short side away from the root. */
  x: number;
  y: number;
  gen: number;
  /** Index of the node this grew from, or -1 for the root. */
  from: number;
};

/** The whole structure, once, at module scope: it is the same on every frame
 *  and on every mount, so building it per render would be work for nothing. */
const NODES: Node[] = (() => {
  const out: Node[] = [{ x: 0, y: 0, gen: 0, from: -1 }];
  /* Breadth first, so a node's index is always greater than its parent's and a
     single forward pass can draw parents before children. */
  const heads = [{ i: 0, angle: HEADING, len: REACH, spread: SPREAD }];
  for (let g = 1; g <= GENERATIONS; g++) {
    const next: typeof heads = [];
    for (const h of heads) {
      for (const side of [-1, 1]) {
        const angle = h.angle + side * h.spread * 0.5;
        const rad = (angle * Math.PI) / 180;
        const p = out[h.i];
        out.push({
          x: p.x + Math.cos(rad) * h.len,
          y: p.y + Math.sin(rad) * h.len,
          gen: g,
          from: h.i,
        });
        next.push({
          i: out.length - 1,
          angle,
          len: h.len * TAPER,
          spread: h.spread * SPREAD_TAPER,
        });
      }
    }
    heads.length = 0;
    heads.push(...next);
  }
  return out;
})();

/** How far the structure reaches from the root, in the same units the nodes are
 *  built in. Measured from the built tree rather than derived from REACH and
 *  TAPER, so changing either of those cannot leave this stale. */
const EXTENT = NODES.reduce(
  (b, n) => ({
    minX: Math.min(b.minX, n.x),
    maxX: Math.max(b.maxX, n.x),
    maxY: Math.max(b.maxY, n.y),
  }),
  { minX: 0, maxX: 0, maxY: 0 },
);

/** Share of the frame left as margin around the structure's far edges. */
const MARGIN = 0.06;

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const smooth = (x: number) => x * x * (3 - 2 * x);

export function Structure({ t }: { t: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  /* Scroll progress reaches the loop through a ref rather than a dependency, so
     the loop is set up once and a scroll does not tear it down and rebuild it.
     Written in an effect and not during render, which is TrackChart's pattern
     and what the react-hooks rule wants. */
  const at = useRef(0);
  useEffect(() => {
    at.current = clamp(t);
  }, [t]);

  const paint = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number, ms: number) => {
    ctx.clearRect(0, 0, w, h);

    const [rx, ry] = chartPointAt(1);
    const root = { x: rx * w, y: ry * h };

    /* FITTED TO THE ROOM IT ACTUALLY HAS, rather than scaled off the frame's
       short side, which was the first attempt and was wrong on a phone: there
       the short side is the WIDTH, so a structure sized by it filled a quarter
       of a tall frame and read as an afterthought. The root is fixed, at the
       point the chart's line finished on, and the tree only ever travels left
       and down from it, so the room is the distance from the root to the left
       edge and to the bottom. Taking the smaller of the two ratios fills
       whichever runs out first and keeps the shape itself unstretched, which is
       the part that has to stay constant: one scale for both axes. */
    const unit = Math.min(
      EXTENT.minX < 0 ? (root.x - MARGIN * w) / -EXTENT.minX : Infinity,
      EXTENT.maxY > 0 ? (h - root.y - MARGIN * h) / EXTENT.maxY : Infinity,
    );

    /* One number drives the growth: how many generations are complete. A
       generation's own segments extend across the fractional part of it, so
       the structure opens outward in waves rather than all at once. */
    const grown = clamp(at.current / 0.86) * GENERATIONS;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 1; i < NODES.length; i++) {
      const n = NODES[i];
      const reach = clamp(grown - (n.gen - 1));
      if (reach <= 0) continue;
      const e = smooth(reach);
      const p = NODES[n.from];
      const ax = root.x + p.x * unit;
      const ay = root.y + p.y * unit;
      const bx = root.x + (p.x + (n.x - p.x) * e) * unit;
      const by = root.y + (p.y + (n.y - p.y) * e) * unit;

      /* Deeper branches are thinner and dimmer, which is what makes a hierarchy
         read as a hierarchy rather than as a tangle of equal lines. */
      const depth = 1 - (n.gen - 1) / GENERATIONS;
      ctx.globalAlpha = 1;
      ctx.strokeStyle = `rgba(255,214,140,${0.1 * depth})`;
      ctx.lineWidth = 6 * depth;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255,241,214,${0.35 + 0.5 * depth})`;
      ctx.lineWidth = Math.max(0.9, 1.9 * depth);
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();

      /* The node itself, once its own segment has arrived. A leaf breathes; the
         ones above it do not, because a hierarchy where every node pulses is a
         field of noise and not a structure. */
      if (reach < 1) continue;
      const leaf = n.gen === GENERATIONS;
      const beat = leaf ? 0.5 + 0.5 * Math.sin(ms / 900 + i * 1.7) : 1;
      const r = Math.max(1.4, unit * (leaf ? 0.0034 : 0.0026) * (leaf ? 0.7 + 0.5 * beat : 1));
      ctx.fillStyle = `rgba(255,247,228,${leaf ? 0.45 + 0.4 * beat : 0.9})`;
      ctx.beginPath();
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.fill();
    }

    /* And the star at the root, the same one the chart hands over lit. */
    drawStar(ctx, root.x, root.y, w, h);
  }, []);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    let raf = 0;
    let alive = true;

    /* OFF WHEN THE TAB IS. The pulse is the only reason this runs a loop at
       all, and a loop running against a hidden tab is pure cost. The orbital
       and black hole components both do this; the waveform does not, which is
       noted in the audit. */
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      } else if (alive && !raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = (ms: number) => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w && h) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        if (el.width !== Math.round(w * dpr) || el.height !== Math.round(h * dpr)) {
          el.width = Math.round(w * dpr);
          el.height = Math.round(h * dpr);
        }
        const ctx = el.getContext("2d");
        if (ctx) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          paint(ctx, w, h, ms);
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paint]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  );
}

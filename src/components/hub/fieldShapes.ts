import type { FieldState } from "@/content/ai-hub";

/** The geometry of the AI Hub field, with no React in it.
 *
 *  Split out from CategoryField so the eight arrangements can be rendered and
 *  checked without a browser. They are pure functions of (state, width,
 *  height, time), so a script can draw every one of them and prove they are
 *  distinct and correctly shaped, which is not something a screenshot of a
 *  canvas can be trusted to show. */

export type Dot = {
  /** Where this dot lives when no arrangement has claimed it. */
  hx: number;
  hy: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  /** 0 at home, 1 when an arrangement has taken it. Drives brightness. */
  claim: number;
};

export type Pt = { x: number; y: number };
/** x1, y1, x2, y2. Every arrangement is expressed as line segments. */
export type Seg = [number, number, number, number];

/** How close a dot must be to a segment to be pulled onto it. Dots beyond this
 *  stay home, which is what makes an arrangement read as something emerging
 *  from the field rather than the whole field lurching.
 *
 *  38, a little over one grid step of 34. Measured across all eight
 *  arrangements at 96, 60, 46, 38 and 30: at 96 a line pulled nearly three
 *  rows in from either side, so shapes sitting close together fused and the
 *  page wireframe claimed 489 of 777 dots, a slab rather than a structure. At
 *  38 each line collapses the nearest row from either side onto itself and
 *  stays one dot thick, which is what makes an arrangement read as drawn. */
const CAPTURE = 38;
/** How close a dot must be to an attractor to light and draw a line to it. */
const REACH = 220;

export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Nearest point on a segment, and its distance. */
function nearestOn(seg: Seg, px: number, py: number): { p: Pt; d: number } {
  const [x1, y1, x2, y2] = seg;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = dx * dx + dy * dy;
  const t = len === 0 ? 0 : clamp(((px - x1) * dx + (py - y1) * dy) / len, 0, 1);
  const p = { x: x1 + t * dx, y: y1 + t * dy };
  return { p, d: Math.hypot(px - p.x, py - p.y) };
}

/** The four sides of a rectangle. */
function rect(x: number, y: number, w: number, h: number): Seg[] {
  return [
    [x, y, x + w, y],
    [x + w, y, x + w, y + h],
    [x + w, y + h, x, y + h],
    [x, y + h, x, y],
  ];
}

/** The shape each category asks the field to take.
 *
 *  Each one is drawn from that category's own sentence, never from a wish to
 *  look different. The justification sits with the shape it justifies. */
export function shapesFor(state: FieldState, w: number, h: number): Seg[] {
  const cx = w / 2;
  const cy = h / 2;
  // A working area that leaves the overlay text room to breathe.
  const bw = Math.min(w * 0.62, 900);
  const bh = Math.min(h * 0.58, 520);

  switch (state) {
    // "improve how they appear in AI-generated search results": there is one
    // answer and many places it could have been drawn from, so the field stays
    // exactly as it is and only the reaching changes.
    case "converge":
      return [];

    // "what to automate and what should stay manual": a closed route that
    // repeats, and a field around it that is untouched.
    case "route": {
      const rw = bw * 0.74;
      const rh = bh * 0.62;
      return rect(cx - rw / 2, cy - rh / 2, rw, rh);
    }

    // "videos, UGC-style ads, product imagery, and creative variants": one
    // subject, several frames. The three aspect ratios the other page ships.
    case "frames": {
      // Big enough to be objects rather than marks: measured at 0.5/0.17 the
      // three frames spanned barely half the working width and read as small.
      const unit = Math.min(bh * 0.62, bw * 0.22);
      // 9:16, 1:1 and 16:9, each actually that ratio. Portrait is the tallest
      // and landscape the widest, so the three read as one subject recut.
      const specs: [number, number][] = [
        [unit * (9 / 16), unit],
        [unit * 0.82, unit * 0.82],
        [unit, unit * (9 / 16)],
      ];
      const gap = unit * 0.34;
      const total = specs.reduce((a, [fw]) => a + fw, 0) + gap * (specs.length - 1);
      let x = cx - total / 2;
      const out: Seg[] = [];
      for (const [fw, fh] of specs) {
        out.push(...rect(x, cy - fh / 2, fw, fh));
        x += fw + gap;
      }
      return out;
    }

    // "chatbots, voice agents and customer service systems": two sides taking
    // turns, so the field becomes a thread of alternating runs.
    case "thread": {
      const rows = 5;
      const runW = bw * 0.3;
      const step = bh / (rows + 1);
      const out: Seg[] = [];
      for (let i = 0; i < rows; i++) {
        const y = cy - bh / 2 + step * (i + 1);
        const left = i % 2 === 0;
        const x = left ? cx - bw / 2 : cx + bw / 2 - runW;
        out.push([x, y, x + runW, y]);
      }
      return out;
    }

    // "historical performance ... and forecast ranges": what happened is a
    // line, what is ahead is a widening band. The split is the present.
    case "range": {
      const x0 = cx - bw / 2;
      const xm = cx - bw * 0.06;
      const x1 = cx + bw / 2;
      const drift = bh * 0.16;
      const spread = bh * 0.3;
      return [
        [x0, cy + drift, xm, cy - drift * 0.4],
        [xm, cy - drift * 0.4, x1, cy - drift * 0.4 - spread],
        [xm, cy - drift * 0.4, x1, cy - drift * 0.4 + spread],
      ];
    }

    // "use a clear structure": the field becomes one.
    //
    // Drawn as rules rather than as outlined boxes. Four rectangles at this
    // size put their top and bottom edges within one capture radius of each
    // other, so the whole thing fused into horizontal bands and claimed 489 of
    // 777 dots: a slab, not a structure. A header rule, a spine separating the
    // side column, and runs of different lengths for the content read as a
    // page and leave the field around them intact.
    case "layout": {
      const x = cx - bw / 2;
      const y = cy - bh / 2;
      const sideW = bw * 0.24;
      const colX = x + sideW + bw * 0.06;
      const colW = bw - sideW - bw * 0.06;
      const headY = y + bh * 0.1;
      const out: Seg[] = [
        // The header, and the rule under it.
        [x, y, x + bw, y],
        [x, headY, x + bw, headY],
        // The spine that makes a side column a side column.
        [x + sideW, headY + bh * 0.1, x + sideW, y + bh],
      ];
      // Items in the side column.
      for (let i = 0; i < 4; i++) {
        const iy = headY + bh * (0.24 + i * 0.17);
        out.push([x, iy, x + sideW * 0.72, iy]);
      }
      // Content, in runs of different lengths, the way a page of it looks.
      const runs = [1, 0.86, 0.94, 0.6, 0.92, 0.72];
      for (let i = 0; i < runs.length; i++) {
        const iy = headY + bh * (0.16 + i * 0.14);
        out.push([colX, iy, colX + colW * runs[i], iy]);
      }
      return out;
    }

    // "live reporting dashboards and marketing attribution systems": reporting
    // stands the numbers up, attribution joins them back to a source.
    case "bars": {
      const n = 7;
      const base = cy + bh / 2;
      const slot = bw / n;
      const heights = [0.42, 0.66, 0.35, 0.88, 0.54, 0.74, 0.46];
      const out: Seg[] = [];
      for (let i = 0; i < n; i++) {
        const x = cx - bw / 2 + slot * (i + 0.5);
        out.push([x, base, x, base - bh * heights[i]]);
      }
      out.push([cx - bw / 2, base, cx + bw / 2, base]);
      return out;
    }

    // "built around the team's actual workflows": a room, and it faces the
    // front. Rows curve because people sit that way, not for decoration.
    case "room": {
      const rows = 4;
      const out: Seg[] = [];
      for (let i = 0; i < rows; i++) {
        const y = cy - bh * 0.06 + (i * bh) / (rows * 1.7);
        const halfW = (bw * (0.3 + i * 0.09)) / 2;
        const sag = bh * 0.035 * (i + 1);
        // Two segments approximate the curve of a row.
        out.push([cx - halfW, y - sag, cx, y]);
        out.push([cx, y, cx + halfW, y - sag]);
      }
      out.push([cx - bw * 0.16, cy - bh * 0.36, cx + bw * 0.16, cy - bh * 0.36]);
      return out;
    }
  }
}

/** What the lit dots reach toward, and where it is at time `t` (seconds).
 *
 *  This is the half of the system that moves at rest. The shapes hold still
 *  once the field has taken them; the attractor keeps travelling, so a reader
 *  who stops scrolling still has something alive in front of them. */
export function attractorFor(state: FieldState, w: number, h: number, t: number): Pt {
  const cx = w / 2;
  const cy = h / 2;
  const bw = Math.min(w * 0.62, 900);
  const bh = Math.min(h * 0.58, 520);
  const loop = (period: number) => (t % period) / period;

  switch (state) {
    // No pointer yet, so it drifts. On a phone this is the only driver and the
    // section is alive without a cursor, which the original could not manage.
    case "converge": {
      const a = t * 0.34;
      return { x: cx + Math.cos(a) * bw * 0.3, y: cy + Math.sin(a * 1.3) * bh * 0.32 };
    }
    // A pulse going round the route, because the point is that it repeats.
    case "route": {
      const rw = bw * 0.74;
      const rh = bh * 0.62;
      const per = 2 * (rw + rh);
      const d = loop(9) * per;
      const x0 = cx - rw / 2;
      const y0 = cy - rh / 2;
      if (d < rw) return { x: x0 + d, y: y0 };
      if (d < rw + rh) return { x: x0 + rw, y: y0 + (d - rw) };
      if (d < 2 * rw + rh) return { x: x0 + rw - (d - rw - rh), y: y0 + rh };
      return { x: x0, y: y0 + rh - (d - 2 * rw - rh) };
    }
    // A sweep across the frames: the same subject being looked at three ways.
    case "frames":
      return { x: cx - bw * 0.4 + loop(7) * bw * 0.8, y: cy };
    // The turn passing from one side to the other.
    case "thread": {
      const k = loop(6);
      const side = k < 0.5 ? -1 : 1;
      const local = (k < 0.5 ? k : k - 0.5) * 2;
      return { x: cx + side * bw * 0.3, y: cy - bh * 0.34 + local * bh * 0.68 };
    }
    // Travelling out along the forecast, which is the direction of the claim.
    case "range": {
      const k = loop(8);
      return { x: cx - bw / 2 + k * bw, y: cy - bh * 0.06 - Math.sin(k * Math.PI) * bh * 0.18 };
    }
    // Moving between the blocks, the way a reader moves through a page.
    case "layout": {
      const k = loop(10);
      const stops: Pt[] = [
        { x: cx, y: cy - bh * 0.37 },
        { x: cx - bw * 0.39, y: cy + bh * 0.1 },
        { x: cx + bw * 0.14, y: cy - bh * 0.06 },
        { x: cx + bw * 0.14, y: cy + bh * 0.3 },
      ];
      const i = Math.floor(k * stops.length);
      const f = k * stops.length - i;
      const a = stops[i];
      const b = stops[(i + 1) % stops.length];
      const e = f * f * (3 - 2 * f);
      return { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e };
    }
    // Along the tops, which is the reading order of a report.
    case "bars": {
      const k = loop(8);
      const heights = [0.42, 0.66, 0.35, 0.88, 0.54, 0.74, 0.46];
      const n = heights.length;
      const pos = k * (n - 1);
      const i = Math.min(n - 2, Math.floor(pos));
      const f = pos - i;
      const slot = bw / n;
      const x = cx - bw / 2 + slot * (i + 0.5 + f);
      const hgt = heights[i] + (heights[i + 1] - heights[i]) * f;
      return { x, y: cy + bh / 2 - bh * hgt };
    }
    // The front of the room. It barely moves, because that is the point.
    case "room":
      return { x: cx + Math.sin(t * 0.5) * bw * 0.04, y: cy - bh * 0.36 };
  }
}

/* The simulation lives in plain functions that take the dot array as an
   argument, rather than in callbacks that reach into a ref and mutate what
   they find. Same work, but the mutation is on a parameter the function owns
   for the length of the call, which is both what react-hooks/immutability asks
   for and the clearer way to read it. */

/** Place every dot on the grid for the current size, keeping the array
 *  identity so a resize eases rather than snaps. */
export function layoutGrid(dots: Dot[], w: number, h: number) {
  const gap = w < 640 ? 26 : 34;
  const cols = Math.floor(w / gap);
  const rows = Math.floor(h / gap);
  const ox = (w - (cols - 1) * gap) / 2;
  const oy = (h - (rows - 1) * gap) / 2;
  const wanted = cols * rows;

  if (dots.length !== wanted) {
    dots.length = 0;
    for (let i = 0; i < wanted; i++) {
      const x = ox + (i % cols) * gap;
      const y = oy + Math.floor(i / cols) * gap;
      dots.push({ hx: x, hy: y, x, y, tx: x, ty: y, claim: 0 });
    }
    return;
  }
  for (let i = 0; i < wanted; i++) {
    dots[i].hx = ox + (i % cols) * gap;
    dots[i].hy = oy + Math.floor(i / cols) * gap;
  }
}

/** Pull the dots near this state's shapes onto them, and send the rest home. */
export function claimFor(dots: Dot[], state: FieldState, w: number, h: number) {
  const shapes = shapesFor(state, w, h);
  for (const d of dots) {
    let best = Infinity;
    let bp: Pt | null = null;
    for (const s of shapes) {
      const { p, d: dist } = nearestOn(s, d.hx, d.hy);
      if (dist < best) {
        best = dist;
        bp = p;
      }
    }
    if (bp && best < CAPTURE) {
      d.tx = bp.x;
      d.ty = bp.y;
      d.claim = 1;
    } else {
      d.tx = d.hx;
      d.ty = d.hy;
      d.claim = 0;
    }
  }
}

/** Settle every dot toward its target instantly. Used under reduced motion,
 *  where there is no loop to ease it. */
export function settle(dots: Dot[]) {
  for (const d of dots) {
    d.x = d.tx;
    d.y = d.ty;
  }
}

/** One frame. */
export function renderFrame(
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  o: {
    w: number;
    h: number;
    state: FieldState;
    time: number;
    pointer: Pt | null;
    dim: string;
    lit: string;
    ease: number;
  },
) {
  const { w, h, state, time, pointer, dim, lit, ease } = o;
  ctx.clearRect(0, 0, w, h);

  const drift = attractorFor(state, w, h, time);
  // The pointer is a second attractor everywhere, and the only one in 01,
  // where following the cursor is the whole meaning of the arrangement.
  //
  // It reaches less far in the other seven. At the full radius its starburst
  // was larger than the arrangement it sat on top of, so every state looked
  // like state 01 with a shape behind it. Here the drawing leads and the
  // cursor answers it.
  const targets: { at: Pt; reach: number }[] =
    state === "converge"
      ? [{ at: pointer ?? drift, reach: REACH }]
      : pointer
        ? [
            { at: drift, reach: REACH },
            { at: pointer, reach: REACH * 0.42 },
          ]
        : [{ at: drift, reach: REACH }];

  ctx.lineWidth = 1;
  for (const d of dots) {
    d.x += (d.tx - d.x) * ease;
    d.y += (d.ty - d.y) * ease;

    // Strongest pull wins, so a short-reach pointer never overrides the
    // arrangement's own attractor just by being nearer.
    let glow = 0;
    let at: Pt | null = null;
    for (const t of targets) {
      const dist = Math.hypot(d.x - t.at.x, d.y - t.at.y);
      const g = dist < t.reach ? 1 - dist / t.reach : 0;
      if (g > glow) {
        glow = g;
        at = t.at;
      }
    }
    // A claimed dot is already part of something, so it reads brighter even
    // before anything reaches it.
    const strength = clamp(glow * 0.85 + d.claim * 0.45, 0, 1);

    if (strength > 0.02) {
      ctx.globalAlpha = 0.25 + strength * 0.75;
      ctx.fillStyle = strength > 0.35 ? lit : dim;
    } else {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = dim;
    }
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.claim ? 1.9 : 1.4, 0, Math.PI * 2);
    ctx.fill();

    if (at && glow > 0.12) {
      ctx.globalAlpha = glow * glow * 0.5;
      ctx.strokeStyle = lit;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(at.x, at.y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}


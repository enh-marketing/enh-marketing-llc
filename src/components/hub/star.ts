/** The star and the line behind it, drawn the same way wherever they appear.
 *
 *  IT IS THE FIXED POINT OF THE WHOLE SECOND HALF. The system leaves it at
 *  HANDOVER_X, HANDOVER_Y; the voice keeps it there while the waveform plays
 *  around it; the chart starts it from the same place and walks it along the
 *  line. Three chapters cross-fade over it and it never moves, so the reader is
 *  never handed a new object: the picture around the star changes, the star
 *  does not. That is what makes the chart stop being a surprise.
 *
 *  WHICH ONLY WORKS IF ALL THREE DRAW THE SAME STAR. This was TrackChart's own
 *  recipe, written inline, back when it was the only thing drawing one. Copied
 *  into the uplink it would have drifted on the first edit to either, and a
 *  cross-fade between two slightly different stars is exactly the flicker the
 *  join is meant not to have. So it lives here and both call it.
 *
 *  THE RADIUS COMES FROM THE SHORT SIDE, so the star is the same size relative
 *  to the frame on a phone and on a desktop, with a floor so it does not vanish
 *  on the narrowest screens. */
export function starRadius(w: number, h: number): number {
  return Math.max(5, Math.min(w, h) * 0.013);
}

/** Paint the star at `x`, `y` in a `w` by `h` frame.
 *
 *  A wide, soft halo and a small hard core. The halo runs to nine radii and
 *  fades to fully transparent, so it can be laid over anything; the core is
 *  very nearly white and very nearly opaque, which is what reads as a star
 *  rather than a light. Both alphas are set explicitly rather than inherited,
 *  because the callers draw other things first and one of them strokes at 0.14.
 *
 *  `bloom` STRETCHES THE HALO ONLY, never the core, and it exists for one
 *  place: the waveform. A star laid on the wave's own centre is invisible,
 *  because that is the brightest white in the frame and the star is white.
 *  Measured on the build at 410x900, the core simply disappeared into it. A
 *  bloom pushes the warm halo out past the wave's white, where there is black
 *  to read against, so the star is present as a glow the wave is sitting
 *  inside. At bloom 1 this is exactly the star the chart draws, which is what
 *  the two chapters cross-fade over, so the voice has to be back at 1 by the
 *  time it hands over, and it is: the bloom follows the wave's own amplitude
 *  and the wave is flat by then. */
export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  bloom = 1,
): void {
  const r = starRadius(w, h);
  ctx.globalAlpha = 1;
  const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 9 * bloom);
  halo.addColorStop(0, "rgba(255,242,204,0.5)");
  halo.addColorStop(0.35, "rgba(255,206,110,0.16)");
  halo.addColorStop(1, "rgba(255,180,80,0)");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(x, y, r * 9 * bloom, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.97)";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/** HOW THE LINE THICKENS FROM ITS TAIL TO ITS HEAD.
 *
 *  Asked for: "increase the width of the line chart line as it moves leaving
 *  the end thinner, so it looks like a power thunder line chart with thin tail
 *  but thick header and tapered body".
 *
 *  1.4 RATHER THAN 1. A straight ramp puts half the width at the halfway point
 *  and reads as a wedge. Weighting it towards the head keeps the body slim for
 *  most of its length and gathers the mass into the last third, which is what a
 *  bolt does and what makes the star look like it is dragging the line rather
 *  than drawing it. */
const TAPER = 1.4;

/** How many pieces the line is cut into for the width to vary smoothly.
 *
 *  THE PATH'S OWN VERTICES ARE KEPT AND THE PIECES GO BETWEEN THEM, rather than
 *  the whole thing being resampled at an even pitch. Resampling would put
 *  samples either side of a corner and cut it off, and this path is corners:
 *  four turns in a rise of about 1800px, which an even pitch would round away.
 *
 *  64 puts the widest layer's step at about a fifth of a pixel, which is under
 *  what a screen can show. */
const STEPS = 64;

/** One layer of the line, as a filled ribbon rather than a stroke.
 *
 *  A STROKE CANNOT CHANGE WIDTH ALONG ITS LENGTH, so the obvious way to taper
 *  is a run of short strokes at stepped widths. That is wrong here for a reason
 *  that is not obvious until you see it: two of these three layers are drawn at
 *  0.14 and 0.32 alpha, and the round caps of neighbouring strokes overlap, so
 *  every joint paints twice and the line comes out beaded. A ribbon is one
 *  closed path and one fill, so its alpha is laid down exactly once.
 *
 *  THE CORNERS ARE BEVELLED, which is what the duplicated vertex does: each
 *  segment contributes its own offset points at both of its ends, so the outer
 *  edge crosses the corner on a straight chamfer instead of leaving the notch
 *  two diverging offsets would. On the inside of a turn the ribbon folds over
 *  itself; nonzero winding fills a fold, so it stays solid. */
function ribbon(
  ctx: CanvasRenderingContext2D,
  pts: Array<[number, number]>,
  tailW: number,
  headW: number,
): void {
  const n = pts.length;
  const lens: number[] = [];
  let total = 0;
  for (let i = 1; i < n; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    lens.push(d);
    total += d;
  }
  if (total <= 0) return;

  /* Half the width, at `s` along the line. */
  const half = (s: number) => (tailW + (headW - tailW) * Math.pow(s / total, TAPER)) / 2;

  const left: Array<[number, number]> = [];
  const right: Array<[number, number]> = [];
  let acc = 0;
  for (let i = 1; i < n; i++) {
    const len = lens[i - 1];
    if (len <= 0) continue;
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    /* The segment's own normal, so a corner gets one from each side. */
    const nx = -(by - ay) / len;
    const ny = (bx - ax) / len;
    const parts = Math.max(1, Math.round((len / total) * STEPS));
    for (let j = 0; j <= parts; j++) {
      const t = j / parts;
      const px = ax + (bx - ax) * t;
      const py = ay + (by - ay) * t;
      const r = half(acc + len * t);
      left.push([px + nx * r, py + ny * r]);
      right.push([px - nx * r, py - ny * r]);
    }
    acc += len;
  }
  if (left.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(left[0][0], left[0][1]);
  for (let i = 1; i < left.length; i++) ctx.lineTo(left[i][0], left[i][1]);
  /* Cut square across the head. The star is drawn on that exact point and its
     core is wider than this is, so the end is never the thing you see. */
  for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i][0], right[i][1]);
  ctx.closePath();
  ctx.fill();
}

/** Paint the line the star has come along, from `pts[0]` to `head`.
 *
 *  THIS WAS TRACKCHART'S, AND NOW THE VOICE DRAWS IT TOO. The system chapter
 *  ends with the star trailing its course behind it and the chart shows the
 *  same thing, so a voice section with a bare star in the middle of it was the
 *  one frame in the sequence where the line was missing. The uplink now draws
 *  the chart's own opening frame, through this function and with the chart's
 *  own path, so what the reader watches through the voice is exactly what the
 *  chart carries on from.
 *
 *  `pts` are pixels and already include `head` as their last point; it is
 *  passed separately only because the gradient runs from it, and a caller
 *  drawing a partial path knows where its head is more cheaply than this can
 *  work it out.
 *
 *  IT IS TAPERED, THIN AT THE TAIL AND THICK AT THE HEAD, and every layer is
 *  now a filled ribbon rather than a stroke, because a stroke is one width. The
 *  core runs 0.9px where the line began to 6.4px where the star is, so the line
 *  reads as something the star is dragging rather than a wire it is sliding
 *  along. See TAPER and `ribbon` above for why a ribbon and not a run of short
 *  strokes.
 *
 *  THE HEAD WAS 3.6 AND IS 6.4, and the tail went with it: the first taper was
 *  measurably a taper and still read as a hairline that happened to swell. The
 *  ratio is the same, the whole line is heavier, and the ends stay in
 *  proportion to each other.
 *
 *  THE MITRE IS GONE WITH THE STROKES and nothing is lost by it. The note that
 *  used to be here said the 9px halo had to give up its point because a mitred
 *  join on a turn this tight throws a spike past the line it is haloing, and
 *  that the thin line kept its mitre. A ribbon has no joins to mitre: its
 *  corners are bevelled by construction, on all three layers, and at 3.6px the
 *  bevel is under two pixels across.
 *
 *  `bloom` widens the two soft layers and leaves the sharp one alone, for the
 *  same reason the star has one: over the waveform's own white there is nothing
 *  a hairline can do, but a warm band wide enough to reach past it reads. At
 *  bloom 1 this is exactly the line the chart draws.
 *
 *  `alpha` fades the whole line without touching the star, and the two need to
 *  be separable because they arrive at different times. A star is a dot and
 *  looks the same whatever the scene behind it is doing; a line has an angle,
 *  and the uplink's is dead horizontal while the system it fades over is still
 *  turning its own trails flat. So the voice brings its star in immediately and
 *  holds its line back. */
export function drawTrack(
  ctx: CanvasRenderingContext2D,
  pts: Array<[number, number]>,
  head: [number, number],
  bloom = 1,
  alpha = 1,
): void {
  if (alpha <= 0) return;
  if (pts.length < 2) return;
  const grad = ctx.createLinearGradient(head[0], head[1], pts[0][0], pts[0][1]);
  grad.addColorStop(0, "rgba(255,246,214,1)");
  grad.addColorStop(0.5, "rgba(255,206,110,0.55)");
  grad.addColorStop(1, "rgba(255,180,80,0.04)");
  ctx.fillStyle = grad;

  /* Tail, head. The two soft layers keep roughly the proportions the flat
     strokes had at their head, so the line is not suddenly a different object;
     what is new is that all three come to almost nothing at the far end. */
  const run = (tailW: number, headW: number, a: number) => {
    ctx.globalAlpha = a;
    ribbon(ctx, pts, tailW, headW);
  };
  run(4 * bloom, 30 * bloom, 0.14 * alpha);
  run(1.8 * bloom, 12.5 * bloom, 0.32 * alpha);
  run(0.9, 6.4, alpha);
}

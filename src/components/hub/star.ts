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
 *  THE WIDE STROKES TURN ROUND CORNERS, THE THIN ONE TURNS SHARP. A mitred join
 *  on a 9px stroke at a turn this tight throws a spike well past the line it is
 *  supposed to be haloing, and that spike is the fold that appeared at every
 *  corner. The halo is what carries the width, so it is the one that gives up
 *  the point; the 1.6px line that actually reads as the chart keeps its mitre.
 *
 *  `bloom` widens the two soft strokes and leaves the sharp one alone, for the
 *  same reason the star has one: over the waveform's own white there is nothing
 *  a hairline can do, but a warm band wide enough to reach past it reads. At
 *  bloom 1 this is exactly the line the chart draws. */
export function drawTrack(
  ctx: CanvasRenderingContext2D,
  pts: Array<[number, number]>,
  head: [number, number],
  bloom = 1,
): void {
  if (pts.length < 2) return;
  const grad = ctx.createLinearGradient(head[0], head[1], pts[0][0], pts[0][1]);
  grad.addColorStop(0, "rgba(255,246,214,1)");
  grad.addColorStop(0.5, "rgba(255,206,110,0.55)");
  grad.addColorStop(1, "rgba(255,180,80,0.04)");
  ctx.strokeStyle = grad;
  ctx.lineCap = "round";

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
  run(9 * bloom, 0.14, "round");
  run(3.4 * bloom, 0.32, "round");
  run(1.6, 1, "miter");
}

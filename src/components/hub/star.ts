/** The star, drawn the same way wherever it appears.
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

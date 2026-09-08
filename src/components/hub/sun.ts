/** The sun in the opening photograph, and where it lands on screen.
 *
 *  MEASURED, NOT EYEBALLED. The layer images were decoded to raw RGB with
 *  dwebp and every pixel above luminance 240 collected: in the back layer that
 *  is 1447 pixels forming a single blob whose centroid is at (48.4%, 29.6%) of
 *  the 2000 x 1906 image, peak luminance 252. The middle layer's bright pixels
 *  are scattered snow highlights, 205 of them with no centre, so the sun
 *  belongs to the back layer and travels at the back layer's rate.
 *
 *  This is the hinge between the two halves of the page. The photograph's sun
 *  and the star at the centre of the orbital system are the same object seen
 *  from two distances, so both the glow that bridges them and the camera that
 *  arrives have to agree on where it is, to the pixel. That agreement lives
 *  here rather than being written out twice. */

/** Its centre, as a fraction of the image. */
export const SUN = { x: 0.484, y: 0.296 };

/** The image it was measured in. */
export const SUN_IMAGE = { w: 2000, h: 1906 };

/** How far the back layer travels, as a percentage of its own height, across
 *  the opener. The original component's furthest rate, and the sun's. */
export const BACK_RATE = 70;

/** Where the sun lands, in pixels, in a `w` by `h` box showing the image under
 *  `object-fit: cover`. Cover scales to the larger ratio and centres the
 *  overflow, so neither the position nor the crop is a constant: on a tall
 *  phone the image is cropped left and right, on a wide desktop top and
 *  bottom, and the sun moves accordingly. */
export function sunInBox(w: number, h: number) {
  const scale = Math.max(w / SUN_IMAGE.w, h / SUN_IMAGE.h);
  const drawnW = SUN_IMAGE.w * scale;
  const drawnH = SUN_IMAGE.h * scale;
  return {
    x: (w - drawnW) / 2 + SUN.x * drawnW,
    y: (h - drawnH) / 2 + SUN.y * drawnH,
  };
}

/** Where the sun sits in the photograph once the opener has been scrolled by
 *  `s`.
 *
 *  The frame rises by `s` while the back layer slides down by `BACK_RATE` per
 *  cent of that, so the sun's net travel is `s * (rate - 1)`: it drifts up at
 *  under a third of the page's speed, which is what reading as "far away"
 *  means. Left to itself that still carries it off the top of the screen before
 *  the frame has gone, measured at a centre of y = -4 in a 968 tall viewport,
 *  which is why the bridge below does not simply follow it. */
export function sunAfterScroll(w: number, h: number, s: number) {
  const at = sunInBox(w, h);
  return { x: at.x, y: at.y - s * (1 - BACK_RATE / 100) };
}

/** Where the light ends up: the point the camera arrives at, as fractions of
 *  the viewport. Deliberately close to where the sun already is in the
 *  photograph, near the top third, so that crossing over asks it to move as
 *  little as possible. Pulling it to the middle of the frame instead was tried
 *  and swung it down through a quarter of the screen while the reader was
 *  scrolling down, which reads as the sun falling. The move to the middle
 *  happens afterwards, inside the orbital scene, where the camera does it by
 *  drifting `focus` and the whole starfield comes with it.
 *
 *  Both halves of the handover read this, which is what stops them
 *  disagreeing. */
export const HANDOVER_FOCUS = { x: 0.484, y: 0.3 };

/** Scroll positions of the crossing, in viewport heights from the top. */
export const CROSSING = {
  /** The light begins to show through the photograph, and from the same
   *  moment begins to settle toward where it will be handed over. Early, while
   *  it is still sitting on the photograph's own sun: waking it later meant
   *  appearing at a sun that had already drifted to the top of the frame. */
  wake: 0.22,
  pull: 0.22,
  /** Full strength. */
  full: 0.8,
  /** The frame is gone and the canvas draws its own Sun from here. */
  handover: 1,
  /** By which point the bridge has handed over completely. */
  gone: 1.32,
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const between = (v: number, a: number, b: number) => clamp((v - a) / (b - a || 1), 0, 1);
const smooth = (v: number) => v * v * (3 - 2 * v);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** The whole crossing as one pure function of scroll, so that what the bridge
 *  draws and what this file claims can never come apart, and so it can be
 *  tested without a browser.
 *
 *  It starts on the photograph's sun and is drawn to the centre of the frame as
 *  the frame falls away: the light does not slide off the top with the picture,
 *  it comes to meet you, which is what moving toward something looks like. By
 *  `handover` it is exactly on HANDOVER_FOCUS, which is where the orbital
 *  chapter puts its own Sun, so there is nothing to see at the join. */
export function bridgeAt(w: number, h: number, scrolled: number) {
  const k = scrolled / h;
  const photo = sunAfterScroll(w, h, scrolled);
  const pull = smooth(between(k, CROSSING.pull, CROSSING.handover));

  return {
    x: mix(photo.x, HANDOVER_FOCUS.x * w, pull),
    y: mix(photo.y, HANDOVER_FOCUS.y * h, pull),
    scale: 1 + 5.5 * smooth(between(k, CROSSING.wake, CROSSING.gone)),
    opacity:
      k < CROSSING.handover
        ? smooth(between(k, CROSSING.wake, CROSSING.full))
        : 1 - smooth(between(k, CROSSING.handover, CROSSING.gone)),
  };
}

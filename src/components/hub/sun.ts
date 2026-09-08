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

/** The layers' opaque edges, as fractions of the image, measured from the
 *  alpha channel of each layer with dwebp: the median first opaque row across
 *  every tenth column.
 *
 *  The mountain-and-figure layer begins at 49.8% and the foreground ridge at
 *  71.1%, and the sun is at 29.6%, above both. That is the whole reason the
 *  glow can sit between the back layer and the mountain and be occluded by the
 *  man rather than painted over him: there is nothing of theirs at the height
 *  the sun is at, and everything of theirs below it. As the glow grows, the
 *  mountain and the figure cut into its lower half, which is what a light
 *  behind a thing looks like. */
export const LAYER_EDGE = { mid: 0.498, front: 0.711 };

/** The glow's life, in viewport heights scrolled from the top of the page.
 *
 *  IT ENDS BEFORE THE NEXT SCENE BEGINS, and that is the point of these
 *  numbers rather than any look. The orbital chapter fades up over the last
 *  0.12 of a viewport before its stage pins, so this is finished at 0.86 and
 *  there is never a frame with two lights in it. Everything about the crossing
 *  that used to be position is now the parallax's job, so all that is left
 *  here is when the light is up and how big it is. */
export const GLOW = {
  /** Begins to show through the photograph, on its own sun. */
  wake: 0.18,
  /** Full strength. */
  full: 0.5,
  /** And out, before the journey's stage begins to show. Early enough to leave
   *  the next scene a long fade rather than a short one; the two windows are
   *  disjoint, which is the invariant that matters. */
  out: 0.76,
  /** How much bigger it gets across its life. */
  growth: 2.8,
  /** Its diameter at rest, as a fraction of the smaller viewport side. */
  size: 0.15,
};

/** Where the orbital chapter puts its Sun as it opens: above the frame, so the
 *  star comes down into the second scene from its top edge rather than
 *  appearing inside the light the first one was holding. It settles onto the
 *  first camera stop from there.
 *
 *  WHERE THE STAR IS ON THE WINDOW when the second scene begins, as fractions
 *  of the viewport. Zero is the top edge, so the star is cut in half by it and
 *  descends into the frame from there.
 *
 *  IT IS A SCREEN POSITION, NOT A CAMERA POSITION, and that is the whole
 *  lesson. `focus` is measured against the stage, and the stage is still
 *  climbing the page while the scene fades up, so a fixed `focus` carries the
 *  star up the window with the arriving section and then reverses when the
 *  stage pins. That reversal is what read as appearing from nowhere. Three
 *  fixed values were tried, a twentieth of a viewport above the stage's middle,
 *  the same below, and a fifth above; the first hid the star for two or three
 *  turns of the wheel, the second had it whole and motionless the instant the
 *  scene appeared, and the third still dipped 19px back above the edge, because
 *  an eased arrival cannot out-run a stage rising at the speed of the scroll.
 *  A search over the easing's share and the starting offset found no pair that
 *  descends throughout.
 *
 *  So the chapter is told where the star should be on the window and works out
 *  the camera from there, subtracting however far the stage still has to
 *  travel. The descent is then monotone by construction rather than by
 *  tuning. */
export const ENTRY_ON_SCREEN = { x: 0.484, y: 0 };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const between = (v: number, a: number, b: number) => clamp((v - a) / (b - a || 1), 0, 1);
const smooth = (v: number) => v * v * (3 - 2 * v);

/** How bright and how big the glow is, given how far the page has scrolled.
 *
 *  A pure function of scroll, so it can be checked without a browser. There is
 *  no position in it: the glow is a layer of the parallax now and travels at
 *  the back layer's rate, which is the sun's own rate, so it cannot drift off
 *  the photograph's sun however the picture moves. */
export function glowAt(h: number, scrolled: number) {
  const k = scrolled / h;
  return {
    scale: 1 + GLOW.growth * smooth(between(k, GLOW.wake, GLOW.out)),
    opacity: smooth(between(k, GLOW.wake, GLOW.full)) * (1 - smooth(between(k, GLOW.full, GLOW.out))),
  };
}

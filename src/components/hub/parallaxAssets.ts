/** The parallax layer artwork, in one place.
 *
 *  OURS, AND ON OUR OWN ORIGIN. Generated for this page and served from
 *  /public. The originals that shipped with the parallax component were
 *  photographs on 21st.dev's CDN: not ours to serve, on somebody else's host,
 *  on a live page.
 *
 *  THE PICTURE IS A CUPOLA OVER THE GULF, and it replaced a mountain on
 *  2026-09-11. The team would not take the mountain's successor, an airlock
 *  film; the brief that came back was that the hero has to read as AI on sight.
 *  So: a robot at the glass of an orbital observation deck, the Palm and the
 *  coastline on the limb below, one sun in the upper right window. The
 *  mountain is tagged `hero/mountain-ascent` and comes back in one checkout.
 *
 *  THE CUT IS ON PLAIN LUMINANCE, AND THAT IS THE GIFT THIS PICTURE GIVES.
 *  Measured over the frame: 61.4 per cent of it under luminance 50, 8.5 per
 *  cent between 50 and 89, 30.1 per cent over 90. Two modes with a valley
 *  between them - the structure and the black space are the first, the view
 *  through the glass is the second - so one threshold separates them and the
 *  alpha ramps across 55 to 92, which is the valley. The mountain had no such
 *  line: snow, sky and haze all overlapped in luminance there, the cut had to
 *  be made on blue minus red, and the middle plane could not be cut at all.
 *
 *  BLACK SPACE STAYS WITH THE NEAR PLATE and that is not a mistake. Space is
 *  as dark as the frame and no rule separates them, so the threshold takes
 *  both. It costs nothing: the pixels are black, they are black in the far
 *  plate too, and black sliding over black is not a thing anyone can see.
 *
 *  SMALL HOLES ARE CLOSED, LARGE ONES ARE NOT. Rivets, seal highlights, the
 *  indicator lamps and the light catching the robot's shoulder all read as
 *  view and all belong to the near plate; the windows read as view and are the
 *  view. The fill is capped by area at 2600px, and the smallest window is far
 *  larger than the largest of the others. 1813 pockets closed, 32870 pixels.
 *
 *  THE NEAR PLATE IS 66 PER CENT OF THE FRAME, which is the one hard
 *  consequence. The mountain's was 24, so the opening line could sit behind it
 *  and be occluded by the climber, which was the effect. Behind this one the
 *  line does not paint at all - measured at 390x844, laid out at top 347 and
 *  278 wide, at full opacity, with not a letter on screen. The line is over
 *  the near plate now and carries its own ground instead. See hub/Ascent.
 *
 *  AND THE SPREAD IS 8, WHERE THE MOUNTAIN'S WAS 60. Two hills can slide a
 *  long way past each other and still read as hills. A window cannot: the far
 *  plate carries its own copy of the frame and the robot, so past about 160
 *  plate pixels of travel the robot doubles and the openings collapse. It was
 *  simulated at 0, 60, 160, 300 and 460 before a rate was chosen. 8 is also
 *  what a window actually does - the view through it shifts a little as you
 *  move, and the frame does not move at all, which is why the near plate is
 *  now at 0. */
export const BACK = "/hero/ascent-back.webp";
export const FRONT = "/hero/ascent-front.webp";

export const CROP_X = 0.68;

export const LAYER_IMG = "h-full w-full object-cover";
/** The same bias, for the style attribute. */
export const LAYER_POS = { objectPosition: `${(CROP_X * 100).toFixed(0)}% 50%` };

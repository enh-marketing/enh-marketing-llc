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
 *  THREE PLATES, AND THE THIRD ONE IS THE ROBOT. The picture has three real
 *  depths in it and they are in this order: the view furthest, the cupola in
 *  the middle, the robot nearest, because he is painted over the frames rather
 *  than behind them.
 *
 *  HE COULD NOT BE CUT BY ANY RULE. Measured across his own region the
 *  luminance runs 6 at the tenth percentile to 215 at the ninetieth, brushed
 *  titanium in shadow through to specular highlight, and the window beside him
 *  runs 4 to 204. The two ranges sit on top of each other; no threshold
 *  separates him from either the dark frame or the bright glass.
 *
 *  SO HE WAS CUT BY SUBTRACTION. The same frame was generated a second time
 *  with the cupola empty, image to image off the first so the camera did not
 *  move, and the difference between the two is the robot exactly. It was
 *  checked before it was trusted: over the whole frame the two differ by a
 *  mean of 29.4 with 9.7 per cent of pixels past 40, and outside his box by a
 *  mean of 7.2 with 1.7 per cent - which is the number that matters, because
 *  it says the second render kept the frame instead of redrawing it. An
 *  earlier attempt run as text to image rather than image to image differed by
 *  217 over 79 per cent of the frame and was useless.
 *
 *  WHAT THE MATTE STILL NEEDED. Holes, where his own tone happened to match
 *  what was painted behind him: closed by filling anything the outside cannot
 *  reach, 40,555 px. And thin horizontal streaks where the second render
 *  redrew a couple of frame lines a hair differently: they reach to x 0.386
 *  and he starts at 0.551, so they are pruned by box. Eroding them away was
 *  tried first and it severed his arms and legs.
 *
 *  THE FAR AND MID PLATES COME OFF A CLEAN FRAME, which is the original
 *  everywhere and the emptied render only where he stood. Outside his box the
 *  two agree to a mean of 7.2, so the join does not show; inside it, only the
 *  emptied one has anything to show at all.
 *
 *  AND THE SPREAD IS 14 NOW, WHERE THE TWO-PLATE VERSION HAD 8 AND THE
 *  MOUNTAIN HAD 60. What capped it at 8 was the far plate carrying its own
 *  copy of the robot: past about 160 plate pixels he doubled. He is in no
 *  plate but the near one now, so that limit is gone. What remains is the
 *  window: the far plate still holds the cupola, so far against mid stays
 *  inside the same 160, which is 7. Mid against near gets the other 7 and the
 *  robot stands proud of the frame without floating off it.
 *
 *  THE NEAR PLATES TOGETHER ARE 72 PER CENT OF THE FRAME, which is the one
 *  hard consequence. The mountain's was 24, so the opening line could sit
 *  behind it and be occluded by the climber, which was the effect. Behind
 *  these the line does not paint at all - measured at 390x844, laid out at top
 *  347 and 278 wide, at full opacity, with not a letter on screen. The line is
 *  over them now and carries its own ground instead. See hub/Ascent. */
export const FAR = "/hero/ascent-far.webp";
export const MID = "/hero/ascent-mid.webp";
export const NEAR = "/hero/ascent-near.webp";

export const CROP_X = 0.68;

export const LAYER_IMG = "h-full w-full object-cover";
/** The same bias, for the style attribute. */
export const LAYER_POS = { objectPosition: `${(CROP_X * 100).toFixed(0)}% 50%` };

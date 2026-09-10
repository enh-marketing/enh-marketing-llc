/** The parallax layer artwork, in one place.
 *
 *  OURS NOW, AND ON OUR OWN ORIGIN. These were the demo photographs that ship
 *  with @osmosupply/parallax-scrolling, served from 21st.dev's CDN: not ours to
 *  serve, on somebody else's host, on a live page. They are replaced by art
 *  generated for this page and served from /public, which is the last thing
 *  that had to happen before this hero could be called finished.
 *
 *  TWO PLATES, AND THERE WERE THREE. The originals were back, mid and front,
 *  the mid carrying the mountain at its own rate between the sky and the near
 *  ground. A middle plate needs a matte cut along the mountain's own silhouette,
 *  and in this picture that boundary cannot be found by rule: the snow is
 *  bright and warm, the sky behind it is bright and neutral, and the haze below
 *  it is dark and blue, so every threshold that separates two of them merges the
 *  third. The nearest clean line runs almost horizontally at 0.51 of the frame,
 *  straight through the mountain, and a plate cut there would tear the mountain
 *  in half and slide the pieces against each other.
 *
 *  So the front plate is cut and the mountain stays with the sky. The spread is
 *  unchanged, 70 against 10, which is what the eye reads as depth; what is lost
 *  is one intermediate step. A proper mid matte wants a segmentation pass or ten
 *  minutes in Photoshop, and can be dropped in here without touching anything
 *  else.
 *
 *  THE FRONT PLATE IS CUT ON BLUE MINUS RED, not on luminance. The near ground
 *  is lit tussock and dark rock, warm and mixed, and the haze behind it is
 *  uniformly blue: measured across the frame the ridge sits between -6 and +7
 *  and the haze between +25 and +78, which is a gap nothing else on that line
 *  falls into. The alpha ramps across 6 to 24 of that difference, so the
 *  silhouette is anti-aliased rather than stepped, and only the one connected
 *  region that reaches the bottom edge is kept, which is the ridge with the
 *  climber standing on it. */
export const BACK = "/hero/ascent-back.webp";
export const FRONT = "/hero/ascent-front.webp";

/** How every layer image is fitted. */
export const LAYER_IMG = "h-full w-full object-cover";

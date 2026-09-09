/** The orbital placement from 21st.dev's Circular Carousel, driven by scroll.
 *
 *  SOURCE: @nexus-ui/circular-carousel, fetched from the registry rather than
 *  reconstructed. Chosen by name: "i was expecting this kind of text scroll".
 *
 *  WHAT IS KEPT IS THE PART THAT IS THE COMPONENT. Its `getItemPosition` is
 *  four lines of arithmetic and every one of them is doing something you can
 *  see:
 *
 *    const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
 *    const x = Math.sin(angle) * RADIUS_X;
 *    const y = -Math.cos(angle) * RADIUS_Y;
 *    const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
 *    const opacity = Math.max(0.3, 1 - (distance / maxDistance) * 0.7);
 *
 *  `sin` along the run is the whole reason it does not read as a list sliding
 *  past: a card a station away has moved 0.588 of the radius and a card two
 *  away only 0.951, so they crowd towards the ends of the track and slow into
 *  them, which is what going round something looks like from the side. `-cos`
 *  across it is the arc: furthest out at the middle, curving back at both ends.
 *  The scale and the dim are the depth, and they fall off with distance rather
 *  than switching between states.
 *
 *  WHAT IS NOT KEPT IS THE CHROME, and none of it was the component either: an
 *  autoplay timer, chevrons, dot indicators, an "01 of 06" counter, arrow-key
 *  handling and an `activeIndex` of its own. This run's index is the scroll
 *  position. A second thing driving it would be a second thing fighting the
 *  scroll, and the page has one input by design.
 *
 *  ONE OTHER DEPARTURE, DELIBERATE. The original wraps: item 6 of 6 arcs round
 *  and comes back as the one before item 1. This run is 01 to 07 in order and
 *  has an end, so it does not wrap; `at` simply runs past the ends and the
 *  edge fade takes the far ones off. Wrapping would tell a reader the story
 *  loops, and it does not. */

/** The component's own constants. */
const VISIBLE_COUNT = 5;
const HALF = Math.floor(VISIBLE_COUNT / 2);
/** `half + 1`, the distance at which scale and opacity reach their floors. */
const MAX_DISTANCE = HALF + 1;

/** How far past the last lit station a card takes to go, in stations.
 *
 *  THE ORIGINAL HAS NO NEED OF THIS AND THIS RUN DOES. It culls a card the
 *  frame it leaves the visible five and lets AnimatePresence fade the leaver
 *  over 0.65s, which works because its index steps. Ours is continuous: a card
 *  cut at a fixed distance would vanish mid-scroll at 0.3 opacity, which is the
 *  one thing the component's own falloff is there to avoid. So the floor is
 *  taken to nothing over the last stretch instead. */
const EDGE_FROM = 1.55;
const EDGE_OVER = 0.85;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const smooth = (v: number) => v * v * (3 - 2 * v);

export type Seat = {
  /** Along the run, -1 to 1 of the radius. `sin`, so it decelerates. */
  along: number;
  /** Across it, 0 on the station being read and rising to either side. `cos`,
   *  re-origined onto the active card so the run's own axis is the card's. */
  depth: number;
  scale: number;
  /** The component's falloff, taken to nothing at the edge. */
  opacity: number;
  z: number;
};

/** Where the station `d` stations from the one being read sits on the arc.
 *  `d` is fractional and signed: -0.5 is half a station back up the run. */
export function seat(d: number): Seat {
  const angle = (d / VISIBLE_COUNT) * Math.PI;
  const distance = Math.abs(d);
  const fade = 1 - smooth(clamp((distance - EDGE_FROM) / EDGE_OVER, 0, 1));
  return {
    along: Math.sin(angle),
    depth: 1 - Math.cos(angle),
    scale: Math.max(0, 1 - (distance / MAX_DISTANCE) * 0.3),
    opacity: Math.max(0.3, 1 - (distance / MAX_DISTANCE) * 0.7) * fade,
    z: Math.round(VISIBLE_COUNT - Math.min(distance, VISIBLE_COUNT)),
  };
}

/** Past this there is nothing left to draw, so nothing is mounted. */
export const SEAT_LIMIT = EDGE_FROM + EDGE_OVER;

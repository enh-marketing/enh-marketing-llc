/** The chart the Sun travels, and where the Sun is on it at any point.
 *
 *  ONE SOURCE FOR BOTH HALVES. The chapter drives the component's `focus` along
 *  this path so its own Sun walks the shape, and TrackChart draws the same
 *  path underneath. If they each held their own copy they would drift apart on
 *  the first edit, and the Sun would run beside the line instead of along it.
 *
 *  IT IS THE PATH AHEAD, NOT THE TRAIL BEHIND. The line ahead of the Sun is
 *  where it is going, the line behind it is where it has been, and scrolling
 *  moves it along.
 *
 *  VERTICES ARE FRACTIONS OF THE FRAME, so the chart is composed against the
 *  viewport rather than against the scene's own scale, and it is whole and the
 *  same shape at every size.
 *
 *  IT NOW BEGINS WHERE THE VOICE ENDS, which is the whole reason this file
 *  changed. The waveform before it sits on a horizontal axis at HANDOVER_Y with
 *  the Sun at its left end, so the chart opens there, flat, at exactly that
 *  height. The reader does not see a line start; they see the line they were
 *  already watching stop speaking and set off.
 *
 *  THE FIRST MOVE IS A SETTLE, NOT A RISE. From the top of the frame there is
 *  nowhere to rise to, so the shape needs room made for it: the line holds its
 *  height, then glides down to a baseline, and only then does the sequence
 *  asked for begin. That descent is geometry in this array rather than a camera
 *  move over the top of it, which is what keeps the whole leg to one moving
 *  part.
 *
 *  After the settle it reads rise, dip, rise, dip, rise, and finishes high. */

/** WHERE THE THREE CHAPTERS MEET, as fractions of the frame. The last camera
 *  stop of the system chapter puts the Sun here, the uplink chapter puts the
 *  waveform's axis here, and the chart opens here, so all three agree by
 *  construction rather than by separate numbers being kept in step.
 *
 *  THE HEIGHT IS SET BY THE WAVEFORM, WHICH IS THE TALLEST THING THAT HAS TO
 *  FIT. Its crest is A2 of half the canvas, before WAVE_SCALE 0.6, and the
 *  canvas is the window's longer side, so at 1600x950 the wave reaches about
 *  230px above and below its axis at the top of its own slow swell and about
 *  192px on an ordinary frame. At the 0.2 this used to be, the axis had 190px
 *  of room over a header that is 84px tall, so the wave's crest ran behind the
 *  header and off the top of the frame on every peak, and the star at the same
 *  height put the brightest pixel on the page 7px from the top edge.
 *
 *  0.32 is the compromise: 304px of headroom clears the header on an ordinary
 *  frame with 28px to spare, and only the tallest swell grazes it. Lower and
 *  the wave is cropped; much higher and the thing stops reading as travelling
 *  along the top of the frame, which is what it is meant to be doing. This is
 *  the one number to move if the framing wants adjusting; everything else
 *  follows it.
 *
 *  THE ACROSS IS SET BY THE CHART, which has to travel, so it starts near the
 *  left and finishes at 0.9. That is why the Sun ends its chapter over on the
 *  left with its trails running off that edge: it is standing where the line
 *  begins. */
export const HANDOVER_Y = 0.32;
export const HANDOVER_X = 0.12;

export const CHART_PATH: Array<[number, number]> = [
  [HANDOVER_X, HANDOVER_Y],  // where the voice left it
  [0.26, HANDOVER_Y],  // still flat: the line is travelling, not yet charting
  [0.36, 0.62],        // the settle, making room for the shape
  [0.46, 0.42],        // rise
  [0.55, 0.56],        // dip
  [0.66, 0.34],        // rise
  [0.74, 0.48],        // dip
  [0.9, 0.14],         // and the last rise, finishing high
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/** Cumulative length along the path, in frame units, so the Sun moves at an
 *  even rate rather than hurrying through the short segments. */
const SPANS = (() => {
  const out: number[] = [0];
  for (let i = 1; i < CHART_PATH.length; i++) {
    const [ax, ay] = CHART_PATH[i - 1];
    const [bx, by] = CHART_PATH[i];
    out.push(out[i - 1] + Math.hypot(bx - ax, by - ay));
  }
  return out;
})();

const TOTAL = SPANS[SPANS.length - 1];

/** A point on the chart, `u` from 0 at its left end to 1 at the Sun's finish. */
export function chartPointAt(u: number): [number, number] {
  const want = clamp(u, 0, 1) * TOTAL;
  for (let i = 1; i < SPANS.length; i++) {
    if (want <= SPANS[i] || i === SPANS.length - 1) {
      const seg = SPANS[i] - SPANS[i - 1] || 1;
      const k = clamp((want - SPANS[i - 1]) / seg, 0, 1);
      const [ax, ay] = CHART_PATH[i - 1];
      const [bx, by] = CHART_PATH[i];
      return [ax + (bx - ax) * k, ay + (by - ay) * k];
    }
  }
  return CHART_PATH[0];
}

/** Where the Sun is at a given point in the chart leg.
 *
 *  THERE IS NO RUN-IN ANY MORE, and its removal is the tidiest thing about the
 *  reorder. It existed because the chart used to begin at the lower left while
 *  the Sun was mid-frame, so a stretch of the leg was spent travelling to the
 *  start before the shape could begin. The chart now opens at the Sun's own
 *  position, so the leg is the shape and nothing else. */
export function chartFocus(chart: number): [number, number] {
  return chartPointAt(clamp(chart, 0, 1));
}

/** How far along the drawn line the Sun has got. With the run-in gone this is
 *  simply the leg's own progress, kept as a function so the two call sites do
 *  not have to know that. */
export function chartTravelled(chart: number): number {
  return clamp(chart, 0, 1);
}

/** The chart as far as `u`, as its own vertices plus the exact point at `u`.
 *
 *  NOT RESAMPLED. Walking the path at even spacing and stroking that put every
 *  corner between two samples, so each turn was drawn slightly rounded and the
 *  wide strokes threw a fold past the thin one. The corners are the whole point
 *  of a chart line, so they are drawn as themselves. */
export function chartPolylineTo(u: number): Array<[number, number]> {
  const want = clamp(u, 0, 1) * TOTAL;
  const out: Array<[number, number]> = [CHART_PATH[0]];
  for (let i = 1; i < SPANS.length; i++) {
    if (SPANS[i] <= want) {
      out.push(CHART_PATH[i]);
      continue;
    }
    const seg = SPANS[i] - SPANS[i - 1] || 1;
    const k = clamp((want - SPANS[i - 1]) / seg, 0, 1);
    const [ax, ay] = CHART_PATH[i - 1];
    const [bx, by] = CHART_PATH[i];
    if (k > 0) out.push([ax + (bx - ax) * k, ay + (by - ay) * k]);
    break;
  }
  return out;
}

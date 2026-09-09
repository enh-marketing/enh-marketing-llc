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

/** THE ONE THING THE THREE CHAPTERS SHARE, as a fraction of the frame height.
 *
 *  ONLY THE HEIGHT, AND THAT IS THE POINT. An earlier version also pinned the
 *  across, dragging the system's last camera stop over to 0.12 so the Sun would
 *  finish exactly on the chart's first vertex. That is what made the scene slide
 *  off to the left and end up behind the copy. It was never necessary: the
 *  waveform sits between the two, it is drawn full width, and it is opaque, so
 *  the Sun is not on screen at the moment the chart's own Sun appears. Nothing
 *  has to line up across. The height does, because the trails, the waveform's
 *  axis and the chart's opening are all the same horizontal line to the reader.
 *
 *  0.6 IS WHERE THE SYSTEM ALREADY WAS, at the AI & Automation stop, and the
 *  last stop now stays there instead of travelling. So this number is not a
 *  compromise between three chapters, it is the one the picture already had,
 *  and the other two were moved onto it.
 *
 *  It also suits the waveform, which is the tallest thing that has to fit: its
 *  crest reaches about 230px either side of its axis at 1600x950, so an axis at
 *  570px clears the 84px header by a long way and its lower peaks stay inside
 *  the frame. And it suits the chart, which no longer has to settle downwards
 *  before it can rise. */
export const HANDOVER_Y = 0.6;

/** WHERE THE STAR RESTS, as a fraction of the frame width. Dead centre, which
 *  is where the system now parks it, where the waveform's own centre is, and
 *  where the chart's flat run ends. The star is lit at this one point for three
 *  chapters running and never moves until the chart takes it away up the line.
 *
 *  IT HAS TO BE THE SAME ON EVERY SCREEN, which is why `lead` is zero at the
 *  camera stops that matter: `lead` is a fraction of the SHORT side while
 *  `focus` is a fraction of the width, so with it on, the star's position
 *  depended on the aspect ratio and no single number here could match it. */
export const HANDOVER_X = 0.5;

/** THE SHAPE. It runs flat, then rises, dips, rises, dips, and rises to finish
 *  high, and nothing else happens. There is no settle any more: that move only
 *  existed because the line used to open at 0.2, where there was nowhere above
 *  it to go.
 *
 *  IT STARTS OFF THE LEFT EDGE, at x 0, and the flat run is already drawn when
 *  the chapter opens. The waveform collapses onto its axis and leaves a flat
 *  line lying across the whole frame; if the chart then began as a dot that
 *  line would vanish and a new one would start growing. Beginning at the edge,
 *  with the flat leg pre-drawn, means the line the reader is watching is never
 *  taken away: it simply starts to bend. See chartU below.
 *
 *  AND THE BEND BEGINS UNDER THE STAR, at HANDOVER_X, because that is where the
 *  star has been standing since the system chapter. So the shape has the right
 *  half of the frame to happen in, which is why the vertices are packed tighter
 *  than a chart drawn across a whole frame would be. */
export const CHART_PATH: Array<[number, number]> = [
  [0, HANDOVER_Y],           // off the left edge, where the voice left the line
  [HANDOVER_X, HANDOVER_Y],  // still flat, and where the star has been waiting
  [0.59, 0.46],              // rise
  [0.67, 0.56],              // dip
  [0.77, 0.34],              // rise
  [0.85, 0.46],              // dip
  [0.97, 0.12],              // and the last rise, finishing high
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

/** How much of the path is already there before the leg begins: the flat run,
 *  which is the line the waveform leaves lying across the frame. The leg's own
 *  progress is spent on what is left, so scrolling draws the shape rather than
 *  re-drawing a straight line the reader can already see. */
const FLAT_U = SPANS[1] / TOTAL;

/** How long the star stands still at the start of the leg, as a fraction of it.
 *
 *  IT COVERS THE CROSS-FADE, AND THAT IS THE WHOLE REASON FOR IT. The voice and
 *  the chart overlap: measured on the build, the voice is still at 0.70 opacity
 *  1.25 viewports into the chart leg and only reaches zero at 0.008 a viewport
 *  after that. Both chapters draw a star. Without a hold the chart's had
 *  already set off up the line while the voice's was still lit at the handover
 *  point, so there were two stars on screen 70px apart, which is precisely the
 *  seam this is all meant not to have. Held, they are the same star in the same
 *  place, and only one of them is left when it starts to move.
 *
 *  Nothing is standing still while it holds: the waveform is collapsing onto
 *  the line underneath it for the whole of this stretch. */
const HOLD = 0.22;

/** The leg's progress mapped onto the path, held at the handover point across
 *  the cross-fade and then spending what is left on the shape. */
function chartU(chart: number): number {
  const moved = clamp((clamp(chart, 0, 1) - HOLD) / (1 - HOLD), 0, 1);
  return FLAT_U + (1 - FLAT_U) * moved;
}

/** Where the Sun is at a given point in the chart leg. It starts at the end of
 *  the flat run rather than at the left edge, so it is standing on the line the
 *  voice left rather than dragging it into being. */
export function chartFocus(chart: number): [number, number] {
  return chartPointAt(chartU(chart));
}

/** How far along the drawn line the Sun has got. */
export function chartTravelled(chart: number): number {
  return chartU(chart);
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

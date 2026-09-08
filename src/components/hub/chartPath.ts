/** The chart the Sun travels, and where the Sun is on it at any point.
 *
 *  ONE SOURCE FOR BOTH HALVES. The chapter drives the component's `focus` along
 *  this path so its own Sun walks the shape, and TrackChart draws the same
 *  path underneath. If they each held their own copy they would drift apart on
 *  the first edit, and the Sun would run beside the line instead of along it.
 *
 *  IT IS THE PATH AHEAD, NOT THE TRAIL BEHIND. The earlier version bent the
 *  Sun's wake into a chart, which put the shape behind a Sun that was still
 *  going straight. Here the shape is the route: the line ahead of the Sun is
 *  where it is going, the line behind it is where it has been, and scrolling
 *  moves it along.
 *
 *  VERTICES ARE FRACTIONS OF THE FRAME, so the chart is composed against the
 *  viewport rather than against the scene's own scale, and it is whole and the
 *  same shape at every size. They read left to right and end high, with two
 *  falls in the middle, which is the shape of the reference. */
export const CHART_PATH: Array<[number, number]> = [
  [0.1, 0.8],
  [0.26, 0.6],
  [0.36, 0.7],
  [0.5, 0.46],
  [0.6, 0.58],
  [0.74, 0.34],
  [0.88, 0.24],
];

/** Where the Sun sits before it joins the chart: the camera's own focus at the
 *  stop before, so the run-in starts from where it already is. */
export const CHART_ENTRY: [number, number] = [0.62, 0.6];

/** How much of the chart leg is spent getting to the start of the line. The
 *  Sun is mid-frame when the leg opens and the chart begins at the lower left,
 *  so it has to travel there before it can travel the shape. */
export const RUN_IN = 0.28;

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

/** Where to put `focus` for a given point in the chart leg: the run-in first,
 *  then the chart itself. */
export function chartFocus(chart: number): [number, number] {
  const c = clamp(chart, 0, 1);
  if (c <= RUN_IN) {
    const k = c / RUN_IN;
    const e = k * k * (3 - 2 * k);
    const [sx, sy] = CHART_ENTRY;
    const [tx, ty] = CHART_PATH[0];
    return [sx + (tx - sx) * e, sy + (ty - sy) * e];
  }
  return chartPointAt((c - RUN_IN) / (1 - RUN_IN));
}

/** How far along the drawn line the Sun has got, 0 before it joins. */
export function chartTravelled(chart: number): number {
  const c = clamp(chart, 0, 1);
  return c <= RUN_IN ? 0 : (c - RUN_IN) / (1 - RUN_IN);
}

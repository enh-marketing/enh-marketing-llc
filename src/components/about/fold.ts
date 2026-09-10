/* The team chapter's folding rule, solved offline.
 *
 *  WHY THIS IS DATA. Nine segments on eight hinges, twenty-five states from
 *  bundled to open, every vertex the product of a cos and a sin. Computing that
 *  at render time would put five hundred unrounded doubles into JSX, and on
 *  this site one double that prints a different final digit in Node than in V8
 *  costs the whole route its hydration -- React discards the island rather than
 *  patching the attribute. So it is solved once, rounded to one decimal, and
 *  committed. Server and browser emit identical markup by construction.
 *
 *  WHY IT OPENS HINGE BY HINGE. The first attempt straightened all eight hinges
 *  together, which is not how anyone opens a rule and, worse, made the chain
 *  walk 340 units down and out of the frame at the halfway state. Opening from
 *  the held end keeps the un-opened remainder a compact bundle hanging off the
 *  working tip.
 *
 *  WHY THE FOLD IS 175.5 DEGREES AND NOT 170. At 170 the bundle spread to 294
 *  units and read as a loose zig-zag; a folded rule in a pocket is tight. At
 *  175.5 the leaves sit about ten units apart, which is a bundle, and the whole
 *  object fits a shorter box.
 *
 *  THE BOX CROPS THE SWING RATHER THAN SIZING FOR IT, DELIBERATELY. Measured
 *  across all twenty-five states, y runs 69.2 to 322.8 around a run at y=196.
 *  That 126-unit excursion either side is one hinge caught mid-rotation with
 *  the remainder pointing straight up or straight down: unavoidable with
 *  segments this long, and the thing that makes the unfold read as physical
 *  rather than as a line growing. Sizing the box for all of it left a 279px
 *  band containing, at rest, a single 15-unit-thick rule -- mostly void. The
 *  viewBox is `0 96 1200 200`, centred on the run, which crops about 27 units
 *  off the tip of the two most extreme mid-states. A rule momentarily
 *  extending past the frame while it is being unfolded is what unfolding one
 *  looks like; a band of empty paper at rest is not.
 *
 *  Each state is the polyline through all ten vertices, in order. Interior
 *  vertices are the hinges; the last is the working tip.
 */
export const FOLD: readonly (readonly (readonly [number, number])[])[] = [
  [[30,196],[156,196],[30.4,205.9],[156.4,205.9],[30.8,215.8],[156.8,215.8],[31.2,225.7],[157.2,225.7],[31.6,235.5],[157.6,235.5]],
  [[30,196],[156,196],[98.8,308.3],[164.6,200.8],[107.4,313.1],[173.3,205.7],[116.1,317.9],[181.9,210.5],[124.7,322.8],[190.5,215.3]],
  [[30,196],[156,196],[221.8,303.4],[164.6,191.2],[230.5,298.6],[173.3,186.3],[239.1,293.8],[181.9,181.5],[247.7,288.9],[190.5,176.7]],
  [[30,196],[156,196],[282,196],[156.4,186.1],[282.4,186.1],[156.8,176.2],[282.8,176.2],[157.2,166.3],[283.2,166.3],[157.6,156.5]],
  [[30,196],[156,196],[282,196],[224.8,83.7],[290.6,191.2],[233.4,78.9],[299.3,186.3],[242.1,74.1],[307.9,181.5],[250.7,69.2]],
  [[30,196],[156,196],[282,196],[347.8,88.6],[290.6,200.8],[356.5,93.4],[299.3,205.7],[365.1,98.2],[307.9,210.5],[373.7,103.1]],
  [[30,196],[156,196],[282,196],[408,196],[282.4,205.9],[408.4,205.9],[282.8,215.8],[408.8,215.8],[283.2,225.7],[409.2,225.7]],
  [[30,196],[156,196],[282,196],[408,196],[350.8,308.3],[416.6,200.8],[359.4,313.1],[425.3,205.7],[368.1,317.9],[433.9,210.5]],
  [[30,196],[156,196],[282,196],[408,196],[473.8,303.4],[416.6,191.2],[482.5,298.6],[425.3,186.3],[491.1,293.8],[433.9,181.5]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[408.4,186.1],[534.4,186.1],[408.8,176.2],[534.8,176.2],[409.2,166.3]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[476.8,83.7],[542.6,191.2],[485.4,78.9],[551.3,186.3],[494.1,74.1]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[599.8,88.6],[542.6,200.8],[608.5,93.4],[551.3,205.7],[617.1,98.2]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[534.4,205.9],[660.4,205.9],[534.8,215.8],[660.8,215.8]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[602.8,308.3],[668.6,200.8],[611.4,313.1],[677.3,205.7]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[725.8,303.4],[668.6,191.2],[734.5,298.6],[677.3,186.3]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[660.4,186.1],[786.4,186.1],[660.8,176.2]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[728.8,83.7],[794.6,191.2],[737.4,78.9]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[851.8,88.6],[794.6,200.8],[860.5,93.4]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[912,196],[786.4,205.9],[912.4,205.9]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[912,196],[854.8,308.3],[920.6,200.8]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[912,196],[977.8,303.4],[920.6,191.2]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[912,196],[1038,196],[912.4,186.1]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[912,196],[1038,196],[980.8,83.7]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[912,196],[1038,196],[1103.8,88.6]],
  [[30,196],[156,196],[282,196],[408,196],[534,196],[660,196],[786,196],[912,196],[1038,196],[1164,196]],
] as const;

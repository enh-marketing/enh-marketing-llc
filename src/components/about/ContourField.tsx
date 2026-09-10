import { CONTOURS } from "@/components/about/contours";
import { cn } from "@/lib/cn";

/** The ground the About page opens on: a contour map, read by the cursor.
 *
 *  WHY TERRAIN, AND WHY IT IS THE ONLY PAGE THAT HAS IT. The company is named
 *  for the thing this draws. "ENH" is Explore New Heights, the tagline is in
 *  lib/content, and the source document's own second heading is "Explore New
 *  Heights". So the page's atmosphere is a height, and the reader is standing
 *  on it before a single word is read.
 *
 *  IT REPLACES THE GRID, IT DOES NOT JOIN IT. Every other hero on this site
 *  carries the same 80px masked grid behind the aurora. Three ground layers
 *  would be noise, and the grid is the thing this page has something better to
 *  say than. The aurora stays, because that is the house atmosphere and it is
 *  what makes the hero belong; the grid does not.
 *
 *  THE INTERACTION IS THE POINT AND IT COSTS NOTHING. The field is drawn twice
 *  from ONE set of paths: once in the hairline tone, and once in brand red
 *  behind a soft radial mask that follows the pointer. Moving the cursor warms
 *  the ground under it, so the reader is reading elevation off a map rather
 *  than watching a decoration. No page on this site had a cursor-reactive
 *  ground before, and the whole thing is two CSS custom properties written
 *  straight to the element -- no state, no re-render, no animation frame. The
 *  section that owns the pointer sets --hx and --hy; see AboutMasthead.
 *
 *  THE SECOND COPY IS A <use>, NOT A SECOND SET OF PATHS. Fourteen kilobytes of
 *  path data ships once and the red pass references it, which is the ordinary
 *  SVG sprite mechanism. The mask lives on the wrapping HTML element rather
 *  than on an SVG node, because `mask-image` on a <div> is supported everywhere
 *  without qualification. If a browser ever failed the <use>, the red pass
 *  would simply be absent and the terrain would still be there -- the failure
 *  falls the right way.
 *
 *  NOTHING HERE ANIMATES, so there is nothing for prefers-reduced-motion to
 *  switch off. A reader who has asked for no motion still gets the map and
 *  still gets the pointer reading it, which is the state that shows the most.
 *
 *  WEIGHTS ARE CARTOGRAPHIC, NOT DECORATIVE. Every fourth line is heavier --
 *  the index-contour convention -- because thirteen identical hairlines at this
 *  spacing read as moire rather than as ground. See contours.ts for how the
 *  geometry is produced and why it is committed rather than computed. */

/** The levels the field was sampled at, ascending. Position in this list is
 *  what sets a line's weight, so no arithmetic on a float reaches the markup. */
const LEVELS = [...new Set(CONTOURS.map(([, level]) => level))].sort((a, b) => a - b);

/** Index contours (every fourth) carry the heavier stroke. */
const WEIGHT = (level: number) => (LEVELS.indexOf(level) % 4 === 0 ? 1.5 : 0.9);

const ID = "about-terrain";

export function ContourField({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {/* The ground. `slice` so the field always fills the hero whatever the
          viewport's proportion, and non-scaling-stroke so a line stays a
          hairline however far the artwork is scaled up to do it. */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden
        fill="none"
      >
        <defs>
          <g id={ID}>
            {CONTOURS.map(([d, level], i) => (
              <path
                key={i}
                d={d}
                strokeWidth={WEIGHT(level)}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        </defs>

        {/* ASH AT LOW OPACITY, NOT --color-line. On paper the hairline token is
            #d2cdc3 against a #e6e3de page: measured, the terrain was invisible
            on the left half of the fold and the only thing anyone could see was
            the red. Ash at a fifth carries in both themes, and the field is
            atmosphere rather than a line that means something, so it does not
            want full ash either. */}
        <use href={`#${ID}`} stroke="var(--color-ash)" opacity="0.34" />
      </svg>

      {/* The reading. Same paths, brand red, behind a mask the pointer moves.
          The default position sits over the main summit, which is where a touch
          device -- with no pointer to follow -- leaves it.

          RESTRAINT IS THE WHOLE DIFFERENCE HERE. The first build ran the red at
          full strength through a 26rem mask and the fold read as a red blob with
          a headline on it: the accent stopped being an accent. A patch at just
          over half opacity warms the ground under the cursor and leaves the type
          the loudest thing on the page, which is the right order.

          THE PATCH IS SIZED IN vw, NOT rem, AND THAT MATTERS ON A PHONE. At a
          fixed 17rem it covered seventy per cent of a 390px viewport -- and a
          phone has no pointer, so it sat there permanently as a red bloom
          rather than reading as something the cursor was doing. Clamped against
          the viewport it stays the same fraction of the fold at every width. */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          maskImage:
            "radial-gradient(clamp(8rem, 20vw, 18rem) clamp(8rem, 20vw, 18rem) at var(--hx, 68%) var(--hy, 32%), #000 0%, rgba(0,0,0,0.42) 46%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(clamp(8rem, 20vw, 18rem) clamp(8rem, 20vw, 18rem) at var(--hx, 68%) var(--hy, 32%), #000 0%, rgba(0,0,0,0.42) 46%, transparent 72%)",
        }}
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden
          fill="none"
        >
          <use href={`#${ID}`} stroke="var(--color-brand)" />
        </svg>
      </div>
    </div>
  );
}

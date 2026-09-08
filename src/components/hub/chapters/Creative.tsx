"use client";

import { GrainientImagesSection } from "@/components/hub/GrainientImagesSection";
import { GRAINIENT_TILES } from "@/components/hub/grainientTiles";

/** The creative chapter: a field of images flown at the camera.
 *
 *  The rest of the page is drawn, and this one is not. After a solar system and
 *  before a black hole, a chapter made of flat pictures rushing past is the
 *  change of material the page needs, and it is the right material for the
 *  category it carries.
 *
 *  ALL OF THIS IS THE WRAPPER'S JOB. The component underneath is imported
 *  unchanged, so everything that has to be different about it happens here.
 *  Five things do, and each was checked against the file rather than assumed:
 *
 *  1. `tiles`. Left out, the component falls back to thirteen PNGs on the
 *     component author's own domain as the visual body of an ENH page. Ours
 *     copy its exact geometry and change only the artwork; see hub/grainientTiles.ts.
 *
 *  2. `title` and `titleLine2`, blanked. They are ES default parameters, so
 *     omitting them is not neutral: it ships the demo's own marketing line,
 *     "More than Gradients, A complete Visual Engine", into our page. No gate
 *     would catch it either, since check:copy reads content files and not a
 *     string baked into a component. Chapters on this page carry no copy of
 *     their own; the words belong to Journey's beat.
 *
 *  3. The background. The component paints `background: #000` on its own
 *     section. Inside the machine that is an opaque plate at full opacity for
 *     the chapter's whole length, which would hide the next chapter's fade-in
 *     and hard-cut the previous one's dissolve, so the joins either side would
 *     stop being joins. The override below makes it transparent and lets
 *     Journey's own black show through.
 *
 *  4. The scrim, and its z-index. The component's stage is `z-index: 1`, so a
 *     scrim that is merely a later sibling still paints underneath the tiles.
 *     It has to say 2. Journey's beat layer carries no scrim of its own, and
 *     these tiles are bright.
 *
 *  5. `aria-hidden`. The component renders its own <h2> unconditionally and
 *     offers no way to suppress the element, only to empty it. Its subtree has
 *     nothing focusable and every tile is alt="", so hiding the whole thing
 *     from assistive technology loses nothing and leaves the chapter's real
 *     heading to Journey.
 *
 *  WHY `t * TILE_PHASE`. The component spends its first 75% flying the tiles
 *  and its last 25% scaling in the title we just blanked. Handed `t` straight
 *  through, the chapter would end on a quarter of a viewport of nothing. Mapped
 *  onto the flight instead, the tiles run the full length of the chapter and
 *  reach zero exactly as it ends, which is where Horizon fades up.
 *
 *  `forceProgress` IS PASSED UNCONDITIONALLY AND UNGUARDED. The component tests
 *  `forceProgress != null && Number.isFinite(forceProgress)` to decide whether
 *  it is driven or self-driving. Hand it undefined even once and it reverts:
 *  it grows a 300vh track inside a 100vh clipped box, attaches window,
 *  document-capture and resize listeners plus a ResizeObserver, and then
 *  measures a track that is pinned and cannot move. Journey's local progress is
 *  always a finite number, so there is nothing to guard against, and a
 *  defensive `Number.isFinite(t) ? t : 0` would only convert a loud failure
 *  into a silent one. It also needs no clamping: the component clamps it. */

/** The share of the component's run that is the tiles' flight. Its own
 *  IMAGE_ZOOM_VH / TRACK_VH, which is 150 / 200. */
const TILE_PHASE = 0.75;

export function Creative({ t }: { t: number }) {
  return (
    <div aria-hidden className="relative h-full w-full">
      <GrainientImagesSection
        forceProgress={t * TILE_PHASE}
        tiles={GRAINIENT_TILES}
        title=""
        titleLine2=""
        className="!bg-transparent h-full"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.7) 26%, rgba(0,0,0,0.36) 56%, rgba(0,0,0,0) 100%)",
        }}
      />
    </div>
  );
}

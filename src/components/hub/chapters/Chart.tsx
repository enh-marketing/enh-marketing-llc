"use client";

import { TrackChart } from "@/components/hub/TrackChart";
import { CHART_CAMERA } from "@/components/hub/chapters/System";

/** Chapter four: the chart. Campaign Intelligence and Data & Dashboards.
 *
 *  IT USED TO BE THE TAIL OF THE SYSTEM CHAPTER and it is its own now, because
 *  the voice had to come between them. That turns out to be the simpler
 *  arrangement: the chart no longer has to be drawn over a live orbital scene
 *  while that scene is dimmed out from under it, so the residual-Sun mask and
 *  the whole run-in are gone.
 *
 *  IT OPENS ON THE VOICE'S OWN FRAME. The first two vertices of CHART_PATH sit
 *  at HANDOVER_Y and the flat run between them is already drawn when the leg
 *  begins, so what this chapter shows at progress zero is exactly what the
 *  uplink is showing: the same star in the same place with the same line behind
 *  it, from the same two functions. Then it rises, dips, rises, dips and rises
 *  to finish high. There is no settle any more; that move only existed when the
 *  line opened at 0.2 and had nowhere above it to go.
 *
 *  THE DIV IS OPAQUE, which is why the canvas under it has to draw at progress
 *  zero rather than treating a leg that has not started as nothing to show.
 *  Through the whole of this chapter's fade-in its progress is pinned at 0, and
 *  a blank canvas behind opaque black is a hole in the middle of a dissolve.
 *
 *  TWO CATEGORIES SHARE IT, so it needs twice the room one would take: the Sun
 *  has to have somewhere to be while each of them is read. */
export function Chart({ t }: { t: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <TrackChart p={t} camera={CHART_CAMERA} />
    </div>
  );
}

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
 *  IT OPENS FLAT, AT THE HEIGHT THE VOICE ENDED ON. The first two vertices of
 *  CHART_PATH sit at HANDOVER_Y, so the line the waveform collapses into is the
 *  line this chapter starts drawing. Then it settles down to a baseline to make
 *  room, and only then rises, dips, rises, dips and rises to finish high. The
 *  descent is geometry in the path rather than a camera move over the top of
 *  it, which keeps the whole leg to one moving part.
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

"use client";

import { Journey, type Chapter } from "@/components/hub/Journey";
import { Ascent } from "@/components/hub/Ascent";
import { Horizon } from "@/components/hub/chapters/Horizon";
import { System } from "@/components/hub/chapters/System";
import { Uplink } from "@/components/hub/chapters/Uplink";
import { Chart } from "@/components/hub/chapters/Chart";
import { OpeningLine } from "@/components/hub/OpeningLine";
import { ForegroundEcho } from "@/components/hub/ForegroundEcho";
import { chart, horizon, system, uplink } from "@/content/ai-hub";

/** The AI Hub landing page.
 *
 *  The mountain opens the page as an ordinary scrolling block, because the
 *  parallax it runs on is built from the block travelling past the viewport and
 *  stops dead the moment it is pinned. See the note in hub/Ascent.tsx. The
 *  journey, which does pin, begins underneath it.
 *
 *  THE AIRLOCK IS NOT HERE YET, AND CANNOT BE UNTIL IT CHANGES. It works by
 *  pinning the body and taking the wheel, which is the opposite of what a
 *  scroll-driven machine needs: two things cannot own the scroll. It becomes
 *  chapter two once its video is scrubbed from chapter progress instead of
 *  from its own lock, which deletes most of it rather than adding anything.
 *
 *  THERE IS NO BEAT WINDOW TO TUNE ANY MORE. This page used to pass one,
 *  narrowed so that no two headlines were ever legible at once, because every
 *  beat was drawn in the same place. The copy is one indexed run now, so two
 *  neighbours being legible at once is the arrangement rather than the fault,
 *  and the spacing is uniform whatever the beats' own spacing along the track.
 *
 *  THE STORY RUNS system, uplink, chart, horizon, and the black hole carries
 *  Intelligent Web. A branching structure was built for that category on
 *  2026-09-09 and rejected on sight, and AI Workshops & Training came off the
 *  page in the same call, so the hub runs 01 to 07 and Workshops is reachable
 *  from the navigation rather than from here. One category has always been
 *  unplaced; it is a different one now. */
const CHAPTERS: Chapter[] = [
  /* The planets, and their colours, all the way to Creative Production. The
     chapter ends with every trail straightened and laid flat on the screen by
     a solved roll, which is what the voice can take over from. */
  { id: "system", viewports: 8, Scene: System, beats: system },
  /* The voice. Horizontal coloured lines become horizontal coloured lines, so
     the join is a trade rather than a morph. */
  { id: "uplink", viewports: 4, Scene: Uplink, beats: uplink },
  /* The chart, opening on the flat line the waveform collapses into. Two
     categories share it, so it runs long. */
  { id: "chart", viewports: 6, Scene: Chart, beats: chart },
  { id: "horizon", viewports: 4, Scene: Horizon, beats: horizon },
];
export function AiHubPage() {
  return (
    <main data-hub-story>
      <Ascent />
      <Journey chapters={CHAPTERS} />
      {/* THE OPENING LINE AND THE THING THAT PUTS IT BEHIND THE MAN, in that
          order, because the second has to paint over the first. Both are fixed
          to the window and belong to neither block: the line starts over the
          photograph and leaves through the top of the system, and the echo is
          a copy of the opener's near ground that gives it back the depth it
          loses by not being inside the parallax stack. */}
      <OpeningLine />
      <ForegroundEcho />
    </main>
  );
}

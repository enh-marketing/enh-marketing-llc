"use client";

import { Journey, type Chapter } from "@/components/hub/Journey";
import { Ascent } from "@/components/hub/Ascent";
import { Horizon } from "@/components/hub/chapters/Horizon";
import { System } from "@/components/hub/chapters/System";
import { OpeningLine } from "@/components/hub/OpeningLine";
import { ForegroundEcho } from "@/components/hub/ForegroundEcho";
import { Threshold } from "@/components/hub/Threshold";
import { horizon, system } from "@/content/ai-hub";

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
 *  THE BEAT WINDOW IS NARROWER THAN THE DEFAULT because the system chapter's
 *  five lines sit a fifth of the chapter apart, so the rule that stops two
 *  headlines being legible at once needs the window inside 0.1. Full within
 *  0.035 and out by 0.095 clears it.
 *
 *  THE UPLINK IS THE GAP. The story runs system, uplink, horizon, and the
 *  middle one is not built: 04, 05 and 06 have nowhere to be until it is. The
 *  site's order is kept across the chapters rather than inside them, so those
 *  three slot in between without moving anything that already exists.
 *
 *  Still to come: the airlock before the system, and the uplink before the
 *  horizon. */
const CHAPTERS: Chapter[] = [
  /* Six, not four. The chapter gained two stops at the end, where the planets
     are thrown across the frame and then taken away, and those need scroll of
     their own or the scatter is over before it registers. */
  { id: "system", viewports: 10, Scene: System, beats: system },
  { id: "horizon", viewports: 4, Scene: Horizon, beats: horizon },
];

export function AiHubPage() {
  return (
    <main>
      <Ascent />
      <Journey chapters={CHAPTERS} beatWindow={{ hold: 0.035, ramp: 0.06 }} />
      {/* The door, and the ask. Last on the page because the airlock pins the
          body and spends input on the film rather than on scroll, which is a
          thing only the final block can do without fighting the machine. */}
      <Threshold />
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

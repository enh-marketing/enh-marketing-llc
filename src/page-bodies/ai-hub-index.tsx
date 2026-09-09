"use client";

import { Journey, type Chapter } from "@/components/hub/Journey";
import { Ascent } from "@/components/hub/Ascent";
import { Horizon } from "@/components/hub/chapters/Horizon";
import { System } from "@/components/hub/chapters/System";
import { Uplink } from "@/components/hub/chapters/Uplink";
import { OpeningLine } from "@/components/hub/OpeningLine";
import { ForegroundEcho } from "@/components/hub/ForegroundEcho";
import { horizon, system, uplink } from "@/content/ai-hub";

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
 *  THE STORY RUNS system, uplink, horizon. One category is still unplaced,
 *  Intelligent Web, and it is left out rather than pushed into a scene built
 *  for something else. */
const CHAPTERS: Chapter[] = [
  /* Six, not four. The chapter gained two stops at the end, where the planets
     are thrown across the frame and then taken away, and those need scroll of
     their own or the scatter is over before it registers. */
  { id: "system", viewports: 10, Scene: System, beats: system },
  /* THE UPLINK. The Sun's light becomes a voice. SiriWave is dependency free
     raw WebGL, the same shape as the black hole it hands over to, so the page
     gains a scene without gaining a library. */
  { id: "uplink", viewports: 4, Scene: Uplink, beats: uplink },
  { id: "horizon", viewports: 4, Scene: Horizon, beats: horizon },
];

export function AiHubPage() {
  return (
    <main>
      <Ascent />
      <Journey chapters={CHAPTERS} beatWindow={{ hold: 0.035, ramp: 0.06 }} />
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

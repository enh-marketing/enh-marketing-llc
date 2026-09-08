"use client";

import { Journey, type Chapter } from "@/components/hub/Journey";
import { Ascent } from "@/components/hub/Ascent";
import { Horizon } from "@/components/hub/chapters/Horizon";
import { System } from "@/components/hub/chapters/System";
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
 *  THE UPLINK IS THE GAP. The story runs system, uplink, horizon, and the
 *  middle one is not built: 04, 05 and 06 have nowhere to be until it is. The
 *  site's order is kept across the chapters rather than inside them, so those
 *  three slot in between without moving anything that already exists.
 *
 *  Still to come: the airlock before the system, and the uplink before the
 *  horizon. */
const CHAPTERS: Chapter[] = [
  { id: "system", viewports: 4, Scene: System, beats: system },
  { id: "horizon", viewports: 4, Scene: Horizon, beats: horizon },
];

export function AiHubPage() {
  return (
    <main>
      <Ascent />
      <Journey chapters={CHAPTERS} />
    </main>
  );
}

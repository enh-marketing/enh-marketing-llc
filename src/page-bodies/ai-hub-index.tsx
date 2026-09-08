"use client";

import { Journey, type Chapter } from "@/components/hub/Journey";
import { Ascent } from "@/components/hub/Ascent";
import { System } from "@/components/hub/chapters/System";
import { system } from "@/content/ai-hub";

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
 *  Still to come, in order: the airlock between these two, then the uplink and
 *  the horizon after them. */
const CHAPTERS: Chapter[] = [{ id: "system", viewports: 4, Scene: System, beats: system }];

export function AiHubPage() {
  return (
    <main>
      <Ascent />
      <Journey chapters={CHAPTERS} />
    </main>
  );
}

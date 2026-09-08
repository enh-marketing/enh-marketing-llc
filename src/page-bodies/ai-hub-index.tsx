"use client";

import { Journey, type Chapter } from "@/components/hub/Journey";
import { Ascent } from "@/components/hub/chapters/Ascent";
import { System } from "@/components/hub/chapters/System";
import { ascent, system } from "@/content/ai-hub";

/** The AI Hub landing page.
 *
 *  One continuous journey rather than a stack of sections. Two chapters so
 *  far, which is enough to judge the two things that matter before the rest
 *  are written: whether the handover between two completely different scenes
 *  reads as a transition rather than a cut, and whether the writing is right.
 *
 *  THE AIRLOCK IS NOT HERE YET, AND CANNOT BE UNTIL IT CHANGES. It works by
 *  pinning the body and taking the wheel, which is the opposite of what a
 *  scroll-driven machine needs: two things cannot own the scroll. It becomes
 *  chapter two once its video is scrubbed from chapter progress instead of
 *  from its own lock, which deletes most of it rather than adding anything.
 *
 *  Still to come, in order: the airlock between these two, then the uplink and
 *  the horizon after them. */
const CHAPTERS: Chapter[] = [
  { id: "ascent", viewports: 2, Scene: Ascent, beats: ascent },
  { id: "system", viewports: 4, Scene: System, beats: system },
];

export function AiHubPage() {
  return (
    <main>
      <Journey chapters={CHAPTERS} />
    </main>
  );
}

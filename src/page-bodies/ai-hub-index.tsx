"use client";

import type { ReactNode } from "react";
import { Journey, type Chapter } from "@/components/hub/Journey";
import { Ascent } from "@/components/hub/Ascent";
import { Horizon } from "@/components/hub/chapters/Horizon";
import { System } from "@/components/hub/chapters/System";
import { Uplink } from "@/components/hub/chapters/Uplink";
import { Chart } from "@/components/hub/chapters/Chart";
import { chart, horizon, system, uplink } from "@/content/ai-hub";

/** The AI Hub landing page.
 *
 *  The mountain opens the page as an ordinary scrolling block, because the
 *  parallax it runs on is built from the block travelling past the viewport and
 *  stops dead the moment it is pinned. See the note in hub/Ascent.tsx. The
 *  journey, which does pin, begins underneath it.
 *
 *  THE AIRLOCK WAS HERE AND IS NOT. A scroll-locked film hero was tried in this
 *  slot on 2026-09-11 and taken out the same day: it worked, it was measured
 *  working both ways, and it did not pass the team. The mountain came back off
 *  the `hero/mountain-ascent` tag. What went with it: a 3.7MB video, the push
 *  through the hatch, and the seven adaptations the component needed. Anyone
 *  looking for it will find the whole thing in the history.
 *
 *  THE HERO IS STILL A PROP, because the opening is not settled and the next
 *  candidate will want a page of its own to be compared on. Pass one and the
 *  page is the same story behind a different opening; pass nothing and it is
 *  the mountain, which is what /ai-hub renders.
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
/** HOW FAR RIGHT OF THE FRAME THE PICTURE SITS, above 1024px.
 *
 *  0.15 of the width, which is 216px at 1440. It puts the system's resting
 *  focus and the waveform's centre at 0.65 of the frame; the copy's cards
 *  finish at 0.478, so what was 32px of clearance is 248px. The chart gives it
 *  back, because its line needs the whole width. See BIAS in Journey. */
const BIAS = 0.15;

const CHAPTERS: Chapter[] = [
  /* The planets, and their colours, all the way to Creative Production. The
     chapter ends with every trail straightened and laid flat on the screen by
     a solved roll, which is what the voice can take over from. */
  { id: "system", viewports: 8, Scene: System, beats: system, bias: BIAS },
  /* The voice. Horizontal coloured lines become horizontal coloured lines, so
     the join is a trade rather than a morph. */
  { id: "uplink", viewports: 4, Scene: Uplink, beats: uplink, bias: BIAS },
  /* The chart, opening on the flat line the waveform collapses into. Two
     categories share it, so it runs long. */
  { id: "chart", viewports: 6, Scene: Chart, beats: chart },
  { id: "horizon", viewports: 4, Scene: Horizon, beats: horizon },
];
export function AiHubPage({ hero }: { hero?: ReactNode } = {}) {
  return (
    <main data-hub-story>
      {hero ?? <Ascent />}
      <Journey chapters={CHAPTERS} />
      {/* THE OPENING LINE IS NOT HERE AND NEITHER IS THE ECHO. Both were,
          because the line was fixed to the window so it could outlive the
          opener, and a second copy of the near ground had to be painted over
          it to put it back behind the man. The line finishes inside the opener
          now, so it is one of that block's own parallax layers and the man in
          front of it is the real one. See hub/Ascent. */}
    </main>
  );
}

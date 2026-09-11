"use client";

import type { ReactNode } from "react";
import { Journey, type Chapter } from "@/components/hub/Journey";
import { Opening } from "@/components/hub/Opening";
import { Horizon } from "@/components/hub/chapters/Horizon";
import { System } from "@/components/hub/chapters/System";
import { Uplink } from "@/components/hub/chapters/Uplink";
import { Chart } from "@/components/hub/chapters/Chart";
import { chart, horizon, system, uplink } from "@/content/ai-hub";

/** The AI Hub landing page.
 *
 *  THE AIRLOCK OPENS IT, and it is the one place on this page where something
 *  other than the chapter machine may own the scroll. It pins the body and
 *  spends the wheel on a video's currentTime; first on the page there is
 *  nothing above it to fight, and it hands the page back when the film runs
 *  out. Anywhere else it is a second scroll controller. See hub/Opening for
 *  what was here before it and how to get that back.
 *
 *  IT IS NOT IN THE FLOW. The opening is fixed over the page rather than being
 *  the first block of it, so the journey's first chapter is at the top of the
 *  document from the moment it loads and is simply covered. The cover is
 *  pushed through the screen and faded off over the last stretch of the scrub,
 *  which is how the hatch opens on to the next scene instead of the next scene
 *  scrolling up underneath it. Nothing here has to know: the journey is the
 *  whole document either way.
 *
 *  THE HERO IS A PROP SO THE OPTIONS CAN BE COMPARED SIDE BY SIDE. Pass one and
 *  the page is the same story behind a different opening; pass nothing and it
 *  is the airlock, which is what /ai-hub renders. Each option gets a page of
 *  its own under /ai-hub/hero-*, noindex, listed in sitemap.ts only because
 *  check:routes will not build a route it has not been told about.
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
      {hero ?? <Opening />}
      <Journey chapters={CHAPTERS} />
      {/* THE OPENING LINE IS NOT HERE EITHER. It lives in the airlock's own
          title slot, which fades and blurs it out over the first third of the
          scrub, and the sentence under it lives in the tagline slot, which
          brings it up over the last fifth. Nothing about the copy measures the
          page any more. See hub/HeroCopy. */}
    </main>
  );
}

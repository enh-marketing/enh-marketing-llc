"use client";

import { Journey, type Chapter } from "@/components/hub/Journey";
import { Film } from "@/components/hub/chapters/Film";
import { filmBeats } from "@/content/ai-hub-film";

/** The AI Hub landing page, told with a film instead of a drawn scene.
 *
 *  A SECOND VERSION, NOT A REPLACEMENT. /ai-hub renders its own scene: a
 *  parallax photograph, then a solar system drawn on canvas whose camera moves
 *  to a stop for each category, with the sun carried between them as a real
 *  light. This page holds a single ten-second generated take and scrubs it. The
 *  story is identical and the copy is the same quoted copy; only the way the
 *  picture is made differs. Both exist so the two can be compared.
 *
 *  ONE CHAPTER, NINE STATIONS. The film needs no chapter machine to cross-fade
 *  between scenes, because there is only one scene. What it needs is the rest of
 *  the machine: scroll collapsed to a number, the beats lit by proximity, one
 *  line at a time. So it is a single chapter eight viewports long, and the
 *  stopping is done by the film's own mapping in hub/chapters/Film.tsx, which
 *  holds the picture still while a category is being read.
 *
 *  THE BEAT WINDOW IS TIGHTER HERE. Nine stations sit about 0.11 of the chapter
 *  apart, against three at 0.33 on the drawn page, so the window that lights a
 *  line has to be narrower or two would be legible at once. Hold 0.018 and ramp
 *  0.032 puts it out by 0.05, inside half the gap.
 *
 *  THE FILM IS A PLACEHOLDER, at 480p and 13.3 MB, generated as a cheap probe.
 *  It is here to prove the mechanism, not to ship. */
const CHAPTERS: Chapter[] = [
  { id: "film", viewports: 8, Scene: Film, beats: filmBeats },
];

export function AiHubFilmPage() {
  return (
    <main>
      <Journey chapters={CHAPTERS} />
    </main>
  );
}

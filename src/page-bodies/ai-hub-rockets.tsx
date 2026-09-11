"use client";

import { AiHubPage } from "@/page-bodies/ai-hub-index";
import { OpeningRockets } from "@/components/hub/OpeningRockets";

/** /ai-hub/hero-rockets: the same story behind the rocket film.
 *
 *  A page body of its own rather than a prop from the Astro file, because
 *  props handed to an island are serialised to JSON and a React component is a
 *  function. See the same note on ai-hub-robot. */
export function AiHubRocketsPage() {
  return <AiHubPage hero={<OpeningRockets />} />;
}

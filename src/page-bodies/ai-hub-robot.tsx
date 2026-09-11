"use client";

import { AiHubPage } from "@/page-bodies/ai-hub-index";
import { OpeningRobot } from "@/components/hub/OpeningRobot";

/** /ai-hub/hero-robot: the same story behind the pointer-reactive opening.
 *
 *  A PAGE BODY OF ITS OWN RATHER THAN A PROP FROM THE ASTRO FILE, and that is
 *  Astro rather than taste. Props handed to an island are serialised to JSON so
 *  they can be replayed on the client, and a React component is a function,
 *  which does not survive that. /ai-hub/film has the same shape for the same
 *  reason. Everything below the opening is AiHubPage, untouched. */
export function AiHubRobotPage() {
  return <AiHubPage hero={<OpeningRobot />} />;
}

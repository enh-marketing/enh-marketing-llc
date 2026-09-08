"use client";

import AirlockHero from "@/components/hub/AirlockHero";
import { OrbitalJourney } from "@/components/hub/OrbitalJourney";

/** The AI Hub landing page.
 *
 *  The scroll-locked video hero, then one solar system whose camera is moved
 *  by the scroll. There is a single canvas below the hero now, not one per
 *  section: the stages are camera positions rather than separate scenes. */
export function AiHubPage() {
  return (
    <main>
      <AirlockHero />
      <OrbitalJourney />
    </main>
  );
}

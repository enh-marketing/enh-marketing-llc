"use client";

import { HubOpener } from "@/components/hub/HubOpener";
import { SearchSurfaces } from "@/components/hub/SearchSurfaces";

/** The AI Hub landing page.
 *
 *  A parallax opener, then eight full-height sections, one per category, each
 *  with its own design drawn from that category's own document. Built one at a
 *  time; this file gains them in order. */
export function AiHubPage() {
  return (
    <main>
      <HubOpener />
      <SearchSurfaces />
    </main>
  );
}

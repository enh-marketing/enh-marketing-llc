"use client";

import { SearchSurfaces } from "@/components/hub/SearchSurfaces";

/** The AI Hub landing page.
 *
 *  Eight full-height sections, one per category, each with its own design
 *  drawn from that category's own document. Built one at a time; this file
 *  gains them in order. */
export function AiHubPage() {
  return (
    <main>
      <SearchSurfaces />
    </main>
  );
}

"use client";

import { AutomationFork } from "@/components/hub/AutomationFork";
import { CategoryParallax } from "@/components/hub/CategoryParallax";
import { HubOpener } from "@/components/hub/HubOpener";
import { SearchSurfaces } from "@/components/hub/SearchSurfaces";
import { categories } from "@/content/ai-hub";

/** The AI Hub landing page.
 *
 *  A parallax opener, then one full-height section per category.
 *
 *  01 and 02 are built, each drawn from that category's own document. 03 to 08
 *  are empty parallax blocks standing in until each gets its own design. They
 *  are deliberately identical to each other, which is what makes them read as
 *  scaffolding rather than as finished sections. */
export function AiHubPage() {
  return (
    <main>
      <HubOpener />
      <SearchSurfaces />
      <AutomationFork />
      {/* 03 to 08 are still the empty parallax blocks. */}
      {categories.slice(2).map((c, i) => (
        <CategoryParallax key={c.no} index={i + 2} />
      ))}
    </main>
  );
}

"use client";

import { CategoryParallax } from "@/components/hub/CategoryParallax";
import { HubOpener } from "@/components/hub/HubOpener";
import { SearchSurfaces } from "@/components/hub/SearchSurfaces";
import { categories } from "@/content/ai-hub";

/** The AI Hub landing page.
 *
 *  A parallax opener, then one full-height section per category.
 *
 *  01 is built: SearchSurfaces, drawn from that category's own document.
 *  02 to 08 are empty parallax blocks standing in until each gets its own
 *  design. They are deliberately identical to each other, which is what makes
 *  them read as scaffolding rather than as eight finished sections. */
export function AiHubPage() {
  return (
    <main>
      <HubOpener />
      <SearchSurfaces />
      {categories.slice(1).map((c, i) => (
        <CategoryParallax key={c.no} index={i + 1} />
      ))}
    </main>
  );
}

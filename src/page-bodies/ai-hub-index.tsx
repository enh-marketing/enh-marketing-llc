"use client";

import { CategoryField } from "@/components/hub/CategoryField";

/** The AI Hub landing page.
 *
 *  Composed section by section, and this is the first of them: one field of
 *  dots that rearranges itself for each of the eight categories, rather than
 *  eight separate full-height sections. The reasoning for that choice sits in
 *  CategoryField.tsx, next to the code it explains. */
export function AiHubPage() {
  return (
    <main>
      <CategoryField />
    </main>
  );
}

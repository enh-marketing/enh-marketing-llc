"use client";

/** The AI Hub landing page.
 *
 *  Deliberately empty. This page is not a ninth service page and does not
 *  inherit the spine the other eight share: it is being composed section by
 *  section, and each section will be decided on its own before it is written.
 *
 *  The island is here rather than the sections living in the .astro file
 *  because every section this page will get needs to hydrate for motion, and
 *  one hydration boundary around the whole page is what the other pages do. */
export function AiHubPage() {
  return <main className="min-h-screen" />;
}

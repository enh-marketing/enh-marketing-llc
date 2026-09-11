"use client";

import { Manifesto } from "@/components/sections/Manifesto";
import { Craft } from "@/components/sections/Craft";
import { Work } from "@/components/sections/Work";
import { AuditStrip } from "@/components/sections/AuditStrip";
import { WhyENH } from "@/components/sections/WhyENH";
import { Industries } from "@/components/sections/Industries";
import { AISection } from "@/components/sections/AISection";
import { Voices } from "@/components/sections/Voices";
import { Insights } from "@/components/sections/Insights";
import { FAQ } from "@/components/sections/FAQ";
import { LetsTalk } from "@/components/sections/LetsTalk";

/** Everything on the homepage below the hero, as its own island.
 *
 *  WHY THIS IS SPLIT OUT, WHEN MIGRATION.md SAYS NOT TO SPLIT. That note argues
 *  against decomposing routes into PER-SECTION islands, and it is right: 52
 *  places pass React elements as props, which island boundaries cannot carry,
 *  and rewriting those APIs across 21 pages buys little. This is not that. It
 *  is one cut, in one route, and it clears all three of that note's objections:
 *
 *    - The `Preloader` -> `Hero` handshake it warns about stays INSIDE the
 *      other island. `started` never crosses this boundary.
 *    - Nothing here takes a React element as a prop. The only props in the
 *      whole list are two string literals, below.
 *    - Every section still hydrates; it just stops hydrating at the one moment
 *      the page cannot afford it.
 *
 *  WHAT IT FIXES. The homepage pulls ~1MB of uncompressed JavaScript (motion
 *  alone is 358KB) and hydrated all of it as a single client:load island. On
 *  desktop that is absorbed. On an iPhone it is 3-4 seconds of blocked main
 *  thread, and it landed at exactly the wrong moment: the preloader is an
 *  opaque fixed veil, so the work began the instant it lifted and the page sat
 *  there unresponsive. Reported as "freezes 3-4 seconds after the preloader".
 *
 *  Mounted client:idle in src/pages/index.astro, so this tree hydrates once the
 *  main thread is free rather than while the hero is trying to arrive. The
 *  markup is server-rendered either way, so nothing here is invisible or
 *  late -- only its JavaScript is deferred. */
export function HomeSections() {
  return (
    <>
      <Manifesto />
      <Craft />
      {/* "Our Work" is the heading the homepage document gives this section.
          Passed here rather than changed inside the component, which the
          seventeen service pages also render. */}
      <Work heading="Our Work" />
      <AuditStrip />
      <WhyENH />
      {/* The homepage document places the industries section between the
          Google Partner band and the AI section, so that is where it sits,
          and the section indices below it all move up one. */}
      <Industries />
      <AISection />
      {/* The enquiry form sits above the route rather than closing the page.
          Its id is still "contact", so the anchors that point at it -- the
          carousel's end card, the AI section's CTA and the navbar button --
          all still land here; they now land mid-page instead of at the
          bottom. The page closes on the FAQ, with the footer after it. */}
      <LetsTalk />
      <Voices />
      <Insights index="09" />
      <FAQ />
    </>
  );
}

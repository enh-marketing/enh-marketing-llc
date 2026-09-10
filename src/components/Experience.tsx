"use client";

import { useCallback, useEffect, useState } from "react";
import type { PartnerBadge } from "@/lib/content";
import { Preloader } from "@/components/fx/Preloader";
import { Hero } from "@/components/sections/Hero";
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

export function Experience({ badges = [] }: { badges?: PartnerBadge[] }) {
  const [started, setStarted] = useState(false);

  /** Stable identity, and that matters more than it looks.
   *
   *  This used to be an inline arrow. Preloader takes it as a prop and lists
   *  it in a useEffect dependency array, so a fresh function on every render
   *  of this component tore that effect down and rebuilt it -- cancelling and
   *  restarting all three of the preloader's timers, including the one that
   *  hands the page over. */
  const handleDone = useCallback(() => setStarted(true), []);

  /** The page hands over on its own, whatever the preloader does.
   *
   *  Everything below waits on `started`: the hero headline is not rendered
   *  until it flips, and the trust strip is held at opacity 0. So if the
   *  handover never arrives the page is left with no headline, which is
   *  exactly what was reported on mobile. The preloader already carries timer
   *  based safety nets of its own, but they are its to run and they only work
   *  if its effect is alive. This one is not: it belongs to the component that
   *  owns the flag, it starts once on mount, and nothing can cancel it. */
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Preloader onDone={handleDone} />
      <main>
        <Hero started={started} badges={badges} />
        <Manifesto />
        <Craft />
        {/* "Our Work" is the heading the homepage document gives this
            section. Passed here rather than changed inside the component,
            which the seventeen service pages also render. */}
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
      </main>
    </>
  );
}

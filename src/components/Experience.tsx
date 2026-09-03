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
import { AISection } from "@/components/sections/AISection";
import { Process } from "@/components/sections/Process";
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
        <Work />
        <AuditStrip />
        <WhyENH />
        <AISection />
        <Process />
        <Voices />
        <Insights />
        <FAQ />
        <LetsTalk />
      </main>
    </>
  );
}

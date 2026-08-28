"use client";

import { useState } from "react";
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

  return (
    <>
      <Preloader onDone={() => setStarted(true)} />
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

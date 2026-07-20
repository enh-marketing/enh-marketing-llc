"use client";

import { useState } from "react";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Cursor } from "@/components/fx/Cursor";
import { Preloader } from "@/components/fx/Preloader";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { TrustStrip } from "@/components/sections/TrustStrip";
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
import { Footer } from "@/components/sections/Footer";
import { FloatingContact } from "@/components/sections/FloatingContact";

export function Experience() {
  const [started, setStarted] = useState(false);

  return (
    <SmoothScroll>
      <div className="grain">
        <Preloader onDone={() => setStarted(true)} />
        <Cursor />
        <Navbar />
        <main>
          <Hero started={started} />
          <Manifesto />
          <TrustStrip />
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
        <Footer />
        <FloatingContact />
      </div>
    </SmoothScroll>
  );
}

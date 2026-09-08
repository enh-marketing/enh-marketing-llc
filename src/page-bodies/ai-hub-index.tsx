"use client";

import AirlockHero from "@/components/hub/AirlockHero";
import { INNER_PLANETS, OrbitalHeroSection } from "@/components/hub/OrbitalHeroSection";

/** The AI Hub landing page.
 *
 *  ONE BACKGROUND COMPONENT, SET DIFFERENTLY PER SECTION. Orbital replaced
 *  Starfield everywhere. The reasons are measured rather than aesthetic:
 *  Orbital sizes its canvas to devicePixelRatio (2240x1800 on a 1120x900
 *  block, where Starfield drew 1120x900 and looked soft), it holds a static
 *  frame under prefers-reduced-motion, and it stops rendering when it scrolls
 *  out of view or the tab is hidden. That last one is what makes it safe to
 *  repeat: eight Starfields would be eight animation loops running at once
 *  whether or not anyone could see them.
 *
 *  It also takes children and has `focus` and `scrim`, which exist to put
 *  copy over the picture and keep it readable. Starfield has neither, so text
 *  can only be stacked on top of it and hoped for.
 *
 *  ITS TWENTY-SIX PROPS ARE WHAT KEEP THE SECTIONS APART. Camera angle,
 *  view radius, which bodies run, whether orbit rings are drawn, how far the
 *  planes are fanned, how stretched the ellipses are, where the Sun sits in
 *  frame and which edge the veil falls on. The two below share no settings,
 *  and there is room for eight that do not.
 *
 *  Every word on these sections is still the component's demo copy. */
export function AiHubPage() {
  return (
    <main>
      <AirlockHero />

      {/* Flat and classical: the inner four, orbit rings drawn, near-circular,
          seen almost face on, copy to the right. */}
      <section className="relative h-screen w-full">
        <OrbitalHeroSection
          planets={INNER_PLANETS}
          viewRadius={2.1}
          tilt={24}
          spin={140}
          roll={-8}
          planeSpread={0.12}
          eccentricity={0}
          alignToCourse={0}
          driftSpeed={0.55}
          showOrbits
          trailYears={1.4}
          focus={[0.3, 0.52]}
          scrim="right"
          scrimStrength={0.9}
          starCount={900}
        >
          <div className="flex h-full items-center justify-end px-6 sm:px-10 lg:px-20">
            <div className="max-w-[32rem] text-right">
              <h2 className="text-[2.5rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4rem]">
                Four rocky
                <br />
                worlds, one plane
              </h2>
              <p className="mt-6 ml-auto max-w-md text-[0.95rem] leading-relaxed text-white/60 md:mt-7">
                Rings, seen nearly face on. The same component as below, set to show the
                orbits rather than the wakes.
              </p>
            </div>
          </div>
        </OrbitalHeroSection>
      </section>

      {/* The helix: all eight, planes fanned, wakes rather than rings, seen
          from an angle that lets a helix read as one. Copy to the left. */}
      <section className="relative h-screen w-full">
        <OrbitalHeroSection focus={[0.74, 0.42]} scrim="left" scrimStrength={0.92}>
          <div className="flex h-full items-center px-6 sm:px-10 lg:px-20">
            <div className="max-w-[34rem]">
              <h2 className="text-[2.5rem] font-light leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.25rem]">
                Nothing here
                <br />
                stands still
              </h2>
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/60 md:mt-7">
                The Sun is running, and the planets chase it. Every track you see is a helix.
              </p>
            </div>
          </div>
        </OrbitalHeroSection>
      </section>
    </main>
  );
}

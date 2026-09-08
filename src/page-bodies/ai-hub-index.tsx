"use client";

import AirlockHero from "@/components/hub/AirlockHero";
import { OrbitalHeroSection } from "@/components/hub/OrbitalHeroSection";
import { Starfield } from "@/components/hub/Starfield";

/** The AI Hub landing page.
 *
 *  Imported sections, in order. Nothing here is written by us yet: each block
 *  is a 21st.dev component carrying its own default copy.
 *
 *  The Tubes Cursor section is NOT here. It fetches and runs third-party
 *  JavaScript from a CDN at runtime, which would give that code the same
 *  access to this page as ours has, and it is the component's whole mechanism
 *  rather than a detail that can be dropped. That is a decision to take rather
 *  than one to make quietly, so it is flagged and left out until it is made. */
export function AiHubPage() {
  return (
    <main>
      <AirlockHero />

      {/* Starfield paints into its parent, so the parent is what gives it a
          size. Its own wrapper is position:absolute with no offsets. */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <Starfield />
        <div className="pointer-events-none relative z-10 flex h-full items-center justify-center">
          <span className="text-center text-7xl font-semibold leading-none tracking-tighter text-white">
            Starfield
          </span>
        </div>
      </section>

      {/* Orbital sizes itself to its block and takes its own children. */}
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

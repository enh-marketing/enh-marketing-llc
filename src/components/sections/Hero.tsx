"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SaturnCanvas } from "@/components/fx/SaturnCanvas";
import { PartnerBadges } from "@/components/sections/PartnerBadges";
import { TrustStrip } from "@/components/sections/TrustStrip";
import type { PartnerBadge } from "@/lib/content";
import { heroWords, heroSub } from "@/lib/content";

export function Hero({ started, badges = [] }: { started: boolean; badges?: PartnerBadge[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-svh flex-col overflow-hidden pt-24">
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[8%] top-[12%] h-[44vw] w-[44vw] rounded-full bg-brand/25 blur-[140px]" />
        <div className="aurora-b absolute right-[-6%] bottom-[5%] h-[36vw] w-[36vw] rounded-full bg-brand-deep/30 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(circle at 50% 40%, black, transparent 75%)",
          }}
        />
      </div>

      {/* Saturn planet — centered in the right half, fully visible, fades with the hero.
          Viewport-relative width keeps it consistently framed (with ring margin)
          across screen sizes rather than clipping past the right edge. */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute top-1/2 z-[1] left-[40%] h-[44vh] w-[58vw] -translate-y-1/2 opacity-60 sm:left-[46%] sm:h-[54vh] sm:w-[50vw] sm:opacity-90 lg:left-[48%] lg:h-[64vh] lg:w-[44vw] lg:opacity-100"
      >
        {/* Ambient red → purple glow behind the planet */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(48% 50% at 50% 46%, rgba(216,48,58,0.4), transparent 60%), radial-gradient(58% 60% at 64% 60%, rgba(126,42,138,0.45), transparent 66%)",
            filter: "blur(8px)",
          }}
        />
        <SaturnCanvas className="h-full w-full" />
      </motion.div>

      <motion.div
        style={{ y: yTitle, opacity: fade }}
        className="relative z-10 flex flex-1 flex-col justify-center py-3"
      >
        <Container>
        <Rise delay={0.1} className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Digital Growth Studio — Dubai, est. 15 years ago
        </Rise>

        {started && (
          <h1 className="font-display mega font-extrabold uppercase">
            {/* "EXPLORE NEW" on one line, "HEIGHTS" on the next. The two words
                keep their separate treatments, so this is two <Chars> on one
                line rather than one string — which means the space between them
                has to be written explicitly. <Chars> only emits spaces between
                words it was given itself; without the {" "} below the line
                renders as "EXPLORENEW". */}
            <span className="block">
              <Chars text={heroWords[0]} immediate delay={0.05} />{" "}
              <span className="text-stroke">
                <Chars text={heroWords[1]} immediate delay={0.25} />
              </span>
            </span>{" "}
            {/* Between two block spans this space costs nothing visually, but
                without it the heading's textContent reads "NEWHEIGHTS" to
                anything that flattens the markup. */}
            <span className="block text-brand">
              <Chars text={heroWords[2]} immediate delay={0.4} />
            </span>
          </h1>
        )}

        <Rise delay={0.8} className="mt-8 max-w-md text-base leading-relaxed text-fog sm:text-lg">
          {heroSub}
        </Rise>

        {/* Certifications, sharing the text column's left edge.
            
            They sit on the headline's axis rather than in a band of their own,
            so they read as part of what the hero is claiming rather than as a
            strip bolted underneath it. Skipped when the artwork is missing, so
            the column never ends on a gap. */}
        {badges.length > 0 && (
          <div className="mt-8 sm:mt-9">
            <PartnerBadges badges={badges} size="compact" align="start" delay={1.05} />
          </div>
        )}

        </Container>
      </motion.div>

      {/* Client logo strip, bottom-aligned inside the hero — the same treatment
          the service heroes use, so the first screen of every page closes on
          proof rather than on decoration. It replaced the word ticker that used
          to hold this edge.

          In normal flow rather than absolutely positioned, which is what keeps
          it genuinely above the fold: the content column above takes flex-1 and
          gives way to it, instead of the strip overlapping content on short
          viewports. Held back until the preloader finishes, like the ticker
          was, so it does not appear before the headline. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ delay: 1.2 }}
        className="relative z-10"
      >
        <TrustStrip id="trust" credentials={false} compact />
      </motion.div>
    </section>
  );
}

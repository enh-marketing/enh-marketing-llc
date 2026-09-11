"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { ServiceReel } from "@/components/fx/ServiceReel";
import { PartnerBadges } from "@/components/sections/PartnerBadges";
import { TrustStrip } from "@/components/sections/TrustStrip";
import type { PartnerBadge } from "@/lib/content";
import { heroWords, heroSub, heroEyebrow } from "@/lib/content";

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

      <motion.div
        style={{ y: yTitle, opacity: fade }}
        className="relative z-10 flex flex-1 flex-col justify-center py-3"
      >
        <Container>
        {/* TWO COLUMNS FROM `lg` UP: all of the copy in the first, the visual in
            the second. Team direction, and it is what the old arrangement could
            not give — the WebGL planet sat *underneath* the headline's right
            half (measured: a 634x576 canvas centred at x=691 while the headline
            ran to x=1340 at 1440x900), so it had to be carried at reduced
            opacity and read as a pink blur rather than as a picture of
            anything. A column of its own is what lets the visual be legible,
            labelled and operable instead of decorative.

            THE VISUAL COLUMN IS SIZED TO THE DRAWING, not to a fraction, and
            that is the fix for a real fault. With the columns at 1.06fr to
            0.94fr the visual cell measured 553 wide by 454 tall at 1366, and
            the scenes are portrait: `meet` then fits them by HEIGHT, so the
            drawing rendered 378 wide inside a 553 cell and sat in 87px of dead
            ground either side. A cell that tracks the drawing's own proportion
            instead means the picture fills it at every width. It clamps rather
            than scaling freely so it cannot shrink below the point where the
            scenes stop being legible, or grow past the copy beside it.

            The copy column takes what is left — about 770px at 1440 — which is
            what the headline needs to set as two lines plus two at
            `mega-split`; see globals.css for that measurement.

            `items-stretch`, on team direction that the visual stand as tall
            as the copy: the reel fills its cell top to bottom, so its caption
            sits on the eyebrow's line and its drawing ends where the badges do.
            That is also why the reel is `h-full` internally — a stretched grid
            cell only helps if the thing inside it takes the height.

            ONE COLUMN BELOW `lg`, AND THE REEL IS STILL IN IT. Stacking it
            under the copy is what makes the hero taller than one viewport on a
            phone: measured at 375x812 the copy, the certification badges and
            the logo strip already fill the screen to the pixel, so the reel
            adds about 300px and the logo strip moves below the fold. That is a
            deliberate trade and the only one available — the alternative is a
            phone hero with no visual at all, and most of this site's audience
            is on a phone. Nothing was cut from the copy to make the room. */}
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_clamp(340px,29vw,460px)] lg:gap-12 xl:gap-16">
        <div>
        {/* THE PAGE'S H1, AT THE SIZE IT ALREADY WAS. Team direction: this
            line is the H1 and the display headline below it is the H2. The
            document had always set this line as its own H4, under the headline;
            the design's only slot for a line of its kind is this eyebrow above
            it, so that is still where it sits.
            
            NOTHING ABOUT THE TYPE CHANGES. The size, weight, case, colour and
            the brand dot beside it are what they were -- the utilities simply
            moved off the wrapper and onto the heading, so the element changed
            and the rendering did not. Tailwind's preflight already resets a
            heading's own font-size, weight and margin to inherit, so there is
            no browser default to undo. */}
        <Rise delay={0.1} className="mb-5 flex items-center gap-3">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <h1 className="text-xs font-semibold uppercase text-fog">{heroEyebrow}</h1>
        </Rise>

        {/* THE H2, AND STILL AT `mega`. Team direction moved the heading level
            here from the line above; the class carrying the size is untouched,
            so the headline is the same pixels it always was.
            
            Always rendered. It used to sit behind `started &&`, so the real
            headline existed only after the preloader handed over: it was
            absent from the server HTML entirely, and a reader whose handover
            never arrived got no headline at all. Now only the reveal waits,
            through Chars' `play`, so the timing on screen is unchanged. */}
        {/* THE MEASURE IS CAPPED IN `em`, WHICH IS WHAT FIXES THE TABLET RAG.
            At 768 the headline had the whole 673px column to wrap in and set as
            "EXPLORE NEW HEIGHTS WITH" (668px) / "SMARTER DIGITAL" (413) /
            "MARKETING" (273) — one line at 99% of the measure over two at 61%
            and 41%, which is a top-heavy rag and not the break the team asked
            for.

            9.8em, and the number is derived rather than tuned. Measured per
            word, in em, so the figures hold at any size: Explore 4.404, New
            2.234, Heights 4.113, with 2.477, Smarter 4.617, Digital 3.722,
            Marketing 5.641, word space 0.188. For the four-line break the
            measure has to fit "Smarter Digital" (8.53em) and must NOT fit
            "Explore New Heights" (11.13em), so anything in [8.53, 11.13) wraps
            it EXPLORE NEW / HEIGHTS WITH / SMARTER DIGITAL / MARKETING. 9.8em
            sits near the middle of that window, 1.3em clear of each edge.

            `em` rather than `px` or a breakpoint because it then tracks the
            clamp automatically: the cap is 474px at 768, 631 at 1023, 602 at
            1024. It binds where the column is too wide for the type and goes
            inert where the column is already narrower than the cap — which is
            every width from 1280 up, so nothing about the desktop break
            changes. Checked 640, 768, 1023, 1024, 1152, 1280, 1366 and 1920:
            all four lines. Below 640 the phone column is narrower than 8.53em
            and it breaks to five, which is correct for a phone. */}
        <h2 className="font-display mega-split max-w-[9.8em] font-extrabold uppercase">
            {/* ONE CONTINUOUS RUN, WRAPPING WHERE THE MEASURE PUTS IT — and
                that is the change, not just the size. These three groups used
                to be `block`, which forced a break after "NEW HEIGHTS" and made
                the reference break the team asked for impossible to reach:
                "HEIGHTS WITH" cannot share a line with a hard break between
                them, at any font size. Unwrapped and set larger the headline
                sets as EXPLORE NEW / HEIGHTS WITH / SMARTER DIGITAL / MARKETING,
                which is the wrap that was asked for, and it holds across every
                width the clamp covers (checked 1024 through 1920).

                The three groups are still three, because each carries its own
                colour and its own reveal delay: "Explore" in snow, "New
                Heights" in brand through `text-stroke`, the rest in brand. Only
                `display` changed.

                THE TWO `{" "}` ARE LOAD-BEARING. <Chars> only emits spaces
                between words it was given itself, so without them the heading
                renders "EXPLORENEW HEIGHTS" and its textContent reads
                "NEWHEIGHTS" to anything that flattens the markup. They matter
                more now than they did between blocks: inline, they are the
                actual break opportunities the wrap above depends on. */}
            <span>
              <Chars text={heroWords[0]} play={started} delay={0.05} />{" "}
              <span className="text-stroke">
                <Chars text={heroWords[1]} play={started} delay={0.25} />
              </span>
            </span>{" "}
            <span className="text-brand">
              <Chars text={heroWords[2]} play={started} delay={0.4} />
          </span>
        </h2>

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
        </div>

        {/* THE SECOND COLUMN: the six services, played one at a time. See
            fx/ServiceReel for the six scenes, and for why this is a reel rather
            than one diagram or the hub-and-six-nodes the brief suggested (that
            drawing already ships, on the Performance Marketing hero).

            Held back until the preloader hands over, like the logo strip below,
            so it does not arrive before the headline it sits beside — and its
            own timer starts when it mounts, so the first scene is not already
            half spent by the time anyone can see it. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full min-h-0"
        >
          <ServiceReel />
        </motion.div>
        </div>

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
        <TrustStrip id="trust" compact />
      </motion.div>
    </section>
  );
}

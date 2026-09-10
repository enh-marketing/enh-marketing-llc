"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/lib/content";
import { Chars, Counter, Rise } from "@/components/fx/Reveal";
import { Button, ArrowRight } from "@/components/ui/Button";
import { pages, routeExists } from "@/lib/sitemap";
import { Container } from "@/components/ui/Container";
import { Sparkline } from "@/components/fx/Adornments";
import { BoltCanvas, type BoltHandle } from "@/components/fx/BoltCanvas";

gsap.registerPlugin(ScrollTrigger);

/** The section's heading, which does NOT scrub.
 *
 *  It used to be the first of four "statements" sharing the scroll with the
 *  three paragraphs, so the section's own title faded in and back out again on
 *  the way past -- and at the same size as the paragraphs under it, which is
 *  the trap DESIGN.md names: at the same scale and weight the reader does not
 *  see a heading and a statement, they see two headings. It is now a heading
 *  in its own right, lit for the whole pinned run, at the locked `display-xl`
 *  section-heading size against the paragraphs' `statement` step. That pairing
 *  is the site's own -- roughly 60px against 30px -- rather than a size picked
 *  here. */
/** Three lines rather than Craft's two, because the sentence is longer: 61
 *  characters against 43. Left to wrap on its own it broke as "A DIGITAL
 *  MARKETING COMPANY IN" over an orphaned "DUBAI", so the breaks are set here.
 *  The last line is the one that goes brand, as it does in Craft. */
const STORY_HEADING = [
  "A Digital Marketing",
  "Company in Dubai",
  "Built Around Your Growth",
] as const;

/** The three paragraphs, which do. One reveals word-by-word per third of the
 *  runway; accent words glow brand-red.
 *
 *  `N` is read from this array's length and the runway is divided by it, so
 *  dropping the heading out of the scrubbed set gives each paragraph a third of
 *  the scroll instead of a quarter, with no other change. The copy is the
 *  homepage document's, verbatim. */
const STORY_PARAGRAPHS: { text: string; accent: string[] }[] = [
  {
    text: "As a Google Partner digital marketing agency in Dubai, we bring SEO, paid media, social media and creative together under one roof, so search demand turns into qualified leads and real sales. If you are looking for a digital marketing agency in Dubai that is measured on results rather than promises, you are in the right place.",
    accent: [],
  },
  {
    text: "ENH Marketing is a full-service digital marketing company in Dubai, UAE. We plan and run campaigns that connect your brand with high-intent customers at every stage, from the first Google search to the final enquiry. Every strategy is built on data, proven methods and a close reading of the UAE market, so your budget works harder and your results are easy to measure.",
    accent: [],
  },
  {
    text: "Businesses choose us because we behave like a growth partner, not a vendor. Whether you need to rank higher on Google, fill your pipeline with B2B leads, or build a social audience that actually buys, you get a dedicated team, clear reporting and a plan tied to your commercial goals. That is what has made us one of the digital marketing companies in Dubai that clients stay with year after year.",
    accent: [],
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/**
 * "The Story" — Ignite-style 3D scrub intro.
 *
 * A pinned stage holds a glossy 3D lightning bolt (Three.js) that spins on its
 * axis as you scroll. Over the top, three statements fade in one after another,
 * each illuminating word-by-word from dim to bright. One scrubbed ScrollTrigger
 * drives the bolt's rotation and all the text — buttery, in lockstep with Lenis.
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const runway = useRef<HTMLDivElement>(null);
  const boltRef = useRef<BoltHandle>(null);

  useEffect(() => {
    const el = root.current;
    const track = runway.current;
    if (!el || !track) return;

    const lines = gsap.utils.toArray<HTMLElement>(".story-line", el);
    const words = lines.map((l) => Array.from(l.querySelectorAll<HTMLElement>(".story-word")));
    const N = lines.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (p: number) => {
      boltRef.current?.setProgress(p);
      for (let si = 0; si < N; si++) {
        const lp = clamp((p - si / N) / (1 / N));
        const fin = clamp(lp / 0.16);
        const fout = si === N - 1 ? 1 : 1 - clamp((lp - 0.84) / 0.16);
        lines[si].style.opacity = String(Math.min(fin, fout));
        lines[si].style.transform = `translateY(${(1 - fin) * 26 + (1 - fout) * -26}px)`;
        const wl = words[si];
        for (let wi = 0; wi < wl.length; wi++) {
          const ws = 0.14 + (wi / Math.max(1, wl.length - 1)) * 0.66;
          wl[wi].style.opacity = String(0.16 + 0.84 * clamp((lp - ws) / 0.06));
        }
      }
    };

    if (reduce) {
      // Static, readable fallback: first statement lit, bolt parked.
      lines.forEach((l, i) => {
        l.style.opacity = i === 0 ? "1" : "0";
        l.style.transform = "none";
      });
      words.flat().forEach((w) => (w.style.opacity = "1"));
      boltRef.current?.setProgress(0);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => reveal(self.progress),
    });
    reveal(0);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      st.kill();
    };
  }, []);

  return (
    <section ref={root} id="story" className="relative">
      {/* Stats open the chapter */}
      <div className="border-y border-line">
        <Container className="px-0 sm:px-0">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`group px-6 py-12 sm:px-10 ${i < stats.length - 1 ? "lg:border-r lg:border-line" : ""} ${i % 2 === 0 ? "border-r border-line lg:border-r" : ""} ${i < 2 ? "border-b border-line lg:border-b-0" : ""}`}
              >
                <Sparkline className="mb-4" />
                <dt className="font-display text-[clamp(2.1rem,3.6vw,3.2rem)] font-extrabold leading-none text-snow transition-colors duration-500 group-hover:text-brand">
                  <Counter value={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-3 text-sm text-fog">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
      {/* Tall runway; the stage inside pins while the scene plays */}
      <div ref={runway} className="relative h-[340vh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          {/* 3D bolt + soft halo behind the words.
          
              THE BOLT IS HELD AT HALF STRENGTH. It is a narrow, tall object --
              roughly 135px wide and 450px tall at a 900px stage, dead centre,
              because the camera frames it on the origin -- and the copy over it
              is centred too, so its glossy specular highlights ran straight
              through the middle of every line. At full strength it competes
              with the words for the same 40% of the stage and wins, which is
              what "the text is clashing with the icon" is. Nothing about the
              scene changes: it is the same bolt, the same spin, the same
              scroll-driven turn. It just sits behind the reading rather than
              in it. */}
          <BoltCanvas className="pointer-events-none absolute inset-0 z-0 opacity-50" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(232,0,13,0.28) 0%, rgba(232,0,13,0.05) 45%, transparent 70%)",
            }}
          />

          {/* The reading veil, between the artwork and the words.
          
              A wide, soft ellipse of the page's own ground colour: strongest
              where the text block is and gone by 78%, so the bolt's tips and
              the red halo still read at the edges of the stage while the type
              sits on something close to flat page. `--color-void` rather than a
              hardcoded colour, so it is the page's ground in both themes --
              near-white at #e6e3de in light and near-black at #060606 in dark.
              The same device StudioMap uses to lift its address panel off the
              map, at the same `color-mix(in srgb, ..., transparent)` house
              spelling.
              
              z-[5] puts it over the canvas and the halo at z-0 and under
              everything the reader is meant to read at z-10. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5]"
            style={{
              background:
                "radial-gradient(72% 44% at 50% 50%, color-mix(in srgb, var(--color-void) 72%, transparent) 0%, color-mix(in srgb, var(--color-void) 58%, transparent) 45%, transparent 78%)",
            }}
          />

          <p className="absolute left-1/2 top-10 z-10 -translate-x-1/2 text-xs font-semibold uppercase text-fog">
            <span className="text-brand">(01)</span> The story
          </p>

          {/* The heading always lit, the paragraphs cycling under it.
          
              THE PARAGRAPHS ARE STACKED WITH GRID, NOT `absolute`. They have
              to overlap -- one is visible at a time -- but they also have to
              have a height, or the flex column above cannot centre the pair
              and the heading has nothing to sit clear of. Every paragraph in
              `col-start-1 row-start-1` puts them all in one cell, so they
              overlap AND the cell measures the tallest of them. Absolute
              positioning gave the overlap and no height, which is what used to
              force the whole scene into a single centred stack. */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 px-6 sm:gap-12">
            {/* The Craft section's heading treatment, exactly: display face,
                `display-xl`, extrabold, uppercase, and split over two block
                lines with the second in brand. Only the centring is this
                section's own -- the whole scene is centred on the bolt, so a
                left-aligned heading would sit off the composition's axis.
                
                THE LINE-HEIGHT OVERRIDE IS GONE WITH THE CASE. It was an
                inline style, because `.display-xl` declares its own 0.98
                unlayered in globals.css and beats any Tailwind leading
                utility. The reason for it was that this heading alone was
                sentence case, so descenders in Digital, Marketing, Company and
                Growth fell under the next line's capitals. Uppercase has no
                descenders, so 0.98 is now right here for the same reason it is
                right on every other section heading. */}
            <h2 className="max-w-6xl text-center font-display display-xl font-extrabold uppercase text-snow">
              <span className="block">
                <Chars text={STORY_HEADING[0]} />
              </span>
              {/* Real spaces, or the spans concatenate in textContent and the
                  heading reads "MarketingCompany in DubaiBuilt". */}
              {" "}
              <span className="block">
                <Chars text={STORY_HEADING[1]} delay={0.12} />
              </span>
              {" "}
              <span className="block text-stroke">
                <Chars text={STORY_HEADING[2]} delay={0.24} />
              </span>
            </h2>

            <div className="grid w-full max-w-6xl">
              {STORY_PARAGRAPHS.map((s, si) => {
                const accent = new Set(s.accent);
                return (
                  <p
                    key={si}
                    /* Body face, regular weight, balanced wrap -- which is
                       what `.statement` is paired with almost everywhere else
                       on this site (23 call sites carry exactly
                       "statement text-balance text-snow"). These are 330 to
                       400 characters of prose apiece, and they were set in the
                       display face at bold: Cabinet Grotesk is for headings,
                       and bold centred prose over six lines is the hardest
                       thing on the page to read. It also widens the gap to the
                       heading, which is now display face and bold against body
                       face and regular rather than the same treatment twice at
                       two sizes. `text-balance` evens the rag, which is what
                       centred copy needs most. */
                    className="story-line pointer-events-none col-start-1 row-start-1 statement text-balance text-center leading-[1.25] text-snow will-change-[opacity,transform]"
                    style={{ opacity: 0 }}
                  >
                    {/* The word carries a trailing space of its own.
                        
                        Words are spaced by `mr-[0.28em]` between inline-blocks,
                        which draws the gap but puts no space character in the
                        text, so the paragraph's textContent read
                        "AsaGooglePartner...". A trailing space inside an
                        inline-block is dropped from its line box, so the space
                        lands in the text and the gap on screen is still the
                        margin's 0.28em and nothing else. */}
                    {s.text.split(" ").map((w, wi) => (
                      <span
                        key={wi}
                        className={`story-word mr-[0.28em] inline-block ${accent.has(w) ? "text-brand" : ""}`}
                        style={{ opacity: 0.16 }}
                      >
                        {w + " "}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Decorative pulse dot, as in the reference.
          
              10% from the bottom, not 16%. The copy block is sized by WIDTH --
              display-xl and .statement are both vw clamps -- so it stays about
              450px tall however short the stage gets, while a percentage
              offset walks this dot upwards into it. Measured: at 16% the
              paragraph overlapped the dot by 8px at 660px tall and by 19px at
              600px, which is a laptop with browser chrome or a tablet in
              landscape. The offset has to stay under H/2 - 231 for the two to
              clear; 10% satisfies that from about 578px up, and 16% only from
              about 680px. Still proportional rather than a fixed inset, so the
              composition still breathes on a tall screen. */}
          <span className="absolute bottom-[10%] left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_12px_rgba(232,0,13,0.9)]" />
        </div>
      </div>

      {/* "Know More", which is how the document closes this section.

          IT IS BELOW THE PINNED SCENE, NOT INSIDE IT. The stage is one viewport
          tall and the document's three paragraphs are set at display scale
          inside it: the tallest measures 580px in a 900px stage, and the eyebrow
          and the pulse dot already take the space above and below that. A
          button placed in the stage would either collide with the last
          paragraph on a short screen or have to be timed to the scrub, and it
          would leave the scene as the reader scrolls out of it. In flow, it
          arrives exactly when the story finishes and cannot be missed.

          IT POINTS AT /about-us. The document gives the label and no
          destination. This section is the company introduction -- "ENH
          Marketing is a full-service digital marketing company in Dubai, UAE"
          -- so About is what "know more" means here; nothing else on the site
          continues that sentence. Guarded, so if that route ever leaves BUILT
          the button goes with it rather than becoming a 404. */}
      {routeExists(pages.about.href) && (
        <Container className="py-14 text-center sm:py-16">
          <Rise>
            <Button href={pages.about.href}>
              Know More
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Rise>
        </Container>
      )}
    </section>
  );
}

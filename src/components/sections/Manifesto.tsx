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
  /** The rising light. Written to by `reveal` alongside the lines and the
   *  words, so the ground comes up on the same scrub that reads the story --
   *  one mechanic driving the whole stage rather than a second one added for
   *  the background. */
  const horizon = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const track = runway.current;
    if (!el || !track) return;

    const lines = gsap.utils.toArray<HTMLElement>(".story-line", el);
    const words = lines.map((l) => Array.from(l.querySelectorAll<HTMLElement>(".story-word")));
    const N = lines.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (p: number) => {
      if (horizon.current) {
        /* Comes up and brightens across the three paragraphs. Anchored at the
           bottom, so translating it is the light rising rather than a box
           sliding. */
        horizon.current.style.opacity = String(0.34 + 0.5 * p);
        horizon.current.style.transform = `translateY(${((1 - p) * 13).toFixed(2)}%)`;
      }
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
      if (horizon.current) {
        horizon.current.style.opacity = "0.6";
        horizon.current.style.transform = "none";
      }
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
          {/* THE GROUND, AND THERE IS NO BOLT ON IT ANY MORE.
          
              This stage used to hold a glossy 3D lightning bolt on a Three.js
              canvas, dead centre, with the copy centred over it. The two wanted
              the same 40% of the stage, so the bolt ran at half strength under a
              veil painted from 72% of the page's own ground colour -- and what a
              reader actually saw was centred text on a flat field with a faint
              pink smudge in it. An expensive object, hidden to make room for the
              words. Team direction removed it, and the veil went with it: there
              is nothing behind the type now that the type has to be protected
              from.
          
              WHAT IS THERE INSTEAD IS ATMOSPHERE AND DEPTH, which is what this
              page uses in place of pictures everywhere else, in the same three
              devices the hero uses -- drifting brand auroras, a faint grid, and
              a warm wash -- with two decisions of its own:
          
              THE GRID IS LAID DOWN AS A FLOOR. `perspective` on the wrapper and
              a single `rotateX` on the plane, origin at the bottom, so it
              recedes from the reader's feet to a horizon instead of sitting flat
              behind the words. Masked out before it reaches the copy. That is
              the section's own subject drawn as a ground plane: a company built
              around growth, and a page whose every other label is a climb.
          
              AND THE LIGHT RISES AS THE STORY IS READ. The wash below is driven
              by the same scrubbed progress that lights the words, so by the last
              paragraph the horizon has come up and brightened. It peaks at the
              bottom of the stage and is gone by 72% of its height, which is
              under the copy block -- the light is put where the text is not,
              which is why none of this needs a veil over it.
          
              ALL CSS. No canvas, nothing to load, nothing to fail, and the
              section no longer pulls Three.js into the homepage island at all.
              Two other components still use it, so the dependency stays. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {/* Atmosphere, low, so it reads as ground light.

                NO BRAND RED IN ANY OF IT. These were `bg-brand/25` and
                `bg-brand-deep/25` and the wash below was a red gradient, which
                put a pink field behind the whole stage in light mode. `ink-3`
                instead, which is the one token that means "lighter than the
                ground" in BOTH themes -- pure white against the off-white
                `void` in light, #1e1e1e against near-black in dark -- so the
                same markup reads as light rising either way, with no colour in
                it. The red left on this stage is the heading's own last line
                and the pulse dot, both of which are the section's design
                rather than its background. */}
            <div className="aurora-a absolute -left-[6%] bottom-[-14%] h-[46vw] w-[46vw] rounded-full bg-ink-3/60 blur-[150px]" />
            <div className="aurora-b absolute -right-[8%] bottom-[-10%] h-[38vw] w-[38vw] rounded-full bg-ink-3/40 blur-[130px]" />

            {/* The floor. */}
            <div className="absolute inset-x-0 bottom-0 h-[64%] [perspective:560px]">
              <div
                className="absolute inset-0 origin-bottom opacity-[0.22]"
                style={{
                  transform: "rotateX(69deg)",
                  backgroundImage:
                    "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                  backgroundSize: "88px 88px",
                  maskImage: "linear-gradient(to top, black 0%, rgba(0,0,0,0.35) 42%, transparent 78%)",
                  WebkitMaskImage: "linear-gradient(to top, black 0%, rgba(0,0,0,0.35) 42%, transparent 78%)",
                }}
              />
            </div>

            {/* The rising light. Scrubbed.
            
                A hairline once ran across where the floor meets it, to tie the
                two into one horizon. It is gone: at 940px it grazed the last
                line of the paragraph, and any height that cleared the text put
                it through the button instead. A rule that has to dodge two
                moving elements at every viewport height is not earning its
                place, and the floor's own recession already reads as a
                horizon without it. */}
            <div
              ref={horizon}
              className="absolute inset-x-0 bottom-0 h-[56%] will-change-[opacity,transform]"
              style={{
                opacity: 0.34,
                background:
                  "radial-gradient(64% 100% at 50% 100%, color-mix(in srgb, var(--color-ink-3) 92%, transparent) 0%, color-mix(in srgb, var(--color-ink-3) 42%, transparent) 38%, transparent 72%)",
              }}
            />
          </div>

          <p className="absolute left-1/2 top-10 z-10 -translate-x-1/2 text-xs font-semibold uppercase text-fog [@media(max-height:720px)]:top-6">
            The story
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
          {/* THE GAPS TIGHTEN ON A SHORT STAGE, which is what buys the button
              its place in here. The stage is one viewport tall and the centred
              block is now heading + paragraph + button: measured, it clears the
              eyebrow above and the dot below by 184px and 140px at 940px tall,
              by 24px and 12px at 620px, and at 560px it fails -- the heading
              rides 6px into the eyebrow and the dot lands 42px inside the
              button. A 720px height query takes the two gaps from 48px to
              20px, lifts the eyebrow, and drops the dot, which is the one
              element here with nothing to say. That holds it down to 500px,
              which is a laptop with browser chrome or a tablet in landscape. */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 px-6 sm:gap-12 [@media(max-height:720px)]:gap-5">
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
                       centred copy needs most.

                       AND THE SIZE IS NOW SET HERE RATHER THAN BY `.statement`,
                       which is the only thing that changed. That clamp lands on
                       30.4px at 1440, and these paragraphs are 330 to 400
                       characters apiece, so each one ran to six centred lines --
                       which is exactly what the note above calls the hardest
                       thing on the page to read, and then sets anyway. 24px at
                       1.45 is four lines, keeps a clear step down from the
                       display-xl heading, and reads as prose. The composition,
                       the centring, the balance and the scrub are untouched. */
                    className="story-line pointer-events-none col-start-1 row-start-1 text-balance text-center text-[1.125rem] leading-[1.5] text-snow will-change-[opacity,transform] sm:text-[1.3125rem] sm:leading-[1.45] lg:text-[1.5rem]"
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

            {/* "Know More", which is how the document closes this section.

                IN THE STAGE, UNDER THE PARAGRAPHS, at the team's request. It
                used to sit in flow below the whole runway, and the note that
                put it there was right at the time: the paragraphs were set at
                `.statement`, the tallest measured 580px in a 900px stage, and
                a button in the stage would have collided with the last one on
                any short screen. That is no longer the arithmetic. The
                paragraphs are 24px now, the tallest measures nearer 140px, and
                the whole centred block comes to about 470px -- so on a 940px
                stage the button clears the eyebrow above and the pulse dot
                below with room to spare. Measured at 1440x940, 1024x900,
                1440x620 and 390x844.

                IT POINTS AT /about-us. The document gives the label and no
                destination. This section is the company introduction -- "ENH
                Marketing is a full-service digital marketing company in Dubai,
                UAE" -- so About is what "know more" means here; nothing else on
                the site continues that sentence. Guarded, so if that route ever
                leaves BUILT the button goes with it rather than becoming a
                404. */}
            {routeExists(pages.about.href) && (
              <Rise delay={0.15}>
                <Button href={pages.about.href}>
                  Know More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Rise>
            )}
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
          <span className="absolute bottom-[10%] left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_12px_rgba(232,0,13,0.9)] [@media(max-height:720px)]:hidden" />
        </div>
      </div>

    </section>
  );
}

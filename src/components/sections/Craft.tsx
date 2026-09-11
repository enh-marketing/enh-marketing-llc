"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { crafts, type Craft as CraftType } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { OrbitMark, SpinStar } from "@/components/fx/Adornments";
import { ArrowRight } from "@/components/ui/Button";
import { routeExists } from "@/lib/sitemap";
import { cn } from "@/lib/cn";

function Card({ craft, index, total }: { craft: CraftType; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // As the next card scrolls over, this one recedes.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const isLast = index === total - 1;

  return (
    <div ref={ref} className="sticky" style={{ top: `calc(72px + ${index * 9}px)` }}>
      <Container className="mb-6">
      <motion.article
        style={isLast ? {} : { scale }}
        className="relative w-full origin-top overflow-hidden rounded-3xl border border-line bg-ink-2"
      >
        {!isLast && (
          <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-void" />
        )}
        <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-line px-4 py-1.5 text-xs uppercase text-fog">
                {craft.tag}
              </span>
            </div>
            {/* The first word carries a trailing space.
                
                A <br> breaks the line but contributes no character, so this
                heading's textContent read "SearchEngine Optimization" -- the
                seven service names on the homepage of an SEO agency, glued.
                Trailing whitespace before a forced break is dropped from the
                line box, so the space lands in the text and nothing moves. */}
            <h3 className="font-display display-lg mt-10 font-extrabold uppercase text-snow">
              {craft.title.split(" ")[0] + " "}
              <br />
              <span className="text-stroke">{craft.title.split(" ").slice(1).join(" ")}</span>
            </h3>
            {/* THE WAY IN, which the card never had: seven summaries of seven
                service pillars and nothing on any of them to reach the pillar.
                
                It sits in the left column under the heading it belongs to,
                rather than under the body and the item list in the right
                column. That column is `justify-between` with two children, so
                appending a third would have redistributed the body and the
                items to make room -- and the point here was to add the link
                without moving what is already on the card.
                
                The mark is the industries deck's: label, a rule that runs out,
                and a brand arrow. Guarded, because this is a link like any
                other on this site: a pillar not in BUILT keeps the card and
                loses the affordance rather than promising a 404. */}
            {/* Paired with the orbit mark on one row, and that is the whole
                trick: the mark is a 52px circle and the link is 18px tall, so
                the link costs the column NO extra height. Stacked under it
                instead, the left column grew ~70px, and because the right
                column is `justify-between` its item list tracks the card's
                bottom edge -- so the card got taller and a void opened between
                the body copy and the items. Measured before settling on this.
                The card is the height it always was. */}
            {/* Hidden below `lg` when there is no link to put in it: the orbit
                mark is `lg` only, so on a phone the AI Hub card -- the one
                pillar with no landing page to send you to -- would otherwise
                carry 32px of margin around an empty row. */}
            <div
              className={cn(
                "mt-8 items-center gap-6",
                craft.href && routeExists(craft.href) ? "flex" : "hidden lg:flex",
              )}
            >
            {craft.href && routeExists(craft.href) && (
              <a
                href={craft.href}
                className="tap-safe group/more inline-flex items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-snow transition-colors duration-500 group-hover/more:text-brand-text motion-reduce:transition-none">
                  Know More
                </span>
                <span
                  aria-hidden
                  className="h-px w-8 bg-line transition-all duration-500 group-hover/more:w-14 group-hover/more:bg-brand motion-reduce:transition-none"
                />
                <span aria-hidden className="text-brand">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/more:translate-x-1 motion-reduce:transition-none" />
                </span>
              </a>
            )}
              <OrbitMark className="hidden shrink-0 opacity-70 lg:block" />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <p className="max-w-md text-base leading-relaxed text-fog sm:text-lg">{craft.body}</p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {craft.items.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-line pb-3 text-sm text-snow">
                  <span className="h-1 w-1 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
      </Container>
    </div>
  );
}

export function Craft() {
  return (
    <section id="craft" className="relative py-16 sm:py-20">
      {/* THE BAND USED THE LEFT THIRD AND LEFT THE REST EMPTY. Measured at
          1440: the heading ran to 812px of a 1240px container and the lede sat
          underneath it inside `max-w-lg`, so a 512px column of six short lines
          hung in the left corner with roughly 40% of the band dead to the
          right of both. Nothing reached the container's right edge, so the
          section had no width -- it read as a paragraph that had been indented
          rather than as the opening of a chapter.

          THE FIRST ATTEMPT AT FIXING IT WAS WORSE, and worth recording. It
          parked a big "07 / SERVICES" figure in the empty half. That is a
          number nobody asked for, restating what the seven cards underneath
          make obvious, and it left its own void beneath it -- decoration
          invented to fill a gap, which is the failure this whole band already
          had. It is gone.

          WHAT FILLS THE WIDTH IS THE HEADING AND THE LEDE SHARING A ROW, at
          roughly the golden split. The lede was never too long, it was too
          narrow -- six lines in a 512px well. Beside the heading it is the same
          words at a 52ch measure and it holds up the right half of the band on
          its own. The split is 1.55fr to 1fr because the heading needs 712px at
          display-xl and gets 724: any narrower and its two designed lines wrap
          into four ragged ones. Both columns are fr units, so the heading's own
          vw-based size and its column shrink together, and the clearance holds
          from 1024 up.

          A NUMBERED INDEX OF THE SEVEN SERVICES ALSO STOOD UNDER THE BAND and
          has been taken out at the team's request. Worth knowing it was tried:
          it read as a nav bar sitting above a section that already lists the
          same seven as cards. */}
      <Container className="mb-14 sm:mb-16">
        <div className="mb-9 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
          <span>The craft</span>
          <SpinStar />
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          {/* The document's H2, split across the two lines the design sets it
              on. The words and their capitalisation are its own; only the break
              between them is a decision made here. */}
          <h2 className="font-display display-xl font-extrabold uppercase text-snow">
            <span className="block"><Chars text="Our Digital Marketing" /></span>
            {/* A real space: the two spans otherwise concatenate in textContent
                and the heading reads "MarketingServices". */}
            {" "}
            <span className="block text-stroke"><Chars text="Services in Dubai, UAE" delay={0.15} /></span>
          </h2>

          <Rise delay={0.3} className="lg:pt-2">
            <p className="max-w-[52ch] text-[1rem] leading-[1.7] text-fog sm:text-[1.0625rem]">
              Work with our digital marketing agency in Dubai, UAE to find more
              chances to meet and talk with new customers at every step. From when
              they first know about you until they decide to buy from you. Our
              digital marketing services in Dubai, UAE are made just for you. We
              make your customer&apos;s journey smooth - from the first look to
              trusting it and then finally employing your service.
            </p>
          </Rise>
        </div>

      </Container>

      <div>
        {crafts.map((c, i) => (
          <Card key={c.no} craft={c} index={i} total={crafts.length} />
        ))}
      </div>
    </section>
  );
}

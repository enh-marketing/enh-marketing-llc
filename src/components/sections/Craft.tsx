"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { crafts, type Craft as CraftType } from "@/lib/content";
import { Chars, Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { OrbitMark } from "@/components/fx/Adornments";
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
              <span className="font-display text-base font-bold text-brand">({craft.no})</span>
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
                className="group/more inline-flex items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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
      <Container className="mb-16">
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
          <span className="text-brand">(02)</span> The craft
        </p>
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
        <Rise delay={0.3} className="mt-6 max-w-lg text-fog">
          Work with our digital marketing agency in Dubai, UAE to find more
          chances to meet and talk with new customers at every step. From when
          they first know about you until they decide to buy from you. Our
          digital marketing services in Dubai, UAE are made just for you. We
          make your customer&apos;s journey smooth - from the first look to
          trusting it and then finally employing your service.
        </Rise>
      </Container>

      <div>
        {crafts.map((c, i) => (
          <Card key={c.no} craft={c} index={i} total={crafts.length} />
        ))}
      </div>
    </section>
  );
}

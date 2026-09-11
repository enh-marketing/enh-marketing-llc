"use client";

import { useState } from "react";
import { Chars } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { SpinStar } from "@/components/fx/Adornments";
import { ArrowRight } from "@/components/ui/Button";
import { Marked } from "@/components/service/Marked";
import { cn } from "@/lib/cn";
import { industries } from "@/lib/content";
import { pages, routeExists } from "@/lib/sitemap";

/** "Digital Marketing Built Around Your Business" — five sectors, and the point
 *  is that they are not counting the same thing.
 *
 *  WHY THE FIRST VERSION WAS BASIC: IT HAD NOTHING TO SAY. The homepage
 *  document gives this section a heading and then "[card of all industries
 *  pages]", which is an instruction and not copy -- it names no sector and
 *  describes none. So the section was five bare names in five boxes, three of
 *  which were not even links because their pages did not exist. No arrangement
 *  of five words is going to convey an argument.
 *
 *  ALL FIVE PAGES EXIST NOW, AND THEY HANDED OVER THE ARGUMENT. Each one opens
 *  by saying what its sector is trying to win, and read side by side the five
 *  say something none of them says alone:
 *
 *    healthcare   ... appointment bookings
 *    logistics    ... requests for quotations
 *    automotive   ... test-drive requests, showroom visits
 *    hospitality  ... direct bookings, restaurant reservations
 *    ecommerce    ... sales and repeat business
 *
 *  ...while the channels underneath barely move: "SEO, paid advertising, social
 *  media and local search" appears almost word for word in four of the five.
 *  THE DISCIPLINES ARE SHARED AND THE FINISH LINE IS NOT, which is what the
 *  heading has been claiming all along with nothing on the page to back it.
 *
 *  SO THE MECHANIC IS A SWAP, NOT A GRID. One panel holds one sector's sentence
 *  at statement scale with its outcome phrase inked; moving across the five
 *  spines swaps the sentence. What a reader sees change is the finish line, and
 *  what they see stay is the list of channels. A five-up grid puts all five
 *  side by side at card scale and that comparison is exactly what gets lost --
 *  which is the other half of "not conveying the info".
 *
 *  IT IS POINTER-DRIVEN, WHICH IS THE ONE THING THIS PAGE DID NOT ALREADY DO.
 *  Six sections and six mechanics already: the Story crossfades under a pin,
 *  Craft stacks sticky cards, the Proof drags, Why ENH sticks a credential
 *  beside a scrolling case, the AI chapter pins a horizontal run, the Voices
 *  marquee auto-rotates. Another scroll mechanic would have been a seventh
 *  variation on the same input. This one answers the pointer and the keyboard
 *  and does not touch scroll at all -- and the section reshaping itself around
 *  whichever sector you point at is the heading, performed.
 *
 *  NO DRAWINGS, DELIBERATELY. A drawn clinic under the words "Healthcare &
 *  Clinics" tells a reader nothing the words did not, which is the test this
 *  site applies to every section visual. The information here is verbal -- five
 *  different definitions of success -- so it is carried by scale and emphasis.
 *
 *  EVERY WORD IS THE INDUSTRY PAGES' OWN. The sentences are their
 *  `meta.description` values verbatim and the inked phrase is a contiguous
 *  substring of each, so emphasis is the only editorial act.
 *  `npm run check:industry-copy` fails if either drifts from its source.
 *
 *  READABLE WITH NO POINTER AND ON A PHONE. Below `lg` the deck is a plain
 *  stacked list with every sector's sentence visible at once and no interaction
 *  needed; the spine labels are ordinary headings there rather than rotated. */
/** `index` is accepted and ignored: the red section counter it used to print
 *  is gone sitewide. Kept in the signature so the page bodies that pass one do
 *  not all need editing, and so putting the numbering back stays one line. */
export function Industries({}: { index?: string } = {}) {
  /** Built AND quoted. `routeExists` keeps a planned-but-unbuilt sector out, as
   *  every link on this site does; the second test matters because the panel
   *  reads `copy.description`, and a sector added to the sitemap and shipped
   *  before its sentence was quoted here would throw during render -- which on
   *  this page costs the WHOLE island its interactivity, not one panel. Omitted
   *  is recoverable and loud in review; a dead homepage is neither.
   *  `npm run check:industry-copy` is the other half of this guard. */
  const sectors = (pages.industries.children ?? []).filter(
    (s) => routeExists(s.href) && industries.byHref[s.href],
  );
  const [active, setActive] = useState(0);

  if (sectors.length === 0) return null;

  return (
    <section id="industries" data-section="Industries" className="relative overflow-x-clip py-16 sm:py-20">
      <Container>
        <p className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase text-fog">
          {pages.industries.label} <SpinStar />
        </p>

        {/* The document's H2, over the two lines the design sets it on. No lede
            under it: the document gives this section a heading and a bracketed
            instruction and nothing else, and a line explaining what the deck
            demonstrates would be agency copy written here. The deck makes the
            point without being told to. */}
        <h2 className="font-display display-xl mb-12 font-extrabold uppercase text-snow lg:mb-14">
          <span className="block">
            <Chars text="Digital Marketing Built" />
          </span>{" "}
          <span className="block text-stroke">
            <Chars text="Around Your Business" delay={0.15} />
          </span>
        </h2>

        {/* ------------------------------------------------------------ the deck */}
        <ul className="flex flex-col gap-4 lg:h-[26rem] lg:flex-row lg:gap-4">
          {sectors.map((sector, i) => {
            const copy = industries.byHref[sector.href];
            const on = active === i;
            return (
              <li
                key={sector.href}
                /* flex-grow is what animates. Basis 0 with a numeric grow means
                   the open panel takes six shares of the row and the four
                   spines take one each -- about 700px against 116px at the
                   container's full width -- and the transition is a single
                   interpolated number rather than a width the browser has to
                   re-measure. No effect below `lg`, where the row is a column
                   of auto-height items with no free space to distribute. */
                style={{ flexGrow: on ? 6 : 1, flexBasis: 0 }}
                className="min-w-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              >
                <a
                  href={sector.href}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "group relative flex h-full items-stretch gap-6 overflow-hidden rounded-3xl border p-6 transition-colors duration-500 motion-reduce:transition-none sm:p-7",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    /* The active treatment is `lg` only. Below that the deck
                       is five equal stacked cards with no hover to drive it, and
                       the first one wearing a brand border and a long red rule
                       read as arbitrarily preselected -- caught in a 390px
                       capture. Active means something only where a panel opens. */
                    "border-line bg-ink-2",
                    on ? "lg:border-brand/55 lg:bg-ink-3" : "lg:hover:border-ash/50",
                  )}
                >
                  {/* THE SPINE IS DECORATIVE AND `lg` ONLY. It carries the
                      index, the sector name turned on its side, and the arrow
                      -- and it fades out as its own panel opens, so it never
                      competes with the horizontal name inside. `aria-hidden`
                      because the real heading lives in the payload: assistive
                      tech gets one h3 per sector, not a rotated duplicate. */}
                  <div
                    aria-hidden
                    className="hidden shrink-0 flex-col items-center justify-between lg:flex lg:h-full"
                  >
                    <span
                      className={cn(
                        "font-display text-xs font-bold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
                        on ? "text-brand-text" : "text-ash",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "font-display text-[1.35rem] font-extrabold uppercase leading-[1.1] transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180 motion-reduce:transition-none",
                        on ? "text-snow opacity-0" : "text-fog opacity-100 group-hover:text-snow",
                      )}
                    >
                      {sector.label}
                    </span>

                    <span
                      className={cn(
                        "text-ash transition-opacity duration-500 motion-reduce:transition-none",
                        on ? "opacity-0" : "opacity-100",
                      )}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* The payload. Given a fixed width so the sentence never
                      re-wraps while the panel is opening: the column clips it
                      and the growth reveals it, rather than the text reflowing
                      on every frame of the transition.
                      
                      `justify-between` rather than a top-aligned stack, because
                      the panel is 30rem tall and the sentence is five lines:
                      captured at 1440x940 the first build left roughly half the
                      open panel empty under the copy, with the rule floating in
                      the middle of it. The name takes the top, the sentence the
                      middle, the rule and channels the foot. */}
                  <div
                    className={cn(
                      "flex min-w-0 flex-1 flex-col justify-between gap-6 lg:w-[32rem] lg:flex-none lg:transition-opacity lg:duration-500 motion-reduce:lg:transition-none",
                      on ? "lg:opacity-100" : "lg:opacity-0",
                    )}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-display text-xs font-bold tabular-nums text-brand-text lg:hidden"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* The heading, horizontal, and the panel's headline when
                          it is the open one. */}
                      <h3 className="font-display display-lg font-extrabold uppercase leading-[1.04] text-snow">
                        {sector.label}
                      </h3>
                    </div>

                    <p className="statement max-w-[30ch] text-balance leading-[1.26] text-snow lg:max-w-[26ch]">
                      <Marked text={copy.description} mark={copy.mark} className="text-brand-text" />
                    </p>

                    <span aria-hidden className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-px w-8 bg-line transition-all duration-500 motion-reduce:transition-none",
                          on && "lg:w-20 lg:bg-brand",
                        )}
                      />
                      <span className="text-brand">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

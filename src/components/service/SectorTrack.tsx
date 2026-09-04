"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

gsap.registerPlugin(ScrollTrigger);

/** Ten sectors, and the material each of them actually has to publish.
 *
 *  WHAT THE CONTENT ALREADY CONTAINS. Every sector arrives with its own list:
 *  food and beverage is "dishes, menus, offers, atmosphere and behind-the-scenes
 *  content"; construction is "projects, processes, teams and technical
 *  knowledge". Run as a grey clause after a label that reads as filler. Split at
 *  the document's own commas it becomes the supply -- the thing the section's
 *  lead says the work depends on and its tail says has to be sustainable. Some
 *  sectors carry five kinds of material and some three, and that difference is
 *  now visible instead of buried in a sentence.
 *
 *  WHY THE FIRST VERSION CUT THE LAST FOUR CARDS OFF, AND WHY THIS ONE CANNOT.
 *  It translated the track by a guessed percentage of its own width -- 32% --
 *  while the section scrolled past. Measured, the run is 4,132px wide in a
 *  1,440px window, so reaching the tenth card needs 2,760px of travel, or 67%.
 *  A third of the way was all it ever moved, and the section had left the
 *  viewport before even that finished. Worse, the number was a guess: it would
 *  have been wrong again at any other width, or with one more sector.
 *
 *  So nothing is guessed here. The section pins, the distance is measured from
 *  the last card's own position on every refresh, and the run ends when that
 *  card is centred in the window. Ten sectors or twenty, phone or desktop, the
 *  last one always arrives. This is the same mechanism as the channels run on
 *  the paid pillar, which is the one horizontal run on this site that has never
 *  had this problem.
 *
 *  IT STAYS USABLE WITHOUT ANY OF IT. Below the desktop breakpoint, and wherever
 *  motion is not welcome, no pin is installed and the rail keeps its own
 *  scrollbar and snap points -- a thumb and a scroll-driven translation want the
 *  same gesture, so they are never both live. That is also the state the markup
 *  ships in, before a line of script runs.
 *
 *  Each piece of material is drawn as a frame rather than a pill, because what
 *  is being listed is content that has to be made, not tags. They are set two
 *  to a row rather than wrapped, so a sector with five kinds of material reads
 *  as visibly deeper than one with three -- which is the comparison the section
 *  exists to make, and it was getting lost when the frames reflowed into
 *  whatever width was left over.
 *
 *  THE CARDS ARE SIZED TO BE LOOKED AT. A pinned run gives each card the middle
 *  of the screen for a moment; at 400px they were arriving and leaving without
 *  ever filling it. 480 wide with a floor under the height gives the run a
 *  steady rhythm and the frames room to be read. */

export type Sector = { label: string; parts: string[] };

export function SectorTrack({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  items,
  tail,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  items: Sector[];
  tail: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.pinned) return;
        const el = root.current;
        const track = rail.current;
        if (!el || !track) return;

        const scroller = track.parentElement;
        // Stop being a native scroller only once the pin is really installed.
        if (scroller) scroller.style.overflow = "visible";

        // Measured from the last card itself, on every refresh, so the travel
        // is correct at any width and for any number of sectors.
        const distance = () => {
          const cards = track.querySelectorAll<HTMLElement>(":scope > li");
          const last = cards[cards.length - 1];
          if (!last) return 0;
          return Math.max(0, last.offsetLeft + last.offsetWidth / 2 - el.clientWidth / 2);
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            pin: true,
            scrub: 0.8,
            start: "center center",
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progress.current) {
                progress.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { x: 0 });
          if (scroller) scroller.style.overflow = "";
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id={id} data-section={label} className="relative overflow-hidden py-14 sm:py-16">
      <Container className="relative mb-14">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">{lead}</p>
            </Rise>
          }
        />
      </Container>

      <div ref={root}>
        <div className="no-scrollbar overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul
            ref={rail}
            className="flex w-max snap-x snap-mandatory gap-5 px-6 sm:px-10 lg:snap-none lg:px-[calc((100vw-1320px)/2+2.5rem)]"
          >
            {items.map((s, i) => (
              <li key={s.label} className="group w-[80vw] shrink-0 snap-start sm:w-[480px]">
                <div className="relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-[1.25rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_2%,transparent)] transition-[border-color,transform] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:border-brand/50">
                  {/* The count, ghosted behind the corner, so a run of ten
                      reads as a run without a caption saying so. */}
                  <span
                    aria-hidden
                    className="font-display pointer-events-none absolute -top-3 right-4 select-none text-[5.5rem] font-extrabold leading-none tabular-nums text-brand/[0.07] transition-colors duration-500 group-hover:text-brand/[0.13]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative border-b border-line px-7 py-6">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden
                      className="font-display block text-[0.6875rem] font-bold tabular-nums text-brand/45 transition-colors duration-300 group-hover:text-brand"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display mt-4 max-w-[16ch] text-[clamp(1.2rem,2.2vw,1.6rem)] font-extrabold uppercase leading-[1.08] text-snow transition-colors duration-300 group-hover:text-brand">
                      {s.label}
                    </p>
                  </div>

                  {/* What this sector has to publish, one frame per thing, two
                      to a row so the depth of the list is visible. */}
                  <ul className="relative grid flex-1 auto-rows-min grid-cols-2 gap-2.5 px-7 py-6">
                    {s.parts.map((part) => (
                      <li
                        key={part}
                        className="overflow-hidden rounded-lg border border-line bg-[color-mix(in_srgb,var(--color-brand)_4%,transparent)] transition-colors duration-500 group-hover:border-brand/40"
                      >
                        <span
                          aria-hidden
                          className="block h-1.5 w-full bg-brand/30 transition-colors duration-500 group-hover:bg-brand/70"
                        />
                        <span className="block px-3.5 py-3 text-[0.8125rem] leading-snug text-fog">
                          {part}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Where the reader is in the run. While the section is pinned the
          scrollbar no longer answers that. */}
      <Container className="mt-10 hidden lg:block">
        <span className="block h-px w-full bg-line">
          <span
            ref={progress}
            className="block h-px w-full origin-left scale-x-0 bg-brand"
            aria-hidden
          />
        </span>
      </Container>

      <Container className="relative">
        <Rise delay={0.1}>
          <p className="mt-12 max-w-4xl border-t border-line pt-8 leading-relaxed text-fog sm:text-lg">
            {tail}
          </p>
        </Rise>
      </Container>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { routeExists } from "@/lib/sitemap";
import { Crosslink } from "@/components/ui/Crosslink";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/Button";
import { ChannelIconBadge } from "@/components/service/ChannelIcon";
import { cn } from "@/lib/cn";
import type { GlyphVariant } from "@/components/service/CapabilityGlyph";
import { CoveragePreview, type PreviewKind } from "@/components/service/CoveragePreview";

gsap.registerPlugin(ScrollTrigger);

type Channel = {
  name: string;
  href: string;
  body: string;
  glyph?: GlyphVariant;
  /** A drawing of the thing itself, for runs whose entries are formats rather
   *  than platforms or disciplines. When present it replaces the ring badge and
   *  the card leads with the picture. */
  preview?: PreviewKind;
};
type OrganicNote = { body: string; links: { label: string; href: string }[]; suffix: string };

/** Six channels as a pinned horizontal run: the section holds while the track
 *  travels sideways, giving every channel a full stage instead of a third of a
 *  grid row. Pinned only where there is width and motion is welcome; elsewhere
 *  it degrades to a native snap-scroll rail. */
export function ChannelScroller({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  mark = { variant: "network", label: "Six channels, one budget" },
  channels,
  note,
  tail,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lede?: string;
  /** The diagram beside the heading. Defaulted to the six-channel run this was
   *  built for; passed explicitly by anything else reusing the run. */
  mark?: { variant: "growth" | "network" | "progression" | "contrast" | "ecosystem"; label: string };
  channels: Channel[];
  note?: OrganicNote;
  /** A closing line under the run, for sections whose source gives one instead
   *  of the organic note. */
  tail?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)" },
      (ctx) => {
        if (!ctx.conditions?.pinned) return;
        const el = root.current;
        const rail = track.current;
        if (!el || !rail) return;

        // Only stop being a native scroller once the pin is really installed:
        // with reduced motion this branch never runs, and the rail keeps its
        // own scrollbar instead of overflowing the page.
        rail.style.overflow = "visible";
        // Travel far enough that the last card lands in the middle of the
        // viewport, then release. Measured from the card itself so it stays
        // correct at any width.
        //
        // EVERY CARD COUNTS, NOT JUST THE LINKED ONES. This selected ":scope > a",
        // which was correct only as long as every entry in the run had a page to
        // send you to. On a pillar whose last cards are capabilities rather than
        // pages -- Web Design ends on two of them -- the last <a> is not the last
        // card, so the run stopped short and those entries never reached the
        // middle of the screen. Measured there: the travel came out at 0 against
        // a real requirement of 2,768px. Direct element children, so a card that
        // happens to have nowhere to send you still gets its turn.
        const distance = () => {
          const cards = rail.querySelectorAll<HTMLElement>(":scope > a, :scope > div");
          const last = cards[cards.length - 1];
          if (!last) return 0;
          const centred = last.offsetLeft + last.offsetWidth / 2 - el.clientWidth / 2;
          return Math.max(0, centred);
        };

        // Depth of field: whichever card is nearest the middle of the viewport
        // is fully lit, the rest recede. Driven by quickSetter so the per-frame
        // work is a direct style write, not a tween per card.
        const cards = gsap.utils.toArray<HTMLElement>(":scope > a, :scope > div", rail);

        // Written straight to style rather than through gsap.quickSetter:
        // the "scale" setter needs a primed transform cache and silently
        // no-ops without one. Six direct writes a frame is cheap.
        const focus = () => {
          const mid = window.innerWidth / 2;
          for (const card of cards) {
            const r = card.getBoundingClientRect();
            const offset = Math.abs(r.left + r.width / 2 - mid) / mid;
            const t = gsap.utils.clamp(0, 1, offset);
            card.style.transform = `scale(${gsap.utils.interpolate(1, 0.93, t).toFixed(4)})`;
            card.style.opacity = gsap.utils.interpolate(1, 0.42, t).toFixed(3);
          }
        };

        const tween = gsap.to(rail, {
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
            onRefresh: focus,
            onUpdate: (self) => {
              focus();
              if (progress.current) {
                progress.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(rail, { x: 0 });
          for (const card of cards) {
            card.style.transform = "";
            card.style.opacity = "";
          }
          rail.style.overflow = "";
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section id={id} data-section={label} className="relative overflow-hidden py-16 sm:py-20">
      <Container className="mb-16">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          lede={lede}
          mark={mark}
        />
      </Container>

      <div ref={root}>
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 sm:px-10 lg:px-[calc((100vw-1320px)/2+2.5rem)]"
        >
          {channels.map((channel) => {
            // The whole card is the link, so without aria-labelledby its
            // accessible name is the heading plus the entire body plus "Know
            // More". Pointing at the heading makes the name exactly the visible
            // channel name.
            //
            // A channel whose page is unbuilt renders the same card as a plain
            // container: the channel is still part of the offering, it just has
            // nowhere to send you yet.
            const live = routeExists(channel.href);
            const shell =
              "group relative flex w-[80vw] shrink-0 snap-start flex-col justify-between overflow-hidden border-t border-line pt-8 transition-colors duration-500 hover:border-brand sm:w-[54vw] lg:h-[26rem] lg:w-[27rem]";
            const inner = (
              <>
              <div className="relative">
                {/* A CARD THAT LEADS WITH THE THING, WHERE THERE IS A THING TO
                    LEAD WITH. Advertising channels have a logo and nothing else
                    to show, so they keep the ring badge. A run of formats --
                    four angles, one cut out of a long day, a feed going out
                    live -- can show what it actually produces, and a symbol in
                    a circle would be a worse card than the picture it stands
                    in for. */}
                {channel.preview ? (
                  <div className="relative overflow-hidden rounded-xl border border-line bg-[color-mix(in_srgb,var(--color-brand)_5%,transparent)] transition-colors duration-500 group-hover:border-brand/45">
                    <div className="p-4 text-snow transition-colors duration-500 group-hover:text-brand">
                      <div className="h-[104px] w-full">
                        <CoveragePreview kind={channel.preview} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <ChannelIconBadge name={channel.name} glyph={channel.glyph} />
                )}
                <h3
                  id={`ch-${channel.href}`}
                  className={cn(
                    "font-display font-extrabold uppercase text-snow transition-colors duration-300 group-hover:text-brand",
                    channel.preview
                      ? "mt-6 text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.14]"
                      : "display-lg mt-7",
                  )}
                >
                  {channel.name}
                </h3>
                <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-fog">
                  {channel.body}
                </p>
              </div>

              {/* The pill is the card's promise of a destination, so it goes
                  with the link rather than sitting there inert. */}
              {live && (
                <span className="relative mt-8 inline-flex items-center gap-3 self-start rounded-full border border-line px-5 py-2.5 text-xs font-semibold uppercase text-snow transition-colors duration-300 group-hover:border-brand group-hover:text-brand">
                  Know More
                  <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
                    <ArrowRight className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5" />
                    <ArrowRight className="absolute -translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                  </span>
                </span>
              )}
              </>
            );
            return live ? (
              <a
                key={channel.href}
                href={channel.href}
                aria-labelledby={`ch-${channel.href}`}
                className={shell}
              >
                {inner}
              </a>
            ) : (
              <div key={channel.href} className={shell}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizontal progress: while the section is pinned, vertical scrollbar
          position no longer tells the reader where they are in the run. */}
      <Container className="mt-12 hidden lg:block">
        <span className="block h-px w-full bg-line">
          <span
            ref={progress}
            className="block h-px w-full origin-left scale-x-0 bg-brand"
            aria-hidden
          />
        </span>
      </Container>

      {tail && (
        <Container className="mt-16">
          <p className="max-w-3xl leading-relaxed text-fog">{tail}</p>
        </Container>
      )}

      {note && (
        <Container className="mt-16">
          <p className="max-w-2xl text-sm leading-relaxed text-ash">
            {note.body}{" "}
            {note.links.map((link, i) => (
              <span key={link.href}>
                <Crosslink
                  href={link.href}
                  className="text-snow underline decoration-brand decoration-1 underline-offset-4 transition-colors hover:text-brand"
                  pendingClassName="text-snow"
                >
                  {link.label}
                </Crosslink>
                {i < note.links.length - 2 ? ", " : i === note.links.length - 2 ? " and " : " "}
              </span>
            ))}
            {note.suffix}
          </p>
        </Container>
      )}
    </section>
  );
}

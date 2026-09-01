"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { routeExists } from "@/lib/sitemap";
import { Crosslink } from "@/components/ui/Crosslink";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowRight } from "@/components/ui/Button";
import { ChannelIconBadge } from "@/components/service/ChannelIcon";

gsap.registerPlugin(ScrollTrigger);

type Channel = { name: string; href: string; body: string };
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
  channels,
  note,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lede: string;
  channels: Channel[];
  note?: OrganicNote;
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
        const distance = () => {
          const cards = rail.querySelectorAll<HTMLElement>(":scope > a");
          const last = cards[cards.length - 1];
          if (!last) return 0;
          const centred = last.offsetLeft + last.offsetWidth / 2 - el.clientWidth / 2;
          return Math.max(0, centred);
        };

        // Depth of field: whichever card is nearest the middle of the viewport
        // is fully lit, the rest recede. Driven by quickSetter so the per-frame
        // work is a direct style write, not a tween per card.
        const cards = gsap.utils.toArray<HTMLElement>(":scope > a", rail);

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
          mark={{ variant: "network", label: "Six channels, one budget" }}
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
                <ChannelIconBadge name={channel.name} />
                <h3
                  id={`ch-${channel.href}`}
                  className="font-display display-lg mt-7 font-extrabold uppercase text-snow transition-colors duration-300 group-hover:text-brand"
                >
                  {channel.name}
                </h3>
                <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-fog">
                  {channel.body}
                </p>
              </div>

              {/* The pill is the card's promise of a destination, so it goes
                  with the link rather than sitting there inert. */}
              {live && (
                <span className="relative mt-8 inline-flex items-center gap-3 self-start rounded-full border border-line px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-snow transition-colors duration-300 group-hover:border-brand group-hover:text-brand">
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
              <Link
                key={channel.href}
                href={channel.href}
                aria-labelledby={`ch-${channel.href}`}
                className={shell}
              >
                {inner}
              </Link>
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

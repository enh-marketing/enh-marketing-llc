"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetaMark } from "@/components/service/MetaMark";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { getLenis } from "@/components/fx/SmoothScroll";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, Draggable);

type Capability = { no: string; title: string; body: string; href?: string; glyph?: GlyphVariant };

/** The capabilities as a scroll-driven card stack.
 *
 *  A focused card sits centre stage at full size with its neighbours tucked in
 *  tight on either side, each step back smaller and dimmer. Scroll moves the
 *  focus along the run while the stage is pinned; the arrows and dragging move
 *  the same focus.
 *
 *  Finite, not looping: the run ends on the last card and releases the page. So
 *  there are no duplicate cards — every card in the DOM is one of the seven the
 *  document lists, which keeps the content honest for screen readers and
 *  crawlers, and there is no wrap that could trap the page scroll.
 *
 *  Positions come from one continuous `focus` value rather than a stagger of
 *  per-card tweens, which is what lets the neighbours sit close: each card is
 *  placed a fixed step from the focus and scaled geometrically, so the gaps
 *  widen as the cards recede rather than being uniform.
 *
 *  The pin is on an inner stage, never on the <section>: GSAP's pin wraps its
 *  target in a .pin-spacer, and wrapping a section would push it out of
 *  `main > section`, silently killing the page's background banding and the
 *  dividers between sections.
 *
 *  Below the large breakpoint, and whenever reduced motion is requested, none of
 *  this runs: the same cards render as a native scroll-snap row. That is also
 *  what the server renders, so the section works before hydration. */

/** Card box, in rem. Centring margins derive from these so they cannot drift. */
const CARD_W = 24;
const CARD_H = 28;
/** Horizontal step between adjacent cards, as a fraction of card width. Just
 *  under 1 so a neighbour's inner edge nearly meets the focused card's. */
const STEP = 0.82;
/** Each step back multiplies scale by this. */
const FALLOFF = 0.62;
/** Opacity lost per step back. */
const FADE = 0.28;
/** Scroll distance the pin holds for, per step through the run. */
const PX_PER_STEP = 280;

/** True only where the pinned stack should run. Read through
 *  useSyncExternalStore rather than state-in-an-effect, so there is no
 *  cascading render and the server gets a definite `false`. */
const QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function useStackEnabled() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

export function CapabilityCarousel({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  items: Capability[];
}) {
  const enabled = useStackEnabled();
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const proxyRef = useRef<HTMLDivElement>(null);
  /** Installed by the effect so the arrow buttons move the same focus. */
  const stepRef = useRef<((direction: number) => void) | null>(null);

  const nudge = useCallback((direction: number) => stepRef.current?.(direction), []);

  useEffect(() => {
    const stage = stageRef.current;
    const list = listRef.current;
    const proxy = proxyRef.current;
    if (!enabled || !stage || !list || !proxy) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(list.children);
      const last = cards.length - 1;
      if (last < 0) return;

      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const stepPx = CARD_W * rem * STEP;

      const state = { focus: 0 };

      /** Places every card relative to the current focus. */
      const render = () => {
        cards.forEach((card, i) => {
          const away = i - state.focus;
          const depth = Math.abs(away);
          gsap.set(card, {
            x: away * stepPx,
            scale: Math.pow(FALLOFF, depth),
            opacity: gsap.utils.clamp(0, 1, 1 - depth * FADE),
            zIndex: Math.round(100 - depth * 10),
            // Cards that have faded out must not swallow clicks — the one card
            // carrying a link would otherwise be clickable while invisible.
            pointerEvents: depth < 1.5 ? "auto" : "none",
          });
          // The focused card is the one being read, so it alone takes the brand
          // edge. A threshold, not equality, because focus is continuous.
          card.dataset.focused = depth < 0.5 ? "true" : "false";
        });
      };

      const scrub = gsap.to(state, {
        focus: 0,
        onUpdate: render,
        duration: 0.4,
        ease: "power3",
        paused: true,
      });

      // Lay the cards out synchronously, so the section is never blank on
      // arrival waiting for the first ticker frame.
      render();

      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: "center center",
        end: () => `+=${last * PX_PER_STEP}`,
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          scrub.vars.focus = self.progress * last;
          scrub.invalidate().restart();
        },
      });

      /** Absolute scroll position for a focus index. Clamped, never wrapped —
       *  stepping off either end stops rather than cycling. */
      const focusToScroll = (focus: number) => {
        const span = trigger.end - trigger.start;
        if (span <= 0 || last === 0) return trigger.start;
        return trigger.start + gsap.utils.clamp(0, 1, focus / last) * span;
      };

      const goTo = (focus: number, smooth: boolean) => {
        const target = focusToScroll(focus);
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(target, smooth ? undefined : { immediate: true, force: true });
        else trigger.scroll(target);
      };

      // Settle on a card when scrolling stops, but only while this section owns
      // the viewport — scrollEnd is a global event.
      const onScrollEnd = () => {
        if (!trigger.isActive) return;
        goTo(Math.round(state.focus), true);
      };
      ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

      stepRef.current = (direction: number) =>
        goTo(gsap.utils.clamp(0, last, Math.round(state.focus) + direction), true);

      const draggable = Draggable.create(proxy, {
        type: "x",
        trigger: list,
        onPress() {
          this.startFocus = state.focus;
        },
        onDrag() {
          goTo(this.startFocus + (this.startX - this.x) / stepPx, false);
        },
        onDragEnd() {
          goTo(Math.round(state.focus), true);
        },
      });

      return () => {
        ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
        draggable.forEach((dr) => dr.kill());
        trigger.kill();
        scrub.kill();
        stepRef.current = null;
        cards.forEach((card) => delete card.dataset.focused);
        gsap.set(cards, { clearProps: "all" });
      };
    }, stage);

    return () => ctx.revert();
  }, [enabled]);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-24 sm:py-32">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          markNode={<MetaMark variant="formats" />}
          className="mb-16"
        />
      </Container>

      {/* Stage. Pinned only while the stack is running. */}
      <div
        ref={stageRef}
        className={cn("relative", enabled && "flex items-center justify-center")}
        style={enabled ? { height: `${CARD_H + 6}rem` } : undefined}
      >
        <ul
          ref={listRef}
          className={cn(
            enabled
              ? "absolute inset-0 list-none"
              : "no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:px-8",
          )}
          data-lenis-prevent={enabled ? undefined : ""}
        >
          {items.map((item) => (
            <li
              key={item.no}
              data-card
              className={cn(
                "group/card",
                enabled
                  ? "absolute left-1/2 top-1/2"
                  : "w-[19rem] shrink-0 snap-center sm:w-[21rem]",
              )}
              // Centred with negative margins, deliberately not `translate`:
              // GSAP folds a CSS `translate` into its own transform cache and
              // then overwrites the x half, which leaves the "centred" card half
              // its own width off to the side. Margins sit outside anything
              // GSAP touches.
              style={
                enabled
                  ? {
                      width: `${CARD_W}rem`,
                      marginLeft: `-${CARD_W / 2}rem`,
                      marginTop: `-${CARD_H / 2}rem`,
                    }
                  : undefined
              }
            >
              <article
                style={enabled ? { height: `${CARD_H}rem` } : undefined}
                className={cn(
                  "flex flex-col rounded-3xl border border-line bg-ink-2 p-8 transition-colors duration-500",
                  "group-data-[focused=true]/card:border-brand/70",
                  !enabled && "h-[25rem]",
                )}
              >
                <span className="h-12 w-12 shrink-0 text-brand">
                  {item.glyph && <CapabilityGlyph variant={item.glyph} />}
                </span>

                <h3 className="font-display mt-7 text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-snow">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-fog">{item.body}</p>

                {item.href && (
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-snow transition-colors hover:text-brand"
                  >
                    See how <span aria-hidden>↓</span>
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ul>

        {/* Draggable moves this proxy, never the cards themselves. */}
        {enabled && (
          <div
            ref={proxyRef}
            aria-hidden
            className="pointer-events-none invisible absolute h-px w-px"
          />
        )}

        {enabled && (
          <div className="absolute bottom-0 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-3">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous capability"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-ink-2 text-snow transition-colors hover:border-brand hover:text-brand"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next capability"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-ink-2 text-snow transition-colors hover:border-brand hover:text-brand"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

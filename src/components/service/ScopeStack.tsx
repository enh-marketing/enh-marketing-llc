"use client";

import { useEffect, useRef, useState } from "react";
import { routeExists } from "@/lib/sitemap";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";
import { cn } from "@/lib/cn";

/** Nine scopes, read as the layers of one site's search presence.
 *
 *  WHY A STACK. The section heading calls these nine scopes of one search
 *  strategy, and they are not nine alternatives: they act on different layers
 *  of the same website, from the technical floor it is crawled on up through
 *  structure, pages, content, links and the answers machines assemble out of
 *  them. A grid says nine equal boxes. A stack says one site, nine depths, and
 *  it says it without a word of explanation.
 *
 *  THE STACK IS THE READER'S POSITION, NOT A CONTROL. Every one of the nine is
 *  written out in full down the right, in order, always on the page: this is a
 *  hub, and hiding eight ninths of a hub behind an interaction is how a hub
 *  stops working. The stack simply lights whichever scope is currently under
 *  the reader's eye, so the depth being described is always visible. Scroll is
 *  the only input, which is why there is nothing to press and nothing to miss.
 *
 *  DEPTH IS REAL CSS, NOT A PICTURE OF DEPTH. The plates are laid out in a
 *  perspective context and separated on the Z axis, so the parallax between
 *  them is the browser's own projection. It costs one transform per plate and
 *  no canvas, no library and no per-frame JavaScript: the only script running
 *  is one IntersectionObserver reporting which scope is in the middle of the
 *  viewport.
 *
 *  FOUR OF THE NINE HAVE NO PAGE YET. They keep their layer and their full
 *  entry and simply have no link, which is what the rest of the site does.
 *
 *  IT DEGRADES TO A LIST. Below the desktop breakpoint the stack is not drawn
 *  at all -- an isometric stack of nine at 390 pixels is a smudge -- and the
 *  nine entries stand on their own, which is the state the markup is in before
 *  a single script runs. */

export type Scope = {
  no: string;
  title: string;
  body: string;
  glyph: GlyphVariant;
  href?: string;
};

/** The angle the stack is seen at, and how far apart the layers sit. Both are a
 *  drawing decision: no depth here means anything. */
const TILT = "rotateX(58deg) rotateZ(-42deg)";
const GAP_Z = 30;

export function ScopeStack({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  tail,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: Scope[];
  tail: string;
}) {
  const run = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = run.current;
    if (!list) return;
    const entries = Array.from(list.querySelectorAll<HTMLElement>("li[data-scope]"));
    if (!entries.length) return;

    // One observer reporting which entry is crossing the middle band of the
    // viewport. setActive is called from the observer, never from the effect
    // body, so there is no cascading render on mount.
    const io = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (!record.isIntersecting) continue;
          const i = Number(record.target.getAttribute("data-scope"));
          if (!Number.isNaN(i)) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const entry of entries) io.observe(entry);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Nine scopes under one search strategy" }}
          className="mb-12"
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* The stack. */}
          <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <div
              aria-hidden
              className="relative mx-auto aspect-square w-full max-w-[380px]"
              style={{ perspective: "1100px" }}
            >
              <div
                className="absolute inset-[16%]"
                style={{ transform: TILT, transformStyle: "preserve-3d" }}
              >
                {items.map((s, i) => {
                  const on = active === i;
                  const depth = (items.length - 1 - i) * GAP_Z;
                  return (
                    <div
                      key={s.title}
                      className={cn(
                        "absolute inset-0 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500",
                        on
                          ? "border-brand bg-[color-mix(in_srgb,var(--color-brand)_16%,transparent)]"
                          : "border-line bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)]",
                      )}
                      style={{
                        transform: `translateZ(${depth + (on ? 18 : 0)}px)`,
                        transitionProperty: "background-color, border-color, transform",
                        transitionDuration: "500ms",
                        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                      }}
                    />
                  );
                })}
              </div>

              {/* The scope the reader is on, held flat in front of the stack so
                  it is legible rather than tilted with it. */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-4">
                <span className="block h-9 w-9 text-brand">
                  <CapabilityGlyph variant={items[active]?.glyph ?? items[0].glyph} className="h-full w-full" />
                </span>
                <span className="font-display text-[0.6875rem] font-bold tabular-nums text-brand">
                  {items[active]?.no ?? items[0].no}
                </span>
              </div>
            </div>
          </div>

          {/* The nine, in full, in order. */}
          <ol ref={run} className="border-t border-line">
            {items.map((s, i) => {
              const on = active === i;
              const built = s.href ? routeExists(s.href) : false;
              return (
                <li
                  key={s.title}
                  data-scope={i}
                  className="relative border-b border-line py-9"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-y-0 -left-6 w-[2px] origin-center bg-brand transition-transform duration-500 ease-out lg:-left-10",
                      on ? "scale-y-100" : "scale-y-0",
                    )}
                  />
                  <div className="flex items-start gap-5">
                    <span
                      aria-hidden
                      className={cn(
                        "font-display mt-1 shrink-0 text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                        on ? "text-brand" : "text-brand/35",
                      )}
                    >
                      {s.no}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden
                          className={cn(
                            "block h-8 w-8 shrink-0 transition-colors duration-500 lg:hidden",
                            on ? "text-brand" : "text-ash/60",
                          )}
                        >
                          <CapabilityGlyph variant={s.glyph} className="h-full w-full" />
                        </span>
                        <p
                          className={cn(
                            "font-display text-[clamp(1.15rem,2.2vw,1.6rem)] font-extrabold uppercase leading-[1.12] transition-colors duration-300",
                            on ? "text-brand" : "text-snow",
                          )}
                        >
                          {s.title}
                        </p>
                      </div>
                      <p className="mt-4 max-w-[52ch] text-[clamp(0.98rem,1.7vw,1.1rem)] leading-relaxed text-fog">
                        {s.body}
                      </p>
                      {built && s.href && (
                        <a
                          href={s.href}
                          className="font-display mt-5 inline-flex items-center gap-2 text-[0.78rem] font-extrabold uppercase tracking-wide text-brand underline decoration-brand/40 underline-offset-4 transition-colors duration-300 hover:decoration-brand"
                        >
                          {s.title}
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                            <path
                              d="M5 11L11 5M6 5h5v5"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Rise delay={0.12}>
          <p className="mt-10 max-w-3xl border-t border-line pt-8 leading-relaxed text-fog">{tail}</p>
        </Rise>
      </Container>
    </section>
  );
}

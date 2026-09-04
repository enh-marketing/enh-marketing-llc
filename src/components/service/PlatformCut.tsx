"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/lib/useEnhanced";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { ChannelIcon } from "@/components/service/ChannelIcon";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

/** One idea, cut four ways, because that is the claim being made.
 *
 *  WHY THIS AND NOT ANOTHER DIAGRAM. The second position on this list is the
 *  whole page's argument -- "Each platform gets its own role. Instagram may lead
 *  with visual content, while LinkedIn may need expert commentary and business
 *  context" -- and the page's opening scene is a business that ignores it:
 *  "posts the same artwork on Instagram, Facebook and LinkedIn". Earlier
 *  versions of this section drew a generic pipeline beside the copy, which
 *  demonstrated nothing. This demonstrates the one thing the copy actually
 *  asserts: the same post, re-cut, and what changes is which part of it is
 *  allowed to dominate.
 *
 *  THE PARTS DO NOT DISAPPEAR AND REAPPEAR, THEY MOVE. The media block, the
 *  caption and the actions are the same three elements in all four cuts; they
 *  reshape between arrangements rather than cross-fading, so the reader sees
 *  one idea being re-cut and not four unrelated pictures. On Instagram the
 *  media takes an upright frame and the caption is two lines under it; on
 *  LinkedIn the caption is six lines and the media is a strip; on TikTok the
 *  media is the whole frame and the caption sits over it; Facebook sits between
 *  them. That ordering is the document's own sentence.
 *
 *  THE RESHAPE IS CSS, NOT A LAYOUT ANIMATION. The first cut of this used
 *  Framer's layout animation to move the media between shapes, and measured, it
 *  did not work: the block stayed 333px tall in all four cuts, because a layout
 *  animation is driven by animation frames and the size it is animating towards
 *  is never written to the element until the tween runs. Here the aspect is a
 *  padding ratio on the media's own wrapper -- a percentage of its width, which
 *  is the one aspect technique every browser transitions -- so the shape is
 *  correct on the frame the class lands, with or without a clock.
 *
 *  AND THE DEVICE ITSELF NEVER MOVES. The version before this let the frame take
 *  the height of whatever was inside it, and let one cut drop its padding to go
 *  full-bleed. Both of those change the outer box, so dragging a pointer across
 *  the four buttons resized and recentred the frame on every crossing: it
 *  flickered, jumped and shook. A phone is a phone. The frame is now a fixed
 *  280 by 512 box, everything inside it is absolutely positioned, and the
 *  full-bleed cut fills the frame rather than removing its padding. Nothing
 *  outside the device can move, however fast the pointer crosses the buttons,
 *  and the only thing that transitions is the shape of the media inside it.
 *
 *  NOTHING IN THE FRAMES IS WRITTEN, COUNTED OR CLAIMED. No copy, no follower
 *  numbers, no engagement figures: the blocks are blocks. The only words are
 *  the platform names, which this document already uses, and they are set
 *  against the platforms' own marks so the frame needs no caption.
 *
 *  MOTION. Layout animation on three elements, driven by a choice the reader
 *  makes. Under reduced motion the arrangement changes without the tween, and
 *  the first cut is a complete frame before any script runs. */

type Cut = {
  name: string;
  /** The media's height as a percentage of the frame's width: the aspect this
   *  platform actually cuts to. */
  pad: number;
  lines: number;
  /** TikTok is the one where the caption sits over the media rather than under
   *  it, which is the difference the format actually has. */
  overlay?: boolean;
  header?: boolean;
};

const CUTS: Cut[] = [
  { name: "Instagram", pad: 125, lines: 2, header: true },
  { name: "Facebook", pad: 56.25, lines: 3, header: true },
  { name: "LinkedIn", pad: 42.9, lines: 6, header: true },
  { name: "TikTok", pad: 177.8, lines: 2, overlay: true },
];

/** LinkedIn and TikTok are held in the icon set under their advertising names;
 *  the mark is the same. */
const MARK: Record<string, string> = {
  Instagram: "Instagram",
  Facebook: "Facebook",
  LinkedIn: "LinkedIn Ads",
  TikTok: "TikTok Ads",
};

function Caption({ lines, dim }: { lines: number; dim?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i}
          className={cn("block h-2 rounded-full", dim ? "bg-ink-3/70" : "bg-line")}
          style={{ width: `${[96, 88, 92, 78, 94, 62][i % 6]}%` }}
        />
      ))}
    </div>
  );
}

export function PlatformCut({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  leadMark,
  items,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  lead: string;
  leadMark: string;
  items: { stance: string; detail: string }[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const play = reduced || inView;
  const [cut, setCut] = useState(0);
  const [hot, setHot] = useState<number | null>(null);
  const c = CUTS[cut];

  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          className="mb-10"
          aside={
            <Rise key="lead">
              <p className="leading-relaxed text-fog sm:text-lg">
                <Marked text={lead} mark={leadMark} />
              </p>
            </Rise>
          }
        />

        {/* The same post, four ways. */}
        <Rise>
          <div className="grid gap-10 rounded-[1.5rem] border border-line bg-[color-mix(in_srgb,var(--color-brand)_3%,transparent)] p-6 sm:p-9 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center lg:gap-16">
            {/* The frame. Fixed, always: only its contents are re-cut. */}
            <div className="mx-auto flex w-full items-center justify-center">
              <div className="relative h-[512px] w-[280px] shrink-0 overflow-hidden rounded-[1.75rem] border border-line bg-ink-3">
                {/* Everything a platform shows around the post. */}
                <div className="absolute inset-0 flex flex-col p-4">
                  <div
                    className={cn(
                      "mb-4 flex items-center gap-3 transition-opacity duration-400",
                      c.header ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <span className="block h-8 w-8 shrink-0 rounded-full bg-brand/25" />
                    <span className="flex-1">
                      <span className="mb-1.5 block h-2 w-2/5 rounded-full bg-line" />
                      <span className="block h-1.5 w-1/4 rounded-full bg-line/70" />
                    </span>
                  </div>

                  {/* The asset. The one thing that is the same idea in all four,
                      and the only thing whose shape changes. */}
                  <div
                    className={cn(
                      "relative w-full shrink-0 overflow-hidden rounded-lg bg-[color-mix(in_srgb,var(--color-brand)_16%,transparent)]",
                      "transition-[padding] duration-500 ease-out motion-reduce:transition-none",
                    )}
                    style={{ paddingBottom: `${c.pad}%` }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="block h-9 w-9 rounded-full border-2 border-brand/70" />
                    </span>
                  </div>

                  <div
                    className={cn(
                      "mt-4 transition-opacity duration-400",
                      c.overlay ? "opacity-0" : "opacity-100",
                    )}
                  >
                    <Caption lines={c.lines} />
                  </div>

                  <div
                    className={cn(
                      "mt-auto flex gap-4 border-t border-line pt-3 transition-opacity duration-400",
                      c.overlay ? "opacity-0" : "opacity-100",
                    )}
                  >
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="block h-4 w-4 rounded-full border border-line" />
                    ))}
                  </div>
                </div>

                {/* The one format where the post is the whole screen and the
                    words sit on top of it. It covers the frame rather than
                    changing it. */}
                <div
                  aria-hidden={!c.overlay}
                  className={cn(
                    "absolute inset-0 bg-[color-mix(in_srgb,var(--color-brand)_18%,transparent)] transition-opacity duration-400",
                    c.overlay ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="block h-11 w-11 rounded-full border-2 border-ink-3/80" />
                  </span>
                  <div className="absolute inset-x-4 bottom-5 pr-12">
                    <Caption lines={c.lines} dim />
                  </div>
                  <div className="absolute bottom-5 right-3 flex flex-col gap-3">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="block h-6 w-6 rounded-full bg-ink-3/80" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Which cut. */}
            <div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {CUTS.map((k, i) => {
                  const on = cut === i;
                  return (
                    <li key={k.name}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onMouseEnter={() => setCut(i)}
                        onFocus={() => setCut(i)}
                        onClick={() => setCut(i)}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left outline-none transition-colors duration-400",
                          on
                            ? "border-brand bg-[color-mix(in_srgb,var(--color-brand)_9%,transparent)] text-brand"
                            : "border-line text-snow hover:border-brand/40 hover:text-brand",
                        )}
                      >
                        <ChannelIcon name={MARK[k.name]} size={22} />
                        <span className="font-display text-[0.95rem] font-extrabold uppercase leading-none">
                          {k.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Rise>

        <ol ref={ref} className="mt-12 grid gap-x-12 border-t border-line lg:grid-cols-2">
          {items.map((item, i) => {
            const on = hot === i;
            return (
              <motion.li
                key={item.stance}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={play ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i % 2) * 0.06 + Math.floor(i / 2) * 0.08, ease: EASE }}
                onMouseEnter={() => setHot(i)}
                onMouseLeave={() => setHot(null)}
                onFocus={() => setHot(i)}
                onBlur={() => setHot(null)}
                tabIndex={0}
                className="relative cursor-default border-b border-line py-7 pl-6 outline-none"
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-y-4 left-0 w-[2px] origin-center bg-brand transition-transform duration-500 ease-out",
                    on ? "scale-y-100" : "scale-y-0",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "font-display mb-3 block text-[0.6875rem] font-bold tabular-nums transition-colors duration-300",
                    on ? "text-brand" : "text-brand/35",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  className={cn(
                    "font-display text-[clamp(1rem,1.7vw,1.22rem)] font-extrabold uppercase leading-[1.16] transition-colors duration-300",
                    on ? "text-brand" : "text-snow",
                  )}
                >
                  {item.stance}
                </p>
                <p className="mt-3 leading-relaxed text-fog">{item.detail}</p>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

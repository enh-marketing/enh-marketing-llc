"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";
import { CapabilityGlyph, type GlyphVariant } from "@/components/service/CapabilityGlyph";

gsap.registerPlugin(ScrollTrigger);

export type SupportDuty = { text: string; glyph: GlyphVariant };

/** Everything the monthly scope can draw from, set as one block.
 *
 *  WHY NOT A LIST, AND WHY THE LAST FOUR ATTEMPTS WERE ONE. Nine short phrases
 *  invite nine rows, and every version of this section so far took the
 *  invitation: nine tiles, then nine numbered lines, then nine lines with a
 *  measured outline drawn round them. The ornament changed each time and the
 *  skeleton never did. One item per row, ranked top to bottom, is a list
 *  whatever is drawn behind it.
 *
 *  THE COPY IS NOT A RANKING. It says ongoing support "can include" these, and
 *  it ends by saying "the monthly scope will state which platforms, questions,
 *  competitors, and website changes are included". So this is a set to draw
 *  from, not a sequence to work through. Nothing here is first and nothing is
 *  last, and a numbered column asserts an order the document does not have.
 *
 *  SO IT IS ONE BLOCK. The nine run on across the full measure and wrap where
 *  they fall, three or so to a line, which makes the section a single mass of
 *  type rather than a stack of rows. Their lengths differ wildly, from
 *  "Reviewing crawler access" to "Reporting confirmed AI referral traffic where
 *  available", and in a column that ragged edge was noise; here it is what
 *  fills the line. The scope sentence closes the block from underneath, because
 *  it is a rule about the set rather than a tenth member of it.
 *
 *  Every duty is still separately addressable: each is an <li> with its own
 *  glyph and its own hover, so the set reads as nine things and not as one
 *  paragraph. */
export function SupportSet({
  items,
  lead,
  scope,
}: {
  items: SupportDuty[];
  lead: string;
  scope: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  /* The block assembles rather than appearing. Each duty rises a little behind
     the one before it, left to right and line by line, which is also the order
     it is read in. immediateRender: false so a trigger that never fires leaves
     everything in its natural, readable state. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
      const duties = gsap.utils.selector(el)("[data-duty]");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
      tl.from(duties, {
        opacity: 0,
        y: 16,
        duration: 0.55,
        stagger: 0.045,
        ease: "power2.out",
        immediateRender: false,
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
        gsap.set(duties, { clearProps: "all" });
      };
    });
    return () => mm.revert();
  }, [items.length]);

  return (
    <div ref={root}>
      <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-fog">{lead}</p>

      {/* One block, flowing. An earlier pass stretched each line to both edges
          with `justify-between`, and at this type size only two phrases fit a
          line, so the stretch read as two columns: a list again, in a wider
          coat. They run on instead, at a size that fits three to a line, and
          the block fills like set text. */}
      <ul className="mt-9 flex list-none flex-wrap gap-x-8 gap-y-5 p-0 sm:mt-11 sm:gap-x-10 sm:gap-y-6">
        {items.map((d) => (
          <li
            key={d.text}
            data-duty
            className="group flex max-w-full items-center gap-2.5 sm:gap-3"
          >
            <span
              aria-hidden
              className="h-[1.05rem] w-[1.05rem] shrink-0 text-ash transition-colors duration-500 group-hover:text-brand motion-reduce:transition-none sm:h-5 sm:w-5"
            >
              <CapabilityGlyph variant={d.glyph} />
            </span>
            <span
              className={cn(
                "font-display text-[0.9375rem] font-extrabold uppercase leading-[1.15] tracking-[0.005em] text-snow",
                "transition-colors duration-500 group-hover:text-brand-text motion-reduce:transition-none",
                "sm:text-[1.125rem] lg:text-[1.3125rem]",
              )}
            >
              {d.text}
            </span>
          </li>
        ))}

      </ul>

      {/* The scope is a rule about the set, not another member of it, so it
          closes the block from underneath. An earlier pass put it in the flow
          and it read as a tenth duty that had lost its nerve. */}
      <div className="mt-10 flex max-w-full items-start gap-3 border-t border-ash/30 pt-5 sm:mt-12">
        <span aria-hidden className="mt-[0.4rem] h-2 w-2 shrink-0 rounded-full bg-brand" />
        <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-fog">{scope}</p>
      </div>
    </div>
  );
}

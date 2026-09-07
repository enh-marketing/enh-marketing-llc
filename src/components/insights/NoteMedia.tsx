import { NotePlate } from "@/components/insights/NotePlate";
import { cn } from "@/lib/cn";
import type { Note } from "@/content/insights";

/** A note's picture, wherever one is shown.
 *
 *  ONE COMPONENT BECAUSE THERE IS ONE DECISION. Four places show a note's
 *  image — the lead slot, the register card, the related row and the article
 *  hero — and each has to answer the same question: is there a photograph, and
 *  if not, what goes in the frame? Deciding that in four files is how three of
 *  them end up rendering a broken <img> after a migration lands one image and
 *  not the others.
 *
 *  THE FRAME IS THE CALLER'S, THE CONTENT IS NOT. The caller owns the aspect
 *  ratio, the radius and the border, because those differ per slot. What is
 *  fixed is that the picture fills the frame with `object-cover` and that the
 *  hover crop lives on this element, so a plate and a photograph move
 *  identically under the pointer.
 *
 *  DIMENSIONS ARE WRITTEN OUT even though the image is absolutely positioned:
 *  a browser that has not laid out the parent yet uses them to decide the
 *  intrinsic ratio, and the site has no framework image component to do it —
 *  astro:assets cannot be reached from inside a React island (see AGENTS.md).
 *
 *  `sizes` IS DELIBERATE AND MEASURED against Container's 1320px cap: a
 *  register card is one of three columns inside it, a wide card two of three,
 *  and both are full width below the `sm` break. Without it a browser assumes
 *  100vw and fetches a 1320px file for a 400px box. */
export function NoteMedia({
  note,
  className,
  /** Layout hint for the srcset. Defaults to the register's standard card. */
  slot = "card",
  /** Above-the-fold pictures (the article hero, the lead note on a short page)
   *  must not be lazy: the lead image is frequently the LCP element. */
  eager = false,
  plateScale,
}: {
  note: Note;
  className?: string;
  slot?: "card" | "wide" | "hero" | "heroCapped" | "compact";
  eager?: boolean;
  plateScale?: "default" | "compact";
}) {
  const figure = note.thumb ?? note.hero;

  if (!figure) {
    return (
      <NotePlate
        topic={note.category}
        scale={plateScale ?? (slot === "compact" ? "compact" : "default")}
        className={cn("absolute inset-0", className)}
      />
    );
  }

  return (
    <img
      src={figure.src}
      /* The source's own alt text, or the empty string. NEVER the title: the
         title is printed next to the image in every one of these slots, and an
         alt that repeats it makes a screen reader read the headline twice.
         An empty alt on a decorative illustration is the correct answer, and
         it is the answer the model gives when the source published no alt. */
      alt={figure.alt}
      width={figure.w}
      height={figure.h}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      sizes={SIZES[slot]}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}

const SIZES: Record<NonNullable<Parameters<typeof NoteMedia>[0]["slot"]>, string> = {
  card: "(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw",
  wide: "(min-width: 1024px) 820px, (min-width: 640px) 90vw, 100vw",
  hero: "(min-width: 1024px) 1240px, 100vw",
  /* The article hero when the picture keeps its own aspect ratio and is capped
     at 27rem. Asking for 1240px there would fetch four times the pixels the
     box can show. */
  heroCapped: "(min-width: 480px) 432px, 100vw",
  compact: "(min-width: 640px) 160px, 96px",
};

"use client";

import { motion } from "motion/react";
import { NoteMedia } from "@/components/insights/NoteMedia";
import { ArrowRight } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { formatDate, hasBody, mediaAspect, readingTime, type Note } from "@/content/insights";

const EASE = [0.16, 1, 0.3, 1] as const;

/** THE CARD. One design, used everywhere a post is shown.
 *
 *  ONE CARD, AND EVERY NOTE GETS IT. There was a second, side-on weight that
 *  took two columns for one note in five. It is gone: the register is a single
 *  card repeated, and the page's hierarchy comes from the year rules that break
 *  the grid into bands and from the route in the masthead, not from making some
 *  cards louder than others. A uniform grid is also the only arrangement that
 *  stays right at any archive size — the side-on variant needed a landscape
 *  picture to avoid cropping, and every post in this archive has a square one.
 *
 *  THE FACE IS SEPARATE FROM THE WRAPPER, and that is what keeps the four
 *  places a post appears in sync. `NoteCardFace` is the card itself and carries
 *  no motion; `NoteCard` wraps it in the `motion.li` the register needs for
 *  filtering. The homepage teaser, the same teaser on all forty-one service and
 *  AI Hub pages, and the read-next set on an article all render the face
 *  directly — so a change to the card is a change in one file and shows up in
 *  every one of them, and none of them pays for layout animation it does not
 *  use.
 *
 *  WHAT IS ON A CARD, AND WHAT WAS TAKEN OFF. Topic, date, reading time,
 *  title, excerpt, and one action. No index numeral, no tag pills, no author
 *  avatar, no bookmark control: those were what made the first pass read as a
 *  dashboard. Reading time and excerpt are both conditional on the data
 *  existing, so an unmigrated note is a shorter card and not a card with two
 *  empty slots in it.
 *
 *  THE FRAME FOLLOWS THE PICTURE. Every migrated hero is a square title card
 *  with the headline written into it as artwork, so a fixed 4:3 frame cropped a
 *  fifth of it away, through the words. The card locks to the picture's own
 *  ratio and crops nothing; a note with no picture falls back to the drawn
 *  plate, which is drawn to fill whatever box it is given.
 *
 *  THE INTERACTION IS THE HOUSE VOCABULARY, unchanged: a one-pixel lift, the
 *  border going to brand at 45%, a rule wiping across the top edge, the picture
 *  scaling under its own frame, the title taking brand, and the arrow sliding
 *  through. Nothing here is a new gesture — the point of the card is that it
 *  behaves like every other surface on the site.
 *
 *  AN UNMIGRATED NOTE HAS NO INTERACTION AT ALL. No lift, no rule, no arrow,
 *  and the whole card is a <div> rather than an <a>: a hover state on something
 *  that cannot be clicked is a lie, and this site's rule is that a title with
 *  no page behind it is set as text.
 *
 *  THE ID IS THE ROUTE'S JUMP TARGET. Clicking a station in the masthead
 *  scrolls here, through Lenis, which is why it has to be on the outermost
 *  element rather than on the heading. */
/** The register's row: the card, plus the layout animation filtering needs. */
export function NoteCard({
  note,
  /** GSAP's entrance writes to `.nr-reveal` inside this card, so the card's own
   *  transform stays free for Motion's layout animation. Two libraries writing
   *  one transform is the classic way a filterable grid breaks. */
  className,
}: {
  note: Note;
  className?: string;
}) {
  return (
    <motion.li
      id={`note-${note.slug}`}
      layout="position"
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: EASE, layout: { duration: 0.5, ease: EASE } }}
      /* scroll-mt clears the fixed header when the route jumps to this card.
         The global scroll-padding-top handles hash navigation on load; Lenis's
         programmatic scrollTo does not read it. */
      className={cn("nr-card scroll-mt-28", className)}
    >
      <div className="nr-reveal h-full">
        <NoteCardFace note={note} />
      </div>
    </motion.li>
  );
}

/** The card itself. No motion, so it costs nothing in the static places. */
export function NoteCardFace({ note }: { note: Note }) {
  const live = hasBody(note);
  const minutes = readingTime(note);
  const ratio = mediaAspect(note);
  const Root = live ? "a" : "div";

  return (
    <Root
      {...(live ? { href: `/blog/${note.slug}` } : {})}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-2",
        "transition-[border-color,transform] duration-500 motion-reduce:transition-none",
        live && "hover:-translate-y-1 hover:border-brand/45 active:translate-y-0 active:duration-75",
      )}
    >
      {/* --------------------------------------------------- the picture */}
      <div
        className={cn("relative shrink-0 overflow-hidden bg-ink-3", !ratio && "aspect-[4/3]")}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <NoteMedia
          note={note}
          slot="card"
          className={cn(
            "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
            live && "group-hover:scale-[1.05]",
          )}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-2/55 via-transparent to-transparent"
        />
      </div>

      {/* --------------------------------------------------- the words */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* The hairline that separates the picture from the copy, and the
            brand rule that wipes across it on hover. */}
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
        {live && (
          <span
            aria-hidden
            className="absolute left-0 top-0 h-px w-0 bg-brand transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
          />
        )}

        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.6875rem]">
          <span className="font-semibold uppercase tracking-[0.1em] text-brand-text">
            {note.category}
          </span>
          <span aria-hidden className="h-px w-3.5 bg-line" />
          <time dateTime={note.date} className="text-fog">
            {formatDate(note.date)}
          </time>
          {minutes && (
            <>
              <span aria-hidden className="h-px w-3.5 bg-line" />
              <span className="text-ash">{minutes}</span>
            </>
          )}
        </p>

        {/* TEAM DIRECTION, 2026-09-08: no heading tag on a card title. It was
            an h4 (deliberately, so a card sat under its year band rather than
            beside it), and it is now a plain <p>. The card is one link, so the
            title still reaches assistive tech as part of that link's name; what
            it no longer does is put 90-odd article titles into the heading
            outline of the archive and 3 into the outline of every other page.
            Styling is unchanged: the size here is set by the classes, never by
            the tag. */}
        <p
          className={cn(
            "font-display mt-4 text-[1.075rem] font-extrabold leading-[1.14] text-snow sm:text-[1.15rem]",
            "transition-colors duration-500 motion-reduce:transition-none",
            live && "group-hover:text-brand",
          )}
        >
          {note.title}
        </p>

        {note.excerpt && (
          <p className="mt-3.5 line-clamp-3 text-sm leading-relaxed text-fog">{note.excerpt}</p>
        )}

        {/* The action sits at the base of the card whatever the copy above
            it runs to, so a row of cards ends on one line. */}
        {live && (
          <span className="mt-auto flex items-center gap-3 pt-7 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-snow">
            <span
              aria-hidden
              className="h-px w-6 bg-brand transition-all duration-500 group-hover:w-10"
            />
            Read
            <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden text-brand">
              <ArrowRight className="absolute h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4" />
              <ArrowRight className="absolute h-3 w-3 -translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
            </span>
          </span>
        )}
      </div>
    </Root>
  );
}

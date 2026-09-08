"use client";

import type { ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { Container } from "@/components/ui/Container";
import { NoteMedia } from "@/components/insights/NoteMedia";
import { cn } from "@/lib/cn";
import { InlineNodes } from "@/components/insights/ArticleBody";
import { formatDate, mediaRatio, readingTime, type Note } from "@/content/insights";

/** THE ARTICLE HEADER.
 *
 *  TYPE FIRST, PICTURE SECOND, which is the magazine order and the opposite of
 *  the blog one. A hero image above the headline pushes the title under the
 *  fold on a laptop and makes every article on the site open with a photograph
 *  of something rather than with what it is about. Here the reader meets the
 *  topic, the title, the standfirst and the byline in the first screen, and the
 *  picture arrives as they start to move.
 *
 *  NOT min-h-svh. The seventeen service heroes fill a viewport because their
 *  job is to sell before the reader scrolls. An article's job is to be read,
 *  and a full-height header on a page whose next element is prose is a wall
 *  between the reader and the thing they clicked.
 *
 *  THE <h1> HAS NO ENTRANCE ANIMATION. It is the largest text in the fold and
 *  the LCP element on every article, so it paints on the first frame. This is
 *  the same rule ServiceHero and TestimonialHero follow, and it is why only
 *  the standfirst and the byline are wrapped in `Rise`.
 *
 *  THE MEASURE IS ENFORCED ON THE HEADLINE TOO. A display-scale title running
 *  the full 1320px container is a line of 90-odd characters, which is
 *  unreadable at that size however good the type is. */
export function ArticleHero({
  note,
  breadcrumbs,
}: {
  note: Note;
  breadcrumbs?: ReactNode;
}) {
  const minutes = readingTime(note);

  /** THE FRAME FITS THE PICTURE; THE PICTURE IS NEVER CROPPED TO THE FRAME.
   *
   *  Every hero the live blog publishes is a square social title card with the
   *  article's headline set into it as artwork, 500px to 1254px on a side. A
   *  fixed 2:1 hero would scale one of those to the container's width and then
   *  throw away three fifths of its height — which on a title card means
   *  cutting the words in half — and a 500px file stretched across 1240px is
   *  soft on top of that.
   *
   *  So a picture narrower than 1.6:1 keeps its own aspect ratio and is capped
   *  in width: shown whole, at a size its pixels can actually carry, reading as
   *  the post's card rather than as a full-bleed photograph it is not. A
   *  genuinely panoramic image still gets the wide frame, and so does the drawn
   *  plate a note without a picture falls back to, because that is drawn to
   *  fill whatever it is given. */
  const ratio = mediaRatio(note) ?? 0;
  const capped = Boolean(note.hero) && ratio > 0 && ratio < 1.6;

  return (
    <header
      id="article-head"
      data-section="Article Header"
      className="relative isolate overflow-hidden pb-2 pt-28 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute left-[2%] top-[-6%] h-[38vw] w-[38vw] rounded-full bg-brand/15 blur-[150px]" />
        {/* Ruled ground, the same as the archive's masthead: an article is an
            entry in the record, so it stands on the same paper. */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "100% 2.25rem",
            maskImage: "radial-gradient(ellipse at 30% 20%, black, transparent 78%)",
          }}
        />
      </div>

      <Container>
        {breadcrumbs && <div className="mb-8">{breadcrumbs}</div>}

        <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
          <span className="font-semibold uppercase tracking-[0.1em] text-brand-text">
            {note.category}
          </span>
          <span aria-hidden className="h-px w-5 bg-line" />
          <time dateTime={note.date} className="text-fog">
            {formatDate(note.date)}
          </time>
          {minutes && (
            <>
              <span aria-hidden className="h-px w-5 bg-line" />
              <span className="text-fog">{minutes}</span>
            </>
          )}
        </p>

        <h1 className="font-display display-2xl max-w-[22ch] font-extrabold uppercase text-snow">
          {note.title}
        </h1>

        {note.excerpt && (
          <Rise delay={0.1} className="mt-8">
            <p className="max-w-[52ch] text-[1.15rem] leading-[1.55] text-fog sm:text-[1.3rem]">
              {note.excerpt}
            </p>
          </Rise>
        )}

        {/* The byline, and the last thing before the picture. Rendered only
            where the source names an author: an article template that always
            prints a byline invites one to be invented. */}
        {note.author && (
          <Rise delay={0.16} className="mt-9">
            {/* The rule is capped to the copy's measure, not the container's.
                Run full width it was a hairline across 1240px with a 44px
                monogram under one end of it, which reads as a page divider
                rather than as the top of a byline. */}
            <div className="flex max-w-[52ch] items-center gap-4 border-t border-line pt-6">
              {/* A monogram, which is the identity treatment this site already
                  uses for clients. Never a stock portrait. */}
              <span
                aria-hidden
                className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-ink-2 text-sm font-extrabold text-snow"
              >
                {note.author.name
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span className="min-w-0">
                <span className="font-display block text-sm font-extrabold uppercase leading-tight text-snow">
                  {note.author.name}
                </span>
                {note.author.role && (
                  <span className="mt-0.5 block text-[0.82rem] text-fog">{note.author.role}</span>
                )}
              </span>
            </div>
          </Rise>
        )}

        {/* The picture. Full container measure and a wide crop, so it reads as
            an opening spread rather than as a card at the top of a page. */}
        <Rise delay={0.22} className="mt-12">
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-line bg-ink-3",
              capped
                ? "w-full max-w-[27rem]"
                : "aspect-[16/9] sm:aspect-[2/1]",
            )}
            style={capped && note.hero ? { aspectRatio: `${note.hero.w} / ${note.hero.h}` } : undefined}
          >
            <NoteMedia note={note} slot={capped ? "heroCapped" : "hero"} eager />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/30 via-transparent to-transparent"
            />
          </div>
          {note.hero?.caption && (
            <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-ash">
              <InlineNodes nodes={note.hero.caption} />
            </p>
          )}
        </Rise>
      </Container>
    </header>
  );
}

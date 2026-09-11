"use client";

import { useRef } from "react";
import { brand } from "@/lib/content";
import {
  finalCta,
  formFields,
  outline,
  relatedTo,
  type Note,
} from "@/content/insights";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { ArticleHero } from "@/components/insights/ArticleHero";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ArticleAside } from "@/components/insights/ArticleAside";
import { RelatedNotes } from "@/components/insights/RelatedNotes";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/** One note.
 *
 *  THE LAYOUT IS PROSE LEFT, RAIL RIGHT. The measure is left-aligned, so a
 *  single vertical edge runs from the breadcrumbs at the top of the hero,
 *  through the headline and the byline, down the whole article. The contents
 *  rail and the share controls sit in the margin that leaves on the right,
 *  where a bleed figure, a table or a code block also widens into — which is
 *  the page's rhythm: narrow prose, wide evidence.
 *
 *  THE RAIL IS DESKTOP-ONLY AND CONDITIONAL. It renders from `lg` up, because
 *  a sticky sidebar on a phone sits over the thing the reader is reading, and
 *  its contents list appears only past three headings. On a phone the share
 *  controls travel to the foot of the article instead, where a reader who has
 *  finished is the one who wants them.
 *
 *  READING PROGRESS MEASURES THE ARTICLE, NOT THE DOCUMENT. The ref is on the
 *  article wrapper, so the bar completes as the last paragraph leaves the fold
 *  rather than at the bottom of the closing form. That is the whole reason it
 *  is passed down from here.
 *
 *  THE BREADCRUMB TRAIL STOPS AT INSIGHTS. `trailFor` walks the sitemap, which
 *  is the site's IA and contains no per-article nodes — nor should it, since
 *  the archive is content and not structure. So the trail reads Home ›
 *  Insights and the article's own title is the <h1> under it, which is what
 *  every article page on every publication does. */
export function InsightNotePage({
  note,
  /** Absolute canonical URL, composed on the server from `site`, so a shared
   *  link is the canonical one rather than whatever host served the page. */
  url,
}: {
  note: Note;
  url: string;
}) {
  const article = useRef<HTMLDivElement>(null);
  const toc = outline(note);
  const next = relatedTo(note, 3);
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <ReadingProgress target={article} />

      <main>
        <ArticleHero
          note={note}
          breadcrumbs={<Breadcrumbs key="crumbs" href="/blog" />}
        />

        <div ref={article} className="relative py-14 sm:py-16">
          <Container>
            {/* minmax(0,1fr), NOT 1fr, AND IT MATTERS AT EVERY WIDTH.
                A grid track defaults to `auto`, which resolves to max-content,
                so the article column grew to fit its widest child: the table's
                own `min-w-[34rem]` and the code block's unwrapped lines. At
                375px that pushed 267px of the page off the right edge — and
                because globals.css sets `overflow-x: clip` on the body there
                was no scrollbar to notice it, only silently cut-off content.
                The `min-w-0` on the article below is the same guard one level
                in, so the flex/grid chain cannot reintroduce it. */}
            <div className="grid grid-cols-[minmax(0,1fr)] gap-x-20 gap-y-14 lg:grid-cols-[minmax(0,1fr)_14rem]">
              {/* Order in the DOM is prose first, rail second, which is also
                  the order a screen reader and a crawler want: the article
                  before the navigation aid built out of it. The rail is placed
                  in the second column by the grid, not by source order. */}
              <article className="min-w-0">
                <ArticleBody body={note.body} />

                {/* The mobile end-of-article controls. The rail carries these
                    on desktop; here they arrive where a reader who has
                    finished will look for them. */}
                <div className="mt-14 border-t border-line pt-10 lg:hidden">
                  <ArticleAside outline={[]} url={url} title={note.title} />
                </div>
              </article>

              <aside className="hidden lg:block">
                <ArticleAside outline={toc} url={url} title={note.title} />
              </aside>
            </div>
          </Container>
        </div>

        <RelatedNotes notes={next} />

        <CtaBand
          label="Bring Us A Problem"
          index={finalCta.index}
          title={finalCta.title}
          strokeTitle={finalCta.strokeTitle}
          body={finalCta.body}
          note={finalCta.note}
          formFields={formFields}
          formSubmitLabel={finalCta.submitLabel}
          whatsapp={whatsapp}
          whatsappLabel={finalCta.whatsappLabel}
        />
      </main>

      <StickyCTABar label={finalCta.submitLabel} />
    </>
  );
}

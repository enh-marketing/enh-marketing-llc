"use client";

import { brand } from "@/lib/content";
import { all, finalCta, formFields, type Note } from "@/content/insights";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { InsightsMasthead } from "@/components/insights/InsightsMasthead";
import { NoteRegister } from "@/components/insights/NoteRegister";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/blog";

/** Insights — the archive.
 *
 *  THREE CHAPTERS. The masthead, which says what the archive is and draws it
 *  as a route the reader can pick from; the register, grouped by year and
 *  filterable by topic; the ask. Nothing between them is a banner.
 *
 *  THERE IS NO FEATURED SLOT. A lead note sat between the masthead and the
 *  register, giving the newest post a composition of its own. It is gone, and
 *  with it the second card weight inside the register: every note is presented
 *  identically and the page's hierarchy is carried by the route, the year rules
 *  and the topic rail instead of by promoting one post over another.
 *
 *  THE ARCHIVE IS THE WHOLE ARCHIVE. `all()` is every migrated post, newest
 *  first, and the register renders all of them under year rules rather than
 *  paginating: each article stays one click from /insights, which is what a
 *  crawler wants, and the topic rail and the search field are what cut the set
 *  down for a reader. The pictures are lazy, so the length costs load time
 *  rather than first paint.
 *
 *  `hasBody` still gates every link, so a note added without an article behind
 *  it would be set as text rather than promising a page that does not exist. */
export function InsightsPage() {
  const archive: Note[] = all();

  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <InsightsMasthead
          notes={archive}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
        />

        <NoteRegister notes={archive} />

        {/* The same closing block every other page on the site ends on, so the
            transition out of the archive is the site's own and not a banner
            invented for the blog. */}
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

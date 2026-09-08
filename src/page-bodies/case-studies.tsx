"use client";

import { useState } from "react";
import { brand } from "@/lib/content";
import { all, finalCta, formFields, lead } from "@/content/case-studies";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CaseMasthead } from "@/components/case-studies/CaseMasthead";
import { LeadCase } from "@/components/case-studies/LeadCase";
import { CaseArchive } from "@/components/case-studies/CaseArchive";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/case-studies";

/** Case studies — the index.
 *
 *  FOUR CHAPTERS. The masthead, which says what the archive is and tallies who
 *  it was for; the cover story, which is whichever study the agency's own
 *  index puts first; the archive itself, as a mosaic broken once by a
 *  statement about the whole set; and the ask. Nothing between them is a
 *  banner.
 *
 *  ONE PIECE OF STATE, TWO CONTROLS. The sector lives here because two things
 *  set it: the tally in the masthead, where a reader picks the industry they
 *  recognise, and the rail in the archive, where a reader who has scrolled
 *  past the fold changes their mind. They are the same control in two places,
 *  which is why neither owns it.
 *
 *  THE COVER STUDY IS ALSO IN THE ARCHIVE. It is presented above and listed
 *  below, the way a cover story is also in the contents, so the count on the
 *  rail is the truth ("22") rather than the truth minus the one we promoted.
 *
 *  `hasStory` gates every link, so a study added without its sections would be
 *  set as text rather than promising a page that does not exist. */
export function CaseStudiesPage() {
  const studies = all();
  const cover = lead();
  const [sector, setSector] = useState<string | null>(null);

  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <CaseMasthead
          studies={studies}
          activeSector={sector}
          onSelectSector={setSector}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          phoneHref={brand.phoneHref}
          formTitle="Tell us what you are trying to move"
        />

        {cover && <LeadCase study={cover} />}

        <CaseArchive studies={studies} active={sector} onSelect={setSector} />

        {/* The same closing block every other page on the site ends on, so the
            transition out of the archive is the site's own and not a banner
            invented for this page. */}
        <CtaBand
          label="Bring Us The Next One"
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

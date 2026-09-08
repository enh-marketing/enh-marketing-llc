"use client";

import { useState } from "react";
import { brand } from "@/lib/content";
import { all, finalCta, formFields } from "@/content/case-studies";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CaseMasthead } from "@/components/case-studies/CaseMasthead";
import { CaseArchive } from "@/components/case-studies/CaseArchive";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/case-studies";

/** Case studies — the index.
 *
 *  THREE CHAPTERS. The masthead, which says what the archive is and tallies
 *  who it was for; the archive itself, as a mosaic broken once by a statement
 *  about the whole set; and the ask. Nothing between them is a banner.
 *
 *  TEAM DIRECTION, 2026-09-08: there is no cover story. A fourth chapter used
 *  to sit between the masthead and the archive, promoting whichever study the
 *  agency's own index puts first, and it was removed. The reader now meets all
 *  twenty-two at once, which is what the rail's count already promised.
 *
 *  ONE PIECE OF STATE, TWO CONTROLS. The sector lives here because two things
 *  set it: the tally in the masthead, where a reader picks the industry they
 *  recognise, and the rail in the archive, where a reader who has scrolled
 *  past the fold changes their mind. They are the same control in two places,
 *  which is why neither owns it.
 *
 *
 *  `hasStory` gates every link, so a study added without its sections would be
 *  set as text rather than promising a page that does not exist. */
export function CaseStudiesPage() {
  const studies = all();
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

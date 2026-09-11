"use client";

import { useState } from "react";
import { brand } from "@/lib/content";
import { all, finalCta, formFields, type Category } from "@/content/portfolio";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PortfolioMasthead } from "@/components/portfolio/PortfolioMasthead";
import { PortfolioArchive } from "@/components/portfolio/PortfolioArchive";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/portfolio";

/** Portfolio — the index.
 *
 *  THREE CHAPTERS, THE SAME THREE THE CASE STUDIES INDEX HAS. The masthead,
 *  which says what the archive is and tallies what kind of work is in it; the
 *  archive itself, as a wall of one card; and the ask. Nothing between them is
 *  a banner, and there is no cover story — that treatment was removed from the
 *  case studies index by direction and is not being reintroduced here.
 *
 *  ONE PIECE OF STATE, TWO CONTROLS. The discipline lives here because two
 *  things set it: the tally in the masthead, where a reader picks the kind of
 *  work they came for, and the rail in the archive, where a reader who has
 *  scrolled past the fold changes their mind. They are the same control in two
 *  places, which is why neither owns it.
 *
 *  EVERY PROJECT HAS A PAGE. The archive and `getStaticPaths` are built from
 *  the same `all()`, so unlike the case studies there is no published/unpublished
 *  gate: a project cannot be a card here and a 404 in the router. */
export function PortfolioPage() {
  const projects = all();
  const [category, setCategory] = useState<Category | null>(null);

  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <PortfolioMasthead
          projects={projects}
          activeCategory={category}
          onSelectCategory={setCategory}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          phoneHref={brand.phoneHref}
          formTitle="Tell us what you want made"
        />

        <PortfolioArchive projects={projects} active={category} onSelect={setCategory} />

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

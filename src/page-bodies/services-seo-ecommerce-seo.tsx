"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/ecommerce-seo";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { CatalogueReach } from "@/components/service/CatalogueReach";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { PlatformDeck } from "@/components/service/PlatformDeck";
import { SearchToStore } from "@/components/service/SearchToStore";
import { CatalogueGrid } from "@/components/service/CatalogueGrid";
import { CapabilityCarousel } from "@/components/service/CapabilityCarousel";
import { FaqList } from "@/components/service/FaqList";
import { GrowthCta } from "@/components/service/GrowthCta";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/seo/ecommerce-seo";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function EcommerceSeoPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <ServiceHero
          id="hero"
          label="Hero"
          lines={c.hero.lines}
          sub={c.hero.sub}
          primary={c.hero.primary}
          secondary={c.hero.secondary}
          phoneHref={brand.phoneHref}
          breadcrumbs={<Breadcrumbs key="crumbs" href={HREF} />}
          footer={<TrustStrip key="trust" id="trust" compact />}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          visual={<CatalogueReach key="cat" />}
        />

        {/* The opening argument, in the document's own order: the scene, then
            the sentence that turns it into a claim, then what we do about it.
            The verdict sits in the decoded block rather than after it because
            "Traffic alone does not solve this" is the line the section exists
            to land, and the prioritisation sentence closes at display scale. */}
        <Narrative
          id="story"
          label="Make More of Your Product Catalogue Searchable"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.verdict}
          highlight={c.narrative.highlight}
          outro={[c.narrative.agency]}
          closing={c.narrative.closing}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#quote"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep"
            >
              {c.narrative.primary}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand"
            >
              {c.narrative.secondary}
            </a>
          </Rise>
        </Narrative>

        {/* Eight areas of work, each pinned to the part of the store it acts
            on. The drawing is the store itself; see StoreArchitecture for why
            this page does not reuse the shelf. */}
        <PinnedExplorer
          id="areas"
          label="What Our Ecommerce SEO Services Cover"
          index="02"
          title={c.areas.title}
          strokeTitle={c.areas.strokeTitle}
          items={c.areas.items.map((a) => ({
            no: a.no,
            title: a.title,
            body: a.body,
            glyph: a.glyph,
          }))}
          diagramSide="left"
          mark={{ variant: "network", label: "Eight areas of work on one store" }}
          diagram={{ kind: "storearch" }}
        >
          {/* The document names its sources by title and gives no addresses,
              so they are printed as written rather than invented as links. */}
          <Rise delay={0.1} className="mt-10 border-t border-line pt-6">
            <p className="text-sm leading-relaxed text-ash">{c.areas.sources}</p>
          </Rise>
        </PinnedExplorer>

        {/* Five platforms, five different technical footings, rebuilt on one
            stage as the reader moves between them. See PlatformDeck. */}
        <section
          id="platforms"
          data-section="Ecommerce Platforms We Work With"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.platforms.title}
              strokeTitle={c.platforms.strokeTitle}
              mark={{ variant: "contrast", label: "No two stores start from the same place" }}
              className="mb-12"
            />
            <PlatformDeck items={c.platforms.items} />
          </Container>
        </section>

        {/* Reporting. The lead asks for search performance and store
            performance to be connected, so the section is those two sides and
            the join between them. See SearchToStore. */}
        <section
          id="measure"
          data-section="What We Measure"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.measure.title}
              strokeTitle={c.measure.strokeTitle}
              className="mb-12"
            />
            <SearchToStore
              lead={c.measure.lead}
              trackedSearch={c.measure.trackedSearch}
              trackedStore={c.measure.trackedStore}
              brandSplit={c.measure.brandSplit}
              brandTerms={c.measure.brandTerms}
              limit={c.measure.limit}
            />
          </Container>
        </section>

        {/* Ten businesses, set inside the object this whole page is about: a
            category listing, with the product each one sells drawn on it. See
            CatalogueGrid. */}
        <CatalogueGrid
          id="sectors"
          label="Ecommerce Businesses We Work With"
          index="05"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          items={c.sectors.items}
          note={c.sectors.caveat}
        />

        {/* The commitments, on the run the site uses for capability sets. */}
        <CapabilityCarousel
          id="promises"
          label="What You Get From ENH Marketing"
          index="06"
          title={c.promises.title}
          strokeTitle={c.promises.strokeTitle}
          items={c.promises.items}
        />

        {/* The mid-page ask. It takes the heading and the short line; the band
            at the foot of the page takes the longer recommendation, so no
            sentence prints twice. */}
        <GrowthCta
          id="cta"
          label="Give More Products a Clear Route Into Search"
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="07" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="08" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What the Store Sells"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="10" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

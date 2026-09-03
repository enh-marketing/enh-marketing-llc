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
import { PlatformStack } from "@/components/service/PlatformStack";
import { SignalSplit } from "@/components/service/SignalSplit";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
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

        {/* Five platforms, five different technical situations. */}
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
            <PlatformStack items={c.platforms.items} />
          </Container>
        </section>

        {/* Reporting. The document gives no figures anywhere, so this section
            draws a distinction rather than a trend. See SignalSplit. */}
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
            <SignalSplit
              lead={c.measure.lead}
              tracked={c.measure.tracked}
              brandSplit={c.measure.brandSplit}
              brandTerms={c.measure.brandTerms}
              limit={c.measure.limit}
            />
          </Container>
        </section>

        <IndustryRun
          id="sectors"
          label="Ecommerce Businesses We Work With"
          index="05"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          note={c.sectors.caveat}
          items={c.sectors.items.map((label) => ({ label }))}
        />

        {/* Eight promises as a ruled index rather than another card grid: the
            two sibling pages built this week both close on cards, and three of
            those in a row stops reading as structure. */}
        <section
          id="promises"
          data-section="What You Get From ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
              title={c.promises.title}
              strokeTitle={c.promises.strokeTitle}
              className="mb-12"
            />

            <ol className="grid border-t border-line sm:grid-cols-2">
              {c.promises.items.map((p, i) => (
                <li key={p.title} className="border-b border-line">
                  <Rise
                    delay={0.05 * i}
                    className={`flex gap-5 py-7 sm:pr-10 ${i % 2 === 1 ? "sm:border-l sm:border-line sm:pl-10" : ""}`}
                  >
                    <span
                      aria-hidden
                      className="font-display shrink-0 text-sm font-extrabold text-brand"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block">
                      <span className="font-display block text-[1.05rem] font-extrabold uppercase leading-[1.2] text-snow">
                        {p.title}
                      </span>
                      <span className="mt-2.5 block text-sm leading-relaxed text-fog">
                        {p.body}
                      </span>
                    </span>
                  </Rise>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <Work index="07" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="08" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What the Store Sells"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
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

"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/facebook-marketing";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crosslink } from "@/components/ui/Crosslink";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PageDrift } from "@/components/service/PageDrift";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { DeliveryField } from "@/components/service/DeliveryField";
import { TwoLedgers } from "@/components/service/TwoLedgers";
import { PageStack } from "@/components/service/PageStack";
import { CapabilityCarousel } from "@/components/service/CapabilityCarousel";
import { FaqList } from "@/components/service/FaqList";
import { GrowthCta } from "@/components/service/GrowthCta";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/social-media-marketing/facebook-marketing";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function FacebookMarketingPage() {
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
          visual={<PageDrift key="drift" />}
        />

        {/* The drift, then the one-sentence paragraph that makes it matter, then
            the service. The document's order exactly. */}
        <Narrative
          id="story"
          label="Keep Your Facebook Page Useful Between Campaigns"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.pivot}
          highlight={c.narrative.pivotEmphasis}
          outro={[c.narrative.agency, c.narrative.scope]}
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

        {/* Seven areas of the management scope. The document's bracketed link
            to the content-creation page is rendered once beneath, as a real
            link, rather than flattened into the third item's body. */}
        <PinnedExplorer
          id="services"
          label="What Our Facebook Marketing Services in Dubai Cover"
          index="02"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({
            no: s.no,
            title: s.title,
            body: s.body,
            glyph: s.glyph,
          }))}
          diagramSide="right"
          mark={{ variant: "ecosystem", label: "Seven parts of one monthly scope" }}
          diagram={{ kind: "setup" }}
        >
          <Rise delay={0.1} className="mt-10 border-t border-line pt-6">
            <p className="flex flex-wrap items-baseline gap-x-1.5 leading-relaxed text-fog">
              <span>{c.services.referenceLead}</span>
              <Crosslink href={c.services.referenceHref}>
                {c.services.referenceLabel}
              </Crosslink>
              <span>{c.services.referenceTail}</span>
            </p>
          </Rise>
        </PinnedExplorer>

        {/* THE PAGE'S FIRST ARGUMENT. One field of people, three states: who
            organic reaches, who paid is aimed at, and what comes back. See
            DeliveryField. */}
        <section
          id="advertising"
          data-section="When Facebook Advertising Is Included"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.advertising.title}
              strokeTitle={c.advertising.strokeTitle}
              mark={{ variant: "contrast", label: "Organic reach and paid delivery are not the same thing" }}
              className="mb-12"
            />
            <DeliveryField
              organic={c.advertising.contrastOrganic}
              paid={c.advertising.contrastPaid}
              scope={c.advertising.scope}
              objectivesLead={c.advertising.objectivesLead}
              objectives={c.advertising.objectives}
              objectivesRule={c.advertising.objectivesRule}
              objectivesWarning={c.advertising.objectivesWarning}
              objectivesWarningMark={c.advertising.objectivesWarningMark}
              tracking={c.advertising.tracking}
              trackingCaveat={c.advertising.trackingCaveat}
              referenceLead={c.advertising.referenceLead}
              referenceLabel={c.advertising.referenceLabel}
              referenceHref={c.advertising.referenceHref}
              referenceTail={c.advertising.referenceTail}
            />
          </Container>
        </section>

        {/* THE SECOND ARGUMENT. Two instruments with different faces, and the
            gap between them that nothing is carried across. See TwoLedgers. */}
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
            <TwoLedgers
              claim={c.measure.claim}
              organic={c.measure.organic}
              organicTerm={c.measure.organicTerm}
              paid={c.measure.paid}
              paidTerm={c.measure.paidTerm}
              agreement={c.measure.agreement}
              caseUseful={c.measure.caseUseful}
              caseInsufficient={c.measure.caseInsufficient}
            />
          </Container>
        </section>

        {/* Ten businesses as the thing this service manages: ten Pages
            standing closed, one open. Giving attention to one takes it from the
            other nine, which is what this platform is. See PageStack. */}
        <PageStack
          id="sectors"
          label="Businesses We Manage Facebook For"
          index="05"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          items={c.sectors.items}
          caveatLead={c.sectors.caveatLead}
          caveatGate={c.sectors.caveatGate}
          caveatGateMark={c.sectors.caveatGateMark}
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
          label="Give the Page a Clear Role"
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
          label="Tell Us How the Page Is Run Today"
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

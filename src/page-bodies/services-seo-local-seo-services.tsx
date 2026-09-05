"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/local-seo-services";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { MissedCall } from "@/components/service/MissedCall";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { SetupSwitch } from "@/components/service/SetupSwitch";
import { ProofGap } from "@/components/service/ProofGap";
import { SpokenQuery } from "@/components/service/SpokenQuery";
import { SectorMap } from "@/components/service/SectorMap";
import { BoundaryBand } from "@/components/service/BoundaryBand";
import { PromiseGrid } from "@/components/service/PromiseGrid";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/seo/local-seo-services";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function LocalSeoServicesPage() {
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
          visual={<MissedCall key="missed" />}
        />

        {/* Three incomplete results, then the one-line paragraph that makes it
            matter, then the service and its refusal to promise a ranking. */}
        <Narrative
          id="story"
          label="Be Easier to Find When Nearby Customers Are Ready to Act"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.pivot}
          highlight={c.narrative.pivotEmphasis}
          outro={[c.narrative.agency]}
          closing={c.narrative.goal}
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

        <PinnedExplorer
          id="services"
          label="What Our Local SEO Services Cover"
          index="02"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({
            no: s.no,
            title: s.title,
            body: s.body,
            glyph: s.glyph,
          }))}
          diagramSide="left"
          mark={{ variant: "network", label: "Profile, website and listings kept in agreement" }}
          diagram={{ kind: "setup" }}
        />

        {/* THE PAGE'S ARGUMENT: eligibility. Three setups, one of which is
            the reader's, and the reader is the one who says which. See
            SetupSwitch. */}
        <SetupSwitch
          id="setup"
          label="The Right Setup Depends on How Your Business Operates"
          index="03"
          title={c.setup.title}
          strokeTitle={c.setup.strokeTitle}
          lead={c.setup.lead}
          models={c.setup.models}
          warningClaim={c.setup.warningClaim}
          warningRisk={c.setup.warningRisk}
          riskMark={c.setup.riskMark}
        />

        {/* Two banks of signals, and then the two inferences the document
            refuses to make from them. See ProofGap. */}
        <ProofGap
          id="measure"
          label="What We Measure"
          index="04"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          claim={c.measure.claim}
          profileLead={c.measure.profileLead}
          profile={c.measure.profile}
          analyticsLead={c.measure.analyticsLead}
          analytics={c.measure.analytics}
          breaks={c.measure.breaks}
          therefore={c.measure.therefore}
          reporting={c.measure.reporting}
        />

        {/* A local search said out loud, and the limit on what can be promised
            about where it is answered. See SpokenQuery. */}
        <SpokenQuery
          id="discovery"
          label="Where Voice and AI Search Fit"
          index="05"
          title={c.discovery.title}
          strokeTitle={c.discovery.strokeTitle}
          askLead={c.discovery.askLead}
          asks={c.discovery.asks}
          answerLead={c.discovery.answerLead}
          answerTail={c.discovery.answerTail}
          limit={c.discovery.limit}
          referenceLead={c.discovery.referenceLead}
          referenceLabel={c.discovery.referenceLabel}
          referenceHref={c.discovery.referenceHref}
          referenceTail={c.discovery.referenceTail}
        />

        {/* Ten businesses set inside a search radius, because a place is the
            only thing this service is about. See SectorMap. */}
        <SectorMap
          id="sectors"
          label="Businesses That Benefit From Local SEO"
          index="06"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          items={c.sectors.items}
        />

        {/* The same radius, seen from its edge: where local SEO is the wrong
            purchase, and the way out this document gives itself. */}
        <BoundaryBand
          id="boundary"
          label="When Local SEO Is Not the Right Scope"
          claim={c.sectors.boundaryClaim}
          lead={c.sectors.boundaryLead}
          linkLabel={c.sectors.boundaryLabel}
          linkHref={c.sectors.boundaryHref}
          tail={c.sectors.boundaryTail}
        />

        {/* Seven commitments, four of which are refusals. See PromiseGrid. */}
        <PromiseGrid
          id="promises"
          label="What You Get From ENH Marketing"
          index="07"
          title={c.promises.title}
          strokeTitle={c.promises.strokeTitle}
          items={c.promises.items}
          tail={c.promises.tail}
        />

        {/* The house mid-page CTA, in the position every other service page
            puts it: after the promises, before the work. It carries the closing
            heading and the "tell us" line, while the CtaBand at the foot takes
            the heading and the longer recommendation, so no sentence prints
            twice. */}
        <GrowthCta
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="08" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Where the Business Operates"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="11" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

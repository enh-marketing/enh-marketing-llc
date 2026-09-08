"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/data-and-dashboards";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { OneView } from "@/components/service/OneView";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { DashboardAssembly } from "@/components/service/DashboardAssembly";
import { DashboardMark } from "@/components/service/DashboardMark";
import { ReturnWindow } from "@/components/service/ReturnWindow";
import { ScopeScale } from "@/components/service/ScopeScale";
import { DataPipeline } from "@/components/service/DataPipeline";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/* Drives <Breadcrumbs href={HREF} />. A subpage of the AI Hub, so the trail
   reads Home > AI Hub > Data & Dashboards. See sitemap.ts. */
const HREF = "/ai-hub/data-and-dashboards";
const FORM_TITLE = c.hero.primary;

export function DataAndDashboardsPage() {
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
          visual={<OneView key="one-view" sources={c.hero.sources} viewLabel={c.hero.viewLabel} />}
        />

        <Narrative
          id="what"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.question}
          questionEmphasis={c.narrative.questionEmphasis}
          body={c.narrative.body}
          highlight={c.narrative.highlight}
          outro={c.narrative.outro}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#quote" className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-deep">
              {c.narrative.primary}
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-snow transition-colors duration-300 hover:border-brand hover:text-brand">
              {c.narrative.secondary}
            </a>
          </Rise>
        </Narrative>

        {/* Six services on the site's own explorer pattern: one named selector,
            one drawing, one panel. The drawing is a single dashboard shell whose
            modules are rebuilt per service, because five of the six are views of
            one system; the sixth is not a view at all, so its mark sits under
            the shell and selecting it lifts the shell off the plumbing. See
            DashboardViews. */}
        <PinnedExplorer
          id="services"
          label="Our Data and Dashboard Services"
          index="01"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          markNode={<DashboardMark variant="gallery" />}
          items={c.services.items}
          diagram={{ kind: "dashboards", roles: c.services.roles, beforeLabel: c.services.beforeLabel }}
          diagramSide="right"
        />

        {/* Seven elements, drawn as the dashboard they add up to and built one
            at a time as the reader arrives. Pointing at any one strips the rest
            back to a hairline. See DashboardAssembly. */}
        <section id="elements" data-section="The Main Elements of a Reporting Dashboard" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader index="02" title={c.elements.title} strokeTitle={c.elements.strokeTitle} markNode={<DashboardMark variant="anatomy" />} className="mb-12" />
            <DashboardAssembly items={c.elements.items} />
          </Container>
        </section>

        {/* Two windows, out of register, closing onto one another: the
            section's own first sentence is the condition, not the columns.
            See ReturnWindow. */}
        <section id="roi" data-section="How We Track Marketing ROI" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader index="03" title={c.roi.title} strokeTitle={c.roi.strokeTitle} markNode={<DashboardMark variant="ledger" />} className="mb-12" />
            <ReturnWindow
              lead={c.roi.lead}
              body={c.roi.body}
              costs={c.roi.costs}
              values={c.roi.values}
              periodLabel={c.roi.periodLabel}
              reportsLabel={c.roi.reportsLabel}
              models={c.roi.models}
            />
          </Container>
        </section>

        {/* Small to large, and the eight things the diagnostic settles. See ScopeScale. */}
        <section id="scope" data-section="Customised to Your Reporting Needs" className="relative overflow-x-clip py-14 sm:py-16">
          <Container className="relative">
            <SectionHeader index="04" title={c.scope.title} strokeTitle={c.scope.strokeTitle} markNode={<DashboardMark variant="scale" />} className="mb-12" />
            <ScopeScale
              lead={c.scope.lead}
              example={c.scope.example}
              small={c.scope.small}
              large={c.scope.large}
              diagnosticLead={c.scope.diagnosticLead}
              items={c.scope.items}
              proposal={c.scope.proposal}
            />
          </Container>
        </section>

        {/* One continuous line of plumbing, seven stations long, pinned while
            it travels. The line is absent at the first station, holed at the
            second, and dashed past the launch mark because the last step does
            not finish. overflow-hidden and the track outside the Container, for
            the same reasons ChannelScroller gives. See DataPipeline. */}
        <section id="process" data-section="How the Dashboard Project Works" className="relative overflow-hidden py-16 sm:py-20">
          <Container className="relative mb-14">
            <SectionHeader index="05" title={c.process.title} strokeTitle={c.process.strokeTitle} markNode={<DashboardMark variant="stack" />} />
          </Container>
          <DataPipeline items={c.process.items} launchLabel={c.process.launchLabel} />
        </section>

        {/* The document places its CTA here, after step 7. */}
        <GrowthCta heading={c.growthCta.heading} support={c.growthCta.support} button={c.growthCta.button} formTitle={FORM_TITLE} formFields={c.formFields} formSubmitLabel={c.hero.primary} />

        {/* GATE. "Dashboards We Have Built" is an instruction in the source
            ("[Add approved dashboard examples here.]"), not content. Nothing is
            rendered for it and nothing is invented. */}

        <Work index="06" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="07" faqs={c.faqs} />

        <CtaBand
          label="Book a Data Diagnostic"
          index="08"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.hero.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.hero.secondary}
        />

        <Insights index="09" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

import type { Metadata } from "next";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/influencer-marketing";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard, CardTitle } from "@/components/ui/SurfaceCard";
import { Chars, Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { Narrative } from "@/components/service/Narrative";
import { CreatorVetting } from "@/components/service/CreatorVetting";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { TierScale } from "@/components/service/TierScale";
import { ContentLifespan } from "@/components/service/ContentLifespan";
import { AttributionPaths } from "@/components/service/AttributionPaths";
import { StageTimeline } from "@/components/service/StageTimeline";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/social-media-marketing/influencer-marketing";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: HREF },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    type: "website",
    locale: "en_AE",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Influencer Marketing",
  serviceType: "Influencer campaign management, creator selection and compliance",
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  provider: {
    "@type": "Organization",
    name: brand.legal,
    url: "https://enhmedia.com",
    telephone: brand.phone,
    address: { "@type": "PostalAddress", streetAddress: brand.address, addressCountry: "AE" },
  },
  isPartOf: {
    "@type": "Service",
    name: "Social Media Marketing",
    url: "https://enhmedia.com/services/social-media-marketing",
  },
};

export default function InfluencerMarketingPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

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
          formSubmitLabel="Request a Quote"
          visual={<CreatorVetting key="vetting" />}
        />

        {/* The scene, then who is speaking, decoded. The turn the document
            makes — "that's why we look closely at who is actually watching" —
            lands after the decode has resolved, where it reads as a conclusion
            rather than as part of the problem. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.scenario}
          questionEmphasis={c.narrative.scenarioEmphasis}
          body={c.narrative.body}
          highlight={["selection", "contracts", "reviews", "permit", "reporting"]}
          outro={[c.narrative.turn]}
        />

        <PinnedExplorer
          id="what-we-handle"
          label="What We Handle"
          index="01"
          title={c.handled.title}
          strokeTitle={c.handled.strokeTitle}
          items={c.handled.items}
          tone="ink-2"
          diagramSide="right"
          aside={
            <Rise key="lede">
              <p className="leading-relaxed text-fog sm:text-lg">{c.handled.lede}</p>
              <p className="mt-5 leading-relaxed text-fog">{c.handled.body}</p>
            </Rise>
          }
          diagram={{ kind: "board" }}
        />

        {/* The shortlist. The document leads with a hypothetical built on a
            number it supplies itself, so the number gets display scale and the
            four checks follow as cards — four parallel criteria being exactly
            what a card grid is for. */}
        <section
          id="shortlist"
          data-section="How We Make a Shortlist"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.shortlist.title}
              strokeTitle={c.shortlist.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="lede">
                  <p className="font-display text-[clamp(1.2rem,2.2vw,1.75rem)] font-extrabold uppercase leading-[1.16] tracking-tight text-snow">
                    {c.shortlist.lede}
                  </p>
                </Rise>
              }
            />

            {/* The document's own hypothetical, with its own figure. */}
            <Rise className="border-y border-line py-10">
              <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
                <p
                  aria-hidden
                  className="font-display text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-none tracking-tight text-stroke"
                >
                  {c.shortlist.exampleFigure}
                </p>
                <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">
                  {c.shortlist.example}
                </p>
              </div>
            </Rise>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.shortlist.items.map((item, i) => (
                <li key={item.no}>
                  <SurfaceCard
                    index={item.no}
                    glyph={item.glyph}
                    delay={(i % 4) * 0.06}
                    padding="tight"
                  >
                    <CardTitle className="text-base sm:text-lg">{item.title}</CardTitle>
                    <p className="mt-3 text-sm leading-relaxed text-fog">{item.body}</p>
                  </SurfaceCard>
                </li>
              ))}
            </ol>

            <Rise delay={0.12} className="mt-10">
              <p className="max-w-3xl border-l-2 border-brand/40 pl-6 leading-relaxed text-fog sm:pl-7 sm:text-lg">
                {c.shortlist.closing}
              </p>
            </Rise>
          </Container>
        </section>

        <TierScale
          id="tiers"
          label="Match the Influencer to the Job"
          index="03"
          title={c.tiers.title}
          strokeTitle={c.tiers.strokeTitle}
          columns={c.tiers.columns}
          rows={c.tiers.rows}
          closing={c.tiers.closing}
        />

        <ContentLifespan
          id="usage"
          label="How We Give Every Post a Longer Life"
          index="04"
          title={c.usage.title}
          strokeTitle={c.usage.strokeTitle}
          problemLead={c.usage.problemLead}
          problem={c.usage.problem}
          originalOnly={c.usage.originalOnly}
          remedy={c.usage.remedy}
          destinationsLead={c.usage.destinationsLead}
          destinations={c.usage.destinations}
          termsLead={c.usage.termsLead}
          terms={c.usage.terms}
          closing={c.usage.closing}
        />

        {/* Process. Reuses the Performance Marketing timeline, whose axis and
            mark are already parameterised — the ends here are the document's
            own first and last stage, not an invented duration. */}
        <StageTimeline
          id="process"
          label="Planning a Creator Campaign"
          index="05"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          lede={c.process.lede}
          stages={c.process.stages}
          outro={c.process.intro}
          axis={["Brief", "Response"]}
          mark={{ variant: "progression", label: "Six stages from brief to response" }}
        />

        <AttributionPaths
          id="measurement"
          label="Read the Results Properly"
          index="06"
          title={c.measurement.title}
          strokeTitle={c.measurement.strokeTitle}
          lede={c.measurement.lede}
          visibleLabel={c.measurement.visibleLabel}
          visibleLead={c.measurement.visibleLead}
          visibleActor={c.measurement.visibleActor}
          visibleActions={c.measurement.visibleActions}
          visibleTail={c.measurement.visibleTail}
          hiddenLabel={c.measurement.hiddenLabel}
          hiddenLead={c.measurement.hiddenLead}
          hiddenActor={c.measurement.hiddenActor}
          hiddenPath={c.measurement.hiddenPath}
          hiddenTail={c.measurement.hiddenTail}
          verdict={c.measurement.verdict}
          signalsLead={c.measurement.signalsLead}
          signals={c.measurement.signals}
          closing={c.measurement.closing}
        />

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
        />

        <Work index="07" label="Summits Reached" />

        <FaqList label="FAQs" index="08" title="FAQs" faqs={c.faqs} />

        <CtaBand
          label="Talk to Us About Influencer Marketing"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          whatsapp={whatsapp}
          whatsappLabel="Chat on WhatsApp"
        />

        <Insights index="10" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

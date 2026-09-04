"use client";

import { brand, faqs as siteFaqs } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/social-media-marketing";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PlatformRoles } from "@/components/service/PlatformRoles";
import { Narrative } from "@/components/service/Narrative";
import { ReasonLedger } from "@/components/service/ReasonLedger";
import { ServiceIndex } from "@/components/service/ServiceIndex";
import { MeasureTable } from "@/components/service/MeasureTable";
import { StageTrack } from "@/components/service/StageTrack";
import { SectorLedger } from "@/components/service/SectorLedger";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/social-media-marketing";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function SocialMediaMarketingPage() {
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
          visual={<PlatformRoles key="roles" />}
        />

        <Narrative
          id="story"
          label="Give Every Platform a Clear Role"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
        />

        {/* The nine children first on this page, before the reasons: the social
            document leads with the platforms and treats the agency argument as
            support, which is the reverse of the SEO page. */}
        <section
          id="services"
          data-section="Social Media Services We Offer"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.services.title}
              strokeTitle={c.services.strokeTitle}
              mark={{ variant: "network", label: "Nine scopes, bookable together or apart" }}
              className="mb-12"
            />
            <ServiceIndex items={c.services.items} wide={1} />
            <Rise delay={0.12}>
              <p className="mt-10 max-w-3xl leading-relaxed text-fog">{c.services.tail}</p>
            </Rise>
          </Container>
        </section>

        <section
          id="reasons"
          data-section="Why Choose ENH Marketing for Social Media Marketing in Dubai"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.reasons.title}
              strokeTitle={c.reasons.strokeTitle}
              className="mb-12"
            />
            <ReasonLedger lead={c.reasons.lead} items={c.reasons.items} />
          </Container>
        </section>

        <section
          id="process"
          data-section="How Our Social Media Process Works"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              mark={{ variant: "progression", label: "Six stages, repeating every month" }}
              className="mb-12"
            />
            <StageTrack stages={c.process.stages} columns={3} />
          </Container>
        </section>

        <section
          id="measure"
          data-section="What We Measure"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.measure.title}
              strokeTitle={c.measure.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="lead">
                  <p className="leading-relaxed text-fog sm:text-lg">{c.measure.lead}</p>
                </Rise>
              }
            />
            <MeasureTable
              rows={c.measure.rows}
              headTrack={c.measure.headTrack}
              headTells={c.measure.headTells}
              note={c.measure.note}
            />
          </Container>
        </section>

        {/* Paid, in a section of its own, because this document will not let it
            be added to the organic numbers above. */}
        <section
          id="paid"
          data-section="Reach a Larger Audience With Paid Social Campaigns"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
              title={c.paid.title}
              strokeTitle={c.paid.strokeTitle}
              mark={{ variant: "contrast", label: "Reported apart from the accounts" }}
              className="mb-12"
            />
            <Rise>
              <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {c.paid.claim}
              </p>
            </Rise>
            <div className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <Rise delay={0.06}>
                <p className="leading-relaxed text-snow sm:text-lg">{c.paid.body}</p>
              </Rise>
              <div className="space-y-6">
                <Rise delay={0.12}>
                  <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">
                    {c.paid.separation}
                  </p>
                </Rise>
                <Rise delay={0.18}>
                  <p className="border-t border-line pt-6 leading-relaxed text-ash">
                    {c.paid.scope}
                  </p>
                </Rise>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="sectors"
          data-section="Sectors We Support Across Social Media"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
              title={c.sectors.title}
              strokeTitle={c.sectors.strokeTitle}
              className="mb-12"
            />
            <SectorLedger lead={c.sectors.lead} items={c.sectors.items} tail={c.sectors.tail} />
          </Container>
        </section>

        {/* The document's "Our Work" is a gate: "[Client case study slides and
            approved social media counters]". This is the site's own Work
            section. */}
        <Work index="08" label="Our Work" ctaHref="#quote" />

        {/* This document has no FAQ section. The site's existing set is used,
            unchanged, so the page keeps the shape every other service page has. */}
        <FaqList label="FAQs" index="09" faqs={siteFaqs} />

        <CtaBand
          label="Tell Us What Your Social Media Needs to Do"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
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

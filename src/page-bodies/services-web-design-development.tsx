"use client";

import { brand, faqs as siteFaqs } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/web-design-development";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { LandingDrop } from "@/components/service/LandingDrop";
import { Narrative } from "@/components/service/Narrative";
import { ReasonLedger } from "@/components/service/ReasonLedger";
import { ServiceIndex } from "@/components/service/ServiceIndex";
import { MeasureTable } from "@/components/service/MeasureTable";
import { StageTrack } from "@/components/service/StageTrack";
import { SectorLedger } from "@/components/service/SectorLedger";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/web-design-development";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function WebDesignDevelopmentPage() {
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
          visual={<LandingDrop key="drop" />}
        />

        <Narrative
          id="story"
          label="Give Every Click Somewhere Better to Land"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
          closing={c.narrative.closing}
        />

        <section
          id="reasons"
          data-section="Why Choose ENH Marketing for Web Design in Dubai"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.reasons.title}
              strokeTitle={c.reasons.strokeTitle}
              className="mb-12"
            />
            <ReasonLedger lead={c.reasons.lead} items={c.reasons.items} tail={c.reasons.tail} />
          </Container>
        </section>

        {/* Eight capabilities, not eight pages. Four of these are parts of a
            build rather than separate scopes, so their cards carry no link at
            all. See the note in the content file. */}
        <section
          id="services"
          data-section="Web Design & Development Services We Offer"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.services.title}
              strokeTitle={c.services.strokeTitle}
              mark={{ variant: "ecosystem", label: "Eight capabilities, before and after launch" }}
              className="mb-12"
            />
            <ServiceIndex items={c.services.items} wide={2} />
          </Container>
        </section>

        <section
          id="process"
          data-section="How Our Web Design and Development Process Works"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              mark={{ variant: "progression", label: "Seven stages, and support after launch" }}
              className="mb-12"
            />
            <StageTrack stages={c.process.stages} columns={4} />
          </Container>
        </section>

        {/* The document's argument that a build is a marketing problem. */}
        <section
          id="performance"
          data-section="Websites Optimised for Performance"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.performance.title}
              strokeTitle={c.performance.strokeTitle}
              mark={{ variant: "contrast", label: "A strong ad cannot rescue a weak page" }}
              className="mb-12"
            />
            <Rise>
              <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {c.performance.claim}
              </p>
            </Rise>
            <div className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <Rise delay={0.06}>
                <p className="flex gap-3 leading-relaxed text-snow sm:text-lg">
                  <span aria-hidden className="mt-1 shrink-0 text-brand">
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 4.6v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <circle cx="8" cy="11.4" r="0.9" fill="currentColor" />
                    </svg>
                  </span>
                  <span>{c.performance.warning}</span>
                </p>
              </Rise>
              <div className="space-y-6">
                <Rise delay={0.12}>
                  <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">
                    {c.performance.body}
                  </p>
                </Rise>
                <Rise delay={0.18}>
                  <p className="border-t border-line pt-6 leading-relaxed text-ash">
                    {c.performance.connected}
                  </p>
                </Rise>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="measure"
          data-section="What We Measure"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
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

        <section
          id="sectors"
          data-section="Websites Built for Different Industries"
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

        <Work index="08" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={siteFaqs} />

        <CtaBand
          label="Tell Us What the Website Needs to Do"
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

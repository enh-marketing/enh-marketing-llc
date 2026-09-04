"use client";

import { brand, faqs as siteFaqs } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/video-marketing";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { UnplacedFilm } from "@/components/service/UnplacedFilm";
import { Narrative } from "@/components/service/Narrative";
import { ReasonLedger } from "@/components/service/ReasonLedger";
import { ServiceIndex } from "@/components/service/ServiceIndex";
import { MeasureTable } from "@/components/service/MeasureTable";
import { StageTrack } from "@/components/service/StageTrack";
import { SectorLedger } from "@/components/service/SectorLedger";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function VideoMarketingPage() {
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
          visual={<UnplacedFilm key="film" />}
        />

        <Narrative
          id="story"
          label="Decide What the Video Needs to Do"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
          closing={c.narrative.closing}
        />

        {/* Six children, all of them built. This is the only pillar on the site
            where every card links. */}
        <section
          id="services"
          data-section="Video Production Services We Offer"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.services.title}
              strokeTitle={c.services.strokeTitle}
              mark={{ variant: "ecosystem", label: "Six formats, one production team" }}
              className="mb-12"
            />
            <ServiceIndex items={c.services.items} wide={2} />
          </Container>
        </section>

        {/* Process before measurement here: this document's whole argument is
            that the decision comes before the shoot, so the stages precede the
            numbers rather than following them. */}
        <section
          id="process"
          data-section="How Our Video Production Process Works"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              mark={{ variant: "progression", label: "Seven stages, brief to measurement" }}
              className="mb-12"
            />
            <StageTrack stages={c.process.stages} columns={4} />
          </Container>
        </section>

        <section
          id="reasons"
          data-section="Why Choose ENH Marketing for Video Production in Dubai"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.reasons.title}
              strokeTitle={c.reasons.strokeTitle}
              className="mb-12"
            />
            <ReasonLedger lead={c.reasons.lead} items={c.reasons.items} tail={c.reasons.tail} />
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

        <section
          id="sectors"
          data-section="Industries We Film For"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
              title={c.sectors.title}
              strokeTitle={c.sectors.strokeTitle}
              className="mb-12"
            />
            <SectorLedger lead={c.sectors.lead} items={c.sectors.items} />
          </Container>
        </section>

        {/* The document's "Our Work" is a gate: "[Client video case study slides
            and approved production counters]". This is the site's own section. */}
        <Work index="07" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="08" faqs={siteFaqs} />

        <CtaBand
          label="Tell Us What the Video Needs to Do"
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

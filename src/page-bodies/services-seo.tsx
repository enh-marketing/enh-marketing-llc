"use client";

import { brand, faqs as siteFaqs } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/seo";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { RankedNotUseful } from "@/components/service/RankedNotUseful";
import { Narrative } from "@/components/service/Narrative";
import { ReasonLedger } from "@/components/service/ReasonLedger";
import { ServiceIndex } from "@/components/service/ServiceIndex";
import { MeasureTable } from "@/components/service/MeasureTable";
import { StageTrack } from "@/components/service/StageTrack";
import { SectorLedger } from "@/components/service/SectorLedger";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/seo";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function SeoPage() {
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
          visual={<RankedNotUseful key="rnu" />}
        />

        {/* Ranking is not the outcome. The six disciplines named in the agency
            paragraph are marked because the index below expands exactly them. */}
        <Narrative
          id="story"
          label="Turn Search Visibility Into Business"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
          closing={c.narrative.closing}
        />

        <section
          id="reasons"
          data-section="Why Choose ENH Marketing for SEO in Dubai"
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

        {/* The point of a hub page: the nine children. Four are unbuilt and
            their cards render without a link. See ServiceIndex. */}
        <section
          id="services"
          data-section="Our Search Engine Optimization Services"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.services.title}
              strokeTitle={c.services.strokeTitle}
              mark={{ variant: "ecosystem", label: "Nine scopes under one search strategy" }}
              className="mb-12"
            />
            <ServiceIndex items={c.services.items} wide={2} />
            <Rise delay={0.12}>
              <p className="mt-10 max-w-3xl leading-relaxed text-fog">{c.services.tail}</p>
            </Rise>
          </Container>
        </section>

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
          id="process"
          data-section="How Our SEO Process Works"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              mark={{ variant: "progression", label: "Six stages, reviewed every month" }}
              className="mb-12"
            />
            <StageTrack stages={c.process.stages} columns={3} />
          </Container>
        </section>

        <section
          id="sectors"
          data-section="Industries That Benefit From Search Visibility"
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
            {/* The three paragraphs the document closes the section with, all
                about the local case. */}
            <div className="mt-10 grid gap-6 border-t border-line pt-8 lg:grid-cols-3">
              {c.sectors.localNotes.map((note, i) => (
                <Rise key={note} delay={0.06 * i}>
                  <p className="leading-relaxed text-fog">{note}</p>
                </Rise>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="closing"
          data-section="Be Seen, Be Found and Drive Sales"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
              title={c.closing.title}
              strokeTitle={c.closing.strokeTitle}
              className="mb-12"
            />
            <Rise>
              <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {c.closing.lead}
              </p>
            </Rise>
            <div className="mt-10 grid gap-x-14 gap-y-6 lg:grid-cols-2">
              {c.closing.body.map((para, i) => (
                <Rise key={para} delay={0.08 * i}>
                  <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">{para}</p>
                </Rise>
              ))}
            </div>
          </Container>
        </section>

        {/* The document's "Our Work" is the instruction "[display our work]".
            This is the site's own Work section, drawn from real client entries. */}
        <Work index="08" label="Our Work" ctaHref="#quote" />

        {/* The document's FAQ section reads "[same as the existing ones]", so
            this is the site's existing FAQ set from lib/content, unchanged. */}
        <FaqList label="FAQs" index="09" faqs={siteFaqs} />

        <CtaBand
          label="Tell Us What You Want to Rank For"
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

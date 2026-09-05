"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/testimonial-video";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PoliteAnswer } from "@/components/service/PoliteAnswer";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { QuestionSheet } from "@/components/service/QuestionSheet";
import { OneInterview } from "@/components/service/OneInterview";
import { StoryMural } from "@/components/service/StoryMural";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
import { GrowthCta } from "@/components/service/GrowthCta";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing/testimonial-video";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function TestimonialVideoPage() {
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
          visual={<PoliteAnswer key="polite" />}
        />

        {/* The polite answer that told a buyer nothing. The four questions it
            was missing are not here: they are the centrepiece below, where the
            page can give them the room they deserve. */}
        <Narrative
          id="story"
          label="Turn Customer Experience Into Useful Proof"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
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

        {/* THE PAGE'S ARGUMENT, immediately after the scene that sets it up:
            our questions on one side, their recorded answers on the other, and
            no words invented for either. See QuestionSheet. */}
        <QuestionSheet
          id="specifics"
          label="Specific Answers Are More Useful Than General Praise"
          index="02"
          title={c.specifics.title}
          strokeTitle={c.specifics.strokeTitle}
          claim={c.specifics.claim}
          needLead={c.narrative.needLead}
          questions={c.narrative.questions}
          method={c.specifics.method}
          methodMark={c.specifics.methodMark}
          consent={c.specifics.consent}
          aim={c.specifics.aim}
        />

        <PinnedExplorer
          id="types"
          label="The Testimonial Videos Businesses Use"
          index="03"
          title={c.types.title}
          strokeTitle={c.types.strokeTitle}
          items={c.types.items.map((t) => ({
            no: t.no,
            title: t.title,
            body: t.body,
            glyph: t.glyph,
          }))}
          diagramSide="left"
          mark={{ variant: "ecosystem", label: "Six formats from one conversation" }}
          diagram={{ kind: "outputs" }}
        />

        {/* One recording, and the four different sets of selections taken out
            of it. The claim is about deciding placement first, which only means
            anything once the reader can see that they all come from the same
            conversation. See OneInterview. */}
        <OneInterview
          id="distribution"
          label="Where Your Testimonial Videos Can Be Used"
          index="04"
          title={c.distribution.title}
          strokeTitle={c.distribution.strokeTitle}
          claim={c.distribution.claim}
          places={c.distribution.places}
          wider={c.distribution.wider}
          widerMark={c.distribution.widerMark}
          planning={c.distribution.planning}
        />

        {/* One account, carried the whole way: a single line that leaves the
            customer and becomes the delivered versions, travelled left to right
            while the section holds. See StoryMural. */}
        <StoryMural
          id="process"
          label="How the Project Moves"
          index="05"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        <IndustryRun
          id="industries"
          label="Industries We Produce Testimonials For"
          index="06"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          note={c.industries.caveat}
          items={c.industries.items.map((label) => ({ label }))}
        />

        <section
          id="promises"
          data-section="What You Get From ENH Marketing"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="07"
              title={c.promises.title}
              strokeTitle={c.promises.strokeTitle}
              className="mb-12"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.promises.items.map((p, i) => (
                <SurfaceCard key={p.title} index={String(i + 1).padStart(2, "0")} delay={0.05 * i}>
                  <p className="font-display text-[1.05rem] font-extrabold uppercase leading-[1.2] text-snow">
                    {p.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{p.body}</p>
                </SurfaceCard>
              ))}
            </div>
          </Container>
        </section>

        {/* The mid-page ask. It takes the heading and the short line; the band
            at the foot of the page takes the longer recommendation, so no
            sentence prints twice. */}
        <GrowthCta
          id="cta"
          label="Give Prospective Customers a Real Experience to Consider"
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
          label="Tell Us Which Stories to Record"
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

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
import { ProofQuestions } from "@/components/service/ProofQuestions";
import { StageTrack } from "@/components/service/StageTrack";
import { IndustryRun } from "@/components/service/IndustryRun";
import { FaqList } from "@/components/service/FaqList";
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

        {/* THE PAGE'S ARGUMENT, immediately after the scene that sets it up. */}
        <section
          id="specifics"
          data-section="Specific Answers Are More Useful Than General Praise"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.specifics.title}
              strokeTitle={c.specifics.strokeTitle}
              mark={{ variant: "progression", label: "Situation, decision, work, result" }}
              className="mb-12"
            />
            <ProofQuestions
              claim={c.specifics.claim}
              needLead={c.narrative.needLead}
              questions={c.narrative.questions}
              method={c.specifics.method}
              consent={c.specifics.consent}
              aim={c.specifics.aim}
            />
          </Container>
        </section>

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

        <section
          id="distribution"
          data-section="Where Your Testimonial Videos Can Be Used"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="04"
              title={c.distribution.title}
              strokeTitle={c.distribution.strokeTitle}
              className="mb-12"
            />
            <Rise>
              <p className="font-display max-w-4xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.14] text-snow">
                {c.distribution.claim}
              </p>
            </Rise>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.distribution.places.map((place, i) => (
                <Rise key={place} delay={0.05 * i} className="h-full">
                  <li className="flex h-full flex-col rounded-2xl border border-line bg-ink-3 p-6">
                    <span aria-hidden className="h-1 w-9 rounded-full bg-brand" />
                    <p className="mt-5 leading-relaxed text-snow">{place}</p>
                  </li>
                </Rise>
              ))}
            </ul>
            <div className="mt-12 grid gap-x-14 gap-y-6 border-t border-line pt-8 lg:grid-cols-2">
              <Rise>
                <p className="leading-relaxed text-snow sm:text-lg">{c.distribution.wider}</p>
              </Rise>
              <Rise delay={0.08}>
                <p className="border-l-2 border-brand pl-6 leading-relaxed text-fog">
                  {c.distribution.planning}
                </p>
              </Rise>
            </div>
          </Container>
        </section>

        <section
          id="process"
          data-section="How the Project Moves"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="05"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              mark={{ variant: "progression", label: "Six stages, story to delivery" }}
              className="mb-12"
            />
            <StageTrack stages={c.process.stages} columns={3} />
          </Container>
        </section>

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

        <Work index="08" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Which Stories to Record"
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

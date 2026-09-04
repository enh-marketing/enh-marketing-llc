"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/explainer-video";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { SaidOnce } from "@/components/service/SaidOnce";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { StoryboardLock } from "@/components/service/StoryboardLock";
import { CapabilityCarousel } from "@/components/service/CapabilityCarousel";
import { DestinationDeck } from "@/components/service/DestinationDeck";
import { IndustryPairs } from "@/components/service/IndustryPairs";
import { PromiseStrip } from "@/components/service/PromiseStrip";
import { FaqList } from "@/components/service/FaqList";
import { GrowthCta } from "@/components/service/GrowthCta";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing/explainer-video";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function ExplainerVideoPage() {
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
          visual={<SaidOnce key="said" />}
        />

        {/* The opening runs in the document's order: the observation, the
            problem it creates, then the method. The last sentence of the agency
            paragraph is set at display scale because it states the method in
            one line and disappears inside a paragraph. */}
        <Narrative
          id="story"
          label="Make the Complicated Easier to Understand"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.problem}
          highlight={c.narrative.highlight}
          outro={[c.narrative.agency]}
          closing={c.narrative.closing}
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

        {/* Six formats, chosen by subject rather than preference. */}
        <PinnedExplorer
          id="formats"
          label="The Explainer Videos Businesses Use"
          index="02"
          title={c.formats.title}
          strokeTitle={c.formats.strokeTitle}
          items={c.formats.items.map((f) => ({
            no: f.no,
            title: f.title,
            body: f.body,
            glyph: f.glyph,
          }))}
          diagramSide="left"
          mark={{ variant: "ecosystem", label: "Six formats, one decision" }}
          diagram={{ kind: "outputs" }}
        />

        {/* THE PAGE'S ARGUMENT. Six steps, and a storyboard that stops moving
            once the third one is approved. See StoryboardLock. */}
        <section
          id="process"
          data-section="How the Production Process Moves"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.process.title}
              strokeTitle={c.process.strokeTitle}
              mark={{ variant: "progression", label: "Structure settled before the animation starts" }}
              className="mb-12"
            />
            <StoryboardLock items={c.process.items} gates={c.process.gates} />
          </Container>
        </section>

        {/* Six parts of the production, on the run used for capability sets
            across the site. Placed after the process because the process is
            what decides when each of them happens. */}
        <CapabilityCarousel
          id="craft"
          label="What Goes Into an Explainer Video"
          index="04"
          title={c.craft.title}
          strokeTitle={c.craft.strokeTitle}
          items={c.craft.items}
        />

        {/* Distribution, which the document says is decided before production.
            Four placements on the screens they play on, then the channels, then
            the discoverability note with the limit attached to it. */}
        <DestinationDeck
          id="distribution"
          label="Where the Explainer Goes After Delivery"
          index="05"
          title={c.distribution.title}
          strokeTitle={c.distribution.strokeTitle}
          claim={c.distribution.claim}
          claimMark={c.distribution.claimMark}
          places={c.distribution.places}
          channelsLead={c.distribution.channelsLead}
          channels={c.distribution.channels}
          discovery={c.distribution.discovery}
          discoveryMark={c.distribution.discoveryMark}
          discoveryCaveat={c.distribution.discoveryCaveat}
          connected={c.distribution.connected}
        />

        <IndustryPairs
          id="industries"
          label="Industries We Produce Explainer Videos For"
          index="06"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          items={c.industries.items}
          note={c.industries.caveat}
          noteMark={c.industries.caveatMark}
        />

        <PromiseStrip
          id="promises"
          label="What You Get From ENH Marketing"
          index="07"
          title={c.promises.title}
          strokeTitle={c.promises.strokeTitle}
          items={c.promises.items}
        />

        {/* The mid-page ask, before the portfolio. It takes the heading and the
            short line; the band at the foot of the page takes the longer
            recommendation, so no sentence prints twice. */}
        <GrowthCta
          id="cta"
          label="Tell Us What Needs Explaining"
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="08" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Request a Quote"
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

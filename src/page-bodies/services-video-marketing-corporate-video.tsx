"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/corporate-video";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { Viewfinder } from "@/components/service/Viewfinder";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { DistributionReel } from "@/components/service/DistributionReel";
import { IndustryViewer } from "@/components/service/IndustryViewer";
import { CapabilityCarousel } from "@/components/service/CapabilityCarousel";
import { FaqList } from "@/components/service/FaqList";
import { GrowthCta } from "@/components/service/GrowthCta";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/video-marketing/corporate-video";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function CorporateVideoPage() {
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
          visual={<Viewfinder key="vf" />}
        />

        {/* The opening argument: a good film with no decision behind it. The
            seven formats the agency sentence names are marked inside it, since
            the section below expands exactly those. */}
        <Narrative
          id="story"
          label="Give Every Corporate Video a Clear Job"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.agency}
          highlight={c.narrative.highlight}
          outro={[c.narrative.closing]}
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

        {/* Eight formats, one at a time. */}
        <PinnedExplorer
          id="formats"
          label="The Video Companies in Dubai Usually Need"
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
          mark={{ variant: "ecosystem", label: "Eight formats, one production process" }}
          diagram={{ kind: "cycle" }}
        />

        {/* THE PAGE'S ARGUMENT. The document's causal sentence leads, so the
            frames are drawn before the destinations: one shoot, the four frames
            it has to serve, then where each one goes. See DistributionReel. */}
        <DistributionReel
          id="distribution"
          label="Where the Video Goes After Delivery"
          index="03"
          title={c.distribution.title}
          strokeTitle={c.distribution.strokeTitle}
          claim={c.distribution.claim}
          versionsLead={c.distribution.versionsLead}
          versions={c.distribution.versions}
          versionsTail={c.distribution.versionsTail}
          destinations={c.distribution.destinations}
          reach={c.distribution.reach}
          reachFigure={c.distribution.reachFigure}
          reachCaveat={c.distribution.reachCaveat}
          discoveryLead={c.distribution.discoveryLead}
          discoveryItems={c.distribution.discoveryItems}
          discoveryLink={c.distribution.discoveryLink}
          discoveryTail={c.distribution.discoveryTail}
        />

        {/* Eleven names and nothing else. What was wrong with the earlier
            versions was the picture, not the container: they all drew their
            industries as hairline outlines, and eleven wireframes read as clip
            art at any size. These are filled, in three tonal layers on one
            horizon, inside a viewer the reader operates. See IndustryViewer. */}
        <IndustryViewer
          id="industries"
          label="Industries We Film For"
          index="04"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          items={c.industries.items}
        />

        {/* The commitments, on the run the site uses for capability sets. The
            document's own opening sentence for the section sits under it: it
            belongs to the set, not to any one card. */}
        <CapabilityCarousel
          id="promises"
          label="What You Get From ENH Marketing"
          index="05"
          title={c.promises.title}
          strokeTitle={c.promises.strokeTitle}
          items={c.promises.items}
          footer={
            <Rise>
              <p className="max-w-4xl border-t border-line pt-9 leading-relaxed text-fog sm:text-lg">
                {c.promises.lead}
              </p>
            </Rise>
          }
        />

        {/* The mid-page ask. It takes the heading and the short line; the band
            at the foot of the page takes the longer recommendation, so no
            sentence prints twice. */}
        <GrowthCta
          id="cta"
          label="Tell Us What the Video Needs to Do"
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        {/* The document's "Corporate Videos We Have Produced" section is an
            instruction, not content: "[Portfolio section using existing,
            permissioned ENH work.]" Nothing is invented for it. This is the
            site's own Work section, which draws on real client entries. */}
        <Work index="06" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="07" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What the Video Needs to Do"
          index="08"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="09" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

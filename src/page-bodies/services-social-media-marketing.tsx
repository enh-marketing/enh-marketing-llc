"use client";

import { brand, faqs as siteFaqs } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/social-media-marketing";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PlatformRoles } from "@/components/service/PlatformRoles";
import { Narrative } from "@/components/service/Narrative";
import { ChannelScroller } from "@/components/service/ChannelScroller";
import { PlatformCut } from "@/components/service/PlatformCut";
import { ProcessLanes } from "@/components/service/ProcessLanes";
import { MeasureBank } from "@/components/service/MeasureBank";
import { PreLaunchBrief } from "@/components/service/PreLaunchBrief";
import { SectorTrack } from "@/components/service/SectorTrack";
import { GrowthCta } from "@/components/service/GrowthCta";
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

        {/* The nine children first on this page, before the reasons: the
            social document leads with the platforms and treats the agency
            argument as support, which is the reverse of the SEO page. Run as
            the pinned horizontal track the paid pillar's channels use -- same
            component, same card -- so each service gets a full stage instead of
            a ninth of a grid. See ChannelScroller. */}
        <ChannelScroller
          id="services"
          label="Social Media Services We Offer"
          index="02"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          mark={{ variant: "ecosystem", label: "Nine services, one publishing plan" }}
          channels={c.services.items.map((s) => ({
            name: s.title,
            href: s.href ?? "",
            body: s.body,
            glyph: s.glyph,
          }))}
          tail={c.services.tail}
        />

        {/* The second position on the list is the page's whole argument, and
            the opening scene is a business ignoring it. So the section proves
            it: the same post, re-cut four ways, with the parts moving between
            arrangements rather than cross-fading. See PlatformCut. */}
        <PlatformCut
          id="reasons"
          label="Why Choose ENH Marketing for Social Media Marketing in Dubai"
          index="03"
          title={c.reasons.title}
          strokeTitle={c.reasons.strokeTitle}
          lead={c.reasons.lead}
          leadMark={c.reasons.leadMark}
          items={c.reasons.items}
        />

        {/* Sorted by whose desk each stage sits on. Five of the six say "we"
            or "our team"; exactly one says "Your team receives the content
            before publishing", so the shape of the section answers the question
            a client actually has. See ProcessLanes. */}
        <ProcessLanes
          id="process"
          label="How Our Social Media Process Works"
          index="04"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
          laneOurs="Our team"
          laneYours="Your team"
        />

        {/* Nine measures as an instrument panel, one reading at a time, because
            the section's own note warns against reading a number on its own.
            See MeasureBank. */}
        <MeasureBank
          id="measure"
          label="What We Measure"
          index="05"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          lead={c.measure.lead}
          rows={c.measure.rows}
          headTrack={c.measure.headTrack}
          headTells={c.measure.headTells}
          note={c.measure.note}
          noteMark={c.measure.noteMark}
        />

        {/* Two lists the copy already contains and no earlier version drew:
            the five things settled before a campaign runs, and the two money
            lines that are never added up. The ledger deliberately stops one row
            short of a total. See PreLaunchBrief. */}
        <PreLaunchBrief
          id="paid"
          label="Reach a Larger Audience With Paid Social Campaigns"
          index="06"
          title={c.paid.title}
          strokeTitle={c.paid.strokeTitle}
          claim={c.paid.claim}
          planLead={c.paid.planLead}
          decisions={c.paid.decisions}
          planTail={c.paid.planTail}
          platforms={c.paid.platforms}
          ledger={c.paid.ledger}
          ledgerVerb={c.paid.ledgerVerb}
          review={c.paid.review}
          reviewMark={c.paid.reviewMark}
          scope={c.paid.scope}
        />

        {/* Ten sectors and the material each has to publish, run sideways by
            the page's own scroll. See SectorTrack. */}
        <SectorTrack
          id="sectors"
          label="Sectors We Support Across Social Media"
          index="07"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          lead={c.sectors.lead}
          items={c.sectors.items}
          tail={c.sectors.tail}
        />

        {/* The house mid-page CTA, in the position every other service page
            puts it: after the argument, before the work. It carries the closing
            heading and the "send us" line, while the CtaBand at the foot takes
            the heading and the longer recommendation, so no sentence prints
            twice. */}
        <GrowthCta
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

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

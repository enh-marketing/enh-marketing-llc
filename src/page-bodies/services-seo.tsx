"use client";

import { brand, faqs as siteFaqs } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/seo";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { RankedNotUseful } from "@/components/service/RankedNotUseful";
import { Narrative } from "@/components/service/Narrative";
import { SearchPromise } from "@/components/service/SearchPromise";
import { ChannelScroller } from "@/components/service/ChannelScroller";
import { SignalLedger } from "@/components/service/SignalLedger";
import { ProcessSequence } from "@/components/service/ProcessSequence";
import { SectorChips } from "@/components/service/SectorChips";
import { ClosingBeacon } from "@/components/service/ClosingBeacon";
import { GrowthCta } from "@/components/service/GrowthCta";
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
            paragraph are marked because the deck below expands exactly them. */}
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

        {/* The lead is an instruction, so the section follows it: it runs the
            three searches the document names and returns the same five
            interchangeable promises every time. See SearchPromise. */}
        <SearchPromise
          id="reasons"
          label="Why Choose ENH Marketing for SEO in Dubai"
          index="02"
          title={c.reasons.title}
          strokeTitle={c.reasons.strokeTitle}
          lead={c.reasons.lead}
          queries={c.reasons.queries}
          items={c.reasons.items}
          tail={c.reasons.tail}
          tailMark={c.reasons.tailMark}
        />

        {/* The point of a hub page: the nine children, run as the pinned
            horizontal track the Performance Marketing channels use. Same
            component, same card: the section holds while the run travels
            sideways and each scope gets a full stage instead of a ninth of a
            grid. The four scopes with no page yet render the same card and
            simply have nowhere to send you. See ChannelScroller. */}
        <ChannelScroller
          id="services"
          label="Our Search Engine Optimization Services"
          index="03"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          mark={{ variant: "ecosystem", label: "Nine scopes under one search strategy" }}
          channels={c.services.items.map((s) => ({
            name: s.title,
            href: s.href ?? "",
            body: s.body,
            glyph: s.glyph,
          }))}
          tail={c.services.tail}
        />

        {/* Eight instruments and what each one means, hung off a rail the
            reader's scroll fills. See SignalLedger. */}
        <SignalLedger
          id="measure"
          label="What We Measure"
          index="04"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          lead={c.measure.lead}
          rows={c.measure.rows}
          headTrack={c.measure.headTrack}
          headTells={c.measure.headTells}
          note={c.measure.note}
          noteMark={c.measure.noteMark}
        />

        {/* One site, drawn as the graph a search engine sees, and six things
            that happen to it while the section holds still. See
            ProcessSequence. */}
        <ProcessSequence
          id="process"
          label="How Our SEO Process Works"
          index="05"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* Nine industries, each named with the pages that actually carry its
            search, and the local case on its own ground. See SectorChips. */}
        <SectorChips
          id="sectors"
          label="Industries That Benefit From Search Visibility"
          index="06"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          lead={c.sectors.lead}
          items={c.sectors.items}
          notes={c.sectors.localNotes}
        />

        {/* The closing sentence is already a picture -- many separate
            searches, one business at the point they meet -- so it is drawn
            rather than described. The only centred section on the page, and the
            only one that runs on its own. See ClosingBeacon. */}
        <ClosingBeacon
          id="closing"
          label="Be Seen, Be Found and Drive Sales"
          index="07"
          title={c.closing.title}
          strokeTitle={c.closing.strokeTitle}
          lead={c.closing.lead}
          leadMark={c.closing.leadMark}
          body={c.closing.body}
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

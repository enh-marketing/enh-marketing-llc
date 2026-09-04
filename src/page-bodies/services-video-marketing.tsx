"use client";

import { brand, faqs as siteFaqs } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/video-marketing";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { UnplacedFilm } from "@/components/service/UnplacedFilm";
import { Narrative } from "@/components/service/Narrative";
import { CoverageLedger } from "@/components/service/CoverageLedger";
import { ChannelScroller } from "@/components/service/ChannelScroller";
import { PlayerReadout } from "@/components/service/PlayerReadout";
import { StageLadder } from "@/components/service/StageLadder";
import { FilmRuns } from "@/components/service/FilmRuns";
import { GrowthCta } from "@/components/service/GrowthCta";
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

        {/* Six children, all of them built -- the only pillar on the site
            where every card links -- run as the pinned horizontal track the
            paid pillar's channels use. Same component, same card, so each
            production gets a full stage. See ChannelScroller. */}
        <ChannelScroller
          id="services"
          label="Video Production Services We Offer"
          index="02"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          mark={{ variant: "ecosystem", label: "Six formats, one production team" }}
          channels={c.services.items.map((s) => ({
            name: s.title,
            href: s.href ?? "",
            body: s.body,
            glyph: s.glyph,
          }))}
        />

        {/* Process before measurement here, and before the reasons: this
            document's whole argument is that the decision comes before the
            shoot, so the stages precede everything that reads back off them.
            The house ladder -- a panel that holds while the run moves past it,
            a rail that fills with the reader's own scroll, and the stage under
            the eye lit on it. Same component the AEO and LinkedIn Ads pages
            use. Its tail treatment is off: this document numbers all seven
            stages, so none of them is an open-ended continuation. */}
        <StageLadder
          id="process"
          label="How Our Video Production Process Works"
          index="03"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
          tail={false}
        />

        {/* The closing sentence tells the reader to check the full scope
            "rather than the camera list alone" -- an instruction to compare
            breadth. Six of the seven positions enumerate what they cover, at
            the document's own commas, so the counts are drawn against one
            shared span and the scope is legible before it is read.
            See CoverageLedger. */}
        <CoverageLedger
          id="reasons"
          label="Why Choose ENH Marketing for Video Production in Dubai"
          index="04"
          title={c.reasons.title}
          strokeTitle={c.reasons.strokeTitle}
          lead={c.reasons.lead}
          items={c.reasons.items}
          tail={c.reasons.tail}
          tailMark={c.reasons.tailMark}
        />

        {/* Nine measures, attached to the object they are read off rather than
            listed in a table: a player, a scrubber, a retention curve and the
            things that happen after somebody watches. See PlayerReadout. */}
        <PlayerReadout
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

        {/* The ten arrive with lists of different lengths, and that
            difference is the most useful thing in the section: some sectors
            have a standing programme of work and some have two films and a
            reason. Drawn as runs against one shared axis. See FilmRuns. */}
        <FilmRuns
          id="sectors"
          label="Industries We Film For"
          index="06"
          title={c.sectors.title}
          strokeTitle={c.sectors.strokeTitle}
          lead={c.sectors.lead}
          items={c.sectors.items}
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

        <Work index="07" label="Our Work" ctaHref="#quote" />

        <FaqList label="FAQs" index="08" faqs={siteFaqs} />

        <CtaBand
          label="Tell Us What the Video Needs to Do"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.note}
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

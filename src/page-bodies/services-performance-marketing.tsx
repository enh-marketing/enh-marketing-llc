"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/performance-marketing";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ChannelOrbit } from "@/components/service/ChannelOrbit";
import { Narrative } from "@/components/service/Narrative";
import { ReasonList } from "@/components/service/ReasonList";
import { ChannelScroller } from "@/components/service/ChannelScroller";
import { Rise } from "@/components/fx/Reveal";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { BenchmarkReadout } from "@/components/service/BenchmarkReadout";
import { ComparisonTable } from "@/components/service/ComparisonTable";
import { IndustryList } from "@/components/service/IndustryList";
import { Caveat } from "@/components/service/Caveat";
import { GrowthCta } from "@/components/service/GrowthCta";
import { ResultStats } from "@/components/service/ResultStats";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/performance-marketing";

export function PerformanceMarketingPage() {
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
          formTitle={c.headings.cta.join(" ")}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          // Keyed because this element crosses the server/client boundary into
          // ServiceHero, where React reconciles it as a list child.
          visual={<ChannelOrbit key="orbit" channels={c.channels.map((ch) => ch.name)} />}
        />

        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.headline}
          question={c.narrative.question}
          questionEmphasis={c.narrative.questionEmphasis}
          body={c.narrative.body}
          highlight={c.narrative.highlight}
        />

        <ResultStats id="results" label="Results" stats={c.results} />

        <ReasonList
          id="why-enh"
          label="Why Choose ENH Marketing"
          index="01"
          title={c.headings.reasons[0]}
          strokeTitle={c.headings.reasons[1]}
          lede="We run all six channels ourselves. So when we tell you to move money from LinkedIn to Snapchat, it is because the math says so."
          reasons={c.reasons}
        />

        <ChannelScroller
          id="channels"
          label="The Six Channels"
          index="02"
          title={c.headings.channels[0]}
          strokeTitle={c.headings.channels[1]}
          lede={c.channelsIntro}
          channels={c.channels}
          note={c.organicNote}
        />

        {/* The programme, drawn as a track the reader can point at. Same
            component as the Meta Ads process — identical content shape, so one
            drawing rather than two — with this page's own axis and stages. */}
        <PinnedExplorer
          id="process"
          label="The First 90 Days"
          index="03"
          title={c.headings.process[0]}
          strokeTitle={c.headings.process[1]}
          items={c.stages}
          tone="ink-2"
          diagramSide="left"
          aside={
            <Rise key="lede">
              <p className="font-display text-[clamp(1.15rem,2.1vw,1.7rem)] font-extrabold uppercase leading-[1.18] text-snow">
                {c.processIntro}
              </p>
            </Rise>
          }
          diagram={{ kind: "track", axis: ["Day 0", "Day 90"] }}
        >
          <Rise delay={0.12} className="mt-10 border-t border-line pt-8">
            <p className="max-w-3xl leading-relaxed text-fog sm:text-lg">{c.processOutro}</p>
          </Rise>
        </PinnedExplorer>

        <BenchmarkReadout
          id="benchmarks"
          label="Benchmark Readout"
          columns={c.benchmarkColumns}
          intro={c.benchmarkIntro}
          items={c.benchmarks}
        />

        <ComparisonTable
          id="comparison"
          label="Performance vs Digital Marketing"
          index="04"
          title={c.headings.compare[0]}
          strokeTitle={c.headings.compare[1]}
          lede={c.compare.lede}
          columns={["Performance marketing", "Digital marketing"]}
          rows={c.compare.rows}
          synthesis={c.compare.synthesis}
        />

        <IndustryList
          id="industries"
          label="Where Paid Media Pays Off"
          index="05"
          title={c.headings.fit[0]}
          strokeTitle={c.headings.fit[1]}
          lede={c.fit.lede}
          items={c.fit.industries}
        />

        <Caveat
          id="caveat"
          label="Honest Caveat"
          lead={c.caveat.lead}
          emphasis={c.caveat.emphasis}
          commitment={c.caveat.commitment}
        />

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={c.headings.cta.join(" ")}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
        />

        <Work index="06" label="Summits Reached" ctaHref="#quote" />

        <FaqList
          label="FAQs"
          index="07"
          title={c.headings.faqs[0]}
          brandTitle={c.headings.faqs[1]}
          lede={c.faqLede}
          faqs={c.faqs}
        />

        <CtaBand
          label="Request a Quote"
          index="08"
          title={c.headings.cta[0]}
          strokeTitle={c.headings.cta[1]}
          body={c.finalCta.body}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          whatsapp={whatsapp}
          whatsappLabel="Chat on WhatsApp"
        />

        <Insights index="09" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

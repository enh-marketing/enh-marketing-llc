import type { Metadata } from "next";
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
import { StageTimeline } from "@/components/service/StageTimeline";
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

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: HREF },
  openGraph: { title: c.meta.title, description: c.meta.description, type: "website", locale: "en_AE" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Performance Marketing",
  serviceType: "Performance marketing and paid media management",
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  provider: {
    "@type": "Organization",
    name: brand.legal,
    url: "https://enhmedia.com",
    telephone: brand.phone,
    address: { "@type": "PostalAddress", streetAddress: brand.address, addressCountry: "AE" },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paid media channels",
    itemListElement: c.channels.map((ch) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: ch.name, url: `https://enhmedia.com${ch.href}` },
    })),
  },
};

export default function PerformanceMarketingPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

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

        <StageTimeline
          id="process"
          label="The First 90 Days"
          index="03"
          title={c.headings.process[0]}
          strokeTitle={c.headings.process[1]}
          lede={c.processIntro}
          stages={c.stages}
          outro={c.processOutro}
        />

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

        <Work index="06" label="Summits Reached" />

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

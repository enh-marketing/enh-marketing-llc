import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/landing-pages";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { LandingFocus } from "@/components/service/LandingFocus";
import { Narrative } from "@/components/service/Narrative";
import { SampleSplit } from "@/components/service/SampleSplit";
import { ClaimLedger } from "@/components/service/ClaimLedger";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/lead-generation/landing-page-development";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  alternates: { canonical: HREF },
  openGraph: {
    title: c.meta.title,
    description: c.meta.description,
    type: "website",
    locale: "en_AE",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Landing Page Development",
  serviceType: "Landing page design, build and conversion tracking",
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  provider: {
    "@type": "Organization",
    name: brand.legal,
    url: "https://enhmedia.com",
    telephone: brand.phone,
    address: { "@type": "PostalAddress", streetAddress: brand.address, addressCountry: "AE" },
  },
  isPartOf: {
    "@type": "Service",
    name: "Lead Generation",
    url: "https://enhmedia.com/services/lead-generation",
  },
};

export default function LandingPageDevelopmentPage() {
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
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          visual={<LandingFocus key="focus" />}
        />

        {/* The opening argument, staged as the meeting the document describes:
            two people diagnose it wrongly, and the third line is the answer.
            The decode resolves them in that order, which is why they are three
            lines rather than one paragraph. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.diagnoses}
          highlight={["ads", "traffic", "page"]}
          outro={[c.narrative.body]}
          closing={c.narrative.promise}
        >
          <Rise delay={0.1} className="mt-12 flex flex-wrap items-center gap-3">
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

        {/* How a page gets built. Not the stage track the paid-media pages use:
            those stages are periods of time, these are the parts of a page,
            assembled in order. Selecting one lights the part it produces. */}
        <PinnedExplorer
          id="build"
          label="How a Page Gets Built"
          index="01"
          title={c.build.title}
          strokeTitle={c.build.strokeTitle}
          items={c.build.items}
          tone="ink-2"
          diagramSide="right"
          mark={{ variant: "progression", label: "Five stages, one page" }}
          diagram={{ kind: "pagebuild", anchors: c.build.items.map((b) => b.anchor) }}
        />

        {/* Finding out what actually works. The document's position is that the
            method is decided by traffic, not preference, so the drawing is the
            sample each method gets to read: a dense field, and twenty dots.
            Both methods stay on the page, in the document's order. */}
        <section
          id="testing"
          data-section="Finding Out What Actually Works"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-line) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
              maskImage: "radial-gradient(ellipse at 80% 20%, black, transparent 70%)",
            }}
          />

          <Container className="relative">
            <SectionHeader
              index="02"
              title={c.testing.title}
              strokeTitle={c.testing.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="threshold">
                  <p className="font-display text-[clamp(1.3rem,2.6vw,2.1rem)] font-extrabold uppercase leading-[1.14] text-brand">
                    {c.testing.threshold}
                  </p>
                  <p className="mt-5 leading-relaxed text-fog sm:text-lg">
                    {c.testing.thresholdBody}
                  </p>
                </Rise>
              }
            />

            <Rise>
              <p className="text-xs font-semibold uppercase text-ash">
                {c.testing.lede}
              </p>
            </Rise>

            {/* Two methods, equal weight, each beside the sample it is asked to
                read. The document commits to both. */}
            <ol className="mt-8 border-t border-line">
              {c.testing.modes.map((mode, i) => (
                <li
                  key={mode.label}
                  className="group relative grid gap-x-12 gap-y-6 border-b border-line py-7 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />

                  <Rise delay={i * 0.08}>
                    <SampleSplit variant={c.testing.samples[i]} />
                  </Rise>

                  <Rise delay={i * 0.08 + 0.05}>
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-xs font-bold tabular-nums text-brand-text"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-display text-[clamp(1.1rem,2.1vw,1.6rem)] font-extrabold uppercase leading-[1.14] text-snow">
                        {mode.label}
                      </p>
                    </div>
                    <p className="mt-5 leading-relaxed text-fog sm:text-lg">{mode.body}</p>
                  </Rise>
                </li>
              ))}
            </ol>

            {/* The line the section is really for. */}
            <Rise delay={0.12} className="mt-10">
              <p className="text-xs font-semibold uppercase text-ash">
                {c.testing.closingLead}
              </p>
              <p className="font-display mt-5 max-w-3xl text-[clamp(1.2rem,2.4vw,1.9rem)] font-extrabold uppercase leading-[1.16] text-snow">
                {c.testing.closing}
              </p>
            </Rise>
          </Container>
        </section>

        {/* When it earns its cost. Eight occasions, but not eight of a kind: the
            first is every paid campaign anywhere and names five platforms, the
            last is the one where you are not committing yet, and the six
            between them are specific situations. So the two odd ones bracket a
            grid of six rather than being flattened into a list of eight. */}
        <section
          id="cases"
          data-section="When a Landing Page Earns Its Cost"
          className="relative overflow-x-clip border-y border-line bg-ink-3 py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="03"
              title={c.cases.title}
              strokeTitle={c.cases.strokeTitle}
              className="mb-12"
              aside={
                <Rise key="lede">
                  <p className="font-display text-[clamp(1.15rem,2.1vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-snow">
                    {c.cases.lede}
                  </p>
                  <p className="mt-5 text-xs font-semibold uppercase text-brand-text">
                    {c.cases.itemsLead}
                  </p>
                </Rise>
              }
            />

            <ol className="grid gap-3">
              {/* 01. The broad case, set with the five platforms it names. */}
              <li>
                <Rise>
                  <div className="rounded-2xl border border-brand/35 bg-brand/[0.05] p-6 sm:p-7">
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden
                        className="font-display shrink-0 text-xs font-bold tabular-nums text-brand-text"
                      >
                        01
                      </span>
                      <p className="font-display text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.16] text-snow">
                        {c.cases.platformsLead}
                      </p>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {c.cases.platforms.map((platform) => (
                        <li
                          key={platform}
                          className="font-display rounded-lg border border-line bg-ink-2 px-3.5 py-2 text-sm font-bold text-snow transition-colors duration-500 hover:border-brand/50"
                        >
                          {platform}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Rise>
              </li>

              {/* 02 to 07. Six specific occasions, six equal cells. */}
              <li>
                <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {c.cases.items.slice(1, 7).map((item, i) => (
                    <li key={item} className="h-full">
                      <Rise delay={(i % 3) * 0.06} className="h-full">
                        <div className="group relative flex h-full items-start overflow-hidden rounded-2xl border border-line bg-ink-2 p-5 transition-colors duration-500 hover:border-brand/45">
                          <span
                            aria-hidden
                            className="font-display pointer-events-none absolute -right-1 -top-3 text-[3.4rem] font-extrabold leading-none text-snow/[0.05] transition-colors duration-500 group-hover:text-brand/20"
                          >
                            {String(i + 2).padStart(2, "0")}
                          </span>
                          <p className="font-display relative text-base font-bold leading-snug text-snow">
                            {item}
                          </p>
                        </div>
                      </Rise>
                    </li>
                  ))}
                </ol>
              </li>

              {/* 08. The one where nothing is committed to yet. */}
              <li>
                <Rise delay={0.1}>
                  <div className="flex items-baseline gap-4 rounded-2xl border border-line bg-ink-2 p-6 sm:p-7">
                    <span
                      aria-hidden
                      className="font-display shrink-0 text-xs font-bold tabular-nums text-ash"
                    >
                      08
                    </span>
                    <p className="font-display text-[clamp(1.05rem,1.9vw,1.45rem)] font-extrabold uppercase leading-[1.16] text-snow">
                      {c.cases.items[7]}
                    </p>
                  </div>
                </Rise>
              </li>
            </ol>

            <Rise delay={0.12} className="mt-8 border-t border-line pt-7">
              <p className="max-w-3xl border-l-2 border-brand pl-6 leading-relaxed text-snow sm:pl-7 sm:text-lg">
                {c.cases.caveat}
              </p>
            </Rise>

            {/* Where the document sends readers next. */}
            <Rise delay={0.16} className="mt-8">
              <p className="max-w-3xl text-sm leading-relaxed text-fog">
                {c.relatedServices.lead} {c.relatedServices.sentenceLead}{" "}
                <Link
                  href={c.relatedServices.links[0].href}
                  className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
                >
                  {c.relatedServices.links[0].label}
                </Link>
                {c.relatedServices.sentenceMid}{" "}
                <Link
                  href={c.relatedServices.links[1].href}
                  className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
                >
                  {c.relatedServices.links[1].label}
                </Link>
                .
              </p>
            </Rise>
          </Container>
        </section>

        {/* Why clients come to us. Six claims against whatever the document
            gives for each, sharing the ledger the Instagram page uses. The
            sixth is a refusal and is lifted out of the ledger, because set as
            row six of six it reads as an afterthought when it is the line that
            decides whether a reader believes the other five. */}
        <ClaimLedger
          id="why-enh"
          label="Why Clients Come to Us"
          index="04"
          tone="plain"
          markVariant="growth"
          mark="Six reasons, one of them a refusal"
          title={c.why.title}
          strokeTitle={c.why.strokeTitle}
          items={c.why.items}
          accentAt={c.why.items.length - 1}
        />

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
        />

        <Work index="05" label="Summits Reached" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Tell Us What You're Driving Traffic To"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          whatsapp={whatsapp}
          whatsappLabel="Chat on WhatsApp"
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

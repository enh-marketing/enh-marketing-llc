"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/aeo-geo";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { AnswerStream } from "@/components/service/AnswerStream";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { GoogleGuidance } from "@/components/service/GoogleGuidance";
import { AssistantMatrix } from "@/components/service/AssistantMatrix";
import { CapabilityCarousel } from "@/components/service/CapabilityCarousel";
import { StageLadder } from "@/components/service/StageLadder";
import { PromiseLedger } from "@/components/service/PromiseLedger";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { GrowthCta } from "@/components/service/GrowthCta";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/seo/aeo-and-geo";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function AeoGeoPage() {
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
          formSubmitLabel="Request a Quote"
          visual={<AnswerStream key="stream" />}
        />

        {/* The scene the document opens on, decoded as you scroll. The
            assistants it names light up as the paragraph resolves, which is the
            page's subject arriving in its own sentence. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.scenario}
          questionEmphasis={c.narrative.scenarioEmphasis}
          body={c.narrative.body}
          highlight={["ChatGPT", "Perplexity", "Gemini", "Copilot"]}
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

        {/* The two acronyms, pinned to the two ends of the object they name.
            AEO is about being the source an assistant draws on; GEO is about
            the answer it generates. One pipeline, two labels — which is the
            section's argument, given as a picture before it is given as prose.

            The panel keeps the decode: the expansion with its shared tail
            dimmed, so "much the same thing" stays visible in the words too. */}
        <PinnedExplorer
          id="acronyms"
          label="What These Acronyms Mean"
          index="01"
          title={c.acronyms.title}
          strokeTitle={c.acronyms.strokeTitle}
          tone="ink-2"
          diagramSide="left"
          mark={{ variant: "contrast", label: "Two coined terms, one real question" }}
          items={c.acronyms.terms.map((t) => ({
            no: t.short,
            title: `${t.short}, ${t.expansion}`,
            body: t.body,
            expansion: t.expansion,
            glyph: t.glyph,
          }))}
          diagram={{ kind: "answer" }}
        >
          {/* A claim with nobody to attribute it to. */}
          <div className="mt-12 grid items-start gap-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <Rise>
              <p className="leading-relaxed text-fog sm:text-lg">{c.acronyms.caveat}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-[0.65rem] font-semibold uppercase text-ash">
                  Not issued by
                </span>
                {["Google", "OpenAI"].map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ash line-through decoration-brand/70 decoration-2"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </Rise>

            <Rise delay={0.1}>
              <div className="border-l-2 border-brand pl-7 sm:pl-9">
                <p className="text-xs font-semibold uppercase text-brand-text">
                  The real question
                </p>
                <p className="font-display mt-5 text-[clamp(1.25rem,2.3vw,1.9rem)] font-extrabold uppercase leading-[1.15] text-snow">
                  {c.acronyms.question}
                </p>
              </div>
            </Rise>
          </div>
        </PinnedExplorer>

        <GoogleGuidance
          id="google"
          label="What Google Says"
          index="02"
          title={c.google.title}
          strokeTitle={c.google.strokeTitle}
          intro={c.google.intro}
          quotes={c.google.quotes}
          source="Google Search Central"
          eligibilityLead={c.google.eligibilityLead}
          conditions={c.google.conditions}
          eligibilityVerdict={c.google.eligibilityVerdict}
          fanout={c.google.fanout}
          closing={c.google.closing}
          closingEmphasis={c.google.closingEmphasis}
        />

        <AssistantMatrix
          id="assistants"
          label="Where Assistants Get Answers"
          index="03"
          title={c.assistants.title}
          strokeTitle={c.assistants.strokeTitle}
          columns={c.assistants.columns}
          rows={c.assistants.rows}
          closing={c.assistants.closing}
        />

        {/* The same coverflow the Meta Ads page uses for "What We Actually Do".
            Seven parallel items with a glyph each is exactly what it was built
            for, so it is reused rather than reimplemented. */}
        <CapabilityCarousel
          id="levers"
          label="What Moves the Needle"
          index="04"
          title={c.levers.title}
          strokeTitle={c.levers.strokeTitle}
          items={c.levers.items}
        />

        {/* The same sticky rail the Meta Ads page uses for its process. Stage
            five is open-ended — "same prompts, same intervals" — so the tail is
            drawn as a continuation rather than a full stop. */}
        <StageLadder
          id="process"
          label="How We Work On It"
          index="05"
          title="How We"
          strokeTitle="Work On It"
          stages={c.stages}
        />

        {/* Who needs this — a qualifying list, and a line saying who does not.
            Kept deliberately plain: it sits between two of the page's heaviest
            compositions and its job is to let the reader breathe. */}
        <section
          id="audience"
          data-section="Who Needs This Now"
          className="relative overflow-x-clip py-14 sm:py-16"
        >
          <Container className="relative">
            <SectionHeader
              index="06"
              title={c.audience.title}
              strokeTitle={c.audience.strokeTitle}
              mark={{ variant: "ecosystem", label: "Four kinds of buyer who research first" }}
              className="mb-14"
            />

            <ul className="grid gap-x-14 gap-y-8 sm:grid-cols-2">
              {c.audience.items.map((item, i) => (
                <li
                  key={item}
                  className="border-l-2 border-brand/40 pl-6 transition-colors duration-500 hover:border-brand sm:pl-7"
                >
                  <Rise delay={(i % 2) * 0.07}>
                    <p className="font-display text-lg font-bold leading-snug text-snow sm:text-xl">
                      {item}
                    </p>
                  </Rise>
                </li>
              ))}
            </ul>

            {/* The disqualifier. The document volunteers it, so the page does
                not bury it. */}
            <Rise delay={0.12} className="mt-12">
              <p className=" border-l-2 border-line pl-6 text-lg italic leading-relaxed text-fog sm:pl-7">
                {c.audience.caveat}
              </p>
            </Rise>
          </Container>
        </section>

        <PromiseLedger
          id="promise"
          label="What We Will and Will Not Promise"
          index="07"
          title={c.promise.title}
          strokeTitle={c.promise.strokeTitle}
          willNotLabel={c.promise.willNotLabel}
          willNot={c.promise.willNot}
          willLabel={c.promise.willLabel}
          will={c.promise.will}
          method={c.promise.method}
          cta={c.promise.cta}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
        />

        <GrowthCta
          heading={c.growthCta.heading}
          support={c.growthCta.support}
          button={c.growthCta.button}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
        />

        <Work index="08" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="09" faqs={c.faqs} />

        <CtaBand
          label="Find Out If AI Assistants Mention You"
          index="10"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel="Request a Quote"
          whatsapp={whatsapp}
          whatsappLabel="Chat on WhatsApp"
        />

        <Insights index="11" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

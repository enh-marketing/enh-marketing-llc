"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/seo-content-creation";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rise } from "@/components/fx/Reveal";
import { ServiceHero } from "@/components/service/ServiceHero";
import { PagePurpose } from "@/components/service/PagePurpose";
import { Narrative } from "@/components/service/Narrative";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { ContentPipeline } from "@/components/service/ContentPipeline";
import { AgreedScope } from "@/components/service/AgreedScope";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/services/seo/seo-content-creation";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

export function SeoContentCreationPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The hero visual is the page's argument, not decoration: a page with
            keywords on it that still fails, and the three things it actually
            has to do. Its accessible name is the client sentence it draws,
            handed in from the content file so the two cannot drift apart. */}
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
          formSubmitLabel={c.narrative.primary}
          visual={<PagePurpose key="purpose" label={c.narrative.requirements} />}
        />

        {/* The refusal first, then the three requirements it leaves standing.
            The three are marked inside the sentence rather than lifted out as
            three cards: the document writes them as one clause and splitting
            them would print the same words twice. */}
        <Narrative
          id="story"
          label="Narrative"
          headline={c.narrative.heading}
          question={c.narrative.definition}
          questionEmphasis={c.narrative.definitionEmphasis}
          body={c.narrative.services}
          highlight={c.narrative.servicesHighlight}
          outro={[c.narrative.requirements, c.narrative.beforeWriting]}
          closing={c.narrative.agency}
        >
          <Rise delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
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

        {/* The five kinds of content, on the same layout the formats section
            uses: one named selector above, the drawing beside the panel, the
            pins on the drawing as indicators, and every body stacked below the
            large breakpoint. The drawing is this page's own -- a site plan,
            because the document describes five parts of one website rather
            than five alternatives. The blog entry's last sentence rides as its
            note: the document ends that entry by demoting it, and note is
            exactly the slot for a sentence a source singles an item out with. */}
        <PinnedExplorer
          id="covers"
          label="What Our SEO Content Creation Covers"
          index="01"
          title={c.covers.title}
          strokeTitle={c.covers.strokeTitle}
          items={c.covers.items.map((i) => ({
            no: i.no,
            title: i.title,
            body: i.body,
            glyph: i.glyph,
            note: i.standout,
          }))}
          tone="ink-2"
          diagramSide="right"
          diagram={{ kind: "siteplan" }}
        />

        {/* The seven stages, drawn as the one artifact they are making. The
            document names it at stage five, so the section holds a brief on
            screen and changes its state rather than listing steps. */}
        <ContentPipeline
          id="process"
          label="How Our SEO Content Process Works"
          index="02"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* The scope drawn as the line it draws: one continuous boundary with a
            station on it per clause, traversed sideways while the section
            holds. It breaks before the twelfth, which stands outside it,
            because that clause is the agreement naming its own limit. */}
        <AgreedScope
          id="promises"
          label="What You Get From ENH Marketing"
          index="03"
          title={c.promises.title}
          strokeTitle={c.promises.strokeTitle}
          lead={c.promises.lead}
          listLead={c.promises.listLead}
          items={c.promises.items}
          tail={c.promises.tail}
          tailMark={c.promises.tailMark}
        />

        {/* The same growth CTA every other service page carries. The document
            supplies one CTA block, so this takes its heading, its ask and its
            primary label; the form band at the foot takes the document's other
            CTA line as its body, so the two are not word-for-word identical.
            A distinct heading here would have to come from the client. */}
        <GrowthCta
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.body}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
        />

        {/* This document, unusually, gives the work section a real sentence
            instead of a bracketed instruction, so it is printed. */}
        <Work index="04" label="Summits Reached" ctaHref="#quote" lede={c.work.lead} />

        <FaqList label="FAQs" index="05" faqs={c.faqs} />

        <CtaBand
          label="Build Website Content Around What Customers Need"
          index="06"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.narrative.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.narrative.secondary}
        />

        <Insights index="07" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

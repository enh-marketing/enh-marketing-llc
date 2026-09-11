"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/marketing-consultation";

import { Rise } from "@/components/fx/Reveal";
import { Marked } from "@/components/service/Marked";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { BriefFrame } from "@/components/service/BriefFrame";
import { Narrative } from "@/components/service/Narrative";
import { CoverageSurvey } from "@/components/service/CoverageSurvey";
import { PracticeLedger } from "@/components/service/PracticeLedger";
import { SectorCatalogue } from "@/components/service/SectorCatalogue";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/marketing-consultations-strategies-dubai";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Marketing Consultation — the first page on this site that sells a decision
 *  rather than a channel.
 *
 *  WHAT THAT CHANGES. Every service and industry page here opens by naming a
 *  thing it will do and closes by naming what it produces. This document opens
 *  by saying the reader already has too many things they could do: "Businesses
 *  rarely struggle because they have no marketing options. The problem is
 *  deciding which options deserve their time and budget." So the page is built
 *  around the two halves of that sentence -- four questions nobody has
 *  answered, and the ordered plan that answering them produces -- and its one
 *  visual idea is ORDER, taken from the only claim in the document that is
 *  this document's alone: "You receive a realistic order of work instead of a
 *  list where everything appears equally important."
 *
 *  SO NO SHAPE HERE IS BORROWED FROM A SIBLING PAGE. The banner is a plan cut
 *  to fit four limits, because the banner sentence names four limits and not
 *  four inputs. The opening section is a board of four unresolved mechanisms,
 *  because the four questions the document asks are four different KINDS of
 *  question -- a choice, an order, a selection, a fault -- and answering any
 *  of them here would be inventing the consultation's finding. The coverage
 *  section is one ruled sheet at nine unequal spans rather than nine cards,
 *  because those nine are sections of one document and the registers buried
 *  in their prose are the substance. The "why choose" run is split at the seam
 *  the document's own sentences share -- a position, and the reason for it --
 *  and closes on the client's own comparison, drawn. The industries section
 *  invents nothing per sector because the document places nothing there.
 *
 *  NO RESULTS BAND, NO MID-PAGE CTA BAND, NO PROCESS SECTION. The document
 *  supplies exactly one figure ("more than 15 years"), no client outcomes, no
 *  stages and no calls to action between the banner and the closing block.
 *  ResultStats, GrowthCta and a process rail would each need copy that is not
 *  in the file, so none of them is here.
 *
 *  THE FAQ IS THE PROCESS SECTION. Eight of the ten answers are about how an
 *  engagement actually runs -- account access, reviewing an incumbent agency,
 *  working alongside an internal team, timeframe, fee, the proposal -- and
 *  that is the only place the document describes the work. It is left where
 *  the document puts it rather than lifted into a stage rail that would have
 *  to invent the stages. */
export function MarketingConsultationPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The banner drawing is the banner sentence: a plan cut to fit four
            stated limits, with one entry first. */}
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
          visual={<BriefFrame key="brief" label={c.hero.sub} />}
        />

        {/* TEAM DIRECTION, 2026-09-11: the treatment the SEO audit page uses
            for its story section, asked for by name.
            
            IT FITS THIS BLOCK BETTER THAN THE PAGE IT WAS WRITTEN FOR. The
            effect is a paragraph that arrives blurred and resolves as the
            reader scrolls, and the thing being resolved here is four questions
            nobody has answered -- so the decode is the section's subject
            rather than an effect laid over it. The four arrive as `body`,
            which `Narrative` sets as numbered lines precisely because a source
            that lists several distinct things should not have them flattened
            into one run-on sentence.
            
            EVERY SENTENCE THE DOCUMENT HAS IN THIS BLOCK IS HERE, IN ITS
            ORDER: the claim as the heading, the problem as the question, the
            four as the decoded lines, the consultant and the review as the
            paragraphs after it, the prioritised strategy as the closing
            statement with the page's own thesis in brand, and the three things
            a consultation can be for underneath. */}
        <Narrative
          id="priority"
          label="Stop Spending Without a Clear Marketing Priority"
          index="01"
          headline={[c.opening.title, c.opening.strokeTitle]}
          question={c.opening.lede}
          questionEmphasis={c.opening.ledeMark[0]}
          body={[...c.opening.questions]}
          // The options being weighed, lit as the lines resolve. Every one of
          // them is a word the client wrote inside one of the four questions.
          highlight={["SEO", "advertising", "website", "traffic", "platforms", "campaign", "offer", "content", "process"]}
          outro={[c.opening.consultant, c.opening.reviews]}
          closing={c.opening.strategy}
          closingMark={[c.opening.first]}
        >
          <Rise delay={0.1} className="mt-9">
            <p className="max-w-2xl border-l-2 border-brand/40 pl-5 text-sm leading-relaxed text-ash">
              <Marked
                text={c.opening.modes}
                mark={c.opening.modesMark}
                className="font-semibold text-fog"
              />
            </p>
          </Rise>
        </Narrative>

        {/* Nine areas, drawn as the one business they are nine readings of.
            A survey of it gets drawn as the reader scrolls, and by the ninth
            the plan is finished -- which is the document's own last sentence,
            about processes that could be connected. */}
        <CoverageSurvey
          id="covers"
          label="What Our Marketing Consultation Covers"
          index="02"
          title={c.coverage.title}
          strokeTitle={c.coverage.strokeTitle}
          items={c.coverage.items}
        />

        {/* Six positions and the reason for each, split at the seam the
            document's own sentences share, closing on the comparison the
            client writes rather than on a seventh claim. */}
        <PracticeLedger
          id="why"
          label="Why Choose ENH Marketing for Marketing Consultation in Dubai"
          index="03"
          title={c.why.title}
          strokeTitle={c.why.strokeTitle}
          survive={c.why.survive}
          surviveMark={c.why.surviveMark}
          experience={c.why.experience}
          experienceMark={c.why.experienceMark}
          items={c.why.items}
          ask={c.why.ask}
          askMark={c.why.askMark}
          verdict={c.why.verdict}
        />

        {/* TEAM DIRECTION, 2026-09-11: the treatment the ecommerce SEO page
            uses for its sectors, asked for by name. Twelve names with nothing
            attached to them, set inside this page's own native object -- the
            strategy document -- with a mark for each and the document's two
            closing sentences as a note on the whole listing rather than sorted
            into it. See SectorCatalogue. */}
        <SectorCatalogue
          id="industries"
          label="Industries We Work With"
          index="04"
          title={c.industries.title}
          strokeTitle={c.industries.strokeTitle}
          lead={c.industries.lead}
          items={c.industries.items}
          rule={c.industries.rule}
          note={c.industries.contrast}
          noteMark={[...c.industries.contrastWho, ...c.industries.contrastWhat]}
        />

        <Work index="05" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="06" faqs={c.faqs} />

        <CtaBand
          label="Get a Clearer Direction for Your Marketing"
          index="07"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="08" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

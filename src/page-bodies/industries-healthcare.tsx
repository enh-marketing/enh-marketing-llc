"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/industries/healthcare";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { ConsiderationSet } from "@/components/service/ConsiderationSet";
import { PatientResearch } from "@/components/service/PatientResearch";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { DecisionWeights } from "@/components/service/DecisionWeights";
import { TreatmentPlan } from "@/components/service/TreatmentPlan";
import { PatientRecord } from "@/components/service/PatientRecord";
import { FigureSheet } from "@/components/service/FigureSheet";
import { Caveat } from "@/components/service/Caveat";
import { PracticeShapes } from "@/components/service/PracticeShapes";
import { CheckRegister } from "@/components/service/CheckRegister";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/industries/healthcare";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Healthcare — the fifth page under Industries.
 *
 *  WHAT THIS DOCUMENT HAS THAT ITS FOUR SIBLINGS DO NOT, AND WHY EVERY SHAPE ON
 *  THE PAGE COMES OUT OF IT. One sentence: "Patients may research several
 *  treatments and providers before deciding who to contact." One person,
 *  several providers, held at once. Ecommerce & Retail runs one route with
 *  three leaks; Hospitality & Hotels fans one arrival into six endings;
 *  Automotive draws two journeys of very different length; Logistics has
 *  several people making several passes at one supplier. This page is the only
 *  one whose reader is holding a shortlist, so the banner is a shortlist and
 *  nothing else on the page repeats it.
 *
 *  AND ONE LIMIT, WHICH NO OTHER INDUSTRY DOCUMENT ON THIS SITE IMPOSES: "The
 *  website must explain services clearly without creating confusion or making
 *  unsupported promises." That sentence is why the results section has nine
 *  equal cells and no axis, why every hedge the client wrote is printed beside
 *  the figure it qualifies, why the drawing of the five contributions ranks
 *  none of them, and why the "why choose" section closes on three questions the
 *  reader should ask of us rather than on an eighth claim.
 *
 *  THE CLIENT ALSO TYPED A CHAIN -- "Search -> Research -> Trust -> Appointment"
 *  -- and the logistics document typed the same four words ending at "Enquiry".
 *  That page built a rail with three unsynchronised markers on it, because its
 *  own next sentence says the chain is walked several times by several people.
 *  This document says nothing of the kind, so the chain here is set as type,
 *  the client's arrows carry the light, and the motion goes to the five things
 *  the decision is actually made of.
 *
 *  SO NO SHAPE HERE IS BORROWED. The banner is a consideration set. The opening
 *  is a research run with four stops, one per subject the client names, and it
 *  stops short of the provider because the sentence under it ends "before
 *  contacting a provider". The services run the pinned explorer the team asked
 *  for, with a drawing of its own: one clinic's presence during a patient's
 *  research, including an approval gate that exists because the client wrote
 *  one. The process is a plan being written -- three priorities, three sockets
 *  each, filled by the stages that describe filling them. The measures are a
 *  sheet whose first two cells are wider because the client's own closing
 *  sentence names those two. The results are nine equal cells. The audience is
 *  nine providers each carrying the structure its own words license -- and five
 *  carrying none, captioned by the client's sentence about what the shape is
 *  actually decided by, because the document places them by nothing. And the
 *  seven reasons are ticked while the three checks are not.
 *
 *  NO RESULTS BAND ABOVE THE FOLD. The four-figure ResultStats band exists for
 *  documents that supply headline numbers and no results section. This one has
 *  nine figures with a section of its own and three more in its opening
 *  paragraph -- the client's own repetition, left alone rather than edited out.
 *  Lifting four into a band would print the same digits a third time.
 *
 *  NO MID-PAGE CTA BAND. The document writes two calls to action in its banner
 *  and two in its closing block, and nothing in between. GrowthCta needs a
 *  heading, a support line and a button label, none of which is in the file. */
export function HealthcarePage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The banner drawing is the page's own subject: a set of providers
            under consideration, one of them legible, one appointment slot held
            open under the column. */}
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
          visual={<ConsiderationSet key="set" label={c.hero.sub} />}
        />

        {/* Four research subjects, four marks, one open end — and the four
            nouns in the client's sentence are the run's own control. */}
        <PatientResearch
          id="enquiries"
          label="How Does Healthcare Digital Marketing Generate Patient Enquiries?"
          index="01"
          title={c.opening.title}
          strokeTitle={c.opening.strokeTitle}
          lead={c.opening.lead}
          subjects={c.opening.subjects}
          structure={c.opening.structure}
          dimensions={c.opening.dimensions}
          actions={c.opening.actions}
          outcomes={c.opening.outcomes}
          figures={c.opening.figures}
          figuresMark={c.opening.figuresMark}
        />

        {/* Six services, and every one of them works a different part of the
            same presence. The pins stand where each service acts, so choosing a
            service and pointing at the thing it changes are one gesture. The
            selector above the drawing carries all six names, so nothing is
            hidden to buy the picture. */}
        <PinnedExplorer
          id="services"
          label="Our Healthcare Digital Marketing Services"
          index="02"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items.map((s) => ({
            // The selector prints `no` as written, and the content file numbers
            // these 1 to 6 for the components that pad it themselves.
            no: s.no.padStart(2, "0"),
            title: s.title,
            body: s.body,
          }))}
          diagram={{ kind: "clinic" }}
          diagramSide="right"
        />

        {/* Four claims of four different kinds, and the five things the
            decision is made of. */}
        <DecisionWeights
          id="different"
          label="Why Is Healthcare Digital Marketing Different?"
          index="03"
          title={c.difference.title}
          strokeTitle={c.difference.strokeTitle}
          basis={c.difference.basis}
          basisItems={c.difference.basisItems}
          shortlist={c.difference.shortlist}
          shortlistMark={c.difference.shortlistMark}
          constraint={c.difference.constraint}
          constraintMark={c.difference.constraintMark}
          contribution={c.difference.contribution}
          contributors={c.difference.contributors}
          journeyStem={c.difference.journeyStem}
          journey={c.difference.journey}
          verdict={c.difference.verdict}
          verdictMark={c.difference.verdictMark}
        />

        {/* Five stages, one plan, and exactly one thing being worked at each
            stage — the thing that stage's own sentence describes. */}
        <TreatmentPlan
          id="process"
          label="How Our Healthcare Marketing Process Works"
          index="04"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* Twelve measures, and the two the client's own closing sentence
            names by name. */}
        <PatientRecord
          id="measure"
          label="What We Measure"
          index="05"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          lead={c.measure.lead}
          leadMark={c.measure.leadMark}
          headTrack={c.measure.headTrack}
          headTells={c.measure.headTells}
          rows={c.measure.rows}
          noteFind={c.measure.noteFind}
          noteUseful={c.measure.noteUseful}
          noteUsefulMark={c.measure.noteUsefulMark}
        />

        {/* Nine figures, nine equal cells, every hedge kept. No axis: the
            caveat under it says these come from different providers,
            treatments and periods. */}
        <FigureSheet
          id="results"
          label="Healthcare Campaign Results"
          index="06"
          title={c.results.title}
          strokeTitle={c.results.strokeTitle}
          lead={c.results.lead}
          items={c.results.items}
        />

        {/* And what those figures are not. The document's own three sentences,
            in the band this site keeps for a limit. */}
        <Caveat
          id="caveat"
          label="Honest Caveat"
          lead={c.caveat.lead}
          emphasis={c.caveat.emphasis}
          commitment={c.caveat.commitment}
        />

        {/* Nine kinds of provider, each carrying the structure its own words
            license — and five of them carrying none, because the document
            places none. Choosing a provider redraws the structure and prints
            the sentence it was read from. */}
        <PracticeShapes
          id="audience"
          label="Who We Work With"
          index="07"
          title={c.audience.title}
          strokeTitle={c.audience.strokeTitle}
          lead={c.audience.lead}
          items={c.audience.items}
          defaultIndex={c.audience.defaultIndex}
          sources={c.audience.sources}
        />

        {/* Seven ticked, three left open. */}
        <CheckRegister
          id="why"
          label="Why Choose ENH Marketing for Healthcare Marketing?"
          index="08"
          title={c.why.title}
          strokeTitle={c.why.strokeTitle}
          lead={c.why.lead}
          leadMark={c.why.leadMark}
          items={c.why.items}
          itemMarks={c.why.itemMarks}
          checkStem={c.why.checkStem}
          checks={c.why.checks}
          tail={c.why.tail}
          tailMark={c.why.tailMark}
          scope={c.why.scope}
        />

        <Work index="09" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="10" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Which Healthcare Services You Want to Promote"
          index="11"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
          whatsapp={whatsapp}
          whatsappLabel={c.finalCta.secondary}
        />

        <Insights index="12" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

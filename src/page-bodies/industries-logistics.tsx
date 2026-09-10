"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/industries/logistics";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { CrossDock } from "@/components/service/CrossDock";
import { EnquiryBrief } from "@/components/service/EnquiryBrief";
import { PinnedExplorer } from "@/components/service/PinnedExplorer";
import { ResearchRounds } from "@/components/service/ResearchRounds";
import { PriorityRun } from "@/components/service/PriorityRun";
import { MeasureBoard } from "@/components/service/MeasureBoard";
import { FigureManifest } from "@/components/service/FigureManifest";
import { Caveat } from "@/components/service/Caveat";
import { OperatorCards } from "@/components/service/OperatorCards";
import { PositionRun } from "@/components/service/PositionRun";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

const HREF = "/industries/logistics";
const FORM_TITLE = `${c.finalCta.title} ${c.finalCta.strokeTitle}`;

/** Logistics — the fourth page under Industries.
 *
 *  WHAT THIS DOCUMENT HAS THAT ITS THREE SIBLINGS DO NOT, AND WHY EVERY SHAPE
 *  ON THE PAGE COMES OUT OF IT. The client typed a diagram: "Search → Research
 *  → Trust → Enquiry". Four words, three arrows, printed in the middle of the
 *  section that asks why this industry is different. Nothing on the other three
 *  industry pages is that explicit, so the page is built around it rather than
 *  around a metaphor of ours.
 *
 *  AND THE SENTENCE BESIDE IT SAYS THE CHAIN IS NOT WALKED ONCE: "The buying
 *  process may involve procurement teams, operations managers and several
 *  rounds of evaluation before an enquiry becomes a contract." That is the one
 *  claim that separates this document from all three siblings. Ecommerce &
 *  Retail runs one route with three leaks; Hospitality & Hotels fans one
 *  arrival into six endings; Automotive draws two journeys of very different
 *  length. All of them are walked once, by one person. This one has several
 *  people making several passes, which is why the chain carries three
 *  unsynchronised markers instead of one traveller.
 *
 *  SO NO SHAPE HERE IS BORROWED. The banner is a cross-dock rather than a road
 *  plan, a duct or a fan, because the sentence it draws is four channels in and
 *  three actions out — not a narrowing. The services run the pinned explorer
 *  the ecommerce industry page runs, which is the arrangement the team asked
 *  for, with a drawing of its own: one freight company's presence during
 *  supplier research, six regions, and each service's pin standing on the part
 *  it works. Its selector carries all six names above the drawing, so the
 *  picture costs the reader nothing, and the drawing borrows none of the
 *  store's furniture — no category tree, no product shelf, no checkout column,
 *  no measurement rail. The process is one
 *  floor in five frames working the same set of units, because this document's
 *  process chooses, builds and then re-chooses rather than moving one thing
 *  along a line. The measures are a board whose twelfth cell is the reading of
 *  the other eleven. The results carry a notation for the three kinds of claim
 *  the client actually wrote — floors, one ceiling and three ranges. The
 *  audience section and the "why choose" section are the two on this page whose
 *  content is a list with no data behind it — nine operator names and seven
 *  single assertions, with no figure or detail attached to any of them — so
 *  neither invents a shape. They take the house treatments: the site's card at
 *  nine unequal widths, and the ruled two-column run every other pillar and
 *  industry page closes on. What each adds is the one thing its own document
 *  has: a closing sentence that names two of the nine, wired as the register's
 *  control, and a scope sentence that says how wide the engagement can be.
 *
 *  NO RESULTS BAND ABOVE THE FOLD. The four-figure ResultStats band exists for
 *  documents that supply headline numbers and no results section. This one has
 *  ten figures with a section of its own and three more in its opening
 *  paragraph — the client's own repetition, left alone rather than edited out.
 *  Lifting four into a band would print the same digits a third time.
 *
 *  NO MID-PAGE CTA BAND. The document writes two calls to action in its banner
 *  and two in its closing block, and nothing in between. GrowthCta needs a
 *  heading, a support line and a button label, none of which is in the file. */
export function LogisticsPage() {
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        {/* The banner drawing is the opening section's own sentence, in plan:
            four channels arriving at a dock, and three loads leaving it. */}
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
          visual={<CrossDock key="dock" label={c.opening.actions} />}
        />

        {/* The opening, set rather than drawn: the banner directly above it is
            already this section's picture, and two lists in one sentence are
            better separated by weight than by a second diagram. */}
        <EnquiryBrief
          id="enquiries"
          label="How Digital Marketing Helps Logistics Companies Generate Enquiries"
          index="01"
          title={c.opening.title}
          strokeTitle={c.opening.strokeTitle}
          lead={c.opening.lead}
          leadMark={c.opening.leadMark}
          actions={c.opening.actions}
          channels={c.opening.channels}
          outcomes={c.opening.outcomes}
          structure={c.opening.structure}
          dimensions={c.opening.dimensions}
          figures={c.opening.figures}
          figuresMark={c.opening.figuresMark}
        />

        {/* Six services, and every one of them works a different part of the
            same presence. The pins stand where each service acts, so choosing
            a service and pointing at the thing it changes are one gesture. The
            selector above the drawing carries all six names, so nothing is
            hidden to buy the picture. */}
        <PinnedExplorer
          id="services"
          label="Our Logistics Digital Marketing Services"
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
          diagram={{ kind: "freight" }}
          diagramSide="right"
        />

        {/* The client's own chain, at the scale their arrows imply, walked
            three times over because their next sentence says it is. */}
        <ResearchRounds
          id="different"
          label="Why Is Logistics Digital Marketing Different"
          index="03"
          title={c.difference.title}
          strokeTitle={c.difference.strokeTitle}
          basis={c.difference.basis}
          basisItems={c.difference.basisItems}
          rounds={c.difference.rounds}
          roundsMark={c.difference.roundsMark}
          generic={c.difference.generic}
          requirement={c.difference.requirement}
          requirements={c.difference.requirements}
          journeyStem={c.difference.journeyStem}
          journey={c.difference.journey}
          verdict={c.difference.verdict}
          verdictMark={c.difference.verdictMark}
        />

        {/* Five stages, one set of units, five frames of the same floor. */}
        <PriorityRun
          id="process"
          label="How Our Logistics Marketing Process Works"
          index="04"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.stages}
        />

        {/* Eleven measures, and the reading of the eleven in the twelfth
            cell — the one sentence in the section that ranks anything. */}
        <MeasureBoard
          id="measure"
          label="What We Measure"
          index="05"
          title={c.measure.title}
          strokeTitle={c.measure.strokeTitle}
          lead={c.measure.lead}
          headTrack={c.measure.headTrack}
          headTells={c.measure.headTells}
          rows={c.measure.rows}
          noteVisibility={c.measure.noteVisibility}
          noteUseful={c.measure.noteUseful}
          noteUsefulMark={c.measure.noteUsefulMark}
        />

        {/* Ten figures and three kinds of claim, each glossed by the client's
            own hedge beside its own mark. No axis: the caveat under it says
            these come from different businesses, markets and periods. */}
        <FigureManifest
          id="results"
          label="Logistics Campaign Results"
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

        {/* The house card, nine of them, at nine unequal widths — the same
            devices the hospitality page's register uses, because a reader
            should not be able to tell that a different person built this
            section. What this document adds is a closing sentence that names
            two of its own nine, so that sentence is the register's control:
            pointing at either operator brings its card forward on the card's
            own border, wipe and numeral. */}
        <OperatorCards
          id="audience"
          label="Who We Work With"
          index="07"
          title={c.audience.title}
          strokeTitle={c.audience.strokeTitle}
          lead={c.audience.lead}
          items={c.audience.items}
          note={c.audience.note}
          noteMark={c.audience.noteMark}
          contrast={c.audience.contrast}
          contrastMark={c.audience.contrastMark}
          contrastRows={c.audience.contrastRows}
        />

        {/* The treatment this site keeps for a run of single assertions:
            ruled rows, two columns, ghost numerals, one light walking the run,
            each claim's own specific marked where it stands. On a panel rather
            than bare on the page, which is what separates it from the
            automotive page's version of the same section. */}
        <PositionRun
          id="why"
          label="Why Choose ENH Marketing for Logistics Digital Marketing"
          index="08"
          title={c.why.title}
          strokeTitle={c.why.strokeTitle}
          lead={c.why.lead}
          leadMark={c.why.leadMark}
          items={c.why.items}
          itemMarks={c.why.itemMarks}
          scope={c.why.scope}
          scopeMark={c.why.scopeMark}
          tail={c.why.tail}
          tailMark={c.why.tailMark}
        />

        <Work index="09" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="10" faqs={c.faqs} />

        <CtaBand
          label="Tell Us Which Logistics Services You Want to Promote"
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

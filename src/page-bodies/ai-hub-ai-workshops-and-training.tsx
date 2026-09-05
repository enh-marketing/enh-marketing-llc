"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/ai-workshops-and-training";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { WorkshopLoop } from "@/components/service/WorkshopLoop";
import { Narrative } from "@/components/service/Narrative";
import { WorkshopStage } from "@/components/service/WorkshopStage";
import { SkillWall } from "@/components/service/SkillWall";
import { WorkshopOutput } from "@/components/service/WorkshopOutput";
import { TrainingRun } from "@/components/service/TrainingRun";
import { FollowUp } from "@/components/service/FollowUp";
import { TrainerGap } from "@/components/service/TrainerGap";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/* Drives <Breadcrumbs href={HREF} />. A subpage of the AI Hub, so the trail
   reads Home > AI Hub > AI Workshops & Training. See sitemap.ts. */
const HREF = "/ai-hub/ai-workshops-and-training";
const FORM_TITLE = c.hero.primary;

export function AiWorkshopsAndTrainingPage() {
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
          visual={<WorkshopLoop key="loop" loop={c.hero.loop} />}
        />

        {/* "What We Do", on the site's own bridge section. The decode suits a
            page whose subject is learning to read AI output critically. */}
        <Narrative
          id="story"
          label="What We Do"
          headline={c.narrative.heading}
          question={c.narrative.scene}
          questionEmphasis={c.narrative.sceneEmphasis}
          body={c.narrative.body}
          highlight={c.narrative.bodyEmphasis}
          outro={c.narrative.outro}
        />

        {/* Four formats, each drawn as the room it is held in, travelled
            through sideways while the section holds. */}
        <WorkshopStage
          id="formats"
          label="Our AI Workshop Formats in Dubai"
          index="01"
          title={c.formats.title}
          strokeTitle={c.formats.strokeTitle}
          items={c.formats.items}
        />

        {/* Twelve verbs at display scale, because the verbs are the answer. */}
        <SkillWall
          id="skills"
          label="What Your Team Learns to Do With AI"
          index="02"
          title={c.skills.title}
          strokeTitle={c.skills.strokeTitle}
          lead={c.skills.lead}
          intro={c.skills.intro}
          items={c.skills.items}
          note={c.skills.note}
        />

        {/* The shortlist drawn as the sheet it is, ranked against the two axes
            the document names, with the rest of the pack beside it. */}
        <WorkshopOutput
          id="receive"
          label="What You Receive After the Workshop"
          index="03"
          title={c.receive.title}
          strokeTitle={c.receive.strokeTitle}
          lead={c.receive.lead}
          intro={c.receive.intro}
          items={c.receive.items}
          keep={c.receive.keep}
          closing={c.receive.closing}
        />

        {/* Six steps, four of which happen before anyone is in a room. The
            shared StageLadder renders six identical bordered cards, which is
            the arrangement this client rejected by name; it is right for the
            five live pages that use it, so this page has its own instead. */}
        <TrainingRun
          id="process"
          label="How the AI Training Programme Works"
          index="04"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.items}
          dayAt={c.process.dayAt}
        />

        {/* Follow-up, drawn as the doubling back the section describes. */}
        <FollowUp
          id="follow-up"
          label="Keeping the Training Useful After the Session"
          index="05"
          title={c.followUp.title}
          strokeTitle={c.followUp.strokeTitle}
          lead={c.followUp.lead}
          intro={c.followUp.intro}
          items={c.followUp.items}
          closing={c.followUp.closing}
        />

        {/* The page's argument: one run stops at recommendations, one keeps
            going into the build. */}
        <TrainerGap
          id="experience"
          label="AI Training Backed by Real Delivery Experience"
          index="06"
          title={c.experience.title}
          strokeTitle={c.experience.strokeTitle}
          trainer={c.experience.trainer}
          ours={c.experience.ours}
          closing={c.experience.closing}
        />

        {/* The house mid-page CTA, in the position every other service page
            puts it. It takes the closing block's invitation; the CtaBand at the
            foot takes the recommendation, so no sentence prints twice. */}
        <GrowthCta
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.invite}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="07" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="08" faqs={c.faqs} />

        <CtaBand
          label="Book an AI Workshop"
          index="09"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Insights index="10" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

"use client";

import { brand } from "@/lib/content";
import { Work } from "@/components/sections/Work";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Insights } from "@/components/sections/Insights";
import * as c from "@/content/services/conversational-ai";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ServiceHero } from "@/components/service/ServiceHero";
import { HandoverThread } from "@/components/service/HandoverThread";
import { Narrative } from "@/components/service/Narrative";
import { AgentScreens } from "@/components/service/AgentScreens";
import { DiagnosticSort } from "@/components/service/DiagnosticSort";
import { ProjectSpine } from "@/components/service/ProjectSpine";
import { AgentWatch } from "@/components/service/AgentWatch";
import { ConversationJoins } from "@/components/service/ConversationJoins";
import { GrowthCta } from "@/components/service/GrowthCta";
import { FaqList } from "@/components/service/FaqList";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/* Drives <Breadcrumbs href={HREF} />. A subpage of the AI Hub, so the trail
   reads Home > AI Hub > Conversational AI. See sitemap.ts. */
const HREF = "/ai-hub/conversational-ai";
const FORM_TITLE = c.hero.primary;

export function ConversationalAiPage() {
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
          visual={<HandoverThread key="thread" parties={c.hero.parties} />}
        />

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

        {/* Six services as the six screens they actually are, held full height
            while the scroll moves through them. Every label on every screen is
            a verbatim clause of that service's own paragraphs. */}
        <AgentScreens
          id="services"
          label="Our Conversational AI Services"
          index="01"
          title={c.services.title}
          strokeTitle={c.services.strokeTitle}
          items={c.services.items}
          screens={c.services.screens}
        />

        {/* The paid diagnostic, drawn as the sort it performs: eleven things
            reviewed, and the two the document turns into its conclusion. */}
        <DiagnosticSort
          id="diagnostic"
          label="Every Project Starts With a Conversational AI Diagnostic"
          index="02"
          title={c.diagnostic.title}
          strokeTitle={c.diagnostic.strokeTitle}
          lead={c.diagnostic.lead}
          intro={c.diagnostic.intro}
          items={c.diagnostic.items}
          output={c.diagnostic.output}
          yours={c.diagnostic.yours}
          paid={c.diagnostic.paid}
        />

        {/* Six steps, drawn around the fifth. The gutter is empty until the
            controlled launch, opens through it, and never resolves after: a
            reader can see when the agent starts talking to their customers
            without reading a word. */}
        <ProjectSpine
          id="process"
          label="How the Conversational AI Project Works"
          index="03"
          title={c.process.title}
          strokeTitle={c.process.strokeTitle}
          stages={c.process.items}
          liveAt={c.process.liveAt}
        />

        {/* The managed service, in the position it occupies: between two
            grounds that both move. */}
        <AgentWatch
          id="managed"
          label="Ongoing AI Agent Management"
          index="04"
          title={c.managed.title}
          strokeTitle={c.managed.strokeTitle}
          lead={c.managed.lead}
          intro={c.managed.intro}
          items={c.managed.items}
          drift={c.managed.drift}
          closing={c.managed.closing}
        />

        {/* GATE. "Builds We Have Delivered" is an instruction in the source,
            not content: two or three named builds with channel, conversations,
            connected systems and measured outcome, and "GATE: if real,
            permissioned examples are unavailable, this section should not be
            published." Nothing is rendered and nothing is invented. Supply
            approved builds and the section goes in here. */}

        <ConversationJoins
          id="joins"
          label="Conversational AI for Customer Service and Lead Handling"
          index="05"
          title={c.joins.title}
          strokeTitle={c.joins.strokeTitle}
          lead={c.joins.lead}
          claim={c.joins.claim}
          items={c.joins.items}
          closing={c.joins.closing}
        />

        {/* The house mid-page CTA. It takes the closing block's invitation; the
            CtaBand at the foot takes the recommendation and the note, so no
            sentence prints twice. */}
        <GrowthCta
          heading={[c.finalCta.title, c.finalCta.strokeTitle]}
          support={c.finalCta.invite}
          button={c.finalCta.primary}
          formTitle={FORM_TITLE}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Work index="06" label="Summits Reached" ctaHref="#quote" />

        <FaqList label="FAQs" index="07" faqs={c.faqs} />

        <CtaBand
          label="Book a Conversational AI Diagnostic"
          index="08"
          title={c.finalCta.title}
          strokeTitle={c.finalCta.strokeTitle}
          body={c.finalCta.body}
          note={c.finalCta.note}
          formFields={c.formFields}
          formSubmitLabel={c.finalCta.primary}
        />

        <Insights index="09" label="Insights" />
      </main>

      <StickyCTABar />
    </>
  );
}

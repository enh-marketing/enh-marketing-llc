"use client";

import { brand } from "@/lib/content";
import { finalCta, formFields, neighbours, relatedTo, type Study } from "@/content/case-studies";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CaseHero } from "@/components/case-studies/CaseHero";
import { CaseStory } from "@/components/case-studies/CaseStory";
import { CaseNav } from "@/components/case-studies/CaseNav";
import { RelatedCases } from "@/components/case-studies/RelatedCases";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/** One case study.
 *
 *  THE ORDER IS THE ORDER OF THE QUESTION A READER IS ASKING. What is this and
 *  what happened (the header, with the figures under it); who were they, what
 *  was wrong, what did we do, what changed (the story); where next (the two
 *  neighbours, then two more of the work); and the ask.
 *
 *  THE BREADCRUMB TRAIL STOPS AT CASE STUDIES. `trailFor` walks the sitemap,
 *  which is the site's IA and contains no per-study nodes, nor should it: the
 *  archive is content and not structure. So the trail reads Home › Case
 *  Studies and the study's own title is the <h1> under it, which is what the
 *  article route already does.
 *
 *  NOTHING ON THIS PAGE IS CONDITIONAL ON A FIGURE EXISTING, because every one
 *  of the twenty-two publishes four. What is conditional is the results sheet
 *  (AllDay has none upstream), the client's site (ten studies do not frame
 *  one) and the approach's named phases (one study writes them). Each of those
 *  sections is absent rather than empty where the source has nothing. */
export function CaseStudyPage({ study }: { study: Study }) {
  const { prev, next } = neighbours(study);
  const related = relatedTo(study, 2);
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <CaseHero study={study} breadcrumbs={<Breadcrumbs key="crumbs" href="/case-studies" />} />

        <CaseStory study={study} />

        <CaseNav prev={prev} next={next} />

        <RelatedCases studies={related} />

        <CtaBand
          label="Bring Us The Next One"
          index={finalCta.index}
          title={finalCta.title}
          strokeTitle={finalCta.strokeTitle}
          body={finalCta.body}
          note={finalCta.note}
          formFields={formFields}
          formSubmitLabel={finalCta.submitLabel}
          whatsapp={whatsapp}
          whatsappLabel={finalCta.whatsappLabel}
        />
      </main>

      <StickyCTABar label={finalCta.submitLabel} />
    </>
  );
}

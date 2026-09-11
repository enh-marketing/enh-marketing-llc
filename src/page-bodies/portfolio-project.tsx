"use client";

import { brand } from "@/lib/content";
import { finalCta, formFields, neighbours, relatedTo, type Project } from "@/content/portfolio";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectHero } from "@/components/portfolio/ProjectHero";
import { ProjectBody } from "@/components/portfolio/ProjectBody";
import { ProjectNav } from "@/components/portfolio/ProjectNav";
import { RelatedProjects } from "@/components/portfolio/RelatedProjects";
import { CtaBand } from "@/components/service/CtaBand";
import { StickyCTABar } from "@/components/service/StickyCTABar";

/** One portfolio project.
 *
 *  THE ORDER IS THE ORDER OF THE QUESTION A READER IS ASKING. What is this and
 *  who was it for (the header, with the record beside it); who they are and
 *  what was made (the body); where next (the two neighbours, then three more of
 *  the work); and the ask. It is `CaseStudyPage`'s sequence, with this
 *  archive's own middle chapter.
 *
 *  THE BREADCRUMB TRAIL STOPS AT PORTFOLIO. `trailFor` walks the sitemap, which
 *  is the site's IA and contains no per-project nodes, nor should it: the
 *  archive is content and not structure. So the trail reads Home › Portfolio and
 *  the project's own title is the <h1> under it.
 *
 *  THE CASE STUDY LINK IS RESOLVED IN THE ROUTE, not here. Twelve of the
 *  thirty-five link out to a study, and the studies are a separate content
 *  module; importing it into this island would ship all twenty-two of them with
 *  every portfolio page. The route passes down an href and a title, or nothing
 *  where the study has no page, which is the same "never link to a 404" rule
 *  `Crosslink` and `BUILT` apply everywhere else. */
export function PortfolioProjectPage({
  project,
  caseStudy,
}: {
  project: Project;
  caseStudy?: { href: string; title: string };
}) {
  const { prev, next } = neighbours(project);
  const related = relatedTo(project, 3);
  const whatsapp = `https://wa.me/${brand.whatsapp}`;

  return (
    <>
      <main>
        <ProjectHero
          project={project}
          caseStudy={caseStudy}
          breadcrumbs={<Breadcrumbs key="crumbs" href="/portfolio" />}
        />

        <ProjectBody project={project} />

        <ProjectNav prev={prev} next={next} />

        <RelatedProjects projects={related} />

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

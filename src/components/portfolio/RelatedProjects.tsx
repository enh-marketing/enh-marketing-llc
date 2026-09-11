"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { project as copy, type Project } from "@/content/portfolio";

/** WHAT TO LOOK AT NEXT: three projects, one row.
 *
 *  The same card as everywhere else in this section, three across, which is the
 *  archive's own grid so the row reads as more of it. Exactly what
 *  `RelatedCases` does for the case studies.
 *
 *  RELATEDNESS IS THE DISCIPLINE, AND IT IS REAL. `relatedTo` offers projects
 *  sharing a category first and fills from the archive's own order after that,
 *  so the first entry is a genuine relation and the section is never short.
 *  Nothing is scored, because nothing here can be.
 *
 *  No entrance animation and no layout animation: there is nothing to filter
 *  here, so a set that never changes would be paying for the layout engine to
 *  watch it. */
export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section
      id="related"
      data-section="Related Projects"
      className="relative overflow-x-clip py-16 sm:py-20"
    >
      <Container>
        <SectionHeader
          index={copy.relatedIndex}
          title={copy.relatedTitle}
          strokeTitle={copy.relatedStroke}
          className="mb-14"
        />

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug} id={`project-${project.slug}`} className="scroll-mt-28">
              <PortfolioCard project={project} position={project.order + 1} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseCard } from "@/components/case-studies/CaseCard";
import { study as copy, type Study } from "@/content/case-studies";

/** WHAT TO READ NEXT: three studies, one row.
 *
 *  TEAM DIRECTION, 2026-09-08: the same card as everywhere else, `CaseCard`,
 *  three across. It used to be two unequal plates, the first seven columns of
 *  the measure and the second five, matching the pair the archive's mosaic
 *  opened on; the mosaic is gone, the second card design with it, and the set
 *  is three so the row is full.
 *
 *  RELATEDNESS IS THE SECTOR, AND IT IS REAL. `relatedTo` offers same-sector
 *  studies first and fills from the archive's own order after that, so the
 *  first entry is a genuine relation wherever one exists and the section is
 *  never short. Nothing is scored, because nothing here can be. */
export function RelatedCases({ studies }: { studies: Study[] }) {
  if (!studies.length) return null;

  return (
    <section
      id="related"
      data-section="Related Case Studies"
      className="relative overflow-x-clip py-16 sm:py-20"
    >
      <Container>
        <SectionHeader
          index={copy.relatedIndex}
          title={copy.relatedTitle}
          strokeTitle={copy.relatedStroke}
          className="mb-14"
        />

        {/* No entrance animation and no layout animation: there is nothing to
            filter here, so a set that never changes would be paying for the
            layout engine to watch it. Three columns at lg, two at sm, which is
            the archive's own grid so the row reads as more of it. */}
        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => (
            <li key={study.slug} id={`case-${study.slug}`} className="scroll-mt-28">
              <CaseCard study={study} position={study.order + 1} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

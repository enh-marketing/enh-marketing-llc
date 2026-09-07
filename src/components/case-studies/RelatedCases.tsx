"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CasePlate } from "@/components/case-studies/CasePlate";
import { study as copy, type Study } from "@/content/case-studies";

/** WHAT TO READ NEXT, and it is two studies rather than three.
 *
 *  THE SET IS NOT A ROW OF EQUAL CARDS. A three-across strip of identical
 *  cards labelled "related" is the generic block this page exists to avoid, so
 *  the two entries are unequal: the first takes seven columns of the measure
 *  and the second five, which is the same pair the archive's mosaic opens on.
 *  The reader recognises the shape and reads it as more of the same archive
 *  rather than as a footer widget.
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

        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-12">
          {studies.map((study, i) => (
            <CasePlate
              key={study.slug}
              study={study}
              position={study.order + 1}
              wide={i === 0}
              animate={false}
              className={i === 0 ? "sm:col-span-7" : "sm:col-span-5"}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}

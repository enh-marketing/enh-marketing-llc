"use client";

import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard, CardTitle, CardBody } from "@/components/ui/SurfaceCard";

type Reason = { no: string; title: string; body: string };

/** Premium card: a spotlight tracks the cursor across the surface, the rule
 *  above it wipes red, and the numeral lifts out of its outline. Written to
 *  CSS custom properties on pointer move so nothing re-renders per frame. */
/** The house card, with the reason's own header row. */
function ReasonCard({ reason, i }: { reason: Reason; i: number }) {
  return (
    <SurfaceCard index={reason.no} delay={(i % 2) * 0.08}>
      <CardTitle>{reason.title}</CardTitle>
      <CardBody>{reason.body}</CardBody>
    </SurfaceCard>
  );
}

export function ReasonList({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  reasons,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lede?: string;
  reasons: Reason[];
}) {
  const reduced = useReducedMotion();

  return (
    <section id={id} data-section={label} className="relative py-16 sm:py-20">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          lede={lede}
          mark={{ variant: "growth", label: "Six reasons, climbing" }}
          className="mb-16"
        />

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <li key={reason.no} className={reduced ? undefined : "lg:[&:nth-child(3n+2)]:mt-10"}>
              <ReasonCard reason={reason} i={i} />
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

"use client";

import { Rise } from "@/components/fx/Reveal";

export type Sector = { label: string; detail: string };

/** Sectors written as "name: what it needs", which is how the pillars write them.
 *
 *  WHY NOT THE INDUSTRY RUN. This site's IndustryRun sets sectors as one big
 *  sentence of names, and that is right where the source gives names alone. The
 *  pillar documents do something different: every sector arrives with the thing
 *  that sector actually needs -- "Real estate: project pages, community
 *  searches and location-led enquiries". Flattening those into a run would
 *  throw away the half of each line that says why the sector is listed.
 *
 *  So each row keeps the pair, with the sector name at heading scale and its
 *  requirement beside it. Two columns, because these are peers.
 *
 *  The lead sentence above the list is the one each document uses to say when
 *  the discipline is worth buying at all, and it is set at display scale rather
 *  than folded in as an introduction nobody reads. */
export function SectorLedger({
  lead,
  items,
  tail,
}: {
  lead?: string;
  items: Sector[];
  tail?: string;
}) {
  return (
    <div className="relative">
      {lead && (
        <Rise>
          <p className="font-display max-w-4xl text-[clamp(1.1rem,2.2vw,1.7rem)] font-extrabold uppercase leading-[1.16] text-snow">
            {lead}
          </p>
        </Rise>
      )}

      <dl className="mt-12 grid border-t border-line lg:grid-cols-2">
        {items.map((sector, i) => (
          <Rise
            key={sector.label}
            delay={0.035 * i}
            className={`border-b border-line py-6 lg:pr-10 ${
              i % 2 === 1 ? "lg:border-l lg:border-line lg:pl-10" : ""
            }`}
          >
            <dt className="font-display text-[clamp(0.98rem,1.6vw,1.15rem)] font-extrabold uppercase leading-[1.2] text-brand">
              {sector.label}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-fog">{sector.detail}</dd>
          </Rise>
        ))}
      </dl>

      {tail && (
        <Rise delay={0.12}>
          <p className="mt-8 max-w-3xl leading-relaxed text-fog">{tail}</p>
        </Rise>
      )}
    </div>
  );
}

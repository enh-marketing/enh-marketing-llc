"use client";

import Link from "next/link";
import { routeExists } from "@/lib/sitemap";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MetaMark } from "@/components/service/MetaMark";

type Item = { label: string; href?: string };

const EASE = [0.16, 1, 0.3, 1] as const;

/** Nine labels, no descriptions.
 *
 *  The source for this section is a single comma-separated sentence: nine
 *  category names and nothing else. A card grid would advertise a slot for
 *  per-industry copy that does not exist, and filling those slots would mean
 *  writing it. So the sentence stays a sentence — set at display scale, the
 *  commas replaced by brand-red separators, the categories that have a page
 *  behind them turned into links. Dense, and honest about what is known. */
export function IndustryRun({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  items: Item[];
}) {
  return (
    <section id={id} data-section={label} className="relative py-16 sm:py-20">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          markNode={<MetaMark variant="reach" />}
          className="mb-14"
        />

        <p className="font-display flex flex-wrap items-baseline gap-x-1 gap-y-2 text-[clamp(1.35rem,3.1vw,2.5rem)] font-extrabold uppercase leading-[1.15]">
          {items.map((item, i) => (
            <motion.span
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className="inline-flex items-baseline"
            >
              {/* Three states, not two. A sector the document names but whose
                  page is unbuilt keeps text-snow and loses only the link: it is
                  as much a sector as the linked ones, and dropping it to the
                  text-fog treatment reserved for unnamed items would dim most
                  of the sentence for a reason the reader cannot see. */}
              {item.href && routeExists(item.href) ? (
                <Link
                  href={item.href}
                  className="text-snow transition-colors duration-300 hover:text-brand"
                >
                  {item.label}
                </Link>
              ) : item.href ? (
                <span className="text-snow">{item.label}</span>
              ) : (
                <span className="text-fog">{item.label}</span>
              )}
              {/* Separator stands in for the source sentence's comma. */}
              {i < items.length - 1 && (
                <span aria-hidden className="mx-3 text-brand sm:mx-4">
                  /
                </span>
              )}
            </motion.span>
          ))}
        </p>
      </Container>
    </section>
  );
}

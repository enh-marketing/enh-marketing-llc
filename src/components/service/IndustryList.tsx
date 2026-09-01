"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { routeExists } from "@/lib/sitemap";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";

type Item = { label: string; detail?: string; href?: string };

/** An editorial index, not a grid of chips. Each row is a full-width rule with
 *  oversized type; the detail is revealed on hover or focus. */

function RowInner({ item, i, active }: { item: Item; i: number; active: boolean }) {
  return (
    <>
      <span className="font-display w-8 shrink-0 text-xs font-bold text-brand">
        {String(i + 1).padStart(2, "0")}
      </span>
      <h3
        className={cn(
          "font-display flex-1 text-2xl font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 sm:text-[2rem]",
          // Red is reserved for rows that actually navigate. Unlinked rows still
          // reveal their detail on hover, but must not signal clickability.
          active && item.href ? "text-brand" : "text-snow",
        )}
      >
        {item.label}
      </h3>
      {item.detail && (
        <span
          className={cn(
            "max-w-sm text-sm text-fog transition-all duration-500 sm:text-right",
            active ? "opacity-100 sm:translate-x-0" : "opacity-45 sm:translate-x-2",
          )}
        >
          {item.detail}
        </span>
      )}
      {item.href && (
        <span
          aria-hidden
          className={cn(
            "shrink-0 text-brand transition-all duration-500",
            active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0",
          )}
        >
          &rarr;
        </span>
      )}
    </>
  );
}

const ROW = "flex flex-wrap items-baseline gap-x-8 gap-y-2 py-6 transition-colors duration-300 sm:py-7";

function Row({ item, i, active }: { item: Item; i: number; active: boolean }) {
  // No href, or one whose page is not built yet. The sector belongs in the list
  // either way; only the link has to wait for the page.
  if (!item.href || !routeExists(item.href)) {
    return (
      <div className={ROW}>
        <RowInner item={item} i={i} active={active} />
      </div>
    );
  }
  return (
    <Link href={item.href} className={ROW}>
      <RowInner item={item} i={i} active={active} />
    </Link>
  );
}

export function IndustryList({
  id,
  label,
  index,
  title,
  strokeTitle,
  lede,
  items,
  mark = "Sectors of different weight, connected",
  footer,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  /** Omit where the source document has no intro paragraph. */
  lede?: string;
  items: Item[];
  /** The section mark. Defaults to the paid-media page's wording; a document
   *  that argues the opposite about its sectors needs to say so. */
  mark?: string;
  /** A closing statement under the index, where the source has one. */
  footer?: ReactNode;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id={id} data-section={label} className="relative py-16 sm:py-20">
      <Container>
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          lede={lede}
          mark={{ variant: "ecosystem", label: mark }}
          className="mb-16"
        />

        <ul className="border-t border-line">
          {items.map((item, i) => (
            <li
              key={item.label}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group border-b border-line"
            >
              <Row item={item} i={i} active={active === i} />
            </li>
          ))}
        </ul>

        {footer}
      </Container>
    </section>
  );
}

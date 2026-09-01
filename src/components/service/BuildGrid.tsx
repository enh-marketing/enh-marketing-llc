"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SurfaceCard, CardTitle } from "@/components/ui/SurfaceCard";
import { CommercePreview } from "@/components/service/CommercePreview";
import { Rise } from "@/components/fx/Reveal";
import { cn } from "@/lib/cn";
import type { BuildStage } from "@/content/services/ecommerce";
import { Crosslink } from "@/components/ui/Crosslink";

/** Everything inside the build: six workstreams, each showing its own interface.
 *
 *  WHY CARDS HERE. Six parallel, comparable workstreams is the case cards were
 *  made for, and the site already has a card — SurfaceCard — so this reuses it
 *  rather than inventing a seventh variant of a bordered rectangle.
 *
 *  WHY IT DOES NOT READ AS THE OTHER CARD SECTIONS. Two reasons. First, every
 *  card carries a preview of the thing it builds: a category tree, a product
 *  grid, an integration map, a checkout, a load waterfall, an event stream.
 *  That is the difference between a card about ecommerce and a card that looks
 *  like ecommerce, and no other section on the site does it.
 *
 *  Second, the grid is deliberately uneven. Discovery and Storefront take
 *  double width on the first row because the document treats them as the work
 *  everything else follows from; the remaining four sit compact beneath. A flat
 *  3x2 grid would have said all six were the same size of decision, which they
 *  are not.
 *
 *  The payment methods and the onward links are the document's own, set below
 *  the grid rather than crammed into the checkout card, which would have made
 *  one cell twice the height of its row for no reason. */
export function BuildGrid({
  id,
  label,
  index,
  title,
  strokeTitle,
  items,
  payments,
  paymentsLabel,
  related,
}: {
  id: string;
  label: string;
  index: string;
  title: string;
  strokeTitle: string;
  items: BuildStage[];
  /** Named in the checkout workstream; surfaced here as their own rail. */
  payments: string[];
  paymentsLabel: string;
  related: { lead: string; links: { label: string; href: string }[] };
}) {
  return (
    <section
      id={id}
      data-section={label}
      className="relative overflow-x-clip border-y border-line bg-ink-2 py-14 sm:py-16"
    >
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "ecosystem", label: "Six workstreams in one build" }}
          className="mb-12"
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const wide = i < 2;
            return (
              <li key={item.no} className={cn(wide && "lg:col-span-2")}>
                <SurfaceCard
                  index={item.no}
                  glyph={item.glyph}
                  delay={(i % 4) * 0.06}
                  padding={wide ? "default" : "tight"}
                  className="flex flex-col"
                >
                  <CardTitle className={wide ? undefined : "text-base sm:text-lg"}>
                    {item.title}
                  </CardTitle>
                  <p
                    className={cn(
                      "mt-3 leading-relaxed text-fog",
                      wide ? "sm:text-lg" : "text-sm",
                    )}
                  >
                    {item.body}
                  </p>
                  <CommercePreview
                    variant={item.preview}
                    className={cn("mt-auto", wide ? "h-36 !mt-8" : "h-24 !mt-6")}
                  />
                </SurfaceCard>
              </li>
            );
          })}
        </ol>

        {/* How people pay here, as its own rail. */}
        <Rise delay={0.1} className="mt-10 border-t border-line pt-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ash">
              {paymentsLabel}
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {payments.map((method) => (
                <li
                  key={method}
                  className="rounded-full border border-line bg-ink-3 px-4 py-2 text-xs font-semibold text-snow transition-colors duration-500 hover:border-brand/50"
                >
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </Rise>

        {/* Where the document sends readers next. */}
        <Rise delay={0.16} className="mt-8">
          <p className="text-sm leading-relaxed text-fog">
            {related.lead}{" "}
            {related.links.map((link, i) => (
              <span key={link.href}>
                <Crosslink
                  href={link.href}
                  className="text-snow underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-brand hover:decoration-brand"
                  pendingClassName="text-snow"
                >
                  {link.label}
                </Crosslink>
                {i < related.links.length - 1 ? " and " : "."}
              </span>
            ))}
          </p>
        </Rise>
      </Container>
    </section>
  );
}

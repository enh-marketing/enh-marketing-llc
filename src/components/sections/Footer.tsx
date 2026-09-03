import { brand, social } from "@/lib/content";
import { footerNav, pages, isPending, type NavNode } from "@/lib/sitemap";
import { Container } from "@/components/ui/Container";
import { BackToTop } from "@/components/fx/Adornments";
import { Logo } from "@/components/ui/Logo";
import { FooterCurve } from "@/components/fx/FooterCurve";

// inline-block + vertical padding: these sat at 16-20px tall, under the 24px
// minimum for a pointer target. The padding grows the hit area only — the type
// and the visual rhythm are unchanged.
const LINK = "inline-block py-1 text-sm text-fog transition-colors hover:text-snow";

function FooterLink({ node }: { node: NavNode }) {
  // Pending destinations read as text, not as a link that goes nowhere.
  if (isPending(node)) {
    return (
      <span className="text-sm text-ash" aria-disabled="true">
        {node.label}
      </span>
    );
  }
  if (node.external) {
    return (
      <a href={node.href} target="_blank" rel="noopener noreferrer" className={LINK}>
        {node.label} <span aria-hidden>↗</span>
      </a>
    );
  }
  return (
    <a href={node.href} className={LINK}>
      {node.label}
    </a>
  );
}

function FooterCol({ title, items }: { title: string; items: NavNode[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase text-ash">{title}</h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <FooterLink node={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  // Services and Industries get their own columns, so keep them out of Company.
  const company = footerNav.filter(
    (n) => n.href !== pages.services.href && n.href !== pages.industries.href,
  );

  return (
    <footer className="relative bg-ink-2 pt-16">
      <FooterCurve />
      <Container>
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr_0.7fr]">
          <div>
            <Logo variant="full" className="mb-5" />
            <p className="max-w-xs text-sm leading-relaxed text-fog">
              {brand.growthLine}. A digital growth studio in {brand.city} — fifteen years
              of climbs, and we&apos;re still looking up.
            </p>
            <div className="mt-6 space-y-0.5 text-sm text-fog">
              <a href={`mailto:${brand.email}`} className="block py-1 transition-colors hover:text-snow">
                {brand.email}
              </a>
              <a href={`tel:${brand.phoneHref}`} className="block py-1 transition-colors hover:text-snow">
                {brand.phone}
              </a>
              <p>{brand.address}</p>
            </div>
          </div>

          <FooterCol title="Services" items={pages.services.children ?? []} />
          <FooterCol title="Industries" items={pages.industries.children ?? []} />
          <FooterCol title="Company" items={company} />
          <FooterCol title="Connect" items={social} />
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <BackToTop />
            <span>
              © {new Date().getFullYear()} {brand.legal} — {brand.tagline}
            </span>
          </div>
          <div className="flex flex-wrap gap-5">
            {/* Pending-checked like every other menu entry. These bypassed the
                check and shipped two more links to pages that do not exist.
                Set here rather than through FooterLink so the legal row keeps
                its own text-xs scale against the copyright line beside it. */}
            {pages.legal.map((l) =>
              isPending(l) ? (
                <span key={l.href} aria-disabled="true" className="inline-block py-1.5">
                  {l.label}
                </span>
              ) : (
                <a key={l.href} href={l.href} className="inline-block py-1.5 transition-colors hover:text-snow">
                  {l.label}
                </a>
              ),
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}

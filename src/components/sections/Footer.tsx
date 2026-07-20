import { brand, footerLinks } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { BackToTop } from "@/components/fx/Adornments";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-void pt-16">
      <Container>
      <div className="grid gap-12 pb-16 lg:grid-cols-[1.3fr_1fr_0.8fr_0.9fr_0.7fr]">
        <div>
          <Logo variant="full" className="mb-5" />
          <p className="max-w-xs text-sm leading-relaxed text-fog">
            {brand.growthLine}. A digital growth studio in {brand.city} — fifteen years
            of climbs, and we&apos;re still looking up.
          </p>
          <div className="mt-6 space-y-1.5 text-sm text-fog">
            <a href={`mailto:${brand.email}`} className="block transition-colors hover:text-snow">
              {brand.email}
            </a>
            <a href={`tel:${brand.phoneHref}`} className="block transition-colors hover:text-snow">
              {brand.phone}
            </a>
            <p>{brand.address}</p>
          </div>
        </div>

        <FooterCol title="Services" links={footerLinks.services} />
        <FooterCol title="Industries" links={footerLinks.industries} />
        <FooterCol title="Company" links={footerLinks.company} />
        <FooterCol title="Connect" links={footerLinks.social} />
      </div>

      <div className="flex flex-col gap-4 border-t border-line py-6 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <BackToTop />
          <span>© Copyright 2026 | {brand.legal} — {brand.tagline}</span>
        </div>
        <div className="flex gap-5">
          <a href="#" className="transition-colors hover:text-snow">Privacy Policy</a>
          <a href="#" className="transition-colors hover:text-snow">Terms of Use</a>
          <a href="#" className="transition-colors hover:text-snow">Business Listing</a>
        </div>
      </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ash">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-fog transition-colors hover:text-snow">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

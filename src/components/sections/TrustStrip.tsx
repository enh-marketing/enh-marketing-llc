import { clients, recognition, certifications } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { SpinStar } from "@/components/fx/Adornments";

function initials(name: string): string {
  const words = name.split(" ").filter(Boolean);
  return words.length === 1
    ? words[0].slice(0, 2).toUpperCase()
    : (words[0][0] + words[1][0]).toUpperCase();
}

/** Brand-logo chip: monogram badge + wordmark. */
function LogoChip({ name }: { name: string }) {
  return (
    <span className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-ink-2 px-5 py-3.5 transition-colors duration-300 hover:border-brand/50">
      <span className="font-display flex h-9 w-9 items-center justify-center rounded-lg bg-ink-3 text-xs font-extrabold tracking-tight text-snow">
        {initials(name)}
      </span>
      <span className="font-display whitespace-nowrap text-base font-bold text-fog">
        {name}
      </span>
    </span>
  );
}

/** Client logo wall + industry recognition + platform certifications.
 *
 *  Shared with the service pages, so the section handle is parameterised the
 *  same way Work and Insights are. Defaults keep the homepage unchanged. */
export function TrustStrip({
  id,
  label = "Trusted By",
  credentials = true,
  compact = false,
}: {
  id?: string;
  label?: string;
  /** For when the strip sits inside the hero and has to share the first
   *  viewport with it: tighter padding and a single logo row instead of two,
   *  which is what actually makes it fit above the fold. */
  compact?: boolean;
  /** The "Recognized by" and "Certified" panel. Kept on the homepage, dropped
   *  on the service pages, where the strip only needs to establish trust in
   *  passing rather than run to a second block of its own. */
  credentials?: boolean;
} = {}) {
  const half = Math.ceil(clients.length / 2);
  // One row carries every client when compact; two rows split them otherwise.
  const rowA = compact
    ? [...clients, ...clients]
    : [...clients.slice(0, half), ...clients.slice(0, half)];
  const rowB = [...clients.slice(half), ...clients.slice(half)];

  return (
    <section
      id={id}
      data-section={label}
      className={cn("border-b border-line", compact ? "py-4" : "py-16")}
    >
      {/* Claim line: homepage only. Inside the service heroes the logos speak
          for themselves, and dropping it also buys back the vertical space the
          hero needs to keep this strip above the fold. */}
      {!compact && (
        <Container>
          <p className="mb-10 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-fog">
            <SpinStar />
            Trusted by 4200+ brands across the UAE
            <SpinStar />
          </p>
        </Container>
      )}

      {/* Logo marquee: one row when compact, two counter-rotating rows when not. */}
      <div className="space-y-4">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-4 pr-4">
            {rowA.map((name, i) => (
              <LogoChip key={`a-${name}-${i}`} name={name} />
            ))}
          </div>
        </div>

        {!compact && (
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div
              className="animate-marquee flex w-max items-center gap-4 pr-4"
              style={{ animationDirection: "reverse", animationDuration: "36s" }}
            >
              {rowB.map((name, i) => (
                <LogoChip key={`b-${name}-${i}`} name={name} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recognized by — aligned grid. Homepage only. */}
      {credentials && (
        <Container className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="grid items-center gap-6 border-b border-line px-7 py-6 sm:grid-cols-[170px_1fr]">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ash">
                Recognized by
              </span>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
                {recognition.map((r) => (
                  <span
                    key={r}
                    className="font-display text-center text-sm font-bold text-fog transition-colors duration-300 hover:text-snow sm:text-base"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid items-center gap-6 px-7 py-6 sm:grid-cols-[170px_1fr]">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-ash">
                Certified
              </span>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
                {certifications.map((c) => (
                  <span key={c} className="flex items-center justify-center gap-2 text-sm text-fog">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  );
}

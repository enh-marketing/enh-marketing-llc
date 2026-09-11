import { clients, type ClientLogo } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { SpinStar } from "@/components/fx/Adornments";

/** One client's mark, on a plate.
 *
 *  WHY A WHITE PLATE AND NOT THE BARE LOGO. Same reason `PartnerBadges` uses
 *  one, and the reason is in the files: of the thirty-one marks the team
 *  supplied, most are a single dark grey on transparent -- Abdullah Al Othaim,
 *  FAPINEX, Texol, TRCpamco, Atlas Copco -- and those are invisible on this
 *  site's near-black ground. Recolouring somebody else's logo to fix that is
 *  not ours to do. The rest are full colour on transparent, and full colour on
 *  white is the treatment nearly every brand's own guidelines name first.
 *
 *  WHY THE BOX IS FIXED AND THE ARTWORK IS NOT. These files run from 100x120
 *  to 2560x1254: fixing only the height, as the badge row does, would put
 *  TRCpamco at five times the width of Axcl and the wall would read as a row
 *  of accidents. So each plate is one height with a floor on its width, and the
 *  mark inside is capped on BOTH axes and centred -- a wide logo stops at the
 *  width cap, a tall one stops at the height cap, and every tile is the same
 *  object whatever shape the logo in it happens to be.
 *
 *  `w`/`h` are the file's real pixel size and are only there for the ratio: a
 *  marquee whose tiles resize as each of thirty-one images arrives is a row
 *  that jitters for the whole of the first cycle. */
function LogoPlate({ logo, compact }: { logo: ClientLogo; compact: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:transition-none",
        compact ? "h-14 min-w-[7rem] px-5" : "h-16 min-w-[8rem] px-6",
      )}
    >
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.w}
        height={logo.h}
        loading="lazy"
        decoding="async"
        className={cn(
          "w-auto object-contain",
          compact ? "max-h-7 max-w-[7.5rem]" : "max-h-9 max-w-[9rem]",
        )}
      />
    </span>
  );
}

/** Client logo wall.
 *
 *  Shared with the service pages, so the section handle is parameterised the
 *  same way Work and Insights are. Defaults keep the homepage unchanged. */
export function TrustStrip({
  id,
  label = "Trusted By",
  compact = false,
}: {
  id?: string;
  label?: string;
  /** For when the strip sits inside the hero and has to share the first
   *  viewport with it: tighter padding and a single logo row instead of two,
   *  which is what actually makes it fit above the fold. */
  compact?: boolean;
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
      className={cn("", compact ? "py-4" : "py-16")}
    >
      {/* Claim line: homepage only. Inside the service heroes the logos speak
          for themselves, and dropping it also buys back the vertical space the
          hero needs to keep this strip above the fold. */}
      {!compact && (
        <Container>
          <p className="mb-10 flex items-center justify-center gap-3 text-xs font-semibold uppercase text-fog">
            <SpinStar />
            Trusted by 4200+ brands across the UAE
            <SpinStar />
          </p>
        </Container>
      )}

      {/* Logo marquee: one row when compact, two counter-rotating rows when not. */}
      <div className="space-y-4">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          {/* Duration is set here rather than on .animate-marquee, which the
              Voices section also uses. Compact packs every client into this one
              row, so a cycle covers twice the plates a split row does and runs
              visually twice as fast at the same duration — hence the longer
              time here. */}
          <div
            className="animate-marquee flex w-max items-center gap-4 pr-4"
            style={{ animationDuration: compact ? "45s" : "30s" }}
          >
            {rowA.map((logo, i) => (
              <LogoPlate key={`a-${logo.src}-${i}`} logo={logo} compact={compact} />
            ))}
          </div>
        </div>

        {!compact && (
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div
              className="animate-marquee flex w-max items-center gap-4 pr-4"
              style={{ animationDirection: "reverse", animationDuration: "36s" }}
            >
              {rowB.map((logo, i) => (
                <LogoPlate key={`b-${logo.src}-${i}`} logo={logo} compact={compact} />
              ))}
            </div>
          </div>
        )}
      </div>

    </section>
  );
}

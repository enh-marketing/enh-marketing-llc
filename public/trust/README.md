# Client logos

The marks on the client wall — `TrustStrip`, which the homepage and every
service page render. Wired up in `src/lib/content.ts` (`clients`) and drawn by
`src/components/sections/TrustStrip.tsx`.

Thirty-one files, supplied by the team as CDN links and downloaded here. Each is
named by its own slug from that link; two were renamed because the originals
could not be shipped as they were:

| Delivered as | Stored as | Why |
| --- | --- | --- |
| `...66474b16_aao.png` | `aao.png` | Abdullah Al Othaim Leisure Co. — the name is not in the link, only "aao" |
| `...6602c5ce_download-removebg-preview (1).png` | `desertcart.png` | A build asset cannot be called `download-removebg-preview (1)`; the artwork reads "desertcart" |

## Rules these files have to keep

- **Do not alter a mark.** No recolouring, no cropping, no stretching, no
  filters. Most of these are a single dark grey on transparent and are invisible
  on this site's near-black ground; the answer is the white plate the component
  draws, never a filter on the artwork. Same rule as
  `public/badges/README.md`, for the same reason — these are other people's
  trademarks.
- **`alt` is the name the mark itself prints.** Open the file and read it; do
  not trust the filename. Every one of these thirty-one was checked that way and
  ten disagreed with the name list the wall used to carry. The worst is
  `ekx.webp`, whose artwork reads **EKC** — so the file named for one client is
  the other one's logo. Also: `comply.webp` is Complyfin, `chs.webp` is CHS
  Community Pharmacy, `ttc.webp` is The Travel Collection (the mark never prints
  "TTC"), `all-day.webp` is allday retail, `top-shelf.webp` is Top Shelf
  Technical Services, `fapinex.webp` is FAPINEX, `altas-cop-co.webp` is Atlas
  Copco, `axcl.webp` is AXCL, `manipal.webp` is Manipal Academy of Higher
  Education, and `dubai-lslamic-bank.webp` is Dubai Islamic Bank.
- **Where a mark prints more than a name, alt is the brand only** — no taglines,
  no legal suffixes. Procat, not "Procat Professional Catering & Beyond". Blue
  Bell Shipping, not "Blue Bell Shipping L.L.C.".
- **Keep the intrinsic `w`/`h` accurate.** They are the ratio that stops the
  marquee jittering while thirty-one images load. Read them with
  `sips -g pixelWidth -g pixelHeight <file>`.

## Adding or replacing a logo

Drop the file in here and add a line to `clients` in `src/lib/content.ts` with
its real intrinsic size. There is no filesystem fallback on this list the way
`availableBadges()` gives the badge row, so a line pointing at a file that is
not here renders a broken image — add the file first.

"EKX" was on the old text-only list and no logo was supplied for it, so it is
not on the wall. Nothing stands in for it. (The file called `ekx.webp` is EKC's
mark — see above.)

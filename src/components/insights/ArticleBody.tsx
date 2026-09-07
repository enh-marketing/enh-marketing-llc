"use client";

import { Fragment, type ReactNode } from "react";
import { Rise } from "@/components/fx/Reveal";
import { PeakDivider } from "@/components/fx/Adornments";
import { cn } from "@/lib/cn";
import { headingId, type Block, type Inline } from "@/content/insights";

/** THE ARTICLE RENDERER.
 *
 *  ONE SYSTEM, NOT PER-ARTICLE STYLING. Every article on the site is drawn by
 *  this component from the typed blocks in the content model, so there is one
 *  place where an h2's spacing, a table's scroll behaviour or a caption's tone
 *  is decided. Nothing an article can contain is styled at the call site, and
 *  a migration that meets a structure this file does not draw has to add it to
 *  the Block union rather than smuggle in markup.
 *
 *  WHY NOT dangerouslySetInnerHTML AND A PROSE RESET. A migrated article is
 *  somebody else's markup. Rendering it raw puts their scripts, their inline
 *  styles and their class names inside our page, and leaves us unable to
 *  restyle a table we did not emit. Typed inline nodes mean the renderer
 *  decides how every mark looks, the migration is a pure transform, and
 *  nothing arrives that this file has not agreed to draw.
 *
 *  THE MEASURE IS THE DESIGN. Prose is capped at 68 characters, which lands a
 *  line between 60 and 75 at every width — the band reading stays comfortable
 *  in. Three things are allowed past it, because each is unreadable inside it:
 *  a figure marked `bleed`, a table, and a code block. Their captions stay on
 *  the measure, so the eye's left edge never moves.
 *
 *  SPACING IS SET FROM THE LINE, NOT PICKED. Paragraph gaps are a multiple of
 *  the body's own leading and headings take a larger multiple above than
 *  below, which is what binds a heading to the text it introduces instead of
 *  leaving it floating between two blocks.
 *
 *  WHAT IS DELIBERATELY ABSENT. No drop cap and no small-caps first line: each
 *  costs a line of measure on a phone, which is where most article reading
 *  happens, and neither survives a heading in the first screen. The lead
 *  paragraph is set one step up instead, which does the same job at every
 *  width. */

/* --------------------------------------------------------------- inline */

/** Rich text. Recursive, and the only place a mark's appearance is decided.
 *
 *  Exported because ArticleHero renders the hero image's caption, which is the
 *  same `Inline[]` as any other caption. It was flattening it with
 *  `.filter(n => typeof n === "string").join("")`, which silently dropped every
 *  bold run, link and code span a caption contained — a photo credit is
 *  exactly the kind of caption that carries a link.
 *
 *  A link is styled by where it points: an internal one is ordinary body
 *  emphasis, an external one carries rel="noopener" and opens in place, which
 *  is what the rest of this site does. Nothing gets an icon — an arrow after
 *  every third word in a paragraph is what makes migrated copy look like a
 *  link farm. */
export function InlineNodes({ nodes }: { nodes: Inline[] }): ReactNode {
  return nodes.map((node, i) => {
    if (typeof node === "string") return <Fragment key={i}>{node}</Fragment>;
    if ("b" in node)
      return (
        <strong key={i} className="font-semibold text-snow">
          <InlineNodes nodes={node.b} />
        </strong>
      );
    if ("i" in node)
      return (
        <em key={i} className="italic">
          <InlineNodes nodes={node.i} />
        </em>
      );
    if ("code" in node)
      return (
        <code
          key={i}
          /* Sized in em so it tracks whatever block it sits in, and given no
             background: a tinted chip inside a paragraph breaks the line's
             rhythm at every occurrence. The border does the work. */
          className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.86em] text-snow"
        >
          {node.code}
        </code>
      );
    const external = /^https?:/.test(node.a);
    return (
      <a
        key={i}
        href={node.a}
        {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
        className="font-medium text-snow underline decoration-brand decoration-2 underline-offset-[3px] transition-colors duration-300 hover:text-brand"
      >
        <InlineNodes nodes={node.children} />
      </a>
    );
  });
}

/* ---------------------------------------------------------------- layout */

/** The reading measure. LEFT-ALIGNED, NOT CENTRED, and that is a decision
 *  about the whole page: the article's left edge then matches the hero's
 *  breadcrumbs, kicker, headline and byline, so one vertical line runs from
 *  the top of the page to the bottom of the prose. Centring the measure inside
 *  its column would put the body text a hundred-odd pixels to the right of the
 *  headline that introduces it. A bleed block widens rightward from the same
 *  edge, into the margin the contents rail sits in, which is what gives the
 *  page its rhythm: narrow prose, wide evidence. */
function Measure({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("w-full max-w-[68ch]", className)}>{children}</div>;
}

/** Past the measure, up to the column. */
function Bleed({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("w-full max-w-[min(100%,54rem)]", className)}>{children}</div>;
}

/* ---------------------------------------------------------------- blocks */

export function ArticleBody({ body }: { body: Block[] }) {
  return (
    /* `article-body` carries only what a utility cannot express: the ordered
       list's CSS counter and the scroll-margin every heading needs to clear
       the fixed header when the contents rail jumps to it. */
    <div className="article-body text-[1.0625rem] leading-[1.75] text-snow sm:text-[1.125rem]">
      {body.map((block, i) => (
        <BlockView key={i} block={block} first={i === 0} />
      ))}
    </div>
  );
}

/** The second level of a list. A hairline dash rather than a second dot, and
 *  a step down in tone, so the hierarchy is legible without indenting far
 *  enough to cost the sub-points their measure. */
function SubList({ items }: { items?: Inline[][] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-2.5 space-y-2">
      {items.map((sub, i) => (
        <li key={i} className="relative pl-5 text-[0.96em] text-fog">
          <span aria-hidden className="absolute left-0 top-[0.72em] h-px w-2.5 bg-ash" />
          <InlineNodes nodes={sub} />
        </li>
      ))}
    </ul>
  );
}

function BlockView({ block, first }: { block: Block; first: boolean }) {
  switch (block.type) {
    case "lead":
      return (
        <Measure className={first ? "" : "mt-8"}>
          <p className="text-[1.2rem] leading-[1.6] text-snow sm:text-[1.35rem]">
            <InlineNodes nodes={block.text} />
          </p>
        </Measure>
      );

    case "p":
      return (
        <Measure className={first ? "" : "mt-7"}>
          <p>
            <InlineNodes nodes={block.text} />
          </p>
        </Measure>
      );

    case "h2":
      return (
        <Measure className={first ? "" : "mt-14"}>
          {/* The rule above the heading is what makes a long article read as
              chapters. It is the same hairline the section headers on every
              other page sit under. */}
          <span aria-hidden className="mb-6 block h-px w-full bg-line" />
          <h2
            id={headingId(block.text)}
            className="font-display text-[clamp(1.4rem,2.6vw,1.95rem)] font-extrabold uppercase leading-[1.12] text-snow"
          >
            {block.text}
          </h2>
        </Measure>
      );

    case "h3":
      return (
        <Measure className="mt-10">
          <h3
            id={headingId(block.text)}
            className="font-display text-[1.15rem] font-extrabold uppercase leading-tight text-snow sm:text-[1.3rem]"
          >
            {block.text}
          </h3>
        </Measure>
      );

    case "ul":
      return (
        <Measure className="mt-7">
          <ul className="space-y-3.5">
            {block.items.map((item, i) => (
              <li key={i} className="relative pl-7">
                {/* Drawn rather than inherited, so the marker lines up with
                    the measure instead of hanging outside it, and a wrapped
                    item indents under itself. */}
                <span
                  aria-hidden
                  className="absolute left-0 top-[0.68em] h-1.5 w-1.5 rounded-full bg-brand"
                />
                <InlineNodes nodes={item.text} />
                <SubList items={item.items} />
              </li>
            ))}
          </ul>
        </Measure>
      );

    case "ol":
      return (
        <Measure className="mt-7">
          {/* Counter in CSS: the numbering survives any reordering and stays
              tabular past nine. See `.article-ol` in globals.css. */}
          <ol className="article-ol space-y-3.5">
            {block.items.map((item, i) => (
              <li key={i} className="relative pl-8">
                <InlineNodes nodes={item.text} />
                <SubList items={item.items} />
              </li>
            ))}
          </ol>
        </Measure>
      );

    case "quote":
      return (
        <Measure className="mt-11">
          <Rise>
            <blockquote className="border-l-2 border-brand pl-6 sm:pl-8">
              <p className="font-display max-w-[56ch] text-[clamp(1.2rem,2.3vw,1.6rem)] font-extrabold leading-[1.3] text-snow">
                <InlineNodes nodes={block.text} />
              </p>
              {block.cite && (
                <cite className="mt-4 block text-sm not-italic text-fog">— {block.cite}</cite>
              )}
            </blockquote>
          </Rise>
        </Measure>
      );

    case "callout":
      return (
        <Measure className="mt-10">
          <Rise>
            <aside className="rounded-2xl border border-line border-l-2 border-l-brand bg-ink-2 p-6 sm:p-7">
              {block.title && (
                <p className="font-display mb-3 text-sm font-extrabold uppercase tracking-wide text-snow">
                  {block.title}
                </p>
              )}
              <div className="text-[0.98rem] leading-relaxed text-fog">
                <InlineNodes nodes={block.text} />
              </div>
            </aside>
          </Rise>
        </Measure>
      );

    case "figure": {
      const f = block.figure;
      const Wrap = f.bleed ? Bleed : Measure;
      return (
        <Wrap className="mt-11">
          <Rise>
            <figure>
              <div
                className="relative overflow-hidden rounded-2xl border border-line bg-ink-3"
                /* The intrinsic ratio reserves the box, so a late image shifts
                   nothing below it. */
                style={{ aspectRatio: `${f.w} / ${f.h}` }}
              >
                <img
                  src={f.src}
                  alt={f.alt}
                  width={f.w}
                  height={f.h}
                  loading="lazy"
                  decoding="async"
                  sizes={f.bleed ? "(min-width: 1024px) 864px, 100vw" : "(min-width: 1024px) 640px, 100vw"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              {f.caption && (
                /* The caption stays on the reading measure even under a bleed
                   figure, so the eye's left edge never moves. */
                <figcaption className="mt-4 max-w-[68ch] text-sm leading-relaxed text-ash">
                  <InlineNodes nodes={f.caption} />
                </figcaption>
              )}
            </figure>
          </Rise>
        </Wrap>
      );
    }

    case "table":
      return (
        <Bleed className="mt-11">
          <Rise>
            <figure>
              {/* The table scrolls inside its own box. The page body never
                  scrolls sideways at any width, which is the rule the whole
                  site is checked against from 320 to 1920. */}
              <div className="scroll-slim overflow-x-auto rounded-2xl border border-line bg-ink-2">
                <table className="w-full min-w-[34rem] border-collapse text-left text-[0.94rem]">
                  <thead>
                    <tr>
                      {block.head.map((cell) => (
                        <th
                          key={cell}
                          scope="col"
                          className="font-display border-b border-line px-5 py-4 text-[0.72rem] font-extrabold uppercase tracking-[0.1em] text-snow"
                        >
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-b border-line last:border-0">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={cn(
                              "px-5 py-4 align-top leading-relaxed",
                              c === 0 ? "font-medium text-snow" : "text-fog",
                            )}
                          >
                            <InlineNodes nodes={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {block.caption && (
                <figcaption className="mt-4 max-w-[68ch] text-sm text-ash">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          </Rise>
        </Bleed>
      );

    case "code":
      return (
        <Bleed className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-3">
            {block.lang && (
              <span className="font-display absolute right-4 top-3 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-ash">
                {block.lang}
              </span>
            )}
            {/* Wrapping is off and the block scrolls: a wrapped line of code
                is a different program from the one that was written. */}
            <pre className="scroll-slim overflow-x-auto p-6 pt-8 text-[0.82rem] leading-relaxed">
              <code className="font-mono text-snow">{block.code}</code>
            </pre>
          </div>
        </Bleed>
      );

    case "embed": {
      /* youtube-nocookie, and no autoplay: the reader asked for an article. */
      const src =
        block.provider === "youtube"
          ? `https://www.youtube-nocookie.com/embed/${block.id}`
          : `https://player.vimeo.com/video/${block.id}`;
      return (
        <Bleed className="mt-11">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-ink-3">
            <iframe
              src={src}
              /* Named, because an unlabelled iframe is announced as "frame"
                 and a reader has no way to know what it holds. */
              title={block.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </Bleed>
      );
    }

    case "hr":
      /* The site's own summit divider rather than a rule. A horizontal rule in
         the middle of an article is the one piece of furniture that can carry
         the brand without interrupting the reading. */
      return (
        <div className="my-14 flex max-w-[68ch] justify-center">
          <PeakDivider />
        </div>
      );
  }
}

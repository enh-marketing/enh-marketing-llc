import type { ReactNode } from "react";
import { routeExists } from "@/lib/sitemap";
import { cn } from "@/lib/cn";
import type { Block, Inline } from "@/content/case-studies";

/** The renderer for a migrated study's prose.
 *
 *  TYPED BLOCKS, NEVER dangerouslySetInnerHTML. A migrated page is somebody
 *  else's markup; rendering it as HTML would put their classes and their
 *  inline styles inside ours, and nothing here would be restyleable. This is
 *  the same decision ArticleBody makes for the archive, kept local rather than
 *  imported because the case study union is three block types and importing
 *  the article renderer would pull its four hundred lines into this island.
 *
 *  A LINK TO A PAGE THAT DOES NOT EXIST IS SET AS TEXT. Two studies link to
 *  enhmedia.com/e-commerce-marketing, which is a page on the old site with no
 *  counterpart in this IA. Crosslink and the sitemap's BUILT set already say
 *  what to do about that: a link to a 404 is worse than no link, so the words
 *  stay and the anchor goes. Off-site links keep their anchor and open in a
 *  new tab. */
export function InlineNodes({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        if (typeof node === "string") return <span key={i}>{node}</span>;
        if ("b" in node)
          return (
            <strong key={i} className="font-semibold text-snow">
              <InlineNodes nodes={node.b} />
            </strong>
          );
        if ("i" in node)
          return (
            <em key={i}>
              <InlineNodes nodes={node.i} />
            </em>
          );

        const href = node.a.replace(/^https?:\/\/(www\.)?enhmedia\.com/, "");
        const internal = href.startsWith("/");
        const children = <InlineNodes nodes={node.children} />;

        if (internal && !routeExists(href)) return <span key={i}>{children}</span>;

        return (
          <a
            key={i}
            href={href}
            {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="font-medium text-snow underline decoration-brand decoration-2 underline-offset-4 transition-colors duration-300 hover:text-brand"
          >
            {children}
          </a>
        );
      })}
    </>
  );
}

/** A run of blocks at one measure.
 *
 *  `tone` is the only thing that varies between the four sections a study is
 *  made of, and it varies because they are different kinds of writing: the
 *  brief is a fact, the challenge is the argument, and the two after it are the
 *  account of the work. Nothing here changes the words. */
export function Prose({
  blocks,
  tone = "body",
  className,
}: {
  blocks: Block[];
  tone?: "body" | "statement" | "quiet";
  className?: string;
}) {
  /* THE STATEMENT TONE IS NOT UPPERCASE DISPLAY TYPE, and that is a decision
     about the content rather than about the look. The site sets short authored
     lines that way — a heading, a closing line of six words. A challenge
     paragraph here is a migrated fifty-word sentence somebody else wrote, and
     fifty words of uppercase Cabinet Grotesk is a wall nobody reads. This is
     the same treatment AccessModel gives its opening: the body face, one step
     up, in primary text. Large enough to be the loudest prose on the page,
     still prose. */
  const paragraph =
    tone === "statement"
      ? "statement leading-[1.35] text-snow"
      : tone === "quiet"
        ? "text-sm leading-relaxed text-fog sm:text-[0.95rem]"
        : "text-base leading-[1.75] text-fog";

  return (
    <div className={cn("space-y-5", className)}>
      {blocks.map((block, i) => {
        // An h3, matching the level CaseStory gives a named phase: every
        // section of a study is an h2, so a heading inside one is an h3 and the
        // outline never skips a level.
        if (block.type === "h3")
          return (
            <h3
              key={i}
              className="font-display pt-3 text-[0.9rem] font-extrabold uppercase tracking-[0.06em] text-snow"
            >
              {block.text}
            </h3>
          );

        if (block.type === "ul")
          return (
            <ul key={i} className="space-y-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3.5 text-base leading-[1.75] text-fog">
                  <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-brand" />
                  <span>
                    <InlineNodes nodes={item} />
                  </span>
                </li>
              ))}
            </ul>
          );

        return (
          <p key={i} className={paragraph}>
            <InlineNodes nodes={block.text} />
          </p>
        );
      })}
    </div>
  );
}

/** A section label in the study's own register: the numeral, the name and a
 *  rule that runs out to the measure. Used four times on a study page and once
 *  on the lead story, which is why it is not written inline five times. */
export function SectionRule({
  label,
  children,
}: {
  /** Accepted and ignored: the red section counter it used to print is gone
   *  sitewide. Every page body still passes one, so the prop stays rather than
   *  forcing a rename across fifty-odd files, and putting the numbering back
   *  stays a one-line change. */
  index: string;
  label: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-baseline gap-4">
      <h2 className="font-display text-[0.8rem] font-extrabold uppercase tracking-[0.14em] text-snow">
        {label}
      </h2>
      <span aria-hidden className="h-px flex-1 bg-line" />
      {children}
    </div>
  );
}

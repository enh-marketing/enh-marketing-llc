"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rise } from "@/components/fx/Reveal";

/** What has to happen on either side of the conversation.
 *
 *  THE SECTION IS NOT ABOUT EXPERIENCE, IT IS ABOUT ATTACHMENT POINTS. Fifteen
 *  years is the credential, but the argument the document actually makes is
 *  narrower and better: "This experience helps us understand what should happen
 *  before and after an AI conversation." Then it gives three cases, and each one
 *  is a conversation with something clipped to one end of it. A chatbot has to
 *  know which campaign sent the enquiry, which is upstream. A booking agent has
 *  to write to the CRM, which is downstream. A service agent has to hand over
 *  with the details already attached, which is both.
 *
 *  So each case is drawn as the join: the conversation in the middle, and the
 *  thing it has to reach on the side the sentence puts it. Three drawings, not
 *  three cards with the same icon, because the direction is the content.
 *
 *  THE THREE ARE HEDGED AND STAY HEDGED. Every one of them says "may need to".
 *  Nothing here upgrades a may into a does, and no system is named beyond the
 *  CRM the document itself names. */
export function ConversationJoins({
  id,
  label,
  index,
  title,
  strokeTitle,
  lead,
  claim,
  items,
  closing,
}: {
  /** DevTools handle: id anchors the section, data-section names it. */
  id: string;
  label: string;
  index?: string;
  title: string;
  strokeTitle?: string;
  lead: string;
  claim: string;
  items: { agent: string; join: string }[];
  closing: string;
}) {
  return (
    <section id={id} data-section={label} className="relative overflow-x-clip py-14 sm:py-16">
      <Container className="relative">
        <SectionHeader
          index={index}
          title={title}
          strokeTitle={strokeTitle}
          mark={{ variant: "network", label: "Before, and after" }}
          className="mb-12"
        />

        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Rise>
            <p className="max-w-[58ch] text-base leading-relaxed text-fog sm:text-lg">{lead}</p>
          </Rise>
          <Rise delay={0.08}>
            <p className="font-display max-w-[28ch] text-[clamp(1.05rem,1.9vw,1.5rem)] font-extrabold uppercase leading-[1.15] text-brand lg:justify-self-end">
              {claim}
            </p>
          </Rise>
        </div>

        {/* Three joins. The drawing differs per case because the direction of
            the join is the whole point. */}
        <ol className="mt-14 grid gap-x-10 gap-y-12 lg:grid-cols-3">
          {items.map((c, i) => (
            <Rise key={c.agent} delay={0.06 + i * 0.08}>
              <li className="group">
                <Join at={i} />
                <span
                  aria-hidden
                  className="mt-7 block h-px w-8 bg-line transition-all duration-500 group-hover:w-20 group-hover:bg-brand motion-reduce:transition-none"
                />
                <p className="mt-4 max-w-[30ch] text-[1.0625rem] leading-snug text-fog transition-colors duration-500 group-hover:text-snow motion-reduce:transition-none">
                  <span className="font-display font-bold uppercase text-brand-text">{c.agent}</span>{" "}
                  {c.join}
                </p>
              </li>
            </Rise>
          ))}
        </ol>

        <Rise delay={0.14} className="mt-14 border-t-2 border-line pt-8">
          <p className="max-w-[74ch] text-base leading-relaxed text-fog sm:text-lg">{closing}</p>
        </Rise>
      </Container>
    </section>
  );
}

/** One join. Index 0 reaches back, 1 reaches forward, 2 carries across. */
function Join({ at }: { at: number }) {
  return (
    <svg viewBox="0 0 300 96" className="h-auto w-full max-w-[22rem]" fill="none" aria-hidden>
      {/* The conversation. Always the same object, always in the middle, so
          only the attachment changes between the three. */}
      <rect
        x="108"
        y="26"
        width="84"
        height="44"
        rx="8"
        stroke="var(--color-ash)"
        strokeWidth="1.6"
      />
      <rect
        className="ci-grow-x"
        x="120"
        y="38"
        width="42"
        height="5"
        rx="2.5"
        fill="var(--color-ash)"
        fillOpacity="0.5"
      />
      <rect
        className="ci-grow-x"
        x="120"
        y="50"
        width="56"
        height="5"
        rx="2.5"
        fill="var(--color-ash)"
        fillOpacity="0.35"
        style={{ animationDelay: "0.7s" }}
      />

      {at === 0 && (
        <>
          {/* Upstream: the campaign that sent them. */}
          <path
            className="ci-flow"
            d="M96 48 H62"
            pathLength={100}
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M74 40 66 48 74 56"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="8" y="30" width="48" height="36" rx="6" stroke="var(--color-brand)" strokeWidth="2" />
          <path d="M20 48 H44" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 40 V56" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {at === 1 && (
        <>
          {/* Downstream: the record that has to change. */}
          <path
            className="ci-flow"
            d="M204 48 H238"
            pathLength={100}
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M226 40 234 48 226 56"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="244" y="22" width="48" height="52" rx="6" stroke="var(--color-brand)" strokeWidth="2" />
          <path d="M254 36 H282" stroke="var(--color-brand)" strokeWidth="2" strokeLinecap="round" />
          <path d="M254 48 H274" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
          <path d="M254 60 H278" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        </>
      )}

      {at === 2 && (
        <>
          {/* Across: the person, and what travels with the conversation. */}
          <path
            className="ci-flow"
            d="M204 48 H236"
            pathLength={100}
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M228 40 236 48 228 56"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="264" cy="40" r="11" stroke="var(--color-brand)" strokeWidth="2" />
          <path
            d="M247 72a17 17 0 0 1 34 0"
            stroke="var(--color-brand)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Already attached. */}
          <rect
            x="206"
            y="56"
            width="26"
            height="20"
            rx="4"
            fill="var(--color-void)"
            stroke="var(--color-brand)"
            strokeWidth="1.6"
          />
          <path d="M212 64 H226" stroke="var(--color-brand)" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M212 69 H222" stroke="var(--color-brand)" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        </>
      )}
    </svg>
  );
}

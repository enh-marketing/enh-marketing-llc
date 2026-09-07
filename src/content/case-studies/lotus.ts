// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/lotus
//
// Every sentence below is that page's own: the title is its <h1>, the four
// figures are its counter strip, and the four sections are its COMPANY
// PROFILE, challenges, Approach and Outcome rich text, converted block for
// block. Nothing is reworded, summarised, shortened or added, and no figure
// appears anywhere that the page does not publish.
//
// WHAT IS NOT THE SOURCE'S OWN, and why each one is here rather than invented:
// `client` is lifted from the profile's first sentence, `sector` is assigned
// with the phrase it was read from beside it, each entry in `services` carries
// the sentence that names it, and the results sheet's alt text is authored
// because the source publishes none. See scripts/migrate-case-studies/meta.py.
//
// Generated. To re-migrate, re-run the converter rather than editing by hand.

import type { Study } from "@/content/case-studies";

export const study: Study = {
  slug: "lotus",
  client: "Lotus Dental Clinic",
  title: "29% Increase in Local Calls for a Dental Clinic",
  sector: "Healthcare",
  sectorEvidence: "comprehensive range of dental services",
  order: 20,
  metrics: [
    {
      value: "51%",
      label: "Increase in incoming calls from local SEO optimization over the first 12 months",
    },
    {
      value: "29%",
      label: "Increase in local calls",
    },
    {
      value: "67%",
      label: "Increase in direction requests from local SEO optimization over the first 12 months",
    },
    {
      value: "66%",
      label: "Planned and executed social media campaigns focusing on improving Dubai's audience",
    },
  ],
  services: [
    {
      key: "local",
      evidence: "We optimized the clinic's GMB profile by updating accurate business information",
    },
    {
      key: "content",
      evidence: "active management of customer reviews and local content creation",
    },
    {
      key: "social",
      evidence: "the clinic executed targeted social media campaigns designed to resonate with the Dubai audience",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "Lotus Dental Clinic, located in Dubai, offers a comprehensive range of dental services with a focus on patient satisfaction. The dentists are highly skilled and experienced, and they are passionate about providing their patients with the best possible care. The clinic is committed to providing its patients with a comfortable and stress-free experience.",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        "Lotus Dental Clinic, located in a competitive urban area, reached out to our digital marketing agency with the goal of increasing their visibility among local residents. Despite providing high-quality dental services, the clinic struggled with being locally known, and they sought to boost phone calls and drive more foot traffic to their location. The clinic had low local online visibility, making it challenging for potential patients to find them. In the densely populated urban area, several dental clinics vied for the same local clientele.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        "We initiated the project by conducting a comprehensive audit of the clinic's online presence, including its website, Google My Business profile, and local directory listings. In collaboration with the clinic, we identified relevant local keywords and phrases that potential patients might use when searching for dental services in the area.",
      ],
    },
    {
      type: "p",
      text: [
        "We optimized the clinic's GMB profile by updating accurate business information, adding high-quality images, and regularly posting updates. Customer reviews were actively managed, encouraging satisfied patients to leave positive feedback. We also implemented a strategy to build high-quality, local backlinks through partnerships with local businesses, dental associations, and relevant online directories.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "In a remarkably short period after commencing our partnership, the clinic witnessed a significant 29% surge in incoming phone calls, underscoring a substantial rise in inquiries and appointments.",
      ],
    },
    {
      type: "p",
      text: [
        "The clinic's dedicated Local SEO efforts were equally impactful, resulting in a remarkable 23% increase in people searching specifically for the clinic's location and services over the first 12 months. Simultaneously, the clinic's Google My Business (GMB) profile flourished, gaining a greater number of positive reviews and ascending in local search rankings. This all played a pivotal role in augmenting the clinic's overall visibility and local presence.",
      ],
    },
    {
      type: "p",
      text: [
        "Through active management of customer reviews and local content creation, the clinic cultivated a strong local reputation, establishing itself as a trusted healthcare provider among local residents. Furthermore, the clinic continued to reap the benefits of these enhanced local SEO strategies, with a consistent and substantial 51% rise in incoming calls and a remarkable 67% surge in direction requests over the initial 12 months.",
      ],
    },
    {
      type: "p",
      text: [
        "Taking an additional stride, the clinic executed targeted social media campaigns designed to resonate with the Dubai audience. This deliberate effort resulted in a notable 66% improvement in the engagement and connection with the local population, further strengthening the clinic's position as a trusted healthcare resource.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/lotus/card.webp",
    small: "/case-studies/lotus/card-700.webp",
    alt: "Lotus Dental Clinic - 85% Increase in incoming calls",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/lotus/sheet-full-1200.webp",
    full: "/case-studies/lotus/sheet-full.webp",
    alt: "Results sheet published for Lotus Dental Clinic: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1116,
  },
  projectUrl: "https://lotusdentalclinic.net/",
  source: "https://enhmedia.com/case-studies/lotus",
};

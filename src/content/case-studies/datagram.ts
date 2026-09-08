// Migrated from the live site, verbatim.
// SOURCE: https://enhmedia.com/case-studies/datagram
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
  slug: "datagram",
  client: "Datagram Store",
  title: "Transforming the High-End IT Product E-Commerce Experience",
  sector: "Technology & IT",
  sectorEvidence: "high-end IT product e-commerce website",
  order: 14,
  metrics: [
    {
      value: "+426%",
      label: "Growth in total users",
    },
    {
      value: "20+",
      label: "High-intent keywords in Top 3",
    },
    {
      value: "+60%",
      label: "Increase in GMB call clicks",
    },
    {
      value: "+36%",
      label: "Growth in direct phone enquiries",
    },
  ],
  services: [
    {
      key: "web",
      evidence: "A user-friendly interface with detailed product descriptions, specifications, and intuitive navigation was designed",
    },
  ],
  profile: [
    {
      type: "p",
      text: [
        "We will explore the journey of Datagram Store, a high-end IT product e-commerce website specializing in servers, network switches, routers, and firewalls. The aim was to create a cutting-edge online platform that not only showcased these products but also incorporated modern communication functionalities. Other challenges they faced were:",
      ],
    },
  ],
  challenge: [
    {
      type: "p",
      text: [
        {
          b: [
            "Product Complexity:",
          ],
        },
        " High-end IT products can be highly complex and require in-depth technical knowledge. Ensuring that customers can understand these products was a significant challenge.",
      ],
    },
    {
      type: "p",
      text: [
        {
          b: [
            "Competitive Market:",
          ],
        },
        "The IT product market is highly competitive, with established players. Standing out was a daunting task.",
      ],
    },
    {
      type: "p",
      text: [
        {
          b: [
            "Real-time Communication:",
          ],
        },
        " Incorporating real-time communication capabilities for technical queries was essential but challenging.",
      ],
    },
    {
      type: "p",
      text: [
        {
          b: [
            "Security Concerns:",
          ],
        },
        "Given the nature of the products, security and trust were paramount. Ensuring the safety of customer data and transactions was a constant concern.",
      ],
    },
  ],
  approach: [
    {
      type: "p",
      text: [
        {
          b: [
            "User-Friendly Interface:",
          ],
        },
        " A user-friendly interface with detailed product descriptions, specifications, and intuitive navigation was designed",
      ],
    },
    {
      type: "p",
      text: [
        {
          b: [
            "Advanced Searchand Filtering:",
          ],
        },
        " The website incorporated advanced search and filtering optionsto help customers find the right products quickly.",
      ],
    },
    {
      type: "p",
      text: [
        {
          b: [
            "Knowledge Base:",
          ],
        },
        " A comprehensive knowledge base with technical guides, specifications, and detailed information was created to educate customers.",
      ],
    },
    {
      type: "p",
      text: [
        {
          b: [
            "Multi-Layered Security: Multi",
          ],
        },
        "-layered security measures, including SSL encryption and regular security audits, were put in place to protect customer data.",
      ],
    },
  ],
  outcome: [
    {
      type: "p",
      text: [
        "In revamping this high-end IT product e-commerce website, the challenges were immense, but the results were extraordinary. By focusing on user experience, customization, knowledge sharing, and security, the website transformed into a market leader. The case study demonstrates how embracing modern functionalities and overcoming challenges can lead to success in the competitive e-commerce landscape for high-end IT products.",
      ],
    },
  ],
  thumb: {
    src: "/case-studies/datagram/card.webp",
    small: "/case-studies/datagram/card-700.webp",
    alt: "datagram - +426% in total users",
    w: 1400,
    h: 980,
  },
  sheet: {
    src: "/case-studies/datagram/sheet-full-1200.webp",
    full: "/case-studies/datagram/sheet-full.webp",
    alt: "Results sheet published for Datagram Store: a one-page summary of the campaign's figures.",
    w: 2000,
    h: 1116,
  },
  projectUrl: "https://datagram.ae/",
  source: "https://enhmedia.com/case-studies/datagram",
};

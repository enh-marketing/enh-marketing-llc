// AI Workshops & Training — page content.
// Copy source: "AI Workshops & Training.docx" (client-supplied). VERBATIM.
//
// DEPARTURES FROM THE SOURCE:
//
//   1. The banner carries a Heading 1 ("AI Workshops & Training") and a
//      Heading 4 ("Corporate AI training for UAE teams"). ServiceHero sets a
//      three-line display headline, so the H1 takes the first two lines and the
//      subhead's own tail, "for UAE teams", takes the third. No word is added.
//   2. The banner has two paragraphs. ServiceHero sets one, so they are set
//      here as one paragraph, in order, with no word changed.
//
// NO QUANTITIES. The document states no durations beyond the format names, no
// participant counts, no prices and no outcomes. FAQ 8 explicitly refuses a
// number ("Hands-on workshops work best with smaller groups"), so nothing in
// any drawing counts seats, hours or people. The rooms drawn in the formats
// section carry arrangement, never a roll call.
//
// FORM. The standard site-wide set applies.

import type { Faq } from "@/content/services/performance-marketing";

export const meta = {
  title: "AI Workshops & Training in Dubai | ENH Marketing",
  // The banner's first sentence, verbatim.
  description:
    "ENH Marketing runs practical corporate AI training in Dubai and across the UAE. Each session is built around the team’s actual workflows, tools and responsibilities.",
};

export const hero = {
  // Departure 1.
  lines: ["AI Workshops", "& Training", "for UAE Teams"] as [string, string, string],
  // Departure 2: the banner's two paragraphs, as one.
  sub: "ENH Marketing runs practical corporate AI training in Dubai and across the UAE. Each session is built around the team’s actual workflows, tools and responsibilities. The focus is on helping non-technical employees use AI properly at work, recognise unreliable output and identify processes where automation could provide real value. Every workshop ends with a documented shortlist of relevant AI use cases for the business.",
  primary: "Book a Workshop",
  secondary: "Talk to Us About a Programme",
  /** The four moves the hero draws, in the document's own words: a real task
   *  goes to a tool, the output is checked, and weak work is improved rather
   *  than restarted. Every label below is a clause of the training list. */
  loop: ["Real task", "AI output", "Checked", "Improved"] as [string, string, string, string],
};

/** "What We Do", set on the site's own Narrative. Three paragraphs: what the
 *  service is, what a session works on, and how it can be delivered. */
export const narrative = {
  heading: ["AI Training That Uses", "Your Team’s Real Work"] as [string, string],
  scene:
    "We provide AI training for businesses in the UAE that want their employees to use AI more effectively and responsibly.",
  sceneEmphasis: "more effectively and responsibly",
  body: "The sessions use real tasks from the participating team. These may include research, drafting, summarising, data clean-up, reporting, customer communication or evaluating information produced by AI tools. We also cover the limits of generative AI, including inaccurate output, confidentiality concerns and situations where AI should not be used.",
  bodyEmphasis: ["real tasks", "the limits of generative AI", "should not be used"],
  outro: [
    "The training can be delivered as a half-day introduction, full-day practical workshop, leadership session or multi-session programme. On-site workshops are available in Dubai and across the UAE, with remote delivery also available.",
  ],
};

/** One workshop format. `scene` selects the drawing.
 *
 *  An earlier version drew all four as the same room with the furniture moved
 *  around, which made four pictures that looked like each other: the room was
 *  the constant and the differences were small. The four formats do not differ
 *  by where they are held, they differ by what happens. A half day takes a team
 *  who have "experimented with tools such as ChatGPT without developing a
 *  consistent way to use them" and gives them one. A full day is hands on a
 *  table producing a shortlist. A leadership session is a judgement on
 *  proposals. A multi-session programme builds, course by course, "once the
 *  team has established a reliable foundation".
 *  Each therefore gets its own object, its own camera and its own composition,
 *  and `cite` names the clause its drawing was read from. */
export type Format = {
  no: string;
  title: string;
  body: string;
  note: string;
  scene: "consistency" | "work" | "judge" | "foundation";
  /** The clause the drawing was read from. Printed with it, so the picture is
   *  checkable against the document. */
  cite: string;
};

export const formats = {
  title: "Our AI Workshop",
  strokeTitle: "Formats in Dubai",
  items: [
    {
      no: "01",
      title: "Half-Day AI Introduction",
      body: "The half-day introduction gives employees a practical understanding of what current AI tools can do and where they commonly fail. It is suitable for teams that have limited experience or have experimented with tools such as ChatGPT without developing a consistent way to use them.",
      note: "The session covers everyday work applications, basic prompting, output checking and safe usage. Examples are adjusted to the department attending so employees can connect the training to their own responsibilities.",
      scene: "consistency",
      cite: "without developing a consistent way to use them",
    },
    {
      no: "02",
      title: "Full-Day Practical Workshop",
      body: "The full-day AI workshop is built around the team’s workflows, tools and real business tasks. Participants work through practical exercises covering research, drafting, analysis, summarising, data preparation and other relevant applications.",
      note: "The session also covers prompt development, output checking and responsible use. It ends with a written shortlist of business processes that may benefit from AI support or automation, ranked by expected value and implementation effort.",
      scene: "work",
      cite: "Participants work through practical exercises",
    },
    {
      no: "03",
      title: "Leadership AI Session",
      body: "The leadership session is designed for founders, COOs, department heads and other decision-makers. It focuses on where AI can support the organisation, what implementation involves and which opportunities deserve attention first.",
      note: "Participants review relevant business use cases, costs, operational requirements and risks. The session helps leadership evaluate proposed AI projects, challenge unrealistic claims and make informed decisions about tools, training, automation and internal governance.",
      scene: "judge",
      cite: "evaluate proposed AI projects, challenge unrealistic claims",
    },
    {
      no: "04",
      title: "Multi-Session AI Programme",
      body: "The multi-session programme supports AI upskilling across several teams or departments. Sessions are delivered over an agreed period, giving participants time to apply what they learn and return with questions from their daily work.",
      note: "Each department can receive role-specific exercises, prompts and use cases. Follow-up sessions review adoption, correct poor usage habits and develop more advanced applications once the team has established a reliable foundation.",
      scene: "foundation",
      cite: "once the team has established a reliable foundation",
    },
  ] as Format[],
};

/** "What Your Team Learns to Do With AI". Twelve capabilities, set as one
 *  continuous run rather than a grid of twelve cards. */
export const skills = {
  title: "What Your Team Learns",
  strokeTitle: "to Do With AI",
  lead: "The training is practical and adjusted to the roles attending. Employees work through tasks that relate to their own jobs rather than generic examples with little connection to the business.",
  intro: "Depending on the team and workshop format, the training can cover:",
  items: [
    "Using AI for drafting, research, summarising and analysis",
    "Cleaning, organising and reviewing business data",
    "Writing prompts that produce clearer and more useful output",
    "Giving an AI tool enough context to complete a task properly",
    "Checking claims, calculations, sources and missing information",
    "Recognising plausible-sounding output that may be incorrect",
    "Improving weak AI-generated work without starting again",
    "Creating reusable prompts for repeated tasks",
    "Evaluating new AI tools before adopting them",
    "Identifying tasks that may be suitable for automation",
    "Recognising work that should remain with employees",
    "Understanding when confidential information must not be entered",
  ],
  note: "ChatGPT training for teams in Dubai can be included, but the programme is not built around one product alone. Employees also learn principles that remain useful when tools and models change.",
};

/** "What You Receive After the Workshop". Eight deliverables, and the sentence
 *  that makes them matter, which the section deliberately ends on. */
export const receive = {
  title: "What You Receive",
  strokeTitle: "After the Workshop",
  lead: "The value of the programme should continue after the training session ends.",
  intro: "Depending on the agreed format, the deliverables can include:",
  items: [
    "A written shortlist of AI use cases identified during the session",
    "A value-and-effort ranking for possible automation opportunities",
    "A prompt library for the roles or departments that attended",
    "Workshop materials and practical reference notes",
    "A draft internal AI usage policy",
    "Recommendations for additional training or implementation",
    "A summary of tools or access requirements discussed",
    "An agreed action list for leadership or department heads",
  ],
  /** The clause the section exists for. Set at display scale, not buried. */
  keep: "The use-case shortlist remains useful even if the business does not proceed with another ENH service.",
  closing:
    "It can be reviewed internally, passed to an existing technology team or used to plan future AI investment. If the workshop identifies a process worth automating, ENH Marketing can assess and build the required system as a separate project.",
};

export type Stage = { no: string; title: string; body: string };

/** "How the AI Training Programme Works". Six numbered steps, on the site's own
 *  StageLadder: the panel holds while the stages travel past it. */
export const process = {
  title: "How the AI Training",
  strokeTitle: "Programme Works",
  items: [
    {
      no: "01",
      title: "Initial Discussion",
      body: "We discuss the team, current AI usage, business priorities and the type of training required.",
    },
    {
      no: "02",
      title: "Team and Workflow Review",
      body: "We review the participants’ roles, recurring tasks, available tools and any internal restrictions that need to be considered.",
    },
    {
      no: "03",
      title: "Workshop Scope",
      body: "You receive a recommended format, agenda, delivery method, participant guidance and clear list of post-session deliverables.",
    },
    {
      no: "04",
      title: "Workshop Preparation",
      body: "The exercises, examples and prompt activities are prepared around the team’s work. Sensitive business information does not need to be shared unless an approved method has been agreed.",
    },
    {
      no: "05",
      title: "Training Delivery",
      body: "The session is delivered on-site or remotely. Participants complete practical exercises, review AI output and discuss possible applications within their roles.",
    },
    {
      no: "06",
      title: "Follow-Up",
      body: "Additional sessions or implementation support can be arranged where the business wants to develop the identified use cases further.",
    },
  ] as Stage[],
  /** Zero-based index of the step that is the session itself. Four of the six
   *  happen before anyone is in a room, which is the shape of the service. */
  dayAt: 4,
};

/** "Keeping the Training Useful After the Session". Eight things follow-up
 *  covers, drawn as a return rather than a list, because the section's own
 *  subject is coming back at agreed stages. */
export const followUp = {
  title: "Keeping the Training",
  strokeTitle: "Useful After the Session",
  lead: "One workshop can introduce useful skills, but employees still need to apply them during normal work. Multi-session programmes include follow-up at agreed stages. These sessions review how the team has used AI, where the output failed and which tasks were harder to apply than expected.",
  intro: "Follow-up support can include:",
  items: [
    "Reviewing how employees are using approved tools",
    "Improving prompts developed after the workshop",
    "Checking whether initial use cases remain practical",
    "Addressing unreliable or inefficient usage",
    "Updating guidance when tools or policies change",
    "Training additional departments",
    "Developing more advanced role-specific applications",
    "Assessing processes identified for automation",
  ],
  closing:
    "Single-session workshops can also include an optional follow-up review. The exact support period and deliverables are stated in the proposal.",
};

/** "AI Training Backed by Real Delivery Experience". The section is a contrast
 *  the document draws itself: a trainer's programme stops at recommendations,
 *  and this one does not. Drawn as two paths, one of which ends. */
export const experience = {
  title: "AI Training Backed by",
  strokeTitle: "Real Delivery Experience",
  /** The path that stops, and the clause it stops on. */
  trainer: {
    label: "Many AI courses",
    body: "Many AI courses are designed by professional trainers. They may explain the tools clearly, but the programme often ends with recommendations that the trainer cannot implement.",
    stop: "recommendations that the trainer cannot implement",
  },
  /** The path that continues, and what it continues into. */
  ours: {
    label: "ENH Marketing",
    body: "ENH Marketing works with AI systems in active business environments. Our work includes automation, AI agents, reporting systems and AI-supported marketing processes for UAE businesses.",
    /** The document's own four, as the work the training draws on. */
    work: ["automation", "AI agents", "reporting systems", "AI-supported marketing processes"],
  },
  closing:
    "The training draws on that practical experience, including the issues that appear during testing and implementation. Participants learn what tools can support, where human checking remains necessary and why some attractive use cases are poor candidates for automation. If the workshop identifies an opportunity worth developing, our team can assess the technical requirements and build the solution.",
  cta: "Book a Workshop",
};

export const faqs: Faq[] = [
  {
    q: "What is corporate AI training?",
    a: "Corporate AI training teaches employees how to use AI tools within their actual jobs. A useful programme is built around the company’s workflows, available tools and internal requirements. It should cover practical applications, output checking, confidentiality and responsible use alongside prompt writing.",
  },
  {
    q: "What should we train our team on AI?",
    a: "Start with the tasks employees already complete regularly. Training should cover relevant AI use cases, clear prompting, fact-checking, confidentiality, output approval and the limits of each tool. Employees should also learn how to identify tasks that may be suitable for automation and those that still require human judgement.",
  },
  {
    q: "Who is AI training for?",
    a: "The sessions are designed for non-technical employees in marketing, sales, operations, HR, finance, customer service and administration. Separate leadership sessions are available for founders, COOs and department heads who need to assess opportunities, costs and risks without learning technical development.",
  },
  {
    q: "Do employees need technical knowledge?",
    a: "No. The workshops do not require coding or an AI background. Participants work through familiar business tasks using accessible tools. The level of the session is adjusted according to the team’s existing experience, from employees opening an AI tool for the first time to regular users who need better methods.",
  },
  {
    q: "Do you provide ChatGPT training for teams in Dubai?",
    a: "Yes. ChatGPT can be included when it is already used or approved by the business. The workshop can cover prompting, task setup, output checking and safe usage. We also teach broader principles that apply across generative AI tools, since companies should not depend entirely on one platform.",
  },
  {
    q: "What is the difference between an AI workshop and an online course?",
    a: "An online course normally uses a standard curriculum and general examples. A corporate AI workshop uses the company’s workflows, tools and employee roles. Participants can ask about their own tasks, practise relevant use cases and leave with recommendations prepared for their business.",
  },
  {
    q: "How much does corporate AI training cost in Dubai?",
    a: "The cost depends on the workshop format, number of participants, departments involved, and level of customisation. Multi-session programmes and company-wide rollouts are scoped separately from a standard full-day workshop, with all preparation, delivery and follow-up costs shown in the proposal.",
  },
  {
    q: "How many people can attend an AI workshop?",
    a: "Hands-on workshops work best with smaller groups because participants complete exercises and discuss their own tasks. Larger groups can attend introductory or leadership sessions where the emphasis is on understanding AI applications, risks and decision-making.",
  },
  {
    q: "Can you deliver the workshop at our office?",
    a: "Yes. Workshops can be delivered at the client’s office in Dubai or elsewhere in the UAE. Remote delivery is also available. On-site sessions are usually better for practical team exercises because participants can work together and discuss how AI fits their existing process.",
  },
  {
    q: "Which AI tools do you cover?",
    a: "Being a digital marketing agency that stays ahead of the curve in the industry, our team is adept at multiple AI tools. The selection depends on what the company already uses, what it has approved, and the work employees need to complete. The training also shows participants how to assess new tools instead of adopting products simply because they are receiving attention.",
  },
  {
    q: "Will the workshop stop employees from entering confidential information into AI tools?",
    a: "The workshop provides clear guidance, but training alone cannot control every action. We explain what information should not be entered, how to check the settings and terms of approved tools, and when internal approval is needed. A draft usage policy can also be included in the deliverables.",
  },
  {
    q: "What do we receive after the workshop?",
    a: "Depending on the selected format, you can receive a written AI use-case shortlist, value-and-effort ranking, role-specific prompt library, workshop materials and a draft internal usage policy. The proposal confirms the exact post-workshop deliverables before the session is booked.",
  },
  {
    q: "Do you also build the systems identified during the workshop?",
    a: "Yes. ENH Marketing can assess and build suitable automations, agents and custom AI tools identified during the session. Implementation is treated as a separate project with its own technical review, scope and cost. The company can also use the recommendations internally without continuing with us.",
  },
];

/** The closing block's three sentences, split between the two places the site
 *  puts a call to action. GrowthCta mid-page takes the invitation; CtaBand at
 *  the foot takes the recommendation. Same split every other service page uses,
 *  so no sentence prints twice. */
export const finalCta = {
  title: "Book an",
  strokeTitle: "AI Workshop",
  invite:
    "Tell us which teams need training, how they currently use AI and what you want employees to do more effectively.",
  body: "We will recommend a suitable workshop format and review the workflows, tools and business examples that should be included. You will receive a clear agenda, participant guidance, deliverables and programme fee before confirming the session.",
  primary: "Book a Workshop",
};

export { standardFormFields as formFields } from "@/content/forms";

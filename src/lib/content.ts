// ENH V3 — flagship narrative copy + the complete live content of enhmedia.com.
// All 22 case studies, 8 services, 7 testimonials, 6 FAQs, 30 clients,
// recognition platforms, certifications and footer links are included.

export const brand = {
  name: "ENH",
  legal: "ENH Marketing LLC",
  tagline: "Explore New Heights",
  growthLine: "Your Digital Growth Experts",
  city: "Dubai",
  email: "info@enhmedia.com",
  phone: "+971 4 239 0828",
  phoneHref: "+97142390828",
  whatsapp: "97142390828",
  address: "#207, Arcade Building, Al Garhoud, Dubai, UAE",
};

// Site structure lives in @/lib/sitemap. This file is content only.

// TODO(client): swap in the real profile URLs.
export const social = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export const heroWords = ["EXPLORE", "NEW", "HEIGHTS"];

export const heroSub =
  "Top digital marketing agency in Dubai, UAE. For fifteen years we've turned ambition into market share — with craft, data and a little bit of theatre.";

export const certifications = [
  "Google Partner",
  "Meta Business Partner",
  "Google Ads Certified",
  "Shopping Ads Certified",
];

export const manifesto =
  "Every brand has a height it hasn't reached yet. A market it hasn't moved. A story it hasn't told loudly enough. We exist for that gap — between where you are and where you refuse to stop short of. We are ENH. And we climb with you.";

export const stats = [
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 4200, suffix: "+", label: "Successful projects" },
  { value: 95, suffix: "%", label: "Client retention" },
  { value: 22, suffix: "+", label: "Team of experts" },
];

export const clients = [
  "EKC", "EKX", "Ariiz International", "Blue Bell Shipping", "Axcl",
  "CHS Pharmacy", "BW Interiors", "Comply", "Masterkraft", "Manipal",
  "Fabinex", "Nalsoft", "Matrix Finishes", "PKF UAE", "NewEast",
  "Supercad", "Texol", "Saifee Computers", "Top Shelf", "Trosten",
  "TTC", "Allday", "TRCpamco", "Atlas", "Bin Dasmal Group",
  "Dubai Duty Free", "Dubai Islamic Bank", "Procat", "RHS Logistics", "Venesta",
];

export const recognition = [
  "Clutch", "Trustpilot", "Agency Spotter", "DesignRush", "Goodfirms", "Sortlist",
];

export type Craft = {
  no: string;
  title: string;
  tag: string;
  body: string;
  items: string[];
};

// The 8 live ENH service lines, told as chapters of the climb.
export const crafts: Craft[] = [
  {
    no: "01",
    title: "Search Engine Optimization",
    tag: "Organic Growth",
    body: "Your brand's visibility online and improved search rankings through expert SEO. Tested methods that help people find your website when they most need it — driving qualified traffic, leads and sales.",
    items: ["Technical & on-page SEO", "Local SEO services", "Ecommerce SEO", "Authority building"],
  },
  {
    no: "02",
    title: "Social Media Marketing",
    tag: "Community & Content",
    body: "We bring life to your social presence with interesting, viral content that grows your brand communities naturally. Our experts know how to spark conversations with your target audience.",
    items: ["Facebook marketing", "Instagram marketing", "Community management", "Paid social"],
  },
  {
    no: "03",
    title: "Search Advertising",
    tag: "PPC & Performance",
    body: "Be found. Be noticed. Be heard. Turn clicks into conversions — boost sales and make every click count by connecting with high-intent customers at the exact moment they're ready to buy.",
    items: ["Google Ads", "Shopping campaigns", "Display & YouTube", "Conversion tracking"],
  },
  {
    no: "04",
    title: "Digital Marketing Campaigns",
    tag: "Strategy & Execution",
    body: "From strategy creation to campaign execution, our experts create personalized campaigns that have a significant, long-lasting effect on your business.",
    items: ["Campaign strategy", "Creative direction", "Multi-channel rollout", "Reporting & insights"],
  },
  {
    no: "05",
    title: "B2B Lead Generation",
    tag: "Pipeline & Demand",
    body: "A lead-generation engine meticulously designed for optimal ROI. We generate leads and increase sales faster by connecting you with high-value decision-makers ready to do business.",
    items: ["Demand generation", "Funnel design", "Marketing automation", "Sales enablement"],
  },
  {
    no: "06",
    title: "Web Design & Development",
    tag: "Web & Experience",
    body: "Your website is the summit flag. High-performance sites engineered for ROI — fast enough to rank, sharp enough to convert, and bold enough to be remembered.",
    items: ["UX & UI design", "Development", "E-commerce builds", "Website support services"],
  },
  {
    no: "07",
    title: "Content Creation",
    tag: "Narrative & Copy",
    body: "Crafting compelling narratives is our art. We breathe life into your brand with captivating content that resonates with your audience — fostering loyalty and turning followers into advocates.",
    items: ["Brand storytelling", "Copywriting", "Blogs & SEO content", "Social content"],
  },
  {
    no: "08",
    title: "Video Production",
    tag: "Film & Motion",
    body: "Compelling video that captivates — brand films, social videos, corporate and event coverage. Your message is not just seen, but felt and remembered.",
    items: ["Corporate & brand films", "Event videos", "Explainer & testimonial", "Social video"],
  },
];

export type WorkItem = {
  client: string;
  title: string;
  metrics: { value: string; label: string }[];
};

// All 22 live case studies.
export const work: WorkItem[] = [
  {
    client: "Healthy Farm",
    title: "Consistent sales growth driven by high-quality lead generation",
    metrics: [
      { value: "211%", label: "Social reach growth in 30 days" },
      { value: "209%", label: "Increase in impressions" },
      { value: "80%", label: "Instagram audience expansion" },
      { value: "60+", label: "High-quality leads" },
    ],
  },
  {
    client: "Shass Gifts",
    title: "Search & local-market dominance for a corporate gifting brand",
    metrics: [
      { value: "#1", label: "For 'corporate gifts USB sticks'" },
      { value: "5,581", label: "GMB impressions at peak" },
      { value: "175", label: "Monthly conversions at peak" },
      { value: "4,331", label: "Backlinks · 402 domains" },
    ],
  },
  {
    client: "ACC Gulf",
    title: "Search authority & local lead growth in industrial supply",
    metrics: [
      { value: "#1", label: "High-value keyword rankings" },
      { value: "1,896", label: "Monthly users at peak" },
      { value: "1.8K", label: "Backlinks · 167 domains" },
      { value: "161", label: "Monthly GMB interactions" },
    ],
  },
  {
    client: "Helpsters",
    title: "High-value cleaning contracts through targeted SEO",
    metrics: [
      { value: "#1", label: "Event cleaning keywords" },
      { value: "183", label: "Monthly conversions" },
      { value: "3,450+", label: "Monthly page views at peak" },
      { value: "57", label: "Monthly GMB call clicks" },
    ],
  },
  {
    client: "Wafes",
    title: "Digital visibility for a refrigeration manufacturer",
    metrics: [
      { value: "#1", label: "Core manufacturing keywords" },
      { value: "20+", label: "Top-3 keyword positions" },
      { value: "1,000+", label: "New users at peak" },
      { value: "50", label: "Monthly WhatsApp enquiries" },
    ],
  },
  {
    client: "NeoData",
    title: "Search visibility & leads for an enterprise IT distributor",
    metrics: [
      { value: "#1", label: "'DellEMC distributors Dubai'" },
      { value: "2,086", label: "Monthly users at peak" },
      { value: "1,076", label: "GMB impressions" },
      { value: "60–70", label: "Monthly WhatsApp enquiries" },
    ],
  },
  {
    client: "Ariiz",
    title: "High-intent search growth for an industrial sealing supplier",
    metrics: [
      { value: "#1", label: "Industrial sealing keywords" },
      { value: "1,700+", label: "Monthly users at peak" },
      { value: "550+", label: "Authority backlinks" },
      { value: "75+", label: "WhatsApp enquiries / month" },
    ],
  },
  {
    client: "Onyx",
    title: "Digital dominance: 1,350+ monthly users, 6,100+ GMB impressions",
    metrics: [
      { value: "1,350+", label: "Peak organic traffic 2025" },
      { value: "70%", label: "Avg. engagement rate" },
      { value: "6,100+", label: "GMB impressions 2025" },
      { value: "45+", label: "Top-ranking keywords" },
    ],
  },
  {
    client: "DGR Aviation",
    title: "High-intent visibility for aviation compliance training",
    metrics: [
      { value: "#1", label: "DGR Training Dubai" },
      { value: "1,600+", label: "GMB impressions / month" },
      { value: "170+", label: "Local actions in peak months" },
      { value: "1,000+", label: "Monthly website users" },
    ],
  },
  {
    client: "Masterkraft",
    title: "Digital growth with a 346% increase in website traffic",
    metrics: [
      { value: "346%", label: "Traffic increase in 12 mo" },
      { value: "305%", label: "Organic traffic in 12 mo" },
      { value: "331%", label: "UAE organic traffic in 6 mo" },
      { value: "15+", label: "Top-10 keywords in 6 mo" },
    ],
  },
  {
    client: "Ultracare",
    title: "A 371% boost in website interactions",
    metrics: [
      { value: "371%", label: "Engagement increase in 12 mo" },
      { value: "126%", label: "More incoming inquiries" },
      { value: "76%", label: "New users from organic" },
      { value: "25%", label: "Traffic increase YoY" },
    ],
  },
  {
    client: "PKF UAE",
    title: "Driving success for PKF with a 71% traffic surge",
    metrics: [
      { value: "71%", label: "Traffic increase YoY" },
      { value: "90+", label: "Top-10 keywords in 12 mo" },
      { value: "85%", label: "More local audience reach" },
      { value: "53%", label: "More social media reach" },
    ],
  },
  {
    client: "Autobahn",
    title: "Accelerating success with 155% growth in website traffic",
    metrics: [
      { value: "155%", label: "Traffic increase YoY" },
      { value: "1,070", label: "Organic conversions in 6 mo" },
      { value: "260", label: "Organic call inquiries in 6 mo" },
      { value: "22%", label: "UAE organic improvement" },
    ],
  },
  {
    client: "AllDay Supermarket",
    title: "Incredible 64× increase in social media impressions",
    metrics: [
      { value: "64×", label: "More impressions in 12 mo" },
      { value: "18,914", label: "Total app installs" },
      { value: "14×", label: "More impressions, next 12 mo" },
      { value: "12 mo", label: "Sustained optimization" },
    ],
  },
  {
    client: "Datagram",
    title: "Transforming high-end IT product e-commerce",
    metrics: [
      { value: "+426%", label: "Growth in total users" },
      { value: "20+", label: "High-intent keywords top 3" },
      { value: "+60%", label: "More GMB call clicks" },
      { value: "+36%", label: "More phone enquiries" },
    ],
  },
  {
    client: "Supercad",
    title: "Revamping IT solutions: 128% more organic traffic",
    metrics: [
      { value: "128%", label: "Organic traffic YoY" },
      { value: "47%", label: "New users from organic" },
      { value: "39%", label: "More UAE visitors" },
      { value: "20", label: "Top-10 keywords in 4 mo" },
    ],
  },
  {
    client: "TopShelf",
    title: "Boosting organic traffic by 245% in 12 months",
    metrics: [
      { value: "245%", label: "Organic traffic YoY" },
      { value: "424%", label: "New users from organic" },
      { value: "391%", label: "More engagements" },
      { value: "194%", label: "More UAE visitors" },
    ],
  },
  {
    client: "Arbrit Safety",
    title: "Health & safety, with a 242% increase in enquiries",
    metrics: [
      { value: "242%", label: "More incoming inquiries" },
      { value: "144%", label: "New users from organic" },
      { value: "49%", label: "Organic traffic YoY" },
      { value: "45+", label: "Top-10 keywords" },
    ],
  },
  {
    client: "Saifee Computers",
    title: "Accounting software sales — 85% more enquiries",
    metrics: [
      { value: "85%", label: "Increase in enquiries" },
      { value: "47%", label: "More Google conversions" },
      { value: "37%", label: "Organic traffic YoY" },
      { value: "40+", label: "Top-10 keywords" },
    ],
  },
  {
    client: "Royal Caviar",
    title: "Sales up 132% in the first six months",
    metrics: [
      { value: "132%", label: "Sales increase in 6 mo" },
      { value: "155%", label: "More total online sales" },
      { value: "97%", label: "New users from organic" },
      { value: "30%", label: "More online orders" },
    ],
  },
  {
    client: "Lotus Dental Clinic",
    title: "29% increase in local calls for a dental clinic",
    metrics: [
      { value: "51%", label: "More calls from local SEO" },
      { value: "67%", label: "More direction requests" },
      { value: "29%", label: "Increase in local calls" },
      { value: "66%", label: "Dubai social execution" },
    ],
  },
  {
    client: "Venesta",
    title: "New-market expansion for a washroom solutions provider",
    metrics: [
      { value: "235%", label: "More engagements" },
      { value: "174%", label: "Organic traffic YoY" },
      { value: "101%", label: "New users from organic" },
      { value: "61%", label: "Increase in enquiries" },
    ],
  },
];

export const whyENH = {
  heading: "Why ENH Marketing",
  about: [
    "At ENH Marketing LLC, we've earned our reputation as the leading digital marketing agency in Dubai through 15+ years of transforming businesses online. Our expertise spans SEO, PPC, social media, corporate video production and impactful digital campaigns — tailored to Dubai's diverse market and delivering measurable results for startups, SMEs and enterprises alike.",
    "We use a method focused on data and intelligent analysis to manage campaigns across Google's Search, Shopping, Display and YouTube networks — engaging users at every stage as they move toward a decision, and growing accounts steadily through constant supervision.",
  ],
  pillars: [
    { no: "01", title: "Certified Google Partner", body: "Elite recognition from Google for exceptional, customized digital marketing services in Dubai." },
    { no: "02", title: "Data-driven decisions", body: "Intelligent analysis of information guides every decision, maximizing sales and return on investment." },
    { no: "03", title: "Full-funnel coverage", body: "Search, Shopping, Display and YouTube — engaging users at every stage of their journey." },
    { no: "04", title: "Steady, supervised growth", body: "Constant supervision of accounts so businesses achieve the best possible results." },
  ],
  googlePartner: {
    heading: "We are a certified Google Partner",
    body: "Being an official Google Partner agency, we hold the esteemed recognition of an elite business partner acknowledged by Google. Collaborate with us to harness the expertise of proven digital marketers dedicated to advancing your online growth.",
  },
};

export const ai = {
  heading: "Step into the AI Digital World",
  sub: "Enhance AI visibility, accelerate growth, and maximize ROI",
  paragraphs: [
    "At ENH Marketing, we are embracing the future of digital marketing by integrating Artificial Intelligence into our services. As businesses in Dubai evolve in a fast-paced digital environment, AI helps us deliver smarter, faster and more data-driven marketing solutions.",
    "From intelligent marketing automation and AI-driven SEO insights to smart chatbots and advanced data analytics, we use AI technologies to improve efficiency, personalize user experiences and maximize campaign performance.",
  ],
  capabilities: [
    { title: "Marketing automation", body: "Intelligent workflows that nurture and convert around the clock." },
    { title: "AI-driven SEO insights", body: "Models that surface the opportunities competitors miss." },
    { title: "Smart chatbots", body: "Always-on assistants that qualify and engage every visitor." },
    { title: "Advanced data analytics", body: "Real-time intelligence that tells you what to do next." },
  ],
  cta: "Get In Touch",
};

export const process = [
  { no: "01", title: "Base Camp", body: "We listen harder than anyone you've hired. Audit, market mapping, and the honest conversation about where you actually stand." },
  { no: "02", title: "The Route", body: "Strategy is choosing what not to do. We chart the channels, creative and budget that reach your summit — and kill everything else." },
  { no: "03", title: "The Climb", body: "Sprints, not slogs. Campaigns ship in weeks, learnings ship in days, and you see every move on a live dashboard." },
  { no: "04", title: "The Summit", body: "Results, recorded. Then we look up — because every summit is base camp for the next one." },
];

export type Testimonial = { quote: string; name: string; org: string };

// All 7 live testimonials.
export const testimonials: Testimonial[] = [
  {
    quote: "A reliable agency providing accurate, effective and best SEO services to increase visibility, engagement and traffic. It has helped our business immensely — looking forward to many more years together.",
    name: "Kevin Sebi",
    org: "Autobahn Car Rental",
  },
  {
    quote: "We've done business with ENH for many years — extremely co-operative even with last-minute requests. Rankings improved, and the quality of inbound leads improved too. Highly recommended.",
    name: "Yusuf Sabir",
    org: "Director — ERP Solutions, Saifee Computers",
  },
  {
    quote: "They built our network online incredibly quickly — a high-value client within the first three weeks. Highly recommend ENH if you want to build your presence aggressively.",
    name: "Murali Krishnan N",
    org: "Division Manager, CMS Printing Press LLC",
  },
  {
    quote: "Very impressed with the team's customer-centric approach, dedication and level of communication. No hesitation recommending team ENH as a reliable partner.",
    name: "Aravindakshan Variath",
    org: "General Manager, UB Emirates LLC",
  },
  {
    quote: "Their dedicated team gives personal attention to our website and SEO, with encouraging results. We continue to receive very good inquiries and promising leads.",
    name: "Rajesh Iyer",
    org: "Top Shelf Technical Services LLC",
  },
  {
    quote: "Their intelligence and hard work pushed our website to a better ranking position and generated far more serious customers. A young, talented team full of enthusiasm.",
    name: "Vijayan",
    org: "Director, Supercad Trading LLC",
  },
  {
    quote: "Creative, proactive, responsive — working with us constantly over the last few years. Very happy to have ENH as our partner for web, SEO and social media.",
    name: "S.D. Pereira",
    org: "Managing Partner, PKF UAE",
  },
];

export const insights = [
  { category: "Milestone", title: "Celebrating 15 Years: Key Milestones That Shaped Our Agency", date: "April 2, 2026", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop&auto=format&q=80" },
  { category: "SEO", title: "From Traffic to Pipeline: Building ROI-Driven SEO Systems in the UAE", date: "January 16, 2026", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop&auto=format&q=80" },
  { category: "Strategy", title: "Why Most Digital Marketing in Dubai Fails to Deliver ROI", date: "December 30, 2025", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop&auto=format&q=80" },
];

export const faqs = [
  {
    q: "What makes ENH Marketing the best choice for digital marketing in Dubai?",
    a: "We combine global digital trends with a deep understanding of the UAE market's cultural and consumer nuances. Based in Dubai, we craft tailored strategies that resonate with local audiences while leveraging cutting-edge tools like AI-driven analytics and hyper-targeted ads. Our proven track record of driving revenue growth across industries sets us apart.",
  },
  {
    q: "How can digital marketing help my business grow in the UAE?",
    a: "Digital marketing boosts your visibility on platforms where UAE consumers spend their time — Instagram, Google and TikTok. Through localized SEO, social campaigns and Arabic-English bilingual content, we ensure your brand connects with diverse audiences, driving traffic, leads and sales specific to your goals.",
  },
  {
    q: "What is the cost of digital marketing services at ENH Marketing?",
    a: "Costs vary based on your needs, goals and campaign scope. We offer flexible packages — from budget-friendly options for small businesses to comprehensive strategies for enterprises. Contact us for a free consultation and a customized quote.",
  },
  {
    q: "How long does it take to see results from digital marketing campaigns?",
    a: "Results depend on the strategy — PPC ads can drive traffic within days, while SEO may take 3–6 months for significant organic growth. We prioritize quick wins alongside long-term growth, with detailed timelines and regular performance reports.",
  },
  {
    q: "How does ENH Marketing measure the success of digital campaigns?",
    a: "We use advanced analytics to track KPIs like website traffic, conversion rates, click-through rates and return on ad spend. Transparent, real-time reports show exactly how your investment is driving growth.",
  },
  {
    q: "What industries does ENH Marketing specialize in for digital marketing?",
    a: "We have extensive experience across real estate, hospitality, e-commerce, retail and F&B — industries that dominate the UAE market. We customize strategies to fit your industry's unique challenges, whether you're a startup or an established brand.",
  },
];

export const consultationServices = [
  "Search Engine Optimization",
  "Social Media Marketing",
  "Web Design & Development",
  "B2B Lead Generation",
  "Search Advertising",
  "Video Production",
  "Others",
];

export const workImages: Record<string, string> = {
  "Healthy Farm": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&auto=format&q=80",
  "Shass Gifts": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop&auto=format&q=80",
  "ACC Gulf": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop&auto=format&q=80",
  "Helpsters": "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?w=600&h=400&fit=crop&auto=format&q=80",
  "Wafes": "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop&auto=format&q=80",
  "NeoData": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=80",
  "Ariiz": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop&auto=format&q=80",
  "Onyx": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&h=400&fit=crop&auto=format&q=80",
  "DGR Aviation": "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=600&h=400&fit=crop&auto=format&q=80",
  "Masterkraft": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80",
  "Ultracare": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format&q=80",
  "PKF UAE": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format&q=80",
  "Autobahn": "https://images.unsplash.com/photo-1489686995744-f47e995ffe61?w=600&h=400&fit=crop&auto=format&q=80",
  "AllDay Supermarket": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop&auto=format&q=80",
  "Datagram": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format&q=80",
  "Supercad": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format&q=80",
  "TopShelf": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&auto=format&q=80",
  "Arbrit Safety": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop&auto=format&q=80",
  "Saifee Computers": "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=600&h=400&fit=crop&auto=format&q=80",
  "Royal Caviar": "https://images.unsplash.com/photo-1559588482-69774768212a?w=600&h=400&fit=crop&auto=format&q=80",
  "Lotus Dental Clinic": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&auto=format&q=80",
  "Venesta": "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=600&h=400&fit=crop&auto=format&q=80",
};


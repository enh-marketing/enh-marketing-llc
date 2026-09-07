"""THE ONLY EDITORIAL LAYER IN THIS MIGRATION. Everything else is the source's.

Four things are decided here rather than read off the live page, and each one
is written so it can be checked against the page it came from:

  CLIENT     The company's own name, taken from the first sentence of its
             COMPANY PROFILE (or, for AllDay, from the <h1>, which is the only
             place the page writes "AllDay Supermarket"). The live pages never
             print the client name as a field, so it has to be lifted from the
             prose; nothing is abbreviated or expanded on the way.

  SECTOR     Assigned, the way topics.py assigns a topic to a blog post that
             upstream files under "News". The live pages carry no industry
             field at all, so a filter needs one. `evidence` is the phrase in
             that study's own COMPANY PROFILE the assignment was read from, and
             it is printed on the page, so every label on the rail can be
             checked against the sentence it came from.

  SERVICES   A service is tagged ONLY where the study's own copy names it, and
             `evidence` is the sentence it was named in. This is the same rule
             testimonials.ts applies to its `mentions`, and it is why a study
             that describes a website rebuild and nothing else carries one tag
             rather than a full-looking set. verify.py fails the build if an
             evidence string is not a verbatim substring of its study.

  SHEET ALT  Authored, and the only sentence on these pages that is. The live
             pages publish the results sheet with an empty alt, and an empty
             alt on a chart carrying twenty figures is unusable. The sentence
             says what the image IS and claims nothing about what is in it.

DGR AVIATION IS PUBLISHED WITH ITS TWO MIDDLE SECTIONS SWAPPED. On the live
page the block headed "challenges" contains the approach ("To address these
challenges, a focused digital strategy was implemented...") and the block
headed "Approach" contains the challenge ("Despite offering essential and
highly regulated certifications, DGR Aviation operated within a crowded and
competitive education market..."). Reproducing that faithfully would print the
work under the heading "The challenge" on our page, which is not a typo being
preserved but a statement being made wrong. Both blocks migrate verbatim, into
the roles their own sentences describe, and SWAPPED records it so the change is
visible in the content rather than buried here. It should be fixed at source.
"""

CLIENTS = {
    "healthy-farm": "Healthy Farm Eatery",
    "shass-gifts": "Shass Gift & Promotions",
    "acc-gulf": "ACC Gulf",
    "helpsters": "Helpsters Cleaning Services",
    "wafes-refrigeration-industry": "Wafes Refrigeration Industry",
    "neo-data": "Neo Data Technologies",
    "ariiz-international": "Ariiz International",
    "onyx-contracting": "Onyx General Contracting",
    "dgr-aviation": "DGR Aviation Training Services",
    "masterkraft": "Masterkraft",
    "ultracare": "Ultracare",
    "pkfuae": "PKF UAE",
    "autobahn": "Autobahn Car Rental",
    "allday": "AllDay Supermarket",
    "datagram": "Datagram Store",
    "supercad": "Supercad Trading",
    "topshelf": "Top Shelf Technical Services",
    "arbritsafety": "Arbrit Safety",
    "saifeecomputers": "Saifee Computers",
    "royalcaviar": "Royal Caviar",
    "lotus": "Lotus Dental Clinic",
    "venesta": "Venesta",
}

# slug -> (sector, the phrase in its COMPANY PROFILE the sector was read from)
SECTORS = {
    "healthy-farm": ("Food & retail", "premium catering and healthy dining brand"),
    "shass-gifts": (
        "Industrial & trade supply",
        "corporate gifting and promotional merchandise supplier",
    ),
    "acc-gulf": ("Industrial & trade supply", "supplier of industrial and MRO"),
    "helpsters": (
        "Construction & facilities",
        "facility management and cleaning solutions provider",
    ),
    "wafes-refrigeration-industry": (
        "Industrial & trade supply",
        "manufacturer specializing in temperature-controlled solutions",
    ),
    "neo-data": (
        "Technology & IT",
        "provider of enterprise networking and IT infrastructure solutions",
    ),
    "ariiz-international": (
        "Industrial & trade supply",
        "supplier of industrial sealing solutions",
    ),
    "onyx-contracting": (
        "Construction & facilities",
        "construction and general contracting company",
    ),
    "dgr-aviation": (
        "Training & compliance",
        "aviation training provider specializing in Dangerous Goods Regulations (DGR) training",
    ),
    "masterkraft": ("Automotive", "car detailing company"),
    "ultracare": ("Industrial & trade supply", "tissue paper manufacturing company"),
    "pkfuae": (
        "Professional services",
        "global network of accounting firms offering audit, accounting, tax, and business advisory solutions",
    ),
    "autobahn": ("Automotive", "car rental company"),
    "allday": ("Food & retail", "well-established retail chain"),
    "datagram": ("Technology & IT", "high-end IT product e-commerce website"),
    "supercad": ("Technology & IT", "IT consultancy firm in the UAE"),
    "topshelf": (
        "Industrial & trade supply",
        "provider of storage solutions for businesses in the UAE",
    ),
    "arbritsafety": ("Training & compliance", "health and safety training company"),
    "saifeecomputers": (
        "Technology & IT",
        "provider of accounting software solutions and other business management software",
    ),
    "royalcaviar": ("Food & retail", "HACCP-certified seafood supplier and distributor"),
    "lotus": ("Healthcare", "comprehensive range of dental services"),
    "venesta": ("Industrial & trade supply", "commercial washroom solutions"),
}

# The six ENH service lines these twenty-two studies actually name, with the
# page each one sells. Nothing here is a new service: the labels are the
# sitemap's own and every href is a route that exists.
SERVICE_KEYS = ["seo", "local", "content", "performance", "social", "web"]

# slug -> [(service key, the sentence in that study that names it)]
SERVICES = {
    "healthy-farm": [
        ("performance", "We optimized Facebook and Instagram ad campaigns with targeted audience segmentation"),
        ("seo", "A comprehensive SEO strategy was executed, including keyword optimization, landing page improvements, and content enhancements."),
        ("social", "Reels and video content were prioritized to increase reach and interaction."),
        ("web", "User journey improvements and content structuring were implemented to support better engagement and conversion actions"),
    ],
    "shass-gifts": [
        ("seo", "A structured SEO and Local Search strategy was implemented to capture high-intent commercial searches."),
        ("local", "Google My Business optimization strengthened map visibility and direct engagement"),
    ],
    "acc-gulf": [
        ("seo", "Technical SEO and link-building generated 1.8K backlinks across 167 referring domains"),
        ("local", "Local SEO efforts strengthened Google My Business visibility to capture map and mobile searches."),
    ],
    "helpsters": [
        ("seo", "A focused SEO and Local Search strategy was implemented to capture niche commercial demand."),
        ("local", "Google My Business was actively managed to increase map visibility and track calls and direction requests."),
    ],
    "wafes-refrigeration-industry": [
        ("seo", "A focused SEO strategy was implemented to capture high-intent commercial searches"),
    ],
    "neo-data": [
        ("seo", "A dual strategy combining Technical SEO and Local SEO was implemented"),
        ("local", "Google My Business optimization ensured strong local visibility"),
        ("content", "technical comparison blogs strengthened domain authority and captured informational traffic"),
    ],
    "ariiz-international": [
        ("seo", "ENH Marketing implemented a focused SEO strategy built around technical accuracy and buyer-intent visibility."),
        ("content", "Educational content was optimized to attract technical searches"),
    ],
    "onyx-contracting": [
        ("seo", "we implemented a focused digital strategy centered on SEO and local search visibility"),
        ("local", "strong Google My Business optimization to capture local and"),
        ("content", "High-intent content development supported rankings across commercial, industrial, and residential segments"),
    ],
    "dgr-aviation": [
        ("seo", "a focused digital strategy was implemented combining hyper-targeted SEO with strong local presence optimization"),
        ("local", "A mobile-first local SEO strategy was executed through Google My Business optimization"),
        ("content", "Role-specific content was developed and optimized to capture granular search queries"),
    ],
    "masterkraft": [
        ("seo", "This approach included comprehensive SEO optimization"),
        ("local", "a focus on local SEO to target the UAE-based audience"),
        ("content", "high-quality, industry-specific content development"),
        ("performance", "We launched targeted Google Ads campaigns that drove traffic to the Masterkraft website and generated qualified leads"),
    ],
    "ultracare": [
        ("seo", "We delved deep into SEO, meticulously crafting and refining every aspect"),
        ("content", "we developed a captivating content strategy, featuring blog posts and informative articles"),
        ("web", "enhancing the website's design and user experience, thereby increasing incoming inquiries"),
        ("performance", "We launched targeted Google Ads campaigns that drove traffic to the Ultracare website"),
    ],
    "pkfuae": [
        ("seo", "We conducted a thorough SEO audit and implemented on-page and off-page optimizations"),
        ("content", "An engaging content strategy was developed, including blog posts and informative articles"),
        ("performance", "targeted Google Ads campaigns were launched to boost website traffic and generate qualified leads"),
    ],
    "autobahn": [
        ("seo", "implemented on-page and off-page SEO enhancements to improve the website's search engine rankings"),
        ("content", "A content strategy was developed, including blog posts and landing pages"),
        ("local", "We also employed local SEO strategies, including Google My Business optimization"),
    ],
    "allday": [
        ("performance", "We ran targeted mobile app install campaigns, using a combination of search and display ads"),
        ("social", "We also leveraged Ecommerce social media advertising, focusing on platforms such as Facebook and Instagram"),
    ],
    "datagram": [
        ("web", "A user-friendly interface with detailed product descriptions, specifications, and intuitive navigation was designed"),
    ],
    "supercad": [
        ("seo", "We conducted an in-depth SEO analysis to identify areas of improvement on the client's website and devised a robust SEO strategy."),
        ("content", "we developed content that was localized and relevant to the region"),
    ],
    "topshelf": [
        ("seo", "We initiated a holistic SEO strategy, including technical improvements and content optimization"),
        ("local", "We employed local SEO strategies, including Google My Business optimization, location-based keywords, and local directories"),
        ("content", "A consistent and informative blog was created to attract organic traffic"),
        ("performance", "initiating targeted Google Ads campaigns to increase website traffic and attract potential customers"),
    ],
    "arbritsafety": [
        ("web", "We conducted a thorough website audit and revamped the site to be more conversion-focused"),
        ("seo", "Our team devised an extensive SEO strategy to boost organic traffic"),
        ("content", "we created region-specific content tailored to potential students and professionals"),
        ("performance", "we also launched strategic PPC campaigns targeting users interested in health and safety training courses"),
    ],
    "saifeecomputers": [
        ("web", "The website underwent a transformation, becoming exceptionally user-friendly and optimized to maximize conversion rates."),
        ("performance", "we launched precisely targeted PPC campaigns across both search and display networks"),
        ("social", "we curated a dynamic social media calendar that facilitated regular engagement"),
    ],
    "royalcaviar": [
        ("performance", "We implemented a comprehensive Shopping Ads strategy on platforms such as Google and social media channels"),
    ],
    "lotus": [
        ("local", "We optimized the clinic's GMB profile by updating accurate business information"),
        ("content", "active management of customer reviews and local content creation"),
        ("social", "the clinic executed targeted social media campaigns designed to resonate with the Dubai audience"),
    ],
    "venesta": [
        ("performance", "we executed extensive campaigns on various platforms such as Google, Facebook, Instagram, and LinkedIn"),
    ],
}

# Sections published in each other's slots. See the header.
SWAPPED = {"dgr-aviation"}

# Thumbnails whose published alt text is the study's own title or nothing but
# the client name. Both are useless next to the title they sit beside, so these
# get a factual description of the artwork instead.
THUMB_ALT_AUTHORED = {"healthy-farm", "allday"}

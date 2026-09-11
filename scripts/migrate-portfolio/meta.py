"""THE ONLY EDITORIAL LAYER IN THIS MIGRATION.

Everything else in src/content/portfolio/ is the live page's own words. Three
things are not, and all three are here so they can be reviewed in one place:

  CATEGORIES   the three labels the live index files its projects under, and
               the order this site lists them in. The membership itself is
               read from the index's tab panes, never assigned.

  ALT TEXT     the live pages publish `alt=""` on every gallery image and every
               website screenshot, and `alt="<project name>"` on the index
               cards, which repeats the heading printed beside the card. All
               three are authored below. They describe what the picture IS --
               a published piece of work, a screenshot of a site -- and never
               what it shows, because nothing in the source says what it shows
               and guessing would be putting a fabricated description in front
               of a screen reader.

  FILM TITLE   the project's own name, which is what the source's own iframe
               `title` attribute carries.

NO OTHER FIELD IS ASSIGNED. There is no sector, no service tag and no figure:
unlike a case study, a portfolio entry publishes no numbers, so none appear.
"""

# The three tabs on https://enhmedia.com/portfolio, in the order the site
# lists them. Keys are the slugs used in the content model; labels are the
# tabs' own text.
CATEGORIES = [
    ("digital-marketing", "Digital Marketing"),
    ("video-production", "Video Production"),
    ("web-design", "Web Design"),
]


def thumb_alt(name):
    """The index card. The source's alt is the project name, which the card's
    own heading already prints, so a screen reader hears it twice."""
    return f"The card published for {name} on the ENH portfolio."


def gallery_alt(name, i, n):
    """A lightbox image. Described as what it is rather than what it shows."""
    return f"Published work from the {name} project, {i} of {n}."


def shot_alt(name):
    """The website screenshot the live page frames in its monitor mockup."""
    return f"A screenshot of the {name} website."

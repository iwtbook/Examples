# Lighthouse

Lighthouse is an open-source, automated tool for improving the performance,
quality, and correctness of your websites and apps. It analyzes your site and
produces a comprehensive report of areas that could be improved.

## Generating a Lighthouse Score

Generating lighthouse scores is pretty straightforward thankfully. Navigating
to the lighthouse tab in your developer tools (NOTE: not all browsers will
have this built into their DevTools. If this is the case, you might need to
install an extension.) will bring up a plain screen with a "Generate Report"
button and a few options to select from. For these tests we left the default
settings as is and hit generate.

It can take a couple minutes to generate sometimes.

{{generating-lighthouse}}

## Reading Lighthouse Diagnostics

Lighthouse reports will usually include a series of scores out of 100 for a few
different categories (depending on what settings you selected). These are handy
to use as a rough measure, but try not to put too much stock in the exact
numerical values. A 100 does not guarantee no issues, nor does a low score
guarantee you are doing something horribly wrong.

{{lighthouse-scores}}

### Performance

Each section of the report gives some color coded metrics and a list of things
that could be improved ordered by severity. Here we see that in terms of metrics
everrything looks good except the Largest Contentful Paint which took some way
too much time, and the first contentful paint which was a tad slow.

Under the **Opportunities** section the number one most important thing impacting
performance is the serving of images in older formats. It states that serving them
in next-gen formats can help save 1.95 seconds in load time. Underneath it states
that eliminating render-blocking resources can help us save an estimated 0.81 seconds
of load time.

{{performance-a}}

Underneath **Opportunities** is the **Diagnostics** section. Instead of being
concerned with page speed and load time like the **Opportunities** section is,
this section measures how the website or application performs and reacts.

Here it suggests that explicit `width` and `height` attributes should be set on image
elements (this can help with Cumulative Layout Shift). It next suggests that we serve
static assets with an efficient cache policy. Not only will this improve re-visit load
times, but it will help ease strain on the server as well.

{{performance-b}}

### Accessibility

The **Accessibility** section is concerned with how easy it is for visually or
motor impaired individuals to navigate and use the website / app.

In the figure below, under the **Names and Labels** there is a notice pointing out
that at least some of the image elements on the page do not have `alt` attributes
on them, which are important for describing images to those who cannot visually see
them.

Under the **Contrast** section there is a notice stating that some of the content
doesn't have a sufficient contrast ratio, making that content hard to see for some
visually impaired inviduals.

And finally under **Navigation** there is a notice thating that the heading elements
are not in sequentially-descending order, which would make it difficult for keyboard
navigating individuals or visually impaired individuals to maneuver through the
page in an expected way.

{{accessibility}}

### Best Practices

The **Best Practices** section mainly focuses on security and security adjacent issues. It is notably *not* named the Security section so as to not lead you to believe that if you get a 100% in this section your security is perfect. Following the practices this section suggests usually raises your security, but it is not the security end all be all.

In the figure below you'll see a 100% score for this section, looking under the audits that were passed you'll see things like "Uses HTTPS", "Avoids front-end JavaScript libraries with known security vulnerabilities", and "Properly defines charset".

{{best-practices}}

### SEO

The **SEO** section is everything that helps **S**earch **E**ngine
**O**ptimization. This category touches a lot of other categories so you will
probably see a lot of overlap with others like Accessibility and Best Practices.

In the figure below you'll see under Content Best Practices that there are two failed audits: Document does not have a meta description, and Image elements do not have `alt` attributes. Both of these things will affect this websites ranking in search engines like Google.

{{SEO}}

### PWA

The **PWA** section covers everything related to **P**rogressive **W**eb
**A**pps. There is a strict list of requirements an app must meet in order
to be considered a Progressive Web App, so because of this unless you meet
the bare minimum you won't receive a score in this section.

Since the website tested in the figure below is a plain website and not a
PWA, it fails many of the audits and thus does not receive a PWA score.

{{PWA}}

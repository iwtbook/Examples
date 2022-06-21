# Accessibility

Accessibility features are built into every DevTools, though there is no standard location
for them; some browsers have them spread out over a few tabs while others gave
accessibility a unique tab.

For these demos we'll be referring to the Chrome DevTools, which has accessibility features
spread out over a few tabs.

## Generating Just Accessibility Report

Heading back over to the `Lighthouse` tab, we'll see that we have checkboxes to select which
reports we would like to run. For this run we're just going to select `accessibility`.

{{report}}

Once the report is generated, you'll get just a single score for the `accessibility` category.

{{score}}

### Audits to Manually Check

Not every audit can be mechanically checked with code, some need a human to verify. The
"Additional Items to Manually Check" category give relevent audits to go through yourself
to make sure everything is as accessible as possible.

{{manually-check}}

### Audits that Were Passed

While the audits that you fail appear at the top of the page, you can still view the audits
that you passed if you were curious under the "Passed Audits" section.

{{passed-audits}}

### Audits that Were Not Applicable

To check audits that weren't run on your report you can open the "Not Applicable" section
to verify that they definitely weren't applicable.

{{not-applicable}}

## Accessibility in the Element Picker

Another accessibility feature that you've probably come across before appears when you
select an element with the element picker. Up top you have the standard element name,
size, and font information, but below that is an accessibility section.

Here you'll find contrast information about the font color vs. the background color, the
name for the element in the accessibility tree, its aria role, and whether or not the
element is keyboard-focusable.

{{hover}}

## Viewing the Accessibility Tree

The browser makes a few different internal representations of the webpage when parsing the
document, one of those being the Accessibility Tree. The accessibility tree is what screen
readers and non-visual bots use to parse documents when they don't need any visual
information.

To view the accessibility tree in Chrome DevTools, navigate to the `Elements` tab, and then
to the `Accessibility` sub-tab in the lower panel. Select "Enable full-page accessability
tree" under "Accessibility Tree" and select the "Reload DevTools" button at the top. Now
when you look in your Elements tab, in the upper right you'll see a button to toggle the
accessibility tree view.

{{a11y-tree}}

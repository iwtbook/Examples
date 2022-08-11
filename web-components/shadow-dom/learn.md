# The Shadow DOM

In order to create components that are truly portable and can be dropped into any webpage with ease, there needs to be a way to protect the component from existing styles and scripts - this is where the Shadow DOM comes in.

The Shadow DOM is a DOM that is separate and isolated from the main DOM of the page. This means that all of the elements contained within a given Shadow DOM will not:

- Receive any of the styles specified outside of that Shadow DOM
- Be able to be directly queried through scripts outside of that Shadow DOM

Fortunately, the converse is also true, so:

- All styles within a Shadow DOM don't bleed outside of that Shadow DOM
- All scripts are scoped to the Web Component they are inside of (but are able to reach into the light DOM if desired)

And since you can have many Web Components in one page, and thus many Shadow DOMs, this also means that styles and scripts within one Shadow DOM will not affect any elements within another Shadow DOM.

There are a few exceptions to the above bullets that will be covered at a later time but for now it is safe to assume that this always holds true.

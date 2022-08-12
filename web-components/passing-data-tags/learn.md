# Passing Data - Tags

The second way to pass data into Web Components is through tags.
It's a little less straightforward than using attributes but it's not too bad.

## Lifecycle Methods

Here we're only going to need 2 lifecycle methods:

1. `constructor()` always needed, this provides the same function as usual by
  calling `super()` and attaching the Shadow DOM.
2. `connectedCallback()` this method checks to make sure it hasn't been called before and then calls another method to grab the data and insert it into a template.

## The Issue

There's something odd inside the `connectedCallback()` on the right though, and that's `setTimeout(() => {}, 0)`. When inserting a Web Component into the DOM, `connectedCallback()` is called after all of its attributes are parsed but *before* any of it's light DOM children are parsed. This means that trying to read `this.children` immediately in `connectedCallback()` will return an empty collection.

## The Solution

The work around for this is to create a separate function (in this case `populateShadow()`) that will read the children data and continue as normal, and add that function to the end of the callstack using `setTimeout(() => {}, 0)`.

By adding the function to the end of the callstack, it gives the browser a chance to finish parsing the light DOM before trying to read the elements inside of it.

To learn more about how a zero delay timeout works, check out [this interesting article](https://javascript.info/settimeout-setinterval#zero-delay-settimeout).
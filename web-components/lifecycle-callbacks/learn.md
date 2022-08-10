# Lifecycle Callbacks

While a Web Component can have any number of custom methods, there are a few reserved methods that are automatically run at various points throughout the life of the Web Component. Understanding and utilizing these methods is an important aspect of using Web Components.

## `constructor()`

This is the only **required** method of the bunch, and is where the lifecycle of the component begins. Unlike other constructors you might be familiar with, you **cannot** use parameters with this one. It is only ever called once, and under two circumstances:

1. When the Web Component is created through JavaScript (e.g. `document.createElement('example-component')`)
2. On page load when the Web Component is pre-written directly into the DOM (e.g. `<example-component></example-component>`)

There is only one required line inside of it:

```js
class ExampleComponent extends HTMLElement {
  constructor() {
    super(); // required - must be first line
  }
}
```

Every Web Component must extend either the generic `HTMLElement` class or a more specific HTML Element class like `HTMLParagraphElement`. Because of this, `super()` needs to be called to fully inheret all of the properties and methods from the class it is extending.

It is recommended to avoid appending markup in the `constructor()` (outside of the Shadow DOM) so as to not upset any developer's expectations of what is currently inside the component, and to give them a chance to add any content they like before connecting the component to the DOM. For Example:

```js
let exComp = document.createElement('example-component'); // constructor() runs
exComp.setAttribute('color', 'green'); // attributeChangedCallback() runs
exComp.innerHTML = '<p slot="name">Thomas Powell</p>'; // insides overwritten
document.body.append(exComp); // connectedCallback() runs
```

Here if you tried to access any attributes or content for the component from within the `constructor()`, none of the data would be ready and everything would be `null` or `undefined`. On top of that, if you attempted to append markup (outside of the Shadow DOM) inside the constructor it would overwritten. It's better to wait for the `connectedCallback()` before reading any attribute or content.

## `connectedCallback()`

This method is **optional** and takes no parameters, but it is very handy. It is called every time the Web Component is inserted into the DOM. If the component is written into the HTML when the document is received, then it is called on page load (it is the last to be called in this circumstance - It goes `constructor()`, then all attributes individually via `attributeChangedCallback()`, then `connectedCallback()`).

It is recommended that you read any attributes or append / modify any markup here.

## `disconnectedCallback()`

This method is **optional** and takes no parameters as well, and is the exact opposite of `connectedCallback()`. It is called every time the Web Component is removed from the DOM.

## `adoptedCallback()`

This method is **optional** and takes no parameters as well. It is called whenever the Web Component is adopted into a different `document` than it is currently in, usually through `Document.adoptNode()`.

This mostly comes in handy when you are moving web components between separate `<iframe>`s within the same webpage, as each `<iframe>` has its own `document`.

Adoption is not the same as DOM insertion. When a `document` adopts a node (a web component in this case), the script from inside that `document` gains access to the variable referencing that component, and all of the properties / methods it contains. It can then choose to insert the node into the DOM, at which point `connectedCallback()` would get called.

Unless you are dealing with multiple `document`s, you likely won't use this method that much.

## `attributeChangedCallback(name, oldValue, newValue)`

This method is **optional** and has three paremeters: `name`, `oldValue`, and `newValue` (all of type `string`).

- `name` is the name of the attribute who's value is being changed (e.g. `id`)
- `oldValue` is the value of the named attribute prior to the most recent change
- `newValue` is the value of the named attribute as it is currently

As you might expect, `attributeChangedCallback()` runs every time a *specified* attribute changes. It also runs once for every attribute if a Web Component containing any *specified* attributes is written in the HTML already on page load.

What does *specified* attribute mean?

Well `attributeChangedCallback()` needs a list of attributes to monitor. If the attribute isn't specified in that list, any changes to it will be ignored.

To specify a list, a `static` getter is used called `observedAttributes` which simply returns an array of strings (the strings being the names of the attributes to observe).

Example:

```js
class ExampleComponent extends HTMLElement {
  constructor() {
    super(); // required - must be first line
  }

  static get observedAttributes() {
    return ['color', 'href'];
  }

  attributeChangedCallback(name, oldVal, newValf) {
    // Runs whenever 'color' or 'href' is modified.
    // Will NOT run if any other attribute is modified.
  }
}
```
# Open vs. Closed Shadows

When a Shadow DOM is attached to a Web Component, a parameter is passed in identifying the shadow as either `open` or a `closed`. What does this mean?

## Open Shadows

An open shadow means that the reference to the shadowRoot (including all of the contents) is available after the shadow has been attached.

```js
// { mode: 'open' }
let myComponent = document.createElement('my-component');
let shadowRoot = myComponent.shadowRoot; // returns reference to the shadowRoot.
// Once you have the shadowRoot, you can select elements within the Shadow DOM:
let elems = shadowRoot.querySelectorAll('.some-class');
```

However, having an `open` Shadow does **NOT** mean that the Shadow is no longer isolated. CSS styles and `document` wide element queries still won't be able to find anything inside a Shadow DOM. You much specifically search from the Shadow DOM's `shadowRoot`.

```js
// None of the elements in shadowElems will be in elems
let elems = document.querySelectorAll('.some-class');
let shadowElems = myComponent.shadowRoot.querySelectorAll('.some-class');
```

## Closed Shadows

A closed shadow means that the reference to the Shadow DOM's root is not stored in the Web Component's `shadowRoot` property. In fact, it is not stored at all - You have to store it somewhere yourself if you want to append any elements after creation.

```js
// { mode: 'closed' }
let myComponent = document.createElement('my-component');
myComponent.shadowRoot; // returns undefined.
// the line below will error since shadowRoot is undefined.
myComponent.shadowRoot.querySelector();
```

Normally this is done by creating a private field within your component's class (done by adding `#` to the front of the field) to store the `shadowRoot` reference, that way it is inaccessible from the outside.

```js
class MyComponent extends HTMLElement {
  #shadowRoot;
  constructor() {
    super();
    this.#shadowRoot = this.attachShadow({ mode: 'closed' });
  }
  connectedCallback() {
    this.#shadowRoot; // Successfully accesses to the shadowRoot reference
  }
}
customElements.define('my-component', MyComponent);
document.createElement('my-component').#shadowRoot; // Error - Can't Access
```

## Cautioning Against Closed Shadows

It is generally recommended that you leave your shadows open for two main reasons:

1. Closed shadows provide a false sense of security.
    - If someone else has access to the code for your component and is using it, they can easily modify the component's code so that the shadow is open.
    - Third party scripts can also easily override the `attachShadow()` prototype to render `{ mode: 'closed' }` useless
2. Since it's not secure, it doesn't really provide any other benefit outside of frustrating developers.
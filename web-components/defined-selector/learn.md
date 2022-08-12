# `:defined` Selector

Web Components have a few special CSS selectors of their own. The first of which that we'll talk about is the `:defined` selector.

As the name might suggest this selector only selects elements that have been `defined`. By default every regular HTML element is classified as `defined`. For a Web Component to be defined, the `define` method in the Custom Element Registry must have been called for it, like so:

```js
class MyComponent extends HTMLElement {
  constructor() {
    super();
  }
}

// This line defines the custom element in the Custom Element Registry, and
// allows the component to be used in the document
customElements.define('my-component', MyComponent);
```

## Best Practices

In certain occasions your markup will load much faster than the code for your web components. If you have written your web components directly into your markup, then the user might see a flash of your web components as raw text before the JavaScript definition loads and styles the components properly.

To prevent this, it is recommended that you hide your elements when they aren't defined. Using `:defined` this is pretty easy to do:

```css
my-component:not(:defined) {
  display: none;
}

my-component:defined {
  display: block;
}
```

# Reading Data - Attributes

Often times when making Web Components the need arises to be able to allow the
developer using the web component to configure the component in some way - in
essence a way to pass data from the developer using the component to the code
the web component is executing.

There are two ways this is commonly done:

```html
<!-- Through attributes -->
<my-component fav-color="red"></my-component>

<!-- Through tags -->
<my-component>
  <fav-color>red</fav-color>
</my-component>
```

For this demo we are exploring the use of attributes to pass data.

## Lifecycle Callbacks

If you recall back to the lifecycle callback methods each web component has - you'll remember one titled `attributeChangedCallback()`. This method runs every time a *specified* attribute has been modified. This is the key method we'll be using to implement an attribute centered Web Component.

Our Web Component in this demo has 4 methods:

1. `constructor()`
    - Runs first
    - Simply calls `super()` and attaches a Shadow DOM
2. `static get observedAttributes()`
    - Called by the browser automatically right after the `constructor()`
    - Specifies which attributes we want to monitor
3. `attributeChangedCallback()`
    - Runs every time a specified attribute is modified
    - Saves the attribute information to the internal Web Component object using the `this` keyword (for easy access later)
4. `connectedCallback()`
    - Runs last and only when the element is inserted into a DOM
    - Accesses the attribute values saved to the internal Web Component object using the `this` keyword and attaches the markup and styles to the Shadow DOM root.

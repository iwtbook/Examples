# `:host` selector

Web Components have a few special CSS selectors of their own. The first of which that we'll talk about is the `:host` selector. This selector only works from inside the Shadow DOM, and selects the Web Component element that is "hosting" that Shadow DOM - meaning that it technically reaches outside of the Shadow into the light DOM.

A basic example:

```html
<demo-component>
  #shadow-root
    <style>
      :host {
        background-color: green;
      }
    </style>
    <p>This is an demo component</p>
</demo-component>
```

Using `:host` is the same as selecting `demo-component` with CSS from the light DOM, except that the light DOM rule has a higher specificity so it will override `:host`.

```html
<!-- The background color here would be blue -->
<style>
  demo-component {
    background-color: blue;
  }
</style>
<demo-component>
  #shadow-root
    <style>
      :host {
        background-color: green;
      }
    </style>
    <p>This is an demo component</p>
</demo-component>
```

## Adding Conditions

Along with just the plain `:host` selector, we can add conditions to it using `:host()`. Whatever condition is placed inside the `()` the `:host` must also satisfy in order to be selected.

For example, to select the host but only when it has the class `fancy` you would use the following selector:

```css
:host(.fancy) {
  /* ... */
}
```

In practice that would look like:

```html
<!-- This component would NOT be selected by :host(.fancy) -->
<demo-component>
  #shadow-root
    <style>
      :host(.fancy) {
        background-color: green;
      }
    </style>
    <p>This is an demo component</p>
</demo-component>

<!-- This component WOULD be selected by :host(.fancy) -->
<demo-component class="fancy">
  #shadow-root
    <style>
      :host(.fancy) {
        background-color: green;
      }
    </style>
    <p>This is an demo component</p>
</demo-component>
```

This can come in handy when you are using themes, or toggling whether the element is displayed or not.
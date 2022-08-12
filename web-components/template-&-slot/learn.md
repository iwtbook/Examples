# Passing Data - template & slot

The previous demo showed the use of custom tags as a way to pass data from the developer to the Web Component, which is handy but requires a bit of work. With the `<template>` and `<slot>` elements a lot of the heavy lifting is done for us.

## The Basics

The flow:

1. In the Web Component a `<template>` of markup is made
2. In that `<template>`, wherever data needs to be passed in, a `<slot>` is placed
3. For each `<slot>`, a unique `name` attribute is given
4. When the Web Component is used, markup is placed inside
5. For each element that is a direct child of the component, a `slot` attribute is given, the value of which corresponds to the `name` attribute of a `<slot>` element in the Web Component's `<template>`
6. When the Web Component is rendered, the given elements with `slot` attributes are linked to their corresponding `<slot>` elements in the Shadow DOM and their content is passed along.

Let's see an example of what this might look like:

```html
<!-- What is written when <my-component> is used -->
<my-component>
  <span slot="name">Thomas Powell</span>
<my-component>

<!-- The <template> that <my-component> is using internally -->
<template>
  <p>Hello, my name is <slot name="name">Thomas Powell</slot></p>
</template>

<!-- What is rendered -->
<my-component>
  #shadow-root
    <p>Hello, my name is <span slot="name">Thomas Powell</span></p>
  <span slot="name">Thomas Powell</span>
</my-component>
```

Note that your original markup with the `slot` attributes remains in the light DOM as seen in the rendered markup above. It is just internally linked to where its corresponding slot is inside the Shadow DOM

## Rules of Use

There are not too many rules when using `<template>` and `<slot>`, but there are a few.

1. The `<slot>` element will *only* render inside of a Shadow DOM
2. If multiple elements share the same `slot` attribute value, they will all be placed inside of the same `<slot>`
3. Only direct children of your Web Component may receive a `slot` attribute. Nested children are allowed, but they can only be slotted along with their parents.
4. If your template has a `<slot>` element without a `name` attribute, all direct children of the Web Component that do not have a `slot` attribute will be placed there.
5. You do not need to use `<template>` with `<slot>`, but `<template>` makes it easier to store your markup in the document if you choose instead of inside your Web Component's JavaScript files.

## A Word of Caution

Since the slotted elements are *linked* to the Shadow DOM, they exist **both** in the light **AND** the Shadow DOM. This means that they are susceptible to styles and scripts in **both** the light and Shadow DOM.

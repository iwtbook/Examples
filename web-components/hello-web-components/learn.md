# Hello, Web Components!

Web Components allow you to create custom elements that are self contained, isolated, and
reusable. What does all that mean? Let's break it down.

## Custom Elements

A custom element is one that is not explicitly defined by the [official HTML specification](https://html.spec.whatwg.org/multipage/). By convention these elements must always contain at least one hyphen somewhere in them and must have a closing tag, as seen below:

```html
<custom-element></custom-element>
```

Now on their own custom elements do not do anything special. They behave exactly as you might expect a simple `<div>` to, regardless of what they are named. Through various DOM API's though we can attach rich markup, styles, and function to these custom elements.

## Self Contained

Web Components are typically written in such a way that they are contained to a single class inside a single JavaScript file. This means that simply including that file as a script on your web page is enough to let you start using it anywhere you like inside the document - no external libraries or frameworks needed.

## Isolated

A special API is available just for web components called the **Shadow DOM API**. The Shadow DOM has a few unique features:

- All of the elements inside of it are hidden and unselectable from the outside
- All of the elements inside of it ignore any styles from the outside
- All of the styles inside of it apply only to the elements inside of it and aren't affected by outside styles
- All of the JavaScript inside of it has its own global scope separate from the outside

This is what is meant by the term "Isolated", and why it makes a component so easy to be self contained. A
component can be dropped into a webpage without fear that any of the webpage's existing code will affect it in
an adverse way.

## Reusable

Once the component is downloaded and parsed, it can be used on a webpage any number of times without needing to write extra code.

```html
<custom-element></custom-element>
<custom-element></custom-element>
<custom-element></custom-element>
```

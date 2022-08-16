# Custom Elements Manifest

As described in the [repo that defines it](https://github.com/webcomponents/custom-elements-manifest), the Custom Elements Manifest is a file format for describing custom elements. The file format in this instance is a [JSON Schema](https://json-schema.org/).

## The Motivation

Having a machine-readable description of custom elements helps in many areas:

- Documentation generation
  - May be useful to have a playground for doc gen
- IDE autocompletion / tooltips
- Linting
- Graphic design tools
- Component Directories

The information can live with the code it describes in the form of [JSDoc](https://jsdoc.app/) style comments, [a tool](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) can generate a manifest of all of your components, then anything that needs information about the components can pull from the JSON file(s).

## The Basics

While the Custom Elements Manifest can be written by hand, following all of the rules layed out in the [custom-elements-manifest repo schema.d.ts file](https://github.com/webcomponents/custom-elements-manifest/blob/main/schema.d.ts), it is more common and efficient to use [Open Web Component](https://open-wc.org)'s [Custom Element Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) to build the manifest.

Out of the box this [Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) can recognize all of the properties, methods, observed attributes, events being fired, along with a few other details - but all it can do is name them and determine whether they are public or private. You will see this with the `demo-component-1.js` class and its resulting `custom-elements-1.json` manifest on the right. Do note though that the lifecycle methods of the Custom Element are not listed.

Comments are needed to describe what they do or their purpose without comments. Adding those comments is pretty straightforward as you can see in the `demo-component-2.js` tab. The resulting `custom-elements-2.json` manifest is also in a tab on the right.

## All of the Supported JSDoc

| JSDoc | Description |
|---|---|
| `@attr`, `@attribute` | Documents attributes for your custom element |
| `@prop`, `@property` | Documents properties for your custom element |
| `@csspart` | Documents your custom elements CSS Shadow Parts |
| `@slot` | Documents the Slots used in your components |
| `@cssprop`, `@cssproperty` | Documents CSS Custom Properties for your component |
| `@fires`, `@event` | Documents the name of your custom element |
| `@tag`, `@tagname` | Documents the name of your custom element |
| `@summary` | Documents a short summary |
| `@internal`, `@ignore` | To omit documentation of internal details |

```js
/**
 * @attr {boolean} disabled - disables the element
 * @attribute {string} foo - description for foo
 *
 * @csspart bar - Styles the color of bar
 *
 * @slot - This is a default/unnamed slot
 * @slot container - You can put some elements here
 *
 * @cssprop --text-color - Controls the color of foo
 * @cssproperty [--background-color=red] - Controls the color of bar
 *
 * @prop {boolean} prop1 - some description
 * @property {number} prop2 - some description
 *
 * @fires custom-event - some description for custom-event
 * @fires {Event} typed-event - some description for typed-event
 * @event {CustomEvent} typed-custom-event - some description for typed-custom-event
 *
 * @summary This is MyElement
 *
 * @tag my-element
 * @tagname my-element
 */
class MyElement extends HTMLElement {}
```

## Hiding Properties and Methods

By default **everything** is shown, even `private` properties and methods, so to omit details from the manifest use
`/** @internal **/` or `/** @ignore **/`

```js
class DemoComponent extends HTMLElement {
  /** @internal **/
  #privateProperty;

  constructor() {
    super();
  }
}
```

## Extending Support of the Custom Element Manifest Analyzer

There is [extensive documentation](https://custom-elements-manifest.open-wc.org/analyzer/plugins/intro/) on writing your own
plugins to extend the analyzer if need be (for example, add your own custom JSDoc style comment).

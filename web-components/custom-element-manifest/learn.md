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

The information can live with the code it describes in the form of [JSDoc](https://jsdoc.app/) style comments, [a tool](https://custom-elements-manifest.open-wc.org/) can generate a manifest of all of your components, then anything that needs information about the components can pull from the JSON file(s).

## The Basics

Out of the box the Custom Element Manifest Analyzer can recognize all of the properties, methods, observed attributes, events being fired, and a few other details - but all it can do is name them, and determine whether they are public or private. It cannot describe what they do or their purpose without comments. Adding the comments is pretty straightforward:

```js
/**
 * This component is made to demonstrate what kinds of comments you can use
 * to describe your component with the Custom Element Manifest Analyzer. This
 * description will be added under "description" in the manifest.
 * @prop {number} timesConnected - The number of times this component has been
 *                                 connected to the DOM
 * @attr {string} color - Sets the font color of the paragraph text
 * @fires {Event} demo-event - A demo event dispatched by someMethod()
 */
class DemoComponent extends HTMLElement {
  timesConnected = 0;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['color'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    let p = this.shadowRoot.querySelector('p');
    p?.style?.color = newVal;
  }

  connectedCallback() {
    this.timesConnected += 1;
    this.shadowRoot.innerHTML = `<p>Demo Component</p>`;
  }

  /**
   * Methed descriptions are attached to the methods themselves.
   * This method fires the 'demo-event' event when called.
   */
  someMethod() {
    this.dispatchEvent(new Event('demo-event'));
  }
}
```

This is the resulting `custom-elements.json` manifest for the above component:

```json
{
  "schemaVersion": "1.0.0",
  "readme": "",
  "modules": [
    {
      "kind": "javascript-module",
      "path": "demo-component.js",
      "declarations": [
        {
          "kind": "class",
          "description": "This component is made to demonstrate what kinds of comments you can use\nto describe your component with the Custom Element Manifest Analyzer. This\ndescription will be added under \"description\" in the manifest.",
          "name": "DemoComponent",
          "members": [
            {
              "kind": "field",
              "name": "timesConnected",
              "type": {
                "text": "number"
              },
              "default": "0",
              "description": "The number of times this component has been connected to the DOM"
            },
            {
              "kind": "method",
              "name": "someMethod",
              "description": "Methed descriptions are attached to the methods themselves.\nThis method fires the 'demo-event' event when called."
            }
          ],
          "events": [
            {
              "name": "demo-event",
              "type": {
                "text": "Event"
              },
              "description": "A demo event dispatched by someMethod()"
            }
          ],
          "attributes": [
            {
              "name": "color",
              "type": {
                "text": "string"
              },
              "description": "Sets the font color of the paragraph text"
            }
          ],
          "superclass": {
            "name": "HTMLElement"
          },
          "tagName": "demo-component",
          "customElement": true
        }
      ],
      "exports": [
        {
          "kind": "custom-element-definition",
          "name": "demo-component",
          "declaration": {
            "name": "DemoComponent",
            "module": "demo-component.js"
          }
        }
      ]
    }
  ]
}
```

## All of the Available @ Types

## Hiding Properties and Methods

## Custom Elements Manifest Analyzer

[Located here](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)

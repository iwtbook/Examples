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

customElements.define('demo-component', DemoComponent);
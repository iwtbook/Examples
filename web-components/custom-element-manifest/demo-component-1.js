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

  someMethod() {
    this.dispatchEvent(new Event('demo-event'));
  }
}

customElements.define('demo-component', DemoComponent);
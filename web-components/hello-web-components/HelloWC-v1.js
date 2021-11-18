// Extend HTMLElement so we can add on top of it
class HelloWC extends HTMLElement {
  constructor() {
    // Inheret all of the properties of HTMLElement
    super();
    // Store content to set once component has loaded
    this.unsetContent = '<h1>Hello, Web Components!</h1>';
  }

  // When the component has finished loading, set the inner content
  connectedCallback() {
    // This might load twice so double check
    if (!this.unsetContent) return;
    this.innerHTML = this.unsetContent;
    delete this.unsetContent;
  }
}

// Define our web component in the custom element registry so we can use it in our HTML
customElements.define('hello-wc', HelloWC);
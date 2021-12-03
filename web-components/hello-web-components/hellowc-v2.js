// Extend HTMLElement so we can add on top of it
class HelloWC extends HTMLElement {
  constructor() {
    // Inheret all of the properties of HTMLElement
    super();
  }

  render() {
    this.innerHTML = '<h1>Hello, Web Components!</h1>';
    return this;
  }
}

// Define our web component in the custom element registry so we can use it in our HTML
customElements.define('hello-wc', HelloWC);

// Add Web Component to the page
const helloWCdemo = document.createElement('hello-wc');
document.body.append(helloWCdemo.render());
// Extend HTMLElement so we can add on top of it
class HelloWC extends HTMLElement {
	constructor() {
		// Inheret all of the properties of HTMLElement
		super();
	}

	connectedCallback() {
		this.innerHTML = '<h1>Hello, Web Components!</h1>';
	}
}

// Define our web component in the custom element registry so we can use it in our HTML
customElements.define('hello-wc', HelloWC);

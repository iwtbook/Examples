// Extend HTMLElement so we can add on top of it
class HelloWC extends HTMLElement {
	constructor() {
		// Inheret all of the properties of HTMLElement
		super();
	}

	/**
	 * connectedCallback is a special function name for web components that the browser
	 * calls automatically when the element is inserted into the DOM
	 */
	connectedCallback() {
		let markup = '<h1>Hello, Web Components!</h1>';
		this.insertAdjacentHTML('beforeend', markup);
	}
}

// Define our web component in the custom element registry so we can use it in our HTML
customElements.define('hello-wc', HelloWC);

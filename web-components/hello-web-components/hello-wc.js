// Extend HTMLElement so we can add on top of it
class HelloWC extends HTMLElement {
	constructor() {
		// Inheret all of the properties and functions of HTMLElement
		super();
	}

	/**
	 * connectedCallback is a special function name for web components that the
	 * browser calls automatically when the element is inserted into the DOM
	 */
	connectedCallback() {
		let styles = '<style>* { font-family: sans-serif; }</style>';
		let markup = '<h1>Hello, Web Components!</h1>';
		this.insertAdjacentHTML('beforeend', styles + markup);
	}
}

/**
 * Define our web component in the custom element registry so the browser
 * can associate the <hello-wc> tag with the code we wrote above
 */
customElements.define('hello-wc', HelloWC);

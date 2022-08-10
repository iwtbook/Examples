/**
 * Must extend the generic HTMLElement or another HTML element so that all
 * of the normal element properties and methods are available
 * (e.g. Element.innerHTML, Element.getAttribute(), etc)
 */
class HelloWC extends HTMLElement {
	// Stores whether the element is currently in a DOM or not
	connected = false;

	/**
	 * Called when the element is created with document.createElement() or
	 * when the page first loads if the element is already written directly
	 * into the HTML. It is a required method and MUST NOT take any parameters.
	 */
	constructor() {
		/**
		 * The super() function is what inherets all of the properties and methods
		 * from the extended class. It MUST be called, and it MUST be first in the
		 * constructor()
		 */
		super();
		console.log('constructor() has been called!');
	}

	/**
	 * connectedCallback is a special function name for web components that the
	 * browser calls automatically when the element is inserted into the DOM.
	 * It is an optional method and does not take any parameters.
	 */
	connectedCallback() {
		// Since this method can be called multiple times and we only want to insert
		// our styles & markup once we need to check if we have already
		if (this.innerHTML === '') {
			let styles = `
				<style>
					p {
						font-family: sans-serif;
						font-size: 2rem;
						font-weight: bold;
					}
				</style>
			`;
			let markup = '<p>Hello, Web Components!</p>';
			this.insertAdjacentHTML('beforeend', styles + markup);
		}
		this.connected = true;
		console.log('connectedCallback() has been called!');
	}

	/**
	 * disconnectedCallback is a special function name for web components that
	 * the browser calls automatically when the element is removed from the DOM.
	 * It is an optional method and does not take any parameters.
	 */
	disconnectedCallback() {
		this.connected = false;
		console.log('disconnectedCallback() has been called!');
	}

	/**
	 * adoptedCallback is a special function name for web components that the
	 * browser calls automatically when the element is moved to a different DOM
	 * with the adoptNode() method. It is an optional method and does not take
	 * any parameters.
	 */
	adoptedCallback() {
		this.connected = true;
		console.log('adoptNode() has been called!');
	}

	/**
	 * attributeChangedCallback is a special function name for web components
	 * that the browser calls automatically when an attribute is added to the web
	 * component or when an existing attribute on the web component is modified.
	 * It is NOT called when an attribute is removed from the web component. It
	 * will ONLY fire for attributes specified in the static "observedAttributes"
	 * method. It is an optional method that takes three parameters.
	 * @param {string} name The name of the changed attribute (e.g. 'color')
	 * @param {string} oldValue The old value of the changed attribute (null if
	 *                          the attribute was just added)
	 * @param {string} newValue The new value of the changed attribute (empty
	 *                          string if the attribute is a boolean attribute)
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue == null) oldValue = 'null';
		if (newValue === '') newValue = 'Empty String';

		// Change the font color
		if (newValue !== '') this.querySelector('p').style.color = newValue;

		console.log('attributeChangedCallback() has been called!');
		console.log(`name: ${name}, oldValue: ${oldValue}, newValue: ${newValue}`);
	}

	/**
	 * observedAttributes is a special static getter function that specifies for
	 * what attributes the attributeChangedCallback function should fire for. Any
	 * attributes that are modified that are not specified here will be ignored.
	 * It is required only if the attributeChangedCallback function is defined,
	 * otherwise it is optional. It takes no parameters and returns an array.
	 * @returns {array<string>} An array of all of the attributes to observe.
	 */
	static get observedAttributes() {
		return ['color'];
	}
}

/**
 * Define our web component in the custom element registry so the browser
 * can associate the <hello-wc> tag with the code we wrote above
 */
customElements.define('hello-wc', HelloWC);

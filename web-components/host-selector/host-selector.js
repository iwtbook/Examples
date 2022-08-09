// host-selector.js

class HostSelector extends HTMLElement {
	/**
	 * Always call super() first thing in your web component constructor().
	 * super is a reference to the class we're inhereting, and super() calls
	 * that class' constructor
	 */
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	/**
	 * Runs every time the element is inserted into the DOM. Runs once right
	 * after page load if element is written into the DOM already.
	 */
	connectedCallback() {
		// The markup to attach to the element's shadowRoot
		let text = document.createElement('p');
		text.innerHTML = `Everything outside this green square is the light DOM,
			even though ALL of the styles are written within the shadow DOM, the
			light DOM is able to be reached using the <code>:host</code> CSS
			selector.`;

		// The styles to attach to the element's shadowRoot
		let styles = document.createElement('style');
		styles.innerHTML = `
			* {
				font-family: sans-serif;
			}

			:host {
				align-items: center;
				background-color: lightgray;
				border: 2px solid gray;
				border-radius: 4px;
				box-sizing: border-box;
				color: rgb(118, 118, 118);
				display: grid;
				height: 200px;
				justify-items: center;
				width: 400px;
			}

			code {
				background-color: white;
				font-family: monospace;
				font-size: 1.1rem;
				padding: 1px 4px;
			}

			p {
				background-color: #BFB;
				border-radius: 3px;
				color: black;
				line-height: 1.4;
				padding: 5px 10px;
				width: 60%;
			}
		`;

		// Append the styles and markup to append to the element's shadowRoot
		this.shadowRoot.append(styles, text);
	}
}

// Always define the element in the customElements registry so that you're
// able to use the element properly in the DOM
customElements.define('host-selector', HostSelector);

class ShadowDemo extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		// TODO
	}
}

customElements.define('shadow-demo', ShadowDemo);

class DefinedComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = `
			<slot name="msg">This component is defined!</slot>
		`;
	}
}

customElements.define('defined-component', DefinedComponent);

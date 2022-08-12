class DefinedComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow();
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = `
			<slot name="msg">This component is defined!</slot>
		`;
	}
}

customElements.define('defined-component', DefinedComponent);

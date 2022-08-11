class ShadowDemo extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		let styles = document.createElement('style');
		styles.innerHTML = `
	    p {
	      text-decoration: underline;
	    }
	  `;

		let paragraph = document.createElement('p');
		paragraph.innerHTML = `
		  This is the Shadow DOM and is not reachable
		  from document-wide stylesheets and scripts.
		`;

		this.shadowRoot.append(styles, paragraph);
	}
}

customElements.define('shadow-demo', ShadowDemo);

// css-variables.js
class CssVariables extends HTMLElement {
	// Private property named shadow which will store the closed shadowRoot
	#closedShadow;
	#stylesAndMarkup = (closedOrOpen) => {
		return `
      <style>
        p {
          border-radius: 3px;
          color: black;
          padding: 4px 10px;
          text-align: center;
        }

        p.var-test {
          background-color: ;
        }

        #light-dom {
          background-color: var(--bg-light-dom, ${
						cssBgColors['--bg-light-dom']
					});
        }

        #light-dom-unedited {
          background-color: var(--bg-light-dom-unedited, ${
						cssBgColors['--bg-light-dom-unedited']
					});
        }

        #shadow-dom {
          background-color: var(--bg-shadow-dom, ${
						cssBgColors['--bg-shadow-dom']
					});
        }

        #wrapper {
          align-items: center;
          background-color: ${cssBgColors[`--bg-${closedOrOpen}`]};
          display: grid;
          height: 100%;
          justify-items: center;
          width: 100%;
        }
      </style>
      <div id="wrapper">
        <div>
          <p>Shadow Root ${closedOrOpen}</p>
          <p id="light-dom">Light DOM CSS Var - User Edited</p>
          <p id="light-dom-unedited">Light DOM CSS Var - Unedited</p>
          <p id="shadow-dom">Shadow DOM CSS Variable</p>
        </div>
      </div>
      `;
	};

	/**
	 * Always call super() first thing in your web component constructor().
	 * super is a reference to the class we're inhereting, and super() calls
	 * that class' constructor
	 */
	constructor() {
		super();
	}

	/**
	 * Attach a shadowRoot with { mode: 'open' } to this element, then
	 * fill in the markup & styles
	 */
	attachOpenShadow() {
		this.innerHTML = '';
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = this.#stylesAndMarkup('Open');
	}

	/**
	 * Attach a shadowRoot with { mode: 'closed' } to this element, then fill in
	 * the markup & styles. The reference to this shadowRoot is kept in a private
	 * variable to prevent users / developers from editing it. This is easily
	 * circumvented so do not rely on this technique for security
	 */
	attachClosedShadow() {
		this.innerHTML = '';
		// 'closed' mode simply makes this.shadowRoot return null. So long as you
		// store the reference somewhere else you can always edit the closed shadow
		this.#closedShadow = this.attachShadow({ mode: 'closed' });
		this.#closedShadow.innerHTML = this.#stylesAndMarkup('Closed');
	}
}

// Always define the element in the customElements registry so that you're able to
// use the element properly in the DOM
customElements.define('css-variables', CssVariables);

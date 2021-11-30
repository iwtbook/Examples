// open-vs-closed.js

class OnlyOneShadow extends HTMLElement {
  // Private property named shadow which will store the closed shadowRoot
  #closedShadow;

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
    this.shadowRoot.innerHTML = `
      <style>
        div {
          align-items: center;
          background-color: #BFB;
          display: grid;
          height: 100%;
          justify-items: center;
          width: 100%;
        }
      </style>
      <div>
        <p>Shadow Attached</p>
      </div>
    `;
  }
}

// Always define the element in the customElements registry so that you're able to
// use the element properly in the DOM
customElements.define('only-one-shadow', OnlyOneShadow);
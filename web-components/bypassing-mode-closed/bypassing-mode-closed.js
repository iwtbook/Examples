// bypassing-mode-closed.js

class BypassingClosed extends HTMLElement {
  // Private property named shadow which will store the closed shadowRoot
  #shadow;

  // Calling super() to call the HTMLElement constructor
  constructor() {
    super();
  }

  /**
   * Attaches an open shadow to the current element and fills it with styles
   * and markup
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
        <p>Shadow Root Open</p>
      </div>
    `;
  }

  /**
   * Attaches a closed shadow to the current element, then stores a reference to it in a private
   * property named 'shadow'
   */
  attachClosedShadow() {
    this.innerHTML = '';
    // 'closed' mode simply makes this.shadowRoot return null. So long as you
    // store the reference somewhere else you can always edit the closed shadow
    this.#shadow = this.attachShadow({ mode: 'closed' });
    this.#shadow.innerHTML = `
      <style>
        div {
          align-items: center;
          background-color: #FBB;
          display: grid;
          height: 100%;
          justify-items: center;
          width: 100%;
        }
      </style>
      <div>
        <p>Shadow Root Closed</p>
      </div>
    `;
  }

  // Replace any text inside the <p> element within this element's shadowRoot
  // with the text 'Text edited!'. Demonstrates the inability to modify a closed
  // shadowRoot
  editText() {
    this.shadowRoot.querySelector('p').innerHTML = 'Text edited!';
  }
}

// Always define the element in the customElements registry so that you're able to
// use the element properly in the DOM
customElements.define('bypassing-closed', BypassingClosed);
// open-vs-closed.js

class OpenVsClosed extends HTMLElement {
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
        <p>Shadow Root Open</p>
      </div>
    `;
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
    this.#closedShadow = this.attachShadow({ mode: 'closed' })
    this.#closedShadow.innerHTML = `
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
customElements.define('open-vs-closed', OpenVsClosed);
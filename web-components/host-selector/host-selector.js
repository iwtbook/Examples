// host-selector.js

class HostSelector extends HTMLElement {
  // Private property named shadow which will store the closed shadowRoot
  #closedShadow;

  /**
   * Always call super() first thing in your web component constructor().
   * super is a reference to the class we're inhereting, and super() calls
   * that class' constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
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
      </style>
      <p>Everything outside this green square is the light DOM, though ALL of the styles are written within the shadow DOM using the <code>:host</code> CSS selector</p>
    `;
  }
}

// Always define the element in the customElements registry so that you're able to
// use the element properly in the DOM
customElements.define('host-selector', HostSelector);
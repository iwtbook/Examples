// custom-console.js

// Store the console.log and console.error functions since we're going to
// be overwriting them below
const origLog = console.log;
const origErr = console.error;

window.addEventListener('DOMContentLoaded', init);

/**
 * Init (initialize) function waits for the DOMContent to load before starting
 * to query elements and attach event listeners
 */
function init() {
  const customConsoles = Array.from(document.querySelectorAll('custom-console'));
  if (customConsoles.length > 0) {
    /**
     * Logs to the original console.log first, then also logs to every instance
     * of a <custom-console> in the document
     * @param {string} msg the message to log
     */
    console.log = function (msg) {
      origLog(msg);
      customConsoles.forEach(customConsole => {
        customConsole.newLogMsg(msg)
      });
    }

    /**
     * Logs to the original console.error first, then also logs to every instance
     * of a <custom-console> in the document
     * @param {string} msg the message to log as an error
     */
    console.error = function (msg) {
      origErr(msg);
      customConsoles.forEach(customConsole => {
        customConsole.newLogMsg(msg);
      });
    };

    /**
     * Global error event handler, for any window error log it to the
     * custom console
     */
    window.addEventListener('error', msg => {
      customConsoles.forEach(customConsole => {
        customConsole.newLogMsg(msg.message);
      });
    });
  }
}

class CustomConsole extends HTMLElement {
  /**
   * Always call super() first thing in your web component constructor().
   * super is a reference to the class we're inhereting, and super() calls
   * that class' constructor
   */
  constructor() {
    super();
    // Attach an open shadow so we can easily modify it later
    this.attachShadow({ mode: 'open' });

    // Fill in the shadowRoot with markup & styles
    this.shadowRoot.innerHTML = `
      <style>
        #console {
          background-color: #333;
          border: 2px solid #999;
          border-radius: 4px;
          box-sizing: border-box;
          color: white;
          display: block;
          font-family: monospace;
          height: 200px;
          margin-top: 60px;
          width: 400px;
        }

        #console p {
          margin: 6px;
        }

        #console :is(ul, p) {
          font-family: inherit;
          font-size: 1.2rem;
        }

        #console ul {
          height: 156px;
          list-style-type: '> ';
          margin: 6px;
          overflow: scroll;
          padding: 0 0 0 18px;
        }

        #console ul li {
          background-color: #4A4A4A;
          font-family: monospace;
          margin-top: 15px;
          padding: 3px 6px;
        }

        #console ul li:first-child {
          margin-top: 0;
        }
      </style>
      <div id="console">
        <p>Console:</p>
        <output>
          <ul>
          </ul>
        </output>
      </div>
    `;
  }

  /**
   * Appends a new message to the unordered list in this element's
   * "console" in the shadowRoot
   * @param {string} msg the message to log to this element's console
   */
  newLogMsg(msg) {
    const output = this.shadowRoot.querySelector('#console output > ul');
    const newLogMsg = document.createElement('li');
    newLogMsg.innerHTML = msg;
    output.append(newLogMsg);
    output.scrollTop = output.scrollHeight;
  }

  /**
   * Empties the unordered list of console messages from within this element's
   * shadowRoot
   */
  clear() {
    const output = this.shadowRoot.querySelector('#console output > ul');
    output.innerHTML = '';
  }
}

// Always define the element in the customElements registry so that you're able to
// use the element properly in the DOM
customElements.define('custom-console', CustomConsole);
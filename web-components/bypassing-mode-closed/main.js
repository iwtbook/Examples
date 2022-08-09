// index.js

window.addEventListener('DOMContentLoaded', init);

/**
 * Init (initialize) function waits for the DOMContent to load before starting
 * to query elements and attach event listeners
 */
function init() {
  // Query the DOM for necessary elements
  let bypassingClosed = document.querySelector('bypassing-closed');
  const attachOpen = document.querySelector('#btn-attach-open');
  const attachClosed = document.querySelector('#btn-attach-closed');
  const editText = document.querySelector('#btn-edit-text');
  const resetDemo = document.querySelector('#btn-reset');

  /**
   * Event listener for the "Attach Open Shadow" button. Attaches a shadowRoot
   * to the <bypassing-closed> web component with { mode: 'open' } which allows
   * for modifications to the shadowRoot after attachment
   */
  attachOpen.addEventListener('click', () => {
    // Allow the user to click the edit and reset buttons
    editText.removeAttribute('disabled');
    resetDemo.removeAttribute('disabled');
    // Prevent the user from trying to attach another shadow DOM
    attachOpen.setAttribute('disabled', '');
    attachClosed.setAttribute('disabled', '');
    // Attach an open shadow to the web component
    bypassingClosed.attachOpenShadow();
  });

  /**
   * Event listener for the "Attach Closed Shadow" button. Attaches a shadowRoot
   * to the <bypassing-closed> web component with { mode: 'closed' } which prevents
   * modifications to the shadowRoot after attachment
   */
  attachClosed.addEventListener('click', () => {
    if (!Element.prototype._attachShadow) {
      console.log('Overwriting Element.prototype.attachShadow');
      Element.prototype._attachShadow = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function () {
        return this._attachShadow({ mode: 'open' });
      };
    } else {
      console.log('Element.prototype.attachShadow already overwritten, skipping');
    }
    // Allow the user to click the edit and reset buttons
    editText.removeAttribute('disabled');
    resetDemo.removeAttribute('disabled');
    // Prevent the user from trying to attach another shadow DOM
    attachOpen.setAttribute('disabled', '');
    attachClosed.setAttribute('disabled', '');
    // Try to attach a closed shadow to the web component
    bypassingClosed.attachClosedShadow();
  });

  /**
   * Attempts to modify the text displayed in the shadowRoot of the
   * web component
   */
  editText.addEventListener('click', () => {
    bypassingClosed.editText();
  });

  /**
   * Since shadowRoots cannot be removed from elements once they have
   * been attached, the element itself must be deleted and replaced in
   * order to get a clean web component ready to attach another shadowRoot.
   * The on-screen console is also cleared of any messages
   */
  resetDemo.addEventListener('click', () => {
    // Remove & recreate the original <open-vs-closed> element
    bypassingClosed.remove();
    bypassingClosed = document.createElement('bypassing-closed');
    bypassingClosed.innerHTML = ' No Shadow Root ';
    document.body.insertAdjacentElement('afterbegin', bypassingClosed);
    // Allow the user to click the attach shadow buttons
    attachOpen.removeAttribute('disabled');
    attachClosed.removeAttribute('disabled');
    // Prevent the user from clicking the "edit" and "reset" buttons
    editText.setAttribute('disabled', '');
    resetDemo.setAttribute('disabled', '');
    // Clear the real and on-screen console
    document.querySelector('custom-console').clear();
    console.clear();
  });
}
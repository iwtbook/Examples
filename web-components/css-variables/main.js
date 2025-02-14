// index.js

window.addEventListener('DOMContentLoaded', init);

/**
 * Init (initialize) function waits for the DOMContent to load before starting
 * to query elements and attach event listeners
 */
function init() {
  // Query the DOM for necessary elements
  let cssVariables = document.querySelector('css-variables');
  const attachOpen = document.querySelector('#btn-attach-open');
  const attachClosed = document.querySelector('#btn-attach-closed');
  const resetDemo = document.querySelector('#btn-reset');

  /**
   * Event listener for the "Attach Open Shadow" button. Attaches a shadowRoot
   * to the <css-variables> web component with { mode: 'open' } which allows
   * for modifications to the shadowRoot after attachment
   */
  attachOpen.addEventListener('click', () => {
    // Allow the user to click the edit and reset buttons
    resetDemo.removeAttribute('disabled');
    // Prevent the user from trying to attach another shadow DOM
    attachOpen.setAttribute('disabled', '');
    attachClosed.setAttribute('disabled', '');
    // Attach an open shadow to the web component
    cssVariables.attachOpenShadow();
  });

  /**
   * Event listener for the "Attach Closed Shadow" button. Attaches a shadowRoot
   * to the <css-variables> web component with { mode: 'closed' } which prevents
   * modifications to the shadowRoot after attachment
   */
  attachClosed.addEventListener('click', () => {
    // Allow the user to click the edit and reset buttons
    resetDemo.removeAttribute('disabled');
    // Prevent the user from trying to attach another shadow DOM
    attachOpen.setAttribute('disabled', '');
    attachClosed.setAttribute('disabled', '');
    // Attach an closed shadow to the web component
    cssVariables.attachClosedShadow();
  });

  /**
   * Since shadowRoots cannot be removed from elements once they have
   * been attached, the element itself must be deleted and replaced in
   * order to get a clean web component ready to attach another shadowRoot.
   * The on-screen console is also cleared of any messages
   */
  resetDemo.addEventListener('click', () => {
    // Remove & recreate the original <css-variables> element
    cssVariables.remove();
    cssVariables = document.createElement('css-variables');
    cssVariables.innerHTML = ' No Shadow Root ';
    document.body.insertAdjacentElement('afterbegin', cssVariables);
    // Allow the user to click the attach shadow buttons
    attachOpen.removeAttribute('disabled');
    attachClosed.removeAttribute('disabled');
    // Prevent the user from clicking the "reset" buttons
    resetDemo.setAttribute('disabled', '');
    // Clear the real and on-screen console
    document.querySelector('custom-console').clear();
    console.clear();
  });
}
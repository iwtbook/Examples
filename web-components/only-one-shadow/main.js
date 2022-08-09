// index.js

window.addEventListener('DOMContentLoaded', init);

/**
 * Init (initialize) function waits for the DOMContent to load before starting
 * to query elements and attach event listeners
 */
function init() {
  // Query the DOM for necessary elements
  let onlyOneShadow = document.querySelector('only-one-shadow');
  const attachShadow = document.querySelector('#btn-attach-shadow');
  const resetDemo = document.querySelector('#btn-reset');

  /**
   * Event listener for the "Attach Shadow" button. Attaches a shadowRoot
   * to the <only-one-shadow> web component with { mode: 'open' } which allows
   * for modifications to the shadowRoot after attachment
   */
  attachShadow.addEventListener('click', () => {
    // Allow the user to click the edit and reset buttons
    resetDemo.removeAttribute('disabled')
    // Attach an open shadow to the web component
    onlyOneShadow.attachOpenShadow();
  });

  /**
   * Since shadowRoots cannot be removed from elements once they have
   * been attached, the element itself must be deleted and replaced in
   * order to get a clean web component ready to attach another shadowRoot.
   * The on-screen console is also cleared of any messages
   */
  resetDemo.addEventListener('click', () => {
    // Remove & recreate the original <only-one-shadow> element
    onlyOneShadow.remove();
    onlyOneShadow = document.createElement('only-one-shadow');
    onlyOneShadow.innerHTML = ' No Shadow Root ';
    document.body.insertAdjacentElement('afterbegin', onlyOneShadow);
    // Prevent the user from clicking "reset" button
    resetDemo.setAttribute('disabled', '');
    // Clear the real and on-screen console
    document.querySelector('custom-console').clear();
    console.clear();
  });
}
// insecure.js

function init() {
  let inlineFail = document.getElementById('insecureFail');
  inlineFail.classList.remove('passed');
  inlineFail.classList.add('failed');
  inlineFail.innerText = 'No';
}

window.addEventListener('DOMContentLoaded', init);

// secure.js

function init() {
  let inlineFail = document.getElementById('securePass');
  inlineFail.classList.remove('failed');
  inlineFail.classList.add('passed');
  inlineFail.innerText = 'Yes';
}

window.addEventListener('DOMContentLoaded', init);

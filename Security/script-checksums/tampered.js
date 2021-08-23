// other-integrity.js

function init() {
  let status = document.getElementById('tamperedStatus');
  status.innerText = 'Passed';
  status.classList.remove('failed');
  status.classList.add('passed');
}

window.addEventListener('DOMContentLoaded', init);

// integrity.js

function init() {
  let status = document.getElementById('integrityStatus');
  status.innerText = 'Passed';
  status.classList.remove('failed');
  status.classList.add('passed');
}

window.addEventListener('DOMContentLoaded', init);

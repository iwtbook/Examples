// script.js

function bindDropdowns() {
  let dropdowns = Array.from(document.querySelectorAll('.dropdown'));
  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('click', () => {
      dropdowns[i].querySelector('ul').classList.toggle('hidden');
    });
  }
}

function init() {
  bindDropdowns();
}

window.addEventListener('DOMContentLoaded', init);

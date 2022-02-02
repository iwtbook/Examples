// script.js

document.addEventListener('DOMContentLoaded', init);

function init() {
  bindListeners();
}

function bindListeners() {
  const img = document.querySelector('#figure-js img');
  img.addEventListener('contextmenu', (e) => e.preventDefault());
}

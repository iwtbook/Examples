// script.js

function init() {
  setTimeout(function() {
    document.querySelector('body').classList.add('modal');
    document.querySelector('#modalWrapper').classList.toggle('hidden');
  }, 3000);
}

window.addEventListener('DOMContentLoaded', init);

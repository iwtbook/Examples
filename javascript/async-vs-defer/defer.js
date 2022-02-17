// defer.js

(() => {
  const startedParsing = document.querySelector('#startedParsing');
  const p = document.createElement('p');

  p.style.color = 'green';
  p.innerText = 'Deferred script loaded!';

  startedParsing.insertAdjacentElement('afterend', p);
})();

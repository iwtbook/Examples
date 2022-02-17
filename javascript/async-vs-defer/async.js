// async.js

(() => {
  const startedParsing = document.querySelector('#startedParsing');
  const p = document.createElement('p');

  p.style.color = 'blue';
  p.innerText = 'Async script loaded!';

  startedParsing.insertAdjacentElement('afterend', p);
})();

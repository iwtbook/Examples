// script.js

const themes = ['dark', 'forest', 'lightblue', 'maroon', 'light'];

document.addEventListener('DOMContentLoaded', init);

function init() {
  bindListeners();
}

function bindListeners() {
  const btn = document.querySelector('button img');
  const txt = document.querySelector('p.current span');
  const body = document.body;

  btn.addEventListener('click', () => {
    cycleTheme(btn, txt, body);
  });
}

function cycleTheme(btn, txt, body) {
  let currTheme = Array.from(body.classList)[0];
  const index = themes.indexOf(currTheme);
  const nextIndex = (index + 1) % themes.length;
  body.classList.remove(currTheme);
  body.classList.add(themes[nextIndex]);
  txt.innerHTML = themes[nextIndex].charAt(0).toUpperCase();
  txt.innerHTML += themes[nextIndex].slice(1);
}

// script.js

const themes = ['dark', 'forest', 'lightblue', 'maroon', 'light'];

document.addEventListener('DOMContentLoaded', init);

function init() {
  bindListeners();
}

function bindListeners() {
  const btn = document.querySelector('button img');
  const sel = document.querySelector('select');
  const body = document.body;

  btn.addEventListener('click', () => {
    sel.value = getNextTheme(body);
    setTheme(sel.value, body);
  });

  sel.addEventListener('input', () => {
    setTheme(sel.value, body);
  });
}

function getNextTheme(body) {
  const currTheme = body.classList[0];
  const nextThemeIndex = (themes.indexOf(currTheme) + 1) % 5;
  return themes[nextThemeIndex];
}

function setTheme(theme, body) {
  let currTheme = body.classList[0];
  body.classList.remove(currTheme);
  body.classList.add(theme);
}

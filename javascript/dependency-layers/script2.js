// script2.js

const main = document.querySelector('main');
const p = document.createElement('p');
p.innerText = 'Script 2 - Script 1 Dependency Loaded!';
main.append(p);

fetch('./script3.js')
  .then((response) => response.text())
  .then((data) => {
    const newScript = document.createElement('script');
    newScript.setAttribute('type', 'module');
    newScript.innerHTML = data;
    document.body.insertAdjacentElement('beforeend', newScript);
  })
  .catch((err) => {
    console.error(err);
  });

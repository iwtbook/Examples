// script.js

const url = 'https://httpbin.org/delay/3';

function stateHandler(output, state) {
  output.classList.remove('json-error');
  output.classList.remove('json-received');
  switch (state) {
    case 'loading':
      output.innerHTML = 'JSON loading...';
      break;
    case 'received':
      output.innerHTML = 'JSON received!';
      output.classList.add('json-received');
      break;
    case 'error':
      output.innerHTML = 'Error retrieving JSON!';
      output.classList.add('json-error');
      break;
    default:
      document.querySelector('output').innerHTML = '';
  }
}

function makeRequestWithCallback(url, callbackFunction) {
  let xhr = new XMLHttpRequest;
  xhr.open('GET', url);
  xhr.send();

  xhr.addEventListener('load', function () {
    if (xhr.status == 200) {
      callbackFunction('received');
    } else {
      callbackFunction('error');
    }
  });

  xhr.addEventListener('error', function () {
    callbackFunction('error');
  });
}

function XMLHttpCallback() {
  let output = document.querySelector('#sectionCallback > output');
  stateHandler(output, 'loading');
  makeRequestWithCallback(url, function (status) {
    stateHandler(output, status);
  });
}

function fetchPromise() {
  let output = document.querySelector('#sectionPromise > output');
  stateHandler(output, 'loading');
  fetch(url)
    .then(() => { stateHandler(output, 'received') })
    .catch(() => { stateHandler(output, 'error') });
}

async function fetchAsync() {
  let output = document.querySelector('#sectionAsync > output');
  stateHandler(output, 'loading');
  try {
    await fetch(url);
    stateHandler(output, 'received');
  } catch (err) {
    stateHandler(output, 'error');
  }
}

function bindEvents() {
  let btnCallback = document.querySelector('#sectionCallback > button');
  let btnPromise = document.querySelector('#sectionPromise > button');
  let btnAsync = document.querySelector('#sectionAsync > button');
  btnCallback.addEventListener('click', XMLHttpCallback);
  btnPromise.addEventListener('click', fetchPromise);
  btnAsync.addEventListener('click', fetchAsync);
}

function init() {
  bindEvents();
}

window.addEventListener('DOMContentLoaded', init);

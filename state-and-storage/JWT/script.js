// script.js

const loginURL = 'http://localhost:3000/api/login';
const postsURL = 'http://localhost:3000/api/posts';
let jwtToken = '';

function login(e, form) {
  e.preventDefault();
  let formData = new FormData(form);
  let formJSON = {};
  formData.forEach((value, key) => formJSON[key] = value);
  fetch(loginURL, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(formJSON)
  })
    .then(response => response.json())
    .then(data => {
      if (data?.token) {
        jwtToken = data.token;
        let newToken = data.token.split('.');
        document.querySelector('#serverResponse output').innerHTML = `
          JWT Token (<span class="token-header">Header</span>.<span class="token-payload">Payload</span>.<span class="token-signature">Signature</span>):
          <div id="token">
            <span class="token-header">${newToken[0]}</span>.<span class="token-payload">${newToken[1]}</span>.<span class="token-signature">${newToken[2]}</span>
          </div>
        `;
      } else {
        console.log(data);
        return false;
      }
    })
    .catch(err => console.log(err));
}

function getData() {
  fetch(postsURL, {
    headers: {
      'Authorization': jwtToken
    },
    method: 'POST',
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.querySelector('#getData output').innerHTML = `
        <pre>Data Retrieved:
${formatJSONstring(JSON.stringify(data))}</pre>
      `;
    }).catch(err => {
      document.querySelector('#getData output').innerHTML = 'Error: 401 Unauthorized';
    });
}

function formatJSONstring(jsonString) {
  let formatted = ``;
  let currLevel = 0;
  for (let i = 0; i < jsonString.length; i++) {
    if (jsonString.charAt(i) == '{') {
      formatted += '{\n';
      currLevel += 1;
      for (let j = 0; j < currLevel; j++) {
        formatted += '\t';
      }
    } else if (jsonString.charAt(i) == '}') {
      currLevel -= 1;
      formatted += '\n';
      for (let j = 0; j < currLevel; j++) {
        formatted += '\t';
      }
      formatted += '}';
    } else if (jsonString.charAt(i) == ':') {
      formatted += ': ';
    } else if (jsonString.charAt(i) == ',') {
      formatted += ',\n';
      for (let j = 0; j < currLevel; j++) {
        formatted += '\t';
      }
    } else {
      formatted += jsonString.charAt(i);
    }
  }
  return formatted;
}

function deleteToken() {
  jwtToken = '';
  document.querySelector('output').innerHTML = 'JWT Token:';
}

function bindEvents() {
  let form = document.querySelector('form');
  let deleteBtn = document.querySelectorAll('#loginSection button')[1];
  let getDataBtn = document.querySelectorAll('#getData button')[0];

  form.addEventListener('submit', e => { login(e, form) });
  getDataBtn.addEventListener('click', getData);
  deleteBtn.addEventListener('click', deleteToken);
}

function init() {
  bindEvents();
}

window.addEventListener('DOMContentLoaded', init);

// script.js

fetch('http://localhost:3000/json')
  .then(response => response.json())
  .then(data => {
    if (data?.msg == 'success') {
      let outcome = document.querySelector('#outcomeLocal');
      outcome.innerHTML = 'Success';
      outcome.classList.remove('failed');
      outcome.classList.add('success');
    }
  }).catch(err => {
    console.log(err);
  });

fetch('http://localhost:3001/jsonAllowOrigin', {
  mode: 'cors'
})
  .then(response => response.json())
  .then(data => {
    if (data?.msg == 'success') {
      let outcome = document.querySelector('#outcomeCORSenabled');
      outcome.innerHTML = 'Success';
      outcome.classList.remove('failed');
      outcome.classList.add('success');
    }
  }).catch(err => {
    console.log(err);
  });

fetch('http://localhost:3001/jsonNotAllowed', {
  mode: 'cors'
})
  .then(response => response.json())
  .then(data => {
    if (data?.msg == 'success') {
      let outcome = document.querySelector('#outcomeCORSdisabled');
      outcome.innerHTML = 'Success';
      outcome.classList.remove('failed');
      outcome.classList.add('success');
    }
  }).catch(err => {
    console.log(err);
  });

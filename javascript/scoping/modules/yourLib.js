// yourLib.js

// Function named "sayHi"
function sayHi() {
  alert('Your library says hello!');
}

// Constant named "btn"
const btn = document.querySelector('#btnYourLib');
btn.addEventListener('click', sayHi);

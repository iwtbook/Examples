// myLib.js

// Function named "sayHi"
function sayHi() {
  alert('My library says hello!');
}

// Constant named "btn"
const btn = document.querySelector('#btnMyLib');
btn.addEventListener('click', sayHi);

// myLib.js

// Wrapper Object to hold my variables & functions
const myLib = {};

// Function named "sayHi"
myLib.sayHi = function () {
  alert('My library says hello!');
};

// Variable named "btn"
myLib.btn = document.querySelector('#btnMyLib');
myLib.btn.addEventListener('click', myLib.sayHi);

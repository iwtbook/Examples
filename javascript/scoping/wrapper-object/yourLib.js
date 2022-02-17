// yourLib.js

// Wrapper Object to hold your variables & functions
const yourLib = {};

// Function named "sayHi"
yourLib.sayHi = function () {
  alert('Your library says hello!');
};

// Variable named "btn"
yourLib.btn = document.querySelector('#btnYourLib');
yourLib.btn.addEventListener('click', yourLib.sayHi);

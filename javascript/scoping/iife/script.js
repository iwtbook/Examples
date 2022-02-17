// script.js

// Immediately Invoked Function Expression (IIFE)
(function (professor) {
  var name = 'Powell';
  professor.favColor = 'Green';
  professor.sayHi = function () {
    console.log(`Prof ${name} says hi everybody!`);
  };
})((window.professor = window.professor || {}));

const elems = [
  window.professor,
  window.professor.favColor,
  window.professor.sayHi,
  window.name,
];

for (let i = 0; i < elems.length; i++) {
  if (!elems[i]) continue;
  cell = document.querySelector(`tbody>tr:nth-child(${i + 1})>td:nth-child(2)`);
  cell.classList.add('yes');
  cell.innerText = 'Yes';
}

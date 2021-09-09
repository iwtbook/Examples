// script.js

let entries;

function addEntry(text) {
  let newEntry = document.createElement('LI');
  newEntry.innerHTML = text;
  entries.appendChild(newEntry);
}

function saveEntry(text) {
  let entriesArr = JSON.parse(localStorage.getItem('entries'));
  entriesArr.push(text);
  localStorage.setItem('entries', JSON.stringify(entriesArr));
}

function bindEvents() {
  let btnDel = document.querySelectorAll('form > button')[1];
  let form = document.querySelector('form');
  let textarea = document.querySelector('input[type="text"]');
  entries = document.querySelector('#notebookEntries');

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (textarea.value != '') {
      let text = textarea.value;
      addEntry(text);
      saveEntry(text);
      textarea.value = '';
      populateLocalStorageSection();
    }
  });

  btnDel.addEventListener('click', () => {
    localStorage.setItem('entries', JSON.stringify([]));
    entries.innerHTML = '';
    populateLocalStorageSection();
  });
}

function populateEntries() {
  let entriesArr = JSON.parse(localStorage.getItem('entries'));
  entriesArr.forEach(entry => {
    addEntry(entry)
  });
}

function populateLocalStorageSection() {
  let tableBody = document.querySelector('#localStorage tbody');
  tableBody.innerHTML = '';
  Object.keys(localStorage).forEach(item => {
    let newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${item}</td>
      <td>${localStorage.getItem(item)}</td>
    `;
    tableBody.appendChild(newRow);
  });
}

function init() {
  if (!localStorage.getItem('entries')) {
    localStorage.setItem('entries', JSON.stringify([]));
  }

  bindEvents();
  populateEntries();
  populateLocalStorageSection();
}

document.addEventListener('DOMContentLoaded', init);

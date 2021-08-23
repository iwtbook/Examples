// script.js

let entries, db;

function openIndexedDB() {
  let request = window.indexedDB.open('secret_notebook_db', 1);

  request.onerror = function() {
    console.log('Database failed to open');
  };

  request.onsuccess = function() {
    console.log('Database opened succesfully');
    db = request.result;
    loadIndexedDBEntries();
  };

  request.onupgradeneeded = function(e) {
    let db = e.target.result;
    let objectStore = db.createObjectStore('secret_notebook_os', { keyPath: 'id', autoIncrement:true });
    objectStore.createIndex('secret_message', 'secret_message', { unique: false });
    console.log('Database setup complete');
  };
}

function saveEntry(text) {
  let newItem = { secret_message: text };
  let transaction = db.transaction(['secret_notebook_os'], 'readwrite');
  let objectStore = transaction.objectStore('secret_notebook_os');
  let request = objectStore.add(newItem);

  request.onsuccess = function() {
    console.log('Added to Database');
  };

  transaction.oncomplete = function() {
    console.log('Transaction completed: database modification finished.');
  };

  transaction.onerror = function() {
    console.log('Transaction not opened due to error');
  };
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
      saveEntry(text);
      textarea.value = '';
      loadIndexedDBEntries();
    }
  });

  btnDel.addEventListener('click', () => {
    let transaction = db.transaction(['secret_notebook_os'], 'readwrite');
    let objectStore = transaction.objectStore('secret_notebook_os');
    let request = objectStore.clear();

    request.onsuccess = function() {
    console.log('Cleared the Database');
  };

    transaction.oncomplete = function() {
      console.log('Transaction completed: database modification finished.');
    };

    transaction.onerror = function() {
      console.log('Transaction not opened due to error');
    };

    entries.innerHTML = '';
    loadIndexedDBEntries();
  });
}

function loadIndexedDBEntries() {
  let notebook = document.querySelector('#notebookEntries');
  notebook.innerHTML = '';
  let tableBody = document.querySelector('#localStorage tbody');
  tableBody.innerHTML = '';
  
  let objectStore = db.transaction('secret_notebook_os').objectStore('secret_notebook_os');
  objectStore.openCursor().onsuccess = function(e) {
    let cursor = e.target.result;
    if(cursor) {
      // Add list item to notebook
      let newEntry = document.createElement('li');
      newEntry.innerHTML = cursor.value.secret_message;
      notebook.append(newEntry);
      
      // Add row to table
      let newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${cursor.value.id}</td>
        <td>${cursor.value.secret_message}</td>
      `;
      tableBody.appendChild(newRow);
      
      cursor.continue();
    }
  };
}

function init() {
  openIndexedDB();
  bindEvents();
}

document.addEventListener('DOMContentLoaded', init);

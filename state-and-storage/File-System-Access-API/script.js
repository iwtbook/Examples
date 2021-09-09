let fileHandle;

async function requestFile() {
  // open file picker
  try {
    [fileHandle] = await window.showOpenFilePicker();
  } catch (e) {
    console.log(e);
    console.log('User aborted request');
  }

  if (fileHandle) {
    console.log(fileHandle);
  } else {
    return;
  }

  if (fileHandle.kind === 'file') {
    document.querySelector('p').innerHTML = `File Loaded: <b>${fileHandle.name}</b>`;
  }
}

async function requestDirectory() {
  let directoryHandle;

  // open file picker
  try {
    directoryHandle = await window.showDirectoryPicker();
  } catch (e) {
    console.log(e);
    console.log('User aborted request');
  }

  if (directoryHandle) {
    console.log(directoryHandle);
  } else {
    return;
  }

  if (directoryHandle.kind === 'directory') {
    document.querySelector('p').innerHTML = `Directory Loaded: <b>${directoryHandle.name}</b>`;
  }
}

async function writeToFile(newFile) {
  let textarea = document.querySelector('textarea');
  let newHandle = newFile ? await window.showSaveFilePicker() : fileHandle;
  let writableStream = await newHandle.createWritable();
  await writableStream.write(textarea.value);
  await writableStream.close();
  textarea.value = '';
}

async function loadDroppedFile(e) {
  e.preventDefault();

  if (e.dataTransfer.items.length > 1) return;

  // Process all of the items.
  for (const item of e.dataTransfer.items) {
    // kind will be 'file' for file/directory entries.
    if (item.kind === 'file') {
      const entry = await item.getAsFileSystemHandle();
      if (entry.kind === 'file') {
        fileHandle = entry;
        document.querySelector('p').innerHTML = `File Loaded: <b>${fileHandle.name}</b>`;
      }
    }
  }
}

function bindEvents() {
  let requestFileAccess = document.querySelectorAll('button')[0];
  let requestDirectoryAccess = document.querySelectorAll('button')[1];
  let writeToNewFileBtn = document.querySelectorAll('button')[2];
  let writeToLoadedFileBtn = document.querySelectorAll('button')[3];
  let dragAndDrop = document.querySelector('#dragAndDrop');

  requestFileAccess.addEventListener('click', requestFile);
  requestDirectoryAccess.addEventListener('click', requestDirectory);
  writeToNewFileBtn.addEventListener('click', () => { writeToFile(true) });
  writeToLoadedFileBtn.addEventListener('click', () => { writeToFile(false) });
  dragAndDrop.addEventListener('dragover', e => { e.preventDefault(); });
  dragAndDrop.addEventListener('drop', e => { loadDroppedFile(e) });
}

function init() {
  bindEvents();
}

window.addEventListener('DOMContentLoaded', init);

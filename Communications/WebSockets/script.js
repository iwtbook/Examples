// script.js
let socket = new WebSocket("ws://localhost:3001");
let connected = false;

socket.onopen = () => {
  console.log('Connection established');
  connected = true;
};

socket.onmessage = event => {
  addMessage(event.data, false);
};

socket.onclose = event => {
  connected = false;
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = error => {
  console.log(`[error] ${error.message}`);
};

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();

  if (connected) {
    let userMessage = document.querySelector('#user-message');
    addMessage(userMessage.value, true);
    socket.send(userMessage.value);
    userMessage.value = '';
  }
});

function addMessage(message, you) {
  let chatLog = document.querySelector('#chat-log');
  let newMessage = document.createElement('div');
  newMessage.classList.add('message');
  if (you) {
    newMessage.innerHTML = `<span class="you">You: </span>${message}</div>`
  } else {
    newMessage.innerHTML = `<span class="server">Server: </span>${message}</div>`
  }
  chatLog.appendChild(newMessage);
}

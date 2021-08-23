// script.js

let peer, conn;

function createPeer() {
  peer = new Peer({
    host: 'localhost',
    port: 9000,
    path: '/'
  });

  peer.on('open', () => {
    document.querySelector('#yourID').innerText = peer.id;
    document.querySelector('#status').setAttribute('class', 'serverConnection');
    document.querySelector('#status').innerText = 'Connected to Server';
  });

  peer.on('connection', conn => {
    document.querySelector('#status').setAttribute('class', 'peerConnection');
    document.querySelector('#status').innerText = 'Connected to Peer';
    conn.on('data', data => {
      let output = document.querySelector('output');
      output.innerText = data;
      console.log(data);
      setTimeout(() => {
        output.innerText = '';
      }, 2000);
    });
  });
}

function bindEvents() {
  let form = document.querySelector('form');
  let pingBtn = document.querySelector('section > button');

  form.addEventListener('submit', e => {
    e.preventDefault();

    let peerID = document.querySelector('#peerID').value;
    conn = peer.connect(peerID);

    conn.on('open', () => {
      console.log('Connection open!');
      pingBtn.addEventListener('click', () => {
        conn.send("You've been pinged!");
      });
    });
  });
}

function init() {
  createPeer();
  bindEvents();
}

window.addEventListener('DOMContentLoaded', init);

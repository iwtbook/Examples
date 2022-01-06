// script.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const btn = document.getElementById('requestButton');
  btn.addEventListener('click', () => {
    prepareRequests(btn.form);
  });
}

function prepareRequests(form) {
  /* Clean up previous request */
  const tbody = document.getElementById('statusTbody');
  for (let i = tbody.childNodes.length - 1; i > 0; i--) {
    if (!tbody.childNodes[i].id || tbody.childNodes[i].id != 'header')
      tbody.removeChild(tbody.childNodes[i]);
  }

  const phrase = 'Makes Sense?';

  const responseOutput = document.getElementById('responseOutput');
  responseOutput.innerHTML = '';

  AjaxTCR.comm.queue.requestQueueConcurrentRequests = phrase.length;

  for (let i = 0; i < phrase.length; i++) {
    const delay = Math.floor(Math.random() * 3);
    const url = `https://httplayground.introweb.tech/delay/${delay}`;

    let currChar = phrase.charAt(i);
    if (currChar == ' ') currChar = '&nbsp;';
    const payloadString = 'payload=' + AjaxTCR.data.encodeValue(currChar);

    /* define communication options */
    const options = {
      method: 'GET',
      onSuccess: showSuccess,
      onReceived: showReceived,
      onOpen: showOpen,
      onSent: showSent,
      payload: payloadString,
      symbol: currChar
    };

    /* add enforce order if selected */
    if (form.responsequeue.checked)
      options.enforceOrder = true;

    const tbody = document.getElementById('statusTbody');
    const tr = document.createElement('tr');
    let td = document.createElement('td');
    td.innerHTML = currChar;
    tr.appendChild(td);

    td = document.createElement('td');
    tr.appendChild(td);
    tbody.appendChild(tr);

    options.symbolStatus = td;

    if (form.requestqueue.checked) {
      AjaxTCR.comm.queue.add(url, options);
    } else {
      AjaxTCR.comm.sendRequest(url, options);
    }

    showOutstanding();
  }
}

function showOutstanding() {
  const status = document.getElementById('status');
  const outstandingRequests = AjaxTCR.comm.stats.getRequestCount('active');
  const queueRequests = AjaxTCR.comm.queue.getSize();

  if (outstandingRequests == 1) {
    status.innerHTML = 'Awaiting ' + outstandingRequests + ' response';
  } else if (outstandingRequests == 0) {
    status.innerHTML = '';
  } else {
    status.innerHTML = 'Awaiting ' + outstandingRequests + ' responses';
  }

  if (queueRequests == 1) {
    status.innerHTML += '<br />1 request in Queue';
  } else if (queueRequests > 1) {
    status.innerHTML += '<br />' + queueRequests + ' requests in queue';
  }
}

function showSent(request) {
  request.symbolStatus.innerHTML = 'Sent';
}

function showOpen(request) {
  request.symbolStatus.innerHTML = 'Request Created';
}

function showReceived(response) {
  response.symbolStatus.innerHTML = 'Received';
}

function showSuccess(response) {
  showOutstanding();

  const responseOutput = document.getElementById('responseOutput');
  responseOutput.innerHTML += JSON.parse(response.xhr.responseText).args.payload;

  response.symbolStatus.innerHTML = 'Processed';
}
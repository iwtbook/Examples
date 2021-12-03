// collector-http.js - Collector Script

// Data that doesn't (usually) change during the user's session
const staticData = [{
  outerWidth: window.outerWidth,
  outerHeight: window.outerHeight,
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight,
  userAgent: navigator.userAgent,
  language: navigator.language
}];

const packageQueue = []; // Queue of currClickPackages waiting to be sent
let currClickPackage = []; // An array of all of the click events that have occurred

// Function that fires whenever there is a click anywhere in the window
window.addEventListener('click', e => {
  // Object with some of the data from the click event object
  let clickEvent = {
    client: {
      x: e.clientX,
      y: e.clientY
    },
    page: {
      x: e.pageX,
      y: e.pageY
    }
  }

  // Push the new clickEvent object we created above to the currClickPackage array
  currClickPackage.push(clickEvent);
});

/** 
 * DOMContentLoaded happens after the browser has finished loading and parsing the HTML document.
 * It does not wait for stylesheets, images, or subframes to finish loading.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Send the initial static Data
  enqueueData(staticData, false);
  sendData();

  // Set interval for the click data
  setInterval(function () {
    enqueueData(currClickPackage, true); // Add package to the queue and reset the current package
    sendData(); // Send data from queue to the endpoint
  }, 5000); // Execute this code every 5 seconds (5000 ms)
});

/**
 * Pushes the current click package to the queue to be sent, then resets the current
 * click package (if isCurrClick is set to true)
 * @param {Object} data - The data that you would like to pacakge and enqueue
 * @param {Boolean} isCurrClick - If data is the currClickPackage (true) or not (false)
 */
 function enqueueData(data, isCurrClick) {
  packageQueue.push(JSON.stringify(data));
  if (isCurrClick) {
    currClickPackage = [];
  }
}

/**
 * Makes a POST request using fetch() to the endpoint with the packaged data from the queue
 */
function sendData(isTimeout) {
  if (JSON.parse(packageQueue[0]).length == 0) {
    packageQueue.shift();
    return;
  }
  let collection = JSON.parse(packageQueue[0])[0]?.outerWidth ? 'staticData' : 'clickEvents';
  fetch(`http://127.0.0.1:3000/${collection}`, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: packageQueue[0]
  })
  .then(response => {response.json()})
  .then(data => {
    console.log(data);
    packageQueue.shift(); // Removes the first index from the queue on success
  })
  .catch(err => {
    console.log(`Error: ${err}`); // Log the error if unsuccessful
    if (!isTimeout) {
      setTimeout(() => {
        sendData(true);
      }, 1000);
    }
  });
}

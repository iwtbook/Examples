// script.js

/**
 * Increments the given stopwatch element by one second
 * @param {Element} stopwatch The stopwatch element one would like to increment
 */
function incrementStopwatch(stopwatch) {
  let time, minutes, seconds;
  time = stopwatch.getAttribute('datetime');
  // The datetime attribute holds a duration string here with the value
  // PT##M##S where ## is always a 2 digit value of the minutes / seconds
  minutes = parseInt(time.substr(2,2));
  seconds = parseInt(time.substr(5,2));
  
  // If the seconds isn't at its max yet, increment it
  if (seconds < 59) {
    seconds += 1;
  // If the seconds is at 59, increment minutes and reset seconds
  } else {
    seconds = 0;
    // If minutes hits 99, reset them to zero. Otherwise, increment them
    if (minutes == 99) {
      minutes = 0;
    } else {
      minutes += 1;
    }
  }

  // Convert the number value of minutes & seconds to strings of length 2 (prepended with zeros if applicable)
  minutes = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
  seconds = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
  // Update the datetime attribute and the stopwatch text with the new time
  stopwatch.setAttribute('datetime', `PT${minutes}M${seconds}S`);
  stopwatch.innerHTML = `${minutes}:${seconds}`;
}

/**
 * Manages the functionality of the stopwatch (starting, stopping, clearing)
 * @param {Element} stopwatch The stopwatch element one would like to handle
 * @param {String} action The action to do to the stopwatch element (accepts 'start', 'stop', and 'clear')
 */
function stopwatchHandler(stopwatch, action) {
  if (action == 'start') {
    // To start the watch, first check that it isn't already running
    if (stopwatch.getAttribute('data-running') == 'false') {
      // Create an interval to call the incrementStopwatch() function once every second
      let interval = setInterval(() => {
        incrementStopwatch(stopwatch);
      }, 1000);
      // Update the stopwatch data-running attribute to show that it is running. Stores interval value for later
      stopwatch.setAttribute('data-running', interval);
    }
  } else {
    // If you're not starting the watch, then you are either stopping or clearing it, so grab the running value
    let runningVal = stopwatch.getAttribute('data-running');
    if (runningVal != 'false') {
      // If there was a running value, parse it as a number and use it to clear the current interval
      clearInterval(parseInt(runningVal));
      // Update the data-running attribute to show that it is no longer running
      stopwatch.setAttribute('data-running', 'false');
    }
    if (action == 'clear') {
      // Now that the watch is stopped, if the action was 'clear' the watch will also need to be reset
      stopwatch.setAttribute('datetime', 'PT00M00S');
      stopwatch.innerHTML = '00:00';
    }
  }
}

// Binds event listeners to their respective buttons / elements
function bindEvents() {
  let btnStart = document.querySelector('#btnStart');
  let btnStop = document.querySelector('#btnStop');
  let btnClear = document.querySelector('#btnClear');
  let stopwatch = document.querySelector('#stopwatch');

  // On Start button click, start the timer, disable the start button, and enable the stop & clear buttons
  btnStart.addEventListener('click', () => {
    stopwatchHandler(stopwatch, 'start');
    btnStart.setAttribute('disabled', 'true');
    btnStop.removeAttribute('disabled');
    btnClear.removeAttribute('disabled', 'true');
  });

  // On Stop button click, pause the timer, disable the stop button, and enable the start button
  btnStop.addEventListener('click', () => {
    stopwatchHandler(stopwatch, 'stop')
    btnStop.setAttribute('disabled', 'true');
    btnStart.removeAttribute('disabled');
  });

  // On Clear button click, reset the timer, disable the clear & stop buttons, and enable the start button
  btnClear.addEventListener('click', () => {
    stopwatchHandler(stopwatch, 'clear')
    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', 'true');
    btnClear.setAttribute('disabled', 'true');
  });
}

// Initializes the functionality of the page
function init() {
  bindEvents();
}

// Call the initialize function once the DOM has been constructed
window.addEventListener('DOMContentLoaded', init);

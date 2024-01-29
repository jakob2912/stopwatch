//Define elements
//Define Display Element
const displayElem = document.getElementById('display');

//Define buttons
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

//Define variables
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

//Add eventlisteners to the buttons
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);

//Start Function
function start() {
  //Don't do anything if the timer is already running
  if (isRunning) return;

  //Start timer
  startTime = Date.now() - elapsedTime;
  timer = setInterval(update, 10);
  isRunning = true;
}

function stop() {
  //Do nothing if stopwatch is already stoppedd
  if (!isRunning) return;

  //Stop timer
  clearInterval(timer);
  elapsedTime = Date.now() - startTime;
  isRunning = false;
}

function reset() {
  //Reset the variables
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  displayElem.textContent = '00:00'
}

function update() {
  //Get elapsed time since user pressed "start"
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  //Convert milliseconds into something readable
  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);

  

  //Convert time into a string with padding
  seconds = String(seconds).padStart(2, 0);
  milliseconds = String(milliseconds).padStart(2, 0);


  //Change the displayed time on the page
  if (hours > 0) {
    hours = String(hours).padStart(2, 0);
    displayElem.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  } else if (minutes > 0) {
    minutes = String(minutes).padStart(2, 0);
    displayElem.textContent = `${minutes}:${seconds}:${milliseconds}`;
  } else {
    displayElem.textContent = `${seconds}:${milliseconds}`;
  }
}
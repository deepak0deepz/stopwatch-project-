// A simple stopwatch implementation
let elapsedMilliseconds = 0; // Keeps track of total time in milliseconds
let timerInterval = null; // This will hold the interval ID
let isRunning = false; // State of the stopwatch
let lapTimes = []; // Store lap times

// This function converts milliseconds to HH:MM:SS.MS format
function formatTime(ms) {
  const hours = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return { hours, minutes, seconds, milliseconds };
}

// Update the display of the stopwatch
function updateStopwatchDisplay() {
  const { hours, minutes, seconds, milliseconds } = formatTime(elapsedMilliseconds);

  document.getElementById('hour1').textContent = hours[0];
  document.getElementById('hour2').textContent = hours[1];
  document.getElementById('min1').textContent = minutes[0];
  document.getElementById('min2').textContent = minutes[1];
  document.getElementById('sec1').textContent = seconds[0];
  document.getElementById('sec2').textContent = seconds[1];
  document.getElementById('ms1').textContent = milliseconds[0];
  document.getElementById('ms2').textContent = milliseconds[1];
}

// Starts the stopwatch
function startStopwatch() {
  if (isRunning) return; // Prevent multiple intervals
  isRunning = true;

  // Increment the timer every 10ms
  timerInterval = setInterval(() => {
    elapsedMilliseconds += 10;
    updateStopwatchDisplay();
  }, 10);
}

// Pauses the stopwatch
function pauseStopwatch() {
  isRunning = false;
  clearInterval(timerInterval);
}

// Resets the stopwatch and clears lap times
function resetStopwatch() {
  pauseStopwatch();
  elapsedMilliseconds = 0;
  lapTimes = [];
  updateStopwatchDisplay();
  updateLapTimesDisplay();
}

// Records the current time as a lap
function recordLap() {
  if (!isRunning) return;

  const { hours, minutes, seconds, milliseconds } = formatTime(elapsedMilliseconds);
  const lapTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;
  lapTimes.push(lapTime);

  updateLapTimesDisplay();
}

// Updates the lap times display
function updateLapTimesDisplay() {
  const lapListElement = document.getElementById('lapTimesList');
  lapListElement.innerHTML = lapTimes
    .map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`)
    .join('');
}

// Attach event listeners to the buttons
document.getElementById('startButton').addEventListener('click', startStopwatch);
document.getElementById('pauseButton').addEventListener('click', pauseStopwatch);
document.getElementById('resetButton').addEventListener('click', resetStopwatch);
document.getElementById('lapButton').addEventListener('click', recordLap);

// Initialize the stopwatch display on load
updateStopwatchDisplay();

let timer;
let timeLeft = 25 * 60; // Default focus time in seconds
let isRunning = false;
let isFocusTime = true;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const focusTimeInput = document.getElementById('focus-time');
const breakTimeInput = document.getElementById('break-time');
const applySettingsButton = document.getElementById('apply-settings');

function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimeDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        toggleTimer();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = isFocusTime ? focusTimeInput.value * 60 : breakTimeInput.value * 60;
  updateTimeDisplay();
}

function toggleTimer() {
  isFocusTime = !isFocusTime;
  timeLeft = isFocusTime ? focusTimeInput.value * 60 : breakTimeInput.value * 60;
  updateTimeDisplay();
  if (isRunning) startTimer();
}

function applySettings() {
  if (!isRunning) {
    timeLeft = isFocusTime ? focusTimeInput.value * 60 : breakTimeInput.value * 60;
    updateTimeDisplay();
  }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
applySettingsButton.addEventListener('click', applySettings);

// Initialize timer display
updateTimeDisplay();
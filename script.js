let timer;
let timeLeft = 25 * 60; // Default session time in seconds
let isRunning = false;
let isFocusTime = true;
let sessionCount = 0;
let breakCount = 0;
let totalSessionTime = 0;
let totalBreakTime = 0;

const timeDisplay = document.querySelector('.timer');
const pauseResumeButton = document.getElementById('pause-resume');
const sessionCountDisplay = document.getElementById('session-count');
const breakCountDisplay = document.getElementById('break-count');
const totalSessionTimeDisplay = document.getElementById('total-session-time');
const totalBreakTimeDisplay = document.getElementById('total-break-time');
const sessionTimeInput = document.getElementById('session-time');
const shortBreakTimeInput = document.getElementById('short-break-time');
const longBreakTimeInput = document.getElementById('long-break-time');
const sessionsBeforeLongBreakInput = document.getElementById('sessions-before-long-break');
const saveSettingsButton = document.getElementById('save-settings');

// Tab Switching
document.querySelectorAll('.tabs button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
    const tabId = button.id.replace('-tab', '');
    document.getElementById(tabId).classList.add('active');
    button.classList.add('active');
  });
});

// Timer Logic
function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

let startTime;
let elapsedTime = 0;

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    pauseResumeButton.textContent = 'Pause';
    startTime = Date.now() - elapsedTime;
    requestAnimationFrame(updateTimer);
  }
}

function updateTimer() {
  if (isRunning) {
    elapsedTime = Date.now() - startTime;
    timeLeft = Math.max(0, initialTime - Math.floor(elapsedTime / 1000));
    updateTimeDisplay();
    if (timeLeft > 0) {
      requestAnimationFrame(updateTimer);
    } else {
      clearTimer();
    }
  }
}

function clearTimer() {
  isRunning = false;
  pauseResumeButton.textContent = 'Resume';
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  pauseResumeButton.textContent = 'Resume';
}

pauseResumeButton.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

// Save Settings
saveSettingsButton.addEventListener('click', () => {
  timeLeft = parseInt(sessionTimeInput.value) * 60;
  updateTimeDisplay();
});

// Initialize
updateTimeDisplay();

// Daily Goal
let dailyGoal = 120; // Default daily goal in minutes
let dailyProgress = 0;

// Time-of-Day Bar
const timeBar = document.querySelector('.time-bar .bar');

// Update Daily Goal Progress
function updateDailyGoalProgress() {
  const progress = (dailyProgress / dailyGoal) * 100;
  const progressCircle = document.getElementById('progress-circle');
  const progressText = document.querySelector('.progress-text');
  const offset = 283 - (283 * progress) / 100;
  progressCircle.style.strokeDashoffset = offset;
  progressText.textContent = `${Math.round(progress)}%`;
}

// Add Study/Break Block to Time Bar
function addTimeBlock(startTime, endTime, type) {
  const startPercent = (startTime / 1440) * 100; // Convert minutes to percentage
  const endPercent = (endTime / 1440) * 100;
  const block = document.createElement('div');
  block.classList.add(type);
  block.style.left = `${startPercent}%`;
  block.style.width = `${endPercent - startPercent}%`;
  timeBar.appendChild(block);
}

// Example Usage
addTimeBlock(480, 510, 'study'); // 8:00 AM to 8:30 AM
addTimeBlock(510, 515, 'break'); // 8:30 AM to 8:35 AM
const dailyGoalInput = document.getElementById('daily-goal');

saveSettingsButton.addEventListener('click', () => {
  dailyGoal = parseInt(dailyGoalInput.value);
  updateDailyGoalProgress();
});
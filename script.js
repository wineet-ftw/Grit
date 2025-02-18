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

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    pauseResumeButton.textContent = 'Pause';
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimeDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        if (isFocusTime) {
          sessionCount++;
          totalSessionTime += parseInt(sessionTimeInput.value);
          sessionCountDisplay.textContent = sessionCount;
          totalSessionTimeDisplay.textContent = totalSessionTime;
          if (sessionCount % parseInt(sessionsBeforeLongBreakInput.value) === 0) {
            timeLeft = parseInt(longBreakTimeInput.value) * 60;
          } else {
            timeLeft = parseInt(shortBreakTimeInput.value) * 60;
          }
        } else {
          breakCount++;
          totalBreakTime += isFocusTime ? 0 : parseInt(shortBreakTimeInput.value);
          breakCountDisplay.textContent = breakCount;
          totalBreakTimeDisplay.textContent = totalBreakTime;
          timeLeft = parseInt(sessionTimeInput.value) * 60;
        }
        isFocusTime = !isFocusTime;
        updateTimeDisplay();
        pauseResumeButton.textContent = 'Resume';
      }
    }, 1000);
  }
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
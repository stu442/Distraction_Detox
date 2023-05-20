const startBtn = document.getElementById('start');
let timerInterval;

function startTimer() {
  startBtn.innerText = "Stop"
  // 스토리지에 데이터 저장
  chrome.storage.sync.set({ 'startTime' : new Date().getTime() });
  chrome.storage.sync.set({ 'isTiming' : true });
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  startBtn.innerText = "Start"
  chrome.storage.sync.set({ 'isTiming' : false });
  clearInterval(timerInterval);
  timerInterval = 0;
  document.getElementById('timer').innerText = "00:00"
}

function updateTimer() {
  chrome.storage.sync.get('startTime', (result) => {
    let seconds = Math.floor((new Date().getTime() - result.startTime)/1000)
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedTime = `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
    document.getElementById('timer').innerText = formattedTime;
  })
}

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  if(startBtn.innerText === "Start") {
    startTimer();
  } else {
    stopTimer();
  }
})

function isPopupOpen() {
  const views = chrome.extension.getViews({ type: 'popup' });
  return views.length > 0;
}

if (isPopupOpen()) {
  chrome.storage.sync.get('isTiming', (result) => {
    if(result.isTiming) {
      startBtn.innerText = "Stop"
      timerInterval = setInterval(updateTimer, 1000);
    }
  })
}
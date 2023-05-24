const imgText = document.querySelector('.img_text');
const startBefore = document.querySelector('.startBefore');
const startAfter = document.querySelector('.startAfter')
let timerInterval;

function startTimer() {
  imgText.innerText = "Stop"
  chrome.storage.sync.get('startDate', (result) => {
    if(result.startDate !== new Date().getDate()) {
      chrome.storage.sync.set({ 'sumTime' : 0 })
    }
  })
  // 스토리지에 데이터 저장
  chrome.storage.sync.set({
    'startTime': new Date().getTime(),
    'startDate': new Date().getDate(),
    'isTiming': true
  });
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  imgText.innerText = "Start"
  chrome.storage.sync.set({ 'isTiming' : false });
  sumTime();
  clearInterval(timerInterval);
  document.getElementById('timer').innerText = "00:00";
}

function updateTimer() {
  chrome.storage.sync.get('startTime', ({ startTime }) => {
    const seconds = Math.floor((new Date().getTime() - startTime) / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    let formattedTime;
    if (hours > 0) {
      formattedTime = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
    } else {
      formattedTime = `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
    }
    document.getElementById('timer').innerText = formattedTime;
  });
}

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

function isPopupOpen() {
  const views = chrome.extension.getViews({ type: 'popup' });
  return views.length > 0;
}

function sumTime() {
  chrome.storage.sync.get('startTime', (result) => {
    const seconds = Math.floor((new Date().getTime() - result.startTime)/1000);
    chrome.storage.sync.get('sumTime', (result) => {
      let savedTime = result.sumTime || 0;
      savedTime += seconds
      chrome.storage.sync.set({ 'sumTime': savedTime });
    });
  })
}

function btnToggle() {
  startBefore.classList.toggle('disapear');
  startAfter.classList.toggle('disapear');
}

imgText.addEventListener('click', () => {
  if(imgText.innerText === "Start") {
    startTimer();
  } else {
    stopTimer();
  }
})

imgText.addEventListener('mouseover', btnToggle);
imgText.addEventListener('mouseout', btnToggle);

if (isPopupOpen()) {
  chrome.storage.sync.get('isTiming', ({ isTiming }) => {
    if (isTiming) {
      imgText.innerText = "Stop";
      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);
    }
  });
}

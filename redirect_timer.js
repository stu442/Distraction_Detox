const timeViewer = document.getElementById("focused_time");
let timeViewerInterval;
let deleteTimeInterval;

function padNumber(number) {
  return number.toString().padStart(2, '0');
}

function secondsToMinutesAndSeconds(sec) {
  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;
  return `${padNumber(minutes)}분 ${padNumber(remainingSeconds)}초`;
}

async function getSumTime() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('sumTime', (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.sumTime || 0);
      }
    });
  });
}

async function getStartTime() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('startTime', (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.startTime);
      }
    });
  });
}

async function isTiming() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('isTiming', (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.isTiming === true);
      }
    });
  });
}

async function getStartDate() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get('startDate', (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.startDate);
      }
    });
  });
}

async function calculateElapsedTime() {
  const isTimingValue = await isTiming();
  const sumTime = await getSumTime();
  if (isTimingValue) {
    const startTime = await getStartTime();
    const seconds = Math.floor((new Date().getTime() - startTime) / 1000);
    return sumTime + seconds;
  } else {
    return sumTime;
  }
}

async function updateTimer() {
  try {
    const elapsedTime = await calculateElapsedTime();
    const formattedTime = secondsToMinutesAndSeconds(elapsedTime);
    timeViewer.innerText = `지금까지 ${formattedTime} 집중 하고 있습니다. 🔥🔥`;
  } catch (error) {
    console.error(error);
  }
}

async function deleteSumTime() {
  try {
    if(await getStartDate() !== new Date().getDate()) {
      chrome.storage.sync.set({"sumTime" : 0})
    }
  } catch (error) {
    console.error(error)
  }
}

timeViewerInterval = setInterval(updateTimer, 1000);
deleteTimeInterval = setInterval(deleteSumTime, 60000);
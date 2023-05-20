let timerInterval;
let seconds = 0;

function startTimer() {
document.getElementById('start').innerText = 'Stop';
timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
clearInterval(timerInterval);
timerInterval = 0
document.getElementById('start').innerText = 'Start';
seconds = 0;
updateTimer(true);
}

function updateTimer(isStop) {
!isStop ? seconds++ : null;
const minutes = Math.floor(seconds / 60);
const remainingSeconds = seconds % 60;
const formattedTime = `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
document.getElementById('timer').innerText = formattedTime;
}

function padNumber(number) {
return number.toString().padStart(2, '0');
}

document.getElementById('start').addEventListener('click', function() {
if (timerInterval) {
  stopTimer();
} else {
  startTimer();
}
});
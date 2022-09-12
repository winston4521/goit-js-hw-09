const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
const TIMER_DELAY = 1000;

startBtn.addEventListener('click', onColorChange);
stopBtn.addEventListener('click', onColorStop);

function onColorChange() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(colorChangeHandler, TIMER_DELAY);
}
function onColorStop() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
function colorChangeHandler() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

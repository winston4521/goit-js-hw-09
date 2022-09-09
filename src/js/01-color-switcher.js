const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
const TIME_DELAY = 1000;

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

function startColorChange() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(colorChangerHandler, TIME_DELAY);

  colorChangerHandler();
  console.log('start');
}
function stopColorChange() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
  console.log('stop');
}

function colorChangerHandler() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
startBtn.addEventListener('click', getRandomHexColor);
stopBtn.addEventListener('click', getRandomHexColor);

console.log(startBtn);
console.log(stopBtn);

// setTimeout()
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}



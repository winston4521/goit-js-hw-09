import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedDate = null;

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', onTimerTrigger);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // ============IF ELSE================
  onClose(selectedDates) {
    if (selectedDates[0].getTime() >= Date.now()) {
      selectedDate = selectedDates[0];
      refs.startBtn.disabled = false;

      Notiflix.Notify.success('Push the button');
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.timePicker, options);

// ========Finding difference============
function onTimerTrigger() {
  timerId = setInterval(onDiffAmount, 1000);
}

function onDiffAmount() {
  const timeMs = selectedDate.getTime() - Date.now();

  if (timeMs < 0) {
    clearInterval(timerId);
    return;
  }

  updateTimer(convertMs(timeMs));
}
// ===========Converting the time===============
function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = onAddZero(days);
  refs.hoursEl.textContent = onAddZero(hours);
  refs.minutesEl.textContent = onAddZero(minutes);
  refs.secondsEl.textContent = onAddZero(seconds);
}
function onAddZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

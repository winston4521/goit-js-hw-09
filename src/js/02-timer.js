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

refs.startBtn.addEventListener('click', onTimerTrigger);
refs.startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // ============IF ELSE================
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      Notiflix.Notify.success('Push the button');
      selectedDate = selectedDates[0];
      refs.startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.timePicker, options);

// ========Finding difference============
function onTimerTrigger() {
  timerId = setInterval(() => {
    const diffDate = selectedDate - new Date();
    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.timePicker.setAttribute('disabled', 'disabled');
    stopTimer(diffDate); 
    const convertedMs = convertMs(diffDate);
    updateTimer(convertedMs);
  }, 1000);
}

function stopTimer(diffDate) {
  if (diffDate <= 1000) {
    clearInterval(timerId);
    refs.timePicker.removeAttribute('disabled');
  }
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

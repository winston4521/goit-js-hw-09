import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daysEL: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  spanEl: document.querySelector('.value'),
};

let timerId = null;
let selectedDate = null;

refs.btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
      Notiflix.Notify.success('Starting');
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr(refs.datePicker, options);

refs.btnStart.addEventListener('click', onTimerTrigger);

function onTimerTrigger() {
  timerId = setInterval(onGetTime, 1000);
}

function onGetTime() {
  const timeDiff = Date.now() - selectedDate.getDate();
  console.log(selectedDate.getDate());
  if (timeDiff < 0) {
    clearInterval(timerId);
    return;
  }

  onShowTimer(convertMs(timeDiff));
}

function onShowTimer({ days, hours, minutes, seconds }) {
  refs.daysEL.value = onAddZero(days);
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

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.inputEl, options);

let userSelectedDate;

const selectDate = new Date(refs.inputEl.value);

refs.startBtn.addEventListener('click', () => {
  console.log('START');

  const intervalID = setInterval(() => {
    const currentDate = new Date();
    const ms = selectDate - currentDate;
    console.log(ms);
    // renderTime(ms);

    if (ms < 1000) {
      clearInterval(intervalID);
    }
  }, 1000);
});

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

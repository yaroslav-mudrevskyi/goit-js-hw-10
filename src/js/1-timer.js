import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
};

const elements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute('disabled', '');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      refs.startBtn.setAttribute('disabled', '');
      iziToast.show({
        title: 'Oops',
        titleColor: 'white',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topCenter',
        timeout: 3000,
      });
    } else {
      refs.startBtn.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    }
  },
};

flatpickr(refs.inputEl, options);

refs.startBtn.addEventListener('click', () => {
  refs.inputEl.setAttribute('disabled', '');
  refs.startBtn.setAttribute('disabled', '');
  const intervalID = setInterval(() => {
    const currentDate = new Date();
    const ms = userSelectedDate - currentDate;
    renderTime(ms);

    if (ms < 1000) {
      clearInterval(intervalID);
      refs.inputEl.removeAttribute('disabled');
      refs.startBtn.removeAttribute('disabled');
    }
  }, 1000);
});

function renderTime(ms) {
  const parsedTime = convertMs(ms);
  const { days, hours, minutes, seconds } = parsedTime;
  elements.days.textContent = days.toString().padStart(2, '0');
  elements.hours.textContent = hours.toString().padStart(2, '0');
  elements.minutes.textContent = minutes.toString().padStart(2, '0');
  elements.seconds.textContent = seconds.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

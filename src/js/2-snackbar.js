import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputValueEl = document.querySelector('[name=delay]');

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const delay = +inputValueEl.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formEl.elements.state.value === 'fulfilled') {
        resolve('delay');
      } else {
        reject('delay');
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.show({
        title: '✅ OK',
        titleColor: '#FFF',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        backgroundColor: '#59A10D',
        messageColor: '#FFF',
      });
    })

    .catch(error =>
      iziToast.show({
        title: '❌ Error',
        titleColor: '#FFF',
        message: `Rejected promise in ${delay}ms`,
        position: 'topCenter',
        backgroundColor: '#EF4040',
        messageColor: '#FFF',
      })
    );
});

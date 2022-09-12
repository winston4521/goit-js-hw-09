import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stemEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
};

const notifying = {
  useIcon: false,
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  let { delay, step, amount } = onGettingData();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          notifying
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          notifying
        );
      });
    delay = delay + step;
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

function onGettingData() {
  return {
    delay: Number(refs.delayEl.value),
    step: Number(refs.stemEl.value),
    amount: Number(refs.amountEl.value),
  };
}

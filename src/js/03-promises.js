import Notiflix from 'notiflix';
// ===============================
const refs = {
  formEl: document.querySelector('.form'),
  DelayEL: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  let { delay, step, amount } = onGettingData();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += step;
  }
});

// ============Create prom============
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(delay => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onGettingData() {
  return {
    delay: Number(refs.DelayEL.value),
    step: Number(refs.stepEl.value),
    amount: Number(refs.amountEl.value),
  };
}

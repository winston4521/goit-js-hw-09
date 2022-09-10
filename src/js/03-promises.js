import Notiflix from 'notiflix';
// ===============================
const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);
// =============================================

function onFormSubmit(e) {
  e.preventDefault();
  // ========================
  let delayEl = Number(e.currentTarget.delay.value);
  let stepEl = Number(e.currentTarget.step.value);
  let amountEl = Number(e.currentTarget.amount.value);

  // ====Цикл==========

  for (let position = 1; position <= amountEl; position += 1) {
    createPromise(position, delayEl)
      .then(({ position, delayEl }) => {
        setTimeout(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delayEl}ms`
          );
        }, delayEl);
      })
      .catch(({ position, delayEl }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delayEl}ms`
          );
        }, delayEl);
      });
    delayEl += stepEl;
  }
}
// ============Create prom============
function createPromise(position, delayEl) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delayEl });
    } else {
      reject({ position, delayEl });
    }
  });
}

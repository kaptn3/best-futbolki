export default {
  classAction(isShow) {
    const app = document.querySelector('#app');

    if (isShow) {
      app.classList.add('modal-open');
    } else {
      app.classList.remove('modal-open');
    }
  },
};

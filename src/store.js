import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const classAction = (isShow) => {
  const app = document.querySelector('#app');

  if (isShow) {
    app.classList.add('modal-open');
  } else {
    app.classList.remove('modal-open');
  }
};

export default new Vuex.Store({
  state: {
    isOpenMenu: false,
  },
  mutations: {
    menuToggle(state) {
      state.isOpenMenu = !state.isOpenMenu;

      classAction(state.isOpenMenu);
    },
  },
});

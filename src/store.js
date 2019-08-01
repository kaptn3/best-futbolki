import Vue from 'vue';
import Vuex from 'vuex';
import overlay from '@/assets/js/overlay';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalVisible: false,
    modalComponent: null,
    cart: '',
  },
  mutations: {
    toggleModal(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
      overlay.classAction(state.modalVisible);
    },
  },
});

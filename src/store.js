import Vue from 'vue';
import Vuex from 'vuex';
import overlay from '@/assets/js/overlay';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalVisible: false,
    modalComponent: null,
    cart: [],
    cartCount: 0,
  },
  mutations: {
    toggleModal(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
      overlay.classAction(state.modalVisible);
    },
    addToCart(state, item) {
      state.cartCount++;
      console.log(item);
    },
  },
});

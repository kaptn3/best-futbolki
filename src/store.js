import Vue from 'vue';
import Vuex from 'vuex';
import overlay from '@/assets/js/overlay';

Vue.use(Vuex);

const cart = window.localStorage.getItem('cart');
const cartCount = cart ? (JSON.parse(cart)).length : 0;

export default new Vuex.Store({
  state: {
    modalVisible: false,
    modalComponent: null,
    cart: cart ? JSON.parse(cart) : [],
    cartCount: Number(cartCount),
  },
  mutations: {
    toggleModal(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
      overlay.classAction(state.modalVisible);
    },
    addToCart(state, item) {
      state.cartCount++;
      state.cart.push(item);
      this.commit('saveCart');
    },
    removeFromCart(state, item) {
      const index = state.cart.indexOf(item);

      if (index > -1) {
        const product = state.cart[index];
        state.cartCount -= product.quantity;

        state.cart.splice(index, 1);
      }
      this.commit('saveCart');
    },
    saveCart(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
      window.localStorage.setItem('cartCount', state.cart.length);
    },
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import overlay from '@/assets/js/overlay';

Vue.use(Vuex);

const cart = JSON.parse(window.localStorage.getItem('cart'));
let cartCount = 0;
if (cart) {
  const product = cart;
  for (let i = 0; i < cart.length; i++) {
    cartCount += Number(product[i].quantity);
  }
}

export default new Vuex.Store({
  state: {
    modalVisible: false,
    modalComponent: null,
    cart,
    cartCount: Number(cartCount),
  },
  mutations: {
    toggleModal(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
      overlay.classAction(state.modalVisible);
    },
    addToCart(state, item) {
      state.cartCount += item.quantity;
      state.cart.push(item);
      this.commit('saveCart');
    },
    removeFromCart(state, item) {
      const index = state.cart.indexOf(item);

      if (index > -1) {
        const product = state.cart[index];
        state.cartCount -= Number(product.quantity);

        state.cart.splice(index, 1);
      }
      this.commit('saveCart');
    },
    updateCartCount(state) {
      state.cartCount = 0;
      for (let i = 0; i < state.cart.length; i++) {
        state.cartCount += Number(state.cart[i].quantity);
      }
    },
    saveCart(state) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
      window.localStorage.setItem('cartCount', state.cart.length);
    },
  },
});

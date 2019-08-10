/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import overlay from '@/assets/js/overlay';

Vue.use(Vuex);

// get local storage, quantity
let cart = JSON.parse(window.localStorage.getItem('cart'));
let cartCount = 0;
if (cart) {
  const product = cart;
  for (let i = 0; i < cart.length; i++) {
    cartCount += Number(product[i].quantity);
  }
} else {
  cart = [];
}

export default new Vuex.Store({
  state: {
    modalVisible: false,
    modalComponent: null,
    cart,
    cartCount: Number(cartCount),
    cityDelivery: '',
    pointIdDelivery: 0,
    address: ''
  },
  mutations: {
    toggleModal(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
      overlay.classAction(state.modalVisible);
    },
    addToCart(state, item) {
      let found = {};
      if (state.cart) {
        // find dublicate product in cart for update quantity
        found = state.cart.find((product) => {
          let dublicate = 0;
          const attr = ['model', 'id', 'sizeName', 'colorName'];
          for (let i = 0; i < attr.length; i++) {
            dublicate += (item[attr[i]] === product[attr[i]]) ? 1 : 0;
          }
          return dublicate === attr.length;
        });
      }
      if (found) {
        found.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
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
      // counting
      state.cartCount = 0;
      for (let i = 0; i < state.cart.length; i++) {
        state.cartCount += Number(state.cart[i].quantity);
      }
    },
    saveCart(state) {
      this.commit('updateCartCount');
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
      window.localStorage.setItem('cartCount', state.cart.length);
    },
    updateDelivery(state, value) {
      state.cityDelivery = value;
    }
  }
});

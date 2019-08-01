import Vue from 'vue';
import Vuex from 'vuex';
import overlay from '@/assets/js/overlay';

Vue.use(Vuex);

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
  },
  mutations: {
    toggleModal(state, componentName) {
      state.modalVisible = !state.modalVisible;
      state.modalComponent = componentName;
      overlay.classAction(state.modalVisible);
    },
    addToCart(state, item) {
      let double = [];
      if (state.cart) {
        double = state.cart.filter((product) => {
          let dublicate = 0;
          const attr = ['model', 'id', 'sizeName', 'colorName'];
          for (let i = 0; i < attr.length; i++) {
            dublicate += (item[attr[i]] === product[attr[i]]) ? 1 : 0;
          }
          return dublicate === 4 ? product : false;
        });
      }
      if (double.length > 0) {
        const index = state.cart.indexOf(double[0]);
        if (index > -1) {
          state.cart[index].quantity += item.quantity;
        }
      } else {
        state.cart.push(item);
      }
      state.cartCount += item.quantity;
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

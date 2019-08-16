let cart = JSON.parse(window.localStorage.getItem('cart'));
let cartCount = 0;
if (cart) {
  const product = cart;
  for (let i = 0; i < cart.length; i++) {
    cartCount += Number(product[i].count);
  }
} else {
  cart = [];
}

export const state = () => ({
  cart,
  cartCount: Number(cartCount),
  cityDelivery: '',
  pointIdDelivery: 0,
  address: '',
  deliveryAlias: ''
});

export const mutations = {
  addToCart(state, item) {
    let found = {};
    if (state.cart) {
      // find dublicate product in cart for update count
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
      found.count += item.count;
    } else {
      state.cart.push(item);
    }
    this.commit('cart/saveCart');
  },
  removeFromCart(state, item) {
    const index = state.cart.indexOf(item);
    if (index > -1) {
      const product = state.cart[index];
      state.cartCount -= Number(product.count);
      state.cart.splice(index, 1);
    }
    this.commit('cart/saveCart');
  },
  updateCartCount(state) {
    // counting
    state.cartCount = 0;
    for (let i = 0; i < state.cart.length; i++) {
      state.cartCount += Number(state.cart[i].count);
    }
  },
  saveCart(state) {
    this.commit('cart/updateCartCount');
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
    window.localStorage.setItem('cartCount', state.cart.length);
  },
  updateDelivery(state, value) {
    state.cityDelivery = value;
  }
};

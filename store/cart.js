const cart = JSON.parse(window.localStorage.getItem('cart')) || [];

export const state = () => ({
  cart
});

/* export const mutations = {
  addToCart(state, item) {
    state.cart.push(item);
  },
  removeFromCart(state, { count, index }) {
    state.cartCount -= count;
    state.cart.splice(index, 1);
  }
}; */

export const mutations = {
  addToCart(state, item) {
    let found = {};
    if (state.cart) {
      // find dublicate product in cart for update count
      found = state.cart.find((product) => {
        let dublicate = 0;
        const attr = ['model', 'id', 'sizeName', 'colorName'];
        for (let i = 0; i < attr.length; i++) {
          dublicate += item[attr[i]] === product[attr[i]] ? 1 : 0;
        }
        return dublicate === attr.length;
      });
    }
    if (found) {
      found.count += Number(item.count);
    } else {
      state.cart.push(item);
    }
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  },
  removeFromCart(state, item) {
    const index = state.cart.indexOf(item);

    if (index > -1) {
      const product = state.cart[index];
      state.cartCount -= Number(product.count);
      state.cart.splice(index, 1);
    }
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  },
  changeProductCount(state, { cartItem, value }) {
    for (let i = 0; i < state.cart.length; i++) {
      let same = true;
      for (const name in cartItem) {
        same = same && cartItem[name] === state.cart[i][name];
      }
      if (same) {
        state.cart[i].count = Number(value);
      }
    }
    window.localStorage.setItem('cart', JSON.stringify(state.cart));
  }
};

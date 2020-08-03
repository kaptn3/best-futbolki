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
cartCount = Number(cartCount);

export const state = () => ({
  cart,
  cartCount
});

export const mutations = {
  addToCart(state, item) {
    state.cart.push(item);
  },
  removeFromCart(state, { count, index }) {
    state.cartCount -= count;
    state.cart.splice(index, 1);
  },
  updateCartCount(state) {
    // counting
    state.cartCount = 0;
    for (let i = 0; i < state.cart.length; i++) {
      state.cartCount += Number(state.cart[i].count);
    }
  }
};

export const actions = {
  addToCart(context, item) {
    let found = {};
    if (context.state.cart) {
      // find dublicate product in cart for update count
      found = context.state.cart.find((product) => {
        let dublicate = 0;
        const attr = ['model', 'id', 'sizeName', 'colorName'];
        for (let i = 0; i < attr.length; i++) {
          dublicate += item[attr[i]] === product[attr[i]] ? 1 : 0;
        }
        return dublicate === attr.length;
      });
    }
    if (found) {
      found.count += item.count;
    } else {
      context.commit('addToCart', item);
    }
    context.dispatch('saveCart');
  },
  removeFromCart(context, item) {
    const index = context.state.cart.indexOf(item);

    if (index > -1) {
      const product = context.state.cart[index];
      context.commit('removeFromCart', {
        index,
        count: Number(product.count)
      });
    }
    context.dispatch('saveCart');
  },
  saveCart(context) {
    context.commit('updateCartCount');
    window.localStorage.setItem('cart', JSON.stringify(context.state.cart));
    window.localStorage.setItem('cartCount', context.state.cart.length);
  }
};

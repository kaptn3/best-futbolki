<template>
  <v-container class="px-8">
    <div v-if="cartCount !== 0">
      <h2 class="text-h3 font-weight-medium mb-10">Корзина</h2>
      <CartItem
        v-for="(item, index) in cart"
        :key="index"
        :cart="item"
        class="cart__product"
      />
    </div>
    <div v-else class="cart__box">
      <h3>Корзина пуста!</h3>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import CartItem from './CartItem';

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      cartCount: (state) => state.cart.cartCount
    })
  }
};
</script>

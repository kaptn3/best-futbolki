<template>
  <v-container class="px-8">
    <div v-if="cart.length !== 0">
      <h2 class="text-h3 font-weight-medium mb-10">Корзина</h2>
      <CartItem
        v-for="(item, index) in cart"
        :key="index"
        :cart="item"
        class="cart__product"
      />
      <CartSummary />
    </div>
    <div v-else class="cart__box">
      <p class="text-h3 font-weight-medium mb-10">Корзина пуста!</p>
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default {
  name: 'Cart',
  components: {
    CartItem,
    CartSummary
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart
    })
  }
};
</script>

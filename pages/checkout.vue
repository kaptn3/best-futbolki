<template>
  <v-row justify="center">
    <v-col cols="12" sm="10">
      <v-row>
        <v-col cols="12" md="7">
          <AForm />
        </v-col>
        <v-col cols="12" md="5">
          <div class="summary pa-5">
            <CartItem
              v-for="(item, index) in cart"
              :key="index"
              :cart="item"
              checkout
            />
            <Summary />
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import Summary from '~/components/checkout/Summary';
import AForm from '~/components/AForm';
import CartItem from '~/components/cart/CartItem';

export default {
  components: {
    AForm,
    CartItem,
    Summary
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart
    })
  }
};
</script>

<style lang="scss" scoped>
.summary {
  border: 2px solid #f2f2f2;
  border-radius: 8px;
}
</style>

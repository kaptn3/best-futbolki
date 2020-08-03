<template>
  <v-app>
    <v-sheet class="overflow-hidden" style="position: relative;">
      <v-app-bar max-height="64px" flat fixed>
        <v-container class="d-flex align-center">
          <v-toolbar-title>Best futbolki</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="isCart = !isCart">
            <v-badge
              :value="cartCount"
              :content="cartCount"
              color="grey"
              overlap
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </v-container>
      </v-app-bar>
      <v-navigation-drawer
        v-model="isCart"
        width="770px"
        right
        absolute
        temporary
      >
        <div class="d-flex my-3">
          <v-spacer />
          <v-btn icon @click="isCart = !isCart">
            <v-icon large>mdi-close</v-icon>
          </v-btn>
        </div>
        <CartWrapper />
      </v-navigation-drawer>
      <Nuxt />
    </v-sheet>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import CartWrapper from '~/components/cart/CartWrapper';

export default {
  components: {
    CartWrapper
  },
  data() {
    return {
      isCart: false
    };
  },
  computed: {
    ...mapState({
      cartCount: (state) => state.cart.cartCount
    })
  }
};
</script>

<style>
html,
.hidden {
  overflow: auto !important;
}
</style>

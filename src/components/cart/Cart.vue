<template>
  <div class="cart">
    <div>
      <button
        class="cart__close"
        @click="$store.commit('toggleModal', null)"
      >
        <i class="cart__close-icon"></i>
      </button>
      <div v-if="$store.state.cartCount !== 0">
        <div class="cart__box">
          <h3>Shopping cart</h3>
          <cart-item
            v-for="(item, index) in $store.state.cart"
            :key="index"
            :cart="item"
            class="cart__product"
          />
        </div>
        <cart-summary/>
        <cart-nav/>
      </div>
      <div
        class="cart__box"
        v-else
      >
        <h3>Your shopping cart is empty.</h3>
        Don't hesitate and browse our catalog to find something beautiful for You!
      </div>
    </div>
  </div>
</template>

<script>
  import CartItem from './CartItem';
  import CartSummary from './CartSummary';
  import CartNav from './CartNav';

  export default {
    name: 'Cart',
    components: {
      CartItem,
      CartSummary,
      CartNav
    },
  };
</script>

<style lang="scss" scoped>
  .cart {
    &__box {
      padding: 40px;
    }

    &__close {
      display: block;
      padding: 20px;;
      height: 20px;
      width: 100%;
      border: none;
      outline: none;

      &-icon {
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 15px;
        height: 15px;
        display: block;
        background-image: url(/img/icons/close.svg);
        opacity: .7;
        margin-left: auto;

        &:hover,
        &:focus {
          opacity: 1;
        }
      }
    }

    &__product {
      margin-bottom: 20px;
    }
  }

  h3 {
    font-size: 36px;
    margin: 30px 0;
  }

  @media screen and (max-width: 767px) {
    h3 {
      font-size: 24px;
    }

    .cart__box {
      padding: 15px;
    }
  }
</style>

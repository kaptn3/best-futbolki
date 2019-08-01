<template>
  <div class="cart">
    <button
      class="cart__close"
      @click="$store.commit('toggleModal', null)"
    >
      <i class="cart__close-icon"></i>
    </button>
    <h3>Shopping cart</h3>
    <cart-item
      v-for="(item, index) in $store.state.cart"
      :key="index"
      :cart="item"
      class="cart__product"
    />
  </div>
</template>

<script>
  import CartItem from './CartItem.vue';

  export default {
    name: 'Cart',
    components: { CartItem },
  };
</script>

<style lang="scss" scoped>
  .cart {
    padding: 20px;

    &__close {
      display: block;
      padding: 0;
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
    margin: 30px;
  }
</style>

<template>
  <div class="modal-cart">
    <button
      class="modal-cart__close"
      @click="$store.commit('toggleModal', null)"
    >
      <i class="modal-cart__close-icon"></i>
    </button>
    <h3>Shopping cart</h3>
    <div
      v-for="(item, index) in $store.state.cart"
      :key="index"
    >
      <img
        :src="item.photo[0].small"
        alt="Product photo"
      >
      {{ item.model }}
      <button @click="$store.commit('removeFromCart', item)">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Cart',
  };
</script>

<style lang="scss" scoped>
  .modal-cart {
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
  }

  h3 {
    font-size: 36px;
    margin-top: 30px;
  }
</style>

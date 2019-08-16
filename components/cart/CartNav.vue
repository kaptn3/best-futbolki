<template>
  <div class="cart-nav">
    <button
      class="cart-nav__return"
      @click="$store.commit('toggleModal', null)"
    >
      Return to shopping
    </button>
    <div class="cart-nav__btns">
      <a-button
        text="Go to checkout"
        el="router-link"
        to="/checkout"
        @click.native="$store.commit('toggleModal', null)"
      />
    </div>
  </div>
</template>

<script>
  import AButton from '../Button';

  export default {
    name: 'CartNav',
    components: { AButton }
  };
</script>

<style lang="scss" scoped>
  .cart-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px;
    background-color: #f2f2f2;

    &__return {
      font-size: 1rem;
      color: #828282;
    }

    &__btns button {
      display: block;
    }

    &__btns button:first-child {
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 767px) {
    .cart-nav {
      padding: 15px;
    }
  }

  @media screen and (max-width: 565px) {
    .cart-nav {
      display: block;

      &__return {
        margin-bottom: 20px;
      }
    }
  }
</style>

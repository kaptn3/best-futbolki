<template>
  <div class="cart-nav">
    <button
      class="cart-nav__return"
      @click="$store.commit('toggleModal', null)"
    >Return to shopping</button>
    <div class="cart-nav__btns">
      <a-button
        text="Go to checkout"
      />
      <a-button
        text="Instant Checkout"
      />
    </div>
  </div>
</template>

<script>
  import AButton from '../Button.vue';

  export default {
    name: 'CartNav',
    components: { AButton },
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
</style>

<template>
  <div class="container checkout">
    <h1>Корзина</h1>
    <h2>Ваши данные</h2>
    <div class="checkout__box">
      <checkout-form/>
      <div class="checkout__right">
        <cart-item
          v-for="(item, index) in $store.state.cart"
          :key="index"
          :cart="item"
          :checkout="true"
        />
      </div>
      <delivery/>
    </div>
  </div>
</template>

<script>
  import CheckoutForm from '@/components/CheckoutForm';
  import CartItem from '@/components/cart/CartItem';
  import Delivery from '@/components/checkout/Delivery';

  export default {
    name: 'Checkout',
    components: {
      CheckoutForm,
      CartItem,
      Delivery
    }
  };
</script>

<style lang="scss" scoped>
  .checkout {
    &__box {
      display: flex;
      justify-content: space-between;
    }

    &__right {
      border: 2px solid #bdbdbd;
      border-radius: 8px;
      padding: 30px 20px;
    }
  }
</style>

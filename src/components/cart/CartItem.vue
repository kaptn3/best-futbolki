<template>
  <div class="cart-item">
    <img
      :src="cart.photo[0].small"
      alt="Product photo"
    >
    <div class="cart-item__data">
      <span class="cart-item__title">
        {{ cart.title }}
      </span>
      <span class="cart-item__model">
        {{ cart.model }}
      </span>
      <span>
        Color: {{ cart.color[1] }}
      </span>
      <span>
        Size: {{ cart.size[1] }}
      </span>
      <span class="cart-item__stock">
        In stock!
      </span>
      <quantity
        class="cart-item__quantity"
        :value="Number(cart.quantity)"
        @input="changeCount(cart, $event)"
      />
    </div>
    <div>
      <span class="cart-item__price">{{ cart.price }} руб</span>
      <button
        class="cart-item__remove"
        @click="$store.commit('removeFromCart', cart)"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
  import Quantity from '../product/Quantity.vue';

  export default {
    name: 'CartItem',
    components: { Quantity },
    props: {
      cart: {
        type: Object,
        required: true,
      },
    },
    methods: {
      changeCount(cart, value) {
        const index = this.$store.state.cart.indexOf(cart);
        this.$store.state.cart[index].quantity = value;
        this.$store.commit('updateCartCount');
        this.$store.commit('saveCart');
      },
    },
  };
</script>


<style lang="scss" scoped>
  img {
    height: 200px;
  }

  .cart-item {
    display: flex;
    align-items: center;

    span {
      display: block;
      width: 100%;
    }

    &__data {
      margin-right: auto;
      color: #8e8e8e;
      font-size: 12px;

      span {
        display: block;
        width: 100%;
      }
    }

    &__title {
      font-size: 18px;
      color: #4f4f4f;
    }

    &__model {
      margin-bottom: 10px;
    }

    &__price {
      font-size: 18px;
    }

    &__remove {
      background: transparent url(/img/icons/cart-remove.svg) no-repeat center right;
      display: block;
      border: none;
      outline: none;
      height: 22px;
      font-size: 12px;
      padding: 0 30px 0 0;
      margin-top: 100px;
    }

    &__stock {
      color: #4dba87;
    }

    &__quantity {
      margin-top: 16px;
    }
  }
</style>

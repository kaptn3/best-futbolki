<template>
  <div class="cart-item">
    <img
      :src="cart.photo"
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
        Print: {{ cart.print_type_name }}
      </span>
      <span>
        Color: {{ cart.colorName }}
      </span>
      <span>
        Size: {{ cart.sizeName }}
      </span>
      <span
        :class="{ 'green': cart.available, 'red': !cart.available }"
        class="cart-item__stock">
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
      <span class="cart-item__price_old">{{ cart.old_price }} руб</span>
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
        if (value > 0) {
          const index = this.$store.state.cart.indexOf(cart);
          this.$store.state.cart[index].quantity = value;
          this.$store.commit('saveCart');
        }
      },
    },
  };
</script>


<style lang="scss" scoped>
  img {
    height: 200px;
    margin-right: 15px;
  }

  .cart-item {
    display: flex;
    align-items: flex-start;

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
      text-align: right;

      &_old {
        color: #828282;
        text-decoration: line-through;
        text-align: right;
      }
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

    &__stock.green {
      color: #4dba87;
    }

    &__stock.red {
      color: #eb5757;
    }

    &__quantity {
      margin-top: 16px;
    }
  }

  @media screen and (max-width: 767px) {
    img {
      width: 100px;
      height: auto;
    }
  }

  @media screen and (max-width: 565px) {
    .cart-item {
      &__title {
        font-size: 14px;
      }

      &__data {
        font-size: 10px;
      }

      &__price {
        font-size: 14px;

        &_old {
          font-size: 12px;
        }
      }
    }
  }
</style>

<template>
  <div class="cart-item">
    <img
      :src="cart.photo"
      :class="{ 'cart-item__img': checkout }"
      alt="Product photo"
    />
    <div class="cart-item__data">
      <span class="cart-item__title">
        <router-link :to="'/product/' + cart.id">
          {{ cart.title }}
        </router-link>
      </span>
      <span class="cart-item__model">
        {{ cart.model }}
      </span>
      <span> Печать: {{ cart.print_type_name }} </span>
      <span> Цвет: {{ cart.colorName }} </span>
      <span> Размер: {{ cart.sizeName }} </span>
      <span
        v-if="!checkout"
        :class="cart.in_stock ? 'green--text' : 'red--text'"
        class="cart-item__stock"
      >
        {{ cart.in_stock ? 'В наличии' : 'Не в наличии' }}
      </span>
      <span v-if="checkout"> Количество: {{ cart.count }} </span>
      <v-text-field
        :value="cart.count"
        style="width: 100px;"
        type="number"
        height="44px"
        dense
        hide-details
        min="1"
        @input="changeCount(cart, $event)"
      />
    </div>
    <div>
      <span class="cart-item__price">{{ cart.price }} руб</span>
      <span v-if="!checkout && cart.old_price > 0" class="cart-item__price_old">
        {{ cart.old_price }} руб
      </span>
      <button
        v-if="!checkout"
        class="cart-item__remove"
        @click="removeFromCart(cart)"
      >
        Убрать
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'CartItem',
  props: {
    cart: {
      type: Object,
      required: true
    },
    checkout: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations({
      saveCart: 'cart/saveCart',
      removeFromCart: 'cart/removeFromCart',
      changeProductCount: 'cart/changeProductCount'
    }),
    changeCount(cart, value) {
      if (value > 0) {
        this.changeProductCount({ cartItem: cart, value });
      }
    }
  }
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

  &__img {
    height: 150px;
  }

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
    background: transparent url(/img/icons/cart-remove.svg) no-repeat center
      right;
    display: block;
    border: none;
    outline: none;
    height: 22px;
    font-size: 12px;
    padding: 0 30px 0 0;
    margin-top: 100px;
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

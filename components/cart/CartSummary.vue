<template>
  <div class="summary">
    <slot />
    <div class="summary__item">
      <h4>Количество</h4>
      <span>
        {{ productCount }}
      </span>
    </div>
    <div class="summary__item">
      <h4>Цена без скидки</h4>
      <span> {{ price('old_price') }} руб </span>
    </div>
    <div class="summary__item">
      <h4>Скидка</h4>
      <span> {{ discount() }} руб </span>
    </div>
    <div class="summary__item">
      <h4>Итого</h4>
      <span> {{ price('price') }} руб </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'CartSummary',
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart
    }),
    ...mapGetters({
      productCount: 'cart/productCount'
    })
  },
  methods: {
    price(name) {
      let price = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].old_price === 0) {
          price += this.cart[i].price * Number(this.cart[i].count);
        } else {
          price += this.cart[i][name] * Number(this.cart[i].count);
        }
      }
      return price;
    },
    discount() {
      return this.price('old_price') - this.price('price');
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 24px;
  padding: 20px 0;
}

.summary {
  background-color: #f2f2f2;
  padding: 40px;

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    h4 {
      font-weight: 400;
    }
  }
}

@media screen and (max-width: 767px) {
  .summary {
    padding: 15px;
  }
}
</style>

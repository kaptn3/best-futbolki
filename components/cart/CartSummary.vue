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
      <span> {{ oldSum }} руб </span>
    </div>
    <div class="summary__item">
      <h4>Скидка</h4>
      <span> {{ discount }} руб </span>
    </div>
    <div class="summary__item">
      <h4>Итого</h4>
      <span> {{ sum }} руб </span>
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
      productCount: 'cart/productCount',
      sum: 'cart/sum',
      oldSum: 'cart/oldSum'
    }),
    discount() {
      return this.oldSum - this.sum;
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

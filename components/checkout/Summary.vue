<template>
  <div class="checkout">
    <div class="checkout__summary">
      <div class="checkout__summary-item">Товары: {{ sum }} руб.</div>
      <div class="checkout__summary-item">
        Доставка: {{ deliveryCostDisplay }}
      </div>
      <div v-if="discount > 0" class="checkout__summary-item">
        Скидка: {{ discount }} руб.
      </div>
      <div class="checkout__summary-item">Итого: {{ endSum }} руб.</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Summary',
  props: {
    promoSum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      deliveryCost: (state) => state.order.deliveryCost,
      deliveryAlias: (state) => state.order.deliveryAlias
    }),
    ...mapGetters({
      sum: 'cart/sum'
    }),
    endSum() {
      return this.sum + this.deliveryCost - this.discount;
    },
    discount() {
      return this.promoSum > 0 ? this.sum - this.promoSum : 0;
    },
    deliveryCostDisplay() {
      if (this.deliveryAlias) {
        return `${this.deliveryCost} руб.`;
      }
      return 'Выберите способ доставки';
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  &__summary {
    background-color: #f2f2f2;
  }

  &__summary-item {
    padding: 10px 15px;
  }
}

.promocode {
  display: flex;
  align-items: flex-end;
  margin-bottom: 50px;
  position: relative;

  &__input {
    width: 100%;
  }

  &__btn {
    height: 42px;
    min-width: 165px;
  }

  &__error {
    color: red;
    font-size: 12px;
    position: absolute;
    left: 0;
    width: 100%;
    top: 100%;
  }
}
</style>

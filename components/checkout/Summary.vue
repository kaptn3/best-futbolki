<template>
  <div>
    <div class="checkout__summary">
      <div class="checkout__summary-item">Товары: {{ sum }} руб.</div>
      <div class="checkout__summary-item">
        Доставка: {{ deliveryCostDisplay }}
      </div>
      <div class="checkout__summary-item">Скидка: {{ promoSum }} руб.</div>
      <div class="checkout__summary-item">Итого: {{ endSum }} руб.</div>
    </div>
    <div class="promocode">
      <v-text
        id="promocode"
        v-model="code"
        :required="false"
        name="promo_code"
        placeholder="Промокод"
        class="promocode__input"
      />
      <v-btn @click="applyPromo">
        Применить
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Summary',
  data() {
    return {
      cart: [],
      orderSum: 0,
      code: '',
      promoSum: 0
    };
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
      return this.sum + this.deliveryCost - this.promoSum;
    },
    discount() {
      return 0;
    },
    deliveryCostDisplay() {
      if (this.deliveryAlias) {
        return `${this.deliveryCost} руб.`;
      }
      return 'Выберите способ доставки';
    }
  },
  mounted() {
    this.applyPromo(true);
  },
  methods: {
    applyPromo(isMounted) {
      const { cart } = this.$store.state;
      this.cart = [];
      for (let i = 0; i < cart.length; i++) {
        const obj = {};
        const item = cart[i];
        obj.article = item.design;
        obj.product_tkey = item.product_type;
        obj.qty = item.count;
        obj.size_tkey = item.size;
        obj.color_tkey = item.color;
        obj.price = item.price;
        this.cart.push(obj);
      }
      const data = {
        cart: this.cart,
        promocode: this.code
      };
      const url = 'http://api.best-futbolki.ru/API/promocode.php';
      this.$axios.post(url, data).then((res) => {
        this.orderSum = res.data.order_sum;
        if (isMounted) {
          this.oldSum = this.orderSum;
        }
        if (res.data.promocodes) {
          this.error = '';
          this.promoSum = this.oldSum - this.orderSum;
        } else {
          this.error = res.data.discountRejectReasons.promocode[0].message;
          this.promoSum = 0;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  padding: 10px 0;

  &__summary {
    background-color: #f2f2f2;
    margin-bottom: 16px;
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

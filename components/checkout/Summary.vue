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
    <div class="d-flex">
      <v-text-field
        v-model="code"
        name="promo_code"
        placeholder="Промокод"
        class="pt-0"
        hide-details
      />
      <v-btn @click="applyPromo">
        Применить
      </v-btn>
    </div>
    <v-textarea
      v-model="comment"
      name="comment"
      placeholder="Комментарий"
      rows="2"
      hide-details
      no-resize
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';

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
      deliveryAlias: (state) => state.order.deliveryAlias,
      promocodeValue: (state) => state.order.promocode,
      commentValue: (state) => state.order.comment,
      cart: (state) => state.cart.cart
    }),
    ...mapGetters({
      sum: 'cart/sum'
    }),
    promocode: {
      get() {
        return this.promocodeValue;
      },
      set(value) {
        this.setData({
          name: 'promocode',
          value
        });
      }
    },
    comment: {
      get() {
        return this.commentValue;
      },
      set(value) {
        this.setData({
          name: 'comment',
          value
        });
      }
    },
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
    ...mapMutations({
      setData: 'order/setData'
    }),
    applyPromo(isMounted) {
      const cart = [];
      for (let i = 0; i < this.cart.length; i++) {
        const obj = {};
        const item = this.cart[i];
        obj.article = item.design;
        obj.product_tkey = item.product_type;
        obj.qty = item.count;
        obj.size_tkey = item.size;
        obj.color_tkey = item.color;
        obj.price = item.price;
        cart.push(obj);
      }
      const data = {
        cart,
        promocode: this.promocode
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

<template>
  <div>
    <div class="checkout__summary">
      <div class="checkout__summary-item">
        Товары: {{ orderSum }}
      </div>
      <div class="checkout__summary-item">
        Доставка: {{ deliveryCost }}
      </div>
      <div class="checkout__summary-item">
        Скидка по промокоду: {{ promoSum }}
      </div>
      <div class="checkout__summary-item">
        Итого: {{ sum }}
      </div>
    </div>
    <div class="promocode">
      <a-input
        id="promocode"
        v-model="code"
        :required="false"
        name="promo_code"
        placeholder="Промокод"
        class="promocode__input"
      />
      <a-button
        text="Применить"
        type="button"
        class="promocode__btn"
        @click="applyPromo"
      />
      <span class="promocode__error">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import AInput from '../Input';
  import AButton from '../Button';

  export default {
    name: 'Summary',
    components: {
      AInput,
      AButton
    },
    data() {
      return {
        cart: [],
        orderSum: 0,
        code: '',
        promoSum: 0,
        error: ''
      };
    },
    computed: {
      sum() {
        return this.orderSum - this.promoSum + Number(this.$store.state.deliveryCost);
      },
      deliveryAlias() {
        return this.$store.state.deliveryAlias;
      },
      deliveryCost() {
        if (this.$store.state.deliveryType) {
          return this.$store.state.deliveryCost;
        }
        return 'Выберите способ доставки';
      }
    },
    mounted() {
      this.applyPromo();
    },
    methods: {
      applyPromo() {
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
        axios.post(url, data)
          .then((res) => {
            this.orderSum = res.data.order_sum;
            if (res.data.promocodes) {
              this.error = '';
            } else {
              this.error = res.data.discountRejectReasons.promocode[0].message;
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

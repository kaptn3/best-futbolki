<template>
  <v-row justify="center">
    <v-col cols="12" sm="10">
      <v-row>
        <v-col cols="12" md="7">
          <AForm />
        </v-col>
        <v-col cols="12" md="5">
          <div class="summary">
            <div class="pa-5">
              <CartItem
                v-for="(item, index) in cart"
                :key="index"
                :cart="item"
                checkout
              />
            </div>
            <Summary :promo-sum="promoSum" />
          </div>
          <div class="d-flex mt-5">
            <v-text-field
              v-model="code"
              :error-messages="error"
              :error="error.length > 0"
              :success-messages="success"
              :success="success.length > 0"
              name="promo_code"
              placeholder="Промокод"
              class="pt-0"
            />
            <v-btn color="grey darken-3" dark @click="applyPromo">
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
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Summary from '~/components/checkout/Summary';
import AForm from '~/components/AForm';
import CartItem from '~/components/cart/CartItem';

export default {
  components: {
    AForm,
    CartItem,
    Summary
  },
  data() {
    return {
      code: '',
      error: '',
      success: '',
      promoSum: 0
    };
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cart,
      commentValue: (state) => state.order.comment
    }),
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
    }
  },
  methods: {
    ...mapMutations({
      setData: 'order/setData'
    }),
    applyPromo() {
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
        promocode: this.code
      };
      this.$axios.post('/promocode.php', data).then((res) => {
        if (res.data.promocodes) {
          this.error = '';
          this.success = res.data.promocode_description.text;
          this.promoSum = res.data.order_sum;
          this.setData({
            name: 'promocode',
            value: this.code
          });
        } else {
          this.success = '';
          this.error = res.data.discountRejectReasons
            ? res.data.discountRejectReasons.promocode[0].message
            : 'Неправильный код';
          this.promoSum = 0;
          this.setData({
            name: 'promocode',
            value: ''
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.summary {
  border: 2px solid #f2f2f2;
  border-radius: 8px;
}
</style>

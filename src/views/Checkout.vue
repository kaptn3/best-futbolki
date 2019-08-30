<template>
  <form
    ref="form"
    class="container checkout"
    @submit="submitForm"
  >
    <div v-if="status === 'checkout'">
      <h2>Ваши данные</h2>
      <div class="checkout__box">
        <checkout-form/>
        <div class="checkout__right">
          <div class="checkout__items">
            <cart-item
              v-for="(item, index) in $store.state.cart"
              :key="index"
              :cart="item"
              :checkout="true"
            />
          </div>
          <a-summary/>
          <a-input
            id="comment"
            :required="false"
            name="comment"
            placeholder="Комментарий"
          />
        </div>
      </div>
      <a-button
        class="checkout__btn"
        text="Оформить заказ"
        type="submit"
      />
    </div>
    <div v-else>
      Заказ номер {{ id }} принят.
    </div>
  </form>
</template>

<script>
  import axios from 'axios';
  import CheckoutForm from '@/components/checkout/Form';
  import AButton from '@/components/Button';
  import CartItem from '@/components/cart/CartItem';
  import AInput from '@/components/Input';
  import ASummary from '@/components/checkout/Summary';

  export default {
    name: 'Checkout',
    components: {
      CheckoutForm,
      CartItem,
      AButton,
      AInput,
      ASummary
    },
    data() {
      return {
        id: 0,
        status: 'checkout'
      };
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        const formData = new FormData(this.$refs.form);
        const data = {};
        const receiver = {};
        const address = {
          'id': 0,
          'country': 'Россия',
          'region': '',
          'region_type': '',
          'postcode': '0'
        };
        // eslint-disable-next-line
        for (const [key, val] of formData.entries()) {
          if (key === 'delivery' || key === 'pickup_point_id' || key === 'payment_alias') {
            Object.assign(data, { [key]: val });
          } else if (key === 'city' || key === 'address') {
            Object.assign(address, { [key]: val });
          } else {
            Object.assign(receiver, { [key]: val });
          }
        }
        Object.assign(receiver, {
          'name': `${receiver['last-name']} ${receiver['first-name']} ${receiver['middle-name']}`
        });
        Object.assign(data, { 'receiver': receiver });
        Object.assign(receiver, { 'address': address });
        Object.assign(data, { 'cart': this.$store.state.cart });
        console.log(data);
        const url = 'http://api.best-futbolki.ru/API/order.php';
        axios.post(url, data)
          .then((res) => {
            console.log(res);
            this.status = 'ok';
            this.id = res.data.id;
            this.$store.state.cart = [];
            this.$store.state.cartCount = 0;
            window.localStorage.removeItem('cart');
            window.localStorage.removeItem('cartCount');
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .checkout {
    padding-top: 40px;
    padding-bottom: 40px;

    &__box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    &__right {
      margin-left: 20px;
    }

    &__items {
      border: 2px solid #f2f2f2;
      border-bottom: none;
      border-radius: 8px 8px 0 0;
      padding: 15px 10px;
    }
  }

  @media (max-width: 767px) {
    .checkout {
      &__box {
        display: block;
      }

      &__right {
        margin-left: 0;
        margin-bottom: 20px;
      }
    }
  }
</style>

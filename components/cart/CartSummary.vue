<template>
  <div class="summary">
    <h3>Shopping summary</h3>
    <div class="summary__item">
      <h4>Count</h4>
      <span>
        {{ $store.state.cart.cartCount }}
      </span>
    </div>
    <div class="summary__item">
      <h4>Price without discount</h4>
      <span>
        {{ price('old_price') }} руб
      </span>
    </div>
    <div class="summary__item">
      <h4>Discount</h4>
      <span>
        {{ discount() }} руб
      </span>
    </div>
    <div class="summary__item">
      <h4>Total</h4>
      <span>
        {{ price('price') }} руб
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CartSummary',
    methods: {
      price(name) {
        const data = this.$store.state.cart.cart;
        let price = 0;
        for (let i = 0; i < data.length; i++) {
          price += data[i][name] * Number(data[i].count);
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

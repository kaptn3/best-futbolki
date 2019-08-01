<template>
  <div class="summary">
    <h3>Shopping summary</h3>
    <div class="summary__item">
      <h4>Count</h4>
      <span>
        {{ $store.state.cartCount }}
      </span>
    </div>
    <div class="summary__item">
      <h4>Total</h4>
      <span>
        {{ price }} руб
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CartSummary',
    computed: {
      price() {
        const data = this.$store.state.cart;
        let price = 0;
        for (let i = 0; i < data.length; i++) {
          price += data[i].price;
        }
        return price;
      },
    },
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
</style>

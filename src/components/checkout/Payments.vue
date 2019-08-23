<template>
  <div>
    <h3>Способ оплаты</h3>
    <div
      v-for="(payment, index) in payments"
      :key="index"
      class="payment__item"
    >
      <label>
        <input
          type="radio"
          name="payment_alias"
          :value="payment.alias"
          required
        >
        <span class="payment__name">{{ payment.title }}</span>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Payments',
    props: {
      payments: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  label {
    display: block;
    font-size: 1rem;
    padding: 10px 0;
  }

  span {
    vertical-align: middle;
    padding-left: 18px;
  }
</style>
